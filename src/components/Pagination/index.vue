<template>
  <div
    :class="{'hidden':hidden}"
    class="pagination-container"
  >
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      :layout="layout"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'

export default {
  name: 'Pagination',
  props: {
    total: { // 数据总数
      required: true,
      type: Number
    },
    page: { // 当前页
      type: Number,
      default: 1
    },
    limit: { // 每页显示多少条数据
      type: Number,
      default: 10
    },
    pageSizes: { // 每页显示个数
      type: Array,
      default() {
        return [10, 20, 30, 40, 50]
      }
    },
    background: { // 是否为分页按钮添加背景颜色
      type: Boolean,
      default: true
    },
    hidden: { // 是否隐藏分页组件
      type: Boolean,
      default: false
    },
    layout: { // 分页组件布局排列方案
      type: String,
      default: 'prev,pager,next, jumper, sizes, total'
    },
    autoScroll: { // 自动回到顶部
      type: Boolean,
      default: true
    }
  },
  computed: {
    currentPage: { // 当前页
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val) // 子组件更新父组件方法
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pagination', { page: this.currentPage, pageSize: val })
      if (this.autoScroll) {
        scrollTo(0, 0)
      }
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, pageSize: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 0)
      }
    }
  }
}
</script>

<style lang='scss'>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
  .el-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    &.is-background .el-pager li:not(.disabled).active {
      background-color: #eab92d;
    }
    &.is-background .el-pager li:not(.disabled):hover {
      color: #eab92d;
    }
  }

}
.pagination-container.hidden {
  display: none;
}
</style>
