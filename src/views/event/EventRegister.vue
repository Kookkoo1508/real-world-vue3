<template>
  <p>Register Event Here</p>
  <button @click="registerMe">Click Me</button>
</template>

<script>
export default {
  props: ["event"],
  inject: ["GStore"],
  methods: {
    registerMe() {
      this.GStore.flashMessage =
        "You are successfuly register" + this.event.title;
      setTimeout(() => {
        this.GStore.flashMessage = "";
      }, 3000);
      this.$router.push({ name: "EventDetails" });
    },
  },
};
</script>
