import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const signup = () => {
    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [channelName, setchannelName] = useState('')
    const [logo, setlogo] = useState([])


    const navigate = useNavigate();


    const SubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', username);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('channelName', channelName);
            formData.append('logo', logo);

            const response = await axios.post('http://localhost:3000/user/signup', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });

            if (response.data) {
                navigate('/'); // Redirect to home
            }


            console.log('User registered:', response);
        } catch (error) {
            console.error('Error registering:', error.response?.data);
        }
    };




    return (
        <div className="bg-custom-black w-[100vw] h-[100vh] flex justify-center xl:text-[1.3vw]">
            <div className="flex items-center justify-center text-custom-white font-youtube bg-transparent">
                <form method={'post'} onSubmit={SubmitHandler} className="flex items-center gap-[2vw] flex-col justify-center p-[8vw] border-zinc-800 shadow-2xl border-2">
                    <input
                        value={username}
                        onChange={(e) => { setusername(e.target.value) }}
                        className="px-[2vw] bg-transparent border-2 border-zinc-800 py-[.4vw]"
                        type="text"
                        name="username"
                        placeholder="Username"
                    />
                    <input
                        value={channelName}
                        onChange={(e) => { setchannelName(e.target.value) }}
                        className="px-[2vw] bg-transparent border-2 border-zinc-800 py-[.4vw]"
                        type="text"
                        name="channelName"
                        placeholder="channelName"
                    />
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

                    {/* Hidden file input */}
                    <input
                        onChange={(e) => setlogo(e.target.files[0])}
                        id="file-upload"
                        className="hidden"
                        type="file"
                        name="logo"
                    />
                    {/* Custom label */}
                    <label
                        htmlFor="file-upload"
                        className="flex items-center justify-center w-full border-2 border-zinc-800 py-[.4vw] cursor-pointer hover:bg-zinc-800 transition-colors"
                    >
                        📁 Choose Logo
                    </label>

                    <input
                        type="submit"
                        value="Sign Up"
                        className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold py-[.6vw] rounded-md shadow-lg hover:from-red-700 hover:to-red-900 transition-all cursor-pointer"
                    />

                </form>
            </div>
        </div>
    )
}

export default signup
