import React from 'react'
import { Form } from 'react-router-dom'
import { DialogWithForm } from './DialogWithForm'

export const Intro = () => {
    return (
        <div className="flex flex-col justify-center items-center h-[40vh] gap-5 px-10 mt-6 ">

            <h1 className='text-4xl text-center font-inter font-bold lg:text-6xl'>
                Command Your Cash, <span className="text-[#F2B279]">  Conquer Your Goals</span>
            </h1>
            <p className='text-lg text-center lg:text-xl'>
                Unleash the Power of Personal Budgeting for Lasting Financial Freedom.
            </p>
            <DialogWithForm />
        </div>

    )
}
export default Intro
