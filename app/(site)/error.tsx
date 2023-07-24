'use client'

import Box from "@/components/Box"


function error() {
  return (
    <Box className=" h-full flex items-center justify-center ">
        <div className="text-neutral-400">
            Something went wrong.
        </div>
    </Box>
  )
}

export default error