import { Button } from 'primereact/button'
import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

function Footer() {
    return (
        // <div class="container-fluid my-1">
        <footer class="mt-auto">
            <div class="container p-4 pb-0">
                <section class="">
                    <p class="d-flex flex-column justify-content-center align-items-center">
                        <span class="me-3">Copyright 2023 <br />
                            {/* <b>Powered by:</b> */}
                         </span>
                        
                    </p>
                </section>
            </div>
        </footer>

        // </div>
    )
}

export default Footer