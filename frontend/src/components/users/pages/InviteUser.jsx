import { Card } from 'primereact/card'
import { Panel } from 'primereact/panel'
import { Tag } from 'primereact/tag'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import { Skeleton } from 'primereact/skeleton';
import { Dialog } from 'primereact/dialog';
import { Mention } from 'primereact/mention';
import { Button } from 'primereact/button';
import { FaUser } from 'react-icons/fa'


function InviteUser() {
    const [filter, setfilter] = useState([]);
    const [loading, setloading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [title, setTitle] = useState();
    const [UserData, setUser] = useState([]);
    const [emailchoose, setemailchoose] = useState("")
    const [NameTags, setRemoveNames] = useState([]);

    useEffect(() => {
        axios.get(`/api/ProductDetails`).then(res => {
            if (res.data.status === 200) {
                setfilter(res.data.product);
            }
            setloading(false);
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
                history.push(`/user/dashboard`);
            }
        })
    }, []);



    useEffect(() => {
        axios.get(`/api/AllUsers`).then(res => {
            if (res.data.status === 200) {
                setUser(res.data.data);
            }
            setloading(false)
        }).catch((error) => {

        })
    }, []);


    const onHide = () => {
        setVisible(false);
    }

    const onSearch = (e) => {
        setTimeout(() => {
            const query = e.query;
            let suggestions;
            if (UserData === "No Accounts") {
                return false;
            }
            else {
                if (!query.trim().length) {
                    suggestions = [...UserData];
                }
                else {
                    suggestions = UserData.filter((email) => {
                        return email.email.toLowerCase().startsWith(query.toLowerCase());
                    });
                }
                setSuggestions(suggestions);
            }
        }, 250);
    };

    const itemTemplate = (suggestion) => {
        return (
            <div className="flex align-items-center">
                <span className="flex flex-column ml-2">
                    <li className='list-item mb-2'><FaUser /> {suggestion.email}</li>

                </span>
            </div>
        );
    }


    const SelectDataEmail = (e) => {
        setemailchoose(e.suggestion.email) 
        // console.log("123")
    }

    const EmailInput = (e) => {
        setemailchoose(e.target.value);
    }

    const AddTagNames = (e) => {


        if (NameTags.find(nameTags => nameTags === emailchoose)) {
            alert(emailchoose + " " + "Email is already registered")
            setemailchoose("")
        }
        else {
            if (emailchoose === "") {
                return false;
                // alert("Please Enter Email")
            }
            else {
                setRemoveNames([...NameTags, emailchoose]);
                setemailchoose("");
            }
        }
    }

    // console.log(NameTags)


    const AddUsers = (e) => {
        e.preventDefault();

        const data = {

        }

        // axios.post(`/api/`)
    }

    return (
        <div className='container-fluid p-4'>
            <div className="row">
                <div className="col-lg-12">
                    <Panel header="Invite User">
                        <div className="d-flex justify-content-end mb-3">
                            <Link to="/user/product"><Tag className='p-tag'>Product Item</Tag></Link>
                        </div>
                        <div className="row">
                            {
                                loading ? <Skeleton /> :
                                    filter.map((data, idx) => {
                                        return (
                                            <div className="col-lg-4 col-md-6 col-sm-12 mb-2" key={idx}>
                                                <Card title={<><div className="d-flex justify-content-between">
                                                    <div className='mb-3 mt-2'><small><Tag className='p-tag' severity={'info'} value={data.name} /></small></div>
                                                    <div><div class="dropdown ms-auto">
                                                        <span data-bs-toggle="dropdown" aria-expanded="false" className='pi pi-ellipsis-v cursor-pointer' onClick={() => setTitle(data.name)}></span>
                                                        <ul class="dropdown-menu">
                                                            <li className='cursor-pointer mb-2'>
                                                                <span class="dropdown-item">
                                                                    <Link to={`/user/product/details/refid=${data.uniq_key}`}><span className='pi pi-folder-open me-2'></span> Open </Link>
                                                                </span>
                                                            </li>
                                                            <li className='cursor-pointer mb-2' onClick={(e) => setVisible(true)}>
                                                                <span class="dropdown-item">
                                                                    <span className='pi pi-user-plus me-2'></span> Invite User
                                                                </span>
                                                            </li>
                                                            <li className='cursor-pointer mb-2'>
                                                                <span class="dropdown-item">
                                                                    <span className='pi pi-times me-2'></span> Close
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div></div>
                                                </div></>} subTitle={<><small><b>Status</b>:  <span className='text-success'>Sold</span></small></>}>
                                                    <span className=''>Description: <p><small>{data.description.slice(0, 50)}.... </small></p></span>
                                                </Card>
                                            </div>
                                        )
                                    })
                            }

                        </div>
                    </Panel>
                    <Dialog visible={visible} header={<h5 className='text-secondary'>Invite Users - {title} </h5>} position='top' draggable={false} onHide={onHide} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }}>
                        <form onSubmit={AddUsers}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">

                                    <div className="p-inputgroup">
                                        {/* <InputText placeholder="sample.xxx.@urios.edu.ph" keyfilter="email" id='email_user' name='names' /> */}
                                        <Mention className='w-100' scrollHeight="400px" itemTemplate={itemTemplate} value={emailchoose} onSelect={SelectDataEmail} trigger="@" suggestions={suggestions} id='email_user' name="names" onChange={EmailInput} onSearch={onSearch} field="email" placeholder="Please enter @ Searching Emails" />
                                        <Button icon="pi pi-plus" className="p-button-sm" onClick={AddTagNames} />
                                    </div>
                                        {/* <label htmlFor="" className="form-label">
                                            Name of User
                                        </label>
                                        <Mention className='p-mention p-mention-items w-100' scrollHeight="400px" itemTemplate={itemTemplate} value={emailchoose} onSelect={SelectDataEmail} trigger="@" suggestions={suggestions} id='email_user' name="names" onChange={EmailInput} onSearch={onSearch} field="email" placeholder="Please enter @ Searching Emails" /> */}
                                        {/* <Mention itemTemplate={itemTemplate} scrollHeight="400px" value={emailchoose} onSelect={SelectDataEmail} suggestions={suggestions} rows={0} cols={0} onSearch={onSearch} field="email" placeholder="Please enter @ to Search people" className='w-100 ' /> */}
                                    </div>
                                   
                                    <div className="mt-3">
                                        <div className="d-flex justify-content-end">
                                            <Button className='p-button-info p-button-sm' label='Invite User' />
                                        </div>
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

export default InviteUser