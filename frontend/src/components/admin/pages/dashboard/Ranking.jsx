import axios from 'axios';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';

function Ranking() {

    const [ListData, setListData] = useState([])

    useEffect(() => {
        axios.get(`/api/MostVvisited`).then(res => {
            if(res.data.status === 200) {
                setListData(res.data.data)
            }
            else{

            }
        }).catch((error) => {
            if(error.response.status === 500){
                swal("Warning",error.response.statusText,'warning');

            }
        })
    },[]);



    return (
        <div className='mt-4'>
            <div className="mt-4">
                <center>
                    <h4 className='text-secondary'>List of 5 Most Visited Thesis</h4>
                </center>
            </div>
            <ul className="list-group border-0">
                {
                    ListData.map((data,idx) => {
                        return (
                            <li key={idx} className="list-group-item border-0 bg-transparent mb-3 d-flex justify-content-between align-items-center">
                                <span className=''>{data.title}</span> 
                                <span className="badge bg-primary rounded-pill">{data.total}</span>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Ranking