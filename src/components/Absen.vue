<template>
  <div class="w3-center">
    <div class="w3-xxlarge">
      Absensi
      <button @click="modalChange" class="w3-button w3-teal w3-round w3-small">
        <font-awesome-icon icon="plus" />
      </button>
      <span class="w3-margin-left w3-dropdown-hover">
        <button class="w3-small w3-button w3-teal w3-round">Column</button>
        <span class="w3-small w3-dropdown-content w3-bar-block w3-border">
          <label
            class="w3-bar-item w3-button w3-hover-pale-blue"
            v-for="head in header"
            :key="head"
          >
            <input
              @click="toggleHead(head)"
              :checked="headShow.includes(head)"
              type="checkbox"
              :value="head"
            />
            {{ head }}
          </label>
        </span>
      </span>
    </div>
    <br />
    <div class="w3-xlarge w3-border">
      Dari tanggal :
      <input
        :value="tanggalMulai"
        @change="tanggalMulai = $event.target.value"
        class="w3-button w3-large w3-white w3-hover-white"
        type="date"
      />
      Sampai tanggal :
      <input
        :value="tanggalSampai"
        @change="tanggalSampai = $event.target.value"
        class="w3-button w3-large w3-white w3-hover-white"
        type="date"
      />
      <input
        class="
          w3-medium w3-tag w3-border-white w3-round w3-white w3-hover-white
        "
        @click="tampilkan"
        type="submit"
        value="Tampilkan"
      />
      <input
        class="w3-medium w3-tag w3-border-white w3-round w3-teal w3-hover-white"
        @click="startDownload"
        type="submit"
        value="Download"
      />
    </div>

    <Datatable
      :heads="headShow"
      :datanya="absen"
      :option="['edit', 'delete']"
      :keydata="'id'"
      @edit="edit($event)"
      @delete="del($event)"
      :id="'table_absen'"
      v-if="!downloading"
    />

    <Dialog v-if="dialog" :danger="danger" @del="del($event)" />
  </div>
</template>

<script>
import Datatable from "./Datatable.vue";
import Dialog from "./Dialog.vue";

export default {
  name: "Absen",
  data() {
    return {
      // header toggle
      header: [
        "tanggal",
        "idKaryawan",
        "nama",
        "divisi",
        "bagian",
        "level",
        "masuk",
        "istirahat",
        "pulang",
        "total",
        "jamKerja",
        "selisih",
        "keterangan",
      ],
      //original header
      headShow: localStorage.getItem("headShow")
        ? localStorage.getItem("headShow").split(",")
        : [
            "tanggal",
            "idKaryawan",
            "nama",
            "divisi",
            "bagian",
            "level",
            "masuk",
            "istirahat",
            "pulang",
            "total",
            "jamKerja",
            "selisih",
            "keterangan",
          ],
      tanggalMulai: localStorage.getItem("tanggalMulai")
        ? localStorage.getItem("tanggalMulai")
        : "",
      tanggalSampai: localStorage.getItem("tanggalSampai")
        ? localStorage.getItem("tanggalSampai")
        : "",
      dialog: false,
      danger: false,
      downloading: false,
    };
  },
  computed: {
    absen() {
      let result = new Array();
      JSON.parse(this.$store.getters["Absen/absen"]).map((val, index) => {
        result[index] = val;
        let karyawan = JSON.parse(
          this.$store.getters["Karyawan/karyawanId"](val.karyawan)
        );
        result[index].idKaryawan = karyawan.idKaryawan;
        result[index].nama = karyawan.nama;
        result[index].divisi = karyawan.divisi;
        result[index].bagian = karyawan.bagian;
        result[index].level = karyawan.level;
        result[index].jamKerja = karyawan.jamKerja
          ? karyawan.jamKerja[new Date(val.tanggal).getDay()]
          : 0;
        result[index].total = this.jamTotal(
          val.masuk,
          val.pulang,
          val.istirahat
        );
        result[index].selisih = result[index].total - result[index].jamKerja;
      });
      return result;
    },
  },
  methods: {
    modalChange() {
      this.$store.dispatch("Modal/modalChange", { mode: "Tambah", id: "" });
    },
    edit(id) {
      this.$store.dispatch("Modal/modalChange", { mode: "Update", id: id });
    },
    toggleHead(val) {
      //if the head is show
      if (this.headShow.includes(val)) {
        this.headShow.splice(this.headShow.indexOf(val), 1);
      } //else
      else {
        let newValue = [];
        this.header.map((nowVal) => {
          this.headShow.includes(nowVal) || nowVal == val
            ? newValue.push(nowVal)
            : false;
        });
        this.headShow = newValue;
      }
      localStorage.setItem("headShow", this.headShow);
    },
    jamTotal(masuk, pulang, istirahat) {
      let Amasuk = masuk.split(":")[0];
      let Apulang = pulang.split(":")[0];

      if (Amasuk > Apulang) {
        return Number(Apulang) + 24 - (Number(Amasuk) + 1) - istirahat;
      }

      return Number(Apulang) - (Number(Amasuk) + 1) - istirahat;
    },
    tampilkan() {
      localStorage.setItem("tanggalMulai", this.tanggalMulai);
      localStorage.setItem("tanggalSampai", this.tanggalSampai);
      //jika 2 tanggal sama
      if (this.tanggalMulai == this.tanggalSampai) {
        this.$store.dispatch("Absen/tanggal", { tanggal: this.tanggalMulai });
      }
      //jika 2 tanggal tidak sama
      else {
        this.getDaysArray(this.tanggalMulai, this.tanggalSampai).length < 8
          ? this.$store.dispatch(
              "Absen/tanggal",
              this.getDaysArray(this.tanggalMulai, this.tanggalSampai)
            )
          : this.del("danger");
      }
    },
    getDaysArray(start, end) {
      let arr = [];
      for (
        let dt = new Date(start);
        dt <= new Date(end);
        dt.setDate(dt.getDate() + 1)
      ) {
        arr.push(new Date(dt));
      }
      return arr.map((val) => val.toISOString().slice(0, 10));
    },
    del(val) {
      if (val === "cancel") {
        this.dialog = false;
        this.danger = "";
      } else if (val === "yes") {
        this.$store.dispatch("Absen/hapus", this.dialog);
        this.dialog = false;
      } else if (val === "danger") {
        this.danger =
          "Mohon Maaf, demi kelancaran aplikasi, kami tidak dapat menampilkan data lebih dari 7 hari, data yang melebihi periode tersebut hanya bisa didownload!";
        this.dialog = true;
      } else {
        this.dialog = val;
      }
    },
    startDownload() {
      localStorage.setItem("tanggalMulai", this.tanggalMulai);
      localStorage.setItem("tanggalSampai", this.tanggalSampai);
      //buka loader
      this.$store.dispatch("Modal/loading", "open");
      this.downloading = true;
      let jumlah = this.getDaysArray(this.tanggalMulai, this.tanggalSampai);
      this.$store.dispatch("Absen/tanggal", jumlah);
      setTimeout(
        () => {
          this.download();
        },
        jumlah.length > 1 ? 300 * jumlah.length : 1500
      );
    },
    download() {
      let result = "";
      this.absen.forEach((val, index) => {
        let row = "";
        if (index == 0) {
          Object.keys(val).map((va) => (row += va + ","));
          row += "\r\n";
        }

        Object.values(val).map((va) => (row += va + ","));
        row += "\r\n";

        result += row;
      });

      // download area

      var a = document.createElement("a");
      var file = new Blob([result], {
        type: "application/vnd.ms-excel",
      });
      a.href = URL.createObjectURL(file);
      a.download =
        "Absensi " +
        this.tanggalMulai +
        " sampai " +
        this.tanggalSampai +
        ".csv";
      a.click();
      this.$store.dispatch("Absen/absen");
      this.downloading = false;
      // tutup Loader
      this.$store.dispatch("Modal/loading", "close");
    },
  },
  components: {
    Datatable,
    Dialog,
  },
};
</script>
