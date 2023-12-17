import axios from 'axios';
import { PrimeIcons } from 'primereact/api';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Mention } from 'primereact/mention';
import { Panel } from 'primereact/panel'
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react'
import swal from 'sweetalert';

function NoAccount() {

    const [formFields, setFormFields] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
    });
    const [MonthData, setMonth] = useState([])
    const [DepartmentData, setDepartmentData] = useState([]);
    const [loading, setloading] = useState(true)
    const [Tags, setTags] = useState([]);
    const [DepartmentGet, setDepartmentGet] = useState([]);
    const [CourseGet, setCourseGet] = useState([]);
    const [CourseGetData, setCourseData] = useState([]);
    const [FilterCourse, setFilterCourse] = useState([])
    const [suggestions, setSuggestions] = useState([]);
    const [UserData, setUserData] = useState([]);
    const [NameTags, setRemoveNames] = useState([]);
    const [emailchoose, setemailchoose] = useState("")

    const [btndis, setbtndis] = useState(false);
    const [visible, setVisible] = useState(false);
    const toast = useRef();
    const [UploadData, setUploadData] = useState({
        title: "",
        year: "",
        description: "",
        error: [],
    });
    const [FileData, setFile] = useState([]);

    useEffect(() => {
        axios.get(`/api/DepartmentDataFetch`).then(res => {
            if (res.data.status === 200) {
                setDepartmentData(res.data.data);
            }
            setloading(false)
        }).catch((error) => {
            if (res.data.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }, [])

    const handleInputAdd = (e) => {
        e.persist();
        setFormFields({ ...formFields, [e.target.name]: e.target.value });
    }


    useEffect(() => {
        UserDataFetch();
    },[])





    // Program || Course
    useEffect(() => {
        axios.get(`/api/CourseDataFetch`).then(res => {
            if (res.data.status === 200) {
                setCourseGet(res.data.data);
                setFilterCourse(res.data.data)

            }
            setloading(false)
        }).catch((error) => {
            if (res.data.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }, [])

    const UserDataFetch = () => {
        axios.get(`/api/AllNonUsers`).then(res => {
            if (res.data.status === 200) {
                setUserData(res.data.email);
            }
            else if (res.data.status === 504) {
                setUserData(res.data.error);
            }
            setloading(false)
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }

    const SelectDataEmail = (e) => {
        setemailchoose(e.suggestion.name)
    }
    const onSearch = (e) => {
        setTimeout(() => {
            const query = e.query;
            let suggestions;
            if (UserData === "No Accounts") {
                return false;
            }
            else {
                if (!query.trim().length) {
                    suggestions = [...UserData];
                }
                else {
                    suggestions = UserData.filter((email) => {
                        return email.name.toLowerCase().startsWith(query.toLowerCase());
                    });
                }
                setSuggestions(suggestions);
            }
        }, 250);
    }

    const itemTemplate = (suggestion) => {
        return (
            <div className="flex align-items-center">
                <span className="flex flex-column ml-2">
                    <li className='list-item mb-2'> <b>Student Name</b>:  {suggestion.id}</li>
                    <li className='list-item mb-2'><b>Student Email</b>: {suggestion.name}</li>
                    <Divider />
                </span>
            </div>
        );
    }

    const EmailInput = (e) => {
        // console.log(e.target.value);
        setemailchoose(e.target.value);
    }

    const AddTagNames = (e) => {
        e.preventDefault();
        if (NameTags.find(nameTags => nameTags === emailchoose)) {
            alert(emailchoose + " " + "Email is already registered")
            setemailchoose("")
        }
        else {
            if (emailchoose === "") {
                return false;
                // alert("Please Enter Email")
            }
            else {
                
                if(emailchoose.includes('\n')){

                }
                setRemoveNames([...NameTags, emailchoose.replace(/\n/g, '')]);
                setemailchoose("");
            }
        }
    }

    const RemoveTagName = RemoveTagEmail => {
        const newTagsNames = NameTags.filter(NameChip => NameChip !== RemoveTagEmail);
        setRemoveNames(newTagsNames)
    }


    useEffect(() => {
        const result = CourseGet.filter(data => {
            return data.department_fk === DepartmentGet ? DepartmentGet : setCourseData("");
        });
        setFilterCourse(result);
    }, [DepartmentGet]);


    const department = DepartmentData.map((data, idx) => {
        return (
            { label: data.department, value: data.id }
        )
    });

    const course = FilterCourse.map((data, idx) => {
        return (
            { label: data.CourseName, value: data.id }
        )
    });

    const RemoveTag = RemoveTag => {
        const newTagss = Tags.filter(tagChip => tagChip !== RemoveTag);
        setTags(newTagss)
    }

    const AddInput = () => {
        setVisible(true);
    };



    const handleInput = (e) => {
        setUploadData({ ...UploadData, [e.target.name]: e.target.value });
    }

    const AddName = (e) => {
        e.preventDefault();

        const data = {
            first_name: formFields.first_name,
            middle_name: formFields.middle_name,
            last_name: formFields.last_name,
        };

        axios.post(`/api/AddName`, data).then(res => {
            if (res.data.status === 200) {
                setVisible(false);
                document.getElementById('add_form').reset();
                toast.current.show({ severity: "success", summary: "Added Name", details: "Successfully" });
            }
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }

    const fileHandler = (e) => {
        e.persist();
        setFile({ file: e.target.files[0] });
    }


    const months = [
        { label: "January", value: "January" },
        { label: "February", value: "February" },
        { label: "March", value: "March" },
        { label: "Apil", value: "Apil" },
        { label: "May", value: "May" },
        { label: "June", value: "June" },
        { label: "July", value: "July" },
        { label: "August", value: "August" },
        { label: "September", value: "September" },
        { label: "October", value: "October" },
        { label: "November", value: "November" },
        { label: "December", value: "December" },
    ]

    const AddKeyword = (e) => {
        e.preventDefault();

        if (Tags.find(keywordTags => keywordTags.toLowerCase() === document.getElementById('keyword').value.toLowerCase())) {
            alert(document.getElementById('keyword').value + " " + "Keyword is already registered")
            document.getElementById('keyword').value = "";
        }
        else {
            if (document.getElementById('keyword').value === "") {
                return false;
            }
            else {
                setTags([...Tags, document.getElementById('keyword').value]);
                document.getElementById('keyword').value = "";
            }
        }
    }


    if (loading) {
        return (
            <>
                <Skeleton className='w-100' />
            </>
        )
    }

    // console.log(NameTags);


    const UploadThesis = (e) => {
        e.preventDefault();

        if (NameTags.length > 0) {
            const data = new FormData();
            data.append('names', NameTags);
            data.append('title', UploadData.title);
            data.append('description', UploadData.description);
            data.append('year', UploadData.year);
            data.append('department', DepartmentGet);
            data.append('program', CourseGetData);
            data.append('keywords', Tags);
            data.append('month', MonthData);
            data.append('file', FileData.file)
            data.append('admin_key', localStorage.getItem('auth_id'));

            axios.post(`/api/UploadNonAccount`, data).then(res => {
                if (res.data.status === 200) {
                    document.getElementById('reset_form').reset();
                    setTags([]);
                    setCourseGet([])
                    
                    setRemoveNames([]);
                    toast.current.show({ severity: "success", summary: "Uploaded", detail: "Sucesss" });
                }
            }).catch((error) => {
                if (error.response.status === 500) {
                    swal("Warning", error.response.statusText, 'warning');
                }
            })
        }
        else {
            swal("Error", "Please Add Names Atleast 1", "error");
        }


    }


    return (
        <div className='container-fluid'>
            <Toast ref={toast} />
            <Dialog header="Register Name" position='top' draggable={false} visible={visible} onHide={() => setVisible(false)}
                style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                <form onSubmit={AddName} id='add_form'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    First Name
                                </label>
                                <InputText className='w-100' name='first_name' onChange={handleInputAdd} />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Middle Name
                                </label>
                                <InputText className='w-100' name='middle_name' onChange={handleInputAdd} />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Last Name
                                </label>
                                <InputText className='w-100' name='last_name' onChange={handleInputAdd} />
                            </div>
                            <div className="mt-3 d-flex justify-content-end">
                                <Button className='p-button-sm p-button-success' label='Add Name' />
                            </div>
                        </div>
                    </div>
                </form>
            </Dialog>
            <Panel header="Upload Thesis No Account">
                <Button className='p-button-sm p-button-info' label='Register Name' onClick={AddInput} />
                <div className="container mt-3">
                    <div className="row">
                        <form id='reset_form' onSubmit={UploadThesis}>
                            <div className='row'>
                            <div className="col-md-12 mb-3">
                            {
                                NameTags.map((NameChip, index) => {
                                    return (
                                        <>
                                        <Badge  className='me-3 ' key={index} value={NameChip} severity="info">{NameChip}</Badge>
                                        <button className='me-5 border-0' onClick={() => RemoveTagName(NameChip)}>X</button>
                                        </>
                                        // <Badge className='me-3' key={index} value={NameChip} severity="info" onClick={() => RemoveTagName(NameChip)}>{NameChip}</Badge>
                                    )
                                })
                            }
                        </div>
                                <div className="col-lg-12 col-sm-12 mb-2 mt-4">
                                    <label htmlFor="" className="form-label">
                                        Name Student<span className='text-danger'>*</span>
                                    </label>
                                    <div className="p-inputgroup">
                                        <Mention placeholder='Type @ to search student' autoresize={false} scrollHeight='400px' onSelect={SelectDataEmail} field="name" trigger="@" itemTemplate={itemTemplate} suggestions={suggestions} id='email_user' name="names" onChange={EmailInput} onSearch={onSearch} className='w-100 p-mention-items p-mention' value={emailchoose} rows={2} cols={1} autoResize={false} />
                                        <Button className='p-button-primary' icon={PrimeIcons.PLUS} onClick={AddTagNames} />
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-lg-6 col-sm-12 mb-2">
                                    <label htmlFor="" className="form-label">
                                        Department<span className='text-danger'>*</span>
                                    </label>
                                    <Dropdown className='w-100' value={DepartmentGet} options={department} onChange={(e) => setDepartmentGet(e.target.value)} placeholder='Choose Department' />
                                </div>

                                <div className="col-lg-6 col-sm-12 mb-2">
                                    <label htmlFor="" className="form-label">
                                        Program<span className='text-danger'>*</span>
                                    </label>
                                    <Dropdown value={CourseGetData} options={course} onChange={(e) => setCourseData(e.target.value)} className='w-100 p-dropdown-sm' placeholder='Choose Program' />
                                </div>
                            </div>
                            <Divider>

                                <Badge className='' value={"Research Information"}>Research Information</Badge>
                            </Divider>
                            <div className="col-lg-12 col-sm-12 mb-2">
                                <label className="form-label">
                                    Project Title<span className='text-danger'>*</span>
                                </label>
                                <InputText className='w-100' name='title' onChange={handleInput} />
                            </div>
                            <div className="col-lg-12 col-sm-12 mb-2">
                                <label className="form-label">
                                    Keyword<span className='text-danger'>*</span>
                                </label>
                                <div className="p-inputgroup">
                                    <InputText placeholder="Keyword" id='keyword' name='keyword' />
                                    <Button label="Add" onClick={AddKeyword} icon={PrimeIcons.PLUS} />
                                </div>

                                <span className='text-danger'>*</span><small className='text-info'> Keywords atleast more thean 3</small>
                                <br />
                                {
                                    Tags.map((tagChip, index) => {
                                        return (

                                            <span key={index} className='me-3' onClick={() => RemoveTag(tagChip)}><Badge key={index} value={tagChip}></Badge> X</span>
                                        )
                                    })
                                }
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-sm-12 mb-2">
                                    <label className="form-label">
                                        Month Publication<span className='text-danger'>*</span>
                                    </label>
                                    <Dropdown className='w-100' value={MonthData} options={months} onChange={(e) => setMonth(e.target.value)} placeholder='Month' />
                                </div>
                                <div className="col-lg-6 col-sm-12 mb-2">
                                    <label className="form-label">
                                        Year Publication<span className='text-danger'>*</span>
                                    </label>
                                    <InputText className='w-100' keyfilter={'int'} name='year' onChange={handleInput} maxLength={4} />
                                </div>
                            </div>
                            <div className="col-lg-12 col-sm-12 mb-2">
                                <label className="form-label">
                                    Description<span className='text-danger'>*</span>
                                </label>

                                <InputTextarea className='w-100' rows={5} cols={5} onChange={handleInput} name='description' />
                            </div>
                            <div className="col-lg-6 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">PDF File<span className='text-danger'>*</span>

                                </label>
                                <InputText type='file' className='border-0 w-100' onChange={fileHandler} name='file' />
                                <small><span className='text-danger'>*PDF File Only</span></small>
                            </div>
                            <div className="mt-4">
                                <Button className='p-button-primary p-button-sm' disabled={btndis} label='Upload Thesis' />
                            </div>
                        </form>
                    </div>
                </div>
            </Panel>
        </div>
    )
}

export default NoAccount