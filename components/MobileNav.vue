<template>
  <nav class="lg:hidden fixed bottom-0 inset-x-0 border-t bg-white">
    <div class="conatiner mx-auto px-4">
      <ul class="h-16 flex items-center justify-between">
        <li>
          <nuxt-link
            to="/dashboard"
            class="mr-2 h-10 w-10 grid place-items-center hover:text-blue-500 focus:text-blue-500 transition-all rounded-full overflow-hidden"
            :class="{ 'text-blue-500': activePage === 'Dashboard' }"
          >
            <dashboard-icon
              :fill="activePage === 'Dashboard' ? 'rgb(59, 130, 246)' : 'none'"
              :stroke="
                activePage === 'Dashboard'
                  ? 'rgb(59, 130, 246)'
                  : 'currentColor'
              "
            />
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/tasks"
            class="mr-2 h-10 w-10 grid place-items-center hover:text-blue-500 focus:text-blue-500 transition-all rounded-full overflow-hidden"
            :class="{ 'text-blue-500': activePage === 'Tasks' }"
          >
            <task
              :fill="activePage === 'Tasks' ? 'rgb(59, 130, 246)' : 'none'"
              :stroke="activePage === 'Tasks' ? '#fff' : 'currentColor'"
            />
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/calendar"
            class="mr-2 h-10 w-10 grid place-items-center hover:text-blue-500 focus:text-blue-500 transition-all rounded-full overflow-hidden"
            :class="{ 'text-blue-500': activePage === 'Calendar' }"
          >
            <calendar
              :fill="activePage === 'Calendar' ? 'rgb(59, 130, 246)' : 'none'"
              :stroke="activePage === 'Calendar' ? '#fff' : 'currentColor'"
            />
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/account"
            class="mr-2 h-10 w-10 grid place-items-center hover:text-blue-500 focus:text-blue-500 transition-all rounded-full overflow-hidden"
            :class="{ 'text-blue-500': activePage === 'Account' }"
          >
            <user
              :fill="
                activePage === 'Account' ? 'rgb(59, 130, 246)' : 'currentColor'
              "
            />
          </nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import DashboardIcon from './icons/DashboardIcon.vue';
import Task from './icons/Task.vue';
import Calendar from './icons/Calendar.vue';
import User from './icons/User.vue';

export default {
  name: 'MobileNav',
  components: {
    DashboardIcon,
    Task,
    Calendar,
    User
  },
  computed: {
    ...mapGetters({
      activePage: 'ui/activePage'
    })
  }
};
</script>
