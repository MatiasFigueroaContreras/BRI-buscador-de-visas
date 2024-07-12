"use client"

import React from 'react';
import FastSearchIcons from './FastSearchIcons';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import { usePathname, useRouter, useSearchParams } from "next/navigation"


export default function FastSearchBox({ title = 'Title', description = 'Description', type ='', link = '' }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
  
    const handleOnSearch = (link: string) => {
        router.push(`/visas/?visa_type=${link}`)
      }
    return (
        <div className="bg-white rounded-lg shadow-md p-4 border border-black" style={{ height: '230px', width: '500px', display: 'flex', flexDirection: 'column' }}>
            <div>
                <div className="flex items-center mb-2">
                    {type && <FastSearchIcons type={type}/>}
                    <h2 className="text-xl font-bold">{title}</h2>
                </div>
                <div className="flex-grow overflow-hidden">
                    <p className="text-black">
                        {description}
                    </p>
                </div>
            </div>
            <div className="mt-auto flex justify-end">
                <a 
                className="bg-secundary-500 text-white rounded-md p-2 hover:bg-secundary-600 focus:outline-none"
                onClick={() => handleOnSearch(link)}
                >
                    <ArrowRightIcon className="h-6 w-6" />
                </a>
            </div>
        </div>
    );
}
