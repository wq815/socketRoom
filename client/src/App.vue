<template>
  <div id="app">
    <Socket />
    <router-view />
  </div>
</template>

<script>
import Socket from "./components/components/socket.vue";
export default {
  name: "App",
  components: {
    Socket,
  },
  created() {},
};
</script>

<style>
</style>
