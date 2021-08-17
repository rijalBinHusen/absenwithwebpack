<template>
  <div class="w3-center">
    <ul class="w3-ul">
      <li class="w3-xlarge">
        Daftar karyawan
        <button
          @click="modalChange"
          class="w3-button w3-teal w3-round w3-small"
        >
          <font-awesome-icon icon="plus" />
        </button>
      </li>
    </ul>
    <datatable
      :heads="['idKaryawan', 'nama', 'divisi', 'bagian', 'level']"
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
    },
    edit(id) {
      this.$store.dispatch("Modal/modalChange", { mode: "Update", id: id });
    },
  },
  computed: {
    karyawan() {
      let result = [];
      // eslint-disable-next-line no-unused-vars
      JSON.parse(this.$store.getters["Karyawan/karyawan"]).map((val, index) => {
        result.push(val);
        result[index].divisi = JSON.parse(
          this.$store.getters["Divisi/divisiId"](val.divisi)
        ).name;
        result[index].bagian = JSON.parse(
          this.$store.getters["Bagian/bagianId"](val.bagian)
        ).name;
        result[index].level = JSON.parse(
          this.$store.getters["Level/levelId"](val.level)
        ).name;
      });
      return result;
    },
  },
  components: {
    Datatable,
  },
};
</script>
