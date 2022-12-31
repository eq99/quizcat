import { createRouter, createWebHistory } from 'vue-router';

// tmp
const Tmp = () => import('@/views/ATmp.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // admin
    {
      path: "/admin", component: () => import("@/views/admin/Layout.vue"),
      children: [
        { path: "", component: () => import("@/views/admin/DashBoard.vue") },
        { path: "book", component: () => import("@/views/admin/Book.vue") },
      ]
    },
    // site home
    { path: '/', component: () => import("@/views/site/Home.vue") },

    // chat app
    {
      path: '/chat', component: () => import('@/views/chat/Chat.vue'),
      children: [
        { path: "", component: () => import('@/views/chat/OneChat.vue') },
        { path: "friends", component: () => import("@/views/chat/Friends.vue") },
        { path: "groups", component: () => import("@/views/chat/GroupChat.vue") }
      ]
    },

    // konw app
    {
      path: "/know", component: () => import("@/views/know/Layout.vue"),
      children: [
        { path: "", component: () => import("@/views/know/Home.vue") },
        { path: ":subject", component: () => import("@/views/know/Major.vue") },
      ]
    },
    {
      path: "/book/:bookId", component: () => import("@/views/know/Book.vue"),
      children: [
        { path: "", component: () => import("@/views/know/Intro.vue") },
        { path: "exs", component: () => import("@/views/know/ExerciseList.vue") },
      ],
    },
    {
      path: "/book/:bookId/manage", component: () => import("@/views/know/ManageLayout.vue"),
      children: [
        { path: "", component: () => import("@/views/know/ManageHome.vue") },
      ]
    },
    {
      path: "/book/:bookId/chapters/:chapterId", component: () => import("@/views/know/Chapter.vue"),
    },
    {
      path: "/book/:bookId/chapters/:chapterId/edit", component: () => import("@/views/know/ChapterEdit.vue"),
    },
    { path: "/book/:bookId/exs/:exId", component: () => import("@/views/know/Exercise.vue") },
    // end kown app

    { path: '/tmp', component: Tmp },

    // user app
    {
      path: "/user/:userId", component: () => import("@/views/user/UserLand.vue"),
      children: [
        { path: "", component: () => import("@/views/user/Posts.vue") },
        { path: "collect", component: () => import("@/views/user/Collection.vue") }
      ]
    },
    { path: "/profile", component: () => import("@/views/user/Profile.vue") },
  ]
});


interface MetaTag {
  [key: string]: string
}

// This callback runs before every route change, including on page load.
// https://www.digitalocean.com/community/tutorials/vuejs-vue-router-modify-head
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title as string;
  } else if (previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title as string;
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el?.parentNode?.removeChild(el));

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  const metaTags = nearestWithMeta.meta.metaTags as MetaTag[];
  metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag));

  next();
});

export default router
