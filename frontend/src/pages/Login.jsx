import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loginform from '../components/Loginform';
import Fillinfo from '../components/Fillinfo';
import Button from '../components/Button';
import { useConnectWallet } from "@web3-onboard/react";

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [walletaddress, setWalletaddress] = useState('');
  const [showApprovalForm, setShowApprovalForm] = useState(false);
  const [userDetails, setUserDetails] = useState({
    gender: '',
    dob: '',
    bloodGroup: '',
    medicalCondition: '',
  });
  

  const navigate = useNavigate();

  const { backendUrl, token, setToken } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Sign Up') {
      const { data } = await axios.post(backendUrl + '/api/user/register', { walletaddress });

      if (data.success) {
        setState('Login')
        // setWalletaddress('')
      } else {
        toast.error(data.message);
      }
    } else {
      const { data } = await axios.post(backendUrl + '/api/user/login', { walletaddress });

      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);

        // Check the isApproved flag
        if (!data.isApproved) {
          setShowApprovalForm(true);
        } else {
          navigate('/patientdash');
        }
      } else {
        toast.error(data.message);
      }
    }
  };

  const onApprovalFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/update-profile',
        { ...userDetails },
        { headers: { token } }
      );

      if (data.success) {
        toast.success('Information updated successfully!');
        setShowApprovalForm(false);
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('An error occurred while updating information.');
    }
  };

  // useEffect(() => {
  //   if (token && !showApprovalForm) {
  //     navigate('/');
  //   }
  // }, [token, showApprovalForm]);



  return (
    <form
      onSubmit={showApprovalForm ? onApprovalFormSubmit : onSubmitHandler}
      className="min-h-[80vh] flex items-center"
    >
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        {!showApprovalForm ? (
          <Loginform state={state} setState={setState} walletaddress={walletaddress} setWalletaddress={setWalletaddress}/>
        ) : (
         <Fillinfo userDetails={userDetails} setUserDetails={setUserDetails}/>
        )}
      </div>
    </form>
  );
};

export default Login;
