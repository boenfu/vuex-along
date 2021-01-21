[English](./README.EN.md) | 简体中文

<p align="center"><img width="140" src="./logo.png"></p>
<p align="center">
  <a href="#"><img alt="Travis (.org) branch" src="https://img.shields.io/travis/boenfu/vuex-along/master?style=flat-square"></a>
  <a href="#"><img alt="npm" src="https://img.shields.io/npm/v/vuex-along?style=flat-square"></a>
    <a href="#"><img alt="npm" src="https://img.shields.io/npm/dt/vuex-along?style=flat-square"></a>
  <a href="#"><img alt="NPM" src="https://img.shields.io/npm/l/vuex-along?style=flat-square"></a>
  <a href="#"><img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/boenfu/vuex-along?style=flat-square"></a>
  <a href="http://makeapullrequest.com"><img alt="PRS" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square"></a>
</p>

<h2 align="center">vuex-along - 持久化存储 state 的 vuex 扩展</h2>
<p align="center"><b>常用于刷新网页后自动恢复 state</b></p>

# 目录

- [安装](#安装)
- [用法](#用法)
- [示例](#示例)
- [参数](#参数)
- [数据清理](#数据清理)
- [运行 demo](#运行demo)
- [提示项](#提示项)
- [贡献者](#贡献者)
- [维护者](#维护者)
- [License](#license)

## 安装

```shell
npm install vuex-along --save
# or
yarn add vuex-along
```

## 用法

```javascript
import createVuexAlong from 'vuex-along'

export default new Vuex.Store({
  state:{...},
  modules:{...},
  plugins: [createVuexAlong()]
});
```

> 到此为止，插件已经生效了，默认会存储所有 state 到 localStorage
>
> 传入需要的 [参数](#参数) 来满足使用需求
>- [微信小程序适配器](https://github.com/boenfu/vuex-along-wx-adapter)
>- [数据加密适配器](https://github.com/boenfu/vuex-along-secure-adapter)

## 示例

[→ 在线示例](https://boenfu.github.io/vuex-along/)

```javascript
import createVuexAlong from "vuex-along";

const moduleA = {
  state: {
    a1: "hello",
    a2: "world",
  },
};

const store = new Vuex.Store({
  state: {
    count: 0,
  },
  modules: {
    ma: moduleA,
  },
  plugins: [
    createVuexAlong({
      // 设置保存的集合名字，避免同站点下的多项目数据冲突
      name: "hello-vuex-along",
      local: {
        list: ["ma"],
        // 过滤模块 ma 数据， 将其他的存入 localStorage
        isFilter: true,
      },
      session: {
        // 保存模块 ma 中的 a1 到 sessionStorage
        list: ["ma.a1"],
      },
    }),
  ],
});
```

## 参数

#### VuexAlongOptions

| **字段**    | 必选 | 类型    | 描述                                      |
| ----------- | ---- | ------- | ----------------------------------------- |
| name        | 否   | String  | 设置本地数据集合的名字，默认为 vuex-along |
| local       | 否   | Object  | localStorage 的配置，见 #WatchOptions     |
| session     | 否   | Object  | sessionStorage 的配置，见 #WatchOptions   |
| justSession | 否   | Boolean | 仅使用 sessionStorage                     |

#### WatchOptions

| 字段     | 必选 | 类型      | 描述                                 |
| -------- | ---- | --------- | ------------------------------------ |
| list     | 是   | String [] | 需要监听的属性名或模块名的字符串列表 |
| isFilter | 否   | Boolean   | 过滤 list 中的字段而非保存           |

## 数据清理

```typescript
window.clearVuexAlong(local = true, session = true):void;
clearVuexAlong() // localStorage 和 sessionStorage 都会被清理
clearVuexAlong(true,false) // 只清理 localStorage
clearVuexAlong(false,true) // 只清理 sessionStorage
```

## 运行 demo

```shell
git clone https://github.com/boenfu/vuex-along.git
cd ./vuex-along
yarn run:demo
```

## 提示项

- 支持 `typescript`
- `IE11`可用
- `sessionStorage` 数据恢复优先级高于 `localStorage`
- 存储内容的顶层对象的 `key` 固定为 `root`

## 贡献者们

<table>
    <tbody>
        <tr>
            <td>
                <a target="_blank" href="https://github.com/boenfu"><img width="60px" src="https://avatars0.githubusercontent.com/u/33797740?s=460&v=4"></a>
              <a target="_blank" href="https://github.com/han-feng"><img width="60px" src="https://avatars3.githubusercontent.com/u/1127566?s=460&v=4"></a>
            </td>
        </tr>
    </tbody>
</table>

## 维护者

- [boen](https://github.com/boenfu)

## License

- [MIT](https://opensource.org/licenses/MIT)
