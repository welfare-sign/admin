import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/components/Layout/Main'
import Home from '../views/Home/Home'
import RetailerList from '../views/RetailerList/RetailerList'
import UserList from '../views/UserList/UserList'

Vue.use(VueRouter)

export const menus = [
	{
		path: 'home',
		name: 'home',
		component: Home,
		meta: {
			title: '首页',
			icon: 'el-icon-s-home'
		}
	},
	{
		path: 'users',
		name: 'users',
		component: UserList,
		meta: {
			title: '用户列表',
			icon: 'el-icon-user-solid'
		}
	},
	{
		path: 'retailters',
		name: 'retailters',
		component: RetailerList,
		meta: {
			title: '商户列表',
			icon: 'el-icon-s-shop'
		}
	}
]

const routes = [
	{
		path: '/',
		name: 'main',
		component: Main,
		redirect: '/home',
		children: menus
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/Login')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
