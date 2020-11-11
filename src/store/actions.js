export default {
    addCart(context, payload) {
        // payload 新添加的商品
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
        // for (let item of state.cartList) {
        //     if (item.iid === payload.iid) {
        //         oldProduct = item;
        //     }
        // }

        // 2. 判断 oldProduct
        if (oldProduct) {
            context.commit('addCounter', oldProduct);
            // oldProduct.count += 1;
        } else {
            payload.count = 1;
            // state.cartList.push(payload);
            context.commit('addToCart', payload);
        }
    }
}