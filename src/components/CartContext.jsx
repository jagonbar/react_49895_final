import React, { useState, useContext, useEffect } from "react";

const CartContext = React.createContext("");
export const useCartContext = () => React.useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    
    useEffect(() => {
        console.log("************cart");
        console.log({ cart });
    }, [cart]);

    const updateStock = (id)=>{
        console.log("actualiza stock!!!!");
    }
    /**
     * Agrega un producto al carrito si aún no está presente.
     *
     * @param {Object} item - El producto que se va a agregar al carrito.
     * @param {number} quantity - La cantidad del producto que se va a agregar.
     */
    const addProduct = (item, quantity) => {
        const newCart = cart.filter((p) => p.productId !== item.productId);
        const updatedCart = [...newCart, { ...item, quantity: quantity }];
        console.log("************updatedCart")
        console.log({updatedCart})
        setCart(updatedCart);
        
    }
    

    /**
     * Verifica si un producto con el id dado está en el carrito.
     *
     * @param {number} id - El id del producto a verificar.
     * @return {boolean} Retorna true si el producto está en el carrito, false en caso contrario.
     */
    const isIncart = (id) => {
        cart.find((product) => product.id === id) ? true : false;
    };

    /**
     * Calcula el número total de productos en el carrito.
     *
     * @return {number} El número total de productos.
     */
    const totalProducts = () => {
        return cart.length === 0? 0
            : cart.reduce((acumulador, productoActual) =>acumulador + productoActual.quantity,0);
    };

    const totalPrice = () => {
        return cart.length === 0? 0: cart.reduce((prev, act) => prev + act.price * act.quantity, 0);
    };

    /**
     * Limpia el carrito estableciéndolo como un array vacío.
     *
     * @return {undefined} - Sin valor de retorno.
     */
    const clearCart = () => {
        setCart([]);
    };

    /**
     * Remueve un producto del carrito basado en su ID.
     *
     * @param {number} id - El ID del producto a remover.
     */
    const removeProduct = (id) => {
        setCart(cart.filter((product) => product.productId !== id));
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addProduct,
                isIncart,
                totalProducts,
                totalPrice,
                clearCart,
                removeProduct,
            }}
        >
            {" "}
            {children}
        </CartContext.Provider>
    );
};
