import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom'
import { ErrorMessage, SuccessMessage } from '../Messages/messages';
import "./DashboardCard.css"

const DashboardCard = ({ data, update }) => {

    const deletePirate = async (id) => {
        await axios.delete(`/api/pirates/delete/${id}`, {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            if (res.status === 200) {
                SuccessMessage(res.data.successMessage);
                update();
            }
            else {
                ErrorMessage(res.data.errorMessage);
            }
        })

    };
    return (
        <div className='DashboardCard my-2'>
            <div className='row'>
                <div className='col-sm-4'>
                    <img src={data.imgUrl} className="w-100" alt={data.name} />
                </div>
                <div className='col-sm-8'>
                    <div>
                        <div className='text-center fs-4 fw-bolder mb-2'>{data.name}</div>
                        <div className='d-flex justify-content-between gap-4'>
                            <Link to={"/pirate/" + data._id} className='btn view w-100'>View Pirate</Link>
                            <button onClick={() => deletePirate(data._id)} className='btn walk w-100'>Walk the Plank</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardCard
