import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel';
import { Skeleton } from 'primereact/skeleton';
import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import swal from 'sweetalert';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Editor } from 'primereact/editor';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';


function AccountDetails(props) {

    const [AccountInfo, setAccount] = useState([]);
    const [loading, setloading] = useState(true);
    const history = useHistory();
    const [visible, setVisible] = useState(false);
    const [text, setText] = useState();
    const [subjectvalue, setSubject] = useState([]);
    const toast = useRef();

    useEffect(() => {
        axios.get(`/api/AccountInformation/${props.match.params.id}`).then(res => {
            if (res.data.status === 200) {
                setAccount(res.data.account);
            }
            else if (res.data.status === 504) {
                swal("Warning", res.data.message, 'warning');
                history.push('/admin/pending');
            }
            setloading(false);
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }, [props.match.params.id]);

    const Subjects = [
        { label: "Blurred Image", value: "Blurred Image" },
        { label: "Approved", value: "Approved" },
        { label: "Not Approved", value: "Not Approved" },
        { label: "Information Didn't Match", value: "Information Didn't Match" },
    ];

    const onHide = () => {
        setVisible(false)
        setSubject([])
    }

    const SendMessage = (e) => {
        e.preventDefault();

        const data = {
            email: AccountInfo.email,
            subject: subjectvalue,
            message: text,
            user_id: localStorage.getItem('auth_id'),
        };
        axios.post(`/api/SendMessage`,data).then(res => {
            if(res.data.status === 200){
                setSubject([])
                setText("");
                toast.current.show({severity: "success", summary: res.data.message, details: "Message Sent", life: 3000});
                document.getElementById('formmessage').reset();
                setTimeout(() => {
                    history.push('/admin/pending');
                },1500)
            }
            else{
                // swal("Warning",res.data.error,"warning");
                toast.current.show({severity: "warning", summary: res.data.error, details: "Please Try Again", life: 3000});
                document.getElementById('formmessage').reset();
                setTimeout(() => {
                    setVisible(false);
                },1500)
            }
        }).catch((error) =>{
            if(error.response.status === 500){
                swal("Warning",error.response.statusText,'warning');

            }
        })
    }


    return (
        <div className='mt-5'>
            <Toast ref={toast} />
            <Panel header="Account Information">
                {
                    loading ?
                        <Skeleton /> :
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-2">
                                <label htmlFor="name" className="form-label">
                                    Full Name
                                </label>
                                <InputText className='w-100' name='name' value={AccountInfo.name_user} />
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-2">
                                <label htmlFor="name" className="form-label">
                                    Email
                                </label>
                                <InputText className='w-100' name='name' value={AccountInfo.email} />
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-2">
                                <label htmlFor="name" className="form-label">
                                    Birthdate
                                </label>
                                <InputText className='w-100' name='name' value={AccountInfo.birthdate} />
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-2">
                                <label htmlFor="name" className="form-label">
                                    Contact
                                </label>
                                <InputText className='w-100' name='name' value={AccountInfo.contact_number} />
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-2">
                                <label htmlFor="name" className="form-label">
                                    Barangay
                                </label>
                                <InputText className='w-100' name='name' value={AccountInfo.barangay_list} />
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-2">
                                <label htmlFor="name" className="form-label">
                                    Home Address
                                </label>
                                <InputText className='w-100' name='name' value={AccountInfo.home_address} />
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <label htmlFor="" className="form-label">
                                    ID
                                </label>
                                <div className="card border-0">
                                    <Image width='200' src={`http://127.0.0.1:8000/${AccountInfo.files}`} alt='Photo' preview />
                                </div>
                            </div>
                            <div className="mt-3">
                                {/* <Button className='p-button-sm p-button-success me-2' label='Update' /> */}
                                <Button onClick={() => setVisible(true)} className='p-button-sm p-button-success' label='Update' />
                            </div>


                            <Dialog header="Message Form" visible={visible} draggable={false} onHide={onHide} position='top' breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '60vw' }}>
                                <div className="container">
                                    <form onSubmit={SendMessage} id='formmessage'>
                                        <div className="row">
                                            <div className="col-lg-6 col-md-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    Email
                                                </label>
                                                <InputText className='w-100' name='subject' value={AccountInfo.email} />
                                            </div>
                                            <div className="col-lg-6 col-md-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    Subject
                                                </label>
                                                <Dropdown  className='w-100' value={subjectvalue} onChange={(e) => setSubject(e.target.value)} placeholder='Subject' options={Subjects} />
                                                {/* <InputText className='w-100' name='subject' /> */}
                                            </div>
                                            <div className="col-lg-12 col-md-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    Message
                                                </label>
                                                <Editor style={{ height: '290px' }} value={text} onTextChange={(e) => setText(e.htmlValue)} />
                                            </div>
                                            <div className="mt-2">
                                                <Button className='p-button-sm p-button-info' label='Send Message' />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </Dialog>
                        </div>
                }
            </Panel>
        </div>
    )
}

export default AccountDetails