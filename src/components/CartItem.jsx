import React from 'react'
import { useCartContext } from "./CartContext.jsx";
import { formateaPesos } from "../utils/format.js";
const CartItem = ({
    itemIndex
    ,itemName
    ,itemPrice
    ,itemQuantity
    ,itemTotal}) => {
    const {removeProduct} = useCartContext()
  
    return (    
    <tr className='cart-item-detail'>
        <td className="cart-item-index"   >{itemIndex}   </td>
        <td className="cart-item-name"    >{itemName}    </td>
        <td className="cart-item-price price-cell"   >{formateaPesos(itemPrice)}   </td>
        <td className="cart-item-quantity price-cell">{itemQuantity}</td>
        <td className="cart-item-total price-cell"   >{formateaPesos(itemTotal)}   </td>
        <td className="cart-item-actions" >
            <button onClick={() => removeProduct(itemIndex)}>
                <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
        </td>
    </tr>
  )
}

export default CartItem