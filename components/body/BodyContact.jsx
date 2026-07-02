import { Tabs, Tab, SSRProvider } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from "axios";
import { WS_REGISTER_SUGGESTION, NEXT_PUBLIC_RECAPTCHA_SITE_KEY, /*NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,*/ LOGOS_FOLDER, WS_VALIDATE_FORM } from 'config';
import React, { useState, useRef } from 'react';
//import GoogleMapReact from 'google-map-react';
import { v4 as uuidv4 } from 'uuid';


export { BodyContact };


function ItemTabFaculty(props) {
    return (<div className="col-md-4 d-flex justify-content-center align-items-center">
        <div className="card-tp">
            <img src={LOGOS_FOLDER + props.logo.trim()} className="card-img-top" alt="" />
            <div className="card-body-cont">
                <h3 className="card-title">{props.nombredep.trim()}</h3>
                <h4 className="card-subtitle mb-2">{`${(props.genero === "M" ? props.cargomasc.trim() : props.cargofem.trim())}: ${props.nombres.trim()} ${props.apellidos.trim()}`}</h4>
                <p className="card-text">{`Telf.: (+593) ${props.telefono.trim()} Ext. ${props.extension.trim()}`} <br />{`${props.language === "es" ? "Correo" : "Email"}: ${props.correo.trim()}`}</p>
                <div className="row justify-content-center pt-3">
                    <div className="col-sm-6 col-lg-12 text-center">
                        <a href={props.urlperfil} className="btn-tp mr-2" target="_blank" data-toggle="tooltip" data-placement="bottom" title={`${props.language === "en" ? "Academic profile" : "Perfil académico"}: ${props.nombres.trim()} ${props.apellidos.trim()}`}><i className="fa fa-link"></i> {props.language === "es" ? "Visitar" : (props.language === "en" ? "Visit" : "Visite")}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

function BodyContact(data) {
    const listCampus = data.campus;
    const listAddresses = data.data7;
    const listDeans = data.data8;
    const ubiCmpsRef = useRef();
    const formSugRef = useRef();

    const validationSchema = Yup.object().shape({
        sgDestinatario: Yup.string().required(data.language === "es" ? "El campo destinario es requerido" : (data.language === "en" ? "The target field is required" : "O campo alvo é obrigatório")),
        sgNombreComp: Yup.string().min(2, (data.language === "es" ? "La longitud mínima de carácteres es 2" : (data.language === "en" ? "The minimum character length is 2" : "O comprimento mínimo dos caracteres é de 2"))).max(190, (data.language === "es" ? "La longitud máxima de carácteres es 190" : (data.language === "en" ? "The maximum character length is 190" : "O comprimento máximo dos caracteres é de 190"))).required((data.language === "es" ? "El campo nombre completo es requerido" : (data.language === "en" ? "The full name field is required" : "O campo do nome completo é obrigatório"))),
        sgCorreoElect: Yup.string().min(5, (data.language === "es" ? "La longitud mínima de carácteres es 5" : (data.language === "en" ? "The minimum character length is 5" : "O comprimento mínimo dos caracteres é de 5"))).max(148, (data.language === "es" ? "La longitud máxima de carácteres es 148" : (data.language === "en" ? "The maximum character length is 148" : "O comprimento máximo dos caracteres é de 190"))).required((data.language === "es" ? "El campo correo electrónico es requerido" : (data.language === "en" ? "The email field is required" : "O campo de e-mail é obrigatório"))).email((data.language === "es" ? "El correo electrónico ingresado no es válido" : (data.language === "en" ? "The e-mail address entered is invalid" : "O endereço de e-mail introduzido é inválido"))),
        sgAsunto: Yup.string().min(2, (data.language === "es" ? "La longitud mínima de carácteres es 2" : (data.language === "en" ? "The minimum character length is 2" : "O comprimento mínimo dos caracteres é de 2"))).max(395, (data.language === "es" ? "La longitud máxima de carácteres es 395" : (data.language === "en" ? "The maximum character length is 395" : "O comprimento máximo dos caracteres é de 395"))).required((data.language === "es" ? "El campo asunto es requerido" : (data.language === "en" ? "The subject field is required" : "O campo do assunto é obrigatório"))),
        sgMensaje: Yup.string().min(2, (data.language === "es" ? "La longitud mínima de carácteres es 2" : (data.language === "en" ? "The minimum character length is 2" : "O comprimento mínimo dos caracteres é de 2"))).max(1000, (data.language === "es" ? "La longitud máxima de carácteres es 1000" : (data.language === "en" ? "The maximum character length is 1000" : "O comprimento máximo dos caracteres é de 1000"))).required((data.language === "es" ? "El campo mensaje es requerido" : (data.language === "en" ? "The message field is required" : "O campo da mensagem é obrigatório")))
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mesg, setMesg] = useState("");
    const [tpmsg, setTpmsg] = useState(0);


    const onSubmit = async (data) => {
        var message = '', tipomes = 0;

        setIsSubmitting(true);
        window.grecaptcha.ready(() => {
            window.grecaptcha
                .execute(NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: "submit" })
                .then(async (token) => {

                    try {
                        await axios.post(`${WS_VALIDATE_FORM}${token}`).then(function (response) {
                            if (response.data === "OK") {
                                axios.post(WS_REGISTER_SUGGESTION, {
                                    sgNombreComp: data.sgNombreComp,
                                    sgCorreoElect: data.sgCorreoElect,
                                    sgDestinatario: data.sgDestinatario,
                                    sgAsunto: data.sgAsunto,
                                    sgMensaje: data.sgMensaje
                                }).then(function (response) {
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
                                        case "DESNEX":
                                            message = (data.language === "es" ? "El destinatario seleccionado no se encuentra registrado" : (data.language === "en" ? "The selected recipient is not registered" : "O destinatário seleccionado não está registado"));
                                            tipomes = 1;
                                            break;
                                        case "DESNAC":
                                            message = (data.language === "es" ? "El destinatario seleccionado no se encuentra disponible" : (data.language === "en" ? "The selected recipient is not available" : "O destinatário seleccionado não está disponível"));
                                            tipomes = 1;
                                            break;
                                        case "SUGREX":
                                            reset();
                                            message = (data.language === "es" ? "Recibida en el buzón de sugerencias" : (data.language === "en" ? "Received in the suggestion box" : "Recebido na caixa de sugestões"));
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

    const renderElementFormSuggestion = () => {
        return (<>
            <div className="row pt-3 g-0" id="form-sugst" ref={formSugRef}>
                <div className="col-md-12 col-lg-12 g-0">
                    <div className="row g-0">
                        <h4 className="title-cont-page text-center">{data.language === "es" ? "Sugerencias" : (data.language === "en" ? "Suggestions" : "Sugestões")}</h4>
                    </div>
                    <div className="row g-0">
                        <h2 className="sentence-first pt-3">{data.language === "es" ? "Tu opinión cuenta para nosotros!" : (data.language === "en" ? "We value your opinion!" : "A sua opinião conta para nós!")}</h2>
                    </div>
                    <div className="row g-0">
                        <div className="card-form">
                            <form className="form-card" onSubmit={handleSubmit(onSubmit)}>
                                <div className="row justify-content-between text-left">
                                    <div className="form-group col-sm-6 flex-column d-flex">
                                        <label className="form-control-label px-3" htmlFor="slct-dest">{(data.language === "es" ? "Destinario *" : (data.language === "en" ? "Target *" : "Destino *"))}</label>
                                        <select name="sgDestinatario" {...register('sgDestinatario')} className={`form-select form-select-lg ${errors.sgDestinatario ? 'is-invalid' : ''}`}
                                            id="slct-dest" data-error={(data.language === "es" ? "El destinatario es requerido" : (data.language === "en" ? "The addressee is required" : "O destinatário é obrigado a"))}>
                                            <option key={listAddresses.length} value="" >{(data.language === "es" ? "Selecciona el destinatario" : (data.language === "en" ? "Select the recipient" : "Seleccione o destinatário"))}</option>
                                            {listAddresses.map(
                                                (item, index) => {
                                                    return (<option key={index} value={item.dmCodgDato}>{data.language === "es" ? item.dmDescripcion.trim() : (data.language === "en" ? item.dmDescripcionEn.trim() : item.dmDescripcionPt.trim())}</option>);
                                                }
                                            )}
                                        </select>
                                        <div className="invalid-feedback">{errors.sgDestinatario?.message}</div>
                                    </div>
                                    <div className="form-group col-sm-6 flex-column d-flex">
                                        <label className="form-control-label px-3" htmlFor="txtname">{(data.language === "es" ? "Nombre completo *" : (data.language === "en" ? "Full name *" : "Nome completo *"))}</label>
                                        <input type="text" id="txtname" className={`form-control ${errors.sgNombreComp ? 'is-invalid' : ''}`} name="sgNombreComp" {...register('sgNombreComp')} minLength={2} maxLength={190} placeholder={(data.language === "es" ? "Ingresa tu nombre completo" : (data.language === "en" ? "Enter your full name" : "Introduza o seu nome completo"))} data-error={(data.language === "es" ? "El nombre completo es requerido" : (data.language === "en" ? "Full name is required" : "O nome completo é obrigatório"))} />
                                        <div className="invalid-feedback">{errors.sgNombreComp?.message}</div>
                                    </div>
                                </div>
                                <div className="row justify-content-between text-left">
                                    <div className="form-group col-sm-6 flex-column d-flex">
                                        <label className="form-control-label px-3" htmlFor="txtemail">{(data.language === "es" ? "Correo electrónico *" : (data.language === "en" ? "E-mail" : "Endereço de correio electrónico"))}</label>
                                        <input type="text" id="txtemail" className={`form-control ${errors.sgCorreoElect ? 'is-invalid' : ''}`} name="sgCorreoElect" {...register('sgCorreoElect')} minLength={5} maxLength={148} placeholder={(data.language === "es" ? "Ingresa tu correo electrónico" : (data.language === "en" ? "Enter your email address" : "Introduza o seu endereço de correio electrónico"))} data-error={(data.language === "es" ? "El correo electrónico es requerido" : (data.language === "en" ? "Email is required" : "O e-mail é necessário"))} />
                                        <div className="invalid-feedback">{errors.sgCorreoElect?.message}</div>
                                    </div>
                                    <div className="form-group col-sm-6 flex-column d-flex">
                                        <label className="form-control-label px-3" htmlFor="txtsubject">{(data.language === "es" ? "Asunto *" : (data.language === "en" ? "Subject" : "Assunto *"))}</label>
                                        <input type="text" id="txtsubject" className={`form-control ${errors.sgAsunto ? 'is-invalid' : ''}`} name="sgAsunto" {...register('sgAsunto')} minLength={2} maxLength={395} data-error={(data.language === "es" ? "El asunto es requerido" : (data.language === "en" ? "The subject is required" : "O assunto é necessário"))} placeholder={(data.language === "es" ? "Ingresa el asunto" : (data.language === "en" ? "Enter the subject" : "Introduzir o assunto"))} />
                                        <div className="invalid-feedback">{errors.sgAsunto?.message}</div>
                                    </div>
                                </div>
                                <div className="row justify-content-between text-left">
                                    <div className="form-group col-12 flex-column d-flex">
                                        <label className="form-control-label px-3" htmlFor="txtmessage">{(data.language === "es" ? "Mensaje *" : (data.language === "en" ? "Message" : "Mensagem"))}</label>
                                        <textarea id="txtmessage" className={`form-control ${errors.sgMensaje ? 'is-invalid' : ''}`} name="sgMensaje" {...register('sgMensaje')} minLength={2} maxLength={1000} style={{ overflow: "hidden" }} rows="5" cols="50" data-error={(data.language === "es" ? "El mensaje es requerido" : (data.language === "en" ? "The message is required" : "A mensagem é necessária"))} placeholder={(data.language === "es" ? "Redactar mensaje" : (data.language === "en" ? "Compose message" : "Compor mensagem"))}></textarea>
                                        <div className="invalid-feedback">{errors.sgMensaje?.message}</div>
                                    </div>
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
                                <div className="row justify-content-end mt-3">
                                    <div className="form-group col-sm-6 col-lg-12 text-center">
                                        <button type="submit" disabled={isSubmitting} className="btn-block mr-2">
                                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}&nbsp;&nbsp;
                                            {(data.language === "en" ? "Send" : "Enviar")}
                                        </button>
                                        <button type="reset" disabled={isSubmitting} onClick={onResetClick} className="btn-block">{(data.language === "es" ? "Limpiar" : (data.language === "en" ? "Clear" : "Limpar"))}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div><br />
        </>);
    }

    const listItemsTabsFaculties = (dataItems) => {
        return (dataItems.map(
            (item) => {
                return <ItemTabFaculty key={uuidv4()} logo={item.auObjEntDato.dpImgLogo.trim()} nombredep={data.language === "es" ? item.auObjEntDato.dpNombre.trim() : (data.language === "en" ? item.auObjEntDato.dpNombreEn.trim() : item.auObjEntDato.dpNombrePt.trim())} genero={item.auGenero} cargomasc={data.language === "es" ? item.auObjCargo.dmDescripcion.trim() : (data.language === "en" ? item.auObjCargo.dmDescripcionEn.trim() : item.auObjCargo.dmDescripcionPt.trim())} cargofem={data.language === "es" ? item.auObjCargo.dmRespuesta.trim() : (data.language === "en" ? item.auObjCargo.dmRespuestaEn.trim() : item.auObjCargo.dmRespuestaPt.trim())}
                    nombres={item.auNombres.trim()} apellidos={item.auApellidos.trim()} telefono={item.auTelefono.trim()} extension={item.auExtensTelf.trim()} correo={item.auCorreoElect.trim()} urlperfil={item.auUrlPerfilAcad.trim()} language={data.language} />
            })
        )
    }

    return (<><SSRProvider><div className="row" id="div-ubc-campus" ref={ubiCmpsRef}>
        <h2 className="title-cont-page text-center">{data.language === "es" ? "Información de contactos" : (data.language === "en" ? "Contact information" : "Informação de contacto")}</h2><br /><br />
        <div className="col-md-12 w-100">
            <div className="container g-0">
                <div className="row g-0">
                    <div className="col-md-12 g-0">
                        <Tabs defaultActiveKey="tab0" id="tab-info">
                            {listCampus.map(
                                (item, index) => {
                                    const medidas = {
                                        center: {
                                            lat: parseFloat(item.dmLatitud.trim()),
                                            lng: parseFloat(item.dmLongitud.trim())
                                        },
                                        zoom: 18
                                    };
                                    return (<Tab key={uuidv4()} eventKey={`tab${index}`} title={item.dmDescripcion.trim()}>
                                        <div className="container-fluid g-0">
                                            <div className="row g-0">
                                                <div className="col-md-12 col-lg-12 g-0 border panel-mapa-tp">
                                                    <div className="map-cp2">
                                                    {/*<GoogleMapReact
                                                            bootstrapURLKeys={{ key: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }}
                                                            defaultCenter={medidas.center}
                                                            defaultZoom={medidas.zoom}
                                                            options={{ fullscreenControl: false }} >
                                                        </GoogleMapReact>*/}
                                                    <iframe src={item.dmDescTramite.trim()}
                                                            frameBorder={0} allowFullScreen={false} aria-hidden="false" tabIndex={0} style={{width: "100%", height:"100%"}}></iframe>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab>);
                                }
                            )}
                            <Tab key={listCampus.length} eventKey={listCampus.length > 0 ? (`tab${listCampus.length}`) : ("tab0")} title={data.language === "es" ? "Directorio Facultades" : (data.language === "en" ? "Faculty Directory" : "Directório de Professores")}>
                                <div className="container mx-auto mt-4 g-0">
                                    <div className="row">
                                        {listItemsTabsFaculties(listDeans)}
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    </div>{renderElementFormSuggestion()}</SSRProvider></>);
}



