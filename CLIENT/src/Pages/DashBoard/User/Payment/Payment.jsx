/* eslint-disable no-unused-vars */

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckOutForm";

import { useEffect, useState } from "react";
import useCart from "../../../../Hooks/useCart";
import { toast } from "react-toastify";
import axios from "axios";

// Load Stripe key once
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const [cart] = useCart();
  const [clientSecret, setClientSecret] = useState();

  const price = cart.reduce((total, item) => total + item.price, 0);
  const amountInCents = Math.round(price * 100);

  useEffect(() => {
    if (amountInCents > 0) {
      axios
        .post(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
          amountInCents,
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => toast.error(err.message));
    }
  }, [amountInCents]);
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gray-50">
      <Elements stripe={stripePromise}>
        <CheckoutForm clientSecret={clientSecret} cart={cart} />
      </Elements>
    </div>
  );
};

export default Payment;
