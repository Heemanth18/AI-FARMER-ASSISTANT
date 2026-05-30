import React from 'react'
import { useLang } from './LanguageContext.jsx'
import './TabBar.css'

const TAB_ICONS = {
  ask:        '💬',
  disease:    '🌿',
  recommend:  '🌱',
  fertilizer: '🧪',
  scheme:     '🏛️',
}

export default function TabBar({ active, setActive }) {
  const { t } = useLang()

  const tabs = [
    { id: 'ask',        label: t.tabs.ask },
    { id: 'disease',    label: t.tabs.disease },
    { id: 'recommend',  label: t.tabs.recommend },
    { id: 'fertilizer', label: t.tabs.fertilizer },
    { id: 'scheme',     label: t.tabs.scheme },
  ]

  return (
    <nav className="tabbar">
      <div className="tabbar-inner">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${active === tab.id ? 'active' : ''}`}
            onClick={() => setActive(tab.id)}
          >
            <span className="tab-icon">{TAB_ICONS[tab.id]}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}