import Vue from 'vue'
import Vuex from "vuex";
import films from './modules/films'

Vue.use(Vuex);

export default new Vuex.Store({
    // split into modules foк future scaling
    modules: {
        films
    }
});