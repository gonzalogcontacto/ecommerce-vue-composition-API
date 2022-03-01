import { createStore } from "vuex";

export default createStore({
  state: {
    cart: [],
  },
  mutations: {
    addProductToCart(state, payload) {
      console.info(state);
      state.cart.push(payload);
      console.info(state);
    },
  },
  getters: {
    getCart(state) {
      return state.cart;
    },
  },
  actions: {},
  modules: {},
});
