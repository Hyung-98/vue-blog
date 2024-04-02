import { createWebHistory, createRouter } from 'vue-router';

import MainPage from '@/views/MainPage.vue';
import ListPage from '@/views/ListPage.vue';
import NewList from '@/views/NewList.vue';
import Author from '@/components/AuthorVue.vue';
import Comment from '@/components/CommentVue.vue';
import Index from '@/components/TestData.vue';
import Show from '@/components/TestDataShow.vue';

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainPage,
  },
  {
    path: '/list/:id',
    component: ListPage,
    children: [
      { path: 'author', component: Author },
      { path: 'comment', component: Comment },
    ],
  },
  {
    path: '/list/new',
    component: NewList,
  },
  {
    path: '/test',
    name: 'index',
    component: Index,
  },
  {
    path: '/test/:id',
    name: 'show',
    component: Show,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
