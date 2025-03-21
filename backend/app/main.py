from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import random
from .services.llm_service import LLMService

app = FastAPI(title="Emotional Intelligence Meter API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize LLM service
llm_service = LLMService()

class Question(BaseModel):
    id: int
    question: str
    options: List[str]
    correct_option: int

class QuizSubmission(BaseModel):
    answers: List[int]

@app.get("/api/questions")
async def get_questions():
    try:
        # Get questions from LLM
        # TODO: this call is timing out, need to fix
        questions = await llm_service.generate_questions(10)
        return {"questions": questions}
    except Exception as e:
        print('DEBUg---3--->', str(e))
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/submit")
async def submit_quiz(submission: QuizSubmission):
    try:
        # Evaluate answers using LLM
        score, feedback = await llm_service.evaluate_answers(submission.answers)
        return {
            "score": score,
            "feedback": feedback
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"} 