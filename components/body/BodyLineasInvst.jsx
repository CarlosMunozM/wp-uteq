import DOMPurify from 'isomorphic-dompurify';
import { Accordion } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

export { BodyLineasInvst };

function ItemRowTable(props) {
    return (<tr><td>{props.sublinea.trim()}</td></tr>)
}

const listRowsTable = (dataItems) => {
    return (
        dataItems.map((item) => {
            return (<ItemRowTable key={uuidv4()} sublinea={item} />);
        })
    )
}

function ItemTabLineRes(props) {
    return (
        <Accordion.Item /*eventKey={props.index} key={uuidv4()}*/ eventKey={String(props.index)} key={props.index} id={`acc-${props.index}`}>
            <Accordion.Header>{props.nombre.trim()}</Accordion.Header>
            <Accordion.Body>
                <div className="col-md-12 w-100">
                    <div className="row mx-auto mb-3">
                        <div className="col-md-12 col-lg-12 pn-md-pg"><b>{props.language==="es"?"Área y subárea del conocimiento UNESCO:":(props.language==="en"?"Area and sub-area of knowledge UNESCO:":"Área e sub-área do conhecimento UNESCO:")} 
                        </b> {props.areauns.trim()}</div>
                    </div>
                    {
                        props.sublineas.length > 0 && (
                            <table id="tbl-sublines" className="display table-static w-100">
                                <thead>
                                    <tr>
                                        <th>{props.language==="es"?"Sub-líneas":(props.language==="en"?"Sub-lines":"Sub-linhas")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listRowsTable(props.sublineas)}
                                </tbody>
                            </table>
                        )
                    }
                </div>
            </Accordion.Body>
        </Accordion.Item>
    )
}

function BodyLineasInvst(data) {
	
	const router = useRouter();

  const accFromUrl = useMemo(() => {
    const v = router.query.acc;
    return typeof v === "string" ? v : null;
  }, [router.query.acc]);

  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;
    if (accFromUrl !== null) setActiveKey(accFromUrl);
  }, [router.isReady, accFromUrl]);

  useEffect(() => {
  if (!router.isReady) return;

  const hash = window.location.hash?.slice(1);
  if (!hash) return;

  const scrollToHash = () => {
    const opened = document.querySelector(".accordion-collapse.collapse.show");
    if (!opened) return false;

    const el = document.getElementById(hash);
    if (!el) return false;

    el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });

    el.scrollIntoView({ behavior: "smooth", block: "start" });

    const header = document.querySelector("header, .navbar, .site-header");
    const offset = header ? header.offsetHeight : 0;

    if (offset) {
      window.scrollBy({ top: -offset, left: 0, behavior: "instant" });
    }

    return true;
  };

  let tries = 0;
  const t = setInterval(() => {
    tries++;
    if (scrollToHash() || tries > 20) clearInterval(t);
  }, 50);

  return () => clearInterval(t);
}, [router.isReady, activeKey]);

    const sanitizedData = (codeHTML) => ({
        __html: DOMPurify.sanitize(codeHTML)
    })

    const listTabsLinesRes = (dataItems) => {
        return (
            dataItems.map((item, index) => {
                return (
                    <ItemTabLineRes key={uuidv4()} index={index} nombre={data.language === "es" ? item.liNombre : (data.language === "en" ? item.liNombreEn : item.liNombrePt)}
                        areauns={data.language === "es" ? item.liAreaUnesco.anNombre : (data.language === "en" ? item.liAreaUnesco.anNombreEn : item.liAreaUnesco.anNombrePt)}
                        sublineas={data.language === "es" ? item.liSublineasInv : (data.language === "en" ? item.liSublineasInvEn : item.liSublineasInvPt)} language={data.language} />
                )
            })
        )
    }

    return (<>
        <div className="row">
            <h2 className="title-cont-page text-center mb-3">{data.language === "es" ? data.data8.pwNombre.trim() : (data.language === "en" ? data.data8.pwNombreEn.trim() : data.data8.pwNombrePt.trim())}</h2>
            {
                (data.data8 !== null && data.data8 !== "") ? (
                    <div className="col-md-12 w-100 sublines-objc" dangerouslySetInnerHTML={sanitizedData(data.language === "es" ? data.data8.pwObjetivos.trim() : (data.language === "en" ? data.data8.pwObjetivosEn.trim() : data.data8.pwObjetivosPt.trim()))}></div>
                ) : ""
            }
            <div className="col-md-12 w-100">
                {
                    (data.datalines !== null && data.datalines !== "") && (
                        data.datalines.length > 0 && (<>
                            <Accordion /*defaultActiveKey={0}*/ activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
                                {listTabsLinesRes(data.datalines)}
                            </Accordion>
                        </>)
                    )
                }
            </div>
        </div>
    </>);
}