<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="articleDetail"
  >
    <!-- 顶部banner部分 -->
    <div class="articleDetail-banner">
      <img
        class="articleDetail-banner-img"
        src="../../assets/images/image8_wzfl.png"
      >
      <Head />
      <img
        class="articleDetail-banner-logo"
        src="../../assets/images/logo.png"
      >
      <div class="articleDetail-banner-text">
        <div class="text-wrap">
          <div class="line" />
          <div class="main">文章详情</div>
        </div>
        <div class="sub">Article detail</div>
      </div>
    </div>
    <!-- 详情部分 -->
    <div class="articleDetail-wrap">
      <div class="articleDetail-wrap-message">
        <div class="title">{{ articleDetail.title }}</div>
        <div class="detail">
          <div class="detail-block">
            <dog-icon
              class="detail-block-icon"
              icon-class="iconliulan"
            />
            <span
              class="detail-block-font"
            >浏览{{ articleDetail.browse }}次</span>
          </div>
          <div class="detail-block">
            <dog-icon
              style="font-size:16px"
              class="detail-block-icon"
              icon-class="iconshijian"
            />
            <span class="detail-block-font">{{
              articleDetail.createdAt | formatDate
            }}</span>
          </div>
        </div>
      </div>
      <div class="articleDetail-wrap-content">
        <mavon-editor
          v-model="articleDetail.content"
          style="height: 100%"
          :ishljs="true"
          :default-open="'preview'"
          :editable="false"
          :subfield="false"
          :toolbars-flag="false"
        />
      </div>
    </div>
    <!-- 大图 -->
    <div class="articleDetail-footImg">
      <img
        class="articleDetail-footImg-img"
        src="../../assets/images/image5_home.png"
        alt
      >
    </div>
    <!-- 版权说明 -->
    <Foot />
  </div>
</template>

<script>
import Head from "@/components/Head";
import Foot from "@/components/Footer";
import { getArticleDetail, updateBrowse } from "@/api/article";

export default {
  name: "ArticleDetail",
  components: {
    Head,
    Foot
  },
  data() {
    return {
      loading: false, // 全屏加载
      articleDetail: {} // 文章详情
    };
  },
  computed: {},
  watch: {},
  async created() {
    await this.updateBrowse({
      id: this.$route.query.id
    }); // 更新文章浏览量
    await this.getArticleDetail({
      id: this.$route.query.id
    }); // 获取文章详情
  },
  mounted() {},
  methods: {
    // 更新文章浏览量
    async updateBrowse(params) {
      try {
        await updateBrowse(params);
      } catch (e) {
        this.$message.error(e.message);
      }
    },
    // 获取文章详情
    async getArticleDetail(params) {
      try {
        this.loading = true;
        const { result } = await getArticleDetail(params);
        this.loading = false;
        this.articleDetail = result;
      } catch (e) {
        this.loading = false;
        this.$message.error(e.message);
      }
    }
  }
};
</script>
<style lang="scss">
.articleDetail {
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
  &-wrap {
    width: 494px;
    margin: 0 auto;
    &-message {
      border-bottom: 1px solid #f2f2f2;
      .title {
        font-size: 20px;
        color: #333;
        margin-bottom: 20px;
        font-weight: bold;
      }
      .detail {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 15px;
        &-block {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-right: 14px;
          &-icon {
            font-size: 21px;
            margin-right: 5px;
            color: #808080;
          }
          &-font {
            font-size: 12px;
            color: #808080;
          }
        }
      }
    }
    &-content {
      padding-top: 20px;
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
  .v-note-wrapper.shadow {
    box-shadow: none !important;
    .v-show-content {
      background-color: #fff !important;
    }
  }
}
</style>
