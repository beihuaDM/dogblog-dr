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
    },
    USER_LOGOUT: state => {
      localStorage.removeItem("Authorization");
      state.token = "";
      state.userInfo = {};
    }
  },
  actions: {
    // 用户登录
    userLogin({ commit }, userInfo) {
      const { email, password } = userInfo;
      return new Promise((resolve, reject) => {
        userLogin({ email: email.trim(), password: password.trim() })
          .then(response => {
            const { result } = response;
            commit("SET_TOKEN", result);

            try {
              getUserInfo()
                .then(res => {
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
    },
    // 用户退出
    userLogout({ commit }) {
      commit("USER_LOGOUT");
    }
  },
  modules: {},
  plugins: [vuexLocal.plugin]
});
