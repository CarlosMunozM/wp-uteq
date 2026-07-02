/*import { v4 as uuidv4 } from 'uuid';

export { BodyArticulo };

function ItemRowTable(props) {
    return (
        <tr>
            <td className="text-center">{props.participante.trim()}</td>
            <td className="text-center">{props.tipo.trim()}</td>
        </tr>
    )
}

function BodyArticulo(data) {

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    function handleClickLinkLocal(e) {
        e.preventDefault();
        if (data.datapaper[0].urllocal !== null && data.datapaper[0].urllocal !== "") {
            openInNewTab("https://" + data.datapaper[0].urllocal.trim());
        }
    }

    function handleClickLinkExtern(e) {
        e.preventDefault();
        if (data.datapaper[0].enlacepublicacion !== null && data.datapaper[0].enlacepublicacion !== "") {
            openInNewTab(data.datapaper[0].enlacepublicacion.trim());
        }
    }

    const listRowsTable = (dataItems) => {
        return (
            dataItems.map((item) => {
                return (<ItemRowTable key={uuidv4()} participante={item.participante} tipo={item.tipo} />);
            })
        )
    }

    function getValueStringFromArray(arrayValue) {
        var databases = '';
        if (arrayValue.length > 0) {
            arrayValue.map((item) => (
                databases += (databases, item.trim() + ", ")
            ));

            databases = databases.trim().slice(0, -1);
        }
        return databases;
    }

    return (<>
        <div className="row g-0">
            <h2 className="title-cont-page text-center mb-3">{(data.datapaper !== null && data.datapaper !== '') ? data.datapaper[0].titulo.trim() : (data.language === "es" ? "Artículo científico" : (data.language === "en" ? "Scientific article" : "Artigo científico"))}</h2>
            {
                (data.datapaper !== null && data.datapaper !== '') ? (<>
                    <div className="col-md-12 mt-2">
                        <div className="alert alert-success message-lang" role="alert">
                            {data.language === "es" ? "El contenido solo esta disponible en español" : (data.language === "en" ? "The content is only available in Spanish" :
                                "O conteúdo só está disponível em espanhol")}
                        </div>
                    </div>
                    <div className="col-md-12 mt-2">
                        {
                            (data.datapaper[0].revista !== null && data.datapaper[0].revista !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">{data.language === "en" ? "Magazine" : "Revista"}</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.datapaper[0].revista.trim()}</p></div>
                            </>) : ""
                        }
                        {
                            (data.datapaper[0].basedatosindexadas !== null && data.datapaper[0].basedatosindexadas !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Base de datos indexada" : (data.language === "en" ? "Indexed database" : "Base de dados indexada")}</h2>
                                <div className="paragraph-cont"><p className="text-cont">{getValueStringFromArray(data.datapaper[0].basedatosindexadas)}</p></div>
                            </>) : ""
                        }
                        {
                            (data.datapaper[0].areaconocimiento !== null && data.datapaper[0].areaconocimiento !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Área de conocimiento" : (data.language === "en" ? "Area of knowledge" : "Área de conhecimento")}</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.datapaper[0].areaconocimiento.trim()}</p></div>
                            </>) : ""
                        }
                        {
                            (data.datapaper[0].subareaconocimiento !== null && data.datapaper[0].subareaconocimiento !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Subárea de conocimiento" : (data.language === "en" ? "Sub-area of knowledge" : "Sub-área de conhecimento")}</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.datapaper[0].subareaconocimiento.trim()}</p></div>
                            </>) : ""
                        }
                        {
                            (data.datapaper[0].subareaespecificaconocimiento !== null && data.datapaper[0].subareaespecificaconocimiento !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Subárea específica de conocimiento" : (data.language === "en" ? "Specific sub-area of knowledge" : "Subdomínio específico do conhecimento")}</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.datapaper[0].subareaespecificaconocimiento.trim()}</p></div>
                            </>) : ""
                        }
                        {
                            (data.datapaper[0].anio !== null && data.datapaper[0].anio !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Año de publicación" : (data.language === "en" ? "Year of publication" : "Ano de publicação")}</h2>
                                <div className="paragraph-cont"><p className="text-cont">{data.datapaper[0].anio.trim()}</p></div>
                            </>) : ""
                        }
                        {
                            (data.datapaper[0].autores !== null && data.datapaper[0].autores !== '') ? (<>
                                {
                                    data.datapaper[0].autores.length > 0 ? (<>
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
                                                    {listRowsTable(data.datapaper[0].autores)}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>) : ""
                                }
                            </>) : ""
                        }
                        {
                            (data.datapaper[0].urllocal !== null && data.datapaper[0].urllocal !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth mt-3">{data.language === "en" ? "Document" : "Documento"}</h2>
                                <div className="paragraph-cont"><button type="button" className="btn-act-frm" onClick={handleClickLinkLocal} aria-label="link descargar pdf" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Descargar documento" : (data.language === "en" ? "Download document" : "Descarregar o documento")}>{data.language === "es" ? "Descargar" : (data.language === "en" ? "Download" : "Descarregar")}</button></div>
                            </>) : ""
                        }
                        {
                            (data.datapaper[0].enlacepublicacion !== null && data.datapaper[0].enlacepublicacion !== '') ? (<>
                                <h2 className="msg-pnl-search text-rigth mt-3">{data.language === "es" ? "Web de la Editorial" : (data.language === "en" ? "Publisher's website" : "Sítio Web do editor")}</h2>
                                <div className="paragraph-cont"><button type="button" className="btn-act-frm" onClick={handleClickLinkExtern} aria-label="link editorial pdf" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Ir a la página web de la Editorial" : (data.language === "en" ? "Go to the Publisher's website" : "Ir para o sítio Web do editor")}>{data.language === "en" ? "Visit" : "Visitar"}</button></div>
                            </>) : ""
                        }
                    </div></>) : ""
            }
        </div>
    </>);

}*/





import { v4 as uuidv4 } from 'uuid';

export { BodyArticulo };

function ItemRowTable({ participante, tipo }) {
    const participanteText = (participante || '').trim();
    const tipoText = (tipo || '').trim();

    return (
        <tr>
            <td className="text-center">{participanteText}</td>
            <td className="text-center">{tipoText}</td>
        </tr>
    );
}

function getValueStringFromArray(arrayValue) {
    if (!Array.isArray(arrayValue) || arrayValue.length === 0) return '';

    const cleaned = arrayValue
        .filter(Boolean)
        .map((item) => {
            if (typeof item === 'string') return item.trim();
            return String(item).trim();
        })
        .filter((item) => item !== '');

    return cleaned.join(', ');
}

function BodyArticulo(props) {
    const { datapaper, language } = props;

    const hasPaper = Array.isArray(datapaper) && datapaper.length > 0;
    const paper = hasPaper ? datapaper[0] : null;

    const titulo = (paper?.titulo || '').trim();

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
    };

    function handleClickLinkLocal(e) {
        e.preventDefault();
        const urlLocal = (paper?.urllocal || '').trim();
        if (urlLocal) {
            openInNewTab(urlLocal.startsWith('http') ? urlLocal : `https://${urlLocal}`);
        }
    }

    function handleClickLinkExtern(e) {
        e.preventDefault();
        const enlace = (paper?.enlacepublicacion || '').trim();
        if (enlace) {
            openInNewTab(enlace);
        }
    }

    const listRowsTable = (dataItems) => {
        if (!Array.isArray(dataItems)) return null;
        return dataItems.map((item) => (
            <ItemRowTable
                key={uuidv4()}
                participante={item?.participante}
                tipo={item?.tipo}
            />
        ));
    };

    const fallbackTitle =
        language === 'es'
            ? 'Artículo científico'
            : language === 'en'
                ? 'Scientific article'
                : 'Artigo científico';

    return (
        <>
            <div className="row g-0">
                <h2 className="title-cont-page text-center mb-3">
                    {hasPaper && titulo ? titulo : fallbackTitle}
                </h2>

                {hasPaper && (
                    <>
                        <div className="col-md-12 mt-2">
                            <div className="alert alert-success message-lang" role="alert">
                                {language === 'es'
                                    ? 'El contenido solo esta disponible en español'
                                    : language === 'en'
                                        ? 'The content is only available in Spanish'
                                        : 'O conteúdo só está disponível em espanhol'}
                            </div>
                        </div>

                        <div className="col-md-12 mt-2">
                            {/* Revista */}
                            {paper?.revista && paper.revista.trim() && (
                                <>
                                    <h2 className="msg-pnl-search text-rigth">
                                        {language === 'en' ? 'Magazine' : 'Revista'}
                                    </h2>
                                    <div className="paragraph-cont">
                                        <p className="text-cont">{paper.revista.trim()}</p>
                                    </div>
                                </>
                            )}

                            {/* Base de datos indexada */}
                            {paper?.basedatosindexadas && (
                                <>
                                    <h2 className="msg-pnl-search text-rigth">
                                        {language === 'es'
                                            ? 'Base de datos indexada'
                                            : language === 'en'
                                                ? 'Indexed database'
                                                : 'Base de dados indexada'}
                                    </h2>
                                    <div className="paragraph-cont">
                                        <p className="text-cont">
                                            {getValueStringFromArray(paper.basedatosindexadas)}
                                        </p>
                                    </div>
                                </>
                            )}

                            {/* Área de conocimiento */}
                            {paper?.areaconocimiento && paper.areaconocimiento.trim() && (
                                <>
                                    <h2 className="msg-pnl-search text-rigth">
                                        {language === 'es'
                                            ? 'Área de conocimiento'
                                            : language === 'en'
                                                ? 'Area of knowledge'
                                                : 'Área de conhecimento'}
                                    </h2>
                                    <div className="paragraph-cont">
                                        <p className="text-cont">{paper.areaconocimiento.trim()}</p>
                                    </div>
                                </>
                            )}

                            {/* Subárea de conocimiento */}
                            {paper?.subareaconocimiento &&
                                paper.subareaconocimiento.trim() && (
                                    <>
                                        <h2 className="msg-pnl-search text-rigth">
                                            {language === 'es'
                                                ? 'Subárea de conocimiento'
                                                : language === 'en'
                                                    ? 'Sub-area of knowledge'
                                                    : 'Sub-área de conhecimento'}
                                        </h2>
                                        <div className="paragraph-cont">
                                            <p className="text-cont">
                                                {paper.subareaconocimiento.trim()}
                                            </p>
                                        </div>
                                    </>
                                )}

                            {/* Subárea específica */}
                            {paper?.subareaespecificaconocimiento &&
                                paper.subareaespecificaconocimiento.trim() && (
                                    <>
                                        <h2 className="msg-pnl-search text-rigth">
                                            {language === 'es'
                                                ? 'Subárea específica de conocimiento'
                                                : language === 'en'
                                                    ? 'Specific sub-area of knowledge'
                                                    : 'Subdomínio específico do conhecimento'}
                                        </h2>
                                        <div className="paragraph-cont">
                                            <p className="text-cont">
                                                {paper.subareaespecificaconocimiento.trim()}
                                            </p>
                                        </div>
                                    </>
                                )}

                            {/* Año */}
                            {paper?.anio && String(paper.anio).trim() && (
                                <>
                                    <h2 className="msg-pnl-search text-rigth">
                                        {language === 'es'
                                            ? 'Año de publicación'
                                            : language === 'en'
                                                ? 'Year of publication'
                                                : 'Ano de publicação'}
                                    </h2>
                                    <div className="paragraph-cont">
                                        <p className="text-cont">
                                            {String(paper.anio).trim()}
                                        </p>
                                    </div>
                                </>
                            )}

                            {/* Autores */}
                            {Array.isArray(paper?.autores) && paper.autores.length > 0 && (
                                <div className="col-md-12 w-100">
                                    <h2 className="msg-pnl-search text-rigth">
                                        {language === 'es'
                                            ? 'Autor/es'
                                            : language === 'en'
                                                ? 'Author(s)'
                                                : 'Autor(es)'}
                                    </h2>
                                    <table
                                        id="tbl-sublines"
                                        className="display table-static w-100"
                                    >
                                        <thead>
                                            <tr>
                                                <th className="text-center">
                                                    {language === 'es'
                                                        ? 'Nombre completo'
                                                        : language === 'en'
                                                            ? 'Full name'
                                                            : 'Nome completo'}
                                                </th>
                                                <th className="text-center">
                                                    {language === 'es'
                                                        ? 'Rol'
                                                        : language === 'en'
                                                            ? 'Role'
                                                            : 'Papel'}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>{listRowsTable(paper.autores)}</tbody>
                                    </table>
                                </div>
                            )}

                            {/* Documento local */}
                            {paper?.urllocal && paper.urllocal.trim() && (
                                <>
                                    <h2 className="msg-pnl-search text-rigth mt-3">
                                        {language === 'en' ? 'Document' : 'Documento'}
                                    </h2>
                                    <div className="paragraph-cont">
                                        <button
                                            type="button"
                                            className="btn-act-frm"
                                            onClick={handleClickLinkLocal}
                                            aria-label="link descargar pdf"
                                            data-toggle="tooltip"
                                            data-placement="bottom"
                                            title={
                                                language === 'es'
                                                    ? 'Descargar documento'
                                                    : language === 'en'
                                                        ? 'Download document'
                                                        : 'Descarregar o documento'
                                            }
                                        >
                                            {language === 'es'
                                                ? 'Descargar'
                                                : language === 'en'
                                                    ? 'Download'
                                                    : 'Descarregar'}
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Enlace publicación */}
                            {paper?.enlacepublicacion &&
                                paper.enlacepublicacion.trim() && (
                                    <>
                                        <h2 className="msg-pnl-search text-rigth mt-3">
                                            {language === 'es'
                                                ? 'Web de la Editorial'
                                                : language === 'en'
                                                    ? "Publisher's website"
                                                    : 'Sítio Web do editor'}
                                        </h2>
                                        <div className="paragraph-cont">
                                            <button
                                                type="button"
                                                className="btn-act-frm"
                                                onClick={handleClickLinkExtern}
                                                aria-label="link editorial pdf"
                                                data-toggle="tooltip"
                                                data-placement="bottom"
                                                title={
                                                    language === 'es'
                                                        ? 'Ir a la página web de la Editorial'
                                                        : language === 'en'
                                                            ? "Go to the Publisher's website"
                                                            : 'Ir para o sítio Web do editor'
                                                }
                                            >
                                                {language === 'en' ? 'Visit' : 'Visitar'}
                                            </button>
                                        </div>
                                    </>
                                )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}