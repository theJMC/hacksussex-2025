<template>
   <div class="container">
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

    <div class="flex flex-justify-center">
        <button class="base-button-one"> Learn this word </button>
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
          this.responseHtml = "<h1>Which one is the correct response?</h1>";
          for (let i = 0; i < response.data.options.length; i++) {
            this.responseHtml += `${i+1}: ` + response.data.options[i].response + "<br>";
          }
          // this.responseHtml = response.data.options[0].response;
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
.base-button-one {
    background-color: var(--real-white);
    color: var(--black);
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s;
}
</style>
