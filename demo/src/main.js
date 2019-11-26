import Vue from "vue";
import Vuex from "vuex";
import createVuexAlong from "../../lib/main";

import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;
Vue.use(Vuex);

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
  mutations: {
    increment(state) {
      state.count += 10;
    },
    reverseA1(state) {
      state.ma.a1 = state.ma.a1
        .split("")
        .reverse()
        .join("");
    },
    reverseA2(state) {
      state.ma.a2 = state.ma.a2
        .split("")
        .reverse()
        .join("");
    },
  },
  modules: {
    ma: moduleA,
  },
  plugins: [
    createVuexAlong({
      name: "hello-vuex-along",
      local: { list: ["ma"], isFilter: true },
      session: { list: ["ma.a1"] },
    }),
  ],
});

router.beforeEach((to, from, next) => {
  // eslint-disable-next-line
  console.info("router.beforeEach", {
    "router.app.$options.store.state.count":
      router.app.$options.store.state.count,
  });
  next();
});

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount("#app");
