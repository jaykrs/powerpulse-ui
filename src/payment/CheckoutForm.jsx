import React from 'react';


import CardSection from './CardSection';

export default function CheckoutForm() {

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
   
  };

  return (
    <form onSubmit={handleSubmit}>
      
      <button >Confirm order</button>
    </form>
  );
}
