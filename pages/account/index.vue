<template>
  <title-bar />
</template>

<script>
import TitleBar from '@/components/TitleBar.vue';
import { mapActions } from 'vuex';

export default {
  components: { TitleBar },
  layout: 'dashboard',
  mounted() {
    this.setActivePage('Account');
  },
  methods: {
    ...mapActions({
      setActivePage: 'ui/setActivePage'
    })
  }
};
</script>
