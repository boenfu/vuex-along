# vuex-along

### Keep vuex state after browser refresh
### 借助于 localstorage
### 用于在浏览器刷新后 保存 vuex 状态的小插件



## Install

```
npm install vuex-along --save
```



## Use

###   1.import 导入

```
import vuexAlong from 'vuex-along'
...
```

###   2.add to store 
### 添加至store的 plugins 的数组里

```
export default new Vuex.Store({
  state:{...},
  ...
  plugins: [vuexAlong]
});
```



## Setting

#### Default save  all state 
#### 默认保存所有内容

#### If you don`t want to save all state. Use watch()
#### 只保存部分内容可以使用 watch 方法

#### 	vuexAlong.watch(arry,boolean)

#####​		arry: attribute or module name list
##### 第一个参数是 属性名或模块名 的数组

#####​		boolean (non-essential):  Default rue
##### 第二个参数不是必须的 默认true

#####​			true = save arry
##### true 会把 arry 作为要保存的列表

#####​			false = filter arry
##### false 会把 arry 作过滤的列表


#### If you need clean save. Use clean()
#### 想要清除 localstorage 调用 clean 方法

#### 	vuexAlong.clean()



### Demo

```
import Vuex from 'vuex'
import Vue from 'vue'
import vuexAlong from 'vuex-along'

Vue.use(Vuex);

//filter title & num
//此处为保存时过滤 title 和 num
vuexAlong.watch(['title','num'],false);
const state = {
  num: 0,
  title: 'hello',
  name: 'boen',
  people: {
    men: 10,
    women: 10
  }
};
const mutations = {
  addNum(state){
    state.num ++;
  }
};
export default new Vuex.Store({
  state:state,
  mutations:mutations,
  //add vuexAlong
  plugins: [vuexAlong]
});

```

