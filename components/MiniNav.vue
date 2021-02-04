<template>
  <nav>
    <div class="container mx-auto px-8 py-4 flex items-center justify-center">
      <nuxt-link
        to="/"
        class="h-16 w-16 grid place-items-center overflow-hidden"
      >
        <logo />
      </nuxt-link>
    </div>
  </nav>
</template>

<script>
import Logo from './Logo.vue';

export default {
  name: 'MiniNav',
  components: {
    Logo
  }
};
</script>
