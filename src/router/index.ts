import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import CandidatView from '@/views/CandidatView.vue'
import DetailCandidatView from '@/views/DetailCandidatView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path:'/', name: 'dashboard', component: DashboardView},
    { path:'/candidat', name:'candidat', component: CandidatView},
    { path: '/candidat/id', name:'detail', component: DetailCandidatView, props: true}
  ],
})

export default router
