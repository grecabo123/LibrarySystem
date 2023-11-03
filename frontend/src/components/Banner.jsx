import React from 'react'
import img from '../assets/icon/1.png'
import About from './About'
import {Button} from 'primereact/button'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

function Banner() {
    return (
        <>
            <section id="hero" class="d-flex align-items-center">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1"
                            data-aos="fade-up" data-aos-delay="200">
                            <h1>Better Solutions For Your Business</h1>
                            <span className='text-light mb-5'>Empower Your Bid, Elevate Your Win</span>
                            <div class="d-flex justify-content-center justify-content-lg-start">
                                <Link to="/search/product"><Button className='p-button-raised p-button-info' label='Auction Product' /></Link>
                                {/* <a href="/search/product" class="btn-get-started ">Current Auctions</a> */}
                            </div>
                        </div>
                        <div class="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-delay="200">
                            <img src={img} class="img-fluid animated" alt />
                        </div>
                    </div>
                </div>
            </section>
            <About />
        </>
    )
}

export default Banner