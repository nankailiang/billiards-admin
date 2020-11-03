<template>
    <el-container class="layout-container">
        <!-- 侧边导航栏 -->
        <el-aside
            class="aside"
            width="auto"
        >
            <app-aside
                class="aside-menu"
                :is-collapse="isCollapse"
            />
        </el-aside>
        <el-container>
            <!-- 顶部导航栏 -->
            <el-header class="header">
                <div>
                    <i
                        :class="{
                            'el-icon-s-fold': isCollapse,
                            'el-icon-s-unfold': !isCollapse
                        }"
                        @click="isCollapse = !isCollapse"
                    ></i>
                    <span>临沂大学台球厅管理系统</span>
                </div>
                <el-dropdown>
                    <div class="avatar-wrap">
                        <img class="avatar" src="./avatar.jpg">
                        <span>用户昵称</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </div>
                    <!-- <span class="el-dropdown-link">
                        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                    </span> -->
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>设置</el-dropdown-item>
                        <el-dropdown-item>退出</el-dropdown-item>
                        <el-dropdown-item>保留</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-main class="main">
                <!-- 子路由出口 -->
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import AppAside from './components/aside'
export default {
  name: 'LayoutIndex',
  components: {
    AppAside
  },
  props: {},
  data () {
    return {
      user: {},
      isCollapse: false // 侧边菜单栏的展开状态
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  mothods: {}
}
</script>

<style lang="scss" scoped>
.layout-container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    .aside {
        .aside-menu {
            height: 100%;
        }
    }
    .header {
        background-color: #fff;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 15px;
        border-bottom: 1px solid #ccc;
        .avatar-wrap {
            display: flex;
            align-items: center;
            .avatar {
                width: 35px;
                height: 35px;
                border-radius: 20%;
                margin-right: 10px;
            }
        }
    }
    .main {
        background-color: #FAFAFA;
    }
}
</style>
