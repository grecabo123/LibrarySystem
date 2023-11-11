import axios from 'axios';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';
import { Tag } from 'primereact/tag';
import React, { useEffect, useState } from 'react'
import DataTable,{createTheme} from 'react-data-table-component'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


function Students() {

    const [RegisteredData, setRegister] = useState([]);
    const [loading, setloading] = useState(true);

    
    

    useEffect(() => {
        axios.get(`/api/registered`).then(res => {
            if (res.data.status === 200) {
                setRegister(res.data.accounts);
            }
            setloading(false)
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');

            }
        })
    }, []);

    const columns = [
        {
            name: "Name",
            selector: row => row.name_user,
            sortable: true,
        },
        {
            name: "Email",
            selector: row => row.email,
            sortable: true,
        },
        {
            name: "Role",
            selector: row => row.role === 1 ? <Tag severity={'info'} value="Admin" /> : <Tag severity={'success'} value='User type' />,
        },
        {
            name: "Actions",
            cell: row => <div>

                <Link className="me-2" to={`/admin/account/refid=${row.id}`}><Button className='p-button-sm p-button-info' icon={PrimeIcons.USER} label='Details' /> </Link>
                <Link className="me-2" to={`/admin/account/id=${row.id}`}> <Button className='p-button-sm p-button-danger' icon={PrimeIcons.TRASH} label='Details' /> </Link>
            </div>,
            sortable: true,
        },
    ]
    

    return (
        <div>
             <DataTable
                    title=" "
                    columns={columns}
                    data={RegisteredData}
                    pagination
                    progressPending={loading}
                    progressComponent={
                        <>
                            <div className="container">
                            <Skeleton className='w-100' borderRadius='20px' />
                            </div>
                        </>
                    }
                    selectableRows
                    subHeader
                    subHeaderAlign='right'
                 
                />
        </div>
    )
}

export default Students