import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Meetups from '@/components/Meetup/Meetups.vue'
import CreateMeetups from '@/components/Meetup/CreateMeetup.vue'
import Profile from '@/components/User/Profile'
import Signin from '@/components/User/Signin'
import Signup from '@/components/User/Signup'
import Meetup from '@/components/Meetup/Meetup'
import AuthGuard from './auth-guard'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/meetups',
      name: 'Meetups',
      component: Meetups
    },
    {
      path: '/meetup/new',
      name: 'CreateMeetups',
      component: CreateMeetups,
      beforeEnter: AuthGuard
    },
    {
      path: '/meetups/:id',
      name: 'Meetup',
      component: Meetup,
      props: true
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ]
})