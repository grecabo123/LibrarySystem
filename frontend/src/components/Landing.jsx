import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import img1 from '../assets/icon/iocn.png'
import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import { Menubar } from 'primereact/menubar';
import { PrimeIcons } from 'primereact/api';
import GoogleLogin from 'react-google-login';
import { gapi } from "gapi-script";
import axios from 'axios';
import swal from 'sweetalert';

function Landing() {

    const history = useHistory();

    const clientId = "903234513984-jfa0gojkua7g6ekhfq3dirpb3d5bv8c0.apps.googleusercontent.com";

    useEffect(() => {
        gapi.load("client:auth2", () => {
            gapi.auth2.init({ clientId: clientId });
        })
    }, []);

    const items = [
        {
            label: <><span>Search Titles</span></>,
            icon: PrimeIcons.BOOK,
            url: "/search/thesis",
        },

    ];

    const responseGoogle = (response) => {
        const data = {
            firstname: response.profileObj.givenName,
            lastname: response.profileObj.familyName,
            email: response.profileObj.email,
            ID: response.profileObj.googleId,
        };

        axios.post(`/api/LoginWithGoogle`, data).then(res => {
            if (res.data.status === 200) {
                if (res.data.role === 1) {
                    localStorage.setItem("auth_token", res.data.token);
                    localStorage.setItem("auth_id", res.data.id);
                    swal('Success', res.data.message, 'success')
                    history.push('/admin');
                }
                else {
                    localStorage.setItem("auth_token", res.data.token);
                    localStorage.setItem("auth_id", res.data.id);
                    swal('Success', res.data.message, 'success')
                    history.push('/user');
                }
            }
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');

            }
        })
    }



    return (
        <>

            <Menubar model={items} className='w-100' start={<a href='/'><img src={img1} width={50}></img></a>} end={<>
                <div className="d-flex justify-content-end">
                    <div className="p-ripple">
                        <Ripple />
                    </div>
                    <Link to="/register"><Button className='p-button-sm me-2 p-button-text fw-bold' label='Register' /></Link>
                    <Link to="/login">
                        <Button className='p-button-sm p-button-text fw-bold' label='Login' />
                    </Link>
                    <GoogleLogin
                        clientId={clientId}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        theme="light"
                        render={renderProps => (
                            <Button className='p-button-danger p-button-sm p-button-raised' label='Login' icon={PrimeIcons.GOOGLE} onClick={renderProps.onClick} disabled={renderProps.disabled}></Button>
                        )}
                        cookiePolicy={'single_host_origin'} />
                </div>
            </>} />

        </>
    )
}

export default Landing