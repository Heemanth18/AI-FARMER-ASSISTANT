"""
local_model.py — Loads the fine-tuned TinyLlama adapter locally.
Replaces groq_client.py — no API key needed!

Place your extracted farmer-adapter/ folder inside MLOps_Project/models/
"""

import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel
from pathlib import Path
from typing import Optional

# ── Paths ──────────────────────────────────────────────────────────────────────
BASE_MODEL_ID  = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
ADAPTER_PATH   = Path(__file__).parent.parent / "models" / "farmer-adapter"

# ── Load once at startup ───────────────────────────────────────────────────────
print("Loading fine-tuned farmer model...")
print(f"  Base model : {BASE_MODEL_ID}")
print(f"  Adapter    : {ADAPTER_PATH}")

_device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"  Device     : {_device}")

_tokenizer = AutoTokenizer.from_pretrained(
    str(ADAPTER_PATH),
    local_files_only=True,
)
_tokenizer.pad_token = _tokenizer.eos_token

_base_model = AutoModelForCausalLM.from_pretrained(
    BASE_MODEL_ID,
    torch_dtype=torch.float16 if _device == "cuda" else torch.float32,
    device_map=_device,
)

_model = PeftModel.from_pretrained(_base_model, str(ADAPTER_PATH))
_model.eval()

print("✅ Fine-tuned model loaded!\n")

# ── System prompt ──────────────────────────────────────────────────────────────
SYSTEM_PROMPT = (
    "You are an expert AI Farmer Assistant. "
    "Help Indian farmers with crop diseases, recommendations, fertilizers, and government schemes. "
    "Give practical, simple, and actionable advice."
)

# ── Inference function ─────────────────────────────────────────────────────────
def ask_local_model(
    user_query: str,
    rag_context: str,
    language_hint: Optional[str] = None,
) -> str:
    """
    Run inference on the fine-tuned TinyLlama model.
    Replaces ask_groq() from groq_client.py.
    """
    lang_note = f" Respond in {language_hint}." if language_hint else ""

    prompt = (
        f"<s>[INST] {SYSTEM_PROMPT}\n\n"
        f"Relevant knowledge:\n{rag_context}\n\n"
        f"Farmer's question: {user_query}{lang_note} [/INST]"
    )

    inputs = _tokenizer(
        prompt,
        return_tensors="pt",
        truncation=True,
        max_length=512,
    ).to(_device)

    with torch.no_grad():
        outputs = _model.generate(
            **inputs,
            max_new_tokens=200,
            temperature=0.7,
            do_sample=True,
            pad_token_id=_tokenizer.eos_token_id,
            eos_token_id=_tokenizer.eos_token_id,
        )

    # Decode only the new tokens (not the prompt)
    new_tokens = outputs[0][inputs["input_ids"].shape[1]:]
    response = _tokenizer.decode(new_tokens, skip_special_tokens=True).strip()

    return response