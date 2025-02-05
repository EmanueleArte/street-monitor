import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import NotFound from '@/pages/NotFound.vue'
import RegistrationPage from './pages/RegistrationPage.vue'

const routes = [
    { path: '/', component: HomePage },
    { path: '/signup', component: RegistrationPage },
    { path: '/:pathMatch(.*)*', component: NotFound }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})