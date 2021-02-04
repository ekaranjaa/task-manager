<template>
  <div class="px-4 h-16 md:h-20 flex items-center">
    <p class="text-2xl font-light">{{ title }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TitleBar',
  props: {
    pageTitle: {
      type: String,
      default: null
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
