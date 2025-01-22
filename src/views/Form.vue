<script>
import supabase from "@/conf/db.js";

export default {

  data(){
    return{
      lists: [],
      selectedList: "",
      isNewList: false,
      newListName: ""
    }
  },
  methods:{
    async getCollections(){
      try{
        const response = await supabase.from('Liste').select("*")
        this.lists = response.data
      }catch (e){
        console.error('ERRRRRRRRRRRR')
      }
    },
    async addAnime() {
      try {
        let listId = this.selectedListId;

        // Si aucune liste existante n'est sélectionnée, créer une nouvelle liste
        if (!listId && this.newListName) {
          const { data: newList, error: insertError } = await supabase
              .from("Liste")
              .insert({ title: this.newListName, id_user: '588d580c-5d78-4ad9-991c-38051c3205e2' })
              .select(); // Récupère immédiatement les données insérées

          if (insertError) throw insertError;

          if (newList && newList.length > 0) {
            listId = newList[0].id;
          }
        }else{
          listId = this.selectedList;
        }

        if (listId) {
          // Ajouter l'anime à la liste sélectionnée ou nouvellement créée
          const { error: animeInsertError } = await supabase
              .from("AnimeToListe")
              .insert({
                id: this.$route.params.id,
                id_liste: listId
              });

          if (animeInsertError) throw animeInsertError;

          this.$router.push({name: "home"})

          console.log("Anime ajouté avec succès");
          this.newListName = "";
          this.selectedListId = "";
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'anime :", error);
      }

      // Redirection vers la page d'ajout
      this.$router.push({ name: "add", params: { id: this.$route.params.id } });
    },
    toggleNewList() {
      this.isNewList = !this.isNewList;
      this.newListName = "";
    },
  },
  async mounted() {
    await this.getCollections()

  }
}
</script>


<template>
  <div>
    <h2>Ajouter un Anime à la Liste</h2>
    <form @submit.prevent="addAnime">

      <!-- Choisir une liste existante ou créer une nouvelle liste -->
      <div>
        <label for="listChoice">Choisir une liste</label>
        <select v-model="selectedList" id="listChoice" >
          <option disabled value="">Sélectionnez une liste existante</option>
          <option v-for="list in lists" :key="list.id" :value="list.id">{{ list.title }}</option>
        </select>
        <button type="button" @click="toggleNewList">Créer une nouvelle liste</button>
      </div>

      <!-- Si l'utilisateur veut créer une nouvelle liste, afficher un champ de saisie -->
      <div v-if="isNewList">
        <label for="newListName">Nom de la nouvelle liste</label>
        <input type="text" v-model="newListName" id="newListName" required />
      </div>
      <button type="submit">Ajouter Anime</button>
    </form>
  </div>
</template>



<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  font-weight: bold;
}

input, textarea, select {
  padding: 0.5rem;
  margin-top: 0.2rem;
  width: 100%;
  color: black;
  max-width: 400px;
}

button {
  padding: 0.7rem;
  background-color: #007BFF;
  color: white;
  border: none;
  cursor: pointer;
  max-width: 200px;
  margin-top: 1rem;
}

button:hover {
  background-color: #0056b3;
}
</style>