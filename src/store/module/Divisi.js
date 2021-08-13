const Divisi = {
  namespaced: true,
  state: {
    divisi: [
      { id: 1, name: "gudang depan" },
      { id: 2, name: "gudang sentral" },
      { id: 3, name: "gudang corn chip" },
    ],
  },
  mutations: {
    tambah(state, val) {
      state.divisi.push({
        id: state.divisi.length + 1,
        name: val,
      });
    },
    update(state, val) {
      state.divisi.map((obj, index) => {
        obj.id == val.id ? (state.divisi[index].name = val.name) : false;
      });
    },
  },
  actions: {
    tambah({ commit }, val) {
      commit("tambah", val);
    },
    update({ commit }, val) {
      commit("update", val);
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
