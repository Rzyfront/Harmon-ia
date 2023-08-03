'use client'

import React from 'react'
import {TbPlaylist} from 'react-icons/tb'
import {AiOutlinePlus} from 'react-icons/ai'
import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import useUploadModal from '@/hooks/useUploadModal'
import { Song } from '@/types'
import MediaItem from './MediaItem'
import useOnPlay from '@/hooks/useOnPlay'
import useSubscribeModal from '@/hooks/useSubscribeModal'


interface LibraryProps {
    songs: Song[]
}

const Library = ({songs}: LibraryProps) => {

    const subscribeModal = useSubscribeModal();
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const { user, subscription } = useUser();
    const onPlay = useOnPlay(songs);

    const onClick = () => {
        if(!user){
            return authModal.onOpen();
        }
        if (!subscription) {
            return subscribeModal.onOpen();
        }
        return uploadModal.onOpen();

    }
  return (
    <div className='flex flex-col'>
        <div 
        onClick={onClick}
        title='Add your songs'
        className='flex items-center justify-between px-5 py-4 hover:bg-neutral-800 active:bg-neutral-800 rounded-md cursor-pointer'>
            <div className='inline-flex items-center gap-x-2'>
                <TbPlaylist className="text-neutral-400" size={26}/>
                <p
                className='
                text-neutral-400
                font-medium
                text-md
                '
                >Your Library</p>
            </div>
            <AiOutlinePlus
            size={25}
            className='
            text-neutral-400
            curso-pointer
            hover:text-white
            transition
            active:text-blue-600
            hover:rotate-180
            '
            />
        </div>
        <div className='
        flex
        flex-col
        gap-y-2
        mt-2
        px-3

        '>
            {songs.map((item)=>(
                <MediaItem
                onClick={(id : string)=> onPlay(id)}
                key={item.id}
                data={item}
                />
                ))}
        </div>
    </div>
  )
}

export default Library