'use client'
import React from 'react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { setCookie, parseCookies } from 'nookies'
import { Download,XCircle, XOctagon } from 'lucide-react';
import {PDFDownloadLink, PDFViewer} from '@react-pdf/renderer'
import Pdfgen from './Pdfgen'
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
    const [paperTitles,setpapertitles] = useState()

    const [uuid,setUuid] = useState()
    const getdetails = async () => {
        const email = cookie.email
        const res = await fetch(`http://localhost:8080/qms/details/${email}`, {
            method: 'GET',
            // headers: {
            //     'Content-Type': 'application/json',
            // },
        })
        const json = await res.json()
        // console.log(json)
        if (json) {
            setUsername(json.username)
            setFirstname(json.firstName)
            setLastname(json.lastName)
            setExpertise(json.expert)
            setEmail(json.email)
            setContributedQuestions(json.contributedQuestions)
            setGeneratedQuestions(json.generatedPapers)
            setMarks(json.marks)
            setpapertitles(json.paperTitles)
            setUuid(json.uuid)

        }
        // console.log(contributedQuestions)
        // setUsername(json.username)
        // setFirstname(json.firstName)
        // setLastname(json.lastName)
        // setExpertise(json.expertise)
    }
    // console.log(paperTitles)
    // console.log(uuid)

    const[quesData,setQuesData] = useState()
    const [hoverdown,sethoverdown] = useState(false)
    const [titleIndex,setTitleIndex] = useState()
    const getdown=async(uuid,index)=>{
        // console.log(uuid)
        const res = await fetch(`http://localhost:8080/qms/get/papers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({uuid, email:cookie.email})
        })
        const json = await res.json()
        // console.log(json)
        setQuesData(json)
        sethoverdown(true)
        setTitleIndex(index)
        // co
        // return json

    }
    const Modal = ({ quesData }) => {
        // console.log(quesData)
        return (
          // The modal backdrop
          <div
            className={`fixed top-0 left-0 w-full h-full flex items-center justify-center  'block' : 'hidden'
             bg-gray-800 bg-opacity-50`}
          >
            {/* The modal content */}
            <div className="bg-white w-96 p-4 rounded shadow-lg">
              {/* Modal header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold"></h2>
                <button
                  className="text-red-600 hover:text-red-800"
                    onClick={()=>{sethoverdown(false)}}
                >
                  <XOctagon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              {/* Modal content */}
              {/* {children} */}
              <h4 className="text-lg font-semibold mb-4">Question Paper</h4>
              <h5 className="text-md font-semibold mb-4">Title : </h5>
                <h5 className="text-md font-semibold mb-4 flex p-2">
                    Click {' '}
                    <PDFDownloadLink document={<Pdfgen title={paperTitles[titleIndex]} marks={marks[titleIndex]} data={quesData} />} fileName={paperTitles[titleIndex]}>
                                        {({ blob, url, loading, error }) => (loading ? <h5 className='text-blue-400'>Loading...</h5>:
                                       <h5 className='text-blue-400'>{' '} here </h5>
                                        
                                        )}
                                    </PDFDownloadLink>
                    {' '}to download
                </h5>
            </div>
          </div>
        );
      };
    

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
                {hoverdown && <Modal quesData={quesData} />}

                <h2 className="text-lg font-semibold mt-10 mb-4">Generated Question Papers</h2>
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-5">
                    <div className="text-gray-600">
                        <p className="text-gray-500 text-2xl">Paper Title</p>
                    </div>
                    <div className="text-gray-600 justify-center flex">
                        <p className="text-gray-500 text-2xl">Topic</p>
                    </div>
                    <div className="text-gray-600 justify-center flex">
                        <p className="text-gray-500 text-2xl">Total marks</p>
                    </div>
                    <div className="text-gray-600 justify-center flex">
                        <p className="text-gray-500 text-2xl">Subject</p>
                    </div>
                    <div className="text-gray-600 justify-center flex">
                        <p className="text-gray-500 text-2xl">Download</p>
                    </div>
                </div><hr />
                <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    {generatedQuestions && generatedQuestions.map((topic, index) => (
                        <div key={index} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-5">
                            <div className="text-gray-600">
                                <p className="text-gray-500 flex">
                                    {paperTitles[index]}
                                </p>
                            </div>
                            <div className="text-gray-600">
                                <p className="text-gray-500">
                                    {topic}
                                </p>
                            </div>
                            <div className="text-gray-600 justify-center flex">
                                <p className="text-gray-500">{marks[index]}</p>
                            </div>
                            <div className="text-gray-600 mb-4 justify-center flex">
                                <p className="text-gray-500">Computer Science</p>
                            </div>
                            <div className="text-gray-600 mb-4 justify-center flex">
                            {/* <PDFDownloadLink document={<Pdfgen title={paperTitles[index]} marks={marks[index]} data={getdown(uuid[index])} />} fileName={paperTitles[index]}>
                                        {({ blob, url, loading, error }) => (loading ? <h5 className='text-blue-400'>Loading...</h5>:
                                        <Download className="h-6 w-6 text-blue-400 hover:scale-125  transition-transform duration-500 ease-out" aria-hidden="true"
                                        />
                                        
                                        )}
                                    </PDFDownloadLink> */}
                                    <Download className="h-6 w-6 text-blue-400 hover:scale-125  transition-transform duration-500 ease-out" 
                                    aria-hidden="true" onClick={()=>{getdown(uuid[index],index)}}
                                    />
                                
                            
                            </div>
                        </div>))}
                </div>
            </div>
        </div>
    );


    
}
