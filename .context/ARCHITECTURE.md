# Quiet Luxury - Project Architecture

## Technology Stack

- **Frontend (VanillaJS)**:
  - Location: `/frontend`
  - Technologies: HTML5, custom CSS3 (without frameworks/libraries such as Tailwind, Bootstrap, etc.), and modular Vanilla JavaScript.
  - Design: Premium, minimalist approach, optimized for both mobile and desktop devices.

- **Backend (Node.js)**:
  - Location: `/backend`
  - Technologies: Node.js, Express for building robust REST APIs.

- **Database (Supabase)**:
  - PostgreSQL database hosted on Supabase.
  - Secure interaction through the backend to prevent exposure of credentials and API keys.

## Proposed Directory Structure

```text
quiet-luxury/
├── .context/             # Project state storage
│   ├── CONTEXT.md
│   ├── ARCHITECTURE.md
│   └── TODO.md
├── frontend/             # Client-side code (VanillaJS, CSS, HTML)
└── backend/              # Server-side code (Node.js, Express)
```
