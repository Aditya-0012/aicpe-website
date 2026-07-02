# AICPE – All India Council of Physical Education
### Full-Stack Website

A modern, production-ready website for AICPE built with **React + Vite** (frontend) and **Node.js + Express + MongoDB** (backend).

---

## 📁 Project Structure

```
aicpe/
├── frontend/          # React + Vite app (deploy to Vercel)
│   ├── src/
│   │   ├── components/   # Navbar, Footer
│   │   ├── pages/        # All pages + membership forms
│   │   ├── api.js        # Axios API helper
│   │   └── index.css     # Global design system
│   ├── vercel.json
│   └── .env.example
│
└── backend/           # Node + Express API (deploy to Railway)
    ├── models/        # MongoDB models (4 member types + contact)
    ├── routes/        # /api/members, /api/contact
    ├── server.js
    ├── railway.json
    └── .env.example
```

---

## 🚀 Deployment Guide

### Step 1 — Set Up MongoDB Atlas (Free)

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com) → Create free account
2. Create a **Free Cluster** (M0)
3. Under **Database Access** → Add user (username + password)
4. Under **Network Access** → Add IP Address → `0.0.0.0/0` (allow all)
5. Click **Connect** → **Drivers** → Copy the connection string
   - It looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/aicpe`

---

### Step 2 — Deploy Backend to Railway

1. Go to [https://railway.app](https://railway.app) → Sign up with GitHub
2. Click **New Project** → **Deploy from GitHub repo**
3. Select your repo → set **Root Directory** to `backend`
4. Add environment variables (click **Variables** tab):
   ```
   MONGODB_URI = mongodb+srv://...  (from Step 1)
   FRONTEND_URL = https://your-app.vercel.app  (set after Step 3)
   PORT = 5000
   NODE_ENV = production
   ```
5. Railway will build & deploy automatically
6. Copy your **Railway URL** (e.g. `https://aicpe-backend.railway.app`)

---

### Step 3 — Deploy Frontend to Vercel

1. Go to [https://vercel.com](https://vercel.com) → Sign up with GitHub
2. Click **Add New Project** → Import your repo
3. Set **Root Directory** to `frontend`
4. Add environment variable:
   ```
   VITE_API_URL = https://aicpe-backend.railway.app/api
   ```
   *(Your Railway URL from Step 2 + `/api`)*
5. Click **Deploy** → Vercel builds and deploys automatically
6. Copy your **Vercel URL** (e.g. `https://aicpe.vercel.app`)

---

### Step 4 — Update CORS on Backend

Go back to Railway → update `FRONTEND_URL` variable:
```
FRONTEND_URL = https://aicpe.vercel.app
```
Railway will redeploy automatically.

---

### Step 5 — Connect GoDaddy Domain

**On Vercel:**
1. Project Settings → Domains → Add `www.aicpe.ac.in` and `aicpe.ac.in`
2. Vercel will show you DNS records to add

**On GoDaddy:**
1. My Products → DNS → Manage DNS
2. Add/update:
   | Type  | Name | Value                    |
   |-------|------|--------------------------|
   | A     | @    | 76.76.19.61 (Vercel IP)   |
   | CNAME | www  | cname.vercel-dns.com      |
3. Wait 24–48 hrs for DNS propagation

---

## 🛠 Local Development

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
# Runs on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
# VITE_API_URL is empty for local (uses Vite proxy to localhost:5000)
npm run dev
# Runs on http://localhost:5173
```

---

## 📋 API Endpoints

| Method | Endpoint                      | Description               |
|--------|-------------------------------|---------------------------|
| POST   | /api/members/associate        | Associate member form     |
| POST   | /api/members/regular          | Regular member form       |
| POST   | /api/members/institutional    | Institutional member form |
| POST   | /api/members/life             | Life member form          |
| GET    | /api/members/fees             | Get membership fees       |
| POST   | /api/contact                  | Contact/inquiry form      |
| GET    | /api/health                   | API health check          |

---

## 💾 Viewing Submissions (MongoDB Atlas)

1. Go to your MongoDB Atlas cluster
2. Click **Browse Collections**
3. Select the `aicpe` database
4. Collections: `associatemembers`, `regularmembers`, `institutionalmembers`, `lifemembers`, `contacts`

Or use **MongoDB Compass** (free desktop app) with your connection string.

---

## 🎨 Pages

| Page         | Route                          |
|--------------|--------------------------------|
| Home         | /                              |
| About        | /about                         |
| Registration | /registration                  |
| Associate    | /registration/associate        |
| Regular      | /registration/regular          |
| Institutional| /registration/institutional    |
| Life Member  | /registration/life             |
| Events       | /events                        |
| Gallery      | /gallery                       |
| Contact      | /contact                       |

---

## 🔒 Security Features

- Helmet.js for HTTP headers
- CORS restricted to frontend URL
- Rate limiting (100 req / 15 min per IP)
- Input validation with express-validator
- Environment variables for all secrets

---

## 📞 Support

Contact: cp@aicpe.ac.in | +91-9425006602
