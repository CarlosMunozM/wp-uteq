import { SliderImg } from "components";
import DOMPurify from 'isomorphic-dompurify';
import React from 'react';
import { Badge, Accordion } from 'react-bootstrap';



export { BodyLogistica };


function BodyLogistica(data) {

    const sanitizedData = (codeHTML) => ({
        __html: DOMPurify.sanitize(codeHTML)
    })

    const renderTextInfo = (dataInfoDept) => {
        return (<>
            <div className="row">
                <h2 className="title-cont-page text-center mb-3">{dataInfoDept.language === "en" ? "Logistics" : "Logística"}</h2>
                <h3 className="title-cont-page text-left">{dataInfoDept.language === "es" ? "Contratación Pública" : (dataInfoDept.language === "en" ? "Public procurement" : "Contratos públicos")}</h3>
                {
                    (dataInfoDept.data8.dpHistoria !== null && dataInfoDept.data8.dpHistoria !== "") && (<>
                        <div className="col-md-12 w-100">
                            <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(dataInfoDept.language === "es" ? dataInfoDept.data8.dpHistoria.trim() : (dataInfoDept.language === "en" ? dataInfoDept.data8.dpHistoriaEn.trim() : dataInfoDept.data8.dpHistoriaPt.trim()))}></div>
                        </div>
                    </>)
                }
                <div className="col-md-12 w-100">
                    {(dataInfoDept.slider1 !== null && dataInfoDept.slider1 !== "") && SliderImg(dataInfoDept.slider1, 20, 2000, 300)}
                </div>

                <h4 className="title-cont-page text-left mt-3">{dataInfoDept.language === "es" ? "Planes Anuales de Contratación" : (dataInfoDept.language === "en" ? "Annual Recruitment Plans" : "Planos Anuais de Recrutamento")}</h4>
                <div className="col-md-12 w-100">

                    <Accordion defaultActiveKey={0}>
                        <Accordion.Item eventKey={0}>
                            <Accordion.Header>{dataInfoDept.language === "es" ? "Plan Anual de Contratación 2025" : (dataInfoDept.language === "en" ? "Annual Recruitment Plan 2025" : "Plano de Recrutamento Anual 2025")}</Accordion.Header>
                            <Accordion.Body>
                                <div className="col-md-12 w-100">
                                    <div className="col-md-12 w-100">
                                        <table id="tbl-sublines" className="display table-static w-100">
                                            <thead>
                                                <tr>
                                                    <th>{dataInfoDept.language === "es" ? "Documentación & Resoluciones" : (dataInfoDept.language === "en" ? "Documentation & Resolutions" : "Documentação e resoluções")}</th>
                                                    <th className="text-center">...</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/*<tr>
                                                    <td>{dataInfoDept.language === "es" ? "Resolución de aprobación PAC" :
                                                        (dataInfoDept.language === "en" ? "Resolution approving PAC" : "Resolução que aprova a PAC")}</td>
                                                    <td className="text-center">
                                                        <a href="/assets/docs/logistics/PAC2025.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                        </a>
                                                    </td>
                                                </tr>*/}
                                                <tr>
                                                    <td>PAC 2025</td>
                                                    <td className="text-center">
                                                        <a href="/assets/docs/logistics/PAC2025.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                                {/*<tr>
                                                    <td>{dataInfoDept.language === "es" ? "Resoluciones de Reformas al PAC" :
                                                        (dataInfoDept.language === "en" ? "PAC Reform Resolutions" : "Resoluções de reforma do PAC")}</td>
                                                    <td className="text-center">
                                                        <a href="/assets/docs/logistics/PAC2025.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                        </a>
                                                    </td>
                                                </tr>*/}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey={1}>
                            <Accordion.Header>{dataInfoDept.language === "es" ? "Plan Anual de Contratación 2024" : (dataInfoDept.language === "en" ? "Annual Recruitment Plan 2024" : "Plano de Recrutamento Anual 2024")}</Accordion.Header>
                            <Accordion.Body>
                                <div className="col-md-12 w-100">
                                    <div className="col-md-12 w-100">
                                        <table id="tbl-sublines" className="display table-static w-100">
                                            <thead>
                                                <tr>
                                                    <th>{dataInfoDept.language === "es" ? "Documentación & Resoluciones" : (dataInfoDept.language === "en" ? "Documentation & Resolutions" : "Documentação e resoluções")}</th>
                                                    <th className="text-center">...</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{dataInfoDept.language === "es" ? "Resolución de aprobación PAC" :
                                                        (dataInfoDept.language === "en" ? "Resolution approving PAC" : "Resolução que aprova a PAC")}</td>
                                                    <td className="text-center">
                                                        <a href="/assets/docs/logistics/resolucion-aprobacion-pac-2024.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>PAC 2024</td>
                                                    <td className="text-center">
                                                        <a href="/assets/docs/logistics/PAC2024.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-md-12 w-100">
                                        <Accordion>
                                            <Accordion.Item eventKey={0}>
                                                <Accordion.Header>{dataInfoDept.language === "es" ? "Resoluciones de Reformas al PAC" :
                                                    (dataInfoDept.language === "en" ? "PAC Reform Resolutions" : "Resoluções de reforma do PAC")}</Accordion.Header>
                                                <Accordion.Body>
                                                    <div className="col-md-12 w-100">
                                                        <div className="col-md-12 w-100">
                                                            <table id="tbl-sublines" className="display table-static w-100">
                                                                <thead>
                                                                    <tr>
                                                                        <th>{dataInfoDept.language === "es" ? "Documentación" : (dataInfoDept.language === "en" ? "Documentation" : "Documentação")}</th>
                                                                        <th className="text-center">...</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 07</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/01_RE_PAC_UTEQ_07.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 09</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/02_RE_PAC_UTEQ_09.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 10</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/03_RE_PAC_UTEQ_10.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 13</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/04_RE_PAC_UTEQ_13.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 11</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/05_RE_PAC_UTEQ_11.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 15</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/06_RE_PAC_UTEQ_15.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 17</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/07_RE_PAC_UTEQ_17.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 19</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/08_RE_PAC_UTEQ_19.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 21</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/09_RE_PAC_UTEQ_21.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 23</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/10_RE_PAC_UTEQ_23.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 25</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/11_RE_PAC_UTEQ_25.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 09</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/12_RE_PAC_UTEQ_09.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 29</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/13_RE_PAC_UTEQ_29.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 33</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/14_RE_PAC_UTEQ_33.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 35</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/15_RE_PAC_UTEQ_35.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 38</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/16_RE_PAC_UTEQ_38.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 37</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/17_RE_PAC_UTEQ_37.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 36</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/18_RE_PAC_UTEQ_36.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 39</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/19_RE_PAC_UTEQ_39.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 41</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/20_RE_PAC_UTEQ_41.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 42</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/21_RE_PAC_UTEQ_42.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 44</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/22_RE_PAC_UTEQ_44.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 45</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/23_RE_PAC_UTEQ_45.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 47</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/24_RE_PAC_UTEQ_47.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 48</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/25_RE_PAC_UTEQ_48.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 55</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/26_RE_PAC_UTEQ_55.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 57</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/27_RE_PAC_UTEQ_57.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 53</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/28_RE_PAC_UTEQ_53.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 60</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/29_RE_PAC_UTEQ_60.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 63</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/30_RE_PAC_UTEQ_63.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 64</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/31_RE_PAC_UTEQ_64.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 66</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/32_RE_PAC_UTEQ_66.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 68</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/33_RE_PAC_UTEQ_68.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 73</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/34_RE_PAC_UTEQ_73.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 75</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/35_RE_PAC_UTEQ_75.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 76</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/36_RE_PAC_UTEQ_76.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 77</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/37_RE_PAC_UTEQ_77.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 72</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/38_RE_PAC_UTEQ_72.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 84</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/39_RE_PAC_UTEQ_84.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 82</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/40_RE_PAC_UTEQ_82.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 85</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/41_RE_PAC_UTEQ_85.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 88</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/42_RE_PAC_UTEQ_88.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 89</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/43_RE_PAC_UTEQ_89.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 90</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/44_RE_PAC_UTEQ_90.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 94</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/45_RE_PAC_UTEQ_94.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 93</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/46_RE_PAC_UTEQ_93.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 98</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/47_RE_PAC_UTEQ_98.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 99</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/48_RE_PAC_UTEQ_99.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 101</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/49_RE_PAC_UTEQ_101.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 107</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/50_RE_PAC_UTEQ_107.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 106</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/51_RE_PAC_UTEQ_106.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 109</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/52_RE_PAC_UTEQ_109.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 114</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/53_RE_PAC_UTEQ_114.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 115</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/54_RE_PAC_UTEQ_115.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 116</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/55_RE_PAC_UTEQ_116.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 119</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/56_RE_PAC_UTEQ_119.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 121</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/57_RE_PAC_UTEQ_121.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 123</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/58_RE_PAC_UTEQ_123.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 125</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/59_RE_PAC_UTEQ_125.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 127</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/60_RE_PAC_UTEQ_127.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 131</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/61_RE_PAC_UTEQ_131.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 135</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/62_RE_PAC_UTEQ_135.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 143</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/63_RE_PAC_UTEQ_143.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 146</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/64_RE_PAC_UTEQ_146.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 147</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/65_RE_PAC_UTEQ_147.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 149</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/66_RE_PAC_UTEQ_149.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 150</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/67_RE_PAC_UTEQ_150.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 153</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/68_RE_PAC_UTEQ_153.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 156</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/69_RE_PAC_UTEQ_156.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 154</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/70_RE_PAC_UTEQ_154.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 157</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/71_RE_PAC_UTEQ_157.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 159</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/72_RE_PAC_UTEQ_159.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 163</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/73_RE_PAC_UTEQ_163.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 164</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/74_RE_PAC_UTEQ_164.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 168</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/75_RE_PAC_UTEQ_168.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 169</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/76_RE_PAC_UTEQ_169.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 167</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/77_RE_PAC_UTEQ_167.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 171</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/78_RE_PAC_UTEQ_171.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 172</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/79_RE_PAC_UTEQ_172.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 173</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/80_RE_PAC_UTEQ_173.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 177A</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/81_RE_PAC_UTEQ_177A.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 179</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/82_RE_PAC_UTEQ_179.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 181</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/83_RE_PAC_UTEQ_181.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 182</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/84_RE_PAC_UTEQ_182.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 189</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/85_RE_PAC_UTEQ_189.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 193</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/86_RE_PAC_UTEQ_193.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 195</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/87_RE_PAC_UTEQ_195.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 187</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/88_RE_PAC_UTEQ_187.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 196</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/89_RE_PAC_UTEQ_196.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 198</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/90_RE_PAC_UTEQ_198.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 201</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/91_RE_PAC_UTEQ_201.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 203</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/92_RE_PAC_UTEQ_203.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 208</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/93_RE_PAC_UTEQ_208.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 209</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/94_RE_PAC_UTEQ_209.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 210</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/95_RE_PAC_UTEQ_210.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 214</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2024/96_RE_PAC_UTEQ_214.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey={2}>
                            <Accordion.Header>{dataInfoDept.language === "es" ? "Plan Anual de Contratación 2023" : (dataInfoDept.language === "en" ? "Annual Recruitment Plan 2023" : "Plano de Recrutamento Anual 2023")}</Accordion.Header>
                            <Accordion.Body>
                                <div className="col-md-12 w-100">
                                    <div className="col-md-12 w-100">
                                        <table id="tbl-sublines" className="display table-static w-100">
                                            <thead>
                                                <tr>
                                                    <th>{dataInfoDept.language === "es" ? "Documentación & Resoluciones" : (dataInfoDept.language === "en" ? "Documentation & Resolutions" : "Documentação e resoluções")}</th>
                                                    <th className="text-center">...</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            	<tr>
                                                    <td>{dataInfoDept.language === "es" ? "Resolución de aprobación PAC" :
                                                        (dataInfoDept.language === "en" ? "Resolution approving PAC" : "Resolução que aprova a PAC")}</td>
                                                    <td className="text-center">
                                                        <a href="/assets/docs/logistics/resolucion-aprobacion-pac-2023.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>PAC 2023</td>
                                                    <td className="text-center">
                                                        <a href="/assets/docs/logistics/PAC2023.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                	<div className="col-md-12 w-100">
                                        <Accordion>
                                            <Accordion.Item eventKey={0}>
                                                <Accordion.Header>{dataInfoDept.language === "es" ? "Resoluciones de Reformas al PAC" :
                                                    (dataInfoDept.language === "en" ? "PAC Reform Resolutions" : "Resoluções de reforma do PAC")}</Accordion.Header>
                                                <Accordion.Body>
                                                    <div className="col-md-12 w-100">
                                                        <div className="col-md-12 w-100">
                                                            <table id="tbl-sublines" className="display table-static w-100">
                                                                <thead>
                                                                    <tr>
                                                                        <th>{dataInfoDept.language === "es" ? "Documentación" : (dataInfoDept.language === "en" ? "Documentation" : "Documentação")}</th>
                                                                        <th className="text-center">...</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 03</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/01_RE_PAC_UTEQ_03.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 10A</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/02_RE_PAC_UTEQ_10A.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 015A</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/03_RE_PAC_UTEQ_015A.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 019</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/04_RE_PAC_UTEQ_019.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 021</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/05_RE_PAC_UTEQ_021.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 030</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/06_RE_PAC_UTEQ_030.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 031</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/07_RE_PAC_UTEQ_031.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 036</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/08_RE_PAC_UTEQ_036.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 037</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/09_RE_PAC_UTEQ_037.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 041</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/10_RE_PAC_UTEQ_041.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 042</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/11_RE_PAC_UTEQ_042.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 055</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/12_RE_PAC_UTEQ_055.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 057</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/13_RE_PAC_UTEQ_057.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 062</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/14_RE_PAC_UTEQ_062.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 063</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/15_RE_PAC_UTEQ_063.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 070</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/16_RE_PAC_UTEQ_070.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 074</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/17_RE_PAC_UTEQ_074.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 080</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/18_RE_PAC_UTEQ_080.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 83</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/19_RE_PAC_UTEQ_83.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 84</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/20_RE_PAC_UTEQ_84.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 85</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/21_RE_PAC_UTEQ_85.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 89</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/22_RE_PAC_UTEQ_89.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 90</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/23_RE_PAC_UTEQ_90.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 91</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/24_RE_PAC_UTEQ_91.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 92</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/25_RE_PAC_UTEQ_92.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 94</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/26_RE_PAC_UTEQ_94.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 96</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/27_RE_PAC_UTEQ_96.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 97</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/28_RE_PAC_UTEQ_97.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 98</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/29_RE_PAC_UTEQ_98.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 30</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/30_RE_PAC_UTEQ_30.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 100</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/31_RE_PAC_UTEQ_100.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 104</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/32_RE_PAC_UTEQ_104.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 108</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/33_RE_PAC_UTEQ_108.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 110</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/34_RE_PAC_UTEQ_110.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 112</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/35_RE_PAC_UTEQ_112.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 113</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/36_RE_PAC_UTEQ_113.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 115</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/37_RE_PAC_UTEQ_115.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 116</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/38_RE_PAC_UTEQ_116.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 118</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/39_RE_PAC_UTEQ_118.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 120</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/40_RE_PAC_UTEQ_120.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 122</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/41_RE_PAC_UTEQ_122.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 124</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/42_RE_PAC_UTEQ_124.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 127</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/43_RE_PAC_UTEQ_127.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 129</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/44_RE_PAC_UTEQ_129.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 133</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/45_RE_PAC_UTEQ_133.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 135</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/46_RE_PAC_UTEQ_135.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 136</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/47_RE_PAC_UTEQ_136.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 138</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/48_RE_PAC_UTEQ_138.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 142</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/49_RE_PAC_UTEQ_142.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 144</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/50_RE_PAC_UTEQ_144.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 149</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/51_RE_PAC_UTEQ_149.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 153</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/52_RE_PAC_UTEQ_153.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 157</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/53_RE_PAC_UTEQ_157.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 161</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/54_RE_PAC_UTEQ_161.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 166</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/55_RE_PAC_UTEQ_166.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 168</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/56_RE_PAC_UTEQ_168.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 170</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/57_RE_PAC_UTEQ_170.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 173A</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/58_RE_PAC_UTEQ_173A.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>RE PAC UTEQ 175</td>
                                                                        <td className="text-center">
                                                                            <a href="/assets/docs/logistics/reforms/2023/59_RE_PAC_UTEQ_175.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                                                <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey={3}>
                            <Accordion.Header>{dataInfoDept.language === "es" ? "Plan Anual de Contratación 2022" : (dataInfoDept.language === "en" ? "Annual Recruitment Plan 2022" : "Plano de Recrutamento Anual 2022")}</Accordion.Header>
                            <Accordion.Body>
                                <div className="col-md-12 w-100">
                                    <div className="col-md-12 w-100">
                                        <table id="tbl-sublines" className="display table-static w-100">
                                            <thead>
                                                <tr>
                                                    <th>{dataInfoDept.language === "es" ? "Documentación & Resoluciones" : (dataInfoDept.language === "en" ? "Documentation & Resolutions" : "Documentação e resoluções")}</th>
                                                    <th className="text-center">...</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            	<tr>
                                                    <td>{dataInfoDept.language === "es" ? "Resolución de aprobación PAC" :
                                                        (dataInfoDept.language === "en" ? "Resolution approving PAC" : "Resolução que aprova a PAC")}</td>
                                                    <td className="text-center">
                                                        <a href="/assets/docs/logistics/reforms/2022/1_RESOLUCION_APROBACION_PAC-signed.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>PAC 2022</td>
                                                    <td className="text-center">
                                                        <a href="/assets/docs/logistics/PAC2022.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                	<div className="col-md-12 w-100">
<Accordion>
                                            <Accordion.Item eventKey={0}>
                                                <Accordion.Header>{dataInfoDept.language === "es" ? "Resoluciones de Reformas al PAC" :
                                                    (dataInfoDept.language === "en" ? "PAC Reform Resolutions" : "Resoluções de reforma do PAC")}</Accordion.Header>
                                                <Accordion.Body>
                                                    <div className="col-md-12 w-100">
                                                        <div className="col-md-12 w-100">
                                                            <table id="tbl-sublines" className="display table-static w-100">
                                                                <thead>
                                                                    <tr>
                                                                        <th>{dataInfoDept.language === "es" ? "Documentación" : (dataInfoDept.language === "en" ? "Documentation" : "Documentação")}</th>
                                                                        <th className="text-center">...</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                <tr>
    <td>RE PAC UTEQ 08</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_08.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 09</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_09.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 10</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_10.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 11</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_11.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 13</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_13.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 14</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_14.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 15</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_15.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 20</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_20.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 21</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_21.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 22</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_22.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 23</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_23.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 25</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_25.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 26</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_26.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 29</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_29.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 32</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_32.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 33</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_33.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 34</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_34.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 35</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_35.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 36</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_36.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 37</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_37.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 38</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_38.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 44</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_44.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 47</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_47.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 48</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_48.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 49</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_49.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 50</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_50.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 51</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_51.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 61</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_61.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 62</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_62.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 63</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_63.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 64</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_64.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 66</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_66.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 69</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_69.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 70</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_70.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 71</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_71.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 72</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_72.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 73</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_73.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 77</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_77.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 79</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_79.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 80</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_80.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 81</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_81.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 83</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_83.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 84</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_84.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 85</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_85.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 88</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_88.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 89</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_89.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 90</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_90.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 91</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_91.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 92</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_92.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 94</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_94.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 96</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_96.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 97</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_97.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 99</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_99.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 103</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_103.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 105</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_105.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 106</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_106.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 107</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_107.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 113</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_113.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 114</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_114.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 115</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_115.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 118</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_118.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 120</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_120.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 121</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_121.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 123</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_123.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 125</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_125.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 126</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_126.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 132</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_132.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 135</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_135.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 136</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_136.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 137</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_137.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 139</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_139.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 142</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_142.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 143</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_143.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 151</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_151.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 154</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_154.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 155</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_155.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 160</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_160.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 163</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_163.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 164</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_164.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 166</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_166.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 169</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_169.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 173</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_173.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 175</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_175.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 176</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_176.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 178</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_178.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 183</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_183.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 184</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_184.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 188</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_188.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 189</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_189.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 195</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_195.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 197</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_197.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 200</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_200.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
<tr>
    <td>RE PAC UTEQ 201</td>
    <td className="text-center">
        <a href="/assets/docs/logistics/reforms/2022/RE_PAC_UTEQ_201.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
        </a>
    </td>
</tr>
</tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey={4}>
                            <Accordion.Header>{dataInfoDept.language === "es" ? "Plan Anual de Contratación 2021" : (dataInfoDept.language === "en" ? "Annual Recruitment Plan 2021" : "Plano de Recrutamento Anual 2021")}</Accordion.Header>
                            <Accordion.Body>
                                <div className="col-md-12 w-100">
                                    <div className="col-md-12 w-100">
                                        <table id="tbl-sublines" className="display table-static w-100">
                                            <thead>
                                                <tr>
                                                    <th>{dataInfoDept.language === "es" ? "Documentación & Resoluciones" : (dataInfoDept.language === "en" ? "Documentation & Resolutions" : "Documentação e resoluções")}</th>
                                                    <th className="text-center">...</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>PAC 2021</td>
                                                    <td className="text-center">
                                                        <a href="/assets/docs/logistics/PAC2021.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey={5}>
                            <Accordion.Header>{dataInfoDept.language === "es" ? "Plan Anual de Contratación 2020" : (dataInfoDept.language === "en" ? "Annual Recruitment Plan 2020" : "Plano de Recrutamento Anual 2020")}</Accordion.Header>
                            <Accordion.Body>
                                <div className="col-md-12 w-100">
                                    <div className="col-md-12 w-100">
                                        <table id="tbl-sublines" className="display table-static w-100">
                                            <thead>
                                                <tr>
                                                    <th>{dataInfoDept.language === "es" ? "Documentación & Resoluciones" : (dataInfoDept.language === "en" ? "Documentation & Resolutions" : "Documentação e resoluções")}</th>
                                                    <th className="text-center">...</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>PAC 2020</td>
                                                    <td className="text-center">
                                                        <a href="/assets/docs/logistics/PAC2020.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey={6}>
                            <Accordion.Header>{dataInfoDept.language === "es" ? "Plan Anual de Contratación 2019" : (dataInfoDept.language === "en" ? "Annual Recruitment Plan 2019" : "Plano de Recrutamento Anual 2019")}</Accordion.Header>
                            <Accordion.Body>
                                <div className="col-md-12 w-100">
                                    <div className="col-md-12 w-100">
                                        <table id="tbl-sublines" className="display table-static w-100">
                                            <thead>
                                                <tr>
                                                    <th>{dataInfoDept.language === "es" ? "Documentación & Resoluciones" : (dataInfoDept.language === "en" ? "Documentation & Resolutions" : "Documentação e resoluções")}</th>
                                                    <th className="text-center">...</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>PAC 2019</td>
                                                    <td className="text-center">
                                                        <a href="/assets/docs/logistics/PAC2019.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey={7}>
                            <Accordion.Header>{dataInfoDept.language === "es" ? "Plan Anual de Contratación 2018" : (dataInfoDept.language === "en" ? "Annual Recruitment Plan 2018" : "Plano de Recrutamento Anual 2018")}</Accordion.Header>
                            <Accordion.Body>
                                <div className="col-md-12 w-100">
                                    <div className="col-md-12 w-100">
                                        <table id="tbl-sublines" className="display table-static w-100">
                                            <thead>
                                                <tr>
                                                    <th>{dataInfoDept.language === "es" ? "Documentación & Resoluciones" : (dataInfoDept.language === "en" ? "Documentation & Resolutions" : "Documentação e resoluções")}</th>
                                                    <th className="text-center">...</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>PAC 2018</td>
                                                    <td className="text-center">
                                                        <a href="/assets/docs/logistics/PAC2018.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey={8}>
                            <Accordion.Header>{dataInfoDept.language === "es" ? "Plan Anual de Contratación 2017" : (dataInfoDept.language === "en" ? "Annual Recruitment Plan 2017" : "Plano de Recrutamento Anual 2017")}</Accordion.Header>
                            <Accordion.Body>
                                <div className="col-md-12 w-100">
                                    <div className="col-md-12 w-100">
                                        <table id="tbl-sublines" className="display table-static w-100">
                                            <thead>
                                                <tr>
                                                    <th>{dataInfoDept.language === "es" ? "Documentación & Resoluciones" : (dataInfoDept.language === "en" ? "Documentation & Resolutions" : "Documentação e resoluções")}</th>
                                                    <th className="text-center">...</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>PAC 2017</td>
                                                    <td className="text-center">
                                                        <a href="/assets/docs/logistics/PAC2017.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey={9}>
                            <Accordion.Header>{dataInfoDept.language === "es" ? "Plan Anual de Contratación 2016" : (dataInfoDept.language === "en" ? "Annual Recruitment Plan 2016" : "Plano de Recrutamento Anual 2016")}</Accordion.Header>
                            <Accordion.Body>
                                <div className="col-md-12 w-100">
                                    <div className="col-md-12 w-100">
                                        <table id="tbl-sublines" className="display table-static w-100">
                                            <thead>
                                                <tr>
                                                    <th>{dataInfoDept.language === "es" ? "Documentación & Resoluciones" : (dataInfoDept.language === "en" ? "Documentation & Resolutions" : "Documentação e resoluções")}</th>
                                                    <th className="text-center">...</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>PAC 2016</td>
                                                    <td className="text-center">
                                                        <a href="/assets/docs/logistics/PAC2016.pdf" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey={10}>
                            <Accordion.Header>{dataInfoDept.language === "es" ? "Plan Anual de Contratación 2015" : (dataInfoDept.language === "en" ? "Annual Recruitment Plan 2015" : "Plano de Recrutamento Anual 2015")}</Accordion.Header>
                            <Accordion.Body>
                                <div className="col-md-12 w-100">
                                    <div className="col-md-12 w-100">
                                        <table id="tbl-sublines" className="display table-static w-100">
                                            <thead>
                                                <tr>
                                                    <th>{dataInfoDept.language === "es" ? "Documentación & Resoluciones" : (dataInfoDept.language === "en" ? "Documentation & Resolutions" : "Documentação e resoluções")}</th>
                                                    <th className="text-center">...</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>PAC 2015</td>
                                                    <td className="text-center">
                                                        <a href="/assets/docs/logistics/PAC2015.xls" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey={11}>
                            <Accordion.Header>{dataInfoDept.language === "es" ? "Plan Anual de Contratación 2014" : (dataInfoDept.language === "en" ? "Annual Recruitment Plan 2014" : "Plano de Recrutamento Anual 2014")}</Accordion.Header>
                            <Accordion.Body>
                                <div className="col-md-12 w-100">
                                    <div className="col-md-12 w-100">
                                        <table id="tbl-sublines" className="display table-static w-100">
                                            <thead>
                                                <tr>
                                                    <th>{dataInfoDept.language === "es" ? "Documentación & Resoluciones" : (dataInfoDept.language === "en" ? "Documentation & Resolutions" : "Documentação e resoluções")}</th>
                                                    <th className="text-center">...</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>PAC 2014</td>
                                                    <td className="text-center">
                                                        <a href="/assets/docs/logistics/PAC2014.xls" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey={12}>
                            <Accordion.Header>{dataInfoDept.language === "es" ? "Plan Anual de Contratación 2013" : (dataInfoDept.language === "en" ? "Annual Recruitment Plan 2013" : "Plano de Recrutamento Anual 2013")}</Accordion.Header>
                            <Accordion.Body>
                                <div className="col-md-12 w-100">
                                    <div className="col-md-12 w-100">
                                        <table id="tbl-sublines" className="display table-static w-100">
                                            <thead>
                                                <tr>
                                                    <th>{dataInfoDept.language === "es" ? "Documentación & Resoluciones" : (dataInfoDept.language === "en" ? "Documentation & Resolutions" : "Documentação e resoluções")}</th>
                                                    <th className="text-center">...</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>PAC 2013</td>
                                                    <td className="text-center">
                                                        <a href="/assets/docs/logistics/PAC2013.xls" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey={13}>
                            <Accordion.Header>{dataInfoDept.language === "es" ? "Plan Anual de Contratación 2012" : (dataInfoDept.language === "en" ? "Annual Recruitment Plan 2012" : "Plano de Recrutamento Anual 2012")}</Accordion.Header>
                            <Accordion.Body>
                                <div className="col-md-12 w-100">
                                    <div className="col-md-12 w-100">
                                        <table id="tbl-sublines" className="display table-static w-100">
                                            <thead>
                                                <tr>
                                                    <th>{dataInfoDept.language === "es" ? "Documentación & Resoluciones" : (dataInfoDept.language === "en" ? "Documentation & Resolutions" : "Documentação e resoluções")}</th>
                                                    <th className="text-center">...</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>PAC 2012</td>
                                                    <td className="text-center">
                                                        <a href="/assets/docs/logistics/PAC2012.xls" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey={14}>
                            <Accordion.Header>{dataInfoDept.language === "es" ? "Plan Anual de Contratación 2011" : (dataInfoDept.language === "en" ? "Annual Recruitment Plan 2011" : "Plano de Recrutamento Anual 2011")}</Accordion.Header>
                            <Accordion.Body>
                                <div className="col-md-12 w-100">
                                    <div className="col-md-12 w-100">
                                        <table id="tbl-sublines" className="display table-static w-100">
                                            <thead>
                                                <tr>
                                                    <th>{dataInfoDept.language === "es" ? "Documentación & Resoluciones" : (dataInfoDept.language === "en" ? "Documentation & Resolutions" : "Documentação e resoluções")}</th>
                                                    <th className="text-center">...</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>PAC 2011</td>
                                                    <td className="text-center">
                                                        <a href="/assets/docs/logistics/pac2011.xls" className="btn-table" target="_blank" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "en" ? "View document" : "Ver documento"}>
                                                            <i className="fa fa-eye fa-2x" aria-hidden="true"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                </div>

                {
                    (dataInfoDept.data8.dpResponsabilidades !== null && dataInfoDept.data8.dpResponsabilidades !== "") && (<>
                        <h4 className="title-cont-page text-left mt-3">{dataInfoDept.language === "es" ? "Unidad de Control de Activos" : (dataInfoDept.language === "en" ? "Asset Control Unit" : "Unidade de Controlo de Activos")}</h4>
                        <div className="col-md-12 w-100">
                            <div className="paragraph-cont" dangerouslySetInnerHTML={sanitizedData(dataInfoDept.language === "es" ? dataInfoDept.data8.dpResponsabilidades.trim() : (dataInfoDept.language === "en" ? dataInfoDept.data8.dpResponsabilidadesEn.trim() : dataInfoDept.data8.dpResponsabilidadesPt.trim()))}></div>
                        </div>
                    </>)
                }
                <div className="col-md-12 w-100">
                    <ul className="list-circle-text">
                        <li><a href="https://ebye.finanzas.gob.ec/ebye/login/frmlogineByE.aspx" aria-label="link eByE" target="_blank">{dataInfoDept.language === "es" ? "Sistema de Bienes y Existencias" : (dataInfoDept.language === "en" ? "Asset and Stock System" : "Sistema de Activos e Acções")}</a></li>
                    </ul>
                </div>
                {
                    (dataInfoDept.authort !== "" && dataInfoDept.authort !== null) ? (<>
                        <h2 className="msg-pnl-search text-right mt-3">{dataInfoDept.language === "es" ? "Correo electrónico" : (dataInfoDept.language === "en" ? "E-mail" : "Endereço electrónico")}</h2>
                        {
                            (dataInfoDept.authort.auCorreoElect !== null && dataInfoDept.authort.auCorreoElect !== '') ? (<>
                                <a href={`mailto:${dataInfoDept.authort.auCorreoElect.trim()}`} target="_blank" aria-label="link correo" data-toggle="tooltip" data-placement="bottom" title={dataInfoDept.language === "es" ? "Comunicación vía correo electrónico" : (dataInfoDept.language === "en" ? "Communication via e-mail" : "Comunicação via e-mail")} style={{ textDecoration: 'none' }}>
                                    <Badge bg="secondary" className="link-email-member"><i className="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;&nbsp;{dataInfoDept.authort.auCorreoElect.trim()}</Badge>
                                </a>
                            </>) : (<></>)
                        }
                    </>) : (<></>)
                }
            </div>
        </>);
    }

    return (<>
        {renderTextInfo(data)}
    </>);
}
