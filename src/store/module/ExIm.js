let mydb = require("./Localbase.js").default;
const ExIm = {
  namespaced: true,
  state: {
    exportData: [],
    importData: [],
    exportDataCollect: {},
  },
  mutations: {
    //to add time epported data
    exportAppend(state, val) {
      //var to append
      let toExport = "";
      typeof val == "object"
        ? (toExport = val)
        : (toExport = { time: new Date() });
      state.exportData.unshift(toExport);
      mydb.append("export", toExport);
    },
    //to grab all dsata time exported from indexxeddb
    exportData(state) {
      mydb
        .getData({ store: "export", orderBy: "time", desc: true })
        .then((val) => {
          state.exportData = val;
        });
    },
    //to add record to importeddata
    importAppend(state, val) {
      //value to import
      let toImport = "";
      typeof val == "object"
        ? (toImport = val)
        : (toImport = { time: new Date(), status: val });
      //if the last record is not same e,g true vs false
      if (state.importData[0].status !== toImport.status) {
        state.importData.unshift(toImport);
        mydb.append("import", toImport);
      }
    },
    //grab all data time import from indexeddb
    importData(state) {
      mydb
        .getData({ store: "import", orderBy: "time", desc: true })
        .then((val) => {
          val.length > 0
            ? (state.importData = val)
            : (state.importData = [{ time: "", status: true }]);
        });
    },
    //collect data from indexeddb to export
    async exportDataCollect(state) {
      // state.statusExport = false;
      state.exportDataCollect.status = false;
      let divisi = mydb.getData({ store: "divisi" });
      let impor = mydb.getData({
        store: "import",
        orderBy: "time",
        desc: true,
        limit: 10,
      });
      let expor = mydb.getData({
        store: "export",
        orderBy: "time",
        desc: true,
        limit: 10,
      });
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
    empty(state) {
      state.exportData = [];
      state.importData = [{ time: "", status: true }];
    },
  },
  actions: {
    getAllData({ commit, dispatch }) {
      //get all divisi record from indexeddb
      dispatch("Divisi/divisi", null, { root: true });
      //get all import record from indexeddb
      commit("importData");
      //get all export record from indexeddb
      commit("exportData");
    },
    //to add time when data exported
    exportAppend({ commit, dispatch }, val) {
      //cal import append
      dispatch("importAppend", true);
      commit("exportAppend", val);
    },
    //add data to import data
    importAppend({ commit }, val) {
      commit("importAppend", val);
    },
    //trigger to collect all data from indexeddb
    exportDataCollect({ commit }) {
      commit("exportDataCollect");
    },
    //destroy data after collect
    destroyDataCollect({ commit }) {
      commit("destroyDataCollect");
    },
    //destroy all data in indexeddb
    emptyAll({ dispatch, commit }) {
      dispatch("Divisi/empty", {}, { root: true });
      mydb.emptyStore("import");
      mydb.emptyStore("export");
      commit("empty");
    },
    //import data from importer to indexeddb
    importerData({ dispatch, commit }, val) {
      // mydb.deleteDb();
      Object.keys(val).map((keys) => {
        if (keys !== "status") {
          val[keys].map((valImport) => {
            mydb.append(keys, valImport);
            keys == "divisi"
              ? dispatch("Divisi/tambah", valImport, { root: true })
              : commit(keys + "Append", valImport);
          });
        }
        dispatch("importAppend", "imported");
      });
    },
  },
  getters: {
    exportData(state) {
      return state.exportData;
    },
    importData(state) {
      return state.importData.length > 0
        ? state.importData
        : [{ time: "", status: true }];
    },
    //is data collect finished
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
