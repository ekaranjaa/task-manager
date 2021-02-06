<template>
  <div
    class="sticky top-0 right-0 md:h-screen border-l bg-white overflow-x-hidden overflow-y-auto"
  >
    <div class="p-4 sticky top-0 border-b">
      <p class="text-lg">Users</p>
    </div>
    <div
      v-for="(user, index) in users"
      :key="(index + 1) * Math.random()"
      class="p-4"
    >
      <div class="flex items-center">
        <div
          class="mr-2 h-10 w-10 flex-shrink-0 grid place-items-center text-white text-xl bg-gradient-to-br from-blue-500 via-indigo-507 to-indigo-900 rounded-full shadow-lg"
        >
          {{ generateAvatar(user.name) }}
        </div>
        <div class="whitespace-nowrap">
          <p class="text-sm">{{ user.name }}</p>
          <p class="text-xs">{{ user.email }}</p>
        </div>
        <button
          type="submit"
          class="ml-4 px-3 py-1 text-xs flex items-center bg-blue-500 text-white hover:bg-yellow-400 focus:bg-yellow-400 transition outline-none"
          :disabled="assigning"
          :class="{ 'pointer-events-none': assigning }"
          @click="assignTask({ id: taskId, userId: user.id })"
        >
          <span v-if="!assigning" class="mx-auto"> Assign </span>
          <spinner v-if="assigning" class="mx-auto" />
        </button>
      </div>
      <div v-if="user.tasks" class="mt-2 flex items-center text-xs">
        <p class="mr-2">
          Pending: {{ filterTasks(user.tasks, 'pending').length }}
        </p>
        <p class="mr-2">
          Complete: {{ filterTasks(user.tasks, 'complete').length }}
        </p>
        <p>Incomplete: {{ filterTasks(user.tasks, 'incomplete').length }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'UserList',
  props: {
    taskId: {
      type: Number,
      default: null
    }
  },
  computed: {
    ...mapGetters({
      users: 'users/users',
      busy: 'users/busy',
      assigning: 'tasks/busy'
    })
  },
  created() {
    this.getUsers();
  },
  methods: {
    ...mapActions({
      getUsers: 'users/get',
      assignTask: 'tasks/assign'
    }),
    generateAvatar(name) {
      const nameArr = name.split(' ');
      const avatar = `${nameArr[0].charAt(0)}${nameArr[1].charAt(0)}`;

      return avatar;
    },
    filterTasks(tasks, status) {
      let result;
      if (tasks.length > 0) {
        result = tasks.filter(task => task.status === status);
      } else {
        result = [];
      }

      return result;
    }
  }
};
</script>
