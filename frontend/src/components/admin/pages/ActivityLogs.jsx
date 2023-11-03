import axios from 'axios';
import moment from 'moment';
import { Skeleton } from 'primereact/skeleton';
import React, { useEffect, useState } from 'react'
import DataTable, {createTheme} from 'react-data-table-component';
import { FaDesktop } from 'react-icons/fa';
import swal from 'sweetalert';
import { FcInspection } from "react-icons/fc";
import { Card } from 'primereact/card';

function ActivityLogs() {

   

    const [Logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const id = localStorage.getItem('auth_id');

        axios.get(`/api/Logs/${id}`).then(res => {
            if(res.data.status === 200){
                setLogs(res.data.data);
            }
            setLoading(false)
        }).catch((error) => {
            if(error.response.status === 500){
                swal("Warning",error.response.statusText,'warning');
            }
        })
    },[]);

    const column = [
        {
            name: "Activity",
            selector: row => <span><FaDesktop size={15} /> {row.activity}</span>,
        },
        {
            name: "Date Time",
            selector: row => moment(row.created_at).format('MMMM DD YYYY hh:mm a')
        },
    ]

    return (
        <div className='container mt-5 p-3'>
                <Card>
                <DataTable 
                    title="Activity Logs"
                    data={Logs}
                    columns={column}
                    selectableRows
                    pagination
                    progressPending={loading}
                    progressComponent={
                        <Skeleton  className='w-100' borderRadius='20' />
                    }
                />
                </Card>
        </div>
    )
}

export default ActivityLogs