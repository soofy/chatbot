import React, { createContext, useReducer, useContext } from 'react'
import { faker } from '@faker-js/faker';
import { cartReducer } from './Reducer';

export const CartContext = createContext();

function Context({children}) {

    const productsArray = [...Array(20)].map(()=>({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
         email: faker.internet.email(),
         price: faker.commerce.price(),
         image:faker.image.avatar()
 }));

debugger;
 const [state, dispatch ] = useReducer(cartReducer, { products: productsArray, cart : []})

 console.log(productsArray);
 

  return (
    <CartContext.Provider value={{state, dispatch}}>{children}</CartContext.Provider>
  )
}

export default Context

export const  CartState = ()=>{
  return useContext(CartContext);
}

