<template>
  <div class="col-xs-12 col-md-8 offset-md-2">
    <form class="card comment-form" @submit.prevent="submit">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="comment"
        ></textarea>
      </div>

      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />

        <button class="btn btn-sm btn-primary">
          Post Comment
        </button>
      </div>
    </form>

    <div v-for="item in commentList" :key="item.id" class="card">
      <div class="card-block">
        <p class="card-text">
          With supporting text below as a natural lead-in to additional content.
        </p>
      </div>

      <div class="card-footer">
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: item.author.username
            }
          }"
          class="comment-author"
        >
          <img
            :src="item.author.image"
            class="comment-author-img"
          />
        </nuxt-link>

        &nbsp;

        <a href="" class="comment-author">{{ item.author.username }}</a>
        <span class="date-posted">{{ item.author.createdAt }}</span>
        <span class="mod-options">
          <i class="ion-edit"></i>

          <i class="ion-trash-a"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { createComment, getComments } from "@/api/article.js";
export default {
  name: "compmentComponent",
  components: {},
  props: {
    article: {
      type: Object
    }
  },
  data() {
    return {
      comment: "",
      commentList: []
    };
  },
  computed: {
    user() {
      return this.$store.state.user || {};
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.getCommentList();
  },
  methods: {
    submit() {
      if(!this.$store.state.user) {
          this.$router.push({name: 'login'})
          return
      }
      createComment(this.article.slug, {
        comment: {
          body: this.comment
        }
      }).then(({ data }) => {
          this.commentList.unshift(data.comments[0])
      });
    },
    getCommentList() {
      getComments(this.article.slug).then(({ data }) => {
        this.commentList = data.comments;
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>
