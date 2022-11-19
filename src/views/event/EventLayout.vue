<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'EventDetails' }">Details</router-link>
      |
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>
      |
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <router-view :event="event" />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["id"],
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("fetchEventById", this.id).catch(() => {
      this.$router.push({
        name: "404Resource",
        params: { resource: "event" },
      });
    });
  },
  computed: mapState({
    event: (state) => state.event.event,
  }),
};
</script>
