import React, { useEffect, useRef, useState } from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import LineChart from '../analytics/LineChart';
import BarChart from '../analytics/BarChartdata';
import BarChartdata from '../analytics/BarChartdata';
import TableRecords from '../analytics/TableRecords';
import PieChartdata from '../analytics/PieChartdata';
import { FcApproval, FcApprove, FcCalendar, FcContacts, FcDisapprove } from 'react-icons/fc';
import { TieredMenu } from 'primereact/tieredmenu';
import { Badge } from 'primereact/badge';
import { Knob } from 'primereact/knob';
import axios from 'axios';
import swal from 'sweetalert';
import { Skeleton } from 'primereact/skeleton';
import { motion } from "framer-motion";
import CourseData from './dashboard/CourseData';
import { Divider } from 'primereact/divider';
import Ranking from './dashboard/Ranking';
import AllUsers from './dashboard/AllUsers';
import { Panel } from 'primereact/panel';
// import { Knob } from 'primereact/knob';
 
function Dashboard() {

    const [loading, setloading] = useState(true);
    const [value, setValue] = useState(59)
    const [CountData, setCountData] = useState({
        allcount: "",
        students: "",
        non_students: "",
        thesis: "",
    });

    useEffect(() => {
        AllDataTotal();
    }, []);

    const AllDataTotal = () => {
        axios.get(`/api/AllData`).then(res => {
            if (res.data.status === 200) {
                setCountData({
                    allcount: res.data.allaccounts,
                    students: res.data.students,
                    non_students: res.data.non_students,
                    thesis: res.data.thesis,
                });
            }
            else {

            }
            setloading(false)
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning')
            }
        })
    }

    return (
        <div className='container-fluid p-4'>
            {
                loading ? <Skeleton />
                    :
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
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
                                    <div className="d-flex justify-content-between mb-3">
                                        <span>Total </span>
                                        <Badge severity={'info'} value={CountData.allcount} />
                                        
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Students </span>
                                        <Badge severity={'success'} value={CountData.students} />
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Non Student </span>
                                        <Badge value={CountData.non_students} />
                                    </div>
                                </Card>
                            </motion.div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.7,
                                    ease: [0, 0.71, 0.2, 1.01]
                                }}
                            >
                                <Card title="All Thesis" className='zoom' >
                                    <div className="d-flex justify-content-between">
                                        <span>Total </span>
                                        <Badge severity={'danger'} value={CountData.thesis} />
                                    </div>
                                </Card>
                            </motion.div>
                        </div>

                        <Panel>
                        <div className="row mb-3">
                            <div className="col-lg-6 col-md-6 col-sm-12 mb-2">
                            
                               <CourseData />
                            {/* </motion.div> */}
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 mb-2">
                                <Ranking />
                            </div>
                            <div className="col-lg-6 mx-5 col-md-6 col-sm-12 mb-2">
                                {/* <Knob value={value} size={200} valueColor={"SlateGray"} rangeColor={"MediumTurquoise"} onChange={(e) => setValue(value)} /> */}
                            </div>
                            <div className="col-lg-12 col-md-6 col-sm-12 mb-2">
                                <center><h4 className='text-secondary'>Annoucement  <FcCalendar/> </h4></center>
                                <AllUsers />
                            </div>
                        </div>
                        </Panel>
                    </div>
            }


        </div>
    )
}

export default Dashboard