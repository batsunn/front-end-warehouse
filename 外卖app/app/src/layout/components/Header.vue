<template>
  <div class="h-box">
    <!-- 文字内容 -->
    <div class="content">
      <!-- 1.0 店铺头像 -->
      <div class="title">
        <img :src="shoplist.avatar" alt="" />
        <div>
          <h2><span>品牌</span>{{ shoplist.name }}</h2>
          <p>{{ shoplist.description }}/ {{ shoplist.deliveryTime }}分钟送达</p>
          <p><span>减</span>在线支付满28减5，满50减10</p>
        </div>
      </div>
      <!-- 2.0 点击商家信息 -->
      <div class="announce" @click="$emit('open')">5个<span>></span></div>
      <!-- 3.0 底部公告 -->
      <div class="tips">
        <span>公告</span>
        <p>
          <van-notice-bar scrollable :text="shoplist.bulletin" />
        </p>
        <span>></span>
      </div>
    </div>
    <!-- 背景图片 -->
    <img src="../../assets/images/sell.jpg" alt="" />
    <div class=""></div>
    <!-- 蒙版层 -->
    <div class="mask"></div>
  </div>
</template>

<script>
import { getseller } from "../../api/shop";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      shoplist: [],
    };
  },
  created() {
    this.getseller();
  },
  methods: {
    ...mapMutations(["SET_SELLER_LIST"]),
    async getseller() {
      const { data } = await getseller();
      this.shoplist = data;
      this.SET_SELLER_LIST(data);
    },
  },
};
</script>

<style lang="less" scoped>
.h-box {
  position: relative;
  flex: 0 0 140px;
  overflow: hidden;
  color: #fff;
  > img {
    width: 100%;
    position: absolute;
    top: -40px;
    z-index: -1;
    width: 100%;
    filter: blur(6px);
  }
  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.22);
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
  }
  .content {
    position: relative;
    width: 100%;
    height: 100%;
    .tips {
      position: absolute;
      width: 100%;
      bottom: 0;
      display: flex;
      background-color: rgba(0, 0, 0, 0.3);
      justify-content: space-around;
      line-height: 28px;
      height: 28px;
      align-items: center;
      p {
        height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 80%;
        font-weight: lighter;
      }
      span {
        &:first-child {
          color: #000;
          font-weight: bold;
          line-height: 16px;
          font-size: 12px;
          border-radius: 2px;
          width: 30px;
          background-color: #fff;
          text-align: center;
          margin-left: 10px;
        }
        &:last-child {
          font-family: simsun;
          margin-right: 8px;
        }
      }
    }
    .announce {
      font-weight: lighter;
      display: inline-block;
      position: absolute;
      bottom: 39px;
      right: 14px;
      border-radius: 14px;
      padding: 6px 10px;
      background-color: rgba(0, 0, 0, 0.3);
      span {
        font-family: simsun;
        margin-left: 5px;
      }
    }
    .title {
      display: flex;
      padding: 15px 0;
      img {
        width: 80px;
        height: 80px;
        margin-left: 25px;
        margin-right: 20px;
      }
      div {
        display: flex;
        flex-direction: column;
        h2 {
          display: flex;
          font-size: 20px;
          span {
            font-size: 13px;
            background-color: #f20;
            padding: 0 2px;
            margin-top: 2px;
            height: 24px;
            line-height: 24px;
            margin-right: 6px;
          }
        }
        p {
          font-weight: lighter;
          &:nth-child(2) {
            font-size: 14px;
            margin-top: 8px;
            margin-bottom: 9px;
          }
          span {
            background-color: #fff;
            color: #f00;
            font-weight: bold;
            padding: 1px;
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>
