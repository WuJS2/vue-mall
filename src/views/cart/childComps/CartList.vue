<template>
  <div class="cart-list">
    <scroll class="content">
      <cart-list-item v-for="(item,index) in carList" :item-info="item" :key="index"></cart-list-item>

    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import CartListItem from "@/views/cart/childComps/CartListItem";
import {mapGetters} from 'vuex'

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },

  computed: {
    ...mapGetters(['carList'])
  }
}
</script>

<style scoped>
.cart-list {
  height: calc(100vh - 44px - 49px);
}

.content {
  height: 100%;
  overflow: hidden;
}
</style>
