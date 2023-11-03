import React, { useState } from 'react'
import Papa from 'papaparse';

function ImportCSV() {

    const [data, setData] = useState([]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        Papa.parse(file, {
            complete: (result) => {
                setData(result.data);
            }
        });
    };

    return (
        <div className='container-fluid'>
            <div>
                <input type="file" onChange={handleFileUpload} />
                <table>
                    <thead>
                        <tr>
                            {data[0] && data[0].map((header, index) => <th key={index}>{header}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {data.slice(1).map((row, index) => (
                            <tr key={index}>
                                {row.map((cell, index) => <td key={index}>{cell}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ImportCSV