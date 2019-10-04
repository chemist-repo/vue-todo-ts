import Vue from 'vue';
import Router from 'vue-router';
import TodoView from './views/TodoView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'todo',
      component: TodoView,
    },
  ],
});
