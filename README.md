# vuex-along

### A plugins to auto save and restore state for vuex

![Build Status](https://travis-ci.org/boenfu/vuex-along.svg?branch=master) ![](https://img.shields.io/npm/v/vuex-along.svg) ![](https://img.shields.io/npm/l/vuex-along.svg) ![npm](https://img.shields.io/npm/dm/vuex-along.svg) ![GitHub last commit](https://img.shields.io/github/last-commit/boenfu/vuex-along.svg)

### 自动保存 state 到本地并在页面刷新后自动恢复的 vuex 插件 ![GitHub stars](https://img.shields.io/github/stars/boenfu/vuex-along.svg?style=social)

demo :  https://boenfu.github.io/vuex-along/

## Install

```shell
npm install vuex-along --save

yarn add vuex-along
```

## Use

### 添加至 store 的 plugins 的数组里

```javascript
import createVuexAlong from 'vuex-along'

export default new Vuex.Store({
  state:{...},
  modules:{...},
  plugins: [createVuexAlong()]
});
```

    Now the plugins has come into effect  / 现在插件已经生效了


    Save all state by default to localStorage / 默认保存所有 state 到 localStorage


    You can change options to set it / 你可以通过改变 options 来改变保存内容

## Example

```javascript
import createVuexAlong from "vuex-along";

const moduleA = {
  state: {
    a1: "hello",
    a2: "world"
  }
};

const store = new Vuex.Store({
  state: {
    count: 0
  },
  modules: {
    ma: moduleA
  },
  plugins: [
    createVuexAlong({
      name: "hello-vuex-along", // 设置保存的集合名字，避免同站点下的多项目数据冲突
      local: {
        list: ["ma"],
        isFilter: true // 过滤模块 ma 数据， 将其他的存入 localStorage
      },
      session: {
        list: ["count", "ma.a1"] // 保存 count 和模块 ma 中的 a1 到 sessionStorage
      }
    })
  ]
});
```

## Options

```typescript
interface VuexAlongOptions {
  /**
   * 可选，设置本地数据集合的名字，默认为 vuex-along。
   * Optional, set the name of the local data collection, the default is vuex-along.
   */
  name?: string;
  /**
   * 可选，localStorage 的配置，默认开启保存全部 state。
   * Optional, localStorage configuration, by default, save all state.
   */
  local?: WatchOptions;
  /**
   * 可选，sessionStorage 的配置， 默认未开启。
   * Optional, sessionStorage configuration, not enabled by default.
   */
  session?: WatchOptions;
  /**
   * 可选，是否仅使用 sessionStorage，默认 false。
   * Optional, whether to use only sessionStorage, the default is false.
   */
  justSession?: boolean;
}

interface WatchOptions {
  /**
   * 需要监听的属性名或模块名的字符串列表。
   * A list of property names or module names to listen to.
   */
  list: string[];
  /**
   * 可选，false 为保存 list, true 为过滤 list，默认 false。
   * Optional, false is to save list, true is to filter list, default is false.
   */
  isFilter?: boolean;
}
```

## Clear data

```typescript
window.clearVuexAlong(local = true, session = true):void;
```

你可以使用挂载到 window 下的 clearVuexAlong 方法来清除数据，直接调用 `clearVuexAlong()`。

You can use `window.clearVuexAlong()` to clear the data.

only`localStorage` ，use `clearVuexAlong(true,false)`

only `sessionStorage` ，use `clearVuexAlong(fasle,true)`

## Run demo

```shell
git clone https://github.com/boenfu/vuex-along.git

cd ./vuex-along

yarn run:demo
```

## Tips

1. `sessionStorage` 所存的数据在恢复时比 `localStorage` 优先级高。

   The data stored in `sessionStorage` has higher priority than `localStorage` when recovering.

2. 存储内容的顶层对象的 `key` 固定为 `root` （1.2.6）

## License

MIT License.
