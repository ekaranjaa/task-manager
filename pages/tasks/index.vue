<template>
  <div class="min-h-screen">
    <title-bar page-title="All Tasks" />
    <div v-if="tasks" class="p-4">
      <nuxt-link
        to="/tasks/new"
        class="px-6 py-3 inline-flex items-center bg-blue-500 text-white hover:bg-yellow-400 focus:bg-yellow-400 transition"
      >
        <span class="mr-2 h-6 w-6 grid place-items-center transition-all">
          <plus-icon />
        </span>
        Add New
      </nuxt-link>
    </div>
    <section
      v-if="tasks"
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
      <p class="text-2xl text-gray-500">There are no tasks yet.</p>
      <nuxt-link
        to="/tasks/new"
        class="mt-6 px-6 py-3 inline-flex items-center bg-blue-500 text-white hover:bg-yellow-400 focus:bg-yellow-400 transition"
      >
        <span class="mr-2 h-6 w-6 grid place-items-center transition-all">
          <plus-icon />
        </span>
        Add New
      </nuxt-link>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TitleBar from '@/components/Navigation/TitleBar.vue';
import TaskCard from '@/components/Cards/TaskCard.vue';
import CalendarCheckIcon from '@/components/Icons/CalendarCheckIcon.vue';
import PlusIcon from '@/components/Icons/PlusIcon.vue';

export default {
  components: {
    TitleBar,
    TaskCard,
    CalendarCheckIcon,
    PlusIcon
  },
  layout: 'dashboard',
  middleware: 'isAdmin',
  computed: {
    ...mapGetters({
      tasks: 'tasks/tasks'
    })
  },
  mounted() {
    this.setActivePage('Tasks');
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
