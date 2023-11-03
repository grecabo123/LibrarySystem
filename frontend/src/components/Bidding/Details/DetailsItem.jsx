import axios from 'axios';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Skeleton } from 'primereact/skeleton';
import React, { useEffect, useRef, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, Data } from '@react-google-maps/api';
import DataTable, { createTheme } from 'react-data-table-component';
import { NumericFormat } from 'react-number-format';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import swal from 'sweetalert';
import { Toast } from 'primereact/toast';
import { Tooltip } from 'primereact/tooltip';
import Countdown from "react-countdown";
import moment from 'moment';
import { Badge } from 'primereact/badge';

function DetailsItem(props) {

    const [loading, setLoading] = useState(true);
    const [Product, setProduct] = useState([]);
    const [visible, setVisible] = useState(false);
    const toast = useRef();

    const [LoginData, setLogin] = useState({
        username: "",
        password: "",
        error: [],
    });

    const [BidMoney, setmoney] = useState({
        error: [],
    });
    const [AmtBid, setAmtbid] = useState([]);
    const [messagedata, setmsg] = useState([]);
    const [BiddersData, setBidders] = useState([]);
    const [Countbid, setCount] = useState();
    const [value, setValue] = useState([]);
    const [btndis, setbtndis] = useState(false)
    const [total_bid, setTotal] = useState();
    const [btnbid, setbtnbid] = useState(false);

    const handleinput = (e) => {
        e.persist();
        setLogin({ ...LoginData, [e.target.name]: e.target.value });
    }
    var id = props.match.params.id;





    useEffect(() => {

        axios.get(`/api/Details/${id}`).then(res => {
            if (res.data.status === 200) {
                setProduct(res.data.results);
                FetchData();

            }
            setLoading(false);
        }).catch((error) => {
            if (error.response.status === 500) {

            }
        })
    }, []);

    createTheme('solarized', {
        text: {
            primary: '#bfc5c7',
            secondary: '#2aa198',
        },
        background: {
            default: 'transparent',
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#bfc5c7',
        },
        action: {
            button: 'rgba(0,0,0,.54)',
            hover: 'rgba(0,0,0,.08)',
            disabled: 'rgba(0,0,0,.12)',
        },
    }, 'dark');


    const FetchData = () => {

        axios.get(`/api/GetCompetetor/${props.match.params.id}/${localStorage.getItem('auth_id')}`).then(res => {
            if (res.data.status === 200) {
                setBidders(res.data.users_);
                setCount(res.data.results);
                setTotal(res.data.total_bid);
            }
        }).catch((error) => {
            if (error.response.status === 500) {

            }
        })
    }





    const containerStyle = {
        width: '100%',
        height: '300px',
    };

    const butuan = {
        lat: 8.9475,
        lng: 125.5406,

    }
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBYboX0tQrX5nexk94H30QwGUgbXCTokJw",
    })
    const onHide = () => {
        setVisible(false);
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


    const LogingIn = (e) => {
        e.preventDefault();

        const data = {
            username: LoginData.username,
            password: value,
        };

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/Login`, data).then(res => {
                if (res.data.status === 200) {
                    if (res.data.role === 1) {
                        localStorage.setItem("auth_token", res.data.token);
                        localStorage.setItem("auth_id", res.data.id);
                    }
                    else {
                        localStorage.setItem("auth_token", res.data.token);
                        localStorage.setItem("auth_id", res.data.id);
                    }

                    window.location.reload();
                }
                else {
                    setLogin({ ...LoginData, error: res.data.error });
                }
            }).catch((error) => {
                if (error.response.status === 500) {
                    swal("Warning", error.response.statusText, 'warning');
                }
            })
        });
    }

    const PlaceBid = (e) => {
        e.preventDefault();


        const data_bid = {
            amount_bid: AmtBid,
            message: messagedata,
            id: localStorage.getItem('auth_id'),
            uniq: id,
        };
        axios.post(`/api/BiddingPost`, data_bid).then(res => {
            if (res.data.status === 200) {
                document.getElementById('form_bid').reset();
                setVisible(false);
                toast.current.show({ severity: 'success', summary: res.data.response, detail: 'Bid submitted' })
                FetchData();
            }
            else if (res.data.status === 501) {
                swal("Warning", res.data.message, 'warning');
                document.getElementById('form_bid').reset();
                setVisible(false);
                FetchData();
            }
            else {
                setmoney({ ...AmtBid, error: res.data.error });
            }
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        });
    }

    const columns = [
        {
            name: "Name of User",
            selector: row => row.name_user,
        },
        {
            name: "Message",
            selector: row => row.item_desc,
        },
        {
            name: "Amount",
            selector: row => <>
                &#x20B1; <NumericFormat value={row.amount_bidding} className='bg-transparent border-0' disabled thousandSeparator="," />,
            </>
        },

    ]



    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a complete state
            // return <Completionist />;
        } else {
            // Render a countdown
            return (
                <span>
                    {days} : {hours}:{minutes}:{seconds}
                </span>
            );
        }
    };


    return (
        <div>
            <Toast ref={toast} />

            <div className="container">
                <div className="row justify-content-center">
                    {
                        loading ? <Skeleton />
                            :
                            <>

                                <div class="mt-4">
                                    <div class="col-lg-12 mb-2">
                                        <div class="pic text-center"><img src={`http://127.0.0.1:8000/${Product.image}`} width="70%" height="30%" alt="" /></div>
                                    </div>
                                    <div className="col-lg-12 mb-2">
                                        <div className="inline-flex align-items-center">
                                            <span className='p-tag'>Product Details</span>
                                        </div>
                                        <div class="content-head">
                                            <div class="d-flex align-items-center justify-content-between ">
                                                Product Name:  <p class="h-1 mb-0">{Product.name}</p>
                                            </div>
                                            <div className="mb-3"></div>
                                        </div>
                                        <div class="content-body">
                                            <div>
                                                <div class="text-dark container text-parag">
                                                    <p>{Product.description}</p>
                                                </div>
                                                {/* <Divider align="left"> */}
                                                <div className="inline-flex align-items-center">
                                                    <span className='p-tag'>Owner Details</span>
                                                </div>
                                                {/* </Divider> */}
                                                <div class="container text-white d-flex align-items-center justify-content-between">
                                                    <div class="d-flex flex-column">
                                                        <p class="text-muted mb-2">Owner</p>
                                                        <div class=" d-flex align-items-center justify-content-between content-img">
                                                            <p class="text-dark">{Product.name_user}</p>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex flex-column">
                                                        <p class="text-muted mb-2">Price</p>
                                                        <div class=" d-flex align-items-center justify-content-between content-img">
                                                            <p className='text-dark'><NumericFormat className='border-0 bg-transparent' disabled value={Product.price} thousandSeparator="," /></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="container text-white d-flex align-items-center justify-content-between">
                                                    <div class="d-flex flex-column">
                                                        <p class="text-muted mb-2">Email Address</p>
                                                        <div class=" d-flex align-items-center justify-content-between content-img">
                                                            <p class="text-dark">{Product.email}</p>
                                                        </div>
                                                    </div>

                                                    <div class="d-flex flex-column">
                                                        <p class="text-muted mb-2">Contact Number</p>
                                                        <div class=" d-flex align-items-center justify-content-between content-img">
                                                            <p className='text-dark'> <NumericFormat className='border-0 bg-transparent' disabled value={Product.contact_number} /></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="content-body">
                                            {/* <Divider align="left"> */}
                                            <div className="inline-flex align-items-center">
                                                <span className='p-tag'>Product Location</span>
                                            </div>
                                            {/* </Divider> */}
                                            <div className="mt-2">
                                                <div className="container">
                                                    <GoogleMap
                                                        mapContainerStyle={containerStyle}
                                                        center={butuan}
                                                        zoom={13}
                                                        streetView={true}
                                                        mapTypeId="satellite"
                                                    >
                                                        <Marker position={{ lat: Product.lat, lng: Product.lng }} animation={window.google.maps.Animation.DROP} icon={`https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=` + `${Product.brgy_name}` + '|' + `${Product.marker_color}` + '|000000'}>

                                                        </Marker>

                                                    </GoogleMap>
                                                    <div className="mt-2">
                                                        <h6>
                                                            Address: <small>{Product.address}</small>
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                            <div className="inline-flex align-items-center">
                                                <span className='p-tag'>Bid Information</span>
                                            </div>

                                        <div class="container">
                                            <div class="d-flex align-items-center justify-content-between mt-3">
                                                <div class="d-flex flex-column text-white">
                                                    <p class="mb-2 text-muted">Total of Bids</p>
                                                    <span className='text-dark'>{total_bid}</span>
                                                </div>
                                                <div class="d-flex flex-column text-white">
                                                    <p class="mb-2 text-muted text-bold">Bid Ends</p>
                                                    <span class="mb-0 bid text-danger">
                                                        <small>
                                                            {
                                                                moment().format('MMM DD YYYY') === Product.start_date_now ? 1 : Product.end_date_now + '-' + Product.milliseconds_data
                                                            }
                                                        </small>
                                                    </span>
                                                </div>

                                            </div>
                                            <div className="mt-5">
                                                {
                                                    Countbid > 0 ? <Button className=' p-button-sm p-button-success' disabled label='Done Bid' /> : <Button className=' p-button-sm' onClick={(e) => setVisible(true)} label='Place Bid' />
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3"></div>


                                <div className="mt-5">
                                    <Card>
                                        <DataTable
                                            title="Bidders"
                                            columns={columns}
                                            data={BiddersData}
                                            pagination
                                            selectableRows
                                            theme='solarized'
                                        />
                                    </Card>
                                </div>
                                <Dialog header="Bidding Post" visible={visible} draggable={false} position='top' onHide={onHide} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }}>
                                    {
                                        localStorage.getItem('auth_token') != null ?
                                            <>
                                                <form onSubmit={PlaceBid} id='form_bid' autoComplete='off' key={1}>
                                                    <div className="row">
                                                        <p class="text-muted mb-2">Price</p>
                                                        <div class=" d-flex align-items-center justify-content-between content-img">
                                                            <p className='text-dark'><NumericFormat className='border-0 bg-transparent' disabled value={Product.price} thousandSeparator="," /></p>
                                                        </div>
                                                        <div className="col-lg-12 mb-4">
                                                            <label htmlFor="" className="form-label">
                                                                Amount to Bid
                                                            </label>
                                                            <InputNumber placeholder='00.00' tooltip="Enter amount to bid" tooltipOptions={{ position: 'mouse' }} name='amount_bid' onChange={(e) => setAmtbid(e.value)} className='w-100' mode='decimal' minFractionDigits={2} />
                                                        </div>
                                                        <div className="col-lg-12 mb-4">
                                                            <label htmlFor="" className="form-label">
                                                                Message
                                                            </label>
                                                            <InputTextarea name='message' tooltip="Message" tooltipOptions={{ position: 'mouse' }} className='w-100 disable_text' onChange={(e) => setmsg(e.target.value)} rows={5} cols={5} />
                                                        </div>
                                                        {
                                                            AmtBid >= Product.price ? <div className="mb-2">
                                                                <Button disabled={false} className='w-100' label='Place Bid' />
                                                            </div> : <div className="mb-2">
                                                                <Button disabled={true} className='w-100' label='Place Bid' />
                                                            </div>
                                                        }

                                                    </div>
                                                </form>
                                            </>
                                            :
                                            <>
                                                <h2 className='mb-3 text-start text-secondary'>Login</h2>
                                                <form onSubmit={LogingIn}>
                                                    <div className="row">
                                                        <div className="col-lg-12 mb-2">
                                                            <label htmlFor="username" className="form-label">
                                                                Username / Email
                                                            </label>
                                                            <InputText className='p-inputtext-sm w-100' name='username' onChange={handleinput} />
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
                                                            <Button disabled={btndis} className='p-button-sm p-button-info w-100' label='Login' />
                                                        </div>
                                                        <div className="mt-3">
                                                            <div className="d-flex justify-content-around">
                                                                <Link to="/register"><small>Create an Account</small></Link>
                                                                <a href=""><small>Forgot password</small></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </>

                                        // </Card>
                                    }
                                </Dialog>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default DetailsItem