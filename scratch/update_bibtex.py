import json
import re

with open("manuscripts.json", "r", encoding="utf-8") as f:
    papers = json.load(f)

for p in papers:
    doc_date = p.get("date", "")
    date_match = re.search(r'([A-Za-z]+)\s+(\d{1,2}),?\s+(20\d\d)', doc_date)
    if date_match:
        month_str = date_match.group(1)
        day_str = date_match.group(2)
        year_str = date_match.group(3)
    else:
        year_match = re.search(r'\b(20\d\d)\b', doc_date)
        year_str = year_match.group(1) if year_match else "2026"
        month_match = re.search(r'\b([A-Za-z]+)\b', doc_date)
        month_str = month_match.group(1) if month_match else "June"
        day_match = re.search(r'\b(\d{1,2})\b', doc_date.replace(year_str, ''))
        day_str = day_match.group(1) if day_match else ""

    key_slug = re.sub(r'[^a-zA-Z0-9]', '', p['id'])[:14].lower()
    bib_key = f"martinez{year_str}{key_slug}"
    
    title = p['title']
    author = p.get('author', 'Hector Martinez')
    
    bibtex = f"""@article{{{bib_key},
  author = {{{author}}},
  title = {{{title}}},
  institution = {{School of Mathematical and Statistical Sciences, Clemson University}},
  year = {{{year_str}}},
  month = {{{month_str}}},
  day = {{{day_str}}}
}}"""
    p['bibtex'] = bibtex
    print(f"Paper: {p['code']} ({doc_date})")
    print(bibtex)
    print("-" * 40)
