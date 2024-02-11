'use client'
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

interface ChartSubtitle {
	name:string[];
	title:string;
}

export function Doughnut({ name,title }: ChartSubtitle) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.body);
        const data = {
            labels: name,
            datasets: [
                {
                    data: [40, 325, 702],
                    backgroundColor: ['#ffe4ea', '#f5abb0', '#e4717a'],
                    hoverBackgroundColor: ['#a93e4a', '#70001f', '#90001f']
                }
            ]
        };
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="card flex flex-col justify-center items-center">
					<h1 className='font-semibold text-2xl text-red-200'>{title}</h1>
            <Chart
                type="pie"
                data={chartData}
                options={chartOptions}
                pt={{
                    root: { className: 'w-full md:w-30rem' }
                }}
            />
        </div>
    )
}
