//    Supabase

const supabaseUrl = "https://yefbtiyiuvrwxfxklamu.supabase.co";
const supabaseKey ="sb_publishable_GhEzOi_P5cCxh9QvSBfcuQ_3DmJaGWT";

const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey)