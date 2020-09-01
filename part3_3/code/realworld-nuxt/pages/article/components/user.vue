<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          username: article.author.username
        }
      }"
    >
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        class="author"
        :to="{
          name: 'profile',
          params: {
            username: article.author.username
          }
        }"
        >{{ article.author.username }}</nuxt-link
      >

      <span class="date">{{ article.author.createdAt }}</span>
    </div>

    <button
      class="btn btn-sm btn-outline-secondary"
      :class="{ active: article.author.following }"
      :disabled="followingDisabled"
      @click="following()"
    >
      <i class="ion-plus-round"></i>

      &nbsp; Follow {{ article.author.username }}
    </button>

    &nbsp;&nbsp;

    <button
      class="btn btn-sm btn-outline-primary"
      :class="{ active: article.favorited }"
      :disabled="FavoriteFisabled"
      @click="favorited()"
    >
      <i class="ion-heart"></i>

      &nbsp; Favorite Post
      <span class="counter">({{ article.favoritesCount }})</span>
    </button>
  </div>
</template>

<script>
import { favoriteArticle, unFavoriteArticle } from "@/api/article.js";
import { follow, unfollow } from "@/api/user.js";
export default {
  name: "userComponent",
  components: {},
  props: {
    article: {
      type: Object
    }
  },
  data() {
    return {
      followingDisabled: false,
      FavoriteFisabled: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async following() {
      if (!this.$store.state.user) {
        this.$router.push({ name: "login" });
        return;
      }
      const article = this.article;
      this.followingDisabled = true;
      let onOff = article.author.following;
      const handle = onOff ? unfollow : follow;
      const { data } = await handle(article.author.username);
      this.$emit('changeFollow', data.profile)
      this.followingDisabled = false;
    },
    async favorited() {
      if (!this.$store.state.user) {
        this.$router.push({ name: "login" });
        return;
      }
      const article = this.article;
      this.FavoriteFisabled = true;
      let onOff = article.favorited;
      const handle = onOff ? unFavoriteArticle : favoriteArticle;
      const { data } = await handle(article.slug);
      this.$emit('changeFavorite', data.article)
      this.FavoriteFisabled = false;
    }
  }
};
</script>
<style lang="scss" scoped></style>
