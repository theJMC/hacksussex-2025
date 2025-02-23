<template>
  <div :class="`rte`" v-html="content"></div>
</template>

<script>
export default {
  name: 'RichTextEditor',
  props: {
    content: {
      type: String,
      default: '',
    },
  },
}
</script>

<style></style>
