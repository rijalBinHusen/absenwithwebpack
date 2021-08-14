let mydb = require("./Localbase").default;

const Divisi = {
  namespaced: true,
  state: {
    divisi: "",
  },
  mutations: {
    tambah(state, val) {
      mydb.append("divisi", val);
      state.divisi.push(val);
    },
    update(state, val) {
      state.divisi.map((obj, index) => {
        obj.id == val.id ? (state.divisi[index].name = val.name) : false;
      });
    },
    divisi(state, val) {
      state.divisi = val;
    },
  },
  actions: {
    tambah({ commit }, val) {
      mydb
        .getData({ store: "divisi", orderBy: "id", desc: true, limit: 1 })
        .then((res) => {
          res[0]
            ? commit("tambah", { id: mydb.generateId(res[0].id), name: val })
            : commit("tambah", { id: "DIV0001", name: val });
        });
    },
    update({ commit }, val) {
      mydb.update("divisi", { id: val.id }, { name: val.name });
      commit("update", val);
    },
    divisi({ commit }) {
      mydb.getData({ store: "divisi" }).then((res) => {
        commit("divisi", res);
      });
    },
  },
  getters: {
    divisi(state) {
      return state.divisi;
    },
    edit(state, getters, rootGetters) {
      return rootGetters["Modal"].id
        ? state.divisi.filter((val) => {
            return val.id === rootGetters["Modal"].id;
          })
        : false;
    },
  },
};

export default Divisi;
