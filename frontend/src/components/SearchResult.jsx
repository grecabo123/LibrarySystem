import axios from 'axios'
import { Badge } from 'primereact/badge'
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import swal from 'sweetalert'
import { Checkbox } from 'primereact/checkbox';
import { TabView, TabPanel } from 'primereact/tabview';
import { Skeleton } from 'primereact/skeleton'
import Landing from './Landing'
import Paginate from './Paginate'

function SearchResult() {

    const [SearchAgain, setsearchAgain] = useState([])
    const [TotalYear, setTotal] = useState([]);
    const [Results, setResults] = useState([]);
    const [loading, setloading] = useState(true);
    const [searchkey, setsearch] = useState({
        keyword: "",
        error: [],
    });
    const [visible, setVisible] = useState(false);
    const [cities, setCities] = useState([]);
    const [yearfilterdata, setyear] = useState([]);

    useEffect(() => {
        SearchAgainData();
    }, [])

    const SearchAgainData = () => {
        const id = localStorage.getItem('keyword');
        axios.post(`/api/SearchEngineResult/${id}`,).then(res => {
            if (res.data.status === 200) {
                setsearchAgain(res.data.ResultsOutput)
                setTotal(res.data.Total);
                setResults(res.data.ResultsOutput);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.error, 'error');
            }
            setloading(false)
        });
    }

    const onCityChange = (e) => {
        let selectedCities = [...cities];
        if (e.checked) {
            selectedCities.push(e.value);
        }
        else
            selectedCities.splice(selectedCities.indexOf(e.value), 1);
        setCities(selectedCities);

    }

    const FilterYear = (e) => {
        e.preventDefault();
        if (cities.length > 0) {
            const data = {
                year: cities,
                keyword: localStorage.getItem('keyword'),
            }
            axios.post(`/api/DocumentFilter`, data).then(res => {
                if (res.data.status === 200) {
                    setsearchAgain(res.data.ResultsOutput)
                }
            }).catch((error) => {
                if (error.response.status === 500) {
                    swal("Warning", error.response.statusText, 'warning');
                }
            })
        }
        else {
            SearchAgainData();
        }
    }

    const handleinput = (e) => {
        e.persist();
        setsearch({ ...searchkey, [e.target.name]: e.target.value });
    }


    const Search = (e) => {

        e.preventDefault();
        const data = {
            keyword: searchkey.keyword,
        };
        const newdata = {
            search: data.keyword,
            user_id: localStorage.getItem('auth_id'),
        }
        axios.post(`/api/SearchEngine`, newdata).then(res => {
            if (res.data.status === 200) {
                localStorage.setItem('keyword', data.keyword);
                window.location.href = `/user/search=${newdata.search}`;
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




    return (
       <>
            <Landing />
            <div className='container mt-4'>
            <form onSubmit={Search}>
                <h4 className='text-details text-secondary'><FaSearch /> Search Document </h4>
                <div className="p-inputgroup">
                    <InputText onChange={handleinput} name='keyword' placeholder="Keyword, Title" />
                    <Button icon="pi pi-search" className="p-button-info me-1" />
                </div>
            </form>
            {
                loading ? <>
                    <Skeleton className='w-100' borderRadius='20' />
                    <Skeleton className='w-100' borderRadius='20' />
                    <Skeleton className='w-100' borderRadius='20' />
                    <Skeleton className='w-100' borderRadius='20' />
                    <Skeleton className='w-100' borderRadius='20' />
                </> :
                    <>
                        <Divider>
                        </Divider>
                        <div className="container">
                            <div className="row justify-content-space">
                                <div className="col-md-2">
                                    <h5 className='text-secondary'>Results</h5>
                                    <Divider></Divider>
                                    <center><h6 className='text-secondary'>Year Published Filter</h6></center>
                                    <ul className='mt-2'>
                                        <form onSubmit={FilterYear}>
                                            {
                                                TotalYear.map((datayear, id) => {
                                                    return (
                                                        <li key={id} className='mb-3'><Checkbox key={id} inputId="cb1" value={datayear.year_published} onChange={onCityChange} checked={cities.includes(datayear.year_published)} className="me-2 p-checkbox "></Checkbox>
                                                            <label htmlFor="cb1" className="p-checkbox-label ">{datayear.year_published} - {datayear.total}</label>

                                                        </li>
                                                    )
                                                })
                                            }
                                            <Button className='p-button-sm' icon="pi pi-fw pi-search" label='Search'></Button>
                                        </form>
                                    </ul>
                                </div>
                                <div className="col-md-10">
                                    <Paginate data={SearchAgain} />
                                </div>
                            </div>
                        </div>
                    </>
            }

        </div>
       </>
    )
}

export default SearchResult