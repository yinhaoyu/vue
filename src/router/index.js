import Vue from 'vue'
import App from '../App.vue';
import VueRouter from 'vue-router'
import videoDeatil from '../views/video.vue'
import page1 from '../views/page1.vue'
import photoPage from '../views/photo.vue'
Vue.use(VueRouter)

const routes = [{
	path: '/',
	component: App,
	children: [{
			path: '/',
			name: 'videoDeatil',
			component: videoDeatil,
			meta: {
				keepAlive: true,
				title: "我是首页"
			}
		},
		{
			path: '/page1',
			name: 'page1',
			component: page1,
			meta: {
				keepAlive: false,
				title: "我是页面1"
			}
		},
		{
			path: '/photo',
			name: 'photoPage',
			component: photoPage,
			meta: {
				keepAlive: false,
				title: "我是上传图片"
			}
		}
	]
}]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})
router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title;
	}
	next();

})
export default router
