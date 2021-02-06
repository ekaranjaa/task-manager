/* eslint-disable no-console */

export const state = () => ({
  busy: null,
  errors: null
});

export const getters = {
  busy: state => state.busy,
  errors: state => state.errors,
  availability: state => state.availability
};

export const mutations = {
  IS_BUSY(state, payload) {
    state.busy = payload;
  },

  SET_ERRORS(state, payload) {
    state.errors = payload;
  }
};

export const actions = {
  clearErrors({ commit }) {
    return commit('SET_ERRORS', null);
  },

  async create({ commit }, availability) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .post('/auth/availability/create', availability)
      .then(async () => {
        commit('IS_BUSY', false);
        await this.$auth.fetchUser().then(() => {
          this.$router.push({ path: '/dashboard' });
        });
      })
      .catch(err => {
        commit('IS_BUSY', false);

        if (err.response.status === 422) {
          return commit('SET_ERRORS', err.response.data.errors);
        }

        console.warn(err);
      });
  },

  async update({ commit }, availability) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .put('/auth/availability/update', availability)
      .then(async () => {
        commit('IS_BUSY', false);
        await this.$auth.fetchUser();
      })
      .catch(err => {
        commit('IS_BUSY', false);

        if (err.response.status === 422) {
          return commit('SET_ERRORS', err.response.data.errors);
        }

        console.warn(err);
      });
  }
};
