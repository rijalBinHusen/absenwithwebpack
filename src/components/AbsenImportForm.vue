<template>
  <div>
    <p class="w3-xlarge">Import Absen</p>
    <input
      class="w3-hide"
      @change.prevent="impor($event)"
      type="file"
      accept=".csv"
      ref="importerAbsen"
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
  name: "AbsenImportForm",
  methods: {
    importerField() {
      this.$refs.importerAbsen.click();
    },
    impor(ev) {
      //buka loader
      this.$store.dispatch("Modal/loading", "open");
      // console.log(ev);
      const reader = new FileReader();

      //when reading is completed load
      reader.onload = (event) => this.send(event.target.result);

      reader.readAsText(ev.target.files[0]);
    },
    send(val) {
      let res = val.split("\r\n");
      //send data to vuex
      //   this.$store.dispatch("ExIm/importerData", val);
      // eslint-disable-next-line no-unused-vars
      let tanggal = "";
      let absen = [];
      res.forEach((val) => {
        const temp = val.split(",,");
        //jika dia tanggal
        if (temp[3] && temp[3].split("-").length === 3) {
          tanggal += temp[3].split("-")[2] + "-";
          tanggal += new Date(temp[3]).getMonth() + 1 + "-";
          tanggal += temp[3].split("-")[0];
          // console.log(temp[3])
        }
        //jika ada tanggal dan dia absen
        else {
          if (tanggal) {
            !isNaN(temp[1]) && temp[1].length > 4
              ? absen.push({
                  tanggal: tanggal,
                  karyawan: temp[1],
                  masuk: temp[6],
                  istirahat: "1",
                  pulang: temp[7],
                  keterangan: "",
                })
              : false;
          }
        }
        // console.log(temp)
      });
      console.log(tanggal)
      console.log(absen);
    },
  },
};
</script>
