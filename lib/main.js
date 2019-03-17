import _ from "lodash";
import { DBService } from "./db";
class VuexAlong {
    constructor({ local, session, name = "vuex-along", justSession = false }) {
        this.name = name;
        this.local = local;
        this.session = session;
        this.justSession = justSession;
        this.localDBService = new DBService(name);
        this.sessionDBService = new DBService(name, true);
        window
            ? (window.clearVuexAlong = (local, session) => {
                this.clear(local, session);
            })
            : undefined;
    }
    saveData(state) {
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
            this.localDBService.set(this.name, localState);
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
            this.sessionDBService.set(this.name, sessionState);
        }
    }
    restoreData(store) {
        let name = this.name;
        store.replaceState(_.defaultsDeep(this.sessionDBService.get(name), this.localDBService.get(name), store.state));
    }
    clear(local = true, session = false) {
        let name = this.name;
        if (local) {
            this.localDBService.unset(name);
        }
        if (session) {
            this.sessionDBService.unset(name);
        }
    }
}
export const createVuexAlong = (options) => {
    let vuexAlong = new VuexAlong(options);
    return (store) => {
        vuexAlong.restoreData(store);
        store.subscribe((_mutation, state) => vuexAlong.saveData(state));
    };
};
