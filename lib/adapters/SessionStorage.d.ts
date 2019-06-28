export default class SessionStorage {
    source: any;
    defaultValue: any;
    serialize: any;
    deserialize: any;
    constructor(source: any, options?: any);
    read(): any;
    write(data: object): void;
}
