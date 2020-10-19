<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { addStatistics } from "@/api/statistics";

export default {
  name: "App",
  async created() {
    await this.addStatistics(); // 添加一条统计信息
  },
  methods: {
    // 添加一条统计信息
    async addStatistics() {
      try {
        await addStatistics();
      } catch (e) {
        this.$message.error(e.message);
      }
    }
  }
};
</script>
