import axios from 'axios';
import moment from 'moment';
import { Skeleton } from 'primereact/skeleton';
import React, { useEffect, useRef, useState } from 'react'
import DataTable, { createTheme } from 'react-data-table-component';
import { FaDesktop } from 'react-icons/fa';
import swal from 'sweetalert';
import { FcInspection } from "react-icons/fc";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Badge } from 'primereact/badge';

function SchoolYear() {
    const [Logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [btndis, setbtndis] = useState(false);
    const toast = useRef();
    const [term, setTerm] = useState({
        term_data: "",
        error: [],
    })
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        FetchSchoolYear();
    }, []);

    const FetchSchoolYear = () => {
        axios.get(`/api/SchoolYearData`).then(res => {
            if (res.data.status === 200) {
                setLogs(res.data.data);
            }
            setLoading(false)
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }

    const column = [
        {
            name: "Activity",
            selector: row => row.SchoolYear,
        },
        // {
        //     name: "Status",
        //     selector: row => row.year_status === 1 ? <Badge value={'Active'} severity={'success'} /> : <Badge value={'Not Active'} severity={'warning'} />,
        // },
        {
            name: "Date Time",
            selector: row => moment(row.created_at).format('MMMM DD YYYY hh:mm a')
        },
    ]

    const SchoolModal = () => {
        setVisible(true)
    }

    const onHide = () => {
        setVisible(false)
    }
    const handleInput = (e) =>{
        e.persist();
        setTerm({...term, [e.target.name]: e.target.value});
    }

    const AddTerm = (e) => {
        e.preventDefault();
        setbtndis(true)
        const data = {
            term_data: term.term_data,
        };

        axios.post(`/api/AddSchoolYear`,data).then(res => {
            if(res.data.status === 200) {
                setVisible(false);
                document.getElementById('form_reset').reset();
                FetchSchoolYear();
                toast.current.show({severity: "success", summary: "Success", detail: "School Year Added"});
            }
            else{
                setTerm({...term, error: res.data.error});
            }
        }).catch((error) => {
            if(error.response.status === 500){
                swal("Warning",error.response.statusText,'warning');
            }
        });
    }


    return (
        <div className='container-fluid p-3'>
            <Toast ref={toast} />
            <Card>
                <DataTable
                    title="Activity Logs"
                    data={Logs}
                    columns={column}
                    selectableRows
                    pagination
                    subHeader
                    subHeaderAlign='right'
                    subHeaderComponent={<Button className='p-button-sm p-button-info' onClick={SchoolModal} icon={PrimeIcons.PLUS} label='Add Schhol Year' />}
                    progressPending={loading}
                    progressComponent={
                        <Skeleton className='w-100' borderRadius='20' />
                    }
                />
            </Card>
            <Dialog header="Add School Year" visible={visible} draggable={false} position='top' onHide={onHide} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }}>
                <form onSubmit={AddTerm} id='form_reset'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <label htmlFor="" className="form-label">
                                    School Year
                                </label>
                                <InputText className='w-100' name='term_data' onChange={handleInput}  />
                            </div>
                            <div className="mt-3">
                                <Button className='w-100' label='Add School Year' disabled={btndis} />
                            </div>
                        </div>
                    </div>
                </form>
            </Dialog>



        </div>
    )
}

export default SchoolYear