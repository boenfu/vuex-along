var unwatch = null
var watch = null
const KEY = 'vuex-along'
const ls = window.localStorage

const vuexAlong = store => {
    initAlong(store);
    store.subscribe(function (mutation, state) {
        let obj = {};
        if(watch != null){
            for (let i of watch){
                obj[i] = state[i];
            }
        }else if(unwatch != null){
            for(let i in state){
                if (unwatch.indexOf(i)>-1)continue;
                obj[i] = state[i];
            }
        }else {
            obj = state;
        }
        setItem(KEY,obj);
    })
}

/**
 * Init this plugin when store init
 */
const initAlong = store => {
    if(getItem(KEY))store.replaceState(Object.assign(store.state,getItem(KEY)));
}

const setWatch = (arry,isWatch = true) => {
    if(!Array.isArray(arry) || typeof isWatch != 'boolean'){
        return console.error(
            '[vuex-along] params of watch has error'
        );
    }
    isWatch
        ? (watch = arry,unwatch = null)
        : (unwatch = arry,watch = null);
}

const coded = str =>{
    return window.btoa(window.encodeURIComponent(str));
}
const encoded = str =>{
    return window.decodeURIComponent(window.atob(str));
}
const getItem = key => {
    try {
        return JSON.parse(encoded(ls.getItem(key)));
    } catch (err) {
        return null;
    }
}
const setItem = (key, val) => {
    ls.setItem(key, coded(JSON.stringify(val)));
}
const removeItem = () => {
    ls.removeItem(KEY);
}
vuexAlong.watch = setWatch;
vuexAlong.clean = removeItem;
export default  vuexAlong;