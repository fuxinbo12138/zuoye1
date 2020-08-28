<template>
  <div>
    <div class="article-page">
      <div class="banner">
        <div class="container">
          <h1>{{ article.title }}</h1>
          <div class="article-actions">
            <user
              @changeFollow="follow"
              @changeFavorite="favorite"
              :article="article"
            />
          </div>
        </div>
      </div>

      <div class="container page">
        <div class="row article-content">
          <div class="col-md-12" v-html="article.body"></div>
        </div>

        <hr />

        <div class="article-actions">
          <user :article="article" />
        </div>

        <div class="row">
          <comment
            @changeFollow="follow"
            @changeFavorite="favorite"
            :article="article"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticlesDetail } from "@/api/article.js";
import MarkdownIt from "markdown-it";
import user from "./components/user";
import comment from "./components/comment";
export default {
  name: "articlePage",
  components: { user, comment },
  async asyncData({ params }) {
    let slug = params.slug;
    const { data } = await getArticlesDetail(slug);
    const { article } = data;
    const md = new MarkdownIt();
    data.article.body = md.render(article.body);
    return {
      article
    };
  },
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.article.description
        }
      ]
    };
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    follow(value) {
      this.article.profile = value;
    },
    favorite(value) {
      this.article = value;
    }
  }
};
</script>
<style lang="scss" scoped></style>
