'use client'
import React, { useState, useEffect } from 'react'

const subtopics = {
    1: { title: 'computer programming' },
    2: { title: 'Data Structures' },
    3: { title: 'Algorithms' },
    4: { title: 'Operating Systems' },
    5: { title: 'Computer Networks' },
    6: { title: 'Database Management Systems' },
    7: { title: 'Computer Architecture' },
    8: { title: 'Theory of Computation' }

}

export default function page() {
    const [title, setTitle] = useState('')
    const [marks, setMarks] = useState()
    const [selectedSubtopics, setSelectedSubtopics] = useState([]);
    const handleCheckboxChange = (subtopicId) => {
        setSelectedSubtopics((prevSelected) => {
            // Check if the subtopic is already selected
            if (prevSelected.includes(subtopicId)) {
                // Remove the subtopic if it was already selected
                return prevSelected.filter((id) => id !== subtopicId);
            } else {
                // Add the subtopic if it was not already selected
                return [...prevSelected, subtopicId];
            }
        });
    };

    // Handle "Select All" checkbox change
    const handleSelectAllChange = (event) => {
        if (event.target.checked) {
            setSelectedSubtopics(Object.keys(subtopics).map(Number));
        } else {
            setSelectedSubtopics([]);
        }
    };
    const handlesubmit = async (e) => {
        e.preventDefault()
        console.log(title, marks, selectedSubtopics)
    }
    return (
        <div>
            <div className="min-h-screen p-6 bg-gray-100 flex  justify-center">
                <div className="container max-w-screen-lg m-5  mx-auto">
                    <div>
                        {/* <h2 className="font-semibold text-xl text-gray-600">Question details</h2> */}
                        {/* <p className="text-gray-500 mb-6">Form is mobile responsive. Give it a try.</p> */}

                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-4">
                                <div className="text-gray-600 justify-center">
                                    <p className="font-medium text-lg">Question Paper Details</p>
                                    <p>Please fill out all the fields.</p>
                                </div>

                                <div className="lg:col-span-3">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-5">
                                            <label htmlFor="full_name">Title of the paper</label>
                                            <input type="text" name="full_name" id="full_name" spellCheck="true" value={title} onChange={(e) => setTitle(e.target.value)}
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder='Title of the question paper' />
                                        </div>
                                        <div className="md:col-span-5 flex">
                                        <label className=' w-24 mt-2'>
                                            <input
                                                type="checkbox"
                                                checked={selectedSubtopics.length === Object.keys(subtopics).length}
                                                onChange={handleSelectAllChange}
                                            />{' '}
                                            Select All
                                        </label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                        {Object.entries(subtopics).map(([id, subtopic]) => (
                                            <div key={id} className='flex mt-2 ms-2'>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedSubtopics.includes(Number(id))}
                                                        onChange={() => handleCheckboxChange(Number(id))}
                                                    />{' '}
                                                   <span >{subtopic.title}</span> 
                                                </label>
                                            </div>
                                        ))}
                                        </div>
                                        </div>
                                        <div className="md:col-span-5">
                                            <label htmlFor="Marks">Marks{' '}</label>
                                            <input type="number" name="marks" value={marks} onChange={(e) => setMarks(e.target.value)}
                                                className="h-10 w-1/3 border mt-1 rounded px-4 bg-gray-50" placeholder='Total marks' />
                                        </div>
                                        <div className="md:col-span-5 text-right">
                                            <div className="inline-flex items-end">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                    onClick={handlesubmit}
                                                >
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
