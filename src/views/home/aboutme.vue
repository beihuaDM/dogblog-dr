<template>
  <div class="aboutme">
    <div class="aboutme-title">
      <div class="aboutme-title-main">关于我</div>
      <div class="aboutme-title-sub">about me</div>
    </div>
    <div class="aboutme-block">
      <span class="aboutme-block-key">姓名：</span>
      <span class="aboutme-block-value">dog君</span>
    </div>
    <div class="aboutme-block">
      <span class="aboutme-block-key">性别：</span>
      <span class="aboutme-block-value">男</span>
    </div>
    <div class="aboutme-block">
      <span class="aboutme-block-key">星座：</span>
      <span class="aboutme-block-value">双子座</span>
    </div>
    <div class="aboutme-block">
      <span class="aboutme-block-key">毕业院校：</span>
      <span class="aboutme-block-value">北京化工大学</span>
    </div>
    <div class="aboutme-block">
      <span class="aboutme-block-key">职业：</span>
      <span class="aboutme-block-value">前端开发工程师</span>
    </div>
    <div class="aboutme-block">
      <div class="aboutme-block-key">自我说明：</div>
      <div class="aboutme-block-value">大家好，我是dog君，一名95后前端小兵。一次偶然的机会，让我接触到了前端。在前端领域也历练了一段时间，深知自身存在很大的不足。所谓修身治国齐家平天下，第一步，是提升自我价值。从点滴小事做起，有时候，大的成就，往往是一些平凡的小事反复做形成量的积累最后产生质的变化。路在脚下，且行且珍惜。</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AboutMe',
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

  },
  methods: {

  }
}
</script>
<style lang='scss' scoped>
.aboutme {
  width: 600px;
  margin: 0 auto;
  &-title {
    width: 100%;
    padding-bottom: 20px;
    margin-bottom:20px;
    border-bottom: 6px solid #eab92d;
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
  &-block {
    font-size: 14px;
    color: #333;
    line-height: 26px;
    &-key {
      font-weight:bold;
    }
  }
}
</style>
