<template>
  <div v-if="$auth.user" class="px-8 py-4">
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
        <p class="text-sm">
          You'll have to re-verify your email after changing it.
        </p>
      </div>
      <button
        type="submit"
        class="my-8 ml-auto px-6 py-3 flex items-center text-white transition outline-none"
        :disabled="!criteria || busy"
        :class="{
          'bg-blue-500 text-white hover:bg-yellow-400 focus:bg-yellow-400': criteria,
          'bg-gray-500 pointer-events-none': !criteria,
          'pointer-events-none': busy
        }"
      >
        <p class="mx-auto">
          <span v-if="!busy"> Save Changes </span>
          <span v-if="busy"> A moment please... </span>
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
        name: this.$auth.user.name,
        email: this.$auth.user.email
      },
      errors: {
        name: null,
        email: null
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
        this.data.name === this.$auth.user.name &&
        this.data.email === this.$auth.user.email
      ) {
        passed = false;
      }

      return passed;
    }
  },
  mounted() {
    this.setActivePage('Account');
  },
  created() {
    this.clearServerErrors();
  },
  methods: {
    ...mapActions({
      setActivePage: 'ui/setActivePage',
      update: 'authentication/update',
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
