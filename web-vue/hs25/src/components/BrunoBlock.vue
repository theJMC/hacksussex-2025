<template>
  <div class="bruno-board flex flex-column">
    <div class="bruno"></div>
    <div class="bruno-juice">
      <div class="bruno-juice-level" :style="{ height: `${100 - wordProficiency}%` }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationBanner',
  props: {
    wordProficiency: {
      type: Number,
      default: 0,
    }
  },
}
</script>

<style>/* Bruno */
.bruno-board {
    background-color: var(--bruno-grey-base);
}
.bruno {
    width: 150px;
    max-height: fit-content;
    content: url('../assets/bruno/Bruno-Default.png');
}
.bruno-juice{
    height: 100%;
    background: var(--dark-red);
    background: linear-gradient(0deg, var(--dark-red) 20%, var(--dark-orange) 41%, var(--pale-orange) 62%, var(--light-green) 81%);
    margin: 30%;
    border-radius: 20px;
    overflow: hidden;
}
.bruno-juice-level {
    background: var(--light-grey);
    transition: height 0.5s;
}
</style>
