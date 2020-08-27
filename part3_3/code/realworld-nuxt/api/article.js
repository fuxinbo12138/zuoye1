import { request } from "../plugins/request";

//获取文章列表
export const getArticles = params => {
  return request({
    method: "GET",
    url: "/api/articles",
    params
  });
};

//获取关注文章列表
export const getFeedArticles = params => {
  return request({
    method: "GET",
    url: "/api/articles/feed",
    params
  });
};

//创建文章
export const createdArticle = data => {
  return request({
    method: "post",
    url: "/api/articles",
    data
  });
};


//获取标签
export const getTags = () => {
  return request({
    method: "GET",
    url: "/api/tags"
  });
};

//关注文章
export const favoriteArticle = slug => {
  return request({
    method: "post",
    url: `/api/articles/${slug}/favorite`
  });
};

//取消关注
export const unFavoriteArticle = slug => {
  return request({
    method: "delete",
    url: `/api/articles/${slug}/favorite`
  });
};

//获取文章详情
export const getArticlesDetail = slug => {
  return request({
    method: "get",
    url: `/api/articles/${slug}`
  });
};
