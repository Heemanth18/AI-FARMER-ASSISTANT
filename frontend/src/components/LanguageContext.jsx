import React, { createContext, useContext, useState } from 'react'

export const LANGUAGES = [
  { code: 'en', label: 'English',  nativeLabel: 'English',  font: "'DM Sans', sans-serif",        dir: 'ltr' },
  { code: 'kn', label: 'Kannada',  nativeLabel: 'ಕನ್ನಡ',    font: "'Noto Sans Kannada', sans-serif", dir: 'ltr' },
  { code: 'te', label: 'Telugu',   nativeLabel: 'తెలుగు',   font: "'Noto Sans Telugu', sans-serif",  dir: 'ltr' },
  { code: 'ta', label: 'Tamil',    nativeLabel: 'தமிழ்',    font: "'Noto Sans Tamil', sans-serif",   dir: 'ltr' },
]

export const T = {
  en: {
    // Header
    appTitle: 'AI Farmer Assistant',
    appSub: 'Powered by LLaMA 3 · RAG · FastAPI',
    apiOnline: 'API Online',
    apiChecking: 'Checking…',
    apiOffline: 'API Offline',

    // TabBar
    tabs: {
      ask:        'Ask Anything',
      disease:    'Crop Disease',
      recommend:  'Crop Advice',
      fertilizer: 'Fertilizer',
      scheme:     'Govt Schemes',
    },

    // AskPanel
    askTitle: 'Ask Anything',
    askDesc: 'Ask any farming question — any crop, any soil, any problem. Type in English, Hindi, Kannada, Telugu or any language.',
    askLabel: 'Your Question (any language, any crop)',
    askPlaceholder: "Type anything… e.g. 'My tomato leaves are curling and turning brown' or 'ನನ್ನ ಟೊಮೆಟೊ ಎಲೆಗಳು ಹಳದಿ ಆಗುತ್ತಿವೆ'",
    askLangLabel: 'Answer Language (optional)',
    askBtn: '🌾 Ask Assistant',
    askWeatherNote: (temp, cond) => `🌦️ Weather at your location (${temp}°C, ${cond}) will be included in the answer.`,
    examples: [
      'My brinjal leaves have holes and are turning yellow',
      'Which crop grows well in red soil in Karnataka during June?',
      'How much DAP fertilizer for 1 acre of sunflower?',
      'What government help is available for small farmers?',
      'My papaya tree has white powder on leaves',
      'Best crop for 1 acre farm near Mysore with drip irrigation',
    ],

    // DiseasePanel
    diseaseTitle: 'Crop Disease Identification',
    diseaseDesc: "Describe your crop's problem in your own words. Works for any plant — vegetables, fruits, flowers, trees, field crops.",
    cropLabel: 'Crop / Plant Name',
    cropPlaceholder: 'Any plant — Tomato, Brinjal, Mango, Rose, Coconut, Paddy, Turmeric…',
    symptomsLabel: 'Describe the Problem',
    symptomsPlaceholder: "Describe what you see… e.g. 'Leaves are turning yellow with brown spots, plant is wilting in the afternoon, some leaves have white powder on them'",
    diseaseBtn: '🦠 Identify & Treat',
    diseaseWeatherNote: (temp, cond) => `🌦️ Current weather (${temp}°C, ${cond}) will be considered in advice.`,

    // RecommendPanel
    recommendTitle: 'Crop Recommendation',
    recommendDesc: 'Describe your soil and conditions — get the best crops for your farm. You can type any soil type, any season, any details.',
    soilLabel: 'Soil Type',
    soilPlaceholder: 'e.g. Black cotton, Red laterite, Sandy, Loamy, Clay…',
    seasonLabel: 'Season / Month',
    seasonPlaceholder: 'e.g. Kharif, Rabi, June, Winter, Summer…',
    rainfallLabel: 'Rainfall / Water Availability',
    rainfallPlaceholder: 'e.g. Low rainfall, Drip irrigation, Heavy monsoon, Borewell…',
    extraLabel: 'Any other details? (optional)',
    extraPlaceholder: 'e.g. Near Dharwad, 2 acres land, have borewell, want vegetables…',
    recommendBtn: '🌱 Get Recommendations',

    // FertilizerPanel
    fertilizerTitle: 'Fertilizer Advice',
    fertilizerDesc: 'Get NPK ratios, organic options, and micronutrient tips. Works for any crop — paddy, vegetables, fruits, flowers, anything.',
    cropNameLabel: 'Crop Name',
    cropNamePlaceholder: 'Any crop — Rice, Tomato, Papaya, Rose, Turmeric…',
    stageLabel: 'Crop Stage (optional)',
    stagePlaceholder: 'e.g. Seedling, Flowering, Fruiting, 30 days old…',
    soilCondLabel: 'Soil Condition (optional)',
    soilCondPlaceholder: 'e.g. Black soil, deficient in zinc, low pH, saline…',
    fertilizerBtn: '🧪 Get Fertilizer Advice',

    // SchemePanel
    schemeTitle: 'Government Schemes',
    schemeDesc: 'Find all relevant schemes — PM-KISAN, PMFBY, KCC, PMKSY, e-NAM, PKVY and more. Tell us what you need help with.',
    schemeQueryLabel: 'What do you need help with?',
    schemeQueryPlaceholder: 'e.g. crop loss due to flood, need money for seeds, want insurance, free training…',
    farmerTypeLabel: 'Farmer Type (optional)',
    farmerTypePlaceholder: 'e.g. Small farmer, 2 acres, marginal, organic, sharecropper…',
    schemeBtn: '🏛️ Find Schemes',
    schemeExamples: [
      'crop insurance for small farmers',
      'loan for buying tractor',
      'free soil testing',
      'pension after retirement',
      'subsidy for drip irrigation',
      'income support scheme',
      'organic farming help',
      'market price for my crops',
    ],

    // Common
    answerLang: 'Answer Language',
    autoDetect: 'Auto-detect from question',
    autoDetectShort: 'Auto-detect',
    loading: 'Loading…',
    clear: 'Clear',
    showContext: 'Show KB context',
    hideContext: 'Hide KB context',
    aiResponse: 'AI Response',

    // Footer
    footer: 'AI Farmer Assistant · REVA University MLOps Project · 2026',

    // Language selector
    selectLang: 'Language',
  },

  kn: {
    appTitle: 'AI ರೈತ ಸಹಾಯಕ',
    appSub: 'LLaMA 3 · RAG · FastAPI ಬಳಸಿ ನಿರ್ಮಿಸಲಾಗಿದೆ',
    apiOnline: 'API ಆನ್‌ಲೈನ್',
    apiChecking: 'ಪರಿಶೀಲಿಸುತ್ತಿದೆ…',
    apiOffline: 'API ಆಫ್‌ಲೈನ್',

    tabs: {
      ask:        'ಏನಾದರೂ ಕೇಳಿ',
      disease:    'ಬೆಳೆ ರೋಗ',
      recommend:  'ಬೆಳೆ ಸಲಹೆ',
      fertilizer: 'ಗೊಬ್ಬರ',
      scheme:     'ಸರ್ಕಾರಿ ಯೋಜನೆ',
    },

    askTitle: 'ಏನಾದರೂ ಕೇಳಿ',
    askDesc: 'ಯಾವುದೇ ಕೃಷಿ ಪ್ರಶ್ನೆ ಕೇಳಿ — ಯಾವ ಬೆಳೆ, ಯಾವ ಮಣ್ಣು, ಯಾವ ಸಮಸ್ಯೆಯಾದರೂ. ಕನ್ನಡ, ಹಿಂದಿ, ತೆಲುಗು ಅಥವಾ ಯಾವ ಭಾಷೆಯಲ್ಲಾದರೂ ಟೈಪ್ ಮಾಡಿ.',
    askLabel: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆ (ಯಾವ ಭಾಷೆ, ಯಾವ ಬೆಳೆ)',
    askPlaceholder: "ಏನಾದರೂ ಟೈಪ್ ಮಾಡಿ… ಉದಾ: 'ನನ್ನ ಟೊಮೆಟೊ ಎಲೆಗಳು ಹಳದಿ ಆಗುತ್ತಿವೆ'",
    askLangLabel: 'ಉತ್ತರ ಭಾಷೆ (ಐಚ್ಛಿಕ)',
    askBtn: '🌾 ಸಹಾಯಕನನ್ನು ಕೇಳಿ',
    askWeatherNote: (temp, cond) => `🌦️ ನಿಮ್ಮ ಸ್ಥಳದ ಹವಾಮಾನ (${temp}°C, ${cond}) ಉತ್ತರದಲ್ಲಿ ಸೇರಿಸಲಾಗುತ್ತದೆ.`,
    examples: [
      'ನನ್ನ ಬದನೆ ಎಲೆಗಳಲ್ಲಿ ರಂಧ್ರಗಳಿವೆ ಮತ್ತು ಹಳದಿ ಆಗುತ್ತಿದೆ',
      'ಜೂನ್ ತಿಂಗಳಲ್ಲಿ ಕರ್ನಾಟಕದ ಕೆಂಪು ಮಣ್ಣಿನಲ್ಲಿ ಯಾವ ಬೆಳೆ ಚೆನ್ನಾಗಿ ಬೆಳೆಯುತ್ತದೆ?',
      '1 ಎಕರೆ ಸೂರ್ಯಕಾಂತಿಗೆ ಎಷ್ಟು DAP ಗೊಬ್ಬರ ಬೇಕು?',
      'ಸಣ್ಣ ರೈತರಿಗೆ ಯಾವ ಸರ್ಕಾರಿ ಸಹಾಯ ಸಿಗುತ್ತದೆ?',
      'ನನ್ನ ಪಪ್ಪಾಯಿ ಮರದ ಎಲೆಗಳಲ್ಲಿ ಬಿಳಿ ಪುಡಿ ಇದೆ',
      'ಮೈಸೂರು ಬಳಿ 1 ಎಕರೆ ಹೊಲದಲ್ಲಿ ಹನಿ ನೀರಾವರಿಯಲ್ಲಿ ಉತ್ತಮ ಬೆಳೆ',
    ],

    diseaseTitle: 'ಬೆಳೆ ರೋಗ ಗುರುತಿಸುವಿಕೆ',
    diseaseDesc: 'ನಿಮ್ಮ ಬೆಳೆಯ ಸಮಸ್ಯೆಯನ್ನು ನಿಮ್ಮ ಮಾತಿನಲ್ಲಿ ಹೇಳಿ. ತರಕಾರಿ, ಹಣ್ಣು, ಹೂವು, ಮರ, ಗದ್ದೆ ಬೆಳೆ — ಎಲ್ಲದಕ್ಕೂ ಕೆಲಸ ಮಾಡುತ್ತದೆ.',
    cropLabel: 'ಬೆಳೆ / ಗಿಡದ ಹೆಸರು',
    cropPlaceholder: 'ಯಾವ ಗಿಡವಾದರೂ — ಟೊಮೆಟೊ, ಬದನೆ, ಮಾವು, ಗುಲಾಬಿ, ತೆಂಗು, ಭತ್ತ, ಅರಿಶಿನ…',
    symptomsLabel: 'ಸಮಸ್ಯೆ ವಿವರಿಸಿ',
    symptomsPlaceholder: "ನೀವು ನೋಡಿದ್ದನ್ನು ಹೇಳಿ… ಉದಾ: 'ಎಲೆಗಳು ಹಳದಿ ಆಗಿ ಕಂದು ಚುಕ್ಕೆ ಬರುತ್ತಿದೆ, ಮಧ್ಯಾಹ್ನ ಗಿಡ ಬಾಡುತ್ತದೆ'",
    diseaseBtn: '🦠 ರೋಗ ಗುರುತಿಸಿ ಮತ್ತು ಚಿಕಿತ್ಸೆ',
    diseaseWeatherNote: (temp, cond) => `🌦️ ಪ್ರಸ್ತುತ ಹವಾಮಾನ (${temp}°C, ${cond}) ಸಲಹೆಯಲ್ಲಿ ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ.`,

    recommendTitle: 'ಬೆಳೆ ಶಿಫಾರಸು',
    recommendDesc: 'ನಿಮ್ಮ ಮಣ್ಣು ಮತ್ತು ಪರಿಸ್ಥಿತಿ ಹೇಳಿ — ನಿಮ್ಮ ಹೊಲಕ್ಕೆ ಉತ್ತಮ ಬೆಳೆ ತಿಳಿಯಿರಿ.',
    soilLabel: 'ಮಣ್ಣಿನ ವಿಧ',
    soilPlaceholder: 'ಉದಾ: ಕಪ್ಪು ಹತ್ತಿ ಮಣ್ಣು, ಕೆಂಪು ಮಣ್ಣು, ಮರಳು, ಲೋಮಿ, ಜೇಡಿ…',
    seasonLabel: 'ಋತು / ತಿಂಗಳು',
    seasonPlaceholder: 'ಉದಾ: ಖಾರಿಫ್, ರಬಿ, ಜೂನ್, ಚಳಿಗಾಲ, ಬೇಸಿಗೆ…',
    rainfallLabel: 'ಮಳೆ / ನೀರಿನ ಲಭ್ಯತೆ',
    rainfallPlaceholder: 'ಉದಾ: ಕಡಿಮೆ ಮಳೆ, ಹನಿ ನೀರಾವರಿ, ಭಾರೀ ಮಳೆ, ಕೊಳವೆ ಬಾವಿ…',
    extraLabel: 'ಬೇರೆ ಯಾವುದಾದರೂ ವಿಷಯ? (ಐಚ್ಛಿಕ)',
    extraPlaceholder: 'ಉದಾ: ಧಾರವಾಡ ಹತ್ತಿರ, 2 ಎಕರೆ ಭೂಮಿ, ಕೊಳವೆ ಬಾವಿ ಇದೆ, ತರಕಾರಿ ಬೇಕು…',
    recommendBtn: '🌱 ಶಿಫಾರಸು ತೋರಿಸಿ',

    fertilizerTitle: 'ಗೊಬ್ಬರ ಸಲಹೆ',
    fertilizerDesc: 'NPK ಅನುಪಾತ, ಸಾವಯವ ಆಯ್ಕೆಗಳು ಮತ್ತು ಸೂಕ್ಷ್ಮ ಪೋಷಕಾಂಶ ಸಲಹೆ. ಭತ್ತ, ತರಕಾರಿ, ಹಣ್ಣು, ಹೂವು — ಎಲ್ಲ ಬೆಳೆಗೂ.',
    cropNameLabel: 'ಬೆಳೆ ಹೆಸರು',
    cropNamePlaceholder: 'ಯಾವ ಬೆಳೆಯಾದರೂ — ಭತ್ತ, ಟೊಮೆಟೊ, ಪಪ್ಪಾಯಿ, ಗುಲಾಬಿ, ಅರಿಶಿನ…',
    stageLabel: 'ಬೆಳೆ ಹಂತ (ಐಚ್ಛಿಕ)',
    stagePlaceholder: 'ಉದಾ: ಸಸಿ, ಹೂಬಿಡುವಿಕೆ, ಹಣ್ಣಾಗುವಿಕೆ, 30 ದಿನ ಹಳೆಯದು…',
    soilCondLabel: 'ಮಣ್ಣಿನ ಸ್ಥಿತಿ (ಐಚ್ಛಿಕ)',
    soilCondPlaceholder: 'ಉದಾ: ಕಪ್ಪು ಮಣ್ಣು, ಸತು ಕೊರತೆ, ಕಡಿಮೆ pH, ಲವಣ…',
    fertilizerBtn: '🧪 ಗೊಬ್ಬರ ಸಲಹೆ ತೋರಿಸಿ',

    schemeTitle: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು',
    schemeDesc: 'PM-KISAN, PMFBY, KCC, PMKSY, e-NAM, PKVY ಮತ್ತು ಇತರ ಎಲ್ಲ ಯೋಜನೆಗಳು. ನಿಮಗೆ ಯಾವ ಸಹಾಯ ಬೇಕು ಹೇಳಿ.',
    schemeQueryLabel: 'ನಿಮಗೆ ಏನು ಸಹಾಯ ಬೇಕು?',
    schemeQueryPlaceholder: 'ಉದಾ: ಪ್ರವಾಹದಿಂದ ಬೆಳೆ ನಷ್ಟ, ಬೀಜಕ್ಕೆ ಹಣ ಬೇಕು, ವಿಮೆ ಬೇಕು, ಉಚಿತ ತರಬೇತಿ…',
    farmerTypeLabel: 'ರೈತ ವಿಧ (ಐಚ್ಛಿಕ)',
    farmerTypePlaceholder: 'ಉದಾ: ಸಣ್ಣ ರೈತ, 2 ಎಕರೆ, ಅಂಚಿನ ರೈತ, ಸಾವಯವ, ಗೇಣಿ ರೈತ…',
    schemeBtn: '🏛️ ಯೋಜನೆ ಹುಡುಕಿ',
    schemeExamples: [
      'ಸಣ್ಣ ರೈತರಿಗೆ ಬೆಳೆ ವಿಮೆ',
      'ಟ್ರ್ಯಾಕ್ಟರ್ ಖರೀದಿಗೆ ಸಾಲ',
      'ಉಚಿತ ಮಣ್ಣು ಪರೀಕ್ಷೆ',
      'ನಿವೃತ್ತಿ ನಂತರ ಪಿಂಚಣಿ',
      'ಹನಿ ನೀರಾವರಿಗೆ ಸಬ್ಸಿಡಿ',
      'ಆದಾಯ ಬೆಂಬಲ ಯೋಜನೆ',
      'ಸಾವಯವ ಕೃಷಿ ಸಹಾಯ',
      'ನನ್ನ ಬೆಳೆಗೆ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ',
    ],

    answerLang: 'ಉತ್ತರ ಭಾಷೆ',
    autoDetect: 'ಪ್ರಶ್ನೆಯಿಂದ ಸ್ವಯಂ ಗುರುತಿಸಿ',
    autoDetectShort: 'ಸ್ವಯಂ ಗುರುತಿಸಿ',
    loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ…',
    clear: 'ತೆರವುಗೊಳಿಸಿ',
    showContext: 'ಸಂದರ್ಭ ತೋರಿಸಿ',
    hideContext: 'ಸಂದರ್ಭ ಮರೆಮಾಡಿ',
    aiResponse: 'AI ಉತ್ತರ',
    footer: 'AI ರೈತ ಸಹಾಯಕ · REVA ವಿಶ್ವವಿದ್ಯಾಲಯ MLOps ಯೋಜನೆ · 2026',
    selectLang: 'ಭಾಷೆ',
  },

  te: {
    appTitle: 'AI రైతు సహాయకుడు',
    appSub: 'LLaMA 3 · RAG · FastAPI తో నిర్మించబడింది',
    apiOnline: 'API ఆన్‌లైన్',
    apiChecking: 'తనిఖీ చేస్తోంది…',
    apiOffline: 'API ఆఫ్‌లైన్',

    tabs: {
      ask:        'ఏదైనా అడగండి',
      disease:    'పంట వ్యాధి',
      recommend:  'పంట సలహా',
      fertilizer: 'ఎరువు',
      scheme:     'ప్రభుత్వ పథకాలు',
    },

    askTitle: 'ఏదైనా అడగండి',
    askDesc: 'ఏదైనా వ్యవసాయ ప్రశ్న అడగండి — ఏ పంట, ఏ మట్టి, ఏ సమస్య అయినా. తెలుగు, హిందీ, కన్నడ లేదా ఏ భాషలో అయినా టైప్ చేయండి.',
    askLabel: 'మీ ప్రశ్న (ఏ భాష, ఏ పంట)',
    askPlaceholder: "ఏదైనా టైప్ చేయండి… ఉదా: 'నా టమాటా ఆకులు పసుపు రంగులోకి మారుతున్నాయి'",
    askLangLabel: 'సమాధానం భాష (ఐచ్ఛికం)',
    askBtn: '🌾 సహాయకుడిని అడగండి',
    askWeatherNote: (temp, cond) => `🌦️ మీ స్థానంలో వాతావరణం (${temp}°C, ${cond}) సమాధానంలో చేర్చబడుతుంది.`,
    examples: [
      'నా వంకాయ ఆకులకు రంధ్రాలు పడి పసుపు రంగులోకి మారుతున్నాయి',
      'జూన్‌లో కర్ణాటకలో ఎర్ర మట్టిలో ఏ పంట బాగా పెరుగుతుంది?',
      '1 ఎకరా పొద్దుతిరుగుడుకు ఎంత DAP ఎరువు కావాలి?',
      'చిన్న రైతులకు ప్రభుత్వ సహాయం ఏమిటి?',
      'నా బొప్పాయి చెట్టు ఆకులపై తెల్లటి పొడి ఉంది',
      'మైసూరు దగ్గర 1 ఎకరా తోటలో డ్రిప్ సేద్యంలో మంచి పంట',
    ],

    diseaseTitle: 'పంట వ్యాధి గుర్తింపు',
    diseaseDesc: 'మీ పంట సమస్యను మీ మాటల్లో వివరించండి. కూరగాయలు, పండ్లు, పువ్వులు, చెట్లు, పొలం పంటలు — అన్నిటికీ పని చేస్తుంది.',
    cropLabel: 'పంట / మొక్క పేరు',
    cropPlaceholder: 'ఏ మొక్క అయినా — టమాటా, వంకాయ, మామిడి, గులాబీ, కొబ్బరి, వరి, పసుపు…',
    symptomsLabel: 'సమస్య వివరించండి',
    symptomsPlaceholder: "మీరు చూసింది చెప్పండి… ఉదా: 'ఆకులు పసుపు రంగులోకి మారి గోధుమ మచ్చలు వస్తున్నాయి'",
    diseaseBtn: '🦠 వ్యాధి గుర్తించి చికిత్స',
    diseaseWeatherNote: (temp, cond) => `🌦️ ప్రస్తుత వాతావరణం (${temp}°C, ${cond}) సలహాలో పరిగణించబడుతుంది.`,

    recommendTitle: 'పంట సిఫార్సు',
    recommendDesc: 'మీ మట్టి మరియు పరిస్థితులు చెప్పండి — మీ పొలానికి అత్యుత్తమ పంటలు తెలుసుకోండి.',
    soilLabel: 'మట్టి రకం',
    soilPlaceholder: 'ఉదా: నల్ల పత్తి మట్టి, ఎర్ర మట్టి, ఇసుక, లోమీ, బంక మట్టి…',
    seasonLabel: 'సీజన్ / నెల',
    seasonPlaceholder: 'ఉదా: ఖరీఫ్, రబీ, జూన్, శీతాకాలం, వేసవి…',
    rainfallLabel: 'వర్షపాతం / నీటి లభ్యత',
    rainfallPlaceholder: 'ఉదా: తక్కువ వర్షం, డ్రిప్ సేద్యం, భారీ వర్షాలు, బోర్‌వెల్…',
    extraLabel: 'మరేదైనా వివరాలు? (ఐచ్ఛికం)',
    extraPlaceholder: 'ఉదా: ధార్వాడ్ దగ్గర, 2 ఎకరాలు, బోర్‌వెల్ ఉంది, కూరగాయలు కావాలి…',
    recommendBtn: '🌱 సిఫార్సులు చూపించు',

    fertilizerTitle: 'ఎరువు సలహా',
    fertilizerDesc: 'NPK నిష్పత్తులు, సేంద్రీయ ఎంపికలు మరియు సూక్ష్మ పోషక సలహాలు. వరి, కూరగాయలు, పండ్లు — అన్నిటికీ.',
    cropNameLabel: 'పంట పేరు',
    cropNamePlaceholder: 'ఏ పంట అయినా — వరి, టమాటా, బొప్పాయి, గులాబీ, పసుపు…',
    stageLabel: 'పంట దశ (ఐచ్ఛికం)',
    stagePlaceholder: 'ఉదా: మొక్క దశ, పూత దశ, కాయ దశ, 30 రోజుల వయసు…',
    soilCondLabel: 'మట్టి స్థితి (ఐచ్ఛికం)',
    soilCondPlaceholder: 'ఉదా: నల్ల మట్టి, జింక్ లోపం, తక్కువ pH, లవణీయత…',
    fertilizerBtn: '🧪 ఎరువు సలహా చూపించు',

    schemeTitle: 'ప్రభుత్వ పథకాలు',
    schemeDesc: 'PM-KISAN, PMFBY, KCC, PMKSY, e-NAM, PKVY మరియు మరిన్ని పథకాలు. మీకు ఏ సహాయం కావాలో చెప్పండి.',
    schemeQueryLabel: 'మీకు ఏ సహాయం కావాలి?',
    schemeQueryPlaceholder: 'ఉదా: వరద వల్ల పంట నష్టం, విత్తనాలకు డబ్బు కావాలి, బీమా కావాలి…',
    farmerTypeLabel: 'రైతు రకం (ఐచ్ఛికం)',
    farmerTypePlaceholder: 'ఉదా: చిన్న రైతు, 2 ఎకరాలు, సన్నకారు, సేంద్రీయ, కౌలు రైతు…',
    schemeBtn: '🏛️ పథకాలు వెతకండి',
    schemeExamples: [
      'చిన్న రైతులకు పంట బీమా',
      'ట్రాక్టర్ కొనుగోలుకు రుణం',
      'ఉచిత మట్టి పరీక్ష',
      'పదవీ విరమణ తర్వాత పెన్షన్',
      'డ్రిప్ సేద్యానికి సబ్సిడీ',
      'ఆదాయ మద్దతు పథకం',
      'సేంద్రీయ వ్యవసాయ సహాయం',
      'నా పంటకు మార్కెట్ ధర',
    ],

    answerLang: 'సమాధానం భాష',
    autoDetect: 'ప్రశ్న నుండి స్వయంచాలకంగా గుర్తించు',
    autoDetectShort: 'స్వయంచాలకంగా',
    loading: 'లోడ్ అవుతోంది…',
    clear: 'తొలగించు',
    showContext: 'సందర్భం చూపించు',
    hideContext: 'సందర్భం దాచు',
    aiResponse: 'AI సమాధానం',
    footer: 'AI రైతు సహాయకుడు · REVA విశ్వవిద్యాలయం MLOps ప్రాజెక్ట్ · 2026',
    selectLang: 'భాష',
  },

  ta: {
    appTitle: 'AI விவசாயி உதவியாளர்',
    appSub: 'LLaMA 3 · RAG · FastAPI மூலம் உருவாக்கப்பட்டது',
    apiOnline: 'API இணையத்தில் உள்ளது',
    apiChecking: 'சரிபார்க்கிறது…',
    apiOffline: 'API இணையத்தில் இல்லை',

    tabs: {
      ask:        'எதையும் கேளுங்கள்',
      disease:    'பயிர் நோய்',
      recommend:  'பயிர் ஆலோசனை',
      fertilizer: 'உரம்',
      scheme:     'அரசு திட்டங்கள்',
    },

    askTitle: 'எதையும் கேளுங்கள்',
    askDesc: 'எந்த வேளாண் கேள்வியையும் கேளுங்கள் — எந்த பயிர், எந்த மண், எந்த பிரச்சனையாயினும். தமிழ், இந்தி, கன்னடம் அல்லது எந்த மொழியிலும் தட்டச்சு செய்யுங்கள்.',
    askLabel: 'உங்கள் கேள்வி (எந்த மொழி, எந்த பயிர்)',
    askPlaceholder: "எதையும் தட்டச்சு செய்யுங்கள்… எ.கா: 'என் தக்காளி இலைகள் மஞ்சள் நிறமாகிறது'",
    askLangLabel: 'பதில் மொழி (விருப்பமான)',
    askBtn: '🌾 உதவியாளரிடம் கேளுங்கள்',
    askWeatherNote: (temp, cond) => `🌦️ உங்கள் இடத்தின் வானிலை (${temp}°C, ${cond}) பதிலில் சேர்க்கப்படும்.`,
    examples: [
      'என் கத்திரிக்காய் இலைகளில் துளைகள் உள்ளன மற்றும் மஞ்சளாகிறது',
      'ஜூன் மாதம் கர்நாடகாவில் சிவப்பு மண்ணில் என்ன பயிர் நன்றாக வளரும்?',
      '1 ஏக்கர் சூரியகாந்திக்கு எவ்வளவு DAP உரம் தேவை?',
      'சிறு விவசாயிகளுக்கு அரசு உதவி என்ன?',
      'என் பப்பாளி மரத்தின் இலைகளில் வெள்ளை தூள் உள்ளது',
      'மைசூர் அருகே 1 ஏக்கர் நிலத்தில் சொட்டு நீர்ப்பாசனத்தில் சிறந்த பயிர்',
    ],

    diseaseTitle: 'பயிர் நோய் கண்டறிதல்',
    diseaseDesc: 'உங்கள் பயிரின் பிரச்சனையை உங்கள் வார்த்தைகளில் விவரிக்கவும். காய்கறிகள், பழங்கள், பூக்கள், மரங்கள், வயல் பயிர்கள் — அனைத்துக்கும் வேலை செய்கிறது.',
    cropLabel: 'பயிர் / தாவரத்தின் பெயர்',
    cropPlaceholder: 'எந்த தாவரமும் — தக்காளி, கத்திரிக்காய், மாவு, ரோஜா, தென்னை, நெல், மஞ்சள்…',
    symptomsLabel: 'பிரச்சனையை விவரிக்கவும்',
    symptomsPlaceholder: "நீங்கள் பார்த்ததை சொல்லுங்கள்… எ.கா: 'இலைகள் மஞ்சளாகி பழுப்பு புள்ளிகள் வருகின்றன'",
    diseaseBtn: '🦠 நோயை கண்டறிந்து சிகிச்சை',
    diseaseWeatherNote: (temp, cond) => `🌦️ தற்போதைய வானிலை (${temp}°C, ${cond}) ஆலோசனையில் கருதப்படும்.`,

    recommendTitle: 'பயிர் பரிந்துரை',
    recommendDesc: 'உங்கள் மண் மற்றும் நிலைமைகளை சொல்லுங்கள் — உங்கள் நிலத்திற்கு சிறந்த பயிர்களை அறியுங்கள்.',
    soilLabel: 'மண் வகை',
    soilPlaceholder: 'எ.கா: கருப்பு பருத்தி மண், சிவப்பு மண், மணல், களிமண், சேறு…',
    seasonLabel: 'பருவம் / மாதம்',
    seasonPlaceholder: 'எ.கா: காரீஃப், ரபி, ஜூன், குளிர்காலம், கோடை…',
    rainfallLabel: 'மழை / நீர் கிடைக்கும் தன்மை',
    rainfallPlaceholder: 'எ.கா: குறைந்த மழை, சொட்டு நீர்ப்பாசனம், கனமழை, போர்வெல்…',
    extraLabel: 'வேறு ஏதாவது விவரங்கள்? (விருப்பமான)',
    extraPlaceholder: 'எ.கா: தார்வாட் அருகே, 2 ஏக்கர் நிலம், போர்வெல் உள்ளது, காய்கறிகள் வேண்டும்…',
    recommendBtn: '🌱 பரிந்துரைகளை காட்டு',

    fertilizerTitle: 'உர ஆலோசனை',
    fertilizerDesc: 'NPK விகிதங்கள், கரிம விருப்பங்கள் மற்றும் நுண்ணூட்ட உதவிக்குறிப்புகள். நெல், காய்கறிகள், பழங்கள் — அனைத்துக்கும்.',
    cropNameLabel: 'பயிர் பெயர்',
    cropNamePlaceholder: 'எந்த பயிரும் — நெல், தக்காளி, பப்பாளி, ரோஜா, மஞ்சள்…',
    stageLabel: 'பயிர் நிலை (விருப்பமான)',
    stagePlaceholder: 'எ.கா: நாற்று நிலை, பூக்கும் நிலை, காய் நிலை, 30 நாள் வயதானது…',
    soilCondLabel: 'மண் நிலை (விருப்பமான)',
    soilCondPlaceholder: 'எ.கா: கருப்பு மண், துத்தநாக குறைபாடு, குறைந்த pH, உப்புத்தன்மை…',
    fertilizerBtn: '🧪 உர ஆலோசனை காட்டு',

    schemeTitle: 'அரசு திட்டங்கள்',
    schemeDesc: 'PM-KISAN, PMFBY, KCC, PMKSY, e-NAM, PKVY மற்றும் பல திட்டங்கள். உங்களுக்கு என்ன உதவி வேண்டும் என்று சொல்லுங்கள்.',
    schemeQueryLabel: 'உங்களுக்கு என்ன உதவி வேண்டும்?',
    schemeQueryPlaceholder: 'எ.கா: வெள்ளத்தால் பயிர் இழப்பு, விதைக்கு பணம் வேண்டும், காப்பீடு வேண்டும்…',
    farmerTypeLabel: 'விவசாயி வகை (விருப்பமான)',
    farmerTypePlaceholder: 'எ.கா: சிறு விவசாயி, 2 ஏக்கர், குறு விவசாயி, கரிம, குத்தகை விவசாயி…',
    schemeBtn: '🏛️ திட்டங்களை தேடுங்கள்',
    schemeExamples: [
      'சிறு விவசாயிகளுக்கு பயிர் காப்பீடு',
      'டிராக்டர் வாங்க கடன்',
      'இலவச மண் பரிசோதனை',
      'ஓய்வுக்குப் பிறகு ஓய்வூதியம்',
      'சொட்டு நீர்ப்பாசனத்திற்கு மானியம்',
      'வருமான ஆதரவு திட்டம்',
      'கரிம விவசாய உதவி',
      'என் பயிருக்கு சந்தை விலை',
    ],

    answerLang: 'பதில் மொழி',
    autoDetect: 'கேள்வியிலிருந்து தானாக கண்டறி',
    autoDetectShort: 'தானாக கண்டறி',
    loading: 'ஏற்றுகிறது…',
    clear: 'அழி',
    showContext: 'சூழலை காட்டு',
    hideContext: 'சூழலை மறை',
    aiResponse: 'AI பதில்',
    footer: 'AI விவசாயி உதவியாளர் · REVA பல்கலைக்கழகம் MLOps திட்டம் · 2026',
    selectLang: 'மொழி',
  },
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  const t = T[lang]
  const langMeta = LANGUAGES.find(l => l.code === lang)
  return (
    <LanguageContext.Provider value={{ lang, setLang, t, langMeta }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}