<template>
  <div class="head">
    <div class="nav">
      <div class="nav-left">
        <router-link
          v-for="(item,index) in navItems"
          :key="index"
          :to="item.path"
          class="nav-left-item"
        >{{ item.name }}</router-link>
      </div>
      <div class="nav-right">
        <dog-icon icon-class="icongithub" />
        <dog-icon icon-class="iconshare" />
      </div>
    </div>

    <div class="logo">
      <img
        src="../../assets/images/dog-logo.jpg"
        alt="dog君logo"
      >
    </div>
    <div
      v-if="isDesc"
      class="desc"
    >
      梯子的梯阶从来不是用来搁脚的，它只是让人们的脚放上一段时间，以便让别一只脚能够再往上登。
    </div>
    <div
      v-if="isTitle"
      class="title"
    >
      <div class="title-text">{{ titleItem.titleText }}</div>
      <div class="title-en">{{ titleItem.titleEn }}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: '',
  components: {},
  props: {
    isDesc: {
      type: Boolean,
      default: true
    },
    isTitle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      navItems: [
        {
          name: '首页',
          path: '/'
        },
        {
          name: '文章分类',
          path: '/category'
        },
        {
          name: '作品集',
          path: '/workList'
        },
        {
          name: '关于我',
          path: '/me'
        },
        {
          name: '给我留言',
          path: '/comment'
        }
      ],
      titleTextSet: [{
        titleText: '给我留言',
        titleEn: 'leave me a message',
        path: '/comment'
      }, {
        titleText: '作品集',
        titleEn: 'Portfolio',
        path: '/workList'
      }, {
        titleText: '文章分类',
        titleEn: 'Article classification',
        path: '/category'
      },
      {
        titleText: '关于我',
        titleEn: 'about me',
        path: '/me'
      }]
    };
  },
  computed: {
    titleItem() {
      const { path } = this.$route;
      const titleItem = this.titleTextSet.filter((item) => {
        return item.path === path
      })
      if (titleItem.length > 0) {
        return titleItem[0]
      }
      return {}
    }
  },
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

</style>
