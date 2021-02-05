<template>
  <title-bar />
</template>

<script>
import { mapActions } from 'vuex';
import TitleBar from '@/components/Navigation/TitleBar.vue';

export default {
  components: { TitleBar },
  layout: 'dashboard',
  mounted() {
    this.setActivePage('Calendar');
  },
  methods: {
    ...mapActions({
      setActivePage: 'ui/setActivePage'
    })
  }
};
</script>
