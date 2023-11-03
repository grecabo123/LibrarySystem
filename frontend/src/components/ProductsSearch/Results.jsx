import axios from 'axios';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Paginate from './Paginate';

function Results(props) {

    const [Search, setSearch] = useState({
        itemname: "",
        error: [],
    });
    const history = useHistory();

    const handleInput = (e) => {
        e.persist();
        setSearch({ ...Search, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        const data = localStorage.getItem('search_item');
        if(data !== null){
            axios.get(`/api/SearchItemResults/${data}`).then(res => {
                if(res.data.status === 200) {
                    setSearch(res.data.results);
                }
                else{

                }
            }); 
        }
        else{
            history.push(`/search/product`)
        }
    }, []); 

    const SearchItem = (e) => {
        e.preventDefault();

        const data = {
            itemname: Search.itemname,
        };
        
        axios.post(`/api/SearchItem`, data).then(res => {
            if (res.data.status === 200) {
                setSearch(res.data.results);
                localStorage.setItem("search_item",data.itemname);
                window.location.href= `/search/results=${data.itemname}`;
                document.getElementById('reset_form').reset();
            }
            else {
                setSearch({ ...Search, error: res.data.error });

            }
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
                setSearch("");
            }
        })
    }

    return (
        <div>
            <header id="header" class=" navbar-color ">
                <div class="container d-flex align-items-center">
                    <h1 class="logo me-auto"><a href="/">Online Bidding</a></h1>
                    <nav id="navbar" class="navbar">
                        <ul>
                            <li><a class="nav-link scrollto active" href="#hero">Home</a></li>
                            <li><a class="nav-link scrollto" href="#about">About</a></li>
                            {/* <li><a class="nav-link scrollto" href="#about">Items</a></li> */}
                            <li><a class="nav-link scrollto" href="#works">How it works</a></li>
                            <li><a class="nav-link scrollto" href="#contact">Contact</a></li>
                            <li><Link class="nav-link scrollto" to="/register">Register</Link> </li>
                            <li><Link class="getstarted scrollto" to={'/login'}>Login</Link></li>
                        </ul>
                        <i class="bi bi-list mobile-nav-toggle"></i>
                    </nav>
                </div>
            </header>

            <div class="container">
                <div id="content">
                    <form onSubmit={SearchItem} id='reset_form'>
                        <div className="p-inputgroup">
                            <InputText placeholder="Search Item" onChange={handleInput} name='itemname' />
                            <Button icon="pi pi-search" className="p-button-info" />
                        </div>
                            {/* <span className='text-danger'>{Search.error.itemname}</span> */}
                    </form>
                </div>
            </div>

            <Divider/>
            <div className="container">
                <Paginate data={Search} />
            </div>


        </div>
    )
}

export default Results