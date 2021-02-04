<template>
  <svg
    width="70%"
    height="70%"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <rect
      x="3"
      y="3"
      width="7"
      height="9"
      rx="1"
      :fill="fill"
      :stroke="stroke"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
    ></rect>
    <rect
      x="14"
      y="3"
      width="7"
      height="5"
      rx="1"
      :fill="fill"
      :stroke="stroke"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
    ></rect>
    <rect
      x="3"
      y="16"
      width="7"
      height="5"
      rx="1"
      :fill="fill"
      :stroke="stroke"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
    ></rect>
    <rect
      x="14"
      y="12"
      width="7"
      height="9"
      rx="1"
      :fill="fill"
      :stroke="stroke"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
    ></rect>
  </svg>
</template>

<script>
export default {
  name: 'DashboardIcon',
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
