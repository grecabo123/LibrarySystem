import React, { useEffect, useRef, useState } from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import LineChart from '../analytics/LineChart';
import BarChart from '../analytics/BarChartdata';
import BarChartdata from '../analytics/BarChartdata';
import TableRecords from '../analytics/TableRecords';
import PieChartdata from '../analytics/PieChartdata';
import { FcApproval, FcApprove, FcContacts, FcDisapprove } from 'react-icons/fc';
import { TieredMenu } from 'primereact/tieredmenu';
import { Badge } from 'primereact/badge';
import { Knob } from 'primereact/knob';
import axios from 'axios';
import swal from 'sweetalert';
import { Skeleton } from 'primereact/skeleton';
import { motion } from "framer-motion";



function Dashboard() {

    const [CountData, setCountData] = useState({
        allcount: "",
        verified: "",
        pending: "",
        report: "",
        copras_total: "",
        whole_total: "",
        copras_price: "",
        whole_price: "",
        copras_sold: "",
        whole_sold: "",
    });
    const [loading, setloading] = useState(true);

    useEffect(() => {
        AllDataTotal();
    }, []);

    const AllDataTotal = () => {
        axios.get(`/api/TotalCount`).then(res => {
            if (res.data.status === 200) {
                setCountData({
                    allcount: res.data.allaccounts,
                    verified: res.data.verified,
                    pending: res.data.pending,
                    report: res.data.reports,
                    copras_total: res.data.copras_total,
                    whole_total: res.data.whole_total,
                    copras_price: res.data.copras_price.new_price,
                    whole_price: res.data.whole_price.new_price,
                    copras_sold: res.data.copras_sold,
                    whole_sold: res.data.whole_sold,
                })
            }
            else {

            }
            setloading(false);
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }

    return (
        <div className='container-fluid p-4'>
            {
                loading ? <Skeleton />
                    :
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.4,
                                    ease: [0, 0.71, 0.2, 1.01]
                                }}
                            >
                                <Card title="All Accounts" className='zoom' >
                                    <div className="d-flex justify-content-between">
                                        <span>Total </span>
                                        <Badge severity={'info'} value={CountData.allcount} />
                                    </div>
                                </Card>
                            </motion.div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.5,
                                    ease: [0, 0.71, 0.2, 1.01]
                                }}
                            >
                                <Card title="Verified Account" className='zoom' >
                                    <div className="d-flex justify-content-between">
                                        <span>Total </span>
                                        <Badge severity={'success'} value={CountData.verified} />
                                    </div>
                                </Card>
                            </motion.div>

                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.6,
                                    ease: [0, 0.71, 0.2, 1.01]
                                }}
                            >
                                <Card title={<><span><small>Pending Account</small></span></>} className='zoom' >
                                    <div className="d-flex justify-content-between">
                                        <span>Total </span>
                                        <Badge value={CountData.pending} />
                                    </div>
                                </Card>
                            </motion.div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.7,
                                    ease: [0, 0.71, 0.2, 1.01]
                                }}
                            >
                                <Card title="Report Issue" className='zoom' >
                                    <div className="d-flex justify-content-between">
                                        <span>Total </span>
                                        <Badge severity={'danger'} value={CountData.report} />
                                    </div>
                                </Card>
                            </motion.div>
                        </div>
                        <div className="col-lg-6 mb-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.8,
                                    ease: [0, 0.71, 0.2, 1.01]
                                }}
                            >
                                <Card title="Product Type" className='zoom'>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span><b className=''>Copras Total: </b> <span className='p-tag'>{CountData.copras_total}</span></span>
                                        <span><b className=''>Whole Nut Total: </b> <span className='p-tag'>{CountData.whole_total}</span></span>
                                    </div>
                                </Card>
                            </motion.div>
                            <div className="mt-3">
                                <div className="row">
                                    <div className="col-lg-6 mb-4">
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                duration: 0.6,
                                                delay: 0.9,
                                                ease: [0, 0.71, 0.2, 1.01]
                                            }}
                                        >
                                            <Card title="Whole Nut" className='zoom'>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span>Current Price</span>
                                                    <span className='p-tag'>₱ {CountData.whole_price}</span>
                                                </div>
                                            </Card>
                                        </motion.div>
                                    </div>
                                    <div className="col-lg-6 mb-4">
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                duration: 0.6,
                                                delay: 1,
                                                ease: [0, 0.71, 0.2, 1.01]
                                            }}
                                        >
                                            <Card title="Copras" className='zoom'>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span>Current Price</span>
                                                    <span className='p-tag'>₱ {CountData.copras_price}</span>
                                                </div>
                                            </Card>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 mb-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.6,
                                    delay: 1.1,
                                    ease: [0, 0.71, 0.2, 1.01]
                                }}
                            >
                                <center>
                                    <Knob value={(CountData.copras_sold / CountData.copras_total * 100).toFixed(0)} valueColor={"SlateGray"} valueTemplate={"{value}%"} rangeColor={"MediumTurquoise"} className='p-knob-range w-100' step={10} size={200} />
                                    <span className='fs-6 text-secondary'>Copras Rate Sold</span>
                                </center>
                            </motion.div>
                        </div>
                        <div className="col-lg-3 mb-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.6,
                                    delay: 1.2,
                                    ease: [0, 0.71, 0.2, 1.01]
                                }}
                            >
                                <center>
                                    <Knob value={(CountData.whole_sold / CountData.whole_total * 100).toFixed(0)} valueColor={"SlateGray"} valueTemplate={"{value}%"} rangeColor={"MediumTurquoise"} className='p-knob-range w-100' step={10} size={200} />
                                    <span className='fs-6 text-secondary'>Whole Nut Rate Sold</span>
                                </center>
                            </motion.div>
                        </div>

                        <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.6,
                                    delay: 1.3,
                                    ease: [0, 0.71, 0.2, 1.01]
                                }}
                            >
                        <div className="row mb-3">
                            <div className="col-lg-12 col-sm-12 mb-2">
                                <TableRecords />
                            </div>
                            <div className="col-lg-3 col-sm-12 mb-2">
                                <PieChartdata />
                            </div>
                        </div>
                    </motion.div>

                        <div className="row mb-3">
                            <div className="col-lg-6 col-md-6 col-sm-12 mb-2">
                                <LineChart />
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 mb-2">
                                <BarChartdata />
                            </div>
                            <div className="col-lg-12 col-md-6 col-sm-12 mb-2">
                                <LineChart />
                            </div>
                        </div>
                    </div>
            }


        </div>
    )
}

export default Dashboard