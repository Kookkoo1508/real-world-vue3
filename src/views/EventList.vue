<template>
  <h1>Event for Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from "@/components/EventCard.vue";
import { mapState } from "vuex";

export default {
  name: "HomeView",
  components: {
    EventCard,
  },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("fetchEvent");
  },
  methods: {},
  computed: {
    ...mapState(["events"]),
  },
};
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
