/**
 * Martinez Mathematics - Main Application Script
 * Features: Exposition catalog, KaTeX rendering, PDF modal, Citation generator,
 * Interactive Phase Space Canvas, Euler vs RK4 Simulation Mini-Lab, and Theme switcher.
 */

// --- 1. Exposition Papers Catalog ---
const PAPERS = [
  {
    id: "putnam-2014-a2",
    title: "William Lowell Putnam Mathematical Competition 2014 — Problem A2",
    filename: "2014___Problem_A2___Putnam.pdf",
    category: "putnam",
    categoryLabel: "Putnam Competition",
    date: "September 16, 2026",
    abstract: "A complete analytical evaluation of the determinant of an n × n matrix whose (i, j) entry is the reciprocal of min(i, j). Establishes an exact recursive relation, derives telescoping product structures, and proves the closed-form determinant formula.",
    mathPreview: "D_n = (-1)^{n-1} \\prod_{m=1}^{n-1} \\frac{1}{m^2 + m} = \\frac{(-1)^{n-1}}{(n!)^2 \\cdot n}",
    tags: ["Putnam Competition", "Determinants", "Recurrence Relations", "Discrete Calculus", "Linear Algebra"],
    author: "Hector Martinez",
    bibtex: `@article{martinez2026putnama2,
  title={William Lowell Putnam Mathematical Competition 2014 --- Problem A2},
  author={Martinez, Hector},
  journal={Exposition in Discrete Calculus & Linear Algebra},
  year={2026},
  month={September}
}`
  },
  {
    id: "nonlinear-diff-eq",
    title: "An Approach to Non-Linear Differential Equations",
    filename: "An_Approach_to_Non-Linear_Differential_Equations.pdf",
    category: "diff-eq",
    categoryLabel: "Differential Equations",
    date: "June 14, 2026",
    abstract: "Presents an analytical approach to linearizing a specific class of non-linear Bernoulli-type differential equations using geometric coordinate mapping. Explores phase space transformation, trajectory stability, and global asymptotic behaviors.",
    mathPreview: "\\frac{dy}{dx} + P(x)y = Q(x)y^n \\implies \\frac{1}{1-n} \\frac{dv}{dx} + P(x)v = Q(x)",
    tags: ["Differential Equations", "Coordinate Mapping", "Bernoulli Equations", "Non-Linear Dynamics"],
    author: "Hector Martinez",
    bibtex: `@article{martinez2026nonlinear,
  title={An Approach to Non-Linear Differential Equations},
  author={Martinez, Hector},
  journal={Exposition in Differential Equations & Linear Algebra},
  year={2026},
  month={June}
}`
  },
  {
    id: "deriving-integrating-factor",
    title: "Deriving the Integrating Factor from First Principles",
    filename: "Deriving_The_Integrating_Factor.pdf",
    category: "diff-eq",
    categoryLabel: "Differential Equations",
    date: "May 26, 2026",
    abstract: "A rigorous, foundational derivation of the integrating factor method for first-order linear ordinary differential equations. Deconstructs the reverse product rule intuition and establishes the exponential integral transformation μ(x) = exp(∫ P(x)dx).",
    mathPreview: "\\mu(x) = \\exp\\left( \\int P(x)\\, dx \\right) \\implies \\frac{d}{dx}[\\mu(x)y] = \\mu(x)Q(x)",
    tags: ["ODEs", "Integrating Factor", "First-Order Equations", "Calculus"],
    author: "Hector Martinez",
    bibtex: `@article{martinez2026integratingfactor,
  title={Deriving The Integrating Factor},
  author={Martinez, Hector},
  journal={Exposition in Differential Equations},
  year={2026},
  month={May}
}`
  },
  {
    id: "rk4-coupled-systems",
    title: "Runge-Kutta Fourth-Order Formula for 2 × 2 Coupled Systems",
    filename: "Runge_Kutta_Fourth_Order___Homework___Diff_Eq.pdf",
    category: "numerical",
    categoryLabel: "Numerical Analysis",
    date: "June 2026",
    abstract: "A comprehensive investigation into the classic fourth-order Runge-Kutta (RK4) algorithm for coupled autonomous 2 × 2 systems. Formulates multi-stage slope predictors (k₁, k₂, k₃, k₄) and illustrates superior stability and O(h⁴) local truncation error.",
    mathPreview: "\\mathbf{x}_{n+1} = \\mathbf{x}_n + \\frac{h}{6}(\\mathbf{k}_1 + 2\\mathbf{k}_2 + 2\\mathbf{k}_3 + \\mathbf{k}_4)",
    tags: ["Runge-Kutta RK4", "Numerical Methods", "MAT 242", "Coupled ODEs", "Error Analysis"],
    author: "Hector Martinez",
    bibtex: `@article{martinez2026rk4,
  title={Runge-Kutta Fourth-Order Formula for 2x2 Systems},
  author={Martinez, Hector},
  journal={MAT 242 Differential Equations Investigations},
  year={2026},
  month={June}
}`
  },
  {
    id: "euler-coupled-systems",
    title: "Euler's Method for 2 × 2 Autonomous Systems",
    filename: "Euler_s_Method___Homework___Diff_Eq.pdf",
    category: "numerical",
    categoryLabel: "Numerical Analysis",
    date: "June 18, 2026",
    abstract: "Dissects Euler's tangent-stepping discretization method applied to two-dimensional coupled dynamical systems. Analyzes step size selection, phase space orbital distortion, and first-order global error bounds.",
    mathPreview: "\\mathbf{x}_{n+1} = \\mathbf{x}_n + h \\cdot \\mathbf{f}(t_n, \\mathbf{x}_n), \\quad \\mathbf{x}(t) = \\begin{pmatrix} x(t) \\\\ y(t) \\end{pmatrix}",
    tags: ["Euler's Method", "Numerical Analysis", "Vector Fields", "Phase Plane", "MAT 242"],
    author: "Hector Martinez",
    bibtex: `@article{martinez2026euler,
  title={Euler's Method for 2x2 Systems},
  author={Martinez, Hector},
  journal={MAT 242 Differential Equations Coursework & Exposition},
  year={2026},
  month={June}
}`
  },
  {
    id: "linear-independence-three-functions",
    title: "Proving Linear Independence of Three Vector-Valued Functions",
    filename: "Proving_Linear_Independence_of_Three_Functions.pdf",
    category: "linear-algebra",
    categoryLabel: "Linear Algebra",
    date: "June 17, 2026",
    abstract: "Rigorous proof of linear independence between three distinct vector-valued functions using proof by contradiction and strategic point evaluation. Connects Wronskian determinism with functional vector spaces and coordinate uniqueness.",
    mathPreview: "c_1 \\mathbf{f}_1(t) + c_2 \\mathbf{f}_2(t) + c_3 \\mathbf{f}_3(t) = \\mathbf{0} \\implies c_1 = c_2 = c_3 = 0",
    tags: ["Linear Independence", "Wronskian", "Vector Functions", "Functional Spaces"],
    author: "Hector Martinez",
    bibtex: `@article{martinez2026linearindependence,
  title={Proving Linear Independence of Three Functions},
  author={Martinez, Hector},
  journal={Exposition in Linear Algebra & Functional Analysis},
  year={2026},
  month={June}
}`
  }
];

// --- 2. State & DOM References ---
let activeCategory = "all";
let searchQuery = "";

const papersContainer = document.getElementById("papersContainer");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const pdfModal = document.getElementById("pdfModal");
const pdfFrame = document.getElementById("pdfFrame");
const modalPdfTitle = document.getElementById("modalPdfTitle");
const modalDownloadLink = document.getElementById("modalDownloadLink");
const citationModal = document.getElementById("citationModal");
const citationContent = document.getElementById("citationContent");
const toast = document.getElementById("toast");
const themeToggle = document.getElementById("themeToggle");

// --- 3. Render Papers Grid ---
function renderPapers() {
  const filtered = PAPERS.filter(paper => {
    const matchCategory = activeCategory === "all" || paper.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchQuery = !q || 
      paper.title.toLowerCase().includes(q) ||
      paper.abstract.toLowerCase().includes(q) ||
      paper.tags.some(t => t.toLowerCase().includes(q)) ||
      paper.categoryLabel.toLowerCase().includes(q);
    return matchCategory && matchQuery;
  });

  if (filtered.length === 0) {
    papersContainer.innerHTML = `
      <div class="empty-results">
        <h3>No matching expositions found</h3>
        <p>Try refining your search terms or clearing the active category filter.</p>
        <button class="btn btn-secondary" style="margin-top: 1rem;" onclick="clearFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  papersContainer.innerHTML = filtered.map(paper => `
    <article class="paper-card" data-id="${paper.id}">
      <div class="card-top">
        <span class="card-category ${paper.category}">${paper.categoryLabel}</span>
        <span class="card-date">${paper.date}</span>
      </div>
      <h3 class="paper-title">
        <a href="javascript:void(0)" onclick="openPdfModal('${paper.filename}', '${escapeHtml(paper.title)}')">${paper.title}</a>
      </h3>
      <p class="paper-abstract">${paper.abstract}</p>
      
      <div class="math-callout" data-tex="${escapeHtml(paper.mathPreview)}">
        <!-- KaTeX will render here -->
        <code>${paper.mathPreview}</code>
      </div>

      <div class="paper-tags">
        ${paper.tags.map(tag => `<span class="tag-badge">#${tag}</span>`).join("")}
      </div>

      <div class="card-actions">
        <button class="btn-card-action primary" onclick="openPdfModal('${paper.filename}', '${escapeHtml(paper.title)}')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          Read Paper
        </button>
        <div class="action-links">
          <a href="${paper.filename}" download class="btn-card-action" title="Direct Download PDF">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            PDF
          </a>
          <button class="btn-card-action" onclick="openCitationModal('${paper.id}')" title="Cite Paper">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z"/><polyline points="15 3 21 9 21 21"/></svg>
            Cite
          </button>
        </div>
      </div>
    </article>
  `).join("");

  // Trigger KaTeX rendering on math callout blocks
  renderMathFormulas();
}

function escapeHtml(str) {
  return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function renderMathFormulas() {
  if (typeof katex !== "undefined") {
    document.querySelectorAll(".math-callout").forEach(el => {
      const tex = el.getAttribute("data-tex");
      if (tex) {
        try {
          katex.render(tex, el, {
            displayMode: true,
            throwOnError: false
          });
        } catch (err) {
          console.warn("KaTeX render error:", err);
        }
      }
    });

    // Render static equations in the lab and hero if any
    document.querySelectorAll(".render-math").forEach(el => {
      const tex = el.getAttribute("data-tex") || el.textContent;
      try {
        katex.render(tex, el, {
          displayMode: el.dataset.display === "true",
          throwOnError: false
        });
      } catch (err) {}
    });
  }
}

// --- 4. Filtering & Search Events ---
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.category;
    renderPapers();
  });
});

searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value;
  renderPapers();
});

function clearFilters() {
  activeCategory = "all";
  searchQuery = "";
  searchInput.value = "";
  filterButtons.forEach(b => {
    b.classList.toggle("active", b.dataset.category === "all");
  });
  renderPapers();
}

// --- 5. PDF Modal Management ---
function openPdfModal(filename, title) {
  modalPdfTitle.textContent = title;
  modalDownloadLink.href = filename;
  // Fit width and enable toolbar
  pdfFrame.src = `${filename}#view=FitH&toolbar=1`;
  pdfModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closePdfModal() {
  pdfModal.classList.remove("active");
  pdfFrame.src = "about:blank";
  document.body.style.overflow = "";
}

function togglePdfFullscreen() {
  const container = document.querySelector(".pdf-modal-container");
  if (!document.fullscreenElement) {
    container.requestFullscreen().catch(err => {
      console.warn("Fullscreen request error:", err);
    });
  } else {
    document.exitFullscreen();
  }
}

// --- 6. Citation Modal & Copy ---
function openCitationModal(paperId) {
  const paper = PAPERS.find(p => p.id === paperId);
  if (!paper) return;

  citationContent.textContent = paper.bibtex;
  citationModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCitationModal() {
  citationModal.classList.remove("active");
  document.body.style.overflow = "";
}

function copyCitation() {
  const text = citationContent.textContent;
  navigator.clipboard.writeText(text).then(() => {
    showToast("BibTeX citation copied to clipboard!");
  }).catch(() => {
    // Fallback
    const range = document.createRange();
    range.selectNodeContents(citationContent);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    document.execCommand("copy");
    showToast("BibTeX citation copied!");
  });
}

function showToast(msg) {
  const textEl = toast.querySelector(".toast-text");
  if (textEl) textEl.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

// Global modal backdrop close
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

// --- 7. Theme Toggle & Persistence ---
function initTheme() {
  const saved = localStorage.getItem("mm-theme") || "dark";
  document.documentElement.setAttribute("data-theme", saved);
  updateThemeIcon(saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("mm-theme", next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  if (!themeToggle) return;
  if (theme === "light") {
    themeToggle.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
    `;
    themeToggle.setAttribute("title", "Switch to Dark Mode");
  } else {
    themeToggle.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
    `;
    themeToggle.setAttribute("title", "Switch to Light Mode");
  }
}

themeToggle.addEventListener("click", toggleTheme);

// --- 8. Interactive Phase Space Canvas (Hero Section) ---
// Autonomous 2D dynamical system: dx/dt = y, dy/dt = -x - μ(x² - 1)y (Van der Pol) or Duffing flow
class PhaseSpaceVisualizer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.numParticles = 75;
    this.systemType = "vanderpol"; // 'vanderpol', 'harmonic', 'lotka'
    this.mouse = { x: null, y: null, active: false };
    
    this.resize();
    window.addEventListener("resize", () => this.resize());

    this.canvas.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = (e.clientX - rect.left) / this.scaleX - this.centerX;
      this.mouse.y = (e.clientY - rect.top) / this.scaleY - this.centerY;
      this.mouse.active = true;
    });

    this.canvas.addEventListener("mouseleave", () => {
      this.mouse.active = false;
    });

    this.initParticles();
    this.animate();
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.width = this.canvas.width = rect.width * window.devicePixelRatio || 500;
    this.height = this.canvas.height = 360 * window.devicePixelRatio;
    this.canvas.style.height = "360px";
    
    this.scaleX = this.width / 8;  // view range roughly [-4, 4]
    this.scaleY = this.height / 8;
    this.centerX = 4;
    this.centerY = 4;
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push(this.createParticle());
    }
  }

  createParticle() {
    return {
      x: (Math.random() - 0.5) * 6,
      y: (Math.random() - 0.5) * 6,
      history: [],
      maxHistory: 24,
      life: Math.floor(Math.random() * 200) + 60,
      hue: Math.random() > 0.5 ? 195 : 230 // Sky cyan to indigo
    };
  }

  // Vector field derivatives
  f(x, y) {
    let dx = 0;
    let dy = 0;

    if (this.systemType === "vanderpol") {
      const mu = 0.8;
      dx = y;
      dy = mu * (1 - x * x) * y - x;
    } else if (this.systemType === "harmonic") {
      dx = y;
      dy = -x - 0.15 * y;
    } else if (this.systemType === "lotka") {
      // Shifted Lotka-Volterra
      dx = x - 0.5 * x * y;
      dy = -y + 0.4 * x * y;
    }

    // Gentle cursor vortex interaction
    if (this.mouse.active && this.mouse.x !== null) {
      const mx = this.mouse.x;
      const my = this.mouse.y;
      const d2 = (x - mx) ** 2 + (y - my) ** 2 + 0.2;
      dx += -0.8 * (y - my) / d2;
      dy += 0.8 * (x - mx) / d2;
    }

    return { dx, dy };
  }

  setSystem(type) {
    this.systemType = type;
    const tag = document.getElementById("activeSystemTag");
    if (tag) {
      if (type === "vanderpol") tag.textContent = "System: Van der Pol Oscillator (Limit Cycle)";
      if (type === "harmonic") tag.textContent = "System: Damped Linear Harmonic Phase Plane";
      if (type === "lotka") tag.textContent = "System: Non-Linear Predatory Equilibrium Flow";
    }
    this.initParticles();
  }

  animate() {
    const dt = 0.025;
    const ctx = this.ctx;

    // Semi-transparent background clear for smooth trajectory tails
    ctx.fillStyle = "rgba(9, 14, 24, 0.22)";
    ctx.fillRect(0, 0, this.width, this.height);

    // Draw coordinate axes
    ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, this.centerY * this.scaleY);
    ctx.lineTo(this.width, this.centerY * this.scaleY);
    ctx.moveTo(this.centerX * this.scaleX, 0);
    ctx.lineTo(this.centerX * this.scaleX, this.height);
    ctx.stroke();

    // Step each particle using Runge-Kutta 2 (Heun's step)
    for (let p of this.particles) {
      p.life--;
      if (p.life <= 0 || Math.abs(p.x) > 5.5 || Math.abs(p.y) > 5.5) {
        Object.assign(p, this.createParticle());
        continue;
      }

      p.history.push({ x: p.x, y: p.y });
      if (p.history.length > p.maxHistory) p.history.shift();

      // RK2 step
      const k1 = this.f(p.x, p.y);
      const k2 = this.f(p.x + dt * k1.dx, p.y + dt * k1.dy);
      p.x += dt * 0.5 * (k1.dx + k2.dx);
      p.y += dt * 0.5 * (k1.dy + k2.dy);

      // Render trajectory stream
      if (p.history.length > 2) {
        ctx.beginPath();
        const startX = (p.history[0].x + this.centerX) * this.scaleX;
        const startY = (p.history[0].y + this.centerY) * this.scaleY;
        ctx.moveTo(startX, startY);

        for (let j = 1; j < p.history.length; j++) {
          const hx = (p.history[j].x + this.centerX) * this.scaleX;
          const hy = (p.history[j].y + this.centerY) * this.scaleY;
          ctx.lineTo(hx, hy);
        }

        ctx.strokeStyle = `hsla(${p.hue}, 85%, 65%, 0.4)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Particle head glow
        const headX = (p.x + this.centerX) * this.scaleX;
        const headY = (p.y + this.centerY) * this.scaleY;
        ctx.fillStyle = `hsl(${p.hue}, 95%, 75%)`;
        ctx.beginPath();
        ctx.arc(headX, headY, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

// --- 9. Interactive Numerical Simulation Lab (Euler vs RK4) ---
// Simulates: dy/dt = y * cos(t), exact solution: y(t) = y0 * exp(sin(t))
class NumericalMethodLab {
  constructor() {
    this.canvas = document.getElementById("labCanvas");
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.slider = document.getElementById("stepSizeSlider");
    this.stepValDisplay = document.getElementById("stepSizeValue");
    this.eulerErrorDisplay = document.getElementById("eulerErrorVal");
    this.rk4ErrorDisplay = document.getElementById("rk4ErrorVal");

    this.t0 = 0;
    this.tEnd = 6.28; // ~ 2π
    this.y0 = 1;

    this.resize();
    window.addEventListener("resize", () => {
      this.resize();
      this.runSimulation();
    });

    if (this.slider) {
      this.slider.addEventListener("input", () => {
        this.stepValDisplay.textContent = parseFloat(this.slider.value).toFixed(2);
        this.runSimulation();
      });
    }

    this.runSimulation();
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.width = this.canvas.width = rect.width * window.devicePixelRatio || 500;
    this.height = this.canvas.height = 420 * window.devicePixelRatio;
    this.canvas.style.height = "420px";
  }

  f(t, y) {
    return y * Math.cos(t);
  }

  exact(t) {
    return this.y0 * Math.exp(Math.sin(t));
  }

  runSimulation() {
    const h = parseFloat(this.slider ? this.slider.value : 0.25);
    const steps = Math.ceil((this.tEnd - this.t0) / h);

    // 1. Exact Curve
    const exactPts = [];
    const denseN = 250;
    for (let i = 0; i <= denseN; i++) {
      const t = this.t0 + (i / denseN) * (this.tEnd - this.t0);
      exactPts.push({ t, y: this.exact(t) });
    }

    // 2. Euler's Method: y_{n+1} = y_n + h * f(t_n, y_n)
    const eulerPts = [{ t: this.t0, y: this.y0 }];
    let currT = this.t0;
    let currY = this.y0;
    let maxEulerErr = 0;

    for (let i = 0; i < steps; i++) {
      const slope = this.f(currT, currY);
      currY += h * slope;
      currT += h;
      eulerPts.push({ t: currT, y: currY });

      const err = Math.abs(currY - this.exact(currT));
      if (err > maxEulerErr) maxEulerErr = err;
    }

    // 3. Runge-Kutta 4th Order:
    const rk4Pts = [{ t: this.t0, y: this.y0 }];
    currT = this.t0;
    currY = this.y0;
    let maxRk4Err = 0;

    for (let i = 0; i < steps; i++) {
      const k1 = this.f(currT, currY);
      const k2 = this.f(currT + 0.5 * h, currY + 0.5 * h * k1);
      const k3 = this.f(currT + 0.5 * h, currY + 0.5 * h * k2);
      const k4 = this.f(currT + h, currY + h * k3);

      currY += (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
      currT += h;
      rk4Pts.push({ t: currT, y: currY });

      const err = Math.abs(currY - this.exact(currT));
      if (err > maxRk4Err) maxRk4Err = err;
    }

    // Update displays
    if (this.eulerErrorDisplay) this.eulerErrorDisplay.textContent = maxEulerErr.toExponential(3);
    if (this.rk4ErrorDisplay) this.rk4ErrorDisplay.textContent = maxRk4Err.toExponential(3);

    this.drawChart(exactPts, eulerPts, rk4Pts);
  }

  drawChart(exactPts, eulerPts, rk4Pts) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // View boundaries
    const padX = 50 * window.devicePixelRatio;
    const padY = 40 * window.devicePixelRatio;
    const plotW = w - padX * 2;
    const plotH = h - padY * 2;

    const tMin = 0, tMax = 6.4;
    const yMin = 0.2, yMax = 3.6;

    const mapX = (t) => padX + ((t - tMin) / (tMax - tMin)) * plotW;
    const mapY = (y) => h - padY - ((y - yMin) / (yMax - yMin)) * plotH;

    // Background
    ctx.fillStyle = "#090e18";
    ctx.fillRect(0, 0, w, h);

    // Subtle Grid Lines & Axis Labels
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    ctx.font = `${11 * window.devicePixelRatio}px var(--font-mono)`;
    ctx.fillStyle = "#64748b";

    for (let t = 0; t <= 6; t += 1) {
      const x = mapX(t);
      ctx.beginPath();
      ctx.moveTo(x, padY);
      ctx.lineTo(x, h - padY);
      ctx.stroke();
      ctx.fillText(`t=${t}`, x - 10, h - padY + 18 * window.devicePixelRatio);
    }

    for (let y = 0.5; y <= 3.5; y += 0.5) {
      const yPos = mapY(y);
      ctx.beginPath();
      ctx.moveTo(padX, yPos);
      ctx.lineTo(w - padX, yPos);
      ctx.stroke();
      ctx.fillText(y.toFixed(1), padX - 35 * window.devicePixelRatio, yPos + 4);
    }

    // Helper to draw a polyline
    const drawCurve = (pts, color, lineWidth, dashed = false) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth * window.devicePixelRatio;
      if (dashed) ctx.setLineDash([6 * window.devicePixelRatio, 4 * window.devicePixelRatio]);
      else ctx.setLineDash([]);

      pts.forEach((pt, idx) => {
        const cx = mapX(pt.t);
        const cy = mapY(pt.y);
        if (idx === 0) ctx.moveTo(cx, cy);
        else ctx.lineTo(cx, cy);
      });
      ctx.stroke();
      ctx.setLineDash([]);
    };

    // Draw Exact Analytical Solution
    drawCurve(exactPts, "#38bdf8", 3);

    // Draw Euler's Method (Red / Rose)
    drawCurve(eulerPts, "#f43f5e", 2, true);
    eulerPts.forEach(pt => {
      ctx.fillStyle = "#f43f5e";
      ctx.beginPath();
      ctx.arc(mapX(pt.t), mapY(pt.y), 3 * window.devicePixelRatio, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw RK4 Method (Emerald Green)
    drawCurve(rk4Pts, "#34d399", 2);
    rk4Pts.forEach(pt => {
      ctx.fillStyle = "#34d399";
      ctx.beginPath();
      ctx.arc(mapX(pt.t), mapY(pt.y), 3 * window.devicePixelRatio, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}

// --- 10. Initialization on DOMContentLoaded ---
let heroVisualizer = null;
let numericalLab = null;

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderPapers();
  heroVisualizer = new PhaseSpaceVisualizer("heroCanvas");
  numericalLab = new NumericalMethodLab();

  // System switcher for hero canvas
  window.switchPhaseSystem = (type) => {
    if (heroVisualizer) heroVisualizer.setSystem(type);
  };
});
