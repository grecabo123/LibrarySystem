import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Password } from 'primereact/password';
import Landing from './Landing';



function Login() {

    const [LoginData, setLogin] = useState({
        username: "",
        password: "",
        error: [],
    });
    const history = useHistory();
    const [value, setValue] = useState([]);
    const [btndis , setbtndis] = useState(false)

    const handleinput = (e) => {
        e.persist();
        setLogin({ ...LoginData, [e.target.name]: e.target.value });
    }

    const LogingIn = (e) => {
        e.preventDefault();

        const data = {
            username: LoginData.username,
            password: value,
        };

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/Login`, data).then(res => {
                if (res.data.status === 200) {
                    if(res.data.role === 1){
                        localStorage.setItem("auth_token", res.data.token);
                        localStorage.setItem("auth_id", res.data.id);
                        swal('Success',res.data.message,'success')
                        history.push('/admin');
                    }
                    else{
                        localStorage.setItem("auth_token", res.data.token);
                        localStorage.setItem("auth_id", res.data.id);
                        swal('Success',res.data.message,'success')
                        history.push('/user');
                    }
                }
                else{
                    setLogin({...LoginData, error: res.data.error});
                }
            }).catch((error) => {
                console.log(error)
                if (error.response.status === 500) {
                    swal("Warning", error.response.statusText, 'warning');
                    // setChecked(false)       
                    // UsercaptchaRef.current.reset();
                }
            })
        });
    }

    

    const suggestions = <>
        <Divider></Divider>
        <small className=''>Suggestions</small>
        <ul>
            <li>
                {
                    value.length > 0 && value.toUpperCase() !== value ? <small className='text-success'>At least one lowercase</small> : <small className='text-danger'>At least one lowercase</small>
                }
            </li>
            <li>
                {
                    value.length > 0 && value.toLowerCase() !== value ? <small className='text-success'>At least one uppercase</small> : <small className='text-danger'>At least one uppercase</small>
                }
            </li>
            <li>
                {
                    value.length > 0 && value.match(/\d/) ? <small className='text-success'>At least one numeric</small> : <small className='text-danger'>At least one numeric</small>
                }
            </li>
        </ul>
    </>


    const bannertext = <div className='p-3'>
        <h2 className="text-center">
            Login
        </h2>
    </div>

    return (
        <div>
            <Landing />
            <div className="mt-5">
                <div class="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-6">
                            <Card header={bannertext}>
                                <form onSubmit={LogingIn}>
                                    <div className="row">
                                        <div className="col-lg-12 mb-2">
                                            <label htmlFor="username" className="form-label">
                                                Username / Email
                                            </label>
                                            <InputText className='p-inputtext-sm w-100' value={LoginData.username} name='username' onChange={handleinput} />
                                            <span className='text-danger'>{LoginData.error.username}</span>
                                        </div>
                                        <div className="col-lg-12 mb-2">
                                            <label htmlFor="username" className="form-label">
                                                Password
                                            </label>
                                            {/* <InputText className='w-100' type='password' onChange={handleinput} name='password' /> */}
                                            <Password footer={suggestions} toggleMask className='w-100  p-inputtext-sm' value={value} onChange={(e) => setValue(e.target.value)} />
                                            <span className='text-danger'>{LoginData.error.password}</span>
                                        </div>
                                        <div className="mt-3">
                                            <Button disabled={btndis}  className='p-button-sm p-button-info w-100' label='Login' />
                                        </div>
                                        <div className="mt-3">
                                            <div className="d-flex justify-content-around">
                                                <Link to="/register"><small>Create an Account</small></Link>
                                                <a href=""><small>Forgot password</small></a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                       
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login