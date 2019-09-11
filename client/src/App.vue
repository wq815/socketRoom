<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    this.$socket.emit("connection", 1);
  }
}
</script>

<style>
</style>
