<template>
  <div class="">
    <h1 class="w3-left">Masukkan nama bagian</h1>
    <form @submit.prevent="send">
      <input
        type="text"
        class="w3-input w3-margin-bottom"
        placeholder="Masukkan bagian"
        :value="bagian.name"
        @change="bagian.name = $event.target.value"
      />

      <input
        type="submit"
        :class="[
          'w3-button w3-left w3-margin-top w3-round',
          bagian.name ? 'w3-teal' : 'w3-disabled w3-red',
        ]"
        :value="bagian.id ? 'Update' : 'Tambah'"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: "BagianForm",
  data: function () {
    return {
      //check mode is edit or add
      bagian: this.$store.getters["Bagian/edit"]
        ? //if mode is edit
          JSON.parse(this.$store.getters["Bagian/edit"])
        : //if mode is add
          { name: "" },
    };
  },
  methods: {
    send() {
      //check what mode, update or add
      this.bagian.id
        ? //if mode is update
          this.$store.dispatch("Bagian/update", this.bagian)
        : //if mode is add
          this.$store.dispatch("Bagian/tambah", this.bagian);
      //close the modal
      this.$store.dispatch("Modal/modalChange", { mode: "", id: "" });
    },
  },
  computed: {},
};
</script>
