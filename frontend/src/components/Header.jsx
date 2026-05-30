import React from 'react'
import { useLang, LANGUAGES } from './LanguageContext.jsx'
import './Header.css'

export default function Header({ status }) {
  const { lang, setLang, t } = useLang()

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <span className="header-icon">🌾</span>
          <div>
            <div className="header-title">{t.appTitle}</div>
            <div className="header-sub">{t.appSub}</div>
          </div>
        </div>

        <div className="header-right">
          {/* Language Selector */}
          <div className="lang-selector-wrap">
            <span className="lang-selector-icon">🌐</span>
            <div className="lang-buttons">
              {LANGUAGES.map(l => (
                <button
                  key={l.code}
                  className={`lang-btn ${lang === l.code ? 'active' : ''}`}
                  onClick={() => setLang(l.code)}
                  title={l.label}
                >
                  {l.nativeLabel}
                </button>
              ))}
            </div>
          </div>

          {/* API Status */}
          <div className={`status-dot ${status === 'ok' ? 'online' : status === 'checking' ? 'checking' : 'offline'}`}>
            <span className="dot" />
            <span className="status-label">
              {status === 'ok' ? t.apiOnline : status === 'checking' ? t.apiChecking : t.apiOffline}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}