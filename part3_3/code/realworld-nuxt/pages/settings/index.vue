<template>
  <div>
    <div class="settings-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Your Settings</h1>

            <form @submit.prevent="submit">
              <fieldset>
                <fieldset class="form-group">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    v-model="userForm.user.image"
                  />
                </fieldset>

                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    v-model="userForm.user.username"
                  />
                </fieldset>

                <fieldset class="form-group">
                  <textarea
                    class="form-control form-control-lg"
                    rows="8"
                    placeholder="Short bio about you"
                    v-model="userForm.user.bio"
                  ></textarea>
                </fieldset>

                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    disabled
                    v-model="userForm.user.email"
                  />
                </fieldset>

                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    v-model="userForm.user.password"
                  />
                </fieldset>

                <button class="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { update, getUser } from "@/api/user.js";
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  name: "settingPage",
  middleware: "authenticated",
  data() {
    return {
      userForm: {
        user: {
          username: "",
          email: "",
          password: "",
          image: "",
          bio: ""
        }
      }
    };
  },
  created() {
    getUser().then(({data}) => {
      this.userForm.user = data.user
    })
  },
  methods: {
    submit() {
      update(this.userForm)
        .then(({ data }) => {

          this.$store.commit("setUser", data.user);
          Cookie.set("user", data.user);

          this.$router.push({ name: "home" });
        })
        .catch(err => {
          console.log(err)
          this.errors = err.response.data.errors;
        });
    }
  }
};
</script>
<style lang="scss" scoped></style>
