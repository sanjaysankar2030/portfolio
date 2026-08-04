# Tremblenull Portfolio - Codebase Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Project Structure](#project-structure)
3. [Technologies & Dependencies](#technologies--dependencies)
4. [Components Reference](#components-reference)
5. [Pages & Routing](#pages--routing)
6. [Component Usage in page.tsx](#component-usage-in-pagetsx)
7. [Styling & Theme System](#styling--theme-system)
8. [Key Features & Functionality](#key-features--functionality)
9. [Data Flow](#data-flow)

---

## Project Overview

**Project Name:** Tremblenull (Dev Portfolio)  
**Type:** Modern Developer Portfolio Website  
**Framework:** Next.js 16.1.6  
**Styling:** Tailwind CSS v4  
**Language:** TypeScript + React 19  
**Deployment:** Cloudflare Pages

This is a personal developer portfolio built with Next.js that showcases professional background, technical skills, projects, experience, and social connections. The portfolio features a unique dual-mode interface (Human & Agent modes) with smooth animations, dark/light theme support, and responsive design.

---

## Project Structure

```
tremblenull/
├── app/
│   ├── components/                 # Reusable React Components
│   │   ├── ExperienceItem.tsx      # Experience section component
│   │   ├── GithubGraph.tsx         # GitHub contribution calendar
│   │   ├── ProfileImage.tsx        # Profile image with zoom
│   │   ├── TechStack.tsx           # Tech skills showcase
│   │   └── ThemeToggle.tsx         # Dark/Light mode toggle
│   │
│   ├── data/
│   │   └── content.ts              # Markdown content data
│   │
│   ├── layout.tsx                  # Root layout with theme provider
│   ├── page.tsx                    # Main portfolio page (40KB - core logic)
│   ├── providers.tsx               # Theme provider setup
│   ├── globals.css                 # Global styles
│   ├── sitemap.ts                  # SEO sitemap
│   ├── robots.ts                   # SEO robots configuration
│   └── favicon.ico                 # Favicon
│
├── public/                         # Static assets
│   ├── 178389178.png              # Profile image (high quality)
│   ├── 178389178.jfif             # Profile image (JPEG version)
│   └── llm.txt                     # Custom asset
│
├── .vscode/                        # VSCode configuration
├── package.json                    # Dependencies & scripts
├── tsconfig.json                   # TypeScript configuration
├── next.config.ts                  # Next.js configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.mjs              # PostCSS configuration
└── eslint.config.mjs               # ESLint configuration
```

---

## Technologies & Dependencies

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| **next** | 16.1.6 | React framework for production |
| **react** | 19.2.3 | UI library |
| **react-dom** | 19.2.3 | React DOM rendering |
| **framer-motion** | 12.29.2 | Animation library for smooth transitions |
| **next-themes** | 0.4.6 | Dark/Light mode theme management |
| **lucide-react** | 0.563.0 | Icon library (comprehensive SVG icons) |
| **react-icons** | 5.5.0 | Alternative icon library (FaXTwitter, CgFileDocument, SiLeetcode) |
| **react-github-calendar** | 5.0.5 | GitHub contribution calendar widget |
| **qrcode.react** | 4.2.0 | QR code generation |

### Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| **typescript** | 5 | Type safety |
| **tailwindcss** | 4 | Utility-first CSS framework |
| **@tailwindcss/postcss** | 4 | Tailwind CSS PostCSS plugin |
| **eslint** | 9 | Code linting |
| **@cloudflare/next-on-pages** | 1.13.16 | Cloudflare Pages deployment |

### npm Scripts

```json
{
  "dev": "next dev",                    // Start dev server (localhost:3000)
  "build": "next build",                // Production build
  "start": "next start",                // Start production server
  "lint": "eslint"                      // Run ESLint
}
```

---

## Components Reference

### 1. ThemeToggle Component

**File:** `app/components/ThemeToggle.tsx`

**Purpose:** Toggles between dark and light themes with smooth animation.

**Props:** None

**Features:**
- Uses `next-themes` for persistent theme management
- Shows/hides Sun and Moon icons based on current theme
- Smooth transition animation (500ms)
- Animated button with hover effect
- Prevents hydration mismatch with mounted state check

**Usage Pattern:**
```jsx
<ThemeToggle />
```

**Styling:** 
- Button: `h-8 w-14` rounded-full
- Toggle circle: `h-6 w-6` with `translate-x-6` when dark
- Icons: Sun (orange-400) and Moon (white fill)

**Technical Details:**
- Client-side component (`"use client"`)
- Uses `useTheme` hook from `next-themes`
- Handles SSR hydration with `useState(false)` check

---

### 2. ExperienceItem Component

**File:** `app/components/ExperienceItem.tsx`

**Purpose:** Reusable component for displaying work experience, education, or project details with optional collapsible content.

**Props:**
```typescript
interface ExperienceItemProps {
    title: string;              // Main heading (e.g., "Company Name")
    role: string;               // Subtitle (e.g., "Full Stack Intern")
    children: React.ReactNode;  // Content to display
    collapsible?: boolean;      // Enable expand/collapse (default: false)
    link?: string;              // Optional external link
    collapsedHeight?: string;   // Max height when collapsed (default: "max-h-20")
}
```

**Features:**
- Collapsible/expandable sections with smooth animations
- Optional external link with icon
- Gradient fade-out effect when collapsed
- Chevron icon that rotates on toggle
- Responsive layout (stacks vertically on mobile, horizontal on desktop)

**Usage Example:**
```jsx
<ExperienceItem 
  title="Infotact Software Solutions" 
  role="Full Stack Java Intern"
  collapsible={true}
  link="https://example.com"
>
  <p>Job description content here...</p>
</ExperienceItem>
```

**Styling:**
- Title: `font-medium text-black dark:text-white`
- Role: `text-sm text-gray-400 dark:text-gray-500`
- Content: `text-sm leading-relaxed text-gray-500 dark:text-gray-400`
- Toggle button: `text-xs font-medium text-gray-400 dark:text-gray-500`

---

### 3. TechStack Component

**File:** `app/components/TechStack.tsx`

**Purpose:** Interactive tech skills showcase with collapsible expanded view.

**Props:** None

**Features:**
- **Collapsed State:** Horizontal marquee animation scrolling through all technologies
- **Expanded State:** Grid layout organized by categories
- Categories include:
  - Languages (Java, Go, C, Python, JavaScript)
  - Backend & DB (Spring Boot, Spring Web, Spring Security, Thymeleaf)
  - Databases (MySQL, MongoDB, SQLite, Hibernate)
  - Infra & Tools (Docker, AWS, Swagger, Postman, CloudFlare, Git)
  - AI & ML (TensorFlow, PyTorch, Pandas)

**Features:**
- 5 skill categories with 3-6 technologies each
- Uses Simple Icons CDN for tech logos
- Pulsing animated button with chevron
- Smooth transitions between states (300ms)
- Hover effects on tech items with opacity changes
- Marquee animation loops infinitely when collapsed

**Technical Details:**
- Client-side component with useState for expand/collapse
- Uses `framer-motion` AnimatePresence for smooth transitions
- Icons sourced from `https://cdn.simpleicons.org/`
- Responsive grid: `grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3`

**Animation Keyframes (CSS):**
```css
@keyframes infinite-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
}

@keyframes thick-pulse {
  0%, 100% { border-width: 2.5px; opacity: 1; }
  50% { border-width: 2.5px; opacity: 0.7; }
}
```

---

### 4. GithubGraph Component

**File:** `app/components/GithubGraph.tsx`

**Purpose:** Displays GitHub contribution calendar (GitHub profile activity graph).

**Props:** None

**Features:**
- Renders GitHub contribution calendar for username: `sanjaysankar2030`
- Automatically adapts to current theme (dark/light)
- Responsive with horizontal scrolling on mobile
- Uses `react-github-calendar` library
- Configuration:
  - blockSize: 10px
  - blockMargin: 4px
  - fontSize: 12px

**Styling:**
- Container: `overflow-x-auto pb-4 scrollbar-hide`
- Calendar centered with responsive padding

**Technical Details:**
- Client-side component with hydration check
- Uses `useTheme` hook to detect current theme
- Prevents server-side rendering mismatch

---

### 5. ProfileImage Component

**File:** `app/components/ProfileImage.tsx`

**Purpose:** Profile picture with zoom/lightbox functionality.

**Props:** None (Hardcoded to use `/178389178.png`)

**Features:**
- Clickable profile image to zoom
- Lightbox modal overlay when clicked
- Disabled right-click context menu (prevents image save)
- Smooth zoom animation on hover
- Responsive sizing:
  - Mobile: `h-40 w-40`
  - Tablet: `sm:h-52 sm:w-52`
  - Desktop: `md:h-64 md:w-64`
- Close button: `[ X ]` in top-right corner
- Semi-transparent backdrop blur

**Styling:**
- Rounded corners: `rounded-4xl`
- Hover scale: `group-hover:scale-105`
- Modal backdrop: `bg-black/80 backdrop-blur-md`
- Image container: `w-[85vw] h-[85vh] max-w-3xl max-h-3xl`

**Technical Details:**
- Uses Next.js Image component (optimized)
- Priority loading for above-the-fold display
- Click outside modal closes it
- Context menu prevented on both image and modal

---

## Pages & Routing

### Main Page (page.tsx)

**File:** `app/page.tsx`

**Route:** `/` (root/home page)

**Size:** ~40KB (largest file in the application)

**Type:** Client-side component (`"use client"`)

**Primary Purpose:** Main portfolio display with dual-mode interface

**Key Sections:**

| Section ID | Content | Height | Position |
|-----------|---------|--------|----------|
| `#intro` | Profile image + intro text | Dynamic | Top |
| `#about` | About/bio section | Dynamic | Below intro |
| `#projects` | Project showcase | Dynamic | Middle |
| `#experience` | Work experience | Dynamic | Lower middle |
| `#contact` | Contact information & social | Dynamic | Bottom |

---

## Component Usage in page.tsx

### Import Statements

```typescript
// 1. Next.js & React
import Image from "next/image";
import { useState, useEffect } from "react";

// 2. Theme Management
import { useTheme } from "next-themes";

// 3. Icons - Lucide React (Primary)
import { 
  Github, Linkedin, Youtube, Calendar, Bot, User, 
  QrCode, X, ArrowRight, ChevronDown, ChevronUp 
} from "lucide-react";

// 4. Icons - React Icons (Alternative)
import { FaXTwitter } from "react-icons/fa6";
import { CgFileDocument } from "react-icons/cg";
import { SiLeetcode } from "react-icons/si";

// 5. Animation Library
import { motion, AnimatePresence } from "framer-motion";

// 6. QR Code Generation
import { QRCodeSVG } from "qrcode.react";

// 7. Custom Components
import { ExperienceItem } from "./components/ExperienceItem";
import { GithubGraph } from "./components/GithubGraph";
import { TechStack } from "./components/TechStack";
import { ThemeToggle } from "./components/ThemeToggle";
import ProfileImage from './components/ProfileImage';

// 8. Data
import { getMarkdownContent } from "./data/content";

// 9. Custom SVG Icon
const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
  // Inline Discord SVG
);
```

### Component Usage in Page Structure

#### 1. **ProfileImage Component** (Line 157-161)

**Location:** Intro section  
**Usage:** Clickable profile picture with zoom modal

```jsx
<div className="relative h-40 w-40 sm:h-52 sm:w-52 md:h-64 md:w-64 overflow-hidden flex-shrink-0 rounded-4xl">
  <ProfileImage />
</div>
```

**Styling Context:**
- Wrapped in a container with responsive sizing
- Rounded corners and flex-shrink
- Part of intro section with side-by-side layout

---

#### 2. **ThemeToggle Component** (Line 106 & 543)

**Locations:** 
- Top-right mobile bar (Line 106)
- Left sidebar on desktop (Line 543)

**Usage in Mobile (Line 105-107):**
```jsx
<div className="sm:hidden">
  <ThemeToggle />
</div>
```

**Usage in Desktop Left Sidebar (Line 543):**
```jsx
<nav className="fixed left-6 top-1/2 z-50 hidden lg:flex -translate-y-1/2 flex-col...">
  <div className="flex items-center gap-6">
    <ThemeToggle />
  </div>
  {/* Social links follow */}
</nav>
```

**Positioning:**
- Mobile: Fixed top-right (hidden on `sm:hidden`)
- Desktop: Fixed left sidebar (hidden on screens < lg)

---

#### 3. **TechStack Component** (Line ~280-285)

**Location:** About/Skills section  
**Parent ID:** `#about`

**Usage:**
```jsx
<section id="about" className="w-full space-y-8 scroll-mt-28">
  <h2 className="text-xl font-bold text-black dark:text-white">
    Tech Stack
  </h2>
  <TechStack />
</section>
```

**Styling Context:**
- Part of larger "about" section
- Has dedicated heading
- Full width with animations

---

#### 4. **GithubGraph Component** (Line ~310-315)

**Location:** About section, after Tech Stack  
**Usage:**
```jsx
<div className="space-y-4">
  <h3 className="text-sm font-semibold text-black dark:text-white">
    My GitHub Activity
  </h3>
  <GithubGraph />
</div>
```

**Styling Context:**
- Follows tech stack in about section
- Has explanatory heading
- Uses responsive container

---

#### 5. **ExperienceItem Component** (Multiple instances, Line ~380-420)

**Location:** Experience section (`#experience`)  
**Usage:** Repeating component for each job/experience

**Example Instance 1 - Infotact (Line ~380-395):**
```jsx
<ExperienceItem 
  title="Infotact Software Solutions" 
  role="Full Stack Java Intern"
  collapsible={true}
  link="https://infotact.com"
>
  <p>Architected and maintained enterprise-grade web applications...</p>
  <p>Designed, documented, and exposed clean RESTful APIs...</p>
  <p>Streamlined development workflows...</p>
  <p>Monitored and optimized data persistence layers...</p>
</ExperienceItem>
```

**Example Instance 2 - Cognifiz (Line ~400-420):**
```jsx
<ExperienceItem 
  title="Cognifiz Solutions" 
  role="Machine Learning Intern"
  collapsible={true}
>
  <p>Developed, trained, and deployed predictive systems...</p>
  <p>Conducted exploratory data analysis (EDA)...</p>
  <p>Fine-tuned supervised and unsupervised learning models...</p>
  <p>Collaborated with core engineering teams...</p>
</ExperienceItem>
```

**Key Properties:**
- `collapsible={true}` - enables expand/collapse
- `link` property - optional for company websites
- Children contain markdown-style experience descriptions

---

### Page State Management

**State Variables in page.tsx:**

```typescript
// Time display - updated every second
const [time, setTime] = useState<string>("");

// QR code modal visibility
const [showQR, setShowQR] = useState(false);

// Dual-mode toggle (human vs agent)
const [mode, setMode] = useState<"human" | "agent">("human");

// Command text animation
const [command, setCommand] = useState("javac");
```

**Effects:**

1. **Time Update Effect (Line 35-51)**
   - Updates IST time every second
   - Format: "HH:mm A" (12-hour format)
   - Used for markdown content generation

2. **Command Animation Effect (Line 56-66)**
   - Cycles through different shell commands every 2.5 seconds
   - Commands: javac, tcc -run, python3, go run, mvn spring-boot:run, mysql, make run

---

### Mode Toggle (Human vs Agent)

**Human Mode:**
- Standard portfolio view
- Component-based sections
- Visual layout
- Navbar and sidebar visible
- Social links visible

**Agent Mode:**
- Markdown text view
- Pre-formatted monospace font
- Dynamic content from `getMarkdownContent(time)`
- Cleaner, more technical presentation
- Same information, different format

**Toggle Button (Line 109-126):**
```jsx
<button
  onClick={() => setMode(mode === "human" ? "agent" : "human")}
  className="group relative flex h-7 w-12 cursor-pointer rounded-full..."
  role="switch"
  aria-checked={mode === "agent"}
>
  <div className={`... ${mode === "agent" ? "translate-x-5" : "translate-x-0"}`}>
    {mode === "human" ? (
      <User className="h-3 w-3 text-black" />
    ) : (
      <Bot className="h-3 w-3 text-black" />
    )}
  </div>
</button>
```

---

### Navigation & Scroll Behavior

**Desktop Navbar (Line 81-100):**
- Fixed at top-center
- Hidden on mobile (`hidden sm:flex`)
- Smooth scroll to sections via `handleScroll` function
- Navigation links: Intro, About, Projects, Experience, Contact

**Scroll Handler (Line 69-75):**
```typescript
const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
  e.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
```

**Desktop Left Sidebar (Line 541-597):**
- Fixed on left at 50% vertical center
- Hidden on screens smaller than `lg`
- Includes: Theme toggle + social links
- Social platforms: GitHub, LinkedIn, Twitter/X, Resume, LeetCode

**Mobile Social Bar (Line 599-620):**
- Horizontal row at bottom
- Visible only on mobile (`flex lg:hidden`)
- QR code button (instead of YouTube link)

---

### Section-by-Section Component Integration

#### 1. **Intro Section (#intro)**
- **Components Used:** ProfileImage
- **Content:** Name, title, brief introduction
- **Layout:** Flex column on mobile, row on desktop

#### 2. **About Section (#about)**
- **Components Used:** TechStack, GithubGraph, ExperienceItem (for education/certifications)
- **Content:** Bio, tech stack, GitHub activity, education details
- **Layout:** Full width with spaced sections

#### 3. **Projects Section (#projects)**
- **Components Used:** ExperienceItem (repurposed for projects)
- **Content:** Project descriptions with links and tech stacks
- **Layout:** Stacked vertical sections

#### 4. **Experience Section (#experience)**
- **Components Used:** ExperienceItem (primary use)
- **Content:** Work experiences and internships
- **Layout:** Stacked collapsible sections

#### 5. **Contact Section (#contact)**
- **Components Used:** None (custom social links)
- **Content:** Email, LinkedIn, social media links
- **Layout:** Desktop sidebar + mobile social row

---

## Styling & Theme System

### Tailwind CSS Configuration

**Theme Colors:**
- Light Mode: White background, black text
- Dark Mode: Black/zinc background, white text

**Responsive Breakpoints:**
- `sm:` (640px+)
- `md:` (768px+)
- `lg:` (1024px+)

**Custom Animations (in tailwind config):**

```css
/* Scrolling marquee animation */
@keyframes infinite-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
}

/* Pulsing border animation */
@keyframes thick-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

### Next-Themes Integration

**Provider Setup (layout.tsx, Line 28-34):**
```jsx
<ThemeProvider 
  attribute="class" 
  defaultTheme="dark" 
  enableSystem={false}
>
  {children}
</ThemeProvider>
```

**Key Settings:**
- `attribute="class"` - toggles `dark` class on `<html>`
- `defaultTheme="dark"` - starts in dark mode
- `enableSystem={false}` - ignores OS preference
- Persistent storage in localStorage

### Global Styles (globals.css)

**Key CSS Variables:**
```css
--background: white;
--foreground: black;
--accent: [theme-specific colors]
```

**Dark Mode Selectors:**
```css
.dark {
  --background: black;
  --foreground: white;
  /* Additional dark mode variables */
}
```

**Utility Classes:**
- `selection:bg-foreground` - custom text selection
- `transition-colors duration-300` - smooth theme transitions
- `backdrop-blur-md` - frost glass effects

---

## Key Features & Functionality

### 1. **Dual-Mode Interface**

**Human Mode:**
- Visual component-based design
- Typical portfolio layout
- Interactive navigation
- Professional presentation

**Agent Mode:**
- Markdown text presentation
- Monospace font styling
- Real-time timestamp
- Developer-friendly format

**Implementation:**
- `AnimatePresence` + `motion` for smooth transitions
- 350ms transition duration
- Framer Motion animations

---

### 2. **Dark/Light Theme Toggle**

**Features:**
- Persistent theme storage (localStorage)
- System-wide application
- Smooth 300ms transitions
- Animated toggle button
- Different styles for day/night modes

**Implementation:**
- `next-themes` library
- `useTheme()` hook
- CSS dark mode selectors

---

### 3. **Responsive Design**

**Breakpoints:**
- Mobile (< 640px): Single column, mobile navbar hidden
- Tablet (640px - 1024px): Flexible layout
- Desktop (> 1024px): Full sidebar, additional features

**Mobile Optimizations:**
- Stacked layout
- Bottom social bar
- Hidden desktop elements
- Optimized image sizes

**Desktop Features:**
- Left sidebar
- Top navbar
- Expanded sections
- Side-by-side layouts

---

### 4. **Smooth Animations**

**Framer Motion Usage:**
- Page transitions (human/agent mode)
- Section reveals on scroll
- Hover effects
- Modal overlays (QR code)

**CSS Animations:**
- Marquee scrolling (tech stack)
- Pulse effects (button borders)
- Smooth color transitions
- Hover scale transforms

---

### 5. **QR Code Modal**

**Functionality:**
- QR code for portfolio URL
- Modal overlay with backdrop blur
- Click outside to close
- Smooth entrance/exit animations
- Mobile-friendly sizing

**Technical Details:**
- Uses `qrcode.react` library
- `QRCodeSVG` component
- Guarded window access with typeof check

---

### 6. **SEO Optimization**

**Files:**
- `sitemap.ts` - XML sitemap generation
- `robots.ts` - robots.txt configuration
- Metadata in `layout.tsx` - title and description

**Meta Tags:**
- Title: "Sanjay Sankar"
- Description: "All about me"
- Language: "en"

---

### 7. **GitHub Integration**

**GithubGraph Component:**
- Displays contribution calendar
- Authenticated or public access
- Theme-aware rendering
- Responsive scrolling

**Social Links:**
- Direct GitHub profile link
- Consistent across modes
- Icon-based buttons

---

## Data Flow

### Content Generation Flow

```
page.tsx
  └─ useTheme()
       └─ theme state (dark/light)
  
  └─ useState (time, showQR, mode, command)
       └─ useEffect (update every 1s/2.5s)
  
  └─ getMarkdownContent(time)
       └─ Formats content.ts data
  
  └─ Components (ProfileImage, TechStack, etc.)
       └─ Render based on mode (human/agent)
```

### State Update Timeline

1. **Component Mount**
   - Initialize state variables
   - Set up effects

2. **Every 1 Second**
   - Update time display
   - Regenerate markdown if in agent mode

3. **Every 2.5 Seconds**
   - Cycle command text animation

4. **On User Interaction**
   - Toggle mode (human ↔ agent)
   - Toggle theme (dark ↔ light)
   - Open/close QR modal
   - Expand/collapse sections

---

### Component Hierarchy

```
RootLayout
  └─ ThemeProvider (next-themes)
       └─ page.tsx (main page component)
            ├─ Desktop Navbar (navigation)
            │
            ├─ Mode/Theme Toggle Buttons
            │
            ├─ AnimatePresence
            │  ├─ Human Mode
            │  │  ├─ ProfileImage (intro)
            │  │  ├─ TechStack (about)
            │  │  ├─ GithubGraph (about)
            │  │  ├─ ExperienceItem[] (experience)
            │  │  └─ Social Links (contact)
            │  │
            │  └─ Agent Mode
            │     └─ Pre-formatted Markdown
            │
            ├─ QR Modal (conditional)
            │
            ├─ Desktop Left Sidebar
            │  ├─ ThemeToggle
            │  └─ Social Links
            │
            └─ Mobile Social Bar
               ├─ Social Links
               └─ QR Button
```

---

## File Dependencies & Relationships

### Dependency Tree

```
page.tsx (main)
  ├─ requires: ExperienceItem.tsx
  ├─ requires: GithubGraph.tsx
  ├─ requires: TechStack.tsx
  ├─ requires: ThemeToggle.tsx
  ├─ requires: ProfileImage.tsx
  ├─ requires: content.ts (data)
  ├─ depends: useTheme (next-themes)
  ├─ depends: motion (framer-motion)
  └─ depends: Multiple icon libraries

layout.tsx (root)
  ├─ provides: metadata
  ├─ loads: DM_Sans font
  ├─ requires: ThemeProvider (providers.tsx)
  └─ renders: children (page.tsx)

providers.tsx
  ├─ exports: ThemeProvider component
  └─ wraps: NextThemesProvider

content.ts
  ├─ exports: getMarkdownContent function
  └─ imported by: page.tsx
```

---

## Common Patterns & Best Practices Used

### 1. **Client-Side Components**
- All interactive components use `"use client"`
- Prevents server-side rendering issues
- Enables hooks usage

### 2. **Hydration Safety**
- Components check `mounted` state before rendering
- Prevents hydration mismatches
- Common in theme-aware components

### 3. **Responsive Design**
- Tailwind breakpoints for responsive layouts
- Mobile-first approach
- Hidden/shown elements per breakpoint

### 4. **Animation Best Practices**
- Framer Motion for complex animations
- CSS animations for simple transitions
- `AnimatePresence` for mounting/unmounting
- Smooth 300-500ms durations

### 5. **Accessibility**
- Semantic HTML tags
- ARIA labels on interactive elements
- Proper link rel attributes
- Keyboard-friendly navigation

### 6. **Performance**
- Next.js Image optimization
- Lazy loading for tech stack icons
- Code splitting via dynamic imports
- Efficient state management

---

## Component Communication

### Theme State Sharing

```
layout.tsx (ThemeProvider)
  ↓ provides via context
page.tsx (useTheme hook)
  ↓ passes theme to
├─ ThemeToggle (reads/writes theme)
├─ GithubGraph (reads theme)
└─ ProfileImage (reads theme via TailwindCSS dark: selector)
```

### Content Data Flow

```
content.ts (static data)
  ↓ exported function
page.tsx (getMarkdownContent)
  ↓ uses time state
Agent Mode (displays formatted content)
```

### Animation Coordination

```
page.tsx (AnimatePresence wrapper)
  ├─ Human Mode Section (motion.main)
  │  ├─ ProfileImage (internal state)
  │  ├─ TechStack (internal animations)
  │  ├─ GithubGraph (loaded state)
  │  └─ ExperienceItem[] (individual states)
  │
  └─ Agent Mode Section (motion.main)
     └─ Markdown preview
```

---

## Configuration Files Summary

### next.config.ts
- Next.js app configuration
- Image optimization settings
- Build configuration

### tailwind.config.js
- Theme colors and sizes
- Custom animations
- Responsive breakpoints

### tsconfig.json
- TypeScript strict mode
- Path aliases (if any)
- Compiler options

### postcss.config.mjs
- Tailwind CSS PostCSS plugin
- CSS processing pipeline

### eslint.config.mjs
- Code quality rules
- TypeScript support
- React hooks validation

---

## Performance Metrics

### Build Stats
- Main page: ~40KB (page.tsx)
- Components: ~5KB (combined)
- Total bundle: Optimized by Next.js

### Loading Performance
- Lazy-loaded images
- Deferred icon loading (CDN)
- Code splitting by route
- Optimized animations (GPU-accelerated)

### Runtime Performance
- Efficient state management
- Memoized components (where needed)
- Smooth 60fps animations
- Minimal re-renders

---

## Browser Compatibility

**Supported Browsers:**
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

**Technologies:**
- CSS Grid & Flexbox
- CSS Custom Properties (dark mode)
- ES2020+ JavaScript
- Modern React 19 features

---

## Deployment

**Platform:** Cloudflare Pages

**Build Process:**
1. `npm run build` - Next.js production build
2. Cloudflare Pages detects build output
3. Deploys to global CDN
4. Automatic HTTPS + caching

**Environment:**
- Node.js 18+ required
- @cloudflare/next-on-pages adapter used
- Serverless functions support

---

## Future Enhancement Opportunities

1. **Performance:**
   - Image optimization with WebP
   - Service Worker for offline support
   - Critical CSS extraction

2. **Features:**
   - Blog section with MDX
   - Project showcase with filters
   - Contact form with backend
   - Analytics integration

3. **Accessibility:**
   - Keyboard navigation enhancements
   - Screen reader optimization
   - WCAG 2.1 AA compliance

4. **Styling:**
   - Additional theme options
   - Animation performance options
   - Print-friendly styles

5. **Content:**
   - Multi-language support
   - Dynamic content loading
   - API-driven data

---

## Troubleshooting Guide

### Common Issues

**Theme not persisting:**
- Check localStorage in browser DevTools
- Verify `next-themes` provider setup in layout.tsx

**Components not rendering:**
- Check `mounted` state in client components
- Verify imports are correct
- Check console for errors

**Animations janky/slow:**
- Reduce animation complexity
- Use `will-change` CSS property
- Profile with Chrome DevTools

**Images not loading:**
- Verify image paths in public folder
- Check Next.js Image component config
- Ensure alt text is present

**Mobile layout broken:**
- Check responsive classes (sm:, md:, lg:)
- Verify viewport meta tag
- Test with actual device

---

## Additional Resources

### External Libraries
- [Next.js Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Guide](https://www.framer.com/motion)
- [next-themes Documentation](https://github.com/pacocoursey/next-themes)

### Icon Resources
- [Lucide React Icons](https://lucide.dev)
- [React Icons](https://react-icons.github.io/react-icons)
- [Simple Icons CDN](https://simpleicons.org)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Current | Initial portfolio release |
| - | - | Theme toggle, dual-mode interface, responsive design |

---

## Contact & Support

**Developer:** Sanjay Sankar  
**Email:** sanjaysankar2030@gmail.com  
**LinkedIn:** linkedin.com/in/sankarsanjay  
**GitHub:** github.com/sanjaysankar2030  
**Twitter/X:** @tremblenull

---

**Documentation Version:** 1.0  
**Last Updated:** 2026  
**Status:** Complete & Maintained
