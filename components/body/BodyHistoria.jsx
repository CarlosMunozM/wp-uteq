import { PHOTOS_FOLDER } from 'config';
import DOMPurify from 'isomorphic-dompurify';
import { SliderImg } from 'components';

export { BodyHistoria };

function BodyHistoria(data) {

    const sanitizedData = (codeHTML) => ({
        __html: DOMPurify.sanitize(codeHTML)
    })

    const renderTextInfo = (dataInfoInst) => {
        return (<>
            <div className="row">
                <h2 className="title-cont-page text-center">{dataInfoInst.language === "es" ? "Universidad Técnica Estatal de Quevedo" : (dataInfoInst.language === "en" ? "Quevedo State Technical University" : "Universidade Técnica Estatal de Quevedo")}</h2>
                <div className="col-md-6 mb-3">
                    <div className="card pnl-panel-history">
                        <div className="card-header pnl-header-history">
                            {dataInfoInst.language === "es" ? "Misión" : (dataInfoInst.language === "en" ? "Mission" : "Missão")}
                        </div>
                        <div className="card-body pnl-body-history">
                            <p className="card-text">{dataInfoInst.language === "es" ? "Formar profesionales y académicos competitivos y de excelencia; generando conocimiento, tecnología; servicios de calidad y soluciones a los problemas de la sociedad; sustentada en principios y valores éticos." :
                                (dataInfoInst.language === "en" ? "To train competitive professionals and academics of excellence, generating knowledge, technology, quality services and solutions to society's problems, based on ethical principles and values." :
                                    "Formar profissionais competitivos e académicos de excelência, gerando conhecimento, tecnologia, serviços de qualidade e soluções para os problemas da sociedade, com base em princípios e valores éticos.")}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="card pnl-panel-history">
                        <div className="card-header pnl-header-history">
                            {dataInfoInst.language === "es" ? "Visión" : (dataInfoInst.language === "en" ? "Vision" : "Visão")}
                        </div>
                        <div className="card-body pnl-body-history mb-3">
                            <p className={`card-text ${dataInfoInst.language!=="pt"?"mb-4":"mb-1"}`}>{dataInfoInst.language === "es" ? "Ser una institución modelo en sostenibilidad universitaria con impacto nacional y responsabilidad social." : (dataInfoInst.language === "en" ? "To be a model institution in university sustainability with national impact and social responsibility." :
                                "Ser uma instituição modelo em sustentabilidade universitária com impacto nacional e responsabilidade social.")}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 w-100">
                    <h2 className="msg-pnl-search text-right mb-2">{dataInfoInst.language === "es" ? "Historia" : (dataInfoInst.language === "en" ? "History" : "História")}</h2>
                    {
                        (dataInfoInst.data8 !== null && dataInfoInst.data8 !== "") && (<div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(dataInfoInst.language === "es" ? dataInfoInst.data8.dpHistoria.trim() : (dataInfoInst.language === "en" ?
                            dataInfoInst.data8.dpHistoriaEn.trim() : dataInfoInst.data8.dpHistoriaPt.trim()))}></div>)
                    }
                </div>
                <div className="col-md-12 w-100">
                    {
                        (data.slider1 !== null && data.slider1 !== "") && (data.slider1.length > 0 && SliderImg(data.slider1.sort((a, b) => (a.sldOrden > b.sldOrden) ? 1 : -1), 68, 2000, 300))
                    }
                </div>
                <div className="col-md-12 mt-3">
                {/*<div className="card pnl-panel-history">
                        <div className="card-header pnl-header-history">
                            {dataInfoInst.language === "es" ? "Mensaje del Rector" : (dataInfoInst.language === "en" ? "Message from the Rector" : "Mensagem do Reitor")}
                        </div>
                        <div className="card-body pnl-body-history">
                            <p className="card-text">{dataInfoInst.language === "es" ? "La Universidad Técnica Estatal de Quevedo es una institución pionera en el campo agropecuario del Ecuador, innovadora y con un liderazgo consolidado en la región. En la UTEQ nuestra premisa es la cultura de la excelencia. Nuestra comunidad universitaria está comprometida en la mejora continua, demostrando así que la universidad pública ecuatoriana es también ejemplo de desarrollo y progreso." :
                                (dataInfoInst.language === "en" ? "The State Technical University of Quevedo is a pioneering institution in the agricultural field in Ecuador, innovative and with a consolidated leadership in the region. At UTEQ our premise is the culture of excellence. Our university community is committed to continuous improvement, thus demonstrating that the Ecuadorian public university is also an example of development and progress." :
                                    "A Universidade Técnica Estatal de Quevedo é uma instituição pioneira no campo agrícola no Equador, inovadora e com uma liderança consolidada na região. Na UTEQ, a nossa premissa é a cultura de excelência. A nossa comunidade universitária está empenhada na melhoria contínua, demonstrando assim que a universidade pública equatoriana é também um exemplo de desenvolvimento e progresso.")}</p>
                            <p className="card-text">{dataInfoInst.language === "es" ? "Nuestra investigación es vigorosa y está orientada a solucionar los problemas del Ecuador. El uso social del conocimiento es vital para la sociedad y en la UTEQ es parte de nuestra perspectiva." :
                                (dataInfoInst.language === "en" ? "Our research is vigorous and oriented towards solving Ecuador's problems. The social use of knowledge is vital for society and at UTEQ it is part of our perspective." : "A nossa investigação é vigorosa e orientada para a resolução dos problemas do Equador. O uso social do conhecimento é vital para a sociedade e, na UTEQ, faz parte da nossa perspectiva.")}</p>
                            <p className="card-text">{dataInfoInst.language === "es" ? "Entendemos la responsabilidad social y el compromiso con el presente y futuro de nuestro país por eso la formación profesional de nuestros estudiantes es de primordial atención." :
                                (dataInfoInst.language === "en" ? "We understand the social responsibility and commitment to the present and future of our country and that is why the professional training of our students is of paramount importance." : "Compreendemos a responsabilidade social e o compromisso com o presente e o futuro do nosso país e é por isso que a formação profissional dos nossos estudantes é da maior importância.")}</p>
                            <p className="card-text">{dataInfoInst.language === "es" ? "La impronta de la UTEQ es una huella en la educación superior." :
                                (dataInfoInst.language === "en" ? "UTEQ's imprint is an imprint on higher education." : "A impressão da UTEQ é uma impressão no ensino superior.")}</p>
                            <div className="row">
                                <div className="col-md-4 mx-auto">
                                    <div className="ratio ratio-4x3">
                                        <img src={`${PHOTOS_FOLDER}img-aut-rector.jpg`} className="mx-auto d-block img-circle-pnl" alt={dataInfoInst.language === "es" ? "Foto del Rector" : (dataInfoInst.language === "en" ? "Photo of the Rector" : "Foto do Reitor")} />
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-pnl-msg">Dr. Eduardo Díaz Ocampo, PhD.</h3>
                        </div>
                    </div>*/}
                
                	<div className="card pnl-panel-history">
                        <div className="card-header pnl-header-history">
                            {dataInfoInst.language === "es" ? "Mensaje de la Rectora" : (dataInfoInst.language === "en" ? "Message from the Rector" : "Mensagem da Reitora")}
                        </div>
                        <div className="card-body pnl-body-history">
                            <p className="card-text">{dataInfoInst.language === "es" ? "La UTEQ reafirma su compromiso con la excelencia académica, la investigación aplicada y el desarrollo integral de la comunidad universitaria. En este espacio digital encontrarán información actualizada sobre nuestras carreras, proyectos de investigación, convocatorias y servicios de apoyo a estudiantes y docentes. Nuestra misión es fomentar un ambiente de aprendizaje colaborativo y multidisciplinario, donde cada iniciativa contribuya al progreso científico y al bienestar socioeconómico de nuestra región." :
                                (dataInfoInst.language === "en" ? "The UTEQ reaffirms its commitment to academic excellence, applied research, and the integral development of the university community. In this digital space, you will find updated information about our programs, research projects, calls for applications, and support services for students and faculty. Our mission is to foster a collaborative and multidisciplinary learning environment, where every initiative contributes to scientific progress and the socioeconomic well-being of our region." :
                                    "A UTEQ reafirma seu compromisso com a excelência acadêmica, a pesquisa aplicada e o desenvolvimento integral da comunidade universitária. Neste espaço digital, vocês encontrarão informações atualizadas sobre nossos cursos, projetos de pesquisa, editais e serviços de apoio a estudantes e docentes. Nossa missão é fomentar um ambiente de aprendizagem colaborativa e multidisciplinar, onde cada iniciativa contribua para o progresso científico e o bem-estar socioeconômico de nossa região.")}</p>
                            <p className="card-text">{dataInfoInst.language === "es" ? "En nombre de todo el cuerpo directivo, les invito a explorar los recursos disponibles y a participar activamente en las actividades que promovemos. A través de una gestión transparente y responsable, buscamos fortalecer los lazos con instituciones nacionales e internacionales, consolidar redes de colaboración y brindar oportunidades de crecimiento para todos nuestros miembros. Agradecemos su interés y confianza en la UTEQ, y los animamos a mantenerse informados y a compartir sus inquietudes mediante nuestros canales oficiales. Juntos, seguiremos construyendo una universidad líder, comprometida con la innovación y el desarrollo sostenible." :
                                (dataInfoInst.language === "en" ? "On behalf of the entire management team, I invite you to explore the available resources and actively participate in the activities we promote. Through transparent and responsible management, we aim to strengthen ties with national and international institutions, consolidate collaboration networks, and provide growth opportunities for all our members. We appreciate your interest and trust in UTEQ, and encourage you to stay informed and share your concerns through our official channels. Together, we will continue to build a leading university, committed to innovation and sustainable development." : "Em nome de toda a equipe diretiva, convido-os a explorar os recursos disponíveis e a participar ativamente nas atividades que promovemos. Através de uma gestão transparente e responsável, buscamos fortalecer os laços com instituições nacionais e internacionais, consolidar redes de colaboração e oferecer oportunidades de crescimento para todos os nossos membros. Agradecemos o seu interesse e confiança na UTEQ, e os incentivamos a manter-se informados e a compartilhar suas preocupações através de nossos canais oficiais. Juntos, continuaremos a construir uma universidade líder, comprometida com a inovação e o desenvolvimento sustentável.")}</p>
							<div className="row">
                                <div className="col-md-4 mx-auto">
                                    <div className="ratio ratio-4x3">
                                        <img src={`${PHOTOS_FOLDER}img-aut-rectora.jpg`} className="mx-auto d-block img-circle-pnl" alt={dataInfoInst.language === "es" ? "Foto de la Rectora" : (dataInfoInst.language === "en" ? "Photo of the Rector" : "Foto da Reitora")} />
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-pnl-msg">Dra. Yenny Torres Navarrete, PhD.</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>);
    }


    return (<>
        {renderTextInfo(data)}
    </>);
}