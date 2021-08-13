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
  },
  actions: {
    modalChange({ commit }, param) {
      commit("modalChange", param);
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
    other(state) {
      return state.status;
    },
  },
};

export default Modal;
