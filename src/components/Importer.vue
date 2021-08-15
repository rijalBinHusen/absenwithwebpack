<template>
  <div class="w3-center">
    <!-- <p class="w3-xlarge">Import Data</p> -->
    <span class="w3-xlarge">
      <p>Data akan dihapus sebelum import</p>
      <span
        @click="destroy"
        :class="[
          'w3-jumbo w3-button w3-white w3-hover-white',
          isAvailable.status ? '' : 'w3-disabled',
        ]"
      >
        <font-awesome-icon
          :style="[isAvailable.status ? 'color:teal' : 'color:red']"
          icon="trash-alt"
        />
      </span>
      <p>
        {{
          isAvailable.status
            ? "Import data tersedia"
            : "Import tidak tersedia sebelum export data"
        }}
      </p>
    </span>

    <!-- <font-awesome-icon icon="cloud-upload-alt" /> -->

    <!-- <input class="" @change.prevent="check($event)" type="file" accept=".js" /> -->
    <!-- <p class="w3-xlarge">Imported :</p> -->
    <!-- <ul class="">
      <li :key="expor.time" v-for="expor in exportData">
        {{ expor.time }}
      </li>
    </ul> -->
  </div>
</template>

<script>
export default {
  name: "Importer",
  data() {
    return {
      isAvailable: this.$store.getters["ExIm/importData"],
    };
  },
  methods: {
    check(ev) {
      const reader = new FileReader();

      //when reading is completed load
      reader.onload = (event) => this.send(JSON.parse(event.target.result));

      reader.readAsText(ev.target.files[0]);
    },
    send(val) {
      //send data to vuex
      this.$store.dispatch("ExIm/checkImportData", val);
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
