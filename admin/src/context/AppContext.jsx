import { createContext, useEffect, useState,useContext } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { DoctorContext } from './DoctorContext'


export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '₹'
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
    const [userData, setUserData] = useState(false)
    const { dToken } = useContext(DoctorContext)
    

    // Getting Doctors using API
    // const getDoctosData = async () => {

    //     try {

    //         const { data } = await axios.get(backendUrl + '/api/doctor/list')
    //         if (data.success) {
    //             setDoctors(data.doctors)
    //         } else {
    //             toast.error(data.message)
    //         }

    //     } catch (error) {
    //         
    //         toast.error(error.message)
    //     }

    // }

    // Getting User Profile using API
    const loadUserProfileData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/doctor/get-profile', { headers: { dToken } })

            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            
            toast.error(error.message)
        }

    }

    // useEffect(() => {
    //     getDoctosData()
    // }, [])

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        }
    }, [token])


    const currency = import.meta.env.VITE_CURRENCY

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    // Function to calculate the age eg. ( 20_01_2000 => 24 )
    const calculateAge = (dob) => {
        const today = new Date()
        const birthDate = new Date(dob)
        let age = today.getFullYear() - birthDate.getFullYear()
        return age
    }

    const value = {
        backendUrl,
        currency,
        slotDateFormat,
        calculateAge,
        doctors,
        currencySymbol,
        token, setToken,
        userData, setUserData, loadUserProfileData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider