/* eslint-disable no-unused-vars */
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
      let bagian = mydb.getData({ store: "bagian" });
      let level = mydb.getData({ store: "level" });
      let karyawan = mydb.getData({ store: "karyawan" });
      let absen = mydb.getData({
        store: "absen",
        orderBy: "tanggal",
        desc: true,
      });
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
      state.exportDataCollect = await Promise.all([
        impor,
        expor,
        divisi,
        bagian,
        level,
        karyawan,
        absen,
      ]).then((val) => ({
        import: val[0],
        export: val[1],
        divisi: val[2],
        bagian: val[3],
        level: val[4],
        karyawan: val[5],
        absen: val[6],
        status: true,
      }));
      // state.statusExport = true;
    },
    //destroy all data after collect
    destroyDataCollect(state) {
      state.exportDataCollect = {};
    },
    empty(state) {
      state.exportData = [];
      state.importData = [{ time: "", status: true }];
    },
  },
  actions: {
    getAllData({ commit, dispatch }) {
      //get data divisi
      dispatch("Divisi/divisi", "", { root: true });
      dispatch("Bagian/bagian", "", { root: true });
      dispatch("Level/level", "", { root: true });
      dispatch("Karyawan/karyawan", "", { root: true });
      dispatch("Absen/absen", "", { root: true });
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
      dispatch("Bagian/empty", {}, { root: true });
      dispatch("Level/empty", {}, { root: true });
      dispatch("Karyawan/empty", {}, { root: true });
      dispatch("Absen/empty", {}, { root: true });
      mydb.emptyStore("import");
      mydb.emptyStore("export");
      commit("empty");
    },
    //import data from importer to indexeddb
    async importerData({ dispatch, commit }, val) {
      // count keys length of object (store) to import
      let rootKeys = Object.keys(val);
      // iterate the keys of object (store)
      for (let iKeys = 0; iKeys < rootKeys.length; iKeys++) {
        // initiate name of keys
        let keys = rootKeys[iKeys];
        // if keys not status
        if (keys !== "status") {
          mydb.reWrite(keys, val[keys]);
        }
        // if (iKeys + 1 === rootKeys.length) {
        val[keys].length < 100 ? await mydb.tunggu(1500) : await mydb.tunggu(val[keys].length * 5)
        //   await mydb.tunggu(val["absen"].length * 9);
        //   await mydb.tunggu(3000);
        // }
      } //end of for keys
      await mydb.tunggu(3500)
      dispatch("importAppend", "imported");
      location.reload();
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
    exportDataCollectName(state) {
      let first = state.exportDataCollect["absen"].slice(-1)[0].tanggal;
      let last = state.exportDataCollect["absen"].slice(0, 1)[0].tanggal;
      return first + " sampai " + last;
    },
  },
};

export default ExIm;
