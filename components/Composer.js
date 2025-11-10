import React, {useRef} from 'react'

export default function Composer({value,onChange,onSend,disabled}) {
  const fileRef = useRef(null)

  return (
    <div className="composer">
      <input ref={fileRef} type="file" id="file" hidden />
      <label htmlFor="file" className="glass p-2 rounded cursor-pointer">📎</label>
      <textarea
        className="input"
        rows={1}
        placeholder="Напиши запрос или загрузите файл..." 
        value={value}
        onChange={e=>onChange(e.target.value)}
      />
      <button className="btn glass" onClick={onSend} disabled={disabled}>{disabled? '...' : 'Отправить'}</button>
    </div>
  )
}
