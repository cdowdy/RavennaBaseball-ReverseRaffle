
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/settings', component: () => import('pages/SettingsPage.vue') },
      { path: '/picked', component: () => import('pages/pickedContestants.vue') },
      { path: '/raffle-storage', component: () => import('pages/raffleStorage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
