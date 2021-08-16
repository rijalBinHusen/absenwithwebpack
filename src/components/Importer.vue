<template>
  <div class="w3-center">
    <span class="w3-xlarge">
      <p>Data akan dihapus sebelum import</p>
      <span
        :class="[
          'w3-jumbo w3-button w3-white w3-hover-white',
          !importData[0].status || importData[0].status == 'imported'
            ? 'w3-disabled'
            : '',
        ]"
      >
        <font-awesome-icon
          @click="destroy($event.target)"
          :style="[
            !importData[0].status || importData[0].status == 'imported'
              ? 'color:red'
              : 'color:teal',
          ]"
          icon="trash-alt"
        />
      </span>
      <p>
        {{
          !importData[0].status || importData[0].status == "imported"
            ? "Import tidak tersedia sebelum export data"
            : "Import data tersedia"
        }}
      </p>
    </span>
    <p>Imported :</p>
    <ul>
      <li
        :class="[impor.status == 'imported' ? '' : 'w3-hide']"
        v-for="impor in importData"
        :key="impor.status"
      >
        {{ new Date(impor.time) }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Importer",
  data() {
    return {
      importData: this.$store.getters["ExIm/importData"],
    };
  },
  methods: {
    destroy() {
      // delete all data indexeddb
      this.$store.dispatch("ExIm/emptyAll");
      //open modal
      this.$store.dispatch("Modal/modalChange", {
        mode: "Data",
        id: "",
      });
    },
  },
  computed: {},
};
</script>
