import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from "axios";
import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { WS_VALIDATE_FORM, WS_LIST_DATA_GENERAL_NUM1, NEXT_PUBLIC_RECAPTCHA_SITE_KEY, WS_REGISTER_DATA_CURRICULUM_VITAE_UTH } from 'config';
import Dropzone from 'react-dropzone';
import Select from "react-select";
import makeAnimated from 'react-select/animated';

export { FormUTH };

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
    height: '150px'
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

async function make_request_ws(path_url) {
    var listTemp = null;
    const https = require('https');
    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    try {
        await axios.get(path_url, { httpsAgent: agent }).then(function (response) {
            listTemp = response;
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log();
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
            listTemp = null;
        })
    } catch (error) {
        console.log(error.message);
        listTemp = null;
    }

    return (listTemp);
}

function FormUTH(listVocationalTrain, listWorkExperience, language) {
    const formUnidadTH = useRef();
    const maxSize = 10485760;
    const [listProfessionalArea, setListProfessionalArea] = useState([]);
    const validationSchema = Yup.object().shape({
        sgCedulasc: Yup.string().required((language === "es" ? "El campo cédula es requerido" : (language === "en" ? "The identity document field is required" : "O campo do documento de identidade é obrigatório")))
            .min(10, (language === "es" ? "La longitud mínima de carácteres es 10" : (language === "en" ? "The minimum character length is 10" : "O comprimento mínimo dos caracteres é de 10")))
            .max(10, (language === "es" ? "La longitud máxima de carácteres es 10" : (language === "en" ? "The maximum character length is 10" : "O comprimento máximo dos caracteres é de 10"))),
        sgNombreCompsc: Yup.string().required((language === "es" ? "El campo nombre completo es requerido" : (language === "en" ? "The full name field is required" : "O campo do nome completo é obrigatório")))
            .min(2, (language === "es" ? "La longitud mínima de carácteres es 2" : (language === "en" ? "The minimum character length is 2" : "O comprimento mínimo dos caracteres é de 2")))
            .max(200, (language === "es" ? "La longitud máxima de carácteres es 200" : (language === "en" ? "The maximum character length is 200" : "O comprimento máximo dos caracteres é de 200"))),
        sgExpLabsc: Yup.string().required((language === "es" ? "Debe seleccionar la experiencia laboral" : (language === "en" ? "You must select work experience" : "Deve seleccionar a sua experiência de trabalho"))),
        sgFormProfssc: Yup.string().required((language === "es" ? "Debe seleccionar la formación profesional superior" : (language === "en" ? "You must select higher vocational training" : "Deve seleccionar a formação profissional superior"))),
        sgPapersc: Yup.string().nullable().notRequired().when('sgPapersc', {
            is: (value) => value?.length,
            then: (rule) => rule.min(2, (language === "es" ? "La longitud mínima de carácteres es 2" : (language === "en" ? "The minimum character length is 2" : "O comprimento mínimo dos caracteres é de 2")))
                .max(2000, (language === "es" ? "La longitud máxima de carácteres es 2000" : (language === "en" ? "The maximum character length is 2000" : "O comprimento máximo de caracteres é de 2000"))),
        })
    },
        [
            ['sgPapersc', 'sgPapersc'],
        ]);
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, reset, formState, control } = useForm(formOptions);
    const { errors } = formState;
    const [isSubmittingForm2, setIsSubmittingForm2] = useState(false);
    const [mesgForm2, setMesgForm2] = useState("");
    const [tpmsgForm2, setTpmsgForm2] = useState(0);
    const [valPdf1, setValPdf1] = useState([]);
    const [listCamProfs, setListCamProfs] = useState([]);

    const handleDropPdf1 = acceptedFiles =>
        setValPdf1(acceptedFiles);

    useEffect(() => {
        (async () => {
            const listWorks = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}AREAS_TB_UTH`);
            setListProfessionalArea((listWorks.data !== null && listWorks.data !== "") ? listWorks.data : []);
        })();
    }, []);

    const listOptions = listProfessionalArea.map((item) => {
        return {
            value: item.dmCodgDato,
            label: (language === "es" ? item.dmDescripcion.trim() : (language === "en" ? item.dmDescripcionEn.trim() : item.dmDescripcionPt.trim())),
            isFixed: false
        }
    });

    const handleMultiChange = (option, { action, removedValue }) => {
        switch (action) {
            case "remove-value":
            case "pop-value":
                const index = listCamProfs.indexOf(removedValue);

                if (index > -1) {
                    listCamProfs.splice(index, 1)
                }

                if (listCamProfs.length < 3) {
                    setMesgForm2("");
                    setTpmsgForm2(0);
                }

                break;
            case "clear":
                setListCamProfs([]);
                setMesgForm2("");
                setTpmsgForm2(0);
                break;
            case "select-option":
                if (listCamProfs.length < 3) {
                    if (!listCamProfs.includes(option)) {
                        setListCamProfs(option);
                    }
                } else {
                    setMesgForm2(language === "es" ? "El número máximo de campos profesionales seleccionados es 3." : (language === "en" ? "The maximum number of selected professional fields is 3." : "O número máximo de campos profissionais seleccionados é de 3."));
                    setTpmsgForm2(1);
                }
                break;
        }
    }

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

    function getStringProfsArea(listCP, optcp) {
        let areas_prof = "";

        listCP.map((item) => {
            areas_prof = optcp === 1 ? areas_prof + item.value + "," : areas_prof + item.label + ", ";
        })

        return areas_prof.replace(/,\s*$/, "");
    }

    const onSubmitFormWorkCV = async (data) => {
        var message = '', tipomes = 0, estdVald = false;

        setIsSubmittingForm2(true);

        if (listCamProfs.length > 0 && listCamProfs != null) {
            if (listCamProfs.length <= 3) {
                if (data.sgCedulasc !== null || data.sgCedulasc !== "") {
                    if (data.sgCedulasc.length !== 10) {
                        setMesgForm2(language === "es" ? "El Nº de C.I/C.C ingresado no es válido" : (language === "en" ? "The identity document entered is not valid" : "O documento de identidade introduzido não é válido"));
                        estdVald = false;
                    } else {
                        const regNumbers = /^[0-9\b]+$/;

                        if (regNumbers.test(data.sgCedulasc.trim())) {
                            estdVald = validationDniEcuador(data.sgCedulasc.trim())
                            setMesgForm2(!estdVald ? (language === "es" ? 'El Nº de C.I/C.C ingresado no es válido' : (language === "en" ? "The identity document entered is not valid" : "O documento de identidade introduzido não é válido")) : '');
                        } else {
                            estdVald = false;
                            setMesgForm2(language === "es" ? 'El Nº de C.I/C.C ingresado no es válido' : (language === "en" ? "The identity document entered is not valid" : "O documento de identidade introduzido não é válido"));
                        }
                    }
                } else {
                    setMesgForm2(language === "es" ? "El campo cédula es requerido" : (language === "en" ? "The identity document field is required" : "O campo do documento de identidade é obrigatório"));
                    estdVald = false;
                }

                if (estdVald) {
                    if (valPdf1.length > 0) {
                        window.grecaptcha.ready(() => {
                            window.grecaptcha
                                .execute(NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: "submit" })
                                .then(async (token) => {

                                    try {
                                        await axios.post(`${WS_VALIDATE_FORM}${token}`).then(function (response) {
                                            if (response.data === "OK") {
                                                const formData = new FormData();
                                                formData.append('btNumDni', data.sgCedulasc);
                                                formData.append('btNombreComp', data.sgNombreCompsc);
                                                formData.append('btCodExpLab', data.sgExpLabsc);
                                                formData.append('btCodCampoProf', getStringProfsArea(listCamProfs, 1));
                                                formData.append('btLabCampoProf', getStringProfsArea(listCamProfs, 2));
                                                formData.append('btCodFormProf', data.sgFormProfssc);
                                                formData.append('btPublicaciones', data.sgPapersc);
                                                formData.append('btArchvHV', valPdf1[0]);
                                                formData.append('btNombrePdfHV', 'hoja-vida.pdf');

                                                axios.post(WS_REGISTER_DATA_CURRICULUM_VITAE_UTH, formData).then(function (response) {
                                                    switch (response.data) {
                                                        case "DNIVCO":
                                                            message = (language === "es" ? "El campo cédula es requerido" : (language === "en" ? "The identity document field is required" : "O campo do documento de identidade é obrigatório"));
                                                            tipomes = 1;
                                                            break;
                                                        case "DNILIN":
                                                            message = (language === "es" ? 'La longitud del campo cédula no es válida' : (language === "en" ? "The length of the identity document field is invalid" : "O comprimento do campo do documento de identidade é inválido"));
                                                            tipomes = 1;
                                                            break;
                                                        case "NMBVCO":
                                                            message = (language === "es" ? 'El campo nombre completo es requerido' : (language === "en" ? "The full name field is required" : "O campo do nome completo é obrigatório"));
                                                            tipomes = 1;
                                                            break;
                                                        case "NMBLIN":
                                                            message = (language === "es" ? 'La longitud del campo nombre completo no es válida' : (language === "en" ? "The length of the full name field is invalid" : "O comprimento do campo do nome completo é inválido"));
                                                            tipomes = 1;
                                                            break;
                                                        case "EXLVCO":
                                                            message = (language === "es" ? 'El campo experiencia laboral es requerido' : (language === "en" ? "The field work experience is required" : "A experiência de trabalho de campo é necessária"));
                                                            tipomes = 1;
                                                            break;
                                                        case "CPFVCO":
                                                            message = (language === "es" ? 'Debe seleccionar el campo profesional' : (language === "en" ? "You must select the professional area" : "Deve seleccionar a área profissional"));
                                                            tipomes = 1;
                                                            break;
                                                        case "FPFVCO":
                                                            message = (language === "es" ? 'El campo formación profesional es requerido' : (language === "en" ? "The field of vocational training is required" : "O campo da formação profissional é necessário"));
                                                            tipomes = 1;
                                                            break;
                                                        case "PUBLIN":
                                                            message = (language === "es" ? 'La longitud del campo publicaciones no es válida' : (language === "en" ? "The length of the publications field is invalid" : "A extensão do campo de publicações é inválida"));
                                                            tipomes = 1;
                                                            break;
                                                        case "EXLNEX":
                                                        case "EXLNAC":
                                                            message = (language === "es" ? 'La experiencia laboral seleccionada no se encuentra disponible' : (language === "en" ? "The selected work experience is not available" : "A experiência de trabalho seleccionada não está disponível"));
                                                            tipomes = 1;
                                                            break;
                                                        case "CPFNEX":
                                                        case "CPFNAC":
                                                            message = (language === "es" ? 'El campo profesional seleccionado no se encuentra disponible' : (language === "en" ? "The selected professional area is not available" : "A área profissional seleccionada não está disponível"));
                                                            tipomes = 1;
                                                            break;
                                                        case "FPFNEX":
                                                        case "FPFNAC":
                                                            message = (language === "es" ? 'La formación profesional seleccionada no se encuentra disponible' : (language === "en" ? "The selected vocational training is not available" : "A formação profissional seleccionada não está disponível"));
                                                            tipomes = 1;
                                                            break;
                                                        case "HVYFEN":
                                                            message = (language === "es" ? 'La información ingresada ya se encuentra registrada en la base de información. Solo se permite 1 envío de información cada 30 días.' : (language === "en" ? "The information entered is already registered in the database. Only 1 submission is allowed every 30 days." : "As informações introduzidas já se encontram registadas na base de dados. Apenas 1 submissão é permitida a cada 30 dias."));
                                                            tipomes = 1;
                                                            break;
                                                        case "DTSREX":
                                                            reset();
                                                            message = (language === "es" ? 'Recibido en el buzón de la Unidad de Talento Humano' : (language === "en" ? "Received in the mailbox of the Human Talent Unit" : "Recebido na caixa de correio da Unidade de Talentos Humanos"));
                                                            tipomes = 2;
                                                            setValPdf1([]);
                                                            setListCamProfs([]);
                                                            break;
                                                    }
                                                    setMesgForm2(message);
                                                    setTpmsgForm2(tipomes);
                                                    setIsSubmittingForm2(false);
                                                }).catch(function (error) {
                                                    setMesgForm2(error);
                                                    setTpmsgForm2(1);
                                                    setIsSubmittingForm2(false);
                                                })

                                            } else {
                                                message = (language === "es" ? 'La validación de la herramienta Recaptcha no se completó correctamente.' : (language === "en" ? "The validation of the Recaptcha tool was not completed correctly." : "A validação da ferramenta Recaptcha não foi completada correctamente."));
                                                setMesgForm2(message);
                                                setTpmsgForm2(1);
                                                setIsSubmittingForm2(false);
                                            }
                                        }).catch(function (error) {
                                            setMesgForm2(error);
                                            setTpmsgForm2(1);
                                            setIsSubmittingForm2(false);
                                        })
                                    } catch (error) {
                                        setMesgForm2(error.message);
                                        setTpmsgForm2(1);
                                        setIsSubmittingForm2(false);
                                    }
                                })
                                .catch((error) => {
                                    setMesgForm2(error.message);
                                    setTpmsgForm2(1);
                                    setIsSubmittingForm2(false);
                                });
                        });
                    } else {
                        setMesgForm2((language === "es" ? "La hoja de vida (pdf) es requerida" : (language === "en" ? "Curriculum vitae (pdf) is required" : "Currículo (pdf) é necessário")));
                        setTpmsgForm2(1);
                        setIsSubmittingForm2(false);
                    }
                } else {
                    setTpmsgForm2(1);
                    setIsSubmittingForm2(false);
                }
            } else {
                setMesgForm2((language === "es" ? "El número máximo de campos profesionales que puede seleccionar es 3." : (language === "en" ? "The maximum number of professional fields you can select is 3." : "O número máximo de campos profissionais que pode seleccionar é 3.")));
                setTpmsgForm2(1);
                setIsSubmittingForm2(false);
            }
        } else {
            setMesgForm2((language === "es" ? "Debe seleccionar el/los campo/s profesional/es" : (language === "en" ? "You must select the professional field(s)" : "Deve seleccionar o(s) campo(s) profissional(ais)")));
            setTpmsgForm2(1);
            setIsSubmittingForm2(false);
        }

        return false;
    }

    const onResetClickFormWorkCV = () => {
        reset();
        setMesgForm2("");
        setTpmsgForm2(0);
        setIsSubmittingForm2(false);
        setValPdf1([]);
        setListCamProfs([]);
    }

    const renderComponentFormWorkCV = () => {
        return (<>
            <div className="row" ref={formUnidadTH}>
                <div className="card-form">
                    <form className="form-card" encType="multipart/form-data" onSubmit={handleSubmit(onSubmitFormWorkCV)}>
                        <div className="row justify-content-between text-left">
                            <div className="form-group col-sm-3 flex-column d-flex">
                                <label className="form-control-label px-3" htmlFor="txtdnisc">{`${(language === "es" ? "Cédula" : (language === "en" ? "Identity card" : "Documento de identidade"))} *`}</label>
                                <input type="text" id="txtdnisc" className={`form-control ${errors.sgCedulasc ? 'is-invalid' : ''}`} name="sgCedulasc" {...register('sgCedulasc')} onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }} minLength={10} maxLength={10} placeholder={(language === "es" ? "Ingresa tu número de cédula" : (language === "en" ? "Enter your identity document" : "Introduza o seu documento de identidade"))} data-error={language === "es" ? "El número de cédula es requerido" : (language === "en" ? "Identity document is required" : "É necessário documento de identidade")} />
                                <div className="invalid-feedback">{errors.sgCedulasc?.message}</div>
                            </div>
                            <div className="form-group col-sm-5 flex-column d-flex">
                                <label className="form-control-label px-3" htmlFor="txtnamesc">{`${(language === "es" ? "Nombre completo" : (language === "en" ? "Full name" : "Nome completo"))} *`}</label>
                                <input type="text" id="txtnamesc" className={`form-control ${errors.sgNombreCompsc ? 'is-invalid' : ''}`} name="sgNombreCompsc" {...register('sgNombreCompsc')} minLength={2} maxLength={190} placeholder={language === "es" ? "Ingresa tu nombre completo" : (language === "en" ? "Enter your full name" : "Introduza o seu nome completo")}
                                    data-error={language === "es" ? "El nombre completo es requerido" : (language === "en" ? "Full name is required" : "O nome completo é obrigatório")} />
                                <div className="invalid-feedback">{errors.sgNombreCompsc?.message}</div>
                            </div>
                            <div className="form-group col-sm-4 flex-column d-flex">
                                <label className="form-control-label px-3" htmlFor="slct-explab">{`${(language === "es" ? "Experiencia laboral" : (language === "en" ? "Work experience" : "Experiência de trabalho"))} *`}</label>
                                <select name="sgExpLabsc" {...register('sgExpLabsc')} className={`form-select form-select-lg ${errors.sgExpLabsc ? 'is-invalid' : ''}`}
                                    id="slct-explab" data-error={language === "es" ? "El campo experiencia laboral es requerido" : (language === "en" ? "The field work experience is required" : "A experiência de trabalho de campo é necessária")}>
                                    <option key={listVocationalTrain.length} value="">{language === "es" ? "Selecciona una opción" : (language === "en" ? "Select an option" : "Seleccione uma opção")}</option>
                                    {listVocationalTrain.map(
                                        (item, index) => {
                                            return (<option key={index} value={item.dmCodgDato}>{language === "es" ? item.dmDescripcion.trim() : (language === "en" ? item.dmDescripcionEn.trim() : item.dmDescripcionPt.trim())}</option>);
                                        }
                                    )}
                                </select>
                                <div className="invalid-feedback">{errors.sgExpLabsc?.message}</div>
                            </div>
                        </div>
                        <div className="row justify-content-between text-left">
                            <div className="form-group col-sm-8 flex-column d-flex">
                                <label className="form-control-label px-3" htmlFor="slct-Cmpf">{`${(language === "es" ? "Campo profesional" : (language === "en" ? "Professional area" : "Área profissional"))} *`}</label>
                                <Select
                                    name="sgCampoProfsc"
                                    id="slct-Cmpf"
                                    instanceId="slct-Cmpf"
                                    inputId='slct-Cmpf'
                                    placeholder={language === "es" ? "Búsqueda de opciones" : (language === "en" ? "Search options" : "Pesquisa de opções")}
                                    className={`form-select-1 form-select-lg ${errors.sgCampoProfsc ? 'is-invalid' : ''}`}
                                    classNamePrefix="form-select-1"
                                    components={makeAnimated()}
                                    onChange={handleMultiChange}
                                    value={listCamProfs}
                                    isClearable={true}
                                    closeMenuOnSelect={false}
                                    isMulti
                                    options={listOptions}
                                />
                                <div className="invalid-feedback">{errors.sgCampoProfsc?.message}</div>
                            </div>
                            <div className="form-group col-sm-4 flex-column d-flex">
                                <label className="form-control-label px-3" htmlFor="slct-formprofs">{`${(language === "es" ? "Formación profesional superior" : (language === "en" ? "Higher vocational training" : "Formação profissional superior"))} *`}</label>
                                <select name="sgFormProfssc" {...register('sgFormProfssc')} className={`form-select form-select-lg ${errors.sgFormProfssc ? 'is-invalid' : ''}`}
                                    id="slct-formprofs" data-error={language === "es" ? "El campo formación profesional superior es requerido" : (language === "en" ? "Higher vocational training is required" : "É necessária formação profissional superior")}>
                                    <option key={listWorkExperience.length} value="">{language === "es" ? "Selecciona una opción" : (language === "en" ? "Select an option" : "Seleccione uma opção")}</option>
                                    {listWorkExperience.map(
                                        (item, index) => {
                                            return (<option key={index} value={item.dmCodgDato}>{language === "es" ? item.dmDescripcion.trim() : (language === "en" ? item.dmDescripcionEn.trim() : item.dmDescripcionPt.trim())}</option>);
                                        }
                                    )}
                                </select>
                                <div className="invalid-feedback">{errors.sgFormProfssc?.message}</div>
                            </div>
                        </div>
                        <div className="row justify-content-between text-left">
                            <div className="form-group col-sm-12 flex-column d-flex">
                                <label className="form-control-label px-3" htmlFor="txtpapers">{(language === "es" ? "Publicaciones" : (language === "en" ? "Publications" : "Publicações"))}</label>
                                <textarea id="txtpapers" className="form-control" name="sgPapersc" {...register('sgPapersc')} minLength={2} maxLength={2000} style={{ overflow: "hidden" }} rows="5" cols="10" placeholder={(language === "es" ? "Descripción de las publicaciones realizadas" : (language === "en" ? "Description of publications" : "Descrição das publicações"))}></textarea>
                                <div className="invalid-feedback">{errors.sgPapersc?.message}</div>
                            </div>
                        </div>
                        <div className="row justify-content-between text-left">
                            <div className="form-group col-12 flex-column d-flex">
                                <label className="form-control-label px-3" htmlFor="inp-cv1">{`${(language === "es" ? "Hoja de vida (pdf - Tamaño máximo: 10MB)" : (language === "en" ? "Resume (pdf - Maximum size: 10MB)" : "Currículo (pdf - Tamanho máximo: 10MB)"))} *`}</label>
                                <Dropzone onDrop={handleDropPdf1} id="inp-cv" accept="application/pdf" maxFiles={1} maxSize={maxSize} multiple={false}>
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
                                            <div {...getRootProps({ style })} className="mt-2 pnl-upl-file">
                                                <input {...getInputProps()} id="inp-cv1" />
                                                <div>
                                                    {!isDragActive && (language === "es" ? "Arrastrar y soltar tu hoja de vida en formato pdf" : (language === "en" ? "Drag and drop your curriculum vitae in pdf format" : "Arraste e largue o seu currículo em formato pdf"))}
                                                    {isDragActive && !isDragReject && (language === "es" ? "Soltar el archivo pdf" : (language === "en" ? "Drop pdf file" : "Arquivo pdf drop"))}
                                                    {isDragReject && (language === "es" ? "Tipo de archivo no aceptado" : (language === "en" ? "File type not accepted" : "Tipo de ficheiro não aceite"))}
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
                                                    {`${(language === "en" ? "Document:" : "Documento:")} ${file.path} - ${(language === "es" ? "Tamaño:" : (language === "en" ? "Size:" : "Tamanho:"))} ${Math.round(((1 * file.size) / 1048576) * 100) / 100} MB`}
                                                </li>
                                            ))
                                        }</ul>
                                    </>)
                                }
                            </div>
                        </div>
                        {
                            mesgForm2 != "" && (
                                <div className="row justify-content-end g-0 mt-2">
                                    <div className={`alert ${tpmsgForm2 == 1 ? 'alert-danger' : (tpmsgForm2 == 2 ? 'alert-success' : '')} alert-form`} role="alert">
                                        {mesgForm2}
                                    </div>
                                </div>
                            )
                        }
                        <div className="row justify-content-end mt-3">
                            <div className="form-group col-sm-6 col-lg-12 text-center">
                                <button type="submit" disabled={isSubmittingForm2} className="btn-block mr-2">
                                    {isSubmittingForm2 && <span className="spinner-border spinner-border-sm mr-1"></span>}&nbsp;&nbsp;
                                    {(language === "es" ? "Unirme" : (language === "en" ? "Join" : "Junte-se a"))}
                                </button>
                                <button type="reset" disabled={isSubmittingForm2} onClick={onResetClickFormWorkCV} className="btn-block">{(language === "es" ? "Limpiar" : (language === "en" ? "Clear" : "Limpar"))}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </>);
    }

    return (<>
        {renderComponentFormWorkCV()}
    </>);

}
