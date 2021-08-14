<template>
  <h1>{{ checkImportData }}</h1>
</template>

<script>
export default {
  name: "ImporterForm",
  data() {
    return {
      checkImportData: this.$store.getters["ExIm/checkImportData"],
    };
  },
};
</script>
