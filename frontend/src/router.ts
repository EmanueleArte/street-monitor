import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import NotFound from '@/pages/NotFound.vue'
import RegistrationPage from './pages/RegistrationPage.vue'
import NotificationsPage from './pages/NotificationsPage.vue'

const routes = [
    { path: '/', component: HomePage },
    { path: '/signup', component: RegistrationPage },
    { path: '/notifications', component: NotificationsPage },
    { path: '/:pathMatch(.*)*', component: NotFound }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})