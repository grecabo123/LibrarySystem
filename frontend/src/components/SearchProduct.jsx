import axios from 'axios';
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Skeleton } from 'primereact/skeleton';
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import swal from 'sweetalert';
import { Badge } from 'primereact/badge'
import { Card } from 'primereact/card';
import { Image } from 'primereact/image';
import { NumericFormat } from 'react-number-format';
import { Dropdown } from 'primereact/dropdown';
import Landing from './Landing';


function SearchProduct() {


    const [Search, setSearch] = useState({
        itemname: "",
        error: [],
    });
    const [TypesProduct, setProductTypes] = useState([]);
    const [SortPrice, setPrice] = useState([])
    const [AllDataProduct, setProduct] = useState([]);
    const [loading, setloading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        axios.get(`/api/AllItems`).then(res => {
            if (res.data.status === 200) {
                setProduct(res.data.results)
            }
            else {

            }
            setloading(false);
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }, []);




    const handleInput = (e) => {
        e.persist();
        setSearch({ ...Search, [e.target.name]: e.target.value });
    }

    const SearchItem = (e) => {
        e.preventDefault();

        const data = {
            itemname: Search.itemname,
        };
        axios.post(`/api/SearchItem`, data).then(res => {
            if (res.data.status === 200) {
                setSearch(res.data.results);
                localStorage.setItem("search_item", data.itemname);
                history.push(`/search/results=${data.itemname}`);
                document.getElementById('reset_form').reset();
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, 'error');

            }
            else {
                setSearch({ ...Search, error: res.data.error });

            }
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
                setSearch("");
            }
        });
    }

    const Types = [
        {label: "All", value: "all"},
        {label: 'Copras', value: "Copras"},
        {label: "Whole Nut", value: "Whole Nut"},
    ];

    const sort_price = [
        {label: "Ascending", value: "ASC"},
        {label: "Descending", value: "DESC"},
    ];


    return (
        <div>
            <Landing />
            <div class="container mt-5">
                <div id="content">
                    <div className="row">
                        <div className="col-lg-8 mb-2">
                            <form onSubmit={SearchItem} id='reset_form'>
                                <div className="p-inputgroup">
                                    <InputText placeholder="Search Item" onChange={handleInput} name='itemname' />
                                    <Button icon="pi pi-search" className="p-button-info" />
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-2 mb-2">
                            <Dropdown className='w-100' placeholder='Type of Product' value={TypesProduct} options={Types} onChange={(e) => setProductTypes(e.target.value)}  />
                        </div>
                        <div className="col-lg-2 mb-2">
                            <Dropdown className='w-100' placeholder='Sort Price' value={SortPrice} options={sort_price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="row justify-content-evenly mt-4">
                    {
                        loading ? <Skeleton /> :
                            AllDataProduct.map((data, idx) => {

                                const productimg = <Image src={`http://127.0.0.1:8000/${data.image}`}  className="clippath" alt="Image" width='200' height='200' />
                                const price_format = <p><NumericFormat value={data.price} thousandSeparator="," /></p>
                                return (
                                    <>
                                        <div div className="col-lg-3 col-md-4 col-sm-12 mb-4" key={idx}>
                                            <Card header={productimg} subTitle={<><span><NumericFormat value={data.price} className='bg-transparent border-0' thousandSeparator="," prefix='₱' readOnly disabled  /></span></>} >
                                                <h5>{data.name}</h5>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <Link to={`/details/product/refid=${data.uniq_key}`}><Button className='p-button-danger p-button-sm p-button-outlined p-button-raised'>Bid item</Button></Link>
                                                    <span>Total Bids: <small>31</small></span>
                                                </div>
                                            </Card>
                                            {/* <div class="card" style={{ border: "none" }}>
                                                <div class="card-body">
                                                    <h5 class="card-title ">{data.name} - <Badge value={"New"} severity={'info'} /> </h5>
                                                   
                                                </div>
                                            </div> */}
                                        </div>
                                    </>
                                )
                            })
                    }
                </div >
            </div>
        </div >
    )
}

export default SearchProduct