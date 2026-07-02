import DOMPurify from 'isomorphic-dompurify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from "axios";
import { WS_REGISTER_REQ_CERTIFICATION, WS_LIST_DATA_MERIT_CONTESTS, MERIT_CONTESTS_DOCS_FOLDER, WS_VALIDATE_FORM, WS_LIST_DATA_GENERAL_NUM1, NEXT_PUBLIC_RECAPTCHA_SITE_KEY, WS_LIST_DATA_COURSES_UTH } from 'config';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import DataTable from 'react-data-table-component';
import { useDropzone } from 'react-dropzone';
import { FormUTH } from "components/forms";


export { BodyTalentoHumn };


const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <div id="tbl-list-images_filter" className="dataTables_filter">
            <label>Buscar:<input type="search" className="" placeholder="" aria-controls="tbl-list-images" value={filterText} onChange={onFilter} /></label>
        </div>
    </>
);

const FilterComponentCrs = ({ filterTextCrs, onFilter, onClear }) => (
    <>
        <div id="tbl-list-images_filter" className="dataTables_filter">
            <label>Buscar:<input type="search" className="" placeholder="" aria-controls="tbl-list-images" value={filterTextCrs} onChange={onFilter} /></label>
        </div>
    </>
);

function getTypeCourse(tipoCrs, language) {
    switch (tipoCrs) {
        case 1:
            return 'Virtual';
        case 2:
            return (language === "pt" ? "Em linha" : "Online");
        case 3:
            return (language === "es" ? "Presencial" : (language === "en" ? "On-site" : "Pessoalmente"));
        case 4:
            return (language === "es" ? "Virtual y Online" : (language === "en" ? "Virtual and Online" : "Virtual e Online"));
        case 5:
            return (language === "es" ? "Virtual y Presencial" : (language === "en" ? "Virtual and On-site" : "Virtual e cara-a-cara"));
        case 6:
            return (language === "es" ? "Online y Presencial" : (language === "" ? "Online and On-site" : "Online e cara a cara"));
    }
}

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

function BodyTalentoHumn(data) {

    const listVocationalTrain = ((data.data7 !== null && data.data7 !== "") ? data.data7 : []),
        listWorkExperience = ((data.data9 !== null && data.data9 !== "") ? data.data9 : []), maxSize = 10485760;
    const [datatbl, setDatatbl] = useState([]);
    const [dataCourses, setDataCourses] = useState([]);
    const [listCertfType, setListCertfType] = useState([]);
    const [listProfessionalArea, setListProfessionalArea] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [files, setFiles] = useState([]);
    const [filterTextCrs, setFilterTextCrs] = useState('');
    const [resetPaginationToggleCrs, setResetPaginationToggleCrs] = useState(false);

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map(file => (
            <li key={file.path} className="pnl-list-files-docs">
                Documento: {file.path} - Tamaño: {Math.round(((1 * file.size) / 1048576) * 100) / 100} MB
            </li>
        )));
    }, []);
    const { acceptedFiles, getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({ onDrop, accept: 'application/pdf', maxFiles: 1, maxSize: maxSize, multiple: false });

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

    useEffect(() => {
        (async () => {
            const result = await make_request_ws(`${WS_LIST_DATA_MERIT_CONTESTS}`);
            const listCourses = await make_request_ws(`${WS_LIST_DATA_COURSES_UTH}`);
            const listCrtf = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}TP_CERTF_UTH`);
            const listWorks = await make_request_ws(`${WS_LIST_DATA_GENERAL_NUM1}AREAS_TB_UTH`);
            setDatatbl((result.data !== null && result.data !== "") ? result.data : []);
            setDataCourses((listCourses.data !== null && listCourses.data !== "") ? listCourses.data : []);
            setListCertfType((listCrtf.data !== null && listCrtf.data !== "") ? listCrtf.data : []);
            setListProfessionalArea((listWorks.data !== null && listWorks.data !== "") ? listWorks.data : []);
        })();
    }, []);

    const filteredItems = datatbl.filter(
        item => (item.cmFechaInc && item.cmFechaInc.includes(filterText.toLowerCase())) ||
            (item.cmFechaFin && item.cmFechaFin.includes(filterText.toLowerCase())) ||
            (item.cmDescripcion && item.cmDescripcion.toLowerCase().includes(filterText.toLowerCase())) ||
            (item.cmRegimenLab && item.cmRegimenLab.toLowerCase().includes(filterText.toLowerCase()))
    );

    const filteredItemsCrs = dataCourses.filter(
        item => (item.cuFechaInicio && item.cuFechaInicio.includes(filterText.toLowerCase())) ||
            (item.cuFechaFin && item.cuFechaFin.includes(filterText.toLowerCase())) ||
            (item.cuDescripcion && item.cuDescripcion.includes(filterText.toLowerCase())) ||
            (item.cuModalidad && item.cuModalidad.includes(filterText.toLowerCase())) ||
            (item.cuTipoPublico && item.cuTipoPublico.includes(filterText.toLowerCase()))
    );

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText, resetPaginationToggle]);

    const subHeaderComponentMemoCrs = useMemo(() => {
        const handleClear = () => {
            if (filterTextCrs) {
                setResetPaginationToggleCrs(!resetPaginationToggleCrs);
                setFilterTextCrs('');
            }
        };

        return (
            <FilterComponentCrs onFilter={e => setFilterTextCrs(e.target.value)} onClear={handleClear} filterText={filterTextCrs} />
        );
    }, [filterTextCrs, resetPaginationToggleCrs]);

    const validationSchema = Yup.object().shape({
        sgCedula: Yup.string().min(10, 'La longitud mínima de carácteres es 10').max(10, 'La longitud máxima de carácteres es 10').required('El campo cédula es requerido'),
        sgNombreComp: Yup.string().min(2, 'La longitud mínima de carácteres es 2').max(200, 'La longitud máxima de carácteres es 200').required('El campo nombre completo es requerido'),
        sgCorreoElect: Yup.string().min(5, 'La longitud mínima de carácteres es 5').max(148, 'La longitud máxima de carácteres es 148').required('El campo correo electrónico es requerido').email('El correo electrónico ingresado no es válido'),
        sgTipoCertifcd: Yup.string().required('Debe seleccionar un tipo de certificado'),
        sgDescripcion: Yup.string().min(2, 'La longitud mínima de carácteres es 2').max(1000, 'La longitud máxima de carácteres es 1000').required('El campo descripción es requerido')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mesg, setMesg] = useState("");
    const [tpmsg, setTpmsg] = useState(0);

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

    const onSubmitFormTpoCertf = async (data) => {
        var message = '', tipomes = 0, estdVald = false;

        setIsSubmitting(true);

        if (data.sgCedula !== null || data.sgCedula !== "") {
            if (data.sgCedula.length !== 10) {
                setMesg(data.language === "es" ? "El Nº de C.I/C.C ingresado no es válido" : (data.language === "en" ? "The identity document entered is not valid" : "O documento de identidade introduzido não é válido"));
                estdVald = false;
            } else {
                const regNumbers = /^[0-9\b]+$/;

                if (regNumbers.test(data.sgCedula.trim())) {
                    estdVald = validationDniEcuador(data.sgCedula.trim())
                    setMesg(!estdVald ? (data.language === "es" ? 'El Nº de C.I/C.C ingresado no es válido' : data.language === "en" ? "The identity document entered is not valid" : "O documento de identidade introduzido não é válido") : '');
                } else {
                    estdVald = false;
                    setMesg(data.language === "es" ? 'El Nº de C.I/C.C ingresado no es válido' : (data.language === "en" ? "The identity document entered is not valid" : "O documento de identidade introduzido não é válido"));
                }
            }
        } else {
            setMesg(data.language === "es" ? "El campo cédula es requerido" : (data.language === "en" ? "The identity document field is required" : "O campo do documento de identidade é obrigatório"));
            estdVald = false;
        }

        if (estdVald) {
            window.grecaptcha.ready(() => {
                window.grecaptcha
                    .execute(NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: "submit" })
                    .then(async (token) => {
                        try {
                            await axios.post(`${WS_VALIDATE_FORM}${token}`).then(function (response) {
                                if (response.data === "OK") {
                                    axios.post(WS_REGISTER_REQ_CERTIFICATION, {
                                        rcNumDNI: data.sgCedula,
                                        rcNombreComp: data.sgNombreComp,
                                        rcCorreoElect: data.sgCorreoElect,
                                        rcTipoCertf: data.sgTipoCertifcd,
                                        rcMensaje: data.sgDescripcion
                                    }).then(function (response) {
                                        switch (response.data) {
                                            case "DNIVCO":
                                                message = (data.language === "es" ? 'El campo cédula es requerido' : (data.language === "en" ? "The identity document field is required" : "O campo do documento de identidade é obrigatório"));
                                                tipomes = 1;
                                                break;
                                            case "DNILIN":
                                                message = (data.language === "es" ? 'La longitud del campo cédula no es válida' : (data.language === "en" ? "The length of the identity document field is invalid" : "O comprimento do campo do documento de identidade é inválido"));
                                                tipomes = 1;
                                                break;
                                            case "NMBVCO":
                                                message = (data.language === "es" ? 'El campo nombre completo es requerido' : (data.language === "en" ? "The full name field is required" : "O campo do nome completo é obrigatório"));
                                                tipomes = 1;
                                                break;
                                            case "NMBLIN":
                                                message = (data.language === "es" ? 'La longitud del campo nombre completo no es válida' : (data.language === "en" ? "The length of the full name field is invalid" : "O comprimento do campo do nome completo é inválido"));
                                                tipomes = 1;
                                                break;
                                            case "TCFVCO":
                                                message = (data.language === "es" ? 'El campo tipo de certificado es requerido' : (data.language === "en" ? "The certificate type field is required" : "O campo tipo de certificado é obrigatório"));
                                                tipomes = 1;
                                                break;
                                            case "MSJVCO":
                                                message = (data.language === "es" ? 'El campo descripción es requerido' : (data.language === "en" ? "Description field is required" : "O campo de descrição é obrigatório"));
                                                tipomes = 1;
                                                break;
                                            case "MSJLIN":
                                                message = (data.language === "es" ? 'La longitud del campo descripción no es válida' : (data.language === "en" ? "The length of the description field is invalid" : "O comprimento do campo de descrição é inválido"));
                                                tipomes = 1;
                                                break;
                                            case "TCFNEX":
                                                message = (data.language === "es" ? 'El tipo de certificado seleccionado no se encuentra registrado' : (data.language === "en" ? "The selected certificate type is not registered" : "O tipo de certificado seleccionado não está registado"));
                                                tipomes = 1;
                                                break;
                                            case "TCFNAC":
                                                message = (data.language === "es" ? 'El tipo de certificado seleccionado no se encuentra disponible' : (data.language === "en" ? "The selected certificate type is not available" : "O tipo de certificado seleccionado não está disponível"));
                                                tipomes = 1;
                                                break;
                                            case "CELVCO":
                                                message = (data.language === "es" ? 'El campo correo electrónico es requerido' : (data.language === "en" ? "The email field is required" : "O campo de e-mail é obrigatório"));
                                                tipomes = 1;
                                                break;
                                            case "CELLIN":
                                                message = (data.language === "es" ? 'La longitud del campo correo electrónico no es válida' : (data.language === "en" ? "The length of the e-mail field is invalid" : "O comprimento do campo do e-mail é inválido"));
                                                tipomes = 1;
                                                break;
                                            case "SLCREP":
                                                message = (data.language === "es" ? 'El requerimiento de certificado ya ha sido recibido en la Unidad de Talento Humano. Solo se permite un envío diario.' : (data.language === "en" ? "The certificate request has already been received by the Human Resources Unit. Only one submission per day is allowed." : "O pedido de certificado já foi recebido pela Unidade de Recursos Humanos. Só é permitida uma apresentação por dia."));
                                                tipomes = 1;
                                                break;
                                            case "TCFREX":
                                                reset();
                                                message = (data.language === "es" ? 'Recibido en el buzón de la Unidad de Talento Humano' : (data.language === "en" ? "Received in the mail box of the Human Resources Unit" : "Recebido na caixa de correio da Unidade de Talento Humano"));
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
                                    message = (data.language === "es" ? 'La validación de la herramienta Recaptcha no se completó correctamente.' : (data.language === "en" ? "The validation of the Recaptcha tool was not completed correctly." : "A validação da ferramenta Recaptcha não foi completada correctamente."));
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

        return false;
    }

    const sanitizedData = (codeHTML) => ({
        __html: DOMPurify.sanitize(codeHTML)
    });

    const columns = (language) => [
        {
            name: (language === "es" ? 'F. Inicio' : (language === "en" ? "D. Start" : "D. de Início")),
            selector: row => row.cmFechaInc,
            sortable: true,
            width: '15%',
            filterable: true,
            center: true
        },
        {
            name: (language === "es" ? 'Descripción' : (language === "en" ? "Description" : "Descrição")),
            selector: row => (language === "es" ? row.cmDescripcion.trim() : (language === "en" ? row.cmDescripcionEn.trim() : row.cmDescripcionPt.trim())),
            sortable: true,
            width: '40%',
            filterable: true,
            wrap: true
        },
        {
            name: (language === "en" ? "Type" : 'Tipo'),
            selector: row => (row.cmTipo.trim() === 'MERITOS' ? (language === "en" ? "Merits" : "Méritos") : (language === "es" ? 'Méritos y oposición' : (language === "en" ? "Merits and competition" : "Méritos e competição"))),
            sortable: true,
            width: '20%',
            filterable: true,
            center: true,
            wrap: true
        },
        {
            name: (language === "es" ? 'Reg. Laboral' : (language === "en" ? "Employment Type" : "Tipo de trabalho")),
            selector: row => row.cmRegimenLab.trim(),
            sortable: true,
            width: '15%',
            filterable: true,
            center: true
        },
        {
            name: '...',
            sortable: false,
            cell: row => <DownloadFiles {...row} />,
            width: '5%',
            center: true
        },
        {
            name: '...',
            sortable: false,
            cell: row => <LinkPageWebContest {...row} />,
            width: '5%',
            center: true
        }
    ];

    const DownloadFiles = row => (<>
        <a href={`${MERIT_CONTESTS_DOCS_FOLDER}${row.cmUrlDocumento}`} target="_blank" className="btn-table" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Descarga de documento" : (data.language === "en" ? "Download document" : "Baixar documento")}>
            <i className="fa fa-arrow-circle-o-down fa-2x" aria-hidden="true"></i>
        </a>
    </>);

    const LinkPageWebContest = row => (<>
        {
            row.cmRegimenLab.trim() === 'LOSEP' && (
                <>
                    <a href={row.cmUrlEnlace} target="_blank" className="btn-table" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Enlace a la página web del concurso" : (data.language === "en" ? "Link to the competition website" : "Link para o website do concurso")}>
                        <i className="fa fa-link fa-2x" aria-hidden="true"></i>
                    </a>
                </>
            )
        }
    </>);

    const columnsCourses = (language) => [
        {
            name: (language === "es" ? 'F. Inicio' : (language === "en" ? "D. Start" : "D. de Início")),
            selector: row => row.cuFechaInicio,
            sortable: true,
            width: '15%',
            filterable: true,
            center: true
        },
        {
            name: (language === "es" ? 'Nombre' : (language === "en" ? "Name" : "Nome")),
            selector: row => (language === "es" ? row.cuDescripcion.trim() : (language === "en" ? row.cuDescripcionEn.trim() : row.cuDescripcionPt.trim())),
            sortable: true,
            width: '40%',
            filterable: true,
            wrap: true
        },
        {
            name: (language === "es" ? 'Modalidad' : (language === "en" ? "Modality" : "Modalidade")),
            selector: row => getTypeCourse(row.cuModalidad, language),
            sortable: true,
            width: '15%',
            filterable: true,
            center: true,
            wrap: true
        },
        {
            name: (language === "en" ? "Public" : 'Público'),
            selector: row => getTypeCourse(row.cuTipoPublico, language),
            sortable: true,
            width: '15%',
            filterable: true,
            center: true,
            wrap: true
        },
        {
            name: (language === "en" ? "Number of hours" : 'Num. Horas'),
            selector: row => row.cuNumHoras,
            sortable: true,
            width: '10%',
            filterable: true,
            center: true
        },
        {
            name: '...',
            sortable: false,
            cell: row => <LinkPageWebRegister {...row} />,
            width: '5%',
            center: true
        }
    ];

    const LinkPageWebRegister = row => (<>
        <a href={row.cuLinkRegistro} target="_blank" className="btn-table" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Enlace a la página web del concurso" : (data.language === "en" ? "Link to the competition website" : "Link para o website do concurso")}>
            <i className="fa fa-link fa-2x" aria-hidden="true"></i>
        </a>
    </>);

    const renderTextInfo = (dataInfoInst) => {
        return (<>
            {
                <div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(dataInfoInst.language === "es" ? (dataInfoInst.data8.dpMision !== null ? dataInfoInst.data8.dpMision.trim() : '') : (dataInfoInst.language === "en" ? (dataInfoInst.data8.dpMisionEn !== null ? dataInfoInst.data8.dpMisionEn.trim() : '') : (dataInfoInst.data8.dpMisionPt !== null ? dataInfoInst.data8.dpMisionPt.trim() : ''))
                    + (dataInfoInst.language === "es" ? (dataInfoInst.data8.dpVision !== null ? dataInfoInst.data8.dpVision.trim() : '') : (dataInfoInst.language === "en" ? (dataInfoInst.data8.dpVisionEn !== null ? dataInfoInst.data8.dpVisionEn.trim() : '') : (dataInfoInst.data8.dpVisionPt !== null ? dataInfoInst.data8.dpVisionPt.trim() : ''))) +
                    (dataInfoInst.language === "es" ? (dataInfoInst.data8.dpObjetivos !== null ? dataInfoInst.data8.dpObjetivos.trim() : '') : (dataInfoInst.language === "en" ? (dataInfoInst.data8.dpObjetivosEn !== null ? dataInfoInst.data8.dpObjetivosEn.trim() : '') : (dataInfoInst.data8.dpObjetivosPt !== null ? dataInfoInst.data8.dpObjetivosPt.trim() : '')))
                )}></div>
            }
            {
                (dataInfoInst.data8.dpResponsabilidades !== null && dataInfoInst.data8.dpResponsabilidades !== '') && (<><div className="col-md-12 w-100 paragraph-cont" dangerouslySetInnerHTML={sanitizedData(dataInfoInst.language === "es" ? (dataInfoInst.data8.dpResponsabilidades !== null ? dataInfoInst.data8.dpResponsabilidades.trim() : '') : (dataInfoInst.language === "en" ? (dataInfoInst.data8.dpResponsabilidadesEn !== null ? dataInfoInst.data8.dpResponsabilidadesEn.trim() : '') : (dataInfoInst.data8.dpResponsabilidadesPt !== null ? dataInfoInst.data8.dpResponsabilidadesPt.trim() : '')))}></div></>)
            }
        </>)
    }

    const onResetClick = () => {
        reset();
        setMesg("");
        setTpmsg(0);
        setIsSubmitting(false);
    }

    const renderComponentFormRequestConstest = () => {
        return (<>
            <div className="row">
                <div className="card-form">
                    <form className="form-card" onSubmit={handleSubmit(onSubmitFormTpoCertf)}>
                        <div className="row justify-content-between text-left">
                            <div className="form-group col-sm-4 flex-column d-flex">
                                <label className="form-control-label px-3" htmlFor="txtdni">{`${data.language === "es" ? "Cédula" : (data.language === "en" ? "Identity card" : "Documento de identidade")} *`}</label>
                                <input type="text" id="txtdni" className={`form-control ${errors.sgCedula ? 'is-invalid' : ''}`} name="sgCedula" {...register('sgCedula')} onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }} minLength={10} maxLength={10} placeholder={data.language === "es" ? "Ingresa tu número de cédula" : (data.language === "en" ? "Enter your identity document" : "Introduza o seu documento de identidade")} data-error={data.language === "es" ? "El número de cédula es requerido" : (data.language === "en" ? "Identity document is required" : "É necessário documento de identidade")} />
                                <div className="invalid-feedback">{errors.sgCedula?.message}</div>
                            </div>
                            <div className="form-group col-sm-8 flex-column d-flex">
                                <label className="form-control-label px-3" htmlFor="txtname">{`${data.language === "es" ? "Nombre completo" : (data.language === "en" ? "Full name" : "Nome completo")} *`}</label>
                                <input type="text" id="txtname" className={`form-control ${errors.sgNombreComp ? 'is-invalid' : ''}`} name="sgNombreComp" {...register('sgNombreComp')} minLength={2} maxLength={190} placeholder={data.language === "es" ? "Ingresa tu nombre completo" : (data.language === "en" ? "Enter your full name" : "Introduza o seu nome completo")} data-error={data.language === "es" ? "El nombre completo es requerido" : (data.language === "en" ? "Full name is required" : "O nome completo é obrigatório")} />
                                <div className="invalid-feedback">{errors.sgNombreComp?.message}</div>
                            </div>
                        </div>
                        <div className="row justify-content-between text-left">
                            <div className="form-group col-sm-6 flex-column d-flex">
                                <label className="form-control-label px-3" htmlFor="txtemail">{`${data.language === "es" ? "Correo electrónico" : (data.language === "en" ? "E-mail" : "Endereço electrónico")} *`}</label>
                                <input type="text" id="txtemail" className={`form-control ${errors.sgCorreoElect ? 'is-invalid' : ''}`} name="sgCorreoElect" {...register('sgCorreoElect')} minLength={5} maxLength={148} placeholder={data.language === "es" ? "Ingresa tu correo electrónico" : (data.language === "en" ? "Enter your email address" : "Introduza o seu endereço de correio electrónico")} data-error={data.language === "es" ? "El correo electrónico es requerido" : (data.language === "en" ? "Email is required" : "O e-mail é obrigatório")} />
                                <div className="invalid-feedback">{errors.sgCorreoElect?.message}</div>
                            </div>
                            <div className="form-group col-sm-6 flex-column d-flex">
                                <label className="form-control-label px-3" htmlFor="slct-certf">{`${data.language === "en" ? "Certificate type" : "Tipo de certificado"} *`}</label>
                                <select name="sgTipoCertifcd" {...register('sgTipoCertifcd')} className={`form-select form-select-lg ${errors.sgTipoCertifcd ? 'is-invalid' : ''}`}
                                    id="slct-certf" data-error={data.language === "es" ? "El destinatario es requerido" : (data.language === "en" ? "The addressee is required" : "O destinatário é obrigado a")}>
                                    <option key={listCertfType.length} value="">{data.language === "es" ? "Selecciona el tipo de certificado" : (data.language === "en" ? "Select the certificate type" : "Seleccionar o tipo de certificado")}</option>
                                    {listCertfType.map(
                                        (item, index) => {
                                            return (<option key={index} value={item.dmCodgDato}>{data.language === "es" ? item.dmDescripcion.trim() : (data.language === "en" ? item.dmDescripcionEn.trim() : item.dmDescripcionPt.trim())}</option>);
                                        }
                                    )}
                                </select>
                                <div className="invalid-feedback">{errors.sgTipoCertifcd?.message}</div>
                            </div>
                        </div>
                        <div className="row justify-content-between text-left">
                            <div className="form-group col-12 flex-column d-flex">
                                <label className="form-control-label px-3" htmlFor="txtdescript">{`${data.language === "es" ? "Mensaje" : (data.language === "en" ? "Message" : "Mensagem")} *`}</label>
                                <textarea id="txtdescript" className={`form-control ${errors.sgDescripcion ? 'is-invalid' : ''}`} name="sgDescripcion" {...register('sgDescripcion')} minLength={2} maxLength={1000} style={{ overflow: "hidden" }} rows="5" cols="50" data-error={data.language === "es" ? "La descripción del requerimiento es requerida" : (data.language === "en" ? "The description of the requirement is required" : "A descrição do requisito é necessária")} placeholder={data.language === "es" ? "Redactar requerimiento de certificado" : (data.language === "en" ? "Write a certificate request" : "Escrever um pedido de certificado")}></textarea>
                                <div className="invalid-feedback">{errors.sgDescripcion?.message}</div>
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
                                    {data.language === "es" ? "Solicitar" : (data.language === "en" ? "Request" : "Pedido")}
                                </button>
                                <button type="reset" disabled={isSubmitting} onClick={onResetClick} className="btn-block">{data.language === "es" ? "Limpiar" : (data.language === "en" ? "Clear" : "Limpar")}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>);
    }

    return (<>
        <div className="row">
            <h2 className="title-cont-page text-center mt-2">{data.language === "es" ? "Unidad de Talento Humano" : (data.language === "en" ? "Human Resources Unit" : "Unidade de Recursos Humanos")}</h2>
            {renderTextInfo(data)}
            <h2 className="title-cont-page text-rigth mt-3">{data.language === "es" ? "Concursos de méritos y oposición" : (data.language === "en" ? "Merit and competitive examinations" : "Exames baseados no mérito e concursos")}</h2><br />
            {
                datatbl.length == 0 && (<>
                    <div className="ratio ratio-21x9 pnl-img-rt">
                        <img src={`/assets/img/${data.language === "es" ? "concurso-meritos-y-oposicion-uteq-es.webp" : (data.language === "en" ? "concurso-meritos-y-oposicion-uteq-en.webp" : "concurso-meritos-y-oposicion-uteq-pt.webp")}`} className="d-block w-100 img-port-uth" alt={data.language === "es" ? "Concursos de M y O" : (data.language === "en" ? "M and O competitions" : "Concursos M e O")} />
                    </div>
                </>)
            }
            {
                datatbl.length > 0 && (<>
                    <DataTable
                        columns={columns(data.language)}
                        pagination
                        striped
                        className="table-wp"
                        highlightOnHover
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
                        paginationComponentOptions={{
                            rowsPerPageText: (data.language === "es" ? "Registros por página:" : (data.language === "en" ? "Rows per page:" : "Linhas por página:")),
                            rangeSeparatorText: (data.language === "en" ? "of" : "de"), noRowsPerPage: false, selectAllRowsItem: false, selectAllRowsItemText: (data.language === "en" ? "All" : "Todos")
                        }}
                        data={filteredItems}
                        noDataComponent={data.language === "es" ? "No hay registros para mostrar" : (data.language === "en" ? "No records to show" : "Sem registros para exibir")}
                        paginationResetDefaultPage={resetPaginationToggle}
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
                        responsive />
                </>)
            }
            <h2 className="title-cont-page text-rigth mt-3">{data.language === "es" ? "Capacitación y Formación Institucional" : (data.language === "en" ? "Institutional Training and Education" : "Formação e Educação Institucional")}</h2><br />
            {
                dataCourses.length == 0 && (<>
                    <div className="ratio ratio-21x9 pnl-img-rt">
                        <img src={`/assets/img/${data.language === "es" ? "capacitacion-y-formacion-profesional-uteq-es.webp" : (data.language === "en" ? "capacitacion-y-formacion-profesional-uteq-en.webp" : "capacitacion-y-formacion-profesional-uteq-pt.webp")}`}
                            className="d-block w-100 img-port-uth" alt={data.language === "es" ? "Capacitaciones de UTH" : (data.language === "en" ? "UTH trainings" : "Formações em UTH")} />
                    </div>
                </>)
            }
            {
                dataCourses.length > 0 && (<>
                    <DataTable
                        columns={columnsCourses(data.language)}
                        pagination
                        striped
                        className="table-wp"
                        highlightOnHover
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
                        paginationComponentOptions={{
                            rowsPerPageText: (data.language === "es" ? "Registros por página:" : (data.language === "en" ? "Rows per page:" : "Linhas por página:")),
                            rangeSeparatorText: (data.language === "en" ? "of" : "de"), noRowsPerPage: false, selectAllRowsItem: false, selectAllRowsItemText: (data.language === "en" ? "All" : "Todos")
                        }}
                        data={filteredItemsCrs}
                        noDataComponent={data.language === "es" ? "No hay registros para mostrar" : (data.language === "en" ? "No records to show" : "Sem registros para exibir")}
                        paginationResetDefaultPage={resetPaginationToggleCrs}
                        subHeader
                        subHeaderComponent={subHeaderComponentMemoCrs}
                        responsive />
                </>)
            }
            <h2 className="title-cont-page text-rigth mt-5">{data.language === "es" ? "Únete a nuestra Red de Talentos" : (data.language === "en" ? "Join our Talent Network" : "Junte-se à nossa Rede de Talentos")}</h2><br />
            {FormUTH(listVocationalTrain, listWorkExperience, data.language)}
        </div>
    </>);
}