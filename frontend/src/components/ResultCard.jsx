import React, { useState } from 'react'
import { useLang } from './LanguageContext.jsx'
import './ResultCard.css'

export default function ResultCard({ result, onClear }) {
  const { t } = useLang()
  const [showContext, setShowContext] = useState(false)

  if (!result) return null

  return (
    <div className="result-card fade-up">
      <div className="result-header">
        <span className="result-badge">{t.aiResponse}</span>
        <div className="result-actions">
          <button className="btn-ghost" onClick={() => setShowContext(v => !v)}>
            {showContext ? t.hideContext : t.showContext}
          </button>
          <button className="btn-ghost danger" onClick={onClear}>{t.clear}</button>
        </div>
      </div>

      <div className="result-question">
        <span className="qlabel">Q:</span>
        <p>{result.question}</p>
      </div>

      <div className="result-answer">
        {result.answer.split('\n').map((line, i) =>
          line.trim() ? <p key={i}>{line}</p> : <br key={i} />
        )}
      </div>

      <div className="result-meta">
        <span className="meta-chip">🤖 {result.model}</span>
      </div>

      {showContext && (
        <div className="context-box fade-up">
          <p className="context-title">Retrieved Knowledge Base Context</p>
          <pre className="context-text">{result.context_used}</pre>
        </div>
      )}
    </div>
  )
}