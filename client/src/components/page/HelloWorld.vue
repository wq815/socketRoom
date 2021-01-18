<template>
  <div>
    <h2>当前在线人数：{{ count }}</h2>
    <section>
      <div v-for="(item,index) in message" :key="index">
        <span>{{item.name}}</span>
        <span>{{item.message}}</span>
      </div>
    </section>
    <el-input v-model="value"></el-input>
    <el-button type="primary" @click="sendMessage">发送</el-button>
    <el-button type="primary" @click="reset">清空</el-button>
  </div>
</template>
<script>
import Vue from "vue";
import scoket from "vue-socket.io";
import { message } from "element-ui"
export default {
  data() {
    return {
      io: null,
      message: [],
      value: "",
      id: "",
      count: ""
    };
  },
  mounted(){
    console.log(111)
  },
  created() {
    // console.log(this.$vue)
    this.$socket.emit("getUserNum");
  },
  methods: {
    sendMessage() {
      this.$socket.emit("chatmessage", this.value);
      this.value = ''
    },
    reset(){
      this.$socket.emit("reset");
    }
  },
  computed: {
    messageaaa() {
      return this.msg;
    }
  },
  destroyed() {
    this.$socket.emit("disconnect");
  },
  sockets: {
    getSocketId(data) {
      console.log("scoket.id:", data);
      this.id = data;
    },
    user(data) {
      // console.log("连接人数", data);
      this.message.splice(this.message.length, 0, data);
    },
    userNum(data) {
      this.count = data;
    },
    reset(data){
      this.message = []
    },
    logout(){
      this.message = []
    },
    // disconnect(){
    //   this.$socket.emit("disconnect");
    // }
  }
};
</script>
<style>
</style>
