export const state = () => ({
  activePage: null
});

export const getters = {
  activePage: state => state.activePage
};

export const mutations = {
  SET_ACTIVE_PAGE(state, payload) {
    state.activePage = payload;
  }
};

export const actions = {
  setActivePage({ commit }, page) {
    commit('SET_ACTIVE_PAGE', page);
  }
};
