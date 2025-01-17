<script>
export default{
  props: {
    loading:{
      type: Boolean,
      required: true,
    },
    currentPage:{
      type: Number,
      required: true
    },
    hasMore:{
      type: Boolean,
      required: true,
    },
    listeAnime:{
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <div v-if="loading" class="loading">Chargement des animes...</div>
  <div v-else v-for="anime in listeAnime" class="card" :key="anime.id">
    <img :src="anime.attributes.posterImage.original">
    <div class="card-content">
      <h2>{{anime.attributes.titles.en_jp}}</h2>
      <p>Synopsis: {{cutText(anime.attributes.synopsis, 200)}}</p>
      <p>Nombre d'épisode: {{anime.attributes.episodeCount}}</p>
    </div>
  </div>
</template>

<style scoped>

</style>