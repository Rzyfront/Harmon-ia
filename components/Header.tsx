'use client'

import React from 'react'
import {useRouter} from 'next/navigation'
import { twMerge } from 'tailwind-merge';
import { RxCaretLeft,RxCaretRight } from 'react-icons/rx';
import Button from './Button';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import useAuthModal from '@/hooks/useAuthModal';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/hooks/useUser';
import { FaUserAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import usePlayer from '@/hooks/usePlayer';
import Link from 'next/link';
import Image from 'next/image';
import {MdMenu,MdMenuOpen} from 'react-icons/md'
import { IoCreateOutline } from 'react-icons/io5';
import useToggleSideBar from '@/hooks/useToggleSideBar';


interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({children,className}) => {

  const player = usePlayer();
  const router = useRouter();
  const { onOpen } = useAuthModal();
  const  supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const toggleSideBar = useToggleSideBar();

  const handleLogout = async () =>{
    
    const { error }  = await supabaseClient.auth.signOut();
    player.reset();
    router.refresh(); 
    if(error){
      toast.error(error.message);
    }else{
      toast.success('Logged out successfully')
    }
  }

  
  return (
    <div className={twMerge(`
    h-fit
    bg-gradient-to-b
    from-blue-500
    px-4
    py-4
    md:px-6
    md:py-4
    `,
    className)}>

    <div className='
    w-full
    mb-4
    flex
    items-center
    justify-between
    '>

    <div className='
    hidden
    md:flex
    gap-x-2
    items-center
    '>

    <button 
    onClick={()=> router.back()}
    className='
    rounded-full
    bg-black
    flex
    items-center
    justify-center
    hover:opacity-75
    transition
    '
    >
      <RxCaretLeft className='text-white' size={30}/>
    </button>

       <button 
    onClick={()=> router.forward()}
    className='
    rounded-full
    bg-black
    flex
    items-center
    justify-center
    hover:opacity-75
    transition
    '
    >
      <RxCaretRight className='text-white' size={30}/>
    </button>

    </div>

    <div className='
    flex
    md:hidden
    gap-x-1
    md:gap-x-2
    items-center
    '>
      <div className=' flex items-center justify-start gap-x-0 md:gap-x-2'>
      
      <div 
      onClick={toggleSideBar.openSidebar}
      className=' flex items-center justify-center w-[40px] h-[40px] md:w-[50px] md:h-[50px] hover:opacity-80  hover:bg-blue-600
      active:bg-blue-600 rounded-md'>
        <MdMenu
        onClick={toggleSideBar.openSidebar}
        color='white'
        size={40}
        className=' hover:scale-105 active:scale-105'/>
      </div>
      
         <Link
      href={'/'}
      className='
      rounded-md
      flex
      items-center
      justify-center
      p-1
      md:p-2
      gap-x-1
      hover:shadow-md
      hover:bg-blue-600
      active:bg-blue-6000
      transition
      '>
        <Image 
        className=' rounded-md'
        alt='Harmon-IA'
        src={'/images/Harmon-IA.webp'}
        sizes='35px'
        width={35}
        height={35}/>
        <h1 className=' text-white'>Harmon-IA</h1>
      </Link>

      </div>
    
    </div>
    <div className='
    flex
    justify-between
    items-center
    gap-x-4
    '>
      {!user ? (
        <div className='
        flex
        gap-x-4
        items-center
        '>
          <Button
          onClick={handleLogout}
          className='
          bg-white
          px-4
          py-1
          '
          >
          Logout
          </Button>
          <Button
          onClick={()=> router.push('/account')}
          className='
          bg-white
          px-2
          py-2
          '
          >
          <FaUserAlt/>
          </Button>
        </div>
      ): (
       <>
    {/* <div>
      <Button
      className='
      bg-tranparent
      text-neutral-300
      font-medium
      '
      onClick={onOpen}
      >
        Sign up
      </Button>
    </div> */}
    <div className=' flex items-center justify-center p-1'>
      <Button className='
      bg-white
      px-4
      py-1
      '
      onClick={onOpen}
      >
        Log in
      </Button>
    </div>
    </>
    )}
    </div>


    </div>
    {children}
    </div>
  )
}

export default Header