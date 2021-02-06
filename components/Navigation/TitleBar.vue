<template>
  <div class="px-4 h-16 md:h-20 flex items-center">
    <button
      v-if="back"
      class="mr-2 h-10 w-10 grid place-items-center text-blue-500 hover:bg-blue-100 focus:bg-blue-100 rounded-full transition"
      @click="$router.go(-1)"
    >
      <div class="h-2/3 w-2/3">
        <back-icon />
      </div>
    </button>
    <p class="text-2xl font-light">{{ title }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BackIcon from '../Icons/BackIcon.vue';

export default {
  name: 'TitleBar',
  components: { BackIcon },
  props: {
    pageTitle: {
      type: String,
      default: null
    },
    back: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      activePage: 'ui/activePage'
    }),
    title() {
      let title;

      if (this.pageTitle) {
        title = this.pageTitle;
      } else {
        title = this.activePage;
      }

      return title;
    }
  }
};
</script>
