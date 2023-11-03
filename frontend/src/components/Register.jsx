import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { TabView, TabPanel } from 'primereact/tabview'
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import ReCAPTCHA from "react-google-recaptcha"
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios'
import { Skeleton } from 'primereact/skeleton';
import swal from 'sweetalert'
import moment from 'moment/moment';
import Landing from './Landing';



function Register() {

    const [barangaylist, setbarangay] = useState([]);
    const [loading, setloading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [date, setDate] = useState(null);
    const [FileDocs, setFileUpload] = useState([]);
    const [city, setCity] = useState([]);
    const boxcheck = useRef(false);
    const UsercaptchaRef = useRef(null);
    const [checked, setChecked] = useState(false)
    const [userdata, setdata] = useState({
        fname: "",
        mname: "",
        lname: "",
        email: "",
        password: "",
        username: "",
        home: "",
        zipcode: "",
        mobile: "",
        error: [],
    });

    useEffect(() => {
        axios.get(`/api/BarangayData`).then(res => {
            if (res.data.status === 200) {
                setbarangay(res.data.brgy);
            }
            setloading(false)
        }).catch((error) => {

        })

    }, []);

    const fileHandler = (e) => {
        e.persist();
        setFileUpload({ file: e.target.files[0] });

    }

    const handleinput = (e) => {
        e.persist();
        setdata({ ...userdata, [e.target.name]: e.target.value });
    }

    const citySelectItems = barangaylist.map((data) => {
        return (
            {
                label: data.brgy_name, value: data.id
            }
        )
    });


    const CreateAccount = (e) => {
        e.preventDefault();

        const robot = UsercaptchaRef.current.getValue();

        if (checked === true && robot) {
            const data = new FormData();
            data.append('fname', userdata.fname);
            data.append('mname', userdata.mname);
            data.append('lname', userdata.lname);
            data.append('email', userdata.email);
            data.append('password', userdata.password);
            data.append('zipcode', userdata.zipcode);
            data.append('home', userdata.home);
            data.append('birthdate', moment(date).format('MMMM DD YYYY'));
            data.append('city', city);
            data.append('mobile', userdata.mobile);
            data.append('username', userdata.username);
            data.append('file', FileDocs.file);

            axios.post(`/api/CreateAccount`, data).then(res => {

                if (res.data.status === 200) {
                    swal("Success", res.data.success, 'success');
                    setChecked(false)
                    UsercaptchaRef.current.reset();
                    setCity([]);
                    document.getElementById('resetform').reset();
                }
                else {
                    setdata({ ...userdata, error: res.data.error });
                    setChecked(false)
                    UsercaptchaRef.current.reset();
                }
            }).catch((error) => {
                if (error.response.status === 500) {
                    swal("Warning", error.response.statusText, 'warning');
                    setChecked(false)
                    UsercaptchaRef.current.reset();
                }
                else if (!error.response) {
                    console.log("123")
                }
            })
        }

        else {
            swal("Warning", "Please verify that you are human.!", 'warning');
        }
    }


    // console.log(UsercaptchaRef.current.getValue())

    return (
        <>
            <Landing />
            <div className="container-fluid mt-4">
                <div className="row">
                    <Panel header="Register Account">
                        {
                            loading ? 
                                <div className="container mt-4">
                                    <div className="row">
                                        {/* <Panel header="Register Account"> */}
                                            <div className="col-lg-12 mb-3">
                                                <Skeleton></Skeleton>
                                            </div>
                                            <div className="col-lg-12 mb-3">
                                                <Skeleton></Skeleton>
                                            </div>
                                            <div className="col-lg-12 mb-3">
                                                <Skeleton></Skeleton>
                                            </div>
                                            <div className="col-lg-12 mb-3">
                                                <Skeleton></Skeleton>
                                            </div>
                                        {/* </Panel> */}
                                    </div>
                                </div>
                            
                                :
                                <form autoComplete='off' onSubmit={CreateAccount} id="resetform">
                                    <div className="row">
                                        <Divider align="start">
                                            <span className="p-tag">Personal Information</span>
                                        </Divider>
                                        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                                            <label htmlFor="first" className="form-label">
                                                <span className='text-danger'>*</span>First Name
                                            </label>
                                            <InputText className='w-100 p-inputtext-sm' name='fname' onChange={handleinput} keyfilter={'alpha'} />
                                            <span className='text-danger text-error'>{userdata.error.fname}</span>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                                            <label htmlFor="first" className="form-label">
                                                Middle Name
                                            </label>
                                            <InputText className='w-100 p-inputtext-sm' onChange={handleinput} keyfilter={'alpha'} name='mname' />

                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                                            <label htmlFor="first" className="form-label">
                                                <span className='text-danger'>*</span>Last Name
                                            </label>
                                            <InputText className='w-100 p-inputtext-sm' onChange={handleinput} keyfilter={'alpha'} name='lname' />
                                            <span className='text-danger text-error'>{userdata.error.lname}</span>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                                            <label htmlFor="first" className="form-label">
                                                <span className='text-danger '>*</span>Birthdate
                                            </label>
                                            <Calendar className='w-100 p-inputtext-sm'  value={date} onChange={(e) => setDate(e.target.value)}></Calendar>
                                            <span className='text-danger text-error'>{userdata.error.birthdate}</span>
                                        </div><div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                                            <label htmlFor="first" className="form-label">
                                                <span className='text-danger text-error'>*</span>Barangay
                                            </label>
                                            <Dropdown value={city} className='w-100 p-inputtext-sm' options={citySelectItems} onChange={(e) => setCity(e.value)} placeholder="Choose Barangay" />
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                                            <label htmlFor="first" className="form-label">
                                                <span className='text-danger text-error'>*</span>Home Address
                                            </label>
                                            <InputText className='w-100 p-inputtext-sm' onChange={handleinput} keyfilter={'home'} name='home' />
                                            <span className='text-danger text-error'>{userdata.error.home}</span>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                                            <label htmlFor="first" className="form-label">
                                                <span className='text-danger text-error'>*</span>Contact Number
                                            </label>
                                            <InputText maxLength={11} className='w-100 p-inputtext-sm' onChange={handleinput} keyfilter={'int'} name='mobile' />
                                            <span className='text-danger text-error'>{userdata.error.mobile}</span>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                                            <label htmlFor="first" className="form-label">
                                                <span className='text-danger text-error'>*</span>Zip Code
                                            </label>
                                            <InputText className='w-100 p-inputtext-sm' maxLength={4} onChange={handleinput} keyfilter={'int'} name='zipcode' />
                                            <span className='text-danger text-error'>{userdata.error.zipcode}</span>
                                        </div>
                                        <Divider align="start">
                                            <span className="p-tag">Account Information</span>
                                        </Divider>
                                        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                                            <label htmlFor="first" className="form-label">
                                                <span className='text-danger'>*</span>Username
                                            </label>
                                            <InputText className='w-100 p-inputtext-sm' onChange={handleinput} keyfilter={'alphanum'} name='username' />
                                            <span className='text-danger text-error'>{userdata.error.username}</span>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                                            <label htmlFor="first" className="form-label">
                                                <span className='text-danger text-error'>*</span>Email Address
                                            </label>
                                            <InputText className='w-100 p-inputtext-sm' onChange={handleinput} keyfilter={'email'} name='email' />
                                            <span className='text-danger text-error'>{userdata.error.email}</span>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                                            <label htmlFor="first" className="form-label">
                                                <span className='text-danger '>*</span>Password
                                            </label>
                                            <InputText type='password' className='w-100 p-inputtext-md ' onChange={handleinput} name='password' />
                                            <span className='text-danger text-error'>{userdata.error.password}</span>
                                        </div>
                                        <Divider align="start">
                                            <span className="p-tag">ID Identification</span>
                                        </Divider>

                                        <div className="col-lg-12 col-md-6 col-sm-12 mb-3">
                                            <ul>
                                                <li><span className='text-danger'>*</span><small>Provide at least 1 valid ID's for Verification</small></li>
                                            </ul>
                                            {/* <FileUpload className='p-fileupload-content' previewWidth={100} withCredentials={true} name="image"  multiple accept="image/*" /> */}
                                            <InputText type='file' onChange={fileHandler} name='file' className='border-0' />
                                        </div>

                                        <div className="col-lg-12 mb-3">
                                            <Checkbox className='p-checkbox' ref={boxcheck} onChange={e => setChecked(e.checked)} checked={checked}></Checkbox> <small className='text-secondary'>By using our services, you agree to the following terms and conditions related to the collection and use of your information. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia animi cumque quibusdam? Sint qui consequatur voluptate, natus atque id est?</small>
                                        </div>
                                        <div className="col-lg-12 mb-3">
                                            <ReCAPTCHA
                                                sitekey={"6LcC86wcAAAAAOohkFSsLQ-Pa-6W21_hukOLMYoV"}
                                                render="explicit"
                                                theme="dark"
                                                ref={UsercaptchaRef}
                                            />
                                        </div>


                                        <div className="mt-3">
                                            <Button className='p-button-sm p-button-info' label='Create Account' />
                                        </div>
                                    </div>
                                </form>
                        }

                        {/* </TabPanel>
                        </TabView> */}
                    </Panel>
                </div>
            </div>

        </>
    )
}

export default Register