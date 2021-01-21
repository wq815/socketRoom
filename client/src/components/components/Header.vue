<template>
  <div class="header">
    <section class="header_title">
      {{ roomName ? roomName : "匿名聊天室" }}({{ name }})
    </section>
    <section class="header_tip">当前在线人数：{{ count }}人</section>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      name: "",
      roomName: "",
    };
  },
  computed: {
    count() {
      return this.$store.state.user.count;
    },
    ruoter() {
      return this.$route;
    },
    userInfo() {
      return JSON.parse(sessionStorage.getItem("userInfo"));
    },
  },
  created() {
    console.log(this.$route);
    this.$socket.emit("getName");
    this.$socket.emit("getRoomName", this.userInfo.id);
  },
  sockets: {
    getName(data) {
      this.name = data;
    },
    getRoomName(data) {
      this.roomName = data;
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  background-color: $headerBackColor;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .header_title {
    color: white;
  }
  .header_tip {
    color: $tipTextColor;
    font-size: $baseFontSizeM;
  }
}
</style>