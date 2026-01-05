# Tech Sprint GDG (Keystroke Auth)

This project is a Tech Sprint GDG implementation focused on Keystroke Authentication. It features a FastAPI backend and a Firebase-integrated frontend, designed to authenticate users based on their typing patterns.

## Table of Contents
- [Tech Stack](#tech-stack-used)
- [Project Structure](#project-structure)
- [How to use?](#how-to-use)

## Tech Stack used
| Stack | Tech |
|----------|----------|
| Language | ![Python](https://img.shields.io/badge/Python-3.10%2B-blue?logo=python&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) |
| Frameworks | ![FastAPI](https://img.shields.io/badge/FastAPI-005571?logo=fastapi&logoColor=white) ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black) |
| Database | ![Firebase Realtime DB/Firestore](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black) |
| Utilities | ![Uvicorn](https://img.shields.io/badge/Uvicorn-4053D6?logo=gunicorn&logoColor=white) |

## Project Structure
```
tech_sprint_gdg/
│
├── backend/                        # Backend API
│   ├── app/                        # Application Source Code
│   │   ├── core/                   # Core configurations
│   │   ├── models/                 # Data modes
│   │   ├── routes/                 # API Routes
│   │   ├── services/               # Business logic services
│   │   ├── config.py               # Config variables
│   │   ├── db.py                   # Database connection
│   │   └── main.py                 # API entry point
│   ├── reproduce_issue.py          # Script for issue reproduction
│   ├── reproduce_normal.py         # Script for normal flow reproduction
│   └── requirements.txt            # Python dependencies
│
├── frontend/                       # Frontend Application
│   ├── public/                     # Static files
│   │   ├── css/                    # Stylesheets
│   │   └── index.html              # Entry HTML file
│   ├── src/                        # Source files
│   │   ├── js/                     # JavaScript logic
│   │   ├── pages/                  # Frontend pages
│   │   ├── styles/                 # Source styles
│   │   └── utils/                  # Utility functions
│   └── package.json                # Frontend dependencies
│
└── README.md                       # Project documentation
```

## How to use?

### 1. Setup Backend
Navigate to the backend directory, create a virtual environment, and install dependencies.

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Run Backend Server
Start the FastAPI server using Uvicorn.

```bash
uvicorn app.main:app --reload
```
The server will start at `http://127.0.0.1:8000`.

### 3. Setup Frontend
Navigate to the frontend directory and install dependencies.

```bash
cd frontend
npm install
```

### 4. Run Frontend
Start the frontend server.

```bash
npm start
```
This will serve the application (typically at `http://localhost:3000` or `http://localhost:5000` depending on the `serve` configuration).
