<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="me"
  >
    <!-- 顶部banner部分 -->
    <div class="me-banner">
      <img
        class="me-banner-img"
        src="../../assets/images/image7_zpj.png"
      >
      <Head />
      <img
        class="me-banner-logo"
        src="../../assets/images/logo.png"
      >
      <div class="me-banner-text">
        <div class="text-wrap">
          <div class="line" />
          <div class="main">关于我</div>
        </div>
        <div class="sub">About Me</div>
      </div>
    </div>
    <!-- 关于我部分 -->
    <div class="me-wrap">
      <div class="me-wrap-img">
        <img
          src="../../assets/images/personal.jpeg"
          alt=""
        >
      </div>
      <!-- 个人简介 -->
      <div class="me-wrap-title">
        <div class="line" />
        <div class="title">个人简介</div>
      </div>
      <div style="display:flex;justify-content:flex-start;align-items:center">
        <div class="me-wrap-block">
          <span class="me-wrap-block-key">姓名：</span>
          <span class="me-wrap-block-value">dog君</span>
        </div>
        <div
          style="margin-left:20px"
          class="me-wrap-block"
        >
          <span class="me-wrap-block-key">性别：</span>
          <span class="me-wrap-block-value">男</span>
        </div>
        <div
          style="margin-left:20px"
          class="me-wrap-block"
        >
          <span class="me-wrap-block-key">微信：</span>
          <span class="me-wrap-block-value">dm120225</span>
        </div>
        <div
          style="margin-left:20px"
          class="me-wrap-block"
        >
          <span class="me-wrap-block-key">邮箱：</span>
          <span class="me-wrap-block-value">970080063@qq.com</span>
        </div>
      </div>
      <!-- 教育背景 -->
      <div class="me-wrap-title">
        <div class="line" />
        <div class="title">教育背景</div>
      </div>
      <div class="me-wrap-block">
        <span
          class="me-wrap-block-key"
        >2015.9——2019.6&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;北京化工大学（211工程）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;信息科学与技术学院自动化专业&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;专业排名：4/160</span>
      </div>
      <div class="me-wrap-block">
        <span class="me-wrap-block-key">奖学金：</span>
        <span
          class="me-wrap-block-value"
        >浙江中控奖学金（1次）<span
          style="margin-left:20px"
        >人民一等奖学金（1次）</span></span><span style="margin-left:20px">人民二等奖学金（3次）</span>
      </div>
      <div class="me-wrap-block">
        <span class="me-wrap-block-key">荣誉：</span>
        <span
          class="me-wrap-block-value"
        >2015.9&nbsp;军训标兵<span
          style="margin-left:20px"
        >2015.12&nbsp;智能小车大赛竞技类一等奖</span></span><span style="margin-left:20px">2016.10&nbsp;校级三好学生</span><br>
        <span style="margin-left:40px">2017.12&nbsp;社会实践先进个人</span>
        <span style="margin-left:20px">2018.10&nbsp;校级优秀学生干部</span>
        <span style="margin-left:20px">2019.5&nbsp;北京市优秀毕业生</span>
      </div>
      <!-- 个人技能 -->
      <div class="me-wrap-title">
        <div class="line" />
        <div class="title">个人技能</div>
      </div>
      <div class="me-wrap-block">
        <span class="me-wrap-block-key">英语水平： </span>
        <span
          class="me-wrap-block-value"
        >通过 CET-4，具备查阅相关技术文档并在项目中使用能力。
        </span>
      </div>
      <div class="me-wrap-block">
        <span class="me-wrap-block-key">专业技能： </span>
        <div class="me-wrap-block-value">
          1.熟练使用 <span class="bold">html(5)</span> 、<span
            class="bold"
          >css(3)</span>，掌握 <span class="bold">盒模型</span>、<span
            class="bold"
          >浮动</span>、<span class="bold">定位</span>、<span class="bold">百分比</span>、<span class="bold">flex</span>
          等常用页面布局；
        </div>
        <div class="me-wrap-block-value">
          2.熟悉 <span class="bold">JavaScript</span> 原型、闭包、作用域等，熟悉
          <span class="bold">es6</span> 语法，<span class="bold">http</span>
          协议及 <span class="bold">ajax</span> 技术；
        </div>
        <div class="me-wrap-block-value">
          3.熟悉 <span class="bold">React 全家桶</span>，具备<span
            class="bold"
          >模块化</span>，<span class="bold">组件化</span>，<span
            class="bold"
          >公共状态管理</span>，<span class="bold">生命周期思想</span>，有实际项目开发经验。
        </div>
        <div class="me-wrap-block-value">
          4.熟练使用 <span class="bold">Vue 全家桶</span>，掌握
          elementUI，axios，vuex 等常见工具的使用，有实际项目开发经验。
        </div>
        <div class="me-wrap-block-value">
          5.熟悉
          <span class="bold">git，github、gitlab</span> 等团队协作开发规范，了解
          <span class="bold">Node，webpack，gulp，npm</span>
          等前端自动化构建及包管理工具；
        </div>
      </div>

      <!-- 工作经历 -->
      <div class="me-wrap-title">
        <div class="line" />
        <div class="title">工作经历</div>
      </div>
      <div class="me-wrap-block">
        <span
          class="me-wrap-block-key"
        >2018.11——2019.3
          <span style="margin-left:20px">北京字节跳动科技有限公司</span>
          <span style="margin-left:20px">前端开发工程师（实习）</span>
        </span>
      </div>
      <div class="me-wrap-block">
        <span class="me-wrap-block-key">工作内容：</span>
        <span
          class="me-wrap-block-value"
        >今日头条广告数据平台 Data 团队，主做 ABTest 项目 libra
          广告数据平台相关开发工作。产品技术栈主要基于
          <span
            class="bold"
          >react 全家桶（react， redux，redux-thunk，react-router）</span>
          ，对新版广告模块功能进行开发，包括流量配置、数据报警、关键字筛选及基于
          <span class="bold">Echarts</span> 的数
          据图表展现等。与产品经理沟通，明确各需求点，与 UI/UE
          明确交互方式，团队配合进行项目开发工作后 codeReview，提交测试， 修改
          bug，通过字节云提交上线。</span>
      </div>
      <div
        style="margin-top:20px"
        class="me-wrap-block"
      >
        <span
          class="me-wrap-block-key"
        >2019.7——2019.11
          <span style="margin-left:20px">北京启迪区块链集团</span>
          <span style="margin-left:20px">前端开发工程师</span>
        </span>
      </div>
      <div class="me-wrap-block">
        <span class="me-wrap-block-key">工作内容：</span>
        <span
          class="me-wrap-block-value"
        >基础架构部前端开发工程师，主做区块链相关衍生产品如目录链、目录
          API、智能合约、Bass 平台等。产品技术栈主要基于
          <span class="bold">
            Vue 全家桶（vue，vuex，vue-router，element，axios）</span>
          ，独立负责开发公司员工管理系统、赛迪填报系统、目录 API 产品的前端开发
          工作，并按时交付保质保量上线。项目基于
          <span class="bold">
            webpack
          </span>
          构建单页面应用，区块链产品接入业务中台用户中心，基于 RBAC 的角色权
          限访问控制输出用户权限，相关功能模块通过中间层完成与底层链交互，上链等</span>
      </div>

      <div
        style="margin-top:20px"
        class="me-wrap-block"
      >
        <span
          class="me-wrap-block-key"
        >2019.11——至今
          <span style="margin-left:20px">中国软件与技术服务股份有限公司</span>
          <span style="margin-left:20px">前端开发工程师</span>
        </span>
      </div>
      <div class="me-wrap-block">
        <span class="me-wrap-block-key">工作内容：</span>
        <span class="me-wrap-block-value">巴拉巴拉</span>
      </div>
      <!-- 项目经历 -->
      <div class="me-wrap-title">
        <div class="line" />
        <div class="title">项目经历</div>
      </div>
      <div class="me-wrap-block">
        <div class="me-wrap-block-key">目录API智能生成系统</div>
        <div>
          本项目为区块链衍生产品智能 API，通过拖拽方式完成 api
          接口的生成，用户体系接入业务中台，独立完成登录模块、概览模块、
          数据源模块、数据集模块、api 管理模块、血缘关系模块开发工作。技术栈为
          <span
            class="bold"
          >Vue 全家桶（vue，vuex，vue-router，element， axios）</span>。 基于
          <span class="bold">echarts</span>
          完成概览模块、血缘关系模块数据可视化开发，基于
          <span class="bold">jsplumb</span> 完成拖拽创建数据集开发部分，基于
          <span class="bold">Generator</span> 完成拖 拽信息项填写异步流程控制。
        </div>
      </div>
      <div class="me-wrap-block">
        <div class="me-wrap-block-key">渠道推荐系统（个人项目，已上线）</div>
        <div>
          本项目为渠道推荐系统，通过后台完成资源的添加及配置后生成 H5
          链接及二维码，外链转发分享，完成登录模块、资源管理模块、
          配置中心模块、H5 外链模块等功能开发。前端基于
          <span class="bold">vue-cli3</span>
          脚手架生成，配置 <span class="bold">vue.config.js</span> 完成
          <span class="bold">webpack</span> 开发及生产环境相关配 置（<span
            class="bold"
          >cross-env</span>
          配置环境变量），引入
          <span class="bold">eslint+prettier</span> 统一前端代码风格，封装 axios
          请求及响应拦截，loading 状态及全局异常处理。 加入
          <span class="bold">mock</span> 环境模拟请求数据。服务端基于
          <span class="bold">koa2-generator</span> 生成，采用 MVC
          开发模式，技术栈为基于
          <span class="bold">nodejs 的 koa2 全家桶</span>，
          <span class="bold">koa-views</span>
          中间件处理模板机制，<span class="bold">koa-json</span> 处理 post
          请求，<span class="bold">koa2-cors</span> 处理 CORS 跨域问题，采用 aes
          加密算法处理前后端密码等 安全数据传输并存库，采用
          <span class="bold">jsonwebtoken</span> 实现鉴权机制，<span
            class="bold"
          >koa-router</span>
          路由中间件处理请求，对
          <span class="bold">koa-multer</span> 封装处理文件上传及存
          储，数据库使用 <span class="bold">mysql</span> 存储，使用 mysql
          模块封装数据库连接。项目打包，上传 github，配置腾讯云服务器，通过
          <span class="bold">forever</span> 对 nodejs 进程进行管理。
        </div>
      </div>

      <!-- 自我评价 -->
      <div class="me-wrap-title">
        <div class="line" />
        <div class="title">自我评价</div>
      </div>
      <div class="me-wrap-block">
        <span class="me-wrap-block-key">性格：</span>
        <span
          class="me-wrap-block-value"
        >喜欢学习，积极向上，逻辑缜密，热爱生活</span>
      </div>
      <div class="me-wrap-block">
        <span class="me-wrap-block-key">爱好：</span>
        <span class="me-wrap-block-value">跑步，读书、搏击、球类运动。</span>
      </div>
      <div class="me-wrap-block">
        <span class="me-wrap-block-key">自我评价：</span>
        <span
          class="me-wrap-block-value"
        >用心做事做人，在掌握现有技术的同时喜欢接触新技术，追求增加个人技能点，学习能力较强。前端工程化是一个大
          的体系，从脚手架、搭建本地服务器、开发、构建、测试、部署、上线，到大前端体系中服务端渲染，在学习的过程中深感只有
          对整套 web 应用体系有着直观的理解并且有实践经验才能越走越远。从典型的
          MVC 到前后端分离，对团队开发效率及性能、用户
          体验方面发挥着越来越重要的作用。前端工程化的脚步也会随着业务的发展不断壮大。</span>
      </div>
    </div>

    <!-- 底部大图 -->
    <div class="me-footImg">
      <img
        class="me-footImg-img"
        src="../../assets/images/image5_home.png"
        alt=""
      >
    </div>
    <!-- 版权说明 -->
    <Foot />
  </div>
</template>

<script>
import Head from "@/components/Head";
import Foot from "@/components/Footer";

export default {
  name: "",
  components: {
    Head,
    Foot
  },
  data() {
    return {
      loading: false // 全屏loading
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.me {
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
        margin-left: 30px;
      }
    }
  }
  &-wrap {
    width: 625px;
    margin: 0 auto;
    position: relative;
    border-top: 6px solid #eab92d;
    margin-top: 20px;
    &-img {
      position: absolute;
      right: 0;
      top: -200px;
      z-index: 1;
      img {
        width: 140px;
      }
    }
    &-title {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-top: 20px;
      margin-bottom: 20px;
      .line {
        width: 3px;
        height: 18px;
        background-color: #eab92d;
        margin-right: 10px;
      }
      .title {
        font-size: 18px;
        color: #333;
        font-weight: bold;
      }
    }
    &-block {
      font-size: 14px;
      color: #333;
      line-height: 26px;
      &-key {
        font-weight: bold;
      }
      .bold {
        font-weight: bold;
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
