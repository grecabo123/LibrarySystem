import axios from 'axios';
import { Badge } from 'primereact/badge';
import { Card } from 'primereact/card'
import { Skeleton } from 'primereact/skeleton';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

function AllUsers() {

    const [Accounts, setAccount] = useState([]);
    const [loading, setloading] = useState(true);
    const [myEvents, setEvents] = useState({
        title: "",
        description: "",
    })
    const [visible, setVisible] = useState(false)
    const [ViewVisible, setViewVisible] = useState(false)
    const [loadingdata, setloadingdata]  = useState(false)
    const [startData, setstartData] = useState()
    const [endData, setendData] = useState()
    const [Details, setDetails] = useState([])

    const toast = useRef();

    useEffect(() => {
        AnnouncementData();
    }, []);

    const AnnouncementData = () => {
        axios.get(`/api/AnnoucmentData`).then(res => {
            if (res.data.status === 200) {
                setAccount(res.data.data);
            }
            setloading(false)
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');

            }
        })
    }

    const handleSelectSlot = useCallback(({ start, end }) => {
        setVisible(true);
        setstartData(moment(start).format('MMM DD YYYY'));
        setendData(moment(end).format('MMM DD YYYY'));
    }, [])

    const onHide = () => {
        setVisible(false)
        setViewVisible(false);
    }

    const handleinput = (e) => {
        e.persist();
        setEvents({ ...myEvents, [e.target.name]: e.target.value });
    }

    const events = Accounts.map((data) => {
        return (
            { id: data.id, title: data.title, start: data.date_annoucment, end: data.date_annoucment, text: data.description }
        )
    });


    const PostAnnoucment = (e) => {
        e.preventDefault();
        const data = {
            title: myEvents.title,
            description: myEvents.description,
            user_fk: localStorage.getItem('auth_id'),
            date_post: startData,
        };
        axios.post(`/api/posted`, data).then(res => {
            if (res.data.status === 200) {
                document.getElementById('reset_form').reset();
                toast.current.show({ severity: 'success', summary: res.data.messages, detail: "Posted" });
                setVisible(false);
                AnnouncementData();
            }
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }

    const handleSelectEvent = useCallback((event) => {
        setViewVisible(true);
        setDetails(event)
        setTimeout(() => {
            setloadingdata(false)
        },2000);
    }, [])


    const localizer = momentLocalizer(moment)
    return (
        <>
            <Toast ref={toast} />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                selectable
                enableAutoScroll
            />
            <Dialog position='top' draggable={false} header="Create Annoucement" visible={visible} onHide={onHide} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }}>
                <div className="container">
                    <form onSubmit={PostAnnoucment} id='reset_form'>
                        <div className="row">
                            <div className="col-lg-6 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Title
                                </label>
                                <InputText className='w-100' onChange={handleinput} name='title' />
                            </div>

                            <div className="col-lg-6 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Date:
                                </label>
                                <InputText className='w-100' value={startData} disabled readOnly />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <InputTextarea className='w-100' name='description' onChange={handleinput} style={{ resize: "none" }} rows={5} cols={5} />
                            </div>
                            <div className="mt-3">
                                <Button className='p-button-sm p-button-info' label='Create' />
                            </div>
                        </div>
                    </form>
                </div>
            </Dialog>


            <Dialog header="Annoucement Details" visible={ViewVisible} draggable={false} position='top' onHide={onHide} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }}>
                {
                    loadingdata ? 
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-sm-12 mb-2">
                                <Skeleton className='w-100' borderRadius='20px' />
                            </div>
                            <div className="col-lg-6 col-sm-12 mb-2">
                                <Skeleton className='w-100'  borderRadius='20px'/>
                            </div>
                            <div className="col-lg-12 col-sm-12 mb-2">
                                <Skeleton className='w-100' borderRadius='20px' />
                            </div>
                        </div>
                    </div>
                    :
                    <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-sm-12 mb-2">
                            <label htmlFor="" className="form-label fw-bold">
                                Event Title: 
                            </label>
                            <p className='text-info '>   <b>{Details.title}</b></p>
                        </div>
                        <div className="col-lg-6 col-sm-12 mb-2">
                        <label htmlFor="" className="form-label fw-bold">
                                Event Date: 
                            </label>
                            <p className='text-info '>   <b>{Details.start}</b></p>

                        </div>
                        <div className="col-lg-12 col-sm-12 mb-2">
                            <InputTextarea className='w-100' style={{ resize: "none" }} readOnly value={Details.text} />
                        </div>
                    </div>
                </div>
                    
                }
            </Dialog>
        </>
    )
}

export default AllUsers