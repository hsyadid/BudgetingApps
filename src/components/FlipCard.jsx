import React from 'react'
import { formatCurrency } from '../HelperFunction'
import { ArrowDownIcon } from '@heroicons/react/24/solid'
import { ArrowUpIcon } from '@heroicons/react/24/solid'

export const FlipCard = ({ balance, income, expenses }) => {
    return (
        <div className='flex flex-col p-7 justify-between w-96 h-52 lg:w-[550px] '>
            <div className='ml-4'>
                <h1 className='text-md font-inter font-medium'>Total Balance</h1>
                <span className='text-2xl font-semibold font-inter'>{formatCurrency(Number(balance))}</span>
            </div>
            <div className='flex justify-between'>
                <div className='flex'>
                    <div>
                        <ArrowDownIcon width={40} className='text-red-400' />
                    </div>
                    <div>
                        <h2 className='text-sm font-inter font-medium'>Spending</h2>
                        <span className='text-md font-semibold font-inter'>{formatCurrency(expenses)}</span>
                    </div>
                </div>
                <div className='flex'>
                    <div>
                        <ArrowUpIcon width={40} className='text-green-300' />
                    </div>
                    <div>
                        <h2 className='text-sm font-inter font-medium'>Income</h2>
                        <span className='text-md font-semibold font-inter'>{formatCurrency(income)}</span>
                    </div>
                </div>


            </div>
        </div>
    )
}
