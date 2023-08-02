'use client'


import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Modal from "./Modal"
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect } from "react";


function AuthModal() {

    const supabaseClient =  useSupabaseClient();
    const router = useRouter();
    const {session} = useSessionContext();
    const {onClose, isOpen} = useAuthModal();

    useEffect(()=>{
        if (session) {
            router.refresh();
            onClose();
        }

    },[router,session,onClose])

    const onChange = (open: boolean) => {
        if(!open){
            onClose();
        }
    }

  return (
    <Modal
    title="Welcome to Harmon-ia"
    description="Login to your account"
    isOpen={isOpen}
    onChange={onChange}
    >
        <Auth
        theme="dark"
        providers={['github','google']}
        supabaseClient={supabaseClient}
        appearance={{
             style: {
        button: { background: '#3B82F6', color: 'white'},
        anchor: { color: 'white' },
        //..
      },
            theme: ThemeSupa,
            variables:{
                default:{
                    colors:{
                        brand: '#404040',
                        brandAccent: '#005EFF',
                    }
                }
            }
        }}
        />
    </Modal>
  )
}

export default AuthModal