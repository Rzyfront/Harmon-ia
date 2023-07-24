
import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromimse: Promise<Stripe | null>;

export const getStripe = ()=>{
    if (!stripePromimse){
        stripePromimse = loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''
        );
    }
    return stripePromimse;
}