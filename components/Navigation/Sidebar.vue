<template>
  <menu
    class="hidden lg:block m-0 p-0 sticky top-0 left-0 h-screen bg-white border-r"
  >
    <div class="px-4 h-20 flex items-center">
      <nuxt-link to="/dashboard" class="h-14 w-14 block">
        <logo />
      </nuxt-link>
    </div>
    <ul class="p-4">
      <li>
        <nuxt-link
          to="/dashboard"
          class="mb-4 p-4 flex items-center w-full hover:text-blue-500 focus:text-blue-500 transition"
          :class="{ 'text-blue-500 bg-blue-50': activePage === 'Dashboard' }"
        >
          <span
            class="mr-2 h-10 w-10 grid place-items-center rounded-full overflow-hidden"
          >
            <dashboard-icon />
          </span>
          Dashboard
        </nuxt-link>
      </li>
      <li v-if="$auth.user.role.name === 'admin'">
        <nuxt-link
          to="/tasks"
          class="mb-4 p-4 flex items-center w-full hover:text-blue-500 focus:text-blue-500 transition"
          :class="{ 'text-blue-500 bg-blue-50': activePage === 'Tasks' }"
        >
          <span
            class="mr-2 h-10 w-10 grid place-items-center rounded-full overflow-hidden"
          >
            <task-icon />
          </span>
          Tasks
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/calendar"
          class="mb-4 p-4 flex items-center w-full hover:text-blue-500 focus:text-blue-500 transition"
          :class="{ 'text-blue-500 bg-blue-50': activePage === 'Calendar' }"
        >
          <span
            class="mr-2 h-10 w-10 grid place-items-center rounded-full overflow-hidden"
          >
            <calendar-icon />
          </span>
          Calendar
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/profile"
          class="mb-4 p-4 flex items-center w-full hover:text-blue-500 focus:text-blue-500 transition"
          :class="{ 'text-blue-500 bg-blue-50': activePage === 'Profile' }"
        >
          <span
            class="mr-2 h-10 w-10 grid place-items-center rounded-full overflow-hidden"
          >
            <user-icon />
          </span>
          Profile
        </nuxt-link>
      </li>
    </ul>
    <div class="p-4 sticky top-full">
      <button
        class="mb-4 p-4 flex items-center w-full hover:text-blue-500 focus:text-blue-500 transition"
        @click="logout"
      >
        <span
          class="mr-2 h-10 w-10 grid place-items-center rounded-full overflow-hidden"
        >
          <sign-out-icon />
        </span>
        Sign Out
        <spinner v-if="busy" color="blue" class="ml-auto" />
      </button>
    </div>
  </menu>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DashboardIcon from '../Icons/DashboardIcon.vue';
import Logo from '../Icons/Logo.vue';
import TaskIcon from '../Icons/TaskIcon.vue';
import CalendarIcon from '../Icons/CalendarIcon.vue';
import UserIcon from '../Icons/UserIcon.vue';
import SignOutIcon from '../Icons/SignOutIcon.vue';
import Spinner from '../Widgets/Spinner.vue';

export default {
  name: 'Sidebar',
  components: {
    Logo,
    DashboardIcon,
    TaskIcon,
    CalendarIcon,
    UserIcon,
    SignOutIcon,
    Spinner
  },
  computed: {
    ...mapGetters({
      activePage: 'ui/activePage',
      busy: 'authentication/busy'
    })
  },
  methods: {
    ...mapActions({
      logout: 'authentication/logout'
    })
  }
};
</script>
