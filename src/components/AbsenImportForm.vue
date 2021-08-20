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
      reader.onload = (event) => this.extract(event.target.result);

      reader.readAsText(ev.target.files[0]);
    },
    extract(val) {
      let res = val.split("\r\n");
      //send data to vuex
      //   this.$store.dispatch("ExIm/importerData", val);
      // eslint-disable-next-line no-unused-vars
      let tanggal = "";
      let extracting = new Promise((resolve) => {
        res.forEach((val, index) => {
          const temp = val.split(",");
          // jika dia tanggal
          if (temp[6] && temp[6].split("-").length === 3) {
            tanggal = temp[6].split("-")[2] + "-";
            tanggal +=
              new Date(temp[6]).getMonth() < 9
                ? "0" + (new Date(temp[6]).getMonth() + 1) + "-"
                : new Date(temp[6]).getMonth() + 1 + "-";
            tanggal += temp[6].split("-")[0];
            // console.log(temp[3])
          }
          //jika ada tanggal dan dia absen
          else {
            if (tanggal) {
              !isNaN(temp[3]) && temp[3].length > 4
                ? this.$store.dispatch("Absen/tambah", {
                    id: this.generator(20),
                    tanggal: tanggal,
                    karyawan: temp[3],
                    masuk: temp[13],
                    istirahat: "1",
                    pulang: temp[15],
                    keterangan: temp[13] ? "" : "Tidak masuk",
                  })
                : false;
            }
          }
          if (index + 1 === res.length) resolve();
        });
      });
      extracting.then(() => {
        this.$store.dispatch("Absen/absen", { mode: "", id: "" });
        this.$store.dispatch("Navbar/gotoNav", "Absen");
        this.$store.dispatch("Modal/modalChange", { mode: "", id: "" });
      });
    },
    generator(length) {
      let str =
        "qwertyuiopasdfghjkllzxcvbnm1234567890QWERYUIOPASDFGHJKLZXCVBNM";
      let result = "";
      for (let i = 1; i <= Number(length); i++) {
        result += str[Math.round(Math.random() * (str.length - 1))];
      }
      return result;
    },
  },
};
</script>
