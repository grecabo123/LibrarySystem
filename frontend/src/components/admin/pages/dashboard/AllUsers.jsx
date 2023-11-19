import axios from 'axios';
import { Badge } from 'primereact/badge';
import { Card } from 'primereact/card'
import { Skeleton } from 'primereact/skeleton';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

function AllUsers() {

    const [Accounts, setAccount]  = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        axios.get(`/api/AllRegistered`).then(res => {
            if (res.data.status === 200) {
                setAccount(res.data.users);
            }
            setloading(false)
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');

            }
        })
    }, []);

    const column = [
        {
            name: "Name",
            selector: row =>row.name,
        },
        {
            name: "Email",
            selector: row => row.email,
        },
        {
            name: "Role",
            selector: row => row.role === 1 ? <Badge severity={'info'} value={'Admin'} /> : row.role === 2 ? <Badge severity={'success'} value={'Student'} /> : <Badge severity={'danger'} value={'Non Student'} /> ,
        },
        {
            name: "Status",
            selector: row => row.status === 1 ? <Badge className="p-badge" severity={'info'} value={'Active'} /> : <Badge className='p-badge' severity={'danger'} value={"Not Active"} />,

        },
    ]

    return (
        <>
            <DataTable 
                title="Registered Users"
                data={Accounts}
                columns={column}
                selectableRows
                pagination
                progressPending={loading}
                progressComponent={<Skeleton className='w-100' />}
            />
        </>
    )
}

export default AllUsers