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
  }

  return (
    <PaymentFormContainer>
      <FormContainer>
        <h2>Credit Card Payment</h2>
        <CardElement />
        <Button buttonType={BUTTON_TYPE_CLASS.inverted}>Pay now</Button>
      </FormContainer>
    </PaymentFormContainer>
  );
}
