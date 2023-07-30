'use client'
import React, { useState, useEffect } from 'react';

export default function MCQExam() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:8080/qms/expert/qsn/generate/Computer Science', {
        method: 'GET',
      });
      const data = await res.json();
      console.log(data);

      var options = data.map((item) => {
        return [item.option_a, item.option_b, item.option_c, item.option_d];
      });

      var correctAnswer = data.map((item) => {
        var ans;
        if (item.answer === 'a') {
          ans = 0;
        } else if (item.answer === 'b') {
          ans = 1;
        } else if (item.answer === 'c') {
          ans = 2;
        } else if (item.answer === 'd') {
          ans = 3;
        }
        return ans;
      });

      var Ques = data.map((item, index) => {
        return {
          question: item.question,
          options: options[index],
          correctAnswer: correctAnswer[index],
        };
      });

      console.log(Ques);
      setQuestions(Ques);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAnswer = (answerIndex) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(updatedUserAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setShowResult(true); // Show result when the last question is answered
    }
    calculateScore();
  };

  const calculateScore = () => {
    let totalScore = 0;
    userAnswers.forEach((userAnswer, index) => {
      if (userAnswer === questions[index].correctAnswer) {
        totalScore++;
      }
    });
    setScore(totalScore);
  };

  const renderOptions = (options) => {
    if (questions.length === 0) {
    return <div>Loading...</div>;
    }

    return options.map((option, index) => (
    <div key={index} className="my-2">
      <label className="flex items-center">
        <input
          type="radio"
          className="form-radio mr-2"
          checked={userAnswers[currentQuestionIndex] === index}
          onChange={() => handleAnswer(index)}
        />
        <span>{option}</span>
      </label>
    </div>
  ));
};

  return (
    <div className="container mx-auto p-4">
      {showResult ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Test Completed!</h3>
          <p>Your total score is: {score}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{questions[currentQuestionIndex]?.question}</h3>
          {renderOptions(questions[currentQuestionIndex]?.options)}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleNextQuestion}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}