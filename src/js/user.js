import supabase from "@/conf/db.js";
import bcrypt from "bcryptjs";

const saltRounds = 10;

/**
 * Crée un utilisateur avec un mot de passe haché
 * @param {Object} user - L'objet utilisateur contenant `email`, `password`, etc.
 * @returns {Promise<Object>} - Résultat avec les données insérées ou une erreur.
 */
export async function createUser(user) {
    try {
        // Hacher le mot de passe
        user.password = await bcrypt.hash(user.password, saltRounds);

        console.log(user)
        // Insérer l'utilisateur dans la base de données
        const { data, error } = await supabase.from('user').insert(user);

        if (error){
            console.error("Erreur lors de l'insertion de l'utilisateur :", error);
            return { data: null, error };
        }else{
            console.log("Utilisateur créé avec succès :", data);
            return { data, error: null };
        }

    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        return { data: null, error };
    }
}

/**
 * Authentifie un utilisateur avec email et mot de passe
 * @param {string} email - L'email de l'utilisateur.
 * @param {string} password - Le mot de passe de l'utilisateur.
 * @returns {Promise<Object>} - Résultat de l'authentification avec succès ou erreur.
 */
export async function loginUser(email, password) {
    try {
        // Rechercher l'utilisateur par email
        const { data, error } = await supabase
            .from('user')
            .select('password')
            .eq('email', email)
            .single(); // Récupérer un seul utilisateur

        if (error) throw error;
        if (!data) throw new Error("Utilisateur non trouvé");

        // Comparer les mots de passe
        const match = await bcrypt.compare(password, data.password);
        if (!match) throw new Error("Mot de passe incorrect");

        console.log("Authentification réussie !");
        return { data: { authenticated: true }, error: null };
    } catch (error) {
        console.error("Erreur lors de l'authentification :", error);
        return { data: null, error };
    }
}

/**
 * Récupère un utilisateur par son ID
 * @param {number|string} id - L'identifiant de l'utilisateur.
 * @returns {Promise<Object>} - Les données utilisateur ou une erreur.
 */
export async function getUser(id) {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single(); // Récupérer un seul utilisateur

        if (error) throw error;

        return { data, error: null };
    } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
        return { data: null, error };
    }
}

export default { createUser, loginUser, getUser };
