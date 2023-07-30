'use client'

import { Price, ProductWithPrice } from "@/types";
import Modal from "./Modal"
import Button from "./Button";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-hot-toast";
import { postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripeClient";
import useSubscribeModal from "@/hooks/useSubscribeModal";

interface SubscribeModalProps {
  products: ProductWithPrice[];
}

const formatPrice = (price:Price) =>{
  const priceString = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency,
    minimumFractionDigits: 0
  }).format((price?.unit_amount || 0) / 100);

  return priceString;
}

function SubscribeModal({products}: SubscribeModalProps) {

const subscribeModal = useSubscribeModal();
const [priceIdLoading, setPriceIdLoading] = useState<string>();
const {user , isLoading, subscription} = useUser();

const onChange = (open: boolean) => {
  if (open) {
    subscribeModal.onClose;
  }
}

const handleCheckout = async (price:Price) => {
  setPriceIdLoading(price.id);
  console.log('handleCheck');

  if(!user){
  setPriceIdLoading(undefined);
  return toast.error('Must be logged in');
  }


  if(subscription){
    setPriceIdLoading(undefined);
    return toast.success('Already subscribed');
  }

  try {
    const {sessionId} = await postData({
      url: '/api/create-checkout-session',
      data: {price}
    })

    const stripe = await getStripe();
    stripe?.redirectToCheckout({sessionId});
    
  } catch (error: any) {
    toast.error((error as Error)?.message);
  }finally{
    setPriceIdLoading(undefined);
  }
}

    let content = (
        <div className=" text-center">
            No products avaliable.
        </div>
    )
    
    if(products.length){
      content = (
        <div>
          {
            products.map((product) =>{
              if (!product.prices?.length) {
                return (
                  <div key={product.id}>
                    No prices avaliable
                  </div>
                )
              }

              return product.prices.map((price)=>{
                return (
                  <Button 
                  className=" mb-4 active:bg-neutral-500" 
                  key={price.id}
                  disabled={isLoading || price.id === priceIdLoading}
                  onClick={()=>handleCheckout(price)}
                  >
                    {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
                  </Button>
                )})
            })//key map
          }
        </div>
      )
    }

    if (subscription) {
      content=(
        <div className=" text-center">
          Already subscribed
        </div>
      )
    }
    
  return (
    <Modal
    title="Only for VIP users"
    description="Listen to music with Harmon-IA VIP"
    isOpen={subscribeModal.isOpen}
    onChange={onChange}
    
    >
        {content}
    </Modal>
  )
}

export default SubscribeModal