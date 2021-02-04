<template>
  <div class="container mx-auto px-8 py-4">
    <form autocomplete="off" class="mx-auto max-w-sm" @submit.prevent="">
      <div class="mb-4">
        <label for="name" class="block leading-8">Name</label>
        <input
          id="name"
          type="text"
          class="px-6 py-3 font-light block w-full border outline-none ring-blue-500 focus:ring-1 transition"
        />
      </div>
      <div class="mb-4">
        <label for="email" class="block leading-8">Email</label>
        <input
          id="email"
          type="email"
          class="px-6 py-3 font-light block w-full border outline-none ring-blue-500 focus:ring-1 transition"
        />
      </div>
      <div class="md:grid grid-cols-2 gap-5">
        <div class="mb-4">
          <label for="password" class="block leading-8">Password</label>
          <input
            id="password"
            type="password"
            class="px-6 py-3 font-light block w-full border outline-none ring-blue-500 focus:ring-1 transition"
          />
        </div>
        <div class="mb-4">
          <label for="passwordContirmation" class="block leading-8">
            Confirm Password
          </label>
          <input
            id="passwordContirmation"
            type="password"
            class="px-6 py-3 font-light block w-full border outline-none ring-blue-500 focus:ring-1 transition"
          />
        </div>
      </div>
      <p class="text-xs">
        I have read and agreed to the
        <nuxt-link to="#" class="text-blue-500">Terms and Conditions</nuxt-link>
      </p>
      <button
        type="submit"
        class="my-8 px-6 py-3 block w-full bg-blue-500 text-white hover:bg-yellow-400 focus:bg-yellow-400 transition outline-none"
      >
        Register
      </button>
      <nuxt-link
        to="/auth/login"
        class="text-sm text-center block text-blue-500"
      >
        Login
      </nuxt-link>
    </form>
  </div>
</template>

<script>
export default {
  layout: 'auth'
};
</script>
