import axios from 'axios';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react'
import DataTable,{createTheme} from 'react-data-table-component'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import swal from 'sweetalert';


function AdminAccounts() {

    const [RegisteredData, setRegister] = useState([]);
    const [loading, setloading] = useState(true);
    const toast = useRef();

    useEffect(() => {
        AdminAccount();
    }, []);

    const AdminAccount = () => {
        const id = 1;
        axios.get(`/api/registered/${id}`).then(res => {
            if (res.data.status === 200) {
                setRegister(res.data.accounts);
            }
            setloading(false)
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');

            }
        })
    }

    const DeactivateAccount = (e) => {
        axios.put(`/api/AccountDeactivate/${e}`).then(res => {
            if(res.data.status === 200) {
                toast.current.show({severity: "success", summary: res.data.succss, details: "Account Update"});
                AdminAccount();
            }
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
            }
        })      
    }

    const Activate = (e) => {
        axios.put(`/api/Accountactivate/${e}`).then(res => {
            if(res.data.status === 200) {
                toast.current.show({severity: "success", summary: res.data.succss, details: "Account Update"});
                AdminAccount();
            }
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
            }
        })
    }

    const columns = [
        {
            name: "Name",
            selector: row => row.name,
            sortable: true,
        },
        {
            name: "Email",
            selector: row => row.email,
            sortable: true,
        },
        {
            name: "Status",
            selector: row => row.status === 1 ? <Tag severity={'info'} value="Active" /> : <Tag severity={'success'} value='Not Active' />,
        },
        {
            name: "Actions",
            cell: row => <div>

                <Link className="me-2" to={`/admin/account/refid=${row.id}`}><Button className='p-button-sm p-button-info' icon={PrimeIcons.USER} label='Details' /> </Link>
                {
                    row.status === 1 ? <Button className='p-button-sm p-button-danger' value={row.id} icon={PrimeIcons.POWER_OFF} label='Deacivate' onClick={(e) => DeactivateAccount(e.target.value)} /> : <Button className='p-button-sm p-button-primary' value={row.id} icon={PrimeIcons.POWER_OFF} label='Activate' onClick={(e) => Activate(e.target.value)} />
                }
            </div>,
            sortable: true,
        },
    ]
    

    return (
        <div>
            <Toast ref={toast} />
             <DataTable
                    title=""
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

export default AdminAccounts