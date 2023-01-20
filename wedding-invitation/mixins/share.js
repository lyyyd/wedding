export default {
	data() {
		return {
			// 默认的全局分享内容
			share: {
				title: '王振荣 & 郭小婷的婚礼邀请函',
				path: 'pages/home/index',    // 全局分享的路径
				imageUrl: 'https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/wp/share0.jpg',    // 全局分享的图片
				desc: ''
			}
		}
	},
	// 定义全局分享
	// 1.发送给朋友
    onShareAppMessage(res) {
        return {
			title: this.share.title,
			path: '/' + this.share.path,
			desc: this.share.desc,
		}
    },
	//2.分享到朋友圈
    onShareTimeline(res) {
        return {
			title: this.share.title,
			query: this.share.path,
			desc: this.share.desc,
			imageUrl: this.share.imageUrl,
		}
    },
}