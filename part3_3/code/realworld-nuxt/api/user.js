import { request } from "../plugins/request";

//登录
export const login = data => {
  return request({
    url: "/api/users/login",
    method: "post",
    data
  });
};

//注册
export const register = data => {
  return request({
    url: "/api/users",
    method: "post",
    data
  });
};

//注册
export const getUser = data => {
  return request({
    url: "/api/user",
    method: "get",
    data
  });
};

// 更新
export const update = data => {
  return request({
    url: "/api/user",
    method: "put",
    data
  });
};
