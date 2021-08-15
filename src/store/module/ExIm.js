let mydb = require("./Localbase.js").default;
const ExIm = {
  namespaced: true,
  state: {
    exportData: [],
    importData: [],
    checkImportData: "",
    exportDataCollect: {},
    statusExport: false,
  },
  mutations: {
    //to add time epported data
    exportAppend(state) {
      state.exportData.unshift({ time: new Date() });
      state.importData.unshift({ time: true });
      mydb.append("export", { time: new Date() });
    },
    //to grab all dsata time exported from indexxeddb
    exportData(state) {
      mydb
        .getData({ store: "export", orderBy: "time", desc: true, limit: 10 })
        .then((val) => {
          state.exportData = val;
        });
    },
    //to add record to importeddata
    importAppend(state, val) {
      //value to import
      let toImport = { time: new Date(), status: val };
      //if the last record is not same e,g true vs false
      if (state.importData[0].mode !== val) {
        state.importData.unshift(toImport);
        mydb.append("import", toImport);
      }
    },
    //grab all data time import from indexeddb
    importData(state) {
      mydb
        .getData({ store: "import", orderBy: "time", desc: true, limit: 10 })
        .then((val) => {
          state.importData = val;
        });
    },
    checkImportData(state, val) {
      state.checkImportData = val;
    },
    //collect data from indexeddb to export
    async exportDataCollect(state) {
      // state.statusExport = false;
      state.exportDataCollect.status = false;
      let impor = mydb.getData({ store: "import" });
      let expor = mydb.getData({ store: "export" });
      let divisi = mydb.getData({ store: "divisi" });
      state.exportDataCollect = await Promise.all([impor, expor, divisi]).then(
        (val) => ({
          import: val[0],
          export: val[1],
          divisi: val[2],
          status: true,
        })
      );
      // state.statusExport = true;
    },
    //destroy all data after collect
    destroyDataCollect(state) {
      state.exportDataCollect = "";
    },
  },
  actions: {
    //to add time when data exported
    exportAppend({ commit, dispatch }) {
      commit("exportAppend");
      //cal import append
      dispatch("importAppend", true);
    },
    //to take data from indexeddb all time exported data
    exportData({ commit }) {
      commit("exportData");
    },
    //to take data from indexeddb all time imported data
    importData({ commit }) {
      commit("importData");
    },
    //add data to import data
    importAppend({ commit }, val) {
      commit("importAppend", val);
    },
    //to check data that will import
    checkImportData({ commit }, val) {
      commit("checkImportData", val);
    },
    //trigger to collect all data from indexeddb
    exportDataCollect({ commit }) {
      commit("exportDataCollect");
    },
    //destroy data after collect
    destroyDataCollect({ commit }) {
      commit("destroyDataCollect");
    },
  },
  getters: {
    exportData(state) {
      return state.exportData;
    },
    importData(state) {
      return state.importData[0];
    },
    checkImportData(state) {
      return state.checkImportData;
    },
    statusExport(state) {
      return state.exportDataCollect.status;
    },
    //all data collect
    exportDataCollect(state) {
      return state.exportDataCollect;
    },
  },
};

export default ExIm;
