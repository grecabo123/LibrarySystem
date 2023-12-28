import axios from 'axios';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown'
import { Skeleton } from 'primereact/skeleton';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import swal from 'sweetalert';
import { PDFViewer } from '@react-pdf/renderer';
import GeneratePDF from '../../../Report/GeneratePDF';
import logo from '../../../../assets/icon/iocn.png'
import moment from 'moment';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';

function ReportsThesis() {

    const [loading, setloading] = useState(true)
    const [DepartmentData, setDepartmentData] = useState([]);
    const [DepartmentPick, setDepartmentPick] = useState([]);
    const [DepartmentFilter, setDepartmentFilter] = useState({
        title: "",
    });
    const [TitleThesis, setThesis] = useState([]);


    useEffect(() => {
        axios.get(`/api/DepartmentDataFetch`).then(res => {
            if (res.data.status === 200) {
                setDepartmentData(res.data.data);
            }
        }).catch((error) => {
            if (res.data.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })

    }, [])

    useEffect(() => {

    }, []);

    const Dept = DepartmentData.map((data) => {
        return (
            { label: data.department, value: data.id }
        )
    });




    const Filter = (e) => {
        e.preventDefault();
        axios.get(`/api/DepartmentFilterThesis/${DepartmentPick}`).then(res => {
            if (res.data.status === 200) {
                setDepartmentFilter({
                    title: res.data.department,
                });
                setThesis(res.data.data)
            }
            setloading(false)
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }

    // console.log(TitleThesis);

    const column = [
        {
            name: "Course",
            selector: row => row.CourseName,
        },
        {
            name: "Thesis Title",
            selector: row => row.title,
        },
        {
            name: "Number of Visits",
            selector: row => row.total_visits,
        },
    ]

    const handleGeneratePdf = () => {
        const filename = moment().format('MMM DD YYYY');
        const htmlContent = document.getElementById('myComponent').innerHTML;
        GeneratePDF(htmlContent, 'Report' + '-' + DepartmentFilter.title.department + '-' + filename + '.' + 'pdf');

    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="col-lg-11">
                            <div className="row">
                                <form onSubmit={Filter}>
                                    <div className="row">
                                        <div className="col-lg-6 mb-2">
                                            <label htmlFor="" className="form-label">
                                                Department
                                            </label>
                                            <Dropdown className='w-100' value={DepartmentPick} options={Dept} onChange={(e) => setDepartmentPick(e.target.value)} placeholder='Choose Department' />
                                            <div className="mt-3">
                                                <Button className='p-button-info p-button-sm me-2' label='Filter' icon={PrimeIcons.FILTER} />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 mb-2">
                                            <label htmlFor="" className="form-label">
                                                From
                                            </label>
                                            <Calendar className='w-100' placeholder='From' />
                                        </div>
                                        <div className="col-lg-3 mb-2">
                                            <label htmlFor="" className="form-label">
                                                End
                                            </label>
                                            <Calendar className='w-100' placeholder='End' />
 
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="mt-4">
                                {
                                    loading ? <Skeleton /> :
                                        <>
                                            <center><h5 className='text-danger' id='text_title'>{DepartmentFilter.title.department} - {DepartmentFilter.title.department_code}</h5></center>
                                            <DataTable
                                                title="List of Title Reports"
                                                columns={column}
                                                data={TitleThesis}
                                                selectableRows
                                                pagination
                                                subHeader
                                                subHeaderComponent={
                                                    <Button className='p-button-sm p-button-danger' label='Generate PDF' icon={PrimeIcons.FILE_PDF} onClick={handleGeneratePdf} />

                                                }
                                                subHeaderAlign='right'
                                            />


                                            <div id="myComponent" style={{ display: "none" }}>
                                                <center><img src={logo} alt="" width={80} /></center>
                                                <center><span>{DepartmentFilter.title.department}</span></center>

                                                <div className="mt-3">
                                                    <h5 className='text-dark'>Report Thesis</h5>
                                                </div>
                                                <table className="table table-striped" width="100%">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Courses</th>
                                                            <th scope="col">Research Title</th>
                                                            <th scope="col">Total Visits</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            TitleThesis.map((data) => {
                                                                return (
                                                                    <>
                                                                        <tr>
                                                                            <td>{data.CourseName}</td>
                                                                            <td>{data.title}</td>
                                                                            <td>{data.total_visits}</td>
                                                                        </tr>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>

                                        </>

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportsThesis