## vue移动端注意事项

**1.0初始化项目**

```javascript
// 引入初始化的css和index.less
import './assets/css/reset.css'
import './assets/css/index.less'
// 引入字体图标的文件
import './assets/fonts/iconfont.css'
```

**2.0下载配置vantUI**

```javascript
yarn add vant -S
// 引入 vant 的框架
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
```

**3.0盒子丝滑滑动和BetterScroll的使用**

```javascript
给外层盒子加上overflow-y:hidden属性,滑动的盒子高度一定要超高
//下载BetterScroll
yarn add @better-scroll/core -S
```

**实现左侧右侧丝滑滑动**

```html
//左侧和右侧盒子
<div class="pro-r" ref="leftbox">
<div class="pro-r" ref="rightbox">
<script>
//引入BetterScroll
import BScroll from '@better-scroll/core'
//挂在好以后再使用，因为数据是动态获取的，所以给个定时器
 mounted() {
    setTimeout(() => {
      // 创建实例化的对象,打开点击事件，打开右侧实时计算滚动值
      const leftscoll = new BScroll(this.$refs.leftbox, {click:true})
      const rightscoll = new BScroll(this.$refs.rightbox, {click: true,
        probeType: 3,})
    }, 100)
  }
</script>
```

**点击左侧高亮并让右侧滚动**

```html
 //左侧循环出来的盒子，加上激活类名的条件，加上点击跳转事件
<li
     v-for="v in goodsList"
     :key="v.name"
     :class="str === v.name ? 'active' : ''"
     @click="fn(v.name)"
  >
  </li>
//右侧循环出来的盒子，加上ref的名字，根据ref拿到需要跳到的楼层
<li
          v-for="item in goodsList"
          :key="item.name"
          :ref="item.name"
          :id="item.name"
  >
 </li>
<script>
data() {
    return {
      //激活类名
      str: "新品专享",
      //右边滑动ul列表
      rightscoll: null,
    };
  },
methods:{
	//点击左侧跳转楼层
	fn(s) {
   		//高亮
   		this.str = s;
   		//点击跳转楼层
   		const targetBox = this.$refs[s];
        //ref拿到的是数组
   		this.rightscoll.scrollToElement(targetBox[0], 300);,
	} 
}
</script>
```

**右侧滑动控制左侧高亮**

```javascript
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
```

```javascript
data() {
    return {
      arr: []
    }
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
```

**4.0购物车动画效果**

```html
<style>
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
    //设置动画所属类名
    .fangda {
      animation: fangda 0.5s ease-in;
    }
</style>
```

```html
给动画对象加上类名，并控制动画结束
 <div
          class="cart"
          @webkitAnimationEnd="stop"
          ref="box"
 >
</div>
<script>
  methods:{
   //动画结束事件
   stop() {
      this.$refs.box.classList.remove("fangda");
    },
  }
 //观察书变化加上动画
 watch: {
    gettotalprice() {
      this.$refs.box.classList.add("fangda");
    },
  },
</script>
```

