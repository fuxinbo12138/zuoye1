export default {
  "nuxt": {
    "host": "0.0.0.0",
    "port": "3000"
  },
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://cdn.jsdelivr.net/npm/ionicons@2.0.1/css/ionicons.min.css",
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic",
      },
      {
        rel: "stylesheet",
        href: "/css/index.css",
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ['~/plugins/request.js'],
  //配置路由规则
  router: {
    linkExactActiveClass: 'active',
    extendRoutes(routes, resolve) {
      routes.splice(0)
      routes.push(...[{
        path: "/",
        component: resolve(__dirname, "pages/layout/index.vue"),
        children: [
          {
            path: "",
            name: "home",
            component: resolve(__dirname, "pages/home/")
          },
          {
            path: "/login",
            name: "login",
            component: resolve(__dirname, "pages/login/")
          },
          {
            path: "/register",
            name: "register",
            component: resolve(__dirname, "pages/login/")
          },
          {
            path: "/profile/:userName",
            name: "profile",
            component: resolve(__dirname, "pages/profile/")
          },
          {
            path: "/settings",
            name: "settings",
            component: resolve(__dirname, "pages/settings/")
          },
          {
            path: "/editor",
            name: "editor",
            component: resolve(__dirname, "pages/editor/")
          },
          {
            path: "/article/:slug",
            name: "article",
            component: resolve(__dirname, "pages/article/")
          }
        ]
      }]);
    },
  },
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [],
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
};
