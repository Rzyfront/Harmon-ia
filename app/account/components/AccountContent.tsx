'use client'

import Button from "@/components/Button";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helpers";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import usePlayer from '@/hooks/usePlayer';
import { toast } from "react-hot-toast";

function AccountContent() {

    const router = useRouter();
    const subscribeModal = useSubscribeModal();
    const {isLoading, subscription, user} = useUser();
    const [loading, setLoading] = useState(false);
    const  supabaseClient = useSupabaseClient();
    const player = usePlayer();

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

    useEffect(()=>{
        if(!isLoading && ! user) router.replace('/');
    },[isLoading, user, router])


    const redirectToCustomerPortal =async () => {
        setLoading(true);
        try {
            const {url, error} = await postData({
                url: '/api/create-portal-link'
            });
            window.location.assign(url);

        } catch (error) {
            if (error) {
                toast.error((error as Error).message)
            }
            setLoading(false);
        }
    }

    let year;
    let month;
    let day;
    let hour;
    let minute;


    if (subscription) { 
        const subscriptionDate = new Date(subscription.current_period_end);
        console.log(subscriptionDate)
        year = subscriptionDate.getFullYear();
        month = subscriptionDate.getMonth() + 1;
        day = subscriptionDate.getDate();
        
        hour = subscriptionDate.getHours();
        minute = subscriptionDate.getMinutes();
       
    }

  return (
    <div className=" flex items-center justify-center mb-7 px-6">
        {!subscription && (
            <div className=" flex flex-col gap-y-4">
                <p>No active plan.</p>
                <Button title="Subscribe" className=" w-[300px]" onClick={subscribeModal.onOpen}>
                    Subscribe
                </Button>
            </div>
        )}
        {subscription && (
            <div className=" flex flex-col gap-y-6 items-center justify-center">
                <p>You are currently on the <b>{subscription?.prices?.products?.name}</b> plan.</p>
                <p className=" text-blue-500 hover:text-red-500 active:text-red-500 cursor-pointer">Your subscription will expire: {day}/{month}/{year} at {hour}:{minute}
                </p>
                <Button title="Customer Portal" className=" w-[300px]" onClick={redirectToCustomerPortal}
                disabled={loading || isLoading}>
                    Open customer portal
                </Button>
                <Button
                title="Logout"
                onClick={handleLogout}
                className='
                bg-white
                px-1
                py-1
                w-[200px]
                '
                >
                Logout
                </Button>
            </div>
        )}
    </div>
  )
}

export default AccountContent