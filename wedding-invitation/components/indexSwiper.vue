<template>
  <div class="box">
    <swiper class="swiper"
      autoplay
      circular
      :vertical="true"
      @change="change"
      @animationfinish="animationfinish"
      :duration=250
      interval=6000
    >
        <swiper-item class="item" v-for="(item, index) in list" :key="index">
          <div class="animate-ele-warp">
            <div class="animate-ele animate___animated" :class="[item.class]" style="top: 0; left: 0; animation-delay: 0.2s;">
              <image mode="aspectFill" :src="item.url" class="animate-img slide-image" style="width: 100%; height: 100vh;"/>
            </div>
          </div>
          <!-- 第一张动画 -->
			<div class="animate-ele-warp" v-if="showOverlay0 && index === 0">
				<div class="animate-ele animate__animated animate__zoomIn" style="animation-duration: 3s; animation-delay: 0.2s;">
				  <image class="animate-img" mode="aspectFill" src="https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/wp/img9.png" style="top: 80rpx; width: 100px;" />
				</div>
				<div class="animate-ele animate__animated animate__fadeInUp" style="animation-duration: 1.5s; animation-delay: 1.8s">
				  <image class="animate-img" mode="aspectFill" src="https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/wp/img0.png" style="bottom: 80rpx; width: 100%;" />
				</div>
			</div>
			<!-- 第二张动画 -->
			<div class="animate-ele-warp" v-if="showOverlay1 && index === 1">
			  <div class="animate-ele animate__animated animate__animate__zoomIn" style="animation-duration: 2.5s; animation-delay: 0.2s">
				<image class="animate-img" src="https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/wp/zoomBack.png" style="width: 100%; height: 100%;" />
			  </div>
			  <div class="animate-ele animate__animated animate__fadeInUp" style="animation-duration: 1.5s; animation-delay: 1s;">
				<image class="animate-img" mode="aspectFit" src="https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/wp/word7.png" style="width: 100%; bottom: 0px;" />
			  </div>
			</div>
			<!-- 第三张动画 -->
			<div class="animate-ele-warp" v-if="showOverlay2 && index === 2">
			  <div class="animate-ele animate__animated animate__fadeIn" style="animation-delay: 0.5s">
				<image class="animate-img" src="https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/wp/kuang.png" style="width: 100%; height: 100%;"/>
			  </div>
			  <div class="animate-ele animate__animated animate__fadeInRight" style="animation-duration: 1.5s; animation-delay: 1s;">
				<image class="animate-img" mode="aspectFit" src="https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/wp/word6.png" style="bottom: 250rpx; right: 0px; width: 50%;"/>
			  </div>
			  <div class="animate-ele animate__animated animate__zoomIn" style="nimation-duration: 1.5s; animation-delay: 0.8s;">
				<image class="animate-img" src="https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/wp/thelove.png" style="width: 534.968rpx; height: 128rpx; left: 77rpx; top: 80rpx" />
			  </div>
			</div>
			<!-- 第四张动画 -->
			<div class="animate-ele-warp" v-if="showOverlay3 && index === 3">
			  <div class="animate-ele animate__animated animate__zoomIn" style="animation-delay: 0.3s;">
				<image class="animate-img" src="https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/wp/kuang.png" style="width: 100%; height: 100%;"/>
			  </div>
			  <div class="animate-ele animate__animated animate__fadeInLeft" style="animation-duration: 1.5s; animation-delay: 1.2s;">
				<image class="animate-img" src="https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/wp/word1.png" style="left: 30rpx; top:35rpx; width: 80rpx; height: 401rpx;"/>
			  </div>
			  <div class="animate-ele animate__animated animate__fadeInUp" style="animation-duration: 1.5s; animation-delay: 1.5s;">
				<image class="animate-img" mode="aspectFit" src="https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/wp/word2.png" style="bottom: 20rpx; width: 50%; right: 0px;"/>
			  </div>
			</div>
			<!-- 第五张动画 -->
			<div class="animate-ele-warp" v-if="showOverlay4 && index === 4">
			  <div class="animate-ele animate__animated animate__zoomIn" style="animation-delay: 0.3s;">
				<image class="animate-img" src="https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/wp/kuang.png" style="width: 100%; height: 100%;"/>
			  </div>
			  <div class="animate-ele animate__animated animate__zoomIn" style="animation-duration: 1.5s; animation-delay: 0.5s;">
				<image class="animate-img" mode="aspectFit" src="https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/wp/word3.png" style="bottom: 20rpx; width: 80%; left: 80rpx;"/>
			  </div>
			</div>
			<!-- 第六张动画 -->
			<div class="animate-ele-warp" v-if="showOverlay5 && index === 5">
			  <div class="animate-ele animate__animated animate__fadeIn" style="animation-delay: 1.5s">
				<image class="animate-img" src="https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/wp/kuang.png" style="width: 100%; height: 100%;"/>
			  </div>
			  <div class="animate-ele animate__animated animate__zoomIn" style="animation-duration: 1.5s; animation-delay: 0.5s;">
				<image class="animate-img" mode="aspectFit" src="https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/wp/word4.png" style="top:-60px; width: 100%;"/>
			  </div>
			  <div class="animate-ele animate__animated animate__fadeInRight" style="animation-duration: 1.5s; animation-delay: 0.8s;">
				<image class="animate-img" mode="aspectFit" src="https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/wp/word5.png" style="left: 0rpx; bottom: 80px; width: 200px;"/>
			  </div>
			</div>
        </swiper-item>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'GoodSwiper',
  props: ['list', 'info'],
  data () {
    return {
      showOverlay0: true,
      showOverlay1: false,
      showOverlay2: false,
      showOverlay3: false,
      showOverlay4: false,
      showOverlay5: false,
      changeFlag: false,
      lastIndex: 0,
      lastRadom: -1
    }
  },
  onHide (e) {
    // 禁止后台切换图片
    this.$root.$mp.page.setData({'$root[0].autoplay': false})
  },
  methods: {
    change (val) {
      this.changeFlag = true
    },
    animationfinish (val) {
      if (!this.changeFlag) { return }
      this.showOverlay0 = val.target.current === 0
      this.showOverlay1 = val.target.current === 1
      this.showOverlay2 = val.target.current === 2
      this.showOverlay3 = val.target.current === 3
      this.showOverlay4 = val.target.current === 4
      this.showOverlay5 = val.target.current === 5
      // this.list[this.lastIndex].show = false
      // this.list[val.target.current].show = true
      this.lastIndex = val.target.current
      this.changeFlag = false
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
	  img
	    width 100%
	    height 100%
	    display block
  .info
    width 630rpx
    background rgba(255, 255, 255,1)
    z-index 9
    position absolute
    bottom 120rpx
    left 50rpx
    padding 10rpx
    animation infoAnimation 12s linear infinite
    .content
      width 626rpx
      border 1rpx solid #000
      display flex
      flex-direction column
      justify-content flex-start
      align-items center
      position relative
      padding-bottom 30rpx
      h1
        font-size 50rpx
        height 100rpx
        line-height 100rpx
      p
        font-size 24rpx
        height 60rpx
        line-height 60rpx
      .img_footer
        position absolute
        bottom 10rpx
        left 53rpx
        z-index 99
        height 14rpx
        width 520rpx
</style>

<style type="text/css">
    .wrap {
        width: 313px;
        height: 200px;
        border: 1px solid red;
        position: relative;
    }
 
    .wrap_left_top, .wrap_right_top, .wrap_left_bottom, .wrap_right_bottom {
        position: absolute;
        width: 40px;
        height: 40px;
        border: 1px solid #fff;
        z-index: 1;
        /* background: pink; */
    }
 
    .wrap_left_top {
        top: -1px;
        left: -1px;
        border-radius: 0 0 40px 0;
        border-bottom: 1px solid red;
        border-right: 1px solid red;
    }
 
    .wrap_right_top {
        top: -1px;
        right: -1px;
        border-radius: 0 0 0 40px;
        border-bottom: 1px solid red;
        border-left: 1px solid red;
    }
 
    .wrap_left_bottom {
        left: -1px;
        bottom: -1px;
        border-radius: 0 40px 0 0;
        border-top: 1px solid red;
        border-right: 1px solid red;
    }
 
    .wrap_right_bottom {
        right: -1px;
        bottom: -1px;
        border-radius: 40px 0 0 0;
        border-top: 1px solid red;
        border-left: 1px solid red;
    }
</style>