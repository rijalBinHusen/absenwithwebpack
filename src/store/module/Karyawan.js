let mydb = require("./Localbase").default;

const Karyawan = {
  namespaced: true,
  state: {
    karyawan: [],
  },
  mutations: {
    tambah(state, val) {
      mydb.append("karyawan", val);
      state.karyawan.unshift(val);
    },
    update(state, val) {
      state.karyawan.map((obj, index) => {
        obj.id == val.id ? (state.karyawan[index] = val) : false;
      });
    },
    karyawan(state, val) {
      state.karyawan = val;
    },
    empty(state) {
      state.karyawan = [];
    },
  },
  actions: {
    tambah({ dispatch, commit }, val) {
      val.id
        ? mydb.append("karyawan", val)
        : mydb
            .getData({
              store: "karyawan",
              orderBy: "id",
              desc: true,
              limit: 1,
            })
            .then((res) => {
              res[0]
                ? commit(
                    "tambah",
                    Object.assign({ id: mydb.generateId(res[0].id) }, val)
                  )
                : commit("tambah", Object.assign({ id: "KAR0001" }, val));
            });
      dispatch("ExIm/importAppend", false, { root: true });
    },
    update({ commit, dispatch }, val) {
      mydb.update("karyawan", { id: val.id }, val);
      dispatch("ExIm/importAppend", false, { root: true });
      commit("update", val);
    },
    karyawan({ commit }) {
      mydb.getData({ store: "karyawan", orderBy: "id" }).then((res) => {
        commit("karyawan", res);
      });
    },
    empty({ commit }) {
      mydb.emptyStore("karyawan");
      commit("empty");
    },
  },
  getters: {
    karyawan(state) {
      return JSON.stringify(state.karyawan);
    },
    edit(state, getters, rootState) {
      return rootState["Modal"].id
        ? JSON.stringify(
            state.karyawan.find((val) => {
              return val.id === rootState["Modal"].id;
            })
          )
        : false;
    },
    karyawanId: (state, getters, rootState, rootGetters) => (id) => {
      let result = {};
      let target = state.karyawan.find((val) => val.idKaryawan === id);
      target
        ? Object.keys(target).map((key) => {
            key === "id" || key === "idKaryawan" || key === "nama"
              ? (result[key] = target[key])
              : (result[key] = JSON.parse(
                  rootGetters[
                    key.charAt(0).toUpperCase().concat(key.slice(1)) +
                      "/" +
                      key +
                      "Id"
                  ](target[key])
                ).name);
            if (key === "level") {
              result.jamKerja = rootGetters["Level/jamKerja"](target[key]);
            }
          })
        : (result = {
            id: "Tidak ditemukan",
            idKaryawan: "Tidak ditemukan",
            nama: "Tidak ditemukan",
            level: "Tidak ditemukan",
            bagian: "Tidak ditemukan",
            divisi: "Tidak ditemukan",
          });
      return JSON.stringify(result);
    },
  },
};

export default Karyawan;
