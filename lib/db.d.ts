import { AdapterSync, LowdbSync, AdapterAsync, LowdbAsync } from "lowdb";
declare type Lowdb<SchemaT> = LowdbSync<SchemaT> | LowdbAsync<SchemaT>;
export declare type LowdbAdapter<SchemaT> = AdapterAsync<SchemaT> | AdapterSync<SchemaT>;
export declare class DBService<SchemaT = any> {
    private _name;
    private _adapter;
    db: Lowdb<SchemaT>;
    ready: Promise<void>;
    constructor(_name: string, _adapter?: LowdbAdapter<SchemaT>);
    private initialize;
    get<T>(key: string): T | undefined;
    set<T>(key: string, value: T): Promise<void>;
    unset(key: string): Promise<void>;
}
export {};
