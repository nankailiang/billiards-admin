<template>
  <el-menu
    class="nav-menu"
    :default-active="index"
    background-color="#304156"
    text-color="#BFCBCF"
    active-text-color="#409EFF"
    router
    :collapse="isCollapse"
  >
    <img src="./logo.png" alt="logo">
    <el-menu-item index="/">
      <i class="iconfont icon-taiqiu"></i>
      <span slot="title">球桌管理</span>
    </el-menu-item>
    <el-menu-item index="/member">
      <i class="iconfont icon-huiyuanguanli"></i>
      <span slot="title">会员管理</span>
    </el-menu-item>
    <el-menu-item index="/user">
      <i class="iconfont icon-gerenzhongxin"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-menu-item index="/power">
      <i class="iconfont icon-key"></i>
      <span slot="title">权限管理</span>
    </el-menu-item>
    <el-menu-item index="/recharge">
      <i class="iconfont icon-chongzhi0101"></i>
      <span slot="title">充值记录</span>
    </el-menu-item>
    <el-menu-item index="/consume">
      <i class="iconfont icon-xiaofei"></i>
      <span slot="title">消费记录</span>
    </el-menu-item>
    <el-menu-item index="/analyse">
      <i class="iconfont icon-fenxi"></i>
      <span slot="title">数据分析</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'AppAside',
  components: {},
  props: ['is-collapse'],
  data () {
    return {
      index: ''
      // isCollapse: true
    }
  },
  computed: {},
  watch: {},
  created () {
    this.index = this.$route.path
  },
  mounted () {},
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.nav-menu {
    img {
      width: 180px;
      margin-top: 10px;
      margin-left: 8px;
    }
    .iconfont {
        margin-right: 8px;
    }
    span {
        margin-right: 80px;
    }
}
</style>
