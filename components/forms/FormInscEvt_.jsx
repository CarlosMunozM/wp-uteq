import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { WS_LIST_CITIES_BY_COUNTRY, NEXT_PUBLIC_RECAPTCHA_SITE_KEY, WS_VALIDATE_FORM, WS_REGISTER_USER_EVENT } from 'config';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import validator from 'validator';



export { FormInscEvt };

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

async function make_post_request_ws(path_url) {
    var listTemp = null;
    const https = require('https');
    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    try {
        await axios.post(path_url, { httpsAgent: agent }).then(function (response) {
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

function FormInscEvt(dataCountries, dataSymps, language) {

    const formInscriptions = useRef();
    const [listCities, setListCities] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState();
    const [countryPhn, setCountryPh] = useState("EC");
    const [country, setCountry] = useState("EC");
    const lstCtriesPassport = ["AM", "AR", "AT", "AU", "BE", "BG", "BY", "BR", "CA", "CH", "CN", "CY", "CZ", "DE", "DK", "DZ", "EE",
        "ES", "FI", "FR", "GB", "GR", "HR", "HU", "IE", "IN", "IR", "ID", "IS", "IT", "JP", "KR", "LT", "LU", "LV", "LY", "MT", "MZ", "NL",
        "PL", "PT", "RO", "RU", "SE", "SL", "SK", "TR", "UA", "US"];
    /*const validationSchema = Yup.object().shape({
        pcTipoInc: Yup.string().required('El campo Tipo de Inscripción es requerido'),
        pcSimposio: Yup.string().required('El campo Simposio es requerido'),
        pcTipoID: Yup.string().required('El campo Tipo ID es requerido'),
        pcNumeroID: Yup.string().max(30, 'La longitud máxima de carácteres es 30').required('El campo Número ID es requerido'),
        pcNombreComp: Yup.string().min(5, 'La longitud mínima de carácteres es 5').max(195, 'La longitud máxima de carácteres es 195').required('El campo Nombre completo es requerido').matches(
            /^[A-Za-zÁÉÍÑÓÚáé íñóú]*$/,
            "El campo Nombre completo no tiene un formato válido"
        ),
        pcEmail: Yup.string().min(5, 'La longitud mínima de carácteres es 5').max(50, 'La longitud máxima de carácteres es 50').required('El campo Email es requerido').email('El correo electrónico ingresado no es válido'),
        pcEdad: Yup.number().typeError('Debe ingresar un número').min(17, 'La edad mínima de inscripción es 17').max(100, 'La edad limite de inscripción es 100').required('El campo Edad es requerido'),
        pcGenero: Yup.string().required('El campo Género es requerido'),
        pcPais: Yup.string().required('El campo País es requerido'),
        pcCiudad: Yup.string().required('El campo Ciudad es requerido'),
        pcInstitc: Yup.string().min(3, 'La longitud mínima de carácteres es 3').max(100, 'La longitud máxima de carácteres es 100')
            .required('El campo Institución es requerido').matches(
                /^[A-Za-z0-9ÁÉÍÑÓÚáé íñóú]*$/,
                "El campo Institución no tiene un formato válido"
            ),
        pcEspecld: Yup.string().min(3, 'La longitud mínima de carácteres es 3').max(100, 'La longitud máxima de carácteres es 100')
            .required('El campo Especialidad es requerido').matches(
                /^[A-Za-zÁÉÍÑÓÚáé íñóú]*$/,
                "El campo Especialidad no tiene un formato válido"
            ),
        pcProfs: Yup.string().min(3, 'La longitud mínima de carácteres es 3').max(100, 'La longitud máxima de carácteres es 100')
            .required('El campo Profesión es requerido').matches(
                /^[A-Za-zÁÉÍÑÓÚáé íñóú]*$/,
                "El campo Profesión no tiene un formato válido"
            ),
        pcContrs: Yup.string().required('La contraseña es requerida').min(8, 'La longitud mínima de carácteres es 8')
            .max(15, 'La longitud máxima de carácteres es 15').matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})/,
                "La contraseña debe contener mínimo una mayúscula, una minúscula, un número y un carácter especial(!@#$%&*)"
            ),
        pcContrs2: Yup.string().required('La contraseña es requerida').oneOf([Yup.ref('pcContrs')], 'Las contraseñas no son iguales')
    });*/

    const validationMessages = {
        es: {
            pcTipoInc: {
                required: 'El campo Tipo de Inscripción es requerido',
            },
            pcSimposio: {
                required: 'El campo Simposio es requerido',
            },
            pcTipoID: {
                required: 'El campo Tipo ID es requerido',
            },
            pcNumeroID: {
                max: 'La longitud máxima de carácteres es 30',
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
                min: 'La edad mínima de inscripción es 17',
                max: 'La edad limite de inscripción es 100',
                required: 'El campo Edad es requerido',
            },
            pcGenero: {
                required: 'El campo Género es requerido',
            },
            pcPais: {
                required: 'El campo País es requerido',
            },
            pcCiudad: {
                required: 'El campo Ciudad es requerido',
            },
            pcInstitc: {
                min: 'La longitud mínima de carácteres es 3',
                max: 'La longitud máxima de carácteres es 100',
                required: 'El campo Institución es requerido',
                matches: 'El campo Institución no tiene un formato válido',
            },
            pcEspecld: {
                min: 'La longitud mínima de carácteres es 3',
                max: 'La longitud máxima de carácteres es 100',
                required: 'El campo Especialidad es requerido',
                matches: 'El campo Especialidad no tiene un formato válido',
            },
            pcProfs: {
                min: 'La longitud mínima de carácteres es 3',
                max: 'La longitud máxima de carácteres es 100',
                required: 'El campo Profesión es requerido',
                matches: 'El campo Profesión no tiene un formato válido',
            },
            pcContrs: {
                required: 'La contraseña es requerida',
                min: 'La longitud mínima de carácteres es 8',
                max: 'La longitud máxima de carácteres es 15',
                matches: 'La contraseña debe contener mínimo una mayúscula, una minúscula, un número y un carácter especial(!@#$%&*)',
            },
            pcContrs2: {
                required: 'La contraseña es requerida',
                oneOf: 'Las contraseñas no son iguales',
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
                TIDNVD: 'El campo Tipo ID es requerido',
                IDTNVD: 'El campo Número ID es requerido',
                NMBNVD: 'El campo Nombre completo es requerido',
                ANINVD: 'El campo Edad es requerido',
                EDADFL: 'La edad ingresada no es permitida',
                SEXNVD: 'El campo Género es requerido',
                TLFNVD: 'El campo teléfono es requerido',
                EMLNVD: 'El campo Email es requerido',
                ICDNVD: 'El campo Ciudad es requerido',
                INTNVD: 'El campo Institución es requerido',
                ESPNVD: 'El campo Especialidad es requerido',
                PRFNVD: 'El campo Profesión es requerido',
                CTRNVD: 'La contraseña es requerida',
                LGCNVD: 'La longitud mínima de caracteres es 8',
                ISMNVD: 'El campo Simposio es requerido',
                URINVD: 'El campo Tipo de Inscripción es requerido',
                INSCRD: 'Las inscripciones se encuentran cerradas',
                USREXT: 'Los datos del usuario ya se encuentran registrados',
                EMLEXT: 'El correo electrónico ya fue registrado anteriormente',
                ERREXC: 'Ocurrió un error en el registro de los datos',
                ERRCTH: 'Ocurrió un error interno en el proceso de registro de los datos',
                REGCFM: 'El proceso de inscripción se ha llevado a cabo con éxito. Revise el buzón de entrada de su correo electrónico',
            },
            labelsForm: {
                label1: 'Datos del Evento',
                label2: 'Tipo de Inscripción *',
                label3: 'Expositor',
                label4: 'Participante',
                label5: 'Simposio *',
                label6: 'El campo Simposio es requerido',
                label7: 'Selecciona una opción',
                label8: 'Datos del Participante',
                label9: 'Política de contraseñas.',
                label10: 'La contraseña debe contener mínimo una mayúscula, una minúscula, un número y un carácter especial(!@#$%&*). La longitud permitida es de 8 a 15 carácteres.',
                label11: 'Tipo ID *',
                label12: 'Cédula',
                label13: 'Pasaporte',
                label14: 'R.U.C',
                label15: 'Otros',
                label16: 'Número ID *',
                label17: 'El campo Número ID es requerido',
                label18: 'Nombre completo *',
                label19: 'El campo Nombre completo es requerido',
                label20: 'Teléfono *',
                label21: 'El teléfono ingresado no es válido',
                label22: 'El campo teléfono es requerido',
                label23: 'Email *',
                label24: 'El campo Email es requerido',
                label25: 'Edad *',
                label26: 'El campo Edad es requerido',
                label27: 'Género *',
                label28: 'El campo Género es requerido',
                label29: 'Hombre',
                label30: 'Mujer',
                label31: 'País *',
                label32: 'Ciudad *',
                label33: 'Institución *',
                label34: 'El campo Institución es requerido',
                label35: 'Especialidad *',
                label36: 'El campo Especialidad es requerido',
                label37: 'Profesión *',
                label38: 'El campo Profesión es requerido',
                label39: 'Contraseña *',
                label40: 'El campo Contraseña es requerido',
                label41: 'Confirmar contraseña *',
                label42: 'El campo Confirmar contraseña es requerido',
                label43: 'Registrar',
                label44: 'Cancelar',
                label45: 'El campo Tipo de Inscripción es requerido',
                label46: 'El campo País es requerido',
                label47: 'El campo Ciudad es requerido',
            	label48: 'Importante.',
                label49: 'Los nombres ingresados serán utilizados para la emisión del certificado. Verifique cuidadosamente los datos antes de continuar.',
            },
        },
        en: {
            pcTipoInc: {
                required: 'The field Tipo de Inscripción is required',
            },
            pcSimposio: {
                required: 'The field Simposio is required',
            },
            pcTipoID: {
                required: 'The field Tipo ID is required',
            },
            pcNumeroID: {
                max: 'Maximum character length is 30',
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
                min: 'The minimum age for registration is 17',
                max: 'The maximum age for registration is 100',
                required: 'The field Edad is required',
            },
            pcGenero: {
                required: 'The field Género is required',
            },
            pcPais: {
                required: 'The field País is required',
            },
            pcCiudad: {
                required: 'The field Ciudad is required',
            },
            pcInstitc: {
                min: 'Minimum character length is 3',
                max: 'Maximum character length is 100',
                required: 'The field Institución is required',
                matches: 'The field Institución is in an invalid format',
            },
            pcEspecld: {
                min: 'Minimum character length is 3',
                max: 'Maximum character length is 100',
                required: 'The field Especialidad is required',
                matches: 'The field Especialidad is in an invalid format',
            },
            pcProfs: {
                min: 'Minimum character length is 3',
                max: 'Maximum character length is 100',
                required: 'The field Profesión is required',
                matches: 'The field Profesión is in an invalid format',
            },
            pcContrs: {
                required: 'The password is required',
                min: 'Minimum character length is 8',
                max: 'Maximum character length is 15',
                matches: 'The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character(!@#$%&*)',
            },
            pcContrs2: {
                required: 'The password is required',
                oneOf: 'Passwords do not match',
            },
            valdPhoneNumb: {
                message1: 'The entered phone number is not valid',
                message2: 'The phone number field is required',
                message3: 'The country of the phone must be the same as the country of origin',
            },
            valdDNI: {
                message1: 'The ID number does not have a valid length',
                message2: 'The entered ID number is not valid',
                message3: 'The format of the ID number is not valid',
                message4: 'The ID number is exclusive to Ecuadorian users',
                message5: 'The entered passport number is not valid',
                message6: 'The entered passport number does not have a valid format',
                message7: 'The R.U.C is exclusive to Ecuadorian users',
                message8: 'The ID number does not have a valid format',
            },
            valRecaptcha: {
                message1: 'The validation of the Recaptcha tool was not completed correctly',
            },
            otherMessages: {
                TIDNVD: 'The field Tipo ID is required',
                IDTNVD: 'The field Número ID is required',
                NMBNVD: 'The field Nombre completo is required',
                ANINVD: 'The field Edad is required',
                EDADFL: 'The entered age is not allowed',
                SEXNVD: 'The field Género is required',
                TLFNVD: 'The field phone is required',
                EMLNVD: 'The field Email is required',
                ICDNVD: 'The field Ciudad is required',
                INTNVD: 'The field Institución is required',
                ESPNVD: 'The field Especialidad is required',
                PRFNVD: 'The field Profesión is required',
                CTRNVD: 'The password is required',
                LGCNVD: 'Minimum character length is 8',
                ISMNVD: 'The field Simposio is required',
                URINVD: 'The field Tipo de Inscripción is required',
                INSCRD: 'Registrations are closed',
                USREXT: 'User data is already registered',
                EMLEXT: 'Email has already been registered previously',
                ERREXC: 'An error occurred while registering the data',
                ERRCTH: 'An internal error occurred in the data registration process',
                REGCFM: 'The registration process has been successfully completed. Please check your email inbox',
            },
            labelsForm: {
                label1: 'Event Details',
                label2: 'Registration Type *',
                label3: 'Exhibitor',
                label4: 'Participant',
                label5: 'Symposium *',
                label6: 'The Symposium field is required',
                label7: 'Select an option',
                label8: 'Participant Details',
                label9: 'Password Policy.',
                label10: 'The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%&*). The allowed length is 8 to 15 characters.',
                label11: 'ID Type *',
                label12: 'ID Card',
                label13: 'Passport',
                label14: 'R.U.C',
                label15: 'Others',
                label16: 'ID Number *',
                label17: 'The ID Number field is required',
                label18: 'Full Name *',
                label19: 'The Full Name field is required',
                label20: 'Phone Number *',
                label21: 'The entered phone number is not valid',
                label22: 'The Phone Number field is required',
                label23: 'Email *',
                label24: 'The Email field is required',
                label25: 'Age *',
                label26: 'The Age field is required',
                label27: 'Gender *',
                label28: 'The Gender field is required',
                label29: 'Male',
                label30: 'Female',
                label31: 'Country *',
                label32: 'City *',
                label33: 'Institution *',
                label34: 'The Institution field is required',
                label35: 'Specialty *',
                label36: 'The Specialty field is required',
                label37: 'Profession *',
                label38: 'The Profession field is required',
                label39: 'Password *',
                label40: 'The Password field is required',
                label41: 'Confirm Password *',
                label42: 'The Confirm Password field is required',
                label43: 'Register',
                label44: 'Cancel',
                label45: 'Registration Type field is required',
                label46: 'Country field is required',
                label47: 'City field is required',
            	label48: 'Important.', 
                label49: 'The names entered will be used for the issuance of the certificate. Please check the details carefully before proceeding.',
            },
        },
        pt: {
            pcTipoInc: {
                required: 'O campo Tipo de Inscrição é obrigatório',
            },
            pcSimposio: {
                required: 'O campo Simposio é obrigatório',
            },
            pcTipoID: {
                required: 'O campo Tipo ID é obrigatório',
            },
            pcNumeroID: {
                max: 'Comprimento máximo de caracteres é 30',
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
                min: 'A idade mínima para inscrição é 17',
                max: 'A idade máxima para inscrição é 100',
                required: 'O campo Idade é obrigatório',
            },
            pcGenero: {
                required: 'O campo Género é obrigatório',
            },
            pcPais: {
                required: 'O campo País é obrigatório',
            },
            pcCiudad: {
                required: 'O campo Cidade é obrigatório',
            },
            pcInstitc: {
                min: 'Comprimento mínimo de caracteres é 3',
                max: 'Comprimento máximo de caracteres é 100',
                required: 'O campo Instituição é obrigatório',
                matches: 'O campo Instituição está em um formato inválido',
            },
            pcEspecld: {
                min: 'Comprimento mínimo de caracteres é 3',
                max: 'Comprimento máximo de caracteres é 100',
                required: 'O campo Especialidade é obrigatório',
                matches: 'O campo Especialidade está em um formato inválido',
            },
            pcProfs: {
                min: 'Comprimento mínimo de caracteres é 3',
                max: 'Comprimento máximo de caracteres é 100',
                required: 'O campo Profissão é obrigatório',
                matches: 'O campo Profissão está em um formato inválido',
            },
            pcContrs: {
                required: 'A senha é obrigatória',
                min: 'Comprimento mínimo de caracteres é 8',
                max: 'Comprimento máximo de caracteres é 15',
                matches: 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial(!@#$%&*)',
            },
            pcContrs2: {
                required: 'A senha é obrigatória',
                oneOf: 'As senhas não coincidem',
            },
            valdPhoneNumb: {
                message1: 'O número de telefone inserido não é válido',
                message2: 'O campo de número de telefone é obrigatório',
                message3: 'O país do telefone deve ser o mesmo que o país de origem',
            },
            valdDNI: {
                message1: 'O número de identificação não possui um comprimento válido',
                message2: 'O número de identificação inserido não é válido',
                message3: 'O formato do número de identificação não é válido',
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
                TIDNVD: 'O campo Tipo ID é obrigatório',
                IDTNVD: 'O campo Número ID é obrigatório',
                NMBNVD: 'O campo Nome completo é obrigatório',
                ANINVD: 'O campo Idade é obrigatório',
                EDADFL: 'A idade inserida não é permitida',
                SEXNVD: 'O campo Género é obrigatório',
                TLFNVD: 'O campo de telefone é obrigatório',
                EMLNVD: 'O campo Email é obrigatório',
                ICDNVD: 'O campo Cidade é obrigatório',
                INTNVD: 'O campo Instituição é obrigatório',
                ESPNVD: 'O campo Especialidade é obrigatório',
                PRFNVD: 'O campo Profissão é obrigatório',
                CTRNVD: 'A senha é obrigatória',
                LGCNVD: 'Comprimento mínimo de caracteres é 8',
                ISMNVD: 'O campo Simposio é obrigatório',
                URINVD: 'O campo Tipo de Inscrição é obrigatório',
                INSCRD: 'As inscrições estão encerradas',
                USREXT: 'Os dados do usuário já estão registrados',
                EMLEXT: 'O endereço de e-mail já foi registrado anteriormente',
                ERREXC: 'Ocorreu um erro no registro dos dados',
                ERRCTH: 'Ocorreu um erro interno no processo de registro dos dados',
                REGCFM: 'O processo de inscrição foi concluído com sucesso. Verifique sua caixa de entrada de e-mail',
            },
            labelsForm: {
                label1: 'Dados do Evento',
                label2: 'Tipo de Inscrição *',
                label3: 'Expositor',
                label4: 'Participante',
                label5: 'Simpósio *',
                label6: 'O campo Simpósio é obrigatório',
                label7: 'Selecione uma opção',
                label8: 'Dados do Participante',
                label9: 'Política de Senhas.',
                label10: 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial (!@#$%&*). O comprimento permitido é de 8 a 15 caracteres.',
                label11: 'Tipo de ID *',
                label12: 'Carteira de Identidade',
                label13: 'Passaporte',
                label14: 'R.U.C',
                label15: 'Outros',
                label16: 'Número de ID *',
                label17: 'O campo Número de ID é obrigatório',
                label18: 'Nome Completo *',
                label19: 'O campo Nome Completo é obrigatório',
                label20: 'Telefone *',
                label21: 'O número de telefone inserido não é válido',
                label22: 'O campo Telefone é obrigatório',
                label23: 'Email *',
                label24: 'O campo Email é obrigatório',
                label25: 'Idade *',
                label26: 'O campo Idade é obrigatório',
                label27: 'Gênero *',
                label28: 'O campo Gênero é obrigatório',
                label29: 'Masculino',
                label30: 'Feminino',
                label31: 'País *',
                label32: 'Cidade *',
                label33: 'Instituição *',
                label34: 'O campo Instituição é obrigatório',
                label35: 'Especialidade *',
                label36: 'O campo Especialidade é obrigatório',
                label37: 'Profissão *',
                label38: 'O campo Profissão é obrigatório',
                label39: 'Senha *',
                label40: 'O campo Senha é obrigatório',
                label41: 'Confirmar Senha *',
                label42: 'O campo Confirmar Senha é obrigatório',
                label43: 'Registrar',
                label44: 'Cancelar',
                label45: 'O campo Tipo de registro é obrigatório',
                label46: 'O campo País é obrigatório',
                label47: 'O campo Cidade é obrigatório',
            	label48: 'Importante.', 
                label49: 'Os nomes inseridos serão utilizados para a emissão do certificado. Verifique cuidadosamente os dados antes de continuar.',
            },
        },
    };

    const messages = {
        TIDNVD: validationMessages[language].otherMessages.TIDNVD,
        IDTNVD: validationMessages[language].otherMessages.IDTNVD,
        NMBNVD: validationMessages[language].otherMessages.NMBNVD,
        ANINVD: validationMessages[language].otherMessages.ANINVD,
        EDADFL: validationMessages[language].otherMessages.EDADFL,
        SEXNVD: validationMessages[language].otherMessages.SEXNVD,
        TLFNVD: validationMessages[language].otherMessages.TLFNVD,
        EMLNVD: validationMessages[language].otherMessages.EMLNVD,
        ICDNVD: validationMessages[language].otherMessages.ICDNVD,
        INTNVD: validationMessages[language].otherMessages.INTNVD,
        ESPNVD: validationMessages[language].otherMessages.ESPNVD,
        PRFNVD: validationMessages[language].otherMessages.PRFNVD,
        CTRNVD: validationMessages[language].otherMessages.CTRNVD,
        LGCNVD: validationMessages[language].otherMessages.LGCNVD,
        ISMNVD: validationMessages[language].otherMessages.ISMNVD,
        URINVD: validationMessages[language].otherMessages.URINVD,
        INSCRD: validationMessages[language].otherMessages.INSCRD,
        USREXT: validationMessages[language].otherMessages.USREXT,
        EMLEXT: validationMessages[language].otherMessages.EMLEXT,
        ERREXC: validationMessages[language].otherMessages.ERREXC,
        ERRCTH: validationMessages[language].otherMessages.ERRCTH,
        REGCFM: validationMessages[language].otherMessages.REGCFM,
    };

    /*const validationSchema = Yup.object().shape({
        pcTipoInc: Yup.string().required(
            language === 'es'
                ? 'El campo Tipo de Inscripción es requerido'
                : language === 'en'
                    ? 'The field Tipo de Inscripción is required'
                    : 'O campo Tipo de Inscrição é obrigatório'
        ),
        pcSimposio: Yup.string().required(
            language === 'es'
                ? 'El campo Simposio es requerido'
                : language === 'en'
                    ? 'The field Simposio is required'
                    : 'O campo Simposio é obrigatório'
        ),
        pcTipoID: Yup.string().required(
            language === 'es'
                ? 'El campo Tipo ID es requerido'
                : language === 'en'
                    ? 'The field Tipo ID is required'
                    : 'O campo Tipo ID é obrigatório'
        ),
        pcNumeroID: Yup.string()
            .max(
                30,
                language === 'es'
                    ? 'La longitud máxima de carácteres es 30'
                    : language === 'en'
                        ? 'Maximum character length is 30'
                        : 'Comprimento máximo de caracteres é 30'
            )
            .required(
                language === 'es'
                    ? 'El campo Número ID es requerido'
                    : language === 'en'
                        ? 'The field Número ID is required'
                        : 'O campo Número ID é obrigatório'
            ),
        pcNombreComp: Yup.string()
            .min(
                5,
                language === 'es'
                    ? 'La longitud mínima de carácteres es 5'
                    : language === 'en'
                        ? 'Minimum character length is 5'
                        : 'Comprimento mínimo de caracteres é 5'
            )
            .max(
                195,
                language === 'es'
                    ? 'La longitud máxima de carácteres es 195'
                    : language === 'en'
                        ? 'Maximum character length is 195'
                        : 'Comprimento máximo de caracteres é 195'
            )
            .required(
                language === 'es'
                    ? 'El campo Nombre completo es requerido'
                    : language === 'en'
                        ? 'The field Nombre completo is required'
                        : 'O campo Nome completo é obrigatório'
            )
            .matches(
                /^[A-Za-zÁÉÍÑÓÚáé íñóú]*$/,
                language === 'es'
                    ? 'El campo Nombre completo no tiene un formato válido'
                    : language === 'en'
                        ? 'The field Nombre completo is in an invalid format'
                        : 'O campo Nome completo não está em um formato válido'
            ),
        pcEmail: Yup.string()
            .min(
                5,
                language === 'es'
                    ? 'La longitud mínima de carácteres es 5'
                    : language === 'en'
                        ? 'Minimum character length is 5'
                        : 'Comprimento mínimo de caracteres é 5'
            )
            .max(
                50,
                language === 'es'
                    ? 'La longitud máxima de carácteres es 50'
                    : language === 'en'
                        ? 'Maximum character length is 50'
                        : 'Comprimento máximo de caracteres é 50'
            )
            .required(
                language === 'es'
                    ? 'El campo Email es requerido'
                    : language === 'en'
                        ? 'The field Email is required'
                        : 'O campo Email é obrigatório'
            )
            .email(
                language === 'es'
                    ? 'El correo electrónico ingresado no es válido'
                    : language === 'en'
                        ? 'Invalid email address'
                        : 'O endereço de e-mail inserido não é válido'
            ),
        pcEdad: Yup.number()
            .typeError(
                language === 'es'
                    ? 'Debe ingresar un número'
                    : language === 'en'
                        ? 'Please enter a valid number'
                        : 'Por favor, insira um número válido'
            )
            .min(
                17,
                language === 'es'
                    ? 'La edad mínima de inscripción es 17'
                    : language === 'en'
                        ? 'Minimum registration age is 17'
                        : 'A idade mínima de inscrição é 17'
            )
            .max(
                100,
                language === 'es'
                    ? 'La edad límite de inscripción es 100'
                    : language === 'en'
                        ? 'Maximum registration age is 100'
                        : 'A idade máxima de inscrição é 100'
            )
            .required(
                language === 'es'
                    ? 'El campo Edad es requerido'
                    : language === 'en'
                        ? 'The field Edad is required'
                        : 'O campo Idade é obrigatório'
            ),
        pcGenero: Yup.string().required(
            language === 'es'
                ? 'El campo Género es requerido'
                : language === 'en'
                    ? 'The field Género is required'
                    : 'O campo Género é obrigatório'
        ),
        pcPais: Yup.string().required(
            language === 'es'
                ? 'El campo País es requerido'
                : language === 'en'
                    ? 'The field País is required'
                    : 'O campo País é obrigatório'
        ),
        pcCiudad: Yup.string().required(
            language === 'es'
                ? 'El campo Ciudad es requerido'
                : language === 'en'
                    ? 'The field Ciudad is required'
                    : 'O campo Cidade é obrigatório'
        ),
        pcInstitc: Yup.string()
            .min(
                3,
                language === 'es'
                    ? 'La longitud mínima de carácteres es 3'
                    : language === 'en'
                        ? 'Minimum character length is 3'
                        : 'Comprimento mínimo de caracteres é 3'
            )
            .max(
                100,
                language === 'es'
                    ? 'La longitud máxima de carácteres es 100'
                    : language === 'en'
                        ? 'Maximum character length is 100'
                        : 'Comprimento máximo de caracteres é 100'
            )
            .required(
                language === 'es'
                    ? 'El campo Institución es requerido'
                    : language === 'en'
                        ? 'The field Institución is required'
                        : 'O campo Instituição é obrigatório'
            )
            .matches(
                /^[A-Za-z0-9ÁÉÍÑÓÚáé íñóú]*$/,
                language === 'es'
                    ? 'El campo Institución no tiene un formato válido'
                    : language === 'en'
                        ? 'The field Institución is in an invalid format'
                        : 'O campo Instituição não está em um formato válido'
            ),
        pcEspecld: Yup.string()
            .min(
                3,
                language === 'es'
                    ? 'La longitud mínima de carácteres es 3'
                    : language === 'en'
                        ? 'Minimum character length is 3'
                        : 'Comprimento mínimo de caracteres é 3'
            )
            .max(
                100,
                language === 'es'
                    ? 'La longitud máxima de carácteres es 100'
                    : language === 'en'
                        ? 'Maximum character length is 100'
                        : 'Comprimento máximo de caracteres é 100'
            )
            .required(
                language === 'es'
                    ? 'El campo Especialidad es requerido'
                    : language === 'en'
                        ? 'The field Especialidad is required'
                        : 'O campo Especialidade é obrigatório'
            )
            .matches(
                /^[A-Za-zÁÉÍÑÓÚáé íñóú]*$/,
                language === 'es'
                    ? 'El campo Especialidad no tiene un formato válido'
                    : language === 'en'
                        ? 'The field Especialidad is in an invalid format'
                        : 'O campo Especialidade não está em um formato válido'
            ),
        pcProfs: Yup.string()
            .min(
                3,
                language === 'es'
                    ? 'La longitud mínima de carácteres es 3'
                    : language === 'en'
                        ? 'Minimum character length is 3'
                        : 'Comprimento mínimo de caracteres é 3'
            )
            .max(
                100,
                language === 'es'
                    ? 'La longitud máxima de carácteres es 100'
                    : language === 'en'
                        ? 'Maximum character length is 100'
                        : 'Comprimento máximo de caracteres é 100'
            )
            .required(
                language === 'es'
                    ? 'El campo Profesión es requerido'
                    : language === 'en'
                        ? 'The field Profesión is required'
                        : 'O campo Profissão é obrigatório'
            )
            .matches(
                /^[A-Za-zÁÉÍÑÓÚáé íñóú]*$/,
                language === 'es'
                    ? 'El campo Profesión no tiene un formato válido'
                    : language === 'en'
                        ? 'The field Profesión is in an invalid format'
                        : 'O campo Profissão não está em um formato válido'
            ),
        pcContrs: Yup.string()
            .required(
                language === 'es'
                    ? 'La contraseña es requerida'
                    : language === 'en'
                        ? 'The password is required'
                        : 'A senha é obrigatória'
            )
            .min(
                8,
                language === 'es'
                    ? 'La longitud mínima de carácteres es 8'
                    : language === 'en'
                        ? 'Minimum character length is 8'
                        : 'Comprimento mínimo de caracteres é 8'
            )
            .max(
                15,
                language === 'es'
                    ? 'La longitud máxima de carácteres es 15'
                    : language === 'en'
                        ? 'Maximum character length is 15'
                        : 'Comprimento máximo de caracteres é 15'
            )
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})/,
                language === 'es'
                    ? 'La contraseña debe contener mínimo una mayúscula, una minúscula, un número y un carácter especial(!@#$%&*)'
                    : language === 'en'
                        ? 'The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character(!@#$%&*)'
                        : 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial(!@#$%&*)'
            ),
        pcContrs2: Yup.string()
            .required(
                language === 'es'
                    ? 'La contraseña es requerida'
                    : language === 'en'
                        ? 'The password is required'
                        : 'A senha é obrigatória'
            )
            .oneOf([Yup.ref('pcContrs')],
                language === 'es'
                    ? 'Las contraseñas no coinciden'
                    : language === 'en'
                        ? 'Passwords do not match'
                        : 'As senhas não coincidem'
            ),
    });*/

    const validationSchema = Yup.object().shape({
        pcTipoInc: Yup.string().required(validationMessages[language].pcTipoInc.required),
        pcSimposio: Yup.string().required(validationMessages[language].pcSimposio.required),
        pcTipoID: Yup.string().required(validationMessages[language].pcTipoID.required),
        pcNumeroID: Yup.string()
            .max(30, validationMessages[language].pcNumeroID.max)
            .required(validationMessages[language].pcNumeroID.required),
        pcNombreComp: Yup.string()
            .min(5, validationMessages[language].pcNombreComp.min)
            .max(195, validationMessages[language].pcNombreComp.max)
            .required(validationMessages[language].pcNombreComp.required)
            .matches(/^[A-Za-zÁÉÍÑÓÚáé íñóú]*$/, validationMessages[language].pcNombreComp.matches),
        pcEmail: Yup.string()
            .min(5, validationMessages[language].pcEmail.min)
            .max(50, validationMessages[language].pcEmail.max)
            .required(validationMessages[language].pcEmail.required)
            .email(validationMessages[language].pcEmail.email),
        pcEdad: Yup.number()
            .typeError(validationMessages[language].pcEdad.typeError)
            .min(17, validationMessages[language].pcEdad.min)
            .max(100, validationMessages[language].pcEdad.max)
            .required(validationMessages[language].pcEdad.required),
        pcGenero: Yup.string().required(validationMessages[language].pcGenero.required),
        pcPais: Yup.string().required(validationMessages[language].pcPais.required),
        pcCiudad: Yup.string().required(validationMessages[language].pcCiudad.required),
        pcInstitc: Yup.string()
            .min(3, validationMessages[language].pcInstitc.min)
            .max(100, validationMessages[language].pcInstitc.max)
            .required(validationMessages[language].pcInstitc.required)
            .matches(/^[A-Za-z0-9ÁÉÍÑÓÚáé íñóú]*$/, validationMessages[language].pcInstitc.matches),
        pcEspecld: Yup.string()
            .min(3, validationMessages[language].pcEspecld.min)
            .max(100, validationMessages[language].pcEspecld.max)
            .required(validationMessages[language].pcEspecld.required)
            .matches(/^[A-Za-zÁÉÍÑÓÚáé íñóú]*$/, validationMessages[language].pcEspecld.matches),
        pcProfs: Yup.string()
            .min(3, validationMessages[language].pcProfs.min)
            .max(100, validationMessages[language].pcProfs.max)
            .required(validationMessages[language].pcProfs.required)
            .matches(/^[A-Za-zÁÉÍÑÓÚáé íñóú]*$/, validationMessages[language].pcProfs.matches),
        pcContrs: Yup.string()
            .required(validationMessages[language].pcContrs.required)
            .min(8, validationMessages[language].pcContrs.min)
            .max(15, validationMessages[language].pcContrs.max)
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})/,
                validationMessages[language].pcContrs.matches
            ),
        pcContrs2: Yup.string()
            .required(validationMessages[language].pcContrs2.required)
            .oneOf([Yup.ref('pcContrs')], validationMessages[language].pcContrs2.oneOf),
    });


    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, reset, formState: { errors }, clearErrors } = useForm(formOptions);
    const onError = (errors, e) => console.log(errors, e);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mesgForm, setMesgForm] = useState("");
    const [tpmsgForm, setTpmsgForm] = useState(0);

    useEffect(() => {
        eventOnChangeCountry(country);
    }, [countryPhn, country]);

    function eventOnChangeCountry(code_ctry) {
        setCountry(code_ctry);
        setCountryPh(code_ctry);
        getListCitiesForCountry(code_ctry);
        document.getElementById("slct-ciudad").selectedIndex = 0;
    }

    function eventOnChangeCountryPhone(code) {
        setCountryPh(code);
        setCountry(code);
        getListCitiesForCountry(code);
        document.getElementById("slct-ciudad").selectedIndex = 0;
    }

    async function getListCitiesForCountry(code) {
        var dataLst = [];
        if (code !== "") {
            setCountry(code);
            dataLst = await make_get_request_ws(`${WS_LIST_CITIES_BY_COUNTRY}${code}`);
            setListCities((dataLst.data !== null && dataLst.data !== "") ? dataLst.data : []);
        } else {
            setCountry("");
            setListCities([]);
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
        const regSpcl = /[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]+/;
        var message = '', tipomes = 0, estdVald = false;

        setIsSubmitting(true);
        setMesgForm(phoneNumber ? (isValidPhoneNumber(phoneNumber) ? '' : validationMessages[language].valdPhoneNumb.message1) : validationMessages[language].valdPhoneNumb.message2);
        if (phoneNumber ? (isValidPhoneNumber(phoneNumber) ? true : false) : false) {
            if (countryPhn === country.trim()) {

                switch (data.pcTipoID) {
                    case "C":
                        if (country === "EC") {
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
                        } else {
                            estdVald = false;
                            setMesgForm(validationMessages[language].valdDNI.message4);
                        }
                        break;
                    case "P":
                        if (lstCtriesPassport.includes(country.trim())) {
                            if (!validator.isPassportNumber(data.pcNumeroID.trim(), country.trim())) {
                                setMesgForm(validationMessages[language].valdDNI.message5);
                                estdVald = false;
                            } else {
                                setMesgForm("");
                                estdVald = true;
                            }
                        } else {
                            if (!regSpcl.test(data.pcNumeroID.trim())) {
                                setMesgForm("");
                                estdVald = true;
                            } else {
                                setMesgForm(validationMessages[language].valdDNI.message6);
                                estdVald = false;
                            }
                        }
                        break;
                    case "R":
                        if (country === "EC") {
                            setMesgForm("");
                            estdVald = true;
                        } else {
                            estdVald = false;
                            setMesgForm(validationMessages[language].valdDNI.message7);
                        }
                        break;
                    case "O":
                        if (!regSpcl.test(data.pcNumeroID.trim())) {
                            setMesgForm("");
                            estdVald = true;
                        } else {
                            setMesgForm(validationMessages[language].valdDNI.message8);
                            estdVald = false;
                        }
                        break;
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
                                                axios.post(WS_REGISTER_USER_EVENT, {
                                                    usTipoId: data.pcTipoID,
                                                    usIdentificacion: data.pcNumeroID,
                                                    usNombres: data.pcNombreComp,
                                                    usEdad: data.pcEdad,
                                                    usSexo: data.pcGenero,
                                                    usTelefono: phoneNumber.replace('+', ''),
                                                    usEmail: data.pcEmail,
                                                    usCiudad: data.pcCiudad,
                                                    usInstitucion: data.pcInstitc,
                                                    usEspecialidad: data.pcEspecld,
                                                    usProfesion: data.pcProfs,
                                                    usClave: data.pcContrs,
                                                    usSimposio: data.pcSimposio,
                                                    usCodRol: data.pcTipoInc,
                                                }).then(function (response) {
                                                    /*switch (response.data) {
                                                        case "TIDNVD":
                                                            message = 'El campo Tipo ID es requerido';
                                                            tipomes = 1;
                                                            break;
                                                        case "IDTNVD":
                                                            message = 'El campo Número ID es requerido';
                                                            tipomes = 1;
                                                            break;
                                                        case "NMBNVD":
                                                            message = 'El campo Nombre completo es requerido';
                                                            tipomes = 1;
                                                            break;
                                                        case "ANINVD":
                                                            message = 'El campo Edad es requerido';
                                                            tipomes = 1;
                                                            break;
                                                        case "EDADFL":
                                                            message = 'La edad ingresada no es permitida';
                                                            tipomes = 1;
                                                            break;
                                                        case "SEXNVD":
                                                            message = 'El campo Género es requerido';
                                                            tipomes = 1;
                                                            break;
                                                        case "TLFNVD":
                                                            message = 'El campo teléfono es requerido';
                                                            tipomes = 1;
                                                            break;
                                                        case "EMLNVD":
                                                            message = 'El campo Email es requerido';
                                                            tipomes = 1;
                                                            break;
                                                        case "ICDNVD":
                                                            message = 'El campo Ciudad es requerido';
                                                            tipomes = 1;
                                                            break;
                                                        case "INTNVD":
                                                            message = 'El campo Institución es requerido';
                                                            tipomes = 1;
                                                            break;
                                                        case "ESPNVD":
                                                            message = 'El campo Especialidad es requerido';
                                                            tipomes = 1;
                                                            break;
                                                        case "PRFNVD":
                                                            message = 'El campo Profesión es requerido';
                                                            tipomes = 1;
                                                            break;
                                                        case "CTRNVD":
                                                            message = 'La contraseña es requerida';
                                                            tipomes = 1;
                                                            break;
                                                        case "LGCNVD":
                                                            message = 'La longitud mínima de carácteres es 8';
                                                            tipomes = 1;
                                                            break;
                                                        case "ISMNVD":
                                                            message = 'El campo Simposio es requerido';
                                                            tipomes = 1;
                                                            break;
                                                        case "URINVD":
                                                            message = 'El campo Tipo de Inscripción es requerido';
                                                            tipomes = 1;
                                                            break;
                                                        case "INSCRD":
                                                            message = 'Las inscripciones se encuentran cerradas';
                                                            tipomes = 1;
                                                            break;
                                                        case "USREXT":
                                                            message = 'Los datos del usuario ya se encuentran registrados';
                                                            tipomes = 1;
                                                            break;
                                                        case "EMLEXT":
                                                            message = 'El correo electrónico ya fue registrado anteriormente';
                                                            tipomes = 1;
                                                            break;
                                                        case "ERREXC":
                                                            message = "Ocurrió un error en el registro de los datos"
                                                            tipomes = 1;
                                                            break;
                                                        case "ERRCTH":
                                                            message = "Ocurrió un error interno en el proceso de registro de los datos"
                                                            tipomes = 1;
                                                            break;
                                                        case "REGCFM":
                                                            message = 'El proceso de inscripción se ha llevado a cabo con éxito. Revise el buzón de entrada de su correo electrónico';
                                                            tipomes = 2;
                                                            setPhoneNumber("");
                                                            setCountry("EC");
                                                            setCountryPh("EC");
                                                            clearErrors();
                                                            reset();
                                                            break;
                                                    }*/

                                                    /*switch (response.data) {
                                                        case "TIDNVD":
                                                            message = validationMessages[language].otherMessages.TIDNVD;
                                                            tipomes = 1;
                                                            break;
                                                        case "IDTNVD":
                                                            message = validationMessages[language].otherMessages.IDTNVD;
                                                            tipomes = 1;
                                                            break;
                                                        case "NMBNVD":
                                                            message = validationMessages[language].otherMessages.NMBNVD;
                                                            tipomes = 1;
                                                            break;
                                                        case "ANINVD":
                                                            message = validationMessages[language].otherMessages.ANINVD;
                                                            tipomes = 1;
                                                            break;
                                                        case "EDADFL":
                                                            message = validationMessages[language].otherMessages.EDADFL;
                                                            tipomes = 1;
                                                            break;
                                                        case "SEXNVD":
                                                            message = validationMessages[language].otherMessages.SEXNVD;
                                                            tipomes = 1;
                                                            break;
                                                        case "TLFNVD":
                                                            message = validationMessages[language].otherMessages.TLFNVD;
                                                            tipomes = 1;
                                                            break;
                                                        case "EMLNVD":
                                                            message = validationMessages[language].otherMessages.EMLNVD;
                                                            tipomes = 1;
                                                            break;
                                                        case "ICDNVD":
                                                            message = validationMessages[language].otherMessages.ICDNVD;
                                                            tipomes = 1;
                                                            break;
                                                        case "INTNVD":
                                                            message = validationMessages[language].otherMessages.INTNVD;
                                                            tipomes = 1;
                                                            break;
                                                        case "ESPNVD":
                                                            message = validationMessages[language].otherMessages.ESPNVD;
                                                            tipomes = 1;
                                                            break;
                                                        case "PRFNVD":
                                                            message = validationMessages[language].otherMessages.PRFNVD;
                                                            tipomes = 1;
                                                            break;
                                                        case "CTRNVD":
                                                            message = validationMessages[language].otherMessages.CTRNVD;
                                                            tipomes = 1;
                                                            break;
                                                        case "LGCNVD":
                                                            message = validationMessages[language].otherMessages.LGCNVD;
                                                            tipomes = 1;
                                                            break;
                                                        case "ISMNVD":
                                                            message = validationMessages[language].otherMessages.ISMNVD;
                                                            tipomes = 1;
                                                            break;
                                                        case "URINVD":
                                                            message = validationMessages[language].otherMessages.URINVD;
                                                            tipomes = 1;
                                                            break;
                                                        case "INSCRD":
                                                            message = validationMessages[language].otherMessages.INSCRD;
                                                            tipomes = 1;
                                                            break;
                                                        case "USREXT":
                                                            message = validationMessages[language].otherMessages.USREXT;
                                                            tipomes = 1;
                                                            break;
                                                        case "EMLEXT":
                                                            message = validationMessages[language].otherMessages.EMLEXT;
                                                            tipomes = 1;
                                                            break;
                                                        case "ERREXC":
                                                            message = validationMessages[language].otherMessages.ERREXC;
                                                            tipomes = 1;
                                                            break;
                                                        case "ERRCTH":
                                                            message = validationMessages[language].otherMessages.ERRCTH;
                                                            tipomes = 1;
                                                            break;
                                                        case "REGCFM":
                                                            message = validationMessages[language].otherMessages.REGCFM;
                                                            tipomes = 2;
                                                            setPhoneNumber("");
                                                            setCountry("EC");
                                                            setCountryPh("EC");
                                                            clearErrors();
                                                            reset();
                                                            break;
                                                    }*/

                                                    let message = messages[response.data];
                                                    let tipomes = 1;

                                                    if (!message) {
                                                        message = '';
                                                    }

                                                    if (response.data === "REGCFM") {
                                                        tipomes = 2;
                                                        setPhoneNumber("");
                                                        setCountry("EC");
                                                        setCountryPh("EC");
                                                        clearErrors();
                                                        reset();
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
                setMesgForm(validationMessages[language].valdPhoneNumb.message3);
                setTpmsgForm(1);
                setIsSubmitting(false);
            }
        } else {
            setTpmsgForm(1);
            setIsSubmitting(false);
        }

        return false;
    }

    const onResetClick = () => {
        clearErrors();
        setPhoneNumber("");
        setCountry("EC");
        setCountryPh("EC");
        reset();
        setMesgForm("");
        setTpmsgForm(0);
        setIsSubmitting(false);
    }

    return (<>
        <div className="row">
            <div className="card-form" ref={formInscriptions}>
                <form className="form-card" id="form-event" onSubmit={handleSubmit(onSubmit, onError)}>

                    <div className="card pnl-information-symp mt-2">
                        <div className="card-header pnl-hdr-symp">
                            {validationMessages[language].labelsForm.label1}
                        </div>
                        <div className="card-body pnl-bdy-symp">
                            <div className="row justify-content-between text-left">
                                <div className="form-group col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 flex-column d-flex">
                                    <label className="form-control-label px-3" htmlFor="slct-tipinsc">{validationMessages[language].labelsForm.label2}</label>
                                    <select name="pcTipoInc" {...register('pcTipoInc')} className={`form-select form-select-lg ${errors.pcTipoInc ? 'is-invalid' : ''}`}
                                        id="slct-tipinsc" data-error={validationMessages[language].labelsForm.label45}>
                                    	{/*<option value="E">{validationMessages[language].labelsForm.label3}</option>*/}
                                        <option value="P">{validationMessages[language].labelsForm.label4}</option>
                                    </select>
                                    <div className="invalid-feedback">{errors.pcTipoInc?.message}</div>
                                </div>
                                <div className="form-group col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8 col-xxl-8 flex-column d-flex">
                                    <label className="form-control-label px-3" htmlFor="slct-simposio">{validationMessages[language].labelsForm.label5}</label>
                                    <select name="pcSimposio" {...register('pcSimposio')} className={`form-select form-select-lg ${errors.pcSimposio ? 'is-invalid' : ''}`}
                                        id="slct-simposio" data-error={validationMessages[language].labelsForm.label6}>
                                        {
                                            (dataSymps !== "" && dataSymps !== null) ? (<>
                                                <option key={dataSymps.length} value="" >{validationMessages[language].labelsForm.label7}</option>
                                                {
                                                    dataSymps.map(
                                                        (symp, index) => {
                                                            return (<option key={index} value={symp.spCodigo}>{symp.spNombre.trim()}</option>);
                                                        }
                                                    )
                                                }
                                            </>) : (
                                                <option value="" >{validationMessages[language].labelsForm.label7}</option>
                                            )
                                        }
                                    </select>
                                    <div className="invalid-feedback">{errors.pcSimposio?.message}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card pnl-information-symp mt-2">
                        <div className="card-header pnl-hdr-symp">
                            {validationMessages[language].labelsForm.label8}
                        </div>
                        <div className="card-body pnl-bdy-symp">
                            <div className="row justify-content-between text-left">
                                <div className="form-group col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 flex-column d-flex">
                                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                        <strong>{validationMessages[language].labelsForm.label9}</strong> {validationMessages[language].labelsForm.label10}<br/>
                                        <strong>{validationMessages[language].labelsForm.label48}</strong> {validationMessages[language].labelsForm.label49}
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-between text-left">
                                <div className="form-group col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2 col-xxl-2 flex-column d-flex">
                                    <label className="form-control-label px-3" htmlFor="slct-tipoid">{validationMessages[language].labelsForm.label11}</label>
                                    <select name="pcTipoID" {...register('pcTipoID')} className={`form-select form-select-lg ${errors.pcTipoID ? 'is-invalid' : ''}`}
                                        id="slct-tipoid" data-error="El campo Tipo ID es requerido">
                                        <option value="">{validationMessages[language].labelsForm.label7}</option>
                                        <option value="C">{validationMessages[language].labelsForm.label12}</option>
                                        <option value="P">{validationMessages[language].labelsForm.label13}</option>
                                        <option value="R">{validationMessages[language].labelsForm.label14}</option>
                                        <option value="O">{validationMessages[language].labelsForm.label15}</option>
                                    </select>
                                    <div className="invalid-feedback">{errors.pcTipoID?.message}</div>
                                </div>
                                <div className="form-group col-12 col-sm-12 col-md-6 col-lg-3 col-xl-2 col-xxl-2 flex-column d-flex">
                                    <label className="form-control-label px-3" htmlFor="txt-numid">{validationMessages[language].labelsForm.label16}</label>
                                    <input type="text" id="txt-numid" className={`form-control ${errors.pcNumeroID ? 'is-invalid' : ''}`} maxLength={30} name="pcNumeroID" {...register('pcNumeroID')} data-error={validationMessages[language].labelsForm.label17} />
                                    <div className="invalid-feedback">{errors.pcNumeroID?.message}</div>
                                </div>
                                <div className="form-group col-12 col-sm-12 col-md-7 col-lg-4 col-xl-5 col-xxl-5 flex-column d-flex">
                                    <label className="form-control-label px-3" htmlFor="txt-nmbcomp">{validationMessages[language].labelsForm.label18}</label>
                                    <input type="text" id="txt-nmbcomp" maxLength={100} className={`form-control ${errors.pcNombreComp ? 'is-invalid' : ''}`} name="pcNombreComp" {...register('pcNombreComp')} data-error={validationMessages[language].labelsForm.label19} />
                                    <div className="invalid-feedback">{errors.pcNombreComp?.message}</div>
                                </div>
                                <div className="form-group col-12 col-sm-12 col-md-5 col-lg-3 col-xl-3 col-xxl-3 flex-column d-flex">
                                    <label className="form-control-label px-3" htmlFor="txt-telefono">{validationMessages[language].labelsForm.label20}</label>
                                    <PhoneInput
                                        placeholder=""
                                        name="pcTelefono"
                                        {...register('pcTelefono')}
                                        id="txt-telefono"
                                        value={phoneNumber}
                                        onChange={setPhoneNumber}
                                        defaultCountry="EC"
                                        onCountryChange={(v) => eventOnChangeCountryPhone(v)}
                                        error={phoneNumber ? (isValidPhoneNumber(phoneNumber) ? undefined : validationMessages[language].labelsForm.label21) : validationMessages[language].labelsForm.label22} />
                                    <div className="invalid-feedback">{errors.pcTelefono?.message}</div>
                                </div>
                            </div>
                            <div className="row justify-content-between text-left">
                                <div className="form-group col-12 col-sm-12 col-md-7 col-lg-4 col-xl-4 col-xxl-4 flex-column d-flex">
                                    <label className="form-control-label px-3" htmlFor="txt-email">{validationMessages[language].labelsForm.label23}</label>
                                    <input type="text" id="txt-email" className={`form-control ${errors.pcEmail ? 'is-invalid' : ''}`} name="pcEmail" {...register('pcEmail')} maxLength={50} data-error={validationMessages[language].labelsForm.label24} />
                                    <div className="invalid-feedback">{errors.pcEmail?.message}</div>
                                </div>
                                <div className="form-group col-12 col-sm-12 col-md-5 col-lg-2 col-xl-2 col-xxl-2 flex-column d-flex">
                                    <label className="form-control-label px-3" htmlFor="txt-edad">{validationMessages[language].labelsForm.label25}</label>
                                    <input type="number" id="txt-edad" min={17} max={100} className={`form-control ${errors.pcEdad ? 'is-invalid' : ''}`} name="pcEdad" {...register('pcEdad')} data-error={validationMessages[language].labelsForm.label26} />
                                    <div className="invalid-feedback">{errors.pcEdad?.message}</div>
                                </div>
                                <div className="form-group col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2 col-xxl-2 flex-column d-flex">
                                    <label className="form-control-label px-3" htmlFor="slct-genero">{validationMessages[language].labelsForm.label27}</label>
                                    <select name="pcGenero" {...register('pcGenero')} className={`form-select form-select-lg ${errors.pcGenero ? 'is-invalid' : ''}`}
                                        id="slct-genero" data-error={validationMessages[language].labelsForm.label7}>
                                        <option value="" >{validationMessages[language].labelsForm.label28}</option>
                                        <option value="H">{validationMessages[language].labelsForm.label29}</option>
                                        <option value="M">{validationMessages[language].labelsForm.label30}</option>
                                        <option value="O">{validationMessages[language].labelsForm.label15}</option>
                                    </select>
                                    <div className="invalid-feedback">{errors.pcGenero?.message}</div>
                                </div>
                                <div className="form-group col-12 col-sm-12 col-md-8 col-lg-4 col-xl-4 col-xxl-4 flex-column d-flex">
                                    <label className="form-control-label px-3" htmlFor="slct-pais">{validationMessages[language].labelsForm.label31}</label>
                                    <select name="pcPais" {...register('pcPais')} className={`form-select form-select-lg ${errors.pcPais ? 'is-invalid' : ''}`}
                                        id="slct-pais" data-error={validationMessages[language].labelsForm.label46} value={country} onChange={e => eventOnChangeCountry(e.target.value)}>
                                        {
                                            (dataCountries !== "" && dataCountries !== null) ? (<>
                                                <option key={dataCountries.length} value="">{validationMessages[language].labelsForm.label7}</option>
                                                {
                                                    dataCountries.map(
                                                        (country, index) => {
                                                            return (<option key={index} value={country.psCodigo.trim()}>{country.psNombre.trim()}</option>);
                                                        }
                                                    )
                                                }
                                            </>) : (
                                                <option value="">{validationMessages[language].labelsForm.label7}</option>
                                            )
                                        }
                                    </select>
                                    <div className="invalid-feedback">{errors.pcPais?.message}</div>
                                </div>
                            </div>
                            <div className="row justify-content-between text-left">
                                <div className="form-group col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 flex-column d-flex">
                                    <label className="form-control-label px-3" htmlFor="slct-ciudad">{validationMessages[language].labelsForm.label32}</label>
                                    <select name="pcCiudad" {...register('pcCiudad')} className={`form-select form-select-lg ${errors.pcCiudad ? 'is-invalid' : ''}`}
                                        id="slct-ciudad" data-error={validationMessages[language].labelsForm.label47}>
                                        <option key={listCities.length} value="">{validationMessages[language].labelsForm.label7}</option>
                                        {
                                            listCities.map(
                                                (city, index) => {
                                                    return (<option key={index} value={city.cdCodigo}>{city.cdCiudad.trim()}</option>);
                                                }
                                            )
                                        }
                                    </select>
                                    <div className="invalid-feedback">{errors.pcCiudad?.message}</div>
                                </div>
                                <div className="form-group col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 flex-column d-flex">
                                    <label className="form-control-label px-3" htmlFor="txt-instc">{validationMessages[language].labelsForm.label33}</label>
                                    <input type="text" id="txt-instc" className={`form-control ${errors.pcInstitc ? 'is-invalid' : ''}`} name="pcInstitc" {...register('pcInstitc')} data-error={validationMessages[language].labelsForm.label34} />
                                    <div className="invalid-feedback">{errors.pcInstitc?.message}</div>
                                </div>
                                <div className="form-group col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 flex-column d-flex">
                                    <label className="form-control-label px-3" htmlFor="txt-especd">{validationMessages[language].labelsForm.label35}</label>
                                    <input type="text" id="txt-especd" className={`form-control ${errors.pcEspecld ? 'is-invalid' : ''}`} name="pcEspecld" {...register('pcEspecld')} data-error={validationMessages[language].labelsForm.label36} />
                                    <div className="invalid-feedback">{errors.pcEspecld?.message}</div>
                                </div>
                            </div>
                            <div className="row justify-content-between text-left">
                                <div className="form-group col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 flex-column d-flex">
                                    <label className="form-control-label px-3" htmlFor="txt-profs">{validationMessages[language].labelsForm.label37}</label>
                                    <input type="text" id="txt-profs" className={`form-control ${errors.pcProfs ? 'is-invalid' : ''}`} name="pcProfs" {...register('pcProfs')} data-error={validationMessages[language].labelsForm.label38} />
                                    <div className="invalid-feedback">{errors.pcProfs?.message}</div>
                                </div>
                                <div className="form-group col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 flex-column d-flex">
                                    <label className="form-control-label px-3" htmlFor="txt-conts">{validationMessages[language].labelsForm.label39}</label>
                                    <input type="password" id="txt-conts" minLength={8} maxLength={15} autoComplete="off" className={`form-control ${errors.pcContrs ? 'is-invalid' : ''}`} name="pcContrs" {...register('pcContrs')} data-error={validationMessages[language].labelsForm.label40} />
                                    <div className="invalid-feedback">{errors.pcContrs?.message}</div>
                                </div>
                                <div className="form-group col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 flex-column d-flex">
                                    <label className="form-control-label px-3" htmlFor="txt-conts2">{validationMessages[language].labelsForm.label41}</label>
                                    <input type="password" id="txt-conts2" minLength={8} maxLength={15} autoComplete="off" className={`form-control ${errors.pcContrs2 ? 'is-invalid' : ''}`} name="pcContrs2" {...register('pcContrs2')} data-error={validationMessages[language].labelsForm.label42} />
                                    <div className="invalid-feedback">{errors.pcContrs2?.message}</div>
                                </div>
                            </div>
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
                                &nbsp;{validationMessages[language].labelsForm.label43}
                            </button>
                            <button type="button" className="btn-block" disabled={isSubmitting} onClick={onResetClick}><i className="fa fa-ban fa-1x" aria-hidden="true"></i>&nbsp;{validationMessages[language].labelsForm.label44}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>);

}