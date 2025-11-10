// Server API route for Supabase admin operations (must use SUPABASE_SERVICE_KEY env var)
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

if(!SUPABASE_URL || !SUPABASE_SERVICE_KEY){
  console.warn('Supabase admin envs missing. SUPABASE_SERVICE_KEY required for admin operations.')
}

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { action, payload } = req.body || {}
  try {
    if(action === 'saveHistory'){
      const { user_id, prompt, response } = payload
      const { error } = await supabaseAdmin.from('history').insert([{ user_id, prompt, response }])
      if(error) throw error
      return res.json({ ok: true })
    }
    return res.status(400).json({ error: 'Unknown action' })
  } catch (error) {
    console.error('supabase-admin error', error)
    return res.status(500).json({ error: error.message || 'internal' })
  }
}
