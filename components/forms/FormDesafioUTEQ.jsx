import React, { useEffect, useState, useRef, useMemo } from 'react';
import axios from 'axios';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import DataTable from 'react-data-table-component';
import { NEXT_PUBLIC_RECAPTCHA_SITE_KEY, WS_VALIDATE_FORM, WS_REGISTER_POINTS_PARTICIPANTS, WS_LIST_PARTICIPANTS_CHALLENGES, WS_LIST_PARTICIPANTS_CHALLENGES_V2 } from 'config';


export { FormDesafioUTEQ };

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <div id="tbl-list-images_filter" className="dataTables_filter">
            <label>Buscar:<input type="search" className="" placeholder="" aria-controls="tbl-list-images" value={filterText} onChange={onFilter} /></label>
        </div>
    </>
);

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

async function make_get_request_ws(path_url) {
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


function FormDesafioUTEQ(language, codegift) {
    const formDesafioUTEQ = useRef();
    const [phoneNumber, setPhoneNumber] = useState();
    const validationMessages = {
        es: {
            pcNumeroID: {
                max: 'La longitud máxima de carácteres es 10',
                required: 'El campo Número ID es requerido',
            },
            pcNombreComp: {
                min: 'La longitud mínima de carácteres es 5',
                max: 'La longitud máxima de carácteres es 195',
                required: 'El campo Nombre completo es requerido',
                matches: 'El campo Nombre completo no tiene un formato válido',
            },
            pcEmail: {
                min: 'La longitud mínima de carácteres es 5',
                max: 'La longitud máxima de carácteres es 50',
                required: 'El campo Email es requerido',
                email: 'El correo electrónico ingresado no es válido',
            },
            pcEdad: {
                typeError: 'Debe ingresar un número',
                min: 'La edad mínima de inscripción es 14',
                max: 'La edad limite de inscripción es 45',
                required: 'El campo Edad es requerido',
            },
            pcCodigo: {
                min: 'La longitud mínima de carácteres es 8',
                max: 'La longitud máxima de carácteres es 8',
                required: 'El campo Código del regalo es requerido',
                matches: 'El campo Código del regalo no tiene un formato válido',
            },
            labelsForm: {
                label1: 'Registro de regalos',
                label2: 'Cédula *',
                label3: 'El campo Cédula es requerido',
                label4: 'Cada código de regalo tiene una cantidad de puntos definidos. Un participante no puede registrar dos veces el mismo código. No se permite el ingreso de códigos que no existen. Cada código de regalo tiene una cantidad de veces que puede ser canjeado, dicha cantidad se visualiza al encontrarlo. En la tabla de la parte inferior, se muestra la clasificación de participantes según la sumatoria acumulada de puntos alcanzandos.',
                label5: 'Nombre completo *',
                label6: 'El campo Nombre completo es requerido',
                label7: 'Teléfono *',
                label8: 'El teléfono ingresado no es válido',
                label9: 'El campo teléfono es requerido',
                label10: 'Email *',
                label11: 'El campo Email es requerido',
                label12: 'Edad *',
                label13: 'El campo Edad es requerido',
                label14: 'Código del regalo *',
                label15: 'El campo Código del regalo es requerido',
                label16: 'Registrar',
                label17: 'Cancelar',
                label18: 'Clasificación de participantes',
            },
            valdPhoneNumb: {
                message1: 'El teléfono ingresado no es válido',
                message2: 'El campo teléfono es requerido',
                message3: 'El país del teléfono debe ser el mismo que el país de origen',
            },
            valdDNI: {
                message1: 'El número de cédula no tiene una longitud válida',
                message2: 'El número de cédula ingresado no es válido',
                message3: 'El formato del número de cédula no es válido',
                message4: 'El número de cédula es exclusivo para usuarios de Ecuador',
                message5: 'El número de pasaporte ingresado no es válido',
                message6: 'El número de pasaporte ingresado no tiene un formato válido',
                message7: 'El R.U.C es exclusivo para usuarios de Ecuador',
                message8: 'El número ID no tiene un formato válido',
            },
            valRecaptcha: {
                message1: 'La validación de la herramienta Recaptcha no se completó correctamente',
            },
            otherMessages: {
                V1NULL: 'El campo Cédula es requerido',
                V2NULL: 'El campo Nombre completo es requerido',
                V3NULL: 'El campo Teléfono es requerido',
                V4NULL: 'El campo Edad es requerido',
                V5NULL: 'El campo Email es requerido',
                V6NULL: 'El campo Código del regalo es requerido',
                V6NOEX: 'El Código del regalo ingresado no es válido',
                V6YARG: 'El participante ya registró el código de regalo ingresado',
                PTSVCD: 'El código de regalo ya se encuentra expirado',
                PTSREG: 'Se ha registrado el código de regalo con éxito',
                EXCAPI: 'Ocurrió un error interno en el proceso'
            },
            gamesRules: {
                title: 'Reglas del juego',
                regla1: 'Puntos por código de regalo:',
                definicion1: 'Cada código de regalo está asociado a una cantidad específica de puntos.',
                regla2: 'Registro único:',
                definicion2: 'Un participante no puede registrar el mismo código más de una vez.',
                regla3: 'Códigos no válidos:',
                definicion3: 'No se permite el ingreso de códigos inexistentes o incorrectos.',
                regla4: 'Límites de canje:',
                definicion4: 'Cada código de regalo tiene un número limitado de veces que puede ser canjeado en total. Esta cantidad se muestra al encontrar el código.',
                regla5: 'Clasificación:',
                definicion5: 'En la tabla ubicada en la parte inferior, podrás ver la clasificación de los participantes, ordenada según la suma acumulada de puntos obtenidos.',
                lblaws: 'Premios:',
                premios: '1er lugar gana una chaqueta universitaria, 2do lugar al 4to lugar ganan una camiseta universitaria, 5to lugar al 9no lugar ganan un tomatodo, 10mo lugar al 12mo lugar ganan una taza, 13ro lugar al 22do lugar ganan un pendrive, 23ro lugar al 26to lugar ganan una libreta, 27mo lugar al 28vo lugar ganan un bloc de notas, 29no lugar al 30mo lugar ganan una bolsa universitaria.',
            },
        },
        en: {
            pcNumeroID: {
                max: 'Maximum character length is 10',
                required: 'The field Número ID is required',
            },
            pcNombreComp: {
                min: 'Minimum character length is 5',
                max: 'Maximum character length is 195',
                required: 'The field Nombre completo is required',
                matches: 'The field Nombre completo is in an invalid format',
            },
            pcEmail: {
                min: 'Minimum character length is 5',
                max: 'Maximum character length is 50',
                required: 'The field Email is required',
                email: 'Invalid email address',
            },
            pcEdad: {
                typeError: 'Please enter a valid number',
                min: 'The minimum age for registration is 14',
                max: 'The maximum age for registration is 45',
                required: 'The field Edad is required',
            },
            pcCodigo: {
                min: 'The minimum length of characters is 8',
                max: 'The maximum length of characters is 8',
                required: 'The Gift Code field is required',
                matches: 'The Gift Code field does not have a valid format',
            },
            labelsForm: {
                label1: 'Gift registry',
                label2: 'DNI *',
                label3: 'The field DNI is required',
                label4: 'Each gift code has a defined number of points. A participant cannot register the same code more than once. The entry of non-existent codes is not allowed. Each gift code has a set number of times it can be redeemed, and this number is displayed when found. In the table at the bottom, the ranking of participants is shown based on the accumulated sum of points achieved.',
                label5: 'Full Name *',
                label6: 'The Full Name field is required',
                label7: 'Phone Number *',
                label8: 'The entered phone number is not valid',
                label9: 'The Phone Number field is required',
                label10: 'Email *',
                label11: 'The Email field is required',
                label12: 'Age *',
                label13: 'The Age field is required',
                label14: 'Gift code *',
                label15: 'The Gift Code field is required',
                label16: 'Register',
                label17: 'Cancel',
                label18: 'Ranking of participants',
            },
            valdPhoneNumb: {
                message1: 'The entered phone number is not valid',
                message2: 'The phone number field is required',
                message3: 'The country of the phone must be the same as the country of origin',
            },
            valdDNI: {
                message1: 'The DNI does not have a valid length',
                message2: 'The entered DNI is not valid',
                message3: 'The format of the DNI is not valid',
                message4: 'The DNI is exclusive to Ecuadorian users',
                message5: 'The entered passport number is not valid',
                message6: 'The entered passport number does not have a valid format',
                message7: 'The R.U.C is exclusive to Ecuadorian users',
                message8: 'The DNI does not have a valid format',
            },
            valRecaptcha: {
                message1: 'The validation of the Recaptcha tool was not completed correctly',
            },
            otherMessages: {
                V1NULL: 'The DNI is required',
                V2NULL: 'The Full Name field is required',
                V3NULL: 'The Phone field is required',
                V4NULL: 'The Age field is required',
                V5NULL: 'The Email field is required',
                V6NULL: 'The Gift Code field is required',
                V6NOEX: 'The entered Gift Code is not valid',
                V6YARG: 'The participant has already registered the entered Gift Code',
                PTSVCD: 'The Gift Code has already expired',
                PTSREG: 'The Gift Code has been successfully registered',
                EXCAPI: 'An internal error occurred during the process',
            },
            gamesRules: {
                title: 'Game Rules',
                regla1: 'Points per gift code:',
                definicion1: 'Each gift code is associated with a specific number of points.',
                regla2: 'Unique registration:',
                definicion2: 'A participant cannot register the same code more than once.',
                regla3: 'Invalid codes:',
                definicion3: 'The entry of non-existent or incorrect codes is not allowed.',
                regla4: 'Redemption limits:',
                definicion4: 'Each gift code has a limited number of times it can be redeemed in total. This number is displayed when the code is found.',
                regla5: 'Leaderboard:',
                definicion5: 'In the table at the bottom, you can view the ranking of participants, ordered by the accumulated sum of points earned.',
                lblaws: 'Prizes:', 
                premios: '1st place wins a university jacket, 2nd to 4th places win a university t-shirt, 5th to 9th places win a water bottle, 10th to 12th places win a mug, 13th to 22nd places win a USB drive, 23rd to 26th places win a notebook, 27th to 28th places win a notepad, 29th to 30th places win a university totebag.',
            },
        },
        pt: {
            pcNumeroID: {
                max: 'Comprimento máximo de caracteres é 10',
                required: 'O campo Número ID é obrigatório',
            },
            pcNombreComp: {
                min: 'Comprimento mínimo de caracteres é 5',
                max: 'Comprimento máximo de caracteres é 195',
                required: 'O campo Nome completo é obrigatório',
                matches: 'O campo Nome completo está em um formato inválido',
            },
            pcEmail: {
                min: 'Comprimento mínimo de caracteres é 5',
                max: 'Comprimento máximo de caracteres é 50',
                required: 'O campo Email é obrigatório',
                email: 'Endereço de email inválido',
            },
            pcEdad: {
                typeError: 'Por favor, insira um número válido',
                min: 'A idade mínima para inscrição é 14',
                max: 'A idade máxima para inscrição é 45',
                required: 'O campo Idade é obrigatório',
            },
            pcCodigo: {
                min: 'O comprimento mínimo de caracteres é 8',
                max: 'O comprimento máximo de caracteres é 8',
                required: 'O campo Código do presente é obrigatório',
                matches: 'O campo Código do presente não tem um formato válido',
            },
            labelsForm: {
                label1: 'Registro de presentes',
                label2: 'Cartão de identificação *',
                label3: 'O campo Cartão de identificação é obrigatório',
                label4: 'Cada código de presente possui uma quantidade de pontos definida. Um participante não pode registrar o mesmo código duas vezes. Não é permitido o ingresso de códigos que não existem. Cada código de presente tem um número de vezes que pode ser resgatado, e essa quantidade é exibida quando encontrado. Na tabela na parte inferior, é exibida a classificação dos participantes de acordo com a soma acumulada dos pontos alcançados.',
                label5: 'Nome Completo *',
                label6: 'O campo Nome Completo é obrigatório',
                label7: 'Telefone *',
                label8: 'O número de telefone inserido não é válido',
                label9: 'O campo Telefone é obrigatório',
                label10: 'Email *',
                label11: 'O campo Email é obrigatório',
                label12: 'Idade *',
                label13: 'O campo Idade é obrigatório',
                label14: 'Código de presente *',
                label15: 'O campo Gift Code é obrigatório',
                label16: 'Registrar',
                label17: 'Cancelar',
                label18: 'Classificação dos participantes',
            },
            valdPhoneNumb: {
                message1: 'O número de telefone inserido não é válido',
                message2: 'O campo de número de telefone é obrigatório',
                message3: 'O país do telefone deve ser o mesmo que o país de origem',
            },
            valdDNI: {
                message1: 'O cartão de identificação não possui um comprimento válido',
                message2: 'O cartão de identificação inserido não é válido',
                message3: 'O formato do cartão de identificação não é válido',
                message4: 'O número de identificação é exclusivo para usuários equatorianos',
                message5: 'O número de passaporte inserido não é válido',
                message6: 'O número de passaporte inserido não possui um formato válido',
                message7: 'O R.U.C é exclusivo para usuários equatorianos',
                message8: 'O número de ID não possui um formato válido',
            },
            valRecaptcha: {
                message1: 'A validação da ferramenta Recaptcha não foi concluída corretamente',
            },
            otherMessages: {
                V1NULL: 'O campo cartão de identificação é obrigatório',
                V2NULL: 'O campo Nome completo é obrigatório',
                V3NULL: 'O campo Telefone é obrigatório',
                V4NULL: 'O campo Idade é obrigatório',
                V5NULL: 'O campo E-mail é obrigatório',
                V6NULL: 'O campo Código do presente é obrigatório',
                V6NOEX: 'O Código do presente informado não é válido',
                V6YARG: 'O participante já registrou o Código do presente informado',
                PTSVCD: 'O Código do presente já está expirado',
                PTSREG: 'O Código do presente foi registrado com sucesso',
                EXCAPI: 'Ocorreu um erro interno no processo',
            },
            gamesRules: {
                title: 'Regras do jogo',
                regla1: 'Pontos por código de presente:',
                definicion1: 'Cada código de presente está associado a uma quantidade específica de pontos.',
                regla2: 'Registro único:',
                definicion2: 'Um participante não pode registrar o mesmo código mais de uma vez.',
                regla3: 'Códigos inválidos:',
                definicion3: 'Não é permitido o ingresso de códigos inexistentes ou incorretos.',
                regla4: 'Limites de resgate:',
                definicion4: 'Cada código de presente tem um número limitado de vezes que pode ser resgatado no total. Essa quantidade é exibida ao encontrar o código.',
                regla5: 'Classificação:',
                definicion5: 'Na tabela na parte inferior, você pode ver a classificação dos participantes, ordenada pela soma acumulada de pontos conquistados.',
                lblaws: 'Prêmios:', 
                premios: '1º lugar ganha uma jaqueta universitária, 2º ao 4º lugar ganham uma camiseta universitária, 5º ao 9º lugar ganham uma garrafinha, 10º ao 12º lugar ganham uma caneca, 13º ao 22º lugar ganham um pen drive, 23º ao 26º lugar ganham um caderno, 27º ao 28º lugar ganham um bloco de notas, 29º ao 30º lugar ganham uma bolsa universitária.',
            },
        }
    };

    const messages = {
        V1NULL: validationMessages[language].otherMessages.V1NULL,
        V2NULL: validationMessages[language].otherMessages.V2NULL,
        V3NULL: validationMessages[language].otherMessages.V3NULL,
        V4NULL: validationMessages[language].otherMessages.V4NULL,
        V5NULL: validationMessages[language].otherMessages.V5NULL,
        V6NULL: validationMessages[language].otherMessages.V6NULL,
        V6NOEX: validationMessages[language].otherMessages.V6NOEX,
        V6YARG: validationMessages[language].otherMessages.V6YARG,
        PTSVCD: validationMessages[language].otherMessages.PTSVCD,
        PTSREG: validationMessages[language].otherMessages.PTSREG,
        EXCAPI: validationMessages[language].otherMessages.EXCAPI,
    };

    const validationSchema = Yup.object().shape({
        pcNumeroID: Yup.string()
            .max(10, validationMessages[language].pcNumeroID.max)
            .required(validationMessages[language].pcNumeroID.required),
        pcNombreComp: Yup.string()
            .min(5, validationMessages[language].pcNombreComp.min)
            .max(195, validationMessages[language].pcNombreComp.max)
            .required(validationMessages[language].pcNombreComp.required)
            .matches(/^[A-Za-zÁÉÍÑÓÚáé íñóú]*$/, validationMessages[language].pcNombreComp.matches),
        pcEdad: Yup.number()
            .typeError(validationMessages[language].pcEdad.typeError)
            .min(14, validationMessages[language].pcEdad.min)
            .max(45, validationMessages[language].pcEdad.max)
            .required(validationMessages[language].pcEdad.required),
        pcEmail: Yup.string()
            .min(5, validationMessages[language].pcEmail.min)
            .max(50, validationMessages[language].pcEmail.max)
            .required(validationMessages[language].pcEmail.required)
            .email(validationMessages[language].pcEmail.email),
        pcCodigo: Yup.string()
            .min(8, validationMessages[language].pcCodigo.min)
            .max(8, validationMessages[language].pcCodigo.max)
            .required(validationMessages[language].pcCodigo.required)
            .matches(/^\d{3}-\d{4}$/, validationMessages[language].pcCodigo.matches),

    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, reset, formState: { errors }, clearErrors } = useForm(formOptions);
    const onError = (errors, e) => console.log(errors, e);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mesgForm, setMesgForm] = useState("");
    const [tpmsgForm, setTpmsgForm] = useState(0);
    const [datatbl, setDatatbl] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const fetchDataTable = async () => {
        try {
            const result = await make_request_ws(WS_LIST_PARTICIPANTS_CHALLENGES_V2);
            setDatatbl((result.data !== null && result.data !== "") ? result.data : []);
        } catch (error) {
            console.error("Error al cargar los datos: ", error);
        }
    };

    useEffect(() => {
        fetchDataTable();
    }, []);

    const columns = (language) => [
        {
            name: (language === "en" ? "Participant" : "Participante"),
            selector: row => row.nombres.trim(),
            sortable: true,
            width: '40%',
            filterable: true
        },
        {
            name: (language === "es" ? "Puntaje" : (language === "en" ? "Score" : "Pontuação")),
            selector: row => row.puntos,
            sortable: true,
            width: '15%',
            center: true
        },
        {
            name: (language === "es" ? "Tiempo utilizado" : (language === "en" ? "Time spent" : "Tempo gasto")),
            selector: row => row.tiempo.trim(),
            sortable: true,
            width: '45%',
            center: true
        },
    ];

    const filteredItems = datatbl.filter(
        item => (item.nombres && item.nombres.toLowerCase().includes(filterText.toLowerCase())) ||
        (item.puntos && item.puntos.toString().toLowerCase().includes(filterText.toLowerCase()))  ||
            (item.tiempo && item.tiempo.toString().toLowerCase().includes(filterText.toLowerCase()))
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

    const onResetClick = () => {
        clearErrors();
        setPhoneNumber("");
        reset();
        setMesgForm("");
        setTpmsgForm(0);
        setIsSubmitting(false);
    }

    const onSubmit = async (data) => {
        var message = '', tipomes = 0, estdVald = false;

        setIsSubmitting(true);
        setMesgForm(phoneNumber ? (isValidPhoneNumber(phoneNumber) ? '' : validationMessages[language].valdPhoneNumb.message1) : validationMessages[language].valdPhoneNumb.message2);

        if (phoneNumber ? (isValidPhoneNumber(phoneNumber) ? true : false) : false) {
            if (data.pcNumeroID.length !== 10) {
                setMesgForm(validationMessages[language].valdDNI.message1);
                estdVald = false;
            } else {
                const regNumbers = /^[0-9\b]+$/;

                if (regNumbers.test(data.pcNumeroID.trim())) {
                    estdVald = validationDniEcuador(data.pcNumeroID.trim());
                    setMesgForm(!estdVald ? validationMessages[language].valdDNI.message2 : '');
                } else {
                    estdVald = false;
                    setMesgForm(validationMessages[language].valdDNI.message3);
                }
            }

            if (estdVald) {
                try {
                    window.grecaptcha.ready(() => {
                        window.grecaptcha
                            .execute(NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: "submit" })
                            .then(async (token) => {
                                try {
                                    await axios.post(`${WS_VALIDATE_FORM}${token}`).then(function (response) {
                                        if (response.data === "OK") {
                                            axios.post(WS_REGISTER_POINTS_PARTICIPANTS, {
                                                pdbqDni: data.pcNumeroID,
                                                pdbqNombres: data.pcNombreComp,
                                                pdbqTelefono: phoneNumber.replace('+593', '0'),
                                                pdbqEdad: data.pcEdad,
                                                pdbqEmail: data.pcEmail,
                                                pdbqCodigoReq: data.pcCodigo,
                                            }).then(function (response) {
                                                let message = messages[response.data];
                                                let tipomes = 1;

                                                if (!message) {
                                                    message = '';
                                                }

                                                if (response.data === "PTSREG") {
                                                    tipomes = 2;
                                                    setPhoneNumber("");
                                                    clearErrors();
                                                    reset();
                                                    fetchDataTable();
                                                }

                                                setMesgForm(message);
                                                setTpmsgForm(tipomes);
                                                setIsSubmitting(true);
                                            }).catch(function (error) {
                                                setMesgForm(error);
                                                setTpmsgForm(1);
                                                setIsSubmitting(false);
                                            })
                                        } else {
                                            message = validationMessages[language].valRecaptcha.message1;
                                            setMesgForm(message);
                                            setTpmsgForm(1);
                                            setIsSubmitting(false);
                                        }
                                    }).catch(function (error) {
                                        setMesgForm(error);
                                        setTpmsgForm(1);
                                        setIsSubmitting(false);
                                    })
                                } catch (error) {
                                    setMesgForm(error.message);
                                    setTpmsgForm(1);
                                    setIsSubmitting(false);
                                }
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
            } else {
                setTpmsgForm(1);
                setIsSubmitting(false);
            }
        } else {
            setTpmsgForm(1);
            setIsSubmitting(false);
        }

        return false;
    }


    return (<>
        <div className="row">
            <div className="card-form" ref={formDesafioUTEQ}>
            	{new Date() <= new Date('2024-12-20T23:59:59') ? (
                <form className="form-card" id="form-event" onSubmit={handleSubmit(onSubmit, onError)}>
                    <div className="card pnl-information-symp mt-2">
                        <div className="card-header pnl-hdr-symp">
                            {validationMessages[language].labelsForm.label1}
                        </div>
                        <div className="card-body pnl-bdy-symp">
                            <div className="row justify-content-between text-left">
                                <div className="form-group col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 flex-column d-flex">
                                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                        <strong>{validationMessages[language].gamesRules.title}</strong><br />
                                        <strong>{validationMessages[language].gamesRules.regla1}</strong> {validationMessages[language].gamesRules.definicion1}<br />
                                        <strong>{validationMessages[language].gamesRules.regla2}</strong> {validationMessages[language].gamesRules.definicion2}<br />
                                        <strong>{validationMessages[language].gamesRules.regla3}</strong> {validationMessages[language].gamesRules.definicion3}<br />
                                        <strong>{validationMessages[language].gamesRules.regla4}</strong> {validationMessages[language].gamesRules.definicion4}<br />
                                        <strong>{validationMessages[language].gamesRules.regla5}</strong> {validationMessages[language].gamesRules.definicion5}<br />
                                        <strong>{validationMessages[language].gamesRules.lblaws}</strong> {validationMessages[language].gamesRules.premios}
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-between text-left">
                                <div className="form-group col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 flex-column d-flex">
                                    <label className="form-control-label px-3" htmlFor="txt-numid">{validationMessages[language].labelsForm.label2}</label>
                                    <input
                                        type="text"
                                        id="txt-numid"
                                        className={`form-control ${errors.pcNumeroID ? 'is-invalid' : ''}`}
                                        maxLength={10}
                                        name="pcNumeroID"
                                        {...register('pcNumeroID')}
                                        data-error={validationMessages[language].labelsForm.label3}
                                        onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')}
                                    />
                                    <div className="invalid-feedback">{errors.pcNumeroID?.message}</div>
                                </div>
                                <div className="form-group col-12 col-sm-12 col-md-7 col-lg-6 col-xl-6 col-xxl-6 flex-column d-flex">
                                    <label className="form-control-label px-3" htmlFor="txt-nmbcomp">{validationMessages[language].labelsForm.label5}</label>
                                    <input type="text" id="txt-nmbcomp" maxLength={100} className={`form-control ${errors.pcNombreComp ? 'is-invalid' : ''}`} name="pcNombreComp" {...register('pcNombreComp')} data-error={validationMessages[language].labelsForm.label6} />
                                    <div className="invalid-feedback">{errors.pcNombreComp?.message}</div>
                                </div>
                                <div className="form-group col-12 col-sm-12 col-md-5 col-lg-3 col-xl-3 col-xxl-3 flex-column d-flex">
                                    <label className="form-control-label px-3" htmlFor="txt-telefono">{validationMessages[language].labelsForm.label7}</label>
                                    <PhoneInput
                                        placeholder=""
                                        name="pcTelefono"
                                        {...register('pcTelefono')}
                                        id="txt-telefono"
                                        value={phoneNumber}
                                        onChange={setPhoneNumber}
                                        defaultCountry="EC"
                                        countries={['EC']}
                                        addInternationalOption={false}
                                        error={phoneNumber ? (isValidPhoneNumber(phoneNumber) ? undefined : validationMessages[language].labelsForm.label8) : validationMessages[language].labelsForm.label9} />
                                    <div className="invalid-feedback">{errors.pcTelefono?.message}</div>
                                </div>
                            </div>
                            <div className="row justify-content-between text-left">
                                <div className="form-group col-12 col-sm-12 col-md-5 col-lg-3 col-xl-3 col-xxl-3 flex-column d-flex">
                                    <label className="form-control-label px-3" htmlFor="txt-edad">{validationMessages[language].labelsForm.label12}</label>
                                    <input type="number" id="txt-edad" min={14} max={45} className={`form-control ${errors.pcEdad ? 'is-invalid' : ''}`} name="pcEdad" {...register('pcEdad')} data-error={validationMessages[language].labelsForm.label13} />
                                    <div className="invalid-feedback">{errors.pcEdad?.message}</div>
                                </div>
                                <div className="form-group col-12 col-sm-12 col-md-7 col-lg-6 col-xl-6 col-xxl-6 flex-column d-flex">
                                    <label className="form-control-label px-3" htmlFor="txt-email">{validationMessages[language].labelsForm.label10}</label>
                                    <input type="text" id="txt-email" className={`form-control ${errors.pcEmail ? 'is-invalid' : ''}`} name="pcEmail" {...register('pcEmail')} maxLength={50} data-error={validationMessages[language].labelsForm.label11} />
                                    <div className="invalid-feedback">{errors.pcEmail?.message}</div>
                                </div>
                                <div className="form-group col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 flex-column d-flex">
                                    <label className="form-control-label px-3" htmlFor="txt-numid">{validationMessages[language].labelsForm.label14}</label>
                                    <input type="text"
                                        id="txt-numid"
                                        className={`form-control ${errors.pcCodigo ? 'is-invalid' : ''}`}
                                        maxLength={8}
                                        name="pcCodigo"
                                        readOnly
                                        value={codegift}
                                        {...register('pcCodigo', { required: !codegift ? true : false })}
                                        data-error={validationMessages[language].labelsForm.label15}
                                        style={{
                                            cursor: 'not-allowed',
                                          }} />
                                    <div className="invalid-feedback">{errors.pcCodigo?.message}</div>
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
                            <div className="row justify-content-end mt-3">
                                <div className="form-group col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 col-lg-12 col-xl-12 col-xxl-12 text-center">
                                    <button type="submit" className="btn-block mr-2" disabled={isSubmitting} form="form-event">
                                        {isSubmitting ? (<span className="spinner-border spinner-border-sm mr-1"></span>) : (<i className="fa fa-check-circle fa-1x" aria-hidden="true"></i>)}
                                        &nbsp;{validationMessages[language].labelsForm.label16}
                                    </button>
                                    <button type="button" className="btn-block" disabled={isSubmitting} onClick={onResetClick}><i className="fa fa-ban fa-1x" aria-hidden="true"></i>&nbsp;{validationMessages[language].labelsForm.label17}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            	) : (
                    <div className="col-md-12 w-100 mt-2">
                        <div className="ratio ratio-21x9">
                            <img src={"/assets/images/advertisements/principal/cierre-desafio-360.webp"} className="d-block w-100" alt="Aviso importante del concurso Desafío UTEQ" />
                        </div>
                    </div>
                )}
                <div className="card pnl-information-symp mt-2">
                    <div className="card-header pnl-hdr-symp">
                        {validationMessages[language].labelsForm.label18}
                    </div>
                    <div className="card-body pnl-bdy-symp">
                        <div className="col-md-12 w-100 mt-2">
                            <DataTable
                                columns={columns(language)}
                                pagination
                                striped
                                className="table-wp"
                                highlightOnHover
                                paginationPerPage={10}
                                paginationRowsPerPageOptions={[10, 15, 20, 25, 30]}
                                paginationComponentOptions={{
                                    rowsPerPageText: (language === "es" ? "Registros por página:" : (language === "en" ? "Rows per page:" : "Linhas por página:")),
                                    rangeSeparatorText: (language === "en" ? "of" : "de"), noRowsPerPage: false, selectAllRowsItem: false, selectAllRowsItemText: (language === "en" ? "All" : "Todos")
                                }}
                                data={filteredItems}
                                noDataComponent={language === "es" ? "No hay registros para mostrar" : (language === "en" ? "No records to show" : "Sem registros para exibir")}
                                paginationResetDefaultPage={resetPaginationToggle}
                                subHeader
                                subHeaderComponent={subHeaderComponentMemo}
                                responsive
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}
