<template>
  <div class="app-container">
    <header>
      <h1>Catalogue d'Animes</h1>
    </header>

    <!-- Recherche et Filtrage -->
    <section class="filter-search-container">
      <h2>Recherche et Filtrage</h2>

      <div class="search-bar">
        <input
            type="text"
            id="searchInput"
            v-model="searchQuery"
            placeholder="Rechercher un anime..."
        />
        <button @click="fetchAnim">Rechercher</button>
      </div>

      <div class="filters">
        <label for="categoryFilter">Filtrer par catégorie :</label>
        <select id="categoryFilter" v-model="filtre" @change="applyFilter">
          <option disabled value="">Toutes</option>
          <option value="action">Action</option>
          <option value="aventure">Aventure</option>
          <option value="conbats">Conbats</option>
          <option value="comedie">Comédie</option>
          <option value="drame">Drame</option>
          <option value="ecchi">Ecchi</option>
          <option value="ecole">Ecole</option>
          <option value="fantaisie">Fantaisie</option>
          <option value="horreur">Horreur</option>
          <option value="isekai">Isekai</option>
          <option value="josei">Josei</option>
          <option value="Mystere">Mystère</option>
          <option value="psychologique">Psychologique</option>
          <option value="quotidien">Quotidien</option>
          <option value="romance">Romance</option>
          <option value="seinen">Seinen</option>
          <option value="shonen">Shônen</option>
          <option value="shojo">Shôjo</option>
          <option value="sport">Sport</option>
          <option value="surnaturel">Surnaturel</option>
          <option value="tournois">Tournois</option>
          <option value="yaoi">Yaoi</option>
          <option value="yuri">Yuri</option>
        </select>
      </div>
    </section>

    <!-- Liste des Animes -->
    <main>
      <ListeAnime
          :currentPage="currentPage"
          :hasMore="hasMore"
          :loading="loading"
          :listeAnime="filteredAnimes"
          @change-page="changePage"
      />
    </main>

    <!-- Pagination -->
    <footer class="pagination">
      <button :disabled="currentPage === 1" @click="changePage(-1)">Précédent</button>
      <span>Page {{ currentPage }}</span>
      <button :disabled="!hasMore" @click="changePage(1)">Suivant</button>
    </footer>
  </div>
</template>

<script>
import ListeAnime from "@/components/ListeAnime.vue";

export default {
  name: "App",
  components: {
    ListeAnime,
  },
  data() {
    return {
      listeAnime: [],
      filteredAnimes: [],
      searchQuery: "",
      filtre:'',
      currentPage: 1,
      limit: 20,
      hasMore: true,
      loading: true,
    };
  },
  mounted() {
    this.fetchAnim();
  },
  methods: {
    async fetchAnim() {
      this.loading = true;
      const offset = (this.currentPage - 1) * this.limit;
      try {
        if(!this.filtre){
          if(this.searchQuery){
            await this.searchByName(offset)
          }else{
            await this.searchAll(offset)
          }
        }else{
          await this.searchByFilter(offset)
        }

      } catch (e) {
        console.error("Erreur lors de la récupération des animes", e);
      } finally {
        this.loading = false;
      }
    },
    changePage(direction) {
      this.currentPage += direction;
      this.fetchAnim(this.filtre);
    },
    applyFilter(){
      this.fetchAnim(this.filtre)
    },
    async searchAll(offset){
      const response = await this.$api.get(
          `/anime?page[limit]=${this.limit}&page[offset]=${offset}t`
      );
      this.listeAnime = response.data.data;
      this.filteredAnimes = this.listeAnime; // Initialisation des résultats filtrés
      this.hasMore = response.data.links.next !== null;
    },
    async searchByFilter(offset){
      const response = await this.$api.get(
          `/anime?filter[categories]=${this.filtre}&page[limit]=${this.limit}&page[offset]=${offset}`
      );
      this.listeAnime = response.data.data;
      this.filteredAnimes = this.listeAnime; // Initialisation des résultats filtrés
      this.hasMore = response.data.links.next !== null;
    },
    async searchByName(offset){
      const response = await this.$api.get(
          `/anime?filter[text]=${this.searchQuery}&page[limit]=${this.limit}&page[offset]=${offset}`
      );
      this.listeAnime = response.data.data;
      this.filteredAnimes = this.listeAnime; // Initialisation des résultats filtrés
      this.hasMore = response.data.links.next !== null;
    }
  }
}
</script>

<style scoped>

</style>
