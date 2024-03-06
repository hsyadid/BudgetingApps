import React, { useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { fetchData, delaySecond, deleteItems, updateBalance } from '../HelperFunction'
import { Intro } from '../components/Intro.jsx'
import { toast } from 'react-toastify'
import { BudgetForm } from '../components/BudgetForm'
import { ExistBudgets } from '../components/ExistBudgets.jsx'
import { Table } from '../components/Table.jsx'
import { AddBudget } from '../components/AddBudget.jsx'
import { Chart } from '../components/Chart.jsx'
import { data } from 'autoprefixer'

export function dashboardLoader() {
    const userName = fetchData("userName")
    const budgets = fetchData("Budgets")
    const expenses = fetchData("Expenses")
    const income = fetchData("income")
    const balance = fetchData("userBalance")
    return { userName, budgets, expenses, income }
}

export async function dashboardAction({ request }) {
    await delaySecond();
    const { _action, ...values } = Object.fromEntries(await request.formData())
    console.log(_action, values);

    if (_action === "addIncome") {
        try {
            const newIncome = {
                id: crypto.randomUUID(),
                name: values.incomeName,
                amount: +values.incomeAmount,
                month: new Date(Date.now()).getMonth(),
                createAt: Date.now(),
                category: "Income"
            }

            const allIncome = fetchData("income") ?? []
            console.log(allIncome);

            if (allIncome.length > 0) {
                localStorage.setItem("income", JSON.stringify([...allIncome, newIncome]))
            } else {
                localStorage.setItem("income", JSON.stringify([newIncome]))
            }

            updateBalance("add", +values.incomeAmount)
            return toast.success("Income has been added")
        } catch (err) {
            throw new Error("There is an error when you add income")
        }
    }

    if (_action === "createAccount") {
        try {
            localStorage.setItem("userName", JSON.stringify(values.userName))
            localStorage.setItem("userBalance", JSON.stringify(values.initialBalance))
            return toast.success("Account has been created")
        } catch (err) {
            throw new Error("There was an error when you create account")
        }
    }
    if (_action === "createBudget") {
        try {
            const newBudget = {
                id: crypto.randomUUID(),
                name: values.budgetName,
                amount: +values.budgetAmount,
                createdAt: Date.now()
            }
            const existBudget = fetchData("Budgets") ?? []

            if (existBudget.length > 0) {

                localStorage.setItem("Budgets", JSON.stringify([...existBudget, newBudget]))
            } else {
                localStorage.setItem("Budgets", JSON.stringify([newBudget]))
            }

            return toast.success("Budget has been created")
        } catch (err) {
            throw new Error("There is an error when you create budget")
        }
    }
    if (_action === "createExpense") {
        try {
            const newExpense = {
                id: crypto.randomUUID(),
                name: values.newExpense,
                amount: +values.expenseAmount,
                month: new Date(Date.now()).getMonth(),
                createAt: Date.now(),
                budgetID: values.newExpenseBudget,
                category: "Expense"
            }
            const existExpense = fetchData("Expenses") ?? []

            if (existExpense.length > 0) {

                localStorage.setItem("Expenses", JSON.stringify([...existExpense, newExpense]))
            } else {
                localStorage.setItem("Expenses", JSON.stringify([newExpense]))
            }

            updateBalance("substract", +values.expenseAmount)
            return toast.success("Expense is sucsessfully created")
        } catch (err) {
            throw new Error("There is an error when you create expense")
        }
    }
    if (_action === "deleteExpense") {
        try {
            if (values.category == "Expense") {
                deleteItems("Expenses", values.id)
                updateBalance("add", +values.amount)
            }
            if (values.category == "Income") {
                deleteItems("income", values.id)
                updateBalance("substract", +values.amount)
            }

            return toast.success("transaction is sucsessfully deleted")
        } catch (err) {
            throw new Error("There is an error when you delete expense")
        }
    }
}

export const UserDashboard = () => {
    const { userName, budgets, expenses, income } = useLoaderData()
    const [query, setQuery] = useState("");
    let dataMerger = [];

    console.log(income)

    if (expenses) {
        dataMerger = [...dataMerger, ...expenses]

    }

    if (income) {
        dataMerger = [...dataMerger, ...income]

    }

    return (
        <div className='bg-[#FBF4EC] min-h-full'>
            {userName ? (
                <div className='p-5'>
                    <p className='text-[40px] text-[#0e0e0e] my-4 font-inter font-bold lg:text-[70px] lg:mt-20'>Welcome back, <span className='text-[#9ba070]'>{userName}</span></p>
                    <div className='my-7'>
                        {
                            (expenses || income) && (
                                <Chart expenses={expenses} income={income} />
                            )
                        }
                    </div>
                    <div>
                        {
                            budgets ? (
                                <div>
                                    <div className='flex gap-5 justify-center w-full'>
                                        <BudgetForm />
                                        <AddBudget budgets={budgets} />
                                    </div>
                                    <h2 className='text-5xl text-[#0e0e0e] mt-10 mb-5 font-inter font-bold'>Budgeting plan</h2>
                                    <div className='flex justify-center items-center w-full gap-3 flex-wrap '>
                                        {
                                            budgets.map((bud) => {
                                                return <ExistBudgets key={bud.id} budgets={bud} />
                                            })
                                        }
                                    </div>
                                    {
                                        (dataMerger) && dataMerger.length > 0 && (

                                            <div className='mt-10'>
                                                <div className='flex justify-between items-center m-3'>
                                                    <div className='w-full'>
                                                        <p className='text-5xl text-[#0e0e0e] font-inter font-bold my-5'>Latest Transaction</p>
                                                        <form >
                                                            <input type="text" onChange={(e) => setQuery(e.target.value)} placeholder='Search transaction' className='w-full py-2 px-5 border border-[#b1b1b1] rounded-lg' />
                                                        </form>
                                                    </div>

                                                </div>
                                                <Table data={dataMerger.sort((a, b) => { b.createAt - a.createAt })} query={query} />

                                            </div>)
                                    }

                                </div>

                            ) : (
                                <div>
                                    <div className='mb-5 -m-4 px-5'>
                                        <p className='text-md text-[#0e0e0e] font-inter'>Lets create a budget to get started !</p>
                                    </div>
                                    <div className='flex justify-start gap-5'>
                                        <BudgetForm />
                                    </div>
                                </div>
                            )

                        }
                    </div>


                </div>
            ) :
                <Intro />}

        </div>
    )
}
