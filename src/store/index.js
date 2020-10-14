import Vue from "vue";
import Vuex from "vuex";
import { userLogin, getUserInfo } from "@/api/user";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
});

export default new Vuex.Store({
  state: {
    token: "",
    userInfo: {}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      localStorage.setItem("Authorization", token);
      state.token = token;
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo;
    }
  },
  actions: {
    // 用户登录
    userLogin({ commit }, userInfo) {
      console.log(2);
      const { email, password } = userInfo;
      return new Promise((resolve, reject) => {
        console.log(3);
        userLogin({ email: email.trim(), password: password.trim() })
          .then(response => {
            console.log(4);
            const { result } = response;
            commit("SET_TOKEN", result);

            try {
              console.log(5);
              getUserInfo()
                .then(res => {
                  console.log(6);
                  commit("SET_USERINFO", res.result);
                  resolve();
                })
                .catch(error => {
                  reject(error);
                });
            } catch (error) {
              reject(error);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },
  modules: {},
  plugins: [vuexLocal.plugin]
});
