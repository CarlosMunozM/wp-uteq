import React, { useState, useRef } from 'react';
import {
    IMAGES_ADMISSION_FOLDER,
    WS_REGISTER_SUPPORT_TICKET_ADMS,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    WS_VALIDATE_FORM
} from 'config';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from "axios";

export { BodyContactoAdm };

function BodyContactoAdm(data) {

    const formContacAdms = useRef();

    const validationSchema = Yup.object().shape({
        tcNombreComp: Yup.string().min(2, (data.language === "es" ? "La longitud mínima de carácteres es 2" : (data.language === "en" ? "The minimum character length is 2" : "O comprimento mínimo dos caracteres é de 2"))).max(190, (data.language === "es" ? "La longitud máxima de carácteres es 190" : (data.language === "en" ? "The maximum character length is 190" : "O comprimento máximo dos caracteres é de 190"))).required((data.language === "es" ? "El campo nombre completo es requerido" : (data.language === "en" ? "The full name field is required" : "O campo do nome completo é obrigatório"))),
        tcCorreoElect: Yup.string().min(5, (data.language === "es" ? "La longitud mínima de carácteres es 5" : (data.language === "en" ? "The minimum character length is 5" : "O comprimento mínimo dos caracteres é de 5"))).max(148, (data.language === "es" ? "La longitud máxima de carácteres es 148" : (data.language === "en" ? "The maximum character length is 148" : "O comprimento máximo dos caracteres é de 190"))).required((data.language === "es" ? "El campo correo electrónico es requerido" : (data.language === "en" ? "The email field is required" : "O campo de e-mail é obrigatório"))).email((data.language === "es" ? "El correo electrónico ingresado no es válido" : (data.language === "en" ? "The e-mail address entered is invalid" : "O endereço de e-mail introduzido é inválido"))),
        tcMensaje: Yup.string().min(2, (data.language === "es" ? "La longitud mínima de carácteres es 2" : (data.language === "en" ? "The minimum character length is 2" : "O comprimento mínimo dos caracteres é de 2"))).max(1000, (data.language === "es" ? "La longitud máxima de carácteres es 1000" : (data.language === "en" ? "The maximum character length is 1000" : "O comprimento máximo dos caracteres é de 1000"))).required((data.language === "es" ? "El campo mensaje es requerido" : (data.language === "en" ? "The message field is required" : "O campo da mensagem é obrigatório")))
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mesg, setMesg] = useState("");
    const [tpmsg, setTpmsg] = useState(0);

    const onSubmit = async (dataForm) => {
        var message = '', tipomes = 0;

        setIsSubmitting(true);
        window.grecaptcha.ready(() => {
            window.grecaptcha
                .execute(NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: "submit" })
                .then(async (token) => {

                    try {
                        await axios.post(`${WS_VALIDATE_FORM}${token}`).then(function (response) {
                            if (response.data === "OK") {
                                axios.post(WS_REGISTER_SUPPORT_TICKET_ADMS, new URLSearchParams({
                                    tcNombreComp: dataForm.tcNombreComp,
                                    tcCorreoElect: dataForm.tcCorreoElect,
                                    tcDestinatario: "soporteadmision@uteq.edu.ec",
                                    tcAsunto: "TICKET DE SOPORTE",
                                    tcMensaje: dataForm.tcMensaje
                                })).then(function (response) {
                                    switch (response.data) {
                                        case "NMBVCO":
                                            message = (data.language === "es" ? "El campo nombre completo es requerido" : (data.language === "en" ? "The full name field is required" : "O campo do nome completo é obrigatório"));
                                            tipomes = 1;
                                            break;
                                        case "NMBLIN":
                                            message = (data.language === "es" ? "La longitud del campo nombre completo no es válida" : (data.language === "en" ? "The length of the full name field is invalid" : "O comprimento do campo do nome completo é inválido"));
                                            tipomes = 1;
                                            break;
                                        case "CELVCO":
                                            message = (data.language === "es" ? "El campo correo electrónico es requerido" : (data.language === "en" ? "The email field is required" : "O campo de e-mail é obrigatório"));
                                            tipomes = 1;
                                            break;
                                        case "CELLIN":
                                            message = (data.language === "es" ? "La longitud del campo correo electrónico no es válida" : (data.language === "en" ? "The length of the e-mail field is invalid" : "O comprimento do campo do e-mail é inválido"));
                                            tipomes = 1;
                                            break;
                                        case "DESVCO":
                                            message = (data.language === "es" ? "El campo destinario es requerido" : (data.language === "en" ? "The target field is required" : "O campo alvo é obrigatório"));
                                            tipomes = 1;
                                            break;
                                        case "ASTVCO":
                                            message = (data.language === "es" ? "El campo asunto es requerido" : (data.language === "en" ? "The subject field is required" : "O campo do assunto é obrigatório"));
                                            tipomes = 1;
                                            break;
                                        case "ASTLIN":
                                            message = (data.language === "es" ? "La longitud del campo asunto no es válida" : (data.language === "en" ? "The length of the subject field is invalid" : "O comprimento do campo de assunto é inválido"));
                                            tipomes = 1;
                                            break;
                                        case "MSJVCO":
                                            message = (data.language === "es" ? "El campo mensaje es requerido" : (data.language === "en" ? "The message field is required" : "O campo da mensagem é obrigatório"));
                                            tipomes = 1;
                                            break;
                                        case "MSJLIN":
                                            message = (data.language === "es" ? "La longitud del campo mensaje no es válida" : (data.language === "en" ? "The length of the message field is invalid" : "O comprimento do campo da mensagem é inválido"));
                                            tipomes = 1;
                                            break;
                                        case "SUGREX":
                                            reset();
                                            message = (data.language === "es" ? "Recibido en el buzón de tickets de soporte" : (data.language === "en" ? "Received in the support ticket inbox" : "Recebido na caixa de entrada de tickets de suporte"));
                                            tipomes = 2;
                                            break;
                                    }
                                    setMesg(message);
                                    setTpmsg(tipomes);
                                    setIsSubmitting(false);
                                }).catch(function (error) {
                                    setMesg(error);
                                    setTpmsg(1);
                                    setIsSubmitting(false);
                                })
                            } else {
                                message = (data.language === "es" ? "La validación de la herramienta Recaptcha no se completó correctamente." : (data.language === "en" ? "The validation of the Recaptcha tool was not completed correctly." : "A validação da ferramenta Recaptcha não foi completada correctamente."));
                                setMesg(message);
                                setTpmsg(1);
                                setIsSubmitting(false);
                            }
                        }).catch(function (error) {
                            setMesg(error);
                            setTpmsg(1);
                            setIsSubmitting(false);
                        })
                    } catch (error) {
                        setMesg(error.message);
                        setTpmsg(1);
                        setIsSubmitting(false);
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                    setMesg(error.message);
                    setTpmsg(1);
                    setIsSubmitting(false);
                });
        });

        return false;
    }

    const onResetClick = () => {
        reset();
        setMesg("");
        setTpmsg(0);
        setIsSubmitting(false);
    }

    return (<>
        <div className="col-md-12">
            <div className="hero-wrap" style={{ backgroundImage: `url(${IMAGES_ADMISSION_FOLDER}background-contact.webp)` }}>
                <div className="container-fluid p-0">
                    <div className="row g-0 slider-text align-items-center justify-content-end" data-scrollax-parent="true">
                        <div className="col-md-4 ftco-animate">
                            <h1 className="mb-4">{data.language === "es" ? "Soporte" : (data.language === "en" ? "Academic" : "Suporte")} <br /><span>{data.language === "es"
                                ? "académico"
                                : (data.language === "en"
                                    ? "support"
                                    : "acadêmico")} <i className="fa fa-cogs" aria-hidden="true"></i></span></h1>
                        </div>
                    </div>
                </div>
            </div>

            <section className="section-contact-1">
                <div className="container">
                    <div className="row text-center m-4">
                        <h2>{(data.language === "es" ? "Consultas sobre el proceso de admisión" : (data.language === "en" ? "Queries about the admission process" : "Consultas sobre o processo de admissão"))}</h2>
                    </div>
                    <div className="row mt-4">
                        {/* Columna izquierda: Imagen */}
                        <div className="col-md-6 d-flex justify-content-center align-items-center">
                            <div className="ratio ratio-1x1">
                                <img src={`${IMAGES_ADMISSION_FOLDER}soporte-tecnico-admision.png`} alt="Imagen de contacto" />
                            </div>
                        </div>

                        {/* Columna derecha: Formulario */}
                        <div className="col-md-6" id="form-tck-supp" ref={formContacAdms}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <label htmlFor="fullName" className="form-control-label">{(data.language === "es" ? "Nombre completo *" : (data.language === "en" ? "Full name *" : "Nome completo *"))}</label>
                                    <input type="text" className={`form-control ${errors.tcNombreComp ? 'is-invalid' : ''}`} id="fullName" name="tcNombreComp" {...register('tcNombreComp')} minLength={2} maxLength={190} placeholder={(data.language === "es" ? "Ingresa tu nombre completo" : (data.language === "en" ? "Enter your full name" : "Introduza o seu nome completo"))} data-error={(data.language === "es" ? "El nombre completo es requerido" : (data.language === "en" ? "Full name is required" : "O nome completo é obrigatório"))} />
                                    <div className="invalid-feedback">{errors.tcNombreComp?.message}</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="form-control-label">{(data.language === "es" ? "Correo electrónico *" : (data.language === "en" ? "E-mail" : "Endereço de correio electrónico"))}</label>
                                    <input type="email" id="email" className={`form-control ${errors.tcCorreoElect ? 'is-invalid' : ''}`} name="tcCorreoElect" {...register('tcCorreoElect')} minLength={5} maxLength={148} placeholder={(data.language === "es" ? "Ingresa tu correo electrónico" : (data.language === "en" ? "Enter your email address" : "Introduza o seu endereço de correio electrónico"))} data-error={(data.language === "es" ? "El correo electrónico es requerido" : (data.language === "en" ? "Email is required" : "O e-mail é necessário"))} />
                                    <div className="invalid-feedback">{errors.tcCorreoElect?.message}</div>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="consulta" className="form-control-label">{(data.language === "es" ? "Mensaje *" : (data.language === "en" ? "Message" : "Mensagem"))}</label>
                                    <textarea id="consulta" rows="10" className={`form-control ${errors.tcMensaje ? 'is-invalid' : ''}`} name="tcMensaje" {...register('tcMensaje')} minLength={2} maxLength={1000} style={{ overflow: "hidden" }} data-error={(data.language === "es" ? "El mensaje es requerido" : (data.language === "en" ? "The message is required" : "A mensagem é necessária"))} placeholder={(data.language === "es" ? "Redactar mensaje" : (data.language === "en" ? "Compose message" : "Compor mensagem"))}></textarea>
                                    <div className="invalid-feedback">{errors.tcMensaje?.message}</div>
                                </div>
                                {
                                    mesg != "" && (
                                        <div className="row justify-content-end g-0">
                                            <div className={`alert ${tpmsg == 1 ? 'alert-danger' : (tpmsg == 2 ? 'alert-success' : '')} alert-form`} role="alert">
                                                {mesg}
                                            </div>
                                        </div>
                                    )
                                }
                                <div className="form-group d-flex justify-content-center">
                                    <button type="submit" disabled={isSubmitting} className="mx-3">
                                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}&nbsp;&nbsp;
                                        {(data.language === "en" ? "Send" : "Enviar")}
                                    </button>
                                    <button type="reset" disabled={isSubmitting} onClick={onResetClick} className="mx-3">{(data.language === "en" ? "Cancel" : "Cancelar")}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/*<div className="row text-center m-4">
                        <h2>Preguntas frecuentes</h2>
                    </div>*/}
                </div>
            </section>



        </div>
    </>);
}

