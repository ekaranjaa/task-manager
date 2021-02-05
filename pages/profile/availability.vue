<template>
  <div v-if="$auth.user" class="px-8 py-4">
    <form autocomplete="off" @submit.prevent="">
      <div class="mb-4">
        <p class="mb-2 text-lg">Weekday</p>
        <div class="grid grid-cols-2 gap-5">
          <div>
            <label for="weekdayMoring" class="block leading-8">From</label>
            <select
              id="weekdayMoring"
              class="px-6 py-3 block w-full bg-white border"
            >
              <option value="-">Select time</option>
              <option
                v-for="(time, index) in morning"
                :key="(index + 1) * Math.random()"
                :value="time"
              >
                {{ time }}
              </option>
            </select>
          </div>
          <div>
            <label for="weekdayAfternoon" class="block leading-8">To</label>
            <select
              id="weekdayAfternoon"
              class="px-6 py-3 block w-full bg-white border"
            >
              <option value="-">Select time</option>
              <option
                v-for="(time, index) in afternoon"
                :key="(index + 1) * Math.random()"
                :value="time"
              >
                {{ time }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <p class="mb-2 text-lg">Weekend (Optional)</p>
        <div class="grid grid-cols-2 gap-5">
          <div>
            <label for="weekendMorning" class="block leading-8">From</label>
            <select
              id="weekendMorning"
              class="px-6 py-3 block w-full bg-white border"
            >
              <option value="-">Select time</option>
              <option
                v-for="(time, index) in morning"
                :key="(index + 1) * Math.random()"
                :value="time"
              >
                {{ time }}
              </option>
            </select>
          </div>
          <div>
            <label for="weekendAfternoon" class="block leading-8">To</label>
            <select
              id="weekendAfternoon"
              class="px-6 py-3 block w-full bg-white border"
            >
              <option value="-">Select time</option>
              <option
                v-for="(time, index) in afternoon"
                :key="(index + 1) * Math.random()"
                :value="time"
              >
                {{ time }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <button
        type="submit"
        class="mt-8 ml-auto px-6 py-3 flex items-center bg-blue-500 text-white hover:bg-yellow-400 focus:bg-yellow-400 transition outline-none"
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
      morning: ['6 AM', '7 AM', '8 AM', '9 AM'],
      afternoon: ['3 PM', '4 PM', '5 PM', '6 PM'],
      data: {},
      errors: {}
    };
  },
  computed: {
    ...mapGetters({
      busy: 'availability/busy',
      serverErrors: 'availability/errors'
    })
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
      register: 'availability/register',
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

      if (!this.data.name) {
        this.errors.name = 'Required.';
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
