<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" :to="{ name: 'register' }"
              >Need an account?</nuxt-link
            >
            <nuxt-link v-else :to="{ name: 'login' }"
              >Have an account?</nuxt-link
            >
          </p>
          <ul class="error-messages">
            <template v-for="(item, key) in errors">
              <li v-for="item1 in item" :key="item1">
                {{ `${key}: ${item1}` }}
              </li>
            </template>
          </ul>

          <form @submit.prevent="submit">
            <fieldset v-if="!isLogin" class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="userForm.user.username"
                required
              />
            </fieldset>

            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                v-model="userForm.user.email"
                required
              />
            </fieldset>

            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="userForm.user.password"
                required
              />
            </fieldset>

            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/user.js";
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  name: "LoginIndex",
  middleware: "notAuthenticated",
  data() {
    return {
      userForm: {
        user: {
          username: "",
          email: "",
          password: ""
        }
      },
      errors: {}
    };
  },

  computed: {
    isLogin() {
      return this.$route.name === "login";
    }
  },
  methods: {
    submit() {
      const handle = this.isLogin ? login : register;
      handle(this.userForm)
        .then(({ data }) => {
          this.$store.commit("setUser", data.user);
          Cookie.set("user", data.user);

          this.$router.push({ name: "home" });
        })
        .catch(err => {
          this.errors = err.response.data.errors;
        });
    }
  }
};
</script>

<style></style>
