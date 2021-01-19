<template>
  <el-container>
    <el-header>
      <Header />
    </el-header>
    <el-main>
      <router-view class="content" />
    </el-main>
    <!-- <el-footer><Footer /></el-footer> -->
  </el-container>
</template>
<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "home",
  components: {
    Header,
    Footer,
  },
  data() {
    return {};
  },
  created() {},
  sockets: {
    connect(data) {
      //与socket.io连接后回调
      console.log("socket connected");
    },
    userNum(data) {
      this.$store.dispatch("USER_COUNT",data)
    },
    getSocketId(data) {
      console.log("scoket.id:", data);
      this.$store.dispatch("USER_SOCKET_ID",data)
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