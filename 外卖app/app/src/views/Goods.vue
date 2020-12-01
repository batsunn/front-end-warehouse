<template>
  <div class="goods">
    <!-- 左边列表 -->
    <div class="left" ref="leftbox">
      <ul>
        <li
          v-for="v in goodsList"
          :key="v.name"
          :class="str === v.name ? 'active' : ''"
          @click="fn(v.name)"
        >
          <span>{{ v.name }}</span>
        </li>
      </ul>
    </div>
    <!-- 右边菜单 -->
    <div class="right" ref="rightbox">
      <ul ref="rightbox">
        <li
          v-for="item in goodsList"
          :key="item.name"
          :ref="item.name"
          :id="item.name"
        >
          <h3>{{ item.name }}</h3>
          <div v-for="v in item.foods" :key="v.name">
            <img :src="v.imgUrl" alt="" />
            <div @click.prevent.stop="showdialog(v)">
              <h4>{{ v.name }}</h4>
              <p>月售{{ v.sellCount }}份 好评率{{ v.rating }}%</p>
              <span><span>￥</span>{{ v.price }}</span>
              <!-- 步进器 -->
              <div @click.stop="" class="father">
                <van-stepper
                  v-model="v.count"
                  default-value="0"
                  min="0"
                  theme="round"
                  button-size="22"
                  disable-input
                  :class="v.count ? 'showinput' : ''"
                  @plus="addlist(v)"
                  @minus="deslist(v)"
                />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 商品详情 -->
    <van-overlay :show="show">
      <div class="wrapper" @click.stop>
        <div class="block">
          <Goodsdetails :message="foods" @close="show = false" />
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import Goodsdetails from "../components/goodsdetails";
import { getgoods } from "../api/shop";
//引入滑动插件
import BScroll from "@better-scroll/core";
export default {
  components: {
    Goodsdetails,
  },
  data() {
    return {
      //激活类名
      str: "新品专享",
      //右边滑动ul列表
      rightscoll: null,
      arr: [],
      //是否显示详情遮罩层
      show: false,
      //传递给子组件的参数
      foods: {},
    };
  },
  created() {
    this.getgoods();
  },
  mounted() {
    setTimeout(() => {
      //给左边菜单添加滑动效果，并打开点击事件
      const leftscoll = new BScroll(this.$refs.leftbox, { click: true });
      //给右边菜单添加滑动效果，并设置滑动打开滚动位置
      this.rightscoll = new BScroll(this.$refs.rightbox, {
        click: true,
        probeType: 3,
      });
      //给右边导航注册滑动事件
      this.rightscoll.on("scroll", ({ y }) => {
        //解构滚动位置
        y = Math.abs(y);
        for (const v of this.arr) {
          if (
            y >
            this.arr[this.arr.length - 2].min +
              this.$refs["撸烤串"][0].offsetHeight / 2
          ) {
            this.str = "(冒菜)套餐自选区";
          } else if (y <= v.max && y >= v.min) {
            //在区间内默认激活
            this.str = v.name;
          }
        }
      });
    }, 100);
  },
  methods: {
    //从vuex里面引入解构方法
    ...mapMutations([
      "SET_GOODS_LIST",
      "SET_GOODS_COUNT",
      "SET_GOODS_DESCOUNT",
    ]),
    //获取商品数据
    async getgoods() {
      const { goodsList } = await getgoods();
      //减商品数据存到vuex里面
      this.SET_GOODS_LIST(goodsList.reverse());
    },
    //点击跳转楼层
    fn(s) {
      //高亮
      this.str = s;
      //点击跳转楼层
      const targetBox = this.$refs[s];
      this.rightscoll.scrollToElement(targetBox[0], 300);
    },
    //显示商品详情
    showdialog(item) {
      this.show = true;
      this.foods = item;
    },
    //给购物车增加数据
    addlist(o) {
      //将数据放入vuex里面
      this.SET_GOODS_COUNT(o);
    },
    //给购物车减少数据
    deslist(o) {
      this.SET_GOODS_DESCOUNT(o);
    },
  },
  updated() {
    //计算导航滑动区间
    this.arr = [];
    let total = 0;
    for (const v of this.goodsList) {
      const BoxHeight = this.$refs[v.name][0].offsetHeight;
      this.arr.push({
        min: total,
        max: total + BoxHeight,
        name: v.name,
      });
      total += BoxHeight;
    }
  },
  computed: {
    //从vuex里面引入state数据
    ...mapState(["goodsList"]),
  },
};
</script>

<style lang="less" scoped>
.goods {
  display: flex;
  height: 100%;
  .left {
    height: 100%;
    flex: 0 0 90px;
    ul {
      li {
        line-height: 40px;
        font-size: 13px;
        padding: 8px 10px;
        border-bottom: 1px solid #ccc;
      }
    }
  }
  .right {
    width: 100%;
    flex: 1;
    height: 100%;
    background-color: #fff;
    ul {
      width: 100%;
      li {
        h3 {
          background-color: #f4f5f7;
          font-size: 14px;
          color: #999999;
          padding: 8px 15px;
          border-left: 2px solid #ccc;
        }
        > div {
          width: 100%;
          display: flex;
          height: 80px;
          border-bottom: 1px solid #ccc;
          padding: 20px 0 20px 20px;
          img {
            width: 30%;
            margin-right: 10px;
          }
          > div {
            width: 45%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            h4 {
              font-size: 14px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            p {
              font-size: 14px;
              color: #999;
            }
            span {
              line-height: 24px;
              span {
                font-size: 14px;
              }
              font-size: 18px;
              color: #f20;
            }
            .father {
              position: absolute;
              bottom: 3px;
              right: 0px;
              .van-stepper {
                color: blue;
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
      }
    }
  }
}
.active {
  color: #f20;
  background-color: #fff;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
