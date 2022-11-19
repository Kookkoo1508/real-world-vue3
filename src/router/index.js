import { createRouter, createWebHistory } from "vue-router";
import EventList from "../views/EventList.vue";
import AboutView from "../views/AboutView.vue";
import EventDetails from "../views/event/EventDetails.vue";
import EventRegister from "../views/event/EventRegister.vue";
import EventEdit from "../views/event/EventEdit.vue";
import EventCreate from "../views/EventCreate.vue";
import EventLayout from "../views/event/EventLayout.vue";
import ErrorView from "../views/ErrorView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import NProgress from "nprogress";

const routes = [
  {
    path: "/",
    name: "EventList",
    component: EventList,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    path: "/event/:id",
    name: "EventLayout",
    props: true,
    component: EventLayout,
    children: [
      {
        path: "",
        name: "EventDetails",
        component: EventDetails,
      },
      {
        path: "register",
        name: "EventRegister",
        component: EventRegister,
      },
      {
        path: "edit",
        name: "EventEdit",
        component: EventEdit,
      },
    ],
  },
  {
    path: "/about-us",
    name: "about",
    component: AboutView,
    alias: "/about",
  },
  // {
  //   path: "/about",
  //   redirect: { name: "about" },
  // },
  {
    path: "/create",
    name: "EventCreate",
    component: EventCreate,
  },
  {
    path: "/error/:error",
    name: "ErrorView",
    component: ErrorView,
    props: true,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFoundView",
    component: NotFoundView,
  },
  {
    path: "/404/:resource",
    name: "404Resource",
    component: NotFoundView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach(() => {
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});
export default router;
