import React, { useState } from 'react'
import { askCropRecommend, askFertilizer, askScheme } from '../api.js'
import ResultCard from './ResultCard.jsx'
import { useLang } from './LanguageContext.jsx'
import './Panel.css'

// ── Crop Recommendation Panel ─────────────────────────────────────────────────
export function RecommendPanel({ weather }) {
  const { t } = useLang()
  const [soilType,  setSoilType]  = useState('')
  const [season,    setSeason]    = useState('')
  const [rainfall,  setRainfall]  = useState('')
  const [extraInfo, setExtraInfo] = useState('')
  const [language,  setLanguage]  = useState('')
  const [loading,   setLoading]   = useState(false)
  const [result,    setResult]    = useState(null)
  const [error,     setError]     = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true); setError(''); setResult(null)
    try {
      const data = await askCropRecommend(soilType, season, rainfall, extraInfo, language, weather)
      setResult(data)
    } catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  return (
    <div className="panel">
      <div className="panel-intro">
        <h2 className="panel-title">{t.recommendTitle}</h2>
        <p className="panel-desc">{t.recommendDesc}</p>
      </div>
      <form className="panel-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">{t.soilLabel}</label>
            <input className="form-input" placeholder={t.soilPlaceholder}
              value={soilType} onChange={e => setSoilType(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">{t.seasonLabel}</label>
            <input className="form-input" placeholder={t.seasonPlaceholder}
              value={season} onChange={e => setSeason(e.target.value)} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">{t.rainfallLabel}</label>
            <input className="form-input" placeholder={t.rainfallPlaceholder}
              value={rainfall} onChange={e => setRainfall(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">{t.answerLang}</label>
            <select className="form-select" value={language} onChange={e => setLanguage(e.target.value)}>
              <option value="">English</option>
              <option value="Hindi">हिंदी (Hindi)</option>
              <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
              <option value="Telugu">తెలుగు (Telugu)</option>
              <option value="Tamil">தமிழ் (Tamil)</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">{t.extraLabel}</label>
          <input className="form-input" placeholder={t.extraPlaceholder}
            value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />
        </div>

        <button type="submit" className="btn-primary" disabled={loading || !soilType || !season}>
          {loading ? <span className="spinner" /> : t.recommendBtn}
        </button>
      </form>
      {error && <div className="error-box">{error}</div>}
      <ResultCard result={result} onClear={() => setResult(null)} />
    </div>
  )
}


// ── Fertilizer Panel ──────────────────────────────────────────────────────────
export function FertilizerPanel() {
  const { t } = useLang()
  const [crop,     setCrop]     = useState('')
  const [stage,    setStage]    = useState('')
  const [soilCond, setSoilCond] = useState('')
  const [language, setLanguage] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [result,   setResult]   = useState(null)
  const [error,    setError]    = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true); setError(''); setResult(null)
    try {
      const data = await askFertilizer(crop, stage, soilCond, language)
      setResult(data)
    } catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  return (
    <div className="panel">
      <div className="panel-intro">
        <h2 className="panel-title">{t.fertilizerTitle}</h2>
        <p className="panel-desc">{t.fertilizerDesc}</p>
      </div>
      <form className="panel-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">{t.cropNameLabel}</label>
            <input className="form-input" placeholder={t.cropNamePlaceholder}
              value={crop} onChange={e => setCrop(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">{t.stageLabel}</label>
            <input className="form-input" placeholder={t.stagePlaceholder}
              value={stage} onChange={e => setStage(e.target.value)} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">{t.soilCondLabel}</label>
            <input className="form-input" placeholder={t.soilCondPlaceholder}
              value={soilCond} onChange={e => setSoilCond(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">{t.answerLang}</label>
            <select className="form-select" value={language} onChange={e => setLanguage(e.target.value)}>
              <option value="">English</option>
              <option value="Hindi">हिंदी (Hindi)</option>
              <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
              <option value="Telugu">తెలుగు (Telugu)</option>
              <option value="Tamil">தமிழ் (Tamil)</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={loading || !crop.trim()}>
          {loading ? <span className="spinner" /> : t.fertilizerBtn}
        </button>
      </form>
      {error && <div className="error-box">{error}</div>}
      <ResultCard result={result} onClear={() => setResult(null)} />
    </div>
  )
}


// ── Government Schemes Panel ──────────────────────────────────────────────────
export function SchemePanel() {
  const { t } = useLang()
  const [query,      setQuery]      = useState('')
  const [farmerType, setFarmerType] = useState('')
  const [language,   setLanguage]   = useState('')
  const [loading,    setLoading]    = useState(false)
  const [result,     setResult]     = useState(null)
  const [error,      setError]      = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true); setError(''); setResult(null)
    try {
      const data = await askScheme(query, farmerType, language)
      setResult(data)
    } catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  return (
    <div className="panel">
      <div className="panel-intro">
        <h2 className="panel-title">{t.schemeTitle}</h2>
        <p className="panel-desc">{t.schemeDesc}</p>
      </div>

      <div className="examples-row">
        {t.schemeExamples.map(ex => (
          <button key={ex} className="example-chip" onClick={() => setQuery(ex)}>{ex}</button>
        ))}
      </div>

      <form className="panel-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">{t.schemeQueryLabel}</label>
          <input className="form-input" placeholder={t.schemeQueryPlaceholder}
            value={query} onChange={e => setQuery(e.target.value)} required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">{t.farmerTypeLabel}</label>
            <input className="form-input" placeholder={t.farmerTypePlaceholder}
              value={farmerType} onChange={e => setFarmerType(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">{t.answerLang}</label>
            <select className="form-select" value={language} onChange={e => setLanguage(e.target.value)}>
              <option value="">English</option>
              <option value="Hindi">हिंदी (Hindi)</option>
              <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
              <option value="Telugu">తెలుగు (Telugu)</option>
              <option value="Tamil">தமிழ் (Tamil)</option>
            </select>
          </div>
          <button type="submit" className="btn-primary" disabled={loading || !query.trim()}>
            {loading ? <span className="spinner" /> : t.schemeBtn}
          </button>
        </div>
      </form>
      {error && <div className="error-box">{error}</div>}
      <ResultCard result={result} onClear={() => setResult(null)} />
    </div>
  )
}