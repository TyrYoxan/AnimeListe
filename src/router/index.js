import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue";
import Form from "@/views/Form.vue";
import Liste from "@/views/Liste.vue";
import Auth from "@/views/Auth.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/add/:id',
            name: 'add',
            component: Form,
        },
        {
            path: '/liste',
            name: 'liste',
            component: Liste,
        },
        {
            path: '/login',
            name: 'login',
            component: Auth,
        }
    ],
})

export default router