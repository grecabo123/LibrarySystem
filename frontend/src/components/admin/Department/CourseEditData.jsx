import axios from 'axios';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react'
import swal from 'sweetalert';

function CourseEditData(props) {

    const [CourseName, setCourseName] = useState([])
    const [loading, setLoading] = useState(true)
    const [btndis, setbtndis] = useState(false);
    const toast = useRef();

    useEffect(() => {
        axios.get(`/api/CourseDetails/${props.id}`).then(res => {
            if(res.data.status === 200) {
                setCourseName(res.data.course);
            }
            setLoading(false)
        }).catch((error) => {
            if(error.response.status === 500) {

            }
        });
    },[props.id]);


    const handleinput = (e) => {
        setCourseName({...CourseName, [e.target.name] : e.target.value})
    }

    const UpdateCoureName = (e) => {
        e.preventDefault();
        setbtndis(true)
        const data = CourseName;
        axios.put(`/api/UpdateCourseName`,data).then(res => {
            if(res.data.status === 200) {
                toast.current.show({severity: "success", summary: "Course Name Updated", details: "success"});
                setTimeout(() => {
                    window.location.reload();
                },1500);
            
        setbtndis(false)

            }else{
                setbtndis(false)
            }
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
            }
        });
    }

    return (
        <div>
            <Toast ref={toast} />
            {
                loading ? <>
                    <Skeleton className='w-100 mb-3' borderRadius='20px'  />
                    <Skeleton className='w-100 mb-3' borderRadius='20px'  />
                    <Skeleton className='w-100 mb-3' borderRadius='20px'  />
                </>
                :
            <form onSubmit={UpdateCoureName}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <label htmlFor="" className="form-label">
                                Course Name
                            </label>
                            <InputText className='w-100' name='CourseName' value={CourseName.CourseName} onChange={handleinput} />
                        </div>
                        <div className="mt-3">
                            <Button className='p-button-sm p-button-success' label='Update'disabled={btndis} />
                        </div>
                    </div>
                </div>
            </form>
            }
        </div>
    )
}

export default CourseEditData;