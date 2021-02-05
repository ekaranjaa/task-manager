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
          to="/profile/availability"
          class="my-4 md:my-0 px-6 py-3 inline-flex items-center bg-blue-500 text-white hover:bg-yellow-400 focus:bg-yellow-400 transition"
        >
          <span class="mr-2 h-6 w-6 grid place-items-center transition-all">
            <edit-icon />
          </span>
          Edit Profile
        </nuxt-link>
      </div>
      <div v-if="$auth.user.role.name === 'admin'" class="mb-4">
        <p>Joined on: {{ $auth.user.time_stamps.created_at }}</p>
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
      <div class="text-red-200">
        <div v-for="(task, index) in tasks" :key="index">
          {{ task }}
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import EditIcon from '@/components/Icons/EditIcon.vue';

export default {
  components: { EditIcon },
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
    })
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
