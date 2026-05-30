"""
groq_client.py — LLaMA 3.3 via Groq API
- Fully open-ended: answers ANY farming question about ANY crop/soil/situation
- Weather-aware: uses real weather data when provided
- Simple language output
"""

import httpx
from typing import Optional
import os

GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_MODEL   = "llama-3.3-70b-versatile"

# 🔑 Your Groq API key
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

SYSTEM_PROMPT = """You are a helpful farming expert assistant for Indian farmers.

YOUR JOB:
- Answer ANY farming question — any crop, any soil, any situation
- Give PRACTICAL advice a real farmer can act on TODAY
- Use SIMPLE words — like talking to a village farmer with no technical background
- Be SPECIFIC — give exact quantities, timings, product names

ANSWER FORMAT (always follow this):
1. Direct answer in 1-2 lines
2. Bullet points (use •) for steps or tips — max 5 bullets
3. One line: "Next step: [what farmer should do today]"

LANGUAGE RULES:
- If farmer writes in Kannada → reply fully in simple Kannada
- If farmer writes in Hindi → reply fully in simple Hindi  
- If farmer writes in Telugu → reply fully in simple Telugu
- Otherwise → simple English, no jargon

IMPORTANT:
- Never say "I don't know" — give the best practical advice you can
- Never use complicated English words
- If weather data is provided, include weather-specific advice
- Always mention if a government scheme is available for the farmer's situation
- For ANY crop not in your knowledge base, use general agricultural principles to advise"""


async def ask_groq(
    user_query: str,
    rag_context: str,
    language_hint: Optional[str] = None,
    weather_data: Optional[dict] = None,
) -> str:

    lang_note = f"\nIMPORTANT: Respond entirely in simple {language_hint}." if language_hint else ""

    weather_note = ""
    if weather_data:
        weather_note = f"""
Current weather at farmer's location:
- Temperature: {weather_data.get('temp', 'N/A')}°C
- Condition: {weather_data.get('condition', 'N/A')}
- Humidity: {weather_data.get('humidity', 'N/A')}%
- Wind: {weather_data.get('wind', 'N/A')} km/h
- Location: {weather_data.get('location', 'N/A')}

Include specific advice based on this weather condition.
"""

    augmented_message = f"""Knowledge base information:
---
{rag_context}
---
{weather_note}
Farmer's question: {user_query}{lang_note}

Give practical, simple advice. Use bullet points. Keep it short and clear."""

    payload = {
        "model": GROQ_MODEL,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user",   "content": augmented_message},
        ],
        "max_tokens": 400,
        "temperature": 0.3,
    }

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type":  "application/json",
    }

    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.post(GROQ_API_URL, json=payload, headers=headers)
        if response.status_code != 200:
            raise Exception(f"Groq API error: {response.json()}")
        data = response.json()
        return data["choices"][0]["message"]["content"]