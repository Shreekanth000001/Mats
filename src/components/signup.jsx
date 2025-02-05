import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from './alert';
import Logom from '../assets/logom.webp';

const Signup = () => {
    const navigate = useNavigate();
    const [randomNo, setRandomNo] = useState(0);
    const [steps, setSteps] = useState(1);
    const [message, setMessage] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [className, setClassName] = useState('');
    const [description, setDescription] = useState('');
    const [course, setCourse] = useState('');
    const [section, setSection] = useState('');
    const [strength, setStrength] = useState('');
    const [numSubjects, setNumSubjects] = useState('');
    const [subjects, setSubjects] = useState([]);

    const handleSteps = (n) => setSteps((prev) => prev + n);

    const handleNextStep = () => {
        let errors = [];
    
        if (!className || className.length < 3) {
            errors.push("Class name must be longer than 3 letters.");
        }
        if (!description || description.length < 5) {
            errors.push("Description must be at least 5 letters long.");
        }
        if (!course || course.length < 2) {
            errors.push("Enter a valid course name.");
        }
        if (!section) {
            errors.push("Enter section.");
        }
        if (!strength || isNaN(strength) || parseInt(strength) < 1) {
            errors.push("Strength must be a number greater than zero.");
        }
        if (!subjects || subjects.length < 1 || subjects.some(sub => sub.trim() === "")) {
            errors.push("There must be at least one subject.");
        }
    
        if (errors.length > 0) {
            setMessage(errors);
            return;
        }
    
        setMessage('');
        handleSteps(1); 
    };

    const handleNumSubjectsChange = (e) => {
        let num = parseInt(e.target.value, 10) || 0;
        num = Math.min(num, 10);  // Limit to 10
        setNumSubjects(num);
        setSubjects(Array(num).fill(''));
    };


    const handleSubjectChange = (index, value) => {
        const newSubjects = [...subjects];
        newSubjects[index] = value;
        setSubjects(newSubjects);
    };

    const submission = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                password,
                classmod: 'moderator',  
            })
        });
        const data = await response.json();

        if (!data.errors) {
            fetchuser(data.authToken);
        }
        else {
            const newRandomNo = Math.floor(Math.random() * 11);
            setRandomNo(newRandomNo);
            setMessage(data.errors.map(errors => errors.msg));
        }
    }

    const fetchuser = async (authToken) => {
        const response = await fetch('http://localhost:3000/getuser', {
            method: 'POST',
            headers: {
                'authToken': authToken
            }
        })
        const user = await response.json();
        sessionStorage.setItem('authToken', authToken);
        sessionStorage.setItem('userid', user._id);
        sessionStorage.setItem('username', user.name);
        sessionStorage.setItem('classmod', user.classmod);
        sessionStorage.setItem('approved', user.approved);
        savepass(user);
    }
    const savepass = async (user) => {
        const response = await fetch('http://localhost:3000/userpass', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userid: user._id,
                password: password
            })
        })
        const userpass = await response.json();
        if (!userpass.errors) {
            userClassSubmission(user);
        } else {
            console.log(userpass.errors);
        }
    }
    const userClassSubmission = async (user) => {
        const response = await fetch('http://localhost:3000/classes/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userid: user._id,
                name: name,
                description: description,
                course: course,
                section: section,
                subjects: subjects,
                strength: strength
            })
        });
        const data = await response.json();

        if (!data.errors) {
        sessionStorage.setItem('classid', data._id);
            navigate('/');
        }
        else {
            const newRandomNo = Math.floor(Math.random() * 11);
            setRandomNo(newRandomNo);
            setMessage(data.errors.map(errors => errors.msg));
        }

    }

    return (
        <div className='md:min-h-screen'>
            <div className='bg-white py-5 shadow-md'>
                <div className='mx-auto max-w-[90%] flex items-center'>
                    <img src={Logom} className='w-10 h-10' alt='' />
                    <p className='ml-1 font-bold text-3xl'>MATS</p>
                </div>
            </div>

            {steps === 1 && <section className='flex flex-col items-center justify-center md:min-h-screen'>
                <header className='flex flex-col items-center justify-center text-center pb-4 mt-6'>
                    {message && <Alert message={message} bgcolor={'white'} newRandomNo={randomNo} />}
                    <p className='font-bold text-2xl'>Class Moderator Profile Creation</p>
                    <p className='text-base text-[#52556e]'>Enter class details</p>
                </header>

                <main className='flex justify-center m-3 w-full'>
                    <div className='flex justify-center items-center bg-custom-gradient w-full md:w-[428px] md:max-h-[80vh] rounded-[30px] overflow-y-auto'>
                        <form className='flex flex-col items-center justify-center w-full bg-[#F6F7F9] md:bg-white md:w-[416px] md:min-h-[448px] md:max-h-[75vh] rounded-3xl md:p-5 overflow-y-auto' onSubmit={submission}>
                            <div className='bg-[#F6F7F9] w-full p-4 rounded-xl'>
                                <p>Creating your moderator ID 🎉</p>
                                <hr />
                                <p className='font-bold p-2'></p>
                                <div className='flex flex-col justify-center items-center space-y-2'>
                                    <input className='bg-white rounded-3xl w-full h-[50px] px-4 ' type="name" name="className" placeholder='Class Name' required="" onChange={(e) => setClassName(e.target.value)} value={className} />
                                    <input className='bg-white rounded-3xl w-full h-[50px] px-4 ' type="text" name="description" placeholder='Description' required="" onChange={(e) => setDescription(e.target.value)} value={description} />
                                    <input className='bg-white rounded-3xl w-full h-[50px] px-4 ' type="text" name="course" placeholder='Course' required="" onChange={(e) => setCourse(e.target.value)} value={course} />
                                    <input className='bg-white rounded-3xl w-full h-[50px] px-4 ' type="text" name="section" placeholder='Section' required="" onChange={(e) => setSection(e.target.value)} value={section} />
                                    <input className='bg-white rounded-3xl w-full h-[50px] px-4 ' type="number" name="strength" placeholder='strength' required="" onChange={(e) => setStrength(e.target.value)} value={strength} />
                                    
                                    <input className='bg-white rounded-3xl w-full h-[50px] px-4' type="number" placeholder='Number of Subjects' required onChange={handleNumSubjectsChange} value={numSubjects} />
                                        <div className="overflow-y-auto max-h-[200px] w-full">
                                            {subjects.map((subject, index) => (
                                                <input key={index} className='bg-white rounded-3xl w-full h-[50px] px-4 my-1' type="text" placeholder={`Subject ${index + 1}`} required onChange={(e) => handleSubjectChange(index, e.target.value)} value={subject} />
                                            ))}
                                        </div>

                                </div>
                            </div>
                            <button className='bg-[#020417] text-white mt-4 p-3 rounded-3xl w-fit' type="button" onClick={handleNextStep}>Next</button>
                        </form>
                    </div>
                </main>
            </section>}

            {steps === 2 && <section>
                <header className='flex flex-col items-center justify-center text-center pb-4 mt-6'>
                        {message && <Alert message={message} bgcolor={'white'} newRandomNo={randomNo} />}

                        <p className='font-bold text-2xl'>Create a learner profile</p>
                        <p className='text-base text-[#52556e]'>Just a few questions before we begin</p>
                    </header>
                <main className='flex justify-center m-3 w-full'>
                    <div className='flex justify-center items-center bg-custom-gradient w-full md:w-[428px] md:max-h-[80vh] rounded-[30px] overflow-y-auto'>
                        <form className='flex flex-col items-center justify-center w-full bg-[#F6F7F9] md:bg-white md:w-[416px] md:min-h-[448px] md:max-h-[75vh] rounded-3xl md:p-5 overflow-y-auto' onSubmit={submission}>
                            <div className='bg-[#F6F7F9] w-full p-4 rounded-xl'>
                                <p>Creating your moderator ID 🎉</p>
                                <hr />
                                <p className='font-bold p-2'>Enter Your Information</p>
                                <div className='flex flex-col justify-center items-center space-y-2'>
                                    <input className='bg-white rounded-3xl w-full h-[50px] px-4 ' type="name" name="name" placeholder='Name' required="" onChange={(e) => setName(e.target.value)} value={name} />
                                    <input className='bg-white rounded-3xl w-full h-[50px] px-4 ' type="email" name="email" placeholder='Email' required="" onChange={(e) => setEmail(e.target.value)} value={email} />
                                    <input className='bg-white rounded-3xl w-full h-[50px] px-4 ' type="password" name="password" placeholder='Password' required="" onChange={(e) => setPassword(e.target.value)} value={password} />

                                </div>
                            </div>
                            <button className='bg-[#020417] text-white p-3 rounded-3xl w-fit' type="submit">Submit</button>
                        </form>
                    </div>
                </main>
            </section>}
        </div>

    )
}

export default Signup