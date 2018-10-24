import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/forum',
      name: 'forum',
      component: () => import('./views/Forum.vue'),
      children: [
        {
          path: '/forum/questions/:id',
          name: 'details',
          component: () => import('./components/QuestionDetail.vue'),
          props: true
        },
        {
          path: '/forum/questions/edit/:id',
          name: 'edit',
          component: () => import('./components/QuestionForm.vue'),
          props: true
        }
      ]
    }
  ]
})
