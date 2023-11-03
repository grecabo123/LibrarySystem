import axios from 'axios';
import { Panel } from 'primereact/panel';
import { Skeleton } from 'primereact/skeleton';
import React, { useEffect, useState } from 'react'
import { Image } from 'primereact/image';
import swal from 'sweetalert';
import { Tooltip } from 'primereact/tooltip';
import DataTable from 'react-data-table-component';


function ProductDetails(props) {

    const [ProductDetailsInfo, setProductDetailsInfo] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const id = props.match.params.id;

        axios.get(`/api/ProductDetailsInformation/${id}`).then(res => {
            if (res.data.status === 200) {
                setProductDetailsInfo(res.data.product);
            }
            else {
                // setProductDetailsInfo()
            }
            setloading(false);
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }, [props.match.params.id]);
    

    const header_panel = <>
        
    </>;

    return (
        <div className='container'>
            <div className="row">
                <Panel header="Product Details">
                    <div className="">
                        <div className="">
                            {
                                loading ? <Skeleton className='w-100' borderRadius='20' />
                                    :
                                    <>
                                        <Image width='100%' height='500' className='text-center mb-4 rounded' src={`http://127.0.0.1:8000/${ProductDetailsInfo.image}`} tooltip='Image' alt='Photo' preview />
                                        <div className="col-lg-12 col-md-12 col-sm-12 mb-2">
                                            <p>{ProductDetailsInfo.description}</p>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 mb-2">
                                            <DataTable 
                                                title="Bid Competetor"
                                                pagination

                                            />
                                        </div>

                                    </>
                            }
                        </div>
                    </div>
                </Panel>
            </div>
        </div>
    )
}

export default ProductDetails