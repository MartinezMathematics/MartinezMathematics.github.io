/**
 * Martinez Mathematics - Bookstore Academic Archive
 * Author: Hector Martinez (Clemson University)
 */

// Initialize PDF.js worker
if (typeof pdfjsLib !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
}

let MANUSCRIPTS = [
  {
    "id": "2014-problem-a2-putnam",
    "code": "MS-01",
    "title": "2014 Problem A2: William Lowell Putnam",
    "filename": "Papers/2014___Problem_A2___Putnam.pdf",
    "category": "competition-math",
    "categoryLabel": "Competition Mathematics",
    "pages": 3,
    "date": "September 16, 2026",
    "abstract": "An expository derivation of the closed-form determinant for an $n \\times n$ matrix $A_n$, where $a_{ij} = \\frac{1}{\\min(i, j)}$, featured in the 2014 William Lowell Putnam Mathematical Competition. Rather than relying on elementary row operations, this paper approaches the problem through discrete calculus, establishing a recurrence relation on consecutive determinant ratios to yield $\\det(A_n) = \\frac{(-1)^{n-1}}{n!(n-1)!}$.",
    "author": "Hector Martinez",
    "bibtex": `@article{martinez20262014problema2put,\n  author = {Hector Martinez},\n  title = {2014 Problem A2: William Lowell Putnam},\n  institution = {School of Mathematical and Statistical Sciences, Clemson University},\n  year = {2026},\n  month = {September},\n  day = {16}\n}`
  },
  {
    "id": "an-approach-to-non-linear-differential-equations",
    "code": "MS-02",
    "title": "An Approach to Non-Linear Differential Equations",
    "filename": "Papers/An_Approach_to_Non-Linear_Differential_Equations.pdf",
    "category": "diff-eq",
    "categoryLabel": "Differential Equations",
    "pages": 6,
    "date": "June 14, 2026",
    "abstract": "This manuscript presents an analytical approach to linearizing a specific Bernoulli differential equation, $dy/dx = y - y^2$, through geometric coordinate mapping. By defining a new degree of freedom within the coordinate space and exploiting the Chain Rule to lift the system into a higher-dimensional space, the paper derives a necessary constraint to force linearity. The resulting framework yields a general solution consistent with linear system theory while examining the trade-off of induced singularities.",
    "author": "Hector Martinez",
    "bibtex": `@article{martinez2026anapproachtononl,\n  author = {Hector Martinez},\n  title = {An Approach to Non-Linear Differential Equations},\n  institution = {School of Mathematical and Statistical Sciences, Clemson University},\n  year = {2026},\n  month = {June},\n  day = {14}\n}`
  },
  {
    "id": "deriving-the-integrating-factor",
    "code": "MS-03",
    "title": "Deriving The Integrating Factor",
    "filename": "Papers/Deriving_The_Integrating_Factor.pdf",
    "category": "diff-eq",
    "categoryLabel": "Differential Equations",
    "pages": 2,
    "date": "September 17, 2026",
    "abstract": "A structural derivation of the general solution to a first-order linear ordinary differential equation, $\\frac{dy}{dx} + P(x)y = Q(x)$. This paper critiques the standard method of solving via integrating factors through the lens of linear algebra and geometric operators. By defining the left-hand side as a linear transformation $T[y]$, the manuscript demonstrates how varying the constant of the homogeneous solution naturally spans the function space to satisfy the particular forcing function.",
    "author": "Hector Martinez",
    "bibtex": `@article{martinez2026derivingtheinteg,\n  author = {Hector Martinez},\n  title = {Deriving The Integrating Factor},\n  institution = {School of Mathematical and Statistical Sciences, Clemson University},\n  year = {2026},\n  month = {September},\n  day = {17}\n}`
  },
  {
    "id": "euler-s-method",
    "code": "MS-04",
    "title": "Deriving Euler's Method for Coupled 2 × 2 Systems",
    "filename": "Papers/Euler_s_Method.pdf",
    "category": "numerical",
    "categoryLabel": "Numerical Analysis",
    "pages": 3,
    "date": "June 18, 2026",
    "abstract": "This expository paper derives Euler's Method from the Fundamental Theorem of Calculus to numerically approximate solutions for a coupled $2 \\times 2$ system of ordinary differential equations. The manuscript constructs the recursive approximation algebraically using left-endpoint rectangular integration over discrete partitions. The method is then applied to evaluate a specific non-autonomous coupled system over 20 iterations with a step size of $h=0.05$.",
    "author": "Hector Martinez",
    "bibtex": `@article{martinez2026eulersmethod,\n  author = {Hector Martinez},\n  title = {Deriving Euler's Method for Coupled 2 × 2 Systems},\n  institution = {School of Mathematical and Statistical Sciences, Clemson University},\n  year = {2026},\n  month = {June},\n  day = {18}\n}`
  },
  {
    "id": "runge-kutta-fourth-order",
    "code": "MS-06",
    "title": "Deriving the Runge-Kutta Fourth-Order Formula for Coupled 2 × 2 Systems",
    "filename": "Papers/Runge_Kutta_Fourth_Order.pdf",
    "category": "numerical",
    "categoryLabel": "Numerical Analysis",
    "pages": 5,
    "date": "June 18, 2026",
    "abstract": "A geometric derivation of the Runge-Kutta Fourth-Order (RK4) method for coupled $2 \\times 2$ systems. This paper bypasses standard Taylor series expansion, instead deriving the numerical update rule by fitting a quadratic polynomial over a symmetric interval $[-h, h]$. By exploiting numerical area cancellation and intermediate slope sampling, the manuscript constructs the classical RK4 weights analytically before applying the algorithm to evaluate a non-autonomous differential system.",
    "author": "Hector Martinez",
    "bibtex": `@article{martinez2026rungekuttafourth,\n  author = {Hector Martinez},\n  title = {Deriving the Runge-Kutta Fourth-Order Formula for Coupled 2 × 2 Systems},\n  institution = {School of Mathematical and Statistical Sciences, Clemson University},\n  year = {2026},\n  month = {June},\n  day = {18}\n}`
  }
];

function getPdfUrl(filename) {
  if (!filename) return "";
  if (filename.startsWith("Papers/") || filename.startsWith("http://") || filename.startsWith("https://") || filename === "Resume.pdf") {
    return filename;
  }
  return `Papers/${filename}`;
}

const PAGE_LOAD_START = performance.now();

/**
 * Dismisses the page loader with a refined minimum duration and smooth transition
 */
function dismissPageLoader() {
  if (typeof window.__dismissLoader === "function") {
    window.__dismissLoader();
    return;
  }
  const loader = document.getElementById("pageLoader");
  if (!loader || loader.classList.contains("loader-hidden")) return;

  const minDuration = 400; // ms minimum to prevent harsh flickering on fast cached loads
  const elapsed = performance.now() - PAGE_LOAD_START;
  const remaining = Math.max(0, minDuration - elapsed);

  setTimeout(() => {
    loader.classList.add("loader-hidden");
    document.body.classList.add("page-ready");
    setTimeout(() => {
      loader.style.display = "none";
    }, 550);
  }, remaining);
}

// Asynchronously load the latest static manifest from manuscripts.json
async function loadManuscriptCatalog() {
  try {
    const res = await fetch("manuscripts.json");
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        MANUSCRIPTS = data;
        renderCategoryTabs();
        renderManuscripts();
      }
    }
  } catch (err) {
    console.info("Loaded manuscripts from built-in manifest.", err);
  } finally {
    dismissPageLoader();
  }
}

let activeCategory = "all";
try {
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get("category");
  if (catParam) {
    activeCategory = catParam;
  }
} catch (e) { }
let searchQuery = "";

const bookstoreList = document.getElementById("bookstoreList");
const searchInput = document.getElementById("searchInput");
const pdfModal = document.getElementById("pdfModal");
const pdfFrame = document.getElementById("pdfFrame");
const pdfModalTitle = document.getElementById("pdfModalTitle");
const pdfDownloadBtn = document.getElementById("pdfDownloadBtn");
const citationModal = document.getElementById("citationModal");
const citationContent = document.getElementById("citationContent");
const toast = document.getElementById("toast");
const themeToggle = document.getElementById("themeToggle");

/**
 * Helper to match manuscripts against categories with intelligent cross-tagging
 */
function manuscriptMatchesCategory(m, category) {
  if (!category || category === "all") return true;
  if (m.category === category) return true;
  if (Array.isArray(m.categories) && m.categories.includes(category)) return true;

  const title = (m.title || "").toLowerCase();
  const label = (m.categoryLabel || "").toLowerCase();
  const fname = (m.filename || "").toLowerCase();
  const id = (m.id || "").toLowerCase();

  if (category === "putnam") {
    return title.includes("putnam") || label.includes("putnam") || fname.includes("putnam") || id.includes("putnam");
  }
  if (category === "diff-eq") {
    return m.category === "diff-eq" || title.includes("differential") || label.includes("differential");
  }
  if (category === "numerical") {
    return m.category === "numerical" || label.includes("numerical") || title.includes("euler") || title.includes("runge");
  }
  if (category === "linear-algebra") {
    return m.category === "linear-algebra" || (label.includes("linear") && !label.includes("non-linear")) || title.includes("linear independence");
  }
  return false;
}

/**
 * Parse human date string into epoch timestamp for reliable sorting
 */
function parseManuscriptDate(dateStr) {
  if (!dateStr) return 0;
  const parsed = Date.parse(dateStr);
  if (!isNaN(parsed)) return parsed;
  const match = dateStr.match(/\b(20\d\d)\b/);
  return match ? new Date(parseInt(match[1], 10), 0, 1).getTime() : 0;
}

function renderManuscripts() {
  const q = searchQuery.toLowerCase().trim();
  const filtered = MANUSCRIPTS.filter(m => {
    const matchCategory = manuscriptMatchesCategory(m, activeCategory);
    const matchQuery = !q ||
      m.title.toLowerCase().includes(q) ||
      m.abstract.toLowerCase().includes(q) ||
      m.categoryLabel.toLowerCase().includes(q) ||
      m.code.toLowerCase().includes(q);
    return matchCategory && matchQuery;
  });

  // Sort manuscripts: default by chronological order (newest first), then by code
  filtered.sort((a, b) => {
    const dateA = parseManuscriptDate(a.date);
    const dateB = parseManuscriptDate(b.date);
    if (dateB !== dateA) {
      return dateB - dateA;
    }
    return (a.code || "").localeCompare(b.code || "");
  });

  if (filtered.length === 0) {
    bookstoreList.innerHTML = `
      <div class="empty-state">
        <p>No manuscripts match the specified query.</p>
      </div>
    `;
    return;
  }

  bookstoreList.innerHTML = filtered.map(m => `
    <article class="bookstore-item" data-id="${m.id}">
      <!-- Tactile Book Cover Column -->
      <div class="book-cover-container">
        <div class="paper-stack-bg paper-stack-back"></div>
        <div class="paper-stack-bg paper-stack-mid"></div>
        <div class="book-cover-wrap" id="wrap-${m.id}" onclick="openPdf('${m.id}')" title="Read ${escapeHtml(m.title)}">
          <!-- Page 1 Canvas Preview -->
          <canvas id="cover-${m.id}" class="book-cover-canvas"></canvas>
          
          <!-- Loading skeleton placeholder -->
          <div class="cover-skeleton">
            <div class="skeleton-title"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line short"></div>
          </div>

          <span class="cover-hover-badge">Open Manuscript</span>
        </div>
      </div>

      <!-- Manuscript Details Column -->
      <div class="item-details">
        <div class="item-meta-line">
          <span class="catalog-num">${m.code || ''}</span>
          ${m.categoryLabel ? `<span class="meta-bullet">&bull;</span><span class="category-label" data-category="${m.category || ''}">${m.categoryLabel.toUpperCase()}</span>` : ''}
          <span class="meta-bullet">&bull;</span>
          <span class="page-count-badge">${m.pages || 1} ${m.pages === 1 ? 'PAGE' : 'PAGES'}</span>
          ${m.date ? `<span class="meta-bullet">&bull;</span><span class="item-date">${m.date.toUpperCase()}</span>` : ''}
        </div>

        <h3 class="item-title">
          <a href="javascript:void(0)" onclick="openPdf('${m.id}')">${escapeHtml(m.title || '')}</a>
        </h3>

        <div class="item-byline">
          ${escapeHtml(m.author || 'Hector Martinez')} &mdash; School of Mathematical and Statistical Sciences, Clemson University
        </div>

        ${m.abstract ? `<p class="item-abstract">${m.abstract}</p>` : ''}

        <div class="item-actions">
          <button class="action-link" onclick="openPdf('${m.id}')">
            <span class="action-link-bracket">[</span> View Manuscript &nearr; <span class="action-link-bracket">]</span>
          </button>
          <a class="action-link" href="${encodeURI(getPdfUrl(m.filename))}" download title="Download full PDF">
            <span class="action-link-bracket">[</span> Download (.pdf) &darr; <span class="action-link-bracket">]</span>
          </a>
          <button class="action-link" onclick="openCitation('${m.id}')">
            <span class="action-link-bracket">[</span> BibTeX Citation <span class="action-link-bracket">]</span>
          </button>
        </div>
      </div>
    </article>
  `).join("");

  // Render mathematical notation ($inline$ and $$display$$) across the newly rendered DOM
  renderMath();

  // Render Page 1 of each PDF on its cover canvas
  filtered.forEach(m => {
    renderCoverPreview(getPdfUrl(m.filename), m.id);
  });
}

/**
 * Renders mathematical expressions ($...$ and $$...$$) using KaTeX auto-render
 */
function renderMath() {
  if (typeof renderMathInElement === "function") {
    renderMathInElement(document.body, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\(", right: "\\)", display: false },
        { left: "\\[", right: "\\]", display: true }
      ],
      throwOnError: false
    });
  } else if (typeof katex !== "undefined") {
    // Retry once KaTeX finishes loading if deferred
    window.addEventListener("load", renderMath, { once: true });
  }
}

/**
 * Renders page 1 of a PDF onto an HTML5 canvas with crisp DPI scaling
 */
async function renderCoverPreview(filename, id) {
  if (typeof pdfjsLib === "undefined") return;

  const canvas = document.getElementById(`cover-${id}`);
  const wrap = document.getElementById(`wrap-${id}`);
  if (!canvas || !wrap) return;

  try {
    const loadingTask = pdfjsLib.getDocument(filename);
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);

    const targetWidth = 195;
    const unscaledViewport = page.getViewport({ scale: 1.0 });
    
    // Scale for high-DPI displays
    const dpr = window.devicePixelRatio || 1;
    const scale = (targetWidth / unscaledViewport.width) * dpr;
    const viewport = page.getViewport({ scale });

    const ctx = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    canvas.style.width = `${targetWidth}px`;
    canvas.style.height = `${targetWidth * (unscaledViewport.height / unscaledViewport.width)}px`;

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };

    await page.render(renderContext).promise;
    wrap.classList.add("loaded");
  } catch (err) {
    console.warn(`Could not render cover for ${filename}:`, err);
    wrap.classList.add("loaded");
  }
}

function escapeHtml(str) {
  return str.replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// Search & Filter Listeners
searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value;
  renderManuscripts();
});

// PDF Reader Modal
function openPdf(target, title) {
  let filename = getPdfUrl(target);
  let displayTitle = title;

  // If target matches a manuscript ID, look up its properties
  const found = MANUSCRIPTS.find(m => m.id === target);
  if (found) {
    filename = getPdfUrl(found.filename);
    displayTitle = found.title;
  }

  pdfModalTitle.textContent = displayTitle || "Manuscript Viewer";
  pdfDownloadBtn.href = filename;
  pdfFrame.src = `${encodeURI(filename)}#view=FitH&toolbar=1`;
  pdfModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

let targetCvFile = "Resume.pdf";
let isCvAvailable = false;

function detectCvOrResume() {
  fetch("CV.pdf", { method: "HEAD" })
    .then(r => {
      if (r.ok) {
        isCvAvailable = true;
        targetCvFile = "CV.pdf";
        applyCvLinkLabels();
      } else {
        return fetch("cv.pdf", { method: "HEAD" });
      }
    })
    .then(r => {
      if (r && r.ok) {
        isCvAvailable = true;
        targetCvFile = "cv.pdf";
        applyCvLinkLabels();
      }
    })
    .catch(() => {});
}

function applyCvLinkLabels() {
  document.querySelectorAll("[data-cv-type]").forEach(el => {
    const type = el.dataset.cvType;
    if (type === "nav") {
      el.innerHTML = "CV / Resume &nearr;";
      el.setAttribute("title", "View CV / Resume");
    } else if (type === "nav-download") {
      el.innerHTML = "CV / Resume &nearr;";
      el.href = targetCvFile;
      el.setAttribute("title", "Download CV / Resume");
    } else if (type === "hero") {
      el.href = targetCvFile;
      const span = el.querySelector(".cv-label-text");
      if (span) span.textContent = "Download CV / Resume";
    } else if (type === "sidebar") {
      el.href = targetCvFile;
      const label = el.previousElementSibling;
      if (label && label.classList.contains("cv-sidebar-label")) {
        label.textContent = "CV / Resume";
      }
    }
  });
}

function openCvModal() {
  const docTitle = isCvAvailable ? "Curriculum Vitae / Resume — Hector Martinez" : "Resume — Hector Martinez";
  openPdf(targetCvFile, docTitle);
}

function closePdfModal() {
  pdfModal.classList.remove("active");
  pdfFrame.src = "about:blank";
  document.body.style.overflow = "";
}

// BibTeX Citation Modal
function openCitation(id) {
  const m = MANUSCRIPTS.find(item => item.id === id);
  if (!m) return;
  citationContent.textContent = m.bibtex;
  citationModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCitationModal() {
  citationModal.classList.remove("active");
  document.body.style.overflow = "";
}

function copyCitation() {
  navigator.clipboard.writeText(citationContent.textContent).then(() => {
    showToast();
  }).catch(() => {
    const range = document.createRange();
    range.selectNodeContents(citationContent);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    document.execCommand("copy");
    showToast();
  });
}

function showToast() {
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// Backdrop and Escape Key
[pdfModal, citationModal].forEach(modal => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closePdfModal();
      closeCitationModal();
    }
  });
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closePdfModal();
    closeCitationModal();
  }
});

// Theme Switcher
function initTheme() {
  const saved = localStorage.getItem("mm-theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
  updateThemeIcon(saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  const next = current === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("mm-theme", next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  if (!themeToggle) return;
  if (theme === "dark") {
    themeToggle.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
    `;
    themeToggle.setAttribute("title", "Switch to Paper Reading Mode");
  } else {
    themeToggle.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
    `;
    themeToggle.setAttribute("title", "Switch to Night Reading Mode");
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme);
}

// Dynamically generate category filter tabs based on active manuscripts
function renderCategoryTabs() {
  const container = document.getElementById("categoryTabs");
  if (!container) return;

  const categoryMap = new Map();
  MANUSCRIPTS.forEach(m => {
    if (m.category && m.category.trim()) {
      const label = m.categoryLabel || m.category;
      categoryMap.set(m.category, label);
    }
  });

  if (activeCategory !== "all" && !categoryMap.has(activeCategory)) {
    activeCategory = "all";
  }

  let html = `
    <button class="tab-btn ${activeCategory === 'all' ? 'active' : ''}" data-category="all" role="tab">
      All <span class="tab-count">(${MANUSCRIPTS.length})</span>
    </button>
  `;

  categoryMap.forEach((label, catKey) => {
    const count = MANUSCRIPTS.filter(m => manuscriptMatchesCategory(m, catKey)).length;
    if (count > 0) {
      html += `
        <button class="tab-btn ${activeCategory === catKey ? 'active' : ''}" data-category="${catKey}" role="tab">
          ${escapeHtml(label)} <span class="tab-count">(${count})</span>
        </button>
      `;
    }
  });

  container.innerHTML = html;

  container.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      container.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.dataset.category;
      renderManuscripts();
    });
  });
}

function updateTabCounts() {
  renderCategoryTabs();
}

function startApp() {
  initTheme();
  detectCvOrResume();
  renderCategoryTabs();
  renderManuscripts();
  renderMath();
  loadManuscriptCatalog();
  // Failsafe in case of network stall or offline mode
  setTimeout(dismissPageLoader, 1500);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startApp);
} else {
  startApp();
}
