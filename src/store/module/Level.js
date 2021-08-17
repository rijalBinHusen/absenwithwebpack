let mydb = require("./Localbase").default;

const Level = {
  namespaced: true,
  state: {
    level: "",
  },
  mutations: {
    tambah(state, val) {
      mydb.append("level", val);
      state.level.unshift(val);
    },
    update(state, val) {
      state.level.map((obj, index) => {
        obj.id == val.id ? (state.level[index] = val) : false;
      });
    },
    level(state, val) {
      state.level = val;
    },
    empty(state) {
      state.level = [];
    },
  },
  actions: {
    tambah({ dispatch, commit }, val) {
      val.id
        ? commit("tambah", val)
        : mydb
            .getData({ store: "level", orderBy: "id", desc: true, limit: 1 })
            .then((res) => {
              res[0]
                ? commit("tambah", {
                    id: mydb.generateId(res[0].id),
                    name: val.name,
                    jamKerja: val.jamKerja,
                  })
                : commit("tambah", {
                    id: "LEV0001",
                    name: val.name,
                    jamKerja: val.jamKerja,
                  });
            });
      dispatch("ExIm/importAppend", false, { root: true });
    },
    update({ commit, dispatch }, val) {
      mydb.update("level", { id: val.id }, val);
      dispatch("ExIm/importAppend", false, { root: true });
      commit("update", val);
    },
    level({ commit }) {
      mydb.getData({ store: "level", orderBy: "id" }).then((res) => {
        commit("level", res);
      });
    },
    empty({ commit }) {
      mydb.emptyStore("level");
      commit("empty");
    },
  },
  getters: {
    level(state) {
      return state.level;
    },
    levelId: (state) => (id) => {
      return JSON.stringify(state.level.find((val) => val.id === id));
    },
    edit(state, getters, rootGetters) {
      return rootGetters["Modal"].id
        ? state.level.find((val) => {
            return val.id === rootGetters["Modal"].id;
          })
        : false;
    },
  },
};

export default Level;
