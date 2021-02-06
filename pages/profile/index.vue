<template>
  <div v-if="$auth.user" class="bg-white min-h-screen">
    <header class="header h-56">
      <div class="container h-full relative mx-auto">
        <div
          class="absolute bottom-0 left-4 transform translate-y-12 h-24 w-24 grid place-items-center text-5xl font-light text-white bg-gradient-to-br from-blue-400 via-indigo-600 to-purple-800 rounded-full border-4 border-white"
        >
          <p>
            {{ userAvatar }}
          </p>
        </div>
      </div>
    </header>
    <section class="container mx-auto pt-14 p-4">
      <div class="mb-4 md:flex items-center justify-between">
        <div class="whitespace-nowrap">
          <div class="flex items-center">
            <p class="text-2xl">{{ $auth.user.name }}</p>
            <p
              v-if="$auth.user.role.name === 'admin'"
              class="ml-2 px-2 py-1 text-sm bg-green-200 text-green-700 rounded-full"
            >
              Admin
            </p>
          </div>
          <p class="text-lg">{{ $auth.user.email }}</p>
        </div>
        <nuxt-link
          to="/profile/account"
          class="my-4 md:my-0 px-6 py-3 inline-flex items-center bg-blue-500 text-white hover:bg-yellow-400 focus:bg-yellow-400 transition"
        >
          <span class="mr-2 h-5 w-5 grid place-items-center transition-all">
            <edit-icon />
          </span>
          Edit Profile
        </nuxt-link>
      </div>
      <div class="mb-4">
        <p class="mb-2 text-lg">Availability</p>
        <p class="mb-2 text-sm">
          <span> From: {{ $auth.user.availability.from }} </span>
          <span> To: {{ $auth.user.availability.to }} </span>
          <span v-if="$auth.user.availability.weekend">
            - Plus half a day on weekends.
          </span>
        </p>
        <p v-if="$auth.user.role.name === 'admin'" class="text-xs">
          Joined on: {{ formatTime($auth.user.time_stamps.created_at) }}
        </p>
      </div>
      <menu class="m-0 p-0">
        <ul class="flex items-center overflow-y-hidden overflow-x-auto">
          <li>
            <button
              class="px-4 py-2 whitespace-nowrap hover:text-blue-500 focus:text-blue-500 transition rounded-full text-blue-500 bg-blue-50"
            >
              All Tasks
            </button>
          </li>
          <li>
            <button
              class="px-4 py-2 whitespace-nowrap hover:text-blue-500 focus:text-blue-500 transition rounded-full"
            >
              Completed Tasks
            </button>
          </li>
          <li>
            <button
              class="px-4 py-2 whitespace-nowrap hover:text-blue-500 focus:text-blue-500 transition rounded-full"
            >
              Incomplete Tasks
            </button>
          </li>
        </ul>
      </menu>
      <div
        v-for="(task, index) in tasks"
        :key="index"
        class="py-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <task-card :task="task" class="mb-4 md:mb-0" />
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import EditIcon from '@/components/Icons/EditIcon.vue';
import TaskCard from '@/components/Cards/TaskCard.vue';

export default {
  components: { EditIcon, TaskCard },
  layout: 'dashboard',
  computed: {
    userAvatar() {
      const userNames = this.$auth.user.name.split(' ');
      const avatar = userNames[0].charAt(0) + userNames[1].charAt(0);

      return avatar;
    },
    tasks() {
      const tasks = this.$auth.user.tasks;
      return tasks;
    }
  },
  mounted() {
    this.setActivePage('Profile');
  },
  methods: {
    ...mapActions({
      setActivePage: 'ui/setActivePage'
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
.header {
  background: linear-gradient(
    to top right,
    rgb(167, 243, 208),
    rgb(191, 219, 254),
    rgb(254, 202, 202),
    rgb(253, 230, 138)
  );
}
</style>
