<template>
  <nav class="lg:hidden fixed bottom-0 inset-x-0 border-t bg-white">
    <div class="conatiner mx-auto px-8">
      <ul class="h-16 flex items-center justify-between">
        <li>
          <nuxt-link
            to="/dashboard"
            class="mr-2 h-7 w-8 grid place-items-center hover:text-blue-500 focus:text-blue-500 transition-all overflow-hidden"
            :class="{ 'text-blue-500': activePage === 'Dashboard' }"
          >
            <dashboard-icon />
          </nuxt-link>
        </li>
        <li v-if="$auth.user.role.name === 'admin'">
          <nuxt-link
            to="/tasks"
            class="mr-2 h-7 w-8 grid place-items-center hover:text-blue-500 focus:text-blue-500 transition-all overflow-hidden"
            :class="{ 'text-blue-500': activePage === 'Tasks' }"
          >
            <task-icon />
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/profile"
            class="mr-2 h-7 w-8 grid place-items-center hover:text-blue-500 focus:text-blue-500 transition-all overflow-hidden"
            :class="{ 'text-blue-500': activePage === 'Account' }"
          >
            <user-icon />
          </nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import DashboardIcon from '../Icons/DashboardIcon.vue';
import TaskIcon from '../Icons/TaskIcon.vue';
import UserIcon from '../Icons/UserIcon.vue';

export default {
  name: 'MobileNav',
  components: {
    DashboardIcon,
    TaskIcon,
    UserIcon
  },
  computed: {
    ...mapGetters({
      activePage: 'ui/activePage'
    })
  }
};
</script>
