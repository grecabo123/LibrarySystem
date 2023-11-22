import axios from 'axios'
import { Badge } from 'primereact/badge'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { Panel } from 'primereact/panel'
import { Skeleton } from 'primereact/skeleton'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { FaArrowDown, FaArrowUp, FaSearch } from 'react-icons/fa'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import swal from 'sweetalert'

function Dashboard() {

    const [AnnoucementData,setAnnoucementData] = useState([]);
    const [loading, setloading] = useState(true);
    const [searchkey, setsearch] = useState({
        keyword: "",
        error: [],
    });
    const history = useHistory();

    useEffect(() => {
       axios.get(`/api/AnnoucmentData`).then(res => {
            if(res.data.status === 200) {
                setAnnoucementData(res.data.data);
            }
            setloading(false)
       }).catch((error) => {
            if(error.response.status === 500) {

            }
       })
    }, [])

    const handleinput = (e) => {
        e.persist();
        setsearch({ ...searchkey, [e.target.name]: e.target.value });
    }

    const Search = (e) => {

        e.preventDefault();
        const data = {
            keyword: searchkey.keyword,
        };
        localStorage.setItem('keyword', data.keyword);

        if (data.keyword === "") {

        }
        else {
            const newdata = {
                search: localStorage.getItem('keyword'),
                user_id: localStorage.getItem('auth_id'),
            }
            axios.post(`/api/SearchEngine`, newdata).then(res => {
                if (res.data.status === 200) {
                    history.push(`/user/search=${newdata.search}`)
                }
                else if (res.data.status === 404) {
                    swal("Error", res.data.error, 'error');
                }
            }).catch((error) => {
                if (error.response.status === 500) {
                    swal("Warning", error.response.statusText, 'warning');
                }
            })
        }
    }

    const column = [
        {
            name: "Date",
            selector: row => row.date_annoucment,
        },
        {
            name: "Event",
            selector: row => row.description,
        },
    ]



    return (
        <>
            {
                loading ? <Skeleton className='w-100' />
                    :
                    <div className='container-fluid'>
                        <form onSubmit={Search}>
                            <h4 className='text-details text-secondary'><FaSearch /> Search Document </h4>
                            <div className="p-inputgroup">
                                <InputText onChange={handleinput} name='keyword' placeholder="Keyword, Title" />
                                <Button icon="pi pi-search" className="p-button-info me-1" />
                            </div>
                        </form>
                        <div className="mt-4">
                            <Panel header="Announcement">
                                <DataTable 
                                    title=""
                                    data={AnnoucementData}
                                    columns={column}
                                    pagination
                                    selectableRows
                                />
                            </Panel>
                        </div>
                    </div>
            }
        </>
    )
}

export default Dashboard