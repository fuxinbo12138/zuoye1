let _Vue = null;

export default class VueRouter {
  static install(Vue) {
    //判断当前插件是否已经被安装
    if (VueRouter.install.installed) {
      return;
    }
    VueRouter.install.installed = true;
    //把vue构造函数记录到全局变量
    _Vue = Vue;
    //把创建vue实例时传入的router对象注入到每个vue实例中

    //混入
    _Vue.mixin({
      beforeCreate() {
        //混入的时候，在beforeCreate中才能获取到vue实例
        if (this.$options.router) {
          //组件中没有this.$options.router， vue实例中有这个参数
          _Vue.prototype.$router = this.$options.router;
          //调用init方法初测组件和routerMap
          this.$options.router.init();
        }
      }
    });
  }
  constructor(options) {
    this.options = options;
    this.routerMap = {};
    this.data = _Vue.observable({
      current: "/"
    });
  }
  init() {
    this.initRouterMap();
    this.initComponents(_Vue);
    this.initEvent();
  }
  initRouterMap() {
    // 帮我们遍历所有的路由规则，以键值对的形式储存到routerMap中
    this.options.routes.forEach(route => {
      this.routerMap[route.path] = route.component;
    });
  }
  initComponents(Vue) {
    let self = this;
    //创建router-link组件
    Vue.component("router-link", {
      props: {
        to: String
      },
      //a标签可以直接跳转锚点不会刷新页面
      template: `<a :href="'#'+to"><slot></slot></a>`,
    });

    //创建router-view组件
    Vue.component("router-view", {
      render(h) {
        const component = self.routerMap[self.data.current];
        return h(component);
      }
    });
  }
  initEvent() {
    //监听hash变化并将变化之后的值截取掉#
    window.addEventListener("hashchange", () => {
      this.data.current = window.location.hash.substr(1);
    });
  }
//   push(data) {
//     history.pushState({}, "", data.path);
//     this.data.current = data.path;
//   }
}
