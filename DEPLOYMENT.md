# Deploying MediFlow to Production

This guide walks you through deploying MediFlow to a live environment using **Vercel** (Frontend) and **Render** (Backend).

## 1. Backend Deployment (Render)
Render offers a free tier for hosting Docker containers.

1.  Push your code to GitHub (You already did this!).
2.  Sign up at [render.com](https://render.com).
3.  Click **New +** -> **Blueprints**.
4.  Connect your GitHub repository (`mediflow`).
5.  Render will automatically detect the `render.yaml` file in your project root.
6.  Click **Apply**.
7.  Wait for the deployment to finish. Copy the **Service URL** (e.g., `https://mediflow-backend.onrender.com`).

**Note:** On the free tier, the backend will "sleep" after inactivity. It might take 50s to wake up on the first request.

## 2. Frontend Deployment (Vercel)
Vercel is the best place to host Next.js apps.

1.  Sign up at [vercel.com](https://vercel.com).
2.  Click **Add New...** -> **Project**.
3.  Import the `mediflow` repository.
4.  **Configure Project:**
    *   **Framework Preset**: Select **Next.js**.
    *   **Root Directory**: Click `Edit` and select `frontend`. **(Crucial Step!)**
5.  **Environment Variables:**
    *   **Settings** -> **Environment Variables**:
        *   `NEXT_PUBLIC_API_URL`: `https://your-render-url.onrender.com/api`
        *   `NEXT_PUBLIC_WS_URL`: `wss://your-render-url.onrender.com/ws-vitals`
        *   *(Note: The Domain is the SAME for both. Just change `https://` to `wss://` and append `/ws-vitals`)*
5.  Click **Deploy**.

## 3. Verify Live Site
Visit your Vercel URL (e.g., `https://mediflow.vercel.app`).
*   **Check Vitals:** Go to a patient page. The status should turn Green.
*   **Check AI:** Type a chat message. (Note: Only "Simulated Analysis" will work unless you configure OpenAI keys in the Backend Env variables on Render).
