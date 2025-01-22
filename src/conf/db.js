import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xipjeczmemmxbzcuhcbo.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Les variables d\'environnement Supabase sont manquantes.');
}

export default supabase