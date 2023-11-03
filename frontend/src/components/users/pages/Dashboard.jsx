import axios from 'axios'
import { Badge } from 'primereact/badge'
import { Card } from 'primereact/card'
import { Skeleton } from 'primereact/skeleton'
import React, { useEffect, useState } from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import { FcDown } from 'react-icons/fc'
import swal from 'sweetalert'

function Dashboard() {

    const [PriceMonitor, setPriceMonitor] = useState({
        copras: "",
        whole: "",
    });
    const [loading, setloading] = useState(true);

    useEffect(() => {
        PriceData();
    }, [])

    const PriceData = () => {
        axios.get(`/api/PriceMonitor`).then(res => {
            if (res.data.status === 200) {
                setPriceMonitor({
                    copras: res.data.copras,
                    whole: res.data.whole,
                });
            }
            setloading(false)
        }).catch((error) => {
            swal("Warning", error.response.statusText, 'warning');
        })
    }


    return (
        <>
            {
                loading ? <Skeleton className='w-100' />
                    :
                    <div className='container-fluid'>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                                <Card title="Product Sold" className='zoom' >
                                    <div className="d-flex justify-content-between">
                                        <span>Total </span>
                                        <Badge severity={'success'} value={52} />
                                    </div>
                                </Card>
                                <div className="row mt-2">
                                    <div className="col-lg-6 mb-2">
                                        <Card title="Whole Nut Price" className='zoom' >
                                            <div className="d-flex justify-content-between">
                                            ₱ {PriceMonitor.whole.new_price} 
                                                <div className='mt-0'>
                                                    {
                                                        PriceMonitor.whole.new_price > PriceMonitor.whole.current_price
                                                            ? <div className='mt-0'>
                                                                <FaArrowUp className='text-success  mb-0 me-2 fs-5' />
                                                                <small>₱ {(PriceMonitor.whole.new_price - PriceMonitor.whole.current_price).toFixed(2)}</small>
                                                            </div>
                                                            : <div className='mt-0'>
                                                            <FaArrowDown className='text-danger  mb-0 me-2 fs-5' />
                                                            <small>₱ {(PriceMonitor.whole.current_price - PriceMonitor.whole.new_price).toFixed(2)}</small>
                                                        </div>        
                                                    }
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <Card title={PriceMonitor.copras.name_tag_int === 1 ? "Copras" : ""} className='zoom' >
                                            <div className="d-flex justify-content-between">
                                                ₱ {PriceMonitor.copras.new_price} 
                                                <div className='mt-0'>
                                                    {
                                                        PriceMonitor.copras.new_price > PriceMonitor.copras.current_price
                                                            ? <div className='mt-0'>
                                                                <FaArrowUp className='text-success  mb-0 me-2 fs-5' />
                                                                <small>₱ {(PriceMonitor.copras.new_price - PriceMonitor.copras.current_price).toFixed(2)}</small>
                                                            </div>
                                                            : <div className='mt-0'>
                                                            <FaArrowDown className='text-danger  mb-0 me-2 fs-5' />
                                                            <small>₱ {(PriceMonitor.copras.current_price - PriceMonitor.copras.new_price).toFixed(2)}</small>
                                                        </div>        
                                                    }
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                                <Card title="Total Cost" className='zoom' >
                                    <div className="d-flex justify-content-between">
                                    <span>₱ 423,044</span>
                                        {/* <Badge severity={'info'} value={20} /> */}
                                    </div>
                                </Card>
                                <div className="row mt-2">
                                    <div className="col-lg-12 col-md-6 col-sm-12 mb-2">
                                        <Card title="Profit Income" className='zoom'>
                                            <div className="d-flex justify-content-between">
                                                <span>₱ 123,531</span>
                                                {
                                                        PriceMonitor.copras.new_price > PriceMonitor.copras.current_price
                                                            ? <div className='mt-0'>
                                                                <FaArrowUp className='text-success  mb-0 me-2 fs-5' />
                                                                <small> {(PriceMonitor.copras.new_price - PriceMonitor.copras.current_price).toFixed(2)} %</small>
                                                            </div>
                                                            : <div className='mt-0'>
                                                            <FaArrowDown className='text-danger  mb-0 me-2 fs-5' />
                                                            <small> {(PriceMonitor.copras.current_price - PriceMonitor.copras.new_price).toFixed(2)} %</small>
                                                        </div>        
                                                    }
                                                {/* <Badge severity={'info'} value={20} /> */}
                                            </div>
                                        </Card>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default Dashboard