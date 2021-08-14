const Navbar = {
  namespaced: true,
  state: {
    currentNav: "",
    navs: [
      { component: "Divisi", title: "Divisi", icon: "archway" },
      { component: "Bagian", title: "Bagian", icon: "user-cog" },
      { component: "Level", title: "Level", icon: "user" },
      { component: "Karyawan", title: "Karyawan", icon: "address-card" },
      { component: "Absen", title: "Absen", icon: "list" },
      { component: "Importer", title: "Importer", icon: "file-upload" },
      { component: "Exporter", title: "Exporter", icon: "file-download" },
    ],
  },
  mutations: {
    gotoNav(state, val) {
      state.currentNav = val;
    },
  },
  actions: {
    gotoNav({ commit }, val) {
      val ? commit("gotoNav", val) : false;
    },
  },
  getters: {
    navs(state) {
      return state.navs;
    },
    currentNav(state) {
      return state.currentNav;
    },
  },
};

export default Navbar;
