export default class SessionStorage {
    source: any;
    defaultValue: any;
    serialize: any;
    deserialize: any;
    constructor(source: any, { defaultValue, serialize, deserialize }?: {
        defaultValue?: {} | undefined;
        serialize?: ((obj: object) => string) | undefined;
        deserialize?: ((text: string, reviver?: ((key: any, value: any) => any) | undefined) => any) | undefined;
    });
    read(): any;
    write(data: object): void;
}
