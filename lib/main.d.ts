import { LowdbAdapter } from "./db";
interface Store {
    state: object;
    replaceState(state: object): void;
    subscribe(callback: (mutation: unknown, state: object) => void): void;
}
export interface VuexAlongWatchOptions {
    list: string[];
    isFilter?: boolean;
}
export declare type VuexAlongAdapterOptions<TSchema> = {
    local?: LowdbAdapter<TSchema>;
    session?: LowdbAdapter<TSchema>;
};
export interface VuexAlongOptions<TSchema> {
    name?: string;
    local?: VuexAlongWatchOptions;
    session?: VuexAlongWatchOptions;
    justSession?: boolean;
    adapterOptions?: VuexAlongAdapterOptions<TSchema>;
}
export default function <TSchema = any>(options?: VuexAlongOptions<TSchema>): (store: Store) => void;
export {};
