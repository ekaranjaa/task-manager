<template>
  <footer>
    <div
      class="container mx-auto px-8 py-4 text-sm flex flex-col md:flex-row md:items-center md:justify-between text-gray-500"
    >
      <p class="order-2">Designed and built by Emmanuel Karanja &copy; 2021</p>
      <div class="mb-2 md:mb-0 md:order-2 flex items-center">
        <nuxt-link to="#" class="hover:text-blue-500 transition"
          >Terms and Conditions</nuxt-link
        >
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footr'
};
</script>
