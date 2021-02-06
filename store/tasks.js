/* eslint-disable no-console */

export const state = () => ({
  busy: null,
  errors: null,
  tasks: null,
  task: null
});

export const getters = {
  busy: state => state.busy,
  errors: state => state.errors,
  tasks: state => state.tasks,
  task: state => state.task
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
  },

  SET_TASK(state, payload) {
    state.task = payload;
  }
};

export const actions = {
  clearErrors({ commit }) {
    return commit('SET_ERRORS', null);
  },

  async get({ commit, getters }, refresh) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    let tasks;

    if (getters.tasks && !refresh) {
      tasks = getters.tasks;
    } else {
      await this.$axios
        .get('/tasks')
        .then(res => {
          tasks = res.data.data;
        })
        .catch(err => {
          if (err.response.status === 422) {
            return commit('SET_ERRORS', err.response.data.errors);
          }

          console.warn(err);
        });
    }

    commit('IS_BUSY', false);
    commit('SET_TASKS', tasks);
  },

  async getById({ commit, dispatch, getters }, id) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await dispatch('get');
    const tasks = getters.tasks;
    const [task] = tasks.filter(task => task.id === parseInt(id));

    commit('IS_BUSY', false);
    commit('SET_TASK', task);
  },

  async getBySlug({ commit, dispatch, getters }, slug) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await dispatch('get');
    const tasks = getters.tasks;
    const [task] = tasks.filter(task => task.slug === slug);

    commit('IS_BUSY', false);
    commit('SET_TASK', task);
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

  async create({ commit, dispatch }, task) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .post('/tasks/create', task)
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

  async assign({ commit, dispatch }, { id, userId }) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .put(`/tasks/assign/${id}`, { user_id: userId })
      .then(async () => {
        commit('IS_BUSY', false);
        await dispatch('get', true);
        await dispatch('getById', id);
      })
      .catch(err => {
        commit('IS_BUSY', false);

        if (err.response.status === 422) {
          return commit('SET_ERRORS', err.response.data.errors);
        }

        console.warn(err);
      });
  },

  async close({ commit, dispatch }, { id, state }) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .put(`/tasks/close/${id}`, { status: state })
      .then(async () => {
        commit('IS_BUSY', false);
        await dispatch('get', true);
        await dispatch('getById', id);
      })
      .catch(err => {
        commit('IS_BUSY', false);

        if (err.response.status === 422) {
          return commit('SET_ERRORS', err.response.data.errors);
        }

        console.warn(err);
      });
  },

  async update({ commit, dispatch }, { id, task }) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .put(`/tasks/update/${id}`, task)
      .then(async () => {
        commit('IS_BUSY', false);
        await dispatch('get', true);
        await dispatch('getById', id);
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
      .delete(`/tasks/delete/${id}`)
      .then(async () => {
        commit('IS_BUSY', false);
        await dispatch('get', true);
        this.$router.push('/tasks');
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
