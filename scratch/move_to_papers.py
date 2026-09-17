import os
import shutil
import glob

papers_dir = "Papers"
os.makedirs(papers_dir, exist_ok=True)

exclude = {"resume.pdf", "cv.pdf"}
pdf_files = [f for f in glob.glob("*.pdf") if f.lower() not in exclude]

moved = []
for pdf in pdf_files:
    dest = os.path.join(papers_dir, pdf)
    shutil.move(pdf, dest)
    moved.append(pdf)

print(f"Successfully moved {len(moved)} manuscript PDFs into {papers_dir}/:")
for m in moved:
    print(f"  - {m}")
