import React from 'react'

const Button = ({ title, handleClick }) => {
  return (
    <div>
      <button className='bg-primary text-white w-full py-2 my-2 rounded-md text-base' onClick={handleClick}>{title}</button>
    </div>
  )
}

export default Button
