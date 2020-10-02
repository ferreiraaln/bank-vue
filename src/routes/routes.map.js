
import Home from '@/pages/home'
import Login from '@/pages/auth/login'
const routes = [
    {
        path: '/',
        component: () => import('@/layouts/defaultTemplate'),
        children: [
            {
                path: '/home',
                component: Home,
                name: 'home'
            },
        ]
    },

    {
        path: '/',
        component: () => import('@/layouts/authTemplate'),
        children: [
            {
                path: '/login',
                component: Login,
                name: 'login'
            }
        ]
    }
];

export default routes