import { getCurrentInstance } from "vue";

// 用于判断是组件还是页面
// 因为uni-app组件生命周期和页面生命周期不同
// 在写composition api时很容易用到, 根据环境不同触发不同生命周期
// 只能在setup中使用
// ref: https://uniapp.dcloud.io/api/window/window.html#getcurrentpages
export function getUniEnvironment() {
  const pages = getCurrentPages();
  const current = pages[pages.length - 1];
  const { proxy: currentInstance } = getCurrentInstance() || {};
  let env: "page" | "component";
  if (current === currentInstance) {
    env = "page";
  } else {
    env = "component";
  }
  console.info("currentEnvironment: ", env);
  return env;
}
