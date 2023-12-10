import ReCAPTCHA from "react-google-recaptcha"
import React, { useEffect, useRef, useState } from 'react'
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Skeleton } from "primereact/skeleton";

function Student() {
    const UsercaptchaRef = useRef(null);
    const [date, setDate] = useState(null);
    const [btndis, setbtndis] = useState(false);
    const [userdata, setdata] = useState({
        fname: "",
        mname: "",
        lname: "",
        email: "",
        student_id: "",
        mobile: "",
        error: [],
    });

    const [DepartmentGet, setDepartmentGet] = useState([]);
    const [CourseGet, setCourseGet] = useState([]);
    const [CourseGetData, setCourseData] = useState([]);
    const [FilterCourse, setFilterCourse] = useState([])
    const [DepartmentData, setDepartmentData] = useState([]);
    const [loading, setloading] = useState(true)
    const history = useHistory();
    // Department
    useEffect(() => {
        axios.get(`/api/DepartmentDataFetch`).then(res => {
            if (res.data.status === 200) {
                setDepartmentData(res.data.data);
            }
            setloading(false)
        }).catch((error) => {
            if (res.data.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }, [])

    // Program || Course
    useEffect(() => {
        axios.get(`/api/CourseDataFetch`).then(res => {
            if (res.data.status === 200) {
                setCourseGet(res.data.data);
                setFilterCourse(res.data.data)

            }
            setloading(false)
        }).catch((error) => {
            if (res.data.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }, [])

    
    useEffect(() => {
        const result = CourseGet.filter(data => {
            return data.department_fk === DepartmentGet  ? DepartmentGet : setCourseData("");
        });
        setFilterCourse(result);
    },[DepartmentGet]);

    if(loading) {
        return (
            <Skeleton className="w-100" />
        )
    }
    
    const department = DepartmentData.map((data, idx) => {
        return (
            { label: data.department, value: data.id }
        )
    });

    const course = FilterCourse.map((data, idx) => {
        return (
            { label: data.CourseName, value: data.id }

        )
    });

    const handleinput = (e) => {
        e.persist();
        setdata({ ...userdata, [e.target.name]: e.target.value });
    }
    const CreateAccount = (e) => {
        e.preventDefault();
        setbtndis(true)
        const robot = UsercaptchaRef.current.getValue();
        const data = {
            fname: userdata.fname,
            mname: userdata.mname,
            lname: userdata.lname,
            email: userdata.email,
            student_no: userdata.student_id,
            department: DepartmentGet,
            course: CourseGetData,
            role: 2,
        };
        // console.log(data);
        
        if(robot){
            axios.post(`/api/CreateAccount`,data).then(res => {
                if(res.data.status === 200) {
                    swal("Success",res.data.success,'success');
                    document.getElementById('resetform').reset();
                    setTimeout(() => {
                        history.push('/login');
                    },1500);
                    setbtndis(false)
                    
                }
                else{
                    setdata({...userdata, error: res.data.error})
                    setbtndis(false)

                }
            }).catch((error) => {
                if(error.response.status === 500) {
                    swal("Warning",error.response.statusText,'warning');
                    UsercaptchaRef.current.reset();
                    setbtndis(false)

                }
            })
        }
        else{
            UsercaptchaRef.current.reset();
            swal("Warning","Please confirm that you are human.!",'warning');
            setbtndis(false)

        }
    };

    return (
        <div className='container-fluid'>
            <div className="row">
                <form autoComplete='off' onSubmit={CreateAccount} id="resetform">
                    <div className="row">
                        <Divider align="start">
                            <span className="p-tag">Personal Information</span>
                        </Divider>
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                            <label htmlFor="first" className="form-label">
                                <span className='text-danger'>*</span>First Name
                            </label>
                            <InputText className='w-100 p-inputtext-sm' name='fname' placeholder="First Name" onChange={handleinput} keyfilter={'alpha'} />
                            <span className='text-danger text-error'>{userdata.error.fname}</span>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                            <label htmlFor="first" className="form-label">
                                Middle Name
                            </label>
                            <InputText className='w-100 p-inputtext-sm' onChange={handleinput} placeholder="Middle Name" keyfilter={'alpha'} name='mname' />

                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                            <label htmlFor="first" className="form-label">
                                <span className='text-danger'>*</span>Last Name
                            </label>
                            <InputText className='w-100 p-inputtext-sm' onChange={handleinput} placeholder="Last Name" keyfilter={'alpha'} name='lname' />
                            <span className='text-danger text-error'>{userdata.error.lname}</span>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                            <label htmlFor="first" className="form-label">
                                <span className='text-danger '>*</span>Student No
                            </label>
                            <InputText className="w-100" name="student_id" keyfilter={"int"} onChange={handleinput} placeholder="Student No." />
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                            <label htmlFor="first" className="form-label">
                                <span className='text-danger text-error'>*</span> Department
                            </label>
                            <Dropdown className='w-100' value={DepartmentGet} options={department} onChange={(e) => setDepartmentGet(e.target.value)} placeholder='Choose Department' />
                            <span className='text-danger text-error'>{userdata.error.home}</span>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                            <label htmlFor="first" className="form-label">
                                <span className='text-danger text-error'>*</span>Program
                            </label>
                            <Dropdown value={CourseGetData} options={course} onChange={(e) => setCourseData(e.target.value)} className='w-100 p-dropdown-sm' placeholder='Choose Program' />
                            <span className='text-danger text-error'>{userdata.error.mobile}</span>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                            <label htmlFor="first" className="form-label">
                                <span className='text-danger text-error'>*</span>Email Address
                            </label>
                            <InputText className='w-100 p-inputtext-sm' placeholder="Email Address"  onChange={handleinput} keyfilter={'email'} name='email' />
                            <span className='text-danger text-error'>{userdata.error.email}</span>
                        </div>
                    </div>
                    <div className="col-lg-12 mb-3">
                        <ReCAPTCHA
                            sitekey={"6LcC86wcAAAAAOohkFSsLQ-Pa-6W21_hukOLMYoV"}
                            render="explicit"
                            theme="light"
                            ref={UsercaptchaRef}
                        />
                    </div>
                    <div className="mt-3">
                        <Button className="p-button-sm p-buttom-info" label="Create Account" disabled={btndis} />
                    </div>
                </form>
            </div>
        </div>


    )
}

export default Student