import axios from 'axios';
import moment from 'moment';
import { Badge } from 'primereact/badge';
import { Card } from 'primereact/card';
import { Skeleton } from 'primereact/skeleton';
import React, { useEffect, useState } from 'react'
import DataTable, { createTheme } from 'react-data-table-component';
import swal from 'sweetalert';

function ReportIssue() {

    createTheme('solarized', {
        text: {
            primary: '#bfc5c7',
            secondary: '#2aa198',
        },
        background: {
            default: 'transparent',
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#bfc5c7',
        },
        action: {
            button: 'rgba(0,0,0,.54)',
            hover: 'rgba(0,0,0,.08)',
            disabled: 'rgba(0,0,0,.12)',
        },
    }, 'dark');

    const [ReportData, setReport] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`/api/ReportIssue`).then(res => {
            if (res.data.status === 200) {
                setReport(res.data.data);
            }
            else {

            }
            setLoading(false);
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }, []);

    const column = [
        {
            name: "From",
            selector: row => row.email,
            sortable: true,
        },
        {
            name: "Subject",
            selector: row => row.subejct,
            sortable: true,
        },
        {
            name: "Message",
            selector: row => row.message,
            sortable: true,
        },
        {
            name: "DateTime",
            selector: row => moment(row.created_at).format('MMMM DD YYYY hh:mm a'),
        },
        {
            name: "Action",
            cell: row => <>
                <Badge value={'Open'} severity={'info'} />
            </>
        }
    ]

    return (
        <div className='container p-3'>
            <Card>
                <DataTable
                    title="Report Issue"
                    data={ReportData}
                    columns={column}
                    progressPending={loading}
                    progressComponent={
                        <>
                            <div className="container">
                                <Skeleton className='w-100' borderRadius='20px' />
                            </div>
                        </>
                    }
                    theme='solarized'
                />
            </Card>
        </div>
    )
}

export default ReportIssue