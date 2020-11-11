<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="2" @scrollevent="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommend"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backTop" class="back-top" v-show="isShowBackTop">
    </back-top>
  </div>
</template>

<script>

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import Scroll from "components/common/scroll/Scroll";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "components/content/goods/GoodsList";
import DetailBottomBar from "./childComps/DetailBottomBar";
import BackTop from "components/content/backTop/BackTop";
import {backTopMixin} from "@/network/mixin";

import {getDetail, Goods, GoodsParam, Shop, getRecommand} from "network/detail";
import {debounce} from "@/components/common/utils";
import {BACKTOP_DISTANCE} from "@/components/common/const";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      themeTopYs: [],
      getThemeTopY: null,//保存防抖的函数,
      currentIndex: 0,
    }
  },
  mixins: [backTopMixin],
  components: {
    GoodsList,
    DetailParamInfo,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailCommentInfo,
    DetailBottomBar,
    BackTop,
    Scroll
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
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 3. 创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 4. 获取商品信息
      this.detailInfo = data.detailInfo

      // 5. 取出参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

      // 6. 取出评论的信息
      // console.log(data)
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

      // 在这里获取：值不对
      // 原因：this.$refs.params.$el压根没有渲染
      // this.themeTopYs = []
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);


      // 下一帧执行
      this.$nextTick(() => {
        // 在这里获取：值不对
        // 不包含其中的图片
        // 根据最新的数据，对应的 DOM 是已经被渲染出来
        // 但是图片依旧是没有加载完（目前获取到 offsetTop 不包含其中的图片
        //     this.themeTopYs = []
        //     this.themeTopYs.push(0);
        //     this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTopYs)
          }
      );
    });

    // 3. 请求推荐数据
    getRecommand().then(res => {
      // console.log(res);
      this.recommend = res.data.list
    });

    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop-44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44);
      console.log(this.themeTopYs)
    },100);
  },
  mounted() {
    // 有些加了 v-if 判断，没值不会渲染，所以拿到的值时undefined
    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.themeTopYs)
  },
  updated() {
    // this.themeTopYs = []
    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.themeTopYs)
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY()
    },
    titleClick(index) {
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    contentScroll(position) {
      let positionY = -position.y;
      this.isShowBackTop = positionY > BACKTOP_DISTANCE;
      let length = this.themeTopYs.length;
      for (let i=0;i<length ;i++) {
        // if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
        //   console.log(i)
        // }
        if (this.currentIndex != i&& (i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) ||
            (i == length - 1 && positionY >= this.themeTopYs[i])) {
          this.currentIndex = i
          console.log(i)
          this.$refs.nav.currentIndex = this.currentIndex//修改nav总选中的值
        }
      }
    },
    addToCart() {
      // console.log('---')
      // 1. 获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.oldPrice
      product.iid = this.iid
      console.log(this.goods)
      console.log(product)
      this.$store.dispatch('addCart', product);
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
}
</style>