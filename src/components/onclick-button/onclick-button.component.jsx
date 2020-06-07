import React from 'react'

const OnClickButton = ({label,handleSubmit}) => {
    return (
        <button type='submit' className='custom-button' onClick={handleSubmit}>
            <p>{label}</p>
        </button>
    )
}

export default OnClickButton
