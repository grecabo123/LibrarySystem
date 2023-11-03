import React from 'react'
import { Badge } from 'primereact/badge';


function About() {
    return (
        <div className='mt-5 text-center' id='about'>
            <div class="section-title mb-3">
                <h2>About Us</h2>
                <div className="container">
                    <p>Participating in auctions or competitive bidding events through digital platforms and websites. It allows individuals or businesses to place bids on items, services, or assets over the internet. Online bidding has become increasingly popular due to its convenience, accessibility, and ability to connect a wide range of participants from different locations</p>
                </div>
            </div>
            <div class="section-title mb-3" id='works'>
                <h2>Online Bidding Works</h2>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                            <p>  <Badge value={1} />  <b>Platform Selection:</b> <br /> Participants choose an online bidding platform that hosts the auction. These platforms can be specialized auction websites, online marketplaces, or dedicated bidding software.</p>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                            <p> <Badge value={2} /><b>Registration</b>: <br /> Participants typically need to create accounts and register with the bidding platform. This may involve providing personal information, agreeing to terms and conditions, and sometimes submitting verification documents. </p>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                            <p> <Badge value={3} /> <b>Browsing Listings</b>: <br /> Users browse through the listings of items or services up for auction. Each listing includes details about the item, starting bid, bidding increments, and any relevant images or descriptions. </p>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                            <p> <Badge value={4} /><b>Placing Bids</b>: <br />Users place bids on the items they are interested in. Bidding can involve manually entering bid amounts or using automated bidding tools that automatically place bids on the user's behalf up to a predefined maximum.. </p>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                            <p> <Badge value={5} /><b>Real-time Updates</b>: <br /> Online bidding platforms often provide real-time updates on the current highest bid for each item. This allows participants to monitor the progress of the auction and decide whether to increase their bids. </p>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                            <p> <Badge value={6} /><b>Bidding Strategies</b>: <br /> Participants might use different bidding strategies, such as bidding early to establish dominance, waiting until the last moment (sniping) to place a winning bid, or incremental bidding to edge out competitors. </p>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                            <p> <Badge value={7} /><b>Auction End</b>: <br /> The auction ends at a specified time or when bidding activity on an item has ceased for a set period (such as a few minutes after the last bid). The highest bidder at the end of the auction wins the item. </p>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                            <p> <Badge value={8} /><b>Winning and Payment</b>: <br />The winning bidder is notified, and they are provided with instructions for payment and item collection or delivery. Payment methods and procedures vary depending on the platform and the terms of the auction. </p>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                            <p> <Badge value={9} /><b>Seller Interaction</b>: <br />Online bidding platforms facilitate communication between the winning bidder and the seller. Details like payment, shipping, and other transaction-related matters are coordinated. </p>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                            <p> <Badge value={10} /><b>Feedback and Review</b>: <br /> After the transaction is completed, participants might have the option to leave feedback or reviews about the auction process, the item, and the seller. This helps build trust and transparency within the online bidding community. </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About