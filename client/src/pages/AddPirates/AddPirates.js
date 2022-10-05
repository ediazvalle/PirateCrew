import { Checkbox } from 'antd'
import axios from 'axios';
import React, { useState } from 'react'
import { Loading } from '../../components/Loading/Loading';
import { ErrorMessage, SuccessMessage } from '../../components/Messages/messages';
import "./AddPirates.css"

const AddPirates = () => {
    const [pegLeg, setPegLeg] = useState(true);
    const [eyePatch, setEyePatch] = useState(true);
    const [hookHand, setHookHand] = useState(true);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        name: '',
        imgUrl: '',
        noOfChests: '',
        phrase: '',
        crewPosition: '',
    });

    const { name, imgUrl, noOfChests, phrase, crewPosition } = data;

    const pegChange = (e) => {
        if (e.target.checked) {
            setPegLeg(true)
        } else {
            setPegLeg(false);
        }
    };

    const eyePatchChange = (e) => {
        if (e.target.checked) {
            setEyePatch(true)
        } else {
            setEyePatch(false);
        }
    };
    const hookPatchChange = (e) => {
        if (e.target.checked) {
            setHookHand(true)
        } else {
            setHookHand(false);
        }
    };

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios.post('/api/pirates/new', {
            name, noOfChests, imgUrl, phrase, crewPosition, pegLeg, eyePatch, hookHand
        }, {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            setLoading(false);
            if (res.status === 200) {
                SuccessMessage(res.data.successMessage);
            }
            else {
                ErrorMessage(res.data.errorMessage);
            }
        })

    };

    console.log(data)
    console.log(pegLeg)
    console.log(eyePatch)
    console.log(hookHand)

    return (
        <div className='AddPirates'>
            <form onSubmit={submitHandler}>
                {
                    loading ?
                        <Loading />
                        :
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className="mb-3">
                                    <label className="form-label">Pirate Name</label>
                                    <input required name="name" type="text" className="form-control" onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Image Url</label>
                                    <input required name="imgUrl" type="text" className="form-control" onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label"># of Treasure Chests:</label>
                                    <input required name='noOfChests' type="number" className="form-control" onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Pirate Cotch Phrase:</label>
                                    <input required name='phrase' type="text" className="form-control" onChange={handleChange} />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="mb-3">
                                    <label className="form-label">Crew Position:</label>
                                    <select required name='crewPosition' className="form-select" aria-label="Default select example" onChange={handleChange}>
                                        <option selected value="Captain">Captain</option>
                                        <option value="First Mote">First Mote</option>
                                        <option value="Quarter Master">Quarter Master</option>
                                        <option value="Boatswain">Boatswain</option>
                                        <option value="Powder Monkey">Powder Monkey</option>
                                    </select>
                                </div>
                                <div className="mb-3 checkboxes">
                                    <div>
                                        <Checkbox checked={pegLeg} onChange={pegChange}>Peg Leg</Checkbox>
                                    </div>
                                    <div>
                                        <Checkbox checked={eyePatch} onChange={eyePatchChange}>17 Eye Patch</Checkbox>
                                    </div>
                                    <div>
                                        <Checkbox checked={hookHand} onChange={hookPatchChange}>Hook Hand</Checkbox>
                                    </div>
                                </div>
                                <div>
                                    <button type="submit" className="btn">Add Pirate</button>
                                </div>
                            </div>
                        </div>
                }
            </form>
        </div>
    )
}

export default AddPirates
