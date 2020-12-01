<template>
  <div class="box">
    <!-- 详情部分 -->
    <div class="details">
      <!-- 商品图片 -->
      <div
        class="img"
        :style="{ 'background-image': 'url(' + message.imgUrl + ')' }"
      >
        <span @click="$emit('close')">x</span>
      </div>
      <!-- 商品详情 -->
      <div class="title">
        <h1>{{ message.name }}</h1>
        <p>月售{{ message.sellCount }}份 好评率{{ message.rating }}%</p>
        <span><span>￥</span>{{ message.price }}</span>
        <van-button round type="info">加入购物车</van-button>
      </div>
      <!-- 商品介绍 -->
      <div class="introduce">
        <h2>商品介绍</h2>
        <div>{{ message.goodsDesc }}</div>
      </div>
      <!-- 商品评价标题 -->
      <div class="comment">
        <h2>商品评价</h2>
        <p>
          <van-button type="info"
            >全部
            <span>57</span>
          </van-button>
          <van-button type="info"
            >推荐
            <span>47</span>
          </van-button>
          <van-button type="info"
            >吐槽
            <span>10</span>
          </van-button>
        </p>
        <!-- 分割线 -->
        <van-divider
          :style="{ color: '#000', borderColor: '#ccc', margin: '5px 0' }"
        />
        <!-- 只看有内容的评价 -->
        <van-checkbox v-model="checked" checked-color="#ccc"
          >只看有内容的评价</van-checkbox
        >
      </div>
      <!-- 评价列表 -->
      <div class="comlist">
        <ul>
          <li v-for="v in message.ratings" :key="v.username">
            <div class="left">
              <p>{{ v.rateTime | formatDate }}</p>
              <p>{{ v.text }}</p>
            </div>
            <div class="right">
              {{ v.username }}
              <img :src="v.avatar" alt="" />
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 底部 -->
    <Footer />
  </div>
</template>

<script>
import formatDate from "../utils/filters";
import Footer from "../layout/components/Footer";
export default {
  components: {
    Footer,
  },
  props: {
    message: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      checked: true,
    };
  },
};
</script>

<style lang="less" scoped>
.box {
  height: 100%;
  display: flex;
  flex-direction: column;
  .details {
    width: 100%;
    flex: 1;
    background-color: #f4f5f7;
    overflow-y: scroll;
    .img {
      width: 100%;
      height: 180px;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      font-size: 35px;
      color: #999;
      position: relative;
      span {
        position: absolute;
        right: 5px;
        top: -5px;
      }
    }
    .title {
      padding: 20px;
      background-color: #fff;
      position: relative;
      h1 {
        font-size: 18px;
      }
      p {
        margin-top: 5px;
        color: #999;
        margin-bottom: 20px;
      }
      > span {
        color: #f20;
        font-size: 18px;
        font-weight: bold;
        > span {
          font-size: 12px;
          font-weight: normal;
        }
      }
      .van-button {
        position: absolute;
        bottom: 20px;
        right: 20px;
        border-radius: 20px;
        width: 110px;
        height: 34px;
      }
    }
    .introduce {
      margin: 20px 0;
      background-color: #fff;
      padding: 20px;
      h2 {
        font-size: 18px;
        font-weight: normal;
      }
      div {
        margin-top: 5px;
        color: #999999;
      }
    }
    .comment {
      background-color: #fff;
      padding: 20px;
      border-bottom: 1px solid #ccc;
      h2 {
        font-size: 18px;
        font-weight: normal;
      }
      .van-button {
        margin: 15px 15px 15px 0;
        .van-button__text {
          font-size: 14px;
          span {
            font-size: 12px;
          }
        }
        &:nth-child(2) {
          background-color: #ccecf7;
          border: 0;
          color: #000;
        }
        &:nth-child(3) {
          background-color: #eaebed;
          border: 0;
          color: #000;
        }
      }
      .van-checkbox {
        margin: 15px 0 0;
      }
    }
    .comlist {
      background-color: #fff;
      li {
        padding: 20px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #e6e6e6;
        .left {
          p {
            &:first-child {
              color: #999;
            }
            &:nth-child(2) {
              margin-top: 10px;
              font-size: 14px;
            }
          }
        }
        .right {
          color: #666;
          img {
            margin-left: 5px;
            width: 20px;
            border-radius: 10px;
          }
        }
      }
    }
  }
}
</style>
