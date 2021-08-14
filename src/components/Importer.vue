<template>
  <div class="w3-center">
    <p class="w3-xlarge">Import Data</p>
    <p class="w3-jumbo w3-button w3-white w3-hover-white">
      <font-awesome-icon icon="cloud-upload-alt" />
    </p>
    <input class="" @change.prevent="check($event)" type="file" accept=".js" />
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
    check(ev) {
      //delete all record
      // mydb.delete("users");
      this.$store.dispatch("Modal/modalChange", {
        mode: "Import Data",
        id: "",
      });

      const reader = new FileReader();

      //when reading is completed load
      reader.onload = (event) => this.send(JSON.parse(event.target.result));
      // file content as text
      // const text =
      // handle text
      // let arr = JSON.parse(text);
      // arr.map((val) => {
      //   //add to indexeddb
      //   if (val.id && val.name && val.password && val.location) {
      //     // mydb.create("users", val);
      //   }
      // });

      //read as text
      reader.readAsText(ev.target.files[0]);
    },
    send(val) {
      this.$store.dispatch("ExIm/checkImportData", val);
      console.log(val);
    },
  },
  computed: {},
};
</script>
