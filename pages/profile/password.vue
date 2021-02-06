<template>
  <div class="px-8 py-4">
    <form
      autocomplete="off"
      class="mx-auto max-w-sm"
      @submit.prevent="submitForm"
    >
      <div class="mb-4">
        <label for="currentPassword" class="block leading-8">
          Current Password
        </label>
        <input
          id="currentPassword"
          v-model="data.current_password"
          type="password"
          class="px-6 py-3 font-light block w-full border outline-none ring-blue-500 focus:ring-1 transition"
          :class="{
            'border-red-500':
              errors.current_password ||
              (serverErrors && serverErrors.current_password)
          }"
        />
        <div class="text-sm text-red-500">
          <span v-if="errors.current_password">{{
            errors.current_password
          }}</span>
          <span v-if="serverErrors && serverErrors.current_password">
            {{ serverErrors.current_password[0] }}
          </span>
        </div>
      </div>
      <div class="mb-4">
        <label for="newPassword" class="block leading-8">New Password</label>
        <input
          id="newPassword"
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
      <button
        type="submit"
        class="my-8 ml-auto px-6 py-3 text-white flex items-center transition outline-none"
        :disabled="!criteria || busy"
        :class="{
          'bg-blue-500 text-white hover:bg-yellow-400 focus:bg-yellow-400': criteria,
          'bg-gray-500 pointer-events-none': !criteria,
          'pointer-events-none': busy
        }"
      >
        <p class="mx-auto">
          <span v-if="!busy"> Change Password </span>
          <span v-if="busy"> A moment please...</span>
        </p>
        <spinner v-if="busy" class="ml-auto" />
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  layout: 'account',
  data() {
    return {
      data: {
        current_password: null,
        password: null,
        password_confirmation: null
      },
      errors: {
        current_password: null,
        password: null,
        password_confirmation: null
      }
    };
  },
  computed: {
    ...mapGetters({
      busy: 'authentication/busy',
      serverErrors: 'authentication/errors'
    }),
    criteria() {
      let passed = true;

      if (
        !this.data.current_password &&
        !this.data.password &&
        !this.data.password_confirmation
      ) {
        passed = false;
      }

      return passed;
    }
  },
  mounted() {
    this.setActivePage('Password');
  },
  created() {
    this.clearServerErrors();
  },
  methods: {
    ...mapActions({
      setActivePage: 'ui/setActivePage',
      update: 'authentication/updatePassword',
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
      this.clearErrors();

      if (!this.data.password) {
        this.errors.password = 'Required.';
        valid = false;
      }

      if (!this.data.current_password) {
        this.errors.current_password = 'Required.';
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

      this.update(this.data).then(() => {
        for (const rec in this.data) {
          this.data[rec] = null;
        }
      });
    }
  }
};
</script>
