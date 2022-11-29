<template>
  <h1>Event for Good {{ user.user.name }}</h1>
  <div class="events">
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >Prev Page</router-link
      >
      <router-link
        id="page-next"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        >Next Page</router-link
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from "@/components/EventCard.vue";
import { mapState } from "vuex";
// import EventService from "@/services/EventService";
// import NProgress from "nprogress";
// import store from "@/store";
// import { watchEffect } from "vue";

export default {
  name: "HomeView",
  props: ["page"],
  components: {
    EventCard,
  },
  data() {
    return {};
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    next((vm) => {
      //We can not use this in RouterEnter becasue the component not load
      vm.$store.dispatch("fetchEvent", {
        perPage: 3,
        page: parseInt(routeTo.query.page) || 1,
      });
    }).catch((e) => {
      next({
        name: "ErrorView",
        params: { error: e },
      });
    });
  },
  beforeRouteUpdate() {
    return this.$store //Return Promise to vue router knows to wait on the API call before loading
      .dispatch("fetchEvent", {
        //  (Solved Problem is NProgress done before EventCard load
        perPage: 3,
        page: this.page || 1,
      })
      .catch((e) => {
        return {
          name: "ErrorView",
          params: { error: e },
        };
      });
  },
  methods: {},
  computed: {
    hasNextPage() {
      let totalPages = Math.ceil(this.event.totalEvents / 2);

      return this.page < totalPages;
    },
    ...mapState(["event", "user", "totalEvents"]),
  },
};
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
