<template>
  <div>
    <!-- Id karyawan -->
    <div>
      <label class="w3-left">
        <h3>
          <font-awesome-icon icon="fingerprint" />
          Id karyawan
        </h3>
      </label>

      <input
        type="text"
        :value="karyawan.idKaryawan"
        placeholder="Tidak boleh ada sama dengan yang lain"
        :class="['w3-input w3-margin-bottom']"
        @change="karyawan.idKaryawan = $event.target.value"
      />
    </div>
    <!-- End of Id karyawan -->

    <!-- Nama Karyawan -->
    <div>
      <label class="w3-left">
        <h3>
          <font-awesome-icon icon="user" />
          Nama karyawan
        </h3>
      </label>

      <input
        type="text"
        :value="karyawan.nama"
        class="w3-input w3-margin-bottom"
        @change="karyawan.nama = $event.target.value"
        placeholder="Masukkan nama karyawan"
      />
    </div>
    <!-- End of nama Karyawan -->

    <!-- Divisi karyawan -->
    <div>
      <label class="w3-left">
        <h3>
          <font-awesome-icon icon="archway" />
          Divisi
        </h3>
      </label>
      <select
        @change="karyawan.divisi = $event.target.value"
        class="w3-input w3-margin-top"
        required
        :value="karyawan.divisi"
      >
        <option value="" selected>Pilih divisi</option>
        <option v-for="div in divisi" :key="div.id" :value="div.id">
          {{ div.name }}
        </option>
      </select>
    </div>
    <!-- End of divisi karyawan -->

    <!-- Bagian karyawan -->
    <div>
      <label class="w3-left">
        <h3>
          <font-awesome-icon icon="user-cog" />
          Bagian
        </h3>
      </label>
      <select
        @change="karyawan.bagian = $event.target.value"
        class="w3-input w3-margin-top"
        :value="karyawan.bagian"
        required
      >
        <option value="" selected>Pilih Bagian</option>
        <option v-for="bag in bagian" :key="bag.id" :value="bag.id">
          {{ bag.name }}
        </option>
      </select>
    </div>
    <!-- End of Bagian karyawan -->

    <!-- Level karyawan -->
    <div>
      <label class="w3-left">
        <h3>
          <font-awesome-icon icon="user" />
          Level
        </h3>
      </label>
      <select
        @change="karyawan.level = $event.target.value"
        class="w3-input w3-margin-top"
        :value="karyawan.level"
        required
      >
        <option value="" selected>Pilih Level</option>
        <option v-for="lev in level" :key="lev.id" :value="lev.id">
          {{ lev.name }}
        </option>
      </select>
    </div>
    <!-- End of Level karyawan -->

    <!--Tombol untuk tambah record-->
    <input
      type="submit"
      :class="[
        'w3-button w3-left w3-margin-top w3-round',
        Object.values(karyawan).includes('')
          ? 'w3-disabled w3-red'
          : 'w3-teal ',
      ]"
      :value="[karyawan.id ? 'Update' : 'Tambah']"
      @click="send"
    />

    <!--
                -->
  </div>
</template>
<script>
export default {
  name: "KaryawanForm",
  data() {
    return {
      karyawan: this.$store.getters["Karyawan/edit"]
        ? //if mode is edit
          JSON.parse(this.$store.getters["Karyawan/edit"])
        : //if mode is add{
          { idKaryawan: "", nama: "", divisi: "", bagian: "", level: "" },
      divisi: this.$store.getters["Divisi/divisi"],
      bagian: this.$store.getters["Bagian/bagian"],
      level: this.$store.getters["Level/level"],
    };
  },
  methods: {
    send() {
      !Object.values(this.karyawan).includes("")
        ? this.$store.dispatch("Karyawan/tambah", this.karyawan)
        : this.$store.dispatch("Karyawan/update", this.karyawan)
      //close the modal
      this.$store.dispatch("Modal/modalChange", { mode: "", id: "" });
    },
  },
};
</script>
