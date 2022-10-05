import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../../components/auth/auth';
import DashboardCard from '../../components/Dashboard/DashboardCard'
import { Loading } from '../../components/Loading/Loading';
import { ErrorMessage } from '../../components/Messages/messages';
import "./Dashboard.css"

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getPirates = async () => {
        setLoading(true);
        await axios.get(`/api/pirates/user/${isAuthenticated()._id}`, {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            setLoading(false);
            if (res.status === 200) {
                // setData(res.data && res.data.filter(item => item.name.toLowerCase().includes(item.name.toLowerCase())));
                setData(res.data.sort(function (a, b) {
                    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
                }))
            }
            else {
                ErrorMessage(res.data.errorMessage);
            }
        })

    };

    useEffect(() => {
        getPirates();

        return () => {

        }
    }, [])


    return (
        <div className='Dashboard'>
            {
                loading ?
                    <Loading />
                    :
                    data && data.length > 0 ? data.map(d => {
                        return (
                            <DashboardCard data={d} update={getPirates} />
                        )
                    })
                        :
                        <div className='text-center fs-6'>No data found!</div>
            }
        </div>
    )
}

export default Dashboard
