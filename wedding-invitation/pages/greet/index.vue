<template>
    <div class="greet">
        <image class="head" src="https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/wp/heart-animation.gif"/>
        <scroll-view
            scroll-y
            class="box"
        >
            <div class="item" v-for="(item, index) in userList" :key="index">
                <image :src="item.avatarUrl"/>
                <p>{{item.nickName}}</p>
            </div>
        </scroll-view>
        <p class="count">已收到{{userList.length}}位好友送来的祝福</p>
        <div class="bottom">
            <button class="left" lang="zh_CN" open-type="getUserInfo" @click="sendGreet">送上祝福</button>
            <!-- <button class="right" open-type="share">分享喜悦</button> -->
        </div>
		<avatarNicknameModal :showpopup="showpopup" @submitForm="submitForm"></avatarNicknameModal>
    </div>
</template>

<script>
import avatarNicknameModal from '../../components/avatarNicknameModal'
import tools from 'common/js/h_tools'
export default {
  name: 'Greet',
  components: {
    avatarNicknameModal
  },
  data () {
    return {
      userList: [],
      openId: '',
      userInfo: {
		  avatarUrl: '',
		  nickName: '',
	  },
	  userInfoUserSubmit: null,
	  showpopup: false,
	  isSubmit: false
    }
  },
  onShow () {
    const that = this
    that.getUserList()
	
	this.isSubmit = false
  },
  methods: {
	submitForm(e) {
	  console.log('提交祝福', e)
	  console.log('提交祝福', this.userInfo)
	  this.userInfoUserSubmit = e
	  this.getUserInfo(false)
	},
	weLogin() {
		wx.login({
		  success (res) {
		    if (res.code) {
		      //发起网络请求
		      wx.request({
		        url: 'https://example.com/onLogin',
		        data: {
		          code: res.code
		        }
		      })
		    } else {
		      console.log('登录失败！' + res.errMsg)
		    }
		  }
		})
	},
    sendGreet (e) {
      const that = this
	  const {SDKVersion} = uni.getSystemInfoSync()
	      // 判断是否支持getUserProfile()获取头像昵称
	      const compareRes = this.compareVersion(SDKVersion, "2.21.2")
	      console.log('版本判断', compareRes)
		  
	      // 不支持
	      if (compareRes !== -1) {
			that.showpopup = !that.showpopup
			return
		  }
		  
		  this.getUserInfo(true)
    },
	getUserInfo(lessVersion) {
		const _this = this
		uni.getUserProfile({
			desc: '用于完善会员资料',
			success: (result) => {
				_this.userInfo = result.userInfo
				if(!lessVersion) {
					_this.userInfo.avatarUrl = _this.userInfoUserSubmit.avatarUrl
					_this.userInfo.nickName = _this.userInfoUserSubmit.nickName
				}
				// _this.getOpenId()
				console.log('getUserInfo', _this.userInfo)
				// _this.wxLogin()
				if(!_this.isSubmit) {
					_this.wxLogin()
				}else {
					tools.showToast('您已经送过祝福了~')
				}
				
				  
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
	wxLogin() {
		const _this = this
	    uni.showLoading({
			title: '加载中'
	    });
	
	    uni.login({
			provider: 'weixin',
			success: (res) => {
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
							tools.showToast('祝福收到啦zzz~')
	                        uni.hideLoading()
							this.isSubmit = true
							this.getUserList()
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
	
	/**
	 * 版本比较
	 * v1 >= v2 返回 0或1 否则 -1
	 * @param {String} v1
	 * @param {String} v2 
	 */
	 compareVersion (v1, v2) {
	  v1 = v1.split('.')
	  v2 = v2.split('.')
	  const len = Math.max(v1.length, v2.length)
	
	  while (v1.length < len) {
	    v1.push('0')
	  }
	  while (v2.length < len) {
	    v2.push('0')
	  }
	
	  for (let i = 0; i < len; i++) {
	    const num1 = parseInt(v1[i])
	    const num2 = parseInt(v2[i])
	
	    if (num1 > num2) {
	      return 1
	    } else if (num1 < num2) {
	      return -1
	    }
	  }
	
	  return 0
	},
    addUser () { 
      const that = this
      const db = uniCloud.database()
      const user = db.collection('user')
		console.log('2.addUser that.userInfo', that.userInfo)
      user.add({
        user: that.userInfo
      }).then(res => {
		console.log('2.addUser', res)
        that.getUserList()
      })
    },

    getOpenId () {
		console.log('1.getOpenId')
      const that = this
	  uniCloud.callFunction({
        name: 'user',
        data: {}
	  }).then(res => {
		console.log('2.getOpenId', res)
        that.openId = res.result.openid
        that.getIsExist()
      })
    },

    getIsExist () {
      const that = this
      const db = uniCloud.database()
      const user = db.collection('user')
      user.where({
        _openid: that.openId
      }).get().then(res => {
		console.log('1.getIsExist', res)
        if (res.result.data.length === 0) {
		console.log('2.getIsExist', res.result.data.length)
          that.addUser()
        } else {
          tools.showToast('您已经送过祝福了~')
        }
      })
    },

    getUserList () {
      const that = this
	  
	  
	  const db = uniCloud.database()
	  const user = db.collection('pro-user').get().then(res => {
		  console.log('送过祝福 getUserList', res)
		  that.userList = res.result.data.reverse()
	  })
	  // user.add({
	  //   user: that.userInfo
	  // }).then(res => {
	  // 		console.log('2.addUser', res)
	  //   that.getUserList()
	  // })
	  
	  
  //     uniCloud.callFunction({
  //       name: 'pro-user',
  //       data: {}
  //     }).then(res => {
		
		// console.log('送过祝福 getUserList', res)
  //       that.userList = res.result.data.reverse()
  //     })
    }
  }
}
</script>
<style lang="stylus" scoped>
.greet
    width 100%
    height 100%
    .head
        height 150rpx
        width 200rpx
        margin 0 auto
    .box
        height 700rpx
        width 690rpx
        margin-left 30rpx
        border-radius 16rpx
        box-shadow 0 0 10rpx rgba(0, 0, 0, 0.1)
        display flex
        justify-content flex-start
        align-items flex-start
        flex-wrap wrap
        .item
            width 120rpx
            display flex
            flex-direction column
            justify-content flex-start
            align-items center
            padding 25rpx
            float left
            image
                width 100rpx
                height 100rpx
                border-radius 50rpx
            p
                height 50rpx
                line-height 50rpx
                font-size 24rpx
                color #444
                width 100rpx
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                text-align center
    .bottom
        height 140rpx
        position fixed
        bottom 0
        left 0
        background rgba(255, 255, 255, 0.5)
        display flex
        justify-content center
        align-items center
        width 100%
        .left
            height 80rpx
            line-height 80rpx
            font-size 28rpx
            width 300rpx
            color #fff
            background #E62C6B
        .right
            height 80rpx
            line-height 80rpx
            font-size 28rpx
            color #fff
            width 300rpx
            background #2CA6F9
    .count
        height 60rpx
        line-height 60rpx
        background rgba(255, 255, 255, 0.5)
        position fixed
        bottom 140rpx
        left 0
        font-size 28rpx
        color #444
        text-align center
        width 100%
</style>
