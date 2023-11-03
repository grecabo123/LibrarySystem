import { Button } from 'primereact/button'
import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

function Footer() {
    return (
        // <div class="container-fluid my-1">
            <footer class="mt-auto">
                <div class="container p-4 pb-0">
                    <section class="">
                        <p class="d-flex justify-content-center align-items-center">
                            <span class="me-3">Register for free</span>
                            <Link to="/register"> 
                            <Button className='p-button-sm p-button-text p-button-info' label='Register' />
                            </Link>
                        </p>
                    </section>
                </div>
                <div class="text-center p-3">
                    
                    <b><span className='text-light'>Powered by G.R</span></b>
                </div>
            </footer>

        // </div>
    )
}

export default Footer