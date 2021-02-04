<template>
  <title-bar />
</template>

<script>
import { mapActions } from 'vuex';
import TitleBar from '@/components/TitleBar.vue';

export default {
  components: { TitleBar },
  layout: 'dashboard',
  mounted() {
    this.setActivePage('Tasks');
  },
  methods: {
    ...mapActions({
      setActivePage: 'ui/setActivePage'
    })
  }
};
</script>
