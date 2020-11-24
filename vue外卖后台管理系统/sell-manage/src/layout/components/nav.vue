<template>
  <el-menu
    :default-active="caclactive"
    class="el-menu-vertical-demo"
    background-color="#304156"
    text-color="#fff"
    active-text-color="#0ff"
    :collapse="isCollapse"
    :collapse-transition="false"
    :router="true"
  >
    <!-- template编译出来就不见了 -->
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
  </el-menu>
</template>

<script>
import $local from "../../utils/local";
export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      active: this.$route.path,
      menu: [],
    };
  },
  created() {
    this.menu = JSON.parse($local.get("menu"));
  },
  computed: {
    caclactive() {
      switch (this.$route.path) {
        case "/order/edit":
          return "/order/list";
          break;
        case "/product/edit":
          return "/product/list";
          break;
        default:
          return this.$route.path;
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu {
  border-right: none;
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
  i {
    color: #fff;
    margin-right: 10px;
  }
}
</style>
