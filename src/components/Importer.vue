<template>
  <div class="w3-center">
    <p class="w3-xlarge">Import Data</p>
    <p class="w3-jumbo w3-button w3-white w3-hover-white">
      <font-awesome-icon icon="cloud-upload-alt" />
    </p>
    <input class="" type="file" accept=".js" />
    <p class="w3-xlarge">Imported :</p>
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
      // toExport: {
      //   divisi: this.$store.getters["Divisi/divisi"],
      // },
      // exportData: this.$store.getters["ExIm/exportData"].sort(
      //   (a, b) => b.time - a.time
      // ),
    };
  },
  methods: {
    download(fileName, contentType) {
      this.$store.dispatch("ExIm/exportAppend");
      var a = document.createElement("a");
      var file = new Blob([JSON.stringify(this.toExport)], {
        type: contentType,
      });
      a.href = URL.createObjectURL(file);
      a.download = fileName;
      a.click();
    },
    // download(jsonData, 'json.txt', 'text/plain');
  },
  computed: {},
};
</script>
