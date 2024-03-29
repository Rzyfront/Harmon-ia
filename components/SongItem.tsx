'use client'
import useLoadImage from '@/hooks/useLoadImage'
import { Song } from '@/types'
import Image from 'next/image'
import React from 'react'
import PlayButtom from './PlayButtom'

interface SongItemProps{
    data: Song,
    onClick: (id: string)=> void
}

function SongItem({data, onClick}: SongItemProps) {

    const imagePath = useLoadImage(data);

  return (
    <div
    title={data.title}
    onClick={() => onClick(data.id)} 
    className='
    relative
    group
    flex
    flex-col
    items-center
    justify-content
    rounded-md
    overflow-hidden
    gap-x-4
    bg-neutral-400/5
    cursor-pointer
    hover:bg-neutral-400/10
    transition
    p-3
    '
    >
        <div
        className='
        relative
        aspect-square
        w-full
        h-full
        rounded-md
        overflow-hidden
        '
        >
        <Image
        priority={true}
        className='object-cover'
        src={imagePath || 'images/liked.png'}
        alt='Image'
        fill
        sizes='100%'
        />
        </div>
        <div className='
        flex flex-col items-start w-full pt-4 gap-y-1
        '>
          <p className='
          font-semibold
          truncate
          w-full
          '>{data.title}</p> 
          <p className='
          text-neutral-400
          text-sm
          pb-4
          w-full
          '>{data.author}</p> 
        </div>
        <div title='Play song' className='
        absolute
        bottom-24
        right-5
        '>
            <PlayButtom/>
        </div>
    </div>
  )
}

export default SongItem