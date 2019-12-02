
const app = {
  state: {
    sidebar: true,
    device: 'desktop',
    collapsed: false
  },
  mutations: {
    TOGGLE_MENU: (state, status) => {
      state.collapsed = status;
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    }

  },
  actions: {
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device);
    }
  }
};

export default app;
