'use client'
import React,{useState} from 'react'
import Question from './Question'
export default function MCQExam() {
    const questions = [
        {
          question: 'What is the capital of France?',
          options: ['London', 'Paris', 'Berlin', 'Madrid'],
          correctAnswer: 1,
        }]
        const [currentQuestion, setCurrentQuestion] = useState(0);
        const [selectedOptions, setSelectedOptions] = useState(new Array(questions.length).fill(-1));
        const [showResult, setShowResult] = useState(false);
      
        const handleOptionChange = (questionIndex, optionIndex) => {
          const updatedSelectedOptions = [...selectedOptions];
          updatedSelectedOptions[questionIndex] = optionIndex;
          setSelectedOptions(updatedSelectedOptions);
        };
      
        const handleSubmit = () => {
          setShowResult(true);
        };
        const calculateScore = () => {
            let score = 0;
            questions.forEach((question, index) => {
              if (selectedOptions[index] === question.correctAnswer) {
                score++;
              }
            });
            return score;
          };
  return (
    <div className='text-center'>
     {questions.map((question, index) => (
        <Question
          key={index}
          question={question.question}
          options={question.options}
          selectedOption={selectedOptions[index]}
          onChangeOption={(optionIndex) => handleOptionChange(index, optionIndex)}
        />
      ))}
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleSubmit}>
        Submit
      </button>
      {showResult && (
        <div className="mt-4">
          <p className="font-semibold">Your Score: {calculateScore()}</p>
        </div>
      )}
    </div>
  )
}
