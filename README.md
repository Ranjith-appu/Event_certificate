# NCORE 2026 – 12HRS Hackathon Web Application

> **THINK. BUILD. SOLVE. MAKE AN IMPACT.**  
> *National Conference on Computing, Research, Optimization & Engineering – 12-Hour Hackathon Arena*  
> **Presented by POINTERS** • Department of Computer Science and Engineering • **Arunai Engineering College (Autonomous)**, Tiruvannamalai, Tamil Nadu, India.

---

## 📌 Overview

**NCORE 2026 – 12HRS Hackathon Platform** is an enterprise-grade, real-time web application engineered to manage and power an elite national-level hackathon. 

Built with **React 18**, **Vite 6**, and **Tailwind CSS**, the platform delivers an aerospace command-inspired light-themed aesthetic, zero-dependency client-side routing, procedural audio feedback, interactive milestone tracking, real-time multi-criteria jury evaluations, and on-campus GPS geofenced participation accreditation.

---

## 🚀 Key Features

### 1. 🌐 Public Landing Page (`/`)
- **Futuristic Light Theme**: Clean `slate-50` background with cobalt accents, HUD tech borders, and crisp typography.
- **Challenge Domains**: 6 strategic technology tracks:
  - 🧠 Artificial Intelligence & Machine Learning
  - ⛓️ Cybersecurity & Blockchain
  - 🏙️ Smart Cities, IoT & Intelligent Systems
  - 💳 FinTech & Digital Trust
  - 🌱 Sustainable & Green Computing
  - 💡 Open Innovation
- **Motivational Honors**: Highlights intellectual distinction, incubation mentorship, and peer-reviewed journal publication opportunities (no commercial prize clutter).
- **Interactive Event Schedule**: Chronological 12-hour roadmap from morning reporting to evening awards.
- **Rules & Conveners**: Guidelines, code integrity standards, and profiles of faculty leadership and distinguished jury members.
- **Clean Participant Focus**: Zero administrative or jury links visible to participants on the landing page.

---

### 2. 👥 Participant Portal & Team Workspace (`/login`)
- **4-Member Team Registration**: Register team leaders and up to 3 additional members (total 4 members per team).
- **Auto-Generated Credentials**: Generates a sequential Team ID (e.g., `NCORE-T101`) and cryptographically randomized passkey (e.g., `NVG-9021-X`).
- **Milestone Submission Terminal**:
  - **Round 1**: Architecture Blueprint (Figma/PDF/Drive), Tech Stack & Abstract.
  - **Round 2**: GitHub Repository URL & Prototype Build.
  - **Round 3**: Live Deployment URL (Vercel, Netlify, Cloud Run) & Pitch Defense.
- **Live Leaderboard**: Real-time standings updated dynamically upon jury score normalization.
- **Director Broadcast Stream**: Live banner alerts pushed by the Hackathon Director.
- **Rounds Progression**: Synchronized timeline displaying active round requirements and guidelines.

---

### 3. 📍 Geofenced Certificate Center
- **On-Campus Physical Verification**: Uses the browser's Geolocation API (Haversine distance calculation) to verify physical presence within **Arunai Engineering College campus** (2.5 km radius around `12.1922° N, 79.0833° E`).
- **Privacy First**: Technical coordinates are validated in the background and omitted from the participant UI.
- **High-DPI HTML5 Canvas Rendering**: Generates a downloadable, high-resolution (1200×800) official certificate:
  - Double cobalt and gold borders with corner nodes.
  - Official institution headers, candidate name, college affiliation, and project title.
  - Unique anti-tamper verification hash.
  - Official convener signatures (*Mrs. V. Umadevi* & *Dr. P. Anandan*).
  - One-click PNG download.
- **Director Safeguard**: Certificate issuance remains locked until evaluations conclude and the Director releases distribution.

---

### 4. 🛡️ Director / Admin Command Center (`/admin`)
- **Passcode Protection**: Secured via director authorization passcode (`admin123`) or one-click demo login.
- **Synchronized Round Telemetry**:
  - Activate **Round 1**, **Round 2**, or **Round 3**.
  - Fast presets (**30m, 1h, 2h, 3h, 4h, 12h**) or custom minute overrides.
  - Master controls: **Start Round Timer**, **Pause Timer**, and **Reset Timer**. The countdown clock (`HH:MM:SS`) is synchronized across all screens.
- **Campus Geofence Master Switch**: Globally unlock or restrict certificate distribution.
- **Leaderboard Control**: Toggle between *Draft Mode* (internal jury scoring) and *Live Public Standings*.
- **Live Broadcast Transmitter**: Push real-time urgent announcements (Info, Warning, Critical) to participants.
- **Team Roster & Passkey Vault**: View all registered teams, passkeys, member contacts, and submitted artifacts.
- **Event Schedule & Time Manager**:
  - Inline time editing for any schedule slot.
  - Quick format adjusters (`+15m`, `+30m`, `+1h`).
  - Add custom milestones or reset back to default brochure hours.

---

### 5. ⚖️ Jury Evaluation & Scoring Portal (`/jury`)
- **Password-Protected Gate**: Secured via jury password (`jury123`) or one-click demo login.
- **Evaluator Profile Switcher**: Evaluate under distinct juror identities:
  - *Mrs. V. Umadevi* (Convener & HOD UG, CSE)
  - *Dr. P. Anandan* (Convener & Professor, CSE)
  - *Dr. S. K. Narayanan* (Industry Lead AI Architect)
  - *Distinguished External Jury*
- **Synchronized Active Round Banner**: Live countdown clock matching the director's timer.
- **Evaluation Workbench**:
  - Search teams by ID, Team Name, Leader, or Project Title.
  - Filter by Domain and Evaluation Status (*Pending* vs. *Evaluated*).
  - Direct links to inspect submitted deliverables (Blueprint, GitHub, Live Demo).
  - Score maintenance: **Round 1 (/100)**, **Round 2 (/100)**, and **Round 3 (/100)** with auto-summed **Total (/300)**.
  - Written qualitative feedback and recommendations textarea.
  - **Commit & Save Evaluation**: Automatically re-ranks tournament standings and updates LocalStorage.
- **Tournament Scoreboard**: Full comparative leaderboard table with ranking medals and **Export to CSV** functionality.

---

### 6. 🔐 Secret Committee Gateway (Double-Tap Unlock)
To maintain a clean public landing page with zero administrative clutter:
- The Director and Jury portals are hidden from public view.
- **Access Method**: Open the **Team Login** modal or visit `/login`.
- **Double-tap** (on mobile/touch devices) or **double-click** (on desktop) the tiny `v2.4.1` version badge in the bottom-right corner.
- This immediately reveals the secret **Committee Gateway**, allowing authorized faculty and judges to enter their passcodes and access `/admin` or `/jury`.

---

## 🛠️ Technology Stack

| Domain | Technology / Tool | Purpose |
|---|---|---|
| **Core Framework** | React 18.3.1 | Functional components, custom hooks, and Context API |
| **Build Tooling** | Vite 6.0.7 | Lightning-fast HMR and optimized production bundles |
| **Styling** | Tailwind CSS 3.4.17 | Custom responsive utilities, HUD brackets, and modern light palette |
| **Icons** | Lucide React | Clean, scalable vector iconography |
| **Routing** | Native HTML5 History API | Zero-dependency routing (`/`, `/login`, `/admin`, `/jury`) with back/forward history support |
| **Graphics** | HTML5 Canvas 2D | Dynamic certificate rendering with dual borders, stamps, and signatures |
| **Audio** | Web Audio API | Procedural sound synthesizer for UI clicks, alerts, warps, and chimes |
| **Persistence** | Browser `localStorage` | Client-side state persistence for teams, scores, schedules, and timers |

---

## 📁 Project Structure

```text
e:/hack/
├── public/
│   ├── assets/
│   │   ├── arunai_crest.png        # Official Arunai Engineering College crest
│   │   └── ncore_brochure_*.png    # Event brochure references
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── AdminControlCenter.jsx  # Floating admin modal controller
│   │   ├── CertificateCenter.jsx   # GPS verification & canvas certificate generator
│   │   ├── EventSchedule.jsx       # Public event schedule section
│   │   ├── Footer.jsx              # POINTERS contact information & footer
│   │   ├── GuidelinesSection.jsx   # Rules and guidelines display
│   │   ├── HeroSection.jsx         # Cinematic hero with read-only telemetry
│   │   ├── Leaderboard.jsx         # Standings modal component
│   │   ├── LoginModal.jsx          # Dual-purpose login modal & standalone page (/login)
│   │   ├── MeetTheJudges.jsx       # Evaluator and convener profiles
│   │   ├── Navbar.jsx              # Responsive header navigation
│   │   ├── ParticipantDashboard.jsx# Team workspace, milestones, and alerts
│   │   ├── PrizeSection.jsx        # Challenge tracks and honors section
│   │   ├── RegistrationModal.jsx   # 4-member registration wizard
│   │   └── ThemesSection.jsx       # Official hackathon domains grid
│   ├── context/
│   │   └── HackathonContext.jsx    # Central state, routing, auth, timers, & persistence
│   ├── data/
│   │   └── ncoreData.js            # Initial teams, schedule, judges, and domain data
│   ├── pages/
│   │   ├── AdminPage.jsx           # Dedicated Director Command Page (/admin)
│   │   └── JuryPage.jsx            # Dedicated Jury Scoring & Evaluation Page (/jury)
│   ├── utils/
│   │   └── audio.js                # Web Audio API sound generator
│   ├── App.jsx                     # Root application shell & route switcher
│   ├── index.css                   # Global Tailwind utilities and HUD styles
│   └── main.jsx                    # Vite React entry point
├── DOCUMENTATION.txt               # Full technical manual and data dictionary
├── package.json                    # Project dependencies and npm scripts
├── tailwind.config.js              # Tailwind design tokens and theme configuration
└── vite.config.js                  # Vite server and build configuration
```

---

## 🔑 Default Credentials Reference

| Role | Access URL | Username / Identity | Default Password / Passcode |
|---|---|---|---|
| **Hackathon Director** | `/admin` | `admin@ncore.in` | `admin123` *(or click one-click demo login)* |
| **Jury Evaluator** | `/jury` | Select Evaluator Profile | `jury123` *(or `ncore2026` / one-click demo)* |
| **Demo Team 1** | `/login` | `NCORE-T101` | Passkey: `NVG-9021-X` *(NeuralVanguard)* |
| **Demo Team 2** | `/login` | `NCORE-T102` | Passkey: `CGD-7814-K` *(CipherGrid)* |

> 💡 **Tip:** On the `/login` panel, double-tap the `v2.4.1` version badge in the bottom-right corner to toggle the **Committee Gateway** directly.

---

## ⚡ Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. Clone or navigate to the repository directory:
   ```bash
   cd e:/hack
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev -- --host 127.0.0.1 --port 3000
   ```

4. Open your browser and navigate to:
   - **Public Landing Page**: [http://localhost:3000/](http://localhost:3000/)
   - **Participant Login**: [http://localhost:3000/login](http://localhost:3000/login)
   - **Director Control Center**: [http://localhost:3000/admin](http://localhost:3000/admin)
   - **Jury Scoring Portal**: [http://localhost:3000/jury](http://localhost:3000/jury)

---

## 🏗️ Production Build

To build the optimized production bundle:

```bash
npm run build
```

This compiles optimized assets into the `dist/` directory in under 10 seconds. You can preview the production build locally with:

```bash
npm run preview
```

---

## 📞 Event & Organization Contacts

- **Institution**: Arunai Engineering College (An Autonomous Institution)  
  *Velu Nagar, Mathur, Tiruvannamalai – 606 603, Tamil Nadu, India*
- **Presented by**: **POINTERS** – Student Association & Dept. of Computer Science and Engineering
- **Helpline Numbers**: `+91 87789 70224` / `+91 91765 90993`
- **Official Email**: `pointers.csedept@gmail.com`
- **Web Portal**: [https://pointers-2026.vercel.app](https://pointers-2026.vercel.app)
- **Instagram**: [@pointers_cse](https://instagram.com/pointers_cse)

---

## 📄 License & Attribution

Developed for **NCORE 2026**. All rights reserved by **POINTERS** and the **Department of Computer Science and Engineering, Arunai Engineering College**.
