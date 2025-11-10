import Head from 'next/head'
import { useState } from 'react'
import Header from '../components/Header'
import { Messages } from '../components/Chat'
import Composer from '../components/Composer'
import axios from 'axios'

export default function Home(){
  const [messages,setMessages] = useState([
    {id: 'welcome', from:'bot', text: 'Привет! Я AIO Chat — задай любой вопрос или попроси сгенерировать изображение.'}
  ])
  const [input,setInput] = useState('')
  const [loading,setLoading] = useState(false)

  async function send(){
    if(!input.trim()) return
    const user = { id: Date.now().toString(), from: 'user', text: input.trim() }
    setMessages(prev => [...prev, user])
    setInput('')
    setLoading(true)

    try{
      // Use fetch to support streaming responses from API route
      const form = new FormData()
      form.append('prompt', user.text)
      const res = await fetch('/api/hf-proxy', { method: 'POST', body: form })
      if(!res.ok) throw new Error('HF proxy error')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let botText = ''
      // add draft message
      setMessages(prev => [...prev, {id:'bot-draft', from:'bot', text: ''}])
      while(true){
        const {done, value} = await reader.read()
        if(done) break
        botText += decoder.decode(value, {stream:true})
        setMessages(prev => prev.map(m => m.id === 'bot-draft' ? {...m, text: botText} : m))
      }
      // finalize draft id
      setMessages(prev => prev.map(m => m.id === 'bot-draft' ? {...m, id: Date.now().toString()} : m))
    }catch(err){
      setMessages(prev => [...prev, {id: Date.now().toString(), from:'bot', text: 'Ошибка: не удалось получить ответ.'}])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>AIO Chat — Demo</title>
        <meta name="description" content="AIO Chat — demo app with HF and Supabase" />
      </Head>
      <div className="chat-container glass p-6">
        <Header title="AIO Chat — Demo" />
        <main>
          <Messages messages={messages} />
        </main>
        <Composer value={input} onChange={setInput} onSend={send} disabled={loading} />
      </div>
    </>
  )
}
