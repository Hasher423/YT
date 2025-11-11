import axios from 'axios'
import React, { useState } from 'react'
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';




const Login = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [showLogin, setshowLogin] = useState(false)


    const navigate = useNavigate();


    const SubmitHandler = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/user/login`, {
                email: email,
                password: password,
            }, {
                withCredentials: true,
            });

            if (response.data) {
                navigate('/'); // Redirect to home
                localStorage.setItem('user', JSON.stringify(response?.data?.user));
            }


            console.log('User registered:', response);
        } catch (error) {
            console.error('Error registering:', error.response?.data);
        }
    };




    return (
        <div className="bg-custom-black w-[100vw] h-[100vh] flex justify-center xl:text-[1.3vw]">
            
           {showLogin && <div className='w-screen text-6xl p-5 font-bebasNeue h-screen bg-white absolute top-0 left-0'>
                            logging in...
            </div>}
           
            <div className="flex items-center justify-center text-custom-white font-youtube bg-transparent">
                <form method={'post'} onSubmit={SubmitHandler} className="flex items-center gap-[2vw] flex-col justify-center p-[8vw] border-zinc-800 shadow-2xl border-2">

                    <input
                        value={email}
                        onChange={(e) => { setemail(e.target.value) }}
                        className="px-[2vw] bg-transparent border-2 border-zinc-800 py-[.4vw]"
                        type="email"
                        name="email"
                        placeholder="Email"
                    />
                    <input
                        value={password}
                        onChange={(e) => { setpassword(e.target.value) }}
                        className="px-[2vw] bg-transparent border-2 border-zinc-800 py-[.4vw]"
                        type="password"
                        name="password"
                        placeholder="Password"
                    />

                    <input
                    onClick={() => setshowLogin(true)}
                        type="submit"
                        value="Log in"
                        className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold py-[.6vw] rounded-md shadow-lg hover:from-red-700 hover:to-red-900 transition-all cursor-pointer"
                    />

                    <p>Don't have any account? <Link className='text-blue-600' to={'/signup'}>Signup</Link></p>
                </form>


            </div>
        </div>
    )
}

export default Login
