<template>
  <div :class="`lesson-result-banner lesson-result-banner-${type} flex`">
    <div :class="`lesson-result__bruno lesson-result__bruno-${type}`"></div>
    <div class="flex flex-column">
      <div>
        <h4 class="lesson-result-banner__text">{{ NotificationTitles[type] }}</h4>
        <span>{{ NotificationDesc[type] }}</span>
      </div>
      <button v-if="type === 'pos'" type="button" class="lesson-go-next" @click="refreshPage">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationBanner',
  data() {
    return {
      NotificationTitles: {
        pos: 'Success',
        neg: 'Error',
        warn: 'Warning',
      },
      NotificationDesc: {
        pos: 'You have successfully completed the lesson',
        neg: 'There was an error completing the lesson',
        warn: 'There was an error completing the lesson',
      },
    }
  },
  props: {
    type: {
      type: String,
      default: 'hidden',
    },
  },
  methods: {
    refreshPage() {
      window.location.reload();
    }
  }
}
</script>

<style>
/* All Docs */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto+Slab:wght@100..900&display=swap');

h4 {
    font-weight: 700;
}
.lesson-result-banner-hidden {
  display: none;
}
.lesson-result-banner {
    color: var(--black);
    padding: 10px;
    border-radius: 10px;
}

.lesson-result-banner-neg {
    background-color: var(--bruno-neg);
}
.lesson-result-banner-pos {
    background-color: var(--bruno-pos);
}
.lesson-result-banner-warn {
    background-color: var(--bruno-warning);
}
.lesson-go-next {
    margin: 30px 0;
    background: var(--pale-green);
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    text-align: left;
    width: min-content;
}
.lesson-go-next:hover {
    background: var(--light-green);
}
/* Bruno Characters */
.lesson-result__bruno { 
    width: 15%;
}
.lesson-result__bruno-neg {
    content: url('../assets/bruno/Bruno-Negative.png');
}
.lesson-result__bruno-pos {
    content: url('../assets/bruno/Bruno-Pos.png');
}
.lesson-result__bruno-warn {
    content: url('../assets/bruno/Bruno-Warning.png');
}
</style>
