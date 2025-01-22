<script>
import supabase from "@/conf/db.js";

export default{
  props:{
    id: {
      type: String,
      required: true
    }
  },
  data(){
    return{
      Title: '',
      animes: []
    }
  },
  methods:{
    async fetchAnimes(ids){
      const response = await this.$api.get(`/anime?filter[id]=${ids.join(',')}`);
      const data = response.data;
      this.animes = data.data;
    },
    async fetchTitle(id){
      const {data, error} = await supabase.from('Liste').select('title').eq('id', id )
      if (error) {
        console.error(error);
        return;
      }
      this.Title = data[0].title;
    },
    async fetchAnimeToListe(id){
      const {data, error} = await supabase.from('AnimeToListe').select('id').eq('id_liste', id )
      if (error) {
        console.error(error);
        return;
      }
      await this.fetchAnimes(data.map(d => d.id));
    }
  },
  mounted() {
    this.fetchTitle(this.id);
    this.fetchAnimeToListe(this.id);
  }
}
</script>

<template>
  <h2>{{Title}}</h2>
  <div v-for="anime in animes" class="anime-item">
    <img :src="anime.attributes.posterImage.small" class="anime-poster"/>
    <h4 class="anime-title">{{anime.attributes.titles.en_jp}}</h4>
  </div>
</template>

<style scoped>
/* Conteneur de chaque anime */
.anime-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem; /* Espacement entre chaque anime */
}

/* Style de l'image */
.anime-poster {
  width: 100px; /* Réduire la taille de l'image */
  height: auto; /* Garder les proportions */
  margin-right: 10px; /* Espacement entre l'image et le titre */
  border-radius: 5px; /* Optionnel : coins arrondis */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Optionnel : ajouter une ombre */
}

/* Style du titre */
.anime-title {
  font-size: 1rem; /* Taille du texte */
  font-weight: bold; /* Mettre le titre en gras */
  color: #ffffff; /* Couleur du texte */
}
</style>