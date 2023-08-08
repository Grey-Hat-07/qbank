'use client'
import React from 'react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { setCookie, parseCookies } from 'nookies'
export default function page() {
    const cookie = parseCookies()
    useEffect(() => {
        if (!cookie.email) {
            window.location.href = '/'

        }
        getdetails()
    }, [])
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [expertise, setExpertise] = useState('')
    const [contributedQuestions, setContributedQuestions] = useState([])
    const [generatedQuestions, setGeneratedQuestions] = useState([])
    const [marks, setMarks] = useState()
    const getdetails = async () => {
        const email = cookie.email
        const res = await fetch(`http://localhost:8080/qms/details/${email}`, {
            method: 'GET',
            // headers: {
            //     'Content-Type': 'application/json',
            // },
        })
        const json = await res.json()
        console.log(json)
        if (json) {
            setUsername(json.username)
            setFirstname(json.firstName)
            setLastname(json.lastName)
            setExpertise(json.expert)
            setEmail(json.email)
            setContributedQuestions(json.contributedQuestions)
            setGeneratedQuestions(json.generatedPapers)
            setMarks(json.marks)
            // console.log(contributedQuestions)
            
        }
        // console.log(contributedQuestions)
        // setUsername(json.username)
        // setFirstname(json.firstName)
        // setLastname(json.lastName)
        // setExpertise(json.expertise)
    }



    // Replace this data with the list of questions contributed by the user
    // const contributedQuestions = [
    //     { id: 1, title: 'How to create a React app?' },
    //     { id: 2, title: 'What are the benefits of using Tailwind CSS?' },
    //     { id: 3, title: 'How to handle form submission in Node.js?' },
    // ];
    console.log(generatedQuestions)

    return (
        <div className='flex  h-screen'>
            <div className="bg-gray-200 w-1/4 p-4 h-screen">
                <h2 className="text-lg font-semibold mb-4 ">Profile Details</h2>
                <div>
                    <p className="font-semibold text-lg text-center">
                        {firstname} {lastname}
                    </p>
                    <p className="text-sm text-gray-600 mb-6 text-center">{username}</p>
                    <p className="text-md text-black mb-4 "><strong>Email : </strong>{email}</p>


                    <p className="text-md text-black mb-4 "><strong>Expertise : </strong>{expertise ? expertise : "Not specified"}</p>
                    {/* Add more profile details as needed */}
                </div>
            </div>
            <div className="bg-white w-3/4 p-4 container">
                <h2 className="text-lg font-semibold mb-4">Contributed Questions</h2>
                <ul className='container'>
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
                        <div className="text-gray-600">
                            <p className="text-gray-500 text-2xl">Questions</p>
                        </div>
                        <div className="text-gray-600">
                            <p className="text-gray-500 text-2xl">Subject</p>
                        </div>
                    </div>
                    <hr className='my-2' />
                    {contributedQuestions && contributedQuestions.map((question, index) => (
                        <li key={index} className=" py-2">

                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
                                <div className="text-gray-500">
                                    <p className=" font-semibold text-lg">{question}</p>
                                </div>
                                {/* <div className="text-gray-600">
                            <p className="text-gray-500">React</p>
                            </div> */}
                                <div className="text-black-600">
                                    <p className="text-gray-500 text-lg">Computer Science</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                <h2 className="text-lg font-semibold mt-10 mb-4">Generated Question Papers</h2>
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                        <div className="text-gray-600">
                            <p className="text-gray-500 text-2xl">Topic</p>
                        </div>
                        <div className="text-gray-600">
                            <p className="text-gray-500 text-2xl">Total marks</p>
                        </div>
                        <div className="text-gray-600">
                            <p className="text-gray-500 text-2xl">Subject</p>
                        </div>
                    </div><hr/>
                <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    {generatedQuestions && generatedQuestions.map((topic, index) => (
                    <div key={index} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                        <div className="text-gray-600">
                            <p className="text-gray-500 flex">
                                {topic}
                            </p>
                        </div>
                        <div className="text-gray-600">
                            <p className="text-gray-500">{marks[index]}</p>
                        </div>
                        <div className="text-gray-600 mb-4">
                            <p className="text-gray-500">Computer Science</p>
                        </div>
                    </div>))}
                </div>
            </div>
        </div>
    );
}
