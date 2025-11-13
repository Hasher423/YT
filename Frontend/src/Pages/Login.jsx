import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [serverError, setServerError] = useState('');

    const navigate = useNavigate();

    // Validation
    const validateField = (name, value) => {
        let error = '';
        if (name === 'email') {
            if (!value) error = 'Email is required';
            else if (!/^\S+@\S+\.\S+$/.test(value)) error = 'Invalid email format';
        }
        if (name === 'password') {
            if (!value) error = 'Password is required';
            else if (value.length < 6) error = 'Password must be at least 6 characters';
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error on typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        setServerError('');
    };

    const validateForm = () => {
        const newErrors = {};
        ['email', 'password'].forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) newErrors[field] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setServerError('');
        setSuccessMessage('');

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URI}/user/login`,
                {
                    email: formData.email,
                    password: formData.password,
                },
                { withCredentials: true }
            );

            if (response.data?.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                setSuccessMessage('Login successful! Redirecting...');
                setTimeout(() => navigate('/'), 1500);
            }
        } catch (error) {
            const msg = error.response?.data?.message || 'Invalid email or password';
            setServerError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-zinc-900 to-black flex items-center justify-center p-4 xl:p-8">
            <div className="w-full max-w-md">
                <div className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-zinc-800 p-8 xl:p-10">
                    <h2 className="text-3xl xl:text-4xl font-bold text-white text-center mb-8 font-youtube">
                        Welcome Back
                    </h2>

                    {/* Success Message */}
                    {successMessage && (
                        <div className="mb-6 p-4 bg-green-900/50 border border-green-700 text-green-200 rounded-lg flex items-center gap-2 text-sm">
                            Success: {successMessage}
                        </div>
                    )}

                    {/* Server Error */}
                    {serverError && (
                        <div className="mb-6 p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-lg flex items-center gap-2 text-sm">
                            Error: {serverError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className={`w-full px-4 py-3 bg-zinc-800/50 border ${
                                    errors.email ? 'border-red-600' : 'border-zinc-700'
                                } rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-red-500 transition-colors`}
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className={`w-full px-4 py-3 bg-zinc-800/50 border ${
                                    errors.password ? 'border-red-600' : 'border-zinc-700'
                                } rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-red-500 transition-colors`}
                            />
                            {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                                isLoading
                                    ? 'bg-zinc-700 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 shadow-lg'
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Logging in...
                                </>
                            ) : (
                                'Log In'
                            )}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-zinc-400 text-sm">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-red-500 hover:text-red-400 font-medium transition-colors">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;