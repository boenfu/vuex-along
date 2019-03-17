/* global sessionStorage */
const stringify = (obj: object) => {
  return JSON.stringify(obj, null, 2);
};

export default class SessionStorage {
  source: any;
  defaultValue: any;
  serialize: any;
  deserialize: any;

  constructor(
    source: any,
    { defaultValue = {}, serialize = stringify, deserialize = JSON.parse } = {}
  ) {
    this.source = source;
    this.defaultValue = defaultValue;
    this.serialize = serialize;
    this.deserialize = deserialize;
  }

  read() {
    const data = sessionStorage.getItem(this.source);
    if (data) {
      return this.deserialize(data);
    } else {
      sessionStorage.setItem(this.source, this.serialize(this.defaultValue));
      return this.defaultValue;
    }
  }

  write(data: object): void {
    sessionStorage.setItem(this.source, this.serialize(data));
  }
}
