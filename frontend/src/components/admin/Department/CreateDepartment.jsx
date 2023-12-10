import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { Panel } from 'primereact/panel'
import React, { useEffect, useRef, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext'
import axios from 'axios'
import swal from 'sweetalert'
import { Skeleton } from 'primereact/skeleton'
import { Toast } from 'primereact/toast'
import Course from './Course'
import { ColorPicker } from 'primereact/colorpicker';
 


function CreateDepartment() {

    const [visible, setVisible] = useState(false);
    const [DepartmentData, setDepartmentData] = useState([]);
    const [loading, setloading] = useState(true);
    const [visibleCourse, setvisibleCourse] = useState(false);
    const toast = useRef();
    const [color, setColor] = useState([]);
    const [DepartmentName, setDepartmentName] = useState({
        department: "",
        code: "",
        error: [],
    });

    useEffect(() => {
        DepartmentFetch();
    },[]);

    const DepartmentFetch =() => {
        axios.get(`/api/DepartmentDataFetch`).then(res => {
            if(res.data.status === 200) {
                setDepartmentData(res.data.data);
            }
            setloading(false);
        }).catch((error) => {
            if(error.response.status === 500){
                swal("Warning",error.response.statusText,'warning');
            }
        });
    }

    const handleInput = (e) => {
        e.persist();
        setDepartmentName({...DepartmentName, [e.target.name] : e.target.value});
    };

    const onHide = () => {
        setVisible(false);
    }
    const header_temp =
        <div className='d-flex justify-content-between align-items-center' >
            <span>Department</span>
        </div>

    const AddDepartment = (e) => {
        e.preventDefault();
        const data = {
            department: DepartmentName.department,
            code: DepartmentName.code,
            color_code: color,
            user_id: localStorage.getItem('auth_id'),
        };

        axios.post(`/api/AddDepartment`,data).then(res => {
            if(res.data.status === 200) {
                setVisible(false);
                document.getElementById('form_reset').reset();
                DepartmentFetch();
            }
            else{
                setDepartmentName({...DepartmentName, error: res.data.error});
            }
        }).catch((error) => {
            if(error.response.status === 500){
                swal("Warning",error.response.statusText,'warning');
            }
        });

    }

    const DisplayData = (e,department) => {
        setvisibleCourse(true);
        localStorage.setItem('department_id',e);
        localStorage.setItem('department_name',department);
    }
    const onHideCourse = () =>{
        setvisibleCourse(false);
        localStorage.removeItem('department_name');
        localStorage.removeItem('department_id');
    }

    const column = [
        {
            name: "Department",
            selector: row => row.department,
            sortable: true,
        },
        {
            name: "Department Code",
            selector: row => row.department_code,
            sortable: true,
        },
        {
            name: "Action",
            selector: row => <Button className='p-button-sm p-button-info' data-department_name={row.department} value={row.id} onClick={(e) => DisplayData(e.target.value, row.department)} label='Courses'  />,
            sortable: true,
        },

    ]

    // console.log(color);

    return (
        <div className='container-fluid'>
            <Toast ref={toast} />
            <div className="mt-2 mb-2 d-flex justify-content-end">
                <Button className='p-button-sm' label='Add Department' icon={PrimeIcons.PLUS} onClick={() => setVisible(true)} />
            </div>
            <Panel header={header_temp}>
                <DataTable
                    title=" "
                    columns={column}
                    data={DepartmentData}
                    progressPending={loading}
                    selectableRows
                    pagination
                    progressComponent={<Skeleton className='w-100' />}
                />
            </Panel>
            <Dialog header="Register Department" visible={visible} onHide={onHide} position='top' draggable={false} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }}>
                <form onSubmit={AddDepartment} id='form_reset'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Department Name
                                </label>
                                <InputText className='w-100' name='department' onChange={handleInput} />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Department Code
                                </label>
                                <InputText className='w-100' name='code' onChange={handleInput} />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <ColorPicker value={color} onChange={(e) => setColor(e.value)} className='p-colorpicker-hue' /> <br />
                                 <span>{color}</span>   
                            </div>
                            <div className="mt-2 d-flex justify-content-start">
                                <Button className='p-button-sm p-button-info' label='Register Department' />
                            </div>
                        </div>
                    </div>
                </form>
            </Dialog>

            <Dialog header={`Courses Data -  ${localStorage.getItem('department_name') === null ? "" : localStorage.getItem('department_name') }`} visible={visibleCourse} onHide={onHideCourse} position='top' draggable={false} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '70vw' }}>
                {/* <Course {...DepartmentName} /> */}
                <Course departmentName={DepartmentData} />
            </Dialog>
            
            
        </div>
    )
}

export default CreateDepartment