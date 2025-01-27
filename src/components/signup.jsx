import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from './alert';
import Logom from '../assets/logom.webp';

const Signup = () => {
    const [randomNo, setRandomNo] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [classmod, setClassmod] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');


    const submission = async (e) => {
        e.preventDefault();

        const response = await fetch('/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                classmod,
                password
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
        const response = await fetch('/getuser', {
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
        savepass(user);
    }
    const savepass = async (user) => {
        const response = await fetch('/userpass', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userid: user._id,
                password: password
            })
        })
        const userpass = await response.json();
        if (!userpass.errors) {
            userInfoSubmission(user);
        } else {
            console.log(userpass.errors);
        }
    }

    return (
        <div className='md:h-screen'>
            <div className='bg-white py-5 shadow-md'>

                <div className='mx-auto max-w-[90%] flex items-center'>
                    <img src={Logom} className='w-10 h-10' alt='' />
                    <p className='ml-1 font-bold text-3xl'>MATS</p>
                </div>
            </div>

            <section>
                <header className='flex flex-col items-center justify-center text-center pb-4 mt-6'>
                    {message && <Alert message={message} bgcolor={'white'} newRandomNo={randomNo} />}

                    <p className='font-bold text-2xl'>Class moderator profile creation</p>
                    <p className='text-base text-[#52556e]'>Just a few questions before we begin</p>
                </header>
                <main className='flex justify-center m-3'>
                    <div className='flex justify-center items-center bg-custom-gradient w-full md:w-[428px] md:h-[460px] rounded-[30px]'>
                        <form className=' flex flex-col items-center justify-center w-full bg-[#F6F7F9] md:bg-white md:w-[416px] md:h-[448px] rounded-3xl md:p-5' onSubmit={submission}>
                            <div className='bg-[#F6F7F9] w-full p-4 rounded-xl'>
                                <p>Creating your moderator ID 🎉</p>
                                <hr />
                                <p className='font-bold p-2'>Enter Your Information</p>
                                <div className='flex flex-col justify-center items-center space-y-2'>
                                    <input className='bg-white rounded-3xl w-full h-[50px] px-4 ' type="name" name="name" placeholder='Name' required="" onChange={(e) => setName(e.target.value)} value={name} />
                                    <input className='bg-white rounded-3xl w-full h-[50px] px-4 ' type="email" name="email" placeholder='Email' required="" onChange={(e) => setEmail(e.target.value)} value={email} />
                                    <input className='bg-white rounded-3xl w-full h-[50px] px-4 ' type="email" name="email" placeholder='Class moderator name' required="" onChange={(e) => setClassmod(e.target.value)} value={classmod} />
                                    <input className='bg-white rounded-3xl w-full h-[50px] px-4 ' type="password" name="password" placeholder='password' required="" onChange={(e) => setPassword(e.target.value)} value={password} />
                                </div>
                            </div>
                            <button className='bg-[#020417] text-white mt-4 p-3 rounded-3xl w-fit' type="submit">I’m excited! Let’s do it</button>
                        </form>
                    </div>

                </main>
            </section>
        </div>
    )
}

export default Signup