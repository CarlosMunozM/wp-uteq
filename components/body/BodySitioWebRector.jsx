import React from 'react';
import { SSRProvider } from "react-bootstrap";
import { IMG_PROFFESIONAL_AUTHORITY_FOLDER } from 'config';
import { Accordion } from "react-bootstrap";


export { BodySitioWebRector };


function BodySitioWebRector(data) {

    const BookList = () => {
        const books = [
            {
                title: {
                    en: "Current Issues in Environmental Law",
                    pt: "Questões Atuais em Direito Ambiental",
                    es: "Cuestiones actuales del derecho ambiental",
                },
                year: "2017",
                type: {
                    en: "Book",
                    pt: "Livro",
                    es: "Libro",
                },
                image: "/assets/img/cv/libro-cuestiones-actuales-del-derecho-ambiental-uteq.webp",
            },
            {
                title: {
                    en: "Manual of Mercantile Legislation: Theory and Practice",
                    pt: "Manual de Legislação Mercantil: Teoria e Prática",
                    es: "Manual de Legislación Mercantil. Teoría y Práctica",
                },
                year: "2015",
                type: {
                    en: "Book",
                    pt: "Livro",
                    es: "Libro",
                },
                image: "/assets/img/cv/libro-manual-de-legislacion-mercantil-teoria-y-practica-uteq.webp",
            },
            {
                title: {
                    en: "Labor Contracts in Ecuador: Systematization and Practice",
                    pt: "Contratos de Trabalho no Equador: Sistematização e Prática",
                    es: "Los contratos laborales en el Ecuador: Sistematización y Práctica",
                },
                year: "----",
                type: {
                    en: "Book",
                    pt: "Livro",
                    es: "Libro",
                },
                image: "/assets/img/cv/libro-los-contratos-laborales-en-el-ecuador-uteq.webp",
            },
            {
                title: {
                    en: "Constitutional Process in Ecuador",
                    pt: "Processo Constitucional no Equador",
                    es: "Proceso Constitucional en el Ecuador",
                },
                year: "2015",
                type: {
                    en: "Book",
                    pt: "Livro",
                    es: "Libro",
                },
                image: "/assets/img/cv/libro-proceso-constitucional-en-el-ecuador-uteq.webp",
            },
        ];

        return (
            <div className="col-md-11 mx-auto mt-4">
                <div className="row g-0">
                    <div className="card pnl-panel-history">
                        <div className="card-header pnl-header-history">
                            {data.language === "es"
                                ? "Registros de obras"
                                : data.language === "en"
                                    ? "Works Records"
                                    : "Registros de Obras"}
                        </div>
                        <div className="card-body pnl-body-history">
                            <div className="row w-100 mx-auto">
                                {books.map((book, index) => (
                                    <div
                                        key={index}
                                        className="col-9 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2 pnl-box-info-link mx-auto"
                                    >
                                        <div className="pnl-box-book">
                                            <img
                                                src={book.image}
                                                className="img-book-portrait img-fluid rounded mx-auto d-block"
                                                alt={book.title[data.language]}
                                            />
                                            <div className="row">
                                                <h2 className="pnl-box-sect-title">
                                                    {book.title[data.language]}
                                                </h2>
                                                <h2 className="pnl-box-body">
                                                    <span className="badge bg-secondary bg-year-b">
                                                        {book.year}
                                                    </span>
                                                    &nbsp;&nbsp;
                                                    <span className="badge bg-success bg-type-b">
                                                        {book.type[data.language]}
                                                    </span>
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };



    function renderInformationPart1(language) {
        const rectorcv = {
            es: {
                title: "Una gestión transformadora e histórica en la primera Universidad Agropecuaria del Ecuador ¡Dejamos huellas!",
                position: "Vicerrector académico"
            },
            en: {
                title: "A transformative and historic management at the first Agricultural University in Ecuador We leave a mark!",
                position: "Academic Vice-Rector"
            },
            pt: {
                title: "Uma gestão transformadora e histórica na primeira Universidade Agrícola do Equador Nós deixamos uma marca!",
                position: "Vice-reitor acadêmico"
            }
        };

        return (
            <>
                <div className="hero-1">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-sm-12 col-md-6">
                                <div className="hero-content mx-auto">
                                    <div className="hero-text mx-auto">
                                        <h1>{rectorcv[language].title}</h1>
                                    </div>
                                    <div className="hero-text mt-3 mx-auto">
                                        <h2>Dr. Eduardo Díaz Ocampo, PhD.</h2>
                                        <h3></h3>
                                        <div className="typing-effect">{rectorcv[language].position}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 pr-sm-0 mx-auto">
                                <div className="hero-image">
                                    <img src={`${IMG_PROFFESIONAL_AUTHORITY_FOLDER}fotografia-profesional-rector.webp`} alt="Fotografía del Rector" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    function renderInformationPart2(language) {
        const listKeys = [1, 2, 3, 4, 5, 6];

        return (
            <>
                <div className="col-md-11 mx-auto mt-4">
                    <div className="row g-2">
                        <div className="col-md-12 mb-3">
                            <div className="card pnl-panel-history">
                                <div className="card-header pnl-header-history">
                                    {language === "es"
                                        ? "Galería fotográfica"
                                        : language === "en"
                                            ? "Photo gallery"
                                            : "Galeria de fotos"}
                                </div>
                                <div className="card-body pnl-body-history">
                                    <div className="row gx-2 gy-2">
                                        {listKeys.map((index) => (
                                            <div className="col-md-4" key={index}>
                                                <div className="ratio ratio-4x3 pnl-photg">
                                                    <img
                                                        src={IMG_PROFFESIONAL_AUTHORITY_FOLDER + `fotografia-rector-${index}.webp`}
                                                        className="ratio ratio-4x3"
                                                        alt={`Fotografía del Rector - Campus Central ${index}`}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    function renderInformationPart3(language) {
        const listAcad = [
            {
                institution: "Universidad Técnica de Babahoyo",
                degree: {
                    es: "Licenciado en Ciencia de la Educación Especialización de Historia y Geografía",
                    en: "Bachelor's in Education with Specialization in History and Geography",
                    pt: "Licenciado em Educação com Especialização em História e Geografia",
                },
                year: "2010",
            },
            {
                institution: "Universidad Técnica de Babahoyo",
                degree: {
                    es: "Profesor de Segunda Enseñanza en la Especialización de Historia y Geografía",
                    en: "High School Teacher with Specialization in History and Geography",
                    pt: "Professor do Ensino Secundário com Especialização em História e Geografia",
                },
                year: "2010",
            },
            {
                institution: "Universidad Técnica Estatal de Quevedo",
                degree: {
                    es: "Diplomado Superior en Práctica Docente Universitaria",
                    en: "Advanced Diploma in University Teaching Practice",
                    pt: "Diploma Avançado em Prática Docente Universitária",
                },
                year: "2003",
            },
            {
                institution: "Universidad Técnica Estatal de Quevedo",
                degree: {
                    es: "Especialista en Educación Superior",
                    en: "Specialist in Higher Education",
                    pt: "Especialista em Educação Superior",
                },
                year: "2003",
            },
            {
                institution: "Universidad Técnica Estatal de Quevedo",
                degree: {
                    es: "Magister en Desarrollo Curricular",
                    en: "Master in Curriculum Development",
                    pt: "Mestre em Desenvolvimento Curricular",
                },
                year: "2003",
            },
            {
                institution: "Universidad Técnica Particular de Loja",
                degree: {
                    es: "Abogado",
                    en: "Lawyer",
                    pt: "Advogado",
                },
                year: "2015",
            },
            {
                institution: "Universidad Técnica Particular de Loja",
                degree: {
                    es: "Doctor en Jurisprudencia",
                    en: "Doctor of Jurisprudence",
                    pt: "Doutor em Jurisprudência",
                },
                year: "2008",
            },
            {
                institution: "Universidad Técnica Particular de Loja",
                degree: {
                    es: "Licenciado en Ciencias Sociales, Políticas y Económicas",
                    en: "Bachelor in Social, Political, and Economic Sciences",
                    pt: "Licenciado em Ciências Sociais, Políticas e Econômicas",
                },
                year: "2003",
            },
            {
                institution: "Universidad de Guayaquil",
                degree: {
                    es: "Especialista en Control Gubernamental",
                    en: "Specialist in Governmental Control",
                    pt: "Especialista em Controle Governamental",
                },
                year: "2017",
            },
            {
                institution: "Universidad de La Hábana",
                degree: {
                    es: "Doctor en Ciencias Pedagógicas - Título de Doctor o PhD válido para el Ejercicio de la Docencia, Investigación y Gestión en Educación Superior.",
                    en: "Doctor in Pedagogical Sciences - Title of Doctor or PhD valid for Teaching, Research, and Management in Higher Education.",
                    pt: "Doutor em Ciências Pedagógicas - Título de Doutor ou PhD válido para o Exercício do Ensino, Pesquisa e Gestão no Ensino Superior.",
                },
                year: "2019",
            },
        ];

        return (
            <>
                <Accordion className="g-0">
                    <Accordion.Item eventKey={0}>
                        <Accordion.Header>
                            {language === "es"
                                ? "Formación Académica"
                                : language === "en"
                                    ? "Academic background"
                                    : "Formação acadêmica"}
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className="row g-0">
                                <div className="col-md-12 mb-3">
                                    <div className="wrapper">
                                        <div className="center-line">
                                            <i className="scroll-icon fa fa-code-fork"></i>
                                        </div>
                                        <div className="row">
                                            {listAcad.map((item, index) => (
                                                <div key={index} className={`row row-${index % 2 === 0 ? "1" : "2"}`}>
                                                    <section>
                                                        <i className="icon fa fa-university"></i>
                                                        <div className="details">
                                                            <span className="title">{item.institution}</span>
                                                        </div>
                                                        <p>
                                                            {item.degree[language] || item.degree.es}
                                                        </p>
                                                        <div className="bottom">
                                                            <i className="type-proxm">{item.year}</i>
                                                        </div>
                                                    </section>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </>
        );
    }

    function renderInformationPart4(language) {
        const listPublications = [
            {
                title: "Optimización basada en Mallas Variables: Caso de estudio Viajante de Comercio",
                link: "https://www.laccei.org/LACCEI2014-Guayaquil/RefereedPapers/RP259.pdf",
                year: "2014",
                source: "LACCEI’2014 (Guayaquil-Ecuador)"
            },
            {
                title: "La comunicación intercultural educativa, una mirada desde la sistematización formativa en la educación superior",
                link: "https://revistas.ult.edu.cu/index.php/didascalia/article/view/370/368",
                year: "2015",
                source: "Revista DISC@LIA: Didáctica y Educación (ISSN: 2224-2643)"
            },
            {
                title: "La creación de valor en las universidades desde la perspectiva organizacional: Un análisis empírico en América Latina",
                link: "#",
                year: "2015",
                source: "Proceedings of edulearn 14 Conference (ISBN: 978-84-617-0557-3)"
            },
            {
                title: "La Formación en la Justicia Indígena como Alternativa frente al Pluralismo Jurídico",
                link: "https://dialnet.unirioja.es/descarga/articulo/5456402.pdf",
                year: "2015",
                source: "Derecho y Cambio Social (ISSN: 2224-4131)"
            },
            {
                title: "La influencia de la coordinación relacional en la posición de las universidades en el ranking de calidad en el Ecuador",
                link: "#",
                year: "2015",
                source: "Proceedings of INTED2014 Conference (ISBN: 978-84-617-8412-0)"
            },
            {
                title: "La responsabilidad social empresarial. La empresa responsable con el ambiente",
                link: "http://www.mpsp.mp.br/portal/page/portal/documentacao_e_divulgacao/doc_biblioteca/bibli_servicos_produtos/bibli_boletim/bibli_bol_2006/RTrib_n.970.10.PDF",
                year: "2016",
                source: "Revista Dos Tribunais (ISSN: 349275)"
            },
            {
                title: "La Justicia Indígena y el Pluralismo Jurídico en Ecuador: El constitucionalismo en América Latina",
                link: "https://dialnet.unirioja.es/descarga/articulo/5456253.pdf",
                year: "2016",
                source: "Revista Derecho y Cambio social (ISSN-e: 2224-4131)"
            },
            {
                title: "El constitucionalismo en América Latina. La Justicia Indígena y el pluralismo jurídico en Ecuador",
                link: "https://revistas.unal.edu.co/index.php/peju/article/view/75112/pdf",
                year: "2016",
                source: "Pensamiento jurídico (ISSN: 0122-1108)"
            },
            {
                title: "El conflicto de competencia en la justicia indígena del Ecuador",
                link: "https://revistas.unab.edu.co/index.php/sociojuridico/article/view/2503/2139",
                year: "2016",
                source: "Revista Temas Socio - Jurídicos (ISSN-e: 2590-8901)"
            },
            {
                title: "El Derecho Vivo y el ordenamiento jurídico ecuatoriano",
                link: "https://www.pensamientopenal.com.ar/system/files/2017/03/doctrina45068.pdf",
                year: "2017",
                source: "Revista Pensamiento Penal (ISSN: 1853-4554)"
            },
        ];

        return (
            <>
                <div className="card pnl-panel-history">
                    <div className="card-header pnl-header-history">
                        {language === "es"
                            ? "Publicaciones"
                            : language === "en"
                                ? "Publications"
                                : "Publicações"}
                    </div>
                    <div className="card-body pnl-body-history">
                        <div className="row g-2">
                            {listPublications.map((publication, index) => (
                                <div className="col-md-6 col-lg-4 col-xl-4 col-xxl-4" key={index}>
                                    <a href={publication.link}
                                        target="_blank"
                                        aria-label={`link publicacion indv ${index}`}
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        className="link-news-dep"
                                        title={`Ver documento - ${publication.title}`}>
                                        <div className="p-3 pnl-publication-profs">
                                            <div className="row g-2">
                                                <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                                    <img
                                                        alt={`Ícono de la publicación científica ${publication.title}`}
                                                        className="img-portrait-news p-3"
                                                        src={`${IMG_PROFFESIONAL_AUTHORITY_FOLDER}publicacion-cientifica-uteq.webp`}
                                                    />
                                                </div>
                                                <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                                    <div className="text-news-other">{publication.title}</div>
                                                    <div className="date-news">
                                                        <span className="badge sticker-tipo-dept" style={{ backgroundColor: "#025a27", color: "#FFF" }}>{publication.year}</span>&nbsp;&nbsp;
                                                        <i className="fa fa-history"></i>&nbsp;&nbsp;{publication.source}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        );
    }

    function renderInformationPart5(language) {
        const listProjects = [
            {
                title: {
                    es: "Director del Proyecto de Educación “Coordinación Relacional” (Ecuador)",
                    en: "Director of Education Project “Relational Coordination” (Ecuador)",
                    pt: "Diretor do Projeto de Educação “Coordenação Relacional” (Equador)"
                },
                link: "#",
                imageSrc: `${IMG_PROFFESIONAL_AUTHORITY_FOLDER}proyecto-coordinacion-relacional-uteq.webp`,
                startYear: "2015"
            },
            {
                title: {
                    es: "Pluralismo Jurídico en Ecuador (Ecuador)",
                    en: "Legal Pluralism in Ecuador (Ecuador)",
                    pt: "Pluralismo Jurídico no Equador (Equador)"
                },
                link: "#",
                imageSrc: `${IMG_PROFFESIONAL_AUTHORITY_FOLDER}pluralismo-juridico-en-ecuador-uteq.webp`,
                startYear: "2015"
            },
            {
                title: {
                    es: "Resiliencia al Cambio Climático (España)",
                    en: "Resilience to Climate Change (Spain)",
                    pt: "Resiliência às Mudanças Climáticas (Espanha)"
                },
                link: "#",
                imageSrc: `${IMG_PROFFESIONAL_AUTHORITY_FOLDER}resiliencia-al-cambio-climatico-uteq.webp`,
                startYear: "2017"
            },
            {
                title: {
                    es: "Excelencia universitaria. Formación didáctica y profesionalización docente (Vigente)",
                    en: "University Excellence. Didactic Training and Teacher Professionalization (Current)",
                    pt: "Excelência Universitária. Formação Didática e Profissionalização de Professores (Vigente)"
                },
                link: "#",
                imageSrc: `${IMG_PROFFESIONAL_AUTHORITY_FOLDER}excelencia-universitaria-uteq.webp`,
                startYear: "2018"
            },
        ];

        return (
            <>
                <div className="col-md-11 mx-auto mt-4">
                    <div className="card pnl-panel-history">
                        <div className="card-header pnl-header-history">
                            {language === "es"
                                ? "Participación en proyectos"
                                : language === "en"
                                    ? "Project participation"
                                    : "Participação em projetos"}
                        </div>
                        <div className="card-body pnl-body-history">
                            <div className="row w-100 mx-auto">
                                {listProjects.map((project, index) => (
                                    <div className="col-md-6 mt-2" key={index}>
                                        <div className="item item-sld-mult">
                                            <div className="work">
                                                <a href={project.link} target="_blank" aria-label={`link project-${index}`} style={{ textDecoration: "none" }}>
                                                    <div className="ratio ratio-21x9">
                                                        <img src={project.imageSrc} alt={project.title[data.language]} />
                                                    </div>
                                                    <div className="text-pn text-center p-2">
                                                        {project.title[data.language]} - Inicio: {project.startYear}
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    function renderInformationPart6(language) {
        const listMetrics = [
            { icon: "/assets/img/icono-publicaciones-cientificas.webp", number: 11, titles: { es: "Publicaciones científicas", en: "Scientific Publications", pt: "Publicações Científicas" } },
            { icon: "/assets/img/icono-participaciones-en-poyectos.webp", number: 4, titles: { es: "Participaciones en proyectos", en: "Participation in Projects", pt: "Participação em Projetos" } },
            { icon: "/assets/img/icono-participaciones-en-eventos-científicos.webp", number: 22, titles: { es: "Participaciones en eventos científicos", en: "Participation in Scientific Events", pt: "Participação em Eventos Científicos" } },
            { icon: "/assets/img/icono-programas-de-posgrados-impartidos.webp", number: 6, titles: { es: "Programas de Posgrados impartidos", en: "Postgraduate Programs Offered", pt: "Programas de Pós-Graduação Oferecidos" } },
            { icon: "/assets/img/icono-reconocimientos.webp", number: 19, titles: { es: "Reconocimientos", en: "Awards", pt: "Reconhecimentos" } },
            { icon: "/assets/img/icono-registros-de-obras.webp", number: 4, titles: { es: "Registros de obras", en: "Records of Works", pt: "Registros de Obras" } },
        ];

        const resumecv = {
            es: "Inicia en la docencia en la Universidad Técnica Estatal de Quevedo, en la asignatura Prácticas de Venta, el 13 de julio de 1998, y el 23 de marzo de 1999 concursa y obtiene la Categoría Docente de Auxiliar en la asignatura: Administración de Ventas. El 17 de abril de 2001 ascendió a la Categoría Docente de Agregado y el 20 de mayo de 2003 a la Categoría Docente Principal.<br />Desde el 22 de febrero de 2010 se desempeña como Director de la Escuela de Gestión Empresarial para el período 2010/2011. Director de Posgrado desde el 1 de julio de 2010 hasta diciembre de 2013, siendo ratificado en enero de 2014 hasta el 27 de abril de 2015. Rector, electo de conformidad al Art.55 de la LOES, Art. 16 de la LOSEP y resolución segunda de Consejo Universitario de marzo 3 de 2015, se nombra para el periodo comprendido del 28 de abril del 2015 hasta el 27 de abril de 2020.",
            en: "Begins teaching at the Technical State University of Quevedo, in the subject Sales Practices, on July 13, 1998, and on March 23, 1999, he competed for and obtained the Teaching Category of Assistant in the subject: Sales Management. On April 17, 2001, he was promoted to the Teaching Category of Associate and on May 20, 2003, to the Teaching Category of Principal.<br />Since February 22, 2010, he has served as Director of the School of Business Management for the 2010/2011 period. Director of Postgraduate Studies from July 1, 2010, until December 2013, being reconfirmed in January 2014 until April 27, 2015. Rector, elected in accordance with Art. 55 of the LOES, Art. 16 of the LOSEP, and the second resolution of the University Council of March 3, 2015, was appointed for the period from April 28, 2015, until April 27, 2020.",
            pt: "Inicia na docência na Universidade Técnica Estatal de Quevedo, na disciplina Práticas de Venda, em 13 de julho de 1998, e em 23 de março de 1999, concorre e obtém a Categoria Docente de Auxiliar na disciplina: Administração de Vendas. Em 17 de abril de 2001, foi promovido à Categoria Docente de Agregado e em 20 de maio de 2003, à Categoria Docente Principal.<br />Desde 22 de fevereiro de 2010, atua como Diretor da Escola de Gestão Empresarial para o período de 2010/2011. Diretor de Pós-Graduação de 1º de julho de 2010 até dezembro de 2013, sendo reconfirmado em janeiro de 2014 até 27 de abril de 2015. Reitor, eleito de acordo com o Art. 55 da LOES, Art. 16 da LOSEP e segunda resolução do Conselho Universitário de 3 de março de 2015, foi nomeado para o período de 28 de abril de 2015 a 27 de abril de 2020."
        };

        return (
            <>
                <div className="col-md-11 mx-auto mt-1">
                    <div className="row g-0">
                        <div className="card pnl-panel-history">
                            <div className="card-header pnl-header-history">
                                {language === "es"
                                    ? "Experiencia profesional"
                                    : language === "en"
                                        ? "Professional experience"
                                        : "Experiência profissional"}
                            </div>
                            <div className="card-body pnl-body-history">
                                <div className="col-md-12">
                                    <p className="card-text" dangerouslySetInnerHTML={{ __html: resumecv[language] }}></p>
                                </div>
                                <div className="col-md-12 mt-4">
                                    <div className="row">
                                        {listMetrics.map((item, index) => (
                                            <div key={index} className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-2">
                                                <div className="card panel-metcs-bx">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-4 col-sm-5 col-md-4 col-lg-4 col-xl-4">
                                                                <img className="img-fluid img-metcs-bx" src={item.icon} alt={`Ícono de la métrica ${item.titles[language]}`} />
                                                            </div>
                                                            <div className="col-8 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                                                                <h4 className="number-metcs-bx">{item.number}</h4>
                                                                <div className="sect-title-metcs">
                                                                    <h5 className="title-metcs-bx">{item.titles[language]}</h5>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    const renderTextInfo = () => {
        return (<>
            <div className="row g-0">
                {renderInformationPart1(data.language)}
                {renderInformationPart6(data.language)}
                <div className="col-md-11 mx-auto mt-4">
                    {renderInformationPart3(data.language)}
                </div>
                {renderInformationPart2(data.language)}
                <div className="col-md-11 mx-auto mt-4">
                    <div className="row g-1">
                        {renderInformationPart4(data.language)}
                    </div>
                </div>
                {renderInformationPart5(data.language)}
                {BookList()}
            </div >
        </>);
    }

    return (<>
        {<SSRProvider>{renderTextInfo()}</SSRProvider>}
    </>);
}