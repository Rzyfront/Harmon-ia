'use client';

import {usePathname} from 'next/navigation';
import { useMemo } from 'react';
import {HiHome} from 'react-icons/hi';
import {BiSearch} from 'react-icons/bi';
import {IoCreateOutline} from 'react-icons/io5';
import Box from './Box';
import SidebarItem from './SidebarItem';
import Library from './Library';
import { Song } from '@/types';
import usePlayer from '@/hooks/usePlayer';
import { twMerge } from 'tailwind-merge';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import useToggleSideBar from '@/hooks/useToggleSideBar';
import { MdMenu,MdMenuOpen } from 'react-icons/md';
import SidebarPhone from './SidebarPhone';


interface SidebarProps  {
    children: React.ReactNode;
    songs: Song[]
}

const Sidebar: React.FC<SidebarProps> = ({children, songs}) => {
    const pathname = usePathname();
    const player = usePlayer();
    const router = useRouter();
    const toggleSideBar = useToggleSideBar();

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

    const handlerClickLogo = ()=>{
        if(pathname !== '/'){
            router.replace('/');
        }else{
            router.refresh();
        }
    }
    return (

    <div className={twMerge(`
    flex
    relative
    h-full
    `,
    player.activeId && "h-[calc(100%-90px)]")}>

        {toggleSideBar.isOpen ? (
        <div className='
        hidden
        md:flex
        flex-col
        gap-y-2
        bg-black
        h-full
        w-[300px]
        p-2
        '>
            <Box>
                <div className=' flex mx-3 my-2'>

                    <div 
                    title='Menu'
                    onClick={toggleSideBar.closeSidebar}
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
                            isOpen={toggleSideBar.isOpen}
                            />
                        ))
                    }
                </div>
            </Box>
            <Box className='overflow-y-auto h-full'>
                <Library songs={songs}/>
            </Box>
        </div>
        ):(
        <div className='
        hidden
        md:flex
        flex-col
        gap-y-2
        bg-black
        h-full
        w-[80px]
        p-2
        '>
            <Box className='flex flex-col items-center justify-start h-full'>
                <div 
                title='Back to home'
                onClick={toggleSideBar.openSidebar}
                className=' flex items-center justify-center mx-3 my-2 gap-3 hover:bg-neutral-800 rounded-md h-[50px] w-[50px] cursor-pointer '>
                     <MdMenu 
                     color='white'
                     size={45} 
                     className=' 
                     hover:scale-105
                     active:scale-105
                     '/>
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
                            isOpen={toggleSideBar.isOpen}
                            />
                        ))
                    }
                </div>
            </Box>
           {toggleSideBar.isOpen ? (<Box className='overflow-y-auto h-full'>
                <Library songs={songs}/>
            </Box>): ''}
        </div>)}
        {toggleSideBar.isOpen ?(<SidebarPhone songs={songs}/>
        ):(
        '')}

        <main className='h-full overflow-y-auto flex-1 py-2'>
            {children}
        </main>
    </div>
  )
}

export default Sidebar