import Vue from "vue";
import Vuex from "vuex";
// import { getseller } from "../api/shop";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    goodsList: [],
    cartarr: [],
    sellerlist: null,
  },
  mutations: {
    //接受请求商品的参数
    SET_GOODS_LIST(state, o) {
      state.goodsList = o;
    },
    //给购物车增加数量
    SET_GOODS_COUNT(state, o) {
      //看数据是否重复
      const index = state.cartarr.findIndex((v) => v.id === o.id);
      //找到相同数据id,删除以后在添加
      if (index === -1) {
        state.cartarr.push(o);
      }
    },
    //给购物车减少数量
    SET_GOODS_DESCOUNT(state, o) {
      if (o.count === 1) {
        o.count = 0;
        const index = state.cartarr.findIndex((v) => v.id === o.id);
        //找到相同数据id,删除以后在添加
        state.cartarr.splice(index, 1);
        // console.log(state.cartarr);
      }
    },
    //清空数据
    CLAEN(state) {
      for (const v of state.cartarr) {
        v.count = 0;
      }
      state.cartarr = [];
    },
    // 接受商家数据
    SET_SELLER_LIST(state, o) {
      state.sellerlist = o;
    },
  },
  getters: {
    //计算购物车数量综合
    gettotal(state) {
      let total = 0;
      for (const v of state.cartarr) {
        total += v.count;
      }
      console.log(total);
      return total;
    },
    //计算购物车总价
    gettotalprice(state) {
      let totalprice = 0;
      for (const v of state.cartarr) {
        totalprice += v.count * v.price;
      }
      return totalprice;
    },
  },
  actions: {
    // async getseller({ commit }) {
    //   const { data } = await getseller();
    //   commit("SET_SELLER_LIST", data);
    // },
  },
  modules: {},
});
