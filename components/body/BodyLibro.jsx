/*import { v4 as uuidv4 } from 'uuid';

export { BodyLibro };

function ItemRowTable(props) {
    return (
        <tr>
            <td className="text-center">{props.participante.trim()}</td>
            <td className="text-center">{props.tipo.trim()}</td>
        </tr>
    )
}

function BodyLibro(data) {
    const regEx = /^http/;

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    function handleClick(e) {
        e.preventDefault();
        if (data.databook[0].urllocal !== null && data.databook[0].urllocal !== "") {
            openInNewTab("https://" + data.databook[0].urllocal.trim());
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
            <h2 className="title-cont-page text-center mb-3">{(data.databook !== null && data.databook !== '') ? data.databook[0].titulo.trim() : (data.language === "es" ? "Libro" : (data.language === "en" ? "Book" : "Livro"))}</h2>
            <div className="col-md-12 mt-2">
                <div className="alert alert-success message-lang" role="alert">
                    {data.language === "es" ? "El contenido solo esta disponible en español" : (data.language === "en" ? "The content is only available in Spanish" :
                        "O conteúdo só está disponível em espanhol")}
                </div>
            </div>
            <div className="col-md-6 mt-2">
                <div className="row w-100 mt-3">
                    <center>
                        <img className="img-fluid img-book-cover" src={(data.databook[0].urlportada !== null && data.databook[0].urlportada !== '') ? (!regEx.test(data.databook[0].urlportada) ? (`https://${data.databook[0].urlportada.trim()}`) : 
                        data.databook[0].urlportada.trim()) : `/assets/img/${data.language==="es"?"img-port-def-libro.jpg":(data.language==="en"?"img-port-def-libro-en.jpg":"img-port-def-libro-pt.jpg")}`} 
                        alt={data.language === "es" ? "Portada del libro" : (data.language === "en" ? "Book cover" : "Capa do livro")} />
                    </center>
                </div>
                {
                    (data.databook[0].urllocal !== null && data.databook[0].urllocal !== "") ? (
                        <div className="row g-0 mt-3">
                            <center>
                                <button type="button" className="btn-act-frm" onClick={handleClick} aria-label="link descargar pdf" data-toggle="tooltip" data-placement="bottom"
                                    title={data.language === "es" ? "Descargar documento" : (data.language === "en" ? "Download document" : "Descarregar o documento")}>{data.language === "es" ? "Descargar" : (data.language === "en" ? "Download" : "Descarregar")}</button>
                            </center>
                        </div>
                    ) : ""
                }
            </div>
            {
                (data.databook !== null && data.databook !== '') ? (<><div className="col-md-6 mt-2">
                    {
                        (data.databook[0].areaconocimiento !== null && data.databook[0].areaconocimiento !== '') ? (<>
                            <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Área de conocimiento" : (data.language === "en" ? "Area of knowledge" : "Área de conhecimento")}</h2>
                            <div className="paragraph-cont"><p className="text-cont">{data.databook[0].areaconocimiento.trim()}</p></div>
                        </>) : ""
                    }
                    {
                        (data.databook[0].subareaconocimiento !== null && data.databook[0].subareaconocimiento !== '') ? (<>
                            <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Subárea de conocimiento" : (data.language === "en" ? "Sub-area of knowledge" : "Sub-área de conhecimento")}</h2>
                            <div className="paragraph-cont"><p className="text-cont">{data.databook[0].subareaconocimiento.trim()}</p></div>
                        </>) : ""
                    }
                    {
                        (data.databook[0].subareaespecificaconocimiento !== null && data.databook[0].subareaespecificaconocimiento !== '') ? (<>
                            <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Subárea específica de conocimiento" : (data.language === "en" ? "Specific sub-area of knowledge" : "Subdomínio específico do conhecimento")}</h2>
                            <div className="paragraph-cont"><p className="text-cont">{data.databook[0].subareaespecificaconocimiento.trim()}</p></div>
                        </>) : ""
                    }
                    {
                        (data.databook[0].anio !== null && data.databook[0].anio !== '') ? (<>
                            <h2 className="msg-pnl-search text-rigth">{data.language === "es" ? "Año de publicación" : (data.language === "en" ? "Year of publication" : "Ano de publicação")}</h2>
                            <div className="paragraph-cont"><p className="text-cont">{data.databook[0].anio.trim()}</p></div>
                        </>) : ""
                    }
                    {
                        (data.databook[0].isbn !== null && data.databook[0].isbn !== '') ? (<>
                            <h2 className="msg-pnl-search text-rigth">ISBN</h2>
                            <div className="paragraph-cont"><p className="text-cont">{data.databook[0].isbn.trim()}</p></div>
                        </>) : ""
                    }
                    {
                        (data.databook[0].autores !== null && data.databook[0].autores !== '') ? (<>
                            {
                                data.databook[0].autores.length > 0 ? (<>
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
                                                {listRowsTable(data.databook[0].autores)}
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

export { BodyLibro };

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

function BodyLibro(data) {
    const { databook, language } = data;

    const hasBook = Array.isArray(databook) && databook.length > 0;
    const book = hasBook ? databook[0] : null;

    const regEx = /^http/;

    const openInNewTab = (url) => {
        const newWindow = window.open(url, "_blank", "noopener,noreferrer");
        if (newWindow) newWindow.opener = null;
    };

    function handleClick(e) {
        e.preventDefault();
        const urlLocal = (book?.urllocal || "").trim();
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

    const titulo =
        (book?.titulo || "").trim() ||
        (language === "es"
            ? "Libro"
            : language === "en"
                ? "Book"
                : "Livro");

    const portadaRaw = (book?.urlportada || "").trim();
    const portadaSrc = portadaRaw
        ? regEx.test(portadaRaw)
            ? portadaRaw
            : `https://${portadaRaw}`
        : `/assets/img/${language === "es"
            ? "img-port-def-libro.jpg"
            : language === "en"
                ? "img-port-def-libro-en.jpg"
                : "img-port-def-libro-pt.jpg"
        }`;

    return (
        <>
            <div className="row g-0">
                {/* TÍTULO */}
                <h2 className="title-cont-page text-center mb-3">{titulo}</h2>

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

                {/* PORTADA + DESCARGA */}
                <div className="col-md-6 mt-2">
                    <div className="row w-100 mt-3">
                        <center>
                            <img
                                className="img-fluid img-book-cover"
                                src={portadaSrc}
                                alt={
                                    language === "es"
                                        ? "Portada del libro"
                                        : language === "en"
                                            ? "Book cover"
                                            : "Capa do livro"
                                }
                            />
                        </center>
                    </div>

                    {book?.urllocal && book.urllocal.trim() && (
                        <div className="row g-0 mt-3">
                            <center>
                                <button
                                    type="button"
                                    className="btn-act-frm"
                                    onClick={handleClick}
                                    aria-label="link descargar pdf"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title={
                                        language === "es"
                                            ? "Descargar documento"
                                            : language === "en"
                                                ? "Download document"
                                                : "Descarregar o documento"
                                    }
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

                {/* INFORMACIÓN DEL LIBRO */}
                {hasBook && (
                    <div className="col-md-6 mt-2">
                        {/* Área de conocimiento */}
                        {book.areaconocimiento?.trim() && (
                            <>
                                <h2 className="msg-pnl-search text-rigth">
                                    {language === "es"
                                        ? "Área de conocimiento"
                                        : language === "en"
                                            ? "Area of knowledge"
                                            : "Área de conhecimento"}
                                </h2>
                                <div className="paragraph-cont">
                                    <p className="text-cont">{book.areaconocimiento.trim()}</p>
                                </div>
                            </>
                        )}

                        {/* Subárea de conocimiento */}
                        {book.subareaconocimiento?.trim() && (
                            <>
                                <h2 className="msg-pnl-search text-rigth">
                                    {language === "es"
                                        ? "Subárea de conocimiento"
                                        : language === "en"
                                            ? "Sub-area of knowledge"
                                            : "Sub-área de conhecimento"}
                                </h2>
                                <div className="paragraph-cont">
                                    <p className="text-cont">{book.subareaconocimiento.trim()}</p>
                                </div>
                            </>
                        )}

                        {/* Subárea específica */}
                        {book.subareaespecificaconocimiento?.trim() && (
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
                                        {book.subareaespecificaconocimiento.trim()}
                                    </p>
                                </div>
                            </>
                        )}

                        {/* Año */}
                        {book.anio && String(book.anio).trim() && (
                            <>
                                <h2 className="msg-pnl-search text-rigth">
                                    {language === "es"
                                        ? "Año de publicación"
                                        : language === "en"
                                            ? "Year of publication"
                                            : "Ano de publicação"}
                                </h2>
                                <div className="paragraph-cont">
                                    <p className="text-cont">{String(book.anio).trim()}</p>
                                </div>
                            </>
                        )}

                        {/* ISBN */}
                        {book.isbn?.trim() && (
                            <>
                                <h2 className="msg-pnl-search text-rigth">ISBN</h2>
                                <div className="paragraph-cont">
                                    <p className="text-cont">{book.isbn.trim()}</p>
                                </div>
                            </>
                        )}

                        {/* AUTORES */}
                        {Array.isArray(book.autores) && book.autores.length > 0 && (
                            <div className="col-md-12 w-100">
                                <h2 className="msg-pnl-search text-rigth">
                                    {language === "es"
                                        ? "Autor/es"
                                        : language === "en"
                                            ? "Author(s)"
                                            : "Autor(es)"}
                                </h2>
                                <table id="tbl-sublines" className="display table-static w-100">
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
                                    <tbody>{listRowsTable(book.autores)}</tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}