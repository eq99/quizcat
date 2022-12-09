import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import("@/views/site/Home.vue");
const Chat = () => import('@/views/chat/Chat.vue');
const Tmp = () => import('@/views/AAA.vue');
const Quiz = () => import("@/views/Quiz.vue");
const Exercises = () => import('@/views/Exercises.vue');
const InterViewApp = () => import('@/views/InterviewApp.vue');
const InterViewBooks = () => import('@/views/InterviewBooks.vue');
const InterViewNav = () => import('@/views/InterviewNav.vue');
const InterViewLand = () => import('@/views/InterviewLand.vue');
const InterView = () => import('@/views/Interview.vue');
const WordSet = () => import("@/views/WordSet.vue");
const WordDay = () => import("@/views/WordDay.vue");
const Play = () => import('@/views/Play.vue');
const Schools = () => import('@/views/Schools.vue');
const Profile = () => import("@/views/Profile.vue");
const UserLand = () => import("@/views/UserLand.vue");
const Posts = () => import("@/views/Posts.vue");
const Collect = () => import("@/views/Collection.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/chat', component: Chat },
    { path: '/tmp', component: Tmp },
    {
      path: "/exs", component: Exercises, meta: {
        title: '练习喵',
      }
    },
    { path: '/ex/:exid', component: Quiz },
    { path: "/words", component: WordSet },

    // 用户信息
    {
      path: "/user/:userId", component: UserLand,
      children: [
        {
          path: "", component: Posts,
        },
        {
          path: "collect", component: Collect
        }
      ]
    },
    // 我的信息
    {
      path: "/profile", component: Profile
    },

    // 面试喵
    {
      path: "/interviews", component: InterViewApp, meta: {
        title: '面试喵',
      },
      children: [
        { path: "", component: InterViewBooks },
        {
          path: ":bookId", component: InterViewNav,
          children: [
            { path: "", component: InterViewLand },
            { path: ":questionId", component: InterView }
          ]
        },
      ]
    },

    // 学院
    {
      path: '/schools', component: Schools,
    },

    { path: "/words/:setid", component: WordDay },
    { path: "/play", component: Play },
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
