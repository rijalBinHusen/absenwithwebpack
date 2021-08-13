<template>
  <div class="">
    <h1 class="w3-left">Masukkan nama divisi</h1>
    <form @submit.prevent="send">
      <input
        type="text"
        class="w3-input w3-margin-bottom"
        placeholder="Masukkan divisi"
        :value="divisi"
        @change="divisi = $event.target.value"
      />

      <input
        type="submit"
        class="w3-button w3-left w3-margin-top w3-teal w3-round-large"
        value="Tambah"
        @click="tambah"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: "DivisiForm",
  data: function () {
    return {
      divisi: this.$store.getters["Divisi/edit"][0]
        ? this.$store.getters["Divisi/edit"][0].name
        : "",
    };
  },
  methods: {
    send() {
      this.$store.getters["Divisi/edit"][0]
        ? this.$store.dispatch("Divisi/update", {
            name: this.divisi,
            id: this.$store.getters["Divisi/edit"][0].id,
          })
        : this.$store.dispatch("Divisi/tambah", this.divisi);
      this.$store.dispatch("Modal/modalChange", { mode: "", id: "" });
    },
  },
  computed: {},
};
</script>
