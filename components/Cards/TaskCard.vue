<template>
  <article class="p-4 relative bg-white border rounded-lg">
    <div class="mb-2 flex items-center justify-between">
      <p :title="task.title" class="text-lg whitespace-nowrap">
        {{ trimTitle(task.title) }}
      </p>
      <div class="flex items-center">
        <nuxt-link
          title="View"
          :to="`/tasks/view/${task.slug}`"
          class="mr-2 h-5 w-5 flex-shrink-0 text-blue-500"
        >
          <view-icon />
        </nuxt-link>
        <div
          v-if="$auth.user.role.name === 'admin' && !task.time_stamps.closed_on"
          class="flex items-center"
        >
          <nuxt-link
            title="Edit"
            :to="`/tasks/edit/${task.id}`"
            class="mr-2 h-5 w-5 flex-shrink-0 text-yellow-500"
          >
            <edit-icon />
          </nuxt-link>
          <button
            title="Delete"
            :to="`/tasks/edit/${task.id}`"
            :disabled="busy"
            class="h-5 w-5 flex-shrink-0 text-red-500"
            :class="{ 'pointer-events-none': busy }"
            @click="deleteTask(task.id)"
          >
            <delete-icon v-if="!busy" />
            <spinner v-if="busy" color="blue" />
          </button>
        </div>
      </div>
    </div>
    <p class="mb-2 text-sm leading-6">
      {{ trimDescription(task.description) }}
    </p>
    <p
      v-if="task.status"
      class="sticky inline-block top-full rounded-full text-xs px-2 py-1"
      :class="{
        'bg-yellow-200 text-yellow-600': task.status === 'pending',
        'bg-green-200 text-green-600': task.status === 'complete',
        'bg-red-200 text-red-600': task.status === 'incomplete'
      }"
    >
      {{ capitalize(task.status) }}
    </p>
  </article>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ViewIcon from '../Icons/ViewIcon.vue';
import EditIcon from '../Icons/EditIcon.vue';
import DeleteIcon from '../Icons/DeleteIcon.vue';
import Spinner from '../Widgets/Spinner.vue';

export default {
  name: 'TaskCard',
  components: {
    ViewIcon,
    DeleteIcon,
    EditIcon,
    Spinner
  },
  props: {
    task: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapGetters({
      busy: 'tasks/busy'
    })
  },
  methods: {
    ...mapActions({
      deleteTask: 'tasks/delete'
    }),
    trimTitle(text) {
      const maxLength = 10;
      let trimmedText;

      if (text.length > maxLength) {
        trimmedText = `${text.substring(0, maxLength)}...`;
      } else {
        trimmedText = text;
      }

      return trimmedText;
    },
    trimDescription(text) {
      const maxLength = 135;
      let trimmedText;

      if (text.length > maxLength) {
        trimmedText = `${text.substring(0, maxLength)}...`;
      } else {
        trimmedText = text;
      }

      return trimmedText;
    },
    capitalize(text) {
      const str = `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
      return str;
    }
  }
};
</script>
