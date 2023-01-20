<template>
  <div class="index">

	<div class="ball run_top_right" v-if="showPlane">
		<div style="font-weight: 900; color: #FFF; width: 100px">更多...<br>前往小程序</div>
		<image 
			style="width: 50px; height: 50px; animation-duration: 3s; animation-delay: 0.2s; animation-iteration-count: 999;transform: rotateX(180deg);"
			src="https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/wp/plane.png"
			class="bg-image flip-vertical animate__animated animate__bounceInDown" />
	</div>
    <!-- 背景 -->
    <image :src="background" class="bg-image" />
    <div class="bg-swiper">
      <index-swiper :list="list" :info="info"></index-swiper>
    </div>
    <div @click="audioPlay" class="bg_music" v-if="isPlay">
      <image class="musicImg music_icon" src="https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/wp/music_icon.png" />
      <image class="music_play pauseImg" src="https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/wp/music_play.png" />
    </div>
    <div @click="audioPlay" class="bg_music" v-else>
      <image class="musicImg" src="https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/wp/music_icon.png" />
      <image class="music_play playImg" src="https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/wp/music_play.png" />
    </div>
  </div>
</template>

<script>
import IndexSwiper from '../../components/indexSwiper'
import tools from '../../common/js/h_tools'
import share from '../../mixins/share.js'
export default {
  name: 'Index',
  components: {
    IndexSwiper
  },
  mixins: [share],
  data () {
    return {
      showPlane: true,
	  isPlay: false,
      audioCtx: '',
      background: '',
      info: {},
      userInfo: '',
      list: [
		  {
			class: "animate__animated animate__fadeInLeft",
			show: true,
			url: "https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/home_img/img (41).jpg"
		  },
		  {
			class: "animate__animated animate__slideInDown",
			show: true,
			url: "https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/home_img/img (5).jpg"
		  },
		  {
			class: "animate__animated animate__rotateInDownRight",
			show: true,
			url: "https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/home_img/img (8).jpg"
		  },
		  {
			class: "animate__animated animate__rollIn",
			show: true,
			url: "https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/home_img/img (33).jpg"
		  },
		  {
			class: "animate__animated animate__jackInTheBox",
			show: true,
			url: "https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/home_img/img (35).jpg"
		  },
		  {
			class: "animate__animated animate__flip",
			show: true,
			url: "https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/home_img/img (30).jpg"
		  },
	  ],
    }
  },
  onLoad () {
	let obj = uni.getLaunchOptionsSync()
	console.log('通过微信朋友圈进入 obj', obj)
	// scene = 1154
	// 通过微信朋友圈进入
	if (obj.scene !== 1154) {
		this.getMusicUrl()
		// uni.showShareMenu({
		//   withShareTicket: true,
		//   menus: ['shareAppMessage', 'shareTimeline']
		// })
		this.getList()
		// const db = uni.cloud.database()
		// const common = db.collection('common')
		// common.get().then(res => {
		//   this.background = res.data[0].background
		//   this.info = res.data[0].info
		// })
	}
    this.globalData.innerAudioContext.onEnded(this.onEnded)
    this.globalData.innerAudioContext.onPlay(this.onPlay)
    this.globalData.innerAudioContext.onPause(this.onPause)
    this.getList()
    // const db = uniCloud.database()
    // const common = db.collection('common')
    // common.get().then(res => {
    //   this.background = res.data[0].background
    //   this.info = res.data[0].info
    // })
  },
  onShow () {
    const obj = uni.getLaunchOptionsSync()
	// 通过微信朋友圈进入
	if (obj.scene === 1154) {
	  this.showPlane = true
	} else {
	  this.showPlane = false
	}
	this.audioCtx = this.globalData.innerAudioContext
	this.isPlay = !this.audioCtx.paused
  },
  methods: {
	getUserInfo() {
		const _this = this
		uni.getUserProfile({
			desc: '用于完善会员资料',
			success: (result) => {
				_this.userInfo = result.userInfo
				console.log('getUserInfo', result)
				_this.wxLogin()
			},
			fail: () => {
				uni.hideLoading();
				uni.showModal({
					content: '获取用户信息失败',
					showCancel: false
				})
			}
		})
	},
	wxLogin() {    const _this = this
	    uni.showLoading({        title: '加载中'
	    });
	
	    uni.login({
			provider: 'weixin',
			success: (res) => {            // 获取 code
	            if (res.code) {
	                uniCloud.callFunction({
						name: 'login',
						data: {
							action: 'code2Session',
							js_code: res.code,
							user_info: _this.userInfo
	                    },
						success: (res) => {
							console.log('云函数返回的值：：：：', res.result)
	                        uni.hideLoading();
							if (res.result.result.result._id) {
	                            uni.setStorageSync('userInfo', JSON.stringify(res.result.result.result))
	                            this.globalData.$UserInfo = res.result.result.result
	                        }
	                    },
						fail: () => {
	                        uni.hideLoading();
							console.log('云函数调用失败')
	                    }
	                })
	            }
	        }
	    })
	},
    onPlay () {
      this.isPlay = true
    },
    onPause () {
      this.isPlay = false
    },
    onEnded () {
      if (this.globalData.index >= this.globalData.musics.length) {
        this.globalData.index = 0
      }
      this.globalData.innerAudioContext.src = this.globalData.musics[this.globalData.index].musicUrl
      this.globalData.index += 1
    },
    audioPlay () {
      if (this.audioCtx.paused) {
        this.audioCtx.play()
        tools.showToast('背景音乐已开启~')
      } else {
        this.audioCtx.pause()
        tools.showToast('您已暂停音乐播放~')
      }
    },
    getList () {
      const that = this
      const db = uniCloud.database()
      const banner = db.collection('opendb-banner')
      banner.get().then(res => {
        let list = []
        let animations = [
          'animate__animated animate__fadeInLeft',
          'animate__animated animate__slideInDown',
          'animate__animated animate__rotateInDownRight',
          'animate__animated animate__rollIn',
          'animate__animated animate__jackInTheBox',
          'animate__animated animate__flip'
        ]
        for (let i = 0; i < res.result.data.length; i++) {
		  let item = res.result.data[i]
          let show = i === 0
          list.push({
            url: item.bannerfile.url,
            show: show,
            class: animations[i]
          })
        }
        that.list = list
		console.log('list+++++++++++++++', list)
      })
    },
    getMusicUrl () {
      const that = this
  //     const db = uniCloud.database()
  //     const music = db.collection('music')
  //     music.get().then(res => {
  //       that.globalData.innerAudioContext.src = res.data[0].musicUrl
		// console.log('that.globalData++++++++++++++++++', that.globalData)
  //       that.audioCtx.play()
  //       that.getList()
  //     })
    }
  },
}
</script>

<style scoped lang="stylus">
@-webkit-keyframes musicRotate
  from
    -webkit-transformb rotate(0deg)
  to
    -webkit-transform rotate(360deg)
@-webkit-keyframes musicStop
  from
    -webkit-transform rotate(20deg)
  to
    -webkit-transform rotate(0deg)
@-webkit-keyframes musicStart
  from
    -webkit-transform rotate(0deg)
  to
    -webkit-transform rotate(20deg)
@-webkit-keyframes infoAnimation
  0%
    -webkit-transform scale(1) translate(0, 0)
  50%
    -webkit-transform scale(.9) translate(5px, 5px)
  100%
    -webkit-transform scale(1) translate(0, 0)
.index
  height 100%
  position relative
  .img
    width 100%
    height 100%
  .bg-swiper
    width 100%
    height 100%
  .inv
    position absolute
    top 20rpx
    left 89rpx
    width 572rpx
    height 69rpx
    z-index 9
  .bg_music
    position fixed
    right 10rpx
    top 100rpx
    width 100rpx
    z-index 999
    display flex
    justify-content flex-start
    align-items flex-start
    .musicImg
      width 60rpx
      height 60rpx
    .music_icon
      animation musicRotate 3s linear infinite
    .music_play
      width 28rpx
      height 60rpx
      margin-left -10rpx
      transform-origin top
      -webkit-transform rotate(20deg)
    .playImg
      animation musicStop 1s linear forwards
    .pauseImg
      animation musicStart 1s linear forwards
#myAudio
	display none
html
	background-color #ad4e24;
.ball
	height 90px
	width 90px
	border-radius 50%
	position absolute
	bottom 0px
	z-index 10
	right 0px
	.run_top_right 
		display block
		animation run-right-right 5s infinite, run-right-top 5s infinite
@keyframes run-right-top
	0%
		bottom 250px
	100%
		bottom 10px
@keyframes run-right-right
	0%
		left 10px
		transform scale(0.7)
	100%
		left 250px
		transform scale(0.45)
.flip-vertical
	transform: scaleY(-1);
	filter: flipv;
</style>
