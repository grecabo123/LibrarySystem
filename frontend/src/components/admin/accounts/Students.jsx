import axios from 'axios';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Skeleton } from 'primereact/skeleton';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react'
import DataTable, { createTheme } from 'react-data-table-component'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Papa from 'papaparse';


function Students() {

    const [RegisteredData, setRegister] = useState([]);
    const [loading, setloading] = useState(true);
    const toast = useRef();
    const [importdata, setmodal] = useState(false)
    const [TextBtn, setTextBtn] = useState("Import Data");
    const [btndis, setbtndis] = useState(false);

    useEffect(() => {
        StudentAccount();
    }, []);


    const StudentAccount = () => {
        const id = 2;
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

    const Deactivate = (e) => {
        axios.put(`/api/AccountDeactivate/${e.currentTarget.getAttribute('data-id')}`).then(res => {
            if (res.data.status === 200) {
                toast.current.show({ severity: "success", summary: res.data.succss, details: "Account Update" });
                StudentAccount();
            }
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }

    const ImportData = () => {
        setmodal(true)
    }

    const Activate = (e) => {
        axios.put(`/api/Accountactivate/${e.currentTarget.getAttribute('data-id')}`).then(res => {
            if (res.data.status === 200) {
                toast.current.show({ severity: "success", summary: res.data.succss, details: "Account Update" });
                StudentAccount();
            }
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
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
            selector: row => row.status === 1 ? <Tag severity={'success'} value="Active" /> : <Tag severity={'danger'} value='Not Active' />,
        },
        {
            name: "Actions",
            cell: row => <div>
                <Link className="me-2" to={`/admin/account/refid=${row.id}`}><Button className='p-button-sm p-button-info' icon={PrimeIcons.USER} label='Details' /> </Link>
                {
                    row.status === 1 ? <Button className='p-button-sm p-button-danger' data-id={row.id} icon={PrimeIcons.POWER_OFF} label='Deacivate' onClick={Deactivate} /> : <Button className='p-button-sm p-button-primary' data-id={row.id} icon={PrimeIcons.POWER_OFF} label='Activate' onClick={Activate} />
                }
            </div>,
            sortable: true,
        },
    ]

    const ImportSCV = (e) => {
        e.preventDefault();
        var filec = document.getElementById('filecsv').files[0];
        if (filec) {
            setTextBtn("Importing Data...");
            setbtndis(true)
            Papa.parse(filec, {
                skipEmptyLines: true, header: false,
                complete: function (result) {
                    const obj = Object.entries(result.data);
                    obj.forEach(([key, value]) => {
                        const data = {
                            IDNumber: value[0],
                            first: value[1],
                            middle: value[2],
                            last: value[3],
                            email: value[4],
                            department: value[5],
                            course: value[6],
                            accounttype: value[7] === "Activate" ? 1 : 0,
                        }
                        // console.log(data);
                        axios.post('/api/importstudent', data).then(res => {
                            if (res.data.status === 200) {
                                setTextBtn("Import Data")
                                setbtndis(false)
                                StudentAccount();
                                document.getElementById("fileform").reset();
                                toast.current.show({ severity: 'success', summary: res.data.Info, detail: 'Registered Account' });
                            }
                            else if (res.data.status === 504) {
                                setTextBtn("Import Data")
                                setbtndis(false)
                            }
                        }).catch((err) => {
                            if (err.response.status === 500) {
                                setTextBtn("Import Data")
                                setbtndis(false)
                            }
                        })
                    })
                }
            });
        }
        else {
            swal("Warning", "Please Input the file", "warning");
        }
    }


    return (
        <div>
            <Toast ref={toast} />
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
                subHeaderComponent={
                    <Button className='p-button-sm p-button-success' label='Import Data' icon={PrimeIcons.UPLOAD} onClick={ImportData} />
                }
            />

            <Dialog position='top' draggable={false} header="Import Data" visible={importdata} onHide={() => setmodal(false)} style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }} >
                <form onSubmit={ImportSCV} id='fileform'>
                    
                    <label htmlFor="" className="form-label">
                        CSV File
                    </label>
                    <InputText type='file' name='file' id='filecsv' />
                    <span className='text-info'></span>

                    <div className="mt-2 d-flex justify-content-end">
                        <Button className='p-button-sm p-button-success' loading={btndis} label={TextBtn} />
                    </div>
                </form>
            </Dialog>
        </div>
    )
}

export default Students