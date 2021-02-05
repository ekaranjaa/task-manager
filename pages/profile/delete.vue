<template>
  <div class="px-8 py-4">
    <p class="mb-2 text-sm">
      This will delete your account and all its associated data like tasks.
    </p>
    <button
      type="submit"
      class="px-6 py-3 w-full flex items-center bg-red-500 text-white hover:bg-red-600 focus:bg-red-600 transition outline-none"
      @click="deleteAccount"
    >
      <p class="mx-auto">
        <span v-if="!busy"> Delete Account </span>
        <span v-if="busy"> A moment please...</span>
      </p>
      <spinner v-if="busy" class="ml-auto" />
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  layout: 'account',
  computed: {
    ...mapGetters({
      busy: 'authentication/busy'
    })
  },
  mounted() {
    this.setActivePage('Delete');
  },
  methods: {
    ...mapActions({
      setActivePage: 'ui/setActivePage',
      deleteAccount: 'authentication/delete'
    })
  }
};
</script>
