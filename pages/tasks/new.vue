<template>
  <title-bar page-title="New Task" />
</template>

<script>
import TitleBar from '@/components/TitleBar.vue';
import { mapActions } from 'vuex';

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
