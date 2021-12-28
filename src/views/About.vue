<template>
  <div class="about">
    <h1>About page</h1>
    <p>{{ test }}</p>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    test() {
      return this.$store.getters["getTest"];
    },
  },
};
</script>
