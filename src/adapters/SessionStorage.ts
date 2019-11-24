import { AdapterSync, AdapterOptions } from "lowdb";

const stringify = (obj: unknown) => JSON.stringify(obj, null, 2);

class SessionStorage<TSchema = any> {
  defaultValue: TSchema;
  serialize: (data: TSchema) => string;
  deserialize: (serializedData: string) => TSchema;

  constructor(public source: string, options?: AdapterOptions) {
    this.source = source;
    this.defaultValue = options?.defaultValue ?? {};
    this.serialize = options?.serialize ?? stringify;
    this.deserialize = options?.deserialize ?? JSON.parse;
  }

  read(): TSchema {
    const data = sessionStorage.getItem(this.source);

    if (!data) {
      sessionStorage.setItem(this.source, this.serialize(this.defaultValue));
      return this.defaultValue;
    }

    return this.deserialize(data);
  }

  write(data: TSchema): void {
    sessionStorage.setItem(this.source, this.serialize(data));
  }
}

export default (SessionStorage as unknown) as AdapterSync;
