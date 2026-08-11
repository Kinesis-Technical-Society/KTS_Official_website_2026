# 🚀 KTS Official Website - Full Deployment Guide (100% Free)

This guide provides step-by-step instructions to deploy the **Kinesis Technical Society (KTS)** official website using 100% free hosting services with zero lag and custom domain setup.

---

## 🛠️ Infrastructure Overview

| Layer | Platform | Free Plan Feature |
| :--- | :--- | :--- |
| **Frontend** | [Netlify](https://netlify.com) | Global CDN, Native Next.js App Router support, Free SSL |
| **Backend** | [Render](https://render.com) | Free Web Service (Node.js/Express) |
| **Database** | [MongoDB Atlas](https://www.mongodb.com) | M0 Shared Cluster (512MB storage) |
| **Keep-Alive Ping** | [cron-job.org](https://cron-job.org) | 24/7 Free Ping service to prevent sleep mode lag |
| **Domain** | GitHub Student Pack | Free 1-Year Domain (Namecheap/Name.com/Porkbun) |

---

## 📋 Pre-deployment Checklist

- [ ] GitHub repository is up to date (`main` branch)
- [ ] MongoDB Atlas account created
- [ ] Render account created
- [ ] Netlify account created
- [ ] Cron-job.org account created

---

## ⚙️ Step 1: Database Setup (MongoDB Atlas)

1. Sign in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free **M0 Shared Cluster**.
3. Under **Database Access**, create an Admin database user with a strong password.
4. Under **Network Access**, add IP `0.0.0.0/0` (Allow Access from Anywhere).
5. Click **Connect** -> **Drivers** and copy your Connection String:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/kts_database?retryWrites=true&w=majority
   ```

---

## ⚙️ Step 2: Backend Deployment (Render)

1. Sign in to [Render.com](https://render.com) with GitHub.
2. Click **New +** -> **Web Service**.
3. Select your repository `KTS_Official_website_2026`.
4. Configure service settings:
   - **Name**: `kts-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Add **Environment Variables**:

   | Key | Value | Description |
   | :--- | :--- | :--- |
   | `PORT` | `5000` | Backend Port |
   | `NODE_ENV` | `production` | Production environment flag |
   | `MONGODB_URI` | `mongodb+srv://...` | MongoDB connection string |
   | `JWT_SECRET` | `your_secret_key` | Secret string for JWT auth |
   | `ADMIN_EMAIL` | `admin@kts.com` | Admin email address |
   | `ADMIN_PASSWORD` | `your_secure_password` | Admin login password |

6. Click **Deploy Web Service**.
7. Copy your live backend URL (e.g. `https://kts-backend.onrender.com`).

---

## ⚡ Step 3: Prevent Backend Sleep Mode (Zero Lag)

Render free tier goes to sleep after 15 minutes of inactivity. Keep it awake 24/7 for zero lag:

1. Go to [cron-job.org](https://cron-job.org) and register/login.
2. Click **Create Cronjob**.
3. Enter details:
   - **Title**: `KTS Backend Health Ping`
   - **URL**: `https://kts-backend.onrender.com/api/health`
   - **Execution Schedule**: Every 5 minutes (`*/5 * * * *`)
4. Save the cronjob.

---

## ⚙️ Step 4: Frontend Deployment (Netlify)

1. Sign in to [Netlify](https://netlify.com) with GitHub.
2. Click **Add new site** -> **Import an existing project**.
3. Select **GitHub** and authorize access to `KTS_Official_website_2026`.
4. Netlify will auto-detect configuration from `netlify.toml` in your repository:
   - **Base Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `.next`
5. Add **Environment Variables** (under Site configuration -> Environment variables):

   | Key | Value |
   | :--- | :--- |
   | `NEXT_PUBLIC_API_URL` | `https://kts-backend.onrender.com/api` |

6. Click **Deploy site**.
7. Copy your default Netlify domain (e.g., `https://kts-official.netlify.app`).

---

## 🌐 Step 5: Custom Domain Setup (GitHub Student Pack)

1. In Netlify, navigate to **Site configuration** -> **Domain management** -> **Add a domain**.
2. Enter your custom domain (e.g., `kts-official.me` or `kts-official.tech`) and click **Add domain**.
3. Open your Domain Registrar dashboard (Namecheap / Name.com / Porkbun).
4. Go to **DNS Settings** and add the following records:

   | Type | Host / Name | Target / Value | TTL |
   | :--- | :--- | :--- | :--- |
   | **A Record** | `@` | `75.2.60.5` | Automatic / 300 |
   | **CNAME** | `www` | `kts-official.netlify.app` (or your Netlify subdomain) | Automatic / 300 |

5. Wait 5-15 minutes for DNS propagation and free Let's Encrypt SSL generation.

---

## 🔄 Dual Link & Fallback Behavior

- Both URLs remain fully functional simultaneously:
  - Custom Domain: `https://kts-official.me`
  - Netlify Default Domain: `https://kts-official.netlify.app`
- If your custom domain expires after 1 year, the `https://kts-official.netlify.app` URL will **continue working permanently with zero downtime or configuration changes**.

