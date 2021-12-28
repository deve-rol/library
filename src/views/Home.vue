<template>
  <div class="home">
    <h1>Home page</h1>
    <ui-checkbox
      v-model="checkbox"
      label="test"
      color="var(--primary-color)"
      value="test1"
    ></ui-checkbox>
    <ui-checkbox
      v-model="checkbox"
      label="test2"
      color="var(--red-color)"
      value="test2"
    >
      <span>Label</span>
    </ui-checkbox>
    {{ checkbox }}

    <ui-radio-button
      v-model="radio"
      label="test3"
      color="var(--primary-color)"
      value="test3"
    ></ui-radio-button>

    <ui-radio-button
      v-model="radio"
      label="test4"
      color="var(--red-color)"
      value="test4"
    >
      <span>Label</span>
    </ui-radio-button>
    {{ radio }}

    <ui-switch v-model="switcher"></ui-switch>
    {{ switcher }}

    <ui-switch v-model="switcher2" color="var(--red-color)"></ui-switch>
    {{ switcher2 }}

  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      checkbox: [],
      radio: "",
      switcher: true,
      switcher2: false,
      test: 0,
    };
  },
  mounted() {
    this.$store.dispatch("A_TEST", 3).then((res) => {
      console.log(res, 111);
    });
  },
};
</script>

<style lang="scss" scoped>
.home {
  padding: 80px;
}
</style>
