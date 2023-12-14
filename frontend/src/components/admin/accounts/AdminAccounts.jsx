import axios from 'axios';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Skeleton } from 'primereact/skeleton';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react'
import DataTable, { createTheme } from 'react-data-table-component'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import swal from 'sweetalert';


function AdminAccounts() {

    const [RegisteredData, setRegister] = useState([]);
    const [loading, setloading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [emaildata, setEmail] = useState([]);
    const toast = useRef();
    const [roledata, setRole] = useState([]);

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
            if (res.data.status === 200) {
                toast.current.show({ severity: "success", summary: res.data.succss, details: "Account Update" });
                AdminAccount();
            }
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }

    const Activate = (e) => {
        axios.put(`/api/Accountactivate/${e}`).then(res => {
            if (res.data.status === 200) {
                toast.current.show({ severity: "success", summary: res.data.succss, details: "Account Update" });
                AdminAccount();
            }
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }


    const AddEmail = () => {
        setVisible(true)
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

    const RoleAccount = [
        {label: "Staff", value: 1},
        {label: "Faculty", value: 2},
        {label: "Student", value: 3},
    ]

    const AddEmailAccount = (e) => {
        e.preventDefault();

        const data = {
            email: emaildata,
            role: roledata,
        };

        axios.post(`/api/AddEmail`,data).then(res => {
            if(res.data.status === 200) {
                setVisible(false)
                document.getElementById('form_add_email').reset();
                setRole([])
                toast.current.show({severity: 'success', summary: res.data.success, detail: "Successfully"});
            }
            else{

            }
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }



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
                subHeaderComponent={
                    <Button className='p-button-info p-button-sm' label='Register Email' icon={PrimeIcons.PLUS} onClick={AddEmail} />
                }
            />

            <Dialog position='top' draggable={false} header="Register Email" visible={visible} onHide={() => setVisible(false)}
                style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
               <form onSubmit={AddEmailAccount} id='form_add_email'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Email Address
                                </label>
                                <InputText className='w-100' name='email' onKeyUp={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Account Role
                                </label>
                                <Dropdown className='w-100' placeholder='Account Role' value={roledata} options={RoleAccount} onChange={(e) => setRole(e.target.value)} />
                            </div>
                            <div className="mt-3 d-flex justify-content-end">
                                <Button className='p-button-info p-button-sm' label='Add Email' />
                            </div>
                        </div>
                    </div>
               </form>
            </Dialog>
        </div>
    )
}

export default AdminAccounts