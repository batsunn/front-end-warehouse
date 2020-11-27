## vue项目创建

**1.项目初始化**

```javascript
//安装 @vue/cli
`yarn global add @vue/cli`
//使用命令行的方式创建项目
`vue create 自己的项目名称`
//mian.js中操作
下载并引入element-ui,注册使用
引入css样式重置文件和iconfont样式文件
在assest文件中创建index.less文件，写编译之后的样式,并在main.js中引入
引入router,并挂载在vue实例对象上
```

**2.其他工具封装在src下面的utils文件夹里面**

```javascript
//在src的utils文件夹下创建local.js操作本地存储
//哪个组件调用就引入即可
```

**3.创建axios的第一层封装**

1.设置请求拦截器

```javascript
//在utils里面创建request.js文件
axios.interceptors.request.use(config => {
  // 所有发的请求，都会先执行这个函数
  // 那如果是登录之后的操作，一定要把token带到headers中
  const token = local.get('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
```

2.设置响应拦截器

```javascript
import { Message } from "element-ui";
// 2.3 响应拦截器
axios.interceptors.response.use((res) => {
  const { msg, code } = res.data;
  if (code != undefined && msg != undefined) {
    if (code === 0 || code === "00") {
      Message({
        type: "success",
        message: msg,
      });
    } else {
      Message({
        type: "error",
        message: msg,
      });
    }
  }
  return res;
});
```

**4.创建大路由和默认显示主页面**

1.路由创建(一个路由view里面一个文件)

```javascript
//1.app.vue里面留一个<router-view></router-view>出口
//2.在src中创建了 layout文件夹，创建了 Home.vue 文件,为默认展示主页面,home页面的其他子组件放在layout下面的component文件夹下面
//views 文件夹里面创建了Login.vue和404.vue//其他二级路由页面
```

2.配置路由

```javascript
//配置路由
const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    //计算面包屑
    meta:{name:'首页'}
  },
  {
    path: '/login',
    //懒加载
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
```

3.设置路由守卫，未登录不能访问其他页面

```javascript
//在router.js中设置导航守卫 - 在每一次跳转路由之间介入是否有token，在暴露路由之前设置
router.beforeEach((to, from, next) => {
  const token = local.get('token')
  if (token) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
```

4.解决多次点击导航报错

```javascript
//在router.js中设置
//cv以下代码解决路由地址重复的报错问题(一劳永逸)
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
```

**5.是页面高度达到100%**

```javascript
//设置所有页面html, body高度
//设置app.vue的高度为100%
//设置其他以及页面高度100%
```

**6.登录后刷新页面和关闭页面的优化**

在app.vue里面实现

```html
<script>
import local from './utils/local.js'
export default {
  data() {
    return {
      gapTime: 0,
      beforeUnloadTime: 0
    }
  },
  mounted() {
    // 当页面挂载的时候，注册页面刷新事件
    window.addEventListener('beforeunload', e => this.beforeunloadFn())
    window.addEventListener('unload', e => this.unloadFn())
  },
  methods: {
    // 需要屏幕和用户互动 只要用户离开页面（关闭、刷新、跳转其他页面）就会触发
    unloadFn() {
      this.gapTime = new Date().getTime() - this.beforeUnloadTime
      if (this.gapTime <= 5) {
        local.del('token')
      }
    },
    // 不用与用户互动 用户离开页面（关闭、刷新、跳转其他页面）才会触发
    beforeunloadFn() {
      this.beforeUnloadTime = new Date().getTime()
    }
  },
  destroyed() {
    // 当页面卸载事件的时候，移除刷新事件
    window.removeEventListener('beforeunload', e => this.beforeunloadFn())
    window.removeEventListener('unload', e => this.unloadFn())
  }
}
</script>
```

**7.表单设置注意实现**

1.表单插入图标，用插槽的方式

```html
<el-input>
  <!-- <template v-slot:suffix> -->
  <template #suffix>
      <i class="iconfont icon-eyes"></i>
  </template>
</el-input>
```

2.表单三要素

```javascript
//绑定在el-form上,数据对象:module,规则对象:rules,ref操作dom
//要使用表单自定义验证规则，每个验证对象的el-form-item上必须有prop属性，且属性值和数据对象一一对应
//<el-form ref="loginForm"> </el-form>
click(s) {
        this.$refs[s].validate(...)  // 获取dom调用校验的方法
    }                         
```

**8.菜单导航的实现**

1 建  2 配  3 测试

```javascript
//views里面创建其他二级和三级路由
```

2.菜单导航的实现

```html
:default-active="$route.path"//根据路径变化激活
:collapse="bool"//是否收起导航栏
:router="true"//根据路由跳转开启
		//用index=""跳转
  <el-menu-item index="/">
        <i class="iconfont icon-shouye"></i>
        <span slot="title">后台首页</span>
  </el-menu-item>
```

**9.页面当中加载图片**

```javascript
//如果说是服务器端的地址，可以直接使用
//如果是本地图片，同时又是动态加载的页面，url一定要加上 require(路径)
```

**10.element-ui封装组件**

```html
//一般封装在src的components文件夹里面
<template>
  <el-card>
    <!-- 1.0 头部的标题 -->
    <div class="panel-header">
      <slot name="title"></slot>
    </div>
    <!-- 2.0 内容的部分 -->
    <div class="panel-con">
      <slot name="content"></slot>
    </div>
  </el-card>
</template>

//引入
// 将来如果全局挂载了，就不用了在每次使用的时候引入了
import Panel from '../../components/panel/index.vue'

export default {
  components: {
    Panel
  }
}

//使用方式
<template>
    <!-- 使用的双标签，和具名插槽的简写方式 -->
  <Panel>
    <template #title>
      <p>账号列表</p>
    </template>
    <template #content>
      <div>
        1234
      </div>
    </template>
  </Panel>
</template>
```

**11.全局注册组件(针对页面应用比较多的组件)**

1.在src的components里面写好子组件,并使用插槽，可复用组件

```html
<template>
  <el-card class="box-card">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </el-card>
</template>
```

2.在utils中创建components.js的文件，全局注册

```javascript
import Vue from "vue";
// 注册一个全局的面板
import Panel from "../components/panel.vue";
Vue.component("Panel", Panel);
```

3.在main.js入口文件中引入components.js

**12.面包屑实现**

1.页面加载的时候执行，路径切换的时候也要执行

```javascript
 //刷新时重新计算面包屑
  created() {
    this.caclBreadcrumb()
  },
  methods: {
    // 计算面包屑导航的函数
    caclBreadcrumb() {
      console.log('执行了函数')
    }
  },
  watch: {
    // 地址栏的hash路径变化是时重新计算面包屑
    '$route.path'() {
      this.caclBreadcrumb()
    }
  }
```

2.需要有 path 和显示的路径 name

```javascript
//给每一个配置好的路由，添加了meta对象，写入了name属性
// 目的是让面包屑导航通过循环去产生具体的选项，需要一个数组
      const arr = [{ path: '/', name: '首页' }]
// 主要的值两个，显示的文字和跳转的路径
// console.log(this.$route.matched)
      this.$route.matched.forEach(item => {
        if (item.meta && item.meta.name) {
          arr.push({
            path: item.path,
            name: item.meta.name
          })
        }
      })
      console.log(arr)
      this.listArr = arr
//最后在面包屑上遍历即可
```

**12.axios的三层封装**

1.`yarn add axios -S`

2.第二层封装

```javascript
//在src下面创建api的文件夹中创建users.js文件
// 1.0 引入封装的axios请求文件
import req from '../utils/request.js'
// 2.0 导出登录的请求方法
export function login(params) {
  return req.post('/users/checkLogin', params)
}
...
```

.3第三层封装

```javascript
import { login } from '../../api/users.js'
export default {
  async created() {
    const data = await login({
      account: '小貂蝉',
      password: '666'
    })
    console.log(data)
  }
}
```

**13.关于token**

```javascript
以往在混合开发的应用中，自己的页面请求自己的服务器，服务器会返回一个cookie进行存储
现在都是前后端分离的项目，如果还使用cookie就不方便了，防止前端伪造cookie
现在一般都是使用的token来进行验证用户是否已经登录过了
```

1.token的使用思路

```javascript
在登录的时候，成功了会返回一个有效的token，在后续所有的操作中，都需要在请求头中携带token的值
这样保证了后续的接口能被正常的调用，token的值一般是一个加密之后的值，不容易随便伪造
```

2.登陆后储存token值

```javascript
$local.set('token', data.token)
```

**14.单图片上传**

1.图片上传到服务器，并显示在页面中

```html
//action地址为baseurl拼接图片上传的接口
<el-upload
    class="avatar-uploader"
    action="http://127.0.0.1:5000/users/avatar_upload"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
>
<img v-if="imageUrl" :src="imageUrl" class="avatar" />
<i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
```

```javascript
data() {
    return {
      //展示在页面的图片url
      imageUrl: '',
      //图片上传的url
      imgUrl: ''
    }
  },
methods: {
    //图片上传成功之后
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.imgUrl = res.imgUrl
    },
    //图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
```

2.图片保存到数据库

**15.全局注册过滤器**

1.在utils中创建一个filters.js的文件

```javascript
import Vue from "vue";
//引入转换时间格式包
import moment from "moment";
Vue.filter("formatDate", (val) => {
  return moment(val).format("YYYY-MM-DD HH:mm:ss");
});
```

2.在mian.js中引入该文件

**16.vue动态路由传参**

1.直接使用id的方式

```javascript
this.$router.push('/pro/edit/' + row.id)
{
    path: '/pro/edit/:id'
    ...
}
// 获取
this.$route.params.id
```

2.使用路径对象方式

```javascript
this.$router.push({ path: '/pro/edit', query: { id: row.id, name: 'zs' } })
//获取
this.$route.query
```

3.使用parmas的方式

```javascript
this.$router.push({ name: 'proedit', params: { id: row.id, name: 'zs' } })
{
    path: '/pro/edit',
    name: 'proedit'
    ...
}
// 获取
this.$route.params
```

**17.vue 不能监听对象属性的改变(添加或删除)**

***官方解释***

由于 Vue 会在初始化实例时对属性执行 `getter/setter` 转化过程，所以属性必须在 `data` 对象上存在才能让 Vue 转换它，这样才能让它是响应的。

1.在data中将对象要用的属性写死

2.使用Vue.set(object,key,value),this.$set(this.object,key,value),Object.assign({},this.obj)

```javascript
this.obj.sex = "man"
this.obj = Object.assign({},this.obj)
```

**18.设置路由权限**

1.把要筛选的路由单独提取出来,在meta中添加role属性,要想挂载路由

```javascript
//需要动态加载的路由
const syncrouter = {...}||[...]
```

2.声明新路由的函数

```javascript
//登录之后刷新保留路由
createrouter();
//声明新路由的函数
export function createrouter() {
  //取出登陆角色
  let role = $local.get("role");
  //还没取到role，不计算
  if (!role) return false;
  //对路由进行计算,得到新路由
  const finalarr = calctouter(syncrouter.children, role);
  //把计算出来的数组，赋值给syncrouter.children
  syncrouter.children = finalarr;
  //将新的路由添加上去，必须是数组
  router.addRoutes([syncrouter]);
}

//筛选路由的函数
function calctouter(arr, role) {
  //返回过滤后的新路由数组
  return arr.filter((v) => {
    //true,有权限，一级路由保留
    if (haspermission(v, role)) {
      //如果存在二级路由,对二级路由进行递归鉴权
      if (v.children && v.children.length > 0) {
        //对二级路由进行计算，筛选有权限的路由并且保留
        v.children = calctouter(v.children, role);
      }
      return true;
    } else {
      //否则过滤掉，不能看
      return false;
    }
  });
}

//声明一个鉴权的函数
function haspermission(o, r) {
  //如果一级路由存在争议,进行判断
  if (o.meta && o.meta.role) {
    //判断是否含有当前登陆角色的权限，只判断一级路由
    return o.meta.role.includes(r);
  } else {
    //没有meta和meta中的role,都可以看
    return true;
  }
}
```

3.注意

```javascript
//把用户的角色存入本地
$local.set("role", data.role);
//调用生产新路由的函数，判断用户角色，筛选权限
createrouter();
//注销以后要清空
$local.clear();
//一定要刷新一次，不然会有bug
location.reload();
```

4.计算菜单导航

```javascript
//声明一个过滤菜单的函数
function calcmenu(arr) {
  return arr.filter((v) => {
    if (v.visible) {
      if (v.children && v.children.length > 0) {
        v.children = calcmenu(v.children);
      }
      return true;
    } else {
      return false;
    }
  });
}
```

5.在导航页面动态渲染导航

```html
 <template v-for="v in menu">
      <!-- 一级菜单，没有children -->
      <el-menu-item
        v-if="!v.children || v.path === '/order'"
        :index="v.path === '/order' ? '/order/list' : v.path"
        :key="v.path"
      >
        <i class="iconfont" :class="v.meta.icon"></i>
        <span slot="title">{{ v.meta.name }}</span>
      </el-menu-item>
      <!-- 二级菜单 -->
      <el-submenu v-else :index="v.path" :key="v.path">
        <template slot="title">
          <i class="iconfont" :class="v.meta.icon"></i>
          <span>{{ v.meta.name }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="item in v.children"
            :key="item.path"
            :index="item.path"
            >{{ item.meta.name }}</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </template>
```

