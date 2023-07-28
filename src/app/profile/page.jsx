'use client'
import React from 'react'
import Link from 'next/link'
import { useEffect } from 'react'
import { setCookie, parseCookies } from 'nookies'
export default function page() {
    const cookie = parseCookies()
   

    const user = {
        username: 'john_doe',
        firstName: 'John',
        lastName: 'Doe',
        expertise: 'Web Development',
        email: 'john.doe@example.com',
    };

    // Replace this data with the list of questions contributed by the user
    const contributedQuestions = [
        { id: 1, title: 'How to create a React app?' },
        { id: 2, title: 'What are the benefits of using Tailwind CSS?' },
        { id: 3, title: 'How to handle form submission in Node.js?' },
    ];

    return (
        <div className="max-w-md mx-12  p-4">
            <h2 className="text-2xl font-semibold mb-4">Profile Page</h2>
            <div className="border p-4 mb-4">
                <div className="mb-4">
                    <strong>Username:</strong> {user.username}
                </div>
                <div className="mb-4">
                    <strong>First Name:</strong> {user.firstName}
                </div>
                <div className="mb-4">
                    <strong>Last Name:</strong> {user.lastName}
                </div>
                <div className="mb-4">
                    <strong>Expertise:</strong> {user.expertise}
                </div>
                <div>
                    <strong>Email:</strong> {user.email}
                </div>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Contributed Questions</h2>
            <ul className="list-disc list-inside">
                {contributedQuestions.map((question) => (
                    <li key={question.id}>{question.title}</li>
                ))}
            </ul>
        </div>
    );
}
