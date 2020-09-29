<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="home"
  >
    <!-- 顶部banner部分 -->
    <div class="home-banner">
      <img
        class="home-banner-img"
        src="../../assets/images/image1_home.png"
      >
      <Head />
      <img
        class="home-banner-logo"
        src="../../assets/images/logo.png"
      >
      <div class="home-banner-text">
        梯子的梯阶从来不是用来搁脚的，它只是让人们的脚放上一段时间，以便让别一只脚能够再往上登。
      </div>
    </div>
    <!-- 作品集 -->
    <WorkList />
    <!-- 热门文章和最新发布 -->
    <div class="home-artList">
      <img
        class="home-artList-img"
        src="../../assets/images/image3_icon.png"
      >
      <div class="home-artList-wrap">
        <ArticleList
          :title="'热门文章'"
          :data="popularArticle"
        />
        <ArticleList
          :title="'最新发布'"
          :data="newArticle"
        />
      </div>
    </div>
    <!-- 关于我 -->
    <AboutMe />
    <!-- 大图 -->
    <div class="home-footImg">
      <img
        class="home-footImg-img"
        src="../../assets/images/image5_home.png"
        alt=""
      >
    </div>
    <!-- 版权说明 -->
    <Foot />
  </div>
</template>

<script>
import Head from '@/components/Head'
import WorkList from './workList.vue'
import ArticleList from './articleList.vue'
import AboutMe from './aboutme.vue'
import Foot from '@/components/Footer'
import { getArticleList } from '@/api/article';
import _ from 'lodash';
import moment from 'moment';
export default {
  name: 'Home',
  components: {
    Head,
    WorkList,
    ArticleList,
    AboutMe,
    Foot
  },
  data() {
    return {
      loading: false, // 全屏加载
      page: 1, // 当前页
      pageSize: 99999999999, // 每页显示多少条数据
      popularArticle: [], // 热门文章
      newArticle: []// 最新发布
    }
  },
  computed: {},
  watch: {},
  async created() {
    await this.getArticleList(); // 获取文章列表
  },
  mounted() {

  },
  methods: {
    // 获取文章列表
    async getArticleList() {
      try {
        this.loading = true;
        const { result } = await getArticleList({
          page: this.page,
          pageSize: this.pageSize
        });
        this.loading = false;
        const popularArticle = _.cloneDeep(result.rows);
        const newArticle = _.cloneDeep(result.rows);
        popularArticle.sort((a, b) => {
          return b.browse - a.browse
        })
        this.popularArticle = popularArticle.splice(0, 10);
        newArticle.forEach((item, index) => {
          item.createTime = moment(item.createdAt).valueOf();
        })
        newArticle.sort((a, b) => {
          return b.createTime - a.createTime
        });
        this.newArticle = newArticle.splice(0, 10);
      } catch (e) {
        this.loading = false;
        this.$message.error(e.message)
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.home {
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
      width:76px;
      height: 51px;
      left: 34px;
      top: 56px;
      z-index: 2;
    }
    &-text {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      width: 560px;
      font-size: 20px;
      color: #fff;
      line-height: 30px;
      z-index: 2;
    }
  }
  &-artList {
    width: 100%;
    height: 435px;
    position: relative;
    &-img {
      width:100%;
      height: 435px;
      position:absolute;
      z-index: 1;
      top: 0;
      left: 0;
    }
    &-wrap {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      z-index: 2;
      width: 600px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
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
