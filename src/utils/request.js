import axios from "axios";
import store from "@/store";
import { getToken } from "@/utils/auth";

// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // 开启后跨域请求可携带cookie
  timeout: 5000 // 请求
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 请求前做一些事情

    if (localStorage.getItem("Authorization")) {
      // 每一个请求都携带token
      // token是自定义请求头
      // 请根据实际情况进行修改
      config.headers["Authorization"] = "Bearer " + getToken();
    }
    return config;
  },
  error => {
    error.msg = error.message;
    // 请求失败做一些事情
    return Promise.reject(error);
  }
);

// 响应拦截
service.interceptors.response.use(
  /**
   * 自定义状态码判断请求
   */
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    const error = new Error();
    if (response.status === 200) {
      const { code } = response.data;
      if (code !== 200) {
        const message = response.data.error || response.data.msg;
        error.message = message;
        return Promise.reject(error);
      }
      return Promise.resolve(response.data);
    } else {
      const message = response.data.error || response.data.msg;
      return Promise.reject(new Error(message));
    }
  },
  error => {
    if (error.response.status === 401) {
      error.msg = error.response.data.msg;
    }
    const message = error.response.data.error || error.response.data.msg;
    error.message = message;
    return Promise.reject(error);
  }
);

export default service;
