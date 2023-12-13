import React, { useEffect } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import img1 from '../assets/icon/iocn.png'
import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import { Menubar } from 'primereact/menubar';
import { PrimeIcons } from 'primereact/api';

function Landing() {



    const items = [
        {
            label: <><span>Search Titles</span></>,
            icon: PrimeIcons.BOOK,
            url: "/search/thesis",
        },
        
    ];



    return (
        <>

            <Menubar model={items}  className='w-100' start={<a href='/'><img src={img1} width={50}></img></a>} end={<>
                <div className="d-flex justify-content-end">
                    <div className="p-ripple">
                        <Ripple />
                    </div>
                    <Link to="/register"><Button className='p-button-sm me-2 p-button-text fw-bold' label='Register' /></Link>
                    <Link to="/login">
                        <Button className='p-button-sm p-button-text fw-bold' label='Login' />
                    </Link>
                </div>
            </>} />
      
        </>
    )
}

export default Landing