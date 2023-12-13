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
        title: "",
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
            keyword: Search.title,
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
                    console.log(res);
                    history.push(`/search=${newdata.search}`)
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


    return (
        <div>
            <Landing />
            <div class="container mt-5">
                <div id="content">
                    <div className="row">
                        <div className="col-lg-12 mb-2">
                            <form onSubmit={SearchItem} id='reset_form'>
                                <label htmlFor="" className="form-label text-secondary">
                                    Search Title
                                </label>
                                <div className="p-inputgroup">
                                    <InputText placeholder="Search ..." onChange={handleInput} name='title' />
                                    <Button icon="pi pi-search" className="p-button-info" />
                                </div>
                            </form>
                        </div>
                     
                    </div>
                </div>
                <div className="row justify-content-evenly mt-4">
                   
                </div >
            </div>
        </div >
    )
}

export default SearchProduct