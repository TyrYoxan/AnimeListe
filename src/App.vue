<script>

import ListeAnime from "@/components/ListeAnime.vue";

export default {
  name: 'App',
  components: {
    ListeAnime // Déclaration du composant ListeAnime
  },
  data() {
    return {
      listeAnime: [],
      currentPage: 1,
      limit: 20,
      hasMore: true,
      loading: true
    };
  },
  mounted() {
    this.fetchAnim();
  },
  methods: {
    // Récupère les animes de l'API
    async fetchAnim() {
      this.loading = true;
      const offset = (this.currentPage - 1) * this.limit;
      try {
        const response = await this.$api.get(`/anime?page[limit]=${this.limit}&page[offset]=${offset}`);
        this.listeAnime = response.data.data;
        this.hasMore = response.data.links.next !== null;
      } catch (e) {
        console.error('Erreur lors de la récupération des animes', e);
      } finally {
        this.loading = false;
      }
    },
    // Change de page (précédente ou suivante)
    changePage(direction) {
      this.currentPage += direction;
      this.fetchAnim();
    }
  }
};
</script>

<template>
  <div id="app">
    <h1>Catalogue d'Animes</h1>
    <main>
      <ListeAnime
          :currentPage="currentPage"
          :hasMore="hasMore"
          :loading="loading"
          :listeAnime="listeAnime"
          @change-page="changePage"
      />
    </main>

    <!-- Déplacer la pagination en dehors de la balise main -->
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="changePage(-1)">Précédent</button>
      <span>Page {{ currentPage }}</span>
      <button :disabled="!hasMore" @click="changePage(1)">Suivant</button>
    </div>
  </div>
</template>

<style scoped>

</style>
