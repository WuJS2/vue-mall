<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad"/>
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from '../../../components/common/swiper';

export default {
  name: 'HomeSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  data(){
    return {
      isLoad: true
    }
  },
  props: {
    banners: {
      type: Array,
      default: []
    }
  },
  methods: {
    imageLoad() {
      if (this.isLoad) {//事件返回一次即可
        this.$emit('swiperImageLoad')
        this.isLoad = false
      }
    }
  }

}
</script>

<style>
</style>