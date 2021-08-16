<template>
  <div class="">
    <h1 class="w3-left">Masukkan nama bagian</h1>
    <form @submit.prevent="send">
      <input
        type="text"
        class="w3-input w3-margin-bottom"
        placeholder="Masukkan bagian"
        :value="bagian"
        @change="bagian = $event.target.value"
      />

      <input
        type="submit"
        class="w3-button w3-left w3-margin-top w3-teal w3-round-large"
        :value="this.$store.getters['Bagian/edit'][0] ? 'Update' : 'Tambah'"
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
      bagian: this.$store.getters["Bagian/edit"][0]
        ? //if mode is edit
          this.$store.getters["Bagian/edit"][0].name
        : //if mode is add
          "",
    };
  },
  methods: {
    send() {
      //check what mode, update or add
      this.$store.getters["Bagian/edit"][0]
        ? //if mode is update
          this.$store.dispatch("Bagian/update", {
            name: this.bagian,
            id: this.$store.getters["Bagian/edit"][0].id,
          })
        : //if mode is add
          this.$store.dispatch("Bagian/tambah", this.bagian);
      //close the modal
      this.$store.dispatch("Modal/modalChange", { mode: "", id: "" });
    },
  },
  computed: {},
};
</script>
