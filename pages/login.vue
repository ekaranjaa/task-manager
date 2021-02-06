<template>
  <div class="container mx-auto px-8 py-4">
    <form
      autocomplete="off"
      class="mx-auto max-w-sm"
      @submit.prevent="submitForm"
    >
      <div class="mb-4">
        <label for="email" class="block leading-8">Email</label>
        <input
          id="email"
          v-model="data.email"
          type="email"
          class="px-6 py-3 font-light block w-full border outline-none ring-blue-500 focus:ring-1 transition"
          :class="{
            'border-red-500':
              errors.email || (serverErrors && serverErrors.email)
          }"
        />
        <div class="text-sm text-red-500">
          <span v-if="errors.email">{{ errors.email }}</span>
          <span v-if="serverErrors && serverErrors.email">
            {{ serverErrors.email[0] }}
          </span>
        </div>
      </div>
      <div class="mb-4">
        <label for="password" class="block leading-8">Password</label>
        <input
          id="password"
          v-model="data.password"
          type="password"
          class="px-6 py-3 font-light block w-full border outline-none ring-blue-500 focus:ring-1 transition"
          :class="{
            'border-red-500':
              errors.password || (serverErrors && serverErrors.password)
          }"
        />
        <div class="text-sm text-red-500">
          <span v-if="errors.password">{{ errors.password }}</span>
          <span v-if="serverErrors && serverErrors.password">
            {{ serverErrors.password[0] }}
          </span>
        </div>
      </div>
      <p class="text-xs text-right">
        Forgot password?
        <nuxt-link to="#" class="text-blue-500">Reset</nuxt-link>
      </p>
      <button
        type="submit"
        class="my-8 px-6 py-3 flex items-center w-full bg-blue-500 text-white hover:bg-yellow-400 focus:bg-yellow-400 transition outline-none"
        :disabled="busy"
        :class="{ 'pointer-events-none': busy }"
      >
        <p class="mx-auto">
          <span v-if="!busy"> Login </span>
          <span v-if="busy"> A moment please...</span>
        </p>
        <spinner v-if="busy" class="ml-auto" />
      </button>
      <p class="text-sm text-center block">
        Don't have an account?
        <nuxt-link to="/register" class="text-blue-500"> Create One </nuxt-link>
      </p>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  auth: 'guest',
  layout: 'auth',
  data() {
    return {
      data: {
        email: null,
        password: null
      },
      errors: {
        email: null,
        password: null
      }
    };
  },
  computed: {
    ...mapGetters({
      busy: 'authentication/busy',
      serverErrors: 'authentication/errors'
    })
  },
  created() {
    this.clearServerErrors();
  },
  methods: {
    ...mapActions({
      login: 'authentication/login',
      clearServerErrors: 'authentication/clearErrors'
    }),
    clearErrors() {
      for (const error in this.errors) {
        this.errors[error] = null;
      }
      this.clearServerErrors();
    },
    validate() {
      let valid = true;
      const re = /\S+@\S+\.\S+/;
      this.clearErrors();

      if (!this.data.email) {
        this.errors.email = 'Required';
        valid = false;
      } else if (!re.test(this.data.email)) {
        this.errors.email = 'Invalid email address';
        valid = false;
      }

      if (!this.data.password) {
        this.errors.password = 'Required';
        valid = false;
      }

      return valid;
    },
    submitForm() {
      const valid = this.validate();

      if (!valid) return;

      this.login(this.data);
    }
  }
};
</script>
