# vuex-along

### Keep vuex state after browser refresh
### 用于在浏览器刷新后 保存 vuex 状态的小插件

* 新增保存至 sessionStorage
* 源文件已被编译为 ES5 增加兼容性



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



Now the plug-in has come into effect  / 现在插件已经生效了

Save all state by default / 默认保存所有state

You can set up by use API / 你可以通过相应API来设置





## API



#### 	1. vuexAlong.watch (arry , [boolean])

 arry :  attribute or module name list / 属性名或模块名 的数组

 boolean (non-essential):  Default true / 非必须 默认true

​	true:   will save arry  /  arry 作为要保存的列表

​	false:   will filter arry /  arry 作过滤的列表



#### 2. vuexAlong.watchSession (arry, [boolean])

The usage is the same as above / 用法和上面一样

But it kept data in the sessionStorage / 只不过是存储在sessionStorage 

And  state will not be saved by default /  并且不会默认保存所有state

Closing the browser window will disappear / 关闭浏览器窗口就会消失



Be careful: 

​	watch() and watchSession() can take effect at the same time

​	If you want to only save sessionStorage 

​	Please use vuexAlong.onlySession(true)；

注意：

​	watch() 和 watchSession() 可以同时生效

​	如果你只想保存至 sessionStorage 

​	调用 vuexAlong.onlySession(true)；



#### 3. vuexAlong.onlySession (boolean)

Whether the setting is read-only sessionStorage  / 设置是否只读 sessionStorage  



#### 4. vuexAlong.clean()    /   window.cleanVuexAlong()

Clear the saved data / 清除保存的数据



### Demo

```
import Vue from 'vue';
import vuex from 'vuex';
import vuexAlong from  'vuex-along';

Vue.use(vuex);

vuexAlong.watch(['localNum'],true);
vuexAlong.watchSession(['sessionNum'],true);
//vuexAlong.onlySession(true);

const state = {
  localNum: 0,
  sessionNum:0,
};
const mutations = {
  addNumLocal(state){
    state.localNum ++;
  },
  addNumSession(state){
    state.sessionNum ++;
  },
};
export default new vuex.Store({
  state:state,
  mutations:mutations,
  plugins: [vuexAlong]
});


```

demo:  http://demo.boenfu.cn/vuex-along

