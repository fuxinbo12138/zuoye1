import axios from "axios";

const request = axios.create({
  baseURL: "http://realworld.api.fed.lagounews.com/"
});

export default ({store}) => {

  request.interceptors.request.use( (config) => {
      const user = store.state.user

      if(user && user.token) {
        config.headers['Authorization'] = `Token ${user.token}` 
      }
      return config;
    },
    (error) => {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  // 添加响应拦截器
  
}

export { request };
