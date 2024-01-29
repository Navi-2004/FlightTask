import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const Stripe = () => {
    const publishableKey='pk_test_51OdlCuSFfBij0ekrxB8KgUsE3i7Mu3vHtOBwnsJcKrPiMrSZCnEk6kzrj00z175aHNTAdKc49WDvMPxSjnSU9ZYH00M9ziMs4W'
  return (
    <div>
         <StripeCheckout
        stripeKey={publishableKey}
        label="Pay Now"
        name="Pay With Credit Card"
        billingAddress
        shippingAddress
        amount={priceForStripe}
        // description={`Your total is $${product.price}`}
        token={payNow}
      />

    </div>
  )
}

export default Stripe