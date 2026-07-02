import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { WS_REGISTER_ATTENDANCE_EVENT, WS_VALIDATE_FORM, NEXT_PUBLIC_RECAPTCHA_SITE_KEY } from 'config';


export { FormRegAsistEv };


function FormRegAsistEv(dataSymps, language, dataLinks) {

    const formRegAs = useRef();
    const valdtSchema = Yup.object().shape({
        astSimposio: Yup.string().required(language === "es" ? "El campo Simposio es requerido" : (language === "en" ? "Symposium field is required" : "O campo Simpósio é obrigatório")),
        astEmail: Yup.string().min(5, (language === "es" ? "La longitud mínima de carácteres es 5" : (language === "en" ? "The minimum character length is 5" : "O comprimento mínimo de caracteres é 5"))).max(50, (language === "es" ? "La longitud máxima de carácteres es 50" : (language === "en" ? "The maximum character length is 50" : "O comprimento máximo de caracteres é 50"))).required((language === "es" ? "El campo Email es requerido" : (language === "en" ? "Email field is required" : "O campo Email é obrigatório")))});
    const formOptions = { resolver: yupResolver(valdtSchema) };
    const { register, handleSubmit, reset, formState: { errors }, clearErrors } = useForm(formOptions);
    const onError = (errors, e) => console.log(errors, e);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mesgForm, setMesgForm] = useState("");
    const [tpmsgForm, setTpmsgForm] = useState(0);


    const onSubmit = async (data) => {
        var message = '', tipomes = 0;

        setIsSubmitting(true);

        try {
            window.grecaptcha.ready(() => {
                window.grecaptcha
                    .execute(NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: "submit" })
                    .then(async (token) => {

                        await axios.post(`${WS_VALIDATE_FORM}${token}`).then(function (response) {
                            if (response.data === "OK") {
                                axios.post(WS_REGISTER_ATTENDANCE_EVENT, {
                                    usSimposio: data.astSimposio,
                                    usEmail: data.astEmail
                                }).then(function (response) {
                                    switch (response.data) {
                                        case "ISMNVD":
                                            message = (language === "es" ? "El campo Simposio es requerido" : (language === "en" ? "Symposium field is required" : "O campo Simpósio é obrigatório"));
                                            tipomes = 1;
                                            break;
                                        case "EMLNVD":
                                            message = (language === "es" ? "El campo Email es requerido" : (language === "en" ? "Email field is required" : "O campo Email é obrigatório"));
                                            tipomes = 1;
                                            break;
                                        case "USRNRG":
                                            message = (language === "es" ? "Correo electrónico no registrado" : (language === "en" ? "Unregistered e-mail" : "E-mail não registrado"));
                                            tipomes = 1;
                                            break;
                                        case "SPSINC":
                                            message = (language === "es" ? "Simposio seleccionado no válido" : (language === "en" ? "Invalid selected symposium" : "Simpósio selecionado inválido"));
                                            tipomes = 1;
                                            break;
                                        case "DIASIC":
                                            message = (language === "es" ? "El Congreso inicia el 28 de enero y culmina el 30 de enero del 2026" : (language === "en" ? "The Congress starts on 28 January and ends on 30 January 2026" : "O Congresso começa em 28 de janeiro e termina em 30 de janeiro de 2026"));
                                            tipomes = 1;
                                            break;
                                        case "ASTFHR":
                                            message = (language === "es" ? "El registro de asistencia se lleva a cabo desde las 08:00 hasta las 13:00 y desde las 14:00 hasta las 18:00" : (language === "en" ? "Registration takes place from 08:00 to 13:00 and from 14:00 to 18:00" : "O registro é feito das 08:00 às 13:00 e das 14:00 às 18:00"));
                                            tipomes = 1;
                                            break;
                                        case "ASTYRG":
                                            message = (language === "es" ? "El registro de asistencia ya ha sido realizado" : (language === "en" ? "Registration of attendance has already taken place" : "O registro de presença já foi realizado"));
                                            tipomes = 1;
                                            break;
                                        case "ASTREX":
                                            message = (language === "es" ? "Se ha registrado la asistencia con éxito" : (language === "en" ? "Attendance has been successfully registered" : "A presença foi registrada com sucesso"));
                                            tipomes = 2;
                                            clearErrors();
                                            reset();
                                            break;
                                        case "ERRCTH":
                                            message = (language === "es" ? "Ocurrió un error interno en el proceso de registro de asistencia" : (language === "en" ? "An internal error occurred in the attendance registration process" : "Ocorreu um erro interno no processo de registro de presença"))
                                            tipomes = 1;
                                            break;
                                    }
                                    setMesgForm(message);
                                    setTpmsgForm(tipomes);
                                    setIsSubmitting(false);
                                }).catch(function (error) {
                                    setMesgForm(error);
                                    setTpmsgForm(1);
                                    setIsSubmitting(false);
                                })
                            } else {
                                message = (language === "es" ? "Lo sentimos, no pudimos verificar correctamente que eres un usuario real. Por favor, inténtalo de nuevo o considera usar otro dispositivo." : (language === "en" ? "We're sorry, we couldn't verify that you're a real user correctly. Please try again or consider using another device." : "Desculpe, não conseguimos verificar corretamente que você é um usuário real. Por favor, tente novamente ou considere usar outro dispositivo."));
                                setMesgForm(message);
                                setTpmsgForm(1);
                                setIsSubmitting(false);
                            }
                        }).catch(function (error) {
                            setMesgForm(error);
                            setTpmsgForm(1);
                            setIsSubmitting(false);
                        })
                    })
                    .catch((error) => {
                        setMesgForm(error.message);
                        setTpmsgForm(1);
                        setIsSubmitting(false);
                    });
            })
        } catch (error) {
            setMesgForm(error.message);
            setTpmsgForm(1);
            setIsSubmitting(false);
        }

    }

    function formatDateIn(dateIn) {
        const fechaObj = new Date(dateIn);
        const año = fechaObj.getFullYear();
        const mes = String(fechaObj.getMonth() + 1).padStart(2, '0');
        const dia = String(fechaObj.getDate()).padStart(2, '0');
        return `${año}-${mes}-${dia}`;
    }

    function generateTableLinksSymposim(datosSymposioums) {
        let filas = [];

        for (let i = 0; i < datosSymposioums.length; i++) {
            const simposio = datosSymposioums[i];
            const enlaces = JSON.parse(simposio.spListadoEnlaces);

            enlaces.sort((a, b) => {
                const fechaA = new Date(a.esFecha).getTime();
                const fechaB = new Date(b.esFecha).getTime();
                if (fechaA !== fechaB) {
                    return fechaA - fechaB;
                }

                return a.esJornada - b.esJornada;
            });

            const repeticiones = enlaces.length;

            for (let j = 0; j < repeticiones; j++) {
                filas.push(
                    <tr key={`${i}-${j}`}>
                        {j === 0 && (
                            <td rowSpan={repeticiones} className="text-center">
                                {simposio.spNombre}
                            </td>
                        )}
                        <td className="text-center">{formatDateIn(enlaces[j].esFecha)}</td>
                        <td className="text-center">
                            {enlaces[j].esJornada === 1 ? 'Matutino' : 'Vespertino'}
                        </td>
                        <td className="text-center">
                            <a
                                href={enlaces[j].esLinkZoom}
                                target="_blank"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title={`Ingreso a la Conferencia vía Zoom - ${simposio.spNombre} - [${formatDateIn(enlaces[j].esFecha)}] - ${enlaces[j].esJornada === 1 ? 'Matutino' : 'Vespertino'}`}
                                aria-label="link zoom"
                                style={{ textDecoration: "none" }}
                            >
                                <i className="fa fa-video-camera fa-2x" aria-hidden="true"></i>
                            </a>
                        </td>
                        <td className="text-center">
                            <a
                                href={enlaces[j].esLinkFacebook}
                                target="_blank"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title={`Ingreso a la transmisión vía Facebook Live - ${simposio.spNombre} - [${formatDateIn(enlaces[j].esFecha)}] - ${enlaces[j].esJornada === 1 ? 'Matutino' : 'Vespertino'}`}
                                aria-label="link facebook"
                                style={{ textDecoration: "none" }}
                            >
                                <i className="fa fa-facebook-official fa-2x" aria-hidden="true"></i>
                            </a>
                        </td>
                    </tr>
                );
            }
        }

        return filas;
    }

    return (<>
        <div className="row">
            <div className="card-form" ref={formRegAs}>
                <form className="form-card" id="form-asist" onSubmit={handleSubmit(onSubmit, onError)}>
                    <div className="card pnl-information-symp mt-2">
                        <div className="card-body">
                            <div className="row justify-content-between text-left">
                                <div className="form-group col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 flex-column d-flex">
                                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                        <strong>{language === "es" ? "Reporte de inconsistencias." : (language === "en" ? "Inconsistency reporting." : "Relatórios de inconsistência.")}</strong> {language === "es" ? "Cualquier inconsistencia que presente el registro de asistencia debe reportarlo al correo soporte.cidu@uteq.edu.ec; con sus respectivos datos(cédula, nombre completo, correo electrónico y simposio)." : (language === "en" ? "Any inconsistencies in the attendance register should be reported to soporte.cidu@uteq.edu.ec; with their respective data (ID card, full name, email and symposium)." : "Quaisquer inconsistências no registro de presença devem ser informadas para soporte.cidu@uteq.edu.ec; com seus respectivos dados (carteira de identidade, nome completo, e-mail e simpósio).")}<br />
                                        <strong>{language === "es" ? "El registro de asistencia es exclusivo para las personas que se registraron como Participantes." : (language === "en" ? "The attendance register is exclusive for those who have registered as Participants." : "O registro de presença é exclusivo para aqueles que se inscreveram como Participantes.")}</strong>
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-between text-left">
                                <div className="form-group col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 col-xxl-5 flex-column d-flex">
                                    <label className="form-control-label px-3" htmlFor="slct-simp">{language === "es" ? "Simposio *" : (language === "en" ? "Symposium *" : "Simpósio *")}</label>
                                    <select name="astSimposio" {...register('astSimposio')} className={`form-select form-select-lg ${errors.astSimposio ? 'is-invalid' : ''}`}
                                        id="slct-simp" data-error={language === "es" ? "El campo Simposio es requerido" : (language === "en" ? "Symposium field is required" : "O campo Simpósio é obrigatório")}>
                                        {
                                            (dataSymps !== "" && dataSymps !== null) ? (<>
                                                <option key={dataSymps.length} value="" >{language === "es" ? "Selecciona una opción" : (language === "en" ? "Select an option" : "Selecione uma opção")}</option>
                                                {
                                                    dataSymps.map(
                                                        (symp, index) => {
                                                            return (<option key={index} value={symp.spCodigo}>{symp.spNombre.trim()}</option>);
                                                        }
                                                    )
                                                }
                                            </>) : (
                                                <option value="">{language === "es" ? "Selecciona una opción" : (language === "en" ? "Select an option" : "Selecione uma opção")}</option>
                                            )
                                        }
                                    </select>
                                    <div className="invalid-feedback">{errors.astSimposio?.message}</div>
                                </div>
                                <div className="form-group col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 col-xxl-5 flex-column d-flex">
                                    <label className="form-control-label px-3" htmlFor="txt-email-as">{language === "es" ? "Correo electrónico *" : (language === "en" ? "Email *" : "Endereço de e-mail *")}</label>
                                    <input type="text" id="txt-email-as" className={`form-control ${errors.astEmail ? 'is-invalid' : ''}`} name="astEmail" {...register('astEmail')} maxLength={50} data-error={language === "es" ? "El campo Email es requerido" : (language === "en" ? "Email field is required" : "O campo Email é obrigatório")} />
                                    <div className="invalid-feedback">{errors.astEmail?.message}</div>
                                </div>
                                <div className="form-group col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 col-lg-2 col-xl-2 col-xxl-2 text-center">
                                    <button type="submit" className="btn-block-2 mt-4" disabled={isSubmitting} form="form-asist">
                                        {isSubmitting ? (<span className="spinner-border spinner-border-sm mr-1"></span>) : (<i className="fa fa-check-circle fa-1x" aria-hidden="true"></i>)}
                                         {language === "es" ? "Registrar" : (language === "en" ? "Register" : "Registro")}
                                    </button>
                                </div>
                            </div>
                            {
                                mesgForm != "" && (
                                    <div className="row justify-content-end g-0 mt-3">
                                        <div className={`alert ${tpmsgForm == 1 ? 'alert-danger' : (tpmsgForm == 2 ? 'alert-success' : '')} alert-form`} role="alert">
                                            {mesgForm}
                                        </div>
                                    </div>
                                )
                            }
                            
                        	{/*<hr />

                            <div className="row mt-2">
                                <div className="col-md-12 w-100">
                                    <table id="tbl-sublines" className="display table-static w-100">
                                        <thead>
                                            <tr>
                                                <th className="text-center">{language === "es" ? "Simposio" : (language === "en" ? "Symposium" : "Simpósio")}</th>
                                                <th className="text-center">{language === "es" ? "Fecha" : (language === "en" ? "Date" : "Data")}</th>
                                                <th className="text-center">{language === "es" ? "Jornada" : (language === "en" ? "Day" : "Dia")}</th>
                                                <th className="text-center">...</th>
                                                <th className="text-center">...</th>
                                            </tr>
                                        </thead>
                                        <tbody>*/}
                                            {/*<td className="text-center">V Simposio Internacional de Ciencias Agrarias y Forestales</td>
                                            <td className="text-center">2023-09-29</td>
                                            <td className="text-center">Matutino</td>
                                            <td className="text-center"><a href="#" target="_blank" data-bs-toggle="tooltip" data-bs-placement="top" title="Ingreso a la Conferencia vía Zoom" aria-label="link zoom" style={{ textDecoration: "none" }}><i className="fa fa-video-camera fa-2x" aria-hidden="true"></i></a></td>
                                            <td className="text-center"><a href="#" target="_blank" data-bs-toggle="tooltip" data-bs-placement="top" title="Ingreso a la transmisión vía Facebook Live" aria-label="link facebook" style={{ textDecoration: "none" }}><i className="fa fa-facebook-official fa-2x" aria-hidden="true"></i></a></td>*/}
                                            
                                        	
                                        	{/*generateTableLinksSymposim(dataLinks)*/}
                                        
                                        
                                            {/*generateTableLinksSymposimV2(dataLinks)*/}
                                            {/*generateTableLinksSymposimV3(dataLinks)*/}
                                            {/*generateTableLinksSymposiumsV4(dataLinks)*/}
                                            {/*generateTableLinksSymposiumsV5(dataLinks)*/}
                                            {/*generateTableLinksSymposiumsV6(dataLinks)*/}

                                            {/*<tr>
                                                <td className="text-center" rowSpan="6">V Simposio Internacional de Ciencias Agrarias y Forestales</td>
                                                <td className="text-center" rowSpan="2">2023-09-29</td>
                                                <td className="text-center">Matutino</td>
                                                <td className="text-center"><a href="#" target="_blank" data-bs-toggle="tooltip" data-bs-placement="top" title="Ingreso a la Conferencia vía Zoom" aria-label="link zoom" style={{ textDecoration: "none" }}><i className="fa fa-video-camera fa-2x" aria-hidden="true"></i></a></td>
                                                <td className="text-center"><a href="#" target="_blank" data-bs-toggle="tooltip" data-bs-placement="top" title="Ingreso a la transmisión vía Facebook Live" aria-label="link facebook" style={{ textDecoration: "none" }}><i className="fa fa-facebook-official fa-2x" aria-hidden="true"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">Vespertino</td>
                                                <td className="text-center"><a href="#" target="_blank" data-bs-toggle="tooltip" data-bs-placement="top" title="Ingreso a la Conferencia vía Zoom" aria-label="link zoom" style={{ textDecoration: "none" }}><i className="fa fa-video-camera fa-2x" aria-hidden="true"></i></a></td>
                                                <td className="text-center"><a href="#" target="_blank" data-bs-toggle="tooltip" data-bs-placement="top" title="Ingreso a la transmisión vía Facebook Live" aria-label="link facebook" style={{ textDecoration: "none" }}><i className="fa fa-facebook-official fa-2x" aria-hidden="true"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td className="text-center" rowSpan="2">2023-09-30</td>
                                                <td className="text-center">Matutino</td>
                                                <td className="text-center"><a href="#" target="_blank" data-bs-toggle="tooltip" data-bs-placement="top" title="Ingreso a la Conferencia vía Zoom" aria-label="link zoom" style={{ textDecoration: "none" }}><i className="fa fa-video-camera fa-2x" aria-hidden="true"></i></a></td>
                                                <td className="text-center"><a href="#" target="_blank" data-bs-toggle="tooltip" data-bs-placement="top" title="Ingreso a la transmisión vía Facebook Live" aria-label="link facebook" style={{ textDecoration: "none" }}><i className="fa fa-facebook-official fa-2x" aria-hidden="true"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">Vespertino</td>
                                                <td className="text-center"><a href="#" target="_blank" data-bs-toggle="tooltip" data-bs-placement="top" title="Ingreso a la Conferencia vía Zoom" aria-label="link zoom" style={{ textDecoration: "none" }}><i className="fa fa-video-camera fa-2x" aria-hidden="true"></i></a></td>
                                                <td className="text-center"><a href="#" target="_blank" data-bs-toggle="tooltip" data-bs-placement="top" title="Ingreso a la transmisión vía Facebook Live" aria-label="link facebook" style={{ textDecoration: "none" }}><i className="fa fa-facebook-official fa-2x" aria-hidden="true"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td className="text-center" rowSpan="2">2023-09-31</td>
                                                <td className="text-center">Matutino</td>
                                                <td className="text-center"><a href="#" target="_blank" data-bs-toggle="tooltip" data-bs-placement="top" title="Ingreso a la Conferencia vía Zoom" aria-label="link zoom" style={{ textDecoration: "none" }}><i className="fa fa-video-camera fa-2x" aria-hidden="true"></i></a></td>
                                                <td className="text-center"><a href="#" target="_blank" data-bs-toggle="tooltip" data-bs-placement="top" title="Ingreso a la transmisión vía Facebook Live" aria-label="link facebook" style={{ textDecoration: "none" }}><i className="fa fa-facebook-official fa-2x" aria-hidden="true"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">Vespertino</td>
                                                <td className="text-center"><a href="#" target="_blank" data-bs-toggle="tooltip" data-bs-placement="top" title="Ingreso a la Conferencia vía Zoom" aria-label="link zoom" style={{ textDecoration: "none" }}><i className="fa fa-video-camera fa-2x" aria-hidden="true"></i></a></td>
                                                <td className="text-center"><a href="#" target="_blank" data-bs-toggle="tooltip" data-bs-placement="top" title="Ingreso a la transmisión vía Facebook Live" aria-label="link facebook" style={{ textDecoration: "none" }}><i className="fa fa-facebook-official fa-2x" aria-hidden="true"></i></a></td>
                                            </tr>*/}

                                            {/*generateTableLinksSymposiumsV7(dataLinks)*/}
                                            {/*generateTableLinksSymposiumV8(dataLinks)*/}
                                            {/*generateTableLinksSymposiumV9(dataLinks)*/}

                                        {/*</tbody>
                                    </table>
                                </div>
                            </div>*/}


                            {/*<div className="row mt-2">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                            <h2 className="msg-pnl-search text-rigth">{language === "es" ? "V Simposio Internacional de Ciencias Agrarias y Forestales" : (language === "en" ? "5th International Symposium of Agricultural and Forestry Sciences" : "5º Simpósio Internacional de Ciências Agrícolas e Florestais")}</h2>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-2">
                                            <div className="card panel-metcs-data-gen">
                                                <div className="card-body">
                                                    <a href="https://cedia.zoom.us/j/81065213683" target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
                                                        <div className="row">
                                                            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                                <i className="fa fa-video-camera fa-2x icon-data-gen" aria-hidden="true"></i>
                                                            </div>
                                                            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                                <h2 className="msg-pnl-search-2 text-rigth">{language === "es" ? "Ingreso a las Conferencias" : (language === "en" ? "Admission to the Conferences" : "Admissão às conferências")}</h2>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-2">
                                            <div className="card panel-metcs-data-gen">
                                                <div className="card-body">
                                                    <a href="https://www.facebook.com/100083370651529/videos/668708837997316/" target="_blank" aria-label="link facebook" style={{ textDecoration: "none" }}>
                                                        <div className="row">
                                                            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                                <i className="fa fa-facebook-official fa-2x icon-data-gen" aria-hidden="true"></i>
                                                            </div>
                                                            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                                <h2 className="msg-pnl-search-2 text-rigth">{language === "es" ? "Transmisión en vivo" : (language === "en" ? "Live broadcast" : "Transmissão ao vivo")}</h2>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                            <h2 className="msg-pnl-search text-rigth">{language === "es" ? "V Simposio Internacional de Ciencias Pecuarias y Biológicas" : (language === "en" ? "5th International Symposium on Livestock and Biological Sciences" : "5º Simpósio Internacional de Pecuária e Ciências Biológicas")}</h2>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-2">
                                            <div className="card panel-metcs-data-gen">
                                                <div className="card-body">
                                                    <a href="https://cedia.zoom.us/j/89761120069" target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
                                                        <div className="row">
                                                            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                                <i className="fa fa-video-camera fa-2x icon-data-gen" aria-hidden="true"></i>
                                                            </div>
                                                            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                                <h2 className="msg-pnl-search-2 text-rigth">{language === "es" ? "Ingreso a las Conferencias" : (language === "en" ? "Admission to the Conferences" : "Admissão às conferências")}</h2>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-2">
                                            <div className="card panel-metcs-data-gen">
                                                <div className="card-body">
                                                    <a href="https://www.facebook.com/watch/?v=564024108884535" target="_blank" aria-label="link facebook" style={{ textDecoration: "none" }}>
                                                        <div className="row">
                                                            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                                <i className="fa fa-facebook-official fa-2x icon-data-gen" aria-hidden="true"></i>
                                                            </div>
                                                            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                                <h2 className="msg-pnl-search-2 text-rigth">{language === "es" ? "Transmisión en vivo" : (language === "en" ? "Live broadcast" : "Transmissão ao vivo")}</h2>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                            <h2 className="msg-pnl-search text-rigth">{language === "es" ? "V Simposio Internacional de Ciencias de la Ingeniería" : (language === "en" ? "5th International Symposium on Engineering Sciences" : "5º Simpósio Internacional de Ciências da Engenharia")}</h2>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-2">
                                            <div className="card panel-metcs-data-gen">
                                                <div className="card-body">
                                                    <a href="https://cedia.zoom.us/j/86961408274" target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
                                                        <div className="row">
                                                            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                                <i className="fa fa-video-camera fa-2x icon-data-gen" aria-hidden="true"></i>
                                                            </div>
                                                            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                                <h2 className="msg-pnl-search-2 text-rigth">{language === "es" ? "Ingreso a las Conferencias" : (language === "en" ? "Admission to the Conferences" : "Admissão às conferências")}</h2>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-2">
                                            <div className="card panel-metcs-data-gen">
                                                <div className="card-body">
                                                    <a href="https://www.facebook.com/watch/?v=3255020148145330" target="_blank" aria-label="link facebook" style={{ textDecoration: "none" }}>
                                                        <div className="row">
                                                            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                                <i className="fa fa-facebook-official fa-2x icon-data-gen" aria-hidden="true"></i>
                                                            </div>
                                                            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                                <h2 className="msg-pnl-search-2 text-rigth">{language === "es" ? "Transmisión en vivo" : (language === "en" ? "Live broadcast" : "Transmissão ao vivo")}</h2>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                            <h2 className="msg-pnl-search text-rigth">{language === "es" ? "V Simposio Internacional de Ciencias de la Industria y Producción" : (language === "en" ? "5th International Symposium on Industrial and Production Sciences" : "5º Simpósio Internacional de Ciências Industriais e de Produção")}</h2>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-2">
                                            <div className="card panel-metcs-data-gen">
                                                <div className="card-body">
                                                    <a href="https://cedia.zoom.us/j/89410486342" target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
                                                        <div className="row">
                                                            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                                <i className="fa fa-video-camera fa-2x icon-data-gen" aria-hidden="true"></i>
                                                            </div>
                                                            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                                <h2 className="msg-pnl-search-2 text-rigth">{language === "es" ? "Ingreso a las Conferencias" : (language === "en" ? "Admission to the Conferences" : "Admissão às conferências")}</h2>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-2">
                                            <div className="card panel-metcs-data-gen">
                                                <div className="card-body">
                                                    <a href="https://www.facebook.com/watch/?v=5522823774506487" target="_blank" aria-label="link facebook" style={{ textDecoration: "none" }}>
                                                        <div className="row">
                                                            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                                <i className="fa fa-facebook-official fa-2x icon-data-gen" aria-hidden="true"></i>
                                                            </div>
                                                            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                                <h2 className="msg-pnl-search-2 text-rigth">{language === "es" ? "Transmisión en vivo" : (language === "en" ? "Live broadcast" : "Transmissão ao vivo")}</h2>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                            <h2 className="msg-pnl-search text-rigth">{language === "es" ? "V Simposio Internacional de Ciencias Empresariales" : (language === "en" ? "5th International Business Science Symposium" : "5º Simpósio Internacional de Ciências Empresariais")}</h2>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-2">
                                            <div className="card panel-metcs-data-gen">
                                                <div className="card-body">
                                                    <a href="https://cedia.zoom.us/j/82516357757" target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
                                                        <div className="row">
                                                            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                                <i className="fa fa-video-camera fa-2x icon-data-gen" aria-hidden="true"></i>
                                                            </div>
                                                            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                                <h2 className="msg-pnl-search-2 text-rigth">{language === "es" ? "Ingreso a las Conferencias" : (language === "en" ? "Admission to the Conferences" : "Admissão às conferências")}</h2>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-2">
                                            <div className="card panel-metcs-data-gen">
                                                <div className="card-body">
                                                    <a href="#" target="_blank" aria-label="link facebook" style={{ textDecoration: "none" }}>
                                                        <div className="row">
                                                            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                                <i className="fa fa-facebook-official fa-2x icon-data-gen" aria-hidden="true"></i>
                                                            </div>
                                                            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                                <h2 className="msg-pnl-search-2 text-rigth">{language === "es" ? "Transmisión en vivo" : (language === "en" ? "Live broadcast" : "Transmissão ao vivo")}</h2>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                            <h2 className="msg-pnl-search text-rigth">{language === "es" ? "V Simposio Internacional de Ciencias Sociales, Económicas y Financieras" : (language === "en" ? "5th International Symposium on Social, Economic and Financial Sciences" : "5º Simpósio Internacional de Ciências Sociais, Econômicas e Financeiras")}</h2>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-2">
                                            <div className="card panel-metcs-data-gen">
                                                <div className="card-body">
                                                    <a href="https://cedia.zoom.us/j/82712678284" target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
                                                        <div className="row">
                                                            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                                <i className="fa fa-video-camera fa-2x icon-data-gen" aria-hidden="true"></i>
                                                            </div>
                                                            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                                <h2 className="msg-pnl-search-2 text-rigth">{language === "es" ? "Ingreso a las Conferencias" : (language === "en" ? "Admission to the Conferences" : "Admissão às conferências")}</h2>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-2">
                                            <div className="card panel-metcs-data-gen">
                                                <div className="card-body">
                                                    <a href="https://www.facebook.com/watch/?v=701774584606011" target="_blank" aria-label="link facebook" style={{ textDecoration: "none" }}>
                                                        <div className="row">
                                                            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                                <i className="fa fa-facebook-official fa-2x icon-data-gen" aria-hidden="true"></i>
                                                            </div>
                                                            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                                <h2 className="msg-pnl-search-2 text-rigth">{language === "es" ? "Transmisión en vivo" : (language === "en" ? "Live broadcast" : "Transmissão ao vivo")}</h2>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                            <h2 className="msg-pnl-search text-rigth">{language === "es" ? "III Simposio de Ciencias de la Educación y desarrollo humano" : (language === "en" ? "3rd Symposium on Educational Sciences and Human Development" : "3º Simpósio de Ciências da Educação e Desenvolvimento Humano")}</h2>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-2">
                                            <div className="card panel-metcs-data-gen">
                                                <div className="card-body">
                                                    <a href="https://cedia.zoom.us/j/84574638509" target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
                                                        <div className="row">
                                                            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                                <i className="fa fa-video-camera fa-2x icon-data-gen" aria-hidden="true"></i>
                                                            </div>
                                                            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                                <h2 className="msg-pnl-search-2 text-rigth">{language === "es" ? "Ingreso a las Conferencias" : (language === "en" ? "Admission to the Conferences" : "Admissão às conferências")}</h2>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-2">
                                            <div className="card panel-metcs-data-gen">
                                                <div className="card-body">
                                                    <a href="https://www.facebook.com/watch/?v=5795362660531611" target="_blank" aria-label="link facebook" style={{ textDecoration: "none" }}>
                                                        <div className="row">
                                                            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                                <i className="fa fa-facebook-official fa-2x icon-data-gen" aria-hidden="true"></i>
                                                            </div>
                                                            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                                <h2 className="msg-pnl-search-2 text-rigth">{language === "es" ? "Transmisión en vivo" : (language === "en" ? "Live broadcast" : "Transmissão ao vivo")}</h2>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2">
                                            <h2 className="msg-pnl-search text-rigth">{language === "es" ? "II Simposio Internacional de Ciencias de la Salud" : (language === "en" ? "II International Symposium on Health Sciences" : "II Simpósio Internacional de Ciências da Saúde")}</h2>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-2">
                                            <div className="card panel-metcs-data-gen">
                                                <div className="card-body">
                                                    <a href="https://cedia.zoom.us/j/82238754154" target="_blank" aria-label="link zoom" style={{ textDecoration: "none" }}>
                                                        <div className="row">
                                                            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                                <i className="fa fa-video-camera fa-2x icon-data-gen" aria-hidden="true"></i>
                                                            </div>
                                                            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                                <h2 className="msg-pnl-search-2 text-rigth">{language === "es" ? "Ingreso a las Conferencias" : (language === "en" ? "Admission to the Conferences" : "Admissão às conferências")}</h2>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-2">
                                            <div className="card panel-metcs-data-gen">
                                                <div className="card-body">
                                                    <a href="https://www.facebook.com/watch/?v=2371046736386580" target="_blank" aria-label="link facebook" style={{ textDecoration: "none" }}>
                                                        <div className="row">
                                                            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                                <i className="fa fa-facebook-official fa-2x icon-data-gen" aria-hidden="true"></i>
                                                            </div>
                                                            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                                <h2 className="msg-pnl-search-2 text-rigth">{language === "es" ? "Transmisión en vivo" : (language === "en" ? "Live broadcast" : "Transmissão ao vivo")}</h2>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>*/}



                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>)

}