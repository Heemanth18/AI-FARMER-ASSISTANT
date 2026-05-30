import React, { useState, useEffect } from 'react'
import { LanguageProvider, useLang } from './components/LanguageContext.jsx'
import Header from './components/Header.jsx'
import TabBar from './components/TabBar.jsx'
import AskPanel from './components/AskPanel.jsx'
import DiseasePanel from './components/DiseasePanel.jsx'
import WeatherBanner from './components/weatherbanner.jsx'
import { RecommendPanel, FertilizerPanel, SchemePanel } from './components/Panels.jsx'
import { getHealth } from './api.js'
import './App.css'

function AppInner() {
  const { t, lang, langMeta } = useLang()
  const [tab,     setTab]     = useState('ask')
  const [status,  setStatus]  = useState('checking')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    getHealth()
      .then(d => setStatus(d.status === 'ok' ? 'ok' : 'error'))
      .catch(() => setStatus('error'))
  }, [])

  // Apply font for the selected language to the whole app
  useEffect(() => {
    if (langMeta) {
      document.documentElement.style.setProperty('--font-active', langMeta.font)
      document.documentElement.setAttribute('lang', langMeta.code)
    }
  }, [langMeta])

  const panels = {
    ask:        <AskPanel weather={weather} />,
    disease:    <DiseasePanel weather={weather} />,
    recommend:  <RecommendPanel weather={weather} />,
    fertilizer: <FertilizerPanel />,
    scheme:     <SchemePanel />,
  }

  return (
    <div className="app">
      <Header status={status} />
      {/* WeatherBanner: always in English, not wrapped in language context text */}
      <WeatherBanner weather={weather} setWeather={setWeather} />
      <TabBar active={tab} setActive={setTab} />
      <main className="main-content">
        {panels[tab]}
      </main>
      <footer className="footer">
        <p>{t.footer}</p>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  )
}