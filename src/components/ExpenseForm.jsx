import React, { useEffect, useRef } from 'react'
import { useFetcher } from 'react-router-dom'
import { PlusCircleIcon } from '@heroicons/react/24/solid'

export const ExpenseForm = ({ budgets }) => {
    const Fetcher = useFetcher()
    const submitState = Fetcher.state == "submitting"

    const formref = useRef()
    const focusref = useRef()

    useEffect(() => {
        if (!submitState) {
            formref.current.reset();
            focusref.current.focus();
        }
    }, [submitState])

    return (
        <div className=' w-full p-7 bg-white rounded-b-[26px] font-inter shadow-lg'>
            <div className=' border-dashed border-4 rounded-[24px] border-red-400 p-7 bg-white'>
                <Fetcher.Form method='post' className='gap-5 flex flex-col' ref={formref} >
                    <div className='flex gap-2'>
                        <div className='flex-1 flex flex-col gap-2'>
                            <label htmlFor="newExpense" className='font-semibold'>Budget Name</label>
                            <input type="text"
                                name="newExpense"
                                required
                                placeholder='ex. Food'
                                className='w-full outline-none py-2 px-4 rounded-md border-2 border-[#b1b1b1] focus:border-[#F2B279]'
                                ref={focusref}
                            />
                        </div>
                        <div className='flex flex-1 flex-col gap-2'>
                            <label htmlFor="expenseAmount" className='font-semibold'>Set Amount</label>
                            <input
                                type="number"
                                step='0.500'
                                name="expenseAmount"
                                required
                                placeholder='ex. Rp 100.500'
                                inputMode='decimal'
                                className='w-full outline-none py-2 px-4 rounded-md border-2 border-[#b1b1b1] focus:border-[#F2B279]' />
                        </div>
                    </div>
                    <div hidden={budgets.length == 1}>
                        <div className='flex flex-col gap-2'>

                            <label htmlFor="newExpenseBudget" className='font-semibold'> Choose Category</label>
                            <select name="newExpenseBudget" id="newExpenseBudget" className='py-2 px-4 rounded-md border-2 border-[#b1b1b1] focus:border-[#F2B279]' >
                                {
                                    budgets.sort((a, b) => a.createdAt - b.createdAt).map((bud) => {
                                        return <option key={bud.id} value={bud.id}>{bud.name}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <input type='hidden' name='_action' value={"createExpense"} />
                    <button className='self-start' disabled={submitState}>
                        {
                            submitState ? <span>Adding...</span> : <span className='flex gap-2 bg-black text-white py-2 px-4 rounded'>Add expense <PlusCircleIcon width={20} /></span>

                        }

                    </button>
                </Fetcher.Form >
            </div >
        </div >
    )
}
