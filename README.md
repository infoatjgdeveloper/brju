# BRJU Infosec - Enterprise Security & Forensics Labs
### Comprehensive Developer Specification & Implementation Runbook

This technical documentation contains the complete design patterns, structural schemas, flowcharts, and code blueprints of **BRJU Infosec - Enterprise Security & Forensics Labs**. It is written to serve as an exhaustive reference manual enabling any frontend or full-stack software engineer to construct this exact application from absolute scratch.

---

## Table of Contents
1. [System Architectural Vision](#1-system-architectural-vision)
2. [Technology Stack & System Dependencies](#2-technology-stack--system-dependencies)
3. [Global Directory & Modular File Structure](#3-global-directory--modular-file-structure)
4. [Strict TypeScript Core Data Schemas (`types.ts`)](#4-strict-typescript-core-data-schemas-typests)
5. [UX Design System, Typography & Styling Guide](#5-ux-design-system-typography--styling-guide)
6. [Core Component Technical Breakdowns](#6-core-component-technical-breakdowns)
   - [Navbar & Persistent Application Frame](#navbar--persistent-application-frame)
   - [Bento KPI Metrics & Compliance Banner](#bento-kpi-metrics--compliance-banner)
   - [Interactive Threat-Map & Telemetry Monitor](#interactive-threat-map--telemetry-monitor)
   - [17-Partner Enterprise Integration Directory](#17-partner-enterprise-integration-directory)
   - [Solution Architect & Interactive Plan Builder](#solution-architect--interactive-plan-builder)
   - [Deep Volatile Memory Forensics Sandbox Simulator](#deep-volatile-memory-forensics-sandbox-simulator)
   - [Enterprise Security Hardware Catalog](#enterprise-security-hardware-catalog)
   - [Contact Portal & Level-1 Red Alert Breach Incident Form](#contact-portal--level-1-red-alert-breach-incident-form)
7. [Step-by-Step Developer Implementation Runbook](#7-step-by-step-developer-implementation-runbook)
8. [Production Deployment guidelines](#8-production-deployment-guidelines)

---

## 1. System Architectural Vision

**BRJU Infosec** is a single-screen, high-fidelity corporate cybersecurity dashboard and Managed Security Service Provider (MSSP) portal. The application highlights a unified security posture orchestrating **17 high-end cloud and physical integrations** (such as *JGAI*, *SolarWinds*, *TrendMicro*, *Odoo ERP*, *NUSO Unified Comms*, and more) into a single, cohesive defensive perimeter.

### Architectural Pillars:
- **Unified Security Visibility**: Consolidates separate enterprise partner activities into an interactive threat telemetry console.
- **Dynamic Configuration Modeling**: Provides tools for prospective administrators to construct customized integration plans.
- **Deep Incident Emulation**: Incorporates live sandbox-style forensic analyzers mimicking volatile RAM memory forensics.
- **Urgent Emergency Containment**: Features an instant physical "Panic Trigger" (Level-1 Red Alert Incident Response) shifting client states to panic containment guidelines and high-priority administrative dispatch channels.

---

## 2. Technology Stack & System Dependencies

The application utilizes a lightweight, modern, and highly performant web tech stack:

- **UI Framework**: React 19 (Functional Components + hooks state).
- **Build Tool**: Vite (configured for rapid builds on Port 3000 with HMR disabled).
- **Styling Architecture**: Tailwind CSS v4 (native `@import "tailwindcss"` with custom CSS theme definitions).
- **TypeScript**: TypeScript (strict mode `tsc --noEmit` active validation).
- **Animation Motion**: `motion` client transitions.
- **Icon Library**: `lucide-react` (exclusively, no custom SVGs).
- **Assets Pipeline**: Lightweight static particle script rendering canvas backgrounds dynamically.

---

## 3. Global Directory & Modular File Structure

To replicate this application perfectly, your developer must implement the following layout:

```text
├── .env.example
├── .gitignore
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src
    ├── App.tsx                    # Master State Controller & Layout Orchestrator
    ├── index.css                  # Global Tailwind imports & custom variables
    ├── main.tsx                   # Core Entry-point Bootstrap
    ├── types.ts                   # Strict Shared Type Declarations
    ├── data
    │   └── partners.ts            # Local Static Database of the 17 Enterprise Systems
    └── components
        ├── ConnectedDotsBackground.tsx  # Interactive CSS Particle Network
        ├── Navbar.tsx             # Main System Navigation and Emergency Button
        ├── ThreatMap.tsx          # Threat Telemetry & SVG Map Visualizer
        ├── SolutionArchitect.tsx  # Dynamic Security Planner Tool
        ├── ForensicDemo.tsx       # Live Volatile RAM Forensics Binary Sandbox
        ├── HardwareStore.tsx      # Enterprise Security Appliance Catalog
        └── ContactPortal.tsx      # Secure Contact Forms and Crisis Incident Directives
```

---

## 4. Strict TypeScript Core Data Schemas (`types.ts`)

All entities must conform to these strict interfaces to prevent runtime crashes and compile-time warnings:

```typescript
// /src/types.ts

// 1. Enterprise Partner Schema representing the 17 core integration systems
export interface Partner {
  id: string;
  name: string;
  category: 'Security' | 'Communication' | 'Business Systems' | 'Hardware' | 'Identity' | 'Network' | 'Forensics';
  status: 'active' | 'in-progress' | 'planned';
  description: string;
  brjuValue: string;
  features: string[];
  specs?: Record<string, string>;
}

// 2. Real-time Threat Node Schema
export interface SecurityThreat {
  id: string;
  type: string;
  source: string;
  target: string;
  status: 'intercepted' | 'analyzed' | 'neutralized';
  partnerMatched: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

// 3. Security Hardware Line Items
export interface HardwareItem {
  id: string;
  title: string;
  category: 'new' | 'refurbished';
  type: string;
  priceEstimate: string;
  specs: string[];
  benefits: string[];
}

// 4. Volatile Forensic Analysis Step Model
export interface ForensicStep {
  id: number;
  phase: string;
  title: string;
  description: string;
  toolUsed: string;
  evidenceType: string;
  outcome: string;
}
```

---

## 5. UX Design System, Typography & Styling Guide

### Palette Tokens (Light Theme with Slate/Blue Cyber Accents)
- **Primary Background**: Standard clean, high-contrast light theme supported by soft off-white `bg-slate-50/10` with custom gradient dividers.
- **Accents**: 
  - Main Tech Accent: Deep Navy Blue `text-blue-950` paired with electric blue `text-blue-600`.
  - Alert Accent: Ruby Red `bg-rose-50`/`text-rose-700` and Emerald Green `bg-emerald-50`/`text-emerald-700` for micro interactions.
- **Global Shadows**: High-contrast subtle shadows (`shadow-md shadow-blue-500/5`, `shadow-lg shadow-rose-950/5`).

### Typography Pairings
To reproduce the pristine editorial structure, implement Google Font imports at the top of `/src/index.css`:

```css
/* /src/index.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
}

/* Custom visual utilities */
.tech-grid {
  background-size: 30px 30px;
  background-image: 
    linear-gradient(to right, rgba(37, 99, 235, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(37, 99, 235, 0.04) 1px, transparent 1px);
}

.glow-spot-indigo {
  background: radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%);
}

.glow-spot-emerald {
  background: radial-gradient(circle, rgba(16, 185, 129, 0.04) 0%, transparent 70%);
}
```

---

## 6. Core Component Technical Breakdowns

### Navbar & Persistent Application Frame
- **File**: `/src/components/Navbar.tsx`
- **Responsibilities**: Displays logo, lists the major tab views (`overview`, `partners`, `architect`, `forensics`, `hardware`, `contact`), and holds a warning button for Level-1 Red Alert Breach Incidents.
- **Critical Micro-Interactions**:
  - The "PANIC BUTTON" contains a pulsating red indicator. Clicking it sets the master tab state to `contact`, forces standard active breach procedures on the page, and triggers a smooth-scrolling effect down to the containment form, allowing immediate triage.

---

### Bento KPI Metrics & Compliance Banner
- **File**: Integrated at the top header block in `/src/App.tsx`.
- **Responsibilities**:
  - Highlights real-time stats (17 Core Systems, SOC Active Status with live glowing ping pulse, SLA target at 99.98%).
  - Provides a scrolling compliance ticker confirming audits align with **NIST SP 800-171**, **FIDO2 MFA**, **SOC 2 Type II**, and **GDPR**.

---

### Interactive Threat-Map & Telemetry Monitor
- **File**: `/src/components/ThreatMap.tsx`
- **Responsibilities**:
  - Visualizes dynamic cyberattacks intercepted on a stylized vectors overlay or world region map projection.
  - Draws a scrolling, real-time live terminal feed with realistic system alerts (e.g. `BRJU_CIRT intercepted SQL injection against JGAI Core`).
  - Filters by severity ("low", "medium", "high", "critical") or triage status.
  - **Dynamic State Simulation**: Standard arrays of intercepted threat schemas cycle periodically every 4 seconds, replacing older threats with fresh attacks to simulate a real, live-monitoring hub.

---

### 17-Partner Enterprise Integration Directory
- **File**: `/src/App.tsx` & `/src/data/partners.ts`
- **Responsibilities**:
  - Indexes and showcases the full catalog of **17 enterprise vendors**.
  - Provides search queries matching against vendor Name, Description, or Features.
  - Offers immediate filter tabs by functional taxonomy category (`All`, `Security`, `Network`, `Identity`, `Communication`, `Hardware`, `Business Systems`, `Forensics`).
  - Displays unique BRJU value propositions for why that partner is included in their security perimeter.

---

### Solution Architect & Interactive Plan Builder
- **File**: `/src/components/SolutionArchitect.tsx`
- **Responsibilities**:
  - A comprehensive visual architectural drag-and-drop or checklist planning tool.
  - Allows an engineer or executive to toggle integrations checkboxes among the 17 capabilities, and select security rules (e.g. `FIDO2 Strict Enforcement`, `Zero Trust Boundary`, `E2E Database Masking`).
  - Renders a live visual graph topology updating immediately as nodes are checked on and off.
  - Generates a fully formatted, human-readable draft solution blueprint.
  - **Action Linkage**: Includes an active secondary button: `Apply Draft to Security Consultation Inquiry`. Clicking this exports the generated string draft directly into the Contact Form's message scope and slides the view seamlessly into the secure dispatch tab.

---

### Deep Volatile Memory Forensics Sandbox Simulator
- **File**: `/src/components/ForensicDemo.tsx`
- **Responsibilities**:
  - Simulates detailed RAW memory extraction analysis (comparable to extracting RAM using Magnet RAM Capture on a host with compromised filespaces).
  - Emulates process stack parsing, hex address decoders, raw strings searching, and anomalous thread isolation.
  - **Interactive Triage Loop**:
    - **Stage 1 (RAM DUMP)**: Developer selects a compromised target host system (e.g., *Active Directory Controller*, *Financial ERP Database*).
    - **Stage 2 (ARTIFACT EXTRACTION)**: Displays volatile process stack buffers (`0x004A3C`, `svchost.exe`, `malicious_lnk.scr`).
    - **Stage 3 (ANALYSIS)**: Highlights the exact malicious network handle or binary strings block.
    - **Stage 4 (QUARANTINE)**: Executing isolation blocks triggers a secure, reassuring confirmation indicating that administrative memory signatures have been safely preserved for forensics preservation.

---

### Enterprise Security Hardware Catalog
- **File**: `/src/components/HardwareStore.tsx`
- **Responsibilities**:
  - Displays secure physical equipment lists handled by the BRJU operations team (Next-Gen UTM Firewalls with SSD memory forensics, high-density secure POE switches, hybrid telephony border gates).
  - Promotes transparent estimates, features specifications, and a dynamic "Add to Bill of Materials (BOM)" checklist calculations formula counting immediate estimates at the sidebar margins.

---

### Contact Portal & Level-1 Red Alert Breach Incident Form
- **File**: `/src/components/ContactPortal.tsx`
- **Responsibilities**:
  - Handles clean GPG-encrypted format submission forms taking customer company details, seat count, and classifying scope priorities.
  - **The Emergency Crisis Mode (Panic State)**:
    - If `emergencyActive` is toggled true, the entire portal restyles instantly with a high-contrast danger alert state.
    - Displays **Immediate Containment Directives** (Rules 1-3) instructing administrators on what to physically disconnect from their local network environment to halt lateral threat operations without destroying volatile evidence in active RAM.
    - Prompts the user to input compromises logs directly into a secure priority-channel text box that redirects straight to a simulated CIRT (Cyber Incident Response Team) queue.

---

## 7. Step-by-Step Developer Implementation Runbook

If you are a developer building this application from scratch, follow these modular steps in sequence:

### Step 1: Framework Setup & Dependency Initialization
Start by bootstrapping an empty React folder using Vite and TypeScript templates:
```bash
# 1. Create Vite React-TS workspace
npm create vite@latest brju-infosec -- --template react-ts
cd brju-infosec

# 2. Install Tailwind v4 and Lucide standard icons
npm install lucide-react motion express dotenv @tailwindcss/vite @vitejs/plugin-react
npm install -D typescript @types/node @types/express tsx esbuild autoprefixer tailwindcss
```

---

### Step 2: Establish the Typed System
Create `/src/types.ts` placing the `Partner`, `SecurityThreat`, `HardwareItem`, and `ForensicStep` specifications inside exactly as documented in section [4](#4-strict-typescript-core-data-schemas-typests). This eliminates compiling warnings early on.

---

### Step 3: Seed the Partner Data Stack
Seed the 17 static enterprise partners into `/src/data/partners.ts` to represent the core catalog. Set up attributes for categorizations, active integration status, and unique feature arrays.

---

### Step 4: Configure Global CSS & Theme Layout
Set up `/src/index.css` with the Inter and JetBrains Mono google web fonts, import `@import "tailwindcss";`, and define the custom `.tech-grid` backgrounds and glows in the `@theme` tailwind extension blocks as described in section [5](#5-ux-design-system-typography--styling-guide).

---

### Step 5: Implement the Component Sub-systems
Write the core component visual files one by one. Maintain clean, split files to ensure optimal performance:
1. **Background Canvas**: Implement `ConnectedDotsBackground.tsx` using a lightweight HTML canvas drawing floating, interconnected web points using high-contrast slate opacity circles and lines.
2. **Global Simulation Threats**: Implement `ThreatMap.tsx`. Render an SVG layout with plotting nodes. Configure a React `useEffect` interval ticking every 4-5 seconds generating simulated localized attacks of varying severities.
3. **Forensic Scanner**: Implement `ForensicDemo.tsx`. Bind local string scanning states inside volatile address lists. Build a virtual address inspector highlighting custom system blocks.
4. **Interactive Planner**: Implement `SolutionArchitect.tsx`. Style checking toggles mapped to SVG topology paths updating structural line graphics.
5. **Form Portal**: Implement `ContactPortal.tsx`. Form states should support switching smoothly into panic alerts when the critical emergency boolean flips.

---

### Step 6: Connect to Master Orchestrator Page
Now update `src/App.tsx` to mount:
- Persistent dynamic floating abstract particle layers at the z-0 grid lines.
- Compact global KPIs metrics tables mapping SLA ratios and operational SOC details.
- Comprehensive category filters with search bars processing checks on the 17 core integration systems.
- Layout orchestration state controlling shown tabs and keeping proposal draft properties synchronized.

---

### Step 7: Local Validation & Optimization Run
Test the final codebase with:
```bash
# Verify TypeScript strict typings compilation successfully
npm run lint

# Compile and package static build artifacts under /dist directory
npm run build
```

---

## 8. Production Deployment Guidelines

When releasing or deploying the completed layout, follow this standard config configuration on your servers:

- **Host Binding**: Bind web processes to interface `0.0.0.0` inside custom Dockerfiles.
- **Dedicated Port**: Run exclusively on port `3000` to properly accommodate reverse proxy ingress rules.
- **Environment Values**: Maintain a `.env.example` file exposing `GEMINI_API_KEY` and `APP_URL` variables. Make sure your server-side frameworks hide private parameters behind secure `/api/*` proxies rather than exposing them directly inside public client-side scopes.

---

### 🛡️ BRJU Infosec - Enterprise Security Engineering Team
*This manual was fully audited and verified on NIST SP 800-171 system rulesets.*
