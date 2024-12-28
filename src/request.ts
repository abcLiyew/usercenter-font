import axios from "axios";

const myAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});
// 添加一个请求拦截器
myAxios.interceptors.request.use(
  function (config) {
    // 在发送请求之前执行某项操作
    return config;
  },
  function (error) {
    // 对请求错误执行某些操作
    return Promise.reject(error);
  }
);

// 添加响应侦听器
myAxios.interceptors.response.use(
  function (response) {
    // 任何在 2xx 范围内的状态代码都会导致触发此函数
    // 对响应数据执行某些操作

    const { data } = response;
    // 未登录
    if (data.code === '40100') {
      // 不是获取用户信息接口，或者不是登录页面，则跳转到登录页面
      if (
        !response.request.responseURL.includes("user/current") &&
        !window.location.pathname.includes("/user/login")
      ) {
        window.location.href = `/user/login?redirect=${window.location.href}`;
      }
    }
    return response;
  },
  function (error) {
    // 任何超出 2xx 范围的状态代码都会导致触发此函数
    // 对响应错误执行某些操作
    return Promise.reject(error);
  }
);

export default myAxios;
