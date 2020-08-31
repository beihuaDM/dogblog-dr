import router from './router'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式

NProgress.configure({
  showSpinner: false
}) // NProgress 配置

router.beforeEach(async(to, from, next) => {
  // 开启进度条
  NProgress.start()
  next();
})

router.afterEach(() => {
  // 进度条完成
  NProgress.done()
})
