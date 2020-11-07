<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="img in topImages">
      <img :src="getImage(img)">
    </swiper-item>
  </swiper>

</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name: "DetailSwiper",
  props:{
      topImages:{
        type:Array,
        default(){
          return []
        }
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods:{
    getImage(img){
      return 'http:'+img;
    }
  }
}
</script>

<style scoped>
.detail-swiper{
  height: 300px;
  overflow: hidden;
}
</style>