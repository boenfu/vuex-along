import low, { AdapterSync, LowdbSync, AdapterAsync, LowdbAsync } from "lowdb";
import LocalStorage from "lowdb/adapters/LocalStorage";

type Lowdb<SchemaT> = LowdbSync<SchemaT> | LowdbAsync<SchemaT>;

export type LowdbAdapter<SchemaT> =
  | AdapterAsync<SchemaT>
  | AdapterSync<SchemaT>;

export class DBService<SchemaT = any> {
  db!: Lowdb<SchemaT>;
  ready: Promise<void>;

  constructor(
    private _name: string,
    private _adapter: LowdbAdapter<SchemaT> = LocalStorage
  ) {
    this.ready = this.initialize();
  }

  private async initialize(): Promise<void> {
    let name = this._name;
    let Adapter = this._adapter;

    let adapter = (await new Adapter(name)) as LowdbAdapter<SchemaT>;

    this.db = await low(adapter);
  }

  get<T>(key: string): T | undefined {
    return this.db.get(key).value();
  }

  async set<T>(key: string, value: T): Promise<void> {
    await this.db.set(key, value).write();
  }

  async unset(key: string): Promise<void> {
    await this.db.unset(key).write();
  }
}
