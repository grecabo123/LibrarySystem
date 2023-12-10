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
import { FcFolder } from "react-icons/fc";

function ListThesis() {

    const [loading, setloading] = useState(true);
    const [Document, setDocument] = useState([])
    useEffect(() => {
        axios.get(`/api/ThesisData`).then(res => {
            if (res.data.status === 200) {
                setDocument(res.data.data);
            }
            else {

            }
            setloading(false)
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }, [])

    const column = [
        {
            name: <span> Department </span>,
            selector: row => <><Link to={`/user/list/course=${row.id}`}><FcFolder size={20} className='me-2' />{row.department}</Link></>,
            sortable: true,
        },
        {
            name: "Number of Thesis",
            selector: row => row.total,
            sortable: true,
        },
    ]

    return (
        <div className='container-fluid'>
            <Card>
                <DataTable
                    title="List of Thesis"
                    selectableRows
                    pagination
                    columns={column}
                    data={Document}
                    progressPending={loading}
                    progressComponent={<Skeleton className='w-100' borderRadius='50' />}
                    subHeader
                    subHeaderAlign='right'
                    // subHeaderComponent={<Link to="/admin/upload"><Button className='p-button-sm p-button-info' label='Upload Thesis' /></Link>}
                />
    
               


            </Card>
        </div>
    )
}

export default ListThesis