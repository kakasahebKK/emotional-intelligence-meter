import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Paper,
  CircularProgress,
  LinearProgress,
} from '@mui/material';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/questions`);
      setQuestions(response.data.questions);
      setAnswers(new Array(response.data.questions.length).fill(null));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setLoading(false);
    }
  };

  const handleAnswerChange = (event) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = parseInt(event.target.value);
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitQuiz = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/submit`, {
        answers: answers,
      });
      setScore(response.data.score);
      setFeedback(response.data.feedback);
      setQuizComplete(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (quizComplete) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Quiz Complete!
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            Your Score: {score}/10
          </Typography>
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="body1">{feedback}</Typography>
          </Paper>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()}
            sx={{ mt: 3 }}
          >
            Take Quiz Again
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <LinearProgress
          variant="determinate"
          value={(currentQuestion / questions.length) * 100}
          sx={{ mb: 3 }}
        />
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Question {currentQuestion + 1} of {questions.length}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {questions[currentQuestion]?.question}
          </Typography>
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <RadioGroup
              value={answers[currentQuestion] || ''}
              onChange={handleAnswerChange}
            >
              {questions[currentQuestion]?.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={index+1}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={answers[currentQuestion] === null}
          >
            {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default App; 