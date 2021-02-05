<template>
  <article class="p-4 bg-white border rounded-lg">
    <div class="mb-2">
      <p class="mb-2 text-lg">Lorem ipsum dolor sit.</p>
      <p class="text-sm leading-6">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione harum
        accusantium molestias hic fuga mollitia!
      </p>
    </div>
    <div class="flex items-center">
      <div class="h-8 w-8 opacity-60 grid bg-white rounded-full shadow"></div>
      <div
        class="-ml-2 h-8 w-8 opacity-60 grid bg-white rounded-full shadow"
      ></div>
      <div
        class="-ml-2 h-8 w-8 opacity-60 grid bg-white rounded-full shadow"
      ></div>
      <div
        class="ml-1 text-xs h-8 w-8 opacity-60 grid place-items-center bg-white rounded-full shadow"
      >
        <p>+10</p>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'TaskCard'
};
</script>
