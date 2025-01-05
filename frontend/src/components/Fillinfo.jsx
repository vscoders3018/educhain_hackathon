import React from 'react'

const Fillinfo = ({userDetails,setUserDetails}) => {
  return (
    <>
    <p className="text-2xl font-semibold">Complete Your Profile</p>
    <p>Fill in the details to proceed</p>
    <div className="w-full">
      <label>Gender</label>
      <select
        value={userDetails.gender}
        onChange={(e) => setUserDetails({ ...userDetails, gender: e.target.value })}
        className="border border-[#DADADA] rounded w-full p-2 mt-1"
        required
      >
        <option value="">Select</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </div>
    <div className="w-full">
      <label>Date of Birth</label>
      <input
        type="date"
        value={userDetails.dob}
        onChange={(e) => setUserDetails({ ...userDetails, dob: e.target.value })}
        className="border border-[#DADADA] rounded w-full p-2 mt-1"
        required
      />
    </div>
    <div className="w-full">
      <label>Blood Group</label>
      <select
        value={userDetails.bloodGroup}
        onChange={(e) => setUserDetails({ ...userDetails, bloodGroup: e.target.value })}
        className="border border-[#DADADA] rounded w-full p-2 mt-1"
        required
      >
        <option value="">Select</option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
      </select>
    </div>
    <div className="w-full">
      <label>Medical Condition</label>
      <textarea
        value={userDetails.medicalCondition}
        onChange={(e) => setUserDetails({ ...userDetails, medicalCondition: e.target.value })}
        className="border border-[#DADADA] rounded w-full p-2 mt-1"
      />
    </div>
    <button className="bg-primary text-white w-full py-2 my-2 rounded-md text-base">Submit</button>
  </>
  )
}

export default Fillinfo
