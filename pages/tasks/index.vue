<template>
  <div class="min-h-screen">
    <title-bar page-title="All Tasks" />
    <menu
      v-if="allTasks"
      class="m-0 p-4 sticky top-0 flex items-center justify-between z-10 bg-gray-50"
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
            :class="{ 'text-blue-500 bg-blue-50': category === null }"
            @click="filterByStatus(null)"
          >
            Unassigned
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
      <nuxt-link
        to="/tasks/new"
        class="px-4 py-2 md:px-6 md:py-3 whitespace-nowrap inline-flex items-center bg-blue-500 text-white hover:bg-yellow-400 focus:bg-yellow-400 transition"
      >
        <span class="mr-2 h-6 w-6 grid place-items-center transition-all">
          <plus-icon />
        </span>
        Add New
      </nuxt-link>
    </menu>
    <section
      v-if="allTasks"
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
  data() {
    return {
      category: 'all',
      tasks: null
    };
  },
  computed: {
    ...mapGetters({
      allTasks: 'tasks/tasks'
    })
  },
  mounted() {
    this.setActivePage('Tasks');
  },
  created() {
    this.getTasks().then(() => {
      this.tasks = this.allTasks;
    });
  },
  methods: {
    ...mapActions({
      setActivePage: 'ui/setActivePage',
      getTasks: 'tasks/get'
    }),
    filterByStatus(status) {
      let tasks = this.allTasks;

      if (status === 'all') {
        tasks = this.allTasks;
      } else {
        tasks = tasks.filter(task => task.status === status);
      }

      this.category = status;
      this.tasks = tasks;
    }
  }
};
</script>
