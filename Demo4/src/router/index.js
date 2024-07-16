import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useCounterStore } from '@/stores/counter'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/UserView.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/card',
      name: 'card',
      component: () => import('../views/CardView.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/OrderView.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { isTab: false }
    },
    {
      path: '/resgiter',
      name: 'resgiter',
      component: () => import('../views/ResgiterView.vue'),
      meta: { isTab: false }
    },
    {
      path: '/foods',
      name: 'foods',
      component: () => import('../views/FoodsView.vue'),
      meta: { isTab: false }
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('../views/DetailView.vue'),
      meta: { isTab: false }
    },
    {
      path: '/buy1',
      name: 'buy1',
      component: () => import('../views/BuyView1.vue'),
      meta: { isTab: false, requireAuth: true }
    },
    {
      path: '/buy2',
      name: 'buy2',
      component: () => import('../views/BuyView2.vue'),
      meta: { isTab: false, requireAuth: true }
    },
    {
      path: '/comment',
      name: 'comment',
      component: () => import('../views/CommentView.vue'),
      meta: { isTab: false, requireAuth: true }
    },
    {
      path: '/collect',
      name: 'collect',
      component: () => import('../views/CollectView.vue'),
      meta: { isTab: false, requireAuth: true }
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue'),
      meta: { isTab: false, requireAuth: false }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useCounterStore();
  const token = store.userId;
  if (to.meta.requireAuth) {
    if (token) {
      next();
    }
    else {
      next({ name: "login" });
    }
  }
  else {
    next();
  }
});

export default router