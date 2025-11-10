import React from 'react'
import clsx from 'clsx'

export default function Header({title}) {
  return (
    <header className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-xl font-bold">A</div>
        <div>
          <h1 className="text-lg font-semibold">{title}</h1>
          <div className="text-xs text-slate-400">AI / Hugging Face • Supabase • Vercel</div>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <button className="btn glass pressable">Войти</button>
        <button className="btn glass pressable">Премиум</button>
      </div>
    </header>
  )
}
