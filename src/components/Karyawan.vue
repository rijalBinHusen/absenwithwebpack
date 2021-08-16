<template>
  <div class="w3-center">
    <ul class="w3-ul">
      <li class="w3-xlarge">
        Daftar karyawan
        <!-- <select class="w3-large" @change="divisiSelect = $event.target.value">
          <option value="">Pilih Divisi</option>
          <option v-for="div in divisi" :value="div.id_divisi">
            {{ div.divisi }}
          </option>
        </select> -->
        <button
          @click="modalChange"
          class="w3-button w3-teal w3-round w3-small"
        >
          <font-awesome-icon icon="plus" />
        </button>
      </li>
    </ul>

    <!-- <ul class="w3-ul">
      <li v-for="kar in karyawan" :key="kar.id">
        {{
          kar.nama +
          " - " +
          kar.divisi +
          " - " +
          kar.bagian +
          " - " +
          kar.level +
          " - "
        }}
      </li>
    </ul> -->
    <datatable
      :heads="['idKaryawan', 'nama', 'bagian', 'level']"
      :datanya="karyawan"
      :option="['edit']"
      :keydata="'id'"
      :icon="'pencil-alt'"
      :id="'table_karyawan'"
      @edit="edit($event)"
    >
    </datatable>
  </div>
</template>

<script>
import Datatable from "./Datatable.vue";

export default {
  name: "Karyawan",
  methods: {
    modalChange() {
      this.$store.dispatch("Modal/modalChange", { mode: "Tambah", id: "" });
      console.log(this.$store.getters["Karyawan/karyawan"]);
    },
  },
  computed: {
    karyawan() {
      return this.$store.getters["Karyawan/karyawan"];
    },
  },
  components: {
    Datatable,
  },
};
</script>
