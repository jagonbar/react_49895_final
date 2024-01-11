import React from "react";

export const ContactForm = () => {
    return (
        <>
            <div className="contacto__header">
                <h1>¿Tienes dudas o problemas? ... cont&aacute;ctanos</h1>
            </div>
            <div className="contacto">
                <div className="contacto__item contacto__img_box">
                    <h2>
                        Necesitamos tus datos para ayudarte
                        <i className="fa fa-smile-o" aria-hidden="true"></i>
                    </h2>
                    <h3>Completa formulario para atenderte</h3>
                </div>
                <div className="contacto__item contacto__form">
                    <form>
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
                                    placeholder="Fono"
                                    id="txtFono"
                                    name="txtFono"
                                />
                            </div>
                        </div>

                        <div className="contacto__linea">
                            <div className="contacto__linea_control">
                                <select
                                    className="contacto__linea_control_input"
                                    id="slcMotivo"
                                    name="slcMotivo"
                                >
                                    <option value="">
                                        [motivo de tu consulta]
                                    </option>
                                    <option value="informacion">
                                        Información
                                    </option>
                                    <option value="reclamo">Reclamo</option>
                                </select>
                            </div>
                        </div>
                        <div className="contacto__linea">
                            <div className="contacto__linea_control">
                                <textarea
                                    id="txtConsulta"
                                    name="txtConsulta"
                                    className="contacto__linea_control_input"
                                    placeholder="Escribe tu consulta aca :)"
                                ></textarea>
                            </div>
                        </div>
                        <div className="contacto__linea">
                            <div className="contacto__linea_control">
                                <button
                                    id="btnEnviarConsulta"
                                    name="btnEnviarConsulta"
                                    className="contacto__linea_control_input"
                                >
                                    Envía consulta
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
