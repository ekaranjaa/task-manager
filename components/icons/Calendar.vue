<template>
  <svg
    width="70%"
    height="70%"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path
      d="M3,10H21a0,0,0,0,1,0,0V20a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V10A0,0,0,0,1,3,10Z"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
    ></path>
    <path
      d="M4,5H20a1,1,0,0,1,1,1v4a0,0,0,0,1,0,0H3a0,0,0,0,1,0,0V6A1,1,0,0,1,4,5Z"
      :fill="fill"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
    ></path>
    <line
      x1="16"
      y1="3"
      x2="16"
      y2="7"
      :fill="fill"
      :stroke="stroke"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
    ></line>
    <line
      x1="8"
      y1="3"
      x2="8"
      y2="7"
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
  name: 'Calendar',
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
