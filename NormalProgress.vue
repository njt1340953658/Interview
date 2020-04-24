<template>
  <div class="NormalProgress" ref="NormalProgress">
    <div class="bar">
      <canvas ref="canvasBar" :width="width" :height="height"></canvas>
    </div>
  </div>
</template>

<script>

let methods = {
  draw(width, startTimestamp = null, lastTimestamp = null, delta = 0) {
    if (!this.$refs.canvasBar) return false;
    let canvas = this.$refs.canvasBar,
      ctx = canvas.getContext("2d"),
      defaultWidth = this.width,
      height = this.height,
      speed = this.width / this.totalTime,
      distance = 0,
      countDown = this.totalTime;
    this.bar(ctx, defaultWidth, height, this.barBdColor);
    this.bar(ctx, width, height, this.barColor);
    let requestAnimationFrame = window.requestAnimationFrame(timestamp => {
      if (lastTimestamp === null) {
        startTimestamp = timestamp;
        lastTimestamp = timestamp;
      }
      delta = timestamp - lastTimestamp;
      distance = (speed * delta) / 1000;
      if (width > height) {
        countDown =
          this.totalTime -
          new Date(lastTimestamp - startTimestamp).getSeconds();
        this.draw(
          width - distance,
          startTimestamp,
          (lastTimestamp = timestamp),
          delta
        );
        this.$emit("change", countDown);
      } else {
        window.cancelAnimationFrame(requestAnimationFrame);
        this.$emit("changeEnd");
      }
    });
  },
  bar(ctx, width, height, color) {
    if (Math.floor(width) <= height) color = "rgba(0,0,0,0)";
    ctx.fillStyle = color;
    ctx.fillRect(height / 2, 0, width - height, height);
    ctx.beginPath();
    ctx.arc(height / 2, height / 2, height / 2, 0, 2 * Math.PI);
    ctx.arc(width - height / 2, height / 2, height / 2, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }
};

export default {
  name: "NormalProgress",
  props: {
    totalTime: {
      type: Number,
      default: 10
    },
    currentTime: {
      type: Number,
      default: 0
    },
    barBdColor: {
      type: String,
      default: "#E9E9E9"
    },
    barColor: {
      type: String,
      default: "#FFB936"
    }
  },
  data () {
    return {
      width: 0,
      height: 0
    }
  },
  methods,
  mounted() {
    this.width = this.$refs.NormalProgress.clientWidth
    this.height = this.$refs.NormalProgress.clientHeight
    this.draw(this.width);
  }
};
</script>
 
<style lang="less" scoped>
.NormalProgress {
  width: 100%;
  height: 100%;
  display: inline-block;
}
</style>