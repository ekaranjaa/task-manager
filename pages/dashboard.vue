<template>
  <div class="min-h-screen">
    <title-bar page-title="My Assigned Tasks" />
    <menu
      v-if="$auth.user.tasks.length > 0"
      class="m-0 p-4 sticky top-0 z-10 bg-gray-50"
    >
      <ul class="flex items-center overflow-y-hidden overflow-x-auto">
        <li>
          <button
            class="px-4 py-2 whitespace-nowrap hover:text-blue-500 focus:text-blue-500 transition rounded-full outline-none"
            :class="{ 'text-blue-500 bg-blue-50': category === 'all' }"
            @click="filterByStatus('all')"
          >
            All
          </button>
        </li>
        <li>
          <button
            class="px-4 py-2 whitespace-nowrap hover:text-blue-500 focus:text-blue-500 transition rounded-full outline-none"
            :class="{ 'text-blue-500 bg-blue-50': category === 'pending' }"
            @click="filterByStatus('pending')"
          >
            Pending
          </button>
        </li>
        <li>
          <button
            class="px-4 py-2 whitespace-nowrap hover:text-blue-500 focus:text-blue-500 transition rounded-full outline-none"
            :class="{ 'text-blue-500 bg-blue-50': category === 'complete' }"
            @click="filterByStatus('complete')"
          >
            Complete
          </button>
        </li>
        <li>
          <button
            class="px-4 py-2 whitespace-nowrap hover:text-blue-500 focus:text-blue-500 transition rounded-full outline-none"
            :class="{ 'text-blue-500 bg-blue-50': category === 'incomplete' }"
            @click="filterByStatus('incomplete')"
          >
            Incomplete
          </button>
        </li>
      </ul>
    </menu>
    <section
      v-if="$auth.user.tasks.length > 0"
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
      tasks: this.$auth.user.tasks,
      category: 'all'
    };
  },
  mounted() {
    this.setActivePage('Dashboard');
  },
  methods: {
    ...mapActions({
      setActivePage: 'ui/setActivePage'
    }),
    filterByStatus(status) {
      let tasks = this.$auth.user.tasks;

      if (status === 'all') {
        tasks = this.$auth.user.tasks;
      } else {
        tasks = tasks.filter(task => task.status === status);
      }

      this.category = status;
      this.tasks = tasks;
    }
  }
};
</script>
