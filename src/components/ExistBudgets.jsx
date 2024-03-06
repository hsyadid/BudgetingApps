import React from 'react'
import { calculateSpendBudget, formatPercentage, formatCurrency } from '../HelperFunction'
import { ChevronRightIcon } from '@heroicons/react/24/solid';

export const ExistBudgets = ({ budgets }) => {
    const { id, name, amount } = budgets;
    const spend = calculateSpendBudget(id)
    return (
        <div className='bg-white p-5 my-2 flex rounded-[24px] w-[350px] shadow-md items-center sm:w-[200px]'>
            <div className='basis-10/12'>
                <div className='flex justify-between items-end'>
                    <h1 className='text-lg font-semibold sm:text-sm'>{name}</h1>
                    <small className='text-[10px] sm:text-[8px]'>{formatCurrency(amount)} Budgeted</small>
                </div>
                <progress max={amount} value={spend} className='w-full h-2 rounded-full [&::-webkit-progress-value]:bg-[#F2B279] [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:rounded-full'>
                    {formatPercentage(spend / amount)}
                </progress>
                <div className='flex justify-end'>
                    <small className='text-[10px] sm:text-[8px]'>{formatCurrency(amount - spend)} remaining</small>
                </div>
            </div>
            <div className='basis-2/12 flex justify-center '>
                <ChevronRightIcon width={24} className='text-black' />
            </div>
        </div>
    )
}
