import { defaultsDeep, omit, pick, cloneDeep } from "lodash-es";

import { DBService, LowdbAdapter } from "./db";
import SessionStorage from "./adapters/SessionStorage";

const DEFAULT_NAME = "vuex-along";
const ROOT_KEY = "root";

interface Store {
  state: object;
  replaceState(state: object): void;
  subscribe(callback: (mutation: unknown, state: object) => void): void;
}

export interface VuexAlongWatchOptions {
  list: string[];
  isFilter?: boolean;
}

export type VuexAlongAdapterOptions<TSchema> = {
  local?: LowdbAdapter<TSchema>;
  session?: LowdbAdapter<TSchema>;
  sync?: boolean;
};

export interface VuexAlongOptions<TSchema> {
  name?: string;
  local?: VuexAlongWatchOptions;
  session?: VuexAlongWatchOptions;
  justSession?: boolean;
  adapterOptions?: VuexAlongAdapterOptions<TSchema>;
}

class VuexAlong<TSchema = any> {
  readonly localDBService: DBService | undefined;
  readonly sessionDBService: DBService | undefined;

  private local: VuexAlongWatchOptions | undefined;
  private session: VuexAlongWatchOptions | undefined;
  private justSession: boolean;
  private sync: boolean;

  get ready(): Promise<[void, void]> | true {
    if (this.sync) {
      return true;
    }

    return Promise.all([
      this.localDBService?.ready,
      this.sessionDBService?.ready,
    ]);
  }

  constructor({
    local,
    session,
    name = DEFAULT_NAME,
    justSession = false,
    // Not open interface
    adapterOptions: { local: localAdapter, session: sessionAdapter, sync } = {
      session: SessionStorage,
      // Make sure your adapter is syncing. Then you can get the synchronized state
      sync: true,
    },
  }: VuexAlongOptions<TSchema>) {
    this.local = local;
    this.session = session;
    this.justSession = justSession;
    this.sync = !!((!localAdapter && !sessionAdapter) || sync);

    if (!justSession) {
      this.localDBService = new DBService(name, localAdapter);
    }

    if (session) {
      this.sessionDBService = new DBService(name, sessionAdapter);
    }

    if (window) {
      window.clearVuexAlong = (local, session) => {
        this.clear(local, session);
      };
    }
  }

  private saveLocalData(state: object): void {
    if (this.justSession) {
      return;
    }

    this._dataHandler(state, this.local ?? { list: [] }, this.localDBService);
  }

  private saveSessionData(state: object): void {
    let session = this.session;

    if (!session) {
      return;
    }

    this._dataHandler(state, session, this.sessionDBService);
  }

  private _dataHandler(
    state: object,
    options: VuexAlongWatchOptions,
    db: DBService | undefined
  ): void {
    if (!db) {
      return;
    }

    let duplicateState = cloneDeep(state);
    let key = ROOT_KEY;

    let { list, isFilter } = options;

    if (list?.length) {
      duplicateState = isFilter
        ? omit(duplicateState, list)
        : pick(duplicateState, list);
    }

    db.set(key, duplicateState).catch(logger);
  }

  saveData(state: object): void {
    this.saveLocalData(state);
    this.saveSessionData(state);
  }

  restoreData(store: Store): void {
    let key = ROOT_KEY;

    store.replaceState(
      defaultsDeep(
        this.sessionDBService?.get(key),
        this.localDBService?.get(key),
        store.state
      )
    );
  }

  clear(local = true, session = false): void {
    local && this.localDBService?.unset(ROOT_KEY).catch(logger);
    session && this.sessionDBService?.unset(ROOT_KEY).catch(logger);
  }
}

export default function<TSchema = any>(
  options: VuexAlongOptions<TSchema> = {}
): (store: Store) => void {
  let vuexAlong = new VuexAlong<TSchema>(options);

  return async (store: Store): Promise<void> => {
    if (vuexAlong.ready !== true) {
      await vuexAlong.ready;
    }
    vuexAlong.restoreData(store);
    store.subscribe((_mutation, state) => vuexAlong.saveData(state));
  };
}

// utils

function logger(reason: any): void {
  console.error(reason);
}
