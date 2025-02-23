<template>
    <div class="container homepage flex flex-column flex-align-center flex-justify-center">
        <h1> Untitled Hackathon Project </h1>
        <div class="flex homepage-buttons">
            <button class="base-button-one flex-one button-green" @click="redirectToMain"> Learn a new word </button>
            <button class="base-button-one flex-one button-orange" @click="redirectToPractice"> Practice </button>
            <button class="base-button-one flex-one" @click="redirectToNetwork"> Network </button>
        </div>

        <div class="flex homepage-characters">
            <div class="lesson-char lesson-char--2 homepage-character-top"></div>
            <div class="lesson-char lesson-char--1"></div>
            <div class="lesson-char lesson-char--3 homepage-character-top"></div>
            <div class="lesson-char lesson-char--4"></div>
            <div class="lesson-char lesson-char--0 homepage-character-top"></div>
            <div class="lesson-char lesson-char--5"></div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
    props: {
      content: {
        type: String,
        default: '',
      },
    },
    methods: {
      redirectToMain() {
        this.$router.push('/main');
      },
      redirectToPractice() {
        this.$router.push('/practice');
      },
      redirectToNetwork() {
        this.$router.push('/network');
      },
    },
  }
  </script>
  
  <style>
.flex-one {
    flex: 1;
}
.homepage {
    height: 80vh;
    gap: 14px;
}
.homepage-buttons {
    gap: 8px;
    width: 90%;
}

.homepage-characters {
    .lesson-char {
        width: 200px;
        height: fit-content;

        transition: all 0.5s;
    }

    .lesson-char:hover {
        transform: scale(1.1);
    }
}

.homepage-character-top {
    margin-top: 30px;
}


</style>