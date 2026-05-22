# 🏢 Employee Management System — DevOps Project

A full-stack Employee Management web app with a complete CI/CD pipeline using **GitHub + Jenkins + Docker**.

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js + Express |
| Frontend | HTML + CSS + Vanilla JS |
| Storage | JSON file (no DB needed) |
| Container | Docker |
| CI/CD | Jenkins (Declarative Pipeline) |
| Version Control | GitHub |

## 🚀 Features

- ➕ Add employees (name, role, department, email, status)
- 📋 View all employees in a live table
- 🔍 Search by name, role, or department
- ❌ Delete employees
- 📊 Live stats (total, active, on leave, departments)

## 🏗 CI/CD Pipeline Flow

```
Developer pushes code to GitHub
        ↓
GitHub Webhook triggers Jenkins
        ↓
Jenkins: Clone → Install → Build Docker Image
        ↓
Jenkins: Stop old container → Deploy new container
        ↓
Jenkins: Health check → App live on port 3000
```

## 📦 Run Locally (Without Docker)

```bash
npm install
node app.js
# Open http://localhost:3000
```

## 🐳 Run With Docker

```bash
docker build -t employee-mgmt .
docker run -p 3000:3000 employee-mgmt
# Open http://localhost:3000
```

## ⚙️ Jenkins Setup

1. Install Jenkins (Ubuntu): https://www.jenkins.io/doc/book/installing/linux/
2. Install plugins: Git, Docker Pipeline
3. Create New Item → Pipeline
4. Set GitHub repo URL and point to Jenkinsfile
5. Add GitHub Webhook → `http://YOUR_JENKINS_IP:8080/github-webhook/`

## 📁 Project Structure

```
employee-mgmt-devops/
├── app.js              # Express server + REST API
├── package.json        # Node dependencies
├── Dockerfile          # Container definition
├── Jenkinsfile         # CI/CD pipeline
├── data/
│   └── employees.json  # Data storage
└── views/
    └── index.html      # Frontend UI
```