import axios from 'axios';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'
import swal from 'sweetalert';

function NonStudent() {

    const [CreateNonStudent, setCreateNonStudent] = useState({
        fname: "",
        mname: "",
        lname: "",
        email: "",
        password: "",
        error: [],
    });
    const [btndis, setBtndis] = useState(false);

    const handleinput = (e) => {
        e.persist();
        setCreateNonStudent({...CreateNonStudent, [e.target.name] : e.target.value});
    }

    const CreateAccount = (e) => {
        e.preventDefault();

        const data = {
            fname: CreateNonStudent.fname,
            mname: CreateNonStudent.mname,
            lname: CreateNonStudent.lname,
            email: CreateNonStudent.email,
            password: CreateNonStudent.password,
            role: 3,
        };
        setBtndis(true)

        axios.post(`/api/CreateNonStudent`,data).then(res => {
            if(res.data.status === 200) {
                swal("Success",res.data.success,'success');
                document.getElementById('reset_form_create').reset();
                setBtndis(false);

            }
            else{
                setCreateNonStudent({...CreateNonStudent, error: res.data.error});

            }
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
            }
        })
    }

    return (
        <div>
            <form onSubmit={CreateAccount} id='reset_form_create'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-2">
                            <label htmlFor="" className="form-label">
                                First Name
                            </label>
                            <InputText className='w-100' name='fname' onChange={handleinput} />
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-2">
                            <label htmlFor="" className="form-label">
                                Middle Name
                            </label>
                            <InputText className='w-100' name='mname' onChange={handleinput} />
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-2">
                            <label htmlFor="" className="form-label">
                                Last Name
                            </label>
                            <InputText className='w-100' name='lname' onChange={handleinput} />
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-2">
                            <label htmlFor="" className="form-label">
                                Email Address
                            </label>
                            <InputText type='email' className='w-100' name='email' onChange={handleinput} />
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-2">
                            <label htmlFor="" className="form-label">
                                Password
                            </label>
                            <InputText type='password' className='w-100' name='password' onChange={handleinput} />
                        </div>
                        <div className="mt-4">
                            <Button className='p-button-sm p-button-info' label='Create Account' disabled={btndis}/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default NonStudent