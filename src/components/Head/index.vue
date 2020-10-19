<template>
  <div class="head">
    <div class="nav">
      <div class="nav-left">
        <router-link
          v-for="item in navItems"
          :key="item.id"
          :to="item.path"
          class="nav-left-item"
        >{{ item.name }}</router-link>
      </div>
      <div class="nav-right">
        <a
          href="https://github.com/beihuaDM"
        ><dog-icon
          icon-class="icongithub"
        /></a>
        <!-- <dog-icon icon-class="iconshare" /> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      navItems: [
        {
          id: 1,
          name: "首页",
          path: "/"
        },
        {
          id: 2,
          name: "文章分类",
          path: "/category"
        },
        {
          id: 3,
          name: "作品集",
          path: "/workList"
        },
        {
          id: 4,
          name: "关于我",
          path: "/me"
        },
        {
          id: 5,
          name: "给我留言",
          path: "/comment"
        }
      ]
    };
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.head {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 17px 34px;
    color: #fff;
    &-left {
      &-item {
        margin-right: 22px;
        font-size: 14px;
      }
    }
    &-right {
      .icon {
        font-size: 16px;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
