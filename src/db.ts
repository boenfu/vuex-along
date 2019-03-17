import low, { AdapterSync } from "lowdb";
import LocalStorage from "lowdb/adapters/LocalStorage";
import SessionStorage from "./adapters/SessionStorage";

export class DBService {
  private db: low.LowdbSync<unknown>;

  constructor(name: string, session = false) {
    this.db = low(
      session
        ? ((new SessionStorage(name) as unknown) as AdapterSync<any>)
        : new LocalStorage(name)
    );
  }

  get<T>(key: string): T | undefined {
    return this.db.get(key).value();
  }

  set<T>(key: string, value: T): void {
    this.db.set(key, value).write();
  }

  unset(key: string): void {
    this.db.unset(key).write();
  }
}
