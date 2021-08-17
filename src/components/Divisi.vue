<template>
  <div class="w3-center">
    <ul class="w3-ul">
      <li class="w3-xlarge">
        Daftar divisi
        <button
          @click="modalChange"
          class="w3-button w3-teal w3-round w3-small"
        >
          <font-awesome-icon icon="plus" />
        </button>
      </li>

      <li v-for="div in divisi" :key="div.id" class="w3-hover-light-gray">
        {{ div.name }}
        <a @click="edit(div.id)" class="w3-right w3-tag w3-teal w3-round">
          Edit <font-awesome-icon icon="pencil-alt" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Divisi",
  methods: {
    modalChange() {
      this.$store.dispatch("Modal/modalChange", { mode: "Tambah", id: "" });
    },
    edit(id) {
      this.$store.dispatch("Modal/modalChange", { mode: "Update", id: id });
    },
  },
  computed: {
    divisi() {
      return JSON.parse(this.$store.getters["Divisi/divisi"]);
    },
  },
};
</script>
