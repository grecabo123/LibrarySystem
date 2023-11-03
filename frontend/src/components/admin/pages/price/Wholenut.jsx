import { Button } from 'primereact/button';
import { Card } from 'primereact/card'
import React, { useEffect, useRef, useState } from 'react'
import DataTable, { createTheme } from 'react-data-table-component'
import { PrimeIcons } from 'primereact/api';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Skeleton } from 'primereact/skeleton';
import moment from 'moment';
import { NumericFormat } from 'react-number-format';
import swal from 'sweetalert';
import { InputText } from 'primereact/inputtext';


function Wholenut() {

    const [visible, setVisible] = useState(false);
    const toast = useRef(null);
    const [data, setData] = useState([])
    const [loading, setloading] = useState(true);
    const [current_price_data, setCurrent_data] = useState([]);
    const [newPrice, setNewPrice] = useState([])
    const [current_price, setCurrent] = useState({

        error: [],
    });

    useEffect(() => {
        CoprasPrice();
    }, []);

    const CoprasPrice = () => {
        const id = 2;
        axios.get(`/api/CoprasPriceData/${id}`).then(res => {
            if (res.data.status === 200) {
                setData(res.data.data);
            }
            setloading(false);
        }).catch((error) => {
            if (error.response.status === 500) {

            }
        })
    }

    const handleInput = (e) => {
        // e.persist();
        setCurrent({ ...current_price, [e.target.name]: e.target.value });
    }

    const Update_Copras_Price = (e) => {
        e.preventDefault();
        const data_ = {
            id: localStorage.getItem('auth_id'),
            current: data.length === 0 ? 0 : data[0].new_price,
            new_price: newPrice,
            name: 2,
        };
        // console.log(data_);
        axios.post(`/api/UpdatePrice`, data_).then(res => {
            if (res.data.status === 200) {
                toast.current.show({ severity: "success", summary: res.data.message, detail: "Successfully Updated" });
                setVisible(false);
                CoprasPrice();
                setNewPrice("")
                setCurrent_data("")
            }
            else {
                setCurrent({ ...current_price, error: res.data.error })
            }
        }).catch((error) => {
            if (error.response.status === 500) {

            }
        })
    }

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

    const onHide = () => {
        setVisible(false)
    }

    const RemoveData = (e) => {

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`/api/removeprice/${e.target.value}`).then(res => {
                        if (res.data.status === 200) {
                            toast.current.show({severity: "success", summary: "Price", detail: "Deleted Data"})
                            CoprasPrice();
                        }
                    }).catch((error) => {
                        if (error.response.status === 500) {
                            swal("Warning", error.response.statusText, 'warning');
                        }
                    })
                }

            });
    }

    const column = [
        {
            name: "Product",
            selector: row => row.name_tag_int === 1 ? "Copras" : "Whole Nut",
        },
        {
            name: "Previous Price",
            selector: row => <NumericFormat value={row.current_price} prefix='₱' thousandSeparator="," decimalSeparator='.' className='border-0 bg-transparent' disabled readOnly />,
        },
        {
            name: "New Price",
            selector: row => <NumericFormat value={row.new_price} prefix='₱' thousandSeparator="," decimalSeparator='.' className='border-0 bg-transparent' disabled readOnly />,

            // selector: row => row.new_price,
        },
        {
            name: "DateTime",
            selector: row => moment(row.created_at).format('MMM DD YYYY'),
        },
        {
            name: "Actions",
            cell: row => <div>
                {/* <Button className='p-button-sm p-button-success me-2 mb-1' icon={PrimeIcons.PENCIL} label='Edit' /> */}
                <Button className='p-button-sm p-button-danger mb-1' value={row.id} onClick={RemoveData} icon={PrimeIcons.TRASH} label='Delete' />
            </div>
            // selector: row => moment(row.created_at).format('MMM DD YYYY'),
        },
    ]

    return (
        <>
            <Toast ref={toast} />
            <div className="container-fluid py-2">

                {
                    loading ? <Skeleton className='w-100' borderRadius='20' />
                        :
                        <Card>
                            <div className="d-flex justify-content-end">
                                <Button className='p-button-info p-button-sm' onClick={(e) => setVisible(true)} icon={PrimeIcons.PLUS} label='Update Price' />
                            </div>
                            <DataTable
                                title="Whole Nut Price"
                                theme='solarized'
                                columns={column}
                                data={data}
                                pagination
                                selectableRows
                            />
                        </Card>
                }

            </div>

            <Dialog header="Copras Update Price" visible={visible} position='top' draggable={false} onHide={onHide} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }}>
                <form onSubmit={Update_Copras_Price} id='Update_Price'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Current Price
                                </label>
                                {
                                    data.length === 0 ? <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">₱</span>
                                        <InputNumber minFractionDigits={2} maxFractionDigits={2} className='w-100' name='current' value={"00.00"} disabled readOnly />
                                    </div>
                                        : <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">₱</span>
                                            <InputText value={data[0].new_price} name='previous_price'  className='w-100' disabled readOnly />
                                        </div>
                                }

                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    New Price
                                </label>
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon">₱</span>
                                    <InputNumber minFractionDigits={2} maxFractionDigits={2} value={newPrice} className='w-100' onValueChange={(e) => setNewPrice(e.value)} />
                                </div>
                                <span className='text-danger'>{current_price.error.new_price}</span>
                            </div>
                            <div className="mt-3">
                                <div className="d-flex justify-content-end">
                                    <Button className='p-button-success p-button-sm' label='Update' />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Dialog>
        </>
    )
}

export default Wholenut