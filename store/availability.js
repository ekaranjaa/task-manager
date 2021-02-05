/* eslint-disable no-console */

export const state = () => ({
  busy: null,
  errors: null,
  availability: null
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
  },

  SET_AVAILABILITY(state, payload) {
    state.availability = payload;
  }
};

export const actions = {
  clearErrors({ commit }) {
    return commit('SET_ERRORS', null);
  },

  async get({ commit }) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .get('/user/availability')
      .then(res => {
        commit('IS_BUSY', false);
        commit('SET_AVAILABILITY', res.data.data);
      })
      .catch(err => {
        commit('IS_BUSY', false);

        if (err.response.status === 422) {
          return commit('SET_ERRORS', err.response.data.errors);
        }

        console.warn(err);
      });
  },

  async create({ commit }, availability) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .post('/user/availability/create', availability)
      .then(res => {
        commit('IS_BUSY', false);
        commit('SET_AVAILABILITY', res.data.data);
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
      .put(`/user/availability/${this.$auth.user.id}`, availability)
      .then(res => {
        commit('IS_BUSY', false);
        commit('SET_AVAILABILITY', res.data.data);
      })
      .catch(err => {
        commit('IS_BUSY', false);

        if (err.response.status === 422) {
          return commit('SET_ERRORS', err.response.data.errors);
        }

        console.warn(err);
      });
  },

  async delete({ commit }) {
    if (!confirm()) return;

    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .delete(`/user/availability/delete/${this.$auth.user.id}`)
      .then(res => {
        commit('IS_BUSY', false);
        commit('SET_AVAILABILITY', res.data.data);
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
