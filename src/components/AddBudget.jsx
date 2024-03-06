import React, { useEffect, useRef, useState } from 'react';
import { useFetcher } from 'react-router-dom';
import { ExpenseForm } from './ExpenseForm';

export const AddBudget = ({ budgets }) => {
    const [income, setIncome] = useState(true);
    const Fetcher = useFetcher();
    const submitState = Fetcher.state === "submitting";

    const formref = useRef();
    const focusref = useRef();

    useEffect(() => {
        if (!submitState) {
            formref.current.reset();
            focusref.current.focus();
        }
    }, [submitState]);

    return (
        <div className="max-w-screen-lg md:w-2/3 lg:w-full xl:w-2/5">

            <div className="w-full flex justify-between font-inter">
                <div className="flex" onClick={() => setIncome(true)}>
                    <div className={`h-12 w-20 rounded-tl-[26px] flex justify-end items-center ${income ? 'bg-white' : 'bg-gray-200'}`}>
                        <span className="text-4xl font-bold text-green-600"> + </span>
                    </div>
                    <div className={`clip-left h-12 w-[160px] ${income ? 'bg-white' : 'bg-gray-200'}`}></div>
                </div>

                <div className="flex" onClick={() => setIncome(false)}>
                    <div className={`h-12 w-[160px] clip-right ${!income ? 'bg-white' : 'bg-gray-200'}`}></div>
                    <div className={`bg-gray-200 h-12 w-20 rounded-tr-[26px] flex justify-start items-center ${!income ? 'bg-white' : ''}`}>
                        <span className="text-4xl font-bold text-red-600 -ml"> -</span>
                    </div>
                </div>
            </div>

            {
                income ? (
                    <div className="w-full p-4 bg-white rounded-b-[26px] font-inter shadow-lg">
                        <div className="border-dashed border-4 rounded-[24px] border-green-400 p-7 bg-white">
                            <Fetcher.Form method="post" className="gap-5 flex flex-col" ref={formref} >
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="budgetName" className="font-semibold">Income Name</label>
                                    <input
                                        type="text"
                                        name="incomeName"
                                        required
                                        placeholder="e.g., Salary"
                                        className="w-full outline-none py-2 px-4 rounded-md border-2 border-[#b1b1b1] focus:border-[#F2B279]"
                                        ref={focusref}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="budgetAmount" className="font-semibold"> Amount</label>
                                    <input
                                        type="number"
                                        step="0.500"
                                        name="incomeAmount"
                                        required
                                        placeholder="e.g., Rp 100.500"
                                        inputMode="decimal"
                                        className="w-full outline-none py-2 px-4 rounded-md border-2 border-[#b1b1b1] focus:border-[#F2B279]"
                                    />
                                </div>
                                <input type="hidden" name="_action" value={"addIncome"} />
                                <button className="self-start" disabled={submitState}>
                                    {
                                        submitState ? <span className="bg-black text-white py-2 px-4 rounded">Adding...</span> :
                                            (<span className="flex gap-2 bg-black text-white py-2 px-4 rounded">Add Income</span>)
                                    }
                                </button>
                            </Fetcher.Form>
                        </div>
                    </div>
                ) : (
                    <ExpenseForm budgets={budgets} />
                )
            }
        </div>
    );
};
