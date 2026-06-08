import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi'
import toast from "react-hot-toast";
import { useForm } from 'react-hook-form';
import InputField from '../components/atoms/Input';
import { Button } from '../components/atoms/Button';
import Stepper from '../components/molecules/Stepper';

const schema = joi.object({
    new_password: joi.string().min(8).required().messages({
        "string.empty": "New password is required!",
        "string.min": "Password must be at least 8 characters!",
        "any.required": "New password is required!",
    }),
    confirm_password: joi.any().valid(joi.ref('new_password')).required().messages({
        "any.only": "Passwords do not match!",
        "any.required": "Please confirm your password!",
    })
});
function ForgotPassword() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: joiResolver(schema)
    });
    const onSubmit = (data) => {
        console.log("Data Password Baru:", data);
        toast.success("Password berhasil diubah!");
        setTimeout(() => navigate('/auth'), 2000);
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
                <section className='hidden sm:block mb-6'>
                    <Stepper steps={["Email", "OTP", "Reset"]} activeStep={2} />
                </section>
                <section>
                    <h1 className="text-2xl text-center font-bold text-darkgrey mb-2">
                        Reset Password
                    </h1>
                    <p className='text-sm text-center text-grey mb-6'>
                        Create a new, secure password for your account
                    </p>
                </section>
                <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                    <InputField
                        label='New Password'
                        type='password'
                        id='new_password'
                        placeholder='Write your new password'
                        {...register('new_password')}
                    />

                    <InputField
                        label='Confirm Password'
                        type='password'
                        id='confirm_password'
                        placeholder='Write your confirm password'
                        {...register('confirm_password')}
                    />
                    <div className="h-2 w-full text-right">
                        {(errors.new_password || errors.confirm_password) && (
                            <p className="text-important text-xs">
                                {errors.new_password?.message || errors.confirm_password?.message}
                            </p>
                        )}
                    </div>

                    <Button type='submit' color='blue' size='full' shape='rectangle' className='hover:bg-blue-800'>
                        Save
                    </Button>
                </form>

            </main>
        </div>
    )
}

export default ForgotPassword;