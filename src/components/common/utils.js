// 防抖函数（执行的函数，延时的时间）
export function debounce(func, delay=1000){
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    },delay);
  }
}