<template>
  <h4>Oops! The {{ resource }} you're looking for is not exist</h4>
  <router-link :to="{ name: 'EventList' }">Back to the Home Page</router-link>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      required: true,
      default: "page",
    },
  },
};
</script>
