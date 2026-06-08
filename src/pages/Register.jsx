import { useEffect, useState } from 'react';
import joi from 'joi';
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import InputField from '../components/atoms/Input';
import { Button } from '../components/atoms/Button';
import Stepper from '../components/molecules/Stepper';

const schema = joi.object({
    email: joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            "string.empty": "Email dan Password wajib diisi!",
            "string.email": "Format email tidak valid!",
            "any.required": "Email dan Password wajib diisi!",
        }),
    password: joi.string().min(8).required().messages({
        "string.empty": "Email dan Password wajib diisi!",
        "string.min": "Password minimal harus 8 karakter!",
        "any.required": "Email dan Password wajib diisi!",
    }),
    terms: joi.boolean().valid(true).required().messages({
        "any.only": "Anda harus menyetujui syarat & ketentuan!",
        "any.required": "Anda harus menyetujui syarat & ketentuan!",
    })
});

function Register() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: joiResolver(schema)
    });

    const onSubmit = (data) => {
        console.log("Data Login:", data);
        // toast.success("Login berhasil!");
        toast.success('Register berhasil', {
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
        setTimeout(() => {
            navigate('activate');
        }, 2000);
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
            <div className='min-h-screen relative flex flex-col items-center justify-center px-4 py-8 font-main'>
                {backgrounds.map((bg, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 z-0 bg-black/40 bg-blend-overlay bg-no-repeat bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentBg ? 'opacity-100' : 'opacity-0'
                            }`}
                        style={{ backgroundImage: `url('${bg}')` }}
                    />
                ))}
                <section className="mb-8 flex justify-center"><img src='/src/assets/images/tickitz-white.svg' className="z-10 w-40 md:w-50 lg:w-60" /></section>
                <main className='bg-white z-10 p-8 rounded-lg shadow-lg w-full md:min-3/6 max-w-lg'>
                    <section className='hidden sm:block '>
                        <Stepper steps={["Fill Form", "Activate", "Done"]} activeStep={0} />
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
                            {(errors.email || errors.password || errors.terms) && (
                                <p className="text-important text-xs">
                                    {errors.email?.message || errors.password?.message || errors.terms?.message}
                                </p>
                            )}
                        </div>
                        <div className="flex items-start gap-3 mt-4">
                            <input
                                type="checkbox"
                                id="terms"
                                className="mt-1 w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                                {...register('terms')}
                            />
                            <label htmlFor="terms" className="text-sm text-darkgrey">
                                I agree to terms & conditions
                            </label>
                        </div>

                        <Button type='submit' color='blue' size='full' shape='rectangle' className='hover:bg-blue-800'>
                            Join For Free Now
                        </Button>
                    </form>
                    <section className='mt-5'>
                        <div className="flex items-center justify-center gap-20 mb-5">
                            <div className="h-px flex-1 bg-grey"></div>
                            <span className="text-grey">Or</span>
                            <div className="h-px flex-1 bg-grey"></div>
                        </div>
                        <div className='flex gap-5 justify-center items-center'>
                            <Button color='white' size='medium' shape='rectangle' className='hover:bg-primary '>
                                <a className='flex items-center justify-center gap-2 '><img src='/src/assets/icons/google-auth.svg' /><span className='hidden md:block text-darkgrey hover:text-white'>Google</span></a>
                            </Button>
                            <Button color='white' size='medium' shape='rectangle' className='hover:bg-primary '>
                                <a className='flex items-center justify-center gap-2'><img src='/src/assets/icons/fb-auth.svg' /><span className='hidden md:block text-darkgrey hover:text-white'>Facebook</span></a>
                            </Button>
                        </div>
                    </section>
                    <div className='flex justify-center mt-4 text-center gap-2 text-sm text-darkgrey'>
                        Already have an account?
                        <Link
                            to="/auth"
                            title="Sign in "
                            className="text-primary cursor-pointer font-semibold hover:underline"
                        >
                            Login
                        </Link>
                    </div>
                </main>
            </div>

        </>
    )
}

export default Register