import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Seasons from '@/views/Seasons.vue';
import Season from '@/views/Season.vue';
import Racers from '@/views/Racers.vue';
import LuckyCharm from '@/views/LuckyCharm.vue';
import Auth from '@/views/Auth.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Seasons',
    component: Seasons,
  },
  {
    path: '/racers',
    name: 'Racers',
    component: Racers,
  },
  {
    path: '/luckycharm',
    name: 'LuckyCharm',
    component: LuckyCharm,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
  },
  {
    path: '/season/:id',
    name: 'Season',
    component: Season,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: (to) => {
    if (to.hash) {
      const appBarHeight = 75;
      return { selector: to.hash, offset: { x: 0, y: appBarHeight } };
    }
    return { x: 0, y: 0 };
  },
  base: process.env.BASE_URL,
  routes,
});

export default router;
