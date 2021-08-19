<template>
  <div>
    <form @submit.prevent="send">
      <div class="w3-row w3-section">
        <!-- date field -->
        <span>
          <div class="w3-col w3-left w3-xlarge" style="width: 150px">
            <span class="w3-left">
              <font-awesome-icon icon="calendar" />
              Tanggal
            </span>
          </div>
          <div class="w3-rest">
            <input
              type="date"
              :value="absen.tanggal"
              placeholder="Masukkan Tanggal"
              class="w3-input w3-margin-bottom w3-border"
              @change="absen.tanggal = $event.target.value"
            />
          </div>
        </span>
        <!-- End of date field -->

        <!-- Karyawan field -->
        <span>
          <div class="w3-col w3-xlarge" style="width: 150px">
            <span class="w3-left">
              <font-awesome-icon icon="user" />
              Karyawan
            </span>
          </div>
          <div class="w3-rest">
            <input
              type="text"
              :value="karyawanField || absen.karyawan"
              class="w3-input w3-margin-bottom w3-border"
              @change="cekKaryawan($event.target.value)"
              list="daftarKaryawan"
            />
            <datalist id="daftarKaryawan">
              <option v-for="(kar, index) in karyawan" :key="kar.id">
                {{ index + " - " + kar.idKaryawan + " - " + kar.nama }}
              </option>
            </datalist>
          </div>
        </span>
        <!-- end of karyawan field -->

        <!-- Masuk field -->
        <span>
          <div class="w3-xlarge w3-col" style="width: 150px">
            <span class="w3-left">
              <font-awesome-icon icon="clock" />
              Masuk
            </span>
          </div>
          <div class="w3-rest">
            <input
              type="time"
              max="5"
              :value="absen.masuk"
              placeholder="Masukkan jam masuk"
              class="w3-input w3-margin-bottom w3-border"
              @change="absen.masuk = $event.target.value"
            />
          </div>
        </span>
        <!-- End of masuk field -->

        <!-- Istiratah field -->
        <span>
          <div class="w3-xlarge w3-col" style="width: 150px">
            <span class="w3-left">
              <font-awesome-icon icon="bed" /> Istirhat
            </span>
          </div>
          <div class="w3-rest">
            <input
              type="number"
              max="1"
              :value="absen.istirahat"
              placeholder="Istirahat"
              class="w3-input w3-margin-bottom w3-border"
              @change="absen.istirahat = $event.target.value"
            />
          </div>
        </span>
        <!-- end of istirahat field -->

        <!-- Pulang field -->
        <span>
          <div class="w3-col w3-xlarge" style="width: 150px">
            <span class="w3-left">
              <font-awesome-icon icon="clock" />
              Pulang
            </span>
          </div>
          <div class="w3-rest">
            <input
              type="time"
              max="5"
              :value="absen.pulang"
              @change="absen.pulang = $event.target.value"
              placeholder="Pulang"
              class="w3-input w3-margin-bottom w3-border"
            />
          </div>
        </span>
        <!-- End of pulang field -->

        <!-- Keterangan field -->
        <span>
          <div class="w3-xlarge w3-col" style="width: 150px">
            <span class="w3-left">
              <font-awesome-icon icon="thumbtack" />
              Keterangan
            </span>
          </div>
          <div class="w3-rest">
            <input
              type="text"
              :value="absen.keterangan"
              @change="absen.keterangan = $event.target.value"
              placeholder="Keterangan"
              class="w3-input w3-margin-bottom w3-border"
            />
          </div>
          <!-- Keterangan field -->
        </span>
      </div>
      <!--Tombol -->
      <div class="">
        <!--Tombol untuk import record-->
        <span>
          <input
            type="button"
            class="
              w3-left
              w3-border-teal
              w3-border
              w3-white
              w3-hover-white
              w3-round
              w3-button
            "
            value="Import"
            @click="gotoNav('AbsenImport')"
          />
        </span>

        <!--Tombol untuk tambah record-->
        <span class="w3-right">
          <input
            type="submit"
            class="w3-left w3-teal w3-round w3-button"
            :value="absen.id ? 'Update' : 'Tambah'"
          />
        </span>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AbsenForm",
  data() {
    return {
      absen: this.$store.getters["Absen/edit"]
        ? JSON.parse(this.$store.getters["Absen/edit"])
        : {
            tanggal: "",
            karyawan: "",
            masuk: "",
            istirahat: "",
            pulang: "",
            keterangan: "",
          },
      karyawan: JSON.parse(this.$store.getters["Karyawan/karyawan"]),
      karyawanField: "",
    };
  },
  methods: {
    send() {
      ///if not every field not null
      !Object.values(this.absen).includes("")
        ? this.absen.id
          ? this.$store.dispatch("Absen/update", this.absen)
          : this.$store.dispatch("Absen/tambah", this.absen)
        : false;
      //close the modal
      this.$store.dispatch("Modal/modalChange", { mode: "", id: "" });
    },
    cekKaryawan(ev) {
      if (this.karyawan[ev.split(" - ")[0]]) {
        this.karyawanField =
          this.karyawan[ev.split(" - ")[0]].idKaryawan +
          " / " +
          this.karyawan[ev.split(" - ")[0]].nama;
        //
        this.absen.karyawan = JSON.parse(
          this.$store.getters["Karyawan/karyawanId"](
            this.karyawan[ev.split(" - ")[0]].id
          )
        ).id;
      }
    },
    gotoNav(nav) {
      this.$store.dispatch("Navbar/gotoNav", nav);
    },
  },
};
</script>
