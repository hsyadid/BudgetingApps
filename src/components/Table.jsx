import React from 'react';
import { ColumnExpense } from './ColumnExpense';

export const Table = ({ data, query }) => {
    const filterData = data.filter((item) => {
        return query.toLowerCase() === " " ? item : item.name.toLowerCase().includes(query);
    })
    return (
        <div className='overflow-y-auto h-[600px]'>
            <table className='min-w-[450px] w-full rounded-t-lg overflow-hidden shadow-xl mb-7 table-fixed '>
                <thead>
                    <tr className='font-inter font-semibold text-[#fefefe] text-left text-lg bg-[#2E8C8C] top-0 sticky'>
                        {
                            ["Name", "Amount", "Date", "Category", ""].map((items, i) => (
                                <th key={i} className='py-3 px-3'>{items}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        filterData.length == 0 && data.length > 0 ?
                            <tr>
                                <td ></td>
                                <td></td>
                                <td className='flex flex-col justify-center items-center text-[#e0e0e0e] h-[250px] font-inter'>
                                    <h1 className='text-6xl font-semibold'>OPSS!</h1>
                                    <p className='text-sm'>The data you search doesn't exist</p>
                                </td>
                                <td></td>
                            </tr>

                            : filterData.map((dta) => (
                                <tr key={dta.id} className="[&:nth-child(even)]:bg-[#f7f7f7d7] bg-[#fefefe] " >
                                    <ColumnExpense data={dta} />
                                </tr>
                            ))
                    }
                </tbody>
            </table>
        </div>
    );
};
