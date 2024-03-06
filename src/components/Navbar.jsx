import React from 'react'
import { Link, Form } from "react-router-dom"
import logo_icon from '../assets/logo.png'
import { FlipCard } from './FlipCard'

export const Nav = ({ userName, balance, expenses, income }) => {
    return (
        <nav >

            {
                userName ? (
                    <div className=''>
                        <div className=' flex items-start justify-around h-[35vh] bg-[#F2B279] px-10 rounded-b-[70px] w-full mb-14 pt-16 lg:h-[20vh] on'>

                            <Link to="/"
                                className='flex items-center w-[100vw] -ml-9 -mt-5 lg:-mt-8'>
                                <img src={logo_icon} alt="" className='w-28 object-contain lg:w-48' />
                                <span className='text-xl font-inter font-[650] -ml-8 lg:text-5xl'>BeeBank</span>
                            </Link>

                            <Form
                                method="post"
                                action="logout"
                                onSubmit={(e) => {
                                    if (!confirm("Delete user and all data?")) {
                                        e.preventDefault()
                                    }
                                }}
                            >
                                <button type="submit" className=" w-32 py-2 rounded-full text-white bg-red-600 lg:w-60 lg:py-4 lg:px-4 lg:text-xl">
                                    <span>Delete Profile</span>
                                </button>
                            </Form>

                        </div>

                        <div className=' bg-[rgba(203,217,175,0.4)] m-auto absolute top-[24%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[24px] backdrop-blur-lg shadow-xl lg:top-[8rem]'>
                            <FlipCard balance={balance} income={income} expenses={expenses} />
                        </div>
                    </div>
                ) : (
                    <Link to="/"
                        className='flex  justify-center items-center w-[100vw] -ml-5 py-5'>
                        <img src={logo_icon} alt="" className='w-28 object-contain' />
                        <span className='text-xl font-inter font-[650] -ml-8'>BeeBank</span>
                    </Link>)
            }
        </nav >
    )
}
