import React from 'react'

export function Messages({messages}) {
  return (
    <div className="messages" role="log" aria-live="polite">
      {messages.map(m => (
        <div key={m.id} className={`msg ${m.from==='user'?'user':'bot'}`}>
          <div style={{whiteSpace:'pre-wrap'}}>{m.text}</div>
        </div>
      ))}
    </div>
  )
}
