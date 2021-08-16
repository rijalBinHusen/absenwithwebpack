let mydb = require("./Localbase").default;

const Bagian = {
  namespaced: true,
  state: {
    bagian: "",
  },
  mutations: {
    tambah(state, val) {
      mydb.append("bagian", val);
      state.bagian.push(val);
    },
    update(state, val) {
      state.bagian.map((obj, index) => {
        obj.id == val.id ? (state.bagian[index].name = val.name) : false;
      });
    },
    bagian(state, val) {
      state.bagian = val;
    },
    empty(state) {
      state.bagian = [];
    },
  },
  actions: {
    tambah({ dispatch, commit }, val) {
      typeof val == "object"
        ? commit("tambah", val)
        : mydb
            .getData({ store: "bagian", orderBy: "id", desc: true, limit: 1 })
            .then((res) => {
              res[0]
                ? commit("tambah", {
                    id: mydb.generateId(res[0].id),
                    name: val,
                  })
                : commit("tambah", { id: "BAG0001", name: val });
            });
      dispatch("ExIm/importAppend", false, { root: true });
    },
    update({ commit, dispatch }, val) {
      mydb.update("bagian", { id: val.id }, { name: val.name });
      dispatch("ExIm/importAppend", false, { root: true });
      commit("update", val);
    },
    bagian({ commit }) {
      mydb.getData({ store: "bagian", orderBy: "id" }).then((res) => {
        commit("bagian", res);
      });
    },
    empty({ commit }) {
      mydb.emptyStore("bagian");
      commit("empty");
    },
  },
  getters: {
    bagian(state) {
      return state.bagian;
    },
    edit(state, getters, rootGetters) {
      return rootGetters["Modal"].id
        ? state.bagian.filter((val) => {
            return val.id === rootGetters["Modal"].id;
          })
        : false;
    },
  },
};

export default Bagian;
