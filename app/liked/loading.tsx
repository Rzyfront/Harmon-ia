'use client'

import Box from "@/components/Box"
import { BounceLoader } from "react-spinners"

function loading() {
  return (
    <Box className=" h-full flex items-center justify-center ">
        <BounceLoader color='#005EFF' size={40}/>
    </Box>
  )
}

export default loading