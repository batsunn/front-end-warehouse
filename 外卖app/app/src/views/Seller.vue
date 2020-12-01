<template>
  <div class="shop-box">
    <div class="shop">
      <div class="t-box">
        <p>{{ sellerlist.name }}</p>
        <p>
          <van-rate
            v-model="sellerlist.score"
            color="orange"
            allow-half
            void-icon="star"
            void-color="#eee"
          />
          (661)
          <span>月售{{ sellerlist.sellCount }}单</span>
        </p>
        <span class="like">
          <van-rate count="1" v-model="val" icon="like" void-icon="like-o" />
          已收藏
        </span>
        <div class="price-box">
          <span
            >起送价
            <p>
              <span>{{ sellerlist.minPrice }}</span
              >元
            </p></span
          >
          <span
            >商家配送
            <p>
              <span>{{ sellerlist.deliveryPrice }}</span
              >元
            </p></span
          >
          <span
            >平均配送时间
            <p>
              <span>{{ sellerlist.deliveryTime }}</span
              >分钟
            </p></span
          >
        </div>
      </div>
      <div class="m-box">
        <h4>公告与活动</h4>
        <p>{{ sellerlist.bulletin }}</p>
        <hr />
        <p
          v-for="(item, index) in sellerlist.supports"
          :key="index"
          class="prefe"
        >
          <span>减</span>{{ item }}
        </p>
      </div>
      <div class="b-box">
        <h4>商家实景</h4>
        <div class="img-group">
          <img
            v-for="(item, index) in sellerlist.pics"
            :key="index"
            :src="item"
          />
        </div>
        <p>营业时间：{{ sellerlist.date }} }}</p>
      </div>
    </div>
  </div>
</template>
<script>
// import { getseller } from "../api/shop";
import { mapState } from "vuex";
export default {
  data() {
    return {
      // sellerlist: {},
      val: 1,
    };
  },
  created() {
    // this.getseller();
  },
  methods: {
    // ...mapMutations(["SET_SELLER_LIST"]),
    //获取商家信息
    // async getseller() {
    //   const { data } = await getseller();
    //   this.sellerlist = data;
    // },
    // this.SET_SELLER_LIST(data);
  },
  computed: {
    ...mapState(["sellerlist"]),
  },
};
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
  overflow-x: hidden;
}
.shop  {
  background-color: #f4f5f7;
  .t-box {
    position: relative;
    width: 100%;
    padding: 10px;
    margin-bottom: 30px;
    background-color: #fff;
    box-sizing: border-box;
    > p {
      font-size: 14px;
      display: flex;
      align-items: center;
      &:first-child {
        font-weight: 700;
        font-size: 18px;
        margin-bottom: 10px;
      }
      &:last-of-type {
        padding-bottom: 20px;
        border-bottom: 1px solid #ccc;
        span {
          margin-left: 15px;
        }
      }
    }
    span.like {
      position: absolute;
      right: 20px;
      top: 10px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .price-box {
      display: flex;
      justify-content: space-between;
      margin-top: 25px;
      font-size: 14px;
      color: #bcc7c7;
      > span {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        p {
          span {
            font-size: 22px;
            font-weight: 900px;
            color: #000;
          }
        }
        &:nth-of-type(2) {
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
        }
      }
    }
  }
  .m-box {
    background-color: #fff;
    padding: 10px;
    > p {
      margin: 20px 0;
      padding: 0 20px;
    }
    p.prefe {
      width: 100%;
      text-align: left;
      margin-top: 15px;
      span {
        padding: 3px;
        background-color: #fff;
        color: #f20;
        margin-right: 10px;
      }
    }
  }
  .b-box {
    margin-top: 30px;
    padding: 10px;
    background-color: #fff;
    .img-group {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      img {
        width: 23%;
      }
    }
  }
}
.shop-box {
  height: 100%;
  overflow-y: scroll;
}
</style>
