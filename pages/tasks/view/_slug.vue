<template>
  <div
    v-if="task"
    :class="{
      'wrapper grid': !task.time_stamps.assigned_on && !task.status
    }"
  >
    <div class="container mx-auto">
      <title-bar page-title="View Task" back />
      <section class="p-4">
        <div class="mb-4">
          <h1 class="mb-2 text-3xl font-bold">{{ task.title }}</h1>
          <div class="text-sm leading-6">
            <p>Created on: {{ formatTime(task.time_stamps.created_at) }}</p>
            <p v-if="task.time_stamps.assigned_on">
              Assigned on: {{ formatTime(task.time_stamps.assigned_on) }}
            </p>
            <p v-if="task.time_stamps.closed_on && task.status === 'complete'">
              Completed on: {{ formatTime(task.time_stamps.closed_on) }}
            </p>
            <p
              v-if="task.time_stamps.closed_on && task.status === 'incomplete'"
            >
              Closed on: {{ formatTime(task.time_stamps.closed_on) }}
            </p>
          </div>
        </div>
        <p class="leading-7">{{ task.description }}</p>
        <div
          v-if="task.time_stamps.assigned_on && task.status === 'underway'"
          class="mt-8 flex items-center"
        >
          <button
            type="submit"
            class="mr-4 px-6 py-3 flex items-center bg-green-500 text-white hover:bg-green-600 focus:bg-green-600 transition outline-none"
            :disabled="busy"
            :class="{ 'pointer-events-none': busy }"
            @click="close({ id: task.id, state: 'complete' })"
          >
            <p class="mx-auto">
              <span v-if="!busy" class="flex items-center">
                <span class="mr-2 h-6 w-6">
                  <check-circle-icon />
                </span>
                Complete
              </span>
            </p>
            <spinner v-if="busy" class="mx-auto" />
          </button>
          <button
            type="submit"
            class="px-6 py-3 flex items-center bg-red-500 text-white hover:bg-red-600 focus:bg-red-600 transition outline-none"
            :disabled="busy"
            :class="{ 'pointer-events-none': busy }"
            @click="close({ id: task.id, state: 'incomplete' })"
          >
            <p class="mx-auto">
              <span v-if="!busy" class="flex items-center">
                <span class="mr-2 h-6 w-6">
                  <cross-circle-icon />
                </span>
                Close
              </span>
            </p>
            <spinner v-if="busy" class="mx-auto" />
          </button>
        </div>
      </section>
    </div>
    <user-list
      v-if="
        $auth.user.role.name === 'admin' &&
        !task.time_stamps.assigned_on &&
        !task.status
      "
      :task-id="task.id"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TitleBar from '@/components/Navigation/TitleBar.vue';
import CheckCircleIcon from '@/components/Icons/CheckCircleIcon.vue';
import CrossCircleIcon from '@/components/Icons/CrossCircleIcon.vue';
import UserList from '@/components/UserList.vue';

export default {
  components: {
    TitleBar,
    CheckCircleIcon,
    CrossCircleIcon,
    UserList
  },
  layout: 'dashboard',
  computed: {
    ...mapGetters({
      task: 'tasks/task',
      busy: 'tasks/busy',
      serverErrors: 'tasks/errors'
    })
  },
  created() {
    this.getTask(this.$route.params.slug);
  },
  mounted() {
    this.setActivePage('Tasks');
  },
  methods: {
    ...mapActions({
      setActivePage: 'ui/setActivePage',
      getTask: 'tasks/getBySlug',
      close: 'tasks/close'
    }),
    formatTime(timeToFormat) {
      if (!timeToFormat) return 0;

      let time = new Date(timeToFormat);
      const day = time.toLocaleDateString(time, { weekday: 'short' });
      const month = time.toLocaleDateString(time, { month: 'short' });
      const date = time.getDate();
      const hours = time.toLocaleTimeString(time);

      time = `${day}, ${month} ${date} - ${hours}`;

      return time;
    }
  }
};
</script>

<style scoped>
@media screen and (min-width: 1024px) {
  .wrapper {
    grid-template-columns: auto 300px;
  }
}
</style>
