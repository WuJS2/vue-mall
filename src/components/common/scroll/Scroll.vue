<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {//上拉加载更多
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // 1 创建 BScroll 对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 0,1 都是不侦测实时的位置
      // 2 在手指滚动的过程中侦测，手指离开后的惯性滚动过程中不侦测
      // 3 只要是滚动，都侦测
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      observeDOM: true
    });

    // 2 监听滚动位置
    this.scroll.on('scroll', position => {
      // console.log(position)
      this.$emit('scrollevent', position);
    })

    // 3 监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        // console.log('上拉加载更多')
        this.$emit('pullingUp')
      });
    }
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh(){
      console.log('00000000000')
      this.scroll.refresh();
    }
  }
}
</script>

<style scoped>

</style>