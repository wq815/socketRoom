<template>
  <router-view />
</template>
<script>
export default {
  name: "home",
  data() {
    return {};
  },
  created() {
    this.$socket.emit("connection", 1);
  },
  sockets: {
    connect(data) {
      //与socket.io连接后回调
      console.log("socket connected");
    },
    message(data) {
      this.$message({
        message: data,
        type: "success",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>