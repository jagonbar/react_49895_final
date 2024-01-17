import { useCartContext } from "./CartContext";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { formateaPesos } from "../utils/format.js";
const Cart = () => {
    const { cart, totalPrice, totalProducts } = useCartContext();


    console.log("cariito",{ cart });
    if (totalProducts() == 0) {
        return (
            <div className="cart-content">
                <p>No hay productos agregados </p>
                <Link to="/">Ver catálogo</Link>
            </div>
        );
    }
    let itemCart =[];
    let index=0
    for(let item of cart){
        ++index;
        itemCart.push(
            <CartItem 
            key={item.productId}
            itemIndex   ={index}
            itemName    ={item.productName}
            itemPrice   ={item.price}
            itemQuantity={item.quantity}
            itemTotal   ={item.price * item.quantity}
            />
        )
    }
    return(
        <div className="cart-content">
            
            <Link to="/checkout">Realizar compra</Link>

            <table className="cart-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Item</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>                    
                    {itemCart}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="4">{totalProducts()} items. Total</td>
                        <td>{formateaPesos(totalPrice())}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default Cart;
