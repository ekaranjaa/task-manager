<template>
  <div class="font-poppins text-gray-800 bg-gray-50 min-h-screen h-full">
    <div class="board lg:grid">
      <sidebar />
      <div class="mb-16 lg:mb-0">
        <Nuxt />
      </div>
      <mobile-nav />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Navigation/Sidebar.vue';
import MobileNav from '@/components/Navigation/MobileNav.vue';

export default {
  components: {
    Sidebar,
    MobileNav
  }
};
</script>

<style scoped>
@media screen and (min-width: 1024px) {
  .board {
    grid-template-columns: minmax(250px, 350px) auto;
  }
}
</style>
