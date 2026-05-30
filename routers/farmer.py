"""
routers/farmer.py — Improved API routes
- All inputs are free text (no fixed dropdowns enforced server-side)
- Weather data passed to LLM when provided
- Open-ended: works for any crop, soil, situation
"""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from collections import Counter

from utils.rag import retrieve, KNOWLEDGE_BASE
from utils.groq_client import ask_groq

router = APIRouter(prefix="/api/v1", tags=["Farmer Assistant"])


# ── Models ─────────────────────────────────────────────────────────────────────

class QueryRequest(BaseModel):
    question: str
    language: Optional[str] = None
    weather: Optional[dict] = None          # {temp, condition, humidity, wind, location}

class QueryResponse(BaseModel):
    question: str
    answer: str
    context_used: str
    model: str = "llama-3.3-70b-versatile (Groq)"

class CropDiseaseRequest(BaseModel):
    crop: str                               # ANY crop name — free text
    symptoms: str                           # ANY symptoms — free text
    language: Optional[str] = None
    weather: Optional[dict] = None

class CropRecommendRequest(BaseModel):
    soil_type: str                          # ANY soil description — free text
    season: str                             # ANY season — free text
    rainfall: str                           # ANY description — free text
    additional_info: Optional[str] = None  # extra context: location, water availability etc
    language: Optional[str] = None
    weather: Optional[dict] = None

class FertilizerRequest(BaseModel):
    crop: str                               # ANY crop — free text
    soil_condition: Optional[str] = None   # optional soil context
    crop_stage: Optional[str] = None       # optional: seedling, flowering, fruiting etc
    language: Optional[str] = None

class SchemeRequest(BaseModel):
    query: str                              # ANY free-text query
    farmer_type: Optional[str] = None      # optional: small, marginal, organic etc
    language: Optional[str] = None

class WeatherRequest(BaseModel):
    lat: float
    lon: float
    location_name: Optional[str] = None


# ── Routes ─────────────────────────────────────────────────────────────────────

@router.get("/health")
def health():
    return {
        "status": "ok",
        "service": "AI Farmer Assistant",
        "kb_records": len(KNOWLEDGE_BASE),
        "model": "llama-3.3-70b-versatile",
        "features": ["weather", "open-ended queries", "any crop", "any soil"]
    }


@router.post("/ask", response_model=QueryResponse)
async def ask_question(body: QueryRequest):
    context = retrieve(body.question, top_k=5)
    answer = await ask_groq(body.question, context, body.language, body.weather)
    return QueryResponse(question=body.question, answer=answer, context_used=context)


@router.post("/disease", response_model=QueryResponse)
async def identify_disease(body: CropDiseaseRequest):
    query = f"My {body.crop} plant has these symptoms: {body.symptoms}. What disease is this and how do I treat it?"
    context = retrieve(query, top_k=5)
    answer = await ask_groq(query, context, body.language, body.weather)
    return QueryResponse(question=query, answer=answer, context_used=context)


@router.post("/recommend-crop", response_model=QueryResponse)
async def recommend_crop(body: CropRecommendRequest):
    extra = f" Additional info: {body.additional_info}" if body.additional_info else ""
    query = (
        f"Which crops should I grow on {body.soil_type} soil "
        f"during {body.season} season with {body.rainfall} rainfall?{extra}"
    )
    context = retrieve(query, top_k=5)
    answer = await ask_groq(query, context, body.language, body.weather)
    return QueryResponse(question=query, answer=answer, context_used=context)


@router.post("/fertilizer", response_model=QueryResponse)
async def fertilizer_advice(body: FertilizerRequest):
    stage = f" at {body.crop_stage} stage" if body.crop_stage else ""
    soil = f" in {body.soil_condition} soil" if body.soil_condition else ""
    query = f"What fertilizers and nutrients should I apply for growing {body.crop}{stage}{soil}?"
    context = retrieve(query, top_k=5)
    answer = await ask_groq(query, context, body.language)
    return QueryResponse(question=query, answer=answer, context_used=context)


@router.post("/scheme", response_model=QueryResponse)
async def scheme_info(body: SchemeRequest):
    farmer = f" I am a {body.farmer_type} farmer." if body.farmer_type else ""
    query = f"Which government schemes help farmers with {body.query}?{farmer} How do I apply and what documents do I need?"
    context = retrieve(query, top_k=6)
    answer = await ask_groq(query, context, body.language)
    return QueryResponse(question=query, answer=answer, context_used=context)


@router.post("/weather-advice", response_model=QueryResponse)
async def weather_advice(body: QueryRequest):
    """Get farming advice based on current weather conditions"""
    if not body.weather:
        return QueryResponse(
            question=body.question,
            answer="Please provide weather data (location permission required in the app).",
            context_used="",
        )
    condition = body.weather.get("condition", "")
    temp = body.weather.get("temp", "")
    query = f"Current weather is {condition} with temperature {temp}°C. What farming activities should I do or avoid today?"
    context = retrieve(query, top_k=3)
    answer = await ask_groq(query, context, body.language, body.weather)
    return QueryResponse(question=query, answer=answer, context_used=context)


@router.get("/kb/summary")
def kb_summary():
    counts = Counter(e["category"] for e in KNOWLEDGE_BASE)
    return {"total_records": len(KNOWLEDGE_BASE), "by_category": dict(counts)}