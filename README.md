# Emotional Intelligence Meter

A full-stack application for measuring emotional intelligence through an interactive quiz. The application uses React for the frontend and FastAPI for the backend, with Ollama-based LLM integration for question generation and evaluation.

## Features

- Interactive quiz interface with 10 random questions
- Objective questions with 4 options each
- Dynamic question generation using LLM
- Emotional intelligence scoring (out of 10)
- Detailed feedback and analysis

## Project Structure

```
emotional-intelligence-meter/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── main.py
│   │   ├── models.py
│   │   └── services/
│   │       └── llm_service.py
│   └── requirements.txt
└── frontend/               # React frontend
    ├── src/
    │   ├── components/
    │   ├── services/
    │   └── App.js
    └── package.json
```

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory
2. Create a virtual environment: `python -m venv .venv`
3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Unix/MacOS: `source .venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Set environment variable: `OLLAMA_HOST=http://localhost:11434`
5. Run the server: `uvicorn app.main:app --reload`

### Frontend Setup
1. Navigate to the frontend directory
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## Technologies Used

- Frontend: React, Material-UI
- Backend: FastAPI, Python
- LLM: Ollama
- Database: SQLite (for storing questions and results)

## API Endpoints

- `GET /api/questions`: Get 10 random questions
- `POST /api/submit`: Submit quiz answers and get evaluation
- `GET /api/score`: Get detailed score and feedback
