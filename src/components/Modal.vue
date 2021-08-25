<template>
  <div v-if="modal.status" style="display: block" class="w3-modal">
    <div class="w3-modal-content w3-animate-zoom">
      <header class="w3-container w3-teal">
        <span
          v-if="modal.mode !== 'loading'"
          @click="modalChange('')"
          class="w3-xlarge w3-button w3-display-topright w3-teal"
        >
          &times;
        </span>
        <h2 class="w3-center">{{ modal.mode + " " + currentNav }}</h2>
      </header>
      <div
        class="w3-container w3-padding w3-center margin-top"
        style="min-height: 300px"
      >
        <component
          :is="modal.mode == 'loading' ? 'loaderForm' : currentNav + 'Form'"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
import DivisiForm from "./DivisiForm.vue";
import ImporterForm from "./ImporterForm.vue";
import LoaderForm from "./Loader.vue";
import BagianForm from "./BagianForm.vue";
import LevelForm from "./LevelForm.vue";
import KaryawanForm from "./KaryawanForm.vue";
import AbsenForm from "./AbsenForm.vue";
import AbsenImportForm from "./AbsenImportForm.vue";

export default {
  name: "Modal",
  methods: {
    modalChange() {
      this.$store.dispatch("Modal/modalChange", { mode: "", id: "" });
    },
  },
  computed: {
    modal() {
      return this.$store.getters["Modal/status"];
    },
    currentNav() {
      return this.$store.getters["Navbar/currentNav"];
    },
  },
  components: {
    DivisiForm,
    ImporterForm,
    LoaderForm,
    BagianForm,
    LevelForm,
    KaryawanForm,
    AbsenForm,
    AbsenImportForm,
  },
};
</script>
