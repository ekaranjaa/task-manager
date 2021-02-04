<template>
  <header>
    <div class="container mx-auto px-8 py-4">
      <div class="max-w-3xl">
        <div class="mb-12">
          <h1 class="mb-6 font-bold text-5xl md:text-6xl">
            Easily manage your team.
          </h1>
          <h2 class="text-4xl md:text-5xl text-gray-500 leading-tight">
            Keep track of your team, assign tasks and much more.
          </h2>
        </div>
        <nuxt-link
          to="/dashboard"
          class="cta px-6 py-3 inline-flex items-center bg-blue-500 text-white hover:bg-yellow-400 focus:bg-yellow-400 transition"
        >
          Get Started
          <span class="ml-2 h-6 w-6 grid place-items-center transition-all">
            <right-arrow />
          </span>
        </nuxt-link>
      </div>
    </div>
  </header>
</template>

<script>
import RightArrow from './icons/RightArrow.vue';

export default {
  name: 'Headr',
  components: { RightArrow }
};
</script>

<style scoped>
.cta:hover > span,
.cta:focus > span {
  margin-left: 1rem;
}
</style>
