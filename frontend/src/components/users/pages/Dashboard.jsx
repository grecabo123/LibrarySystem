import axios from 'axios';
import { Skeleton } from 'primereact/skeleton';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { FaArrowDown, FaArrowUp, FaSearch } from 'react-icons/fa'
import { Panel } from 'primereact/panel';
import { InputTextarea } from 'primereact/inputtextarea';


function Dashboard() {

    const [Accounts, setAccount] = useState([]);
    const [loading, setloading] = useState(true);
    const [myEvents, setEvents] = useState({
        title: "",
        description: "",
    })
    const [visible, setVisible] = useState(false)
    const [ViewVisible, setViewVisible] = useState(false)
    const [loadingdata, setloadingdata] = useState(false)
    const [startData, setstartData] = useState()
    const [endData, setendData] = useState()
    const [Details, setDetails] = useState([])

    const toast = useRef();

    const [AnnoucementData,setAnnoucementData] = useState([]);
    // const [loading, setloading] = useState(true);
    const [searchkey, setsearch] = useState({
        keyword: "",
        error: [],
    });
    const history = useHistory();
    

    useEffect(() => {
       axios.get(`/api/AnnoucmentData`).then(res => {
            if(res.data.status === 200) {
                setAnnoucementData(res.data.data);
            }
            setloading(false)
       }).catch((error) => {
            if(error.response.status === 500) {

            }
       })
    }, [])

    const handleinput = (e) => {
        e.persist();
        setsearch({ ...searchkey, [e.target.name]: e.target.value });
    }

    const Search = (e) => {

        e.preventDefault();
        const data = {
            keyword: searchkey.keyword,
        };
        localStorage.setItem('keyword', data.keyword);

        if (data.keyword === "") {

        }
        else {
            const newdata = {
                search: localStorage.getItem('keyword'),
                user_id: localStorage.getItem('auth_id'),
            }
            axios.post(`/api/SearchEngine`, newdata).then(res => {
                if (res.data.status === 200) {
                    history.push(`/user/search=${newdata.search}`)
                }
                else if (res.data.status === 404) {
                    swal("Error", res.data.error, 'error');
                }
            }).catch((error) => {
                if (error.response.status === 500) {
                    swal("Warning", error.response.statusText, 'warning');
                }
            })
        }
    }

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

    

    const onHide = () => {
        setVisible(false)
        setViewVisible(false);
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
        }, 2000);
    }, [])


    const localizer = momentLocalizer(moment)
    return (
        <div className='container'>
            {
                loading ? <Skeleton className='w-100' />
                    :
                    <div className='mb-3'>
                        <form onSubmit={Search}>
                            <h4 className='text-details text-secondary'><FaSearch /> Search Document </h4>
                            <div className="p-inputgroup">
                                <InputText onChange={handleinput} name='keyword' placeholder="Keyword, Title" />
                                <Button icon="pi pi-search" className="p-button-info me-1" />
                            </div>
                        </form>
                      
                    </div>
            }
            <Toast ref={toast} />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                // onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                selectable
                enableAutoScroll
            />



            <Dialog header="Annoucement Details" visible={ViewVisible} draggable={false} position='top' onHide={onHide} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }}>
                {
                    loadingdata ?
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 col-sm-12 mb-2">
                                    <Skeleton className='w-100' borderRadius='20px' />
                                </div>
                                <div className="col-lg-6 col-sm-12 mb-2">
                                    <Skeleton className='w-100' borderRadius='20px' />
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
                                    {/* <InputText className='w-100' value={} /> */}
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
        </div>
    )
}

export default Dashboard