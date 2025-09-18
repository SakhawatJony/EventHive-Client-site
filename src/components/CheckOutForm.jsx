


import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useMyBooking from '../customHook/useMyBooking';
import { useEffect, useState } from 'react';
import useAxiosPublic from '../customHook/useAxiosPublic';
import useAuth from '../customHook/useAuth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const CheckOutForm = () => {
    const [bookedEvents,refetch]=useMyBooking()
    const axiosPublic=useAxiosPublic()
    const[clientSecret,setClientSecret]=useState('')
    const[error,setError]=useState('')
    const[transactionId,setTransactionId]=useState('')
    const{user}=useAuth()
    const navigate=useNavigate()
     const stripe = useStripe();
  const elements = useElements();
const totalPrice=bookedEvents.reduce((total,item)=>total+item?.price,0)
useEffect(()=>{
    if(totalPrice>0){
        axiosPublic.post('/create-payment-intent',{price:totalPrice})
        .then(res=>{
            console.log(res.data.clientSecret)
            setClientSecret(res.data.clientSecret)
        })
    }
},[axiosPublic,totalPrice])
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setError(error.message)
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setError('')
    }
    const{paymentIntent,error:confirmError}=await stripe.confirmCardPayment(clientSecret,{
        payment_method:{
            card:card,
            billing_details:{
                email:user?.email || 'anonymous',
                name:user?.displayName || 'anonymous'
            }
        }
    })
    if(confirmError){
        console.log('Confirm Error')
    }else{
        console.log('PaymentIntent : ',paymentIntent)
        if(paymentIntent.status==='succeeded'){
            console.log('Transaction Id : ',paymentIntent.id)
            setTransactionId(paymentIntent.id)

            const payment={
                email:user?.email,
                price:totalPrice,
                transactionId:paymentIntent.id,
                date:new Date(),
                eventIds:bookedEvents.map(event=>event?._id),
                status:'pending'
            }
            axiosPublic.post('/payments',payment)
            .then(res=>{
                console.log(res.data)
                if(res.data?.paymentResult?.insertedId){
                    Swal.fire({
  position: "center",
  icon: "success",
  title: "Your Payment is SuccessFully Paid",
  showConfirmButton: false,
  timer: 2000
});
refetch()
navigate('/paymentHistory')
                }
                
            })
        }
    }
  };

    return (
        <div className='pt-48 pb-12 mx-12 sm:mx-24'>
                <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className='btn btn-primary mt-4' type="submit" disabled={!stripe}>
        Pay
      </button>
      <p className='text-xl text-red-500'>{error}</p>
      {
        transactionId && <p>Your Transaction Id : {transactionId}</p>
      }
    </form>
        </div>
    );
};

export default CheckOutForm;