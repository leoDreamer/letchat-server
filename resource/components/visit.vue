<template>
  <div class="visit">
    <div class="times">
      <span class="lable">访问数 : </span>
      <span>{{visits}}</span>
    </div>
    <div class="vote">
      <span class="lable">点赞数 : </span>
      <span>{{votes}}</span>
      <Icon type="ios-heart-outline" v-if="!vote" color="red" @click.native="createVote"></Icon>
      <Icon type="ios-heart" v-if="vote" color="red" @click.native="cancelVote"></Icon>
    </div>
  </div>
</template>
<script>
    export default {
        name: "Visit",
        beforeCreate() {
          this.$store.dispatch("getVisits")
        },
        methods: {
          createVote () {
            this.$store.dispatch("createVote")
          },
          cancelVote() {
            this.$Message.info("点了赞还想取消, 简直天真.")
          }
        },
        computed: {
            vote () {
                return this.$store.state.visit.vote;
            },
            votes () {
                return this.$store.state.visit.vote_times;
            },
            visits () {
                return this.$store.state.visit.visits;
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
  .visit {
    position: absolute;
    left: 10px;
    top: 60px;
    font-size: 40px;
    color: #ffffff;
    .lable {
      font-size: 14px;
    }
    .vote {
      display: inline-block;
    }
    .times {
      display: inline-block;
    }
  }
</style>