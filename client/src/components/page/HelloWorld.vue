<template>
  <div class="speakRoom">
    <!-- <h2>当前Id：{{ socketId }}{{ count }}</h2> -->
    <section class="speakRoom_connent">
      <div>
        <div
          v-for="(item, index) in message"
          :key="index"
          :class="{ isRight: item.id == socketId, isTip: !item.id }"
        >
          <span v-if="item.id != socketId && item.id">
            {{ item.name }}
            <!-- <el-avatar> {{ item.name }} </el-avatar> -->
          </span>
          <span>{{ item.message }}</span>
          <span v-if="item.id == socketId && item.id">
            {{ item.name }}
            <!-- <el-avatar> {{ item.name }} </el-avatar> -->
          </span>
        </div>
      </div>
    </section>
    <div class="speakRoom_footer">
      <el-input v-model="value"></el-input>
      <el-button type="primary" @click="sendMessage">发送</el-button>
      <el-button v-if="userInfo.user == 'admin'" type="primary" @click="reset">清空</el-button>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import scoket from "vue-socket.io";
import { message } from "element-ui";
export default {
  data() {
    return {
      io: null,
      message: [],
      value: "",
    };
  },
  mounted() {},
  created() {
    this.$socket.emit("readyToRoom");
  },
  updated() {},
  methods: {
    sendMessage() {
      this.$socket.emit("chatmessage", this.value);
      this.value = "";
    },
    reset() {
      this.$socket.emit("reset");
    }
  },
  computed: {
    count() {
      return this.$store.state.user.count;
    },
    socketId() {
      return this.$store.state.user.socketId;
    },
    userInfo(){
      return JSON.parse(sessionStorage.getItem("userInfo"))
    }
  },
  destroyed() {
    this.$socket.emit("disconnect");
  },
  sockets: {
    messageList(data) {
      this.message.splice(this.message.length, 0, data);
    },
    reset(data) {
      this.message = [];
    },
    logout() {
      this.message = [];
    },
  },
};
</script>
<style lang="scss" scoped>
.speakRoom {
  position: relative;
  display: flex;
  flex-direction: column;
  .isRight {
    text-align: right;
  }
  .isTip {
    text-align: center;
    font-size: $baseFontSizeM;
    color: $tipTextColor;
  }
  .speakRoom_connent {
    flex-grow: 1;
    padding: 0 10px;
    overflow-y: auto;
    & > div {
      // height: 100%;
      min-height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
  }
  .speakRoom_footer {
    width: 100%;
    // position: absolute;
    // bottom: 0;
    display: flex;
    .el-input {
      flex-grow: 1;
    }
    // .el-button{
    //   margin: 0;
    // }
  }
}
</style>
