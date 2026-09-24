import DOMPurify from 'isomorphic-dompurify';
import Head from 'next/head';
import React, { useState, useEffect, useRef } from "react";
import { IMG_GALLERY_LABORATORIES_FOLDER } from "config";

export { BodyLaboratorios };

const sanitizedData = (codeHTML) => ({
    __html: DOMPurify.sanitize(codeHTML)
});

const crearSlug = (texto) => {
    return texto
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-');
};

/* TABS */
function LabsTabs({ labsinfo, language, activeTab, onSelect, busqueda, setBusqueda }) {
    const [mostrarBusqueda, setMostrarBusqueda] = useState(false);
    const searchAreaRef = useRef(null);

    useEffect(() => {
        if (!mostrarBusqueda) return;

        const handleClickOutside = (e) => {
            if (
                searchAreaRef.current &&
                !searchAreaRef.current.contains(e.target)
            ) {
                setMostrarBusqueda(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [mostrarBusqueda]);

    return (
        <>
            <div
                className="lab-tabs-header"
                ref={searchAreaRef}
            >

                {/* BOTÓN DE BÚSQUEDA */}
                <button
                    type="button"
                    className={`lab-search-toggle ${mostrarBusqueda ? 'active' : ''}`}
                    onClick={() => setMostrarBusqueda(!mostrarBusqueda)}
                    aria-label="Buscar laboratorio"
                >
                    <i className="bi bi-search"></i>
                </button>

                {/* BUSCADOR WEB */}
                {mostrarBusqueda && (
                    <div className="lab-search-desktop">
                        <LabSearch
                            value={busqueda}
                            setValue={setBusqueda}
                            language={language}
                            onSearch={onSelect}
                        />
                    </div>
                )}

                {/* BUSCADOR MÓVIL */}
                <div className="lab-search-mobile">
                    <LabSearch
                        value={busqueda}
                        setValue={setBusqueda}
                        language={language}
                        onSearch={onSelect}
                    />
                </div>

            </div>

            <div className="lab-tabs-wrapper">

                <div className="lab-tab-fixed">
                    <button
                        className={`nav-link ${activeTab === 'todos' ? 'active' : ''}`}
                        id="todos-tab"
                        type="button"
                        onClick={() => {
                            if (activeTab === 'todos') {
                                setBusqueda('');
                            } else {
                                onSelect('todos');
                            }
                        }}
                    >
                        <i className="bi bi-grid-fill"></i>

                        <span>
                            {{
                                es: 'Todos',
                                en: 'All',
                                pt: 'Todos'
                            }[language]}
                        </span>
                    </button>
                </div>

                <div className="lab-tabs-scroll">
                    <ul
                        className="nav nav-pills lab-tabs"
                        id="labTabs"
                        role="tablist"
                    >
                        {labsinfo?.map((lab) => {

                            const nombre = {
                                es: lab.nombreCorto,
                                en: lab.nombreCortoEn,
                                pt: lab.nombreCortoPt
                            }[language];

                            return (
                                <li
                                    className="nav-item"
                                    key={lab.dmCodgDato}
                                >
                                    <button
                                        className={`nav-link ${activeTab === lab.dmCodgDato
                                            ? 'active'
                                            : ''
                                            }`}
                                        data-bs-target={`#lab-${lab.dmCodgDato}`}
                                        type="button"
                                        onClick={() =>
                                            onSelect(
                                                lab.dmCodgDato,
                                                lab.nombreCorto
                                            )
                                        }
                                    >
                                        {nombre}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>

            </div>
        </>
    );
}

/* CONTENIDO DE LABORATORIOS */

function LabsContent({ laboratorioActivo, labsinfo, galinfo, language, onSelect, onCardSelect }) {
    return (
        <div id="labTabsContent">
            {/* TODOS LOS LABORATORIOS */}

            <div
                className={`tab-pane fade ${laboratorioActivo === 'todos' ? 'show active' : ''}`}
                id="todos"
                role="tabpanel"
            >
                <div className="all-labs-grid">
                    {labsinfo?.map((lab) => {
                        const nombre = {
                            es: lab.nombreCorto,
                            en: lab.nombreCortoEn,
                            pt: lab.nombreCortoPt
                        }[language];

                        const detalle = {
                            es: lab.detalleCorto,
                            en: lab.detalleCortoEn,
                            pt: lab.detalleCortoPt
                        }[language];

                        const imagenes = galinfo?.filter(
                            (imagen) => imagen.glbCodigoLab === lab.dmCodgDato
                        );

                        return (
                            <article
                                className="lab-summary-card"
                                key={lab.dmCodgDato}
                                data-lab={lab.dmCodgDato}
                                onClick={() =>
                                    onCardSelect(
                                        lab.dmCodgDato,
                                        lab.nombreCorto
                                    )
                                }
                            >
                                <div className="summary-image">
                                    {imagenes?.map((imagen, index) => (
                                        <img
                                            key={`${imagen.glbCodigoImg}-${index}`}
                                            className={`summary-slide ${index === 0 ? 'active' : ''}`}
                                            src={`${IMG_GALLERY_LABORATORIES_FOLDER}${imagen.glbUrlImg}`}
                                            alt={nombre}
                                        />
                                    ))}
                                </div>

                                <div className="summary-body">
                                    <h3>{nombre}</h3>
                                    <p>{detalle}</p>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>

            {/* DETALLE DE CADA LABORATORIO */}

            {labsinfo?.map((lab) => (
                <div
                    key={lab.dmCodgDato}
                    className={`tab-pane fade ${laboratorioActivo === lab.dmCodgDato ? 'show active' : ''}`}
                    id={`lab-${lab.dmCodgDato}`}
                    role="tabpanel"
                >
                    <LaboratorioDetail
                        lab={lab}
                        galinfo={galinfo}
                        language={language}
                    />
                </div>
            ))}
        </div>
    );
}

/* DETALLE DEL LABORATORIO */

function LaboratorioDetail({ lab, galinfo, language }) {
    const [imagenActiva, setImagenActiva] = useState(null);

    const nombre = {
        es: lab.nombreCorto,
        en: lab.nombreCortoEn,
        pt: lab.nombreCortoPt
    }[language];

    const descripcion = {
        es: lab.dmDescTramite,
        en: lab.dmDescTramiteEn,
        pt: lab.dmDescTramitePt
    }[language];

    const capacidad = {
        es: lab.capacidad_est + ' estudiantes',
        en: lab.capacidad_est + ' students',
        pt: lab.capacidad_est + ' estudantes'
    }[language];

    const ubicacion = {
        es: lab.ubicacion.nombre?.trim(),
        en: lab.ubicacion.nombreEn?.trim(),
        pt: lab.ubicacion.nombrePt?.trim()
    }[language];

    const imagenes = galinfo?.filter(
        (imagen) => imagen.glbCodigoLab === lab.dmCodgDato
    ) || [];

    const equipamientos = lab.equipamientos
        ?.filter(
            (rel) =>
                rel.estado === 1 &&
                rel.equipamiento?.estado === 1
        )
        ?.sort((a, b) => a.orden - b.orden) || [];

    const actividades = lab.actividades
        ?.filter(
            (rel) =>
                rel.estado === 1 &&
                rel.actividad?.estado === 1
        )
        ?.sort((a, b) => a.orden - b.orden) || [];

    const carreras = lab.carreras
        ?.filter(
            (rel) =>
                rel.estado === 1 &&
                rel.carrera
        )
        ?.sort((a, b) => a.orden - b.orden) || [];

    const tipoLab = lab.tipo_lab;

    return (
        <article className="lab-detail-modern">
            {/* PORTADA */}

            <LaboratorioCover
                nombre={nombre}
                imagenes={imagenes}
                capacidad={capacidad}
                ubicacion={ubicacion}
                language={language}
            />

            {/* INFORMACIÓN */}

            <LaboratorioInfo
                descripcion={descripcion}
                carreras={carreras}
                language={language}
            />

            {/* EQUIPAMIENTO */}

            <LaboratorioEquipment
                equipamientos={equipamientos}
                language={language}
            />

            {/* GALERÍA */}

            <LaboratorioGallery
                imagenes={imagenes}
                nombre={nombre}
                language={language}
                onOpen={setImagenActiva}
            />

            {/* ACTIVIDADES */}

            <LaboratorioActivities
                actividades={actividades}
                tipoLab={tipoLab}
                language={language}
            />

            {/* VISOR DE IMÁGENES */}

            <LaboratorioLightbox
                imagenes={imagenes}
                nombre={nombre}
                imagenActiva={imagenActiva}
                setImagenActiva={setImagenActiva}
            />
        </article>
    );
}

/* PORTADA DEL LABORATORIO */

function LaboratorioCover({ nombre, imagenes, language, capacidad, ubicacion }) {
    return (
        <>

            {/* Portada */}

            <div className="lab-detail-cover">
                {imagenes.map((imagen, index) => (
                    <img
                        key={`${imagen.glbCodigoImg}-${index}`}
                        className={`summary-slide ${index === 0 ? 'active' : ''}`}
                        src={`${IMG_GALLERY_LABORATORIES_FOLDER}${imagen.glbUrlImg}`}
                        alt={nombre}
                    />
                ))}

                <div className="lab-cover-info">
                    {/* Capacidad */}

                    <div className="lab-cover-info-item">
                        <i className="bi bi-people"></i>

                        <div>
                            <span>
                                {{
                                    es: 'Capacidad',
                                    en: 'Capacity',
                                    pt: 'Capacidade'
                                }[language]}
                            </span>

                            <strong>{capacidad} </strong>
                        </div>
                    </div>

                    {/* Ubicación */}

                    <div className="lab-cover-info-item">
                        <i className="bi bi-geo-alt"></i>

                        <div>
                            <span>
                                {{
                                    es: 'Ubicación',
                                    en: 'Location',
                                    pt: 'Localização'
                                }[language]}
                            </span>

                            <strong>{ubicacion}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

/* INFORMACIÓN DEL LABORATORIO */

function LaboratorioInfo({ descripcion, carreras, language }) {
    return (
        <div className="lab-detail-intro">
            {/* Descripción */}

            <div className="lab-detail-description">
                {descripcion}
            </div>

            {/* Información */}

            <aside className="lab-info-card">
                <div className="lab-info-title">
                    <i className="bi bi-info-circle"></i>

                    <span>
                        {{
                            es: 'Información del laboratorio',
                            en: 'Laboratory information',
                            pt: 'Informações do laboratório'
                        }[language]}
                    </span>
                </div>

                <div className="lab-info-row">
                    <strong>
                        {{
                            es: 'Carreras:',
                            en: 'Programs:',
                            pt: 'Cursos:'
                        }[language]}
                    </strong>

                    <span>
                        {carreras.map((rel, index) => {
                            const nombreCarrera = {
                                es: rel.carrera.crNombre?.trim(),
                                en: rel.carrera.crNombreEn?.trim(),
                                pt: rel.carrera.crNombrePt?.trim()
                            }[language];

                            return (
                                <span key={rel.idFila}>
                                    {index > 0 && ', '}
                                    {nombreCarrera}
                                </span>
                            );
                        })}
                    </span>
                </div>
            </aside>
        </div>
    );
}

/* EQUIPAMIENTO */

function LaboratorioEquipment({ equipamientos, language }) {
    return (
        <section className="lab-detail-section">
            <div className="lab-section-heading">
                <h3>
                    {{
                        es: 'Equipamiento',
                        en: 'Equipment',
                        pt: 'Equipamentos'
                    }[language]}
                </h3>
            </div>

            <div className="lab-equipment-grid">
                {equipamientos.map((rel) => {
                    const nombreEquipo = {
                        es: rel.equipamiento.nombre,
                        en: rel.equipamiento.nombreEn,
                        pt: rel.equipamiento.nombrePt
                    }[language];

                    return (
                        <article
                            className="lab-equipment-card"
                            key={rel.idFila}
                        >
                            <div className="lab-equipment-icon">
                                <i
                                    className={`bi ${rel.equipamiento.icono || 'bi-box'}`}
                                ></i>
                            </div>

                            <h4>{nombreEquipo}</h4>
                        </article>
                    );
                })}
            </div>

            {/* Botón controlado por laboratorios.js */}

            {equipamientos.length > 0 && (
                <button
                    type="button"
                    className="lab-equipment-toggle"
                    data-equipment-toggle
                >
                    {{
                        es: 'Ver todo el equipamiento',
                        en: 'View all equipment',
                        pt: 'Ver todos os equipamentos'
                    }[language]}

                    <i className="bi bi-arrow-right"></i>
                </button>
            )}
        </section>
    );
}

/* GALERÍA */

function LaboratorioGallery({ imagenes, nombre, language, onOpen }) {
    return (
        <section className="lab-detail-section">
            <div className="lab-section-heading">
                <h3>
                    {{
                        es: 'Galería',
                        en: 'Gallery',
                        pt: 'Galeria'
                    }[language]}
                </h3>

                <div className="lab-gallery-controls">
                    <button
                        type="button"
                        className="lab-gallery-prev"
                        aria-label={{
                            es: 'Imagen anterior',
                            en: 'Previous image',
                            pt: 'Imagem anterior'
                        }[language]}
                    >
                        <i className="bi bi-chevron-left"></i>
                    </button>

                    <button
                        type="button"
                        className="lab-gallery-next"
                        aria-label={{
                            es: 'Imagen siguiente',
                            en: 'Next image',
                            pt: 'Próxima imagem'
                        }[language]}
                    >
                        <i className="bi bi-chevron-right"></i>
                    </button>
                </div>
            </div>

            <div className="lab-gallery-carousel">
                <div className="lab-gallery-track">
                    {imagenes.map((imagen, index) => (
                        <button
                            type="button"
                            className="lab-gallery-item"
                            key={`${imagen.glbCodigoImg}-${index}`}
                            onClick={() => onOpen(index)}
                        >
                            <img
                                src={`${IMG_GALLERY_LABORATORIES_FOLDER}${imagen.glbUrlImg}`}
                                alt={nombre}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ACTIVIDADES */

function LaboratorioActivities({ actividades, language, tipoLab }) {

    const imagenesTipo = {
        CIENCIAS: 'laboratorio-ciencias.png',
        TECNOLOGIA: 'laboratorio-tecnologico.png'
    };

    return (
        <section className="lab-detail-section">
            <div className="lab-services-layout">
                <div className="lab-services-content">
                    <h3>
                        {{
                            es: 'Actividades que se realizan',
                            en: 'Activities carried out',
                            pt: 'Atividades realizadas'
                        }[language]}
                    </h3>

                    <ul className="lab-services-list">
                        {actividades.map((rel) => {
                            const nombreActividad = {
                                es: rel.actividad.nombre,
                                en: rel.actividad.nombreEn,
                                pt: rel.actividad.nombrePt
                            }[language];

                            return (
                                <li key={rel.idFila}>
                                    <i className="bi bi-check-circle-fill"></i>

                                    <span>{nombreActividad}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="lab-services-image">
                    <img
                        src={`${IMG_GALLERY_LABORATORIES_FOLDER}${imagenesTipo[tipoLab]}`}
                        alt={{
                            es: 'Actividades del laboratorio',
                            en: 'Laboratory activities',
                            pt: 'Atividades do laboratório'
                        }[language]}
                    />
                </div>
            </div>
        </section>
    );
}

/* LIGHTBOX */

function LaboratorioLightbox({
    imagenes,
    nombre,
    imagenActiva,
    setImagenActiva
}) {
    if (imagenActiva === null || imagenes.length === 0) {
        return null;
    }

    const siguienteImagen = () => {
        setImagenActiva((actual) => {
            if (actual === imagenes.length - 1) {
                return 0;
            }

            return actual + 1;
        });
    };

    const anteriorImagen = () => {
        setImagenActiva((actual) => {
            if (actual === 0) {
                return imagenes.length - 1;
            }

            return actual - 1;
        });
    };

    return (
        <div
            onClick={() => setImagenActiva(null)}
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.9)',
                zIndex: 99999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    position: 'relative',
                    width: '90%',
                    height: '90%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {/* Cerrar */}

                <button
                    type="button"
                    onClick={() => setImagenActiva(null)}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        zIndex: 10,
                        background: 'transparent',
                        border: 'none',
                        color: '#fff',
                        fontSize: '30px',
                        cursor: 'pointer'
                    }}
                >
                    <i className="bi bi-x-lg"></i>
                </button>

                {/* Anterior */}

                <button
                    type="button"
                    onClick={anteriorImagen}
                    style={{
                        position: 'absolute',
                        left: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 10,
                        background: 'rgba(0,0,0,.5)',
                        border: 'none',
                        color: '#fff',
                        fontSize: '30px',
                        cursor: 'pointer',
                        padding: '10px 15px'
                    }}
                >
                    <i className="bi bi-chevron-left"></i>
                </button>

                {/* Imagen */}

                <img
                    src={`${IMG_GALLERY_LABORATORIES_FOLDER}${imagenes[imagenActiva].glbUrlImg}`}
                    alt={nombre}
                    style={{
                        maxWidth: '90%',
                        maxHeight: '90%',
                        objectFit: 'contain'
                    }}
                />

                {/* Siguiente */}

                <button
                    type="button"
                    onClick={siguienteImagen}
                    style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 10,
                        background: 'rgba(0,0,0,.5)',
                        border: 'none',
                        color: '#fff',
                        fontSize: '30px',
                        cursor: 'pointer',
                        padding: '10px 15px'
                    }}
                >
                    <i className="bi bi-chevron-right"></i>
                </button>

                {/* Contador */}

                <div
                    style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: '#fff',
                        fontSize: '16px'
                    }}
                >
                    {imagenActiva + 1} / {imagenes.length}
                </div>
            </div>
        </div>
    );
}

/* BUSCADOR */
function LabSearch({ value, setValue, language, onSearch }) {

    const placeholder = {
        es: 'Buscar laboratorio...',
        en: 'Search laboratory...',
        pt: 'Buscar laboratório...'
    }[language];

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div className="lab-search">
            <i className="bi bi-search"></i>

            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => {
                    const texto = e.target.value;
                    setValue(texto);

                    if (texto.trim() !== "") {
                        onSearch("todos");
                    }
                }}
                placeholder={placeholder}
                autoComplete="off"
            />

            {value && (
                <button
                    type="button"
                    className="lab-search-clear"
                    onClick={() => setValue("")}
                >
                    ×
                </button>
            )}
        </div>
    );
}

/* BODY PRINCIPAL */

function BodyLaboratorios(data) {

    const [laboratorioActivo, setLaboratorioActivo] = useState('todos');
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        const hash = window.location.hash;

        if (hash) {
            const slug = hash.replace('#', '');

            const laboratorio =
                data.labsinfo?.find((lab) => {
                    return (
                        crearSlug(lab.nombreCorto) === slug
                    );
                });

            if (laboratorio) {
                setLaboratorioActivo(
                    laboratorio.dmCodgDato
                );
            }
        }
    }, [data.labsinfo]);

    /* SELECCIONAR LABORATORIO */

    const seleccionarLaboratorio = (id, nombre) => {
        setLaboratorioActivo(id);

        // SUBIR AL TÍTULO
        setTimeout(() => {
            const titulo = document.querySelector("#laboratorios-title");

            if (titulo) {
                const posicion =
                    titulo.getBoundingClientRect().top + window.scrollY;

                window.scrollTo({
                    top: posicion - 70,
                    behavior: "smooth"
                });
            }
        }, 300);

        // MOVER EL TAB HORIZONTALMENTE
        setTimeout(() => {
            const tab = document.querySelector(
                `[data-bs-target="#lab-${id}"]`
            );

            const tabsScroll = document.querySelector(".lab-tabs-scroll");

            if (tab && tabsScroll) {
                const tabRect = tab.getBoundingClientRect();
                const scrollRect = tabsScroll.getBoundingClientRect();
                const padding = 8;

                if (tabRect.left < scrollRect.left) {
                    tabsScroll.scrollBy({
                        left: tabRect.left - scrollRect.left - padding,
                        behavior: "smooth"
                    });
                } else if (tabRect.right > scrollRect.right) {
                    tabsScroll.scrollBy({
                        left: tabRect.right - scrollRect.right + padding,
                        behavior: "smooth"
                    });
                }
            }
        }, 50);

        if (id === 'todos') {
            window.history.replaceState(
                null,
                '',
                window.location.pathname +
                window.location.search
            );
        } else {
            const slug = crearSlug(nombre);

            window.history.replaceState(
                null,
                '',
                `#${slug}`
            );
        }
    };

    const seleccionarDesdeTarjeta = (id, nombre) => {
        seleccionarLaboratorio(id, nombre);
    };

    /* TÍTULO */

    const laboratorioSeleccionado =
        data.labsinfo?.find(
            (lab) =>
                lab.dmCodgDato ===
                laboratorioActivo
        );

    const tituloLaboratorio =
        laboratorioActivo === 'todos'
            ? data.language === "es"
                ? data.data8.pwNombre.trim()
                : data.language === "en"
                    ? data.data8.pwNombreEn.trim()
                    : data.data8.pwNombrePt.trim()
            : {
                es: laboratorioSeleccionado?.dmDescripcion,
                en: laboratorioSeleccionado?.dmDescripcionEn,
                pt: laboratorioSeleccionado?.dmDescripcionPt
            }[data.language];

    /* FILTRAR LABORATORIOS */

    const labsFiltrados = data.labsinfo?.filter((lab) => {
        if (!busqueda.trim()) return true;

        const texto = busqueda
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

        const nombre = {
            es: lab.nombreCorto,
            en: lab.nombreCortoEn,
            pt: lab.nombreCortoPt
        }[data.language];

        return (nombre || '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(texto);
    });

    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="/assets/css/investigacion/laboratorios.css"
                />

                <script
                    src="/assets/js/investigacion/laboratorios.js"
                    defer
                />
            </Head>

            <h2 id="laboratorios-title" className="title-cont-page text-center mb-3">
                {tituloLaboratorio}
            </h2>

            <div className="row">
                <section className="labs-section">
                    <LabsTabs
                        labsinfo={labsFiltrados}
                        language={data.language}
                        activeTab={laboratorioActivo}
                        onSelect={seleccionarLaboratorio}
                        busqueda={busqueda}
                        setBusqueda={setBusqueda}
                    />

                    <LabsContent
                        laboratorioActivo={laboratorioActivo}
                        labsinfo={labsFiltrados}
                        galinfo={data.galinfo}
                        language={data.language}
                        onSelect={seleccionarLaboratorio}
                        onCardSelect={seleccionarLaboratorio}
                    />
                </section>
            </div>
        </>
    );
}