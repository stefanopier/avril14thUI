import {createRouter} from 'vue-router'
import Homepage from './home/Home.vue'
import SubmitPFBPage from './submit/Submitpfb.vue'
import SharesPFBPage from './shares/Sharespfb.vue'
import CheckPFBPage from './check/Checkpfb.vue'

const routes = [
  {
    path: '/',
    component: Homepage
  },

  {
    path: '/submit/',
    component: SubmitPFBPage
  },

  {
    path: '/shares/',
    component: SharesPFBPage
  },

  {
    path: '/check/',
    component: CheckPFBPage
  },
]

export default function (history) {
  return createRouter({
    history,
    routes
  })
}