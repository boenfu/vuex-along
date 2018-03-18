# vuex-along
Keep vuex state after browser refresh



## Install

```
npm install vuex-along --save
```



## Use

###   1.import

```
import vueAlong from 'vuex-along'
...
```

###   2.add to store

```
export default new Vuex.Store({
  state:{...},
  ...
  plugins: [vueAlong]
});
```



## Setting

#### If you don`t want to save all state. Use watch()

#### 	vueAlong.watch(arry,boolean)

​		arry: 

​			attribute or module name list

​		boolean (non-essential):  

​			true = save arry

​			false = filter arry



#### If you need clean save. Use clean()

#### 	vueAlong.clean()



### Demo

```
import Vuex from 'vuex'
import Vue from 'vue'
import vuexAlong from 'vuex-along'

Vue.use(Vuex);

//filter title & num
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

