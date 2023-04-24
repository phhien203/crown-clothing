import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button, { BUTTON_TYPE_CLASS } from "../button/button.component";
import styled from "styled-components";

const PaymentFormContainer = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.form`
  height: 100px;
  min-width: 500px;
`;

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  async function paymentHandler(e) {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 10000 }),
    }).then((res) => res.json());

    const clientSecret = response.paymentIntent.client_secret;
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "Hien Pham",
        },
      },
    });

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Successful");
      }
    }
  }

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment</h2>
        <CardElement />
        <Button buttonType={BUTTON_TYPE_CLASS.inverted}>Pay now</Button>
      </FormContainer>
    </PaymentFormContainer>
  );
}
