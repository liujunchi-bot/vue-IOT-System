<template>
  <transition name="fade">
    <keep-alive include="home">
      <router-view></router-view>
    </keep-alive>
  </transition>
</template>

<script>
export default {
}
</script>
