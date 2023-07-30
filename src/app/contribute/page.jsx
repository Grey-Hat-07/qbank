'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { parseCookies } from 'nookies'
export default function page() {
    const {email,expert} = parseCookies();
    useEffect(() => {
        if(!email){
            window.location.href='/Signin'
        }
       
    }, [])
   
    const [question, setQuestion] = useState('')
    const handlesubmit = async (e) => {
        const res = await fetch('http://localhost:8080/qms/question/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question: question,
                email: email,
                subject: 'Computer Science',
                topic: 'Algorithms',
            })

        })
        const data = await res.json()
        console.log(data)

    }

    return (
        <div>
            <div className="min-h-screen p-6 bg-gray-100 flex  justify-center">
                <div className="container max-w-screen-lg m-5  mx-auto">
                    <div>
                        {/* <h2 className="font-semibold text-xl text-gray-600">Question details</h2> */}
                        {/* <p className="text-gray-500 mb-6">Form is mobile responsive. Give it a try.</p> */}

                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                <div className="text-gray-600">
                                    <p className="font-medium text-lg">Question Details</p>
            {/* <p>Please fill out all the fields.</p> */} 
                                </div>

                                <div className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-5">
                                            <label htmlFor="full_name">Full Question</label>
                                            <textarea type="text" name="full_name" id="full_name" spellCheck="true" value={question} onChange={(e) => setQuestion(e.target.value)}
                                                className="h-20 border mt-1 rounded px-4 w-full bg-gray-50" placeholder='Write the question here' />
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="email">Email Address</label>
                                            <input type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        </div>


                                        <div className="md:col-span-5 text-right">
                                            <div className="inline-flex items-end">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                    onClick={handlesubmit}>
                                                    Submit</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
