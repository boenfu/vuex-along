declare module "vuex" {
  interface Store {
    state: object;
    replaceState(state: object): void;
    subscribe(callback: (mutation: any, state: object) => void): void;
  }
}
