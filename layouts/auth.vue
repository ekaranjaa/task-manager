<template>
  <div
    class="font-poppins text-gray-800 min-h-screen h-full flex flex-col justify-between"
  >
    <mini-nav />
    <Nuxt />
    <footr />
  </div>
</template>

<script>
import MiniNav from '@/components/Navigation/MiniNav.vue';
import Footr from '@/components/Footr.vue';

export default {
  components: {
    MiniNav,
    Footr
  }
};
</script>
