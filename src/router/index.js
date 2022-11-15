import { createRouter, createWebHistory } from "vue-router";
import EventList from "../views/EventList.vue";
import AboutView from "../views/AboutView.vue";
import EventDetail from "../views/EventDetail.vue";
import EventCreate from "../views/EventCreate.vue";

const routes = [
  {
    path: "/",
    name: "EventList",
    component: EventList,
  },
  {
    path: "/event/:id",
    name: "EventDetail",
    props: true,
    component: EventDetail,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/create",
    name: "EventCreate",
    component: EventCreate,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
