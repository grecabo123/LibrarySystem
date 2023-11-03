import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import swal from 'sweetalert';

function Bidoffer({BiddersData}) {


    const [BiddingCompetetor, setBidding] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        // console.log(BiddersData)
    },[]);



    return (
        <div>
            
            <DataTable 
                title="Bid Competetor"
                
            />
        </div>
    )
}

export default Bidoffer