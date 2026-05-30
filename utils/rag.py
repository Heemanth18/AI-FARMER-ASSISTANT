"""
rag.py — Improved retrieval for any crop, soil, or farming situation.
"""
import json, re
from pathlib import Path
from typing import List, Dict, Any

KB_PATH = Path(__file__).parent.parent / "data" / "agriculture_kb.json"
with open(KB_PATH, "r", encoding="utf-8") as f:
    KNOWLEDGE_BASE: List[Dict[str, Any]] = json.load(f)

def _entry_to_text(entry):
    cat = entry.get("category","")
    if cat == "crop_disease":
        return f"[Disease] Crop:{entry['crop']} | Disease:{entry['disease']} | Symptoms:{entry['symptoms']} | Treatment:{entry['treatment']} | Prevention:{entry['prevention']}"
    elif cat == "crop_recommendation":
        return f"[Crop Rec] Soil:{entry['soil_type']} | Season:{entry['season']} | Rainfall:{entry['rainfall']} | Crops:{','.join(entry.get('recommended_crops',[]))} | Reason:{entry['reason']}"
    elif cat == "fertilizer":
        return f"[Fertilizer] Crop:{entry['crop']} | NPK:{entry['npk_ratio']} | Organic:{entry['organic']} | Micro:{entry['micronutrients']} | Tips:{entry['tips']}"
    elif cat == "government_scheme":
        return f"[Scheme] {entry['scheme_name']} ({entry.get('full_name','')}) | Benefit:{entry['benefit']} | Eligibility:{entry['eligibility']} | Apply:{entry['how_to_apply']} | Helpline:{entry.get('helpline','')} | Docs:{','.join(entry.get('documents',[]))}"
    elif cat == "weather_advisory":
        return f"[Weather] Condition:{entry['condition']} | Advisory:{entry['advisory']}"
    return json.dumps(entry)

def retrieve(query: str, top_k: int = 5) -> str:
    q = query.lower()
    tokens = set(re.split(r"\W+", q))
    is_disease    = any(w in q for w in ["disease","spot","blight","wilt","rot","rust","mold","pest","insect","yellowing","wilting","symptoms","affected","dying"])
    is_fertilizer = any(w in q for w in ["fertilizer","fertiliser","npk","urea","manure","compost","nutrient","deficiency","feed"])
    is_scheme     = any(w in q for w in ["scheme","yojana","government","subsidy","insurance","loan","credit","kisan","pmfby","pension"])
    is_recommend  = any(w in q for w in ["recommend","suggest","which crop","what crop","grow","suitable","best crop","sow","plant"])
    is_weather    = any(w in q for w in ["weather","rain","temperature","frost","drought","humidity","wind","monsoon","heat","cold"])
    scored = []
    for entry in KNOWLEDGE_BASE:
        txt = _entry_to_text(entry).lower()
        score = len(tokens & set(re.split(r"\W+", txt)))
        cat = entry.get("category","")
        if is_disease    and cat == "crop_disease":        score += 5
        if is_fertilizer and cat == "fertilizer":          score += 5
        if is_scheme     and cat == "government_scheme":   score += 5
        if is_recommend  and cat == "crop_recommendation": score += 5
        if is_weather    and cat == "weather_advisory":    score += 5
        crop = entry.get("crop", entry.get("scheme_name","")).lower()
        if crop and crop in q: score += 8
        soil = entry.get("soil_type","").lower()
        if soil and any(s in q for s in soil.split()): score += 6
        scored.append((score, entry))
    scored.sort(key=lambda x: x[0], reverse=True)
    top = [e for s,e in scored[:top_k] if s > 0]
    if not top:
        return "No specific records found. Use general farming best practices."
    return "\n".join(_entry_to_text(e) for e in top)