'use client'

import useToggleSideBar from "@/hooks/useToggleSideBar"
import SidebarItem from "./SidebarItem";
import { usePathname, useRouter } from "next/navigation";
import {HiHome} from 'react-icons/hi';
import {BiSearch} from 'react-icons/bi';
import {IoCreateOutline} from 'react-icons/io5';
import { useMemo } from "react";
import Box from "./Box";
import { MdMenuOpen } from "react-icons/md";
import Image from "next/image";
import Library from "./Library";
import { Song } from "@/types";

interface SidebarPhoneProps {
    songs: Song[]
}

function SidebarPhone({songs}: SidebarPhoneProps) {
    console.log('SidebarPhone se monto')
    const router = useRouter();
    const pathname = usePathname();
    const toggleSidebar = useToggleSideBar();  

    const handleClose = (event: React.MouseEvent<HTMLDivElement>): void=>{
        event.stopPropagation();
        if (toggleSidebar.isOpen) {   
            toggleSidebar.closeSidebar();
        }
    }

    
    const handlerClickLogo = ()=>{
        if(pathname !== '/'){
            router.replace('/');
        }else{
            router.refresh();
        }
    }

     const routes = useMemo(()=>[
        {
            icon: HiHome,
            label: 'Home',
            active: pathname !== '/search',
            href: '/'
        },
        {
            icon: BiSearch,
            label: 'Search',
            active: pathname === '/search',
            href: '/search'
        },
        {
            icon: IoCreateOutline,
            label: 'Make',
            active: pathname === '/search',
            href: '/make'
        }
    ],[pathname])

  return (
    <div
    onClick={handleClose}
    className=" absolute md:hidden h-full w-full z-50 bg-opacity-80 bg-neutral-950">

        <div className="
        flex
        flex-col
        gap-y-2
        p-2
        relative
        top-0
        left-0
        h-full
        w-[300px]
        bg-neutral-800 
        ">

            
            <Box className=" bg-neutral-800">
                <div className=' flex mx-3 my-2'>

                    <div 
                    title='Menu'
                    onClick={toggleSidebar.closeSidebar}
                    className=' flex items-center justify-center gap-2 hover:bg-neutral-800 rounded-md h-[50px] w-[50px] cursor-pointer '>
                        <MdMenuOpen 
                        color='white'
                        size={45} 
                        className=' 
                        hover:scale-105
                        active:scale-105
                        '/>
                    </div>
                    <div 
                    onClick={handlerClickLogo}
                    title='Back to home'
                    className=' flex items-center px-3 gap-1 hover:bg-neutral-800 rounded-md h-[50px] cursor-pointer '>
                        
                        <Image
                        src='/images/Harmon-IA.webp'
                        alt='Hharmon-IA'
                        sizes='45px'
                        width={45}
                        height={45}
                        className=' rounded-md w-[30px] h-[30px]'
                        />
                        <h1 className=' flex justify-center items-center text-2xl text-center'>Harmon-IA</h1>
                    </div>

                </div>
               
                <div className='
                flex
                flex-col
                gap-y-4
                px-5
                py-4
                '>
                    {
                        routes.map((item)=>(
                            <SidebarItem
                            key={item.label}
                            {...item}
                            isOpen={toggleSidebar.isOpen}
                            />
                        ))
                    }
                </div>
            </Box>
            <Box className='overflow-y-auto h-full bg-neutral-800'>
                <Library songs={songs}/>
            </Box>
        </div>
     </div>  
  )
}

export default SidebarPhone