import React, { useState } from 'react'
import { askDisease } from '../api.js'
import ResultCard from './ResultCard.jsx'
import { useLang } from './LanguageContext.jsx'
import './Panel.css'

export default function DiseasePanel({ weather }) {
  const { t } = useLang()
  const [crop,     setCrop]     = useState('')
  const [symptoms, setSymptoms] = useState('')
  const [language, setLanguage] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [result,   setResult]   = useState(null)
  const [error,    setError]    = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!crop || !symptoms.trim()) return
    setLoading(true); setError(''); setResult(null)
    try {
      const data = await askDisease(crop, symptoms, language, weather)
      setResult(data)
    } catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  return (
    <div className="panel">
      <div className="panel-intro">
        <h2 className="panel-title">{t.diseaseTitle}</h2>
        <p className="panel-desc">{t.diseaseDesc}</p>
      </div>

      <form className="panel-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">{t.cropLabel}</label>
          <input
            className="form-input"
            placeholder={t.cropPlaceholder}
            value={crop}
            onChange={e => setCrop(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">{t.symptomsLabel}</label>
          <textarea
            className="form-textarea"
            rows={4}
            placeholder={t.symptomsPlaceholder}
            value={symptoms}
            onChange={e => setSymptoms(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">{t.answerLang}</label>
            <select className="form-select" value={language} onChange={e => setLanguage(e.target.value)}>
              <option value="">{t.autoDetectShort}</option>
              <option value="Hindi">हिंदी (Hindi)</option>
              <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
              <option value="Telugu">తెలుగు (Telugu)</option>
              <option value="Tamil">தமிழ் (Tamil)</option>
              <option value="English">English</option>
            </select>
          </div>
          <button type="submit" className="btn-primary" disabled={loading || !crop || !symptoms.trim()}>
            {loading ? <span className="spinner" /> : t.diseaseBtn}
          </button>
        </div>

        {weather && (
          <div className="weather-context-note">
            {t.diseaseWeatherNote(weather.temp, weather.condition)}
          </div>
        )}
      </form>

      {error && <div className="error-box">{error}</div>}
      <ResultCard result={result} onClear={() => setResult(null)} />
    </div>
  )
}