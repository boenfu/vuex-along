English | [简体中文](./README.md)

<p align="center"><img width="140" src="./logo.png"></p>
<p align="center">
  <a href="#"><img alt="Travis (.org) branch" src="https://img.shields.io/travis/boenfu/vuex-along/master?style=flat-square"></a>
  <a href="#"><img alt="npm" src="https://img.shields.io/npm/v/vuex-along?style=flat-square"></a>
    <a href="#"><img alt="npm" src="https://img.shields.io/npm/dt/vuex-along?style=flat-square"></a>
  <a href="#"><img alt="NPM" src="https://img.shields.io/npm/l/vuex-along?style=flat-square"></a>
  <a href="#"><img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/boenfu/vuex-along?style=flat-square"></a>
  <a href="http://makeapullrequest.com"><img alt="PRS" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square"></a>
</p>

<h2 align="center">vuex-along - A plugins for vuex</h2>
<p align="center"><b>Automatically restore vuex state after refreshing the page</b></p>

# Directory

- [Install](#Install)
- [Usage](#Usage)
- [Example](#Example)
- [Options](#Options)
- [Cleanup](#Cleanup)
- [RunDemo](#RunDemo)
- [Tips](#Tips)
- [Contribution](#Contribution)
- [Maintainers](#Maintainers)
- [License](#license)

## Install

```shell
npm install vuex-along --save
# or
yarn add vuex-along
```

## Usage

```javascript
import createVuexAlong from 'vuex-along'

export default new Vuex.Store({
  state:{...},
  modules:{...},
  plugins: [createVuexAlong()]
});
```

> Now, the plugin has been in effect, and all state is stored to localStorage by default.
>
> Set [Options](#Options) to meet the usage requirements
>
>- [secure-adapter](https://github.com/boenfu/vuex-along-secure-adapter)

## Example

[→ Online Example](https://boenfu.github.io/vuex-along/)

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
      //Set the collection name to avoid multi-project data conflicts with the same site
      name: "hello-vuex-along",
      local: {
        list: ["ma"],
        // Filter the module ma data, save the other to localStorage
        isFilter: true,
      },
      session: {
        // Save a1 in module ma to sessionStorage
        list: ["ma.a1"],
      },
    }),
  ],
});
```

## Options

#### VuexAlongOptions

| **Field**   | **Required** | **Type** | **Description**                                                          |
| ----------- | ------------ | -------- | ------------------------------------------------------------------------ |
| name        | no           | String   | Set the name of the local data collection, the default is **vuex-along** |
| local       | no           | Object   | LocalStorage configuration, see #WatchOptions                            |
| session     | no           | Object   | SessionStorage configuration, see #WatchOptions                          |
| justSession | no           | Boolean  | Use only sessionStorage                                                  |

#### WatchOptions

| **Field** | **Required** | **Type**  | **Description**                                                                |
| --------- | ------------ | --------- | ------------------------------------------------------------------------------ |
| list      | yes          | String [] | List of strings of attribute names or module names that need to be listened to |
| isFilter  | no           | Boolean   | Filter fields in list instead of saving                                        |

## Cleanup

```typescript
window.clearVuexAlong(local = true, session = true):void;
clearVuexAlong() // localStorage and sessionStorage will be cleaned up
clearVuexAlong(true,false) // Just localStorage
clearVuexAlong(false,true) // Just sessionStorage
```

## RunDemo

```shell
git clone https://github.com/boenfu/vuex-along.git
cd ./vuex-along
yarn run:demo
```

## Tips

- Support `typescript`
- Support `IE11`
- `sessionStorage` data recovery takes precedence over `localStorage`
- The `key` of the top-level object that stores the content is fixed to `root`

## Contribution

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

## Maintainers

- [boen](https://github.com/boenfu)

## License

- [MIT](https://opensource.org/licenses/MIT)
