<template>
  <svg
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <polyline
      points="14 5 21 12 14 19"
      :fill="fill"
      :stroke="stroke"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
    ></polyline>
    <line
      x1="21"
      y1="12"
      x2="3"
      y2="12"
      :fill="fill"
      :stroke="stroke"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
    ></line>
  </svg>
</template>

<script>
export default {
  name: 'RightArrow',
  props: {
    fill: {
      type: String,
      default: 'none'
    },
    stroke: {
      type: String,
      default: 'currentColor'
    }
  }
};
</script>
