<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="category"
  >
    <!-- 顶部banner部分 -->
    <div class="category-banner">
      <img
        class="category-banner-img"
        src="../../assets/images/image8_wzfl.png"
      >
      <Head />
      <img
        class="category-banner-logo"
        src="../../assets/images/logo.png"
      >
      <div class="category-banner-text">
        <div class="text-wrap">
          <div class="line" />
          <div class="main">文章分类</div>
        </div>
        <div class="sub">Article classification</div>
      </div>
    </div>
    <!-- 分类列表 -->
    <div class="category-list">
      <div
        v-for="item in categoryList"
        :key="item.id"
        class="category-list-block"
        :class="{ active: item.id === activeId }"
        @click="handleGetArticleList(item)"
      >
        {{ item.name }}
      </div>
    </div>
    <!-- 文章列表 -->
    <div
      v-if="articleList.length > 0"
      class="category-articleList"
    >
      <article-card
        v-for="item in articleList"
        :key="item.id"
        :data="item"
      />
    </div>
    <div
      v-else
      class="category-articleList-noData"
    >
      <div class="noData">
        <div class="noData-icon">
          <dog-icon
            style="font-size:100px"
            icon-class="iconzanwushuju"
          />
        </div>
        <div class="noData-text">暂无数据</div>
      </div>
    </div>
    <!-- 分页组件 -->
    <pagination
      :hidden="total < 10"
      :total="total"
      :page.sync="page"
      :limit.sync="pageSize"
      @pagination="getArticleList"
    />
    <!-- 大图 -->
    <div class="category-footImg">
      <img
        class="category-footImg-img"
        src="../../assets/images/image5_home.png"
        alt=""
      >
    </div>
    <!-- 版权说明 -->
    <Foot />
  </div>
</template>

<script>
import Head from "@/components/Head";
import Foot from "@/components/Footer";
import Pagination from "@/components/Pagination";
import articleCard from "@/components/ArticleCard";
import { getCategoryList } from "@/api/category";
import { getArticleList } from "@/api/article";

export default {
  name: "",
  components: {
    Head,
    Foot,
    Pagination,
    articleCard: articleCard
  },
  data() {
    return {
      loading: false, // 全屏加载
      categoryList: [], // 分类列表
      activeId: 1, // 当前展示该分类下的文章的分类id
      page: 1, // 当前页
      pageSize: 10, // 每页显示多少条数据
      total: 0, // 一共多少条数据
      articleList: [] // 文章列表
    };
  },
  computed: {},
  watch: {},
  async created() {
    await this.getCategoryList({
      page: 1,
      pageSize: 9999999999999
    }); // 获取分类列表
  },
  mounted() {},
  methods: {
    // 获取分类列表
    async getCategoryList(params) {
      try {
        this.loading = true;
        const { result } = await getCategoryList(params);
        this.loading = false;
        this.categoryList = result.rows;
        this.activeId = result.rows[0].id;
        this.getArticleList();
      } catch (e) {
        this.loading = false;
        this.$message.error(e.message);
      }
    },
    // 获取文章列表
    async getArticleList() {
      try {
        this.loading = true;
        const { result } = await getArticleList({
          category_id: this.activeId,
          page: this.page,
          pageSize: this.pageSize
        });
        this.loading = false;
        this.articleList = result.rows;
        this.total = result.count;
      } catch (e) {
        this.loading = false;
        this.$message.error(e.message);
      }
    },
    // 点击分类，获取分类下文章
    handleGetArticleList(item) {
      if (item.id === this.activeId) {
        return;
      }
      this.activeId = item.id;
      this.page = 1;
      this.getArticleList();
    }
  }
};
</script>
<style lang="scss" scoped>
.category {
  &-banner {
    position: relative;
    width: 100%;
    height: 325px;
    &-img {
      width: 100%;
      height: 325px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
    &-logo {
      position: absolute;
      width: 76px;
      height: 51px;
      left: 34px;
      top: 56px;
      z-index: 2;
    }
    &-text {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;
      .text-wrap {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 10px;
        .line {
          width: 7px;
          height: 28px;
          background-color: #eab92d;
          margin-right: 8px;
        }
        .main {
          font-size: 40px;
          color: #fff;
        }
      }
      .sub {
        font-size: 20px;
        color: #fff;
        margin-left: 8px;
      }
    }
  }
  &-list {
    width: 625px;
    margin: 0 auto;
    overflow: hidden;
    &-block {
      padding: 2px 3px;
      font-size: 14px;
      margin-right: 20px;
      color: #333;
      cursor: pointer;
      text-align: center;
      line-height: 22px;
      float: left;
      margin-bottom: 10px;
    }
    &-block:hover {
      background-color: #f2f2f2;
      border-radius: 3px;
      font-weight: bold;
      color: #eab92d;
    }
    &-block.active {
      color: #eab92d;
      font-weight: bold;
    }
  }
  &-articleList {
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
          line-height: 20px;
          float: left;
        }
        &-createTime {
          margin-left: 16px;
          font-size: 12px;
          color: #808080;
          line-height: 20px;
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
    &-noData {
      width: 625px;
      margin: 0 auto;
      margin-top: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      .noData {
        color: #eee;
        padding-right: 80px;
        &-text {
          text-align: center;
          color: #bbb;
        }
      }
    }
  }
  &-footImg {
    width: 100%;
    height: 230px;
    &-img {
      width: 100%;
      height: 230px;
    }
  }
}
</style>
