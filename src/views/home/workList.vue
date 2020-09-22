<template>
  <div class="workList">
    <div class="workList-title">
      <div class="workList-title-main">作品集</div>
      <div class="workList-title-sub">work collection</div>
    </div>
    <div class="workList-wrap">
      <div class="workList-wrap-block">
        <div
          class="modal"
          @mouseover="mouseover"
        >
          <div class="modal-text">dog君个人博客系统</div>
        </div>
      </div>
      <div class="workList-wrap-block">
        <div
          class="modal"
          @mouseover="mouseover"
        >
          <div class="modal-text">人事管理系统</div>
        </div>
      </div>
      <div class="workList-wrap-block">
        <div
          class="modal"
          @mouseover="mouseover"
        >
          <div class="modal-text">餐饮系统开源项目</div>
        </div>
      </div>
      <div class="workList-wrap-block">
        <div
          class="modal"
          @mouseover="mouseover"
        >
          <div class="modal-text">前端工程化</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'WorkList',
  components: {},
  data() {
    return {

    };
  },
  computed: {},
  watch: {},
  created() {

  },
  mounted() {
    const workListWrap = document.querySelector('.workList-wrap')
    const childrenCount = workListWrap.childElementCount;
    childrenCount > 1 ? workListWrap.className += ' gltOne' : workListWrap.className += ' onlyOne'
  },
  methods: {
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
    width:600px;
    margin: 0 auto;
    overflow: hidden;
  &-title {
    margin-bottom:20px;
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
