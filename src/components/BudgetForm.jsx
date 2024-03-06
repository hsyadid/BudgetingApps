import React, { useEffect, useRef } from 'react'
import { useFetcher } from 'react-router-dom'
import { CurrencyDollarIcon } from '@heroicons/react/24/solid'

export const BudgetForm = () => {
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
        <div className='  -min-w-[600px] min-w-[500px] md:w-2/3 lg:w-full xl:w-2/5 p-5 bg-white rounded-[26px] font-inter shadow-lg'>
            <div className=' border-4 border-dashed rounded-[24px] border-[#668CD9] p-7 bg-white'>
                <h1 className='mb-2 text-2xl font-bold'>Plan Your budget</h1>
                <Fetcher.Form method='post' className='gap-5 flex flex-col' ref={formref} >
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="budgetName" className='font-semibold'>Budget Name</label>
                        <input type="text"
                            name="budgetName"
                            required
                            placeholder='ex. Food'
                            className='w-full outline-none py-2 px-4 rounded-md border-2 border-[#b1b1b1] focus:border-[#F2B279]'
                            ref={focusref}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="budgetAmount">Set Amount</label>
                        <input
                            type="number"
                            step='0.500'
                            name="budgetAmount"
                            required
                            placeholder='ex. Rp 100.500'
                            inputMode='decimal'
                            className='w-full outline-none py-2 px-4 rounded-md border-2 border-[#b1b1b1] focus:border-[#F2B279]' />
                    </div>
                    <input type='hidden' name='_action' value={"createBudget"} />
                    <button className='self-start' disabled={submitState}>
                        {
                            submitState ? <span className='bg-black text-white py-2 px-4 rounded'>Creating....</span> : (<span className='flex gap-2 bg-black text-white py-2 px-4 rounded'>Create Budget <CurrencyDollarIcon width={20} /> </span>)

                        }

                    </button>
                </Fetcher.Form>
            </div>
        </div>
    )
}
