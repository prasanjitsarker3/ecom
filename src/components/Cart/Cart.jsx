import React from 'react';
import './Cart.css';

const Cart = ({cart}) => {
    let total=0;
    let totalShipping=0;
    let quantity=0;
    for(const product of cart){
        product.quantity=product.quantity || 1;
        total=product.price+total*product.quantity;
        totalShipping=product.shipping+totalShipping*product.quantity;
        quantity=quantity+product.quantity;
    }
    const tax=total*7/100;
    const grandTotal=total+totalShipping+tax;
    const grandTotalFixed=grandTotal.toFixed(2);
    return (
        <div className='cart'>
            <h4>Order Summary: {cart.length}</h4>
            <p>Total Price: ${total}</p>
            <p>Total Shipping: ${totalShipping}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <h4>Grand Total: ${grandTotalFixed}</h4>
        </div>
    );
};

export default Cart;