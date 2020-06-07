import React from 'react'

import './custom-button.styles.scss'

const CustomButton = ({label,handleClick}) => {
    return (
        <button type='submit' className='custom-button' onClick={handleClick}>
            <p>{label}</p>
        </button>
    )
}

export default CustomButton
