<template>
  <div class="">
    <h1 class="w3-left">Masukkan nama divisi</h1>
    <form @submit.prevent="send">
      <input
        type="text"
        class="w3-input w3-margin-bottom"
        placeholder="Masukkan divisi"
        :value="divisi.name"
        @keyup="divisi.name = $event.target.value"
      />

      <input
        type="submit"
        :class="[
          'w3-button w3-left w3-margin-top w3-round',
          divisi.name == '' ? 'w3-disabled w3-red' : 'w3-teal ',
        ]"
        :value="divisi.id ? 'Update' : 'Tambah'"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: "DivisiForm",
  data: function () {
    return {
      //check mode is edit or add
      divisi: this.$store.getters["Divisi/edit"]
        ? //if mode is edit
          this.$store.getters["Divisi/edit"]
        : //if mode is add
          { name: "" },
    };
  },
  methods: {
    send() {
      // check is the field not null
      this.divisi.name !== ""
        ? //check what mode, update or add
          this.divisi.id
          ? //if mode is update
            this.$store.dispatch("Divisi/update", this.divisi)
          : //if mode is add
            this.$store.dispatch("Divisi/tambah", this.divisi)
        : //do nothing if field null
          false;
      //close the modal
      this.$store.dispatch("Modal/modalChange", { mode: "", id: "" });
    },
  },
  computed: {},
};
</script>
