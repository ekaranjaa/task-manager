<template>
  <div class="container mx-auto">
    <title-bar page-title="New Task" back />
    <div class="px-8 py-4">
      <form
        autocomplete="off"
        class="mx-auto max-w-2xl"
        @submit.prevent="submitForm"
      >
        <div class="mb-4">
          <label for="title" class="block leading-8">Title</label>
          <input
            id="title"
            v-model="data.title"
            type="text"
            class="px-6 py-3 font-light block w-full border outline-none ring-blue-500 focus:ring-1 transition"
            :class="{
              'border-red-500':
                errors.title || (serverErrors && serverErrors.title)
            }"
          />
          <div class="text-sm text-red-500">
            <span v-if="errors.title">{{ errors.title }}</span>
            <span v-if="serverErrors && serverErrors.title">
              {{ serverErrors.title[0] }}
            </span>
          </div>
        </div>
        <div>
          <label for="description" class="block leading-8">Description</label>
          <textarea
            id="description"
            v-model="data.description"
            cols="30"
            rows="10"
            class="px-6 py-3 font-light block w-full border outline-none ring-blue-500 focus:ring-1 transition"
            :class="{
              'border-red-500':
                errors.description || (serverErrors && serverErrors.description)
            }"
          ></textarea>
          <div class="text-sm text-red-500">
            <span v-if="errors.description">{{ errors.description }}</span>
            <span v-if="serverErrors && serverErrors.description">
              {{ serverErrors.description[0] }}
            </span>
          </div>
        </div>
        <button
          type="submit"
          class="my-8 px-6 py-3 flex items-center w-full bg-blue-500 text-white hover:bg-yellow-400 focus:bg-yellow-400 transition outline-none"
          :disabled="busy"
          :class="{ 'pointer-events-none': busy }"
        >
          <p class="mx-auto">
            <span v-if="!busy"> Save Task </span>
            <span v-if="busy"> A moment please...</span>
          </p>
          <spinner v-if="busy" class="ml-auto" />
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TitleBar from '@/components/Navigation/TitleBar.vue';

export default {
  components: { TitleBar },
  layout: 'dashboard',
  middleware: 'isAdmin',
  data() {
    return {
      data: {
        title: null,
        description: null
      },
      errors: {
        title: null,
        description: null
      }
    };
  },
  computed: {
    ...mapGetters({
      busy: 'tasks/busy',
      serverErrors: 'tasks/errors'
    })
  },
  created() {
    this.clearServerErrors();
  },
  mounted() {
    this.setActivePage('Tasks');
  },
  methods: {
    ...mapActions({
      setActivePage: 'ui/setActivePage',
      create: 'tasks/create',
      clearServerErrors: 'tasks/clearErrors'
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

      if (!this.data.title) {
        this.errors.title = 'Required.';
        valid = false;
      }

      if (!this.data.description) {
        this.errors.description = 'Required.';
        valid = false;
      }

      return valid;
    },
    submitForm() {
      const valid = this.validate();

      if (!valid) return;

      this.create(this.data).then(() => {
        for (const rec in this.data) {
          this.data[rec] = null;
        }
      });
    }
  }
};
</script>
