<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="comment"
  >
    <!-- 顶部banner部分 -->
    <div class="comment-banner">
      <img
        class="comment-banner-img"
        src="../../assets/images/image6_gwly.png"
      >
      <Head />
      <img
        class="comment-banner-logo"
        src="../../assets/images/logo.png"
      >
      <div class="comment-banner-text">
        <div class="text-wrap">
          <div class="line" />
          <div class="main">给我留言</div>
        </div>
        <div class="sub">Leave Message</div>
      </div>
    </div>
    <!-- 关于我部分 -->
    <div class="comment-wrap">
      1111
    </div>
    <!-- 底部大图 -->
    <div class="comment-footImg">
      <img
        class="comment-footImg-img"
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
import Foot from '@/components/Footer';

export default {
  name: '',
  components: {
    Head,
    Foot
  },
  data() {
    return {
      loading: false // 全屏loading
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
.comment {
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
        margin-left: 20px;
      }
    }
  }
  &-wrap {
    width: 494px;
    margin: 0 auto;
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
