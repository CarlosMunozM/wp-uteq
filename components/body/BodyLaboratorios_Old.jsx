import React, { useState } from 'react';
import Head from 'next/head';
import DOMPurify from 'isomorphic-dompurify';
import { IMG_GALLERY_LABORATORIES_FOLDER } from 'config';

export { BodyLaboratorios };

const sanitizedData = (codeHTML) => ({
    __html: DOMPurify.sanitize(codeHTML)
});

function getLanguageValue(item, field, language) {
    if (language === "en") {
        return item[`${field}En`] ?? "";
    }

    if (language === "pt") {
        return item[`${field}Pt`] ?? "";
    }

    return item[field] ?? "";
}

function getImages(gallery, codLab) {
    return (gallery || [])
        .filter(imagen => imagen.glbCodigoLab === codLab)
        .sort((a, b) => (a.glbOrden || 0) - (b.glbOrden || 0));
}

function getImageUrl(imagen) {
    return IMG_GALLERY_LABORATORIES_FOLDER + imagen.glbUrlImg.trim();
}

function LabImages({ images }) {
    const [activeImage, setActiveImage] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="summary-image">
                <div className="summary-placeholder">
                    <i className="bi bi-building"></i>
                </div>
            </div>
        );
    }

    const nextImage = () => {
        setActiveImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setActiveImage((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="summary-image">
            {images.map((imagen, index) => (
                <img
                    key={imagen.glbCodigoImg || index}
                    className={`summary-slide ${index === activeImage ? "active" : ""}`}
                    src={getImageUrl(imagen)}
                    alt={imagen.glbDescripc || "Imagen del laboratorio"}
                />
            ))}

            {images.length > 1 && (
                <>
                    <button
                        type="button"
                        className="summary-arrow summary-arrow-prev"
                        onClick={prevImage}
                        aria-label="Imagen anterior"
                    >
                        <i className="bi bi-chevron-left"></i>
                    </button>

                    <button
                        type="button"
                        className="summary-arrow summary-arrow-next"
                        onClick={nextImage}
                        aria-label="Imagen siguiente"
                    >
                        <i className="bi bi-chevron-right"></i>
                    </button>

                    <div className="summary-dots">
                        {images.map((imagen, index) => (
                            <button
                                key={`dot-${imagen.glbCodigoImg || index}`}
                                type="button"
                                className={index === activeImage ? "active" : ""}
                                onClick={() => setActiveImage(index)}
                                aria-label={`Imagen ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

function LaboratoryCard({ item, gallery, language, onClick }) {
    const nombre = getLanguageValue(item, "nombreCorto", language);
    const detalle = getLanguageValue(item, "detalleCorto", language);
    const images = getImages(gallery, item.dmCodgDato);

    return (
        <article className="lab-summary-card" onClick={onClick}>
            <LabImages images={images} />

            <div className="summary-body">
                <h3>{nombre}</h3>

                {detalle && (
                    <p dangerouslySetInnerHTML={sanitizedData(detalle)}></p>
                )}
            </div>
        </article>
    );
}

function LaboratoryDetail({ item, gallery, language }) {
    const nombre = getLanguageValue(item, "nombreCorto", language);
    const detalle = getLanguageValue(item, "detalleCorto", language);
    const detalleCompleto = getLanguageValue(item, "dmDescTramite", language);
    const images = getImages(gallery, item.dmCodgDato);

    const [equipmentVisible, setEquipmentVisible] = useState(false);
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    const isBromatologia = (nombre || "").toLowerCase().includes("bromatolog");

    const text = {
        es: {
            capacity: "Capacidad",
            capacityValue: "30 estudiantes",
            location: "Ubicación",
            locationValue: "Campus La María",
            information: "Información del laboratorio",
            careers: "Carreras:",
            careersValue: "Agronomía, Zootecnia, Agropecuaria, Alimentos y Agroindustria",
            equipment: "Equipamiento",
            allEquipment: "Ver todo el equipamiento",
            gallery: "Galería",
            activities: "Actividades que se realizan",
            close: "Cerrar",
            previous: "Imagen anterior",
            next: "Imagen siguiente"
        },
        en: {
            capacity: "Capacity",
            capacityValue: "30 students",
            location: "Location",
            locationValue: "La María Campus",
            information: "Laboratory information",
            careers: "Careers:",
            careersValue: "Agronomy, Zootechnics, Agricultural Sciences, Food and Agroindustry",
            equipment: "Equipment",
            allEquipment: "View all equipment",
            gallery: "Gallery",
            activities: "Activities carried out",
            close: "Close",
            previous: "Previous image",
            next: "Next image"
        },
        pt: {
            capacity: "Capacidade",
            capacityValue: "30 estudantes",
            location: "Localização",
            locationValue: "Campus La María",
            information: "Informações do laboratório",
            careers: "Carreiras:",
            careersValue: "Agronomia, Zootecnia, Agropecuária, Alimentos e Agroindústria",
            equipment: "Equipamentos",
            allEquipment: "Ver todos os equipamentos",
            gallery: "Galeria",
            activities: "Atividades realizadas",
            close: "Fechar",
            previous: "Imagem anterior",
            next: "Próxima imagem"
        }
    };

    const t = text[language] || text.es;

    const equipment = [
        { icon: "bi-cpu", name: "Digestor para proteína" },
        { icon: "bi-droplet", name: "Destilador para proteína Kjeldahl" },
        { icon: "bi-thermometer-half", name: "Estufas" },
        { icon: "bi-speedometer2", name: "Balanza analítica" },
        { icon: "bi-moisture", name: "Extractor de grasa" },
        { icon: "bi-diagram-3", name: "Extractor de fibra" },
        { icon: "bi-speedometer2", name: "Calorímetro" },
        { icon: "bi-activity", name: "Viscosímetro Brookfield" },
        { icon: "bi-eyedropper", name: "Microlisa" },
        { icon: "bi-box", name: "Autoclave" },
        { icon: "bi-thermometer", name: "Incubadora" }
    ];

    const activities = [
        "Análisis bromatológicos",
        "Análisis físicos-químicos",
        "Análisis microbiológicos",
        "Análisis de materias primas de origen animal",
        "Análisis de materias primas de origen vegetal",
        "Análisis de productos terminados"
    ];

    const previousGallery = () => {
        if (!images.length) return;
        setGalleryIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const nextGallery = () => {
        if (!images.length) return;
        setGalleryIndex((prev) => (prev + 1) % images.length);
    };

    const openLightbox = (index) => {
        setGalleryIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    return (
        <article className="lab-detail-modern">
            <div className="section-title-row">
                <div>
                    <h2>{item.dmDescripcion || nombre}</h2>
                    <div className="title-underline"></div>
                </div>
            </div>

            {images.length > 0 && (
                <div className="lab-detail-cover">
                    {images.map((imagen, index) => (
                        <img
                            key={imagen.glbCodigoImg || index}
                            className={`summary-slide ${index === 0 ? "active" : ""}`}
                            src={getImageUrl(imagen)}
                            alt={imagen.glbDescripc || nombre}
                        />
                    ))}

                    {isBromatologia && (
                        <div className="lab-cover-info">
                            <div className="lab-cover-info-item">
                                <i className="bi bi-people"></i>
                                <div>
                                    <span>{t.capacity}</span>
                                    <strong>{t.capacityValue}</strong>
                                </div>
                            </div>

                            <div className="lab-cover-info-item">
                                <i className="bi bi-geo-alt"></i>
                                <div>
                                    <span>{t.location}</span>
                                    <strong>{t.locationValue}</strong>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {isBromatologia ? (
                <>
                    <div className="lab-detail-intro">
                        <div className="lab-detail-description">
                            {detalleCompleto ? (
                                <div dangerouslySetInnerHTML={sanitizedData(detalleCompleto)}></div>
                            ) : detalle ? (
                                <div dangerouslySetInnerHTML={sanitizedData(detalle)}></div>
                            ) : null}
                        </div>

                        <aside className="lab-info-card">
                            <div className="lab-info-title">
                                <i className="bi bi-info-circle"></i>
                                {t.information}
                            </div>

                            <div className="lab-info-row">
                                <strong>{t.careers}</strong>
                                <span>{t.careersValue}</span>
                            </div>
                        </aside>
                    </div>

                    <section className="lab-detail-section">
                        <div className="lab-section-heading">
                            <h3>{t.equipment}</h3>
                        </div>

                        <div className={`lab-equipment-grid ${equipmentVisible ? "show-all" : ""}`}>
                            {equipment.map((equipo, index) => (
                                <article
                                    className={`lab-equipment-card ${index > 5 && !equipmentVisible ? "equipment-hidden" : ""}`}
                                    key={index}
                                >
                                    <div className="lab-equipment-icon">
                                        <i className={`bi ${equipo.icon}`}></i>
                                    </div>
                                    <h4>
                                        {language === "en"
                                            ? ({
                                                "Digestor para proteína": "Protein digester",
                                                "Destilador para proteína Kjeldahl": "Kjeldahl protein distiller",
                                                "Estufas": "Ovens",
                                                "Balanza analítica": "Analytical balance",
                                                "Extractor de grasa": "Fat extractor",
                                                "Extractor de fibra": "Fiber extractor",
                                                "Calorímetro": "Calorimeter",
                                                "Viscosímetro Brookfield": "Brookfield viscometer",
                                                "Microlisa": "Microlisa",
                                                "Autoclave": "Autoclave",
                                                "Incubadora": "Incubator"
                                            }[equipo.name] || equipo.name)
                                            : language === "pt"
                                                ? ({
                                                    "Digestor para proteína": "Digestor de proteína",
                                                    "Destilador para proteína Kjeldahl": "Destilador de proteína Kjeldahl",
                                                    "Estufas": "Estufas",
                                                    "Balanza analítica": "Balança analítica",
                                                    "Extractor de grasa": "Extrator de gordura",
                                                    "Extractor de fibra": "Extrator de fibra",
                                                    "Calorímetro": "Calorímetro",
                                                    "Viscosímetro Brookfield": "Viscosímetro Brookfield",
                                                    "Microlisa": "Microlisa",
                                                    "Autoclave": "Autoclave",
                                                    "Incubadora": "Incubadora"
                                                }[equipo.name] || equipo.name)
                                                : equipo.name}
                                    </h4>
                                </article>
                            ))}
                        </div>

                        <button
                            type="button"
                            className="lab-equipment-toggle"
                            data-equipment-toggle
                            onClick={() => setEquipmentVisible(!equipmentVisible)}
                        >
                            {equipmentVisible
                                ? (language === "en" ? "Show less" : language === "pt" ? "Ver menos" : "Ver menos")
                                : t.allEquipment}
                            <i className={`bi bi-arrow-${equipmentVisible ? "up" : "right"}`}></i>
                        </button>
                    </section>

                    <section className="lab-detail-section">
                        <div className="lab-section-heading">
                            <h3>{t.gallery}</h3>

                            <div className="lab-gallery-controls">
                                <button
                                    type="button"
                                    className="lab-gallery-prev"
                                    aria-label={t.previous}
                                    onClick={previousGallery}
                                >
                                    <i className="bi bi-chevron-left"></i>
                                </button>

                                <button
                                    type="button"
                                    className="lab-gallery-next"
                                    aria-label={t.next}
                                    onClick={nextGallery}
                                >
                                    <i className="bi bi-chevron-right"></i>
                                </button>
                            </div>
                        </div>

                        <div className="lab-gallery-carousel">
                            <div
                                className="lab-gallery-track"
                                style={{
                                    transform: `translateX(-${galleryIndex * 100}%)`
                                }}
                            >
                                {images.map((imagen, index) => (
                                    <button
                                        type="button"
                                        className="lab-gallery-item"
                                        data-gallery-image={getImageUrl(imagen)}
                                        key={imagen.glbCodigoImg || index}
                                        onClick={() => openLightbox(index)}
                                    >
                                        <img
                                            src={getImageUrl(imagen)}
                                            alt={imagen.glbDescripc || nombre}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="lab-detail-section">
                        <div className="lab-services-layout">
                            <div className="lab-services-content">
                                <h3>{t.activities}</h3>

                                <ul className="lab-services-list">
                                    {activities.map((activity, index) => (
                                        <li key={index}>
                                            <i className="bi bi-check-circle-fill"></i>
                                            <span>
                                                {language === "en"
                                                    ? ({
                                                        "Análisis bromatológicos": "Bromatological analysis",
                                                        "Análisis físicos-químicos": "Physical-chemical analysis",
                                                        "Análisis microbiológicos": "Microbiological analysis",
                                                        "Análisis de materias primas de origen animal": "Analysis of raw materials of animal origin",
                                                        "Análisis de materias primas de origen vegetal": "Analysis of raw materials of plant origin",
                                                        "Análisis de productos terminados": "Analysis of finished products"
                                                    }[activity] || activity)
                                                    : language === "pt"
                                                        ? ({
                                                            "Análisis bromatológicos": "Análises bromatológicas",
                                                            "Análisis físicos-químicos": "Análises físico-químicas",
                                                            "Análisis microbiológicos": "Análises microbiológicas",
                                                            "Análisis de materias primas de origen animal": "Análise de matérias-primas de origem animal",
                                                            "Análisis de materias primas de origen vegetal": "Análise de matérias-primas de origem vegetal",
                                                            "Análisis de productos terminados": "Análise de produtos acabados"
                                                        }[activity] || activity)
                                                        : activity}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="lab-services-image">
                                <img
                                    src="https://www.uteq.edu.ec/assets/images/research/laboratories/laboratorio-ciencias.png"
                                    alt={language === "en" ? "Laboratory activities" : language === "pt" ? "Atividades do laboratório" : "Actividades del laboratorio"}
                                />
                            </div>
                        </div>
                    </section>

                    <div
                        className={`lab-lightbox ${lightboxOpen ? "active" : ""}`}
                        id="labLightbox"
                    >
                        <div className="lab-lightbox-content">
                            <button
                                type="button"
                                className="lab-lightbox-close"
                                aria-label={t.close}
                                onClick={closeLightbox}
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>

                            <button
                                type="button"
                                className="lab-lightbox-prev"
                                aria-label={t.previous}
                                onClick={previousGallery}
                            >
                                <i className="bi bi-chevron-left"></i>
                            </button>

                            {images.length > 0 && (
                                <img
                                    className="lab-lightbox-image"
                                    src={getImageUrl(images[galleryIndex])}
                                    alt={images[galleryIndex].glbDescripc || nombre}
                                />
                            )}

                            <button
                                type="button"
                                className="lab-lightbox-next"
                                aria-label={t.next}
                                onClick={nextGallery}
                            >
                                <i className="bi bi-chevron-right"></i>
                            </button>

                            <div className="lab-lightbox-counter">
                                <span>{images.length ? galleryIndex + 1 : 0}</span>
                                /
                                <span>{images.length}</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                detalle && (
                    <div
                        className="lab-detail-intro"
                        dangerouslySetInnerHTML={sanitizedData(detalle)}
                    ></div>
                )
            )}
        </article>
    );
}

function BodyLaboratorios(data) {
    const [activeTab, setActiveTab] = useState("todos");

    const labs = data.labsinfo || [];
    const gallery = data.galinfo || [];

    const getLabName = (item) => {
        return getLanguageValue(item, "nombreCorto", data.language);
    };

    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="/assets/css/investigacion/laboratorios.css"
                />
            </Head>

            <section className="labs-section">
                <div className="lab-tabs-wrapper">
                    <div className="lab-tab-fixed">
                        <button
                            type="button"
                            className={`nav-link ${activeTab === "todos" ? "active" : ""}`}
                            onClick={() => setActiveTab("todos")}
                        >
                            <i className="bi bi-grid-fill"></i>
                            <span>
                                {data.language === "en"
                                    ? "All"
                                    : data.language === "pt"
                                        ? "Todos"
                                        : "Todos"}
                            </span>
                        </button>
                    </div>

                    <div className="lab-tabs-scroll">
                        <ul className="nav nav-pills lab-tabs" id="labTabs" role="tablist">
                            {labs.map((item) => (
                                <li className="nav-item" key={item.dmCodgDato}>
                                    <button
                                        type="button"
                                        className={`nav-link ${activeTab === String(item.dmCodgDato) ? "active" : ""}`}
                                        onClick={() => setActiveTab(String(item.dmCodgDato))}
                                    >
                                        {getLabName(item)}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="tab-content" id="labTabsContent">
                    {activeTab === "todos" && (
                        <div className="tab-pane fade show active" id="todos" role="tabpanel">
                            <div className="section-title-row">
                                <div>
                                    <div className="eyebrow">
                                        {data.language === "en"
                                            ? "GET TO KNOW OUR"
                                            : data.language === "pt"
                                                ? "CONHEÇA NOSSOS"
                                                : "CONOCE NUESTROS"}
                                    </div>

                                    <h2>
                                        {data.language === "en"
                                            ? "Research Laboratories"
                                            : data.language === "pt"
                                                ? "Laboratórios de Pesquisa"
                                                : "Laboratorios de Investigación"}
                                    </h2>

                                    <div className="title-underline"></div>
                                </div>
                            </div>

                            <div className="all-labs-grid">
                                {labs.map((item) => (
                                    <LaboratoryCard
                                        key={item.dmCodgDato}
                                        item={item}
                                        gallery={gallery}
                                        language={data.language}
                                        onClick={() => setActiveTab(String(item.dmCodgDato))}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab !== "todos" && (
                        <div
                            className="tab-pane fade show active"
                            id={`lab-${activeTab}`}
                            role="tabpanel"
                        >
                            {labs
                                .filter(item => String(item.dmCodgDato) === activeTab)
                                .map(item => (
                                    <LaboratoryDetail
                                        key={item.dmCodgDato}
                                        item={item}
                                        gallery={gallery}
                                        language={data.language}
                                    />
                                ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}