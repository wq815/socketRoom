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
  created() {}
};
</script>
<style lang="scss" scoped>
</style>