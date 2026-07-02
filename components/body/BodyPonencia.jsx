/*import { v4 as uuidv4 } from 'uuid';

export { BodyPonencia };

function ItemRowTable(props) {
    return (
        <tr>
            <td className="text-center">{props.participante.trim()}</td>
            <td className="text-center">{props.tipo.trim()}</td>
        </tr>
    )
}

function BodyPonencia(data) {

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const listRowsTable = (dataItems) => {
        return (
            dataItems.map((item) => {
                return (<ItemRowTable key={uuidv4()} participante={item.participante} tipo={item.tipo} />);
            })
        )
    }

    return (<>
        <div className="row g-0">
            <h2 className="title-cont-page text-center mb-3">{(data.dataexps !== null && data.dataexps !== '') ? data.dataexps[0].titulo.trim() : (data.language === "es" ? "Ponencia" : (data.language === "en" ? "Paper" : "Papel"))}</h2>
            {
                (data.dataexps !== null && data.dataexps !== '') ? (<>
                    <div className="col-md-12 mt-2">
                        <div className="alert alert-success message-lang" role="alert">
                            {data.language === "es" ? "El contenido solo esta disponible en español" : (data.language === "en" ? "The content is only available in Spanish" :
                                "O conteúdo só está disponível em espanhol")}
                        </div>
                    </div>
                    <div className="col-md-12 mt-2">
                        {
                            (data.dataexps[0].evento !== null && data.dataexps[0].evento !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">{data.language === "en" ? "Event" : "Evento"}</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.dataexps[0].evento.trim()}</p></div>
                            </>) : ""
                        }
                        {
                            (data.dataexps[0].organizadorevento !== null && data.dataexps[0].organizadorevento !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Organizador del evento" : (data.language === "en" ? "Event organiser" : "Organizador de eventos")}</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.dataexps[0].organizadorevento.trim()}</p></div>
                            </>) : ""
                        }
                        {
                            (data.dataexps[0].edicionevento !== null && data.dataexps[0].edicionevento !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Edición del evento" : (data.language === "en" ? "Edition of the event" : "Edição do evento")}</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.dataexps[0].edicionevento.trim()}</p></div>
                            </>) : ""
                        }
                        {
                            (data.dataexps[0].pais !== null && data.dataexps[0].pais !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">{data.language === "en" ? "Country" : "País"}</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.dataexps[0].pais.trim()}</p></div>
                            </>) : ""
                        }
                        {
                            (data.dataexps[0].areaconocimiento !== null && data.dataexps[0].areaconocimiento !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Área de conocimiento" : (data.language === "en" ? "Area of knowledge" : "Área de conhecimento")}</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.dataexps[0].areaconocimiento.trim()}</p></div>
                            </>) : ""
                        }
                        {
                            (data.dataexps[0].subareaconocimiento !== null && data.dataexps[0].subareaconocimiento !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "" : (data.language === "en" ? "Sub-area of knowledge" : "Sub-área de conhecimento")}</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.dataexps[0].subareaconocimiento.trim()}</p></div>
                            </>) : ""
                        }
                        {
                            (data.dataexps[0].subareaespecificaconocimiento !== null && data.dataexps[0].subareaespecificaconocimiento !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Subárea específica de conocimiento" : (data.language === "en" ? "Specific sub-area of knowledge" : "Subdomínio específico do conhecimento")}</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.dataexps[0].subareaespecificaconocimiento.trim()}</p></div>
                            </>) : ""
                        }
                        {
                            (data.dataexps[0].anio !== null && data.dataexps[0].anio !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Año" : (data.language === "en" ? "Year" : "Ano")}</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.dataexps[0].anio.trim()}</p></div>
                            </>) : ""
                        }
                        {
                            (data.dataexps[0].autores !== null && data.dataexps[0].autores !== '') ? (<>
                                {
                                    data.dataexps[0].autores.length > 0 ? (<>
                                        <div className="col-md-12 w-100">
                                            <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Autor/es" : (data.language === "en" ? "Author(s)" : "Autor(es)")}</h2>
                                            <table id="tbl-sublines" className="display table-static w-100">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center">{data.language === "es" ? "Nombre completo" : (data.language === "en" ? "Full name" : "Nome completo")}</th>
                                                        <th className="text-center">{data.language === "es" ? "Rol" : (data.language === "en" ? "Role" : "Papel")}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {listRowsTable(data.dataexps[0].autores)}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>) : ""
                                }
                            </>) : ""
                        }
                    </div></>) : ""
            }
        </div>
    </>);
}*/


import { v4 as uuidv4 } from "uuid";

export { BodyPonencia };

function ItemRowTable({ participante, tipo }) {
    const participanteText = (participante || "").trim();
    const tipoText = (tipo || "").trim();

    return (
        <tr>
            <td className="text-center">{participanteText}</td>
            <td className="text-center">{tipoText}</td>
        </tr>
    );
}

function BodyPonencia(data) {
    const { dataexps, language } = data;

    const hasExp = Array.isArray(dataexps) && dataexps.length > 0;
    const exp = hasExp ? dataexps[0] : null;

    const titulo =
        (exp?.titulo || "").trim() ||
        (language === "es"
            ? "Ponencia"
            : language === "en"
                ? "Paper"
                : "Papel");

    const openInNewTab = (url) => {
        const newWindow = window.open(url, "_blank", "noopener,noreferrer");
        if (newWindow) newWindow.opener = null;
    };

    const listRowsTable = (items) => {
        if (!Array.isArray(items)) return null;
        return items.map((item) => (
            <ItemRowTable
                key={uuidv4()}
                participante={item?.participante}
                tipo={item?.tipo}
            />
        ));
    };

    return (
        <>
            <div className="row g-0">
                {/* TÍTULO */}
                <h2 className="title-cont-page text-center mb-3">{titulo}</h2>

                {hasExp && (
                    <>
                        {/* ALERTA DE IDIOMA */}
                        <div className="col-md-12 mt-2">
                            <div className="alert alert-success message-lang" role="alert">
                                {language === "es"
                                    ? "El contenido solo esta disponible en español"
                                    : language === "en"
                                        ? "The content is only available in Spanish"
                                        : "O conteúdo só está disponível em espanhol"}
                            </div>
                        </div>

                        <div className="col-md-12 mt-2">
                            {/* Evento */}
                            {exp.evento?.trim() && (
                                <>
                                    <h2 className="msg-pnl-search text-rigth">
                                        {language === "en" ? "Event" : "Evento"}
                                    </h2>
                                    <div className="paragraph-cont">
                                        <p className="text-cont">{exp.evento.trim()}</p>
                                    </div>
                                </>
                            )}

                            {/* Organizador */}
                            {exp.organizadorevento?.trim() && (
                                <>
                                    <h2 className="msg-pnl-search text-rigth">
                                        {language === "es"
                                            ? "Organizador del evento"
                                            : language === "en"
                                                ? "Event organiser"
                                                : "Organizador de eventos"}
                                    </h2>
                                    <div className="paragraph-cont">
                                        <p className="text-cont">
                                            {exp.organizadorevento.trim()}
                                        </p>
                                    </div>
                                </>
                            )}

                            {/* Edición */}
                            {exp.edicionevento?.trim() && (
                                <>
                                    <h2 className="msg-pnl-search text-rigth">
                                        {language === "es"
                                            ? "Edición del evento"
                                            : language === "en"
                                                ? "Edition of the event"
                                                : "Edição do evento"}
                                    </h2>
                                    <div className="paragraph-cont">
                                        <p className="text-cont">{exp.edicionevento.trim()}</p>
                                    </div>
                                </>
                            )}

                            {/* País */}
                            {exp.pais?.trim() && (
                                <>
                                    <h2 className="msg-pnl-search text-rigth">
                                        {language === "en" ? "Country" : "País"}
                                    </h2>
                                    <div className="paragraph-cont">
                                        <p className="text-cont">{exp.pais.trim()}</p>
                                    </div>
                                </>
                            )}

                            {/* Área de conocimiento */}
                            {exp.areaconocimiento?.trim() && (
                                <>
                                    <h2 className="msg-pnl-search text-rigth">
                                        {language === "es"
                                            ? "Área de conocimiento"
                                            : language === "en"
                                                ? "Area of knowledge"
                                                : "Área de conhecimento"}
                                    </h2>
                                    <div className="paragraph-cont">
                                        <p className="text-cont">
                                            {exp.areaconocimiento.trim()}
                                        </p>
                                    </div>
                                </>
                            )}

                            {/* Subárea de conocimiento */}
                            {exp.subareaconocimiento?.trim() && (
                                <>
                                    <h2 className="msg-pnl-search text-rigth">
                                        {language === "es"
                                            ? "Subárea de conocimiento"
                                            : language === "en"
                                                ? "Sub-area of knowledge"
                                                : "Sub-área de conhecimento"}
                                    </h2>
                                    <div className="paragraph-cont">
                                        <p className="text-cont">
                                            {exp.subareaconocimiento.trim()}
                                        </p>
                                    </div>
                                </>
                            )}

                            {/* Subárea específica */}
                            {exp.subareaespecificaconocimiento?.trim() && (
                                <>
                                    <h2 className="msg-pnl-search text-rigth">
                                        {language === "es"
                                            ? "Subárea específica de conocimiento"
                                            : language === "en"
                                                ? "Specific sub-area of knowledge"
                                                : "Subdomínio específico do conhecimento"}
                                    </h2>
                                    <div className="paragraph-cont">
                                        <p className="text-cont">
                                            {exp.subareaespecificaconocimiento.trim()}
                                        </p>
                                    </div>
                                </>
                            )}

                            {/* Año */}
                            {exp.anio && String(exp.anio).trim() && (
                                <>
                                    <h2 className="msg-pnl-search text-rigth">
                                        {language === "es"
                                            ? "Año"
                                            : language === "en"
                                                ? "Year"
                                                : "Ano"}
                                    </h2>
                                    <div className="paragraph-cont">
                                        <p className="text-cont">{String(exp.anio).trim()}</p>
                                    </div>
                                </>
                            )}

                            {/* Autores */}
                            {Array.isArray(exp.autores) && exp.autores.length > 0 && (
                                <div className="col-md-12 w-100">
                                    <h2 className="msg-pnl-search text-rigth">
                                        {language === "es"
                                            ? "Autor/es"
                                            : language === "en"
                                                ? "Author(s)"
                                                : "Autor(es)"}
                                    </h2>
                                    <table
                                        id="tbl-sublines"
                                        className="display table-static w-100"
                                    >
                                        <thead>
                                            <tr>
                                                <th className="text-center">
                                                    {language === "es"
                                                        ? "Nombre completo"
                                                        : language === "en"
                                                            ? "Full name"
                                                            : "Nome completo"}
                                                </th>
                                                <th className="text-center">
                                                    {language === "es"
                                                        ? "Rol"
                                                        : language === "en"
                                                            ? "Role"
                                                            : "Papel"}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>{listRowsTable(exp.autores)}</tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
