<template>
  <nav>
    <div class="container mx-auto px-8 py-4 flex items-center justify-between">
      <nuxt-link
        to="/"
        class="h-12 w-12 grid place-items-center overflow-hidden"
      >
        <logo />
      </nuxt-link>
      <nuxt-link to="/login" class="text-blue-500"> Login </nuxt-link>
    </div>
  </nav>
</template>

<script>
import Logo from '../Icons/Logo.vue';

export default {
  name: 'Navbar',
  components: { Logo }
};
</script>
