const Modal = {
  namespaced: true,
  state: {
    status: false,
    id: "",
    mode: "",
  },
  mutations: {
    modalChange(state, param) {
      state.status = !state.status;
      state.mode = param.mode;
      state.id = param.id;
    },
    loading(state, status) {
      state.mode = "loading";
      status == "open" ? (state.status = true) : (state.status = false);
    },
  },
  actions: {
    modalChange({ commit }, param) {
      commit("modalChange", param);
    },
    loading({ commit }, status) {
      commit("loading", status);
    },
  },
  getters: {
    status(state) {
      return {
        status: state.status,
        id: state.id,
        mode: state.mode,
      };
    },
  },
};

export default Modal;
