<template>
  <div class="articleCard">
    <div
      class="articleCard-block"
    >
      <div class="title">{{ data.title }}</div>
      <div
        :title="data.description"
        class="description"
      >{{ data.description }}</div>
      <div class="bottom">
        <div class="bottom-browse">
          <dog-icon
            style="font-size:12px"
            icon-class="iconliulan"
          /> 浏览{{ data.browse }}次
        </div>
        <div class="bottom-createTime"><dog-icon
          style="font-size:12px"
          icon-class="iconshijian"
        />{{ data.createdAt | formatDate }}</div>
        <div
          class="bottom-more"
          @click="goDetail(data)"
        >阅读全文》</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Article',
  components: {},
  props: {
    data: {
      type: Object,
      default: () => {}
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
    async goDetail(v) {
      const { id } = v
      this.$router.push({
        path: '/articleDetail',
        query: {
          id
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
  .articleCard {
    margin-top: 34px;
    &-block {
      width: 494px;
      padding: 12px 25px;
      background-color: #fff;
      border: 6px solid #eab92d;
      margin: 0 auto;
      margin-bottom: 20px;
      .title {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 14px;
        color: #333;
        font-weight: bold;
        margin-bottom: 11px;
      }
      .description {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        font-size: 12px;
        color: #808080;
        line-height: 20px;
      }
      .bottom {
        margin-top: 15px;
        overflow: hidden;
        &-browse {
          font-size: 12px;
          color: #808080;
          line-height:20px;
          float: left;
        }
        &-createTime {
          margin-left:16px;
          font-size: 12px;
          color: #808080;
          line-height:20px;
          float: left;

        }
        &-more {
          line-height: 20px;
          float: right;
          font-size: 12px;
          color: #3b76d0;
          cursor: pointer;
        }
      }
    }
  }
</style>
