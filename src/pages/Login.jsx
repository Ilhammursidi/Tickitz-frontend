import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import joi from 'joi';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import InputField from '../components/atoms/Input';
import { Button } from '../components/atoms/Button';

const schema = joi.object({
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email and Password are required!',
      'string.email': 'Format email tidak valid!,
      'any.required': 'Email and Password are required!',
    }),
  password: joi.string().min(8).required().messages({
    'string.empty': 'Email and Password are required!',
    'string.min': 'Password minimal harus 8 karakter!',
    'any.required': 'Email and Password are required!',
  }),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('Data Login:', data);
    // toast.success("Login berhasil!");
    toast.success('Login berhasil', {
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
  };
  const backgrounds = [
    '/src/assets/images/bg-auth.svg',
    '/src/assets/images/bg-auth-2.jpg',
    '/src/assets/images/bg-auth-3.jpg',
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
      <div className="font-main relative flex min-h-screen flex-col items-center justify-center px-2 py-8">
        {backgrounds.map((bg, index) => (
          <div
            key={index}
            className={`absolute inset-0 z-0 bg-black/40 bg-cover bg-center bg-no-repeat bg-blend-overlay transition-opacity duration-1000 ease-in-out ${
              index === currentBg ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url('${bg}')` }}
          />
        ))}
        <section className="mb-8 flex justify-center">
          <img
            src="/src/assets/images/tickitz-white.svg"
            className="z-10 w-40 md:w-50 lg:w-60"
          />
        </section>
        <main className="md:min-3/6 z-10 w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
          <section>
            <h1 className="text-darkgrey mb-2 text-2xl font-bold">
              Welcome Back 👋
            </h1>
            <p className="text-grey mb-6 text-sm">
              Sign in with your data that you entered during your registration
            </p>
          </section>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <InputField
              label="Email"
              type="email"
              id="email"
              placeholder="Write your email"
              {...register('email')}
            />

            <InputField
              label="Password"
              type="password"
              id="password"
              placeholder="Write your password"
              {...register('password')}
            />
            <div className="h-2 w-full text-right">
              {(errors.email || errors.password) && (
                <p className="text-important text-xs">
                  {errors.email?.message || errors.password?.message}
                </p>
              )}
            </div>
            <div className="text-primary cursor-pointer text-right text-sm font-semibold hover:underline">
              <Link
                to="forgotpassword"
                title="Forgot Password"
                // className="hover:text-primary text-black hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              color="blue"
              size="full"
              shape="rectangle"
              className="hover:bg-blue-800"
            >
              Login
            </Button>
          </form>
          <section className="mt-5">
            <div className="mb-5 flex items-center justify-center gap-20">
              <div className="bg-grey h-px flex-1"></div>
              <span className="text-grey">Or</span>
              <div className="bg-grey h-px flex-1"></div>
            </div>
            <div className="flex items-center justify-center gap-5">
              <Button
                color="white"
                size="medium"
                shape="rectangle"
                className="hover:bg-primary hover:text-white"
              >
                <a className="flex items-center justify-center gap-2">
                  <img src="/src/assets/icons/google-auth.svg" />
                  <span className="text-darkgrey hidden hover:text-white md:block">
                    Google
                  </span>
                </a>
              </Button>
              <Button
                color="white"
                size="medium"
                shape="rectangle"
                className="hover:bg-primary"
              >
                <a className="flex items-center justify-center gap-2">
                  <img src="/src/assets/icons/fb-auth.svg" />
                  <span className="text-darkgrey hidden hover:text-white md:block">
                    Facebook
                  </span>
                </a>
              </Button>
            </div>
            <div className="text-darkgrey mt-4 flex justify-center gap-2 text-center text-sm">
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
  );
}

export default Login;
