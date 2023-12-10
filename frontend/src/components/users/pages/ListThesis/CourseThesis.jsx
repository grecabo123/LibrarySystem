import axios from 'axios'
import moment from 'moment'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Skeleton } from 'primereact/skeleton'
import React, { useEffect } from 'react'
import { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import swal from 'sweetalert'
import { FcFolder, FcOpenedFolder } from "react-icons/fc";

function CourseThesis(props) {

    const [loading, setloading] = useState(true);
    const [Document, setDocument] = useState([])
    useEffect(() => {
        axios.get(`/api/CourseThesis/${props.match.params.id}`).then(res => {
            if(res.data.status === 200) {
                setDocument(res.data.data);
            }
            else{

            }
            setloading(false)
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
            }
        })
    },[])

    const column = [
        {
            name: <span> Courses </span>,
            selector: row => <><Link to={`/user/list/thesis=${row.id}`}><FcOpenedFolder size={20} className='me-2' />{row.CourseName}</Link></>,
            sortable: true,
        },
        {
            name: "Total Thesis ",
            selector: row => row.total,
            sortable: true,
        },
        // {
        //     name: "Actions",
        //     selector: row => <Button className='p-button-sm p-button-info' label='Open' />,
        //     sortable: true,
        // },
        // {
        //     name: "Created",
        //     selector: row => moment(row.created_at).format("MMM DD YYYY"),
        // }
    ]

    return (
        <div className='container-fluid'>
            <Card>
                <DataTable 
                    title="List of Thesis By Program"
                    selectableRows
                    pagination
                    columns={column}
                    data={Document}
                    progressPending={loading}
                    progressComponent={<Skeleton className='w-100' borderRadius='50' />}
                    subHeader
                    subHeaderAlign='right'
                    subHeaderComponent={<Link to="/user/list"><Button className='p-button-sm p-button-info' label='Back' /></Link>}
                />
            </Card>
        </div>
    )
}

export default CourseThesis