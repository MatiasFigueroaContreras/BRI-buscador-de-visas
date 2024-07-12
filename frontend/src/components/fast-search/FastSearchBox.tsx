import React from 'react';
import FastSearchIcons from './FastSearchIcons';

export default function FastSearchBox({ title = 'Title', description = 'Description', type ='', link = '#' }) {
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
                <a href={link} className="bg-primary-500 text-white rounded-md p-2 hover:bg-primary-600 focus:outline-none">
                    Learn more
                </a>
            </div>
        </div>
    );
}
