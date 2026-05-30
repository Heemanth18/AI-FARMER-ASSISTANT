const BASE = import.meta.env.VITE_API_URL || 'https://ai-farmer-backend.onrender.com/api/v1'

// 🔑 Your Groq API key — only lives here, never shown on page
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY

function headers() {
  return {
    'Content-Type': 'application/json',
    'X-Groq-Api-Key': GROQ_API_KEY,
  }
}

async function post(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || `HTTP ${res.status}`)
  }
  return res.json()
}

// General — fully open, any question, optional weather
export async function askGeneral(question, language, weather = null) {
  return post('/ask', {
    question,
    language: language || null,
    weather:  weather  || null,
  })
}

// Disease — free text crop and symptoms
export async function askDisease(crop, symptoms, language, weather = null) {
  return post('/disease', {
    crop, symptoms,
    language: language || null,
    weather:  weather  || null,
  })
}

// Crop recommendation — free text everything + optional extra info
export async function askCropRecommend(soil_type, season, rainfall, additional_info, language, weather = null) {
  return post('/recommend-crop', {
    soil_type, season, rainfall,
    additional_info: additional_info || null,
    language:        language        || null,
    weather:         weather         || null,
  })
}

// Fertilizer — free text crop, optional stage and soil condition
export async function askFertilizer(crop, crop_stage, soil_condition, language) {
  return post('/fertilizer', {
    crop,
    crop_stage:      crop_stage      || null,
    soil_condition:  soil_condition  || null,
    language:        language        || null,
  })
}

// Schemes — free text query + optional farmer type
export async function askScheme(query, farmer_type, language) {
  return post('/scheme', {
    query,
    farmer_type: farmer_type || null,
    language:    language    || null,
  })
}

export async function getHealth() {
  const res = await fetch(`${BASE}/health`)
  return res.json()
}