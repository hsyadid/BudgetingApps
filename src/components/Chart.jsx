import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

export const Chart = ({ expenses, income }) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const initializeMonthlyArray = () => Array(12).fill(0);

    const incomeMonthlyValues = initializeMonthlyArray();
    const expensesMonthlyValues = initializeMonthlyArray();


    if (income) {
        income.forEach(item => {
            console.log(item)
            const monthIndex = new Date(item.createAt).getMonth();
            console.log(monthIndex)
            incomeMonthlyValues[monthIndex] += item.amount;
        });
    }

    if (expenses) {
        expenses.forEach(item => {
            const monthIndex = new Date(item.createAt).getMonth();
            expensesMonthlyValues[monthIndex] += item.amount;
        });
    }


    const chartData = {
        labels: monthNames,
        datasets: [
            {
                label: 'Income',
                data: incomeMonthlyValues,
                fill: false,
                backgroundColor: 'rgba(0, 220, 0, 0.6)',
            },
            {
                label: 'Expenses',
                data: expensesMonthlyValues,
                fill: false,
                backgroundColor: 'rgba(220, 0, 0, 0.6)',
            },
        ],
    };



    return (
        <div className='flex justify-center w-full h-[450px] mx-auto'>
            <Bar
                data={chartData}
                options={{
                    scales: {
                        x: {
                            grid: {
                                display: false,
                            },
                        },
                        y: {
                            grid: {
                                display: true,
                            },
                        },
                    },
                }}
            />
        </div>
    );
}
