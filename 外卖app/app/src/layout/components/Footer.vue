<template>
  <div>
    <div class="f-box">
      <!-- 左边 -->
      <div class="left" @click="show = !show">
        <div
          class="cart"
          :class="gettotal ? 'blue' : ''"
          @webkitAnimationEnd="stop"
          ref="box"
        >
          <i class="iconfont icon-ziyuan"></i>
          <span v-if="gettotal">{{ gettotal }}</span>
        </div>
        <p :class="gettotalprice ? 'white' : ''">
          ￥{{ gettotalprice.toFixed(2) }}
        </p>
        <p>
          <span> 另需配送费￥4元</span>
        </p>
      </div>
      <!-- 右边 -->
      <div class="right" v-if="parseInt(gettotalprice.toFixed(2)) === 0">
        ￥20起送
      </div>
      <div class="right" v-else-if="gettotalprice < 20">
        差￥{{ (20 - gettotalprice).toFixed(2) }}
      </div>
      <div class="right green" v-else>去结算</div>
    </div>
    <!-- 弹框 -->
    <van-popup v-model="show" position="bottom" :style="{ bottom: '48px' }">
      <div class="popup-title">
        <p>已选商品</p>
        <span @click="clear()">清空</span>
      </div>
      <div class="popup-content">
        <ul>
          <li v-for="v in cartarr" :key="v.name">
            <p>{{ v.name }}</p>
            <div><span>￥</span>{{ v.price }}</div>
            <!-- 步进器 -->
            <van-stepper
              v-model="v.count"
              min="0"
              theme="round"
              button-size="22"
              disable-input
              :class="v.count ? 'showinput' : ''"
              @plus="addlist(v)"
              @minus="deslist(v)"
            />
          </li>
        </ul>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      show: false,
      value: 0,
    };
  },
  computed: {
    ...mapGetters(["gettotal", "gettotalprice"]),
    ...mapState(["cartarr"]),
  },
  methods: {
    ...mapMutations(["CLAEN", "SET_GOODS_COUNT", "SET_GOODS_DESCOUNT"]),
    //清空购物车
    clear() {
      this.CLAEN();
      this.show = false;
    },
    //给购物车增加数据
    addlist(o) {
      //将数据放入vuex里面
      this.SET_GOODS_COUNT(o);
    },
    //给购物车减少数据
    deslist(o) {
      this.SET_GOODS_DESCOUNT(o);
      if (this.cartarr.length === 0) {
        this.show = false;
      }
    },
    stop() {
      this.$refs.box.classList.remove("fangda");
    },
  },
  watch: {
    gettotalprice() {
      this.$refs.box.classList.add("fangda");
    },
  },
};
</script>

<style lang="less" scoped>
.f-box {
  position: relative;
  z-index: 5;
  flex: 0 0 48px;
  display: flex;
  background-color: #141c27;
  .left {
    z-index: 2020;
    display: flex;
    flex: 1;
    background-color: #141c27;
    // 定义动画
    @keyframes fangda {
      0% {
        transform: translate(20px, -10px) scale(1);
      }
      25% {
        transform: translate(20px, -10px) scale(1.2);
      }
      50% {
        transform: translate(20px, -10px) scale(1.4);
      }
      75% {
        transform: translate(20px, -10px) scale(1.2);
      }
      100% {
        transform: translate(20px, -10px) scale(1);
      }
    }
    .fangda {
      animation: fangda 0.5s ease-in;
    }
    .cart {
      box-sizing: border-box;
      width: 48px;
      text-align: center;
      height: 48px;
      line-height: 36px;
      border: 6px solid #141c27;
      background-color: #2b343d;
      border-radius: 50%;
      transform: translate(20px, -10px);
      position: relative;
      i {
        font-size: 22px;
        color: #808589;
      }
      span {
        color: #fff;
        background-color: #f00;
        display: inline-block;
        height: 18px;
        line-height: 18px;
        padding: 0 5px;
        top: -10px;
        right: -4px;
        border-radius: 9px;
        position: absolute;
      }
      &.blue {
        i {
          color: #fff;
        }
        background-color: #3190e8;
      }
    }
    p {
      line-height: 48px;
      &:nth-child(2) {
        font-weight: 700;
        color: #8f9195;
        margin-left: 17px;
        font-size: 20px;
        &.white {
          color: #fff;
        }
      }
      &:nth-child(3) {
        margin-left: 15px;
        font-size: 12px;
        span {
          border-left: 1px solid #666;
          padding-left: 15px;
          font-weight: lighter;
          color: #8f9195;
          display: inline-block;
          height: 24px;
          line-height: 24px;
        }
      }
    }
  }
  .right {
    flex: 0 0 105px;
    line-height: 48px;
    background-color: #2b343b;
    text-align: center;
    color: #93979a;
    font-size: 14px;
    &.green {
      background-color: #38ca73;
      color: #fff;
    }
  }
}
.van-popup {
  .popup-title {
    display: flex;
    background-color: #eceff1;
    padding: 20px;
    font-size: 16px;
    justify-content: space-between;
    span {
      color: #666;
      font-size: 13px;
    }
  }
  .popup-content {
    li {
      line-height: 22px;
      font-size: 16px;
      display: flex;
      padding: 15px;
      p {
        margin-right: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
      }
      div {
        font-weight: 700;
        color: #f00;
        flex: 0 0 60px;
        text-align: center;
        span {
          font-size: 12px;
          font-weight: normal;
        }
      }
      .van-stepper {
        flex: 0 0 85px;
        /deep/input,
        /deep/.van-stepper__minus {
          visibility: hidden;
        }
        &.showinput {
          /deep/input,
          /deep/.van-stepper__minus {
            visibility: visible;
          }
        }
      }
    }
  }
}
</style>
