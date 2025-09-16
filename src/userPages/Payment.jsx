
import { loadStripe } from '@stripe/stripe-js';
import CheckOutForm from '../components/CheckOutForm';
import { Elements } from '@stripe/react-stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_LOAD_STRIPE_KEY);
const Payment = () => {
    return (
          <Elements stripe={stripePromise}>
      <CheckOutForm />
    </Elements>
    );
};

export default Payment;