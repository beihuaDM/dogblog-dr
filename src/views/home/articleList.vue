<template>
  <div class="articleList">
    <div class="articleList-title">{{ title }}</div>
    <div
      v-for="(item,index) in data"
      :key="item.id"
      class="articleList-item"
    >
      {{ index + 1 }}.{{ item.title }}
    </div>
    <div class="articleList-more">查看更多</div>
  </div>
</template>

<script>

export default {
  name: 'ArticleList',
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

    };
  },
  computed: {},
  watch: {},
  created() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>
<style lang='scss' scoped>
.articleList {
  width: 290px;
  height: 350px;
  background-color: #eab92d;
  padding: 23px 16px 13px;
  overflow: hidden;
  &-title {
    font-size:20px;
    color: #fff;
    margin-bottom: 8px;
    font-weight: bold;
  }
  &-item {
    font-size: 14px;
    color:#2b2b2b;
    line-height: 24px;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
  }
  &-item:hover {
    color: #000;
  }
  &-more {
    width: 70px;
    height: 26px;
    background-color: #2b2b2b;
    color: #eab92d;
    line-height: 26px;
    text-align: center;
    font-size: 14px;
    margin: 0 auto;
    margin-top: 10px;
    cursor: pointer;
  }
  &-more:hover {
    background-color: #000;
  }
}
</style>
