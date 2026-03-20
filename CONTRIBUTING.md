# 📱 ScamShield App

A full-stack mobile application built using **Apache Cordova** (frontend) and **Node.js (Express)** (backend).
The app runs as a mobile application while communicating with a REST API server.

---

## 🚀 Tech Stack

* **Frontend (Mobile App):** Apache Cordova (HTML, CSS, JS)
* **Backend:** Node.js + Express
* **API Communication:** REST APIs (Fetch/Axios)
* **Optional:** Redis, BullMQ, Stripe (if used)

---

## 📁 Project Structure

```
project-root/
│
├── client/          # Cordova app
├── server/          # Node.js backend
├── shared/          # Shared utilities (optional)
└── README.md
```

---

## ⚙️ Prerequisites

Make sure you have installed:

* Node.js (v16+ recommended)
* npm / yarn
* Cordova CLI

  ```bash
  npm install -g cordova
  ```
* Android Studio (for Android build)
* Java JDK

---

## 🛠️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd project-root
```

---

### 🌿 Create and switch to a new branch

```bash
git checkout -b your-branch-name
```

---

## 🔧 Backend Setup (Node.js)

### Navigate to server

```bash
cd server
```

### Install dependencies

```bash
npm install
```

### Setup environment variables

Create a `.env` file:

```env
PORT=3000
DB_URL=your_database_url
```

### Run backend

```bash
npm run dev
```

👉 Server will run at:

```
http://localhost:3000
```

---

## 📱 Frontend Setup (Cordova)

### Navigate to client

```bash
cd ../client
```

### Install dependencies

```bash
npm install
```

### Add platform

```bash
cordova platform add android
```

---

## ▶️ Running the App

### Option 1: Run in Browser (for development)

```bash
cordova run browser
```

👉 Opens:

```
http://localhost:8000
```

⚠️ Note: Plugins may not work in browser

---

### Option 2: Run on Android Device / Emulator

```bash
cordova run android
```

---

### 🔄 Live Reload (Recommended)

```bash
cordova run android --livereload
```

---

## 🌐 Connecting Frontend to Backend

⚠️ **Important:** When running on a real device/emulator:

* Do NOT use `localhost`
* Use your system IP instead

### Example:

```js
const API_URL = "http://192.168.1.10:3000/api";
```

---

## 🧪 Development Workflow

1. Start backend:

   ```bash
   cd server && npm run dev
   ```

2. Start frontend:

   ```bash
   cd client && cordova run android --livereload
   ```

3. Make sure both devices are on same network

---

## 🐳 Optional: Docker Setup

```bash
docker-compose up --build
```

---

## 📦 Build APK

```bash
cordova build android
```

APK will be available at:

```
client/platforms/android/app/build/outputs/
```

---

## ⚠️ Common Issues

### ❌ API not working on device

✔ Use system IP instead of localhost

---

### ❌ CORS errors

✔ Enable CORS in backend:

```js
const cors = require('cors');
app.use(cors());
```

---

### ❌ Android build fails

✔ Check:

* JAVA_HOME
* ANDROID_HOME
* SDK installed


---

## ⭐ Contribute

Pull requests are welcome! Feel free to open issues for suggestions or bugs.
