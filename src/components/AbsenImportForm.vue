<template>
  <div>
    <p class="w3-xlarge">Import Absen</p>
    <input
      class="w3-hide"
      @change.prevent="read($event)"
      type="file"
      accept=".csv"
      ref="importerAbsen"
      multiple
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
    read(ev) {
      //buka loader
      this.$store.dispatch("Modal/loading", "open");

      setTimeout(() => {
        this.$store.dispatch("Modal/loading", "close");
        this.$store.dispatch("Absen/absen");
      }, 1500 * ev.target.files.length);

      for (let i = 0; i < ev.target.files.length; i++) {
        this.impor(ev.target.files[i]);
      }
    },
    impor(files) {
      // console.log(ev);
      const reader = new FileReader();

      //when reading is completed load
      reader.onload = (event) => this.extract(event.target.result);

      reader.readAsText(files);
    },
    extract(val) {
      let res = val.split("\r\n");
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
                    istirahat:
                      new Date(tanggal).getDay() === 6 &&
                      this.jamTotal(temp[13], temp[15], 0) === 5
                        ? "0"
                        : "1",
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
        this.$store.dispatch("Navbar/gotoNav", "Absen");
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
    jamTotal(masuk, pulang, istirahat) {
      let Amasuk = masuk.split(":")[0];
      let Apulang = pulang.split(":")[0];

      if (Amasuk > Apulang) {
        return Number(Apulang) + 24 - (Number(Amasuk) + 1) - istirahat;
      }

      return Number(Apulang) - (Number(Amasuk) + 1) - istirahat;
    },
  },
};
</script>
