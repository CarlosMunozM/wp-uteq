import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from "axios";
import React, { useState, useRef } from 'react';
import { NEXT_PUBLIC_RECAPTCHA_SITE_KEY, WS_VALIDATE_FORM, WS_REGISTER_INFORM_INSCRIPTION, CAREERS_MSC_BROC_DOCS_FOLDER } from 'config';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import validator from 'validator';
import { v4 as uuidv4 } from 'uuid';


export { FormInscripcion };

function ItemOptionSelect(props) {
    if (props.tipo === 1) {
        return <option value={props.item[0]}>{props.item[1]}</option>;
    } else {
        return <option value={props.item.crCodigo.trim()}>{props.language === "es" ? props.item.crNombre.trim() : (props.language === "en" ? props.item.crNombreEn.trim() : props.item.crNombrePt.trim())}</option>;
    }
}

function FormInscripcion(codMaestria, dataMsc, urlVideoTut, language) {
    const formInsc = useRef();
    const listProgramsMsc = ((dataMsc !== null && dataMsc !== "") ? dataMsc : []);

    const listItemsCountries = (dataItems) => {
        return (dataItems.map(
            (item) => {
                return (<ItemOptionSelect key={uuidv4()} tipo={1} item={item} />);
            }))
    }

    const listItemsMasters = (dataItems, codMaster, language) => {
        return (
            dataItems.map(
                (item) => {
                    if (codMaster !== "") {
                        if (codMaster.trim() === item.crCodigo.trim()) {
                            return (<ItemOptionSelect key={uuidv4()} tipo={2} item={item} language={language} />)
                        }
                    } else {
                        return (<ItemOptionSelect key={uuidv4()} tipo={2} item={item} language={language} />)
                    }
                }
            )
        )
    }

    const validationSchema = Yup.object().shape({
        sgTipoIdentf: Yup.string().required(language === "es" ? "El campo tipo de identificación es requerido" : (language === "en" ? "The identification type field is required" : "O campo do tipo de identificação é obrigatório")),
        sgCedula: Yup.string().max(20, language === "es" ? "La longitud máxima de carácteres es 20" : (language === "en" ? "The maximum character length is 20" : "O comprimento máximo dos caracteres é 20")).required(language === "es" ? "El campo identificación es requerido" : (language === "en" ? "The identification field is required" : "O campo de identificação é obrigatório")),
        sgNombreComp: Yup.string().min(2, language === "es" ? "La longitud mínima de carácteres es 2" : (language === "en" ? "The minimum character length is 2" : "O comprimento mínimo dos caracteres é 2")).max(190, language === "es" ? "La longitud máxima de carácteres es 190" : (language === "en" ? "The maximum character length is 190" : "O comprimento máximo dos caracteres é de 190")).required(language === "es" ? "El campo nombre completo es requerido" : (language === "en" ? "The full name field is required" : "O campo do nome completo é obrigatório")),
        sgCorreoElect: Yup.string().min(5, language === "es" ? "La longitud mínima de carácteres es 5" : (language === "en" ? "The minimum character length is 5" : "O comprimento mínimo dos caracteres é de 5")).max(148, language === "es" ? "La longitud máxima de carácteres es 148" : (language === "en" ? "The maximum character length is 148" : "O comprimento máximo de caracteres é 148")).required(language === "es" ? "El campo correo electrónico es requerido" : (language === "en" ? "The email field is required" : "O campo do correio electrónico é obrigatório")).email(language === "es" ? "El correo electrónico ingresado no es válido" : (language === "en" ? "The e-mail address entered is invalid" : "O endereço de correio electrónico introduzido é inválido")),
        sgProgmsMsc: Yup.string().required(language === "es" ? "El campo programa de maestría es requerido" : (language === "en" ? "Master's programme field is required" : "É exigido o domínio do programa de mestrado"))
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, reset, formState: { errors }, clearErrors } = useForm(formOptions);
    const onError = (errors, e) => console.log(errors, e);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [disableCtr, setDisableCtr] = useState(true);
    const [mesg, setMesg] = useState("");
    const [tpmsg, setTpmsg] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState();
    const listCountries = [
        ["AM", "Armenia"], ["AR", "Argentina"], ["AT", "Austria"], ["AU", "Australia"], ["BE", "Bélgica"], ["BG", "Bulgaria"], ["BY", "Belarus"], ["BR", "Brasil"], ["CA", "Cánada"], ["CH", "Suiza"], ["CN", "China"], ["CY", "Chipre"], ["CZ", "República Checa"],
        ["DE", "Alemania"], ["DK", "Dinamarca"], ["DZ", "Algeria"], ["EE", "Estonia"], ["ES", "España"], ["FI", "Finlandia"], ["FR", "Francia"], ["GB", "Reino Unido"], ["GR", "Grecia"], ["HR", "Croacia"], ["HU", "Hungría"], ["IE", "Irlanda"], ["IN", "India"],
        ["IR", "Irán"], ["ID", "Indonesia"], ["IS", "Islandia"], ["IT", "Italia"], ["JP", "Japón"], ["KR", "Corea del Sur"], ["LT", "Lituania"], ["LU", "Luxemburgo"], ["LV", "Letonia"], ["LY", "Libia"], ["MT", "Malta"], ["MZ", "Mozambique"], ["NL", "Países Bajos"],
        ["PL", "Polonia"], ["PT", "Portugal"], ["RO", "Rumanía"], ["RU", "Rusia"], ["SE", "Suecia"], ["SL", "Sierra Leona"], ["SK", "Eslovaquia"], ["TR", "Turquía"], ["UA", "Ucrania"], ["US", "Estados Unidos de América"]
    ];

    function validationDniEcuador(valDni) {
        var validated = false, digito_region = "", ultimo_digito = "", pares = 0;

        if (valDni.length == 10) {
            digito_region = valDni.substring(0, 2);
            if (digito_region >= 1 && digito_region <= 24) {
                ultimo_digito = valDni.substring(9, 10);
                pares = parseInt(valDni.substring(1, 2)) + parseInt(valDni.substring(3, 4)) + parseInt(valDni.substring(5, 6)) + parseInt(valDni.substring(7, 8));

                var numero1 = valDni.substring(0, 1);
                var numero1 = (numero1 * 2);
                if (numero1 > 9) { var numero1 = (numero1 - 9); }

                var numero3 = valDni.substring(2, 3);
                var numero3 = (numero3 * 2);
                if (numero3 > 9) { var numero3 = (numero3 - 9); }

                var numero5 = valDni.substring(4, 5);
                var numero5 = (numero5 * 2);
                if (numero5 > 9) { var numero5 = (numero5 - 9); }

                var numero7 = valDni.substring(6, 7);
                var numero7 = (numero7 * 2);
                if (numero7 > 9) { var numero7 = (numero7 - 9); }

                var numero9 = valDni.substring(8, 9);
                var numero9 = (numero9 * 2);
                if (numero9 > 9) { var numero9 = (numero9 - 9); }

                var impares = numero1 + numero3 + numero5 + numero7 + numero9;

                var suma_total = (pares + impares);

                var primer_digito_suma = String(suma_total).substring(0, 1);

                var decena = (parseInt(primer_digito_suma) + 1) * 10;

                var digito_validador = decena - suma_total;

                if (digito_validador == 10)
                    var digito_validador = 0;

                if (digito_validador == ultimo_digito) {
                    validated = true;
                } else {
                    validated = false;
                }

            } else {
                validated = false;
            }
        } else {
            validated = false;
        }

        return validated;
    }

    function eventOnChangeTypeDNI(typeDNI) {
        setDisableCtr(typeDNI === "P" ? false : true)
        document.getElementById("slct-pspsp").selectedIndex = 0;
    }

    const onSubmit = async (data) => {
        var message = '', tipomes = 0, estdVald = false;

        setIsSubmitting(true);
        setMesg(phoneNumber ? (isValidPhoneNumber(phoneNumber) ? '' : (language === "es" ? "El Nº teléfono ingresado no es válido" : (language === "en" ? "The entered phone number is invalid" : "O número de telefone introduzido é inválido"))) :
            (language === "es" ? "El campo Nº teléfono es requerido" : (language === "en" ? "The Phone No. field is required" : "O campo N.º de telefone é obrigatório")));
        if (phoneNumber ? (isValidPhoneNumber(phoneNumber) ? true : false) : false) {

            if (data.sgTipoIdentf === "P") {
                if (data.sgPaisPasp !== "" && data.sgPaisPasp !== undefined) {
                    console.log(data.sgCedula.trim() + ' ' + data.sgPaisPasp);
                    if (!validator.isPassportNumber(data.sgCedula.trim(), data.sgPaisPasp)) {
                        setMesg(language === "es" ? "El Nº pasaporte ingresado no es válido" : (language === "en" ? "The passport number entered is not valid" : "O número de passaporte introduzido não é válido"));
                        estdVald = false;
                    } else {
                        setMesg("");
                        estdVald = true;
                    }
                } else {
                    setMesg(language === "es" ? "El campo país de emisión del pasaporte es requerido" : (language === "en" ? "The country of issue field of the passport is required." : "O campo do país de emissão do passaporte é obrigatório."));
                    estdVald = false;
                }
            } else {
                if (data.sgCedula.length !== 10) {
                    setMesg(language === "es" ? "El Nº de C.I/C.C ingresado no es válido" : (language === "en" ? "The C.I/C.C. No. entered is invalid." : "O número C.I/C.C. introduzido é inválido."));
                    estdVald = false;
                } else {
                    const regNumbers = /^[0-9\b]+$/;

                    if (regNumbers.test(data.sgCedula.trim())) {
                        estdVald = validationDniEcuador(data.sgCedula.trim())
                        setMesg(!estdVald ? (language === "es" ? "El Nº de C.I/C.C ingresado no es válido" : (language === "en" ? "The C.I/C.C. No. entered is invalid." : "O número C.I/C.C. introduzido é inválido.")) : '');
                    } else {
                        estdVald = false;
                        setMesg(language === "es" ? "El Nº de C.I/C.C ingresado no es válido" : (language === "en" ? "The C.I/C.C. No. entered is invalid." : "O número C.I/C.C. introduzido é inválido."));
                    }
                }
            }

            if (estdVald) {

                window.grecaptcha.ready(() => {
                    window.grecaptcha
                        .execute(NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: "submit" })
                        .then(async (token) => {
                            try {
                                await axios.post(`${WS_VALIDATE_FORM}${token}`).then(function (response) {
                                    if (response.data === "OK") {
                                        axios.post(WS_REGISTER_INFORM_INSCRIPTION, {
                                            isCodgDNI: data.sgCedula,
                                            isNombreComp: data.sgNombreComp,
                                            isCorreoElect: data.sgCorreoElect,
                                            isTelefono: phoneNumber.replace('+', ''),
                                            isCodMaestria: (codMaestria !== "" ? codMaestria : data.sgProgmsMsc),
                                            isUrlBrochure: CAREERS_MSC_BROC_DOCS_FOLDER
                                        }).then(function (response) {
                                            switch (response.data) {
                                                case "DNIVCO":
                                                    message = language === "es" ? "El campo cédula/pasaporte es requerido" : (language === "en" ? "The ID/Passport field is required." : "O campo ID/Passaporte é obrigatório.");
                                                    tipomes = 1;
                                                    break;
                                                case "DNILIN":
                                                    message = language === "es" ? "La longitud del campo cédula/pasaporte no es válida" : (language === "en" ? "The length of the ID/Passport field is invalid." : "O comprimento do campo da cédula/passaporte é inválido.");
                                                    tipomes = 1;
                                                    break;
                                                case "NMBVCO":
                                                    message = language === "es" ? "El campo nombre completo es requerido" : (language === "en" ? "The full name field is required" : "O campo do nome completo é obrigatório");
                                                    tipomes = 1;
                                                    break;
                                                case "NMBLIN":
                                                    message = language === "es" ? "La longitud del campo nombre completo no es válida" : (language === "en" ? "The length of the full name field is invalid" : "O comprimento do campo do nome completo é inválido");
                                                    tipomes = 1;
                                                    break;
                                                case "CELVCO":
                                                    message = language === "es" ? "El campo correo electrónico es requerido" : (language === "en" ? "The email field is required" : "O campo do correio electrónico é obrigatório");
                                                    tipomes = 1;
                                                    break;
                                                case "CELLIN":
                                                    message = language === "es" ? "La longitud del campo correo electrónico no es válida" : (language === "en" ? "The length of the e-mail field is invalid" : "O comprimento do campo de correio electrónico é inválido");
                                                    tipomes = 1;
                                                    break;
                                                case "TLFVCO":
                                                    message = language === "es" ? "El campo teléfono es requerido" : (language === "en" ? "The telephone field is required" : "O campo do telefone é obrigatório");
                                                    tipomes = 1;
                                                    break;
                                                case "CDMVCO":
                                                    message = language === "es" ? "El campo programa de maestría es requerido" : (language === "en" ? "Master's programme field is required" : "É exigido o domínio do programa de mestrado");
                                                    tipomes = 1;
                                                    break;
                                                case "INSREX":
                                                    if (codMaestria !== "") {
                                                        document.getElementById("txtdni").value = "";
                                                        document.getElementById("txtname").value = "";
                                                        document.getElementById("txtphone").value = "";
                                                        document.getElementById("txtemail").value = "";
                                                        setPhoneNumber("");
                                                    } else {
                                                        reset();
                                                        setPhoneNumber("");
                                                    }
                                                    clearErrors();
                                                    message = language === "es" ? "El proceso de inscripción se ha llevado a cabo con éxito. Revise el buzón de entrada de su correo electrónico" : (language === "en" ? "The registration process has been successfully completed. Please check your email inbox." : "O processo de registo foi concluído com êxito. Por favor, verifique a sua caixa de correio electrónico.");
                                                    tipomes = 2;
                                                    setDisableCtr(true);
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
                                        message = language === "es" ? "La validación de la herramienta Recaptcha no se completó correctamente." : (language === "en" ? "The validation of the Recaptcha tool was not completed correctly." : "A validação da ferramenta Recaptcha não foi concluída correctamente.");
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
                            setMesg(error.message);
                            setTpmsg(1);
                            setIsSubmitting(false);
                        });
                });
            } else {
                setTpmsg(1);
                setIsSubmitting(false);
            }
        } else {
            setTpmsg(1);
            setIsSubmitting(false);
        }

        return false;
    }

    const onResetClick = () => {
        if (codMaestria !== "") {
            document.getElementById("txtdni").value = "";
            document.getElementById("txtname").value = "";
            document.getElementById("txtphone").value = "";
            document.getElementById("txtemail").value = "";
            setPhoneNumber("");
        } else {
            reset();
            setPhoneNumber("");
        }
        clearErrors();
        setMesg("");
        setTpmsg(0);
        setIsSubmitting(false);
        setDisableCtr(true);
    }

    const renderElementFormInscription = () => {
        return (<><h2 className="title-cont-page text-rigth mt-2">{language === "es" ? "Solicitud de información" : (language === "en" ? "Request for information" : "Pedido de informação")}</h2>
            <div className="row pt-3 g-0" id="form-sugst" ref={formInsc}>
                <div className="col-md-12 col-lg-12 g-0">
                    <div className="row g-0">
                        <div className="card-form">
                            <form className="form-card" onSubmit={handleSubmit(onSubmit)}>
                                <div className="row justify-content-between text-left">
                                    <div className="form-group col-sm-4 flex-column d-flex">
                                        <label className="form-control-label px-3" htmlFor="slct-rpidtf">{language === "es" ? "Tipo de identificación *" : (language === "en" ? "Type of identification *" : "Tipo de identificação *")}</label>
                                        <select name="sgTipoIdentf" {...register('sgTipoIdentf')} className={`form-select form-select-lg ${errors.sgTipoIdentf ? 'is-invalid' : ''}`}
                                            id="slct-rpidtf" data-error={language === "es" ? "El campo tipo de identificación es requerido" : (language === "en" ? "The identification type field is required" : "O campo tipo de identificação é obrigatório")} onChange={e => eventOnChangeTypeDNI(e.target.value)}>
                                            <option value="" >{language === "es" ? "Selecciona el tipo de identificación" : (language === "en" ? "Select the type of identification" : "Seleccionar o tipo de identificação")}</option>
                                            <option value="C" >{language === "es" ? "Cédula de ciudadanía/identidad" : (language === "en" ? "Citizenship card/identity card" : "Cartão de cidadão/bilhete de identidade")}</option>
                                            <option value="P" >{language === "es" ? "Pasaporte" : (language === "en" ? "Passport" : "Passaporte")}</option>
                                        </select>
                                        <div className="invalid-feedback">{errors.sgTipoIdentf?.message}</div>
                                    </div>
                                    <div className="form-group col-sm-4 flex-column d-flex">
                                        <label className="form-control-label px-3" htmlFor="slct-pspsp">{language === "es" ? "País de emisión del pasaporte *" : (language === "en" ? "Country of issue of passport *" : "País de emissão do passaporte *")}</label>
                                        <select name="sgPaisPasp" {...register('sgPaisPasp')} className={`form-select form-select-lg ${errors.sgPaisPasp ? 'is-invalid' : ''}`}
                                            id="slct-pspsp" data-error={language === "es" ? "El campo país de emisión del pasaporte es requerido" : (language === "en" ? "The country of issue field of the passport is required." : "O campo do país de emissão do passaporte é obrigatório.")} disabled={disableCtr}>
                                            <option key={listCountries.length > 0 ? listCountries.length : 0} value="" >{language === "es" ? "Selecciona el país de emisión" : (language === "en" ? "Select the country of issue" : "Seleccionar o país de emissão")}</option>
                                            {listItemsCountries(listCountries)}
                                        </select>
                                        <div className="invalid-feedback">{errors.sgPaisPasp?.message}</div>
                                    </div>
                                    <div className="form-group col-sm-4 flex-column d-flex">
                                        <label className="form-control-label px-3" htmlFor="txtdni">{language === "es" ? "Cédula/Pasaporte *" : (language === "en" ? "Identity Card/Passport *" : "Bilhete de Identidade/Passaporte *")}</label>
                                        <input type="text" id="txtdni" className={`form-control ${errors.sgCedula ? 'is-invalid' : ''}`} name="sgCedula" {...register('sgCedula')} minLength={5} maxLength={20} placeholder={language === "es" ? "Ingresa tu C.I/Pas." : (language === "en" ? "Enter your C.I/Pas." : "Introduza o seu C.I/Pas.")} data-error={language === "es" ? "El número de cédula/pasaporte es requerido" : (language === "en" ? "Identity card/passport number is required." : "É necessário o número do bilhete de identidade/passaporte.")} />
                                        <div className="invalid-feedback">{errors.sgCedula?.message}</div>
                                    </div>
                                </div>
                                <div className="row justify-content-between text-left">
                                    <div className="form-group col-sm-6 flex-column d-flex">
                                        <label className="form-control-label px-3" htmlFor="txtname">{language === "es" ? "Nombre completo *" : (language === "en" ? "Full name *" : "Nome completo *")}</label>
                                        <input type="text" id="txtname" className={`form-control ${errors.sgNombreComp ? 'is-invalid' : ''}`} name="sgNombreComp" {...register('sgNombreComp')} minLength={2} maxLength={190} placeholder={language === "es" ? "Ingresa tu nombre completo" : (language === "en" ? "Enter your full name" : "Introduza o seu nome completo")} data-error={language === "es" ? "El nombre completo es requerido" : (language === "en" ? "Full name is required" : "O nome completo é obrigatório")} />
                                        <div className="invalid-feedback">{errors.sgNombreComp?.message}</div>
                                    </div>
                                    <div className="form-group col-sm-6 flex-column d-flex">
                                        <label className="form-control-label px-3" htmlFor="txtphone">{language === "es" ? "Celular/Teléfono *" : (language === "en" ? "Mobile/Phone *" : "Telemóvel/Telefone *")}</label>
                                        <PhoneInput
                                            placeholder={language === "es" ? "Ingresa tu Nº teléfono" : (language === "en" ? "Enter your phone number" : "Introduza o seu número de telefone")}
                                            name="sgTelefono"
                                            id="txtphone"
                                            {...register('sgTelefono')}
                                            value={phoneNumber}
                                            onChange={setPhoneNumber}
                                            defaultCountry="EC"
                                            rules={{ required: true }}
                                            error={phoneNumber ? (isValidPhoneNumber(phoneNumber) ? undefined : (language === "es" ? "El Nº teléfono ingresado no es válido" : (language === "en" ? "The entered phone number is invalid" : "O número de telefone introduzido é inválido"))) : (language === "es" ? "El campo Nº teléfono es requerido" : (language === "en" ? "The Phone No. field is required" : "O campo N.º de telefone é obrigatório"))} />
                                        <div className="invalid-feedback">{errors.sgTelefono?.message}</div>
                                    </div>
                                </div>
                                <div className="row justify-content-between text-left">
                                    <div className="form-group col-sm-6 flex-column d-flex">
                                        <label className="form-control-label px-3" htmlFor="txtemail">{language === "es" ? "Correo electrónico *" : (language === "en" ? "E-mail *" : "Endereço electrónico *")}</label>
                                        <input type="text" id="txtemail" className={`form-control ${errors.sgCorreoElect ? 'is-invalid' : ''}`} name="sgCorreoElect" {...register('sgCorreoElect')} minLength={5} maxLength={148} placeholder={language === "es" ? "Ingresa tu correo electrónico" : (language === "en" ? "Enter your email address" : "Introduza o seu endereço de correio electrónico")} data-error={language === "es" ? "El correo electrónico es requerido" : (language === "en" ? "Email is required" : "O correio electrónico é obrigatório")} />
                                        <div className="invalid-feedback">{errors.sgCorreoElect?.message}</div>
                                    </div>
                                    <div className="form-group col-sm-6 flex-column d-flex">
                                        <label className="form-control-label px-3" htmlFor="slct-pmsc">{language === "es" ? "Programa de Maestría *" : (language === "en" ? "Master's Programme" : "Programa de Mestrado")}</label>
                                        <select name="sgProgmsMsc" {...register('sgProgmsMsc')} className={`form-select form-select-lg ${errors.sgProgmsMsc ? 'is-invalid' : ''}`}
                                            id="slct-pmsc" data-error={language === "es" ? "El campo programa de maestría es requerido" : (language === "en" ? "Master's programme field is required" : "É exigido o domínio do programa de mestrado")} defaultValue={codMaestria}>
                                            <option key={listProgramsMsc.length > 0 ? listProgramsMsc.length : 0} value="" >{language === "es" ? "Selecciona el programa de Maestría" : (language === "en" ? "Select your Master's programme" : "Seleccione o seu programa de mestrado")}</option>
                                            {listProgramsMsc.length > 0 && listItemsMasters(listProgramsMsc, codMaestria, language)}
                                        </select>
                                        <div className="invalid-feedback">{errors.sgProgmsMsc?.message}</div>
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
                                            {language === "es" ? "Recibir información" : (language === "en" ? "Receive information" : "Receber informações")}
                                        </button>
                                        <button type="reset" disabled={isSubmitting} onClick={onResetClick} className="btn-block">{language === "es" ? "Limpiar" : (language === "en" ? "Clear" : "Limpo")}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <br />
        </>);
    }

    return (<>
        {renderElementFormInscription()}
    </>);

}