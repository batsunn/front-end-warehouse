<template>
  <div class="seller">
    <div>
      <!-- 商铺名称 -->
      <h2>{{ shoplist.name }}</h2>
      <!-- 星星评分 -->
      <van-rate
        v-model="shoplist.score"
        allow-half
        void-icon="star"
        void-color="#eee"
      />
      <!-- 优惠信息 -->
      <h3>优惠信息</h3>
      <p v-for="(v, i) in shoplist.supports" :key="i"><span>减</span>{{ v }}</p>
      <h3>商家公告</h3>
      <div>
        {{ shoplist.bulletin }}
      </div>
    </div>
    <span @click="$emit('close')">x</span>
  </div>
</template>

<script>
import { getseller } from "../../api/shop";
export default {
  data() {
    return {
      value: 2.5,
      shoplist: [],
    };
  },
  created() {
    this.getseller();
  },
  methods: {
    async getseller() {
      const { data } = await getseller();
      this.shoplist = data;
    },
  },
};
</script>

<style lang="less" scoped>
.seller {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  > div {
    height: 75%;
    margin-top: 35px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h2 {
      font-size: 20px;
      letter-spacing: 2px;
      align-self: center;
    }
    .van-rate {
      align-self: center;
      display: flex;
      width: 190px;
      justify-content: space-between;
    }
    h3 {
      width: 100%;
      text-align: center;
      font-size: 18px;
      &::after,
      &::before {
        content: "";
        display: block;
        width: 30%;
        border-bottom: 1px solid #ccc;
        transform: translate(25px, -10px);
      }
      &::before {
        transform: translate(235px, 15px);
      }
    }

    p {
      font-size: 14px;
      font-weight: lighter;
      // margin: 20px 0;
      margin-left: 40px;
      span {
        background-color: #fff;
        font-weight: bold;
        padding: 2px;
        margin-right: 8px;
      }
      &:first-of-type {
        span {
          color: #f00;
        }
      }
      &:nth-of-type(2),
      &:nth-of-type(3) {
        span {
          color: blue;
        }
      }
      &:nth-of-type(4),
      &:nth-of-type(5) {
        span {
          color: green;
        }
      }
    }
    div {
      font-size: 14px;
      margin: 0 40px;
      line-height: 26px;
      font-weight: lighter;
    }
  }
  > span {
    color: #ccc;
    font-size: 40px;
    margin-top: 45px;
  }
}
</style>
