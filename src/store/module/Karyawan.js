let mydb = require("./Localbase").default;

const Karyawan = {
  namespaced: true,
  state: {
    karyawan: [],
  },
  mutations: {
    tambah(state, val) {
      let toAppend = "";
      val.obj ? (toAppend = Object.assign(val.id, val.obj)) : (toAppend = val);
      mydb.append("karyawan", toAppend);
      state.karyawan.unshift(toAppend);
      console.log(toAppend);
    },
    update(state, val) {
      state.karyawan.map((obj, index) => {
        obj.id == val.id ? (state.karyawan[index].name = val.name) : false;
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
        ? commit("tambah", val)
        : mydb
            .getData({
              store: "karyawan",
              orderBy: "id",
              desc: true,
              limit: 1,
            })
            .then((res) => {
              res[0]
                ? commit("tambah", {
                    id: { id: mydb.generateId(res[0].id) },
                    obj: val,
                  })
                : commit("tambah", { id: { id: "KAR0001" }, obj: val });
            });
      dispatch("ExIm/importAppend", false, { root: true });
    },
    update({ commit, dispatch }, val) {
      mydb.update("karyawan", { id: val.id }, { name: val.name });
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
      return state.karyawan;
    },
    edit(state, getters, rootGetters) {
      return rootGetters["Modal"].id
        ? state.karyawan.filter((val) => {
            return val.id === rootGetters["Modal"].id;
          })
        : false;
    },
  },
};

export default Karyawan;
