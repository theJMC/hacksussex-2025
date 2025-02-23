<template>
    <div v-if="appStage % 2 === 0" class="main flex">
        <div class="main-content">
            <WordStoryView v-if="appStage == 0" :speachHtml="speachHtml" :responseHtml="responseHtml" @start-learning="handleStartLearning"/>
            <CardView v-else-if="appStage == 2" @all-cards-complete="handleAllCardsComplete"/>
            <LessonView v-else-if="appStage == 4" :refreshOnRight="false" @next-lesson="handleNextLesson"/>
        </div>
        <BrunoBlock :wordProficiency="dataWordProficiency"/>
    </div>
    <BrunoTransition :speachHtml="possativeReinforesment[appStage]" :wordProficiency="dataWordProficiency" v-else @button-press="handleButtonPress"/>
</template>

<script>
import BrunoBlock from '@/components/BrunoBlock.vue';
import WordStoryView from './WordStoryView.vue';
import CardView from './CardView.vue';
import LessonView from './LessonView.vue';
import BrunoTransition from './BrunoTransition.vue';

export default {
    name: 'MainApp',
    components: {
        BrunoBlock,
        WordStoryView,
        CardView,
        LessonView,
        BrunoTransition
    },
    data() {
      return {
        dataWordProficiency: 0,
        appStage: 0,
      };
    },
    props: {
      possativeReinforesment: {
        type: Array,
        default: () => [
          'you\'re doing a <span class="word-to-learn">lit</span> job!',
          'are you ready to <span class="word-to-learn">slay</span> this',
          'keep it up, you\'re <span class="word-to-learn">killing it</span>!',
          'yes my <span class="word-to-learn">drilla</span>',
          'thats <span class="word-to-learn">fire</span> you\'ve learnt a new word!'
        ],
      },
      responseHtml: {
        type: String,
        default: 'i was born ready!',
      },
    },
    methods: {
      handleStartLearning() {
        this.appStage = 1;
        this.dataWordProficiency += 10; // stages / like 100? 
      },
      handleAllCardsComplete() {
        this.appStage = 3;
        this.dataWordProficiency += 40; // stages / like 100? 
      },
      handleButtonPress() {
        console.log('Button pressed, current appStage:', this.appStage);
        this.appStage++;
      },
        handleNextLesson() {
            console.log('final press')
            this.appStage ++;
        },
    },
}
</script>

<style>
.main {
    height: 100vh;
    width: 100vw;
    background-color: var(--white);
}

.main-content {
    flex-grow: 1;
}
</style>
