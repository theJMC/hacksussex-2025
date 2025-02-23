<template>
    <div class="bruno-view-background flex flex-justify-center flex-align-center">
        <div class="bruno-view bruno-reaction-container bruno-reaction flex flex-column">
            <div class="bruno-reaction flex">
                <div class="flex bruno-style">
                    <div :class="transition"></div>
                </div> 
                <div class="flex bruno-style">
                    <div class="lesson-question-container flex flex-column">
                    <div class="lesson-question">
                        <RichTextEditor :content="speachHtml" />
                    </div>
                </div>
                </div>
            </div>

            <div class="flex flex-justify-center">
                <button class="base-button-one" @click="handleButtonClick"> {{wordProficiency < 25 ? 'Learn this word' : 'Keep going'}} </button>
            </div>
        </div>
        <div class="bruno-view bruno-transition"></div>
    </div>
</template>

<script>
import RichTextEditor from '@/components/RichTextEditor.vue';

export default {
  name: 'BrunoTransition',
  components: {
    RichTextEditor,
  },
  props: {
    speachHtml: {
      type: String,
      default: 'are you ready to <span class="word-to-learn">slay</span> this hackathon',
    },
    wordProficiency: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    transition() {
      return this.wordProficiency > 75
        ? 'bruno-transition--enlightened'
        : this.wordProficiency > 50
          ? 'bruno-transition--regular'
          : 'bruno-transition--sad'
    },
  },
  methods: {
    handleButtonClick() {
    console.log('button clicked');
      this.$emit('button-press');
    }
  },
  mounted() {
    this.$nextTick(() => {
        const transitionElement = this.$el.querySelector('.bruno-transition');

        setTimeout(() => {
            transitionElement.classList.add('bruno-transition--after');

            setTimeout(() => {
                transitionElement.classList.add('bruno-transition--after-after');
            }, 3000);
        }, 50);
    });
}


}
</script>

<style>
.bruno-view-background {
    background-color: var(--bruno-grey-base);
    width: 100%;
    height: 100vh;
}
.bruno-white {
    color: var(--real-white);
}
.bruno-transition {
    background: linear-gradient(135deg, transparent 50%, var(--real-white) 50%);
    background-size: 200% 200%;
    will-change: background-position;
    width: 100%;
    height: 100vh;
    transition: background-position 3s ease-in-out;
    background-position: 100% 100%;
    z-index: 1;
}

.bruno-transition--after {
    background-position: 0% 0%;
}

.bruno-transition--after-after {
    z-index: -2;
}

.bruno-style {
    align-items: center;
}

.bruno-reaction-container {
    height: 100%;
    justify-content: center;
    max-width: 75%;
}

.bruno-view {
    position: absolute;
    top: 0;
}

.bruno-reaction { 
    width: fit-content;
    gap: 8px;
}

.bruno-transition--enlightened{ 
    content: url('../assets/bruno/Bruno-Enlightened.png');
}
.bruno-transition--regular{ 
    content: url('../assets/bruno/Bruno-Default.png');
}
.bruno-transition--sad{ 
    content: url('../assets/bruno/Bruno-Shocked.png');
}

.bruno-transition--enlightened,
.bruno-transition--regular,
.bruno-transition--sad { 
    width: 150px;
}

</style>
