# 📝 QwikiNote

QwikiNote is a simple full-stack note-taking app built using Node.js, Express, MongoDB, and vanilla HTML/CSS/JS. It allows users to create, edit, and delete notes — all stored securely in a MongoDB database.

---

## Features

- Add, edit, delete notes in real time
- MongoDB-powered backend for storage
- Responsive UI with smooth interaction
- Clean separation of frontend and backend
- RESTful API

---

## Project Structure
QwikiNote/
├── client/ # Frontend (HTML, CSS, JS)
├── server/ # Backend logic (Express routes)
├── models/ # Mongoose schemas
├── .env.example # Environment variable template
├── .gitignore
├── package.json

---

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/<your-username>/QwikiNote.git
cd QwikiNote
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up .env
```env
MONGO_URI=mongodb+srv://<your-user>:<your-password>@your-cluster.mongodb.net/?retryWrites=true&w=majority
```

### 4. Start the backend server
```bash
node server/server.js
```
### 5. Open client/index.html in your browser
- You can use VS Code Live Server or open manually

#AUTHOR: Jayvie119


