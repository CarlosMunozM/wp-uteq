import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from "axios";
import React, { useState, useRef, useEffect } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { IMG_DEFAULT_FICHA_INSCRIPC, WS_LIST_DATA_GENERAL_NUM1, WS_LIST_DATA_FACULTIES_UTEQ, WS_LIST_SCHEDULES_UBU, WS_LIST_CAREERS_BY_CODE_FACULTY, WS_VALIDATE_FORM, WS_REGISTER_DATA_STUDENT_UBU, NEXT_PUBLIC_RECAPTCHA_SITE_KEY } from 'config';

export { BodyFichaInscripcion };

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

function BodyFichaInscripcion(data) {

    const [fileImg, setFileImg] = useState(IMG_DEFAULT_FICHA_INSCRIPC);
    const [extImg, setExtImg] = useState("png");
    const refrFormInsc = useRef();
    const [valPdf1, setValPdf1] = useState([]);

    const validationSchema = Yup.object().shape({
        fiDnipers: Yup.string().required('El campo cédula es requerido').min(10, 'La longitud mínima de carácteres es 10').max(10, 'La longitud máxima de carácteres es 10'),
        fiNombreComp: Yup.string().min(2, 'La longitud mínima de carácteres es 2').max(190, 'La longitud máxima de carácteres es 190').required('El campo nombre completo es requerido'),
        fiTelf1: Yup.string().required('El campo teléfono móvil es requerido').min(10, 'La longitud mínima de carácteres es 10').max(10, 'La longitud máxima de carácteres es 10'),
        fiTelf2: Yup.string().nullable().notRequired().when('fiTelf2', {
            is: (value) => value?.length,
            then: (rule) => rule.min(9, 'La longitud mínima de carácteres es 9').max(9, 'La longitud máxima de carácteres es 9'),
        }),
        fiSlctsemst: Yup.string().required('El campo semestre es requerido'),
        fiDireccion: Yup.string().min(2, 'La longitud mínima de carácteres es 2').max(1000, 'La longitud máxima de carácteres es 1000').required('El campo dirección domiciliaria es requerido'),
        fiEmail: Yup.string().min(5, 'La longitud mínima de carácteres es 5').max(148, 'La longitud máxima de carácteres es 148').required('El campo correo electrónico es requerido').email('El correo electrónico ingresado no es válido').matches(/@uteq.edu.ec\s*$/, 'Ingrese su correo institucional'),
        fiSlctpsng: Yup.string().required('El campo tipo de sangre es requerido'),
        fiSlctfact: Yup.string().required('El campo facultad es requerido'),
        fiSlctcarr: Yup.string().required('El campo carrera es requerido')
    },
        [
            ['fiTelf2', 'fiTelf2'],
        ]);

    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mesg, setMesg] = useState("");
    const [tpmsg, setTpmsg] = useState(0);
    const [imgDef, setImgDef] = useState(true);
    const [listSemst, setListSemst] = useState([]);
    const [listTpSgr, setListTpSgr] = useState([]);
    const [listFacts, setListFacts] = useState([]);
    const [listAreas, setListAreas] = useState([]);
    const [listHors, setListHors] = useState([]);
    const [codAreaUBU, setCodAreaUBU] = useState(0);
    const [codFacultad, setCodFacultad] = useState("---");
    const [listCareers, setListCareers] = useState([]);
    const [tableAreas, setTableAreas] = useState([]);

    const sanitizedData = (codeHTML) => ({
        __html: DOMPurify.sanitize(codeHTML)
    })

    useEffect(() => {
        (async () => {
            const listSm = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}NUM_SMTS`);
            const listSgr = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}TIPO_SANGRE`);
            const listFc = await make_request_ws(WS_LIST_DATA_FACULTIES_UTEQ);
            const listAr = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}CATG_UBU`);
            const listHs = await make_request_ws(`${WS_LIST_SCHEDULES_UBU}${codAreaUBU}`);
            const listCars = await make_request_ws(`${WS_LIST_CAREERS_BY_CODE_FACULTY}${codFacultad}`);

            setListSemst(listSm.data);
            setListTpSgr(listSgr.data);
            setListFacts(listFc.data);
            setListAreas(listAr.data);
            setListHors(listHs.data);
            setListCareers(listCars.data);
        })();
    }, [codAreaUBU, codFacultad]);

    const isValidFileUploaded = (file) => {
        const validExtensions = ['png', 'jpeg', 'jpg']
        const fileExtension = file.type.split('/')[1]
        return validExtensions.includes(fileExtension)
    }

    function isValidHeightAndWidthImage(fileImage) {
        var img = new Image(), heightVald = 531, widthVald = 413;
        var objectUrl = URL.createObjectURL(fileImage);
        img.onload = function () {
            if (this.width === widthVald && this.height === heightVald) {
                setFileImg(URL.createObjectURL(fileImage));
                setValPdf1(fileImage);
                setImgDef(false);
                setExtImg(fileImage.type.split('/')[1]);
                console.log(valPdf1);
            } else {
                setMesg("La imagen seleccionada no tiene las medidas correctas - (Ancho: 413px ; Alto: 531px)");
                setTpmsg(1);
                setFileImg(IMG_DEFAULT_FICHA_INSCRIPC);
                setValPdf1([]);
                setImgDef(true);
                setExtImg("png");
            }
            URL.revokeObjectURL(objectUrl);
        };
        img.src = objectUrl;

    }

    const handleChangeImage = (event) => {

        setMesg("");
        setTpmsg(0);
        if (event.target.files[0] !== null && typeof event.target.files[0] !== 'undefined') {
            if (event.target.files[0] && !event.target.files[0].name) {
                setMesg("Debe seleccionar una imagen para la foto de perfil");
                setTpmsg(1);
                setFileImg(IMG_DEFAULT_FICHA_INSCRIPC);
                setValPdf1([]);
                setImgDef(true);
                setExtImg("png");
                return false;
            }

            if (event.target.files[0].size > 3e6) {
                setMesg("La imagen excede el tamaño permitido - 10MB");
                setTpmsg(1);
                setFileImg(IMG_DEFAULT_FICHA_INSCRIPC);
                setValPdf1([]);
                setImgDef(true);
                setExtImg("png");
                return false;
            }

            if (!isValidFileUploaded(event.target.files[0])) {
                setMesg("Tipo de imagen no permitida - Extensiones permitidas (jpg/jpeg/png)");
                setTpmsg(1);
                setFileImg(IMG_DEFAULT_FICHA_INSCRIPC);
                setValPdf1([]);
                setImgDef(true);
                setExtImg("png");
                return false;
            }

            isValidHeightAndWidthImage(event.target.files[0]);
        } else {
            setMesg("Debe seleccionar una imagen para la foto de perfil");
            setTpmsg(1);
            setFileImg(IMG_DEFAULT_FICHA_INSCRIPC);
            setValPdf1([]);
            setImgDef(true);
            setExtImg("png");
            return false;
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

    const onSubmit = async (data) => {
        var message = '', tipomes = 0, estdVald = false;
        const regNumbers = /^[0-9\b]+$/, regEmail = /@uteq.edu.ec\s*$/;

        setIsSubmitting(true);

        if (regNumbers.test(data.fiDnipers.trim())) {
            estdVald = validationDniEcuador(data.fiDnipers.trim())
            setMesg(!estdVald ? 'El Nº de C.I/C.C ingresado no es válido' : '');
        } else {
            estdVald = false;
            setMesg('El Nº de C.I/C.C ingresado no es válido');
        }

        if (estdVald) {
            estdVald = regEmail.test(data.fiEmail.trim());
            setMesg(!estdVald ? 'El correo electrónico ingresado no es válido' : '');

            if (estdVald) {
                if (fileImg.length > 0 && !imgDef) {
                    if (tableAreas.length <= 3) {
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
                                                var semst = document.getElementById("slct-semst"), tpsgr = document.getElementById("slct-tpsng"),
                                                    facultd = document.getElementById("slct-facty"), carrers = document.getElementById("slct-carr")
                                                const formData = new FormData();

                                                formData.append('fuCedula', data.fiDnipers);
                                                formData.append('fuNombreComp', data.fiNombreComp);
                                                formData.append('fuTelfMov', data.fiTelf1);
                                                formData.append('fuTelfFijo', data.fiTelf2);
                                                formData.append('fuNombreFoto', 'foto-est-' + data.fiDnipers + '-');
                                                formData.append('fuExtFoto', extImg);
                                                formData.append('fuArchivoFoto', valPdf1);
                                                formData.append('fuCodSemestre', data.fiSlctsemst);
                                                formData.append('fuSemestre', semst.options[semst.selectedIndex].text);
                                                formData.append('fuDireccionDomic', data.fiDireccion);
                                                formData.append('fuCorreoElect', data.fiEmail);
                                                formData.append('fuIdTipoSangre', data.fiSlctpsng);
                                                formData.append('fuTipoSangre', tpsgr.options[tpsgr.selectedIndex].text);
                                                formData.append('fuIdFacultad', data.fiSlctfact);
                                                formData.append('fuFacultad', facultd.options[facultd.selectedIndex].text);
                                                formData.append('fuIdCarrera', data.fiSlctcarr);
                                                formData.append('fuCarrera', carrers.options[carrers.selectedIndex].text);
                                                formData.append('fuActividades', transformArrayToString(tableAreas, 5));
                                                formData.append('fuLstActvds', transformArrayToString(tableAreas, 6));

                                                axios.post(WS_REGISTER_DATA_STUDENT_UBU, { httpsAgent: agent }, formData).then(function (response) {
                                                    switch (response.data) {
                                                        case "DNIVCO":
                                                            message = 'El campo cédula es requerido';
                                                            tipomes = 1;
                                                            break;
                                                        case "DNILIN":
                                                            message = 'La longitud del campo cédula no es válida';
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
                                                            message = 'El campo teléfono móvil es requerido';
                                                            tipomes = 1;
                                                            break;
                                                        case "CELLIN":
                                                            message = 'La longitud del campo teléfono móvil no es válida';
                                                            tipomes = 1;
                                                            break;
                                                        case "TFJLIN":
                                                            message = 'La longitud del campo teléfono fijo no es válida';
                                                            tipomes = 1;
                                                            break;
                                                        case "SMSVCO":
                                                        case "NSMVCO":
                                                        case "NSMLIN":
                                                            message = 'El campo semestre es requerido';
                                                            tipomes = 1;
                                                            break;
                                                        case "DIRVCO":
                                                            message = 'El campo dirección domiciliaria es requerido';
                                                            tipomes = 1;
                                                            break;
                                                        case "DIRLIN":
                                                            message = 'La longitud del campo dirección domiciliaria no es válida';
                                                            tipomes = 1;
                                                            break;
                                                        case "CORVCO":
                                                            message = 'El campo correo electrónico es requerido';
                                                            tipomes = 1;
                                                            break;
                                                        case "CORLIN":
                                                            message = 'La longitud del campo correo electrónico no es válida';
                                                            tipomes = 1;
                                                            break;
                                                        case "TSGVCO":
                                                        case "SGRVCO":
                                                        case "SGRLIN":
                                                            message = 'El campo tipo de sangre es requerido';
                                                            tipomes = 1;
                                                            break;
                                                        case "CFCVCO":
                                                        case "FCTVCO":
                                                        case "FCTLIN":
                                                            message = 'El campo Facultad es requerido';
                                                            tipomes = 1;
                                                            break;
                                                        case "CCRVCO":
                                                        case "CARVCO":
                                                        case "CARLIN":
                                                            message = 'El campo Carrera es requerido';
                                                            tipomes = 1;
                                                            break;
                                                        case "ACTVCO":
                                                            message = 'El listado de actividades presenta errores';
                                                            tipomes = 1;
                                                            break;
                                                        case "STSNEX":
                                                        case "STSNAC":
                                                            message = 'El campo semestre presenta errores';
                                                            tipomes = 1;
                                                            break;
                                                        case "SGTNEX":
                                                        case "SGTNAC":
                                                            message = 'El campo tipo de sangre presenta errores';
                                                            tipomes = 1;
                                                            break;
                                                        case "FCCNEX":
                                                        case "FCCNAC":
                                                            message = 'El campo Facultad presenta errores';
                                                            tipomes = 1;
                                                            break;
                                                        case "CRRNEX":
                                                        case "CRRNAC":
                                                            message = 'El campo Carrera presenta errores';
                                                            tipomes = 1;
                                                            break;
                                                        case "FDTREX":
                                                            reset();
                                                            message = 'Recibido en el buzón de la Unidad de Bienestar Universitario';
                                                            tipomes = 2;
                                                            setFileImg(IMG_DEFAULT_FICHA_INSCRIPC);
                                                            setValPdf1([]);
                                                            setImgDef(true);
                                                            setIsSubmitting(false);
                                                            setCodAreaUBU(0);
                                                            setCodFacultad("---");
                                                            setTableAreas([]);
                                                            setExtImg("png");
                                                            document.getElementById("slct-hours").selectedIndex = 0;
                                                            document.getElementById("slct-carr").selectedIndex = 0;
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
                        setMesg("El número máximo de actividades que puede agregar es 3.");
                        setTpmsg(1);
                        setIsSubmitting(false);
                    }
                } else {
                    setMesg("Debe seleccionar una imagen para la foto de perfil.");
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
        reset();
        setMesg("");
        setTpmsg(0);
        setFileImg(IMG_DEFAULT_FICHA_INSCRIPC);
        setValPdf1([]);
        setImgDef(true);
        setIsSubmitting(false);
        setCodAreaUBU(0);
        setCodFacultad("---");
        setTableAreas([]);
        setExtImg("png");
        document.getElementById("slct-hours").selectedIndex = 0;
        document.getElementById("slct-carr").selectedIndex = 0;
    }

    function eventOnChangeAreaIntrs(codArea) {
        if (codArea !== " ") {
            setCodAreaUBU(codArea);
        } else {
            setCodAreaUBU(0);
        }
        document.getElementById("slct-hours").selectedIndex = 0;
    }

    function eventOnChangeFaculties(codFaculty) {
        if (codFaculty !== "") {
            setCodFacultad(codFaculty);
        } else {
            setCodFacultad("---");
        }
        document.getElementById("slct-carr").selectedIndex = 0;
    }

    function transformArrayToString(listData, opt) {
        let outputStrg = "";

        listData.map((item) => {
            switch (opt) {
                case 1:
                    outputStrg = outputStrg + item.cod_area + ",";
                    break;
                case 2:
                    outputStrg = outputStrg + item.name_area + ",";
                    break;
                case 3:
                    outputStrg = outputStrg + item.cod_horario + ",";
                    break;
                case 4:
                    outputStrg = outputStrg + item.horario + ",";
                    break;
                case 5:
                    outputStrg = outputStrg + (item.cod_area + "-" + item.cod_horario) + ",";
                    break;
                case 6:
                    outputStrg = outputStrg + (item.name_area.trim() + "  (" + item.horario.trim() + ")") + "\n<br/>";
                    break;
            }
        })

        return outputStrg.replace(/,\s*$/, "");
    }

    const addRowToTableAreas = () => {
        var areaSelc = document.getElementById("slct-intrs");
        var horarioSelc = document.getElementById("slct-hours");

        if (tableAreas.length < 3) {
            if (areaSelc.value !== " ") {
                if (horarioSelc.value !== " ") {
                    setMesg("");
                    setTpmsg(0);

                    var resultFnd = tableAreas.find(activity => activity.cod_area === areaSelc.value);
                    if (resultFnd === null || typeof resultFnd === 'undefined') {
                        const dataIngs = {
                            cod_area: areaSelc.value,
                            name_area: areaSelc.options[areaSelc.selectedIndex].text,
                            cod_horario: horarioSelc.value,
                            horario: horarioSelc.options[horarioSelc.selectedIndex].text
                        }

                        setCodAreaUBU(0);
                        document.getElementById("slct-intrs").selectedIndex = 0;
                        document.getElementById("slct-hours").selectedIndex = 0;
                        setTableAreas(tableAreas => { return [dataIngs, ...tableAreas] });
                    } else {
                        setMesg("La actividad seleccionada ya se encuentra agregada.");
                        setTpmsg(1);
                    }

                } else {
                    setMesg("Debe seleccionar el horario");
                    setTpmsg(1);
                }
            } else {
                setMesg("Debe seleccionar el área de interés");
                setTpmsg(1);
            }
        } else {
            setMesg("El número máximo de actividades que puede agregar es 3.");
            setTpmsg(1);
        }

    }

    const addRowsTable = (dataRow) => {
        return (<>{
            dataRow.map((data, index) => {
                const { cod_area, name_area, cod_horario, horario } = data;
                return (
                    <tr style={{ textAlign: "center" }} key={index}>
                        <td style={{ width: "70%" }}>{name_area}</td>
                        <td style={{ width: "25%" }}>{horario}</td>
                        <td style={{ width: "5%" }}>
                            <i className="fa fa-trash fa-2x btn-block-tbl" data-toggle="tooltip" data-placement="bottom" title="Eliminar actividad"
                                aria-hidden="true" onClick={() => (deleteRowToTableAreas(index))}></i>
                        </td>
                    </tr>
                );
            })
        }</>);
    }

    const deleteRowToTableAreas = (index) => {
        const rows = [...tableAreas];
        rows.splice(index, 1);
        setTableAreas(rows);
    }

    const renderElementFormInscription = () => {
        return (<><div className="col-md-12 g-0">
            <div className="row justify-content-end g-0">
                <div className="alert alert-info alert-form" role="alert">
                    El tamaño máximo de la foto es 10 MB. La dimensión permitida de la imagen es Ancho: 413px - Alto: 531px. El número máximo de actividades que puede seleccionar es 3.
                </div>
            </div>
            <div className="row" ref={refrFormInsc}>
                <form className="form-card" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="row">
                                <div className="col-sm-12 d-flex align-items-center justify-content-center">
                                    <img className="inp-photo" id="photo-inp" src={fileImg} alt="Foto de perfil" />
                                    <p></p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 d-flex align-items-center justify-content-center">
                                    <span className="btn btn-upload-img mb-5" style={{ backgroundColor: '#025a27', color: '#fff', width: '200px', borderRadius: '0%', fontFamily: 'open-sans-light', fontSize: '14px', fontWeight: 'bold' }}>
                                        Subir foto<input className="file-inpt" type="file" accept="image/*" onChange={handleChangeImage} aria-labelledby="button-upl" required={true} />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-9">
                            <div className="card-form">
                                <div className="row justify-content-between text-left">
                                    <div className="form-group col-sm-4 flex-column d-flex">
                                        <label className="form-control-label px-3" htmlFor="txtdni">Número de cédula *</label>
                                        <input type="text" id="txtdni" name="fiDnipers" className={`form-control ${errors.fiDnipers ? 'is-invalid' : ''}`} {...register('fiDnipers')} placeholder="Ingresa tu número de cédula" onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }} minLength={10} maxLength={10} data-error="El número de cédula es requerido" />
                                        <div className="invalid-feedback">{errors.fiDnipers?.message}</div>
                                    </div>
                                    <div className="form-group col-sm-8 flex-column d-flex">
                                        <label className="form-control-label px-3" htmlFor="txtname">Apellidos y Nombres *</label>
                                        <input type="text" id="txtname" name="fiNombreComp" className={`form-control ${errors.fiNombreComp ? 'is-invalid' : ''}`} {...register('fiNombreComp')}
                                            minLength={2} maxLength={190} placeholder="Ingresa tu nombre completo" data-error="El nombre completo es requerido" />
                                        <div className="invalid-feedback">{errors.fiNombreComp?.message}</div>
                                    </div>
                                </div>
                                <div className="row justify-content-between text-left">
                                    <div className="form-group col-sm-4 flex-column d-flex">
                                        <label className="form-control-label px-3" htmlFor="txtelf1">Teléfono móvil *</label>
                                        <input type="text" id="txtelf1" name="fiTelf1" className={`form-control ${errors.fiTelf1 ? 'is-invalid' : ''}`} {...register('fiTelf1')} placeholder="Ingresa tu Nº teléfono móvil" onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }} minLength={10} maxLength={10} data-error="El número de teléfono móvil es requerido" />
                                        <div className="invalid-feedback">{errors.fiTelf1?.message}</div>
                                    </div>
                                    <div className="form-group col-sm-4 flex-column d-flex">
                                        <label className="form-control-label px-3" htmlFor="txtelf2">Teléfono fijo</label>
                                        <input type="text" id="txtelf2" name="fiTelf2" className={`form-control ${errors.fiTelf2 ? 'is-invalid' : ''}`} {...register('fiTelf2')} placeholder="Ingresa tu Nº teléfono fijo" onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }} minLength={9} maxLength={9} data-error="El número de teléfono fijo es requerido" />
                                        <div className="invalid-feedback">{errors.fiTelf2?.message}</div>
                                    </div>
                                    <div className="form-group col-sm-4 flex-column d-flex">
                                        <label className="form-control-label px-3" htmlFor="slct-semst">Semestre *</label>
                                        <select name="fiSlctsemst" className={`form-select form-select-lg ${errors.fiSlctsemst ? 'is-invalid' : ''}`} {...register('fiSlctsemst')} id="slct-semst" data-error="El semestre es requerido">
                                            <option key={listSemst.length} value="" >Selecciona una opción</option>
                                            {listSemst.sort((a, b) => (a.dmOrdenPreg > b.dmOrdenPreg) ? 1 : -1).map(
                                                (item, index) => {
                                                    return (<option key={index} value={item.dmCodgDato}>{item.dmDescripcion.trim()}</option>);
                                                }
                                            )}
                                        </select>
                                        <div className="invalid-feedback">{errors.fiSlctsemst?.message}</div>
                                    </div>
                                </div>
                                <div className="row justify-content-between text-left">
                                    <div className="form-group col-12 flex-column d-flex">
                                        <label className="form-control-label px-3" htmlFor="txtdireccion">Dirección domiciliaria *</label>
                                        <textarea id="txtdireccion" name="fiDireccion" className={`form-control ${errors.fiDireccion ? 'is-invalid' : ''}`} {...register('fiDireccion')} style={{ overflow: "hidden" }}
                                            minLength={2} maxLength={1000} placeholder="Ingresa tu dirección domiciliaria" rows="5" cols="50" data-error="La dirección domiciliaria es requerida"></textarea>
                                        <div className="invalid-feedback">{errors.fiDireccion?.message}</div>
                                    </div>
                                </div>
                                <div className="row justify-content-between text-left">
                                    <div className="form-group col-sm-6 flex-column d-flex">
                                        <label className="form-control-label px-3" htmlFor="txtemail">Correo electrónico institucional *</label>
                                        <input type="text" id="txtemail" name="fiEmail" className={`form-control ${errors.fiEmail ? 'is-invalid' : ''}`} {...register('fiEmail')} placeholder="Ingresa tu correo electrónico"
                                            minLength={5} maxLength={148} data-error="El correo electrónico es requerido" />
                                        <div className="invalid-feedback">{errors.fiEmail?.message}</div>
                                    </div>
                                    <div className="form-group col-sm-6 flex-column d-flex">
                                        <label className="form-control-label px-3" htmlFor="slct-tpsng">Tipo de sangre *</label>
                                        <select name="fiSlctpsng" className={`form-select form-select-lg ${errors.fiSlctpsng ? 'is-invalid' : ''}`} {...register('fiSlctpsng')} id="slct-tpsng" data-error="El tipo de sangre es requerido">
                                            <option key={listTpSgr.length} value="" >Selecciona una opción</option>
                                            {listTpSgr.sort((a, b) => (a.dmOrdenPreg > b.dmOrdenPreg) ? 1 : -1).map(
                                                (item, index) => {
                                                    return (<option key={index} value={item.dmCodgDato}>{item.dmDescripcion.trim()}</option>);
                                                }
                                            )}
                                        </select>
                                        <div className="invalid-feedback">{errors.fiSlctpsng?.message}</div>
                                    </div>
                                </div>
                                <div className="row justify-content-between text-left">
                                    <div className="form-group col-sm-6 flex-column d-flex">
                                        <label className="form-control-label px-3" htmlFor="slct-facty">Facultad *</label>
                                        <select name="fiSlctfact" className={`form-select form-select-lg ${errors.fiSlctfact ? 'is-invalid' : ''}`} {...register('fiSlctfact')} id="slct-facty" data-error="La Facultad es requerida"
                                            onChange={e => eventOnChangeFaculties(e.target.value)}>
                                            <option key={listFacts.length} value="" >Selecciona una opción</option>
                                            {listFacts.map(
                                                (item, index) => {
                                                    return (<option key={index} value={item.dpCodigo}>{item.dpNombre.trim()}</option>);
                                                }
                                            )}
                                        </select>
                                        <div className="invalid-feedback">{errors.fiSlctfact?.message}</div>
                                    </div>
                                    <div className="form-group col-sm-6 flex-column d-flex">
                                        <label className="form-control-label px-3" htmlFor="slct-carr">Carrera *</label>
                                        <select name="fiSlctcarr" className={`form-select form-select-lg ${errors.fiSlctcarr ? 'is-invalid' : ''}`} {...register('fiSlctcarr')} id="slct-carr" data-error="La Carrera es requerida">
                                            {
                                                listCareers !== null ? (<>
                                                    <option key={listCareers.length} value="" >Selecciona una opción</option>
                                                    {listCareers.map(
                                                        (item, index) => {
                                                            return (<option key={index} value={item.crCodigo}>{item.crNombre.trim()}</option>);
                                                        }
                                                    )}
                                                </>) : (<>
                                                    <option value="" >Selecciona una opción</option>
                                                </>)
                                            }
                                        </select>
                                        <div className="invalid-feedback">{errors.fiSlctcarr?.message}</div>
                                    </div>
                                </div><hr />
                                <div className="row justify-content-between text-left">
                                    <div className="form-group col-sm-6 flex-column d-flex">
                                        <label className="form-control-label px-3" htmlFor="slct-intrs">Actividad *</label>
                                        <select name="fiSlctintrs" className={`form-select form-select-lg ${errors.fiSlctintrs ? 'is-invalid' : ''}`} id="slct-intrs" data-error="La área de interés es requerida"
                                            onChange={e => eventOnChangeAreaIntrs(e.target.value)}>
                                            <option key={listAreas.length} value=" " >Selecciona una opción</option>
                                            {listAreas.map(
                                                (item, index) => {
                                                    return (<option key={index} value={item.dmCodgDato}>{item.dmDescripcion.trim()}</option>);
                                                }
                                            )}
                                        </select>
                                        <div className="invalid-feedback">{errors.fiSlctintrs?.message}</div>
                                    </div>
                                    <div className="form-group col-sm-4 flex-column d-flex">
                                        <label className="form-control-label px-3" htmlFor="slct-hours">Horario *</label>
                                        <select name="fiSlcthours" className={`form-select form-select-lg ${errors.fiSlcthours ? 'is-invalid' : ''}`} id="slct-hours" data-error="El horario es requerido">
                                            {
                                                listHors !== null ? (<>
                                                    <option key={listHors.length} value=" " >Selecciona una opción</option>
                                                    {listHors.sort((a, b) => (a.dmOrdenPreg > b.dmOrdenPreg) ? 1 : -1).map(
                                                        (item, index) => {
                                                            return (<option key={index} value={item.dmCodgDato}>{item.dmDescripcion.trim()}</option>);
                                                        }
                                                    )}
                                                </>) : (<>
                                                    <option value="" >Selecciona una opción</option>
                                                </>)
                                            }
                                        </select>
                                        <div className="invalid-feedback">{errors.fiSlcthours?.message}</div>
                                    </div>
                                    <div className="form-group col-sm-2 flex-column align-items-center d-flex mt-4">
                                        <button type="button" className="btn-block-area" style={{ height: "38px" }} onClick={addRowToTableAreas}><i className="fa fa-plus fa-1x" aria-hidden="true"></i> Agregar</button>
                                    </div>
                                </div>
                                {
                                    tableAreas.length > 0 && (<><table id="tbl-projects" className="display table-static w-100 mt-3">
                                        <thead>
                                            <tr>
                                                <th className="text-center">Actividad</th>
                                                <th className="text-center">Horario</th>
                                                <th className="text-center">...</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                addRowsTable(tableAreas)
                                            }
                                        </tbody>
                                    </table></>)
                                }
                                <hr />
                                {
                                    (data.data8.pwFraseDesc !== null && data.data8.pwFraseDesc !== '') && (<><h2 className="sentence-first pt-3 mt-2">{data.data8.pwFraseDesc.trim()}</h2></>)
                                }
                                {
                                    mesg != "" && (
                                        <div className="row justify-content-end g-0">
                                            <div className={`alert ${tpmsg == 1 ? 'alert-danger' : (tpmsg == 2 ? 'alert-success' : '')} alert-form`} role="alert">
                                                {mesg}
                                            </div>
                                        </div>
                                    )
                                }
                                <div className="row justify-content-end">
                                    <div className="form-group col-sm-6 col-lg-12 text-center">
                                        <button type="submit" disabled={isSubmitting} className="btn-block mr-2">
                                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}&nbsp;&nbsp;
                                            Registrarme</button>
                                        <button type="reset" disabled={isSubmitting} onClick={onResetClick} className="btn-block">Limpiar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div><hr className='mt-3' /></>);
    }

    return (<>
        <div className="row">
            {
                (data.data8.pwNombre !== null && data.data8.pwNombre !== '') && (<><h2 className="title-cont-page text-center mt-2">{data.data8.pwNombre}</h2></>)
            }
            {
                (data.data8.pwDescripcion !== null && data.data8.pwDescripcion !== '') && (<><div className="col-md-12 paragraph-cont w-100" dangerouslySetInnerHTML={sanitizedData(data.data8.pwDescripcion.trim())}></div></>)
            }
            <div className="col-md-12 w-100">
                {renderElementFormInscription()}
            </div>
        </div>
    </>);
}