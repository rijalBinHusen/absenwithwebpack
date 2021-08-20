let mydb = require("./Localbase").default;

const Absen = {
  namespaced: true,
  state: {
    absen: "",
  },
  mutations: {
    tambah(state, val) {
      mydb.append("absen", val);
      state.absen.unshift(val);
    },
    update(state, val) {
      state.absen.map((obj, index) => {
        obj.id == val.id ? (state.absen[index] = val) : false;
      });
    },
    absen(state, val) {
      state.absen = val;
    },
    empty(state) {
      state.absen = [];
    },
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    tambah({ dispatch, commit }, val) {
      val.id
        ? commit("tambah", val)
        : mydb
            .getData({ store: "absen", orderBy: "id", desc: true, limit: 1 })
            .then((res) => {
              res[0]
                ? commit(
                    "tambah",
                    Object.assign(
                      {
                        id: mydb.generateId(res[0].id, "time"),
                      },
                      val
                    )
                  )
                : commit(
                    "tambah",
                    Object.assign(
                      {
                        id: mydb.generateId("ABS21080000", "time"),
                      },
                      val
                    )
                  );
            });
      dispatch("ExIm/importAppend", false, { root: true });
    },
    update({ commit, dispatch }, val) {
      mydb.update("absen", { id: val.id }, val);
      dispatch("ExIm/importAppend", false, { root: true });
      commit("update", val);
    },
    absen({ commit }) {
      mydb
        .getData({ store: "absen", orderBy: "tanggal", desc: true, limit: 100 })
        .then((res) => {
          commit("absen", res);
        });
    },
    empty({ commit }) {
      mydb.emptyStore("absen");
      commit("empty");
    },
    tanggal({ commit }, val) {
      Array.isArray(val)
        ? false
        : mydb.findData("absen", val).then((res) => {
            commit("absen", res);
          });
    },
  },
  getters: {
    absen(state) {
      return JSON.stringify(state.absen);
    },
    absenId: (state) => (id) => {
      return JSON.stringify(state.absen.find((val) => val.id === id));
    },
    edit(state, getters, rootGetters) {
      return rootGetters["Modal"].id
        ? JSON.stringify(
            state.absen.find((val) => {
              return val.id === rootGetters["Modal"].id;
            })
          )
        : false;
    },
    lastId() {
      return mydb
        .getData({ store: "absen", orderBy: "id", desc: true, limit: 1 })
        .then((val) => val.id);
    },
  },
};

export default Absen;
