<template>
  <div class="joinRoom">
    <div class="pdf" @scroll="getScorllTop">
      <iframe
        ref="iframe"
        src="https://oss-sit.neafex.com/subscription-agreement/20190906151921077.pdf"
      ></iframe>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import scoket from "vue-socket.io";
export default {
  data() {
    return {
      canvas: "",
      ctx: "",
      patterning: [],
      initDot: []
    };
  },
  mounted() {},
  methods: {
    getScorllTop(event) {
      console.log(event.target.scorllHeight);
    },
    initCanvas() {
      this.canvas = document.getElementsByClassName("canvas")[0];
      this.canvas.width = document.documentElement.offsetWidth;
      this.canvas.height = document.documentElement.offsetHeight;
      this.initDot = [
        {
          x: document.documentElement.offsetWidth * 0.7,
          y: 0
        },
        {
          x: document.documentElement.offsetWidth * 0.3,
          y: document.documentElement.offsetHeight
        }
      ];
      this.ctx = this.canvas.getContext("2d");
      console.log(this.canvas);
    },
    createdDiv() {
    //   let _this = this;

    //   let div1 = {
    //     x: 0,
    //     y: 0,
    //     x1: _this.initDot[0].x,
    //     y1: 0,
    //     x2: _this.initDot[1].x,
    //     y2: _this.initDot[1].y,
    //     x3: 0,
    //     y3: _this.initDot[1].y
    //   };
    //   let div2 = {
    //     x: 0,
    //     y: 0,
    //     x1: _this.initDot[0].x,
    //     y1: 0,
    //     x2: _this.initDot[1].x,
    //     y2: _this.initDot[1].y,
    //     x3: 0,
    //     y3: _this.initDot[1].y
    //   };
    //   this.patterning.push(div1);
    }
  }
};
</script>
<style lang='scss' scope>
.joinRoom {
  height: 100%;
}
// embed {
//     width: 100%;
//     height: 100%;
// }
.pdf {
  height: calc(100% + 30px);
  padding-bottom: 40px;
  overflow: scroll;
}
iframe {
  height: calc(100% - 30px) !important;
}
</style>
