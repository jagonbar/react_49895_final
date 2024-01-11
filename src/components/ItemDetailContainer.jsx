import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formateaPesos } from "../utils/format.js";
export default function ItemDetailContainer() {
    console.log("debug-ItemDetailContainer--init");

    let [item, setItem] = useState({});

    let { productId } = useParams();

    // useEffect
    useEffect(() => {
        console.log("debug-ItemDetailContainer--useEffect");

        const controller = new AbortController();
        const { signal } = controller;

        let fetchProduct = async () => {
            let data = await fetch("/data/products.json", { signal });
            let products = await data.json();
            console.table(products);
            let product = products.find(
                (p) => p.productId == parseInt(productId)
            );

            console.log(
                "-------------------------------------------------------------------"
            );
            console.log({ product });
            setItem(product);
        };
        fetchProduct();

        return () => controller.abort();
    }, [productId]);

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
                <div className="item--detail  item--count">
                    <label htmlFor="">Agregados:&nbsp;</label>
                    <span className="item--count-number">0</span>
                </div>
                <div className="item--detail item--options">
                    <button className="item--btn item--btn-add">
                        <i className="fa fa-cart-plus" aria-hidden="true"></i>
                        Agregar
                    </button>
                    <button className="item--btn item--btn-del">
                        <i
                            className="fa fa-cart-arrow-down"
                            aria-hidden="true"
                        ></i>
                        Quitar
                    </button>
                </div>
            </div>
        </div>
    );
}
