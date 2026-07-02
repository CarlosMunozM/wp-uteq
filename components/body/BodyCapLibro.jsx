/*import { v4 as uuidv4 } from 'uuid';

export { BodyCapLibro };

function ItemRowTable(props) {
    return (
        <tr>
            <td className="text-center">{props.participante.trim()}</td>
            <td className="text-center">{props.tipo.trim()}</td>
        </tr>
    )
}

function BodyCapLibro(data) {

    const regEx = /^(http|https)/;

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    function handleClick(e) {
        e.preventDefault();
        if (data.datachpt[0].urllocal !== null && data.datachpt[0].urllocal !== "") {
            openInNewTab("https://" + data.datachpt[0].urllocal.trim());
        }
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
            <h2 className="title-cont-page text-center mb-3">{(data.datachpt !== null && data.datachpt !== '') ? data.datachpt[0].titulo.trim() : (data.language === "es" ? "Capítulo de libro" : (data.language === "en" ? "Book chapter" : "Capítulo de livro"))}</h2>
            <div className="col-md-12 mt-2">
                <div className="alert alert-success message-lang" role="alert">
                    {data.language === "es" ? "El contenido solo esta disponible en español" : (data.language === "en" ? "The content is only available in Spanish" :
                        "O conteúdo só está disponível em espanhol")}
                </div>
            </div>
            <div className="col-md-6 mt-2">
                <div className="row w-100 mt-3">
                    <center>
                        <img className="img-fluid img-book-cover" src={(data.datachpt[0].urlportada !== null && data.datachpt[0].urlportada !== '') ? (!regEx.test(data.datachpt[0].urlportada) ? (`https://${data.datachpt[0].urlportada.trim()}`) :
                            data.datachpt[0].urlportada.trim()) : `/assets/img/${data.language === "es" ? "img-port-def-cap-libro.jpg" : (data.language === "en" ? "img-port-def-cap-libro-en.jpg" : "img-port-def-cap-libro-pt.jpg")}`}
                            alt={data.language === "es" ? "Portada del capítulo de libro" : (data.language === "en" ? "Book chapter cover" : "Capa de capítulo de livro")} />
                    </center>
                </div>
                {
                    (data.datachpt[0].urllocal !== null && data.datachpt[0].urllocal !== "") ? (
                        <div className="row g-0 mt-3">
                            <center>
                                <button type="button" className="btn-act-frm" onClick={handleClick} aria-label="link descargar pdf" data-toggle="tooltip" data-placement="bottom" title={data.language === "es" ? "Descargar documento" : (data.language === "en" ? "Download document" : "Descarregar o documento")}>{data.language === "es" ? "Descargar" : (data.language === "en" ? "Download" : "Descarregar")}</button>
                            </center>
                        </div>
                    ) : ""
                }
            </div>
            {
                (data.datachpt !== null && data.datachpt !== '') ? (<><div className="col-md-6 mt-2">
                    {
                        (data.datachpt[0].titulolibro !== null && data.datachpt[0].titulolibro !== '') ? (<>
                            <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Título del libro" : (data.language === "en" ? "Title of the book" : "Título do livro")}</h2>
                            <div className="paragraph-cont"><p className="text-cont">{data.datachpt[0].titulolibro.trim()}</p></div>
                        </>) : ""
                    }
                    {
                        (data.datachpt[0].areaconocimiento !== null && data.datachpt[0].areaconocimiento !== '') ? (<>
                            <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Área de conocimiento" : (data.language === "en" ? "Area of knowledge" : "Área de conhecimento")}</h2>
                            <div className="paragraph-cont"><p className="text-cont">{data.datachpt[0].areaconocimiento.trim()}</p></div>
                        </>) : ""
                    }
                    {
                        (data.datachpt[0].subareaconocimiento !== null && data.datachpt[0].subareaconocimiento !== '') ? (<>
                            <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Subárea de conocimiento" : (data.language === "en" ? "Sub-area of knowledge" : "Sub-área de conhecimento")}</h2>
                            <div className="paragraph-cont"><p className="text-cont">{data.datachpt[0].subareaconocimiento.trim()}</p></div>
                        </>) : ""
                    }
                    {
                        (data.datachpt[0].subareaespecificaconocimiento !== null && data.datachpt[0].subareaespecificaconocimiento !== '') ? (<>
                            <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Subárea específica de conocimiento" : (data.language === "en" ? "Specific sub-area of knowledge" : "Subdomínio específico do conhecimento")}</h2>
                            <div className="paragraph-cont"><p className="text-cont">{data.datachpt[0].subareaespecificaconocimiento.trim()}</p></div>
                        </>) : ""
                    }
                    {
                        (data.datachpt[0].anio !== null && data.datachpt[0].anio !== '') ? (<>
                            <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Año de publicación" : (data.language === "en" ? "Year of publication" : "Ano de publicação")}</h2>
                            <div className="paragraph-cont"><p className="text-cont">{data.datachpt[0].anio.trim()}</p></div>
                        </>) : ""
                    }
                    {
                        (data.datachpt[0].isbn !== null && data.datachpt[0].isbn !== '') ? (<>
                            <h2 className="msg-pnl-search text-rigth">ISBN</h2>
                            <div className="paragraph-cont"><p className="text-cont">{data.datachpt[0].isbn.trim()}</p></div>
                        </>) : ""
                    }
                    {
                        (data.datachpt[0].editorcompilador !== null && data.datachpt[0].editorcompilador !== '') ? (<>
                            <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Editor compilador" : (data.language === "en" ? "Compiler Editor" : "Editor de compiladores")}</h2>
                            <div className="paragraph-cont"><p className="text-cont">{data.datachpt[0].editorcompilador.trim()}</p></div>
                        </>) : ""
                    }
                    {
                        (data.datachpt[0].autores !== null && data.datachpt[0].autores !== '') ? (<>
                            {
                                data.datachpt[0].autores.length > 0 ? (<>
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
                                                {listRowsTable(data.datachpt[0].autores)}
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

export { BodyCapLibro };

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

function BodyCapLibro(data) {
    const { datachpt, language } = data;

    const hasChapter = Array.isArray(datachpt) && datachpt.length > 0;
    const chapter = hasChapter ? datachpt[0] : null;

    const regEx = /^(http|https)/;

    const titulo =
        (chapter?.titulo || "").trim() ||
        (language === "es"
            ? "Capítulo de libro"
            : language === "en"
                ? "Book chapter"
                : "Capítulo de livro");

    const openInNewTab = (url) => {
        const newWindow = window.open(url, "_blank", "noopener,noreferrer");
        if (newWindow) newWindow.opener = null;
    };

    function handleClick(e) {
        e.preventDefault();
        const urlLocal = (chapter?.urllocal || "").trim();
        if (urlLocal) {
            openInNewTab(urlLocal.startsWith("http") ? urlLocal : `https://${urlLocal}`);
        }
    }

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

    // Imagen segura
    const portadaRaw = (chapter?.urlportada || "").trim();
    const portadaSrc = portadaRaw
        ? regEx.test(portadaRaw)
            ? portadaRaw
            : `https://${portadaRaw}`
        : `/assets/img/${language === "es"
            ? "img-port-def-cap-libro.jpg"
            : language === "en"
                ? "img-port-def-cap-libro-en.jpg"
                : "img-port-def-cap-libro-pt.jpg"
        }`;

    return (
        <>
            <div className="row g-0">
                {/* TITULO */}
                <h2 className="title-cont-page text-center mb-3">{titulo}</h2>

                {/* ALERTA */}
                <div className="col-md-12 mt-2">
                    <div className="alert alert-success message-lang" role="alert">
                        {language === "es"
                            ? "El contenido solo esta disponible en español"
                            : language === "en"
                                ? "The content is only available in Spanish"
                                : "O conteúdo só está disponível em espanhol"}
                    </div>
                </div>

                {/* PORTADA + DESCARGA */}
                <div className="col-md-6 mt-2">
                    <div className="row w-100 mt-3">
                        <center>
                            <img
                                className="img-fluid img-book-cover"
                                src={portadaSrc}
                                alt={
                                    language === "es"
                                        ? "Portada del capítulo de libro"
                                        : language === "en"
                                            ? "Book chapter cover"
                                            : "Capa de capítulo de livro"
                                }
                            />
                        </center>
                    </div>

                    {chapter?.urllocal && chapter.urllocal.trim() && (
                        <div className="row g-0 mt-3">
                            <center>
                                <button
                                    type="button"
                                    className="btn-act-frm"
                                    onClick={handleClick}
                                >
                                    {language === "es"
                                        ? "Descargar"
                                        : language === "en"
                                            ? "Download"
                                            : "Descarregar"}
                                </button>
                            </center>
                        </div>
                    )}
                </div>

                {/* INFORMACIÓN DEL CAPÍTULO */}
                {hasChapter && (
                    <div className="col-md-6 mt-2">
                        {chapter.titulolibro?.trim() && (
                            <>
                                <h2 className="msg-pnl-search text-rigth">
                                    {language === "es"
                                        ? "Título del libro"
                                        : language === "en"
                                            ? "Title of the book"
                                            : "Título do livro"}
                                </h2>
                                <div className="paragraph-cont">
                                    <p className="text-cont">{chapter.titulolibro.trim()}</p>
                                </div>
                            </>
                        )}

                        {chapter.areaconocimiento?.trim() && (
                            <>
                                <h2 className="msg-pnl-search text-rigth">
                                    {language === "es"
                                        ? "Área de conocimiento"
                                        : language === "en"
                                            ? "Area of knowledge"
                                            : "Área de conhecimento"}
                                </h2>
                                <div className="paragraph-cont">
                                    <p className="text-cont">{chapter.areaconocimiento.trim()}</p>
                                </div>
                            </>
                        )}

                        {chapter.subareaconocimiento?.trim() && (
                            <>
                                <h2 className="msg-pnl-search text-rigth">
                                    {language === "es"
                                        ? "Subárea de conocimiento"
                                        : language === "en"
                                            ? "Sub-area of knowledge"
                                            : "Sub-área de conhecimento"}
                                </h2>
                                <div className="paragraph-cont">
                                    <p className="text-cont">{chapter.subareaconocimiento.trim()}</p>
                                </div>
                            </>
                        )}

                        {chapter.subareaespecificaconocimiento?.trim() && (
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
                                        {chapter.subareaespecificaconocimiento.trim()}
                                    </p>
                                </div>
                            </>
                        )}

                        {chapter.anio?.trim && (
                            <>
                                <h2 className="msg-pnl-search text-rigth">
                                    {language === "es"
                                        ? "Año de publicación"
                                        : language === "en"
                                            ? "Year of publication"
                                            : "Ano de publicação"}
                                </h2>
                                <div className="paragraph-cont">
                                    <p className="text-cont">{String(chapter.anio).trim()}</p>
                                </div>
                            </>
                        )}

                        {chapter.isbn?.trim() && (
                            <>
                                <h2 className="msg-pnl-search text-rigth">ISBN</h2>
                                <div className="paragraph-cont">
                                    <p className="text-cont">{chapter.isbn.trim()}</p>
                                </div>
                            </>
                        )}

                        {chapter.editorcompilador?.trim() && (
                            <>
                                <h2 className="msg-pnl-search text-rigth">
                                    {language === "es"
                                        ? "Editor compilador"
                                        : language === "en"
                                            ? "Compiler Editor"
                                            : "Editor de compiladores"}
                                </h2>
                                <div className="paragraph-cont">
                                    <p className="text-cont">
                                        {chapter.editorcompilador.trim()}
                                    </p>
                                </div>
                            </>
                        )}

                        {/* AUTORES */}
                        {Array.isArray(chapter.autores) && chapter.autores.length > 0 && (
                            <div className="col-md-12 w-100">
                                <h2 className="msg-pnl-search text-rigth">
                                    {language === "es"
                                        ? "Autor/es"
                                        : language === "en"
                                            ? "Author(s)"
                                            : "Autor(es)"}
                                </h2>

                                <table className="display table-static w-100">
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
                                    <tbody>{listRowsTable(chapter.autores)}</tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}