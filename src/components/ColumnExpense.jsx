import React from 'react'
import { formatCurrency, formatDate, getTheMatch } from '../HelperFunction'
import { Link, useFetcher, Form } from 'react-router-dom'
import { XCircleIcon } from '@heroicons/react/24/solid'

export const ColumnExpense = ({ data }) => {
    const fetcher = useFetcher()
    const itemBudget = getTheMatch("Budgets", "id", data.budgetID)[0]
    return (
        <>
            <td className='py-3 px-3 text-lg font-[450] w-[900px]'>{data.name}</td>
            <td className={`py-3 px-3 ${data.category === "Income" ? "text-green-500" : "text-red-500"}`}>{data.category === "Income" ? "+ " : "- "}{formatCurrency(data.amount)}</td>
            <td className='py-3 px-3'>{formatDate(data.createAt)}</td>
            <td className='py-3 px-3'>
                <span>{data.category}</span>
            </td>
            <td className='py-3 px-3'>
                <fetcher.Form method="post">
                    <input type="hidden" name="_action" value="deleteExpense" />
                    <input type="hidden" name='id' value={data.id} />
                    <input type="hidden" name='category' value={data.category} />
                    <input type="hidden" name='amount' value={data.amount} />
                    <button type="submit">
                        <div className=' text-red-300'><XCircleIcon width={32} /></div>
                    </button>


                </fetcher.Form>
            </td>
        </>
    )
}
