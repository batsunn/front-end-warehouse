<template>
  <div class="scroll">
    <div class="comments">
      <div class="top">
        <div class="left">
          <p>3.9</p>
          <p>综合评分</p>
          <p>高于周边商家69.2%</p>
        </div>
        <div class="right">
          <div>
            <p>服务态度</p>
            <span><van-rate v-model="value" readonly color="#FC9B00"/></span>
            <p>3.9</p>
          </div>
          <div>
            <p>服务态度</p>
            <span><van-rate v-model="value" readonly color="#FC9B00"/></span>
            <p>3.9</p>
          </div>
          <p>送达时间<span>44分钟</span></p>
        </div>
      </div>
      <!-- 商品评价标题 -->
      <div class="comment">
        <h2>商品评价</h2>
        <p>
          <van-button
            type="info"
            @click="getall"
            :class="active === 1 ? 'deep' : ''"
            >全部
            <span>{{ commentslist.length }}</span>
          </van-button>
          <van-button
            type="info"
            @click="getgood"
            :class="active === 2 ? 'deep' : ''"
            >推荐
            <span>{{ goodcomment.length }}</span>
          </van-button>
          <van-button
            type="info"
            @click="getbad"
            :class="active === 3 ? 'deep' : ''"
            >吐槽
            <span>{{ badcomment.length }}</span>
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
        <!-- 全部评价 -->
        <ul class="lookup">
          <li v-for="(v, i) in commentslist" :key="i">
            <div class="com-top">
              <div class="com-left">
                <img :src="v.avatar" alt="" />
                <div>
                  <p>{{ v.username }}</p>
                  <p>
                    <van-rate v-model="v.score" readonly color="#FC9B00" />
                    <span
                      >{{ v.deliveryTime ? v.deliveryTime : 35 }}分钟送达</span
                    >
                  </p>
                </div>
              </div>
              <div class="com-right">
                {{ v.rateTime | formatDate }}
              </div>
            </div>
            <div class="com-bottom">
              <p>{{ v.text }}</p>
              <span v-for="(item, k) in v.recommend" :key="k">
                {{ item }}
              </span>
            </div>
          </li>
        </ul>
        <!-- 好评 -->
        <ul>
          <li v-for="(v, i) in goodcomment" :key="i">
            <div class="com-top">
              <div class="com-left">
                <img :src="v.avatar" alt="" />
                <div>
                  <p>{{ v.username }}</p>
                  <p>
                    <van-rate v-model="v.score" readonly color="#FC9B00" />
                    <span
                      >{{ v.deliveryTime ? v.deliveryTime : 35 }}分钟送达</span
                    >
                  </p>
                </div>
              </div>
              <div class="com-right">
                {{ v.rateTime | formatDate }}
              </div>
            </div>
            <div class="com-bottom">
              <p>{{ v.text }}</p>
              <span v-for="(item, k) in v.recommend" :key="k">
                {{ item }}
              </span>
            </div>
          </li>
        </ul>
        <!-- 差评 -->
        <ul>
          <li v-for="(v, i) in badcomment" :key="i">
            <div class="com-top">
              <div class="com-left">
                <img :src="v.avatar" alt="" />
                <div>
                  <p>{{ v.username }}</p>
                  <p>
                    <van-rate v-model="v.score" readonly color="#FC9B00" />
                    <span
                      >{{ v.deliveryTime ? v.deliveryTime : 35 }}分钟送达</span
                    >
                  </p>
                </div>
              </div>
              <div class="com-right">
                {{ v.rateTime | formatDate }}
              </div>
            </div>
            <div class="com-bottom">
              <p>{{ v.text }}</p>
              <span v-for="(item, k) in v.recommend" :key="k">
                {{ item }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getcomments } from "../api/shop";
import { formatDate } from "../utils/filters";
export default {
  data() {
    return {
      value: 4,
      //评价列表
      commentslist: [],
      checked: true,
      active: 1,
    };
  },
  created() {
    //获取商品评价
    this.getcomments();
  },
  methods: {
    //获取商品评价
    async getcomments() {
      const { data, errno } = await getcomments();
      if (errno === 0) {
        this.commentslist = data;
        console.log(data);
      }
    },
    //好评
    getgood(event) {
      this.active = 2;
      const ul = document.querySelectorAll("ul");
      for (let i = 0; i < ul.length; i++) {
        ul[i].classList.remove("lookup");
      }
      ul[1].classList.add("lookup");
    },
    //差评
    getbad() {
      this.active = 3;
      const ul = document.querySelectorAll("ul");
      for (let i = 0; i < ul.length; i++) {
        ul[i].classList.remove("lookup");
      }
      ul[2].classList.add("lookup");
    },
    //所有评论
    getall() {
      this.active = 1;
      const ul = document.querySelectorAll("ul");
      for (let i = 0; i < ul.length; i++) {
        ul[i].classList.remove("lookup");
      }
      ul[0].classList.add("lookup");
    },
  },
  computed: {
    //筛选好评
    goodcomment() {
      return this.commentslist.filter((item) => {
        return item.rateType === 0;
      });
    },
    //筛选差评
    badcomment() {
      return this.commentslist.filter((item) => {
        return item.rateType === 1;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.comments {
  background-color: #f4f5f7;
  .top {
    margin-bottom: 25px;
    background-color: #fff;
    display: flex;
    padding: 15px;
    justify-content: space-between;
    .left {
      padding-right: 10px;
      border-right: 1px solid #ccc;
      p:nth-of-type(1) {
        color: #fc9a00;
        font-size: 28px;
        text-align: center;
      }
      p:nth-of-type(2) {
        margin: 5px 0;
        text-align: center;
        font-size: 14px;
        font-weight: 700;
      }
      p:nth-of-type(3) {
        color: #999;
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        p {
          font-size: 14px;
        }
        span {
          margin-right: 10px;
          margin-left: 10px;
        }
      }
      > p {
        font-size: 14px;
        span {
          margin-left: 15px;
          color: #999;
        }
      }
    }
  }
  .comlist {
    background-color: #fff;
    ul {
      display: none;
      li {
        margin: 0 20px;
        padding: 20px 0;
        border-bottom: 1px solid #ccc;
        .com-top {
          display: flex;
          justify-content: space-between;
          .com-left {
            display: flex;
            align-items: center;
            img {
              width: 30px;
              height: 30px;
              border-radius: 15px;
              margin-right: 10px;
            }
            > div {
              p:nth-of-type(1) {
                font-size: 14px;
              }
              p:nth-of-type(2) {
                display: flex;
                align-items: center;
                /deep/.van-icon {
                  font-size: 12px;
                }
                span {
                  margin-left: 10px;
                  color: #999;
                }
              }
            }
          }
          .com-right {
            color: #999;
          }
        }
        .com-bottom {
          padding-left: 40px;
          margin-top: 10px;
          p {
            font-size: 14px;
            margin-bottom: 10px;
          }
          span {
            font-size: 10px;
            color: #999;
            display: inline-block;
            border: 1px solid #ccc;
            padding: 0 3px;
            width: 45px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-right: 5px;
          }
        }
      }
    }
    .lookup {
      display: block;
    }
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
    &:nth-child(1) {
      background-color: skyblue;
      border: 0;
      color: #000;
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
  .deep {
    color: #fff !important;
    background-color: #1989fa !important;
    border: 0 !important;
  }
  .van-checkbox {
    margin: 15px 0 0;
  }
}
.scroll {
  height: 100%;
  overflow-y: scroll;
}
</style>
