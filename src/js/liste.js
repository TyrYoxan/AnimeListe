import supabase from "@/conf/db.js";

async function createListe( data){
    const { error } = await supabase.from('Liste').insert(data)
    return error
}

async function updateListe(id, data){
    const { error } = await supabase.from('Liste').update(data).eq('id', id)
    return error
}

async function deleteListe(id){
    const { error } = await supabase.from('Liste').delete().eq('id', id)
    return error
}

async function getLists(){
    const { data, error } = await supabase.from('Liste').select('*')
    return {data, error}
}

async function getListsByUserId(userId){
    const { data, error } = await supabase.from('Liste').select('*').eq('id_user', userId)
    return {data, error}
}

async function addAnime(id_liste, id_anime){
    const { error } = await supabase.from('AnimeToListe').insert({ id_anime, id_liste })
    return error
}

export default { createListe, updateListe, deleteListe, getLists, getListsByUserId, addAnime }