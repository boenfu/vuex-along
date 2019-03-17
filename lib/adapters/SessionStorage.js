/* global sessionStorage */
const stringify = (obj) => {
    return JSON.stringify(obj, null, 2);
};
export default class SessionStorage {
    constructor(source, { defaultValue = {}, serialize = stringify, deserialize = JSON.parse } = {}) {
        this.source = source;
        this.defaultValue = defaultValue;
        this.serialize = serialize;
        this.deserialize = deserialize;
    }
    read() {
        const data = sessionStorage.getItem(this.source);
        if (data) {
            return this.deserialize(data);
        }
        else {
            sessionStorage.setItem(this.source, this.serialize(this.defaultValue));
            return this.defaultValue;
        }
    }
    write(data) {
        sessionStorage.setItem(this.source, this.serialize(data));
    }
}
