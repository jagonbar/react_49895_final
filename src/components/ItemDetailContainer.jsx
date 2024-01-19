import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formateaPesos } from "../utils/format.js";
import { useCartContext } from "./CartContext.jsx";
import { queryDocument, addDocument } from "./firebase/firebase.utils.js";
export default function ItemDetailContainer() {
    console.log("debug-ItemDetailContainer--init");

    const {addProduct} = useCartContext();
    let [item, setItem] = useState({});
    let [quantity, setQuantity] = useState(0);

    let { productId } = useParams();

    // useEffect
    useEffect(() => {
        console.log("debug-ItemDetailContainer--useEffect");
        console.log({productId})   

        let fetchProduct = async() => {
            const product = await queryDocument('product',productId)
            console.log({id:productId,...product});
            setItem({id:productId,...product});
        }
        fetchProduct();
        // const controller = new AbortController();
        // const { signal } = controller;

        // let fetchProduct = async () => {
        //     let data = await fetch("/data/products.json", { signal });
        //     let products = await data.json();
        //     console.table(products);
        //     let product = products.find(
        //         (p) => p.productId == parseInt(productId)
        //     );

        //     console.log(
        //         "-------------------------------------------------------------------"
        //     );
        //     console.log({ product });
        //     setItem(product);
        // };
        // fetchProduct();

        // return () => controller.abort();
    }, [productId]);

    const addTemporalProduct       = () => {
        if(quantity<item.stock){
            setQuantity(++quantity)
        }        
    };

    const removeTemporalProduct    = () => {
        if(quantity>0){
            setQuantity(--quantity)
        }
    };
    const addProductToCart = () => {
        const cartItem = {...item};
        addProduct(cartItem, quantity);
        setQuantity(0);
    };

    return (
        <div className="item--layout">
            <div className="item--detail-box">
                <div className="item--title">
                    <h1>{item.productName}</h1>
                    <img src={item.imgSrc} alt={"cover" + item.productName} />
                </div>

                <div className="item--detail item--codes">
                    Id : #{item.productId} | category: {item.categoryId}
                </div>
                <div className="item--detail item--price">
                    {formateaPesos(parseInt(item.price))}
                </div>
                <div className="item--detail item--description">
                    {item.description}
                </div>
                <div className="item--detail item--count">
                    {/* <label htmlFor="">Agregados:&nbsp;</label>
                    <span className="item--count-number">0</span> */}
                    
                    {/* &nbsp;{item.quantity || 0} agregado
                    {item.quantity > 0 ? "s" : ""} de {item.stock} disponibles */}
                </div>
                <div className="item--detail item--options">                    
                    <div className="item--btn-box">                    
                        <table className="item--count-table">
                            <tbody>
                                <tr>
                                    <td className="item--count-btn">
                                        <button className="btn-count" onClick={addTemporalProduct}>
                                            <i className="fa fa-plus" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                    <td className="item--counter" >
                                        {quantity}
                                    </td>
                                    <td className="item--count-btn">
                                        <button className="btn-count" onClick={removeTemporalProduct}>
                                            <i className="fa fa-minus" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                    {quantity>0?(
                                        <td className="item--total" >
                                        {formateaPesos(parseInt(item.price)*quantity)}
                                        </td>
                                    ):(<td></td>)}                                
                                </tr>
                            </tbody>
                        </table>
                        Disponibles {item.stock}
                    </div>
                    <div className="item--btn-box">
                        {quantity>0?(
                            <button
                                className="item--btn item--btn-add"
                                onClick={addProductToCart}>
                                <i className="fa fa-cart-plus" aria-hidden="true"></i>
                                Agregar {quantity}</button>)
                            : (
                                <span></span>
                            )
                        }                        
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
