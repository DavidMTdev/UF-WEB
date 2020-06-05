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
		path      : '/admin/dashboard',
		name      : 'AdminDashboard',
		component : () => import('../views/admin/Dashboard.vue')
	},
	{
		path      : '/admin/restaurant/dashboard',
		name      : 'AdminRestaurantTableDashboard',
		component : () => import('../views/admin/Restaurant-Table-Dashboard.vue')
	},
	{
		path      : '/admin/member/dashboard',
		name      : 'AdminMemberTableDashboard',
		component : () => import('../views/admin/Member-Table-Dashboard.vue')
	},
	{
		path      : '/admin/current-orders/dashboard',
		name      : 'AdminCurrentOrderTableDashboard',
		component : () => import('../views/admin/Current-Order-Table-Dashboard.vue')
	},
	{
		path      : '/admin/history-orders/dashboard',
		name      : 'AdminHistoryOrderTableDashboard',
		component : () => import('../views/admin/History-Order-Table-Dashboard.vue')
	},
	{
		path      : '/admin/restaurant/:id/dashboard',
		name      : 'AdminRestaurantDashboard',
		component : () => import('../views/admin/Restaurant-Dashboard.vue')
	},
	{
		path      : '/admin/user/:id/dashboard',
		name      : 'AdminUserDashboard',
		component : () => import('../views/admin/User-Dashboard.vue')
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
		path      : '/user/profile',
		name      : 'UserProfile',
		component : () => import('../views/user/Profile.vue'),
		meta      : {
			requiresAuth : true
		}
	},
	{
		path      : '/restaurant/dashboard',
		name      : 'RestaurantDashboard',
		component : () => import('../views/restaurant/Dashboard.vue')
	},
	{
		path      : '/restaurant/signup',
		name      : 'RestaurantSignup',
		component : () => import('../views/restaurant/Signup.vue')
	},
	{
		path      : '/restaurant/login',
		name      : 'RestaurantLogin',
		component : () => import('../views/restaurant/Login.vue')
	},
	{
		path      : '/restaurants',
		name      : 'Restaurants',
		component : () => import('../views/restaurant/Restaurants.vue')
	},
	{
		path      : '/restaurant/:id',
		name      : 'Restaurant',
		component : () => import('../views/restaurant/Restaurant.vue')
	},
	{
		path      : '/cart',
		name      : 'ShoppingCart',
		component : () => import('../views/Shopping-cart.vue')
	},
	{
		path      : '*',
		name      : 'Error404',
		component : () => import('../views/error/404.vue')
	}
];

const router = new VueRouter({
	mode   : 'history',
	base   : process.env.BASE_URL,
	routes
});

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (JSON.parse(localStorage.getItem('session'))) {
			next();
		} else {
			next({ name: 'UserLogin' });
		}
	} else {
		if (JSON.parse(localStorage.getItem('session'))) {
			if (to.name == 'UserLogin') {
				next({ name: 'About' });
			} else if (to.name == 'UserSignup') {
				next({ name: 'About' });
			} else {
				next();
			}
		} else {
			next();
		}
	}
});

export default router;
