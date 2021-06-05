import router from "./router/index";
import { ElMessage } from "element-plus";
// 进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";

//路由拦截器
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.meta.requireAuth) {
    if (localStorage.getItem("uid")) {
      next();
    } else {
      ElMessage.warning({
        message: "还未登录！",
        type: "warning",
      });
      next({
        path: "/login",
      });
    }
  } else {
    next();
  }
});
router.afterEach(() => {
  NProgress.done(); // 进度条结束
});

// 进度条的配置项：ease可以设置css3动画，如ease，linear；speed是进度条从开始到结束的耗时
NProgress.configure({ speed: 500 });
