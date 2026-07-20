import React from 'react';
import {
    IMAGES_ADMISSION_FOLDER, VIDEOS_FOLDER
} from 'config';
import ReactPlayer from "react-player";

export { BodyAdmision2 };


function BodyAdmision2(data) {
    const listMetrics = data.metrics;

    return (<>
        <div className="col-md-12">
            {/*<div className="hero-wrap" style={{ backgroundImage: `url(${IMAGES_ADMISSION_FOLDER}background-principal-4.webp)` }}>
                <div className="container-fluid p-0">
                    <div className="row g-0 slider-text align-items-center justify-content-end" data-scrollax-parent="true">
                        <div className="col-md-5 ftco-animate custom-left-column p-4 me-md-2">
                            <h1 className="mb-4"><span>Fase 0</span> Registro nacional en Senescyt</h1>
                            <p className="mb-3">Este registro es el primer paso para acceder a los procesos de admisión en las universidades públicas del Ecuador.</p>
                            <p className="mb-4 fw-bold">Del 30 de noviembre 2024 al 8 de diciembre 2024</p>
                            <a href="/es/admision2/proceso-de-admision" className="btn-admission-2 mr-md-4 py-3 px-4">Inscríbete aquí <i className="fa fa-play-circle" aria-hidden="true"></i></a>
                        </div>
                        <div className="col-md-6 ftco-animate ms-md-4">
                            <h1 className="mb-4">Tu aventura universitaria <span>comienza aquí <i className="fa fa-arrow-circle-down"></i></span></h1>
                            <a href="#" className="btn-admission-1 mr-md-4 py-3 px-4">Test vocacional <i className="fa fa-play-circle" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </div>
            </div>*/}

            <div className="hero-wrap" style={{ backgroundImage: `url(${IMAGES_ADMISSION_FOLDER}background-principal-4.webp)` }}>
                <div className="container-fluid p-0">
                    <div className="row g-0 slider-text align-items-center justify-content-end" data-scrollax-parent="true">

                        {/**/

                            <div className="col-10 col-sm-10 col-md-5 ftco-animate custom-left-column p-4 me-md-2 mx-auto">
                                <h1 className="mb-4">
                                    <span>
                                        {data.language === "es"
                                            ? "Fase 1"
                                            : (data.language === "en"
                                                ? "Phase 1"
                                                : "Fase 1")}
                                    </span>
                                    {data.language === "es"
                                        ? "Registro de inscripción en la UTEQ"
                                        : (data.language === "en"
                                            ? "Registration with the UTEQ"
                                            : "Registro de inscrição na UTEQ")}
                                </h1>
                                <p className="mb-3">
                                    {data.language === "es"
                                        ? "Para continuar en esta fase, debes haber realizado el Registro Nacional Único del MINEDEC."
                                        : (data.language === "en"
                                            ? "To proceed to this stage, you must have completed the MINEDEC Single National Register."
                                            : "Para prosseguir nesta fase, você deve ter se cadastrado no Registro Nacional Único do MINEDEC.")}
                                </p>
                                <p className="mb-4 fw-bold">
                                    {data.language === "es"
                                        ? "Del 30 de junio al 20 de julio de 2026"
                                        : (data.language === "en"
                                            ? "From 30 June to 20 July 2026"
                                            : "De 30 de junho a 20 de julho de 2026")}
                                </p>
                                <p className="mb-4 fw-bold">
                                    {data.language === "es"
                                        ? "La fase iniciará próximamente"
                                        : (data.language === "en"
                                            ? "The phase will begin shortly"
                                            : "A fase terá início em breve")}
                                </p>

                                <a
                                    href="https://postulate.uteq.edu.ec/registroadmision?id=OPPQQRRSSTTUUVVWWXWY"
                                    className="btn-admission-2 mr-md-4 py-3 px-4"
                                    aria-label={
                                        data.language === "es"
                                            ? "Ir a la página web del Registro Nacional"
                                            : (data.language === "en"
                                                ? "Go to the National Registration website"
                                                : "Ir ao site do Registro Nacional")
                                    }
                                >
                                    {data.language === "es"
                                        ? "Accede aquí"
                                        : (data.language === "en"
                                            ? "Click here"
                                            : "Acesse aqui")}
                                    <i className="fa fa-play-circle" aria-hidden="true"></i>
                                </a>

                            </div>

                        /* */}

                        <div className="col-10 col-sm-10 col-md-6 ftco-animate ms-md-4 mx-auto mb-sm-5 mt-sm-2">
                            <h1 className="mb-4">
                                {data.language === "es"
                                    ? "Tu aventura universitaria"
                                    : (data.language === "en"
                                        ? "Your university adventure"
                                        : "Sua aventura universitária")}
                                <br /><span>
                                    {data.language === "es"
                                        ? "comienza aquí"
                                        : (data.language === "en"
                                            ? "starts here"
                                            : "começa aqui")}
                                    <i className="fa fa-arrow-circle-down"></i>
                                </span>
                            </h1>
                            {/*<a
                                href="#"
                                className="btn-admission-1 mr-md-4 py-3 px-4"
                                aria-label={
                                    data.language === "es"
                                        ? "Ir al test vocacional"
                                        : (data.language === "en"
                                            ? "Go to the vocational test"
                                            : "Ir para o teste vocacional")
                                }
                            >
                                {data.language === "es"
                                    ? "Test vocacional"
                                    : (data.language === "en"
                                        ? "Vocational test"
                                        : "Teste vocacional")}
                                <i className="fa fa-play-circle" aria-hidden="true"></i>
                            </a>*/}
                        </div>
                    </div>
                </div>
            </div>

            <section className="section-information-1 mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-4 col-md-4 col-lg-4 column-image-s1 d-flex justify-content-center align-items-center">
                            <img src={`${IMAGES_ADMISSION_FOLDER}section-1-information-v2.png`} alt="Imagen de la sección 1" className="img-fluid" />
                        </div>
                        {/*<div className="col-md-8 column-image-s2">
                            <h2>¿Por qué elegir la UTEQ?</h2>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <span className="icono-sect-1 d-flex justify-content-center align-items-center">
                                                <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                        <div className="col-md-9 part-info-sect-1">
                                            <span>Educación de calidad</span>
                                            <p>La UTEQ se destaca por su enfoque académico innovador, con programas educativos que preparan a los estudiantes para afrontar los retos del futuro profesional.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <span className="icono-sect-1 d-flex justify-content-center align-items-center">
                                                <i className="fa fa-cogs" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                        <div className="col-md-9 part-info-sect-1">
                                            <span>Compromiso con la innovación</span>
                                            <p>Nos enfocamos en el desarrollo de proyectos y tecnología, formando profesionales creativos, con habilidades prácticas y de vanguardia.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <span className="icono-sect-1 d-flex justify-content-center align-items-center">
                                                <i className="fa fa-globe" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                        <div className="col-md-9 part-info-sect-1">
                                            <span>Intercambios internacionales</span>
                                            <p>Los mejores estudiantes de cada carrera tienen la oportunidad de participar en intercambios estudiantiles en el extranjero, lo que enriquece su formación y fortalece su aprendizaje a nivel global.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <span className="icono-sect-1 d-flex justify-content-center align-items-center">
                                                <i className="fa fa-users" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                        <div className="col-md-9 part-info-sect-1">
                                            <span>Docentes de alto nivel</span>
                                            <p>Nuestros docentes son expertos en sus áreas, con una formación constante y experiencia profesional que asegura una enseñanza de calidad, adaptada a las necesidades del mundo actual.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>*/}

                        <div className="col-xs-8 col-md-8 col-lg-8 mt-sm-3 mt-3 column-image-s2">
                            <h2 className='text-sm-center text-xs-center'>
                                {data.language === "es"
                                    ? "¿Por qué elegir la UTEQ?"
                                    : (data.language === "en"
                                        ? "Why choose UTEQ?"
                                        : "Por que escolher a UTEQ?")}
                            </h2>
                            <div className="row mt-3">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                                    <div className="row">
                                        <div className="col-4 col-sm-2 col-md-3">
                                            <span className="icono-sect-1 d-flex justify-content-center align-items-center">
                                                <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                        <div className="col-8 col-sm-10 col-md-9 part-info-sect-1">
                                            <span>
                                                {data.language === "es"
                                                    ? "Educación de calidad"
                                                    : (data.language === "en"
                                                        ? "Quality education"
                                                        : "Educação de qualidade")}
                                            </span>
                                            <p>
                                                {data.language === "es"
                                                    ? "La UTEQ se destaca por su enfoque académico innovador, con programas educativos que preparan a los estudiantes para afrontar los retos del futuro profesional."
                                                    : (data.language === "en"
                                                        ? "UTEQ stands out for its innovative academic approach, with educational programs that prepare students to face the challenges of their future careers."
                                                        : "A UTEQ se destaca pela sua abordagem acadêmica inovadora, com programas educacionais que preparam os estudantes para enfrentar os desafios do futuro profissional.")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-6">
                                    <div className="row">
                                        <div className="col-4 col-sm-2 col-md-3">
                                            <span className="icono-sect-1 d-flex justify-content-center align-items-center">
                                                <i className="fa fa-cogs" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                        <div className="col-8 col-sm-10 col-md-9 part-info-sect-1">
                                            <span>
                                                {data.language === "es"
                                                    ? "Compromiso con la innovación"
                                                    : (data.language === "en"
                                                        ? "Commitment to innovation"
                                                        : "Compromisso com a inovação")}
                                            </span>
                                            <p>
                                                {data.language === "es"
                                                    ? "Nos enfocamos en el desarrollo de proyectos y tecnología, formando profesionales creativos, con habilidades prácticas y de vanguardia."
                                                    : (data.language === "en"
                                                        ? "We focus on the development of projects and technology, training creative professionals with practical skills and cutting-edge knowledge."
                                                        : "Nos focamos no desenvolvimento de projetos e tecnologia, formando profissionais criativos, com habilidades práticas e de vanguarda.")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-6">
                                    <div className="row">
                                        <div className="col-4 col-sm-2 col-md-3">
                                            <span className="icono-sect-1 d-flex justify-content-center align-items-center">
                                                <i className="fa fa-globe" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                        <div className="col-8 col-sm-10 col-md-9 part-info-sect-1">
                                            <span>
                                                {data.language === "es"
                                                    ? "Intercambios internacionales"
                                                    : (data.language === "en"
                                                        ? "International exchanges"
                                                        : "Intercâmbios internacionais")}
                                            </span>
                                            <p>
                                                {data.language === "es"
                                                    ? "Los mejores estudiantes de cada carrera tienen la oportunidad de participar en intercambios estudiantiles en el extranjero, lo que enriquece su formación y fortalece su aprendizaje a nivel global."
                                                    : (data.language === "en"
                                                        ? "The best students from each program have the opportunity to participate in student exchanges abroad, enriching their education and strengthening their global learning experience."
                                                        : "Os melhores estudantes de cada curso têm a oportunidade de participar de intercâmbios estudantis no exterior, o que enriquece sua formação e fortalece seu aprendizado global.")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-6">
                                    <div className="row">
                                        <div className="col-4 col-sm-2 col-md-3">
                                            <span className="icono-sect-1 d-flex justify-content-center align-items-center">
                                                <i className="fa fa-users" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                        <div className="col-8 col-sm-10 col-md-9 part-info-sect-1">
                                            <span>
                                                {data.language === "es"
                                                    ? "Docentes de alto nivel"
                                                    : (data.language === "en"
                                                        ? "High-level teachers"
                                                        : "Docentes de alto nível")}
                                            </span>
                                            <p>
                                                {data.language === "es"
                                                    ? "Nuestros docentes son expertos en sus áreas, con una formación constante y experiencia profesional que asegura una enseñanza de calidad, adaptada a las necesidades del mundo actual."
                                                    : (data.language === "en"
                                                        ? "Our teachers are experts in their fields, with constant training and professional experience ensuring high-quality teaching, tailored to the needs of today's world."
                                                        : "Nossos professores são especialistas em suas áreas, com formação constante e experiência profissional que garantem ensino de qualidade, adaptado às necessidades do mundo atual.")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="section-information-2">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-5 part1-sect-2 d-flex justify-content-center align-items-center">
                            {/*<div className="row w-100 text-center">
                                <div className="col-md-12 mb-3">
                                    <a
                                        href="https://uteq.edu.ec/es/grado/carreras"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Revisa la oferta académica de la UTEQ"
                                        className="btn w-100"
                                    >
                                        Revisa nuestra oferta académica
                                    </a>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <a
                                        href="/admision2/calendarios-academicos"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Revisa los calendarios académicos"
                                        className="btn w-100"
                                    >
                                        Revisa el calendario académico
                                    </a>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <a
                                        href="/admision2/contacto"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Ir al Buzón de preguntas"
                                        className="btn w-100"
                                    >
                                        Buzón de preguntas
                                    </a>
                                </div>
                            </div>*/}

                            <div className="row w-100 text-center">
                                <div className="col-md-12 mb-3">
                                    <a
                                        href={`/${data.language}/grado/carreras`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={
                                            data.language === "es"
                                                ? "Revisa la oferta académica de la UTEQ"
                                                : (data.language === "en"
                                                    ? "Check out UTEQ's academic offerings"
                                                    : "Verifique a oferta acadêmica da UTEQ")
                                        }
                                        className="btn w-100"
                                    >
                                        {data.language === "es"
                                            ? "Revisa nuestra oferta académica"
                                            : (data.language === "en"
                                                ? "Check out our academic offerings"
                                                : "Verifique nossa oferta acadêmica")}
                                    </a>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <a
                                        href={`/${data.language}/admision/calendarios-academicos`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={
                                            data.language === "es"
                                                ? "Revisa los calendarios académicos"
                                                : (data.language === "en"
                                                    ? "Check out the academic calendars"
                                                    : "Verifique os calendários acadêmicos")
                                        }
                                        className="btn w-100"
                                    >
                                        {data.language === "es"
                                            ? "Revisa el calendario académico"
                                            : (data.language === "en"
                                                ? "Check out the academic calendar"
                                                : "Verifique o calendário acadêmico")}
                                    </a>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <a
                                        href={`/${data.language}/admision/contacto`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={
                                            data.language === "es"
                                                ? "Ir al Buzón de preguntas"
                                                : (data.language === "en"
                                                    ? "Go to the questions inbox"
                                                    : "Ir para a caixa de perguntas")
                                        }
                                        className="btn w-100"
                                    >
                                        {data.language === "es"
                                            ? "Buzón de preguntas"
                                            : (data.language === "en"
                                                ? "Questions inbox"
                                                : "Caixa de perguntas")}
                                    </a>
                                </div>
                            </div>

                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-7">
                            <div className="row">
                                {/*<div className="col-md-4 part2-sect-2 d-flex flex-column justify-content-center align-items-center">
                                    <span className="display-1 fw-bold">{listMetrics[0].total_carrera}</span>
                                    <p className="mt-2">Carreras</p>
                                </div>
                                <div className="col-md-4 part2-sect-2 d-flex flex-column justify-content-center align-items-center">
                                    <span className="display-1 fw-bold">{listMetrics[0].total_distributivo_nivelacion + listMetrics[0].total_distributivo_regular}</span>
                                    <p className="mt-2">Docentes</p>
                                </div>
                                <div className="col-md-4 part2-sect-2 d-flex flex-column justify-content-center align-items-center">
                                    <span className="display-1 fw-bold">{listMetrics[0].total_estudiante_regular + listMetrics[0].total_estudiante_nivelacion}</span>
                                    <p className="mt-2">Estudiantes</p>
                                </div>*/}
                                <div className="col-4 col-sm-4 col-md-4 part2-sect-2 d-flex flex-column justify-content-center align-items-center">
                                    <span className="display-1 fw-bold">{listMetrics[0].total_carrera} {/*34*/}</span>
                                    <p className="mt-2">
                                        {data.language === "es"
                                            ? "Carreras"
                                            : (data.language === "en"
                                                ? "Programs"
                                                : "Cursos")}
                                    </p>
                                </div>
                                <div className="col-4 col-sm-4 col-md-4 part2-sect-2 d-flex flex-column justify-content-center align-items-center">
                                    <span className="display-1 fw-bold">{listMetrics[0].total_distributivo_nivelacion + listMetrics[0].total_distributivo_regular} {/*200*/}</span>
                                    <p className="mt-2">
                                        {data.language === "es"
                                            ? "Docentes"
                                            : (data.language === "en"
                                                ? "Teachers"
                                                : "Professores")}
                                    </p>
                                </div>
                                <div className="col-4 col-sm-4 col-md-4 part2-sect-2 d-flex flex-column justify-content-center align-items-center">
                                    <span className="display-1 fw-bold">{listMetrics[0].total_estudiante_regular + listMetrics[0].total_estudiante_nivelacion} {/*15000*/}</span>
                                    <p className="mt-2">
                                        {data.language === "es"
                                            ? "Estudiantes"
                                            : (data.language === "en"
                                                ? "Students"
                                                : "Estudantes")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-information-4">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-8 col-lg-6">
                            <div className="panel-1-sect-4">
                                {/*<div className="d-flex flex-column justify-content-center h-100">
                                    <h2 className="mb-4">Fases de inscripción</h2>
                                    <p className="mb-4">
                                        A continuación te mostramos las fases del proceso de inscripción para que puedas organizarte y completar cada etapa de forma correcta. ¡Sigue estos pasos para asegurar tu lugar en la UTEQ!
                                    </p>
                                    <ol className="mb-4">
                                        <li>Registro nacional en SENESCYT</li>
                                        <li>Registro de inscripción en la UTEQ (Postúlate UTEQ Agregar enlace)</li>
                                        <li>Simulación de evaluación de competencias generales y específicas</li>
                                        <li>Evaluación por competencias generales y específicas</li>
                                        <li>Publicación de la nota de postulación</li>
                                        <li>Postulación de carrera</li>
                                        <li>Aceptación de cupo - SENESCYT</li>
                                    </ol>
                                    <a
                                        href="https://uteq.edu.ec/es/admision/proceso-de-admision"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Ver más sobre las fases del proceso de admisión"
                                        className="d-flex align-items-center justify-content-center"
                                    >
                                        Accede a la UTEQ  <i className="fa fa-arrow-circle-right fa-2x me-3"></i>
                                    </a>
                                </div>*/}

                                <div className="d-flex flex-column justify-content-center h-100">
                                    <h2 className="mb-4">
                                        {data.language === "es"
                                            ? "Proceso de inscripción"
                                            : (data.language === "en"
                                                ? "Enrollment Process"
                                                : "Processo de Inscrição")}
                                    </h2>
                                    <p className="mb-4">
                                        {data.language === "es"
                                            ? "A continuación te mostramos las fases del proceso de inscripción para que puedas organizarte y completar cada etapa de forma correcta. ¡Sigue estos pasos para asegurar tu lugar en la UTEQ!"
                                            : (data.language === "en"
                                                ? "Below, we show you the phases of the enrollment process so you can organize yourself and complete each step correctly. Follow these steps to secure your spot at UTEQ!"
                                                : "A seguir, mostramos as fases do processo de inscrição para que você possa se organizar e concluir cada etapa corretamente. Siga estas etapas para garantir seu lugar na UTEQ!")}
                                    </p>
                                    <ol className="mb-4">
                                        <li>{data.language === "es" ? "Registro nacional en MINEDEC" : (data.language === "en" ? "National Registration in MINEDEC" : "Registro Nacional no MINEDEC")}</li>
                                        <li>{data.language === "es" ? "Registro de inscripción en la UTEQ (Postúlate UTEQ)" : (data.language === "en" ? "Enrollment Registration at UTEQ (Postúlate UTEQ)" : "Registro de inscrição na UTEQ (Postúlate UTEQ)")}</li>
                                        <li>{data.language === "es" ? "Simulación de evaluación de competencias generales y específicas" : (data.language === "en" ? "Simulation of general and specific skills evaluation" : "Simulação de avaliação de competências gerais e específicas")}</li>
                                        <li>{data.language === "es" ? "Evaluación por competencias generales y específicas" : (data.language === "en" ? "Evaluation by general and specific competencies" : "Avaliação por competências gerais e específicas")}</li>
                                        <li>{data.language === "es" ? "Publicación de la nota de postulación" : (data.language === "en" ? "Publication of the application score" : "Publicação da nota de candidatura")}</li>
                                        <li>{data.language === "es" ? "Postulación de carrera" : (data.language === "en" ? "Career application" : "Postulação de carreira")}</li>
                                        <li>{data.language === "es" ? "Aceptación de cupo - MINEDEC" : (data.language === "en" ? "Acceptance of slot - MINEDEC" : "Aceitação de vaga - MINEDEC")}</li>
                                    </ol>
                                    <a
                                        href={`/${data.language}/admision/proceso-de-admision`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={data.language === "es"
                                            ? "Ver más sobre las fases del proceso de admisión"
                                            : (data.language === "en"
                                                ? "Learn more about the admission process phases"
                                                : "Saiba mais sobre as fases do processo de admissão")}
                                        className="d-flex align-items-center justify-content-center"
                                    >
                                        {data.language === "es"
                                            ? "Accede a la UTEQ"
                                            : (data.language === "en"
                                                ? "Access UTEQ"
                                                : "Acesse a UTEQ")}  <i className="fa fa-arrow-circle-right fa-2x me-3"></i>
                                    </a>
                                </div>

                            </div>
                        </div>
                        <div className="col-sm-12 col-md-4 col-lg-6 d-flex align-items-center justify-content-center">
                            <div className="ratio ratio-1x1 panel-2-sect-4">
                                <img
                                    src={`${IMAGES_ADMISSION_FOLDER}image-3-section-4.png`}
                                    alt="Imagen de la sección 4"
                                    className="img-fluid w-100 h-100"
                                />
                            </div>
                        </div>
                        {/*<div className="col-md-5 column-image-s4 d-flex justify-content-center">
                            <img src={`${IMAGES_ADMISSION_FOLDER}image-2-section-4.png`} alt="Imagen de la sección 4" className="img-fluid" />
                        </div>*/}
                    </div>
                </div>
            </section>

            <section className="section-information-6 mb-4">
                <div className="container">
                    {/*<div className="row text-center mt-2 m-4">
                        <h2>Vive la experiencia UTEQ</h2>
                    </div>*/}
                    <div className="row text-center mt-2 m-4">
                        <h2>
                            {data.language === "es"
                                ? "¡Vive la experiencia UTEQ!"
                                : (data.language === "en"
                                    ? "¡Experience UTEQ!"
                                    : "¡Viva a experiência UTEQ!")}
                        </h2>
                    </div>
                    <div className="row">
                        {/* Primer fila de videos */}
                        <div className="col-6 col-sm-6 col-md-3 col-lg-3 mb-4">
                            <div className="ratio vertical">

                                <video controls muted playsInline preload="metadata" className="w-100 h-100">
                                    <source src={`${VIDEOS_FOLDER}video-uteq-6.mp4`} type="video/mp4" />
                                </video>

                                {/*
                                    <iframe
                                    //src={`${IMAGES_ADMISSION_FOLDER}video-uteq-6.mp4`}
                                    src={`${VIDEOS_FOLDER}video-uteq-6.mp4`}
                                    title="Video 1"
                                    allowFullScreen
                                    sandbox=""></iframe>
                                */}

                            </div>
                        </div>
                        <div className="col-6 col-sm-6 col-md-3 col-lg-3 mb-4">
                            <div className="ratio vertical">

                                <video controls muted playsInline preload="metadata" className="w-100 h-100">
                                    <source src={`${VIDEOS_FOLDER}video-uteq-5.mp4`} type="video/mp4" />
                                </video>

                                {/*
                                <iframe
                                    //src={`${IMAGES_ADMISSION_FOLDER}video-uteq-5.mp4`}
                                    src={`${VIDEOS_FOLDER}video-uteq-5.mp4`}
                                    title="Video 1"
                                    allowFullScreen
                                    sandbox=""></iframe>
                                */}

                            </div>
                        </div>
                        <div className="col-6 col-sm-6 col-md-3 col-lg-3 mb-4">
                            <div className="ratio vertical">

                                <video controls muted playsInline preload="metadata" className="w-100 h-100">
                                    <source src={`${VIDEOS_FOLDER}video-uteq-2.mp4`} type="video/mp4" />
                                </video>

                                {/*
                                <iframe
                                    //src={`${IMAGES_ADMISSION_FOLDER}video-uteq-2.mp4`}
                                    src={`${VIDEOS_FOLDER}video-uteq-2.mp4`}
                                    title="Video 3"
                                    allowFullScreen
                                    sandbox=""></iframe>
                                */}

                            </div>
                        </div>
                        <div className="col-6 col-sm-6 col-md-3 col-lg-3 mb-4">
                            <div className="ratio vertical">

                                <video controls muted playsInline preload="metadata" className="w-100 h-100">
                                    <source src={`${VIDEOS_FOLDER}video-uteq-3.mp4`} type="video/mp4" />
                                </video>

                                {/*
                                <iframe
                                    //src={`${IMAGES_ADMISSION_FOLDER}video-uteq-3.mp4`}
                                    src={`${VIDEOS_FOLDER}video-uteq-3.mp4`}
                                    title="Video 4"
                                    allowFullScreen
                                    sandbox=""
                                ></iframe>
                                */}
                            </div>
                        </div>
                    </div>
                </div>
            </section><br />

            <section className="section-information-5 mt-4">
                <div className="container">
                    {/*<div className="row text-center m-4">
                        <h2>Enlaces de interés</h2>
                    </div>*/}
                    <div className="row text-center m-4">
                        <h2>
                            {data.language === "es"
                                ? "Enlaces de interés"
                                : (data.language === "en"
                                    ? "Links of interest"
                                    : "Links de interesse")}
                        </h2>
                    </div>
                    {/*<div className="row">
                        <div className="col-3">
                            <a href="https://www.registrounicoedusup.gob.ec/" target="_blank" rel="noopener noreferrer"
                                aria-label="Ver imagen 1 de registro único"
                                title="Haz clic para ir a la página web del Registro Único">
                                <div className="ratio ratio-16x9">
                                    <img src={`${IMAGES_ADMISSION_FOLDER}icono-registro-unico.png`} alt="Imagen 1" className="img-fluid" />
                                </div>
                            </a>
                        </div>
                        <div className="col-3">
                            <a href="https://postulate.uteq.edu.ec/loginpostulacion" target="_blank" rel="noopener noreferrer"
                                aria-label="Ver imagen 2 del proceso de postulación a UTEQ"
                                title="Haz clic para ir a la aplicación web Postúlate UTEQ">
                                <div className="ratio ratio-16x9">
                                    <img src={`${IMAGES_ADMISSION_FOLDER}icono-postulate-uteq.png`} alt="Imagen 2" className="img-fluid" />
                                </div>
                            </a>
                        </div>
                        <div className="col-3">
                            <a href="https://acepta.registrounicoedusup.gob.ec/auth/login" target="_blank" rel="noopener noreferrer"
                                aria-label="Ver imagen 3 del proceso de aceptación de cupo"
                                title="Haz clic para ir a la Plataforma de aceptación de cupos de instituciones de educación superior públicas">
                                <div className="ratio ratio-16x9">
                                    <img src={`${IMAGES_ADMISSION_FOLDER}icono-aceptacion-de-cupo.png`} alt="Imagen 3" className="img-fluid" />
                                </div>
                            </a>
                        </div>
                        <div className="col-3">
                            <a href="https://sga.uteq.edu.ec/loginsga?ret=/" target="_blank" rel="noopener noreferrer"
                                aria-label="Ver imagen 4 relacionada con el SGA"
                                title="Haz clic para ir a la aplicación web SGA">
                                <div className="ratio ratio-16x9">
                                    <img src={`${IMAGES_ADMISSION_FOLDER}icono-sga.png`} alt="Imagen 4" className="img-fluid" />
                                </div>
                            </a>
                        </div>
                    </div>*/}

                    <div className="row">
                        <div className="col-6 col-sm-3 col-md-3 col-lg-3">
                            <a
                                href="https://www.registrounicoedusup.gob.ec/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={data.language === "es" ? "Ver imagen 1 de registro único" : (data.language === "en" ? "View image 1 of the unique registration" : "Ver imagem 1 do registro único")}
                                title={data.language === "es" ? "Haz clic para ir a la página web del Registro Único" : (data.language === "en" ? "Click to go to the Unique Registration website" : "Clique para ir para a página de Registro Único")}
                            >
                                <div className="ratio ratio-16x9">
                                    <img
                                        src={`${IMAGES_ADMISSION_FOLDER}icono-registro-unico.png`}
                                        alt={data.language === "es" ? "Imagen 1" : (data.language === "en" ? "Image 1" : "Imagem 1")}
                                        className="img-fluid"
                                    />
                                </div>
                            </a>
                        </div>
                        <div className="col-6 col-sm-3 col-md-3 col-lg-3">
                            <a
                                href="https://postulate.uteq.edu.ec/loginpostulacion"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={data.language === "es" ? "Ver imagen 2 del proceso de postulación a UTEQ" : (data.language === "en" ? "View image 2 of the UTEQ application process" : "Ver imagem 2 do processo de candidatura da UTEQ")}
                                title={data.language === "es" ? "Haz clic para ir a la aplicación web Postúlate UTEQ" : (data.language === "en" ? "Click to go to the UTEQ Postulate application" : "Clique para ir para o aplicativo Postule-se UTEQ")}
                            >
                                <div className="ratio ratio-16x9">
                                    <img
                                        src={`${IMAGES_ADMISSION_FOLDER}icono-postulate-uteq.png`}
                                        alt={data.language === "es" ? "Imagen 2" : (data.language === "en" ? "Image 2" : "Imagem 2")}
                                        className="img-fluid"
                                    />
                                </div>
                            </a>
                        </div>
                        <div className="col-6 col-sm-3 col-md-3 col-lg-3">
                            <a
                                href="https://acepta.registrounicoedusup.gob.ec/auth/login"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={data.language === "es" ? "Ver imagen 3 del proceso de aceptación de cupo" : (data.language === "en" ? "View image 3 of the seat acceptance process" : "Ver imagem 3 do processo de aceitação de vaga")}
                                title={data.language === "es" ? "Haz clic para ir a la Plataforma de aceptación de cupos de instituciones de educación superior públicas" : (data.language === "en" ? "Click to go to the public higher education institution seat acceptance platform" : "Clique para ir para a plataforma de aceitação de vaga de instituições de ensino superior públicas")}
                            >
                                <div className="ratio ratio-16x9">
                                    <img
                                        src={`${IMAGES_ADMISSION_FOLDER}icono-aceptacion-de-cupo.png`}
                                        alt={data.language === "es" ? "Imagen 3" : (data.language === "en" ? "Image 3" : "Imagem 3")}
                                        className="img-fluid"
                                    />
                                </div>
                            </a>
                        </div>
                        <div className="col-6 col-sm-3 col-md-3 col-lg-3">
                            <a
                                href="https://sga.uteq.edu.ec/loginsga?ret=/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={data.language === "es" ? "Ver imagen 4 relacionada con el SGA" : (data.language === "en" ? "View image 4 related to the SGA" : "Ver imagem 4 relacionada com o SGA")}
                                title={data.language === "es" ? "Haz clic para ir a la aplicación web SGA" : (data.language === "en" ? "Click to go to the SGA web application" : "Clique para ir para o aplicativo web SGA")}
                            >
                                <div className="ratio ratio-16x9">
                                    <img
                                        src={`${IMAGES_ADMISSION_FOLDER}icono-sga.png`}
                                        alt={data.language === "es" ? "Imagen 4" : (data.language === "en" ? "Image 4" : "Imagem 4")}
                                        className="img-fluid"
                                    />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-information-3">
                <div className="container">
                    <div className="row text-center m-4">
                        <h2>{data.language === "es" ? "Instructivos y accesos" : (data.language === "en" ? "Guides and access" : "Instruções e acessos")}</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-center mb-4">
                            <div className="panel-doc-sect-3 card">
                                <img
                                    src={`${IMAGES_ADMISSION_FOLDER}manual-de-acceso-al-sga-y-matriculacion.png`}
                                    alt={data.language === "es" ? "Imagen Manual de acceso al SGA y matriculación" : (data.language === "en" ? "Image Manual for SGA access and enrollment" : "Imagem Manual de acesso ao SGA e matrícula")}
                                    className="img-fluid mx-auto d-block mt-3"
                                />
                                <div className="card-body">
                                    <h5 className="card-title w-100">
                                        {data.language === "es" ? "Manual de acceso al SGA y matriculación" :
                                            (data.language === "en" ? "Manual for SGA access and enrollment" : "Manual de acesso ao SGA e matrícula")}
                                    </h5>
                                    <a
                                        href="https://uteq.edu.ec/assets/docs/admission/docx-uteq-5-0001.pdf"
                                        target="_blank"
                                        className="btn"
                                        rel="noopener noreferrer"
                                        aria-label={data.language === "es" ? "Descargar documento de Manual de acceso al SGA y matriculación" :
                                            (data.language === "en" ? "Download Manual for SGA access and enrollment" : "Baixar Manual de acesso ao SGA e matrícula")}
                                    >
                                        {data.language === "es" ? "Descargar" : (data.language === "en" ? "Download" : "Baixar")}
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 text-center mb-4">
                            <div className="panel-doc-sect-3 card">
                                <img
                                    src={`${IMAGES_ADMISSION_FOLDER}acceso-al-correo-institucional.png`}
                                    className="img-fluid mx-auto d-block mt-3"
                                    alt={data.language === "es" ? "Imagen del acceso al correo institucional de la UTEQ" :
                                        (data.language === "en" ? "Image of direct access to UTEQ institutional email" : "Imagem de acesso direto ao e-mail institucional da UTEQ")}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {data.language === "es" ? "Acceso directo al correo institucional" :
                                            (data.language === "en" ? "Direct access to institutional email" : "Acesso direto ao e-mail institucional")}
                                    </h5>
                                    <a
                                        href="https://accounts.google.com/signin/v2/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&service=mail&hd=uteq.edu.ec&sacu=1&flowName=GlifWebSignIn&flowEntry=AddSession#identifier"
                                        className="btn"
                                        aria-label={data.language === "es" ? "Acceder al correo institucional de la UTEQ" :
                                            (data.language === "en" ? "Access UTEQ institutional email" : "Acessar o e-mail institucional da UTEQ")}
                                        title={data.language === "es" ? "Haz clic para acceder al correo institucional de la UTEQ" :
                                            (data.language === "en" ? "Click to access the UTEQ institutional email" : "Clique para acessar o e-mail institucional da UTEQ")}
                                        rel="noopener noreferrer"
                                    >
                                        {data.language === "es" ? "Acceder" : (data.language === "en" ? "Access" : "Acessar")}
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 text-center mb-4">
                            <div className="panel-doc-sect-3 card">
                                <img
                                    src={`${IMAGES_ADMISSION_FOLDER}guia-de-usuario.png`}
                                    className="img-fluid mx-auto d-block mt-3"
                                    alt={data.language === "es" ? "Imagen de la Guía para el acceso al sistema de matrícula y SGA" :
                                        (data.language === "en" ? "Image of the Guide for access to the enrollment system and SGA" : "Imagem do Guia para o acesso ao sistema de matrícula e SGA")}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {data.language === "es" ? "Guía para el acceso a Postúlate UTEQ" :
                                            (data.language === "en" ? "Guide to access Postúlate UTEQ" : "Guia para acessar o Postúlate UTEQ")}
                                    </h5>
                                    <a
                                        href="https://www.uteq.edu.ec/assets/docs/admission/Guia_usuario_admision_2023_SPA.pdf"
                                        className="btn"
                                        aria-label={data.language === "es" ? "Acceder a la Guía para el acceso a Postúlate UTEQ" :
                                            (data.language === "en" ? "Access the Guide for access to Postúlate UTEQ" : "Acessar o Guia para acessar o Postúlate UTEQ")}
                                        title={data.language === "es" ? "Haz clic para acceder a la Guía para el acceso a Postúlate UTEQ" :
                                            (data.language === "en" ? "Click to access the Guide for access to Postúlate UTEQ" : "Clique para acessar o Guia para acessar o Postúlate UTEQ")}
                                        rel="noopener noreferrer"
                                    >
                                        {data.language === "es" ? "Descargar" : (data.language === "en" ? "Download" : "Baixar")}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-information-7 mt-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-12">
                            <div className="ratio ratio-16x9 panel-vd">
                                <ReactPlayer
                                    className="embed-responsive-item g-0"
                                    width="100%"
                                    height="100%"
                                    playing={false}
                                    playsinline={true}
                                    muted={false}
                                    url="https://youtu.be/HpTLZlZfmY4?showinfo=0&enablejsapi=1&origin=https://www.uteq.edu.ec"
                                    controls={false} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </div>

    </>);
};