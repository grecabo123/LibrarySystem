import axios from 'axios'
import moment from 'moment'
import { Badge } from 'primereact/badge'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'

function History() {

    const [Logs, setLogs] = useState([]);
    const [loading, setloading] = useState(true)

    useEffect(() => {
        axios.get(`/api/AccountHistory`).then(res => {
            if(res.data.status === 200) {
                setLogs(res.data.data);
            }
            setloading(false);
        }).catch((error) => {
            if(error.response.status === 500) {

            }
        })
    },[])

    const StatusAcc = (Logs) => {
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
            <>
                {moment(Logs.created_at).format('MMM DD YYYY hh:mm a')}
            </>
        )
    }

    return (
        <div>
            <Card title="Account History">
                <DataTable loading={loading} paginator paginatorLeft rows={8} value={Logs}>
                    <Column field='email' header="Email"></Column>
                    <Column field='status' body={StatusAcc} header="Status"></Column>
                    <Column field='created_at' body={DateFormat} header="DateTime"></Column>
                </DataTable>
            </Card>
        </div>
    )
}

export default History