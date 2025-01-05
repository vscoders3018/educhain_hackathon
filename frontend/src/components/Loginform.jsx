import React, { useEffect } from 'react';
import Button from '../components/Button';
import { useConnectWallet } from "@web3-onboard/react";

const Loginform = ({ state, setState, walletaddress, setWalletaddress }) => {
  const [
    {
      wallet,
      connecting, 
    },
    connect,
    disconnect,
  ] = useConnectWallet();

  useEffect(() => {
    if (wallet) {
      setWalletaddress(wallet.accounts[0].address);
    }
  }, [wallet]);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book an appointment.
        </p>

        <div className="w-full mb-4">
          <Button
            title={wallet ? 'Connected' : 'Connect Wallet'}
            disabled={wallet}
            handleClick={() => connect()}
            className="w-full" 
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
            Address
          </label>
          <input
            id="address"
            type="text"
            value={walletaddress}
            onChange={(e) => setWalletaddress(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            disabled
          />
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        <p className="text-center mt-6">
          {state === 'Sign Up' ? (
            <>
              Already have an account?{' '}
              <span
                onClick={() => setState('Login')}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Create a new account?{' '}
              <span
                onClick={() => setState('Sign Up')}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Click here
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Loginform;
