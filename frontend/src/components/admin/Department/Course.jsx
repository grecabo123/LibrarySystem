import axios from 'axios';
import moment from 'moment';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react'
import DataTable from 'react-data-table-component';
import swal from 'sweetalert';
import CourseEditData from './CourseEditData';

function Course(props) {

    const [loading, setloading] = useState(true);
    const [CourseData, setCourse] = useState([]);
    const [btndis, setbtndis] = useState(false);
    const [transferdata, settransferdata] = useState(false);
    const [PickDepartment, setPickDepartment] = useState([]);
    const [CourseDataEdit, setCourseEdit] = useState(false);
    const [FilterCourse, setFilterCourse] = useState([]);
    const [CourseEditdata, setCourseEditData] = useState([]);
    const [CourseDataId, setCourseDataId] = useState();
    const toast = useRef();
    const [CourseAdd, setCourseAdd] = useState({
        course: "",
        error: [],
    });
    const [CourseModalForm, setCourseModalForm] = useState(false);

    useEffect(() => {
        CoursesDataFetch();
    }, []);

    const CoursesDataFetch = () => {
        const id = localStorage.getItem('department_id');
        axios.get(`/api/CourseData/${id}`).then(res => {
            if (res.data.status === 200) {
                setCourse(res.data.course);
            }
            else {

            }
            setloading(false)
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }

    const handleInput = (e) => {
        e.persist();
        setCourseAdd({ ...CourseAdd, [e.target.name]: e.target.value });
    }

    const TransferCourse = (e) => {
        settransferdata(true)
        setCourseDataId(e.currentTarget.getAttribute('data-course-id'))
    }
    const CourseEdit = (e) =>{
        setCourseEdit(true)
        // e.currentTarget.getAttribute('data-department')
        setFilterCourse(e.currentTarget.getAttribute('data-course-id'));
        
        
    }   
    const onHidesettransferdata = () => {
        settransferdata(false)
        setCourseEdit(false)
    }

   

    const column = [
        {
            name: "Course Name",
            selector: row => row.CourseName,
            sortable: true,
        },
        {
            name: "Date Created",
            selector: row => moment(row.created_at).format('MMM DD YYYY'),
            sortable: true,
        },
        {
            name: "Action",
            selector: row => <>
                <Button className='p-button-sm p-button-info me-2' label='Edit' data-department={row.CourseName} data-course-id={row.id} onClick={CourseEdit} />
                <Button className='p-button-sm p-button-danger' label='Transfer' data-course-id={row.id} onClick={TransferCourse} />
                {/* {row.status_course === 1 ?  <Button className='p-button-sm p-button-danger' label='Deactivate'/> :  <Button className='p-button-sm p-button-success' label='Active'/>} */}
            </>,
            sortable: true,
        },
    ]
    const CoursesModal = () => {
        setCourseModalForm(true);
    }

    const onHideModalCourse = () => {
        setCourseModalForm(false);
    }

    const AddCourseData = (e) => {
        e.preventDefault();
        setbtndis(true)
        const data = {
            course: CourseAdd.course,
            department_fk: localStorage.getItem('department_id'),
        };
        axios.post(`/api/AddCourse`, data).then(res => {
            if (res.data.status === 200) {
                setCourseModalForm(false);
                document.getElementById('form_reset').reset();
                CoursesDataFetch();
                setbtndis(false);
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Added Course' });

            }
            else {
                setbtndis(false);

                setCourseAdd({ ...CourseAdd, error: res.data.error });
            }
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
                setbtndis(false);

            }
        });
    }

    const DepartmentList = props.departmentName.map((data) => {
        return (
            {label: data.department, value: data.id}
        )
    });

    const TransferCourseData = (e) => {
        e.preventDefault();
        const data = {
            department_id: PickDepartment,
            id: CourseDataId,
        };
        axios.put(`/api/TransferCourse`,data).then(res => {
            if(res.data.status === 200) {
                toast.current.show({severity: "success", summary: "Course Has Been Transfer", details: "success"});
                settransferdata(false);
                setPickDepartment([]);
                CoursesDataFetch();
                setCourseDataId("")
            }
            else{
                swal("Warning",res.data.error,'warning');

            }
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
                setbtndis(false);
            }
        });
    }


    return (
        <div>
            <Toast ref={toast} />
            <DataTable
                columns={column}
                data={CourseData}
                progressPending={loading}
                subHeader
                subHeaderAlign='right'
                subHeaderComponent={<Button className='p-button-sm p-button-info' onClick={CoursesModal} icon={PrimeIcons.PLUS} label='Register Course' />}
                pagination
                selectableRows
                progressComponent={<Skeleton className='w-100' borderRadius='20' />}
            />
            <Dialog header="Register Course" visible={CourseModalForm} draggable={false} position='top' onHide={onHideModalCourse} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }}>
                <form onSubmit={AddCourseData} id='form_reset'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Course Name
                                </label>
                                <InputText className='w-100' name='course' onChange={handleInput} />
                            </div>

                            <div className="mt-3">
                                <Button className='p-button-info p-button-sm' disabled={btndis} label='Add Course' />
                            </div>
                        </div>
                    </div>
                </form>
            </Dialog>



            <Dialog draggable={false} header="Transfer Course" position='top' visible={transferdata} onHide={onHidesettransferdata} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }}>
                <form onSubmit={TransferCourseData}>
                    <label htmlFor="" className="form-label">
                        Department Data
                    </label>
                    <Dropdown className='w-100' value={PickDepartment} placeholder='Department' onChange={(e) => setPickDepartment(e.target.value)}  options={DepartmentList} />
                    <div className="mt-3">
                        <Button className='p-button-info' label='Save' />
                    </div>
                </form>
            </Dialog>

            <Dialog draggable={false} header="Transfer Course" position='top' visible={CourseDataEdit} onHide={onHidesettransferdata} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }}>
               <CourseEditData id={FilterCourse} />
            </Dialog>


            
            


        </div>
    )
}

export default Course