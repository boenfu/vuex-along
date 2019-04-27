import { Store } from "vuex";
interface WatchOptions {
    /**
     * 需要监听的属性名或模块名的字符串列表
     */
    list: string[];
    /**
     * 可选，false 为保存 list, true 为过滤 list，默认 false。
     */
    isFilter?: boolean;
}
interface VuexAlongOptions {
    /**
     * 可选，设置本地数据集合的名字，默认为 vuex-along
     */
    name?: string;
    /**
     * 可选，localStorage 的配置，默认开启保存全部 state。
     */
    local?: WatchOptions;
    /**
     * 可选，sessionStorage 的配置， 默认未开启。
     */
    session?: WatchOptions;
    /**
     * 可选，是否仅使用 sessionStorage，默认 false。
     */
    justSession?: boolean;
}
declare const _default: (options: VuexAlongOptions) => (store: Store) => void;
export default _default;
