<template>
   <div class="container-80 container flex flex-column flex-justify-between">
    <div>
        <div class="flex">
            <div :class="`lesson-char lesson-char--${randomCharachter}`"></div>

            <div class="lesson-question-container flex flex-column">
                <div class="lesson-question">
                    <RichTextEditor :content="speachHtml" />
                </div>
            </div>
        </div>

        <div class="flex">
            <div class="lesson-question-container flex flex-column">
                <div class="lesson-question lesson-question--left">
                    <RichTextEditor :content="responseHtml" />
                </div>
            </div>

            <div :class="`lesson-char lesson-char--${randomCharachter + 1}`"></div>
        </div>
    </div>

    <div class="flex flex-justify-center">
        <button class="base-button-one" @click="$emit('start-learning')"> Learn this word </button>
    </div>
   </div>
</template>

<script>
import RichTextEditor from '../components/RichTextEditor.vue';
import axios from "axios";

export default {
name: 'WordStoryView',
components: {
    RichTextEditor,
},
  data() {
    return {
      speachHtml: '',
      responseHtml: '',
    }
  },
// props: {
//     // speachHtml: {
//     //     type: String,
//     //     default: 'im speaking!',
//     // },
//     // responseHtml: {
//     //     type: String,
//     //     default: 'im responding!',
//     // }
// },
  methods: {
    get_convo() {
      axios.get(`${import.meta.env.VITE_API_URL}/conversation`)
        .then((response) => {
          console.log(response.data)
          this.speachHtml = response.data.initial;
          this.responseHtml = response.data.options.response;
        })
        .catch((error) => {
          console.error(error);
        })
    },
  },
  mounted() {
    this.get_convo();
  },
computed: {
    randomCharachter() {
        return Math.floor(Math.random() * 5);
    }
}
}
</script>

<style>
.lesson-question--left::after {
    left: 100%;
    transform: translateY(-50%) rotate(180deg); /* Fixed property */
}
.word-to-learn {
    background-color: var(--pale-blue);
    padding: 0 4px;
    color: var(--dark-blue)
}
</style>
