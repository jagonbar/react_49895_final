import React, { useEffect, useState } from "react";
import { useCartContext } from "./CartContext";
import { Link } from "react-router-dom";

import { validaTextoIngresado } from "../utils/format.js";
const Checkout = () => {
    const { cart, totalPrice, totalProducts } = useCartContext();

    const [post, setPost] = useState(false);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirmacion, setEmailConfirmacion] = useState("");
    const [fono, setFono] = useState("");
    const [error, setError] = useState([false, ""]);
    const [idNewOrder, setIdNewOrder] = useState("");
    const [OKNewOrder, setOKNewOrder] = useState(false);

    if(totalProducts()==0){
        return (
            <div className="cart-content">
                <p>No hay productos agregados </p>
                <Link to="/">Ver catálogo</Link>
            </div>
        );
    }

    const doError = (txtError) => {
        console.log("error", { txtError });
        setError([validaTextoIngresado(txtError), txtError]);
    };
    const hayError = () => {
        return post && error[0]; //solo considerar error si hay posteo
    };
    const getError = () => {
        return error[1];
    };
    const doSubmit = () => {
        console.log("doSubmit");

        setPost(true); //registro que se hizo un post para considerar error de validaciones

        if (doValidation()) {
            doCheckout();
        }
    };
    const doValidation = () => {
        console.log("doValidation");
        const d = document;
        const txtNombre = d.getElementById("txtNombre").value;
        const txtApellido = d.getElementById("txtApellido").value;
        const txtEmail = d.getElementById("txtEmail").value;
        const txtEmailConfirmacion = d.getElementById(
            "txtEmailConfirmacion"
        ).value;
        const txtFono = d.getElementById("txtFono").value;

        setNombre(txtNombre);
        setApellido(txtApellido);
        setEmail(txtEmail);
        setEmailConfirmacion(txtEmailConfirmacion);
        setFono(txtFono);

        if (
            !validaTextoIngresado([
                txtNombre,
                txtApellido,
                txtEmail,
                txtEmailConfirmacion,
                txtFono,
            ])
        ) {
            doError("Debe completar todos los campos");
            return false; //Fin. No hay checkout
        }

        if (txtEmail !== txtEmailConfirmacion) {
            doError("Email no coincide");
            return false; //Fin. No hay checkout
        }
        doError("");

        //OK: Ya pasaron todas las validaciones
        return true;
    };
    const doCheckout = async (event) => {
        event.preventDefault();

        try {
            const cliente = {
                nombre,
                apellido,
                email,
                fono,
            };

            const newOrder = {
                cliente,
                items: cart.map((p) => {
                    return {
                        id: p.id,
                        cantidad: p.quantity,
                        nombre: p.productName,
                        precio: p.price,
                    };
                }),
                total: totalPrice(),
                fechaRegistro: new Date(),
            };
            const newId = await addDocument(newOrder, "orders");

            setIdNewOrder(newId); //idNewOrder
            setOKNewOrder(true);
        } catch (errorMessage) {
            doError(errorMessage);
        }
    };
    useEffect(() => {
        if (OKNewOrder) {
            setNombre("");
            setApellido("");
            setEmail("");
            setEmailConfirmacion("");
            setFono("");
            setIdNewOrder("");
            doError("");
        }
    }, [OKNewOrder]);

    return (
        <>
            {/* header */}
            <div className="contacto__header">
                <h1>Checkout Orden de Compra</h1>
            </div>

            {/* inicio contenido */}
            <div className="contacto">
                {/* subtitulo */}
                <div className="contacto__item contacto__img_box">
                    <h3>Completa tus datos para realizar orden compra.</h3>
                </div>
                {/* inicio formulario */}
                <div className="contacto__item contacto__form">
                    <form
                        id="frmOrdenCompra"
                        onSubmit={() => doCheckout(event)}
                    >
                        {/* 1ra linea */}
                        <div className="contacto__linea">
                            <div className="contacto__linea_control">
                                <input
                                    className="contacto__linea_control_input"
                                    type="text"
                                    placeholder="Nombre"
                                    id="txtNombre"
                                    name="txtNombre"
                                />
                            </div>
                            <div className="contacto__linea_control">
                                <input
                                    className="contacto__linea_control_input"
                                    type="text"
                                    placeholder="Apellido"
                                    id="txtApellido"
                                    name="txtApellido"
                                />
                            </div>
                        </div>
                        {/* fin 1ra linea */}
                        {/* 2da linea */}
                        <div className="contacto__linea">
                            <div className="contacto__linea_control">
                                <input
                                    className="contacto__linea_control_input"
                                    type="text"
                                    placeholder="Email"
                                    id="txtEmail"
                                    name="txtEmail"
                                />
                            </div>
                            <div className="contacto__linea_control">
                                <input
                                    className="contacto__linea_control_input"
                                    type="text"
                                    placeholder="Confirma tu Email"
                                    id="txtEmailConfirmacion"
                                    name="txtEmailConfirmacion"
                                />
                            </div>
                        </div>{" "}
                        {/* fin 2da linea */}
                        <div className="contacto__linea">
                            <div className="contacto__linea_control">
                                <input
                                    className="contacto__linea_control_input"
                                    type="text"
                                    placeholder="Fono"
                                    id="txtFono"
                                    name="txtFono"
                                />
                            </div>
                        </div>
                        {/* hacer checkout */}
                        <div className="contacto__linea">
                            <div className="contacto__linea_control">
                                {!hayError() && (
                                    <button
                                        id="btnCheckout"
                                        name="btnCheckout"
                                        className="contacto__linea_control_input"
                                        onClick={() => {
                                            doSubmit();
                                        }}
                                    >
                                        Realizar Compra{" "}
                                        <i
                                            className="fa fa-money"
                                            aria-hidden="true"
                                        ></i>
                                    </button>
                                )}
                            </div>
                        </div>
                        {/*fin hacer checkout */}
                        {/* hacer checkout */}
                        {hayError() && (
                            <div className="contacto__linea">
                                <div className="alert-box alert-box--error">
                                    {getError()}
                                </div>
                            </div>
                        )}
                        {OKNewOrder && (
                            <div className="contacto__linea">
                                <div className="alert-box alert-box--success">
                                    <i
                                        className="fa fa-check"
                                        aria-hidden="true"
                                    ></i>
                                    Compra realizada con exito. ID de orden de
                                    compra: <strong>{idNewOrder}</strong>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
                {/* fin formulario */}
            </div>
            {/* fin contenido */}
        </>
    );
};

export default Checkout;
