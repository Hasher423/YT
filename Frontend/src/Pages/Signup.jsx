import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUpload, FiX, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        channelName: '',
        logo: null,
        bgBanner: null,
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [logoPreview, setLogoPreview] = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);

    const navigate = useNavigate();

    // File validation config
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'username':
                if (!value.trim()) error = 'Username is required';
                else if (value.length < 3) error = 'Username must be at least 3 characters';
                break;
            case 'channelName':
                if (!value.trim()) error = 'Channel name is required';
                else if (value.length < 2) error = 'Channel name too short';
                break;
            case 'email':
                if (!value) error = 'Email is required';
                else if (!/^\S+@\S+\.\S+$/.test(value)) error = 'Invalid email format';
                break;
            case 'password':
                if (!value) error = 'Password is required';
                else if (value.length < 6) error = 'Password must be at least 6 characters';
                break;
            case 'logo':
                if (!value) error = 'Logo is required';
                else if (!ALLOWED_TYPES.includes(value.type)) error = 'Only JPG, PNG, WebP allowed';
                else if (value.size > MAX_FILE_SIZE) error = 'Logo must be under 5MB';
                break;
            case 'bgBanner':
                if (!value) error = 'Banner is required';
                else if (!ALLOWED_TYPES.includes(value.type)) error = 'Only JPG, PNG, WebP allowed';
                else if (value.size > MAX_FILE_SIZE) error = 'Banner must be under 5MB';
                break;
            default:
                break;
        }

        return error;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error on typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        const error = validateField(type, file);
        if (error) {
            setErrors(prev => ({ ...prev, [type]: error }));
            e.target.value = '';
            return;
        }

        setFormData(prev => ({ ...prev, [type]: file }));
        setErrors(prev => ({ ...prev, [type]: '' }));

        // Generate preview
        const reader = new FileReader();
        reader.onloadend = () => {
            if (type === 'logo') setLogoPreview(reader.result);
            else setBannerPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const removeFile = (type) => {
        setFormData(prev => ({ ...prev, [type]: null }));
        setErrors(prev => ({ ...prev, [type]: 'This field is required' }));
        if (type === 'logo') {
            setLogoPreview(null);
            document.getElementById('logo-upload').value = '';
        } else {
            setBannerPreview(null);
            document.getElementById('banner-upload').value = '';
        }
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setSuccessMessage('');
        setErrors({});

        const data = new FormData();
        data.append('name', formData.username);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('channelName', formData.channelName);
        data.append('logo', formData.logo);
        data.append('bgBanner', formData.bgBanner);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URI}/user/signup`,
                data,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true,
                }
            );

            setSuccessMessage('Account created successfully! Redirecting...');
            setTimeout(() => navigate('/'), 1500);
        } catch (error) {
            const msg = error.response?.data?.message || 'Signup failed. Please try again.';
            setErrors({ submit: msg });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-zinc-900 to-black flex items-center justify-center p-4 xl:p-8">
            <div className="w-full max-w-md">
                <div className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-zinc-800 p-8 xl:p-10">
                    <h2 className="text-3xl xl:text-4xl font-bold text-white text-center mb-8 font-youtube">
                        Create Account
                    </h2>

                    {successMessage && (
                        <div className="mb-6 p-4 bg-green-900/50 border border-green-700 text-green-200 rounded-lg flex items-center gap-2">
                            <FiCheckCircle />
                            {successMessage}
                        </div>
                    )}

                    {errors.submit && (
                        <div className="mb-6 p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-lg flex items-center gap-2">
                            <FiAlertCircle />
                            {errors.submit}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Username */}
                        <div>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                placeholder="Username"
                                className={`w-full px-4 py-3 bg-zinc-800/50 border ${errors.username ? 'border-red-600' : 'border-zinc-700'
                                    } rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-red-500 transition-colors`}
                            />
                            {errors.username && <p className="mt-1 text-sm text-red-400">{errors.username}</p>}
                        </div>

                        {/* Channel Name */}
                        <div>
                            <input
                                type="text"
                                name="channelName"
                                value={formData.channelName}
                                onChange={handleInputChange}
                                placeholder="Channel Name"
                                className={`w-full px-4 py-3 bg-zinc-800/50 border ${errors.channelName ? 'border-red-600' : 'border-zinc-700'
                                    } rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-red-500 transition-colors`}
                            />
                            {errors.channelName && <p className="mt-1 text-sm text-red-400">{errors.channelName}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                                className={`w-full px-4 py-3 bg-zinc-800/50 border ${errors.email ? 'border-red-600' : 'border-zinc-700'
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
                                onChange={handleInputChange}
                                placeholder="Password"
                                className={`w-full px-4 py-3 bg-zinc-800/50 border ${errors.password ? 'border-red-600' : 'border-zinc-700'
                                    } rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-red-500 transition-colors`}
                            />
                            {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
                        </div>

                        {/* Logo Upload */}
                        <div>
                            <input
                                id="logo-upload"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'logo')}
                                className="hidden"
                            />
                            <label
                                htmlFor="logo-upload"
                                className={`flex flex-col items-center justify-center w-full h-32 border-2 ${errors.logo ? 'border-red-600' : 'border-zinc-700'
                                    } border-dashed rounded-lg cursor-pointer bg-zinc-800/30 hover:bg-zinc-800/50 transition-all`}
                            >
                                {logoPreview ? (
                                    <div className="relative">
                                        <img src={logoPreview} alt="Logo preview" className="h-20 w-20 object-cover rounded-full" />
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                removeFile('logo');
                                            }}
                                            className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-1 text-xs"
                                        >
                                            <FiX />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <FiUpload className="mx-auto text-2xl text-zinc-400" />
                                        <p className="text-sm text-zinc-400 mt-1">Upload Logo</p>
                                    </div>
                                )}
                            </label>
                            {errors.logo && <p className="mt-1 text-sm text-red-400">{errors.logo}</p>}
                        </div>

                        {/* Banner Upload */}
                        <div>
                            <input
                                id="banner-upload"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'bgBanner')}
                                className="hidden"
                            />
                            <label
                                htmlFor="banner-upload"
                                className={`flex flex-col items-center justify-center w-full h-32 border-2 ${errors.bgBanner ? 'border-red-600' : 'border-zinc-700'
                                    } border-dashed rounded-lg cursor-pointer bg-zinc-800/30 hover:bg-zinc-800/50 transition-all`}
                            >
                                {bannerPreview ? (
                                    <div className="relative w-full h-full">
                                        <img src={bannerPreview} alt="Banner preview" className="w-full h-full object-cover rounded-lg" />
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                removeFile('bgBanner');
                                            }}
                                            className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 text-xs"
                                        >
                                            <FiX />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <FiUpload className="mx-auto text-2xl text-zinc-400" />
                                        <p className="text-sm text-zinc-400 mt-1">Upload Banner</p>
                                    </div>
                                )}
                            </label>
                            {errors.bgBanner && <p className="mt-1 text-sm text-red-400">{errors.bgBanner}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${isLoading
                                ? 'bg-zinc-700 cursor-not-allowed'
                                : 'bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 shadow-lg'
                                }`}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Creating Account...
                                </span>
                            ) : (
                                'Sign Up'
                            )}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-zinc-400 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-red-500 hover:text-red-400 font-medium transition-colors">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;