let mydb = require("./Localbase").default;

const Divisi = {
  namespaced: true,
  state: {
    divisi: "",
  },
  mutations: {
    tambah(state, val) {
      let toAppend = "";
      val.obj ? (toAppend = Object.assign(val.id, val.obj)) : (toAppend = val);
      mydb.append("divisi", toAppend);
      state.divisi.push(toAppend);
    },
    update(state, val) {
      state.divisi.map((obj, index) => {
        obj.id == val.id ? (state.divisi[index].name = val.name) : false;
      });
    },
    divisi(state, val) {
      state.divisi = val;
    },
    empty(state) {
      state.divisi = [];
    },
  },
  actions: {
    tambah({ dispatch, commit }, val) {
      val.id
        ? commit("tambah", val)
        : mydb
            .getData({ store: "divisi", orderBy: "id", desc: true, limit: 1 })
            .then((res) => {
              res[0]
                ? commit("tambah", {
                    id: {
                      id: mydb.generateId(res[0].id),
                    },
                    obj: val,
                  })
                : commit("tambah", { id: { id: "DIV0001" }, obj: val });
            });
      dispatch("ExIm/importAppend", false, { root: true });
    },
    update({ commit, dispatch }, val) {
      mydb.update("divisi", { id: val.id }, { name: val.name });
      dispatch("ExIm/importAppend", false, { root: true });
      commit("update", val);
    },
    divisi({ commit }) {
      mydb.getData({ store: "divisi", orderBy: "id" }).then((res) => {
        commit("divisi", res);
      });
    },
    empty({ commit }) {
      mydb.emptyStore("divisi");
      commit("empty");
    },
  },
  getters: {
    divisi(state) {
      return state.divisi;
    },
    divisiId: (state) => (id) => {
      return JSON.stringify(state.divisi.find((val) => val.id === id));
    },
    edit(state, getters, rootGetters) {
      return rootGetters["Modal"].id
        ? state.divisi.find((val) => {
            return val.id === rootGetters["Modal"].id;
          })
        : false;
    },
  },
};

export default Divisi;
