<script >
import Liste from "@/components/Liste.vue";
import supabase from "@/conf/db.js";
export default {
  components: {
    Liste
  },
  data(){
    return{
      listes: []
    }
  },
  mounted:
    async function () {
      const {data, error} = await supabase.from('Liste').select()
      if(error){
        console.error(error)
      }else{
        this.listes = data
      }
    }
}
</script>

<template>
  <div v-for="liste in listes">
    <Liste
    :id = liste.id
    />
  </div>
</template>

<style scoped>

</style>