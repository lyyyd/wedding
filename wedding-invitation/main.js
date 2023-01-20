import App from './App'
import i18n from './lang/i18n'


// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	i18n,
	...App
})
app.$mount()
// #endif

Vue.prototype.globalData = getApp().globalData
let innerAudioContext = uni.createInnerAudioContext()
innerAudioContext.autoplay = true
app.globalData.innerAudioContext = innerAudioContext
app.globalData.musics = [
	{
		musicUrl: "https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/music/gbqq.mp3",
		_id: "ff3a195863c3dc5b0023fed5605b3bec"
	},
	{
		musicUrl: "https://7463-tcb-6d2s2hjt37fj65c-9cc5a099c55b-1316556253.tcb.qcloud.la/music/ttd.m4a",
		_id: "ff3a195863c3dc600023ff022b975c28"
	}
]
app.globalData.index = 1
app.globalData.animations = [
  `bounce`,
  `flash`,
  `pulse`,
  `rubberBand`,
  `shake`,
  `headShake`,
  `swing`,
  `tada`,
  `wobble`,
  `jello`,
  `bounceIn`,
  `bounceInDown`,
  `bounceInLeft`,
  `bounceInRight`,
  `bounceInUp`,
  `fadeIn`,
  `fadeInDown`,
  `fadeInDownBig`,
  `fadeInLeft`,
  `fadeInLeftBig`,
  `fadeInRight`,
  `fadeInRightBig`,
  `fadeInUp`,
  `fadeInUpBig`,
  `flipInX`,
  `flipInY`,
  `lightSpeedIn`,
  `rotateIn`,
  `rotateInDownLeft`,
  `rotateInDownRight`,
  `rotateInUpLeft`,
  `rotateInUpRight`,
  `jackInTheBox`,
  `rollIn`,
  `zoomIn`,
  `zoomInDown`,
  `zoomInLeft`,
  `zoomInRight`,
  `zoomInUp`,
  `slideInDown`,
  `slideInLeft`,
  `slideInRight`,
  `slideInUp`,
  `heartBeat`
]

const db = uniCloud.database()
const music = db.collection('music')
music.get().then(res => {
  console.log('music+++++', res)
  app.globalData.musics = res?.result?.data
  innerAudioContext.src = app.globalData.musics[0].musicUrl
  console.log('globalData***********', app.globalData)
})


// #ifdef VUE3
import {createSSRApp} from 'vue'

export function createApp() {
	const app = createSSRApp(App)
	app.use(i18n)
	return {app}
}
// #endif
