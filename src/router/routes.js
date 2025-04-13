const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'LandingPage',
        component: () => import('pages/LandingPage.vue')
      },
      { path: '/register', component: () => import('pages/Register.vue') },
      { path: '/login', component: () => import('pages/Login.vue') },
      { path: '/welcome', component: () => import('pages/Momentux.vue'),meta: { requiresAuth: true } },
      { path: '/order', component: () => import('pages/Orders.vue'), meta: { requiresAuth: true }},
      { path: '/profile', component: () => import('pages/Profile.vue'), meta: { requiresAuth: true } }
    ]
  },
]

export default routes
