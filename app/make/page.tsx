'use client'

import Box from "@/components/Box"
import Button from "@/components/Button"
import Header from "@/components/Header"
import { useRouter } from "next/navigation"


function Make() {

  const router = useRouter();
  const handlerCLick = ():void => {
    router.replace('/');
  }
  return (
    <div 
    className="
  bg-neutral-900
    rounded-lg
    h-full
    w-full
    overflow-hidden
    overflow-y-auto">
      <Header>
        <h1 className="
        text-white
        text-xl
        md:text-3xl
        font-semibold
        my-5
        mx-1
        ">
          Make your self songs here
        </h1>
      </Header>
       <Box className="flex items-center justify-center ">
        <div className=" h-full flex flex-col gap-3 my-32 items-center justify-center text-neutral-400">
            <p>This tools no is avaliable</p>
            <p>Come back soon</p>
            <Button
            onClick={handlerCLick}
            >
              Go to home
            </Button>
        </div>
    </Box>
    </div>
  )
}

export default Make