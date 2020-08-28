<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>

        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  class="nav-link"
                  :to="{ name: 'home', query: { tab: 'your_Feed' } }"
                  :class="{ active: tab === 'your_Feed' }"
                  exact
                  >Your Feed</nuxt-link
                >
              </li>

              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :to="{ name: 'home' }"
                  :class="{ active: tab === 'global_feed' }"
                  exact
                  >Global Feed</nuxt-link
                >
              </li>

              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link" 
                  :to="{ name: 'home', query: { tab: 'tag', tag: tag } }"
                  :class="{ active: tab === 'tab' }"
                  exact
                  >#{{ tag }}</nuxt-link
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
                    query: {
                      page: item,
                      tag: tag,
                      tab: tab
                    }
                  }"
                  >{{ item }}</nuxt-link
                >
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                v-for="item in tags"
                :key="item"
                class="tag-pill tag-default"
                :to="{
                  name: 'home',
                  query: {
                    tab: 'tab',
                    tag: item
                  }
                }"
                >{{ item }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, getFeedArticles, getTags, favoriteArticle, unFavoriteArticle } from "@/api/article.js";
import { mapState } from "vuex";
export default {
  name: "homePage",
  async asyncData({ query }) {
    const page = Number.parseInt(query.page || 1);
    const limit = 20;
    const tag = query.tag;
    const tab = query.tab || 'global_feed';

    let [articlesData, tags] = await Promise.all([
      getArticles({
        limit, // 每页大小
        offset: (page - 1) * limit,
        tag
      }),
      getTags()
    ]);


    let { articlesCount, articles } = articlesData.data;

    articles.forEach(item => {
      item.disabled = false
    })

    tags = tags.data.tags.splice(0, 30)


    return {
      limit,
      page,
      articlesCount,
      articles,
      tags,
      tag,
      tab
    };
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState(["user"]),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    }
  },
  watchQuery: ["page", "tag", "tab"],
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async favorited(article, index) {
      if(!this.$store.state.user) {
          this.$router.push({name: 'login'})
          return
      }
     article.disabled = true
     let onOff = article.favorited
     const handle = onOff ? unFavoriteArticle : favoriteArticle;
     const {data} = await handle(article.slug)
     this.articles.splice(index, 1, data.article)
     this.$set(this.articles[index], 'disabled', false)
    }
  }
};
</script>
<style lang="scss" scoped></style>
