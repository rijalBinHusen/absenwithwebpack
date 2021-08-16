<template>
  <div class="w3-center">
    <ul class="w3-ul w3-margin-bottom">
      <li class="w3-xlarge">
        Daftar level karyawan
        <button
          @click="modalChange"
          class="w3-button w3-teal w3-round w3-small"
        >
          <font-awesome-icon icon="plus" />
        </button>
      </li>
    </ul>
    <table class="w3-table w3-margin-top">
      <thead>
        <tr class="w3-teal">
          <th>Nama level</th>
          <th>Jam kerja</th>
          <th>Opsi</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="lev in level"
          :key="lev.id"
          class="w3-hover-light-gray w3-border"
        >
          <td>{{ lev.name }}</td>
          <td>{{ lev.jamKerja }}</td>
          <td class="w3-left">
            <a @click="edit(lev.id)" class="w3-right w3-tag w3-teal w3-round">
              Edit <font-awesome-icon icon="pencil-alt" />
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Level",
  methods: {
    modalChange() {
      this.$store.dispatch("Modal/modalChange", { mode: "Tambah", id: "" });
    },
    edit(id) {
      this.$store.dispatch("Modal/modalChange", { mode: "Update", id: id });
    },
  },
  computed: {
    level() {
      return this.$store.getters["Level/level"];
    },
  },
};
</script>
