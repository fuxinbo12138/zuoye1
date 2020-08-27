<template>
  <div>
    <div class="editor-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-10 offset-md-1 col-xs-12">
            <form>
              <fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Article Title"
                    v-model="EditorForm.article.title"
                    required
                  />
                </fieldset>

                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="What's this article about?"
                    v-model="EditorForm.article.description"
                    required
                  />
                </fieldset>

                <fieldset class="form-group">
                  <textarea
                    class="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    v-model="EditorForm.article.body"
                    required
                  ></textarea>
                </fieldset>

                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter tags"
                    v-model="tag"
                    @keydown="keydown($event)"
                  />
                  <div class="tag-list">
                    <span
                      v-for="(item, index) in EditorForm.article.tagList"
                      :key="item"
                      class="tag-default tag-pill"
                    >
                      <i @click="splice(index)" class="ion-close-round"></i>
                      {{ item }}
                    </span>
                  </div>
                </fieldset>

                <button
                  class="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  @click="submit"
                >
                  Publish Article
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
import { createdArticle } from "@/api/article.js";
export default {
  name: "editorPage",
  middleware: "authenticated",
  components: {},
  data() {
    return {
      tag: "",
      EditorForm: {
        article: {
          title: "",
          description: "",
          body: "",
          tagList: []
        }
      }
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    keydown(e) {
      if (!(e.keyCode == 13)) return;
      if (!this.tag) return;
      if (!this.EditorForm.article.tagList.includes(this.tag)) {
        this.EditorForm.article.tagList.push(this.tag);
      }
      this.tag = "";
    },
    splice(index) {
      this.EditorForm.article.tagList.splice(index, 1);
    },
    submit() {
      createdArticle(this.EditorForm)
        .then(({ data }) => {
          this.$router.push({ name: "home" });
        })
        .catch(err => {
          this.errors = err.response.data.errors;
        });
    }
  }
};
</script>
<style lang="scss" scoped></style>
