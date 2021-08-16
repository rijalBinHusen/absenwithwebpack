import { createStore } from "vuex";
import Navbar from "./module/Navbar.js";
import Divisi from "./module/Divisi.js";
import Modal from "./module/Modal.js";
import ExIm from "./module/ExIm.js";
import Bagian from "./module/Bagian.js";
import Level from "./module/Level.js";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Navbar,
    Divisi,
    Modal,
    ExIm,
    Bagian,
    Level,
  },
});
