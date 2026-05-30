"""
test_rag.py — Run this to verify the RAG pipeline works WITHOUT a Groq API key.
Usage: python test_rag.py
"""

from utils.rag import retrieve, KNOWLEDGE_BASE

TESTS = [
    ("Crop Disease",       "tomato leaves yellow brown spots disease treatment"),
    ("Crop Disease",       "rice water soaked lesions yellow halo disease"),
    ("Fertilizer",         "wheat fertilizer NPK how much to apply"),
    ("Fertilizer",         "rice paddy fertilizer recommendation"),
    ("Crop Recommend",     "sandy soil summer kharif crop"),
    ("Crop Recommend",     "black cotton soil rabi winter crop recommendation"),
    ("Gov Scheme",         "PM-KISAN income support scheme how to apply"),
    ("Gov Scheme",         "crop insurance scheme documents needed"),
    ("Fertilizer",         "cotton fertilizer boron micronutrient"),
    ("Crop Disease",       "maize leaf blight fungicide treatment"),
]

print("=" * 70)
print("  AI Farmer Assistant — RAG Pipeline Test")
print("=" * 70)
print(f"  Knowledge Base loaded: {len(KNOWLEDGE_BASE)} records\n")

passed = 0
for i, (category, query) in enumerate(TESTS, 1):
    result = retrieve(query, top_k=2)
    first_line = result.split("\n")[0][:80]
    status = "✅" if result and "No specific" not in result else "❌"
    if status == "✅":
        passed += 1
    print(f"  {status} Test {i:02d} [{category}]")
    print(f"     Query  : {query}")
    print(f"     Result : {first_line}...")
    print()

print("=" * 70)
print(f"  Results: {passed}/{len(TESTS)} tests passed")
print("=" * 70)

if passed == len(TESTS):
    print("\n  ✅ RAG pipeline is working correctly!")
    print("  ➡  Next step: Add your Groq API key and run `uvicorn main:app --reload`")
else:
    print(f"\n  ⚠  {len(TESTS)-passed} test(s) failed. Check the knowledge base.")