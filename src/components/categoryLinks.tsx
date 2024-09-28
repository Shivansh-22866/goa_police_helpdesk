import React from 'react'

import {
    IconBriefcase,
    IconBook,
    IconCalendar,
    IconChartBar,
    IconHeart,
    IconCode,
} from '@tabler/icons-react'
import { label } from 'framer-motion/client'

const categories = [
    { icon: IconBriefcase, label:"Business" },
    { icon: IconBook, label: "Education" },
    { icon: IconCalendar, label: "Event" },
    { icon: IconChartBar, label: "Finance" },
    { icon: IconHeart, label: "Health" },
    { icon: IconCode, label: "Technology" },
]

const CategoryLinks: React.FC = () => {
    return (
        <div className='mt-10 sm:mt-20'>
            {categories.map(({icon: Icon, label}) => (
                <div key={label} 
                className='m-1 py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 text-white'>
                    <Icon size={18} />
                    <p className='text-2xl'>{label}</p>
                </div>
            ))}
        </div>
    )
}

export default CategoryLinks