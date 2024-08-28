import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private'

export async function load() {
    console.log(SUPABASE_URL, SUPABASE_ANON_KEY) // secret 🤫
}

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// +page.server.js
export async function load({ fetch }) {
    // Define your function
    async function signOut(scope) {
        try {
            const { error } = await supabase.auth.signOut({
                scope: scope,
            });
            return { error };
        } catch (error) {
            return console.error(error.message);
        }
    }

    // Call the function and return its result as part of the load data
    const message = signOut(scope);

    return {
        message
    };
}