"""
AI Farmer Assistant — FastAPI Application
==========================================
Run with:  uvicorn main:app --reload --port 8000
Docs at:   http://localhost:8000/docs
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers.farmer import router as farmer_router

app = FastAPI(
    title="🌾 AI Farmer Assistant",
    description="""
## AI Farmer Assistant API

An intelligent assistant for Indian farmers, powered by **LLaMA 3 on Groq** with **RAG** from an agriculture knowledge base.

### Features
- 🦠 **Crop Disease Identification** — describe symptoms, get disease name + treatment
- 🌱 **Crop Recommendation** — based on soil type, season, rainfall
- 🧪 **Fertilizer Advice** — NPK ratios, organic options, micronutrients
- 🏛️ **Government Schemes** — PM-KISAN, PMFBY, KCC, Soil Health Card
- 🌍 **Multilingual** — supports Hindi, Kannada, and other languages

### Authentication
Pass your **Groq API key** (free at [console.groq.com](https://console.groq.com)) in the header:
```
X-Groq-Api-Key:{os.getenv('GROQ_API_KEY')}
```
    """,
    version="1.0.0",
)

# CORS (allow all for development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(farmer_router)


@app.get("/", tags=["Root"])
def root():
    return {
        "message": "Welcome to the AI Farmer Assistant API 🌾",
        "docs": "/docs",
        "health": "/api/v1/health",
        "endpoints": {
            "general_question": "POST /api/v1/ask",
            "disease_identification": "POST /api/v1/disease",
            "crop_recommendation": "POST /api/v1/recommend-crop",
            "fertilizer_advice": "POST /api/v1/fertilizer",
            "government_schemes": "POST /api/v1/scheme",
            "kb_summary": "GET /api/v1/kb/summary",
        },
    }