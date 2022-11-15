<template>
  <h1>Cretae Event</h1>
  <form @submit.prevent="createEvent">
    <label>Select a category</label>
    <select v-model="event.category">
      <option v-for="cat in categories" :key="cat">{{ cat }}</option>
    </select>
    <h3>Name & describe your event</h3>
    <div class="field">
      <label>Title</label>
      <input
        v-model="event.title"
        type="text"
        placeholder="Add an event title"
      />
    </div>
    <div class="field">
      <label>Description</label>
      <input
        v-model="event.description"
        type="text"
        placeholder="Add a description"
      />
    </div>
    <h3>Where is your event?</h3>
    <div class="field">
      <label>Location</label>
      <input
        v-model="event.location"
        type="text"
        placeholder="Add a location"
      />
    </div>
    <h3>When is your event?</h3>
    <div class="field">
      <label>Date</label>
      <datepicker v-model="event.date" placeholder="Select a date" />
    </div>
    <input type="submit" class="button -fill-gradient" value="Submit" />
  </form>
</template>

<script>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: {
    Datepicker,
  },
  data() {
    return {
      event: this.createFreshEvent(),
      categories: this.$store.state.categories,
    };
  },
  methods: {
    createEvent() {
      this.$store
        .dispatch("createdEvent", this.event)
        .then(() => {
          this.$router.push({
            name: "EventDetail",
            params: { id: this.event.id },
          });
          this.createFreshEvent();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    createFreshEvent() {
      const user = this.$store.state.user;
      const id = Math.floor(Math.random() * 10000000);
      return {
        id: id,
        category: "",
        organizer: user,
        title: "",
        description: "",
        location: "",
        date: "",
        attendees: [],
      };
    },
  },
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
