import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [state, setState] = useState('Admin'); // Toggle between Admin and Company
  const [mode, setMode] = useState('Login'); // Toggle between Login and Signup

  const [name, setName] = useState(''); // For signup (Company only)
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState(''); // For login (Admin only)
  const [password, setPassword] = useState('');

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { setDToken } = useContext(DoctorContext);
  const { setAToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Admin') {
        const url = `${backendUrl}/api/admin/login`;
        const { data } = await axios.post(url, { number, password });

        if (data.success) {
          setAToken(data.token);
          localStorage.setItem('aToken', data.token);
          toast.success('Admin login successful');
        } else {
          toast.error(data.message);
        }
      } else if (state === 'Company') {
        if (mode === 'Login') {
          const url = `${backendUrl}/api/company/login`;
          const { data } = await axios.post(url, { email, password });

          if (data.success) {
            setDToken(data.token);
            localStorage.setItem('dToken', data.token);
            toast.success('Company login successful');
          } else {
            toast.error(data.message);
          }
        } else if (mode === 'Signup') {
          const url = `${backendUrl}/api/company/signup`;
          const payload = { name, email, password };

          const { data } = await axios.post(url, payload);

          if (data.success) {
            toast.success('Signup successful! You can now login.');
            setMode('Login'); // Switch to login mode after successful signup
          } else {
            toast.error(data.message);
          }
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    setName('');
    setEmail('');
    setNumber('');
    setPassword('');
  }, [mode, state]);

  return (
    <form onSubmit={onSubmitHandler} className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col gap-5 p-8 min-w-[340px] sm:min-w-[400px] border rounded-xl shadow-lg bg-white">
        <h1 className="text-3xl font-bold text-center mb-6">
          <span className="text-primary">{state}</span> {mode}
        </h1>

        {state === 'Company' && mode === 'Signup' && (
          <div className="w-full">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-lg w-full p-3 text-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        )}

        {state === 'Company' && (
          <div className="w-full">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg w-full p-3 text-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        )}

        {state === 'Admin' && (
          <div className="w-full">
            <label htmlFor="number" className="block text-gray-700 font-medium mb-1">
              Number
            </label>
            <input
              id="number"
              type="tel"
              pattern="[0-9]{10}"
              required
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="border border-gray-300 rounded-lg w-full p-3 text-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        )}

        <div className="w-full">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg w-full p-3 text-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white w-full py-3 rounded-md text-lg font-semibold transition-colors hover:bg-primary-dark"
        >
          {mode}
        </button>

        <div className="text-center">
          {state === 'Admin' ? (
            <p>
              Company {mode}?{' '}
              <span onClick={() => setState('Company')} className="text-primary underline cursor-pointer">
                Click here
              </span>
            </p>
          ) : (
            <p>
              Admin {mode}?{' '}
              <span onClick={() => setState('Admin')} className="text-primary underline cursor-pointer">
                Click here
              </span>
            </p>
          )}
        </div>

        {state === 'Company' && (
          <div className="text-center">
            {mode === 'Login' ? (
              <p>
                New here?{' '}
                <span onClick={() => setMode('Signup')} className="text-primary underline cursor-pointer">
                  Signup
                </span>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <span onClick={() => setMode('Login')} className="text-primary underline cursor-pointer">
                  Login
                </span>
              </p>
            )}
          </div>
        )}
      </div>
    </form>
  );
};

export default Login;
