<template>
  <div>
    <div class="profile-page">
      <div class="user-info">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-10 offset-md-1">
              <img :src="profile.image" class="user-img" />

              <h4>{{ profile.username }}</h4>

              <p>
                {{ profile.bio }}
              </p>

              <button
                class="btn btn-sm btn-outline-secondary action-btn"
                :class="{ active: profile.following }"
                :disabled="followingDisabled"
                @click="following()"
                v-if="profile.username !== user.username"
              >
                <i class="ion-plus-round"></i>

                &nbsp; Follow {{ profile.username }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <div class="articles-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                  <nuxt-link
                    :to="{
                      name: 'profile',
                      params: {
                        username: username
                      }
                    }"
                    class="nav-link"
                    :class="{ active: tab == 'my' }"
                    exact
                    >My Articles</nuxt-link
                  >
                </li>

                <li class="nav-item">
                  <nuxt-link
                    class="nav-link"
                    :to="{
                      name: 'profile',
                      params: {
                        username: username
                      },
                      query: {
                        tab: 'favorited'
                      }
                    }"
                    :class="{ active: tab == 'favorited' }"
                    exact
                    >Favorited Articles</nuxt-link
                  >
                </li>
              </ul>
            </div>

            <div
              class="article-preview"
              v-for="(article, index) in articles"
              :key="article.slug"
            >
              <div class="article-meta">
                <nuxt-link
                  class="author"
                  :to="`/profile/${article.author.username}`"
                >
                  <img :src="article.author.image" />
                </nuxt-link>

                <div class="info">
                  <nuxt-link
                    class="author"
                    :to="`/profile/${article.author.username}`"
                  >
                    {{ article.author.username }}
                  </nuxt-link>

                  <span class="date">{{ article.createdAt }}</span>
                </div>

                <button
                  :disabled="article.disabled"
                  class="btn btn-outline-primary btn-sm pull-xs-right"
                  :class="{ active: article.favorited }"
                  @click="favorited(article, index)"
                >
                  <i class="ion-heart"></i> {{ article.favoritesCount }}
                </button>
              </div>

              <nuxt-link
                :to="{
                  name: 'article',
                  params: {
                    slug: article.slug
                  }
                }"
                class="preview-link"
              >
                <h1>{{ article.title }}</h1>
                <p>{{ article.description }}</p>
                <span
                  @click="
                    $router.push({
                      name: 'article',
                      params: {
                        slug: article.slug
                      }
                    })
                  "
                  >Read more...</span
                >
              </nuxt-link>
            </div>

            <nav>
              <ul class="pagination">
                <li
                  class="page-item"
                  v-for="item in totalPage"
                  :key="item"
                  :class="{ active: item === page }"
                >
                  <nuxt-link
                    class="page-link"
                    :to="{
                      name: 'home',
                      params: {
                        username: username
                      },
                      query: {
                        page: item,
                        tab: tab
                      }
                    }"
                    >{{ item }}</nuxt-link
                  >
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProfiles, follow, unfollow } from "@/api/user";
import { getArticles, favoriteArticle, unFavoriteArticle } from "@/api/article";
export default {
  name: "profilePage",
  components: {},
  props: {},
  async asyncData({ params, query }) {
    const page = Number.parseInt(query.page || 1);

    const limit = 20;

    const username = params.username;

    const tab = query.tab || "my";

    const author = tab == "my" ? username : "";

    const favorited = tab !== "my" ? username : "";

    let [articlesData, userData] = await Promise.all([
      getArticles({
        limit, // 每页大小
        offset: (page - 1) * limit,
        author,
        favorited
      }),
      getProfiles(username)
    ]);

    let { articlesCount, articles } = articlesData.data;

    const { profile } = userData.data;

    return {
      username,
      limit,
      page,
      articles,
      articlesCount,
      profile,
      tab
    };
  },
  watchQuery: ["tab", 'page'],
  data() {
    return {
      followingDisabled: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  computed: {
    user() {
      return this.$store.state.user || {};
    },
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    }
  },
  methods: {
    async following() {
      if (!this.$store.state.user) {
        this.$router.push({ name: "login" });
        return;
      }
      const article = this.article;
      this.followingDisabled = true;
      let onOff = this.profile.following;
      const handle = onOff ? unfollow : follow;
      const { data } = await handle(this.profile.username);
      this.profile = data.profile
      this.followingDisabled = false;
    },
    async favorited(article, index) {
      if(!this.$store.state.user) {
          this.$router.push({name: 'login'})
          return
      }
      this.$set(this.articles[index], "disabled", true);
      let onOff = article.favorited;
      const handle = onOff ? unFavoriteArticle : favoriteArticle;
      const { data } = await handle(article.slug);
      this.articles.splice(index, 1, data.article);
      this.$set(this.articles[index], "disabled", false);
    }
  }
};
</script>
<style lang="scss" scoped></style>
