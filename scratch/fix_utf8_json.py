import json

manuscripts = [
  {
    "id": "2014-problem-a2-putnam",
    "code": "MS-01",
    "title": "2014 \u2014 Problem A2 \u2014 William Lowell Putnam",
    "filename": "2014___Problem_A2___Putnam.pdf",
    "category": "putnam",
    "categoryLabel": "Putnam Competition",
    "categories": ["putnam"],
    "pages": 3,
    "date": "September 16, 2026",
    "abstract": "This paper presents a derivation of the determinant of an $n \\times n$ matrix $A_n$ defined by $a_{ij} = \\frac{1}{\\min(i, j)}$. By analyzing the recurrence relation of the determinant ratios $r_n = \\frac{D_n}{D_{n-1}}$, the author establishes that the closed-form solution is given by $\\det(A_n) = \\frac{(-1)^{n-1}}{n!(n-1)!}$.",
    "author": "Hector Martinez",
    "bibtex": "@article{martinez2026putnam,\n  author = {Hector Martinez},\n  title = {2014 \u2014 Problem A2 \u2014 William Lowell Putnam},\n  institution = {School of Mathematical and Statistical Sciences, Clemson University},\n  year = {2026},\n  month = {September},\n  day = {16}\n}"
  },
  {
    "id": "an-approach-to-non-linear-differential-equations",
    "code": "MS-02",
    "title": "An Approach to Non-Linear Differential Equations",
    "filename": "An_Approach_to_Non-Linear_Differential_Equations.pdf",
    "category": "diff-eq",
    "categoryLabel": "Differential Equations",
    "pages": 6,
    "date": "June 14, 2026",
    "abstract": "This paper presents an analytical framework for linearizing a specific Bernoulli differential equation, defined as $\\frac{dy}{dx} = y - y^2$, through geometric coordinate mapping. By introducing a new degree of freedom $u(y)$ and applying the Chain Rule, the system is lifted into a higher-dimensional space to derive a constraint that forces linearity by satisfying the principle of superposition.",
    "author": "Hector Martinez",
    "bibtex": "@article{martinez2026approach,\n  author = {Hector Martinez},\n  title = {An Approach to Non-Linear Differential Equations},\n  institution = {School of Mathematical and Statistical Sciences, Clemson University},\n  year = {2026},\n  month = {June},\n  day = {14}\n}"
  },
  {
    "id": "deriving-the-integrating-factor",
    "code": "MS-03",
    "title": "Deriving The Integration Factor",
    "filename": "Deriving_The_Integrating_Factor.pdf",
    "category": "diff-eq",
    "categoryLabel": "Differential Equations",
    "pages": 2,
    "date": "May 26, 2026",
    "abstract": "This paper presents a derivation of the solution to a first-order linear ordinary differential equation of the form $\\frac{dy}{dx} + P(x)y = Q(x)$ by treating the differential operator as a linear transformation. By defining the operator $T = \\frac{d}{dx} + P(x)$, the author solves the system $Ty = Q(x)$ by utilizing the homogeneous solution and the method of variation of parameters, ultimately arriving at the general solution $y = \\left( \\int Q(x) e^{\\int P(x) dx} dx + C \\right) e^{-\\int P(x) dx}$.",
    "author": "Hector Martinez",
    "bibtex": "@article{martinez2026deriving,\n  author = {Hector Martinez},\n  title = {Deriving The Integration Factor},\n  institution = {School of Mathematical and Statistical Sciences, Clemson University},\n  year = {2026},\n  month = {May},\n  day = {26}\n}"
  },
  {
    "id": "euler-s-method",
    "code": "MS-04",
    "title": "First-Principles Discrete Integration: Deriving Euler's Method for Coupled Systems",
    "filename": "Euler_s_Method.pdf",
    "category": "numerical",
    "categoryLabel": "Numerical Analysis",
    "pages": 3,
    "date": "June 18, 2026",
    "abstract": "This paper derives Euler's method from the Fundamental Theorem of Calculus to approximate solutions for a coupled system of differential equations. By partitioning the integral of the derivative into rectangular approximations with step size $h=0.05$, the author computes numerical values for $x(t)$ and $y(t)$ over 20 iterations, yielding final approximations of $x(1) \\approx -0.06431$ and $y(1) \\approx 0.54761$.",
    "author": "Hector Martinez",
    "bibtex": "@article{martinez2026euler,\n  author = {Hector Martinez},\n  title = {First-Principles Discrete Integration: Deriving Euler's Method for Coupled Systems},\n  institution = {School of Mathematical and Statistical Sciences, Clemson University},\n  year = {2026},\n  month = {June},\n  day = {18}\n}"
  },
  {
    "id": "proving-linear-independence-of-three-functions",
    "code": "MS-05",
    "title": "Proving Linear Independence of Three Functions",
    "filename": "Proving_Linear_Independence_of_Three_Functions.pdf",
    "category": "linear-algebra",
    "categoryLabel": "Linear Algebra",
    "pages": 1,
    "date": "June 17, 2026",
    "abstract": "This paper demonstrates the linear independence of a set of three vector-valued functions defined as $f_1(x) = e^x$, $f_2(x) = e^{-x}$, and $f_3(x) = e^{2x}$. The author employs proof by contradiction using a system of equations evaluated at specific points to show that no non-trivial linear combination satisfies the zero vector condition.",
    "author": "Hector Martinez",
    "bibtex": "@article{martinez2026proving,\n  author = {Hector Martinez},\n  title = {Proving Linear Independence of Three Functions},\n  institution = {School of Mathematical and Statistical Sciences, Clemson University},\n  year = {2026},\n  month = {June},\n  day = {17}\n}"
  },
  {
    "id": "runge-kutta-fourth-order",
    "code": "MS-06",
    "title": "Runge \u2014 Kutta Fourth-Order Formula for 2 \u00d7 2 Systems",
    "filename": "Runge_Kutta_Fourth_Order.pdf",
    "category": "numerical",
    "categoryLabel": "Numerical Analysis",
    "pages": 5,
    "date": "June 18, 2026",
    "abstract": "This paper derives the Runge-Kutta fourth-order method for $2 \\times 2$ systems of differential equations by approximating the integral of the derivative using a second-degree polynomial $Y(t) = at^2 + bt + c$ over a symmetric interval $[-h, h]$. By enforcing coordinate constraints at $t = -h, 0, h$ and utilizing symmetry to induce term cancellations, the author arrives at the standard update formula $x_{n+1} = x_n + \\frac{h}{6}(k_1 + 2k_2 + 2k_3 + k_4)$. The method is applied to a specific system of differential equations with initial conditions $x(0)=0$ and $y(0)=1$ to approximate values at $t=1$ with a step size of $h=0.05$.",
    "author": "Hector Martinez",
    "bibtex": "@article{martinez2026runge,\n  author = {Hector Martinez},\n  title = {Runge \u2014 Kutta Fourth-Order Formula for 2 \u00d7 2 Systems},\n  institution = {School of Mathematical and Statistical Sciences, Clemson University},\n  year = {2026},\n  month = {June},\n  day = {18}\n}"
  }
]

with open("manuscripts.json", "w", encoding="utf-8") as f:
    json.dump(manuscripts, f, indent=2, ensure_ascii=False)

print("Saved manuscripts.json with clean UTF-8 characters!")
