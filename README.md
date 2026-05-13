# ResumeAI 🚀

ResumeAI is an AI-powered interview preparation and resume generation platform built using the MERN stack and Google Gemini AI.

The application helps users:

- Generate AI-based interview reports
- Create ATS-friendly resumes
- Analyze skill gaps
- Get technical and behavioral interview questions
- Generate personalized preparation plans

---

# ✨ Features

## 🔐 Authentication
- User Registration
- User Login
- Protected Routes
- JWT Authentication
- Secure Cookie-based Auth

## 🤖 AI Features
- AI Interview Report Generator
- AI Resume Generator
- Skill Gap Analysis
- Match Score Analysis
- Technical Questions Generator
- Behavioral Questions Generator
- Preparation Roadmap

## 📄 Resume PDF Generation
- ATS-Friendly Resume
- Professional Resume Layout
- HTML to PDF Conversion using Puppeteer

---

# 🛠️ Tech Stack

## Frontend
- React.js
- React Router DOM
- SCSS
- Axios

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## AI & PDF
- Google Gemini AI
- Puppeteer
- Zod Validation

---

# 📁 Project Structure

```bash
ResumeAI/
│
├── Frontend/
│   ├── src/
│   │   ├── features/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── app.routes.jsx
│   │   └── main.jsx
│
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── app.js
│
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/JYOTIGHADI/ResumeAI
```

---

# 📦 Backend Setup

## Go to Backend Folder

```bash
cd Backend
```

## Install Dependencies

```bash
npm install
```

## Create .env File

```env
PORT=5000

MONGODB_URI=your_mongodb_connection

JWT_SECRET=your_jwt_secret

GOOGLE_GENAI_API_KEY=your_google_gemini_api_key
```

## Run Backend

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:3000
```

---

# 💻 Frontend Setup

## Go to Frontend Folder

```bash
cd Frontend
```

## Install Dependencies

```bash
npm install
```

## Run Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Backend Port |
| MONGODB_URI | MongoDB Connection String |
| JWT_SECRET | JWT Secret Key |
| GOOGLE_GENAI_API_KEY | Google Gemini API Key |

---

# 🤖 AI Models Used

- Gemini 2.0 Flash
- Structured JSON Response
- Zod Schema Validation

---

# 📄 Resume Generation Workflow

1. User uploads resume details
2. AI analyzes job description
3. AI generates ATS-friendly HTML resume
4. Puppeteer converts HTML to PDF
5. PDF returned to user

---

# 🔒 Authentication Flow

- JWT Token Authentication
- Protected Routes
- Secure User Session
- Auto Login Check

---

<!-- # 📸 Screenshots

Add your project screenshots here.

Example:

```md
![Login Page](./screenshots/login.png)
```

--- -->

# 🚀 Future Improvements

- AI Mock Interview
- Voice Interview Simulation
- Resume Templates
- Dark Mode
- LinkedIn Resume Import
- Multi-language Support

---

# 👨‍💻 Author

Developed by Jyoti Ghadi

