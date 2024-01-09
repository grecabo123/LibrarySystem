import axios from 'axios';
import moment from 'moment';
import { Badge } from 'primereact/badge';
import { Divider } from 'primereact/divider';
import { Menubar } from 'primereact/menubar';
import { Panel } from 'primereact/panel'
import React, { useEffect, useRef, useState } from 'react'
import { FaFilePdf } from 'react-icons/fa';
import swal from 'sweetalert';
import ReactReadMoreReadLess from 'react-read-more-read-less'
import { useHistory } from 'react-router-dom';
// import VisitsChart from './VisitChart';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import Landing from './Landing';
import PDFViewer from 'mgr-pdf-viewer-react'
import pdf2base64 from 'pdf-to-base64';
import { Skeleton } from 'primereact/skeleton';
import filepdf from '../../public/Files/Eye Contact Radiation.pdf'
import CustomNavigation, { CustomPrevButton, CustomPages, CustomNextButton } from '../Navigation';


function OpenDocument(props) {

    const keyword = localStorage.getItem("keyword")
    const [visits, setvisits] = useState([]);
    const history = useHistory();
    const [ResearchData, setResearch] = useState({
        details: "",
        authors: "",
        course: "",
        numbervisits: "",
    });
    const toast = useRef();
    const [isContextMenuDisabled, setContextMenuDisabled] = useState(false);

    // var nf = new Intl.NumberFormat();

    const [loading, setloading] = useState(true);

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        fetch('https://api.ipify.org?format=jsonp?callback=?', {
            method: "GET",
            headers: {},
        }).then(res => {
            if (res.status === 200) {
                return res.text();
            }
        }).then(ip => {

            const data = {
                ipaddress: ip,
                user_fk: localStorage.getItem('auth_id'),
                access: props.match.params.id.replace("=", "")
            }
            axios.post(`/api/IpAddressAccess`, data).then(res => {
                if (res.data.status === 200) {
                    setvisits(res.data.count)
                }
            }).catch((error) => {
                if (error.response.status === 500) {
                    swal("Warning", error.response.statusText, 'warning');
                }
            })
        })

    }


    useEffect(() => {

        const id = props.match.params.id;
        const tmpid = id.replace("=", "");

        const data = {
            document_code: tmpid,
            user_fk: localStorage.getItem("auth_id"),
        }
        axios.post(`/api/DocumentData`, data).then(res => {
            if (res.data.status === 200) {
                setResearch({
                    details: res.data.data,
                    authors: res.data.author,
                    course: res.data.course,
                    numbervisits: res.data.visits,
                });
            }
            setloading(false)
        }).catch((error) => {
            if (error.response.status === 500) {
                // history.push('/user/search')
            }
        })
    }, [])

    const handleContextMenu = (e) => {
        if (isContextMenuDisabled) {
            e.preventDefault();
        }
    };

    const handleLoadSuccess = ({ numPages }) => {
        console.log(`Document loaded with ${numPages} pages`);
    };

    const handleError = (error) => {
        console.error('Error loading PDF:', error);
    };

    if (loading) {
        return (
            <h4></h4>
        )
    }

    const AddArchive = (e) => {

        localStorage.setItem('document_id', e.target.value);

        confirmDialog({
            message: 'Are you sure you want to save this title ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => acceptFunc(),
            reject: () => rejectFunc()
        });
    }

    const acceptFunc = () => {
        const id = localStorage.getItem('document_id');

        const data = {
            document_id: id,
            user_fk: localStorage.getItem('user_id'),
        };

        axios.post(`/api/AddArchives`, data).then(res => {
            if (res.data.status === 200) {

            }
        }).catch((error) => {
            if (error.response.status === 500) {

            }
        })
    }

    const rejectFunc = () => {
        localStorage.removeItem('document_id');
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }



    const item = [
        {
            label: "Return Page",
            url: `/search=${localStorage.getItem('keyword')}`
        },

    ]

    const header = <Menubar model={item} />

    console.log(filepdf);

    return (
        <div>
            <Landing />
            <Toast ref={toast} />
            <ConfirmDialog draggable={false} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }} accept={acceptFunc} className='p-confirm-dialog' />
            <Panel headerTemplate={header}>
                <Divider align='left'>
                    <Badge value={"Research Title Details"} severity="info"></Badge>
                </Divider>
                <div className='mb-3'>
                    <ul>
                        <li className='text-color-code mb-3'><span><b>Title</b>:  <span className="text-details">{ResearchData.details.title}</span>

                        </span></li>
                        <li className='text-color-code mb-3'><span><b>Keywords</b>:  <span className="text-details">{ResearchData.details.keywords}</span></span></li>
                        <li className='text-color-code mb-3'><span><b>Abstract</b>:  <p className='text-details'><ReactReadMoreReadLess
                            charLimit={200} readMoreText={"Read more ▼"}
                            readLessText={"Read less ▲"}
                        >
                            {ResearchData.details.description}


                        </ReactReadMoreReadLess></p></span></li>
                        <div className='w-100'>
                            <PDFViewer
                                document={{
                                    url: filepdf,
                                    base64: pdf2base64(filepdf)
                                }}
                                withCredentials={false}
                                loader={true}
                                // page={18}
                            />
                        </div>
                    </ul>
                </div>
                <Divider align='left'>
                    <Badge value={"Other Info"} severity="info"></Badge>
                </Divider>
                <div className="container">
                    <div className="row justify-content-space align-items-start">
                        <div className="col-lg-6">
                            <ul>
                                {/* <li className='text-color-code mb-3'><span><b>Publication</b>:  <span className="text-details">{ResearchData.details.publication}</span></span></li> */}
                                {/* <li className='text-color-code mb-3'><span><b>Optional Email</b>:  <span className="text-details">{ResearchData.optional_email}</span></span></li> */}
                                <li className='text-color-code mb-3'><span><b>Department</b>:  <span className="text-details">{ResearchData.course.department}</span></span></li>
                                <li className='text-color-code mb-3'><span><b>Course</b>:  <span className="text-details">{ResearchData.course.CourseName}</span></span></li>


                                <li className='text-color-code mb-3'><span><b>Cite</b>:  <span className="text-details">{
                                    ResearchData.authors.map((daauthor) => {
                                        return (
                                            <span>{daauthor.last_name + `,`} {daauthor.first_name.substring(0, 1) + `.`} {daauthor.middle_name.substring(0, 1) + `.`}  </span>
                                        )
                                    })

                                }</span>({ResearchData.details.Year_Published}). {ResearchData.details.title}</span></li>


                                <li className='text-color-code mb-3'><span><b>Published</b>:  <span className='text-info'>{moment(ResearchData.details.created_at).format("MMM DD YYYY")}</span></span></li>
                            </ul>
                        </div>
                        <div className="col-lg-6">
                            {/* <h6 className='text-secondary'><b>Times you visited</b>: {ResearchData.numbervisits}</h6> */}
                            {/* <VisitsChart uniq={props.match.params.id} /> */}
                        </div>
                    </div>
                </div>
            </Panel>
        </div>
    )
}

export default OpenDocument