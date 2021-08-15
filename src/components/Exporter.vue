<template>
  <div>
    <p class="w3-xlarge">Export Data</p>
    <span class="w3-jumbo w3-button w3-white w3-hover-white">
      <!-- <a @click.prevent="download('data.js', 'text/plain')"> -->
      <a @click.prevent="exportDataCollect('start')">
        <font-awesome-icon style="color: teal" icon="cloud-download-alt" />
      </a>
    </span>
    <p class="w3-xlarge">Exported :</p>
    <ul class="">
      <li :key="expor.time" v-for="expor in exportData">
        {{ expor.time }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Exporter",
  data() {
    return {
      exportData: this.$store.getters["ExIm/exportData"].sort(
        (a, b) => b.time - a.time
      ),
      status: true,
    };
  },
  methods: {
    //trigeer methods untuk collect data
    exportDataCollect(cond) {
      if (cond == "start") {
        //jadikan status menjadi fallse agar dick lagi
        this.status = false;
        //trigger methods divuex untuk collect data
        this.$store.dispatch("ExIm/exportDataCollect");
        //periksa apakah sudah tercollect atau tidak
        this.checkDataCollect();
      } else {
        //periksa status progress export
        this.status = this.$store.getters["ExIm/statusExport"];
        //cek apakah progres suda selessai atau tidak
        this.checkDataCollect();
        console.log("Mulai lagi")
      }
    },
    //periksa apakah collect data sudah selelsai
    checkDataCollect() {
      // status: this.$store.getters["ExIm/statusExport"]
      this.status
        ? //jika sudah
          this.download("data.js", "text/plain")
        : //jike belum jalankan lagi exportDataCollect
          setTimeout(() => {
            this.exportDataCollect();
          }, 3000);
    },
    download(fileName, contentType) {
      //append time to export record
      this.$store.dispatch("ExIm/exportAppend");
      var a = document.createElement("a");
      var file = new Blob(
        [JSON.stringify(this.$store.getters["ExIm/exportDataCollect"])],
        {
          type: contentType,
        }
      );
      a.href = URL.createObjectURL(file);
      a.download = fileName;
      a.click();
      //destroy data collect
      this.$store.dispatch("ExIm/destroyDataCollect");
    },
    // download(jsonData, 'json.txt', 'text/plain');
  },
};
</script>
