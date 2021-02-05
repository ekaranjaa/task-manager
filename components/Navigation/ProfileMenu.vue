<template>
  <menu class="m-0 p-0">
    <ul
      class="p-4 w-screen md:w-auto flex md:block items-center overflow-y-hidden overflow-x-auto"
    >
      <li>
        <nuxt-link
          to="/profile/availability"
          class="md:mb-4 px-4 py-2 hover:text-blue-500 focus:text-blue-500 transition whitespace-nowrap md:block rounded-full"
          :class="{
            'bg-blue-100 text-blue-500': activePage === 'Availability'
          }"
        >
          Availability
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/profile/info"
          class="md:mb-4 px-4 py-2 hover:text-blue-500 focus:text-blue-500 transition whitespace-nowrap md:block rounded-full"
          :class="{ 'bg-blue-100 text-blue-500': activePage === 'Account' }"
        >
          Profile
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/profile/password"
          class="md:mb-4 px-4 py-2 hover:text-blue-500 focus:text-blue-500 transition whitespace-nowrap md:block rounded-full"
          :class="{ 'bg-blue-100 text-blue-500': activePage === 'Password' }"
        >
          Password
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/profile/delete"
          class="md:mb-4 px-4 py-2 hover:text-red-500 focus:text-red-500 transition whitespace-nowrap md:block rounded-full"
          :class="{ 'bg-red-100 text-red-500': activePage === 'Delete' }"
        >
          Delete Account
        </nuxt-link>
      </li>
    </ul>
  </menu>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ProfileMenu',
  computed: {
    ...mapGetters({
      activePage: 'ui/activePage'
    })
  }
};
</script>
