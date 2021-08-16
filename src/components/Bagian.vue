<template>
  <div class="w3-center">
    <ul class="w3-ul">
      <li class="w3-xlarge">
        Daftar bagian
        <button
          @click="modalChange"
          class="w3-button w3-teal w3-round w3-small"
        >
          <font-awesome-icon icon="plus" />
        </button>
      </li>

      <li v-for="bag in bagian" :key="bag.id" class="w3-hover-light-gray">
        {{ bag.name }}
        <a @click="edit(bag.id)" class="w3-right w3-tag w3-teal w3-round">
          Edit <font-awesome-icon icon="pencil-alt" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Bagian",
  methods: {
    modalChange() {
      this.$store.dispatch("Modal/modalChange", { mode: "Tambah", id: "" });
    },
    edit(id) {
      this.$store.dispatch("Modal/modalChange", { mode: "Update", id: id });
    },
  },
  computed: {
    bagian() {
      return this.$store.getters["Bagian/bagian"];
    },
  },
};
</script>
