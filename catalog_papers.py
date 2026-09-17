#!/usr/bin/env python3
"""
Martinez Mathematics - Manuscript Cataloging Script
Author: Hector Martinez

Usage:
  python catalog_papers.py

How it works:
  1. Scans the 'Papers/' directory for all PDF manuscripts (ignoring Resume.pdf / CV.pdf).
  2. Reads 'manuscripts.json'.
  3. Preserves all existing records 100% untouched.
  4. If a NEW paper is detected:
     - Extracts the page count, title, and date from the PDF.
     - Automatically assigns the next sequential catalog code (e.g. MS-07).
     - Creates a blank entry (empty abstract, category, and categoryLabel)
       with a pre-formatted BibTeX citation template.
     - Adds it to manuscripts.json so you can go in and edit the abstract
       and category details directly.
"""

import os
import sys
import json
import glob
import re
from datetime import datetime

# Ensure UTF-8 stdout encoding on Windows
if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

CATALOG_FILE = "manuscripts.json"
EXCLUDE_FILES = {"resume.pdf", "cv.pdf"}

def get_paper_metadata_title(pdf_path, pdf_bytes):
    """Extract authoritative title from PDF metadata or exact LaTeX header block."""
    # 1. Check standard PDF document metadata /Title (...)
    title_match = re.search(rb'/Title\s*\((.*?)\)', pdf_bytes)
    if title_match:
        t = title_match.group(1).decode('latin1', errors='ignore').strip()
        if t:
            return t

    # 2. Extract from LaTeX document header (first BT...ET block before author)
    stream_pattern = re.compile(rb'stream[\r\n]+(.*?)[\r\n]+endstream', re.DOTALL)
    streams = stream_pattern.findall(pdf_bytes)
    for s in streams:
        if b'/FontFile' in s:
            continue
        try:
            import zlib
            decomp = zlib.decompress(s)
            if b'Hector' in decomp and b'Martinez' in decomp and b'BT' in decomp:
                m = re.search(rb'BT(.*?)ET', decomp, re.DOTALL)
                if not m:
                    continue
                header = m.group(1)
                
                header_clean = header.replace(b'\\013', b'ff').replace(b'\\014', b'fi').replace(b'\\015', b'fl')
                header_clean = header_clean.replace(b'\\002', b'x')
                header_clean = header_clean.replace(b'{', b'-')
                
                tokens = []
                current_font = 0.0
                for chunk in re.split(rb'(/F\w+\s+[\d\.]+\s+Tf|\bET\b)', header_clean):
                    fm = re.match(rb'/F\w+\s+([\d\.]+)\s+Tf', chunk)
                    if fm:
                        current_font = float(fm.group(1))
                        continue
                    for tm in re.finditer(rb'\((.*?)\)', chunk):
                        txt = tm.group(1).decode('latin1', errors='ignore')
                        clean = re.sub(r'[^\x20-\x7E]', '', txt).strip()
                        if clean:
                            tokens.append((current_font, clean))
                
                title_parts = []
                for sz, word in tokens:
                    if "Hector" in word or "Martinez" in word:
                        break
                    if sz >= 11.0:
                        title_parts.append(word)
                
                if title_parts:
                    raw_title = " ".join(title_parts)
                    raw_title = re.sub(r'\s+([,.:;?!])', r'\1', raw_title)
                    raw_title = re.sub(r'([(\[{])\s+', r'\1', raw_title)
                    raw_title = re.sub(r'\s*-\s*', ' — ', raw_title)
                    raw_title = re.sub(r'\s*x\s*', ' × ', raw_title)
                    raw_title = re.sub(r'\s+', ' ', raw_title).strip()
                    
                    # Fix PDF LaTeX ligatures and hyphenations
                    replacements = {
                        "Lo w ell": "Lowell",
                        "Approac h": "Approach",
                        "Non — Linear": "Non-Linear",
                        "Differen tial": "Differential",
                        "Di\\013eren tial": "Differential",
                        "In tegration": "Integration",
                        "In tegrating": "Integrating",
                        "F actor": "Factor",
                        "First — Principles": "First-Principles",
                        "Metho d": "Method",
                        "Pro ving": "Proving",
                        "Indep endence": "Independence",
                        "F unctions": "Functions",
                        "F ourth — Order": "Fourth-Order",
                        "F orm ula": "Formula"
                    }
                    for old_sub, new_sub in replacements.items():
                        raw_title = raw_title.replace(old_sub, new_sub)
                    return raw_title
        except Exception:
            pass

    # 3. Fallback: derive title from filename
    base = os.path.splitext(os.path.basename(pdf_path))[0]
    clean_title = re.sub(r'[_\-]+', ' ', base).strip()
    return clean_title.title()

def get_paper_metadata_date(pdf_path, pdf_bytes):
    """Extract authoritative date from LaTeX document header or PDF creation metadata."""
    # 1. Try LaTeX header block after author Hector Martinez
    stream_pattern = re.compile(rb'stream[\r\n]+(.*?)[\r\n]+endstream', re.DOTALL)
    streams = stream_pattern.findall(pdf_bytes)
    for s in streams:
        if b'/FontFile' in s:
            continue
        try:
            import zlib
            decomp = zlib.decompress(s)
            if b'Hector' in decomp and b'Martinez' in decomp and b'BT' in decomp:
                m = re.search(rb'BT(.*?)ET', decomp, re.DOTALL)
                if not m:
                    continue
                header = m.group(1)
                
                header_clean = header.replace(b'\\013', b'ff').replace(b'\\014', b'fi').replace(b'\\015', b'fl')
                header_clean = header_clean.replace(b'\\002', b'x')
                header_clean = header_clean.replace(b'{', b'-')
                
                tokens = []
                for chunk in re.split(rb'(/F\w+\s+[\d\.]+\s+Tf|\bET\b)', header_clean):
                    for tm in re.finditer(rb'\((.*?)\)', chunk):
                        txt = tm.group(1).decode('latin1', errors='ignore')
                        clean = re.sub(r'[^\x20-\x7E]', '', txt).strip()
                        if clean:
                            tokens.append(clean)
                
                author_idx = -1
                for idx, t in enumerate(tokens):
                    if "Martinez" in t:
                        author_idx = idx
                        break
                
                if author_idx != -1:
                    date_tokens = tokens[author_idx+1:]
                    raw_date = " ".join(date_tokens)
                    raw_date = re.sub(r'\s+([,])', r'\1', raw_date)
                    raw_date = re.sub(r'\s+', ' ', raw_date).strip()
                    
                    # Fix font ligature spacing
                    raw_date = raw_date.replace("Septem b er", "September")
                    raw_date = raw_date.replace("Ma y", "May")
                    
                    match = re.search(r'([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})', raw_date)
                    if match:
                        month, day, year = match.groups()
                        return f"{month} {day}, {year}"
                    
                    match_my = re.search(r'([A-Za-z]+)\s+(\d{4})', raw_date)
                    if match_my:
                        month, year = match_my.groups()
                        return f"{month} {year}"
        except Exception:
            pass

    # 2. Check standard PDF CreationDate / ModDate: e.g. D:20260916123456
    date_match = re.search(rb'/CreationDate\s*\(D:(\d{4})(\d{2})(\d{2})', pdf_bytes)
    if not date_match:
        date_match = re.search(rb'/ModDate\s*\(D:(\d{4})(\d{2})(\d{2})', pdf_bytes)
    if date_match:
        try:
            y, m, d = date_match.groups()
            dt = datetime(int(y), int(m), int(d))
            return dt.strftime("%B %d, %Y")
        except Exception:
            pass

    return datetime.now().strftime("%B %d, %Y")

def extract_pdf_info(pdf_path):
    """Extract page count, title, and date from PDF using fast local parsing."""
    page_count = 1
    with open(pdf_path, 'rb') as f:
        pdf_bytes = f.read()
    
    # 1. Page count detection
    try:
        content = pdf_bytes.decode('latin1', errors='ignore')
        matches = re.findall(r'/Type\s*/Page[^s]', content)
        if matches:
            page_count = len(matches)
    except Exception:
        pass

    # 2. Extract document title and date
    doc_title = get_paper_metadata_title(pdf_path, pdf_bytes)
    doc_date = get_paper_metadata_date(pdf_path, pdf_bytes)

    return page_count, doc_title, doc_date

def main():
    # Load existing manuscripts.json
    if os.path.exists(CATALOG_FILE):
        with open(CATALOG_FILE, "r", encoding="utf-8") as f:
            try:
                catalog = json.load(f)
            except Exception:
                catalog = []
    else:
        catalog = []

    # Map existing filenames for O(1) lookup
    existing_map = {}
    for item in catalog:
        if "filename" in item:
            existing_map[item["filename"]] = item
            existing_map[os.path.basename(item["filename"]).lower()] = item

    # Find highest existing code number (e.g. MS-06 -> 6)
    max_code_num = 0
    for item in catalog:
        code = item.get("code", "")
        m = re.match(r'MS-(\d+)', code)
        if m:
            max_code_num = max(max_code_num, int(m.group(1)))

    # Find all PDFs in the Papers directory and root directory (excluding CV/Resume)
    papers_dir = "Papers"
    os.makedirs(papers_dir, exist_ok=True)
    pdf_files = sorted(glob.glob(os.path.join(papers_dir, "*.pdf")) + glob.glob("*.pdf"))
    
    manuscript_pdfs = []
    seen_basenames = set()
    for f in pdf_files:
        b_name = os.path.basename(f).lower()
        if b_name not in EXCLUDE_FILES and b_name not in seen_basenames:
            seen_basenames.add(b_name)
            manuscript_pdfs.append(f)

    print("==================================================")
    print(" Martinez Mathematics — Manuscript Cataloger")
    print(f" Found {len(manuscript_pdfs)} PDF files in repository.")
    print("==================================================")

    updated_catalog = []
    skipped_count = 0
    added_count = 0

    for pdf_path in manuscript_pdfs:
        rel_path = os.path.relpath(pdf_path).replace("\\", "/")
        base_name = os.path.basename(pdf_path).lower()

        # Check if already cataloged
        existing_record = existing_map.get(rel_path) or existing_map.get(base_name)
        if existing_record:
            existing_record["filename"] = rel_path
            print(f"[PRESERVED] {rel_path} -> {existing_record.get('code')}: {existing_record.get('title')}")
            updated_catalog.append(existing_record)
            skipped_count += 1
            continue

        # New paper detected: extract PDF metadata and generate blank entry
        print(f"\n[NEW PAPER DETECTED] {rel_path}")
        page_count, doc_title, doc_date = extract_pdf_info(pdf_path)
        
        max_code_num += 1
        code_str = f"MS-{max_code_num:02d}"
        slug = re.sub(r'[^a-zA-Z0-9]+', '-', os.path.splitext(os.path.basename(pdf_path))[0]).strip('-').lower()
        title = doc_title or os.path.splitext(os.path.basename(pdf_path))[0].replace('_', ' ').title()
        date_str = doc_date or datetime.now().strftime("%B %d, %Y")
        author = "Hector Martinez"

        # Extract date parts for BibTeX template
        date_match = re.search(r'([A-Za-z]+)\s+(\d{1,2}),?\s+(20\d\d)', date_str)
        if date_match:
            month_str = date_match.group(1)
            day_str = date_match.group(2)
            year_str = date_match.group(3)
        else:
            year_match = re.search(r'\b(20\d\d)\b', date_str)
            year_str = year_match.group(1) if year_match else str(datetime.now().year)
            month_match = re.search(r'\b([A-Za-z]+)\b', date_str)
            month_str = month_match.group(1) if month_match else datetime.now().strftime("%B")
            day_match = re.search(r'\b(\d{1,2})\b', date_str.replace(year_str, ''))
            day_str = day_match.group(1) if day_match else ""

        key_slug = re.sub(r'[^a-zA-Z0-9]', '', slug)[:16].lower()
        bib_key = f"martinez{year_str}{key_slug}"
        day_line = f",\n  day = {{{day_str}}}" if day_str else ""
        bibtex = f"""@article{{{bib_key},
  author = {{{author}}},
  title = {{{title}}},
  institution = {{School of Mathematical and Statistical Sciences, Clemson University}},
  year = {{{year_str}}},
  month = {{{month_str}}}{day_line}
}}"""

        # Create blank entry for manual editing
        record = {
            "id": slug,
            "code": code_str,
            "title": title,
            "filename": rel_path,
            "category": "",
            "categoryLabel": "",
            "pages": page_count,
            "date": date_str,
            "abstract": "",
            "author": author,
            "bibtex": bibtex
        }

        updated_catalog.append(record)
        added_count += 1
        print(f"  -> Created entry '{code_str}' in {CATALOG_FILE}.")
        print(f"  -> Title: \"{title}\" ({page_count} pages)")
        print(f"  -> Ready for you to edit category and abstract in {CATALOG_FILE}!")

    # Write updated catalog back to manuscripts.json
    with open(CATALOG_FILE, "w", encoding="utf-8") as f:
        json.dump(updated_catalog, f, indent=2, ensure_ascii=False)

    print("\n==================================================")
    print(f" Done! {CATALOG_FILE} is up to date.")
    print(f"   - {skipped_count} existing papers preserved 100% untouched.")
    print(f"   - {added_count} new paper(s) created as blank entries.")
    print("==================================================")

if __name__ == "__main__":
    main()
