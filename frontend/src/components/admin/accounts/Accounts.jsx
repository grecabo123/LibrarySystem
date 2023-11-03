import axios from 'axios'
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';
import React, { useEffect, useState } from 'react'
import DataTable,{createTheme} from 'react-data-table-component'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import swal from 'sweetalert';
import {Badge} from 'primereact/badge'
import { FcBusinessContact } from 'react-icons/fc';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Card } from 'primereact/card';
        

function Accounts() {

    createTheme('solarized', {
        text: {
            primary: '#bfc5c7',
            secondary: '#2aa198',
        },
        background: {
            default: 'transparent',
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#bfc5c7',
        },
        action: {
            button: 'rgba(0,0,0,.54)',
            hover: 'rgba(0,0,0,.08)',
            disabled: 'rgba(0,0,0,.12)',
        },
    }, 'dark');

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
            selector: row => <span><FcBusinessContact size={20} className='me-2' />{row.name_user}</span>,
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
            cell: row => <>
                <Link className="me-2" to={`/admin/account/refid=${row.id}`}><Badge severity={'info'} value={'View'} /> </Link>
                <Link className="me-2" to={`/admin/account/id=${row.id}`}><Badge severity={'danger'} value={'Deactivate'} /> </Link>
            </>,
            sortable: true,
        },

    ]


    // if (loading) {
    //     return (
    //         <div className="container">
    //             <div className="card">
    //                 <div className="col-lg-12 mb-4">
    //                 <Skeleton width='100%' borderRadius='20px' />
    //                 </div>
    //                 <div className="col-lg-12 mb-4">
    //                 <Skeleton width='100%' borderRadius='20px' />
    //                 </div>
    //                 <div className="col-lg-12 mb-4">
    //                 <Skeleton width='100%' borderRadius='20px' />
    //                 </div>
    //                 <div className="col-lg-12 mb-4">
    //                 <Skeleton width='100%' borderRadius='20px' />
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

    return (
        <div className=' p-3'>
            <Card >
            <DataTable
                    title="Registered Account"
                    // noHeader={true}
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
                    subHeaderComponent={
                        <>
                            <InputText className="p-inputtext-sm" placeholder='Search ID' />
                        </>
                    }
                    theme='solarized'
                />
            </Card>
        </div>
    )
}

export default Accounts