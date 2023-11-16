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

function ListDocument() {

    const [loading, setloading] = useState(true);
    const [Document, setDocument] = useState([])
    useEffect(() => {
        axios.get(`/api/ThesisData`).then(res => {
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
            name: "Title",
            selector: row => row.title,
            sortable: true,
        },
        {
            name: "Keywords",
            selector: row => row.keywords,
            sortable: true,
        },
        {
            name: "Year Published",
            selector: row => row.year_published,
            sortable: true,
        },
        {
            name: "Created",
            selector: row => moment(row.created_at).format("MMM DD YYYY"),
        }
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
                    subHeaderComponent={<Link to="/admin/upload"><Button className='p-button-sm p-button-info' label='Upload Thesis' /></Link>}
                />
            </Card>
        </div>
    )
}

export default ListDocument