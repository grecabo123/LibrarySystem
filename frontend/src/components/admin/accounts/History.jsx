import axios from 'axios';
import moment from 'moment';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Skeleton } from 'primereact/skeleton';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';

function History() {

    const [Logs, setLogs] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        axios.get(`/api/AccountHistory`).then(res => {
            if (res.data.status === 200) {
                setLogs(res.data.data)
            }
            setloading(false);
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }, []);

    const StatusIndicator = (Logs) => {
        return (
            <>
                {
                    Logs.status === 1 ? <Badge severity={'success'} value={'Logged In'} /> : <Badge severity={'danger'} value={'Logout'} />
                }
            </>
        )
    }

    const DateFormat = (Logs) => {
        return (
            <span>{moment(Logs.created_at).format('MMM DD YYYY hh:mm a')}</span>
        )
    }
    
    return (
        <div>
            <Card>
                <DataTable value={Logs}  loading={loading} paginator rows={10} paginatorLeft>
                    <Column field='email' sortable header="Student Email"></Column>
                    <Column field='status' body={StatusIndicator} sortable header="Student Status"></Column>
                    <Column field='created_at' body={DateFormat} sortable header="DateTime"></Column>
                </DataTable>
            </Card>
        </div>
    )
}

export default History