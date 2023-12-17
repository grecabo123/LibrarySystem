import axios from 'axios';
import { Panel } from 'primereact/panel';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import { Ripple } from 'primereact/ripple';
import { Skeleton } from 'primereact/skeleton';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Badge } from 'primereact/badge';
import ReactReadMoreReadLess from 'react-read-more-read-less'
import moment from 'moment';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';



function CourseListThesis(props) {

    const [loading, setLoading] = useState(true)
    const [ThesisData, setThesisData] = useState([])

    useEffect(() => {
        axios.get(`/api/CourseThesisData/${props.match.params.id}`).then(res => {
            if (res.data.status === 200) {
                setThesisData(res.data.data);
            }
            setLoading(false);
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }, []);

    const handleContextMenu = (event) => {
        event.preventDefault();
    };

    const template = (options) => {
        const toggleIcon = options.collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up';
        const className = `${options.className} justify-content-start`;
        const titleClassName = `${options.titleClassName} ml-2 text-primary`;
        const style = { fontSize: '1.25rem' };

        return (
            <div className={className}>
                <button className={options.togglerClassName} onClick={options.onTogglerClick}>
                    <span className={toggleIcon}></span>
                    <Ripple />

                </button>
                <span className={titleClassName} style={style}>Header</span>
            </div>
        );
    };


    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-lg-12">
                    {
                        loading ? <Skeleton />
                            :
                            <>
                                <div className="mb-2 d-flex justify-content-between align-items-center">
                                    <h5 className='p-tag'> {ThesisData[0].CourseName}</h5>
                                    <Link to={`/admin/list/course=${ThesisData[0].id}`}><Button className='p-button-sm p-button-info' label='Back' /></Link>
                                </div>
                                {
                                    ThesisData.map((data, idx) => {
                                        return (
                                            // <Card>
                                            <Accordion>
                                                <AccordionTab header={data.title}>
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-lg-12 col-md-12 mb-2">
                                                                <Badge value={"Research Title Details"} severity="info"></Badge>
                                                                <div className="mb-3">
                                                                    {/* <ul className='mt-2' onContextMenu={handleContextMenu}> */}
                                                                    <ul className='mt-2'>
                                                                        <embed
                                                                            // src={`http://127.0.0.1:8000/${data.file}#toolbar=0&view=FitH`}
                                                                            src={`http://127.0.0.1:8000/${data.file}`}
                                                                            style={{ userSelect: 'none !important;' }}
                                                                            id='norightclick'
                                                                            type='application/pdf'
                                                                            height='700'
                                                                            width='100%'
                                                                            controlsList="nodownload"
                                                                        // onContextMenu={handleContextMenu}
                                                                        />
                                                                    </ul>
                                                                    <ul className='mt-3'>

                                                                        <li className='text-color-code mb-3'><span><b>Title</b>:  <a href={`http://127.0.0.1:8000/${data.file}`} target='_blank'><span className="text-details">{data.title}</span></a><ul className='mt-2'></ul></span></li>
                                                                        <li className='text-color-code mb-3'><span><b>Keywords</b>:  <span className="text-details">{data.keywords}</span></span></li>
                                                                        <li className='text-color-code mb-3'><span><b>PDF</b>:   </span></li>
                                                                        <li className='text-color-code mb-3'><span><b>Abstract</b>:  <p className='text-secondary'><ReactReadMoreReadLess
                                                                            charLimit={200} readMoreText={"Read more ▼"}
                                                                            readLessText={"Read less ▲"}
                                                                        >
                                                                            {data.description}


                                                                        </ReactReadMoreReadLess></p></span></li>

                                                                        <li className='text-color-code mb-3'><span><b>Published</b>:  <span className='text-info'>{moment(data.created_at).format("MMM DD YYYY")}</span></span></li>

                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </AccordionTab>
                                            </Accordion>
                                            // </Card> 
                                        )
                                    })
                                }
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default CourseListThesis