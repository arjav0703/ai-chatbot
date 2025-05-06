<img src="https://cbseai.live/og.png" class="logo" width="300"/>

# CBSE AI

Your AI-powered study companion for CBSE Class 9 and 10 students in India.

Visit the live site: [cbseai.live](https://cbseai.live)

---

## Overview

CBSE AI is designed to help students of CBSE Class 9 and 10 get instant, reliable answers to their academic questions. Leveraging Gemini, it provides support across all subjects, anytime and anywhere[^1].

---

## Features

- **Instant Answers:** Get immediate, accurate responses to your questions across all CBSE subjects[^1].
- **24/7 Availability:** Access your study companion whenever you need help-day or night[^1].
- **Secure Authentication:** Sign in securely with Google using Auth.js and OAuth2.
- **Modern Tech Stack:** Built with Next.js and LangChain.js for a fast, interactive, and scalable experience.

---

## Tech Stack

- **Frontend \& Backend:** [Next.js](https://nextjs.org/) (A full stack Javascript framework)
- **AI Orchestration:** [LangChain.js](https://js.langchain.com/)
- **Authentication:** [Auth.js](https://authjs.dev/) with Google OAuth2
- **Deployment:** [Vercel](https://vercel.com/)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download) (v20+ recommended)
- A code editor ([Zed](https://zed.dev) reccomended)

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-org/cbse-ai-assistant.git
cd cbse-ai-assistant
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure environment variables:**
    - Copy `.env.example` to `.env.local`
    - Add all the required environment variables.

4. **Run the development server:**

```bash
npm run dev
```

5. **Open the app:**
    - Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Authentication

CBSE AI uses Auth.js with Google OAuth for secure, simple sign-in. You must set up your Google Cloud credentials and configure the callback URL as `http://localhost:3000/api/auth/callback/google` for development. For production, update the domain accordingly.

---

## Project Structure

- `app/` – Next.js application routes, layouts, and pages
- `app/page.tsx` – Main chat interface
- `app/api/chat/route.ts` – API route for handling chat and AI logic
- `components/` – UI components from [shadcn](https://ui.shadcn.com/)
- `lib/` – Services and custom tools
- `utils/` – Utility functions

---

## How It Works

- **Frontend:** Users interact with a chat interface built with React to submit questions.
- **Backend:** Questions are processed via LangChain.js, which orchestrates calls to the Gemini API and returns structured, relevant answers by utilizing a vector database called [Pinecone](https://pinecone.io).
- **Authentication:** Auth.js manages user sessions and Google OAuth integration for secure access.

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests to help improve the project.

---
## Acknowledgements

- [Next.js](https://nextjs.org/)
- [LangChain.js](https://js.langchain.com/)
- [Auth.js](https://authjs.dev/)
- [Gemini](https://gemini.google.com/)

---

Empowering every CBSE student with instant, personalized learning-anytime, anywhere.

<div style="text-align: center">⁂</div>

[^1]: https://cbseai.live
