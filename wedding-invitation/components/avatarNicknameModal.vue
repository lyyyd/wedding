<template>
  <div class="box">
	<!-- 普通弹窗 -->
	<uni-popup ref="popup" background-color="#fff" @change="change">
		<view class="popup-content">
			<view class="super-modal-box">
				<view class="super-modal-body-box">
					<view class="super-modal-title flex-jc-ac">
						设置头像和昵称
						<image src="../static/images/close.png" mode="widthFix" @click="closeModalTap"
							style="position: absolute; top: 10rpx; right: 20rpx; height: 55rpx; width: 55rpx;">
						</image>
					</view>
					
					<view class="super-avatar-box">
						<button class="avatar-btn" open-type="chooseAvatar" @chooseavatar="onChooseavatar"></button>
						<view class="avatar-img-box flex-jc-ac">
							<image v-if="avatarUrl" :src="avatarUrl" mode="scaleToFill"
								style="height: 175rpx; width: 175rpx; border-radius: 20rpx;"></image>
							<image v-if="!avatarUrl" src="../static/images/moren.png" mode="widthFix"
								style="height: 105rpx; width: 105rpx;"></image>
						</view>
						<view class="avatar-select-tips flex-jc-ac">点击上传头像</view>
					</view>
					
					<view class="super-nick-name-box flex-jb-ac">
						<view class="nick-name-box flex-ac">
							<view style="font-size: 28rpx; color: #222; width: 150rpx;">设置昵称</view>
							<input class="nick-name-input" placeholder="请输入您的昵称" type="nickname"
								:value="nickName" @blur="bindblur"></input>
						</view>
						<view class="flex-jc-ac">
							<image src="../static/images/arrow.png" mode="widthFix" style="height: 45rpx; width: 45rpx;"></image>
						</view>
					</view>
					
					<button class="left" lang="zh_CN" @click="sendGreet" type="primary"
					style="width: 300rpx; background: #E62C6B; margin-bottom: 50rpx; margin-top: 20rpx;">确认</button>
					
				</view>
			</view>
		</view>
	</uni-popup>
	  
  </div>
</template>

<script>
import tools from 'common/js/h_tools'
export default {
	name: 'avatarNicknameModal',
	props: ["showpopup"],
	data () {
		return {
			showAvaModal: false,
			avatarUrl: null,
			avatarUrlForm: '',
			nickName: '',
	        isSubmit: false
		}
	},
	
	watch: {
		showpopup(newValue) {
			console.log('this.avatarUrl', this.avatarUrl)
			let that = this
			console.log('newValue', newValue)
			that.$refs.popup.open('bottom')
		},
	},
	
	/**
	   * 组件的方法列表
	   */
	  methods: {
		  
		change(e) {
		    const that = this
			console.log('当前模式：' + e.type + ',状态：' + e.show);
			if(!e.show && this.isSubmit) {
				console.log('关闭弹窗 avatarUrlForm', that.avatarUrlForm)
				console.log('关闭弹窗 nickName', that.nickName)
				// this.sendGreet()
			}
		},
		sendGreet() {
		    const that = this
			if(!that.nickName || !that.avatarUrlForm) {
				tools.showToast('请选择用户头像、输入昵称后重试！');
				return
			}
			that.$emit('submitForm', {
				nickName: that.nickName,
				avatarUrl: that.avatarUrlForm
			})
			this.isSubmit = true
		},
	    /**
	     * 阻止页面滑动
	     */
	    catchtouchmove() {},
	
	    /**
	     * 选择头像返回信息监听
	     */
	    onChooseavatar(res) {
		  const that = this
		  console.log('选择头像返回信息监听', res)
		  that.avatarUrl = res.detail.avatarUrl
		  // that.uploadUserAvatar(that.avatarUrl)
		  
		  that.uploadFun(that.avatarUrl)
	    },
	
	    /** 获取昵称信息 */
	    bindblur(res) {
	      const value = res.detail.value
		  console.log('获取昵称信息', res)
	      this.nickName = value
	    },
		uploadFun(item) {
		  const that = this
			return uniCloud.uploadFile({
				filePath: item,
				cloudPath: `user_avatar/avatar_` + Date.now() + "." + item.split('.').reverse()[0],
				// onUploadProgress:(progressEvent=>{
				// 	console.log('上传头像成功 uploadUserAvatar', uploadFileRes)
				// 	// 进度条
				// 	const presents = Math.round(
				// 		(progressEvent.loaded * 100) / progressEvent.total
				// 	);
				// }),
				// 单个上传完成后调用
				success(res) {
					console.log('单个上传完成后调用', res)
					res.fileID
					uniCloud.getTempFileURL({
						fileList: [res.fileID]
					}).then(res => {
						console.log('getTempFileURL++++++++++', res)
						that.avatarUrlForm = res.fileList[0].download_url
						console.log('avatarUrlForm++++++++++', that.avatarUrlForm)
					});

					// uni.showToast({
					// 	icon: 'none',
					// 	title: '上传成功',
					// 	duration: 1500
					// })
				}
			})
		},
		
		uploadUserAvatar(avatarUrl) {
			uni.showLoading({
				title: '加载中'
			});
			console.log('上传头像 uploadUserAvatar', avatarUrl)
			let uploadTask =  uni.uploadFile({
				url: 'https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la',
				filePath: '/user_avatar',
				files: [avatarUrl],
				name: 'avatar.jpg',
				// header: {
				// 	token: '自己的token',
				// },
				success: uploadFileRes => {
					// 注意：这里返回的uploadFileRes.data 为JSON 需要自己去转换
					
					console.log('上传头像成功 uploadUserAvatar', uploadFileRes)
					let data = JSON.parse(uploadFileRes.data);
					if (data.code === 0) {
						this.avatarUrl = data.data;
					}
				},
				fail: (error) => {
					uni.showToast({
						title: error,
						duration: 2000
					});
				},
				complete: () => {
					uni.hideLoading();
				}
			});
			uploadTask.abort();
		},
	
	    /**
	     * 设置信息按钮点击监听
	     */
	    setBtnTap() {
	      // const {
	      //   avatarUrl,
	      //   nickName
	      // } = this.data
	      // this.triggerEvent("getAvaNickData", {
	      //   avatarUrl,
	      //   nickName
	      // })
	    },
	
	    /**
	     * 关闭弹窗
	     */
	    closeModalTap() {
			const _this = this
			if(!_this.isSubmit) {
				// _this.sendGreet()
			}
			_this.$refs.popup.close()
	      // this.setData({
	      //   showAvaModal: false,
	      //   nickName: null,
	      //   avatarUrl: null
	      // })
	    },
	  }
}
</script>

<style lang="stylus" scoped>

.super-page-box
	background-color rgba(51, 51, 51, 0.35)
	// position fixed
	width 100vw
	height 400px
	// z-index 99
	animation supermodal 200ms
@keyframes supermodal
	0%
		transform scaleY(0)
	50%
		transform scaleY(0.5)
	100%
		transform scaleY(1)
.super-modal-box
	// position fixed
	// z-index 999
	height 55%
	width 100vw
	bottom 0rpx
	left 0rpx
.super-modal-body-box
	background-color #ffffff
	border-top-left-radius 30rpx
	border-top-right-radius 30rpx
	height 100%
	width 100%

.super-modal-title
	height 105rpx
	width 100%
	font-size 30rpx
	font-weight bold
	color #222222
	position relative


.super-avatar-box
	width 250rpx
	position relative
	margin auto
	margin-top 25rpx


.avatar-btn
	position absolute
	top 0rpx
	left 0rpx
	height 100% !important
	width 100% !important
	background-color transparent
	z-index 99


.avatar-img-box
	background-color #f5f5f5
	height 200rpx
	width 200rpx
	border-radius 20rpx
	margin auto


.avatar-select-tips
	font-size 24rpx
	color #8a8a8a
	margin-top 15rpx


.super-nick-name-box
	height 105rpx
	padding 0rpx 25rpx
	margin-top 15rpx


.nick-name-box
	height 100%
	width 85%
.nick-name-input
	height 105rpx
.apply-btn
	width 450rpx
	height 95rpx
	border-radius 20rpx
	background-color #0dc161
	color #ffffff
	font-size 28rpx
	font-weight bold
	margin auto
	margin-top 35rpx
	
.flex-ac,
.flex-jc-ac,
.flex-jb-ac
	display flex

.flex-jc-ac
	justify-content center

.flex-ac,
.flex-jc-ac,
.flex-jb-ac
	align-items center
.flex-jb-ac
	justify-content space-between
</style>
