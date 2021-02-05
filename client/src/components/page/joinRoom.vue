<template>
  <div class="joinRoom">
    <section class="joinRoom_header">
      <span>请选择房间加入或自行创建</span>
      <el-button type="text" @click="createRoom">创建房间</el-button>
    </section>
    <section class="joinRoom_list">
      <div v-for="(room, index) in roomList" :key="index">
        <div>
          <span class="joinRoom_list_name">{{ room.roomName }}</span>
          <span class="joinRoom_list_count">房间总人数：{{ room.count }}</span>
        </div>
        <el-button type="text" @click="joinRoom(room)">加入该房间</el-button>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      roomList: [],
    };
  },
  mounted() {
    this.getRoomList();
  },
  computed: {
    userInfo() {
      return JSON.parse(sessionStorage.getItem("userInfo"));
    },
    socketId() {
      return this.$store.state.user.socketId;
    },
  },
  methods: {
    getRoomList() {
      this.$axios.get("getRoomList").then((res) => {
        const { resCode, resMsg, data } = res.data;
        if (resCode == "G0000") {
          this.roomList = data;
        } else {
          this.$message.warning(resMsg);
        }
      });
    },
    joinRoom(room) {
      let params = {
        userId: this.userInfo.id,
        socketId: this.socketId,
        roomId: room.id,
      };
      this.$axios.post("joinRoom", params).then((res) => {
        const { resCode, resMsg, data } = res.data;
        if (resCode == "G0000") {
          this.$router.push({ name: "helloWorld", params: { roomId: data.id } });
        } else {
          this.$message.warning(resMsg);
        }
      });
    },
    createRoom() {
      let params = {
        userId: this.userInfo.id,
        socketId: this.socketId,
      };
      this.$axios.post("createRoom", params).then((res) => {
        const { resCode, resMsg, data } = res.data;
        if (resCode == "G0000") {
          this.$router.push({ name: "helloWorld", params: { roomId: data.id } });
        } else {
          this.$message.warning(resMsg);
        }
      });
    },
  },
};
</script>
<style lang='scss' scope>
.joinRoom {
  height: 100%;
  .joinRoom_header {
    background-color: $headerBackColor;
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > span {
      color: white;
    }
    .el-button {
      padding: 5px 0 0 0;
      margin: 0;
    }
  }
  .joinRoom_list {
    overflow-y: auto;
    max-height: calc(100% -60px);
    & > div {
      width: 100%;
      height: 60px;
      // line-height: 60px;
      border-bottom: 1px solid $tipTextColor;
      padding: 0 5px;
      display: flex;
      justify-content: space-between;
      align-content: center;
      & > div {
        display: flex;
        flex-direction: column;
      }
      .joinRoom_list_name {
        font-size: $baseFontSizeX;
      }
      .joinRoom_list_count {
        margin-top: 3px;
        color: $tipTextColor;
        font-size: $baseFontSizeM;
      }
      .el-button {
        padding: 0;
        margin: 0;
        // line-height: 60px;
      }
    }
  }
}
</style>
