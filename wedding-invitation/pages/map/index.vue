<template>
    <div class="map">
        <image mode="aspectFill" class="head-img" src="https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/wp/bg2.jpg"/>
		<map style="width: 100vh; height: 300px;" class="content" id="map" scale="18"
			:latitude="latitude" :longitude="longitude" :markers="covers" @click="toNav">
		</map>
        <div class="call">
            <div class="left" @click="linkHe">
                <image src="https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/wp/he.png"/>
                <span>呼叫新郎</span>
            </div>
            <div class="right" @click="linkShe">
                <image src="https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/wp/she.png"/>
                <span>呼叫新娘</span>
            </div>
        </div>
        <image class="footer" src="https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/wp/grren-flower-line.png"/>
    </div>
</template>

<script>
// import QQMap from 'common/js/qqmap-wx-jssdk.js'
export default {
  name: 'Map',
  data() {
  		return {
  			id:0, // 使用 marker点击事件 需要填写id
  			title: 'map',
  			latitude: 38.43029073,
  			longitude: 100.81566185,
  			covers: [{
  				latitude: 38.43029073,
  				longitude: 100.81566185,
  				iconPath: 'https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/wp/nav.png',
				width: '60px',
				height: '60px'
  			}]
  		}
  	},
  onLoad () {
    const that = this
	this.getList()
  },
  methods: {
	getList () {
	  const that = this
	  const db = uniCloud.database()
	  const common = db.collection('common')
	  common.get().then(res => {
		console.log('indexBanner++++', res)
		  that.heNumber = res.result.data[0].heNumber
		  that.sheNumber = res.result.data[0].sheNumber
		  // that.covers[0].latitude = res.result.data[0].location.latitude
		  // that.covers[0].longitude = res.result.data[0].location.longitude
	  })
	},
    toNav () {
      uni.openLocation({
        latitude: Number(this.covers[0].latitude),
        longitude: Number(this.covers[0].longitude),
        scale: 18
      })
    },
    linkHe () {
      wx.makePhoneCall({
        phoneNumber: this.heNumber
      })
    },
    linkShe () {
      wx.makePhoneCall({
        phoneNumber: this.sheNumber
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.map
    height 100%
    background #fff
    .head-img
      width 100%
      height 280rpx
      margin-bottom 50rpx
    .content
      width 690rpx
      height 600rpx
      margin-bottom 30rpx
      border-radius 16rpx
    .call
      display flex
      justify-content space-around
      align-items center
      width 100%
      margin-bottom 20rpx
      .left, .right
        flex 1
        display flex
        flex-direction column
        justify-content center
        align-items center
        image
          height 64rpx
          width 64rpx
        span
          height 50rpx
          line-height 50rpx
          font-size 24rpx
          color #6B4F4E
    .footer
      height 80rpx
      width 716rpx
      margin-left 17rpx
</style>
