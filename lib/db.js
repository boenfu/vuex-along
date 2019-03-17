import low from "lowdb";
import LocalStorage from "lowdb/adapters/LocalStorage";
import SessionStorage from "./adapters/SessionStorage";
export class DBService {
    constructor(name, session = false) {
        this.db = low(session
            ? new SessionStorage(name)
            : new LocalStorage(name));
    }
    get(key) {
        return this.db.get(key).value();
    }
    set(key, value) {
        this.db.set(key, value).write();
    }
    unset(key) {
        this.db.unset(key).write();
    }
}
