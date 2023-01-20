<template>
  <div class="box">
	<!-- <image class="swiper-bg" src="https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/wp/bg.jpg" mode="aspectFill"></image> -->
    <swiper class="swiper"
      autoplay
      :circular="true"
      :indicator-dots="false"
      @change="change"
      @animationfinish="animationfinish"
      :duration=500
	  easing-function="easeInOutCubic"
	  interval=6000
    >
    <block v-for="(item, index) in list" :key="index">
      <swiper-item class="item">
        <div class="animate-ele-warp">
          <div class="animate-ele animated" :class="[item.class]" style="top: 0; left: 0; animation-delay: 0.2s;">
            <image mode="aspectFit" lazy-load :src="item.url" class="animate-img slide-image animate__animated animate__bounceInDown"/>
          </div>
        </div>
      </swiper-item>
    </block>
    </swiper>
    <!-- <image v-if="isGif" class="img" src="https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/wp/save_the_date_pu.gif"/> -->
  </div>
</template>

<script>
export default {
  name: 'GoodSwiper',
  props: ['list', 'isGif'],
  watch: {
    isGif (newValue, oldValue) {
      const that = this
      if (newValue) {
        that.isGif = newValue
      }
    }
  },
  data () {
    return {
      changeFlag: false,
      lastIndex: 0,
      lastRadom: -1
    }
  },
  onHide (e) {
    this.$root.$mp.page.setData({'$root[0].autoplay': false})
    // console.log(this.current, this.autoplay, 'onhide')
  },
  methods: {
    change (val) {
      this.changeFlag = true
    },
    animationfinish (val) {
      if (!this.changeFlag) { return }
      // console.log(val, '2')
      this.list[this.lastIndex].show = false
      this.list[val.target.current].show = true
      let index = this.randomNum()
      this.list[val.target.current].class = this.globalData.animations[index]
      this.lastIndex = val.target.current
      this.changeFlag = false
    },
    randomNum () {
      let minNum = 0
      let maxNum = this.globalData.animations.length
      let result = parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
      while (this.lastRadom === result) {
        result = parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
      }
      this.lastRadom = result
      return result
    }
  }
}
</script>

<style lang="stylus" scoped>
.box
  position relative
  height 100%
  .swiper
    height 100%
    width 100%
    .item
      width 100%
      height 100%
      image
        width 100%
        height 100%
        display block
  .img
    position absolute
    bottom 50rpx
    left 50rpx
    z-index 99
</style>
