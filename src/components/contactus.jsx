import React, { useState } from "react";
import Alert from './alert';

const Contactus = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [randomNo, setRandomNo] = useState(0);

    const helpSubmit = async (e) => {
        e.preventDefault();
        
        if (!title.trim() || !description.trim()) {
            setMessage("Title and description are required.");
            return;
        }

        try {
            const response = await fetch('https://yeasty-claribel-critic-coder-743a0cb5.koyeb.app/help', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description }),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage(result.message || "Report submitted successfully.");
                // Clear input fields after successful submission
                setTitle('');
                setDescription('');
            } else {
                setMessage(result.error ? result.error[0] : "An error occurred.");
            }
            
        } catch (error) {
            setMessage("Failed to submit. Please try again.");
        }

        setRandomNo(Math.floor(Math.random() * 11));
    };

    return (
        <div>
            <aside className='px-6 pt-7 md:px-16 w-full'>
                {message && <Alert message={message} bgcolor={'[#F6F7F9]'} newRandomNo={randomNo} />}
                <div className='px-5'>
                    <p className='text-2xl font-bold'>Help Center</p>
                    <p className='text-xl font-bold mt-3'>Send Report</p>
                    <form className='flex flex-col space-y-5 mt-6 items-center w-full' onSubmit={helpSubmit}>
                        <input 
                            className='border border-text-purple rounded-2xl w-full pl-1 p-2 focus:outline-text-purple' 
                            placeholder='Title'
                            value={title} // Controlled input
                            onChange={(e) => setTitle(e.target.value)} 
                        />
                        <textarea 
                            className='border border-text-purple rounded-2xl w-full pl-1 p-2 min-h-48 focus:outline-text-purple' 
                            placeholder='Report the issue' 
                            value={description} // Controlled textarea
                            onChange={(e) => setDescription(e.target.value)} 
                        />
                        <button 
                            className='px-8 mt-8 w-1/2 bg-light-purple hover:bg-text-purple text-text-purple hover:text-white rounded-3xl border py-2 font-black border-text-purple' 
                            type="submit"
                        >
                            SUBMIT
                        </button>
                    </form>
                </div>
            </aside>
        </div>
    );
};

export default Contactus;
