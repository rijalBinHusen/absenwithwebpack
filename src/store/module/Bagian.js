let mydb = require("./Localbase").default;

const Bagian = {
  namespaced: true,
  state: {
    bagian: "",
  },
  mutations: {
    tambah(state, val) {
      let toAppend = "";
      val.obj ? (toAppend = Object.assign(val.id, val.obj)) : (toAppend = val);
      mydb.append("bagian", toAppend);
      // console.log(val)
      state.bagian.push(toAppend);
    },
    update(state, val) {
      state.bagian.map((obj, index) => {
        obj.id == val.id ? (state.bagian[index] = val) : false;
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
      val.id
        ? commit("tambah", val)
        : mydb
            .getData({ store: "bagian", orderBy: "id", desc: true, limit: 1 })
            .then((res) => {
              res[0]
                ? commit("tambah", {
                    id: { id: mydb.generateId(res[0].id) },
                    obj: val,
                  })
                : commit("tambah", {
                    id: { id: "BAG0001" },
                    obj: val,
                  });
            });
      dispatch("ExIm/importAppend", false, { root: true });
    },
    update({ commit, dispatch }, val) {
      mydb.update("bagian", { id: val.id }, val);
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
    bagianId: (state) => (id) => {
      return JSON.stringify(state.bagian.find((val) => val.id === id));
    },
    edit(state, getters, rootGetters) {
      return rootGetters["Modal"].id
        ? JSON.stringify(
            state.bagian.find((val) => {
              return val.id === rootGetters["Modal"].id;
            })
          )
        : false;
    },
  },
};

export default Bagian;
