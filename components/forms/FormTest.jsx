import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from "axios";
import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { NEXT_PUBLIC_RECAPTCHA_SITE_KEY, WS_VALIDATE_FORM, CAREERS_MSC_BROC_DOCS_FOLDER, WS_REGISTER_INFORM_ENROLLMENT } from 'config';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import validator from 'validator';
import Dropzone from 'react-dropzone'



export { FormTest };

function FormTest(codMaestria, dataMsc, urlVideoTut, estdPerdMatc) {

    const formMatrc = useRef();
    const listProgramsMsc = dataMsc, maxSize = 10485760;

    const validationSchema = Yup.object().shape({
        sgTipoIdentf: Yup.string().required('El campo tipo de identificación es requerido'),
        sgCedula: Yup.string().max(20, 'La longitud máxima de carácteres es 20').required('El campo identificación es requerido'),
        sgNombreComp: Yup.string().min(2, 'La longitud mínima de carácteres es 2').max(190, 'La longitud máxima de carácteres es 190').required('El campo nombre completo es requerido'),
        sgTelefono: Yup.string().required('El campo teléfono es requerido'),
        sgCorreoElect: Yup.string().min(5, 'La longitud mínima de carácteres es 5').max(148, 'La longitud máxima de carácteres es 148').required('El campo correo electrónico es requerido').email('El correo electrónico ingresado no es válido'),
        sgProgmsMsc: Yup.string().required('El campo programa de maestría es requerido')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, reset, formState, control } = useForm(formOptions);
    const { errors } = formState;
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
    const baseStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: 'rgba(236,185,50,1)',
        borderStyle: 'dashed',
        backgroundColor: '#EFEEEE',
        color: '#2D2D2D',
        transition: 'border .3s ease-in-out',
        fontFamily: 'open-sans-light',
        fontSize: '14px',
        height: '70px'
    };

    const activeStyle = {
        borderColor: '#2196f3'
    };

    const acceptStyle = {
        borderColor: '#00e676'
    };

    const rejectStyle = {
        borderColor: '#ff1744'
    };

    const [valPdf1, setValPdf1] = useState([]);
    const [valPdf2, setValPdf2] = useState([]);
    const [valPdf3, setValPdf3] = useState([]);
    const [valPdf4, setValPdf4] = useState([]);
    const [valPdf5, setValPdf5] = useState([]);
    const [valPdf6, setValPdf6] = useState([]);
    const [valPdf7, setValPdf7] = useState([]);
    const [valPdf8, setValPdf8] = useState([]);

    const handleDropPdf1 = acceptedFiles =>
        setValPdf1(acceptedFiles);

    const handleDropPdf2 = acceptedFiles =>
        setValPdf2(acceptedFiles);

    const handleDropPdf3 = acceptedFiles =>
        setValPdf3(acceptedFiles);

    const handleDropPdf4 = acceptedFiles =>
        setValPdf4(acceptedFiles);

    const handleDropPdf5 = acceptedFiles =>
        setValPdf5(acceptedFiles);

    const handleDropPdf6 = acceptedFiles =>
        setValPdf6(acceptedFiles);

    const handleDropPdf7 = acceptedFiles =>
        setValPdf7(acceptedFiles);

    const handleDropPdf8 = acceptedFiles =>
        setValPdf8(acceptedFiles);

    useEffect(() => {
        (async () => {
            setIsSubmitting(estdPerdMatc == 0);
        })();
    }, []);

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

    function validationFilesPdf(DniType) {
        var msjOut = "";

        if (valPdf1.length === 0) {
            msjOut = "el archivo pdf documento de identidad C.I/C.C/Pasaporte es requerido,";
        }

        if (valPdf2.length === 0 && DniType != "P") {
            msjOut += " el archivo pdf registro del título de tercer nivel es requerido,";
        }

        if (valPdf3.length === 0 && DniType == "P") {
            msjOut += " el archivo pdf título de tercer nivel es requerido,";
        }

        if (valPdf8.length === 0) {
            msjOut += " el archivo pdf acuerdo de términos y condiciones es requerido. ";
        }

        if (msjOut !== "") {
            msjOut = msjOut.substring(0, msjOut.length - 1);
        }

        return msjOut;
    }

    const onSubmit = async (data) => {
        var message = '', tipomes = 0, estdVald = false;

        setIsSubmitting(true);
        setMesg(phoneNumber ? (isValidPhoneNumber(phoneNumber) ? '' : 'El Nº teléfono ingresado no es válido') : 'El campo Nº teléfono es requerido');
        if (phoneNumber ? (isValidPhoneNumber(phoneNumber) ? true : false) : false) {

            if (data.sgTipoIdentf === "P") {
                if (data.sgPaisPasp !== "" && data.sgPaisPasp !== undefined) {
                    if (!validator.isPassportNumber(data.sgCedula.trim(), data.sgPaisPasp)) {
                        setMesg("El Nº pasaporte ingresado no es válido");
                        estdVald = false;
                    } else {
                        setMesg("");
                        estdVald = true;
                    }
                } else {
                    setMesg("El campo país de emisión del pasaporte es requerido");
                    estdVald = false;
                }
            } else {
                if (data.sgCedula.length !== 10) {
                    setMesg("El Nº de C.I/C.C ingresado no es válido");
                    estdVald = false;
                } else {
                    const regNumbers = /^[0-9\b]+$/;

                    if (regNumbers.test(data.sgCedula.trim())) {
                        estdVald = validationDniEcuador(data.sgCedula.trim())
                        setMesg(!estdVald ? 'El Nº de C.I/C.C ingresado no es válido' : '');
                    } else {
                        estdVald = false;
                        setMesg('El Nº de C.I/C.C ingresado no es válido');
                    }
                }
            }

            if (estdVald) {

                const msjFls = validationFilesPdf(data.sgTipoIdentf);
                if (msjFls === "") {

                    window.grecaptcha.ready(() => {
                        window.grecaptcha
                            .execute(NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: "submit" })
                            .then(async (token) => {

                                try {
                                    const https = require('https');
                                    const agent = new https.Agent({
                                        rejectUnauthorized: false
                                    });

                                    await axios.post(`${WS_VALIDATE_FORM}${token}`, { httpsAgent: agent }).then(function (response) {
                                        if (response.data === "OK") {
                                            const formData = new FormData();
                                            formData.append('mtCodgDNI', data.sgCedula);
                                            formData.append('mtNombreComp', data.sgNombreComp);
                                            formData.append('mtCorreoElect', data.sgCorreoElect);
                                            formData.append('mtTelefono', data.sgTelefono);
                                            formData.append('mtCodMaestria', (codMaestria !== "" ? codMaestria : data.sgProgmsMsc));
                                            formData.append('mtUrlBrochure', CAREERS_MSC_BROC_DOCS_FOLDER);
                                            formData.append('mtPdfDni', valPdf1[0]);
                                            formData.append('mtPdfRgt', valPdf2[0]);
                                            formData.append('mtPdfTtn', valPdf3[0]);
                                            formData.append('mtPdfAgd', valPdf4[0]);
                                            formData.append('mtPdfRac', valPdf5[0]);
                                            formData.append('mtPdfRlb', valPdf6[0]);
                                            formData.append('mtPdfCmt', valPdf7[0]);
                                            formData.append('mtPdfAtc', valPdf8[0]);

                                            axios.post(WS_REGISTER_INFORM_ENROLLMENT, { httpsAgent: agent }, formData).then(function (response) {
                                                switch (response.data) {
                                                    case "DNIVCO":
                                                        message = 'El campo cédula/pasaporte es requerido';
                                                        tipomes = 1;
                                                        break;
                                                    case "DNILIN":
                                                        message = 'La longitud del campo cédula/pasaporte no es válida';
                                                        tipomes = 1;
                                                        break;
                                                    case "NMBVCO":
                                                        message = 'El campo nombre completo es requerido';
                                                        tipomes = 1;
                                                        break;
                                                    case "NMBLIN":
                                                        message = 'La longitud del campo nombre completo no es válida';
                                                        tipomes = 1;
                                                        break;
                                                    case "CELVCO":
                                                        message = 'El campo correo electrónico es requerido';
                                                        tipomes = 1;
                                                        break;
                                                    case "CELLIN":
                                                        message = 'La longitud del campo correo electrónico no es válida';
                                                        tipomes = 1;
                                                        break;
                                                    case "TLFVCO":
                                                        message = 'El campo teléfono es requerido';
                                                        tipomes = 1;
                                                        break;
                                                    case "CDMVCO":
                                                        message = 'El campo programa de maestría es requerido';
                                                        tipomes = 1;
                                                        break;
                                                    case "MATREX":
                                                        if (codMaestria !== "") {
                                                            document.getElementById("txtdni").value = "";
                                                            document.getElementById("txtname").value = "";
                                                            document.getElementById("txtphone").value = "";
                                                            document.getElementById("txtemail").value = "";
                                                            setPhoneNumber("");
                                                        } else {
                                                            reset();
                                                            document.getElementById("txtdni").value = "";
                                                            document.getElementById("txtname").value = "";
                                                            document.getElementById("txtphone").value = "";
                                                            document.getElementById("txtemail").value = "";
                                                            setPhoneNumber("");
                                                        }
                                                        message = 'El proceso de matriculación se ha llevado a cabo con éxito. Revise el buzón de entrada de su correo electrónico';
                                                        tipomes = 2;
                                                        setDisableCtr(true);
                                                        setValPdf1([]);
                                                        setValPdf2([]);
                                                        setValPdf3([]);
                                                        setValPdf4([]);
                                                        setValPdf5([]);
                                                        setValPdf6([]);
                                                        setValPdf7([]);
                                                        setValPdf8([]);
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
                                            message = 'La validación de la herramienta Recaptcha no se completó correctamente.';
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
                    setMesg(msjFls);
                    setTpmsg(1);
                    setIsSubmitting(false);
                }

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
        setMesg("");
        setTpmsg(0);
        setIsSubmitting(false);
        setDisableCtr(true);
        setValPdf1([]);
        setValPdf2([]);
        setValPdf3([]);
        setValPdf4([]);
        setValPdf5([]);
        setValPdf6([]);
        setValPdf7([]);
        setValPdf8([]);
    }

    const renderElementFormMatriculacion = () => {
        return (<>
            {
                estdPerdMatc == 0 && (<>
                    <div className="ratio ratio-21x9">
                        <img src="/assets/img/img-min-msg-matrc.jpg" className="d-block w-100" alt="Proceso de matriculación" />
                    </div>
                </>)
            }
            <div style={{ visibility: estdPerdMatc == 1 ? 'visible' : 'hidden', height: estdPerdMatc == 0 ? '1px' : 'auto' }}><h2 className="title-cont-page text-rigth mt-2">Formulario de matrícula</h2>
                <div className="row pt-3 g-0" id="form-sugst" ref={formMatrc}>
                    <div className="col-md-12 col-lg-12 g-0">
                        <div className="row g-0">
                            <div className="card-form">
                                <form className="form-card" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row justify-content-between text-left g-0">
                                        {
                                            estdPerdMatc == 0 && (<>
                                                <div className="alert alert-danger alert-form" role="alert">
                                                    Actualmente no se encuentra aperturado el período de matriculación.
                                                </div>
                                            </>)
                                        }
                                        <div className="alert alert-success alert-form" role="alert">
                                            En la casilla Acuerdo de términos y condiciones, debe subir el siguiente documento firmado y escaneado en formato pdf:<br /><a href="#" data-toggle="tooltip" data-placement="bottom" title="Descargar formato de acuerdo de términos y condiciones" target="_blank"><span className="badge bg-secondary">Acuerdo de términos y condiciones</span></a>
                                            <hr />
                                            Los programas de Maestrías que se muestran en la lista desplegable son aquellos que tienen aperturado el período de matriculación.<br />
                                            El título de tercer nivel debe tener la legalización consular o apostilla de La Haya.<br />
                                            El tamaño máximo de los documentos pdf que se van a subir es 10 MB.
                                        </div>
                                    </div>
                                    <div className="row justify-content-between text-left">
                                        <div className="form-group col-sm-4 flex-column d-flex">
                                            <label className="form-control-label px-3" htmlFor="slct-rpidtf">Tipo de identificación *</label>
                                            <select name="sgTipoIdentf" {...register('sgTipoIdentf')} className={`form-select form-select-lg ${errors.sgTipoIdentf ? 'is-invalid' : ''}`}
                                                id="slct-rpidtf" data-error="El campo tipo de identificación es requerido" onChange={e => eventOnChangeTypeDNI(e.target.value)}>
                                                <option value="" >Selecciona el tipo de identificación</option>
                                                <option value="C" >Cédula de ciudadanía/identidad</option>
                                                <option value="P" >Pasaporte</option>
                                            </select>
                                            <div className="invalid-feedback">{errors.sgTipoIdentf?.message}</div>
                                        </div>
                                        <div className="form-group col-sm-4 flex-column d-flex">
                                            <label className="form-control-label px-3" htmlFor="slct-pspsp">País de emisión del pasaporte *</label>
                                            <select name="sgPaisPasp" {...register('sgPaisPasp')} className={`form-select form-select-lg ${errors.sgPaisPasp ? 'is-invalid' : ''}`}
                                                id="slct-pspsp" data-error="El campo país de emisión del pasaporte es requerido" disabled={disableCtr}>
                                                <option key={listCountries.length > 0 ? listCountries.length : 0} value="" >Selecciona el país de emisión</option>
                                                {listCountries.map(
                                                    (item, index) => {
                                                        return (<option key={index} value={item[0]}>{item[1]}</option>);
                                                    })
                                                }
                                            </select>
                                            <div className="invalid-feedback">{errors.sgPaisPasp?.message}</div>
                                        </div>
                                        <div className="form-group col-sm-4 flex-column d-flex">
                                            <label className="form-control-label px-3" htmlFor="txtdni">Cédula/Pasaporte *</label>
                                            <input type="text" id="txtdni" className={`form-control ${errors.sgCedula ? 'is-invalid' : ''}`} name="sgCedula" {...register('sgCedula')} minLength={5} maxLength={20} placeholder="Ingresa tu C.I/Pas." data-error="El número de cédula/pasaporte es requerido" />
                                            <div className="invalid-feedback">{errors.sgCedula?.message}</div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-between text-left">
                                        <div className="form-group col-sm-6 flex-column d-flex">
                                            <label className="form-control-label px-3" htmlFor="txtname">Nombre completo *</label>
                                            <input type="text" id="txtname" className={`form-control ${errors.sgNombreComp ? 'is-invalid' : ''}`} name="sgNombreComp" {...register('sgNombreComp')} minLength={2} maxLength={190} placeholder="Ingresa tu nombre completo" data-error="El nombre completo es requerido" />
                                            <div className="invalid-feedback">{errors.sgNombreComp?.message}</div>
                                        </div>
                                        <div className="form-group col-sm-6 flex-column d-flex">
                                            <label className="form-control-label px-3" htmlFor="txtphone">Celular/Teléfono *</label>
                                            <PhoneInput
                                                placeholder="Ingresa tu Nº teléfono"
                                                name="sgTelefono"
                                                id="txtphone"
                                                {...register('sgTelefono')}
                                                value={phoneNumber}
                                                onChange={setPhoneNumber}
                                                defaultCountry="EC"
                                                rules={{ required: true }}
                                                error={phoneNumber ? (isValidPhoneNumber(phoneNumber) ? undefined : 'El Nº teléfono ingresado no es válido') : 'El campo Nº teléfono es requerido'} />
                                            <div className="invalid-feedback">{errors.sgTelefono?.message}</div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-between text-left">
                                        <div className="form-group col-sm-6 flex-column d-flex">
                                            <label className="form-control-label px-3" htmlFor="txtemail">Correo electrónico *</label>
                                            <input type="text" id="txtemail" className={`form-control ${errors.sgCorreoElect ? 'is-invalid' : ''}`} name="sgCorreoElect" {...register('sgCorreoElect')} minLength={5} maxLength={148} placeholder="Ingresa tu correo electrónico" data-error="El correo electrónico es requerido" />
                                            <div className="invalid-feedback">{errors.sgCorreoElect?.message}</div>
                                        </div>
                                        <div className="form-group col-sm-6 flex-column d-flex">
                                            <label className="form-control-label px-3" htmlFor="slct-pmsc">Programa de Maestría *</label>
                                            <select name="sgProgmsMsc" {...register('sgProgmsMsc')} className={`form-select form-select-lg ${errors.sgProgmsMsc ? 'is-invalid' : ''}`}
                                                id="slct-pmsc" data-error="El campo programa de maestría es requerido" defaultValue={codMaestria}>
                                                <option key={listProgramsMsc.length > 0 ? listProgramsMsc.length : 0} value="" >Selecciona el programa de Maestría</option>
                                                {
                                                    listProgramsMsc.length > 0 && (<>
                                                        {listProgramsMsc.map(
                                                            (item, index) => {
                                                                return (<>
                                                                    {
                                                                        codMaestria !== "" && (<>
                                                                            {
                                                                                codMaestria.trim() === item.crCodigo.trim() && (<>
                                                                                    <option key={index} value={item.crCodigo.trim()}>{item.crNombre.trim()}</option>
                                                                                </>)
                                                                            }
                                                                        </>)
                                                                    }
                                                                    {
                                                                        codMaestria === "" && (<>
                                                                            <option key={index} value={item.crCodigo.trim()}>{item.crNombre.trim()}</option>
                                                                        </>)
                                                                    }
                                                                </>);
                                                            }
                                                        )}
                                                    </>)
                                                }
                                            </select>
                                            <div className="invalid-feedback">{errors.sgProgmsMsc?.message}</div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-between text-left">
                                        <div className="form-group col-sm-6 flex-column d-flex">
                                            <label className="form-control-label px-3" htmlFor="inp-dni">Documento de identidad C.I/C.C/Pasaporte *</label>
                                            <Dropzone onDrop={handleDropPdf1} id="inp-dni" accept="application/pdf" maxFiles={1} maxSize={maxSize} multiple={false}>
                                                {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => {

                                                    const style = useMemo(() => ({
                                                        ...baseStyle,
                                                        ...(isDragActive ? activeStyle : {}),
                                                        ...(isDragAccept ? acceptStyle : {}),
                                                        ...(isDragReject ? rejectStyle : {})
                                                    }), [
                                                        isDragActive,
                                                        isDragReject,
                                                        isDragAccept
                                                    ]);

                                                    return (
                                                        <div {...getRootProps({ style })} className="mt-2">
                                                            <input {...getInputProps()} />
                                                            <div>
                                                                {!isDragActive && "Arrastrar y soltar tu hoja de vida en formato pdf"}
                                                                {isDragActive && !isDragReject && "Soltar el archivo pdf"}
                                                                {isDragReject && "Tipo de archivo no aceptado"}
                                                            </div>
                                                        </div>
                                                    );
                                                }}
                                            </Dropzone>
                                            {
                                                valPdf1.length > 0 && (<>
                                                    <ul className="ul-list-files-docs mt-2">{
                                                        valPdf1.map(file => (
                                                            <li key={file.path} className="pnl-list-files-docs">
                                                                Documento: {file.path} - Tamaño: {Math.round(((1 * file.size) / 1048576) * 100) / 100} MB
                                                            </li>
                                                        ))
                                                    }</ul>
                                                </>)
                                            }
                                        </div>
                                        <div className="form-group col-sm-6 flex-column d-flex">
                                            <label className="form-control-label px-3" htmlFor="inp-rgt">Registro del título de tercer nivel *</label>
                                            <Dropzone onDrop={handleDropPdf2} id="inp-rgt" accept="application/pdf" maxFiles={1} maxSize={maxSize} multiple={false}>
                                                {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => {

                                                    const style = useMemo(() => ({
                                                        ...baseStyle,
                                                        ...(isDragActive ? activeStyle : {}),
                                                        ...(isDragAccept ? acceptStyle : {}),
                                                        ...(isDragReject ? rejectStyle : {})
                                                    }), [
                                                        isDragActive,
                                                        isDragReject,
                                                        isDragAccept
                                                    ]);

                                                    return (
                                                        <div {...getRootProps({ style })} className="mt-2">
                                                            <input {...getInputProps()} />
                                                            <div>
                                                                {!isDragActive && "Arrastrar y soltar tu hoja de vida en formato pdf"}
                                                                {isDragActive && !isDragReject && "Soltar el archivo pdf"}
                                                                {isDragReject && "Tipo de archivo no aceptado"}
                                                            </div>
                                                        </div>
                                                    );
                                                }}
                                            </Dropzone>
                                            {
                                                valPdf2.length > 0 && (<>
                                                    <ul className="ul-list-files-docs mt-2">{
                                                        valPdf2.map(file => (
                                                            <li key={file.path} className="pnl-list-files-docs">
                                                                Documento: {file.path} - Tamaño: {Math.round(((1 * file.size) / 1048576) * 100) / 100} MB
                                                            </li>
                                                        ))
                                                    }</ul>
                                                </>)
                                            }
                                        </div>
                                    </div>
                                    <div className="row justify-content-between text-left">
                                        <div className="form-group col-sm-6 flex-column d-flex">
                                            <label className="form-control-label px-3" htmlFor="inp-ttn">Título de tercer nivel</label>
                                            <Dropzone onDrop={handleDropPdf3} id="inp-ttn" accept="application/pdf" maxFiles={1} maxSize={maxSize} multiple={false}>
                                                {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => {

                                                    const style = useMemo(() => ({
                                                        ...baseStyle,
                                                        ...(isDragActive ? activeStyle : {}),
                                                        ...(isDragAccept ? acceptStyle : {}),
                                                        ...(isDragReject ? rejectStyle : {})
                                                    }), [
                                                        isDragActive,
                                                        isDragReject,
                                                        isDragAccept
                                                    ]);

                                                    return (
                                                        <div {...getRootProps({ style })} className="mt-2">
                                                            <input {...getInputProps()} />
                                                            <div>
                                                                {!isDragActive && "Arrastrar y soltar tu hoja de vida en formato pdf"}
                                                                {isDragActive && !isDragReject && "Soltar el archivo pdf"}
                                                                {isDragReject && "Tipo de archivo no aceptado"}
                                                            </div>
                                                        </div>
                                                    );
                                                }}
                                            </Dropzone>
                                            {
                                                valPdf3.length > 0 && (<>
                                                    <ul className="ul-list-files-docs mt-2">{
                                                        valPdf3.map(file => (
                                                            <li key={file.path} className="pnl-list-files-docs">
                                                                Documento: {file.path} - Tamaño: {Math.round(((1 * file.size) / 1048576) * 100) / 100} MB
                                                            </li>
                                                        ))
                                                    }</ul>
                                                </>)
                                            }
                                        </div>
                                        <div className="form-group col-sm-6 flex-column d-flex">
                                            <label className="form-control-label px-3" htmlFor="inp-acg">Acta de grado</label>
                                            <Dropzone onDrop={handleDropPdf4} id="inp-acg" accept="application/pdf" maxFiles={1} maxSize={maxSize} multiple={false}>
                                                {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => {

                                                    const style = useMemo(() => ({
                                                        ...baseStyle,
                                                        ...(isDragActive ? activeStyle : {}),
                                                        ...(isDragAccept ? acceptStyle : {}),
                                                        ...(isDragReject ? rejectStyle : {})
                                                    }), [
                                                        isDragActive,
                                                        isDragReject,
                                                        isDragAccept
                                                    ]);

                                                    return (
                                                        <div {...getRootProps({ style })} className="mt-2">
                                                            <input {...getInputProps()} />
                                                            <div>
                                                                {!isDragActive && "Arrastrar y soltar tu hoja de vida en formato pdf"}
                                                                {isDragActive && !isDragReject && "Soltar el archivo pdf"}
                                                                {isDragReject && "Tipo de archivo no aceptado"}
                                                            </div>
                                                        </div>
                                                    );
                                                }}
                                            </Dropzone>
                                            {
                                                valPdf4.length > 0 && (<>
                                                    <ul className="ul-list-files-docs mt-2">{
                                                        valPdf4.map(file => (
                                                            <li key={file.path} className="pnl-list-files-docs">
                                                                Documento: {file.path} - Tamaño: {Math.round(((1 * file.size) / 1048576) * 100) / 100} MB
                                                            </li>
                                                        ))
                                                    }</ul>
                                                </>)
                                            }
                                        </div>
                                    </div>
                                    <div className="row justify-content-between text-left">
                                        <div className="form-group col-sm-6 flex-column d-flex">
                                            <label className="form-control-label px-3" htmlFor="inp-rda">Record académico</label>
                                            <Dropzone onDrop={handleDropPdf5} id="inp-rda" accept="application/pdf" maxFiles={1} maxSize={maxSize} multiple={false}>
                                                {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => {

                                                    const style = useMemo(() => ({
                                                        ...baseStyle,
                                                        ...(isDragActive ? activeStyle : {}),
                                                        ...(isDragAccept ? acceptStyle : {}),
                                                        ...(isDragReject ? rejectStyle : {})
                                                    }), [
                                                        isDragActive,
                                                        isDragReject,
                                                        isDragAccept
                                                    ]);

                                                    return (
                                                        <div {...getRootProps({ style })} className="mt-2">
                                                            <input {...getInputProps()} />
                                                            <div>
                                                                {!isDragActive && "Arrastrar y soltar tu hoja de vida en formato pdf"}
                                                                {isDragActive && !isDragReject && "Soltar el archivo pdf"}
                                                                {isDragReject && "Tipo de archivo no aceptado"}
                                                            </div>
                                                        </div>
                                                    );
                                                }}
                                            </Dropzone>
                                            {
                                                valPdf5.length > 0 && (<>
                                                    <ul className="ul-list-files-docs mt-2">{
                                                        valPdf5.map(file => (
                                                            <li key={file.path} className="pnl-list-files-docs">
                                                                Documento: {file.path} - Tamaño: {Math.round(((1 * file.size) / 1048576) * 100) / 100} MB
                                                            </li>
                                                        ))
                                                    }</ul>
                                                </>)
                                            }
                                        </div>
                                        <div className="form-group col-sm-6 flex-column d-flex">
                                            <label className="form-control-label px-3" htmlFor="inp-rla">Referencias laborales/académicas</label>
                                            <Dropzone onDrop={handleDropPdf6} id="inp-rla" accept="application/pdf" maxFiles={1} maxSize={maxSize} multiple={false}>
                                                {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => {

                                                    const style = useMemo(() => ({
                                                        ...baseStyle,
                                                        ...(isDragActive ? activeStyle : {}),
                                                        ...(isDragAccept ? acceptStyle : {}),
                                                        ...(isDragReject ? rejectStyle : {})
                                                    }), [
                                                        isDragActive,
                                                        isDragReject,
                                                        isDragAccept
                                                    ]);

                                                    return (
                                                        <div {...getRootProps({ style })} className="mt-2">
                                                            <input {...getInputProps()} />
                                                            <div>
                                                                {!isDragActive && "Arrastrar y soltar tu hoja de vida en formato pdf"}
                                                                {isDragActive && !isDragReject && "Soltar el archivo pdf"}
                                                                {isDragReject && "Tipo de archivo no aceptado"}
                                                            </div>
                                                        </div>
                                                    );
                                                }}
                                            </Dropzone>
                                            {
                                                valPdf6.length > 0 && (<>
                                                    <ul className="ul-list-files-docs mt-2">{
                                                        valPdf6.map(file => (
                                                            <li key={file.path} className="pnl-list-files-docs">
                                                                Documento: {file.path} - Tamaño: {Math.round(((1 * file.size) / 1048576) * 100) / 100} MB
                                                            </li>
                                                        ))
                                                    }</ul>
                                                </>)
                                            }
                                        </div>
                                    </div>
                                    <div className="row justify-content-between text-left">
                                        <div className="form-group col-sm-6 flex-column d-flex">
                                            <label className="form-control-label px-3" htmlFor="inp-ctm">Carta de motivación</label>
                                            <Dropzone onDrop={handleDropPdf7} id="inp-ctm" accept="application/pdf" maxFiles={1} maxSize={maxSize} multiple={false}>
                                                {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => {

                                                    const style = useMemo(() => ({
                                                        ...baseStyle,
                                                        ...(isDragActive ? activeStyle : {}),
                                                        ...(isDragAccept ? acceptStyle : {}),
                                                        ...(isDragReject ? rejectStyle : {})
                                                    }), [
                                                        isDragActive,
                                                        isDragReject,
                                                        isDragAccept
                                                    ]);

                                                    return (
                                                        <div {...getRootProps({ style })} className="mt-2">
                                                            <input {...getInputProps()} />
                                                            <div>
                                                                {!isDragActive && "Arrastrar y soltar tu hoja de vida en formato pdf"}
                                                                {isDragActive && !isDragReject && "Soltar el archivo pdf"}
                                                                {isDragReject && "Tipo de archivo no aceptado"}
                                                            </div>
                                                        </div>
                                                    );
                                                }}
                                            </Dropzone>
                                            {
                                                valPdf7.length > 0 && (<>
                                                    <ul className="ul-list-files-docs mt-2">{
                                                        valPdf7.map(file => (
                                                            <li key={file.path} className="pnl-list-files-docs">
                                                                Documento: {file.path} - Tamaño: {Math.round(((1 * file.size) / 1048576) * 100) / 100} MB
                                                            </li>
                                                        ))
                                                    }</ul>
                                                </>)
                                            }
                                        </div>
                                        <div className="form-group col-sm-6 flex-column d-flex">
                                            <label className="form-control-label px-3" htmlFor="inp-atc">Acuerdo de términos y condiciones *</label>
                                            <Dropzone onDrop={handleDropPdf8} id="inp-atc" accept="application/pdf" maxFiles={1} maxSize={maxSize} multiple={false}>
                                                {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => {

                                                    const style = useMemo(() => ({
                                                        ...baseStyle,
                                                        ...(isDragActive ? activeStyle : {}),
                                                        ...(isDragAccept ? acceptStyle : {}),
                                                        ...(isDragReject ? rejectStyle : {})
                                                    }), [
                                                        isDragActive,
                                                        isDragReject,
                                                        isDragAccept
                                                    ]);

                                                    return (
                                                        <div {...getRootProps({ style })} className="mt-2">
                                                            <input {...getInputProps()} />
                                                            <div>
                                                                {!isDragActive && "Arrastrar y soltar tu hoja de vida en formato pdf"}
                                                                {isDragActive && !isDragReject && "Soltar el archivo pdf"}
                                                                {isDragReject && "Tipo de archivo no aceptado"}
                                                            </div>
                                                        </div>
                                                    );
                                                }}
                                            </Dropzone>
                                            {
                                                valPdf8.length > 0 && (<>
                                                    <ul className="ul-list-files-docs mt-2">{
                                                        valPdf8.map(file => (
                                                            <li key={file.path} className="pnl-list-files-docs">
                                                                Documento: {file.path} - Tamaño: {Math.round(((1 * file.size) / 1048576) * 100) / 100} MB
                                                            </li>
                                                        ))
                                                    }</ul>
                                                </>)
                                            }
                                        </div>
                                    </div>
                                    {
                                        mesg != "" && (
                                            <div className="row justify-content-end g-0 mt-2">
                                                <div className={`alert ${tpmsg == 1 ? 'alert-danger' : (tpmsg == 2 ? 'alert-success' : '')} alert-form`} role="alert">
                                                    {mesg}
                                                </div>
                                            </div>
                                        )
                                    }
                                    <div className="row justify-content-end mt-2">
                                        <div className="form-group col-sm-6 col-lg-12 text-center">
                                            <button type="submit" disabled={isSubmitting} className="btn-block mr-2">
                                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}&nbsp;&nbsp;
                                                Registrar matrícula
                                            </button>
                                            <button type="reset" disabled={isSubmitting} onClick={onResetClick} className="btn-block">Limpiar</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div></div>
            {
                (urlVideoTut !== null && urlVideoTut !== "" && urlVideoTut !== "#") && (<>
                    <hr /><h2 className="title-cont-page text-rigth mt-2">Instructivo del proceso de matriculación</h2><div className="row g-0">
                        <div className="ratio ratio-21x9">
                            <iframe src={urlVideoTut} title="Instructivo del proceso de matriculación" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                        </div>
                    </div>
                </>)
            }
            <br />
        </>);
    }

    return (<>
        {renderElementFormMatriculacion()}
    </>);

}