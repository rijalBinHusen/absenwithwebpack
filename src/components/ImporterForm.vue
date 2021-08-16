<template>
  <div>
    <p class="w3-xlarge">Import Data</p>
    <input
      class="w3-hide"
      @change.prevent="impor($event)"
      type="file"
      accept=".js"
      ref="importerField"
    /><br />
    <font-awesome-icon
      @click="importerField"
      style="font-size: 80px; cursor: pointer"
      icon="cloud-upload-alt"
    />
  </div>
</template>

<script>
export default {
  name: "ImporterForm",
  methods: {
    importerField() {
      this.$refs.importerField.click();
    },
    impor(ev) {
      //buka loader
      this.$store.dispatch("Modal/loading", "open");
      // console.log(ev);
      const reader = new FileReader();

      //when reading is completed load
      reader.onload = (event) => this.send(JSON.parse(event.target.result));

      reader.readAsText(ev.target.files[0]);
    },
    send(val) {
      //send data to vuex
      this.$store.dispatch("ExIm/importerData", val);
      // console.log(val);
    },
  },
};
</script>
