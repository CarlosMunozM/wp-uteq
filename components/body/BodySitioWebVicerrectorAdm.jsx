import React from 'react';
import { SSRProvider, Accordion } from "react-bootstrap";
import { IMG_PROFFESIONAL_AUTHORITY_FOLDER } from 'config';

function BodySitioWebVicerrectorAdm(data) {

    const accordionItems = [
        {
            key: 0,
            title: {
                es: 'Formación Académica',
                en: 'Academic background',
                pt: 'Formação acadêmica',
            },
            content: (
                <div className="row g-0">
                    <div className="col-md-12 mb-3">
                        <div className="wrapper">
                            <div className="center-line">
                                <i className="scroll-icon fa fa-code-fork"></i>
                            </div>
                            {renderAcademicBackground()}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: 1,
            title: {
                es: 'Galería fotográfica',
                en: 'Photo gallery',
                pt: 'Galeria de fotos',
            },
            content: (
                <div className="row gx-2 gy-2">
                    {renderPhotoGallery()}
                </div>
            ),
        },
        {
            key: 2,
            title: {
                es: 'Publicaciones científicas',
                en: 'Scientific publications',
                pt: 'Publicações científicas',
            },
            content: (
                <div className="row g-1">
                    {renderScientificPublications()}
                </div>
            ),
        },
        {
            key: 3,
            title: {
                es: 'Ponencias',
                en: 'Lectures',
                pt: 'Palestras',
            },
            content: (
                <div className="row gx-2 gy-2">
                    {renderAcademicProjects()}
                </div>
            ),
        },
    ];

    function renderAccordionItems() {
        return accordionItems.map((item) => (
            <Accordion.Item eventKey={item.key} key={item.key}>
                <Accordion.Header>
                    {item.title[data.language]}
                </Accordion.Header>
                <Accordion.Body>
                    {item.content}
                </Accordion.Body>
            </Accordion.Item>
        ));
    }

    function renderPhotoGallery() {
        const photoPaths = [
            "fotografia-vicerrectora-adm-1.webp",
            "fotografia-vicerrectora-adm-2.webp",
            "fotografia-vicerrectora-adm-3.webp",
            "fotografia-vicerrectora-adm-4.webp",
            "fotografia-vicerrectora-adm-5.webp",
            "fotografia-vicerrectora-adm-6.webp",
        ];

        return (
            <>
                {photoPaths.map((photoPath, index) => (
                    <div className="col-md-4" key={index}>
                        <div className="ratio ratio-4x3 pnl-photg">
                            <img
                                src={`${IMG_PROFFESIONAL_AUTHORITY_FOLDER}${photoPath}`}
                                className="ratio ratio-4x3"
                                alt="Fotografía de la Vicerrectora Administrativa - Campus Central"
                            />
                        </div>
                    </div>
                ))}
            </>
        );
    }

    function renderAcademicProjects() {
        const projects = [
            {
                title: {
                    es: 'Caracterización físico-química de las hojas de culantro (Eryngium Foetidum) deshidratadas de forma natural y artificial para su aplicación como condimento',
                    en: 'Physicochemical characterisation of culantro (Eryngium foetidum) leaves dehydrated by natural and artificial methods for use as a seasoning',
                    pt: 'Caracterização físico-química das folhas de coentro-do-mato (Eryngium foetidum) desidratadas de forma natural e artificial para aplicação como condimento',
                },
                year: '2022',
                source: 'CISTI 2022. Congreso Internacional de Sociedad, Tecnología e Información',
                link: "https://www.uteq.edu.ec/es/investigacion/ponencia/621",
            },
            {
                title: {
                    es: 'Caracterización de hojas de cilantro cimarrón (Eryngium Foetidum) deshidratadas de forma natural y artificial para su aplicación como condimento',
                    en: 'Characterisation of wild coriander (Eryngium foetidum) leaves dehydrated by natural and artificial methods for use as a seasoning',
                    pt: 'Caracterização de folhas de coentro-do-mato (Eryngium foetidum) desidratadas de forma natural e artificial para aplicação como condimento',
                },
                year: '2022',
                source: 'CISTI 2022. Congreso Internacional de Sociedad, Tecnología e Información',
                link: "https://www.uteq.edu.ec/pt/investigacion/ponencia/619",
            },
            {
                title: {
                    es: 'Influencia de gomas naturales carragenina y xantana como estabilizantes en jugo de tamarindo',
                    en: 'Influence of natural gums carrageenan and xanthan as stabilisers in tamarind juice',
                    pt: 'Influência das gomas naturais carragena e xantana como estabilizantes em suco de tamarindo',
                },
                year: '2022',
                source: 'Congreso Internacional de Desarrollo Universitario (CIDU)',
                link: "https://www.uteq.edu.ec/es/investigacion/ponencia/399",
            },
            {
                title: {
                    es: 'Influencia del recubrimiento con quitosano en la calidad física del banano',
                    en: 'Influence of chitosan coating on the physical quality of bananas',
                    pt: 'Influência do revestimento com quitosana na qualidade física da banana',
                },
                year: '2023',
                source: 'V Congreso Internacional de Desarrollo Universitario CIDU 2023',
                link: "https://www.uteq.edu.ec/es/investigacion/ponencia/1119",
            },
            {
                title: {
                    es: 'Efecto antimicrobiano del recubrimiento de quitosano aplicado al banano poscosecha',
                    en: 'Antimicrobial effect of chitosan coating applied to postharvest bananas',
                    pt: 'Efeito antimicrobiano do revestimento de quitosana aplicado à banana pós-colheita',
                },
                year: '2024',
                source: 'XIII Evento Internacional La Universidad en el siglo XXI',
                link: "https://www.uteq.edu.ec/es/investigacion/ponencia/1688",
            },
        ];

        return (
            <>
                {projects.map((publication, index) => (
                    <div className="col-md-6 col-lg-4 col-xl-4 col-xxl-4" key={index}>
                        <a href={publication.link}
                            target="_blank"
                            aria-label={`link publicacion ${index}`}
                            data-toggle="tooltip"
                            data-placement="bottom"
                            className="link-news-dep"
                            title={`Ver ${publication.link.includes('revista') ? 'Publicación' : 'Libro'} - ${publication.title[data.language]}`}>
                            <div className="p-3 pnl-publication-profs">
                                <div className="row g-2">
                                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                        <img
                                            alt={`Ícono de la ${publication.link.includes('revista') ? 'Publicación' : 'Libro'} ${publication.title[data.language]}`}
                                            className="img-portrait-news p-3"
                                            src={`${IMG_PROFFESIONAL_AUTHORITY_FOLDER}publicacion-cientifica-uteq.webp`} />
                                    </div>
                                    <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                        <div className="text-news-other">{publication.title[data.language]}</div>
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
            </>
        );
    }

    function renderScientificPublications() {
        const publications = [
            {
                title: {
                    es: 'Empleabilidad laboral de los profesionales en seguridad y salud ocupacional en el Ecuador',
                    en: 'Employability of professionals in occupational health and safety in Ecuador',
                    pt: 'Empregabilidade dos profissionais em segurança e saúde ocupacional no Equador',
                },
                year: '2018',
                source: 'Revista Ciencias de la Seguridad y Defensa',
                link: "https://sga.uteq.edu.ec/media/evidenciasiv/2023/03/13/evidencia_articulo_2023313172055.pdf",
            },
            {
                title: {
                    es: 'Frutas tropicales diversidad, procesos y beneficios para la salud',
                    en: 'Tropical fruits: diversity, processing methods, and health benefits',
                    pt: 'Frutas tropicais: diversidade, processos e benefícios para a saúde',
                },
                year: '2021',
                source: 'Grupo COMPAS',
                link: "https://sga.uteq.edu.ec/media/evidenciasiv/2022/12/05/evidencia_articulo_202212516427_KLy8lFs.pdf",
            },
            {
                title: {
                    es: 'Caracterización de hojas de cilantro cimarrón (Eryngium Foetidum) deshidratadas de forma natural y artificial para su aplicación como condimento',
                    en: 'Characterisation of wild coriander (Eryngium foetidum) leaves dehydrated by natural and artificial methods for use as a seasoning',
                    pt: 'Caracterização de folhas de coentro-do-mato (Eryngium foetidum) desidratadas de forma natural e artificial para aplicação como condimento',
                },
                year: '2022',
                source: 'Revista CENTROSUR',
                link: "https://centrosuragraria.com/index.php/revista/article/view/196/404",
            },
            {
                title: {
                    es: 'Use of non-conventional woods in cocoa fermenters and their influence on the organoleptic quality of the cocoa paste',
                    en: 'Use of non-conventional woods in cocoa fermenters and their influence on the organoleptic quality of the cocoa paste',
                    pt: 'Use of non-conventional woods in cocoa fermenters and their influence on the organoleptic quality of the cocoa paste',
                },
                year: '2022',
                source: 'Revista Investigación y Saberes',
                link: "http://revistasdigitales.utelvt.edu.ec/revista/index.php/investigacion_y_saberes/article/view/189",
            },
            {
                title: {
                    es: 'Caracterización de hojas de culantro deshidratadas de forma natural y artificial para elaboración de condimento',
                    en: 'Characterisation of culantro leaves dehydrated by natural and artificial methods for seasoning preparation',
                    pt: 'Caracterização de folhas de coentro-desidratadas de forma natural e artificial para elaboração de condimento',
                },
                year: '2022',
                source: 'Revista Científica Arbitrada Multidisciplinaria Pentaciencias',
                link: "https://editorialalema.org/index.php/pentaciencias/article/view/266/347",
            },
            {
                title: {
                    es: 'Utilización de mucílago de cacao (Theobroma Cacao) con mora (Rubus Ulmifolius) arándano (Oxycoccus Microcarpus) y frambuesa (Rubus Idaeus) en la elaboración de un néctar',
                    en: 'Use of cacao mucilage (Theobroma cacao) with blackberry (Rubus ulmifolius), cranberry (Oxycoccus microcarpus), and raspberry (Rubus idaeus) in the preparation of a nectar',
                    pt: 'Utilização do mucilagem de cacau (Theobroma cacao) com amora-preta (Rubus ulmifolius), oxicoco (Oxycoccus microcarpus) e framboesa (Rubus idaeus) na elaboração de um néctar',
                },
                year: '2023',
                source: 'Revista de Investigación Talentos',
                link: "https://talentos.ueb.edu.ec/index.php/talentos/article/view/393/446",
            },
            {
                title: {
                    es: 'Colorantes para uso alimentario a partir de hojas de teca (Tectona Grandis l.)',
                    en: 'Food-grade colourants from teak leaves (Tectona grandis L.)',
                    pt: 'Corantes para uso alimentício a partir de folhas de teca (Tectona grandis L.)',
                },
                year: '2023',
                source: 'UTEQ',
                link: "https://sga.uteq.edu.ec/media/evidenciasiv/2023/05/30/evidencia_articulo_2023530163641.pdf",
            },
            {
                title: {
                    es: 'Análisis fisicoquímico de tres variedades de carbón activado de cáscara de arroz',
                    en: 'Physicochemical analysis of three varieties of activated carbon from rice husk',
                    pt: 'Análise físico-química de três variedades de carvão ativado de casca de arroz',
                },
                year: '2024',
                source: 'Revista Científica INGENIAR: Ingeniería, Tecnología e Investigación',
                link: "https://journalingeniar.org/index.php/ingeniar/article/download/181/258/730",
            },
            {
                title: {
                    es: 'Efecto de distintas concentraciones de mucílago de cacao (Theobroma Cacaol.) Y café (Coffea Arabica) en la elaboración de una bebida energética',
                    en: 'Effect of different concentrations of cacao mucilage (Theobroma cacao L.) and coffee (Coffea arabica) in the formulation of an energy drink',
                    pt: 'Efeito de diferentes concentrações de mucilagem de cacau (Theobroma cacao L.) e café (Coffea arabica) na elaboração de uma bebida energética',
                },
                year: '2024',
                source: 'Revista Agrotecnológica Amazónica',
                link: "https://revistas.unsm.edu.pe/index.php/raa/article/view/600/1154",
            },
            {
                title: {
                    es: 'Procesamiento y conservación de frutas y hortalizas',
                    en: 'Processing and preservation of fruits and vegetables',
                    pt: 'Processamento e conservação de frutas e hortaliças',
                },
                year: '2024',
                source: 'Grupo AEA',
                link: "https://sga.uteq.edu.ec/media/evidenciasiv/2024/07/30/evidencia_articulo_20247309576_hUFNYKA.pdf",
            },
        ];

        return (
            <>
                {publications.map((publication, index) => (
                    <div className="col-md-6 col-lg-4 col-xl-4 col-xxl-4" key={index}>
                        <a href={publication.link}
                            target="_blank"
                            aria-label={`link publicacion ${index}`}
                            data-toggle="tooltip"
                            data-placement="bottom"
                            className="link-news-dep"
                            title={`Ver ${publication.link.includes('revista') ? 'Publicación' : 'Libro'} - ${publication.title[data.language]}`}>
                            <div className="p-3 pnl-publication-profs">
                                <div className="row g-2">
                                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                        <img
                                            alt={`Ícono de la ${publication.link.includes('revista') ? 'Publicación' : 'Libro'} ${publication.title[data.language]}`}
                                            className="img-portrait-news p-3"
                                            src={`${IMG_PROFFESIONAL_AUTHORITY_FOLDER}publicacion-cientifica-uteq.webp`} />
                                    </div>
                                    <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                        <div className="text-news-other">{publication.title[data.language]}</div>
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
            </>
        );
    }

    function renderAcademicBackground() {
        const academicData = [
            {
                institution: 'Universidad de Guayaquil',
                degree: {
                    es: 'Ingeniera en Química',
                    en: 'Chemical Engineer',
                    pt: 'Engenheira Química',
                },
                year: '1985',
            },
            {
                institution: 'Universidad Técnica Estatal de Quevedo',
                degree: {
                    es: 'Especialista en Docencia Universitaria',
                    en: 'Higher Education Teaching Specialist',
                    pt: 'Especialista em Ensino Superior',
                },
                year: '2000',
            },
            {
                institution: 'Universidad Técnica Estatal de Quevedo',
                degree: {
                    es: 'Máster en Diseño Curricular',
                    en: 'Master’s in Curriculum Design',
                    pt: 'Mestrado em Design Curricular',
                },
                year: '2002',
            },
            {
                institution: 'Universidad Agraria del Ecuador',
                degree: {
                    es: 'Máster en Procesamiento de Alimentos',
                    en: 'Master’s in Food Processing',
                    pt: 'Mestrado em Processamento de Alimentos',
                },
                year: '2015',
            },
            {
                institution: 'Universidad de La Habana',
                degree: {
                    es: 'Doctorado en Ciencias de la Alimentación',
                    en: 'Doctorate in Food Science',
                    pt: 'Doutorado em Ciências da Alimentação',
                },
                year: '2024',
            },
        ];

        return (
            <>
                {academicData.map((item, index) => (
                    <div className={`row row-${index % 2 === 0 ? '1' : '2'}`} key={index}>
                        <section>
                            <i className="icon fa fa-user-circle-o"></i>
                            <div className="details">
                                <span className="title">{item.institution}</span>
                            </div>
                            <p>{item.degree[data.language]}</p>
                            <div className="bottom">
                                <i className="type-proxm">{item.year}</i>
                            </div>
                        </section>
                    </div>
                ))}
            </>
        );
    }

    return (
        <>
            <SSRProvider>
                <div className="row g-0">
                    <h2 className="title-cont-page text-center">
                        {`Ing. Sonnia Esther Barzola Miranda, PhD. - ${data.language === 'es'
                            ? 'Vicerrectora Administrativa'
                            : data.language === 'en'
                                ? 'Administrative Vice-Chancellor'
                                : 'Vice-Reitora Administrativa'
                            }`}
                    </h2>
                    <div className="col-md-11 mx-auto mt-4">
                        <Accordion className="g-0" defaultActiveKey={1}>
                            {renderAccordionItems()}
                        </Accordion>
                    </div>
                </div>
            </SSRProvider>
        </>
    );

}

export { BodySitioWebVicerrectorAdm };