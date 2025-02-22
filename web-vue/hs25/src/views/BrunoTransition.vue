<template>
    <div>
        <div class="bruno-view bruno-reaction flex">
            <div class="flex bruno-style fill-flex" style="justify-content: end;">
                <div :class="transition"></div>
            </div> 
            <div class="flex bruno-style fill-flex" style="justify-content: start;">
                <h2 class="bruno-white">Good Job!</h2>
            </div> 
        </div>
        <div class="bruno-view bruno-transition"></div>
    </div>
</template>

<script>
export default {
  name: 'BrunoTransition',
  props: {
    redirectUrl: {
      type: String,
      default: '',
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
  mounted() {
    this.$nextTick(() => {
        const transitionElement = this.$el.querySelector('.bruno-transition');
        console.log("Initial background-position:", getComputedStyle(transitionElement).backgroundPosition);

        setTimeout(() => {
            transitionElement.classList.add('bruno-transition--after');
            console.log("After class added:", getComputedStyle(transitionElement).backgroundPosition);

            setTimeout(() => {
                if (this.redirectUrl) {
                    this.$router.push(this.redirectUrl);
                }
            }, 1000);
        }, 50);
    });
}


}
</script>

<style>
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

.bruno-style {
    align-items: center;
}

.bruno-view {
    position: absolute;
    top: 0;
}

.bruno-reaction { 
    background-color: var(--bruno-grey-base);
    width: 100%;
    height: 100vh;
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
    width: 15%;
}

</style>
