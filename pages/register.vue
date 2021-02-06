<template>
  <div class="container mx-auto px-8 py-4">
    <form
      autocomplete="off"
      class="mx-auto max-w-sm"
      @submit.prevent="submitForm"
    >
      <div class="mb-4">
        <label for="name" class="block leading-8">Name</label>
        <input
          id="name"
          v-model="data.name"
          type="text"
          class="px-6 py-3 font-light block w-full border outline-none ring-blue-500 focus:ring-1 transition"
          :class="{
            'border-red-500': errors.name || (serverErrors && serverErrors.name)
          }"
        />
        <div class="text-sm text-red-500">
          <span v-if="errors.name">{{ errors.name }}</span>
          <span v-if="serverErrors && serverErrors.name">
            {{ serverErrors.name[0] }}
          </span>
        </div>
      </div>
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
      <div class="md:grid grid-cols-2 gap-5">
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
        <div class="mb-4">
          <label for="passwordContirmation" class="block leading-8">
            Confirm Password
          </label>
          <input
            id="passwordContirmation"
            v-model="data.password_confirmation"
            type="password"
            class="px-6 py-3 font-light block w-full border outline-none ring-blue-500 focus:ring-1 transition"
            :class="{
              'border-red-500':
                errors.password_confirmation ||
                (serverErrors && serverErrors.password_confirmation)
            }"
          />
          <div class="text-sm text-red-500">
            <span v-if="errors.password_confirmation">
              {{ errors.password_confirmation }}
            </span>
            <span v-if="serverErrors && serverErrors.password_confirmation">
              {{ serverErrors.password_confirmation[0] }}
            </span>
          </div>
        </div>
      </div>
      <p class="text-xs">
        I have read and agreed to the
        <nuxt-link to="#" class="text-blue-500">Terms and Conditions</nuxt-link>
      </p>
      <button
        type="submit"
        class="my-8 px-6 py-3 flex items-center w-full bg-blue-500 text-white hover:bg-yellow-400 focus:bg-yellow-400 transition outline-none"
        :disabled="busy"
        :class="{ 'pointer-events-none': busy }"
      >
        <p class="mx-auto">
          <span v-if="!busy"> Register </span>
          <span v-if="busy"> A moment please...</span>
        </p>
        <spinner v-if="busy" class="ml-auto" />
      </button>
      <p class="text-sm text-center block">
        Already have an account?
        <nuxt-link to="/login" class="text-blue-500"> Login </nuxt-link>
      </p>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Spinner from '@/components/Widgets/Spinner.vue';

export default {
  auth: 'guest',
  components: { Spinner },
  layout: 'auth',
  data() {
    return {
      data: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null
      },
      errors: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null
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
      register: 'authentication/register',
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

      if (!this.data.name) {
        this.errors.name = 'Required.';
        valid = false;
      }

      if (!this.data.email) {
        this.errors.email = 'Required.';
        valid = false;
      } else if (!re.test(this.data.email)) {
        this.errors.email = 'Invalid email address.';
        valid = false;
      }

      if (!this.data.password) {
        this.errors.password = 'Required.';
        valid = false;
      } else if (this.data.password.length < 8) {
        this.errors.password = 'Minimum of 8 characters required.';
        valid = false;
      }

      if (!this.data.password_confirmation) {
        this.errors.password_confirmation = 'Required.';
        valid = false;
      } else if (this.data.password_confirmation !== this.data.password) {
        this.errors.password_confirmation = "Passwords didn't match.";
        valid = false;
      }

      return valid;
    },
    submitForm() {
      const valid = this.validate();

      if (!valid) return;

      this.register(this.data);
    }
  }
};
</script>
