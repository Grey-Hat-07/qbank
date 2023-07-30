import React from 'react'
import MCQExam from './MCQExam'
export default function page() {
  return (
    <div>
       <div className="container mx-auto mt-4 p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">MCQ Subject Matter Expert Test</h1>
      <p className="text-center text-gray-600">
        Subject: Computer Science
      </p>
      <p className="text-center text-gray-600">
        Select the correct answer for each question
      </p>
      <MCQExam />
    </div>
    </div>
  )
}
