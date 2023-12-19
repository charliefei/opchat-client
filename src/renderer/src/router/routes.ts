import type { RouteRecordRaw } from 'vue-router'
import AddDialogWin from "@renderer/views/wins/add-dialog-win/AddDialogWin.vue";

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
        redirect: '/home/apply',
        children: [
          {
            path: '/home/apply',
            component: () => import('@renderer/views/home/contact-apply/ContactApply.vue')
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
    path: '/add-dialog',
    component: AddDialogWin
  },
] as RouteRecordRaw[]
