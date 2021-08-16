let mydb = require("./Localbase").default;

const Level = {
  namespaced: true,
  state: {
    level: "",
  },
  mutations: {
    tambah(state, val) {
      mydb.append("level", val);
      state.level.push(val);
    },
    update(state, val) {
      state.level.map((obj, index) => {
        obj.id == val.id ? (state.level[index].name = val.name) : false;
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
      typeof val == "object"
        ? commit("tambah", val)
        : mydb
            .getData({ store: "level", orderBy: "id", desc: true, limit: 1 })
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
      mydb.update("level", { id: val.id }, { name: val.name });
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
    edit(state, getters, rootGetters) {
      return rootGetters["Modal"].id
        ? state.level.filter((val) => {
            return val.id === rootGetters["Modal"].id;
          })
        : false;
    },
  },
};

export default Level;
