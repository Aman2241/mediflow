# MediFlow: AI-Powered Autonomous Patient Care Agent

MediFlow is a next-generation healthcare platform that combines **Real-Time Patient Monitoring** with **Agentic AI** to assist medical professionals. It processes high-frequency vital signs using Java Virtual Threads and uses Generative AI (RAG) to provide instant clinical insights.

![MediFlow Dashboard](/Users/rajpc/.gemini/antigravity/brain/708504e5-a2ac-4069-911f-5dae41a25e9d/mediflow_working_system_1768680182565.png)

## 🌐 Live Demo

| Service | URL | Status |
| :--- | :--- | :--- |
| **Frontend** | [https://mediflow-bice.vercel.app](https://mediflow-bice.vercel.app) | 🟢 Live |
| **Backend** | [https://mediflow-ikiv.onrender.com](https://mediflow-ikiv.onrender.com) | 🟢 Live |

## 🚀 Key Features

*   **Real-Time Vitals Engine**: Simulates and processes high-concurrency data streams (Heart Rate, BP) using **Java 21 Virtual Threads**.
*   **AI Clinical Assistant**: Integrated **Spring AI** agent that reasons about patient health + medical history.
*   **Interactive Dashboard**: A modern, dark-mode enabled Doctor's Console built with **Next.js 14** and **Tailwind CSS**.
*   **Resilient Architecture**: Fallback mechanisms for AI providers (Ollama/Mock) and Database (Postgres/H2).

## 🛠️ Tech Stack

### Backend
*   **Framework**: Spring Boot 3.4
*   **Language**: Java 21
*   **AI**: Spring AI (Ollama / OpenAI), RAG (Vector Store)
*   **Concurrency**: Virtual Threads (Project Loom)
*   **Communication**: WebSocket (STOMP)

### Frontend
*   **Framework**: Next.js 14 (App Router)
*   **Styling**: Tailwind CSS, Shadcn/UI
*   **State**: Real-time WebSocket subscriptions

## 📦 Installation & Running

### Prerequisites
*   Java 21+
*   Node.js 20+
*   Docker (Optional, for Vector DB features)

### 1. Start the Backend
The backend comes pre-configured with an **In-Memory H2 Database** for instant setup.

```bash
cd backend
./mvnw spring-boot:run
```
*Server starts on `http://localhost:8080`*

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
*UI accessible at `http://localhost:3000`*

## 🧪 Testing the System

1.  Open the Dashboard at `http://localhost:3000`.
2.  Click on a patient (e.g., **John Doe**) to enter the **Monitor Room**.
3.  Observe the **Live Stream Active** indicator turn Green.
4.  Ask the AI Assistant: *"Is the patient stable?"*

## 🐳 Docker Support (Advanced)
To enable full RAG capabilities with PostgreSQL + PGVector:
1.  Uncomment the `docker-compose` dependencies in `backend/pom.xml`.
2.  Run `docker-compose up -d` in the root directory.
3.  Restart the backend.

## 📄 License
MIT License - Copyright (c) 2026
