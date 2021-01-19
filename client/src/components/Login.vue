<template>
  <div class="login">
    <div class="particle-network-animation"></div>
    <div class="login-content">
      <section class="login-content-anime">
        <div class="img">
          <!-- <img src="@/assets/img/login.jpg" alt /> -->
        </div>
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item>
            <h2 class="login-title">
              {{ isRegist ? "用户注册" : "用户登录" }}
            </h2>
          </el-form-item>
          <el-form-item prop="userName">
            <el-input
              prefix-icon="el-icon-search"
              v-model.trim="form.userName"
              clearable
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="userPas">
            <el-input
              prefix-icon="el-icon-search"
              v-model.trim="form.userPas"
              type="password"
              show-password
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="isRegist" prop="userPasRe">
            <el-input
              prefix-icon="el-icon-search"
              v-model.trim="form.userPasRe"
              type="password"
              show-password
              placeholder="请输入再次密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button v-if="!isRegist" type="primary" @click="login"
              >登陆</el-button
            >
            <el-button v-else type="primary" @click="regist">注册</el-button>
            <div class="login-help">
              <span @click="checkModel" :class="{ isRegist: isRegist }">{{
                isRegist ? "去登陆" : "立即注册"
              }}</span>
              <span @click="tipResetPas">忘记密码?</span>
            </div>
          </el-form-item>
        </el-form>
      </section>
    </div>
  </div>
</template>
<script>
import mock from "mockjs";
let Random = mock.Random;
export default {
  data() {
    return {
      form: {
        userName: "",
        userPas: "",
        userPasRe: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        userPas: [{ required: true, message: "请输入密码", trigger: "blur" }],
        userPasRe: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请再次输入密码"));
              }
              if (value != this.form.userPas) {
                callback(new Error("两次输入密码不一致"));
              }
              callback();
            },
            trigger: "blur",
          },
        ],
      },
      isRegist: false,
      // particleColors: [
      //   "#cb6600",
      //   "#53bbb1",
      //   "#7cb3ff",
      //   "#e2a520",
      //   "#32a444",
      //   "#cf2e5a",
      //   "#563ae0",
      //   "#FF6F5C",
      //   "#144384"
      // ], // 画布--球颜色数组 #fff 格式
      particleColors: ["#619ac3", "#8fb2c9", "#5698c3", "#1677b3"],
      particleMinWidth: 8, // 画布--球最小直径 number
      particleMaxWidth: 12, // 画布--球最大直径 number
      netLineColor: "#e1e5e9", // 画布--线条颜色 #fff 格式
      netLineWidth: 2, // 画布--线条宽度
      backgroundColor: "#f1f2f6", // 画布--背景颜色 #fff 格式
      netLineDistance: 200, // 画布--线条长度 number
      density: 60000, // 画布--球密度 越小越密集 number
      velocity: 0.7, // 画布--球运动速度 越小越慢 number
    };
  },
  created() {
    "0".split("").map((item) => {
      return item * 1;
    });
    if (document.documentElement.clientWidth > 1200) {
      this.density = 30000;
    } else {
      this.density = 40000;
    }
  },
  mounted() {
    this.$anime({
      targets: ".login-content-anime",
      opacity: "1",
      translateY: ["100px", "0px"],
      easing: "easeOutExpo",
      delay: 100,
      duration: 5000,
    });
    this.bottomAnimetion();
  },
  methods: {
    login() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$axios.post("/login", this.form).then((res) => {
            const { resCode, resMsg, data } = res.data;
            if (resCode == "G0000") {
              sessionStorage.setItem("userInfo",JSON.stringify(data))
              this.$store.dispatch("USER_SIGNIN",JSON.stringify(data))
              this.$router.push({ path: "/" });
            } else {
              this.$message.warning(resMsg);
            }
          });
        }
      });
    },
    regist() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$axios.post("/regist", this.form).then((res) => {
            const { resCode, resMsg } = res.data;
            if (resCode == "G0000") {
              this.$message.success(resMsg);
              this.isRegist = !this.isRegist;
              this.form = {
                userName: "",
                userPas: "",
                userPasRe: "",
              };
            } else {
              this.$message.warning(resMsg);
            }
          });
        }
      });
    },
    tipResetPas() {
      this.$message.warning("暂不支持修改密码");
    },
    checkModel() {
      this.isRegist = !this.isRegist;
      this.form = {
        userName: "",
        userPas: "",
        userPasRe: "",
      };
    },
    bottomAnimetion() {
      let _this = this;
      let ParticleNetworkAnimation, PNA, pna, backgroundColor;
      ParticleNetworkAnimation = PNA = function () {};

      PNA.prototype.init = function () {
        let element = "particle-network-animation";
        element = document.getElementsByClassName(element)[0];
        this.$el = document.getElementsByClassName(element)[0];

        this.container = element;
        console.log(element);
        this.canvas = document.createElement("canvas");
        this.sizeCanvas();
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");
        this.ctx.fillStyle = _this.backgroundColor;
        this.ctx.globalAlpha = 1;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.particleNetwork = new ParticleNetwork(this);

        this.bindUiActions();

        return this;
      };

      PNA.prototype.bindUiActions = function () {
        window.onresize = function () {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.sizeCanvas();
          this.particleNetwork.createParticles();
        }.bind(this);
      };

      PNA.prototype.sizeCanvas = function () {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
      };

      var Particle = function (parent, x, y) {
        this.network = parent;
        this.canvas = parent.canvas;
        this.ctx = parent.ctx;
        this.particleColor = returnRandomArrayitem(
          this.network.options.particleColors
        );
        backgroundColor = this.network.options.backgroundColor;
        this.radius = getLimitedRandom(
          _this.particleMinWidth,
          _this.particleMaxWidth
        );
        this.opacity = 0;
        this.x = x || Math.random() * this.canvas.width;
        this.y = y || Math.random() * this.canvas.height;
        this.velocity = {
          x: (Math.random() - 0.5) * parent.options.velocity,
          y: (Math.random() - 0.5) * parent.options.velocity,
        };
      };

      Particle.prototype.update = function () {
        if (this.opacity < 1) {
          this.opacity += 0.01;
        } else {
          this.opacity = 1;
        }
        // Change dir if outside map
        if (this.x > this.canvas.width + 100 || this.x < -100) {
          this.velocity.x = -this.velocity.x;
        }
        if (this.y > this.canvas.height + 100 || this.y < -100) {
          this.velocity.y = -this.velocity.y;
        }

        // Update position
        this.x += this.velocity.x;
        this.y += this.velocity.y;
      };

      Particle.prototype.draw = function () {
        // Draw particle
        this.ctx.beginPath();
        this.ctx.fillStyle = this.particleColor;
        this.ctx.globalAlpha = this.opacity;
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
      };

      var ParticleNetwork = function (parent) {
        this.options = {
          velocity: _this.velocity, // the higher the faster
          density: _this.density, // the lower the denser
          netLineDistance: _this.netLineDistance,
          netLineColor: _this.netLineColor,
          netLineWidth: _this.netLineWidth,
          particleColors: _this.particleColors, // ['#6D4E5C', '#aaa', '#FFC458' ]
          backgroundColor: _this.backgroundColor,
        };
        this.canvas = parent.canvas;
        this.ctx = parent.ctx;

        this.init();
      };

      ParticleNetwork.prototype.init = function () {
        // Create particle objects
        this.createParticles(true);

        // Update canvas
        this.animationFrame = requestAnimationFrame(this.update.bind(this));

        this.bindUiActions();
      };

      ParticleNetwork.prototype.createParticles = function (isInitial) {
        // Initialise / reset particles
        var me = this;
        this.particles = [];
        var quantity =
          (this.canvas.width * this.canvas.height) / this.options.density;
        if (isInitial) {
          var counter = 0;
          clearInterval(this.createIntervalId);
          this.createIntervalId = setInterval(
            function () {
              if (counter < quantity - 1) {
                // Create particle object
                this.particles.push(new Particle(this));
              } else {
                clearInterval(me.createIntervalId);
              }
              counter++;
            }.bind(this),
            250
          );
        } else {
          // Create particle objects
          for (var i = 0; i < quantity; i++) {
            this.particles.push(new Particle(this));
          }
        }
      };

      ParticleNetwork.prototype.createInteractionParticle = function () {
        // Add interaction particle
        this.interactionParticle = new Particle(this);
        this.interactionParticle.velocity = {
          x: 0,
          y: 0,
        };
        this.particles.push(this.interactionParticle);
        return this.interactionParticle;
      };

      ParticleNetwork.prototype.removeInteractionParticle = function () {
        // Find it
        var index = this.particles.indexOf(this.interactionParticle);
        if (index > -1) {
          // Remove it
          this.interactionParticle = undefined;
          this.particles.splice(index, 1);
        }
      };

      ParticleNetwork.prototype.update = function () {
        if (this.canvas) {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.ctx.fillStyle = backgroundColor;
          this.ctx.globalAlpha = 1;
          this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
          // this.ctx.globalAlpha = 1;

          // Draw connections
          for (var i = 0; i < this.particles.length; i++) {
            for (var j = this.particles.length - 1; j > i; j--) {
              var distance,
                p1 = this.particles[i],
                p2 = this.particles[j];

              // check very simply if the two points are even a candidate for further measurements
              distance = Math.min(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y));
              if (distance > this.options.netLineDistance) {
                continue;
              }

              // the two points seem close enough, now let's measure precisely
              distance = Math.sqrt(
                Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
              );
              if (distance > this.options.netLineDistance) {
                continue;
              }
              let gnt1 = this.ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y); //线性渐变的起止坐标
              gnt1.addColorStop(0, p1.particleColor); //创建渐变的开始颜色，0表示偏移量，个人理解为直线上的相对位置，最大为1，一个渐变中可以写任意个渐变颜色
              gnt1.addColorStop(1, p2.particleColor);
              this.ctx.beginPath();
              this.ctx.strokeStyle = this.options.netLineColor;
              this.ctx.globalAlpha =
                ((this.options.netLineDistance - distance) /
                  this.options.netLineDistance) *
                p1.opacity *
                p2.opacity;
              this.ctx.lineWidth = this.options.netLineWidth;
              this.ctx.strokeStyle = gnt1;
              this.ctx.moveTo(p1.x, p1.y);
              this.ctx.lineTo(p2.x, p2.y);
              this.ctx.stroke();
            }
          }
          // Draw particles
          for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
            this.particles[i].draw();
          }

          if (this.options.velocity !== 0) {
            this.animationFrame = requestAnimationFrame(this.update.bind(this));
          }
        } else {
          cancelAnimationFrame(this.animationFrame);
        }
      };

      ParticleNetwork.prototype.bindUiActions = function () {
        // Mouse / touch event handling
        this.mouseIsDown = false;
        this.touchIsMoving = false;

        this.onMouseUp = function (e) {
          this.mouseIsDown = false;
        }.bind(this);

        this.onMouseOut = function (e) {
          this.removeInteractionParticle();
        }.bind(this);
        this.canvas.addEventListener("mouseup", this.onMouseUp);
        this.canvas.addEventListener("mouseout", this.onMouseOut);
      };

      ParticleNetwork.prototype.unbindUiActions = function () {
        if (this.canvas) {
          this.canvas.removeEventListener("mouseup", this.onMouseUp);
          this.canvas.removeEventListener("mouseout", this.onMouseOut);
        }
      };

      var getLimitedRandom = function (min, max, roundToInteger) {
        var number = Math.random() * (max - min) + min;
        if (roundToInteger) {
          number = Math.round(number);
        }
        return number;
      };

      var returnRandomArrayitem = function (array) {
        return Random.color();
        return array[Math.floor(Math.random() * array.length)];
      };

      pna = new ParticleNetworkAnimation();
      pna.init(".particle-network-animation");
    },
  },
  computed: {},
};
</script>
<style scope lang='scss'>
</style>
