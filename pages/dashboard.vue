<template>
  <div>
    <title-bar />
    <div class="p-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <task-card class="mb-4 md:mb-0" />
      <task-card class="mb-4 md:mb-0" />
      <task-card class="mb-4 md:mb-0" />
      <task-card class="mb-4 md:mb-0" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import TitleBar from '@/components/TitleBar.vue';
import TaskCard from '@/components/TaskCard.vue';

export default {
  components: { TitleBar, TaskCard },
  layout: 'dashboard',
  mounted() {
    this.setActivePage('Dashboard');
  },
  methods: {
    ...mapActions({
      setActivePage: 'ui/setActivePage'
    })
  }
};
</script>
