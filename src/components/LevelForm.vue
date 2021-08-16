<template>
  <div class="">
    <h1 class="w3-left">Masukkan nama level</h1>
    <form @submit.prevent="send">
      <input
        type="text"
        class="w3-input w3-margin-bottom"
        placeholder="Masukkan level"
        :value="level.name"
        @change="level.name = $event.target.value"
      />
      <h1 class="w3-left">Masukkan jam kerja</h1>
      <input
        type="number"
        :value="level.jamKerja"
        class="w3-input w3-margin-bottom"
        maxlength="2"
        placeholder="Masukkan jam kerja"
        @change="level.jamKerja = $event.target.value"
      />

      <input
        type="submit"
        class="w3-button w3-left w3-margin-top w3-teal w3-round-large"
        :value="level.id ? 'Update' : 'Tambah'"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: "LevelForm",
  data: function () {
    return {
      //check mode is edit or add
      level: this.$store.getters["Level/edit"]
        ? //if mode is edit
          this.$store.getters["Level/edit"]
        : //if mode is add
          {
            name: "",
            jamKerja: "",
          },
    };
  },
  methods: {
    send() {
      //check what mode, update or add
      this.$store.getters["Level/edit"]
        ? //if mode is update
          this.$store.dispatch("Level/update", this.level)
        : //if mode is add
          this.$store.dispatch("Level/tambah", this.level);
      //close the modal
      this.$store.dispatch("Modal/modalChange", { mode: "", id: "" });
    },
  },
  computed: {},
};
</script>
