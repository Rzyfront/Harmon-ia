'use client'

import { Song } from "@/types"
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";

import {BsPauseFill,BsPlayFill} from "react-icons/bs"
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import {HiSpeakerXMark,HiSpeakerWave} from 'react-icons/hi2';
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import {formatTime} from '@/libs/helpers';

interface PlayerContentProps {
    song: Song;
    songUrl: string;
}
function PlayerContent({song, songUrl}: PlayerContentProps) {

    const player = usePlayer();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumenIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;
     const [currentTime, setCurrentTime] = useState(0);

    const onPlayNext = ()=>{
        if (player.ids.length===0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id)=> id === player.activeId);
        const nextSong = player.ids[currentIndex+1];

        if (!nextSong) {
            return player.setId(player.ids[0]);
        }

        player.setId(nextSong);
    }

    
    const onPlayPrevious = ()=>{
        if (player.ids.length===0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id)=> id === player.activeId);
        const previousSong = player.ids[currentIndex-1];

        if (!previousSong) {
            return player.setId(player.ids[player.ids.length - 1]);
        }

        player.setId(previousSong);
    };

    const [play, { pause, sound}] = useSound(songUrl, {
        volume:volume,
        onplay: () => setIsPlaying(true),
        onend: () => {
            setIsPlaying(false);
            onPlayNext();
        },
        onpause: () => setIsPlaying(false),
        format: ['mp3']
    })

    useEffect(() => {
        sound?.play();
         const interval = setInterval(() => {
      if (sound?.playing()) {
        setCurrentTime(sound.seek());
      }
    }, 1000);
      return () => {
        sound?.unload();
        clearInterval(interval);
      }
    }, [sound])


    const handlePlay = ()=>{
        if (!isPlaying) {
            play();
        }else{
            pause();
        }
    }

    const toggleMute = ()=>{
        if (volume === 0) {
            setVolume(1);
        }else{
            setVolume(0);
        }
    }

  return (
    <>
     <div
        className="
        relative
        w-full
      "
      >
        {/* Timeline input */}
        <input
          type="range"
          min={0}
          max={sound?.duration() || 0}
          value={currentTime}
          onChange={(e) => {
            setCurrentTime(Number(e.target.value));
            sound?.seek(Number(e.target.value));
          }}
          className="
          absolute
          top-[-10px]
          appearance-none
          w-full
          h-1
        bg-neutral-500
          outline-none
          cursor-pointer
          transition
        "
        />
      </div>
    
    <div className="
    grid
    grid-cols-2
    md:grid-cols-3
    h-full
    ">

        {/* Media Items */}
        <div className="
        flex
        w-full
        justify-start
        px-4
        ">
            <div className="
            flex
            items-center
            gap-x-4
            ">
                <MediaItem data={song}/>
                <LikeButton songId={song.id}/>

                <div className=" flex w-full h-5 items-center justify-between px-4">
                    <span className="mr-1 text-sm text-neutral-500">
                    {formatTime(currentTime)}
                    </span>
                    <span className="text-sm text-neutral-500">/</span>
                    <span className="ml-1 text-sm text-neutral-500">
                    {formatTime(sound?.duration() || 0)}
                    </span>
                </div> 
            </div>
        </div>
        {/* Play Controlls Mobile */}
        <div className="
        flex
        md:hidden
        col:auto
        w-full
        justify-end
        items-center
        px-4
        ">
            <div 
            onClick={handlePlay}
            className="
            h-10
            w-10
            flex
            items-center
            justify-center
            rounded-full
            bg-white
            p-1
            cursor-pointer
            ">
                <Icon size={30} className="text-black"/>
            </div>

        </div>
        {/* Play Controlls PC */}
        <div className="
        hidden
        h-full
        md:flex
        justify-center
        items-center
        w-full
        max-w-[722px]
        gap-x-6
        ">
            <AiFillStepBackward
            onClick={onPlayPrevious} 
            size={30}
            className="
            text-neutral-400
            cursor-pointer
            hover:text-white
            transition
            "/>
            <div
            onClick={handlePlay}
            className="
            h-10
            w-10
            flex
            items-center
            justify-center
            rounded-full
            bg-white
            p-1
            cursor-pointer
            ">
                <Icon size={30} className="text-black"/>
            </div>
            <AiFillStepForward
            onClick={onPlayNext} 
            size={30}
            className="
            text-neutral-400
            cursor-pointer
            hover:text-white
            transition
            "/>
        </div>
        {/* Volume Controlls */}
        <div className="
        hidden
        md:flex
        w-full
        justify-end
        pr-2
        ">
            <div className="
            flex
            items-center
            gap-x-2
            w-[120px]
            ">
            <VolumenIcon
            onClick={toggleMute}
            size={30}
            className="
            cursor-pointer
            "
            />
            <Slider
            value={volume}
            onChange={(value)=> setVolume(value)}
            />
            </div>
        </div>


       

    </div>
    </>
  )
}

export default PlayerContent