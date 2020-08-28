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

//获取自己信息
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

// 获取用户信息
export const getProfiles = username => {
  return request({
    url: `/api/profiles/${username}`,
    method: "get",
  });
};


// 关注作者
export const follow = username => {
  return request({
    url: `/api/profiles/${username}/follow`,
    method: "post",
  });
};

// 取消关注作者
export const unfollow = username => {
  return request({
    url: `/api/profiles/${username}/follow`,
    method: "delete",
  });
};