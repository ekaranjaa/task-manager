<template>
  <div
    class="home font-poppins text-gray-800 min-h-screen h-full bg-no-repeat flex flex-col justify-between"
  >
    <navbar />
    <Nuxt />
    <footr />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footr from '@/components/Footr.vue';

export default {
  components: {
    Navbar,
    Footr
  }
};
</script>

<style scoped>
@media screen and (min-width: 1024px) {
  .home {
    background-image: url('../assets/images/tasks.svg');
    background-size: 90vh 90vh;
    background-position: 100vh;
  }
}

@media screen and (min-width: 1280px) {
  .home {
    background-position: 125vh;
  }
}
</style>
