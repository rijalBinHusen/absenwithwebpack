<template>
  <div class="w3-center">
    <div class="w3-xxlarge">
      Absensi
      <button @click="modalChange" class="w3-button w3-teal w3-round w3-small">
        <font-awesome-icon icon="plus" />
      </button>
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
      <!-- <span class="w3-large w3-dropdown-hover">

							<button class="w3-button w3-teal w3-round">Tampilkan column</button>
							<div 
							class="w3-dropdown-content w3-bar-block w3-border"
							>	
								<label
								class="w3-bar-item w3-button w3-hover-pale-blue"
								v-for="head in header""
								
								>
									<input @click="changeData(head)" :checked="headShow.includes(head)" type="checkbox" :value="head"> {{head}} 
								</label>
							</div>
						</span> -->
    </div>

    <Datatable
      :heads="[
        'tanggal',
        'nama',
        'divisi',
        'bagian',
        'level',
        'jamKerja',
        'masuk',
        'istirahat',
        'pulang',
        'keterangan',
      ]"
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
  computed: {
    absen() {
      let result = new Array();
      JSON.parse(this.$store.getters["Absen/absen"]).map((val, index) => {
        result[index] = val;
        let karyawan = JSON.parse(
          this.$store.getters["Karyawan/karyawanId"](val.karyawan)
        );
        result[index].nama = karyawan.nama;
        result[index].divisi = karyawan.divisi;
        result[index].bagian = karyawan.bagian;
        result[index].level = karyawan.level;
        result[index].jamKerja = karyawan.jamKerja;
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
  },
  components: {
    Datatable,
  },
};
</script>
