<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Auto save vuex state to localStorage or sessionStorage,
      <br>check out the
      <a
        href="https://github.com/boenfu/vuex-along"
        target="_blank"
        rel="noopener"
      >github</a>.
    </p>
    <h3>Local example</h3>
    <ul>
      <li>
        {{$store.state.count}}
        <button @click="increment">+ 10</button>
      </li>
    </ul>
    <h3>Session example</h3>
    <ul>
      <li>
        {{$store.state.ma.a1}}
        <button @click="reverseA1">reverse a1</button>
        (Saved ma.a1)
      </li>
      <li>
        {{$store.state.ma.a2}}
        <button @click="reverseA2">reverse a2</button>
        (Unsaved ma.a2)
      </li>
    </ul>
    <h3>clear data</h3>
    <ul>
      <li>
        <button @click="clearLocal">clear local / 清除 localStorage</button>
      </li>
      <li>
        <button @click="clearSession">clear Session / 清除 sessionStorage</button>
      </li>
    </ul>
    <h3>
      Options example
      <a
        href="https://github.com/boenfu/vuex-along/tree/master/demo/src/main.js"
        target="_blank"
        rel="noopener"
      >demo/src/main.js</a>
    </h3>
    <br>
    <pre>
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
    }
  },
  modules: {
    ma: moduleA
  },
  plugins: [
    </pre>
    <pre class="light">
    createVuexAlong({
      name: "hello-vuex-along",
      local: { list: ["ma"], isFilter: true },
      session: { list: ["ma.a1"] }
    })
    </pre>
    <pre>
  ]
});
    </pre>
    <p>
      More options
      <br>check out the
      <a
        href="https://github.com/boenfu/vuex-along"
        target="_blank"
        rel="noopener"
      >README</a>.
    </p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  methods: {
    increment() {
      this.$store.commit("increment");
    },
    reverseA1() {
      this.$store.commit("reverseA1");
    },
    reverseA2() {
      this.$store.commit("reverseA2");
    },
    clearLocal() {
      window.clearVuexAlong(true, false);
    },
    clearSession() {
      window.clearVuexAlong(false, true);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 20px;
}
a,
pre.light {
  color: #42b983;
}
pre {
  width: 50%;
  margin: 0 auto;
  text-align: left;
  background-color: #333;
  color: #fff;
  font-size: 16px;
}
</style>
