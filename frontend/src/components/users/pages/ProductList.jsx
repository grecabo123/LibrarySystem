import axios from 'axios'
import moment from 'moment'
import { Button } from 'primereact/button'
import { Panel } from 'primereact/panel'
import { Skeleton } from 'primereact/skeleton'
import { Tag } from 'primereact/tag'
import { Toast } from 'primereact/toast'
import React, { useEffect, useRef, useState } from 'react'
import DataTable, { createTheme } from 'react-data-table-component'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import swal from 'sweetalert'
import differenceBy from "lodash.differenceby";
import { NumericFormat } from 'react-number-format';
import { FcFolder } from 'react-icons/fc'
import { Card } from 'primereact/card'

function ProductList() {

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

    const history = useHistory();
    const [loading, setloading] = useState(true);
    const [Product, setProduct] = useState([]);
    const [filter, setfilter] = useState([]);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [toggleCleared, setToggleCleared] = React.useState(false);
    const toast = useRef();

    useEffect(() => {
        axios.get(`/api/ProductDetails`).then(res => {
            if (res.data.status === 200) {
                setfilter(res.data.product);
                setProduct(res.data.product);
            }
            else {

            }
            setloading(false);
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
                history.push(`/user/dashboard`);
            }
        })
    }, []);


    const handleRowSelected = React.useCallback((state) => {
        setSelectedRows(state.selectedRows);
    }, []);

    const contextActions = React.useMemo(() => {
        const handleDelete = () => {
            if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(row => row.name)}?`)) {
                const data = selectedRows.map((row) => row.id);
                axios.delete(`/api/RemoveProducts/${data}`).then(res => {
                    if (res.data.status === 200) {
                        toast.current.show({ severity: "success", summary: res.data.remove, detail: "Successfully Removed" });
                        setToggleCleared(!toggleCleared);
                        setfilter(differenceBy(filter, selectedRows, 'id'));
                    }
                })

            }
        };



        return (
            <>
                <Tag className='p-tag p-button-danger cursor-pointer' severity={'danger'} onClick={handleDelete}>Delete</Tag>
            </>
        );
    }, [filter, selectedRows, toggleCleared]);



    const column = [
        {
            name: "Name of Product",
            selector: row => <> <FcFolder size={20} /> {row.name}</>,
        },
        {
            name: "Product Price",
            selector: row => <span><NumericFormat prefix='₱' className='border-0 bg-transparent' disabled value={row.price} thousandSeparator="," /></span>
        },
        {
            name: "Product Address",
            selector: row => row.address,
        },
        {
            name: "Product Status",
            selector: row => row.price_status === 1 ? <Tag severity={'danger'} value="Pending" /> : <Tag severity={'info'} value="Posted" />,
        },
        {
            name: "Product Created",
            selector: row => moment(row.created_at).format('MMMM D YYYY h:m a'),
        },
        {
            name: "Actions",
            cell: row => <>
                <div className="me-2"><Link to={`/user/update/refid=${row.id}`}><Tag className='p-tag' severity={'success'}>Update</Tag></Link></div>
                {/* <div className="me-2"><Tag className='p-tag cursor-pointer' onClick={(e) => DeleteData(row.id)} severity={'danger'}>Delete</Tag></div> */}
                {/* <div className="me-2"><Link to={`/user/product/refid=${row.id}`}><Tag className='p-tag' severity={'info'}>Details</Tag></Link></div> */}
            </>,
        },
    ];



    return (
        <>
            <Toast ref={toast} />
            <div className="container-fluid p-3">
                <div className="row">
                    <Panel header="List Items">
                        <Card>
                            <div className="d-flex justify-content-end mb-3">
                                {/* <span className='mt-auto mb-auto fw-bold'>Product Details</span> */}
                                <Link to="/user/add"><Button icon="pi pi-plus" className='p-button-sm p-button-info' label='Register Product' /></Link>
                            </div>
                            <DataTable
                                className='mt-3'
                                title="Bid Items"
                                columns={column}
                                data={filter}
                                selectableRows
                                contextActions={contextActions}
                                onSelectedRowsChange={handleRowSelected}
                                clearSelectedRows={toggleCleared}
                                pagination
                                // highlightOnHover
                                progressPending={loading}
                                progressComponent={
                                    <>
                                        <Skeleton className='w-100' borderRadius='20px' />
                                    </>
                                }
                                theme='solarized'
                            />
                        </Card>
                    </Panel>
                </div>
            </div>
        </>
    )
}

export default ProductList