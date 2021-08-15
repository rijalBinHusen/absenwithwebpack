<template>
  <div>
    <div
      class="w3-xlarge"
      v-for="store in Object.keys(checkImportData)"
      :key="store"
    >
      <span>
        <input type="checkbox" @change="show[store] = !show[store]" />
        {{ store }}
      </span>
      <div :key="value.id" v-for="value in checkImportData[store]">
        <span class="w3-small" v-if="show[store]">
          <input type="checkbox" checked /> {{ value.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImporterForm",
  data() {
    return {
      show: {},
      checkImportData: this.$store.getters["ExIm/checkImportData"],
    };
  },
};
</script>
