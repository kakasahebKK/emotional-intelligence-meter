import ollama
from typing import List, Tuple
import json

class LLMService:
    def __init__(self):
        self.model = "llama3"  # or any other model you have in Ollama

    async def generate_questions(self, count: int) -> List[dict]:
        prompt = f"""Generate {count} objective questions to measure emotional intelligence. 
        Each question should have 4 options
        Format the response as a JSON array of objects with the following structure:
        {{
            "id": number,
            "question": "question text",
            "options": ["option 1", "option 2", "option 3", "option 4"],
        }}
        Make sure the questions are diverse and cover different aspects of emotional intelligence.
        Make sure that response is a valid JSON array, don't include any other text or characters, this is very important."""

        try:
            print('Generating questions using Ollama...')
            response = ollama.generate(
                model=self.model,
                prompt=prompt,
                stream=False
            )
            try:
                questions = json.loads(response['response'])
                return questions
            except json.JSONDecodeError:
                raise Exception("Invalid response format from LLM")
        except Exception as e:
            print(f"Error generating questions: {str(e)}")
            raise

    async def evaluate_answers(self, answers: str) -> Tuple[float, str]:
        prompt = f"""Evaluate these answers to emotional intelligence questions: {answers}
        Provide a score out of 10 and detailed feedback on the emotional intelligence level.
        Format the response as a JSON object with the following structure:
        {{
            "score": number (0-10),
            "feedback": "detailed feedback text"
        }}
        Make sure that response is a valid JSON object, don't include any other text or characters, this is very important."""

        try:
            print('Evaluating answers using Ollama...')
            response = ollama.generate(
                model=self.model,
                prompt=prompt,
                stream=False
            )
            try:
                result = json.loads(response['response'])
                return result["score"], result["feedback"]
            except json.JSONDecodeError:
                raise Exception("Invalid response format from LLM")
        except Exception as e:
            print(f"Error evaluating answers: {str(e)}")
            raise
