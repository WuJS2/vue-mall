export default {
    // mutations 唯一的目的就是修改 state 的状态
    // mutations 中的每一个方法尽可能完成的事件比较单一一点
    addCounter(state, payload) {
        payload.count += 1;
    },
    addToCart(state, payload) {
        state.cartList.push(payload);
    }
}
