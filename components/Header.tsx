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
    from-blue-900
    p-6
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
    gap-x-2
    items-center
    '>
      <div className=' flex items-center justify-center gap-x-3'>
      <div className=' flex items-center justify-center w-[50px] h-[50px] hover:to-neutral-700'>
        <MdMenu color='white' size={45} className=' hover:scale-105
      active:scale-105'/>
      </div>
      
         <Link
      href={'/'}
      className='
      rounded-md
      flex
      items-center
      justify-center
      hover:shadow-md
      hover:scale-105
      active:scale-105
      transition
      '>
        <Image 
        className=' rounded-md'
        alt='Harmon-IA'
        src={'/images/Harmon-IA.webp'}
        width={50}
        height={50}/>
      </Link>

      </div>
     
      {/* <Link
      href={'/'}
      className='
      rounded-full
      p-2
      bg-white
      flex
      items-center
      justify-center
      hover:opacity-75
      transition
      '>
        <HiHome className='text-black' size={20}/>
      </Link>
      <Link 
      href={'/search'}
      className='
      rounded-full
      p-2
      bg-white
      flex
      items-center
      justify-center
      hover:opacity-75
      transition
      '>
        <BiSearch className='text-black' size={20}/>
      </Link>
      <Link 
      href={'/make'}
      className='
      rounded-full
      p-2
      bg-white
      flex
      items-center
      justify-center
      hover:opacity-75
      transition
      '>
        <IoCreateOutline className='text-black' size={20}/>
      </Link> */}
    </div>
    <div className='
    flex
    justify-between
    items-center
    gap-x-4
    '>
      {user ? (
        <div className='
        flex
        gap-x-4
        items-center
        '>
          <Button
          onClick={handleLogout}
          className='
          bg-white
          px-6
          py-2
          '
          >
          Logout
          </Button>
          <Button
          onClick={()=> router.push('/account')}
          className='
          bg-white
          px-3
          py-3
          '
          >
          <FaUserAlt/>
          </Button>
        </div>
      ): (
       <>
    <div>
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
    </div>
    <div>
      <Button className='
      bg-white
      px-5
      py-2
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