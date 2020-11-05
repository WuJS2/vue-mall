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
  props:{
    probeType:{
      type:Number,
      default: 0
    }
  },
  data(){
    return{
      scroll:null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper,{
      // 0,1 都是不侦测实时的位置
      // 2 在手指滚动的过程中侦测，手指离开后的惯性滚动过程中不侦测
      // 3 只要是滚动，都侦测
      probeType:this.probeType,
      observeDOM:true
    });

    this.scroll.on('scroll',position=>{
      // console.log(position)
      this.$emit('scrollevent', position);
    })
  },
  methods:{
    scrollTo(x, y, time = 500) {
      this.scroll.scrollTo(x, y, time);
    }
  }
}
</script>

<style scoped>

</style>