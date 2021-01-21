<template></template>
<script>
export default {
  name: "home",
  components: {},
  data() {
    return {};
  },
  created() {
    this.$socket.emit("getUserNum");
    this.$socket.emit("getSocketId");
  },
  sockets: {
    connect(data) {
      //与socket.io连接后回调
      console.log("socket connected");
    },
    userNum(data) {
      this.$store.dispatch("USER_COUNT", data);
    },
    getSocketId(data) {
      console.log("scoket.id:", data);
      this.$store.dispatch("USER_SOCKET_ID", data);
    },
    message(data) {
      // this.$message({
      //   message: data,
      //   type: "success",
      // });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>