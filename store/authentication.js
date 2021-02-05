/* eslint-disable no-console */

export const state = () => ({
  busy: false,
  errors: null
});

export const getters = {
  busy: state => state.busy,
  errors: state => state.errors
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

  async login({ commit }, user) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$auth
      .loginWith('local', { data: user })
      .then(() => {
        commit('IS_BUSY', false);
      })
      .catch(err => {
        commit('IS_BUSY', false);

        if (err.response.status === 422) {
          return commit('SET_ERRORS', err.response.data.errors);
        }

        console.warn(err);
      });
  },

  async register({ commit, dispatch }, user) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .post('/auth/register', user)
      .then(() => {
        dispatch('login', user);
      })
      .catch(err => {
        commit('IS_BUSY', false);

        if (err.response.status === 422) {
          return commit('SET_ERRORS', err.response.data.errors);
        }

        console.warn(err);
      });
  },

  async update({ commit }, user) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .put('/auth/update', user)
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
  },

  async updatePassword({ commit }, password) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .put('/auth/update-password', password)
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
  },

  async logout({ commit }) {
    commit('IS_BUSY', true);

    await this.$auth
      .logout()
      .then(() => {
        commit('IS_BUSY', false);
      })
      .catch(err => {
        commit('IS_BUSY', false);
        console.warn(err);
      });
  },

  async sendVerificationEmail({ commit }) {
    commit('IS_BUSY', true);

    await this.$axios
      .post('/email/verification-notification')
      .then(res => {
        commit('IS_BUSY', false);
      })
      .catch(err => {
        console.warn(err);
      });
  },

  async verifyAccount({ commit }, { id, hash }) {
    commit('IS_BUSY', true);

    await this.$axios
      .get(`/email/verify/${id}/${hash}`)
      .then(res => {
        commit('IS_BUSY', false);
        return this.$router.push('/user/account');
      })
      .catch(err => {
        commit('IS_BUSY', false);
        console.warn(err);
      });
  },

  async delete({ commit, dispatch }) {
    if (!confirm('Are you sure?')) return;

    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .delete('/auth/delete')
      .then(() => {
        commit('IS_BUSY', false);
        dispatch('logout');
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
