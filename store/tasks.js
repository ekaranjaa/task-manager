/* eslint-disable no-console */

export const state = () => ({
  busy: null,
  errors: null,
  tasks: null
});

export const getters = {
  busy: state => state.busy,
  errors: state => state.errors,
  tasks: state => state.tasks
};

export const mutations = {
  IS_BUSY(state, payload) {
    state.busy = payload;
  },

  SET_ERRORS(state, payload) {
    state.errors = payload;
  },

  SET_TASKS(state, payload) {
    state.tasks = payload;
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
      .get('/tasks')
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

  async search({ commit }, query) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .get(`/tasks/search/${query}`)
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

  async create({ commit }, tasks) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .post('/tasks/create', tasks)
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

  async update({ commit }, tasks) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .put(`/tasks/${this.$auth.user.id}`, tasks)
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

  async delete({ commit }) {
    if (!confirm()) return;

    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .delete(`/tasks/delete/${this.$auth.user.id}`)
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
  }
};
