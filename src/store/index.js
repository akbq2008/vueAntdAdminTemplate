import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
Vue.use(Vuex);
import getters from './getters';
export default new Vuex.Store({
  modules: {
    app
  },
  getters,
  state: {},
  mutations: {},
  actions: {}
});
