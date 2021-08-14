let mydb = require("./Localbase.js").default;
const ExIm = {
  namespaced: true,
  state: {
    exportData: "",
    importData: "",
  },
  mutations: {
    exportAppend(state) {
      state.exportData.unshift({ time: new Date() });
      mydb.append("export", { time: new Date() });
    },
    exportData(state) {
      mydb
        .getData({ store: "export", orderBy: "time", desc: true, limit: 10 })
        .then((val) => {
          state.exportData = val;
        });
    },
    importData(state) {
      state.importData = "";
    },
  },
  actions: {
    exportAppend({ commit }) {
      commit("exportAppend");
    },
    exportData({ commit }) {
      commit("exportData");
    },
    importData({ commit }) {
      commit("importData");
    },
  },
  getters: {
    exportData(state) {
      return state.exportData;
    },
    importData(state) {
      return state.ImportData;
    },
  },
};

export default ExIm;
