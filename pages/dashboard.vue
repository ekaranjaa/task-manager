<template>
  <div class="min-h-screen">
    <title-bar page-title="My Assigned Tasks" />
    <section
      v-if="tasks && tasks.length > 0"
      class="p-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
    >
      <task-card
        v-for="(task, index) in tasks"
        :key="index"
        :task="task"
        class="mb-4 md:mb-0"
      />
    </section>
    <section v-else class="p-8 mx-auto text-center">
      <div class="mx-auto h-36 w-36 grid place-items-center text-green-500">
        <calendar-check-icon />
      </div>
      <p class="text-2xl text-gray-500">You have no assigned tasks yet.</p>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import TitleBar from '@/components/Navigation/TitleBar.vue';
import TaskCard from '@/components/Cards/TaskCard.vue';
import CalendarCheckIcon from '@/components/Icons/CalendarCheckIcon.vue';

export default {
  components: {
    TitleBar,
    TaskCard,
    CalendarCheckIcon
  },
  layout: 'dashboard',
  data() {
    return {
      tasks: this.$auth.user.tasks
    };
  },
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
