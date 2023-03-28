import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);
    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart=[];
        //Step 1: Get Id of the addedProduct
        for (const id in storedCart) {
            // Step 2:get Product from products state by using id
            const addProduct = products.find(product => product.id == id);
            if (addProduct) {
                //step 4: add quantity
                const quantity = storedCart[id];
                addProduct.quantity = quantity;
                //step 4: add the added product to the saved cart
                savedCart.push(addProduct)
            }

        }
        //step 5: set the cart
        setCart(savedCart);
    }, [products])
    const handleAddToCart = (product) => {
        //   cart.push(product);
        // const newCart = [...cart, product];
        let newCart=[];
        const exists=cart.find(pd=>pd.id===product.id);
        if(!exists){
            product.quantity=1;
            newCart=[...cart, product]
        }
        else{
            exists.quantity=exists.quantity+1;
            const remaining=cart.map(pd=>pd.id !==product.id);
            newCart=[...remaining,exists];
        }
        setCart(newCart);
        addToDb(product.id);
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product key={product.id} product={product} handleAddToCart={handleAddToCart}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;