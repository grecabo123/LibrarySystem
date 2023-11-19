import React from 'react'

function Ranking() {
    return (
        <div className='mt-4'>
            <div className="mt-4">
                <center>
                    <h4 className='text-secondary'>List of 5 Most Visited Page</h4>
                </center>
            </div>
            <ul className="list-group border-0">
                <li className="list-group-item border-0 bg-transparent mb-3 d-flex justify-content-between align-items-center">
                    <span className=''>Fire Related</span> 
                    <span className="badge bg-primary rounded-pill">82</span>
                </li>
                <li className="list-group-item border-0 bg-transparent mb-3 d-flex justify-content-between align-items-center">
                    Eye Contact  
                    <span className="badge bg-primary rounded-pill">72</span>
                </li>
                 <li className="list-group-item border-0 bg-transparent mb-3 d-flex justify-content-between align-items-center">
                    Cooking  
                    <span className="badge bg-primary rounded-pill">62</span>
                </li>
                <li className="list-group-item border-0 bg-transparent mb-3 d-flex justify-content-between align-items-center">
                    DTR with Payroll System 
                    <span className="badge bg-primary rounded-pill">52</span>
                </li>
                <li className="list-group-item border-0 bg-transparent mb-3 d-flex justify-content-between align-items-center">
                    School System
                    <span className="badge bg-primary rounded-pill">42</span>
                </li>
            </ul>
        </div>
    )
}

export default Ranking