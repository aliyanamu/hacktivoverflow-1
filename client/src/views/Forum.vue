<template>
  <div class="forum">
    <div class="ui">
      <div class="ui grid">
        <div class="ui one wide form column"></div>
        <div class="ui four wide column">
          <side-bar :isLogin="isLogin" :me="me"/>
        </div>
        <div class="ui nine wide form column" style="padding: 1% 3% 3% 5%;">
        <router-view :key="$route.fullPath" :isLogin="isLogin" :me="me"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'

export default {
  name: 'forum',
  components: {
    SideBar
  },
  props: ['me', 'isLogin']
}
</script>

<style scoped>

</style>
