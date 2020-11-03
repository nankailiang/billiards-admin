<template>
    <div class="layout-container">
        <div>顶部路由</div>

        <div>侧边导航栏</div>

        <!-- 子路由出口 -->
        <router-view />
    </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  mothods: {}
}
</script>

<style lang="scss" scoped>

</style>
