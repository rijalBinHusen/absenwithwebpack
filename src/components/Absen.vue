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
    <br /><br />
    <div class="w3-xlarge w3-border">
      Dari tanggal :
      <input class="w3-button w3-large w3-white w3-hover-white" type="date" />
      Sampai tanggal :
      <input class="w3-button w3-large w3-white w3-hover-white" type="date" />
      <input
        class="
          w3-medium w3-tag w3-border-white w3-round w3-white w3-hover-white
        "
        type="submit"
        value="Tampilkan"
      />
    </div>

    <Datatable
      :heads="headShow"
      :datanya="absen"
      :option="['edit']"
      :keydata="'id'"
      @edit="edit($event)"
    />
  </div>
</template>

<script>
import Datatable from "./Datatable.vue";

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
        result[index].jamKerja = karyawan.jamKerja;
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
  },
  components: {
    Datatable,
  },
};
</script>
