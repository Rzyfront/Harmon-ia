import Link from 'next/link';
import React from 'react'
import { IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge';
interface SidebarItemProps {
    icon: IconType;
    label: string;
    active?: boolean;
    href: string;
    isOpen:boolean
}
const SidebarItem: React.FC<SidebarItemProps> =({icon: Icon,label,active,href,isOpen})=> {

 
  
  return (
    <Link title={label} href={href} className={twMerge(`flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1`, active && "text-white")}>
    <Icon size={26}/>
    {isOpen ? (<p className='truncate w-100'>{label}</p>): ''}
    </Link>
  )
}

export default SidebarItem