import React, { useState, useEffect, useMemo } from "react";
import { Accordion } from "react-bootstrap";

export { BodyAyudasEconomicas };

function BodyAyudasEconomicas(data) {

    return (<>
        <div className="row">
            <h2 className="title-cont-page text-center mt-2">{data.language === "es" ? data.data8.pwNombre.trim() : (data.language === "en" ? data.data8.pwNombreEn.trim() : data.data8.pwNombrePt.trim())}</h2>
            <div className="col-md-12 w-100 mt-2">
                <h2 className="msg-pnl-search text-rigth">{data.language === "en" ? "Objective" : "Objetivo"}</h2>
                <div className="paragraph-cont">
                    <p className="text-cont">
                        {data.language === "es" ? (
                            <>
                                Las instituciones de educación superior establecerán programas de becas completas o su equivalente en ayudas económicas que apoyen en su escolaridad a por lo menos el 10% del número de estudiantes regulares. La Universidad Técnica Estatal de Quevedo en cumplimiento a lo que dispone la LOES en su artículo 77 promueve el otorgamiento de las ayudas económicas a sus estudiantes regulares de carrera por su excelente aprovechamiento académico, por estado de situación vulnerable y extrema vulnerabilidad, por algún tipo de discapacidad, por pertenecer a  culturas y grupos ancestrales o por representar en los eventos culturales y deportivos dentro y fuera de la institución.
                            </>
                        ) : (data.language === "en" ? (
                            <>
                                Higher education institutions shall establish full scholarship programmes or their equivalent in financial aid to support at least 10% of the number of regular students. The Technical State University of Quevedo, in compliance with Article 77 of the LOES, promotes the granting of financial aid to its regular students based on their excellent academic performance, their vulnerable or extremely vulnerable status, any type of disability, belonging to ancestral cultures and groups, or representing the institution in cultural and sports events both within and outside the institution.
                            </>
                        ) : (
                            <>
                                As instituições de ensino superior estabelecerão programas de bolsas completas ou seu equivalente em ajuda financeira para apoiar pelo menos 10% do número de estudantes regulares. A Universidade Técnica Estatal de Quevedo, em conformidade com o disposto no Artigo 77 da LOES, promove a concessão de ajuda financeira aos seus estudantes regulares com base em seu excelente desempenho acadêmico, situação de vulnerabilidade ou extrema vulnerabilidade, algum tipo de deficiência, pertencimento a culturas e grupos ancestrais, ou representação em eventos culturais e esportivos dentro e fora da instituição.
                            </>
                        ))}
                    </p>
                </div>
                <h2 className="msg-pnl-search text-rigth">{data.language === "en" ? "Scope" : "Alcance"}</h2>
                <div className="paragraph-cont">
                    <p className="text-cont">
                        {data.language === "es" ? (
                            <>
                                Aplica a los estudiantes legalmente matriculados en carreras de grado del primer periodo académico 2023-2024 y segundo periodo académico 2023-2024 de la Universidad Técnica Estatal de Quevedo.
                            </>
                        ) : (data.language === "en" ? (
                            <>
                                Applies to students duly enrolled in undergraduate programs for the first academic period 2023-2024 and second academic period 2023-2024 at the Technical State University of Quevedo.
                            </>
                        ) : (
                            <>
                                Aplica-se aos estudantes regularmente matriculados em cursos de graduação no primeiro período acadêmico de 2023-2024 e segundo período acadêmico de 2023-2024 da Universidade Técnica Estatal de Quevedo.
                            </>
                        ))}
                    </p>
                </div>
                <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Estadísticas" : (data.language === "en" ? "Statistics" : "Estatísticas")}</h2>
                <div className="col-md-12 w-100 mt-3 mb-3">
                    <a href="https://www.uteq.edu.ec/assets/docs/ubu/datos_estadisticos_ayudas_economicas.pdf" target="_blank" className="link-text-local" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Descargar documento PDF" : (data.language === "en" ? "Download PDF document" : "Faça o download do documento PDF")}>
                        <div className="card-header pnl-link-effect">
                            <i className="fa fa-arrow-circle-down" aria-hidden="true"></i> {data.language === "es" ? "Descargar datos estadísticos de las ayudas económicas" : (data.language === "en" ? "Download statistical data on financial aid" : "Download de dados estatísticos sobre ajuda financeira")}
                        </div>
                    </a>
                </div>
                <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Tipos de becas o ayudas económicas" : (data.language === "en" ? "Types of scholarships or financial aid" : "Tipos de subsídios ou ajuda financeira")}</h2>
                <Accordion defaultActiveKey={0}>
                    <Accordion.Item eventKey={0} key={0}>
                        <Accordion.Header>{data.language === "es" ? "Excelencia académica" : (data.language === "en" ? "Academic excellence" : "Excelência acadêmica")}</Accordion.Header>
                        <Accordion.Body>
                            <div className="paragraph-cont">
                                <p className="text-cont">
                                    {data.language === "es" ? (
                                        <>
                                            La selección y aprobación de estas ayudas económicas será automática a través del SGA. El sistema de gestión académica de la UTEQ, en base a los mejores promedios que cumplan con los criterios de validación, seleccionará el número de beneficiarios por carrera.
                                        </>
                                    ) : (data.language === "en" ? (
                                        <>
                                            The selection and approval of these financial aids will be automatic through the SGA. The academic management system of UTEQ, based on the highest averages that meet the validation criteria, will select the number of beneficiaries per course.
                                        </>
                                    ) : (
                                        <>
                                            A seleção e aprovação dessas ajudas financeiras serão automáticas através do SGA. O sistema de gestão acadêmica da UTEQ, com base nos melhores índices que atendam aos critérios de validação, selecionará o número de beneficiários por curso.
                                        </>
                                    ))}
                                </p>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey={1} key={1}>
                        <Accordion.Header>{data.language === "es" ? "Limitada economía" : (data.language === "en" ? "Limited economy" : "Economia limitada")}</Accordion.Header>
                        <Accordion.Body>
                            <div className="paragraph-cont">
                                <p className="text-cont">
                                    {data.language === "es" ? (
                                        <>
                                            Se concederá las ayudas económicas a los estudiantes regulares que no cuenten con los recursos económicos suficientes, que le imposibiliten mantenerse y terminar exitosamente su formación profesional,  con buen rendimiento académico, previo estudio socioeconómico e informe motivado del área de trabajo social.
                                        </>
                                    ) : (data.language === "en" ? (
                                        <>
                                            Financial aid will be granted to regular students who lack sufficient economic resources, which prevent them from sustaining and successfully completing their professional training, provided they have good academic performance, subject to a socio-economic study and a motivated report from the social work area.
                                        </>
                                    ) : (
                                        <>
                                            Serão concedidas ajudas financeiras aos estudantes regulares que não possuam recursos econômicos suficientes, os quais os impeçam de se sustentar e concluir com sucesso sua formação profissional, desde que apresentem bom desempenho acadêmico, com estudo socioeconômico prévio e relatório fundamentado da área de trabalho social.
                                        </>
                                    ))}
                                </p>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey={2} key={2}>
                        <Accordion.Header>{data.language === "es" ? "Etnias pueblos y nacionalidades" : (data.language === "en" ? "Ethnic groups, peoples and nationalities" : "Grupos étnicos, povos e nacionalidades")}</Accordion.Header>
                        <Accordion.Body>
                            <div className="paragraph-cont">
                                <p className="text-cont">
                                    {data.language === "es" ? (
                                        <>
                                            La UTEQ con base a su autonomía responsable e incluyente y equitativa concederá esta ayuda económica a estudiantes que pertenecen a pueblos y nacionalidades del Ecuador, registrados en cualquier nivel socioeconómico por pertenecer a culturas y grupos ancestrales y aquellos que forman parte de grupos históricamente olvidados.
                                        </>
                                    ) : (data.language === "en" ? (
                                        <>
                                            UTEQ, based on its responsible, inclusive, and equitable autonomy, will grant this financial aid to students belonging to Ecuadorian peoples and nationalities, regardless of their socio-economic status, who are part of ancestral cultures and groups, as well as those who belong to historically marginalized groups.
                                        </>
                                    ) : (
                                        <>
                                            A UTEQ, com base em sua autonomia responsável, inclusiva e equitativa, concederá esta ajuda financeira a estudantes que pertencem a povos e nacionalidades do Equador, registrados em qualquer nível socioeconômico por pertencerem a culturas e grupos ancestrais, bem como àqueles que fazem parte de grupos historicamente esquecidos.
                                        </>
                                    ))}
                                </p>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey={3} key={3}>
                        <Accordion.Header>{data.language === "es" ? "Discapacidad" : (data.language === "en" ? "Disability" : "Deficiência")}</Accordion.Header>
                        <Accordion.Body>
                            <div className="paragraph-cont">
                                <p className="text-cont">
                                    {data.language === "es" ? (
                                        <>
                                            Es la ayuda económica destinada para estudiantes de carrera de la Universidad Técnica Estatal de Quevedo desde el primer nivel de estudios que presenten algún tipos de discapacidad o capacidades especiales, previo registro de dicha discapacidad en el SGA.
                                        </>
                                    ) : (data.language === "en" ? (
                                        <>
                                            This is financial aid intended for undergraduate students at Technical State University of Quevedo from the first level of studies who have any type of disability or special needs, with prior registration of said disability in the SGA.
                                        </>
                                    ) : (
                                        <>
                                            Esta é uma ajuda financeira destinada a estudantes de graduação da Universidade Técnica Estatal de Quevedo desde o primeiro nível de estudos que apresentem algum tipo de deficiência ou capacidade especial, com registro prévio dessa deficiência no SGA.
                                        </>
                                    ))}
                                </p>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey={4} key={4}>
                        <Accordion.Header>{data.language === "es" ? "Mérito deportivo y cultural" : (data.language === "en" ? "Sporting and cultural merit" : "Mérito esportivo e cultural")}</Accordion.Header>
                        <Accordion.Body>
                            <div className="paragraph-cont">
                                <p className="text-cont">
                                    {data.language === "es" ? (
                                        <>
                                            Esta ayuda destinada para estudiantes que la Universidad Técnica Estatal de Quevedo que representen destacadamente de manera institucional, cantonal, provincial, nacional o internacional, en eventos deportivos o culturales, interno o externo. La verificación de las evidencias para la adjudicación corresponderá al responsable de las áreas de trabajo cultura y deporte, quienes serán los encargados de certificar su participación destacada previo visto bueno del responsable de la UBU.
                                        </>
                                    ) : (data.language === "en" ? (
                                        <>
                                            This assistance is intended for students of Technical State University of Quevedo who represent prominently at institutional, cantonal, provincial, national, or international events, whether cultural or sporting, internal or external. Verification of evidence for awarding will be the responsibility of the culture and sports work areas, who will certify their outstanding participation following approval from the UBU responsible.
                                        </>
                                    ) : (
                                        <>
                                            Esta assistência é destinada a estudantes da Universidade Técnica Estatal de Quevedo que se destaquem institucionalmente, municipal, provincial, nacional ou internacionalmente em eventos esportivos ou culturais, internos ou externos. A verificação das evidências para a concessão será responsabilidade das áreas de trabalho cultural e esportivo, que certificarão sua participação destacada após aprovação do responsável pela UBU.
                                        </>
                                    ))}
                                </p>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey={5} key={5}>
                        <Accordion.Header>{data.language === "es" ? "Distinción académica (Ayudantía de cátedra)" : (data.language === "en" ? "Academic Distinction (Teaching Assistantship)" : "Distinção acadêmica (bolsa de estudos)")}</Accordion.Header>
                        <Accordion.Body>
                            <div className="paragraph-cont">
                                <p className="text-cont">
                                    {data.language === "es" ? (
                                        <>
                                            La UTEQ con base a su autonomía responsable reconocerá esta ayuda económica a estudiantes que obtuvieron una distinción académica por haber culminado horas como ayudantes de cátedra, pudiendo estar registrado en cualquier nivel socioeconómico.
                                        </>
                                    ) : (data.language === "en" ? (
                                        <>
                                            UTEQ, based on its responsible autonomy, will recognise this financial aid for students who have achieved academic distinction through completion of hours as teaching assistants, regardless of their socio-economic status.
                                        </>
                                    ) : (
                                        <>
                                            A UTEQ, com base em sua autonomia responsável, reconhecerá esta ajuda financeira a estudantes que tenham obtido distinção acadêmica por terem cumprido horas como assistentes de cátedra, podendo estar registrados em qualquer nível socioeconômico.
                                        </>
                                    ))}
                                </p>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion><br />
                <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Proceso de adjudicación de las becas o ayudas económicas" : (data.language === "en" ? "Process for awarding scholarships or financial support" : "Processo de concessão de bolsas de estudo ou apoio financeiro")}</h2>
                <div className="wrapper">
                    <div className="center-line">
                        <i className="scroll-icon fa fa-code-fork"></i>
                    </div>
                    <div className="row row-1">
                        <section>
                            <i className="icon fa fa-map-signs"></i>
                            <div className="details">
                                <span className="title">{data.language === "es" ? "Autorización de inicio" : (data.language === "en" ? "Authorisation to start" : "Autorização para iniciar")}</span>
                            </div>
                            <p>{data.language === "es" ? "Rectorado - Órgano Colegiado Superior (OCS)" : (data.language === "en" ? "Rectorate - Supreme Collegiate Body (OCS)" : "Reitoria - Órgão Colegiado Superior (OCS)")}</p>
                        </section>
                    </div>
                    <div className="row row-2">
                        <section>
                            <i className="icon fa fa-gear"></i>
                            <div className="details">
                                <span className="title">{data.language === "es" ? "Configuración en el SGA" : (data.language === "en" ? "Configuration in the SGA" : "Configuração no SGA")}</span>
                            </div>
                            <p>{data.language === "es" ? "Unidad de Sistema de Gestión Académica (SGA)" : (data.language === "en" ? "Academic Management System Unit (SGA)" : "Unidade do Sistema de Gestão Acadêmica (SGA)")}</p>
                        </section>
                    </div>
                    <div className="row row-1">
                        <section>
                            <i className="icon fa fa-unlock"></i>
                            <div className="details">
                                <span className="title">{data.language === "es" ? "Apertura en el SGA" : (data.language === "en" ? "Opening in the SGA" : "Abertura no SGA")}</span>
                            </div>
                            <p>{data.language === "es" ? "Unidad de Sistema de Gestión Académica (SGA)" : (data.language === "en" ? "Academic Management System Unit (SGA)" : "Unidade do Sistema de Gestão Acadêmica (SGA)")}</p>
                        </section>
                    </div>
                    <div className="row row-2">
                        <section>
                            <i className="icon fa fa-send"></i>
                            <div className="details">
                                <span className="title">{data.language === "es" ? "Envío de solicitudes" : (data.language === "en" ? "Sending of applications" : "Envio de aplicativos")}</span>
                            </div>
                            <p>{data.language === "es" ? "Estudiantes" : (data.language === "en" ? "Students" : "Estudantes")}</p>
                        </section>
                    </div>
                    <div className="row row-1">
                        <section>
                            <i className="icon fa fa-check-square-o"></i>
                            <div className="details">
                                <span className="title">{data.language === "es" ? "Revisión y verificación" : (data.language === "en" ? "Review and verification" : "Revisão e verificação")}</span>
                            </div>
                            <p>{data.language === "es" ? "Unidad de Bienestar Universitario (UBU)" : (data.language === "en" ? "University Welfare Unit (UBU)" : "Unidade de bem-estar da universidade (UBU)")}</p>
                        </section>
                    </div>
                    <div className="row row-2">
                        <section>
                            <i className="icon fa fa-credit-card"></i>
                            <div className="details">
                                <span className="title">{data.language === "es" ? "Autorización de pagos" : (data.language === "en" ? "Payment authorisation" : "Autorização de pagamento")}</span>
                            </div>
                            <p>{data.language === "es" ? "Rectorado" : (data.language === "en" ? "Rectorate" : "Reitoria")}</p>
                        </section>
                    </div>
                    <div className="row row-1">
                        <section>
                            <i className="icon fa fa-exchange"></i>
                            <div className="details">
                                <span className="title">{data.language === "es" ? "Transferencia de valores" : (data.language === "en" ? "Transfer of monetary values" : "Transferência de valores monetários")}</span>
                            </div>
                            <p>{data.language === "es" ? "Dirección financiera" : (data.language === "en" ? "Financial management" : "Gerenciamento financeiro")}</p>
                        </section>
                    </div>
                    <div className="row row-2">
                        <section>
                            <i className="icon fa fa-money"></i>
                            <div className="details">
                                <span className="title">{data.language === "es" ? "Recepción de pago" : (data.language === "en" ? "Receipt of payment" : "Recebimento do pagamento")}</span>
                            </div>
                            <p>{data.language === "es" ? "Estudiantes" : (data.language === "en" ? "Students" : "Estudantes")}</p>
                        </section>
                    </div>
                </div>
                <br />
                <h2 className="msg-pnl-search text-rigth mb-3">{data.language === "es" ? "Preguntas frecuentes sobre las ayudas económicas 2023-2024" : (data.language === "en" ? "Frequently asked questions on financial support 2023-2024" : "Perguntas frequentes sobre suporte financeiro 2023-2024")}</h2>
                <Accordion defaultActiveKey={0}>
                    <Accordion.Item eventKey={0} key={0}>
                        <Accordion.Header>{data.language === "es" ? "¿Qué debo hacer?" : (data.language === "en" ? "What should I do?" : "O que devo fazer?")}</Accordion.Header>
                        <Accordion.Body>
                            <div className="paragraph-cont">
                                <p className="text-cont">
                                    {data.language === "es" ? (
                                        <>
                                            Ingresar al SGA con su usuario y contraseña y verificar si fuiste convocado y notificado para participar en la entrega de ayudas económicas.<br />
                                            Si fuiste convocado y notificado por el SGA deberá leer todas las instrucciones para la obtención de este beneficio.<br />
                                            El beneficiario debe ingresar a la pestaña <b>MAYOR INFORMACIÓN</b> y cumplir con todos los requisitos que se exige para este beneficio y junto con la solicitud de Ayudas Económicas debidamente firmada subirla en un solo PDF junto a los demás requisitos en la plataforma del SGA.
                                        </>
                                    ) : (data.language === "en" ? (
                                        <>
                                            Log in to the SGA with your username and password and verify if you have been called and notified to participate in the economic aid delivery.<br />
                                            If you have been called and notified by the SGA, you must read all the instructions to obtain this benefit.<br />
                                            The beneficiary must go to the <b>MORE INFORMATION</b> tab and meet all the requirements required for this benefit and upload the signed Economic Aid application in a single PDF along with the other requirements on the SGA platform.
                                        </>
                                    ) : (
                                        <>
                                            Faça login no SGA com seu nome de usuário e senha e verifique se você foi convocado e notificado para participar na entrega de auxílios econômicos.<br />
                                            Se você foi convocado e notificado pelo SGA, deve ler todas as instruções para obter este benefício.<br />
                                            O beneficiário deve acessar a aba <b>MAIS INFORMAÇÕES</b> e cumprir todos os requisitos exigidos para este benefício, além de enviar a solicitação de Auxílio Econômico assinada em um único PDF juntamente com os demais requisitos na plataforma do SGA.
                                        </>
                                    ))}
                                </p>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey={1} key={1}>
                        <Accordion.Header>{data.language === "es" ? "¿Cuando debo subir la certificación bancaria?" : (data.language === "en" ? "When should I upload the bank certification?" : "Quando devo fazer o upload da certificação bancária?")}</Accordion.Header>
                        <Accordion.Body>
                            <div className="paragraph-cont">
                                <p className="text-cont">
                                    {data.language === "es" ? (
                                        <>
                                            La certificación bancaria para los beneficiarios por excelencia académica se debe subir cuando ha subido la solicitud firmada y es aprobado automáticamente por el SGA.<br />
                                            Los estudiantes beneficiarios en otros componentes como limitada economía, etnias y discapacidad, una vez verificados y aprobados por Trabajo Social de la UTEQ se le habilitará el campo de <b>CERTIFICACION BANCARIA</b> debidamente actualizada en el SGA para que puedan subir en PDF dicho documento.
                                        </>
                                    ) : (data.language === "en" ? (
                                        <>
                                            The banking certification for academic excellence beneficiaries must be uploaded after the signed application is uploaded and automatically approved by the SGA.
                                            Beneficiaries in other components such as limited economy, ethnicities, and disabilities, once verified and approved by the UTEQ's Social Work department, will have the <b>BANKING CERTIFICATION</b> field enabled in the SGA to upload this document in PDF format.
                                        </>
                                    ) : (
                                        <>
                                            A certificação bancária para os beneficiários da excelência acadêmica deve ser enviada após o envio do formulário assinado e ser automaticamente aprovada pelo SGA.
                                            Beneficiários em outros componentes como economia limitada, etnias e deficiências, uma vez verificados e aprovados pelo Serviço Social da UTEQ, terão o campo de <b>CERTIFICAÇÃO BANCÁRIA</b> habilitado no SGA para enviar este documento em formato PDF.
                                        </>
                                    ))}
                                </p>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey={2} key={2}>
                        <Accordion.Header>{data.language === "es" ? "¿Puedo subir la certificación bancaria del año pasado?" : (data.language === "en" ? "Can I upload last year's bank certification?" : "Posso fazer o upload da certificação bancária do ano passado?")}</Accordion.Header>
                        <Accordion.Body>
                            <div className="paragraph-cont">
                                <p className="text-cont">
                                    {data.language === "es" ? (
                                        <>
                                            NO, todo documento debe ser actualizado a la fecha.
                                        </>
                                    ) : (data.language === "en" ? (
                                        <>
                                            NO, all documents must be updated to the current date.
                                        </>
                                    ) : (
                                        <>
                                            NÃO, todos os documentos devem estar atualizados até a data atual.
                                        </>
                                    ))}
                                </p>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey={3} key={3}>
                        <Accordion.Header>{data.language === "es" ? "¿Puedo subir la certificación bancaria de mi Mamá, mi Papá o de algún otro familiar?" : (data.language === "en" ? "Can I upload the bank certification of my Mum, Dad or other family members?" : "Posso carregar a certificação bancária da minha mãe, do meu pai ou de outros membros da família?")}</Accordion.Header>
                        <Accordion.Body>
                            <div className="paragraph-cont">
                                <p className="text-cont">
                                    {data.language === "es" ? (
                                        <>
                                            NO, la certificación bancaria es exclusivo del beneficiario.
                                        </>
                                    ) : (data.language === "en" ? (
                                        <>
                                            NO, the banking certification is exclusive to the beneficiary.
                                        </>
                                    ) : (
                                        <>
                                            NÃO, a certificação bancária é exclusiva do beneficiário.
                                        </>
                                    ))}
                                </p>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey={4} key={4}>
                        <Accordion.Header>{data.language === "es" ? "¿Qué dirección debo poner en el croquis porque antes vivía en Quevedo, pero ahora me regrese a la casa de mi mama?" : (data.language === "en" ? "What address should I put in the sketch because I used to live in Quevedo, but now I am moving back to my mother's house?" : "Que endereço devo colocar no esboço porque eu morava em Quevedo, mas agora estou me mudando de volta para a casa da minha mãe?")}</Accordion.Header>
                        <Accordion.Body>
                            <div className="paragraph-cont">
                                <p className="text-cont">
                                    {data.language === "es" ? (
                                        <>
                                            Coloque la dirección del domicilio actual donde usted vive (Actualice sus datos en Hoja de Vida del SGA).
                                        </>
                                    ) : (data.language === "en" ? (
                                        <>
                                            Please enter your current home address (Update your details in the SGA CV).
                                        </>
                                    ) : (
                                        <>
                                            Por favor, insira o endereço residencial atual onde você mora (Atualize seus dados no currículo do SGA).
                                        </>
                                    ))}
                                </p>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                {/*<Accordion.Item eventKey={5} key={5}>
                        <Accordion.Header>{data.language === "es" ? "¿Porque me aparece solo el componente afectados por pandemia, no me deja escoger limitada economía?" : (data.language === "en" ? "Why do I only get the pandemic affected component, it doesn't let me choose limited economy?" : "Por que só recebo o componente afetado pela pandemia, não me permite escolher a economia limitada?")}</Accordion.Header>
                        <Accordion.Body>
                            <div className="paragraph-cont">
                                <p className="text-cont">
                                    {data.language === "es" ? (
                                        <>
                                            El componente por afectados por pandemia COVID será notificado a todos los posibles estudiantes que hayan sido afectados por esta enfermedad durante la pandemia o algún miembro de su núcleo familiar, y su reconocimiento es desde el primer semestre  de estudios.
                                        </>
                                    ) : (data.language === "en" ? (
                                        <>
                                            The component for those affected by the COVID pandemic will notify all potential students who have been affected by this disease during the pandemic or any member of their immediate family, and its recognition is from the first semester of studies.
                                        </>
                                    ) : (
                                        <>
                                            O componente para os afetados pela pandemia de COVID notificará todos os estudantes potenciais que foram afetados por esta doença durante a pandemia ou qualquer membro de sua família nuclear, e seu reconhecimento é desde o primeiro semestre de estudos.
                                        </>
                                    ))}
                                </p>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>*/}
                    <Accordion.Item eventKey={6} key={6}>
                        <Accordion.Header>{data.language === "es" ? "¿Debo poner en los “datos familiares” de la hoja de vida, los ingresos míos o de mis familiares?" : (data.language === "en" ? "Do I have to put my own or my relatives' income in the “family data” of the curriculum vitae?" : "Preciso colocar minha renda ou a de meus parentes nos “dados familiares” do curriculum vitae?")}</Accordion.Header>
                        <Accordion.Body>
                            <div className="paragraph-cont">
                                <p className="text-cont">
                                    {data.language === "es" ? (
                                        <>
                                            La <b>HOJA DE VIDA</b> y la <b>FICHA SOCIOECONÓMICA</b> reflejan la situación económica del estudiante. Alguien debe sustentar los gastos de vida y estudios del estudiante, es importante conocer de quién proviene el ingreso económico y su situación.
                                        </>
                                    ) : (data.language === "en" ? (
                                        <>
                                            The <b>CV</b> and the <b>SOCIOECONOMIC FORM</b> reflect the student's economic situation. Someone must support the student's living and study expenses; it's important to know the source of income and their situation.
                                        </>
                                    ) : (
                                        <>
                                            O <b>CV</b> e o <b>FORMULÁRIO SOCIOECONÔMICO</b> refletem a situação econômica do estudante. Alguém deve sustentar as despesas de vida e estudo do estudante; é importante conhecer a origem da renda e sua situação.
                                        </>
                                    ))}
                                </p>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey={7} key={7}>
                        <Accordion.Header>{data.language === "es" ? "Solo le envié la solicitud de ayudas económicas en el SGA y me olvidé del resto de documentos. ¿Qué debo hacer?" : (data.language === "en" ? "I only sent you the application for financial aid in the SGA and I forgot the other documents, what should I do?" : "Enviei apenas a solicitação de auxílio financeiro no SGA e esqueci os outros documentos, o que devo fazer?")}</Accordion.Header>
                        <Accordion.Body>
                            <div className="paragraph-cont">
                                <p className="text-cont">
                                    {data.language === "es" ? (
                                        <>
                                            Si no adjunto en un solo PDF los documentos exigidos para la ayuda económica, su solicitud será <b>RECHAZADA</b>.<br />
                                            El SGA le notificara como rechazado, en cuyo caso debe volver a realizar el proceso desde cero adjuntando todos los requisitos solicitados incluido la solicitud de ayuda económica (Tiene 3 oportunidades para solicitar la ayuda económica caso contrario se bloqueara el sistema y ya no podrá volver a subir los documentos y por tanto perderá este beneficio).
                                        </>
                                    ) : (data.language === "en" ? (
                                        <>
                                            If you do not attach all required documents in a single PDF for the economic aid, your application will be <b>REJECTED</b>.<br />
                                            The SGA will notify you of the rejection, in which case you must start the process again from scratch, attaching all required documents including the economic aid application (You have 3 opportunities to apply for economic aid; otherwise, the system will be blocked, and you will no longer be able to upload documents, thus losing this benefit).
                                        </>
                                    ) : (
                                        <>
                                            Se você não anexar todos os documentos necessários em um único PDF para o auxílio econômico, sua solicitação será <b>REJEITADA</b>.<br />
                                            O SGA notificará você sobre a rejeição, caso em que você deve iniciar o processo novamente do zero, anexando todos os documentos necessários, incluindo a solicitação de auxílio econômico (Você tem 3 oportunidades para solicitar o auxílio econômico; caso contrário, o sistema será bloqueado e você não poderá mais enviar documentos, perdendo assim este benefício).
                                        </>
                                    ))}
                                </p>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey={8} key={8}>
                        <Accordion.Header>{data.language === "es" ? "¿Soy Madre soltera, me pueden dar la ayuda económica?" : (data.language === "en" ? "I am a single mother, can I get financial aid?" : "Sou mãe solteira, posso obter ajuda financeira?")}</Accordion.Header>
                        <Accordion.Body>
                            <div className="paragraph-cont">
                                <p className="text-cont">
                                    {data.language === "es" ? (
                                        <>
                                            La ayuda económica para los estudiantes es de acuerdo a lo que refleje su ficha socioeconómica en el SGA y es notificado por el mismo sistema siempre y cuando cumpla con los requisitos establecidos en el Reglamento de Becas y en el Procedimiento de las Ayudas Económicas vigente, si no fue notificada no podrá ser beneficiada de esta ayuda.
                                        </>
                                    ) : (data.language === "en" ? (
                                        <>
                                            Financial aid for students is based on their socioeconomic form in the SGA and is notified by the system itself, provided they meet the requirements established in the Scholarship Regulations and the current Economic Aid Procedure. If not notified, they cannot benefit from this aid.
                                        </>
                                    ) : (
                                        <>
                                            A ajuda financeira para os estudantes é baseada nas informações socioeconômicas deles no SGA e é notificada pelo próprio sistema, desde que cumpram os requisitos estabelecidos no Regulamento de Bolsas e no Procedimento Atual de Ajuda Econômica. Se não forem notificados, não poderão receber esta ajuda.
                                        </>
                                    ))}
                                </p>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey={9} key={9}>
                        <Accordion.Header>{data.language === "es" ? "¿Me sale rechazado que hago?" : (data.language === "en" ? "I get rejected, what do I do?" : "Se eu for rejeitado, o que devo fazer?")}</Accordion.Header>
                        <Accordion.Body>
                            <div className="paragraph-cont">
                                <p className="text-cont">
                                    {data.language === "es" ? (
                                        <>
                                            Nuevamente debe ingresar al SGA con su usuario y contraseña y volver a realizar el mismo procedimiento desde cero.<br />
                                            Si fuiste convocado y notificado por el SGA deberá leer todas las instrucciones para la obtención de este beneficio.<br />
                                            El beneficiario debe ingresar a la pestaña MAS INFORMACION y cumplir con todos los requisitos que se exige para este beneficio y junto con la solicitud de Ayudas Económicas debidamente firmada subirla en un solo PDF junto a los demás requisitos en la plataforma del SGA.<br />
                                            Recuerde que el SGA solo le da opción a ingresar al sistema hasta 3 veces, luego se bloqueará y no podrá acceder al mismo aunque haya sido convocado.
                                        </>
                                    ) : (data.language === "en" ? (
                                        <>
                                            You must log in to the SGA again with your username and password and start the same procedure from scratch.<br />
                                            If you were summoned and notified by the SGA, you must read all instructions to obtain this benefit.<br />
                                            The beneficiary must go to the MORE INFORMATION tab and meet all the requirements required for this benefit and, along with the properly signed Economic Aid application, upload it in a single PDF along with other requirements on the SGA platform.<br />
                                            Remember that the SGA only allows you to log in up to 3 times; after that, it will be blocked and you will not be able to access it even if summoned.
                                        </>
                                    ) : (
                                        <>
                                            Você deve acessar novamente o SGA com seu nome de usuário e senha e começar o mesmo procedimento do zero.<br />
                                            Se você foi convocado e notificado pelo SGA, deve ler todas as instruções para obter este benefício.<br />
                                            O beneficiário deve acessar a aba MAIS INFORMAÇÕES e cumprir todos os requisitos exigidos para este benefício e, junto com a solicitação de Auxílio Econômico devidamente assinada, enviá-la em um único PDF junto com outros requisitos na plataforma do SGA.<br />
                                            Lembre-se de que o SGA permite apenas 3 acessos ao sistema; depois disso, ele será bloqueado e você não poderá acessá-lo, mesmo que tenha sido convocado.
                                        </>
                                    ))}
                                </p>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div><br />
    </>);
}