<template>
  <div class="">
    <h1 class="w3-left">Masukkan nama level</h1>
    <form @submit.prevent="send">
      <input
        type="text"
        class="w3-input w3-margin-bottom"
        placeholder="Masukkan level"
        :value="level"
        @change="level = $event.target.value"
      />

      <input
        type="submit"
        class="w3-button w3-left w3-margin-top w3-teal w3-round-large"
        :value="this.$store.getters['Level/edit'][0] ? 'Update' : 'Tambah'"
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
      level: this.$store.getters["Level/edit"][0]
        ? //if mode is edit
          this.$store.getters["Level/edit"][0].name
        : //if mode is add
          "",
    };
  },
  methods: {
    send() {
      //check what mode, update or add
      this.$store.getters["Level/edit"][0]
        ? //if mode is update
          this.$store.dispatch("Level/update", {
            name: this.level,
            id: this.$store.getters["Level/edit"][0].id,
          })
        : //if mode is add
          this.$store.dispatch("Level/tambah", this.level);
      //close the modal
      this.$store.dispatch("Modal/modalChange", { mode: "", id: "" });
    },
  },
  computed: {},
};
</script>
