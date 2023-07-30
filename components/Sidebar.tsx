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

interface SidebarProps  {
    children: React.ReactNode;
    songs: Song[]
}

const Sidebar: React.FC<SidebarProps> = ({children, songs}) => {
    const pathname = usePathname();
    const player = usePlayer();
    const router = useRouter();

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
    h-full
    `,
    player.activeId && "h-[calc(100%-90px)]")}>
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
                <div 
                title='Back to home'
                onClick={handlerClickLogo}
                className=' flex items-center mx-3 my-2 gap-3 hover:bg-neutral-800 rounded-md h-[50px] cursor-pointer '>
                    <Image
                    src='/images/Harmon-IA.webp'
                    alt='Hharmon-IA'
                    width='45'
                    height='45'
                    className=' rounded-md w-[30px] h-[30px] mx-2'
                    />
                    <h1 className=' flex justify-center items-center text-2xl text-center'>Harmon-IA</h1>
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
                            />
                        ))
                    }
                </div>
            </Box>
            <Box className='overflow-y-auto h-full'>
                <Library songs={songs}/>
            </Box>
        </div>
        <main className='h-full overflow-y-auto flex-1 py-2'>
            {children}
        </main>
    </div>
  )
}

export default Sidebar