<template>
  <div class="min-h-screen">
    <title-bar />
    <div v-if="tasks && tasks.length > 0" class="p-4">
      <h1 class="text-xl">My Assigned Tasks</h1>
    </div>
    <section
      v-if="tasks && tasks.length > 0"
      class="p-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
    >
      <task-card
        v-for="(task, index) in tasks"
        :key="index"
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
import { mapGetters, mapActions } from 'vuex';
import TitleBar from '@/components/Navigation/TitleBar.vue';
import TaskCard from '@/components/Cards/TaskCard.vue';
import CalendarCheckIcon from '@/components/Icons/CalendarCheckIcon.vue';

export default {
  components: { TitleBar, TaskCard, CalendarCheckIcon },
  layout: 'dashboard',
  computed: {
    ...mapGetters({
      tasks: 'tasks/tasks'
    })
  },
  mounted() {
    this.setActivePage('Dashboard');
  },
  created() {
    this.getTasks();
  },
  methods: {
    ...mapActions({
      setActivePage: 'ui/setActivePage',
      getTasks: 'tasks/get'
    })
  }
};
</script>
