import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { Panel } from 'primereact/panel'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea'
import axios from 'axios'
import swal from 'sweetalert'
import { Toast } from 'primereact/toast'
import moment from 'moment'


function Announcement() {

    const [visible, setVisible] = useState(false);
    const [date, setDate] = useState([]);
    const [announcement, setannouncement] = useState({
        description: "",
    });
    const [Posted, setPosted] = useState([]);
    const toast = useRef();
    const [loading, setloading] = useState(true);

    useEffect(() => {
        AnnouncementData();
    },[]);

    const handleinput = (e) => {
        e.persist();
        setannouncement({...announcement, [e.target.name]: e.target.value});
    }

    const DisplayModal = () => {
        setVisible(true);
    }

    const onHide = () => {
        setVisible(false);
    }

    const PostAnnoucment = (e) => {
        e.preventDefault();
        const data = {
            description: announcement.description,
            date_post: moment(date).format('MMM DD YYYY'),
            user_fk: localStorage.getItem('auth_id'),
        };

        axios.post(`/api/posted`,data).then(res => {
            if(res.data.status === 200) {
                document.getElementById('reset_form').reset();
                toast.current.show({severity: 'success', summary: res.data.messages, detail: "Posted"});
                setVisible(false);
                AnnouncementData();
            }
        }).catch((error) => {
            if(error.response.status === 500){
                swal("Warning",error.response.statusText,'warning');
            }
        })
    }

    const AnnouncementData = () => {
        axios.get(`/api/AnnoucmentData`).then(res => {
            if(res.data.status === 200) {
                setPosted(res.data.data);
            }
            setloading(false);
        }).catch((error) => {
            if(error.response.status === 500){
                swal("Warning",error.response.statusText,'warning');
            }
        })
    }

    const column = [ 
        {
            name: "Date",
            selector: row => row.date_annoucment,
            sortable: true,
        },
        {
            name: "Description",
            selector: row => row.description,
        },
        {
            name: "Date Time",
            selector: row => moment(row.created_at).format("MMM DD YYYY hh:mm a"),
        }
    ]

    return (
        <div className='container-fluid'>
                <Toast ref={toast} />
            <div className="row">
                <div className="col-lg-12">
                    <Panel>
                        <DataTable
                            title="Most Recent"
                            pagination
                            selectableRows
                            data={Posted}
                            columns={column}
                            subHeader
                            subHeaderAlign='right'
                            subHeaderComponent={
                                <Button className='p-button-sm p-button-info' label='Create Announcement' icon={PrimeIcons.PLUS} onClick={DisplayModal} />
                            }
                        />
                    </Panel>

                    <Dialog header="Create Announcement" visible={visible} onHide={onHide} draggable={false} position='top' breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }}>
                        <form onSubmit={PostAnnoucment} id='reset_form'>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12 mb-3">
                                        <label htmlFor="" className="form-label">
                                            Date: 
                                        </label>
                                        <Calendar className='w-100' value={date} onChange={(e) => setDate(e.value)}></Calendar>
                                    </div>
                                    <div className="col-lg-12 mb-3">
                                        <label htmlFor="" className="form-label">
                                            Description 
                                        </label>
                                        <InputTextarea className='w-100' rows={5} cols={5} name='description' onChange={handleinput} />
                                    </div>
                                    <div className="mt-3">
                                        <Button className='p-button-sm p-button-info' label='Post' />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Dialog>

                </div>
            </div>
        </div>
    )
}

export default Announcement