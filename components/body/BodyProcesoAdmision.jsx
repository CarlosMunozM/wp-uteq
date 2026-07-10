import React from 'react';
import {
    IMAGES_ADMISSION_FOLDER
} from 'config';

export { BodyProcesoAdmision };

function BodyProcesoAdmision(data) {

    return (<>
        <div className="col-md-12">
            <div className="hero-wrap" style={{ backgroundImage: `url(${IMAGES_ADMISSION_FOLDER}portada-seccion-animated.webp)` }}>
                <div className="container-fluid p-0">
                    <div className="row g-0 slider-text align-items-center justify-content-end" data-scrollax-parent="true">
                        <div className="col-md-4 ftco-animate">
                            <h1 className="mb-4">{data.language === "es" ? "Proceso de" : (data.language === "en" ? "Admission" : "Processo de")} <br /><span>{data.language === "es"
                                ? "admisión"
                                : (data.language === "en"
                                    ? "process"
                                    : "admissão")} <i className="fa fa-cogs" aria-hidden="true"></i></span></h1>
                            <a href="#section-information-11" className="down-icon">
                                <i className="fa fa-arrow-down" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <section className="section-information-11" id="section-information-11">
                <div className="container">
                
                    {/*Fases en proceso_ aqui aux*/}
                {/*
                       <div className="row mb-4">
                        <div className="col-12 col-sm-12 col-md-9 col-lg-6">
                            <div className="d-flex flex-column justify-content-center h-100">
                                <h2 className="mb-4">Fase 0. Registro nacional en Senescyt - Segundo periodo 2026</h2>
                                <p className="mb-4">
                                    Es un requisito obligatorio para poder iniciar el proceso de admisión en la UTEQ. Este paso es esencial para acceder a las universidades públicas del Ecuador. No olvides completarlo para dar inicio a tu camino académico.<br /><span>Del 2 al 06 de junio y 9 al 13 de junio de 2026</span>
                                </p>
                            
                           		 <span className="badge-state-phase">La fase esta habilitada</span>
                                <a
                                    href="https://admision.educacion.gob.ec/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Dirigirse a la página web del Registro Nacional"
                                    className="d-flex align-items-center justify-content-center btnPhase"
                                >
                                    Ir al Registro Nacional  <i className="fa fa-arrow-circle-right fa-2x me-3"></i>
                                </a>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-3 col-lg-6 d-flex justify-content-center align-items-center">
                            <div className="ratio ratio-1x1 panel-2-sect-4">
                                <img
                                    src={`${IMAGES_ADMISSION_FOLDER}fase-0-registro-nacional.webp`}
                                    alt="Imagen de la fase 0"
                                    className="img-fluid w-100 h-100"
                                />
                            </div>
                        </div>
                    </div> */}
                {/* fin Fases en proceso*/}
                

                    <div className="row mb-4">
                        <div className="col-12 col-sm-12 col-md-9 col-lg-6">
                            <div className="d-flex flex-column justify-content-center h-100">
                                <h2 className="mb-4">
                                    {data.language === "es"
                                        ? "Fase 0. Registro nacional en MINEDEC"
                                        : (data.language === "en"
                                            ? "Phase 0. National Registration in MINEDEC"
                                            : "Fase 0. Registro nacional no MINEDEC")}
                                </h2>
                                <p className="mb-4">
                                    {data.language === "es"
                                        ? "Es un requisito obligatorio para poder iniciar el proceso de admisión en la UTEQ. Este paso es esencial para acceder a las universidades públicas del Ecuador. No olvides completarlo para dar inicio a tu camino académico."
                                        : (data.language === "en"
                                            ? "It is a mandatory requirement to start the admission process at UTEQ. This step is essential to access public universities in Ecuador. Don't forget to complete it to begin your academic journey."
                                            : "É um requisito obrigatório para iniciar o processo de admissão na UTEQ. Este passo é essencial para acessar as universidades públicas do Equador. Não se esqueça de completá-lo para iniciar sua jornada acadêmica.")}

                                    <br />
                                    <span>
                                        {data.language === "es"
                                            ? "Del 2 al 06 de junio y 9 al 13 de junio de 2026"
                                            : (data.language === "en"
                                                ? "From 2 to 6 June and from 9 to 13 June 2026"
                                                : "De 2 a 6 de junho e de 9 a 13 de junho de 2026")}
                                    </span>
                                </p>
                            	{/*<span className="badge-state-phase">
                                    {data.language === "es"
                                        ? "La fase está en marcha"
                                        : (data.language === "en"
                                            ? "The phase is underway"
                                            : "A fase está em andamento")}
                                </span>*/}
                            	<span className="badge-state-phase">
                                    {data.language === "es"
                                        ? "La fase se encuentra finalizada"
                                        : (data.language === "en"
                                            ? "The phase has been completed"
                                            : "A fase está concluída")}
                                </span>
                                <a
                                    href="https://admision.educacion.gob.ec/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Dirigirse a la página web del Registro Nacional"
                                    className="d-flex align-items-center justify-content-center btnPhase"
                                >
                                    {data.language === "es"
                                        ? "Ir al Registro Nacional"
                                        : (data.language === "en"
                                            ? "Go to the National Registration"
                                            : "Ir para o Registro Nacional")}
                                     <i className="fa fa-arrow-circle-right fa-2x me-3"></i>
                                </a>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-3 col-lg-6 d-flex justify-content-center align-items-center">
                            <div className="ratio ratio-1x1 panel-2-sect-4">
                                <img
                                    src={`${IMAGES_ADMISSION_FOLDER}fase-0-registro-nacional.webp`}
                                    alt="Imagen de la fase 0"
                                    className="img-fluid w-100 h-100"
                                />
                            </div>
                        </div>
                    </div>

                    <br />
                    {/*<div className="row mt-4 mb-4">
                        <div className="col-12 col-sm-12 col-md-3 col-lg-6 d-flex justify-content-center align-items-center">
                            <div className="ratio ratio-1x1 panel-2-sect-4">
                                <img
                                    src={`${IMAGES_ADMISSION_FOLDER}fase-1-registro-nacional.webp`}
                                    alt="Imagen de la fase 1"
                                    className="img-fluid w-100 h-100"
                                />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-9 col-lg-6">
                            <div className="d-flex flex-column justify-content-center h-100">
                                <h2 className="mb-4">Fase 1. Registro de inscripción en la UTEQ</h2>
                                <p className="mb-4">
                                    Para continuar en esta fase, debes haber realizado el Registro Nacional Único de la Senescyt. Deberás realizar lo siguiente:
                                </p>
                                <ul className="mb-1">
                                    <li>Desde el sitio web <a href="https://uteq.edu.ec/es" target="_blank" rel="noopener noreferrer" aria-label="Visitar el sitio web de la UTEQ, página principal">www.uteq.edu.ec</a> en el apartado Admisión, podrás acceder al enlace de inscripción de la UTEQ.</li>
                                    <li>Ingresarás todos los datos generales solicitados.</li>
                                    <li>Seleccionarás una carrera a la que deseas ingresar. La carrera la podrás cambiar después.</li>
                                    <li>Aceptarás las condiciones de inscripción y se notificará a tu correo electrónico personal, el usuario y contraseña provisional para acceso al sistema <a href="https://postulate.uteq.edu.ec/loginpostulacion"
                                        aria-label="Postúlate en la UTEQ, accede a la página de inscripción"
                                        target="_blank"
                                        rel="noopener noreferrer">Postúlate UTEQ</a>.</li>
                                    <li>Ingresarás al sistema <a href="https://postulate.uteq.edu.ec/loginpostulacion"
                                        aria-label="Postúlate en la UTEQ, accede a la página de inscripción"
                                        target="_blank"
                                        rel="noopener noreferrer">Postúlate UTEQ</a> y cambiarás la contraseña, luego deberás completar la información solicitada y podrás generar tu comprobante de inscripción.</li>
                                </ul>
                                <span className="text-date-phase mb-4">Del 09 de enero al 10 de febrero 2025</span>
                                <span className="badge-state-phase">Próximamente comenzará la fase</span>
                                <a
                                    href="https://postulate.uteq.edu.ec/loginpostulacion"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Dirigirse a la plataforma Postúlate UTEQ"
                                    className="d-flex align-items-center justify-content-center btnPhase"
                                >
                                    Accede a Postúlate UTEQ   <i className="fa fa-arrow-circle-right fa-2x me-3"></i>
                                </a>
                            </div>
                        </div>
                    </div>*/}

                    <div className="row mt-4 mb-4">
                        <div className="col-12 col-sm-12 col-md-3 col-lg-6 d-flex justify-content-center align-items-center">
                            <div className="ratio ratio-1x1 panel-2-sect-4">
                                <img
                                    src={`${IMAGES_ADMISSION_FOLDER}fase-1-registro-nacional.webp`}
                                    alt={data.language === "es"
                                        ? "Imagen de la fase 1"
                                        : (data.language === "en"
                                            ? "Image of Phase 1"
                                            : "Imagem da Fase 1")}
                                    className="img-fluid w-100 h-100"
                                />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-9 col-lg-6">
                            <div className="d-flex flex-column justify-content-center h-100">
                                <h2 className="mb-4">
                                    {data.language === "es"
                                        ? "Fase 1. Registro de inscripción en la UTEQ"
                                        : (data.language === "en"
                                            ? "Phase 1. UTEQ Registration"
                                            : "Fase 1. Registro de inscrição na UTEQ")}
                                </h2>
                                <p className="mb-4">
                                    {data.language === "es"
                                        ? "Para continuar en esta fase, debes haber realizado el Registro Nacional Único del MINEDEC. Deberás realizar lo siguiente:"
                                        : (data.language === "en"
                                            ? "To continue in this phase, you must have completed the MINEDEC National Registration. You need to do the following:"
                                            : "Para continuar nesta fase, você deve ter realizado o Registro Nacional Único da MINEDEC. Você deve fazer o seguinte:")}
                                </p>
                                <ul className="mb-1">
                                    <li>
                                        {data.language === "es"
                                            ? "Desde el sitio web "
                                            : (data.language === "en"
                                                ? "From the website "
                                                : "Do site web ")}
                                        <a href={`https://uteq.edu.ec/es"${data.language}`} target="_blank" rel="noopener noreferrer" aria-label={
                                            data.language === "es"
                                                ? "Visitar el sitio web de la UTEQ, página principal"
                                                : (data.language === "en"
                                                    ? "Visit the UTEQ website, homepage"
                                                    : "Visitar o site da UTEQ, página principal")
                                        }>
                                            www.uteq.edu.ec
                                        </a>
                                        {data.language === "es"
                                            ? " en el apartado Admisión, podrás acceder al enlace de inscripción de la UTEQ."
                                            : (data.language === "en"
                                                ? " in the Admission section, you will be able to access the UTEQ registration link."
                                                : " na seção Admissão, você poderá acessar o link de inscrição da UTEQ.")}
                                    </li>
                                    <li>
                                        {data.language === "es"
                                            ? "Ingresarás todos los datos generales solicitados."
                                            : (data.language === "en"
                                                ? "You will enter all the requested general data."
                                                : "Você inserirá todos os dados gerais solicitados.")}
                                    </li>
                                    <li>
                                        {data.language === "es"
                                            ? "Seleccionarás una carrera a la que deseas ingresar. La carrera la podrás cambiar después."
                                            : (data.language === "en"
                                                ? "You will select a career you wish to enter. You can change your career later."
                                                : "Você selecionará um curso para o qual deseja se inscrever. O curso poderá ser alterado posteriormente.")}
                                    </li>
                                    <li>
                                        {data.language === "es"
                                            ? "Aceptarás las condiciones de inscripción y se notificará a tu correo electrónico personal, el usuario y contraseña provisional para acceso al sistema "
                                            : (data.language === "en"
                                                ? "You will accept the registration conditions, and a notification will be sent to your personal email with the provisional username and password to access the system "
                                                : "Você aceitará as condições de inscrição e será notificado por e-mail pessoal com o nome de usuário e senha provisórios para acessar o sistema ")}
                                        <a href="https://postulate.uteq.edu.ec/registroadmision?id=OPPQQRRSSTTUUVVWWXWY" aria-label="Postúlate en la UTEQ, accede a la página de inscripción" target="_blank" rel="noopener noreferrer">
                                            Postúlate UTEQ
                                        </a>.
                                    </li>
                                    <li>
                                        {data.language === "es"
                                            ? "Ingresarás al sistema "
                                            : (data.language === "en"
                                                ? "You will log into the system "
                                                : "Você acessará o sistema ")}
                                        <a href="https://postulate.uteq.edu.ec/registroadmision?id=OPPQQRRSSTTUUVVWWXWY" aria-label="Postúlate en la UTEQ, accede a la página de inscripción" target="_blank" rel="noopener noreferrer">
                                            Postúlate UTEQ
                                        </a>
                                        {data.language === "es"
                                            ? " y cambiarás la contraseña, luego deberás completar la información solicitada y podrás generar tu comprobante de inscripción."
                                            : (data.language === "en"
                                                ? " and change the password, then you must complete the requested information and you will be able to generate your registration proof."
                                                : " e mudará a senha, depois deverá completar as informações solicitadas e gerar o comprovante de inscrição.")}
                                    </li>
                                </ul>
                                {<span className="text-date-phase mb-4">
                                    {data.language === "es"
                                        ? "Del 30 de junio al 20 de julio de 2026"
                                        : (data.language === "en"
                                            ? "From 30 June to 20 July 2026"
                                            : "De 30 de junho a 20 de julho de 2026")}
                                </span>}
                            {/*<span className="badge-state-phase">
                                    {data.language === "es"
                                        ? "La fase se encuentra en proceso"
                                        : (data.language === "en"
                                            ? "The phase is in process"
                                            : "A fase está em andamento")}
                                </span>*/}
                            
                            	{/*<span className="badge-state-phase">
                                    {data.language === "es"
                                        ? "La fase se encuentra finalizada"
                                        : (data.language === "en"
                                            ? "The phase has been completed"
                                            : "A fase está finalizada")}
                                </span>*/}
                            
                            	<span className="badge-state-phase">
                                    {data.language === "es"
                                        ? "La fase iniciará próximamente"
                                        : (data.language === "en"
                                            ? "The phase will begin shortly"
                                            : "A fase terá início em breve")}
                                </span>
                            
                                <a
                                    href="https://postulate.uteq.edu.ec/registroadmision?id=OPPQQRRSSTTUUVVWWXXP"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Dirigirse a la plataforma Postúlate UTEQ"
                                    className="d-flex align-items-center justify-content-center btnPhase"
                                >
                                    {data.language === "es"
                                        ? "Accede a Postúlate UTEQ"
                                        : (data.language === "en"
                                            ? "Access Postúlate UTEQ"
                                            : "Acesse Postúlate UTEQ")}
                                     <i className="fa fa-arrow-circle-right fa-2x me-3"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <br />
                    {/*<div className="row mt-4 mb-4">
                        <div className="col-12 col-sm-12 col-md-9 col-lg-6">
                            <div className="d-flex flex-column justify-content-center h-100">
                                <h2 className="mb-4">Fase 2. Simulación de evaluación de competencias generales y específicas</h2>
                                <p className="mb-4">
                                    Para continuar en esta fase, debes haber realizado el Registro de inscripción de la UTEQ. ¿Cómo acceder?:
                                </p>
                                <ul className="mb-1">
                                    <li>Ingresa al sitio web <a href="https://uteq.edu.ec/es" target="_blank" rel="noopener noreferrer" aria-label="Visitar el sitio web de la UTEQ, página principal">www.uteq.edu.ec</a> y desde el apartado Postúlate, accede al sistema <a href="https://postulate.uteq.edu.ec/loginpostulacion"
                                        aria-label="Postúlate en la UTEQ, accede a la página de inscripción"
                                        target="_blank"
                                        rel="noopener noreferrer">Postúlate UTEQ</a>.</li>
                                    <li>Ingreso de usuario y clave para acceder al sistema <a href="https://postulate.uteq.edu.ec/loginpostulacion"
                                        aria-label="Postúlate en la UTEQ, accede a la página de inscripción"
                                        target="_blank"
                                        rel="noopener noreferrer">Postúlate UTEQ</a>.</li>
                                    <li>Se habilitará un simulador de evaluación de conocimientos con múltiples intentos y la muestra de resultados por cada intento realizado.</li>
                                </ul>
                                <span className="text-date-phase mb-4">Del 14 de enero al 17 de febrero 2025</span>
                                <span className="badge-state-phase">Próximamente comenzará la fase</span>
                                <a
                                    href="https://postulate.uteq.edu.ec/loginpostulacion"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Dirigirse a la plataforma Postúlate UTEQ"
                                    className="d-flex align-items-center justify-content-center btnPhase"
                                >
                                    Accede a Postúlate UTEQ   <i className="fa fa-arrow-circle-right fa-2x me-3"></i>
                                </a>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-3 col-lg-6 d-flex justify-content-center align-items-center">
                            <div className="ratio ratio-1x1 panel-2-sect-4">
                                <img
                                    src={`${IMAGES_ADMISSION_FOLDER}fase-2-registro-nacional.webp`}
                                    alt="Imagen de la fase 2"
                                    className="img-fluid w-100 h-100"
                                />
                            </div>
                        </div>
                    </div>*/}

                    <div className="row mt-4 mb-4">
                        <div className="col-12 col-sm-12 col-md-9 col-lg-6">
                            <div className="d-flex flex-column justify-content-center h-100">
                                <h2 className="mb-4">
                                    {data.language === "es"
                                        ? "Fase 2. Simulación de evaluación de competencias generales y específicas"
                                        : (data.language === "en"
                                            ? "Phase 2. Simulation of General and Specific Competence Evaluation"
                                            : "Fase 2. Simulação de avaliação de competências gerais e específicas")}
                                </h2>
                                <p className="mb-4">
                                    {data.language === "es"
                                        ? "Para continuar en esta fase, debes haber realizado el Registro de inscripción de la UTEQ. ¿Cómo acceder?:"
                                        : (data.language === "en"
                                            ? "To continue in this phase, you must have completed the UTEQ Registration. How to access?"
                                            : "Para continuar nesta fase, você deve ter realizado o Registro de inscrição da UTEQ. Como acessar?:")}
                                </p>
                                <ul className="mb-1">
                                    <li>
                                        {data.language === "es"
                                            ? "Ingresa al sitio web "
                                            : (data.language === "en"
                                                ? "Go to the website "
                                                : "Acesse o site ")}
                                        <a
                                            href={`https://uteq.edu.ec/${data.language}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={
                                                data.language === "es"
                                                    ? "Visitar el sitio web de la UTEQ, página principal"
                                                    : (data.language === "en"
                                                        ? "Visit the UTEQ website, homepage"
                                                        : "Visitar o site da UTEQ, página principal")
                                            }
                                        >
                                            www.uteq.edu.ec
                                        </a>
                                        {data.language === "es"
                                            ? " y desde el apartado Postúlate, accede al sistema "
                                            : (data.language === "en"
                                                ? " and from the Apply section, access the system "
                                                : " e, na seção Postule, acesse o sistema ")}
                                        <a
                                            href="https://postulate.uteq.edu.ec/loginpostulacion"
                                            aria-label="Postúlate en la UTEQ, accede a la página de inscripción"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Postúlate UTEQ
                                        </a>.
                                    </li>
                                    <li>
                                        {data.language === "es"
                                            ? "Ingreso de usuario y clave para acceder al sistema "
                                            : (data.language === "en"
                                                ? "Enter your username and password to access the system "
                                                : "Insira seu nome de usuário e senha para acessar o sistema ")}
                                        <a
                                            href="https://postulate.uteq.edu.ec/loginpostulacion"
                                            aria-label="Postúlate en la UTEQ, accede a la página de inscripción"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Postúlate UTEQ
                                        </a>.
                                    </li>
                                    <li>
                                        {data.language === "es"
                                            ? "Se habilitará un simulador de evaluación de conocimientos con múltiples intentos y la muestra de resultados por cada intento realizado."
                                            : (data.language === "en"
                                                ? "A knowledge evaluation simulator will be enabled with multiple attempts and result display for each attempt."
                                                : "Será habilitado um simulador de avaliação de conhecimentos com múltiplas tentativas e exibição de resultados por tentativa.")}
                                    </li>
                                </ul>
                            
                            {/*activar fechas*/}
                            {<span className="text-date-phase mb-4">
                                    {data.language === "es"
                                        ? "Del 10 de julio al 27 de julio del  2026"
                                        : (data.language === "en"
                                            ? "From July 10 to July 27, 2026"
                                            : "De 10 a 27 de julho de 2026")}
                                </span>}
                            
                            {/*<span className="badge-state-phase">
                                    {data.language === "es"
                                        ? "Próximamente comenzará la fase"
                                        : (data.language === "en"
                                            ? "The phase will start soon"
                                            : "A fase começará em breve")}
                                </span>*/}
                            	
                            	{/*<span className="badge-state-phase">
                                	{data.language === "es"
                                    ? "Del 27 de junio 2025 al 24 de julio 2025"
                                    : (data.language === "en"
                                        ? "From 27 June 2025 to 24 July 2025"
                                        : "27 de junho de 2025 a 24 de julho de 2025")}
                                </span>*/}
                                <a
                                    href="https://postulate.uteq.edu.ec/loginpostulacion"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Dirigirse a la plataforma Postúlate UTEQ"
                                    className="d-flex align-items-center justify-content-center btnPhase"
                                >
                                    {data.language === "es"
                                        ? "Accede a Postúlate UTEQ - Simulador de evaluación"
                                        : (data.language === "en"
                                            ? "Access Postúlate UTEQ - Assessment simulator"
                                            : "Acesse Postúlate UTEQ - Simulador de avaliação")}
                                     <i className="fa fa-arrow-circle-right fa-2x me-3"></i>
                                </a>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-3 col-lg-6 d-flex justify-content-center align-items-center">
                            <div className="ratio ratio-1x1 panel-2-sect-4">
                                <img
                                    src={`${IMAGES_ADMISSION_FOLDER}fase-2-registro-nacional.webp`}
                                    alt={data.language === "es"
                                        ? "Imagen de la fase 2"
                                        : (data.language === "en"
                                            ? "Image of Phase 2"
                                            : "Imagem da Fase 2")}
                                    className="img-fluid w-100 h-100"
                                />
                            </div>
                        </div>
                    </div>

                    <br />
                    {/*<div className="row mt-4 mb-4">
                        <div className="col-12 col-sm-12 col-md-3 col-lg-6 d-flex justify-content-center align-items-center">
                            <div className="ratio ratio-1x1 panel-2-sect-4">
                                <img
                                    src={`${IMAGES_ADMISSION_FOLDER}fase-3-registro-nacional.webp`}
                                    alt="Imagen de la fase 3"
                                    className="img-fluid w-100 h-100"
                                />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-9 col-lg-6">
                            <div className="d-flex flex-column justify-content-center h-100">
                                <h2 className="mb-4">Fase 3. Evaluación por competencia generales y específicas</h2>
                                <p className="mb-4">
                                    Para continuar en esta fase, debes haber realizado el Registro de Inscripción de la UTEQ. Pasos a seguir:
                                </p>
                                <ul className="mb-1">
                                    <li>Deberás pasar por una verificación de datos el día asignado según la planificación de la convocatoria y puedas quedar habilitado para tu evaluación de conocimientos.</li>
                                    <li>Ingresa al sitio web <a href="https://uteq.edu.ec/es" target="_blank" rel="noopener noreferrer" aria-label="Visitar el sitio web de la UTEQ, página principal">www.uteq.edu.ec</a> y desde el apartado Postúlate, accede al sistema <a href="https://postulate.uteq.edu.ec/loginpostulacion"
                                        aria-label="Postúlate en la UTEQ, accede a la página de inscripción"
                                        target="_blank"
                                        rel="noopener noreferrer">Postúlate UTEQ</a>.</li>
                                    <li>Ingresa tu usuario y contraseña.</li>
                                    <li>Se habilitará el paso 3 que te permitirá acceder a la evaluación, siguiendo directrices indicadas en ese momento.</li>
                                </ul>
                                <span className="text-date-phase mb-4">Del 18 al 28 de febrero 2025</span>
                                <span className="badge-state-phase">Próximamente comenzará la fase</span>
                                <a
                                    href="https://postulate.uteq.edu.ec/loginpostulacion"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Dirigirse a la plataforma Postúlate UTEQ"
                                    className="d-flex align-items-center justify-content-center btnPhase"
                                >
                                    Accede a Postúlate UTEQ   <i className="fa fa-arrow-circle-right fa-2x me-3"></i>
                                </a>
                            </div>
                        </div>
                    </div>*/}

                    <div className="row mt-4 mb-4">
                        <div className="col-12 col-sm-12 col-md-3 col-lg-6 d-flex justify-content-center align-items-center">
                            <div className="ratio ratio-1x1 panel-2-sect-4">
                                <img
                                    src={`${IMAGES_ADMISSION_FOLDER}fase-3-registro-nacional.webp`}
                                    alt={data.language === "es"
                                        ? "Imagen de la fase 3"
                                        : (data.language === "en"
                                            ? "Image of Phase 3"
                                            : "Imagem da Fase 3")}
                                    className="img-fluid w-100 h-100"
                                />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-9 col-lg-6">
                            <div className="d-flex flex-column justify-content-center h-100">
                                <h2 className="mb-4">
                                    {data.language === "es"
                                        ? "Fase 3. Evaluación por competencia generales y específicas"
                                        : (data.language === "en"
                                            ? "Phase 3. Evaluation by General and Specific Competence"
                                            : "Fase 3. Avaliação por competência gerais e específicas")}
                                </h2>
                                <p className="mb-4">
                                    {data.language === "es"
                                        ? "Para continuar en esta fase, debes haber realizado el Registro de Inscripción de la UTEQ. Pasos a seguir:"
                                        : (data.language === "en"
                                            ? "To continue in this phase, you must have completed the UTEQ Registration. Steps to follow:"
                                            : "Para continuar nesta fase, você deve ter realizado o Registro de Inscrição da UTEQ. Passos a seguir:")}
                                </p>
                                <ul className="mb-1">
                                    <li>
                                        {data.language === "es"
                                            ? "Deberás pasar por una verificación de datos el día asignado según la planificación de la convocatoria y puedas quedar habilitado para tu evaluación de conocimientos."
                                            : (data.language === "en"
                                                ? "You must undergo a data verification on the assigned day according to the call schedule to be eligible for the knowledge evaluation."
                                                : "Você deverá passar por uma verificação de dados no dia atribuído de acordo com o planejamento da convocatória para que possa ser habilitado para sua avaliação de conhecimentos.")}
                                    </li>
                                    <li>
                                        {data.language === "es"
                                            ? "Ingresa al sitio web "
                                            : (data.language === "en"
                                                ? "Go to the website "
                                                : "Acesse o site ")}
                                        <a
                                            href={`https://uteq.edu.ec/${data.language}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={
                                                data.language === "es"
                                                    ? "Visitar el sitio web de la UTEQ, página principal"
                                                    : (data.language === "en"
                                                        ? "Visit the UTEQ website, homepage"
                                                        : "Visitar o site da UTEQ, página principal")
                                            }
                                        >
                                            www.uteq.edu.ec
                                        </a>
                                        {data.language === "es"
                                            ? " y desde el apartado Postúlate, accede al sistema "
                                            : (data.language === "en"
                                                ? " and from the Apply section, access the system "
                                                : " e, na seção Postule, acesse o sistema ")}
                                        <a
                                            href="https://postulate.uteq.edu.ec/loginpostulacion"
                                            aria-label="Postúlate en la UTEQ, accede a la página de inscripción"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Postúlate UTEQ
                                        </a>.
                                    </li>
                                    <li>
                                        {data.language === "es"
                                            ? "Ingresa tu usuario y contraseña."
                                            : (data.language === "en"
                                                ? "Enter your username and password."
                                                : "Insira seu nome de usuário e senha.")}
                                    </li>
                                    <li>
                                        {data.language === "es"
                                            ? "Se habilitará el paso 3 que te permitirá acceder a la evaluación, siguiendo directrices indicadas en ese momento."
                                            : (data.language === "en"
                                                ? "Step 3 will be enabled, allowing you to access the evaluation, following the guidelines provided at that time."
                                                : "Será habilitado o passo 3 que permitirá o acesso à avaliação, seguindo as diretrizes indicadas naquele momento.")}
                                    </li>
                                </ul>
                            
                            {/* activar fechas*/}
                            {<span className="text-date-phase mb-4">
                                    {data.language === "es"
                                        ? "Del 28 de julio al 7 de agosto del  2026"
                                        : (data.language === "en"
                                            ? "From July 28 to August 7, 2026"
                                            : "De 28 de julho a 7 de agosto de 2026")}
                                </span>}
                            
                            
                                {/*<span className="badge-state-phase">
                                    {data.language === "es"
                                        ? "Próximamente comenzará la fase"
                                        : (data.language === "en"
                                            ? "The phase will start soon"
                                            : "A fase começará em breve")}
                                </span>*/}
                            
                            	 <span className="badge-state-phase">
                                    {data.language === "es"
                                        ? "La fase iniciará próximamente"
                                        : (data.language === "en"
                                            ? "The phase will begin shortly"
                                            : "A fase terá início em breve")}
                                </span>
                            
                                <a
                                    href="https://postulate.uteq.edu.ec/loginpostulacion"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Dirigirse a la plataforma Postúlate UTEQ"
                                    className="d-flex align-items-center justify-content-center btnPhase"
                                >
                                    {data.language === "es"
                                        ? "Accede a Postúlate UTEQ"
                                        : (data.language === "en"
                                            ? "Access Postúlate UTEQ"
                                            : "Acesse Postúlate UTEQ")}
                                     <i className="fa fa-arrow-circle-right fa-2x me-3"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <br />
                    {/*<div className="row mt-4 mb-4">
                        <div className="col-12 col-sm-12 col-md-9 col-lg-6">
                            <div className="d-flex flex-column justify-content-center h-100">
                                <h2 className="mb-4">Fase 4. Publicación de la nota de postulación</h2>
                                <p className="mb-4">
                                    Los resultados serán publicados en el sistema <a href="https://postulate.uteq.edu.ec/loginpostulacion"
                                        aria-label="Postúlate en la UTEQ, accede a la página de inscripción"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="link-website-parg">Postúlate UTEQ</a>, donde cada aspirante podrá acceder a su nota final, así como a la información sobre el estado de su postulación. Para consultar la nota, los postulantes deberán ingresar con su usuario y contraseña.
                                </p>
                                <p className="mb-4">Este es un paso crucial, ya que la publicación de la nota determina si el postulante ha sido aceptado en el programa o si debe realizar alguna acción adicional. Se recomienda a los aspirantes que revisen regularmente el sistema para obtener actualizaciones sobre su postulación.</p>
                                <span className="text-date-phase mb-4">17 de marzo 2025</span>
                                <span className="badge-state-phase">Próximamente comenzará la fase</span>
                                <a
                                    href="https://postulate.uteq.edu.ec/loginpostulacion"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Dirigirse a la plataforma Postúlate UTEQ"
                                    className="d-flex align-items-center justify-content-center btnPhase"
                                >
                                    Accede a Postúlate UTEQ   <i className="fa fa-arrow-circle-right fa-2x me-3"></i>
                                </a>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-3 col-lg-6 d-flex justify-content-center align-items-center">
                            <div className="ratio ratio-1x1 panel-2-sect-4">
                                <img
                                    src={`${IMAGES_ADMISSION_FOLDER}fase-4-registro-nacional.webp`}
                                    alt="Imagen de la fase 4"
                                    className="img-fluid w-100 h-100"
                                />
                            </div>
                        </div>
                    </div>*/}

                    <div className="row mt-4 mb-4">
                        <div className="col-12 col-sm-12 col-md-9 col-lg-6">
                            <div className="d-flex flex-column justify-content-center h-100">
                                <h2 className="mb-4">
                                    {data.language === "es"
                                        ? "Fase 4. Publicación de la nota de postulación"
                                        : (data.language === "en"
                                            ? "Phase 4. Publication of the application score"
                                            : "Fase 4. Publicação da nota de candidatura")}
                                </h2>
                                <p className="mb-4">
                                    {data.language === "es"
                                        ? "Los resultados serán publicados en el sistema "
                                        : (data.language === "en"
                                            ? "The results will be published in the system "
                                            : "Os resultados serão publicados no sistema ")}
                                    <a
                                        href="https://postulate.uteq.edu.ec/loginpostulacion"
                                        aria-label={
                                            data.language === "es"
                                                ? "Postúlate en la UTEQ, accede a la página de inscripción"
                                                : (data.language === "en"
                                                    ? "Apply to UTEQ, access the registration page"
                                                    : "Postule-se na UTEQ, acesse a página de inscrição")
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="link-website-parg"
                                    >
                                        Postúlate UTEQ
                                    </a>,
                                    {data.language === "es"
                                        ? " donde cada aspirante podrá acceder a su nota final, así como a la información sobre el estado de su postulación. Para consultar la nota, los postulantes deberán ingresar con su usuario y contraseña."
                                        : (data.language === "en"
                                            ? " where each applicant can access their final score, as well as information about the status of their application. To check the score, applicants must log in with their username and password."
                                            : " onde cada candidato poderá acessar sua nota final, bem como informações sobre o status de sua candidatura. Para consultar a nota, os candidatos deverão fazer login com seu nome de usuário e senha.")}
                                </p>
                                <p className="mb-4">
                                    {data.language === "es"
                                        ? "Este es un paso crucial, ya que la publicación de la nota determina si el postulante ha sido aceptado en el programa o si debe realizar alguna acción adicional. Se recomienda a los aspirantes que revisen regularmente el sistema para obtener actualizaciones sobre su postulación."
                                        : (data.language === "en"
                                            ? "This is a crucial step, as the publication of the score determines whether the applicant has been accepted into the program or if they need to take any additional action. Applicants are advised to regularly check the system for updates on their application."
                                            : "Este é um passo crucial, pois a publicação da nota determina se o candidato foi aceito no programa ou se precisa realizar alguma ação adicional. Recomenda-se que os candidatos verifiquem regularmente o sistema para obter atualizações sobre sua candidatura.")}
                                </p>
                            {/*activar fechas*/}    
                            
                            {/*<span className="text-date-phase mb-4">
                                    {data.language === "es"
                                        ? "06 de abril 2026"
                                        : (data.language === "en"
                                            ? "6th of April, 2026"
                                            : "06 de abril de 2026")}
                                </span>*/}
                                
                                <span className="badge-state-phase">
                                    {data.language === "es"
                                        ? "La fase iniciará próximamente"
                                        : (data.language === "en"
                                            ? "The phase will begin shortly"
                                            : "A fase terá início em breve")}
                                </span>
                                <a
                                    href="https://postulate.uteq.edu.ec/loginpostulacion"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Dirigirse a la plataforma Postúlate UTEQ"
                                    className="d-flex align-items-center justify-content-center btnPhase"
                                >
                                    {data.language === "es"
                                        ? "Accede a Postúlate UTEQ"
                                        : (data.language === "en"
                                            ? "Access Postúlate UTEQ"
                                            : "Acesse Postúlate UTEQ")}
                                     <i className="fa fa-arrow-circle-right fa-2x me-3"></i>
                                </a>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-3 col-lg-6 d-flex justify-content-center align-items-center">
                            <div className="ratio ratio-1x1 panel-2-sect-4">
                                <img
                                    src={`${IMAGES_ADMISSION_FOLDER}fase-4-registro-nacional.webp`}
                                    alt={data.language === "es"
                                        ? "Imagen de la fase 4"
                                        : (data.language === "en"
                                            ? "Image of Phase 4"
                                            : "Imagem da Fase 4")}
                                    className="img-fluid w-100 h-100"
                                />
                            </div>
                        </div>
                    </div>

                    <br />
                    {/*<div className="row mt-4 mb-4">
                        <div className="col-12 col-sm-12 col-md-3 col-lg-6 d-flex justify-content-center align-items-center">
                            <div className="ratio ratio-1x1 panel-2-sect-4">
                                <img
                                    src={`${IMAGES_ADMISSION_FOLDER}fase-5-registro-nacional.webp`}
                                    alt="Imagen de la fase 5"
                                    className="img-fluid w-100 h-100"
                                />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-9 col-lg-6">
                            <div className="d-flex flex-column justify-content-center h-100">
                                <h2 className="mb-4">Fase 5. Postulación de carrera</h2>
                                <p className="mb-4">
                                    Para continuar en esta fase, debes haber realizado el Registro de Inscripción de la UTEQ. Pasos a seguir:
                                </p>
                                <ul className="mb-4">
                                    <li>Acceso desde <a href="https://uteq.edu.ec/es" target="_blank" rel="noopener noreferrer" aria-label="Visitar el sitio web de la UTEQ, página principal">www.uteq.edu.ec</a> en la opción Postúlate.</li>
                                    <li>Ingresa tu usuario y contraseña.</li>
                                    <li>Se mostrará el puntaje de postulación obtenido.</li>
                                    <li>Se presentará la carrera seleccionada en el proceso de inscripción, además visualizará los cupos disponibles en la oferta académica y una referencia de que si está dentro del rango para obtener un posible cupo.</li>
                                    <li>El aspirante podrá realizar el cambio de la carrera y el sistema le presentará los cupos disponibles. Para aplicar el cambio el aspirante deberá aceptar unas condiciones y se notificará al correo electrónico personas.</li>
                                </ul>
                                <span className="text-date-phase mb-4">17, 21, 22, 26, 30 y 31 de marzo 2025</span>
                                <span className="badge-state-phase">Próximamente comenzará la fase</span>
                                <a
                                    href="https://postulate.uteq.edu.ec/loginpostulacion"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Dirigirse a la plataforma Postúlate UTEQ"
                                    className="d-flex align-items-center justify-content-center btnPhase"
                                >
                                    Accede a Postúlate UTEQ   <i className="fa fa-arrow-circle-right fa-2x me-3"></i>
                                </a>
                            </div>
                        </div>
                    </div>*/}

                    <div className="row mt-4 mb-4">
                        <div className="col-12 col-sm-12 col-md-3 col-lg-6 d-flex justify-content-center align-items-center">
                            <div className="ratio ratio-1x1 panel-2-sect-4">
                                <img
                                    src={`${IMAGES_ADMISSION_FOLDER}fase-5-registro-nacional.webp`}
                                    alt={data.language === "es"
                                        ? "Imagen de la fase 5"
                                        : (data.language === "en"
                                            ? "Image of Phase 5"
                                            : "Imagem da Fase 5")}
                                    className="img-fluid w-100 h-100"
                                />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-9 col-lg-6">
                            <div className="d-flex flex-column justify-content-center h-100">
                                <h2 className="mb-4">
                                    {data.language === "es"
                                        ? "Fase 5. Postulación de carrera"
                                        : (data.language === "en"
                                            ? "Phase 5. Career Application"
                                            : "Fase 5. Candidatura de curso")}
                                </h2>
                                <p className="mb-4">
                                    {data.language === "es"
                                        ? "Para continuar en esta fase, debes haber realizado el Registro de Inscripción de la UTEQ. Pasos a seguir:"
                                        : (data.language === "en"
                                            ? "To continue in this phase, you must have completed the UTEQ Registration. Steps to follow:"
                                            : "Para continuar nesta fase, você deve ter feito o Registro de Inscrição da UTEQ. Passos a seguir:")}
                                </p>
                                <ul className="mb-4">
                                    <li>
                                        {data.language === "es"
                                            ? "Acceso desde "
                                            : (data.language === "en"
                                                ? "Access from "
                                                : "Acesso a partir de ")}
                                        <a
                                            href={`https://uteq.edu.ec/${data.language}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={
                                                data.language === "es"
                                                    ? "Visitar el sitio web de la UTEQ, página principal"
                                                    : (data.language === "en"
                                                        ? "Visit the UTEQ website, main page"
                                                        : "Visitar o site da UTEQ, página principal")
                                            }
                                        >
                                            www.uteq.edu.ec
                                        </a>
                                        {data.language === "es"
                                            ? " en la opción Postúlate."
                                            : (data.language === "en"
                                                ? " in the Apply section."
                                                : " na opção Postule-se.")}
                                    </li>
                                    <li>
                                        {data.language === "es"
                                            ? "Ingresa tu usuario y contraseña."
                                            : (data.language === "en"
                                                ? "Enter your username and password."
                                                : "Digite seu nome de usuário e senha.")}
                                    </li>
                                    <li>
                                        {data.language === "es"
                                            ? "Se mostrará el puntaje de postulación obtenido."
                                            : (data.language === "en"
                                                ? "The obtained application score will be displayed."
                                                : "A pontuação de candidatura obtida será exibida.")}
                                    </li>
                                    <li>
                                        {data.language === "es"
                                            ? "Se presentará la carrera seleccionada en el proceso de inscripción, además visualizará los cupos disponibles en la oferta académica y una referencia de que si está dentro del rango para obtener un posible cupo."
                                            : (data.language === "en"
                                                ? "The selected program will be presented in the registration process, and the available spots in the academic offer will be displayed along with a reference showing if it is within the range to obtain a possible spot."
                                                : "O curso selecionado será apresentado no processo de inscrição, e os lugares disponíveis na oferta acadêmica serão exibidos junto com uma referência sobre a possibilidade de obter uma vaga.")}
                                    </li>
                                    <li>
                                        {data.language === "es"
                                            ? "El aspirante podrá realizar el cambio de la carrera y el sistema le presentará los cupos disponibles. Para aplicar el cambio el aspirante deberá aceptar unas condiciones y se notificará al correo electrónico."
                                            : (data.language === "en"
                                                ? "The applicant may change their program, and the system will present the available spots. To apply for the change, the applicant must accept certain conditions, and a notification will be sent to the email."
                                                : "O candidato poderá mudar de curso, e o sistema apresentará as vagas disponíveis. Para aplicar a mudança, o candidato deverá aceitar as condições e uma notificação será enviada para o e-mail.")}
                                    </li>
                                </ul>
                            
                            {/*activar fechas*/}

                            <span className="text-date-phase mb-4">
                                {data.language === "es"
                                    ? "Primera postulación, del 11 al 12 de agosto del 2026"
                                    : (data.language === "en"
                                        ? "First application period, From August 11th to 12th, 2026"
                                        : "Primeiro período de inscrição: De 11 a 12 de agosto de 2026")}
                            </span>
                        
                            <span className="text-date-phase mb-4">
                                {data.language === "es"
                                    ? "Primera asignación, 13 de agosto del 2026"
                                    : (data.language === "en"
                                        ? "First assignment, August 13 2026"
                                        : "Primeira atribuição, 13 de agosto de 2026")}
                            </span>
                            
                            
                            {/*<span className="text-date-phase mb-4">
                                    {data.language === "es"
                                        ? "Primera postulación, 07 de abril de 2026"
                                        : (data.language === "en"
                                            ? "First application, 7 April 2026"
                                            : "Primeira candidatura, 7 de abril de 2026")}
                                </span>
                            
                                <span className="text-date-phase mb-4">
                                    {data.language === "es"
                                        ? "Primera asignación, 8 de abril de 2026"
                                        : (data.language === "en"
                                            ? "First assignment, 8 April 2026"
                                            : "Primeira atribuição, 8 de abril de 2026")}
                                </span>
                            
                            
                            	<span className="text-date-phase mb-4">
                                    {data.language === "es"
                                        ? "Segunda postulación, 13 y 14 de abril de 2026"
                                        : (data.language === "en"
                                            ? "Second application, 13 and 14 April 2026"
                                            : "Segunda candidatura, 13 e 14 de abril de 2026")}
                                </span>
                            
                                <span className="text-date-phase mb-4">
                                    {data.language === "es"
                                        ? "Segunda asignación, 15 de abril de 2026"
                                        : (data.language === "en"
                                            ? "Second assignment, 15 April 2026"
                                            : "Segunda atribuição, 15 de abril de 2026")}
                                </span>
                            
                            	<span className="text-date-phase mb-4">
                                    {data.language === "es"
                                        ? "Tercer postulación, 20 de abril de 2026"
                                        : (data.language === "en"
                                            ? "Third application, 20 April 2026"
                                            : "Terceira candidatura, 20 de abril de 2026")}
                                </span>
                            
                                <span className="text-date-phase mb-4">
                                    {data.language === "es"
                                        ? "Tercera asignación, 21 de abril de 2026"
                                        : (data.language === "en"
                                            ? "Third assignment, 21 April 2026"
                                            : "Terceira atribuição, 21 de abril de 2026")}
                                </span>
                            
                             <span className="badge-state-phase">
                                    {data.language === "es"
                                        ? "La fase se encuentra finalizada"
                                        : (data.language === "en"
                                            ? "The phase is now complete"
                                            : "A fase está concluída")}
                                </span>
                            
                            
                            */}
                            
                                <a
                                    href="https://postulate.uteq.edu.ec/loginpostulacion"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={
                                        data.language === "es"
                                            ? "Dirigirse a la plataforma Postúlate UTEQ"
                                            : (data.language === "en"
                                                ? "Go to the Postúlate UTEQ platform"
                                                : "Ir para a plataforma Postúlate UTEQ")
                                    }
                                    className="d-flex align-items-center justify-content-center btnPhase"
                                >
                                    {data.language === "es"
                                        ? "Accede a Postúlate UTEQ"
                                        : (data.language === "en"
                                            ? "Access Postúlate UTEQ"
                                            : "Acesse Postúlate UTEQ")}
                                     <i className="fa fa-arrow-circle-right fa-2x me-3"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <br />
                    {/*<div className="row mt-4 mb-4">
                        <div className="col-12 col-sm-12 col-md-9 col-lg-6">
                            <div className="d-flex flex-column justify-content-center h-100">
                                <h2 className="mb-4">Fase 6. Aceptación de cupos - Senescyt</h2>
                                <p className="mb-4">
                                    Para continuar en esta fase, debes haber realizado el Registro Nacional Único de la Senescyt. Deberás realizar lo siguiente:
                                </p>
                                <ul className="mb-4">
                                    <li>Acceso desde la Plataforma de aceptación de cupos de instituciones de educación superior públicas.</li>
                                    <li>Ingresa tu usuario y contraseña del Registro Nacional Único de la Senescyt.</li>
                                    <li>Los aspirantes podrán visualizar si se les asignó el cupo en la carrera postulada, en caso de ser afirmativo deberá aceptarlo y se generará un comprobante de postulación y aceptación del cupo en la UTEQ.</li>
                                    <li>Si el aspirante no fue beneficiado de un cupo, deberá esperar la habiltación de la etapa de postulación y seleccionar otra carrera.</li>
                                    <li>Si el aspirante no aceptó un cupo asignado, se considerará como rechazado y el cupo será liberado para otro aspirante que cumpla con el puntaje requerido.</li>
                                </ul>
                                <span className="text-date-phase mb-4">19, 24, 28 de marzo y 2 de abril 2025</span>
                                <span className="badge-state-phase">Próximamente comenzará la fase</span>
                                <a
                                    href="https://acepta.registrounicoedusup.gob.ec/auth/login"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Dirigirse a la plataforma de aceptación cupos"
                                    className="d-flex align-items-center justify-content-center btnPhase"
                                >
                                    Accede a la plataforma   <i className="fa fa-arrow-circle-right fa-2x me-3"></i>
                                </a>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-3 col-lg-6 d-flex justify-content-center align-items-center">
                            <div className="ratio ratio-1x1 panel-2-sect-4">
                                <img
                                    src={`${IMAGES_ADMISSION_FOLDER}fase-6-registro-nacional.webp`}
                                    alt="Imagen de la fase 6"
                                    className="img-fluid w-100 h-100"
                                />
                            </div>
                        </div>
                    </div>*/}

                    <div className="row mt-4 mb-6">
                        <div className="col-12 col-sm-12 col-md-9 col-lg-6">
                            <div className="d-flex flex-column justify-content-center h-100">
                                <h2 className="mb-4">
                                    {data.language === "es"
                                        ? "Fase 6. Aceptación de cupos - MINEDEC"
                                        : (data.language === "en"
                                            ? "Phase 6. Seat Acceptance - MINEDEC"
                                            : "Fase 6. Aceitação de vagas - MINEDEC")}
                                </h2>
                                <p className="mb-4">
                                    {data.language === "es"
                                        ? "Para continuar en esta fase, debes haber realizado el Registro Nacional Único del MINEDEC. Deberás realizar lo siguiente:"
                                        : (data.language === "en"
                                            ? "To continue in this phase, you must have completed the MINEDEC National Unique Registration. You must do the following:"
                                            : "Para continuar nesta fase, você deve ter realizado o Registro Nacional Único da MINEDEC. Você deve fazer o seguinte:")}
                                </p>
                                <ul className="mb-4">
                                    <li>
                                        {data.language === "es"
                                            ? "Acceso desde la Plataforma de aceptación de cupos de instituciones de educación superior públicas."
                                            : (data.language === "en"
                                                ? "Access from the seat acceptance platform of public higher education institutions."
                                                : "Acesso a partir da Plataforma de aceitação de vagas das instituições de ensino superior públicas.")}
                                    </li>
                                    <li>
                                        {data.language === "es"
                                            ? "Ingresa tu usuario y contraseña del Registro Nacional Único del MINEDEC."
                                            : (data.language === "en"
                                                ? "Enter your username and password from the MINEDEC National Unique Registration."
                                                : "Digite seu nome de usuário e senha do Registro Nacional Único da MINEDEC.")}
                                    </li>
                                    <li>
                                        {data.language === "es"
                                            ? "Los aspirantes podrán visualizar si se les asignó el cupo en la carrera postulada, en caso de ser afirmativo deberá aceptarlo y se generará un comprobante de postulación y aceptación del cupo en la UTEQ."
                                            : (data.language === "en"
                                                ? "Applicants will be able to see if they have been assigned a seat in the program they applied for. If so, they must accept it, and a confirmation of application and acceptance of the seat at UTEQ will be generated."
                                                : "Os candidatos poderão visualizar se receberam a vaga na carreira escolhida, caso afirmativo, deverão aceitá-la e um comprovante de candidatura e aceitação da vaga na UTEQ será gerado.")}
                                    </li>
                                    <li>
                                        {data.language === "es"
                                            ? "Si el aspirante no fue beneficiado de un cupo, deberá esperar la habilitación de la etapa de postulación y seleccionar otra carrera."
                                            : (data.language === "en"
                                                ? "If the applicant was not granted a seat, they must wait for the application stage to open and choose another program."
                                                : "Se o candidato não foi beneficiado com uma vaga, deverá aguardar a habilitação da etapa de candidatura e escolher outro curso.")}
                                    </li>
                                    <li>
                                        {data.language === "es"
                                            ? "Si el aspirante no aceptó un cupo asignado, se considerará como rechazado y el cupo será liberado para otro aspirante que cumpla con el puntaje requerido."
                                            : (data.language === "en"
                                                ? "If the applicant does not accept the assigned seat, it will be considered rejected, and the seat will be released for another applicant who meets the required score."
                                                : "Se o candidato não aceitar uma vaga atribuída, ela será considerada rejeitada e a vaga será liberada para outro candidato que cumpra com a pontuação necessária.")}
                                    </li>
                                </ul>
                               { <span className="text-date-phase mb-4">
                                    {data.language === "es"
                                        ? "Primera aceptación, 14 al 16 de agosto de 2026"
                                        : (data.language === "en"
                                            ? "First acceptance, 14 to 16 August 2026"
                                            : "Primeira aceitação, 14 a 16 de agosto de 2026")}
                                </span>}
                            
                            {/*activar fechas */}
                            
                            {/*
                            	<span className="text-date-phase mb-4">
                                    {data.language === "es"
                                        ? "Segunda aceptación, 16 al 19 de abril de 2026"
                                        : (data.language === "en"
                                            ? "Second acceptance, 16 to 19 April 2026"
                                            : "Segunda aceitação, 16 a 19 de abril de 2026")}
                                </span>
                            
                            	<span className="text-date-phase mb-4">
                                    {data.language === "es"
                                        ? "Tercera aceptación, 22 y 23 de abril de 2026"
                                        : (data.language === "en"
                                            ? "Third acceptance, 22 to 23 April 2026"
                                            : "Terceiraaceitação, 22 a 23 de abril de 2026")}
                                </span>
                            
                            */}
                            
                                <span className="badge-state-phase">
                                    {data.language === "es"
                                        ? "La fase iniciará próximamente"
                                        : (data.language === "en"
                                            ? "The phase will begin shortly"
                                            : "A fase terá início em breve")}
                                </span>
                                <a
                                    href="https://acepta.registrounicoedusup.gob.ec/auth/login"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={
                                        data.language === "es"
                                            ? "Dirigirse a la plataforma de aceptación cupos"
                                            : (data.language === "en"
                                                ? "Go to the seat acceptance platform"
                                                : "Ir para a plataforma de aceitação de vagas")}
                                    className="d-flex align-items-center justify-content-center btnPhase"
                                >
                                    {data.language === "es"
                                        ? "Accede a la plataforma"
                                        : (data.language === "en"
                                            ? "Access the platform"
                                            : "Acesse a plataforma")}
                                     <i className="fa fa-arrow-circle-right fa-2x me-3"></i>
                                </a>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-3 col-lg-6 d-flex justify-content-center align-items-center">
                            <div className="ratio ratio-1x1 panel-2-sect-4">
                                <img
                                    src={`${IMAGES_ADMISSION_FOLDER}fase-6-registro-nacional.webp`}
                                    alt={data.language === "es"
                                        ? "Imagen de la fase 6"
                                        : (data.language === "en"
                                            ? "Image of Phase 6"
                                            : "Imagem da Fase 6")}
                                    className="img-fluid w-100 h-100"
                                />
                            </div>
                        </div>
                    </div>
					<br />


                </div>
            </section>




        </div>
    </>);
}