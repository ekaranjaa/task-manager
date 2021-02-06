/* eslint-disable no-console */

export const state = () => ({
  busy: null,
  errors: null,
  users: null,
  user: null
});

export const getters = {
  busy: state => state.busy,
  errors: state => state.errors,
  users: state => state.users,
  user: state => state.user
};

export const mutations = {
  IS_BUSY(state, payload) {
    state.busy = payload;
  },

  SET_ERRORS(state, payload) {
    state.errors = payload;
  },

  SET_TASKS(state, payload) {
    state.users = payload;
  },

  SET_TASK(state, payload) {
    state.user = payload;
  }
};

export const actions = {
  clearErrors({ commit }) {
    return commit('SET_ERRORS', null);
  },

  async get({ commit, getters }, refresh) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    let users;

    if (getters.users && !refresh) {
      users = getters.users;
    } else {
      await this.$axios
        .get('/users')
        .then(res => {
          users = res.data.data;
        })
        .catch(err => {
          if (err.response.status === 422) {
            return commit('SET_ERRORS', err.response.data.errors);
          }

          console.warn(err);
        });
    }

    commit('IS_BUSY', false);
    commit('SET_TASKS', users);
  },

  async search({ commit }, query) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .get(`/users/search/${query}`)
      .then(res => {
        commit('IS_BUSY', false);
        commit('SET_TASKS', res.data.data);
      })
      .catch(err => {
        commit('IS_BUSY', false);

        if (err.response.status === 422) {
          return commit('SET_ERRORS', err.response.data.errors);
        }

        console.warn(err);
      });
  },

  async update({ commit, dispatch }, { id, user }) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .put(`/users/update/${id}`, user)
      .then(() => {
        commit('IS_BUSY', false);
        dispatch('get', true);
      })
      .catch(err => {
        commit('IS_BUSY', false);

        if (err.response.status === 422) {
          return commit('SET_ERRORS', err.response.data.errors);
        }

        console.warn(err);
      });
  },

  async delete({ commit, dispatch }, id) {
    if (!confirm('Are you sure?')) return;

    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .delete(`/users/delete/${id}`)
      .then(() => {
        commit('IS_BUSY', false);
        dispatch('get', true);
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
