import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import joi from 'joi';
import toast from "react-hot-toast";
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import InputField from '../components/atoms/Input';
import { Button } from '../components/atoms/Button';
import { useDispatch, useSelector } from 'react-redux';
import { loginSlice } from '../redux/slices/authSlice';

const schema = joi.object({
    email: joi.string()
        .email({ tlds: { allow: false } }).required().messages({
            "string.empty": "Email is required!",
            "string.email": "Invalid email format!",
            "any.required": "Email is required!",
        }),
    password: joi.string().min(8).required().messages({
        "string.empty": "Password is required!",
        "string.min": "Password must be at least 8 characters!",
        "any.required": "Password is required!",
    }),
});

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading } = useSelector((state) => state.auth)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: joiResolver(schema)
    });

    const onSubmit = (data) => {
        dispatch(loginSlice(data))
            .unwrap()
            .then(() => {
                // console.log("Data Login:", data);
                toast.success('Login success', {
                    style: {
                        border: '1px solid #00D452',
                        padding: '16px',
                        color: '#00D452',
                    },
                    iconTheme: {
                        primary: '#00D452',
                        secondary: '#FFFAEE',
                    },
                });
                navigate('/', { replace: true })
            })
            .catch((err) => {
                toast.error(err || "Login Failed, Try again!");
            })
    };
    const backgrounds = [
        '/src/assets/images/bg-auth.svg',
        '/src/assets/images/bg-auth-2.jpg',
        '/src/assets/images/bg-auth-3.jpg'
    ];

    const [currentBg, setCurrentBg] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBg((prev) => (prev + 1) % backgrounds.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [backgrounds.length]);
    return (
        <>
            <div className='min-h-screen relative flex flex-col items-center justify-center px-2 py-8 font-main'>
                {backgrounds.map((bg, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 z-0 bg-black/40 bg-blend-overlay bg-no-repeat bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentBg ? 'opacity-100' : 'opacity-0'
                            }`}
                        style={{ backgroundImage: `url('${bg}')` }}
                    />
                ))}
                <section className="mb-8 flex justify-center"><img src='/src/assets/images/tickitz-white.svg' className="z-10 w-40 md:w-50 lg:w-60" /></section>
                <main className='bg-white w-full z-10 p-8 rounded-lg shadow-lg md:min-3/6 max-w-lg'>
                    <section>
                        <h1 className="text-2xl font-bold text-darkgrey mb-2">
                            Welcome Back 👋
                        </h1>
                        <p className='text-sm text-grey mb-6'>
                            Sign in with your data that you entered during your registration
                        </p>
                    </section>
                    <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                        <InputField
                            label='Email'
                            type='email'
                            id='email'
                            placeholder='Write your email'
                            {...register('email')}
                        />

                        <InputField
                            label='Password'
                            type='password'
                            id='password'
                            placeholder='Write your password'
                            {...register('password')}
                        />
                        <div className="h-2 w-full text-right">
                            {(errors.email || errors.password) && (
                                <p className="text-important text-xs">
                                    {errors.email?.message || errors.password?.message}
                                </p>
                            )}
                        </div>
                        <div className='text-right text-sm text-primary cursor-pointer font-semibold hover:underline'>
                            <Link
                                to="forgotpassword"
                                title="Forgot Password"
                            // className="hover:text-primary text-black hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <Button type='submit' color='blue' size='full' shape='rectangle' className={`hover:bg-blue-800 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isLoading}>
                            {isLoading ? 'Processing...' : 'Login'}
                        </Button>
                    </form>
                    <section className='mt-5'>
                        <div className="flex items-center justify-center gap-20 mb-5">
                            <div className="h-px flex-1 bg-grey"></div>
                            <span className="text-grey">Or</span>
                            <div className="h-px flex-1 bg-grey"></div>
                        </div>
                        <div className='flex gap-5 justify-center items-center '>
                            <Button color='white' size='medium' shape='rectangle' className='hover:bg-primary hover:text-white'>
                                <a className='flex items-center justify-center gap-2 '><img src='/src/assets/icons/google-auth.svg' /><span className='hidden md:block text-darkgrey hover:text-white'>Google</span></a>
                            </Button>
                            <Button color='white' size='medium' shape='rectangle' className='hover:bg-primary '>
                                <a className='flex items-center justify-center gap-2'><img src='/src/assets/icons/fb-auth.svg' /><span className='hidden md:block text-darkgrey hover:text-white'>Facebook</span></a>
                            </Button>
                        </div>
                        <div className='flex justify-center mt-4 text-center gap-2 text-sm text-darkgrey'>
                            Don't have an account?
                            <Link
                                to="register"
                                title="Sign Up"
                                className="text-primary cursor-pointer font-semibold hover:underline"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </section>
                </main>
            </div>

        </>
    )
}

export default Login