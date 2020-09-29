<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="workList"
  >
    <!-- 顶部banner部分 -->
    <div class="workList-banner">
      <img
        class="workList-banner-img"
        src="../../assets/images/image10_zpj.png"
      >
      <Head />
      <img
        class="workList-banner-logo"
        src="../../assets/images/logo.png"
      >
      <div class="workList-banner-text">
        <div class="text-wrap">
          <div class="line" />
          <div class="main">作品集</div>
        </div>
        <div class="sub">Portfolio</div>
      </div>
    </div>
    <!-- 作品集列表 -->
    <div
      v-if="workList.length >0"
      class="workList-wrap"
    >
      <div
        v-for="item in workList"
        :key="item.id"
        class="workList-wrap-block"
        @click="goDetail(item)"
      >
        <div
          class="modal"
          @mouseover="mouseover"
        >
          <div class="modal-text">{{ item.title }}</div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="workList-noData"
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
      :hidden="total<10"
      :total="total"
      :page.sync="page"
      :limit.sync="pageSize"
      @pagination="getWorkList"
    />
    <!-- 大图 -->
    <div class="workList-footImg">
      <img
        class="workList-footImg-img"
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
import Pagination from '@/components/Pagination';
import { getArticleList } from '@/api/article';

export default {
  name: '',
  components: {
    Head,
    Pagination,
    Foot
  },
  data() {
    return {
      workListId: 10, // 作品集id
      loading: false, // 全屏加载
      page: 1, // 当前页
      pageSize: 10, // 每页显示多少条数据
      total: 0, // 一共多少条数据
      workList: [] // 作品集列表
    };
  },
  computed: {},
  watch: {},
  async created() {
    await this.getWorkList(); // 获取作品集
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
    // 获取作品集
    async getWorkList() {
      try {
        this.loading = true;
        const { result } = await getArticleList({
          category_id: this.workListId,
          page: this.page,
          pageSize: this.pageSize
        });
        this.loading = false;
        this.workList = result.rows;
        this.total = result.count;
        this.$nextTick(() => {
          const workListWrap = document.querySelector('.workList-wrap')
          const childrenCount = workListWrap.childElementCount;
          childrenCount > 1 ? workListWrap.className += ' gltOne' : workListWrap.className += ' onlyOne'
        })
      } catch (e) {
        this.loading = false;
        this.$message.error(e.message)
      }
    },
    // 鼠标滑过作品集
    mouseover(e) {
      const element = e.currentTarget;
      element.className += ' modalmouseout';
    }
  }
}
</script>
<style lang='scss' scoped>
.workList {
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
        margin-left: 30px;
      }
    }
  }
  &-wrap {
    width:600px;
    margin: 0 auto;
    overflow: hidden;
    &-block {
      width: 276px;
      height: 150px;
      background: url('../../assets/images/iamge9_wzxqy.png') no-repeat;
      background-size: cover;
      cursor: pointer;
      margin-bottom:30px;
      overflow: hidden;
      .modal {
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.7);
        display: flex;
        opacity: 0;
        justify-content: center;
        align-items: center;
        &-text {
          font-size: 20px;
          font-weight: bold;
          color: #eab92d;
        }
      }
      .modalmouseout {
        animation: yidong1 0.8s;
        transform: translateY(150px);
        animation-fill-mode: forwards;
      }
    }
    &-block:hover .modal {
      animation: yidong 0.8s;
      transform: translateY(0);
      animation-fill-mode: forwards;
    }
    @keyframes yidong {
      from {
        opacity: 0;
        transform: translateY(150px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes yidong1 {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(150px);
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
  &-footImg {
  width: 100%;
  height: 230px;
  &-img {
    width: 100%;
    height: 230px;
  }
  }
  .onlyOne {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .gltOne .workList-wrap-block:nth-child(odd) {
    float: left;
  }
  .gltOne .workList-wrap-block:nth-child(even) {
    float: right;
  }
}
</style>
