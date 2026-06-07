import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from '../components/atoms/Button';
import Stepper from '../components/molecules/Stepper';
import OtpInput from '../components/molecules/OTP';


function ActivatePage() {
    const navigate = useNavigate();

    const [otp, setOtp] = useState(new Array(6).fill(''));
    const inputRefs = useRef([]);


    const handleChange = (value, index) => {
        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        if (value && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            if (!otp[index] && index > 0 && inputRefs.current[index - 1]) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
        if (pastedData.some(isNaN)) return;

        const newOtp = [...otp];
        pastedData.forEach((char, i) => {
            if (i < 6) newOtp[i] = char;
        });
        setOtp(newOtp);

        const focusIndex = pastedData.length < 6 ? pastedData.length : 5;
        if (inputRefs.current[focusIndex]) {
            inputRefs.current[focusIndex].focus();
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const otpCode = otp.join("");

        if (otpCode.length < 6) {
            toast.error("Kode OTP harus 6 digit!");
            return;
        }

        console.log("Kode OTP untuk verifikasi:", otpCode);

        toast.success('Aktivasi berhasil!', {
            style: { border: '1px solid #00D452', padding: '16px', color: '#00D452' },
            iconTheme: { primary: '#00D452', secondary: '#FFFAEE' },
        });
        setTimeout(() => {
            navigate('done');
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

                    <section className='hidden sm:block mb-6'>
                        <Stepper steps={["Fill Form", "Activate", "Done"]} activeStep={1} />
                    </section>

                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-darkgrey mb-2">
                            Activate Account
                        </h1>
                        <p className='text-sm text-grey'>
                            We have sent a 6-digit verification code to your email.
                        </p>
                    </div>

                    <form onSubmit={onSubmit}>
                        <OtpInput
                            otp={otp}
                            inputRefs={inputRefs}
                            handleChange={handleChange}
                            handleKeyDown={handleKeyDown}
                            handlePaste={handlePaste}
                        />

                        <Button type='submit' color='blue' size='full' shape='rectangle' className='mt-8 hover:bg-blue-800'>
                            Activate Now
                        </Button>
                    </form>
                </main>
            </div>

        </>
    )
}

export default ActivatePage;