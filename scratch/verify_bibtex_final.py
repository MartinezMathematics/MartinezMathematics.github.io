import json

with open("manuscripts.json", "r", encoding="utf-8") as f:
    items = json.load(f)

for item in items:
    print(f"Code: {item['code']}")
    print(f"Date: {item['date']}")
    print("BibTeX:")
    print(item['bibtex'])
    print("=" * 50)
