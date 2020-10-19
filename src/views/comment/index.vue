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
          <div
            v-if="Object.keys(userInfo).length == 0"
            class="noLogin"
          >
            请您先
            <span
              class="operate-btn-text"
              @click="openLoginDialog"
            >登录</span>或
            <span
              class="operate-btn-text"
              @click="openRegistryDialog"
            >注册账号</span>
          </div>
          <div
            v-else
            class="logined"
          >
            尊敬的
            <span class="operate-btn-text">{{ userInfo.nickname }}</span>,欢迎您~
            <span
              class="operate-btn-logout"
              @click="userLogout"
            >退出</span>
          </div>
        </div>
        <div
          class="operate-right"
          @click="handleCreateComment"
        >畅言一下</div>
      </div>
      <div class="comment-title">
        <div class="comment-title-left">
          <div class="line" />
          <div class="title">评论</div>
        </div>
        <div class="comment-title-right">{{ total }}条评论</div>
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
                {{ item.user.nickname.substring(0, 1) }}
              </div>
            </div>
            <div class="right">
              <div class="right-top">
                <div class="right-top-name">{{ item.user.nickname }}</div>
                <div class="right-top-time">
                  {{ item.createdAt | formatDate }}
                </div>
              </div>
              <div class="right-content">{{ item.content }}</div>
              <div class="right-bottom">
                <span
                  style="cursor:pointer"
                  class="right-bottom-text"
                  @click="openReplyDialog(item)"
                >回复</span>
                <div @click="handleVoteUp('comment', item)">
                  <dog-icon icon-class="icondianzan" />
                </div>
                <span
                  class="right-bottom-num"
                  style="margin-right:20px"
                >
                  {{ item.vote_up }}
                </span>
                <div @click="handleVoteDown('comment', item)">
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
                {{ itm.user.nickname.substring(0, 1) }}
              </div>
            </div>
            <div class="right">
              <div class="right-top">
                <div class="right-top-name">{{ itm.user.nickname }}</div>
                <div class="right-top-time">
                  {{ item.createdAt | formatDate }}
                </div>
              </div>
              <div class="right-content">{{ itm.content }}</div>
              <div class="right-bottom">
                <div @click="handleVoteUp('reply', itm)">
                  <dog-icon icon-class="icondianzan" />
                </div>
                <span
                  class="right-bottom-num"
                  style="margin-right:20px"
                >
                  {{ itm.vote_up }}
                </span>
                <div @click="handleVoteDown('reply', itm)">
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
      :hidden="total < 10"
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
        alt
      >
    </div>
    <!-- 版权说明 -->
    <Foot />
    <!-- 回复dialog -->
    <el-dialog
      v-el-drag-dialog
      width="500px"
      title="回复"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      :before-close="cancelReply"
      :visible.sync="replyDialogVisible"
    >
      <el-form
        ref="replyForm"
        :model="replyForm"
        label-width="100px"
        :rules="replyRules"
        auto-complete="off"
        label-position="left"
      >
        <el-form-item
          label="回复内容："
          prop="content"
        >
          <el-input
            v-model="replyForm.content"
            type="textarea"
            placeholder="请输入回复内容"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancelReply">取 消</el-button>
        <el-button
          type="primary"
          :loading="replyLoading"
          @click="commentReply"
        >回 复</el-button>
      </div>
    </el-dialog>
    <!-- 登录dialog -->
    <el-dialog
      v-el-drag-dialog
      width="500px"
      title="登录"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      :before-close="cancelLogin"
      :visible.sync="loginDialogVisible"
    >
      <el-form
        ref="loginForm"
        :model="loginForm"
        label-width="100px"
        :rules="loginRules"
        auto-complete="off"
        label-position="left"
      >
        <el-form-item
          label="邮箱："
          prop="email"
        >
          <el-input
            v-model="loginForm.email"
            placeholder="请输入邮箱"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item
          label="密码："
          prop="password"
        >
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码，6--16位，字母 数字下划线减号"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="userLogin"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancelLogin">取 消</el-button>
        <el-button
          type="primary"
          :loading="loginLoading"
          @click="userLogin"
        >登 录</el-button>
      </div>
    </el-dialog>
    <!-- 注册dialog -->
    <el-dialog
      v-el-drag-dialog
      width="500px"
      title="注册"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      :before-close="cancelRegistry"
      :visible.sync="registryDialogVisible"
    >
      <el-form
        ref="registryForm"
        :model="registryForm"
        label-width="100px"
        :rules="registryRules"
        auto-complete="off"
        label-position="left"
      >
        <el-form-item
          label="邮箱："
          prop="email"
        >
          <el-input
            v-model="registryForm.email"
            placeholder="请输入邮箱"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item
          label="密码："
          prop="password"
        >
          <el-input
            v-model="registryForm.password"
            type="password"
            placeholder="请输入密码，6--16位，字母 数字下划线减号"
            tabindex="2"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item
          label="确认密码："
          prop="confirmPassword"
        >
          <el-input
            v-model="registryForm.confirmPassword"
            type="password"
            placeholder="确认密码与上方相同"
            tabindex="3"
            auto-complete="on"
          />
        </el-form-item>
        <div
          style="display:flex;justify-content:space-between;align-items:flex-start"
        >
          <el-form-item
            label="验证码："
            prop="code"
          >
            <el-input
              v-model="registryForm.code"
              type="text"
              placeholder="请输入验证码"
              tabindex="3"
              auto-complete="on"
            />
          </el-form-item>
          <el-button
            :disabled="disabled"
            type="primary"
            @click="sendCode"
          >
            {{ sendCodeTxt }}
          </el-button>
        </div>
        <el-form-item
          label="昵称："
          prop="nickname"
        >
          <el-input
            v-model="registryForm.nickname"
            type="text"
            placeholder="请输入验证码"
            tabindex="3"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item
          label="性别："
          prop="sex"
        >
          <el-radio-group v-model="registryForm.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="城市："
          prop="city"
        >
          <el-cascader
            v-model="registryForm.city"
            :options="cityOptions"
            @change="changeCity"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancelRegistry">取 消</el-button>
        <el-button
          type="primary"
          :loading="registryLoading"
          @click="userRegistry"
        >注 册</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Head from "@/components/Head";
import Foot from "@/components/Footer";
import Pagination from "@/components/Pagination";
import {
  getCommentList,
  updateCommentVote,
  createComment
} from "@/api/comment";
import { getReplyList, updateReplyVote, createReply } from "@/api/reply";
import { sendVerify, userRegister } from "@/api/user";
import moment from "moment";
import _ from "lodash";
import { validUsername, validPassword } from "@/utils/validate";
import { cityList } from "./city";

export default {
  name: "Comment",
  components: {
    Head,
    Foot,
    Pagination
  },
  filters: {
    formatDate(v) {
      return moment(v).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("用户名格式输入不正确"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!validPassword(value)) {
        callback(new Error("密码格式不正确，6--16位，字母 数字下划线减号"));
      } else {
        callback();
      }
    };
    const validateconfirmPassword = (rule, value, callback) => {
      if (!validPassword(value)) {
        callback(new Error("密码格式不正确，6--16位，字母 数字下划线减号"));
      } else if (value && value !== this.registryForm.password) {
        callback(new Error("密码与确认密码不同"));
      } else {
        callback();
      }
    };
    return {
      loading: false, // 全屏loading
      replyLoading: false, // 回复loading
      loginLoading: false, // 登录loading
      registryLoading: false, // 注册loading
      content: "", // 评论内容
      page: 1, // 当前页
      pageSize: 10, // 每页显示多少条数据
      total: 0, // 一共多少条数据
      commentList: [], // 评论列表
      loginDialogVisible: false, // 登录modal
      registryDialogVisible: false, // 注册modal
      replyDialogVisible: false, // 回复modal
      // 回复
      replyForm: {
        // 回复表单信息
        comment_id: undefined,
        content: ""
      },
      replyRules: {
        // 回复规则
        content: [
          {
            required: true,
            trigger: "blur",
            message: "请输入回复内容"
          }
        ]
      },
      // 登录
      loginForm: {
        // 登录表单信息
        email: "",
        password: ""
      },
      loginRules: {
        // 登录规则
        email: [
          {
            required: true,
            trigger: "blur",
            validator: validateUsername
          }
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            validator: validatePassword
          }
        ]
      },
      // 注册
      registryForm: {
        // 注册表单信息
        email: "",
        password: "",
        confirmPassword: "",
        code: "",
        sex: 1,
        nickname: "",
        city: ""
      },
      registryRules: {
        // 注册规则
        email: [
          {
            required: true,
            trigger: "blur",
            validator: validateUsername
          }
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            validator: validatePassword
          }
        ],
        confirmPassword: [
          {
            required: true,
            trigger: "blur",
            validator: validateconfirmPassword
          }
        ],
        code: [
          {
            required: true,
            trigger: "blur",
            message: "请输入验证码"
          }
        ],
        sex: [
          {
            required: true,
            trigger: "blur",
            message: "请选择性别"
          }
        ],
        nickname: [
          {
            required: true,
            trigger: "blur",
            message: "请输入昵称"
          }
        ],
        city: [
          {
            required: true,
            trigger: "blur",
            message: "请选择城市"
          }
        ]
      },
      disabled: false, // 是否禁用发送验证码
      sendCodeTxt: "发送验证码", // 发送验证码文字
      time: 61, // 倒计时
      intervalTimer: null, // 定时器
      cityOptions: cityList // 城市列表
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  watch: {},
  async created() {
    // 获取评论列表
    await this.getCommentList();
  },
  mounted() {},
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
        result.rows.forEach(item => {
          item.reply = [];
        });
        this.commentList = result.rows;
        this.total = result.count;
        this.getReplyList();
      } catch (e) {
        this.loading = false;
        this.$message.error(e.message);
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
        result.rows.forEach(item => {
          commentList.forEach(itm => {
            if (item.comment_id === itm.id) {
              item.createTime = moment(item.createdAt).valueOf();
              itm.reply.push(item);
            }
          });
        });
        commentList.forEach(item => {
          item.reply.sort((a, b) => {
            return a.createTime - b.createTime;
          });
        });
        this.commentList = commentList;
      } catch (e) {
        this.loading = false;
        this.$message.error(e.message);
      }
    },
    // 点击点赞
    async handleVoteUp(type, v) {
      try {
        if (type === "comment") {
          await updateCommentVote({
            id: v.id,
            type: "vote_up"
          });
        } else {
          await updateReplyVote({
            id: v.id,
            type: "vote_up"
          });
        }
        v.vote_up++;
        this.$forceUpdate();
      } catch (e) {
        this.$message.error("点赞失败");
      }
    },
    // 点击踩
    async handleVoteDown(type, v) {
      try {
        if (type === "comment") {
          await updateCommentVote({
            id: v.id,
            type: "vote_down"
          });
        } else {
          await updateReplyVote({
            id: v.id,
            type: "vote_down"
          });
        }
        v.vote_down++;
        this.$forceUpdate();
      } catch (e) {
        this.$message.error("更新失败");
      }
    },
    // 点击发表评论
    async handleCreateComment() {
      const user = this.$store.state.userInfo;
      if (!user) {
        return this.$message.error("请登录您的账号");
      }
      if (!this.content) {
        return this.$message.warning("请输入您的评论");
      }
      try {
        this.loading = true;
        await createComment({
          content: this.content
        });
        this.loading = false;
        this.$message.success("发布评论成功");
        this.getCommentList();
      } catch (e) {
        this.loading = false;
        this.$message.error(e.message);
      }
    },
    // 点击回复按钮
    openReplyDialog(v) {
      this.replyForm.comment_id = v.id;
      this.replyDialogVisible = true;
    },
    // 用户取消回复
    cancelReply() {
      this.replyForm = {
        comment_id: undefined,
        content: ""
      };
      this.replyLoading = false;
      this.replyDialogVisible = false;
    },
    // 用户点击回复
    async commentReply() {
      this.$refs.replyForm.validate(valid => {
        if (valid) {
          try {
            this.replyLoading = true;
            createReply(this.replyForm);
            this.replyLoading = false;
            this.$message.success("回复成功");
            this.cancelReply();
            this.getCommentList();
          } catch (e) {
            this.replyLoading = false;
            this.$message.error(e.message);
          }
        } else {
          return false;
        }
      });
    },
    // 点击登录按钮
    openLoginDialog() {
      this.loginDialogVisible = true;
    },
    // 用户点击登录
    userLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loginLoading = true;
          this.$store
            .dispatch("userLogin", this.loginForm)
            .then(res => {
              this.loginLoading = false;
              this.$message.success("登录成功");
              setTimeout(() => {
                this.cancelLogin();
              }, 500);
            })
            .catch(err => {
              this.$message.error(err.msg);
              this.$refs["loginForm"].validate();
              this.loginLoading = false;
            });
        } else {
          return false;
        }
      });
    },
    // 用户点击退出
    userLogout() {
      this.$store.dispatch("userLogout");
    },
    // 用户取消登录
    cancelLogin() {
      this.loginForm = {
        email: "",
        password: ""
      };
      this.loginLoading = false;
      this.loginDialogVisible = false;
    },
    // 点击注册账号按钮
    openRegistryDialog() {
      this.registryDialogVisible = true;
    },
    // 点击发送验证码
    async sendCode() {
      if (!validUsername(this.registryForm.email)) {
        return this.$message.error("请正确填写邮箱");
      }
      try {
        this.time = 61;
        this.timer();
        await sendVerify(this.registryForm);
        this.$message.success("验证码发送成功，请您到邮箱查看");
      } catch (e) {
        this.$message.error(e.message);
      }
    },
    // 倒计时
    timer() {
      if (this.time > 0) {
        this.disabled = true;
        this.time--;
        this.sendCodeTxt = `${this.time}秒后重新获取`;
        if (this.intervalTimer) {
          return;
        }
        this.intervalTimer = setInterval(this.timer, 1000);
      } else {
        this.time = 61;
        clearInterval(this.intervalTimer);
        this.sendCodeTxt = "发送验证码";
        this.disabled = false;
      }
    },
    // 用户取消注册
    cancelRegistry() {
      this.registryForm = {
        email: "",
        password: "",
        confirmPassword: "",
        code: "",
        nickname: "",
        sex: 1,
        city: ""
      };
      this.disabled = false;
      this.sendCodeTxt = "发送验证码";
      this.time = 61;
      this.registryLoading = false;
      this.registryDialogVisible = false;
    },
    // 改变城市数据
    changeCity() {
      this.registryForm.city = this.registryForm.city[
        this.registryForm.city.length - 1
      ];
    },
    // 用户点击注册
    userRegistry() {
      this.$refs.registryForm.validate(valid => {
        if (valid) {
          try {
            this.registryLoading = true;
            userRegister(this.registryForm);
            this.registryLoading = false;
            this.$message.success("恭喜您，注册成功");
            this.cancelRegistry();
          } catch (e) {
            this.registryLoading = false;
            this.$message.error(e.message);
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss">
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
      margin-top: 12px;
      margin-bottom: 31px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .operate-left {
        font-size: 14px;
        color: #333;
        .operate-btn-text {
          color: #eab92d;
          font-weight: bold;
          cursor: pointer;
        }
        .operate-btn-logout {
          display: inline-block;
          padding: 4px 6px;
          background-color: #eab92d;
          border-radius: 2px;
          font-size: 12px;
          cursor: pointer;
          font-weight: bold;
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
      border-bottom: 1px solid #f2f2f2;
      padding-bottom: 7px;
      &-left {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .line {
          width: 3px;
          height: 13px;
          background-color: #eab92d;
        }
        .title {
          font-size: 16px;
          color: #333;
          font-weight: bold;
          margin-left: 4px;
        }
      }
      &-right {
        font-size: 12px;
        color: #808080;
      }
    }
    .comment-content-wrap {
      margin-top: 29px;
      .wrap-block {
        border-bottom: 1px dashed #d9d9d9;
        overflow: hidden;
        margin-top: 20px;
      }
      &-block {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 19px;
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
              color: #808080;
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
  .el-dialog__headerbtn:focus .el-dialog__close,
  .el-dialog__headerbtn:hover .el-dialog__close {
    color: #eab92d;
  }
  .el-button:focus,
  .el-button:hover,
  .el-button.el-button--primary.is-disabled {
    color: #fff;
    background-color: #ffdead;
    border-color: #ffdead;
  }
  .el-button--primary {
    background-color: #eab92d;
    border-color: #eab92d;
  }
  .el-button--primary:hover {
    color: #fff;
    background-color: #ffdead;
    border-color: #ffdead;
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: #eab92d;
  }
  .el-radio__input.is-checked .el-radio__inner {
    background-color: #eab92d;
    border-color: #eab92d;
  }
  .el-radio__inner:hover {
    border-color: #eab92d;
  }
  .el-cascader .el-input .el-input__inner:focus,
  .el-cascader .el-input.is-focus .el-input__inner {
    border-color: #eab92d;
  }
}
</style>
