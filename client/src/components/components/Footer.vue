<template>
  <div class="footer">
      @{{ data }} 版权所有：王强；一切解释归商家所有
    </div>
</template>
<script>
import moment from "moment";
export default {
  name: "home",
  data() {
    return {};
  },
  computed: {
    data() {
      return moment(new Date()).format("YYYY-MM-DD");
    },
  },
  created() {},
};
</script>
<style lang="scss" scoped>
.footer {
  height: 100%;
  width: 100%;
  font-size: $baseFontSizeM;
  text-align: center;
  line-height: 60px;
  color: $tipTextColor;
}
</style>