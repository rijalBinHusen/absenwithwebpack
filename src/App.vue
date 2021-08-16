<template>
  <Navbar />
  <component :is="currentNav"></component>
  <Modal />
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Divisi from "./components/Divisi.vue";
import Modal from "./components/Modal.vue";
import Exporter from "./components/Exporter.vue";
import Importer from "./components/Importer.vue";
import Bagian from "./components/Bagian.vue";
import Level from "./components/Level.vue";
import Karyawan from "./components/Karyawan.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Divisi,
    Modal,
    Exporter,
    Importer,
    Bagian,
    Level,
    Karyawan,
  },
  computed: {
    currentNav() {
      return this.$store.getters["Navbar/currentNav"];
    },
  },
  created() {
    this.$store.dispatch("ExIm/getAllData");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
