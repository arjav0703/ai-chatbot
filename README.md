<img src="https://cbseai.live/og.png" class="logo" width="300"/>

# 🎓 CBSE AI

Your AI-powered study companion for CBSE Class 9 and 10 students in India.

🌐 Visit the live site: [cbseai.live](https://cbseai.live)

---

## 🧠 Overview

CBSE AI is designed to help students of CBSE Class 9 and 10 get instant, reliable answers to their academic questions. Leveraging Gemini, it provides support across all subjects, anytime and anywhere[^1].

---

## ✨ Features

- ⚡ **Instant Answers:** Get immediate, accurate responses to your questions across all CBSE subjects[^1].
- 🌙 **24/7 Availability:** Access your study companion whenever you need help — day or night[^1].
- 🚀 **Optimization at its peak:** Built with Next.js and LangChain.js for a fast, interactive, and scalable experience.

---

## 🛠️ Tech Stack

| Layer             | Technology Used                   |
|------------------|-----------------------------------|
| 🌐 Frontend      | [Next.js](https://nextjs.org/)    |
| 🧠 AI Logic       | [LangChain.js](https://js.langchain.com/) |
| 🔐 Auth           | [Auth.js](https://authjs.dev/) with Google OAuth |
| 📦 Deployment     | [Vercel](https://vercel.com/)     |
| 🧭 Vector DB      | [Pinecone](https://www.pinecone.io) |
| 🤖 AI Model       | [Gemini](https://gemini.google.com/) |
---

## 🧭 Architecture Diagram

```text
+---------+       +----------------+       +-------------+
| Browser | <---> | Next.js Server | <---> | LangChain.js|
+----+----+       +--------+-------+       +------+------+
     |                     |                      |
     |     Auth.js +       |                      |
     |  Google OAuth2      |                      |
     |                     |                      |
     |             +-------v-------+       +------v------+
     |             |    Gemini     | <---> |  Pinecone   |
     |             +---------------+       +-------------+
```

## 🗂️ Project Structure
app/ – Next.js application routes, layouts, and pages

app/page.tsx – Main chat interface

app/api/chat/route.ts – API route for handling chat and AI logic

components/ – UI components from shadcn/ui

## 🏁 Getting Started

### ✅ Prerequisites

- [📦 Node.js](https://nodejs.org/en/download) (v20+ recommended)
- 🧑‍💻 A code editor ([Zed](https://zed.dev) recommended)

### ⚙️ Installation

1. **📥 Clone the repository:**

```bash
git clone https://github.com/your-org/cbse-ai-assistant.git
cd cbse-ai-assistant
