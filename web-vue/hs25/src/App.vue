<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/cards">About</RouterLink>
        <RouterLink to="/bruno">Bruno</RouterLink>
      </nav>
  </header>

  <RouterView />
</template>
