<template>
  <div class="flex">
      <div class="lesson container">
        <div class="flex">
          <div :class="`lesson-char lesson-char--${characterNum}`"></div>

          <div class="lesson-question-container flex flex-column">
            <span class="lesson-question__advanced-label">
              Advanced Question:
            </span>
            <!-- Questions that use other Gen-z words are considered advanced -->
            <div class="lesson-question">
              <RichTextEditor :content="questionHtml" />
            </div>
            <details class="lesson-hint"> <!-- For kinda hard + questions -->
              <summary>Hint</summary>
              <p>
                {{ hint }}
              </p>
            </details>
          </div>
        </div>

        <div class="lesson-answer-container flex">
          <button v-for="(answer, index) in answers" type="button" :key="index" :class="`lesson-answer ${answer.hasBeenClicked ? 'lesson-button--wrong' : ''} ${answer.hasBeenClickedAndCorrect ? 'lesson-button--right' : ''}`" @click="showNNotification(answer)" :aria-label="answer.text"> {{ answer.text }}</button>
        </div>

        <Notification :type="answerState" :refreshOnRight="refreshOnRight" @next-lesson="nextLesson"/>
      </div>
    </div>
</template>

<script>
import Notification from '@/components/Notification.vue';
import RichTextEditor from '@/components/RichTextEditor.vue';
// import defaultAnswers from '@/data/defaultAnswers.js';
import axios from "axios";

export default {
  name: 'LessonView',
  components: {
    Notification,
    RichTextEditor
  },
  data() {
    return {
      answerState: 'hidden',
      answers: [],
      questionHtml: '',
      hint: '',
      characterNum: 0,
    }
  },
  props: {
    type: {
      type: String,
      default: 'hidden',
    },
    refreshOnRight: {
      type: Boolean,
      default: true,
    },
    wordProficiency: {
      type: Number,
      default: 0,
    },
    // questionHtml: {
    //   type: String,
    //   default: 'omg <a href="TODO">bestie</a> im out w the <a href="TODO">girlypops</a> rn, fully <!-- Gen Z words link to their position on the neurel network --> <span class="lesson-answer--hidden">in my hot girl era</span> <!-- the answer --> so replies <a href="TODO">finna</a> be delayed',
    // }
  },
  methods: {
    showNNotification(answer) {
      if (answer.isRight != 1){
        answer.hasBeenClicked = true
      } else {
        answer.hasBeenClickedAndCorrect = true
      }
      
      let isRight = answer.isRight
      switch (isRight) {
        case 1:
          this.answerState = 'pos';
          break;
        case 0:
          this.answerState = 'neg';
          break;
        case 2:
          this.answerState = 'warn';
          break;
        default:
          this.answerState = 'hidden';
      }
    },
    get_lesson() {
      axios.get(`${import.meta.env.VITE_API_URL}/get_lesson`)
        .then((response) => {
          console.log(response.data)

          // CARDS
          let cards = []
          for (let option of response.data["options"]) {
            cards.push({
              text: option,
              "isRight": option === response.data["correct_word"] ? 1 : 0
            })
          }
          console.log(cards)
          this.answers = cards

          // QUESTION
          this.questionHtml = response.data["sentence"]

          // HINT
          this.hint = response.data["hint"]
        })
        .catch((error) => {
          console.error(error);
        })
    },
    random_character() {
      this.characterNum = Math.floor(Math.random() * 6)
    },
    nextLesson() {
      console.log('running')
      console.log(this.refreshOnRight)
      if (this.refreshOnRight) {
        window.location.reload();
      } else {
      this.$emit('next-lesson');
      }
    }
  },
  mounted() {
    this.get_lesson()
    this.random_character()
  }
}
</script>

<style>
.lesson-button--right {
  background-color: var(--pale-green);
  color: var(--dark-green);
}
</style>
