import React from 'react'
import img from '../assets/icon/2.png'
import { Button } from 'primereact/button'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

function Banner() {
    return (
        <>
            <section id="hero" class="d-flex align-items-center">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1"
                            data-aos="fade-up" data-aos-delay="200">
                            <h1>Northwestern Mindanao State College
                                of Science and Technology
                            </h1>
                            <span className='text-light mb-5'>"Your Partner in Academic Excellence"</span>
                            <div class="d-flex justify-content-center justify-content-lg-start">
                            </div>
                        </div>
                        <div class="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-delay="200">
                            <img src={img} class="img-fluid animated" width={600} height={200} alt />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Banner