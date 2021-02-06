<template>
  <div v-if="$auth.user" class="px-8 py-4">
    <form autocomplete="off" @submit.prevent="submitForm">
      <div class="mb-4 grid grid-cols-2 gap-5">
        <div>
          <label for="from" class="block leading-8">From</label>
          <select
            id="from"
            v-model="data.from"
            class="px-6 py-3 block w-full bg-white border"
            :class="{
              'border-red-500':
                errors.from || (serverErrors && serverErrors.from)
            }"
          >
            <option value="null">Select time</option>
            <option
              v-for="(time, index) in morning"
              :key="(index + 1) * Math.random()"
              :value="time"
            >
              {{ time }}
            </option>
          </select>
          <div class="text-sm text-red-500">
            <span v-if="errors.from">{{ errors.from }}</span>
            <span v-if="serverErrors && serverErrors.from">
              {{ serverErrors.from[0] }}
            </span>
          </div>
        </div>
        <div>
          <label for="to" class="block leading-8">To</label>
          <select
            id="to"
            v-model="data.to"
            class="px-6 py-3 block w-full bg-white border"
            :class="{
              'border-red-500': errors.to || (serverErrors && serverErrors.to)
            }"
          >
            <option value="null">Select time</option>
            <option
              v-for="(time, index) in afternoon"
              :key="(index + 1) * Math.random()"
              :value="time"
            >
              {{ time }}
            </option>
          </select>
          <div class="text-sm text-red-500">
            <span v-if="errors.to">{{ errors.to }}</span>
            <span v-if="serverErrors && serverErrors.to">
              {{ serverErrors.to[0] }}
            </span>
          </div>
        </div>
      </div>
      <div class="py-3 flex items-start">
        <input
          id="weekend"
          v-model="data.weekend"
          type="checkbox"
          class="mr-2"
        />
        <label for="weekend"
          >I'll also be available for half a day on weekends.</label
        >
      </div>
      <button
        type="submit"
        class="mt-8 ml-auto px-6 py-3 flex items-center text-white transition outline-none"
        :disabled="!criteria || busy"
        :class="{
          'bg-blue-500 text-white hover:bg-yellow-400 focus:bg-yellow-400': criteria,
          'bg-gray-500 pointer-events-none': !criteria,
          'pointer-events-none': busy
        }"
      >
        <p class="mx-auto">
          <span v-if="!busy"> Save Changes </span>
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
      morning: ['6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM'],
      afternoon: ['3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'],
      data: {
        from: this.$auth.user.availability.from,
        to: this.$auth.user.availability.to,
        weekend: this.$auth.user.availability.weekend
      },
      errors: {
        from: null,
        to: null
      }
    };
  },
  computed: {
    ...mapGetters({
      busy: 'availability/busy',
      serverErrors: 'availability/errors'
    }),
    criteria() {
      let passed = true;

      if (
        this.data.from === this.$auth.user.availability.from &&
        this.data.to === this.$auth.user.availability.to &&
        this.data.weekend === this.$auth.user.availability.weekend
      ) {
        passed = false;
      }

      return passed;
    }
  },
  mounted() {
    this.setActivePage('Availability');
  },
  created() {
    this.clearServerErrors();
  },
  methods: {
    ...mapActions({
      setActivePage: 'ui/setActivePage',
      update: 'availability/update',
      clearServerErrors: 'availability/clearErrors'
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

      if (!this.data.from) {
        this.errors.from = 'Required';
        valid = false;
      }

      if (!this.data.to) {
        this.errors.to = 'Required';
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
