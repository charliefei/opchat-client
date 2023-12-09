import type { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/login',
    component: () => import('@renderer/views/login/Login.vue'),
    name: 'login',
  },
  {
    path: '/',
    component: () => import('@renderer/layout/Layout.vue'),
    name: "layout",
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@renderer/views/home/Home.vue'),
        name: 'home',
        redirect: '/home/main',
        children: [
          {
            path: '/home/main',
            component: () => import('@renderer/views/home/home-main/HomeMain.vue')
          }
        ]
      },
      {
        path: '/private',
        component: () => import('@renderer/views/private/Private.vue'),
        name: 'private',
        children: [
          {
            path: '/private/chat',
            component: () => import('@renderer/views/private/chat/Chat.vue'),
          }
        ]
      },
      {
        path: '/guild',
        component: () => import('@renderer/views/guild/Guild.vue'),
        name: 'guild',
        children: [
          {
            path: '/guild/channel',
            component: () => import('@renderer/views/guild/channel/Channel.vue'),
          }
        ]
      }
    ]
  },
  {
    path: '/add-object-win',
    component: () => import('@renderer/wins/AddObjectWin.vue')
  }
] as RouteRecordRaw[]
