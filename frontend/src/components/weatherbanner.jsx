import React, { useState } from 'react'
import './WeatherBanner.css'

const WEATHER_API_KEY = 'YOUR_OPENWEATHERMAP_KEY_HERE'

const WEATHER_ICONS = {
  Clear: '☀️', Clouds: '⛅', Rain: '🌧️',
  Drizzle: '🌦️', Thunderstorm: '⛈️', Snow: '❄️',
  Mist: '🌫️', Fog: '🌫️', Haze: '🌫️',
}

export default function WeatherBanner({ weather, setWeather }) {
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const [denied,   setDenied]   = useState(false)

  async function fetchWeather(lat, lon) {
    // Use Open-Meteo (completely FREE, no API key needed)
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`
    const geoUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`

    const [weatherRes, geoRes] = await Promise.all([
      fetch(url),
      fetch(geoUrl, { headers: { 'Accept-Language': 'en' } })
    ])

    const weatherData = await weatherRes.json()
    const geoData     = await geoRes.json()

    const code = weatherData.current.weather_code
    const condition = getConditionFromCode(code)

    const location = geoData.address
      ? [geoData.address.village || geoData.address.town || geoData.address.city, geoData.address.state].filter(Boolean).join(', ')
      : `${lat.toFixed(2)}, ${lon.toFixed(2)}`

    return {
      temp:      Math.round(weatherData.current.temperature_2m),
      humidity:  weatherData.current.relative_humidity_2m,
      wind:      Math.round(weatherData.current.wind_speed_10m),
      condition: condition,
      icon:      WEATHER_ICONS[condition] || '🌤️',
      location:  location,
      lat, lon,
    }
  }

  function getConditionFromCode(code) {
    if (code === 0)               return 'Clear'
    if (code <= 3)                return 'Clouds'
    if (code <= 48)               return 'Fog'
    if (code <= 57)               return 'Drizzle'
    if (code <= 67)               return 'Rain'
    if (code <= 77)               return 'Snow'
    if (code <= 82)               return 'Rain'
    if (code <= 86)               return 'Snow'
    if (code <= 99)               return 'Thunderstorm'
    return 'Clear'
  }

  async function requestLocation() {
    if (!navigator.geolocation) {
      setError('Geolocation not supported by your browser.')
      return
    }
    setLoading(true)
    setError('')
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const data = await fetchWeather(pos.coords.latitude, pos.coords.longitude)
          setWeather(data)
        } catch (e) {
          setError('Could not fetch weather. Check internet connection.')
        } finally {
          setLoading(false)
        }
      },
      (err) => {
        setLoading(false)
        if (err.code === 1) {
          setDenied(true)
          setError('Location permission denied. Enable it in your browser settings.')
        } else {
          setError('Could not get your location. Try again.')
        }
      }
    )
  }

  function getFarmingTip(condition) {
    const tips = {
      'Rain':          '🌧️ Rain today — avoid spraying and harvesting',
      'Thunderstorm':  '⛈️ Storm alert — stay off field, secure equipment',
      'Clear':         '☀️ Clear day — good for spraying and field work',
      'Clouds':        '⛅ Cloudy — good for transplanting seedlings',
      'Drizzle':       '🌦️ Light rain — hold off on fertilizer application',
      'Fog':           '🌫️ Foggy — watch for fungal disease outbreak',
      'Snow':          '❄️ Frost risk — cover sensitive crops tonight',
    }
    return tips[condition] || '🌤️ Check field conditions before working'
  }

  if (denied) {
    return (
      <div className="weather-denied">
        📍 Location access denied. Enable in browser settings to get weather-based farming advice.
      </div>
    )
  }

  if (!weather) {
    return (
      <div className="weather-prompt">
        <span>📍 Allow location access for real-time weather-based farming advice</span>
        <button
          className="weather-btn"
          onClick={requestLocation}
          disabled={loading}
        >
          {loading ? '⏳ Getting location…' : '🌦️ Enable Weather'}
        </button>
        {error && <span className="weather-error">{error}</span>}
      </div>
    )
  }

  return (
    <div className="weather-banner">
      <div className="weather-left">
        <span className="weather-icon">{weather.icon}</span>
        <div className="weather-info">
          <span className="weather-temp">{weather.temp}°C</span>
          <span className="weather-condition">{weather.condition}</span>
          <span className="weather-loc">📍 {weather.location}</span>
        </div>
        <div className="weather-details">
          <span>💧 {weather.humidity}% humidity</span>
          <span>💨 {weather.wind} km/h</span>
        </div>
      </div>
      <div className="weather-tip">
        {getFarmingTip(weather.condition)}
      </div>
      <button className="weather-refresh" onClick={requestLocation} title="Refresh weather">
        🔄
      </button>
    </div>
  )
}