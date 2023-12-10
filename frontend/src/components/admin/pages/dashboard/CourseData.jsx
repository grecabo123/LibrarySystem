import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Chart } from "primereact/chart";
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';

function CourseData() {

    const [loading, setloading] = useState(true);
    const [Document, setDocument] = useState([]);
    const [axisdata, setAxis] = useState(false);
    var deparment = [];
    var color_bar = [];
    var total = [];

    useEffect(() => {
        axios.get(`/api/ThesisData`).then(res => {
            if (res.data.status === 200) {
                setDocument(res.data.data);
            }
            else {

            }
            setloading(false)
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }, [])

    for (let index = 0; index < Document.length; index++) {
        const deparment_name = Document[index].department_code;
        const color_code = Document[index].color_code;
        const dept_num = Document[index].total;

        deparment.push(deparment_name);
        color_bar.push(color_code);
        total.push(dept_num);
    }


    const ChangeAxis = () => {
        setAxis((axisdata) => !axisdata);
    }

    const basicData = {
        labels: deparment,
        datasets: [
            {
                label: "Thesis Data",
                backgroundColor: color_bar,
                data: total,
            },
        ],
    };

    const getLightTheme = () => {
        let basicOptions = {
            indexAxis: axisdata === true ? 'x' : 'y',
            maintainAspectRatio: false,
            aspectRatio: 1,

            plugins: {
                legend: {
                    labels: {
                        color: "gray",
                    },
                    legend: {
                        display: true,
                        position: 'top',
                    },
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            console.log(context);
                            const value = axisdata === true ? context.parsed.y :  context.parsed.x;
                            return `${value}%`;
                        },
                    },
                },

            },
            scales: {
                x: {
                    ticks: {
                        color: "gray",
                        stepSize: 1,
                        beginAtZero: true,
                    },
                    grid: {
                        color: "transparent",
                    },
                },
                y: {
                    ticks: {
                        color: "gray",
                        stepSize: 1,
                        beginAtZero: true,
                    },
                    grid: {
                        color: "transparent",
                    },
                },
            },

        };
        return {
            basicOptions,
        };
    };

    const { basicOptions } = getLightTheme();



    return (
        <div>
            <Button className='p-button-sm p-button-info' icon={PrimeIcons.ALIGN_JUSTIFY} onClick={ChangeAxis} />
            <Chart type="bar" data={basicData} options={basicOptions} />
        </div>
    )
}

export default CourseData