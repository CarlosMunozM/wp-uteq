import React from 'react';
import {
    IMAGES_ADMISSION_FOLDER
} from 'config';


export { BodyPruebaIngresoAdms };


function BodyPruebaIngresoAdms(data) {


    return (<>
        <div className="col-md-12">
            <div className="hero-wrap" style={{ backgroundImage: `url(${IMAGES_ADMISSION_FOLDER}background-calendario-academico.webp)` }}>
                <div className="container-fluid p-0">
                    <div className="row g-0 slider-text align-items-center justify-content-end" data-scrollax-parent="true">
                        <div className="col-12 col-md-6 ftco-animate">
                            <h1 className="mb-4">{data.language === "es" ? "Evaluación por competencias" : (data.language === "en" ? "Evaluation of General and" : "Avaliação por Competências")} <br /><span>{data.language === "es"
                                ? "generales y específicas"
                                : (data.language === "en"
                                    ? "Specific Competencies"
                                    : "Gerais e Específicas")} <i className="fa fa-calendar-check-o" aria-hidden="true"></i></span></h1>
                        </div>
                    </div>
                </div>
            </div>
            <section className="section-information-12">
                <div className="container">
                    {/*<div className="row mt-4 mb-4">
                        <div className="col-sm-12 col-md-6">
                            <div className="ratio ratio-1x1 panel-2-sect-4">
                                <img
                                    src={`${IMAGES_ADMISSION_FOLDER}imagen-1-pag-evaluacion.webp`}
                                    alt="Imagen de la fase 1"
                                    className="img-fluid w-100 h-100"
                                />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div className="ratio ratio-1x1 panel-1-sect-4">
                                <div className="d-flex flex-column justify-content-center h-100">
                                    {data.language === "es" ? (
                                        <>
                                            <p className="mt-4 mb-4">
                                                Es un proceso integral diseñado para evaluar el perfil académico y profesional de los aspirantes a ingresar a la <a href="https://uteq.edu.ec/es" target="_blank" rel="noopener noreferrer" aria-label="Visitar el sitio web de la UTEQ, página principal" className="link-website-parg">Universidad Técnica Estatal de Quevedo (UTEQ)</a>. Este proceso tiene como objetivo medir no solo los conocimientos técnicos, sino también las habilidades y actitudes que los estudiantes necesitan para tener éxito en sus estudios y en su futuro profesional.
                                            </p>
                                            <p className="mb-4">
                                                Las competencias generales y específicas son fundamentales para el desarrollo integral de los estudiantes, ya que combinan habilidades transversales y conocimientos técnicos que les permiten enfrentarse a los retos académicos y profesionales.
                                            </p>
                                        </>
                                    ) : data.language === "en" ? (
                                        <>
                                            <p className="mt-4 mb-4">
                                                It is a comprehensive process designed to assess the academic and professional profile of applicants seeking admission to the <a href="https://uteq.edu.ec/es" target="_blank" rel="noopener noreferrer" aria-label="Visit the UTEQ website, homepage" className="link-website-parg">Technical State University of Quevedo (UTEQ)</a>. This process aims to measure not only technical knowledge but also the skills and attitudes students need to succeed in their studies and future careers.
                                            </p>
                                            <p className="mb-4">
                                                General and specific competences are essential for the comprehensive development of students, as they combine transversal skills and technical knowledge that enable them to face academic and professional challenges.
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="mt-4 mb-4">
                                                É um processo abrangente desenvolvido para avaliar o perfil acadêmico e profissional dos candidatos que desejam ingressar na <a href="https://uteq.edu.ec/es" target="_blank" rel="noopener noreferrer" aria-label="Visitar o site da UTEQ, página principal" className="link-website-parg">Universidade Técnica Estadual de Quevedo (UTEQ)</a>. Esse processo tem como objetivo medir não apenas os conhecimentos técnicos, mas também as habilidades e atitudes que os estudantes precisam para ter sucesso em seus estudos e em sua futura carreira profissional.
                                            </p>
                                            <p className="mb-4">
                                                As competências gerais e específicas são fundamentais para o desenvolvimento integral dos estudantes, pois combinam habilidades transversais e conhecimentos técnicos que os capacitam a enfrentar os desafios acadêmicos e profissionais.
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>*/}

                    <div className="row mt-4 mb-4">
                        <div className="col-12 col-sm-12 col-md-3 col-lg-6 d-flex justify-content-center align-items-center">
                            <div className="ratio ratio-1x1 panel-2-sect-4">
                                <img
                                    src={`${IMAGES_ADMISSION_FOLDER}imagen-1-pag-evaluacion.webp`}
                                    alt="Imagen de la fase 1"
                                    className="img-fluid w-100 h-100"
                                />
                            </div>
                        </div>

                        <div className="col-12 col-sm-12 col-md-9 col-lg-6">
                            <div className="panel-1-sect-4 d-flex flex-column justify-content-center h-100 overflow-auto">
                                <div className="p-3">
                                    {data.language === "es" ? (
                                        <>
                                            <p className="mt-4 mb-4">
                                                La UTEQ realiza la toma de según lo establecido en el Artículo 36 del Reglamento de Nivelación y Admisión, que establece que la evaluación para el proceso de acceso a educación superior es el instrumento que medirá las capacidades y competencias de los aspirantes inscritos en las IES públicas. La evaluación se aplica de manera virtual. Las áreas que se evaluán son de acuerdo a la carrera seleccionada: Anatomía, Biología, Cultura General, Educación, Enfermería, Lenguaje, Matemáticas, Inglés, Psicopedagogía, Química, Razonamiento Lógico, Habilidades Sociales.
                                            </p>
                                            <p className="mb-4">
                                                La nota de postulación esta estructurada de la siguiente manera: Nota de bachillerato (50%) + Nota de Evaluación (50%) + Nota adicional de acciones afirmativas (En caso de que tenga). El puntaje máximo no superará 1000.
                                            </p>
                                        </>
                                    ) : data.language === "en" ? (
                                        <>
                                            <p className="mt-4 mb-4">
                                                The UTEQ conducts the assessment as established in Article 36 of the Regulation on Leveling and Admission, which states that the evaluation for the higher education access process is the tool that measures the skills and competencies of applicants enrolled in public higher education institutions (HEIs). The evaluation is carried out virtually. The areas evaluated are according to the selected programme: Anatomy, Biology, General Knowledge, Education, Nursing, Language, Mathematics, English, Psychopedagogy, Chemistry, Logical Reasoning, Social Skills.
                                            </p>
                                            <p className="mb-4">
                                                The application score is structured as follows: Baccalaureate grade (50%) + Evaluation grade (50%) + Additional affirmative action score (If applicable). The maximum score will not exceed 1000.
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="mt-4 mb-4">
                                                A UTEQ realiza a avaliação conforme estabelecido no Artigo 36 do Regulamento de Nivelamento e Admissão, que determina que a avaliação para o processo de acesso ao ensino superior é o instrumento que mede as habilidades e competências dos candidatos inscritos nas IES públicas. A avaliação é realizada de forma virtual. As áreas avaliadas são de acordo com o curso selecionado: Anatomia, Biologia, Cultura Geral, Educação, Enfermagem, Língua, Matemática, Inglês, Psicopedagogia, Química, Raciocínio Lógico, Habilidades Sociais.
                                            </p>
                                            <p className="mb-4">
                                                A nota de inscrição é estruturada da seguinte forma: Nota do ensino médio (50%) + Nota de Avaliação (50%) + Nota adicional de ações afirmativas (Caso tenha). A pontuação máxima não ultrapassará 1000.
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <br />

                    <div className="row mt-4 mb-4">
                        <div className="col-12 col-sm-12 col-md-9 col-lg-6 mt-4">
                            <div className="d-flex flex-column justify-content-center h-100">
                                {data.language === "es" ? (
                                    <>
                                        <p className="mb-4">
                                            La asignación de cupos para los programas académicos se realiza de acuerdo con una serie de criterios establecidos, con el fin de garantizar un proceso justo y transparente para todos los postulantes. El orden de asignación se distribuye en diferentes categorías, según la priorización de factores socioeconómicos y académicos. A continuación, se detallan los porcentajes asignados a cada uno de los criterios:
                                        </p>
                                        <ul className="mb-1">
                                            <li><span className="text-date-phase">Vulnerabilidad Socioeconómica (10%)</span><br />Se considera a aquellos postulantes que presentan condiciones de vulnerabilidad socioeconómica, con el objetivo de brindarles mayores oportunidades educativas.</li>
                                            <li><span className="text-date-phase">Mérito Académico (10%)</span><br />Se toma en cuenta el desempeño académico de los postulantes, evaluando sus calificaciones obtenidas durante su trayectoria educativa.</li>
                                            <li><span className="text-date-phase">Bachiller Pueblos/Nacionalidad (10%)</span><br />Se da preferencia a los postulantes que provienen de pueblos y nacionalidades, con el fin de promover la inclusión y el acceso a la educación superior para grupos históricamente marginados.</li>
                                            <li><span className="text-date-phase">Bachiller Período Académico (25%)</span><br />Este criterio privilegia a los estudiantes que han obtenido su título de bachiller en el período académico más reciente, priorizando la equidad en el acceso a la universidad.</li>
                                            <li><span className="text-date-phase">Población General (100%)</span><br />Finalmente, se asignan los cupos restantes para la población general, garantizando así un acceso amplio y justo a todos los postulantes.</li>
                                        </ul>
                                    </>
                                ) : data.language === "en" ? (
                                    <>
                                        <p className="mb-4">
                                            The allocation of places for academic programs is carried out according to a set of established criteria, aimed at ensuring a fair and transparent process for all applicants. The order of allocation is distributed into different categories based on the prioritisation of socio-economic and academic factors. Below are the percentages assigned to each of the criteria:
                                        </p>
                                        <ul className="mb-1">
                                            <li><span className="text-date-phase">Socioeconomic Vulnerability (10%)</span><br />Applicants with conditions of socioeconomic vulnerability are considered in order to provide them with greater educational opportunities.</li>
                                            <li><span className="text-date-phase">Academic Merit (10%)</span><br />The academic performance of applicants is taken into account, evaluating the grades obtained during their educational journey.</li>
                                            <li><span className="text-date-phase">Graduate from Indigenous Peoples/Nationalities (10%)</span><br />Preference is given to applicants from indigenous peoples and nationalities, in order to promote inclusion and access to higher education for historically marginalised groups.</li>
                                            <li><span className="text-date-phase">Graduate from Recent Academic Period (25%)</span><br />This criterion prioritises students who have obtained their high school diploma in the most recent academic period, promoting equity in access to university.</li>
                                            <li><span className="text-date-phase">General Population (100%)</span><br />Finally, the remaining places are allocated for the general population, ensuring broad and fair access for all applicants.</li>
                                        </ul>
                                    </>
                                ) : (
                                    <>
                                        <p className="mb-4">
                                            A atribuição de vagas para os programas acadêmicos é realizada de acordo com uma série de critérios estabelecidos, a fim de garantir um processo justo e transparente para todos os candidatos. A ordem de atribuição é distribuída em diferentes categorias, conforme a priorização de fatores socioeconômicos e acadêmicos. Abaixo estão os percentuais atribuídos a cada um dos critérios:
                                        </p>
                                        <ul className="mb-1">
                                            <li><span className="text-date-phase">Vulnerabilidade Socioeconômica (10%)</span><br />Consideram-se os candidatos que apresentam condições de vulnerabilidade socioeconômica, com o objetivo de oferecer maiores oportunidades educacionais.</li>
                                            <li><span className="text-date-phase">Mérito Acadêmico (10%)</span><br />Leva-se em conta o desempenho acadêmico dos candidatos, avaliando suas notas obtidas ao longo de sua trajetória educacional.</li>
                                            <li><span className="text-date-phase">Graduado de Povos/Nacionalidades (10%)</span><br />Dá-se preferência aos candidatos provenientes de povos e nacionalidades, com o objetivo de promover a inclusão e o acesso à educação superior para grupos historicamente marginalizados.</li>
                                            <li><span className="text-date-phase">Graduado do Período Acadêmico Recente (25%)</span><br />Este critério privilegia os estudantes que obtiveram seu diploma de ensino médio no período acadêmico mais recente, priorizando a equidade no acesso à universidade.</li>
                                            <li><span className="text-date-phase">População Geral (100%)</span><br />Finalmente, as vagas restantes são atribuídas à população geral, garantindo acesso amplo e justo para todos os candidatos.</li>
                                        </ul>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="col-12 col-sm-12 col-md-3 col-lg-6 d-flex justify-content-center align-items-center">
                            <div className="ratio ratio-1x1 panel-2-sect-4">
                                <img
                                    src={`${IMAGES_ADMISSION_FOLDER}imagen-2-pag-evaluacion.webp`}
                                    alt="Imagen de la fase 0"
                                    className="img-fluid w-100 h-100"
                                />
                            </div>
                        </div>
                    </div>

                    <br />

                    <div className="row mt-4 mb-4">
                        <div className="col-12 col-sm-12 col-md-3 col-lg-6 mt-4 d-flex justify-content-center align-items-center">
                            <div className="ratio ratio-1x1 panel-2-sect-4">
                                <img
                                    src={`${IMAGES_ADMISSION_FOLDER}imagen-3-pag-evaluacion.webp`}
                                    alt="Imagen de la fase 0"
                                    className="img-fluid w-100 h-100"
                                />
                            </div>
                        </div>

                        <div className="col-12 col-sm-12 col-md-9 col-lg-6">
                            <div className="d-flex flex-column justify-content-center h-100">
                                {data.language === "es" ? (
                                    <p className="mb-4">
                                        En todas las carreras ofertadas se ha establecido una <span className="text-date-phase">política de cuota equivalente al 5%</span>. Esta medida busca garantizar el acceso equitativo a la educación superior, considerando criterios fundamentales como la condición socioeconómica, la ruralidad, la territorialidad, así como el reconocimiento y respeto a los pueblos y nacionalidades. De esta manera, se promueve la inclusión y la diversidad dentro de la comunidad académica, contribuyendo a un desarrollo educativo más justo y representativo.
                                    </p>
                                ) : data.language === "en" ? (
                                    <p className="mb-4">
                                        In all offered programs, a <span className="text-date-phase">quota policy equivalent to 5%</span> has been established. This measure aims to ensure equitable access to higher education, taking into account key criteria such as socio-economic condition, rurality, territoriality, as well as the recognition and respect for indigenous peoples and nationalities. In this way, inclusion and diversity within the academic community are promoted, contributing to a fairer and more representative educational development.
                                    </p>
                                ) : (
                                    <p className="mb-4">
                                        Em todos os cursos oferecidos, foi estabelecida uma <span className="text-date-phase">política de cota equivalente a 5%</span>. Essa medida visa garantir o acesso equitativo à educação superior, considerando critérios fundamentais como a condição socioeconômica, a ruralidade, a territorialidade, assim como o reconhecimento e respeito aos povos e nacionalidades. Dessa forma, promove-se a inclusão e a diversidade dentro da comunidade acadêmica, contribuindo para um desenvolvimento educacional mais justo e representativo.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/*<br />
                    <div className="row mt-4 mb-4">
                        <div className="col-sm-12 col-md-6 mt-4">
                            <div className="ratio ratio-1x1 panel-1-sect-4 mt-4">
                                <div className="d-flex flex-column justify-content-center h-100">
                                    {data.language === "es" ? (
                                        <>
                                            <p className="mb-4">
                                                La asignación de cupos para los programas académicos se realiza de acuerdo con una serie de criterios establecidos, con el fin de garantizar un proceso justo y transparente para todos los postulantes. El orden de asignación se distribuye en diferentes categorías, según la priorización de factores socioeconómicos y académicos. A continuación, se detallan los porcentajes asignados a cada uno de los criterios:
                                            </p>
                                            <ul className="mb-1">
                                                <li><span className="text-date-phase">Vulnerabilidad Socioeconómica (10%)</span><br />Se considera a aquellos postulantes que presentan condiciones de vulnerabilidad socioeconómica, con el objetivo de brindarles mayores oportunidades educativas.</li>
                                                <li><span className="text-date-phase">Mérito Académico (10%)</span><br />Se toma en cuenta el desempeño académico de los postulantes, evaluando sus calificaciones obtenidas durante su trayectoria educativa.</li>
                                                <li><span className="text-date-phase">Bachiller Pueblos/Nacionalidad (10%)</span><br />Se da preferencia a los postulantes que provienen de pueblos y nacionalidades, con el fin de promover la inclusión y el acceso a la educación superior para grupos históricamente marginados.</li>
                                                <li><span className="text-date-phase">Bachiller Período Académico (25%)</span><br />Este criterio privilegia a los estudiantes que han obtenido su título de bachiller en el período académico más reciente, priorizando la equidad en el acceso a la universidad.</li>
                                                <li><span className="text-date-phase">Población General (100%)</span><br />Finalmente, se asignan los cupos restantes para la población general, garantizando así un acceso amplio y justo a todos los postulantes.</li>
                                            </ul>
                                        </>
                                    ) : data.language === "en" ? (
                                        <>
                                            <p className="mb-4">
                                                The allocation of places for academic programs is carried out according to a set of established criteria, aimed at ensuring a fair and transparent process for all applicants. The order of allocation is distributed into different categories based on the prioritisation of socio-economic and academic factors. Below are the percentages assigned to each of the criteria:
                                            </p>
                                            <ul className="mb-1">
                                                <li><span className="text-date-phase">Socioeconomic Vulnerability (10%)</span><br />Applicants with conditions of socioeconomic vulnerability are considered in order to provide them with greater educational opportunities.</li>
                                                <li><span className="text-date-phase">Academic Merit (10%)</span><br />The academic performance of applicants is taken into account, evaluating the grades obtained during their educational journey.</li>
                                                <li><span className="text-date-phase">Graduate from Indigenous Peoples/Nationalities (10%)</span><br />Preference is given to applicants from indigenous peoples and nationalities, in order to promote inclusion and access to higher education for historically marginalised groups.</li>
                                                <li><span className="text-date-phase">Graduate from Recent Academic Period (25%)</span><br />This criterion prioritises students who have obtained their high school diploma in the most recent academic period, promoting equity in access to university.</li>
                                                <li><span className="text-date-phase">General Population (100%)</span><br />Finally, the remaining places are allocated for the general population, ensuring broad and fair access for all applicants.</li>
                                            </ul>
                                        </>
                                    ) : (
                                        <>
                                            <p className="mb-4">
                                                A atribuição de vagas para os programas acadêmicos é realizada de acordo com uma série de critérios estabelecidos, a fim de garantir um processo justo e transparente para todos os candidatos. A ordem de atribuição é distribuída em diferentes categorias, conforme a priorização de fatores socioeconômicos e acadêmicos. Abaixo estão os percentuais atribuídos a cada um dos critérios:
                                            </p>
                                            <ul className="mb-1">
                                                <li><span className="text-date-phase">Vulnerabilidade Socioeconômica (10%)</span><br />Consideram-se os candidatos que apresentam condições de vulnerabilidade socioeconômica, com o objetivo de oferecer maiores oportunidades educacionais.</li>
                                                <li><span className="text-date-phase">Mérito Acadêmico (10%)</span><br />Leva-se em conta o desempenho acadêmico dos candidatos, avaliando suas notas obtidas ao longo de sua trajetória educacional.</li>
                                                <li><span className="text-date-phase">Graduado de Povos/Nacionalidades (10%)</span><br />Dá-se preferência aos candidatos provenientes de povos e nacionalidades, com o objetivo de promover a inclusão e o acesso à educação superior para grupos historicamente marginalizados.</li>
                                                <li><span className="text-date-phase">Graduado do Período Acadêmico Recente (25%)</span><br />Este critério privilegia os estudantes que obtiveram seu diploma de ensino médio no período acadêmico mais recente, priorizando a equidade no acesso à universidade.</li>
                                                <li><span className="text-date-phase">População Geral (100%)</span><br />Finalmente, as vagas restantes são atribuídas à população geral, garantindo acesso amplo e justo para todos os candidatos.</li>
                                            </ul>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div className="ratio ratio-1x1 panel-2-sect-4">
                                <img
                                    src={`${IMAGES_ADMISSION_FOLDER}imagen-2-pag-evaluacion.webp`}
                                    alt="Imagen de la fase 0"
                                    className="img-fluid w-100 h-100"
                                />
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row mt-4 mb-4">
                        <div className="col-sm-12 col-md-6 mt-4">
                            <div className="ratio ratio-1x1 panel-2-sect-4">
                                <img
                                    src={`${IMAGES_ADMISSION_FOLDER}imagen-3-pag-evaluacion.webp`}
                                    alt="Imagen de la fase 0"
                                    className="img-fluid w-100 h-100"
                                />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div className="ratio ratio-1x1 panel-1-sect-4 mt-4">
                                <div className="d-flex flex-column justify-content-center h-100">
                                    {data.language === "es" ? (
                                        <p className="mb-4">
                                            En todas las carreras ofertadas se ha establecido una <span className="text-date-phase">política de cuota equivalente al 5%</span>. Esta medida busca garantizar el acceso equitativo a la educación superior, considerando criterios fundamentales como la condición socioeconómica, la ruralidad, la territorialidad, así como el reconocimiento y respeto a los pueblos y nacionalidades. De esta manera, se promueve la inclusión y la diversidad dentro de la comunidad académica, contribuyendo a un desarrollo educativo más justo y representativo.
                                        </p>
                                    ) : data.language === "en" ? (
                                        <p className="mb-4">
                                            In all offered programs, a <span className="text-date-phase">quota policy equivalent to 5%</span> has been established. This measure aims to ensure equitable access to higher education, taking into account key criteria such as socio-economic condition, rurality, territoriality, as well as the recognition and respect for indigenous peoples and nationalities. In this way, inclusion and diversity within the academic community are promoted, contributing to a fairer and more representative educational development.
                                        </p>
                                    ) : (
                                        <p className="mb-4">
                                            Em todos os cursos oferecidos, foi estabelecida uma <span className="text-date-phase">política de cota equivalente a 5%</span>. Essa medida visa garantir o acesso equitativo à educação superior, considerando critérios fundamentais como a condição socioeconômica, a ruralidade, a territorialidade, assim como o reconhecimento e respeito aos povos e nacionalidades. Dessa forma, promove-se a inclusão e a diversidade dentro da comunidade acadêmica, contribuindo para um desenvolvimento educacional mais justo e representativo.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>*/}
                </div>
            </section>
        </div>
    </>);
}