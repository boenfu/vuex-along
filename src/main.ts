import _ from "lodash";

import { DBService } from "./db";

const DEFAULT_NAME = "vuex-along";

const ROOT_DATA_KEY = "root";

interface Store {
  state: object;
  replaceState(state: object): void;
  subscribe(callback: (mutation: unknown, state: object) => void): void;
}

interface WatchOptions {
  /**
   * 需要监听的属性名或模块名的字符串列表
   */
  list: string[];
  /**
   * 可选，false 为保存 list, true 为过滤 list，默认 false。
   */
  isFilter?: boolean;
}

interface VuexAlongOptions {
  /**
   * 可选，设置本地数据集合的名字，默认为 vuex-along
   */
  name?: string;
  /**
   * 可选，localStorage 的配置，默认开启保存全部 state。
   */
  local?: WatchOptions;
  /**
   * 可选，sessionStorage 的配置， 默认未开启。
   */
  session?: WatchOptions;
  /**
   * 可选，是否仅使用 sessionStorage，默认 false。
   */
  justSession?: boolean;
}

class VuexAlong {
  readonly localDBService: DBService;
  readonly sessionDBService: DBService;

  private local: WatchOptions | undefined;
  private session: WatchOptions | undefined;
  private justSession: boolean;

  constructor({
    local,
    session,
    name = DEFAULT_NAME,
    justSession = false
  }: VuexAlongOptions) {
    this.local = local;
    this.session = session;
    this.justSession = justSession;

    this.localDBService = new DBService(name);
    this.sessionDBService = new DBService(name, true);

    window
      ? (window.clearVuexAlong = (local, session): void => {
          this.clear(local, session);
        })
      : undefined;
  }

  saveData(state: object): void {
    if (!this.justSession) {
      let local = this.local;
      let localState = _.cloneDeep(state);

      if (local) {
        let { list, isFilter } = local;

        if (list.length) {
          localState = isFilter
            ? _.omit(localState, list)
            : _.pick(localState, list);
        }
      }

      this.localDBService.set(ROOT_DATA_KEY, localState);
    }

    let session = this.session;

    if (session) {
      let { list, isFilter } = session;
      let sessionState = _.cloneDeep(state);

      if (list.length) {
        sessionState = isFilter
          ? _.omit(sessionState, list)
          : _.pick(sessionState, list);
      }

      this.sessionDBService.set(ROOT_DATA_KEY, sessionState);
    }
  }

  restoreData(store: Store): void {
    store.replaceState(
      _.defaultsDeep(
        this.sessionDBService.get(ROOT_DATA_KEY),
        this.localDBService.get(ROOT_DATA_KEY),
        store.state
      )
    );
  }

  clear(local = true, session = false): void {
    if (local) {
      this.localDBService.unset(ROOT_DATA_KEY);
    }

    if (session) {
      this.sessionDBService.unset(ROOT_DATA_KEY);
    }
  }
}

export default (options: VuexAlongOptions): ((store: Store) => void) => {
  let vuexAlong = new VuexAlong(options);

  return (store: Store): void => {
    vuexAlong.restoreData(store);

    store.subscribe((_mutation, state) => vuexAlong.saveData(state));
  };
};
