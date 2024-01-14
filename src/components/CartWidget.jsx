import { useCartContext } from "./CartContext.jsx";

function CartWidget() {
  const {totalProducts} = useCartContext()
  return (
    <div id="cart">
        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
        &nbsp;
        <div id="numeroItems">{totalProducts()}</div>
    </div>
  )
}

export default CartWidget