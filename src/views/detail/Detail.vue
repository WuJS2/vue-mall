<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
  </div>
</template>

<script>

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";

import {getDetail,Goods,Shop} from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop:{}
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo
  },
  created() {
    // 1. 保存传入的iid
    this.iid = this.$route.params.id
    // console.log(this.iid)

    // 2. 根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      //1. 获取顶部的图片轮播数据
      let data = res.result;
      this.topImages = data.itemInfo.topImages
      // console.log(this.topImages)

      // 2. 获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      // 3. 创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);
    });
  }
}
</script>

<style scoped>

</style>