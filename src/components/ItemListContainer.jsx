//(1)-- https://www.robinwieruch.de/react-hooks-fetch-data/
//(2)-- https://www.reactjs.wiki/como-puedes-cancelar-una-peticion-a-una-api-en-use-effect-correctamente

import { useState, useEffect } from "react";
import Item                    from "./Item.jsx";
import { useParams }           from "react-router-dom";
import { formateaPesos }       from "../utils/format.js";
import {queryCollection}       from "./firebase/firebase.utils.js";
export default function ItemListContainer({changeCategory, greeting }) {
    // console.log("debug-ItemListContainer");

    const [items, setItems] = useState([]);

    let { categoryId } = useParams();

console.log({changeCategory})
    // console.log({ categoryId });

    // useEffect
    useEffect(() => {
        // console.log("debug-ItemListContainer--useEffect");
        let fetchProducts = async () => {   
            let where = categoryId !== undefined?["categoryId", "==", categoryId]:[]         
            const productos = await queryCollection("product", where);
            console.log({productos})
            setItems(productos);
        }
        fetchProducts();
        /*(1)*/
        // const controller = new AbortController();
        // const { signal } = controller;

        // /*(2)*/
        // let fetchProducts = async () => {
        //     let data = await fetch("/data/products.json", { signal });
        //     let products = await data.json();

        //     let productsCategory = (categoryId !== undefined)? products.filter((p) => p.categoryId == categoryId): products;
            
        //     categoryId = (categoryId === undefined)?"/":categoryId;

        //     changeCategory(categoryId)

        //     setItems(productsCategory);
        // };
        // fetchProducts();

        // // Si se desmonta el componente, abortamos la petición
        // return () => controller.abort();
    }, [categoryId]);

    let itemParsed = [];
    for (let item of items) {
        // console.log("debug-ItemListContainer--for-items");
        let dataset = {};
        for (let atributo in item) {
            // console.log({atributo})
            dataset["data-" + atributo] = item[atributo];
        }

        // console.log({dataset})
        itemParsed.push(
            <Item
                key={item.id}
                nombre_juego={item.productName}
                imagen={item.imgSrc}
                precio={formateaPesos(parseInt(item.price))}
                descripcion={item.description}
                id={item.id}
                data={dataset}
            />
        );
    }

    // console.log({items})
    // console.log({itemParsed})
    return (
        <>
            <div className="games__title">
                <h1>{greeting}</h1>
            </div>
            <div className="games__content">                
                <div className="games__list">{itemParsed}</div>
                {/* ./games__list */}
            </div>
            {/* ./games__content */}
        </>
    );
}
