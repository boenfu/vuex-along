export declare class DBService {
    private db;
    constructor(name: string, session?: boolean);
    get<T>(key: string): T | undefined;
    set<T>(key: string, value: T): void;
    unset(key: string): void;
}
