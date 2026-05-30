# 🌾 AI Farmer Assistant

**MLOps Project | REVA University | 6th Semester**

An intelligent farming assistant powered by **LLaMA 3 (Groq)** + **Retrieval-Augmented Generation (RAG)** built as a **FastAPI** backend.

---

## 📁 Project Structure

```
ai-farmer-assistant/
├── main.py                    # FastAPI app entry point
├── requirements.txt
├── data/
│   └── agriculture_kb.json    # Knowledge base (20 records, 4 categories)
├── utils/
│   ├── rag.py                 # RAG: keyword retrieval from KB
│   └── groq_client.py         # Groq API wrapper (LLaMA 3)
└── routers/
    └── farmer.py              # All API route definitions
```

---

## ⚙️ Setup

### 1. Get a FREE Groq API Key
Go to [https://console.groq.com](https://console.groq.com) → Sign up → Create API Key.

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Run the server
```bash
uvicorn main:app --reload --port 8000
```

### 4. Open API docs
Visit: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🔑 Authentication

Pass your Groq API key in every request header:
```
X-Groq-Api-Key: gsk_your_key_here
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome & endpoint list |
| GET | `/api/v1/health` | Health check |
| GET | `/api/v1/kb/summary` | KB stats by category |
| POST | `/api/v1/ask` | General farmer question |
| POST | `/api/v1/disease` | Crop disease identification |
| POST | `/api/v1/recommend-crop` | Crop recommendation |
| POST | `/api/v1/fertilizer` | Fertilizer advice |
| POST | `/api/v1/scheme` | Government scheme info |

---

## 📬 Example Requests (curl)

### General Question
```bash
curl -X POST http://localhost:8000/api/v1/ask \
  -H "Content-Type: application/json" \
  -H "X-Groq-Api-Key: YOUR_KEY" \
  -d '{"question": "My tomato leaves are turning yellow with brown spots"}'
```

### Crop Disease
```bash
curl -X POST http://localhost:8000/api/v1/disease \
  -H "Content-Type: application/json" \
  -H "X-Groq-Api-Key: YOUR_KEY" \
  -d '{"crop": "Rice", "symptoms": "water-soaked lesions, yellow halo"}'
```

### Crop Recommendation
```bash
curl -X POST http://localhost:8000/api/v1/recommend-crop \
  -H "Content-Type: application/json" \
  -H "X-Groq-Api-Key: YOUR_KEY" \
  -d '{"soil_type": "Black cotton soil", "season": "Rabi", "rainfall": "low"}'
```

### Fertilizer Advice
```bash
curl -X POST http://localhost:8000/api/v1/fertilizer \
  -H "Content-Type: application/json" \
  -H "X-Groq-Api-Key: YOUR_KEY" \
  -d '{"crop": "Wheat"}'
```

### Government Scheme (in Hindi)
```bash
curl -X POST http://localhost:8000/api/v1/scheme \
  -H "Content-Type: application/json" \
  -H "X-Groq-Api-Key: YOUR_KEY" \
  -d '{"query": "crop insurance", "language": "Hindi"}'
```

---

## 🔧 MLOps Pipeline (as per report)

```
Data Collection (Kaggle/ICAR/Gov APIs)
        ↓
Data Preprocessing (cleaning, tokenization)
        ↓
Knowledge Base (agriculture_kb.json) ← DVC for versioning
        ↓
RAG Retrieval (utils/rag.py)
        ↓
LLM Inference (LLaMA 3 via Groq API)
        ↓
FastAPI Deployment (main.py)
        ↓
Monitoring (health endpoint + logs)
```

---

## 🧠 Model Details

| Property | Value |
|----------|-------|
| Model | `llama3-8b-8192` |
| Provider | Groq (free tier) |
| Approach | Prompt Engineering + RAG |
| Fine-tuning | Not required (RAG augments context) |
| Framework | Hugging Face compatible |

---

## 📊 Knowledge Base Categories

| Category | Records |
|----------|---------|
| Crop Diseases | 7 |
| Crop Recommendations | 5 |
| Fertilizer Advice | 5 |
| Government Schemes | 4 |
| **Total** | **20** |

---

## 👨‍💻 Team

| Name | SRN |
|------|-----|
| BEKKAM LOHITHA | R23EA025 |
| C R HEEMANTH REDDY | R23EA029 |
| LEKHANA A | R23EA064 |

**Guide:** R SWASTHIK | **Course:** MLOps | **REVA University**