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
        <label for="newPassword" class="block leading-8">New Password</label>
        <input
          id="newPassword"
          v-model="data.new_password"
          type="password"
          class="px-6 py-3 font-light block w-full border outline-none ring-blue-500 focus:ring-1 transition"
          :class="{
            'border-red-500':
              errors.new_password || (serverErrors && serverErrors.new_password)
          }"
        />
        <div class="text-sm text-red-500">
          <span v-if="errors.new_password">{{ errors.new_password }}</span>
          <span v-if="serverErrors && serverErrors.new_password">
            {{ serverErrors.new_password[0] }}
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
        class="my-8 ml-auto px-6 py-3 flex items-center bg-blue-500 text-white hover:bg-yellow-400 focus:bg-yellow-400 transition outline-none"
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
        password: null,
        new_password: null,
        password_confirmation: null
      },
      errors: {
        password: null,
        new_password: null,
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

      if (!this.data.new_password) {
        this.errors.new_password = 'Required.';
        valid = false;
      } else if (this.data.new_password.length < 8) {
        this.errors.new_password = 'Minimum of 8 characters required.';
        valid = false;
      }

      if (!this.data.password_confirmation) {
        this.errors.password_confirmation = 'Required.';
        valid = false;
      } else if (this.data.password_confirmation !== this.data.new_password) {
        this.errors.password_confirmation = "Passwords didn't match.";
        valid = false;
      }

      return valid;
    },
    submitForm() {
      const valid = this.validate();

      if (!valid) return;

      this.update(this.data);
    }
  }
};
</script>
