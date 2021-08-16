<template>
  <div class="w3-center">
    <ul class="w3-ul">
      <li class="w3-xlarge">
        Daftar level karyawan
        <button
          @click="modalChange"
          class="w3-button w3-teal w3-round w3-small"
        >
          <font-awesome-icon icon="plus" />
        </button>
      </li>

      <li v-for="lev in level" :key="lev.id" class="w3-hover-light-gray">
        {{ lev.name }}
        <a @click="edit(bag.id)" class="w3-right w3-tag w3-teal w3-round">
          Edit <font-awesome-icon icon="pencil-alt" />
        </a>
      </li>
    </ul>
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
