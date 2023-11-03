import axios from 'axios';
import moment from 'moment';
import { Button } from 'primereact/button'
import { Panel } from 'primereact/panel'
import { Skeleton } from 'primereact/skeleton';
import React, { useEffect, useRef, useState } from 'react'
import DataTable, {createTheme} from 'react-data-table-component'
import swal from 'sweetalert';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';
import { NumericFormat } from 'react-number-format';


function CreatePrice() {


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

    const [loading, setloading] = useState(true);
    const [PriceData, setPrice] = useState([]);
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState(); ``
    const [productvalue, setProductType] = useState([]);
    const [PriceUpdate, setPriceData] = useState({
        name: "",
        price: "",
        error: [],
    });
    const toast = useRef();

    useEffect(() => {
        UpdatePrice();
    }, []);


    const UpdatePrice = () => {
        axios.get(`/api/UpdatePrice`).then(res => {
            if (res.data.status === 200) {
                setPrice(res.data.results);
            }
            setloading(false);
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        });

    }

    const column = [
        {
            name: "Name Tag",
            selector: row => row.name_tag,
        },
        {
            name: "Price",
            selector: row => <>
                <NumericFormat className='border-0 bg-transparent' disabled value={row.current_price} prefix='₱' thousandSeparator="," />
            </>
        },
        {
            name: "Created",
            selector: row => moment(row.created_at).format('MMM D YYYY h:mm a'),
        }
    ];

    const onHide = () => {
        setVisible(false);
    }


    const handleInput = (e) => {
        setPriceData({ ...PriceUpdate, [e.target.name]: e.target.value })
    }

    const list_drop = [
        {
            label: "Copras", value: "Copras",
        },
        {
            label: "Whole Nut", value: "Whole Nut",
        },
    ];


    const PriceDataUpdate = (e) => {
        e.preventDefault();

        const data = {
            name: productvalue,
            price: value,
        };



        axios.post(`/api/PostUpdatedPrice`, data).then(res => {
            if (res.data.status === 200) {
                setVisible(false);
                setProductType("");
                setValue("");
                // document.getElementById('form_price').reset();
                UpdatePrice();
                toast.current.show({ severity: 'success', summary: 'Price has been updated', detail: 'Updated' });
            }
            else {
                setPriceData({...PriceDataUpdate, error: res.data.error});
            }
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }

    const header = <>
        <div className="d-flex justify-content-end align-items-center mb-3">
            <Button onClick={(e) => setVisible(true)} className='p-button-sm p-button-info' icon="pi pi-plus" label='Update Price' />
        </div>
    </>


    return (
        <div className='container p-2'>
            <Toast ref={toast} />
            <Panel headerTemplate={header}>
                <DataTable
                    title="Pricing Data"
                    columns={column}
                    data={PriceData}
                    progressPending={loading}
                    selectableRows
                    pagination
                    progressComponent={
                        <Skeleton className='w-100' borderRadius='20px' />
                    }
                    theme='solarized'
                />
            </Panel>


            <Dialog header="Price Update" draggable={false} position='top' visible={visible} onHide={onHide} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }}>
                <form onSubmit={PriceDataUpdate} id='form_price' >
                    <div className="container">
                        <div className="row">
                            <div className="mb-2">
                                <label htmlFor="" className="form-label">
                                    Product Type
                                </label>
                                <Dropdown value={productvalue} onChange={(e) => setProductType(e.target.value)} options={list_drop} className='w-100' name='product' placeholder='Select Type' />
                                <span className='text-danger'>{PriceUpdate.error.name}</span>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="" className="form-label">
                                    Price Product
                                </label>
                                <InputNumber className='w-100' value={value} onChange={(e) => setValue(e.value)} mode="decimal" />
                                <span className='text-danger'>{PriceUpdate.error.price}</span>
                            </div>
                        </div>
                        <Button className='w-100' label='Price Update' />
                    </div>
                </form>
            </Dialog>
        </div>
    )
}

export default CreatePrice