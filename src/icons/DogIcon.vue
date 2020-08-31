<template>
  <i
    class="icon iconfont"
    :class="iconClass"
  />
</template>

<script>

export default {
  name: '',
  components: {},
  props: {
    iconClass: {
      type: String,
      required: true
    }
  },
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
.icon.iconfont {
  font-size:20px;
}
</style>
