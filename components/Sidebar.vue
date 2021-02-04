<template>
  <div class="hidden lg:block sticky top-0 left-0 h-screen bg-white">
    <div class="px-4 h-20 flex items-center">
      <nuxt-link to="/dashboard" class="h-14 w-14 block">
        <logo />
      </nuxt-link>
    </div>
    <ul class="p-4">
      <li>
        <nuxt-link
          to="/dashboard"
          class="mb-4 p-4 flex items-center w-full"
          :class="{ 'text-blue-500 bg-blue-50': activePage === 'Dashboard' }"
        >
          <span
            class="mr-2 h-10 w-10 grid place-items-center rounded-full overflow-hidden"
          >
            <dashboard-icon
              :fill="activePage === 'Dashboard' ? 'rgb(59, 130, 246)' : 'none'"
              :stroke="
                activePage === 'Dashboard'
                  ? 'rgb(59, 130, 246)'
                  : 'currentColor'
              "
            />
          </span>
          Dashboard
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/tasks"
          class="mb-4 p-4 flex items-center w-full"
          :class="{ 'text-blue-500 bg-blue-50': activePage === 'Tasks' }"
        >
          <span
            class="mr-2 h-10 w-10 grid place-items-center rounded-full overflow-hidden"
          >
            <task
              :fill="activePage === 'Tasks' ? 'rgb(59, 130, 246)' : 'none'"
              :stroke="activePage === 'Tasks' ? '#fff' : 'currentColor'"
            />
          </span>
          Tasks
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/calendar"
          class="mb-4 p-4 flex items-center w-full"
          :class="{ 'text-blue-500 bg-blue-50': activePage === 'Calendar' }"
        >
          <span
            class="mr-2 h-10 w-10 grid place-items-center rounded-full overflow-hidden"
          >
            <calendar
              :fill="activePage === 'Calendar' ? 'rgb(59, 130, 246)' : 'none'"
              :stroke="activePage === 'Calendar' ? '#fff' : 'currentColor'"
            />
          </span>
          Calendar
        </nuxt-link>
      </li>
    </ul>
    <div class="px-4 py-8 sticky top-full">
      <account />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DashboardIcon from '@/components/icons/DashboardIcon.vue';
import Logo from './Logo.vue';
import Task from './icons/Task.vue';
import Account from './Account.vue';
import Calendar from './icons/Calendar.vue';

export default {
  name: 'Sidebar',
  components: {
    Logo,
    DashboardIcon,
    Task,
    Account,
    Calendar
  },
  computed: {
    ...mapGetters({
      activePage: 'ui/activePage'
    })
  }
};
</script>
