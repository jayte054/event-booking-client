

import React from 'react';
import {Bar} from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Booking_Buckets = {
    cheap: {
        min: 0,
        max: 100
    },
    medium: {
        min: 100,
        max: 10000
    },
    expensive: {
        min: 10000, 
        max: 50000000
    }
};

export const BookingsChart = (props) => {
    const chartData: any = {
        labels: [],
        datasets: [{
            label: 'Bookings',
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(75,192,192,0.6)',
            hoverBorderColor: 'rgba(75,192,192,1)',
            data: []
        }]
    };

    for (const bucket in Booking_Buckets) {
        const filteredBookingsCount: any = props.bookings.reduce((prev, current) => {
            if (
                current.event.price > Booking_Buckets[bucket].min &&
                current.event.price < Booking_Buckets[bucket].max
            ) {
                return prev + 1;
            } else {
                return prev;
            }
        }, 0);

        chartData.labels.push(bucket);
        chartData.datasets[0].data.push(filteredBookingsCount);
    }

    return (
        <div>
            <Bar data={chartData} options={{
                scales: {
                    x: {
                        beginAtZero: true
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }} />
        </div>
    );
};
