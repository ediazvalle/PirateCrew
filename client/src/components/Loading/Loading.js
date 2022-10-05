import React from 'react'
import loading from "../../loading.gif";
export const Loading = () => {
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <img src={loading} alt="Loading" width="43" />
        </div>
    )
}
