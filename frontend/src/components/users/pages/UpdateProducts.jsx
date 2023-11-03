import { Panel } from 'primereact/panel'
import React, { useEffect, useRef, useState } from 'react'
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import swal from 'sweetalert';
import { Skeleton } from 'primereact/skeleton';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';

function UpdateProducts(props) {


    const [ProductData, setProduct] = useState([]);
    const [loading, setloading] = useState(true);
    const toast = useRef();

    useEffect(() => {
        axios.get(`/api/ProductInformation/${props.match.params.id}`).then(res => {
            if (res.data.status === 200) {
                setProduct(res.data.product);
            }
            setloading(false)
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }, [props.match.params.id]);

    const handleInput = (e) => {
        e.persist();
        setProduct({ ...ProductData, [e.target.name]: e.target.value });
    }



    const AddProductData = () => {
        e.preventDefault();

        const data = ProductData;
        const id = props.match.params.id;
        axios.put(`/api/UpdateProductData/${id}`, data).then(res => {
            if (res.data.status === 200) {
                toast.current.show({severity: 'success', summary: res.data.update, detail: 'Product Update'});
            }
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }

    return (
        <div className='container-fluid p-3'>
            <Toast ref={toast} />
            <div className="row">
                <div className="col-lg-12">
                    <Panel header="Product Details">
                        <div className="mt-3">
                            {
                                loading ? <Skeleton className='w-100' borderRadius='20px' />
                                    :
                                    <form onSubmit={AddProductData} id='reset_form'>
                                        <div className="row">
                                            <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                                                <label htmlFor="Product" className="form-label">
                                                    Product Name
                                                </label>
                                                <InputText className='w-100' value={ProductData.name} name='name' onChange={handleInput} />
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                                                <label htmlFor="Product" className="form-label">
                                                    Product Name
                                                </label>
                                                <InputText className='w-100' value={ProductData.name} name='name' onChange={handleInput} />
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                                                <label htmlFor="Product" className="form-label">
                                                    Product Name
                                                </label>
                                                <InputText className='w-100' value={ProductData.name} name='name' onChange={handleInput} />
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                                                <label htmlFor="Product" className="form-label">
                                                    Barangay
                                                </label>
                                                <Dropdown className='w-100'  placeholder='Choose Barangay' />
                                            </div>
                                        </div>
                                    </form>
                            }
                        </div>
                    </Panel>
                </div>
            </div>
        </div>
    )
}

export default UpdateProducts