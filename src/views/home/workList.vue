<template>
  <div
    v-if="workList.length > 0"
    class="workList"
  >
    <div class="workList-title">
      <div class="workList-title-main">作品集</div>
      <div class="workList-title-sub">work collection</div>
    </div>
    <div class="workList-wrap">
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
  </div>
</template>

<script>
import { getArticleList } from "@/api/article";

export default {
  name: "WorkList",
  components: {},
  data() {
    return {
      workListId: 10, // 作品集id
      page: 1, // 当前页
      pageSize: 9999999999999, // 请求多少条数据
      pageCount: 4, // 最多显示多少条数据
      workList: [] // 作品集列表
    };
  },
  computed: {},
  watch: {},
  async created() {
    await this.getWorkList(); // 获取作品集
  },
  mounted() {},
  methods: {
    // 点击跳转文章详情
    goDetail(v) {
      const { id } = v;
      this.$router.push({
        path: "/articleDetail",
        query: {
          id
        }
      });
    },
    // 获取作品集
    async getWorkList() {
      try {
        const { result } = await getArticleList({
          category_id: this.workListId,
          page: this.page,
          pageSize: this.pageSize
        });
        this.workList = result.rows.splice(0, this.pageCount);
        this.$nextTick(() => {
          const workListWrap = document.querySelector(".workList-wrap");
          const childrenCount = workListWrap.childElementCount;
          childrenCount > 1
            ? (workListWrap.className += " gltOne")
            : (workListWrap.className += " onlyOne");
        });
      } catch (e) {
        this.$message.error(e.message);
      }
    },
    // 鼠标滑过作品集
    mouseover(e) {
      const element = e.currentTarget;
      element.className += " modalmouseout";
    }
  }
};
</script>
<style lang="scss" scoped>
.workList {
  width: 600px;
  margin: 0 auto;
  overflow: hidden;
  &-title {
    margin-bottom: 20px;
    &-main {
      text-align: center;
      font-size: 18px;
      line-height: 20px;
      color: #333;
      font-weight: bold;
    }
    &-sub {
      text-align: center;
      font-size: 14px;
      line-height: 23px;
      color: #333;
    }
  }
  &-wrap {
    width: 100%;
    &-block {
      width: 276px;
      height: 150px;
      background: url("../../assets/images/dog.jpg") -10px no-repeat;
      background-size: cover;
      cursor: pointer;
      margin-bottom: 30px;
      overflow: hidden;
      .modal {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
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
