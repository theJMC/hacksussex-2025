<template>
  <div class="flex">
      <div class="lesson container">
        <div class="flex">
          <div class="lesson-char lesson-char--0"></div>

          <div class="lesson-question-container flex flex-column">
            <span class="lesson-question__advanced-label">
              Advanced Question:
            </span>
            <!-- Questions that use other Gen-z words are considered advanced -->
            <div class="lesson-question">
              omg <a href="TODO">bestie</a> im out w the
              <a href="TODO">girlypops</a> rn, fully
              <!-- Gen Z words link to their position on the neurel network -->
              <span class="lesson-answer--hidden">in my hot girl era</span>
              <!-- the answer -->
              so replies <a href="TODO">finna</a> be delayed
            </div>
            <details class="lesson-hint"> <!-- For kinda hard + questions -->
              <summary>Hint</summary>
              <p>
                This is a sentence that a Gen Z person might say to their friend.
              </p>
            </details>
          </div>
        </div>

        <div class="lesson-answer-container flex">
          <button v-for="(answer, index) in answers" :key="index" :class="`lesson-answer ${answer.hasBeenClicked ? 'TODO' : ''}`" @click="showNNotification(answer.isRight)"> {{ answer.text }}</button>
        </div>

        <Notification :type="answerState" />
      </div>

      <BrunoBlock :wordProficiency="wordProficiency" />
    </div>
</template>

<script>
import BrunoBlock from '@/components/BrunoBlock.vue';
import Notification from '@/components/Notification.vue';
import defaultAnswers from '@/data/defaultAnswers.js';

export default {
  name: 'LessonView',
  components: {
    Notification,
    BrunoBlock
  },
  data() {
    return {
      wordProficiency: 0,
      answerState: 'hidden',
    }
  },
  props: {
    type: {
      type: String,
      default: 'hidden',
    },
    answers: {
      type: Array,
      default: () => defaultAnswers,
    },
    wordProficiency: {
      type: Number,
      default: 0,
    }
  },
  methods: {
    showNNotification(isRight) {
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
    }
  }
}
</script>

<style>
.lesson-char { 
    width: 15%;
}
/* Lesson Characters */
.lesson-char--0 { 
    content: url('../assets/characters/Charlie.png');
}
.lesson-char--1 { 
    content: url('../assets/characters/Derick.png');
}
.lesson-char--2 { 
    content: url('../assets/characters/Franco.png');
}
.lesson-char--3 { 
    content: url('../assets/characters/James.png');
}
.lesson-char--4 { 
    content: url('../assets/characters/Jess.png');
}
.lesson-char--5 { 
    content: url('../assets/characters/Marina.png');
}

.lesson-question-container {
    margin: 20px; 
    margin-top: 60px;
    flex-grow: 1;
    gap:8px;
}
.lesson-question,
.lesson-answer {
    background: var(--real-white);
    border-radius: 20px;
    padding: 20px;
    height: min-content;
    color: var(--dark-grey);
    position: relative;
    box-shadow: 0px 4px 4px var(--shadow);
}

.lesson-question::after {
    content: '';
    position: absolute;
    top: 50%;
    left: -19px;
    transform: translateY(-50%);
    border: 10px solid transparent;
    border-right-color: var(--real-white);
}
.lesson-answer-container {
    margin: 20px;
    gap:8px;
}
.lesson-answer--hidden {
    color:transparent;
    text-decoration: wavy underline var(--light-grey);
}
.lesson-answer {
    flex: 1;
    margin: 0;
    border: none;
}

.lesson-answer:hover {
    background: var(--pale-blue);
    color: var(--dark-blue);
    transition: background 0.2s, color 0.2s;
}
.lesson-question__advanced-label {
    color: var(--dark-blue);
}
.lesson-hint {
    color: var(--dark-blue-green);
    background-color: var(--pale-blue-green);
    padding: 10px;
    border-radius: 10px;
}
</style>
