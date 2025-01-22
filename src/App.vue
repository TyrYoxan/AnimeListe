<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <nav>
      <RouterLink to="/">Accueil</RouterLink>
      <RouterLink to="/liste">Listes</RouterLink>
      <RouterLink to="/login">Connexion</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style scoped>

</style>
