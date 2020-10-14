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
    <!-- 给我留言部分 -->
    <div class="comment-wrap">
      <el-input
        v-model="content"
        type="textarea"
        :rows="4"
        placeholder="来说两句~"
      />
      <div class="comment-operate">
        <div class="operate-left">
          <div class="noLogin">
            请您先<span
              class="operate-btn-text"
              @click="openLoginDialog"
            >登录</span>或<span class="operate-btn-text">注册账号</span>
          </div>
          <!-- <div class="logined">
            尊敬的<span class="operate-btn-text">XXX</span>,欢迎您~
          </div> -->
        </div>
        <div
          class="operate-right"
          @click="handleCreateComment"
        >
          畅言一下
        </div>
      </div>
      <div class="comment-title">
        <div class="comment-title-left">
          <div class="line" />
          <div class="title">评论</div>
        </div>
        <div class="comment-title-right">
          100条评论
        </div>
      </div>
      <div class="comment-content-wrap">
        <div
          v-for="item in commentList"
          :key="item.id"
          class="wrap-block"
        >
          <div class="comment-content-wrap-block">
            <div class="left">
              <div class="left-avatar">
                {{ item.user.nickname.substring(0,1) }}
              </div>
            </div>
            <div class="right">
              <div class="right-top">
                <div class="right-top-name">
                  {{ item.user.nickname }}
                </div>
                <div class="right-top-time">
                  {{ item.createdAt | formatDate }}
                </div>
              </div>
              <div class="right-content">
                {{ item.content }}
              </div>
              <div class="right-bottom">
                <span class="right-bottom-text">
                  回复
                </span>
                <div @click="handleVoteUp('comment',item)">
                  <dog-icon
                    icon-class="icondianzan"
                  />
                </div>
                <span
                  class="right-bottom-num"
                  style="margin-right:20px"
                >{{ item.vote_up }}</span>
                <div @click="handleVoteDown('comment',item)">
                  <dog-icon
                    style="font-size:20px;"
                    icon-class="icondislike-b"
                  />
                </div>
                <span class="right-bottom-num">{{ item.vote_down }}</span>
              </div>
            </div>
          </div>
          <!-- 回复 -->
          <div
            v-for="itm in item.reply"
            :key="itm.id"
            style="float:right;width:460px"
            class="comment-content-wrap-block"
          >
            <div class="left">
              <div class="left-avatar">
                {{ itm.user.nickname.substring(0,1) }}
              </div>
            </div>
            <div class="right">
              <div class="right-top">
                <div class="right-top-name">
                  {{ itm.user.nickname }}
                </div>
                <div class="right-top-time">
                  {{ item.createdAt |formatDate }}
                </div>
              </div>
              <div class="right-content">
                {{ itm.content }}
              </div>
              <div class="right-bottom">
                <div @click="handleVoteUp('reply',itm)">
                  <dog-icon
                    icon-class="icondianzan"
                  />
                </div>
                <span
                  class="right-bottom-num"
                  style="margin-right:20px"
                >{{ itm.vote_up }}</span>
                <div @click="handleVoteDown('reply',itm)">
                  <dog-icon
                    style="font-size:20px;"
                    icon-class="icondislike-b"
                  />
                </div>
                <span class="right-bottom-num">{{ itm.vote_down }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页组件 -->
    <pagination
      :hidden="total<10"
      :total="total"
      :page.sync="page"
      :limit.sync="pageSize"
      @pagination="getCommentList"
    />
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
    <el-dialog
      title="登录"
      el-drag-dialog
      :visible.sync="loginDialogVisible"
    >
      <!-- <el-form
        ref="loginForm"
        label-width="100px"
        :model="loginForm"
        :rules="loginFormRules"
        auto-complete="off"
        label-position="left"
      >
        <el-form-item
          prop="title"
          label="邮箱："
        >
          <el-input
            v-model="listQuery.title"
            style="width:450px"
            placeholder="请输入文章标题"
          />
        </el-form-item>
        <el-form-item
          prop="author"
          label="文章作者："
        >
          <el-input
            v-model="listQuery.author"
            style="width:450px"
            placeholder="请输入文章作者"
          />
        </el-form-item>
        <el-form-item
          label="文章分类："
          prop="category_id"
        >
          <el-select
            v-model="listQuery.category_id"
            placeholder="请选择文章分类"
            style="width:450px"
          >
            <el-option
              v-for="item in categoryData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          prop="description"
          label="文章描述："
        >
          <el-input
            v-model="listQuery.description"
            style="width:450px"
            placeholder="请输入文章描述"
          />
        </el-form-item>
        <el-form-item
          prop="keyword"
          label="文章关键字："
        >
          <el-input
            v-model="listQuery.keyword"
            style="width:450px"
            placeholder="请输入文章简介"
          />
        </el-form-item>
        <el-form-item
          prop="content"
          label="文章内容："
        >
          <mavon-editor
            ref="md"
            v-model="listQuery.content"
            :ishljs="true"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="btnLoading"
            @click="handleCreate"
          >点击创建</el-button>
        </el-form-item>
      </el-form> -->
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogFormVisible = false"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Head from "@/components/Head";
import Foot from '@/components/Footer';
import Pagination from '@/components/Pagination';
import { getCommentList, updateCommentVote } from '@/api/comment';
import { getReplyList, updateReplyVote } from '@/api/reply';
import moment from 'moment';
import _ from 'lodash';

export default {
  name: 'Comment',
  components: {
    Head,
    Foot,
    Pagination
  },
  filters: {
    formatDate(v) {
      return moment(v).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  data() {
    return {
      loading: false, // 全屏loading
      content: '', // 评论内容
      page: 1, // 当前页
      pageSize: 10, // 每页显示多少条数据
      total: 0, // 一共多少条数据
      commentList: [], // 评论列表
      loginDialogVisible: false, // 登录modal
      registryDialogVisible: false // 注册modal
    };
  },
  computed: {},
  watch: {},
  async created() {
    // 获取评论列表
    await this.getCommentList();
  },
  mounted() {

  },
  methods: {
    // 获取评论列表
    async getCommentList() {
      try {
        this.loading = true;
        const { result } = await getCommentList({
          page: this.page,
          pageSize: this.pageSize
        });
        this.loading = false;
        result.rows.forEach((item) => {
          item.reply = []
        })
        this.commentList = result.rows;
        this.total = result.count;
        this.getReplyList();
      } catch (e) {
        this.loading = false;
        this.$message.error(e.message)
      }
    },
    // 获取回复列表
    async getReplyList() {
      try {
        this.loading = true;
        const { result } = await getReplyList({
          page: 1,
          pageSize: 9999999999999999
        });
        this.loading = false;
        const commentList = _.cloneDeep(this.commentList);
        result.rows.forEach((item) => {
          commentList.forEach((itm) => {
            if (item.comment_id === itm.id) {
              item.createTime = moment(item.createdAt).valueOf();
              itm.reply.push(item)
            }
          })
        })
        commentList.forEach((item) => {
          item.reply.sort((a, b) => {
            return a.createTime - b.createTime;
          })
        })
        this.commentList = commentList;
      } catch (e) {
        this.loading = false;
        this.$message.error(e.message)
      }
    },
    // 点击点赞
    async handleVoteUp(type, v) {
      try {
        if (type === 'comment') {
          await updateCommentVote({
            id: v.id,
            type: 'vote_up'
          });
        } else {
          await updateReplyVote({
            id: v.id,
            type: 'vote_up'
          });
        }
        v.vote_up++;
        this.$forceUpdate();
      } catch (e) {
        this.$message.error("点赞失败")
      }
    },
    // 点击踩
    async handleVoteDown(type, v) {
      try {
        if (type === 'comment') {
          await updateCommentVote({
            id: v.id,
            type: 'vote_down'
          });
        } else {
          await updateReplyVote({
            id: v.id,
            type: 'vote_down'
          });
        }
        v.vote_down++;
        this.$forceUpdate();
      } catch (e) {
        this.$message.error("更新失败")
      }
    },
    // 点击发表评论
    async handleCreateComment() {
      const user = this.$store.state.user;
      if (!user) {
        return this.$message.error("请登录您的账号");
      }
      if (!this.content) {
        return this.$message.warning("请输入您的评论");
      }
    },
    // 点击登录按钮
    openLoginDialog() {

    },
    // 点击注册账号按钮
    openRegistryDialog() {

    }
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
    .comment-operate {
      margin-top:12px;
      margin-bottom: 31px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .operate-left {
        font-size: 14px;
        color: #333;
        .operate-btn-text {
          color:#eab92d;
          font-weight:bold;
          cursor: pointer;
        }
      }
      .operate-right {
        width: 84px;
        height: 32px;
        background-color: #eab92d;
        border-radius: 3px;
        font-size: 14px;
        color: #333;
        line-height: 32px;
        text-align: center;
        margin-right: 34px;
        cursor: pointer;
        font-weight: bold;
      }
    }
    .comment-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom:1px solid #f2f2f2;
      padding-bottom: 7px;
      &-left {
        display: flex;
        justify-content: flex-start;
        align-items:center;
        .line {
          width: 3px;
          height: 13px;
          background-color: #eab92d;
        }
        .title {
          font-size: 16px;
          color: #333;
          font-weight: bold;
          margin-left:4px;
        }
      }
      &-right {
        font-size: 12px;
        color: #808080;
      }
    }
    .comment-content-wrap {
      margin-top:29px;
      .wrap-block {
        border-bottom:1px dashed #d9d9d9;
        overflow: hidden;
      }
      &-block {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom:19px;
        .left {
          margin-right: 11px;
          &-avatar {
            width: 35px;
            height: 35px;
            line-height: 35px;
            text-align: center;
            color: #fff;
            background-color: grey;
            border-radius: 50%;
          }
        }
        .right {
          flex: 1;
          &-top {
            margin-top: 9px;
            margin-bottom: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            &-name {
              font-size: 14px;
              color: #333;
            }
            &-time {
              font-size: 12px;
              color: #cacaca;
            }
          }
          &-content {
            font-size: 14px;
            color: #808080;
            width: 100%;
            margin-bottom: 13px;
          }
          &-bottom {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-bottom: 17px;
            &-text {
              font-size: 13px;
              color: #808080;
              margin-right: 7px;
            }
            &-num {
              margin-left: 6px;
              font-size: 13px;
              color:#808080;
            }
            i.icon.iconfont {
              font-size: 22px;
              color: #d7d7d7;
              cursor: pointer;

            }
          }
        }
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
}
</style>
