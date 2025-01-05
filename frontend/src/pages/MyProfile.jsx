import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(false);
    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext);



    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();
            const fields = ['gender', 'dob', 'bloodGroup', 'medicalCondition'];
            fields.forEach(field => formData.append(field, userData[field]));

            if (image) formData.append('image', image);

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } });

            if (data.success) {
                toast.success(data.message);
                await loadUserProfileData();
                setIsEdit(false);
                setImage(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            ;
            toast.error(error.message);
        }
    };

    const handleInputChange = (field) => (e) => {
        setUserData(prev => ({ ...prev, [field]: e.target.value }));
    };

    const renderField = (label, field, type = 'text', options = null) => {
        const predefinedOptions = {
            gender: ["Not Selected", "Male", "Female", "Other"],
            bloodGroup: ["Not Selected", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
        };
    
        const fieldOptions = predefinedOptions[field] || options;
    
        return (
            <>
                <p className='font-medium'>{label}:</p>
                {isEdit ? (
                    fieldOptions ? (
                        <select
                            className='max-w-20 bg-gray-50'
                            onChange={handleInputChange(field)}
                            value={userData[field]}
                        >
                            {fieldOptions.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    ) : (
                        <input
                            className='max-w-28 bg-gray-50'
                            type={type}
                            onChange={handleInputChange(field)}
                            value={userData[field]}
                        />
                    )
                ) : (
                    <p className='text-gray-500'>{userData[field]}</p>
                )}
            </>
        );
    };

    useEffect(() => {
        loadUserProfileData()
    }, []);
    
    return (
        <div className='flex items-center justify-center my-5 py-5 bg-gray-100'> 
        <div className='bg-white shadow-md rounded-lg p-8 max-w-lg w-full'> 
            <div className='flex flex-col items-center mb-6'>
                <img className='w-36 h-36 rounded-full object-cover mb-4' src={userData?.image} alt="" /> 
                <h2 className='text-2xl font-semibold text-gray-800'>{userData?.name}</h2> 
            </div>

            <hr className='bg-gray-300 h-px my-6' /> 

            <div className='text-lg'>
                <p className='text-gray-700 font-semibold mb-3'>BASIC INFORMATION</p>
                <div className='grid grid-cols-2 gap-y-4'>
                    {renderField('Gender', 'gender', null, ['Not Selected', 'Male', 'Female'])}
                    {renderField('Date of Birth', 'dob', 'date')}
                    {renderField('Blood Group', 'bloodGroup')}
                    {renderField('Medical Condition', 'medicalCondition')}
                </div>
            </div>

            <div className='mt-8'> 
                <button
                    onClick={isEdit ? updateUserProfileData : () => setIsEdit(true)}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out w-full'
                >
                    {isEdit ? 'Save Information' : 'Edit Profile'}
                </button>
            </div>
        </div>
    </div>
    );
};

export default MyProfile;
