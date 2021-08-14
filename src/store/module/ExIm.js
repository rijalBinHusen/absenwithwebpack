let mydb = require("./Localbase.js").default;
const ExIm = {
  namespaced: true,
  state: {
    exportData: "",
    importData: "",
    checkImportData: "",
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
    checkImportData(state, val) {
      state.checkImportData = val;
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
    checkImportData({ commit }, val) {
      commit("checkImportData", val);
    },
  },
  getters: {
    exportData(state) {
      return state.exportData;
    },
    importData(state) {
      return state.ImportData;
    },
    checkImportData(state) {
      return state.checkImportData;
    },
  },
};

export default ExIm;
