import React, { useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Nav } from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import { fetchData } from '../HelperFunction';
import money_icon from '../assets/money_icon.png';

export function mainLoader() {
    const userName = fetchData("userName");
    const balance = fetchData("userBalance");
    const expenses = fetchData("Expenses");
    const income = fetchData("income");
    return { userName, balance, expenses, income };
}

const calculateTotalIncome = (incomeArray) => {
    return incomeArray.reduce((total, item) => total + item.amount, 0);
};

const calculateTotalExpenses = (expenseArray) => {
    return expenseArray.reduce((total, item) => total + item.amount, 0);
};

export const Main = () => {
    const { userName, balance, expenses, income } = useLoaderData();
    const [visible, setVisible] = useState(false);
    const [queue, setQueue] = useState(false);
    let totalExpenses = 0;
    let totalIncome = 0;

    if (income) {
        totalIncome = calculateTotalIncome(income);
    }
    if (expenses) {
        totalExpenses = calculateTotalExpenses(expenses);
    }

    const awalanRef = useRef(null);

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setVisible(true);
        }, 2780);

        const timer2 = setTimeout(() => {
            setQueue(true);
        }, 1500);

        const timer3 = setTimeout(() => {
            setQueue(false);
        }, 1750);


        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    useEffect(() => {
        if (userName != null && awalanRef.current) {
            awalanRef.current.removeAttribute("transition-style");
        }
    }, [userName]);

    return (
        <>
            <div ref={awalanRef} className={"transition-all bg-[#FBF4EC] h-full w-full absolute z-50 overflow-x-hidden  "} transition-style="in:circle:hesitate">
                {!userName && (
                    <div className="flex items-center justify-center top-[230px] gap-6 relative z-20 transition-go-down ">
                        <div className="relative inline-block h-[25px] w-[25px] bg-black rounded-full shadow-inner before:content-[''] before:h-[40px] before:w-[40px] before:bg-white before:absolute before:rounded-full before:z-[-1] before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 "></div>

                        {!queue &&
                            <div className="relative inline-block h-[25px] w-[25px] bg-black rounded-full shadow-inner before:content-[''] before:h-[40px] before:w-[40px] before:bg-white before:absolute before:rounded-full before:z-[-1] before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 "></div>
                        }
                        {queue &&
                            <div className='half-circle relative top-1'></div>
                        }

                        <img src={money_icon} alt="" className='size-[300px] absolute object-contain -z-10 translate-y-[100px]' />
                    </div>
                )}
                {visible && (
                    <div className="bg-[#FBF4EC] h-[101%] mt-[-35px]">
                        <Nav userName={userName} balance={balance} income={totalIncome} expenses={totalExpenses} />
                        <Outlet />
                    </div>

                )
                }
            </div >
            <div className='bg-[#D96277] h-[100vh] w-full inset-0 absolute'></div>
        </>
    );
};
