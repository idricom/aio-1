// Serverless API route that proxies requests to Hugging Face Inference API.
// IMPORTANT: Keep HUGGINGFACE_API_KEY as a secret in Vercel envs (do not commit).
import formidable from 'formidable'
import fs from 'fs'

export const config = { api: { bodyParser: false } }

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const HUGGINGFACE = process.env.HUGGINGFACE_API_KEY
  if(!HUGGINGFACE) return res.status(500).json({ error: 'HUGGINGFACE_API_KEY not set' })

  const form = new formidable.IncomingForm()
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'form parse error' })
    const prompt = fields.prompt || ''
    // Example: calling Dolly / GPT-like model — adapt model id as needed in env or code.
    const model = process.env.HF_MODEL || 'gpt2'

    try {
      const body = JSON.stringify({ inputs: prompt, options: { wait_for_model: true } })
      const upstream = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUGGINGFACE}`,
          'Content-Type': 'application/json'
        },
        body
      })

      if (!upstream.ok) {
        const text = await upstream.text()
        return res.status(502).json({ error: 'huggingface error', details: text })
      }

      // Stream the response to the client
      res.setHeader('Content-Type', 'application/octet-stream')
      const reader = upstream.body.getReader()
      while(true){
        const {done, value} = await reader.read()
        if(done) break
        res.write(value)
      }
      res.end()
    } catch (e) {
      console.error('hf proxy error', e)
      res.status(500).json({ error: 'internal' })
    }
  })
}
