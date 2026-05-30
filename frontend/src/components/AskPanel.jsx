import React, { useState } from 'react'
import { askGeneral } from '../api.js'
import ResultCard from './ResultCard.jsx'
import { useLang } from './LanguageContext.jsx'
import './Panel.css'

export default function AskPanel({ weather }) {
  const { t } = useLang()
  const [question, setQuestion] = useState('')
  const [language, setLanguage] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [result,   setResult]   = useState(null)
  const [error,    setError]    = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!question.trim()) return
    setLoading(true); setError(''); setResult(null)
    try {
      const data = await askGeneral(question, language, weather)
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="panel">
      <div className="panel-intro">
        <h2 className="panel-title">{t.askTitle}</h2>
        <p className="panel-desc">{t.askDesc}</p>
      </div>

      <div className="examples-row">
        {t.examples.map(ex => (
          <button key={ex} className="example-chip" onClick={() => setQuestion(ex)}>
            {ex}
          </button>
        ))}
      </div>

      <form className="panel-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">{t.askLabel}</label>
          <textarea
            className="form-textarea"
            rows={4}
            placeholder={t.askPlaceholder}
            value={question}
            onChange={e => setQuestion(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">{t.askLangLabel}</label>
            <select className="form-select" value={language} onChange={e => setLanguage(e.target.value)}>
              <option value="">{t.autoDetect}</option>
              <option value="Hindi">हिंदी (Hindi)</option>
              <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
              <option value="Telugu">తెలుగు (Telugu)</option>
              <option value="Tamil">தமிழ் (Tamil)</option>
              <option value="Marathi">मराठी (Marathi)</option>
              <option value="English">English</option>
            </select>
          </div>

          <button type="submit" className="btn-primary" disabled={loading || !question.trim()}>
            {loading ? <span className="spinner" /> : t.askBtn}
          </button>
        </div>

        {weather && (
          <div className="weather-context-note">
            {t.askWeatherNote(weather.temp, weather.condition)}
          </div>
        )}
      </form>

      {error && <div className="error-box">{error}</div>}
      <ResultCard result={result} onClear={() => setResult(null)} />
    </div>
  )
}