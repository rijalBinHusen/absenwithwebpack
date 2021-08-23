const Modal = {
  namespaced: true,
  state: {
    status: false,
    id: "",
    mode: "",
    dialog: "",
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
    dialog(state) {
      state.dialog = !state.dialog;
      console.log("muttaion dialog");
    },
  },
  actions: {
    modalChange({ commit }, param) {
      commit("modalChange", param);
    },
    loading({ commit }, status) {
      commit("loading", status);
    },
    dialog({ commit }, val) {
      console.log("dispatch dialog");
      commit("dialog", val);
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
    dialog(state) {
      return state.dialog;
    },
  },
};

export default Modal;
