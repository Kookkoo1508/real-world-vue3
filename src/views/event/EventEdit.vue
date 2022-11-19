<template>
  <p>Edit Event Here</p>
</template>

<script>
export default {
  props: ["event"],
  data() {
    return {
      unsavedChange: true,
    };
  },
  beforeRouteLeave() {
    // Router V3
    // if (this.unsavedChange) {
    //   const answer = window.confirm(
    //     "Are you sure want to leave?, you have not submit Order"
    //   );
    //   if (answer) {
    //     next();
    //   } else {
    //     next(false);
    //   }
    // } else {
    //   next();
    // }

    // Router V4
    if (this.unsavedChange) {
      const answer = window.confirm(
        "Are you sure want to leave?, you have not submit Order"
      );

      if (!answer) {
        return false;
      }
    }
  },
};
</script>
