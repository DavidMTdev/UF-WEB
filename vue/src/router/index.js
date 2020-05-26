import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
	{
		path      : '/',
		name      : 'Home',
		component : Home
	},
	{
		path      : '/about',
		name      : 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component : () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
		meta      : {
			requiresAuth : true
		}
	},
	{
		path      : '/user/signup',
		name      : 'UserSignup',
		component : () => import('../views/user/Signup.vue')
	},
	{
		path      : '/user/login',
		name      : 'UserLogin',
		component : () => import('../views/user/Login.vue')
	},
	{
		path      : '/user/logout',
		name      : 'UserLogout',
		component : () => import('../views/user/Logout.vue'),
		meta      : {
			requiresAuth : true
		}
	},
	{
		path      : '/admin/signup',
		name      : 'AdminSignup',
		component : () => import('../views/admin/Signup.vue')
	},
	{
		path      : '/restaurant/signup',
		name      : 'RestaurantSignup',
		component : () => import('../views/restaurant/Signup.vue')
	}
];

const router = new VueRouter({
	mode   : 'history',
	base   : process.env.BASE_URL,
	routes
});

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (localStorage.getItem('session') == true) {
			next();
		} else {
			next({ name: 'UserLogin' });
		}
	} else {
		next();
	}
});

export default router;
