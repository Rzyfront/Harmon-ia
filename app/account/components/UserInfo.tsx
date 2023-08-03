'use client'

import { useUser } from "@/hooks/useUser";

function UserInfo() {

    const {user} = useUser();

    if (!user) {
        return  <div className=" flex flex-col ">
        <h2>Inicia Sesion</h2>
    </div>;
    }


  return (
    <div className=" flex flex-col my-4 items-center justify-center">
        <h2 key={user.id} className="  text-white text-xl">{user.user_metadata?.name}</h2>
        <h3 className="  text-white text-lg">{user.email}</h3>
    </div>
  )
}

export default UserInfo