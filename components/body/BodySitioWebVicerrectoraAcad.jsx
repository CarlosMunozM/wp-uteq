import React from 'react';
import { SSRProvider, Accordion } from "react-bootstrap";
import { IMG_PROFFESIONAL_AUTHORITY_FOLDER } from 'config';

function BodySitioWebVicerrectoraAcad(data) {

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
                es: 'Proyectos académicos',
                en: 'Academic projects',
                pt: 'Projetos acadêmicos',
            },
            content: (
                <div className="row gx-2 gy-2">
                    {renderAcademicProjects()}
                </div>
            ),
        },
        {
            key: 3,
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
            "fotografia-vicerrectora-1.webp",
            "fotografia-vicerrectora-2.webp",
            "fotografia-vicerrectora-3.webp",
            "fotografia-vicerrectora-4.webp",
            "fotografia-vicerrectora-5.webp",
            "fotografia-vicerrectora-6.webp",
        ];

        return (
            <>
                {photoPaths.map((photoPath, index) => (
                    <div className="col-md-4" key={index}>
                        <div className="ratio ratio-4x3 pnl-photg">
                            <img
                                src={`${IMG_PROFFESIONAL_AUTHORITY_FOLDER}${photoPath}`}
                                className="ratio ratio-4x3"
                                alt="Fotografía de la Vicerrectora Académica - Campus Central"
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
                    es: 'Proyecto de Caracterización técnica y económica del sistema mixto agricultura ganadería',
                    en: 'Technical and Economic Characterization Project of the Mixed Agriculture-Livestock System',
                    pt: 'Projeto de Caracterização Técnica e Econômica do Sistema Misto Agricultura-Pecuária',
                },
                role: {
                    es: 'Autora - Año',
                    en: 'Author - Year',
                    pt: 'Autora - Ano',
                },
                image: 'proyecto-de-caracterizacion-tecnica-y-economica-uteq.webp',
            },
            {
                title: {
                    es: 'Evaluación de la dinámica agroecológica en productos de Galápagos',
                    en: 'Evaluation of agroecological dynamics in Galapagos products',
                    pt: 'Avaliação da dinâmica agroecológica em produtos de Galápagos',
                },
                role: {
                    es: 'Coautora - Año',
                    en: 'Co-author - Year',
                    pt: 'Coautora - Ano',
                },
                image: 'proyecto-evaluacion-de-la-dinamica-agroecologica-uteq.webp',
            },
            {
                title: {
                    es: 'Comparación Internacional de diferentes modelos educativos (presencial, semipresencial y online) para la construcción de un modelo híbrido',
                    en: 'International Comparison of different educational models (face-to-face, semi-face-to-face, and online) for the construction of a hybrid model',
                    pt: 'Comparação internacional de diferentes modelos educacionais (presencial, semipresencial e online) para a construção de um modelo híbrido',
                },
                role: {
                    es: 'Autora - Año',
                    en: 'Author - Year',
                    pt: 'Autora - Ano',
                },
                image: 'proyecto-comparacion-internacional-de-diferentes-modelos-educativos-uteq.webp',
            },
        ];

        return (
            <>
                {projects.map((project, index) => (
                    <div className="col-md-4" key={index}>
                        <div className="card h-100 pnl-netwk">
                            <img
                                src={`${IMG_PROFFESIONAL_AUTHORITY_FOLDER}${project.image}`}
                                className="card-img-top"
                                alt=""
                            />
                            <div className="card-body">
                                <h3 className="card-title">{project.role[data.language]}</h3>
                                <p className="card-text">{project.title[data.language]}</p>
                            </div>
                            <div className="card-footer project-pers"></div>
                        </div>
                    </div>
                ))}
            </>
        );
    }

    function renderScientificPublications() {
        const publications = [
            {
                title: {
                    es: 'Livelihoods and Perceptions of Climate Change among Dairy Farmers in the Andes: Implications for Climate Education',
                    en: 'Livelihoods and Perceptions of Climate Change among Dairy Farmers in the Andes: Implications for Climate Education',
                    pt: 'Livelihoods and Perceptions of Climate Change among Dairy Farmers in the Andes: Implications for Climate Education',
                },
                year: '2023',
                source: 'Sustainability',
                link: 'https://doi.org/10.3390/su151713157',
            },
            {
                title: {
                    es: 'Los nómadas digitales y las nuevas tecnologías en el turismo: Digital nomads and new technologies in tourism',
                    en: 'Los nómadas digitales y las nuevas tecnologías en el turismo: Digital nomads and new technologies in tourism',
                    pt: 'Los nómadas digitales y las nuevas tecnologías en el turismo: Digital nomads and new technologies in tourism',
                },
                year: '2023',
                source: 'Revista Latinoamericana De Ciencias Sociales Y Humanidades',
                link: 'https://doi.org/10.56712/latam.v4i2.681',
            },
            {
                title: {
                    es: 'Global Evolution of Research on Silvopastoral Systems through Bibliometric Analysis: Insights from Ecuador',
                    en: 'Global Evolution of Research on Silvopastoral Systems through Bibliometric Analysis: Insights from Ecuador',
                    pt: 'Global Evolution of Research on Silvopastoral Systems through Bibliometric Analysis: Insights from Ecuador',
                },
                year: '2023',
                source: 'Agronomy',
                link: 'https://doi.org/10.3390/agronomy13020479',
            },
            {
                title: {
                    es: 'Analysis of corn crop production and marketing in the Salapi Chico precinct of the Buena Fe canton, province of Los Ríos',
                    en: 'Analysis of corn crop production and marketing in the Salapi Chico precinct of the Buena Fe canton, province of Los Ríos',
                    pt: 'Analysis of corn crop production and marketing in the Salapi Chico precinct of the Buena Fe canton, province of Los Ríos',
                },
                year: '2022',
                source: 'Journal of Business and Entrepreneurial Studie',
                link: 'https://doi.org/10.37956/jbes.v6i4.317',
            },
            {
                title: {
                    es: 'Characteristics of the commercialization of the Cavendish banana crop in the canton of Las Naves',
                    en: 'Characteristics of the commercialization of the Cavendish banana crop in the canton of Las Naves',
                    pt: 'Characteristics of the commercialization of the Cavendish banana crop in the canton of Las Naves',
                },
                year: '2022',
                source: 'Revista Científica Interdisciplinaria Investigación Y Saberes',
                link: 'http://revistasdigitales.utelvt.edu.ec/revista/index.php/investigacion_y_saberes/article/view/188',
            },
            {
                title: {
                    es: 'Degree of acceptance of an associativity proposal for cocoa farmers in the La Cadena sector, Valencia canton, Los Ríos province',
                    en: 'Degree of acceptance of an associativity proposal for cocoa farmers in the La Cadena sector, Valencia canton, Los Ríos province',
                    pt: 'Degree of acceptance of an associativity proposal for cocoa farmers in the La Cadena sector, Valencia canton, Los Ríos province',
                },
                year: '2022',
                source: 'Revista Científica Interdisciplinaria Investigación Y Saberes',
                link: 'http://revistasdigitales.utelvt.edu.ec/revista/index.php/investigacion_y_saberes/article/view/186',
            },
            {
                title: {
                    es: 'Evaluation of a Microbial Consortium and Selection of a Support in an Anaerobic Reactor Directed to the Bio-Treatment of Wastewater of the Textile Industry',
                    en: 'Evaluation of a Microbial Consortium and Selection of a Support in an Anaerobic Reactor Directed to the Bio-Treatment of Wastewater of the Textile Industry',
                    pt: 'Evaluation of a Microbial Consortium and Selection of a Support in an Anaerobic Reactor Directed to the Bio-Treatment of Wastewater of the Textile Industry',
                },
                year: '2022',
                source: 'Sustainability',
                link: 'https://doi.org/10.3390/su14148889',
            },
            {
                title: {
                    es: 'An Organizational Model of Online Learning in the Pandemic Period: Comparison with Traditional Face-to-Face Learning',
                    en: 'An Organizational Model of Online Learning in the Pandemic Period: Comparison with Traditional Face-to-Face Learning',
                    pt: 'An Organizational Model of Online Learning in the Pandemic Period: Comparison with Traditional Face-to-Face Learning',
                },
                year: '2022',
                source: 'education sciences',
                link: 'https://doi.org/10.3390/educsci12070448',
            },
            {
                title: {
                    es: 'Effect of habitat and sex on biological indicators and blood biochemistry of Andinoacara rivulatus in the province Los Ríos - Ecuador',
                    en: 'Effect of habitat and sex on biological indicators and blood biochemistry of Andinoacara rivulatus in the province Los Ríos - Ecuador',
                    pt: 'Effect of habitat and sex on biological indicators and blood biochemistry of Andinoacara rivulatus in the province Los Ríos - Ecuador',
                },
                year: '2022',
                source: 'Revista De La Facultad De Agronomía De La Universidad Del Zulia',
                link: 'https://produccioncientificaluz.org/index.php/agronomia/article/view/37517',
            },
            {
                title: {
                    es: 'Obtención de crema de chocolate adicionado fruta de pan mediante la reutilización de cacao (Theobroma cacao L.) susceptible a monilia (Moniliophthora roreri Cif y Par)',
                    en: 'Obtención de crema de chocolate adicionado fruta de pan mediante la reutilización de cacao (Theobroma cacao L.) susceptible a monilia (Moniliophthora roreri Cif y Par)',
                    pt: 'Obtención de crema de chocolate adicionado fruta de pan mediante la reutilización de cacao (Theobroma cacao L.) susceptible a monilia (Moniliophthora roreri Cif y Par)',
                },
                year: '2022',
                source: 'Revista de Investigación Talentos',
                link: 'https://doi.org/10.33789/talentos.9.1.163',
            },
            {
                title: {
                    es: 'Quantitative Comparison between Traditional and Intensive Face-to-Face Education through an Organizational Model',
                    en: 'Quantitative Comparison between Traditional and Intensive Face-to-Face Education through an Organizational Model',
                    pt: 'Quantitative Comparison between Traditional and Intensive Face-to-Face Education through an Organizational Model',
                },
                year: '2021',
                source: 'education sciences',
                link: 'https://doi.org/10.3390/educsci11120820',
            },
            {
                title: {
                    es: 'Fitoterapia en la producción de la codorniz (coturnix coturnix japónica)',
                    en: 'Fitoterapia en la producción de la codorniz (coturnix coturnix japónica)',
                    pt: 'Fitoterapia en la producción de la codorniz (coturnix coturnix japónica)',
                },
                year: '2021',
                source: 'Ciencia Latina Revista Científica Multidisciplinar',
                link: 'https://doi.org/10.37811/cl_rcm.v5i6.1177',
            },
            {
                title: {
                    es: 'Antibioterapia natural para el tratamiento de la coccidiosis y su repercusión en el comportamiento productivo del broiler',
                    en: 'Antibioterapia natural para el tratamiento de la coccidiosis y su repercusión en el comportamiento productivo del broiler',
                    pt: 'Antibioterapia natural para el tratamiento de la coccidiosis y su repercusión en el comportamiento productivo del broiler',
                },
                year: '2021',
                source: 'Ciencia Latina Revista Científica Multidisciplinar',
                link: 'https://doi.org/10.37811/cl_rcm.v5i6.1176',
            },
            {
                title: {
                    es: 'Efecto de la fermentación de cacao (theobroma cacao L.), variedad nacional y trinitario, en cajas de maderas no convencionales sobre la calidad física y sensorial del licor de cacao',
                    en: 'Efecto de la fermentación de cacao (theobroma cacao L.), variedad nacional y trinitario, en cajas de maderas no convencionales sobre la calidad física y sensorial del licor de cacao',
                    pt: 'Efecto de la fermentación de cacao (theobroma cacao L.), variedad nacional y trinitario, en cajas de maderas no convencionales sobre la calidad física y sensorial del licor de cacao',
                },
                year: '2021',
                source: 'Revista De Investigación Talentos',
                link: 'https://doi.org/10.33789/talentos.8.2.153',
            },
            {
                title: {
                    es: 'Valoración de baba de cacao (mucílago) no utilizada en el cantón Quevedo - Ecuador',
                    en: 'Valoración de baba de cacao (mucílago) no utilizada en el cantón Quevedo - Ecuador',
                    pt: 'Valoración de baba de cacao (mucílago) no utilizada en el cantón Quevedo - Ecuador',
                },
                year: '2021',
                source: 'Revista Científica Ciencia Y Tecnología',
                link: 'https://doi.org/10.47189/rcct.v21i32.489',
            },
            {
                title: {
                    es: 'Identification and Assessment of Livestock Best Management Practices (BMPs) Using the REDD+ Approach in the Ecuadorian Amazon',
                    en: 'Identification and Assessment of Livestock Best Management Practices (BMPs) Using the REDD+ Approach in the Ecuadorian Amazon',
                    pt: 'Identification and Assessment of Livestock Best Management Practices (BMPs) Using the REDD+ Approach in the Ecuadorian Amazon',
                },
                year: '2021',
                source: 'Agronomy',
                link: 'https://doi.org/10.3390/agronomy11071336',
            },
            {
                title: {
                    es: 'Use of cocoa mucilage as an inoculant in the production of semi-hard cheese',
                    en: 'Use of cocoa mucilage as an inoculant in the production of semi-hard cheese',
                    pt: 'Use of cocoa mucilage as an inoculant in the production of semi-hard cheese',
                },
                year: '2021',
                source: 'Universidad Ciencia Y Tecnología',
                link: 'https://doi.org/10.47460/uct.v25i109.441',
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
                institution: 'Universidad Técnica Estatal de Quevedo',
                degree: {
                    es: 'Ingeniería en Zootecnia',
                    en: 'Bachelor of Science in Animal Science',
                    pt: 'Bacharel em Ciências Animais',
                },
            },
            {
                institution: 'Universidad de Córdoba - España',
                degree: {
                    es: 'Maestría en Zootecnia',
                    en: 'Master of Science in Animal Science',
                    pt: 'Mestre em Ciências Animais',
                },
            },
            {
                institution: 'Universidad de Córdoba - España',
                degree: {
                    es: 'Doctorado en Recursos Naturales y Gestión Sostenible',
                    en: 'Ph.D. in Natural Resources and Sustainable Management',
                    pt: 'Doutorado em Recursos Naturais e Gestão Sustentável',
                },
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
                        {`Ing. Yenny Guiselli Torres Navarrete, PhD. - ${data.language === 'es'
                            ? 'Rectora'
                            : data.language === 'en'
                                ? 'Rector'
                                : 'Reitora'
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

export { BodySitioWebVicerrectoraAcad };