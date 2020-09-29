<template>
  <div class="articleList">
    <div class="articleList-title">{{ title }}</div>
    <div
      v-for="(item,index) in data"
      :key="item.id"
      :title="item.title"
      class="articleList-item"
      @click="goDetail(item)"
    >
      {{ index + 1 }}.{{ item.title }}
    </div>
    <div
      class="articleList-more"
      @click="goCategory"
    >查看更多</div>
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
    // 点击跳转文章详情
    goDetail(v) {
      const { id } = v
      this.$router.push({
        path: '/articleDetail',
        query: {
          id
        }
      })
    },
    // 点击查看更多，跳转文章分类
    goCategory() {
      this.$router.push({
        path: '/category'
      })
    }
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
  position: relative;
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
    cursor: pointer;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom:20px;
  }
  &-more:hover {
    background-color: #000;
  }
}
</style>
