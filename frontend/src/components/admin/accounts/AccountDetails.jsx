import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel';
import { Skeleton } from 'primereact/skeleton';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import swal from 'sweetalert';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Editor } from 'primereact/editor';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import moment from 'moment';


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

   
    
    const header = () => {
        return (
            <div className="d-flex justify-content-between align-items-center">
                <span>Account Information</span>
            
                <Link to="/admin/accounts"><Button className='p-button-sm p-button-info' label='Return' /></Link>
            </div>
        )
    }

    return (
        <div className='mt-5'>
            <Toast ref={toast} />
            <Panel header={header}>
                
                {
                    loading ? <Skeleton /> : 

                    <div className="container">
                        
                        <div className="row">
                            <div className="col-lg-6 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Name
                                </label>
                                <InputText className='w-100' readOnly value={AccountInfo.name} />
                            </div>
                            <div className="col-lg-6 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Email Address
                                </label>
                                <InputText className='w-100' readOnly value={AccountInfo.email} />
                            </div>
                            <div className="col-lg-6 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Student Number
                                </label>
                                <InputText className='w-100' readOnly value={AccountInfo.student_no} />
                            </div>
                            <div className="col-lg-6 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Department
                                </label>
                                <InputText className='w-100' readOnly value={AccountInfo.department} />
                            </div>
                            <div className="col-lg-6 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Course
                                </label>
                                <InputText className='w-100' readOnly value={AccountInfo.CourseName} />
                            </div>
                            <div className="col-lg-6 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Date Created
                                </label>
                                <InputText className='w-100' readOnly value={moment(AccountInfo.created_at).format('MMM DD YYYY')} />
                            </div>
                        </div>
                    </div>
                }
            </Panel>
        </div>
    )
}

export default AccountDetails