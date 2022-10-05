import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Loading } from '../../components/Loading/Loading';
import { ErrorMessage } from '../../components/Messages/messages';
import "./Pirate.css"

const Pirate = (props) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    const getPirate = async () => {
        setLoading(true);
        await axios.get(`/api/pirates/pirate/${props.match.params.id}`, {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            if (res.status === 200 || res.status === 304) {
                setData(res.data);
                setLoading(false);
            }
            else {
                ErrorMessage(res.data.errorMessage);
                setLoading(false);
            }
        })

    };

    const updatePirate = async (d) => {
        setLoading(true);
        await axios.put(`/api/pirates/update/${props.match.params.id}`, { data: d }, {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            setLoading(false);
            if (res.status === 200 || res.status === 304) {
                getPirate();
            }
            else {
                ErrorMessage(res.data.errorMessage);
            }
        })

    };


    useEffect(() => {
        getPirate();

        return () => {

        }
    }, [])

    return (
        <div className='Pirate'>
            {
                loading ?
                    <Loading />
                    :
                    <div className='row'>
                        <div className='col-md-6'>
                            <img src={data.imgUrl} className="w-100" alt={data.name} />
                        </div>
                        <div className='col-md-6 about'>
                            <div>
                                <h2>About</h2>
                                <div className='item'>
                                    <div>Position:</div>
                                    <div>{data.crewPosition}</div>
                                </div>
                                <div className='item'>
                                    <div>Treasures:</div>
                                    <div>{data.noOfChests}</div>
                                </div>
                                <div className='item'>
                                    <div>Peg Leg:</div>
                                    <div>{data.pegLeg ? "Yes" : "No"}</div>
                                    <div>
                                        <button onClick={() => updatePirate("pegLeg")} className={!data.pegLeg ? "Yes" : "No"}>
                                            {!data.pegLeg ? "Yes" : "No"}
                                        </button>
                                    </div>
                                </div>
                                <div className='item'>
                                    <div>Eye Patch:</div>
                                    <div>{data.eyePatch ? "Yes" : "No"}</div>
                                    <div>
                                        <button onClick={() => updatePirate("eyePatch")} className={!data.eyePatch ? "Yes" : "No"}>
                                            {!data.eyePatch ? "Yes" : "No"}
                                        </button>
                                    </div>
                                </div>
                                <div className='item'>
                                    <div>Hook Hand:</div>
                                    <div>{data.hookHand ? "Yes" : "No"}</div>
                                    <div>
                                        <button onClick={() => updatePirate("hookHand")} className={!data.hookHand ? "Yes" : "No"}>
                                            {!data.hookHand ? "Yes" : "No"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div >
    )
}

export default Pirate
