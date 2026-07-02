import { NEWSPAPERS_FOLDER, INVESTG_IMGS_FOLDER, apiUrl, LOGOS_BG_FOLDER, UTQINV_IMGS_FOLDER } from 'config';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';


export { SideMenu };


const letterMonth = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

function ItemMenu(props) {
    const regEx = /^http/;

    switch (props.tipo) {
        case 1:
            return <li><a className={`item-side-menu ${(props.mnCodigo === 149 ? (apiUrl + "/" + props.language + "/" + props.url + props.urlfac) : (props.url !== "" && props.url !== "#") ? (apiUrl + "/" + props.language + "/" + props.url) : props.url) === props.paramadc ? 'item-side-menu-active' : ''}`}
                href={!regEx.test(props.url) ? (props.mnCodigo === 149 ? (apiUrl + "/" + props.language + "/" + props.url + props.urlfac) : (apiUrl + "/" + props.language + "/" + props.url)) : (props.url)}>{props.nombre.trim()}</a></li>
        case 2:
            return <li><a className={`item-side-menu ${(!regEx.test(props.url) ? (props.url !== 'investigacion' ? `${apiUrl}/${props.language}/investigacion/${props.url}` : `${apiUrl}/${props.language}/${props.url}`) : (props.url)) === props.paramadc ? 'item-side-menu-active' : ''}`}
                href={!regEx.test(props.url) ? ((props.url !== 'investigacion' && props.url !== 'cidu') ? `/${props.language}/investigacion/${props.url}` : `/${props.language}/${props.url}`) : (props.url)}>{props.nombre.trim()}</a></li>
        case 3:
            return <li><a className={`item-side-menu ${(!regEx.test(props.url) ? (props.url !== 'vinculacion' ? `${apiUrl}/${props.language}/vinculacion/${props.url}` : `${apiUrl}/${props.language}/${props.url}`) : (props.url)) === props.paramadc ? 'item-side-menu-active' : ''}`} href={!regEx.test(props.url) ? (props.url !== 'vinculacion' ? `/${props.language}/vinculacion/${props.url}` : `/${props.language}/${props.url}`) : (props.url)}>{props.nombre.trim()}</a></li>
        case 4:
            return <li><a className={`item-side-menu ${(!regEx.test(props.url) ? (props.url !== 'ubu' ? `${apiUrl}/${props.language}/ubu/${props.url}` : `${apiUrl}/${props.language}/${props.url}`) : (props.url)) === props.paramadc ? 'item-side-menu-active' : ''}`} href={!regEx.test(props.url) ? (props.url !== 'ubu' ? `/${props.language}/ubu/${props.url}` : `/${props.language}/${props.url}`) : (props.url)}>{props.nombre.trim()}</a></li>
        case 5:
            return <li><a className={`item-side-menu ${(!regEx.test(props.url) ? (props.url !== 'comunicacion' ? `${apiUrl}/${props.language}/comunicacion/${props.url}` : `${apiUrl}/${props.language}/${props.url}`) : (props.url)) === props.paramadc ? 'item-side-menu-active' : ''}`} href={!regEx.test(props.url) ? (props.url !== 'comunicacion' ? `/${props.language}/comunicacion/${props.url}` : `/${props.language}/${props.url}`) : (props.url)}>{props.nombre.trim()}</a></li>
        case 6:
            return <li><a href={`/${props.language}/grado/facultad/${props.url}`} className={`item-side-menu ${props.url === props.paramadc ? 'item-side-menu-active' : ''}`} style={{ textAlign: "justify" }}>{props.nombre.trim()}</a></li>
        case 7:
            return <li><a href={`/${props.language}/grado/carrera/${props.url}`} className={`item-side-menu ${props.url === props.paramadc ? 'item-side-menu-active' : ''}`} style={{ textAlign: "justify" }}>{props.nombre.trim()}</a></li>
        case 8:
            return <li><a href={`/${props.language}/posgrado/${props.url}`} className={`item-side-menu ${props.url === props.paramadc ? 'item-side-menu-active' : ''}`} style={{ textAlign: "justify" }}>{props.nombre.trim()}</a></li>
        case 9:
            return <li><a href={!regEx.test(props.url3) ? (props.mnCodigo !== 29 ? `/${props.language}/${props.url3}` : `/${props.language}/ubu/${props.url}/${props.url3}`) : (props.url3)}
                className={`item-side-menu ${(!regEx.test(props.url3) ? (props.mnCodigo !== 29 ? `${apiUrl}/${props.language}/${props.url3}` : `${apiUrl}/${props.language}/ubu/${props.url}/${props.url3}`) : (props.url3)) === props.paramadc ? 'item-side-menu-active' : ''}`}>{props.nombre.trim()}</a></li>
        case 10:
            return <li><a href={!regEx.test(props.url4) ? (props.mnCodigo !== 29 ? `/${props.language}/${props.url4}` : `/${props.language}/ubu/${props.url}/${props.url3}/${props.url4}`) : (props.url4)}
                className={`item-side-menu ${(!regEx.test(props.url4) ? (props.mnCodigo !== 29 ? `${apiUrl}/${props.language}/${props.url4}` : `${apiUrl}/${props.language}/ubu/${props.url}/${props.url3}/${props.url4}`) : (props.url4)) === props.paramadc ? 'item-side-menu-active' : ''}`}>{props.nombre.trim()}</a></li>
        case 11:
            return <a href={!regEx.test(props.url5) ? (props.mnCodigo !== 29 ? `/${props.language}/${props.url5}` : `/${props.language}/ubu/${props.url}/${props.url3}/${props.url4}/${props.url5}`) : ("/" + props.language + "/" + props.url5)}
                className={`item-side-menu ${(!regEx.test(props.url5) ? (props.mnCodigo !== 29 ? `${apiUrl}/${props.language}/${props.url5}` : `${apiUrl}/${props.language}/ubu/${props.url}/${props.url3}/${props.url4}/${props.url5}`) : ("/" + props.language + "/" + props.url5)) === props.paramadc ? 'item-side-menu-active' : ''}`}>{props.nombre.trim()}</a>
    }

}

function ItemVideoInv(props) {
    return (<>
        <a target="_blank" className="mb-2" data-toggle="tooltip" data-placement="bottom" title={`Ver video de ${props.titulo.trim()}`} href={props.urlvideo1.trim()}>
            <div className="ratio ratio-16x9">
                <img alt={`${props.titulo.trim().substring(0, 14)} - ${props.numero}`} src={`${UTQINV_IMGS_FOLDER}${props.portadaVideo.trim()}`} />
            </div>
        </a>
    </>)
}

function SideMenu(data) {

    const dataNwsp = data.data6;
    const dataVid = data.data5;
    const dataSM = data.sidemenu;
    const regEx = /^http/;
    const router = useRouter();

    const listItemsVideosInv = (dataItems) => {
        return (
            dataItems.map((item, index) => {
                return (<ItemVideoInv key={uuidv4()} titulo={item.titulo} urlvideo1={item.urlvideo1} portadaVideo={item.portadaVideo} numero={index} />);
            })
        )
    }

    const listItemsFaculties = (dataItems, paramadc) => {
        return (<>{
            (dataItems !== null && dataItems !== "") && dataItems.sort((a, b) => (a.dpNombre > b.dpNombre) ? 1 : -1).map(
                (item) => {
                    return <ItemMenu key={uuidv4()} tipo={6} url={item.dpParcialUrl.trim()} mnCodigo={0} url2="" paramadc={paramadc} nombre={router.locale === "es" ? item.dpNombre.trim() : (router.locale === "en" ? item.dpNombreEn.trim() : item.dpNombrePt.trim())} language={router.locale} />
                }
            )
        }</>)
    }

    const listItemsCareers = (dataItems, paramadc) => {
        return (<>{
            (dataItems !== null && dataItems !== "") && dataItems.sort((a, b) => (a.crNombre > b.crNombre) ? 1 : -1).map(
                (item) => {
                    return <ItemMenu key={uuidv4()} tipo={7} url={item.crUrlParcial.trim()} mnCodigo={0} url2="" paramadc={paramadc} nombre={router.locale === "es" ? item.crNombre.trim() : (router.locale === "en" ? item.crNombreEn.trim() : item.crNombrePt.trim())} language={router.locale} />
                }
            )
        }</>)
    }

    const listItemsMasters = (dataItems, paramadc) => {
        return (<>{
            (dataItems !== null && dataItems !== "") && dataItems.sort((a, b) => (a.crNombre > b.crNombre) ? 1 : -1).map(
                (item) => {
                    return <ItemMenu key={uuidv4()} tipo={8} url={item.crUrlParcial.trim()} mnCodigo={0} url2="" paramadc={paramadc} nombre={router.locale === "es" ? item.crNombre.trim() :
                        (router.locale === "en" ? item.crNombreEn : item.crNombrePt)} language={router.locale} />
                }
            )
        }</>)
    }

    const listItemsFourthLevel = (dataItems, codigoN3, urlN1, urlN2, urlN3) => {
        return (<>{
            dataItems.mnListadoSubmenus.filter(itemsm => itemsm.smCodPadre === codigoN3).sort((a, b) => (a.smOrden > b.smOrden) ? 1 : -1).map(
                (nivel4) => {
                    return <ItemMenu key={uuidv4()} tipo={11} url={urlN1} mnCodigo={dataItems.mnCodigo} url2="" url3={urlN2} url4={urlN3} url5={nivel4.smUrlAsoc} paramadc={data.urlpageweb} nombre={router.locale === "es" ? nivel4.smNombre.trim() : (router.locale === "en" ? nivel4.smNombreEn.trim() : nivel4.smNombrePt.trim())} language={router.locale} />
                }
            )
        }</>)
    }

    const listItemsThirdLevel = (dataItems, codigoN2, urlN1, urlN2) => {
        return (<>{
            dataItems.mnListadoSubmenus.filter(itemsm => itemsm.smCodPadre === codigoN2).sort((a, b) => (a.smOrden > b.smOrden) ? 1 : -1).map(
                (nivel3) => {
                    if (dataItems.mnListadoSubmenus.filter(itemsm => itemsm.smCodPadre === nivel3.smCodigo).length > 0) {
                        return (<li key={uuidv4()}><a href={!regEx.test(nivel3.smUrlAsoc) ? (dataItems.mnCodigo !== 29 ? `/${router.locale}/${nivel3.smUrlAsoc}` : `/${router.locale}/ubu/${urlN1}/${urlN2}/${nivel3.smUrlAsoc}`) : (nivel3.smUrlAsoc)}
                            className={`item-side-menu ${(!regEx.test(nivel3.smUrlAsoc) ? (dataItems.mnCodigo !== 29 ? `/${router.locale}/${nivel3.smUrlAsoc}` : `/${router.locale}/ubu/${urlN1}/${urlN2}/${nivel3.smUrlAsoc}`) : (nivel3.smUrlAsoc)) === data.urlpageweb ? 'item-side-menu-active' : ''}`}>{router.locale === "es" ? nivel3.smNombre.trim() : (router.locale === "en" ? nivel3.smNombreEn.trim() : nivel3.smNombrePt.trim())}</a>
                            <ul className="list-side-menu">
                                {listItemsFourthLevel(dataItems, nivel3.smCodigo, urlN1, urlN2, nivel3.smUrlAsoc)}
                            </ul>
                        </li>)
                    } else {
                        return <ItemMenu key={uuidv4()} tipo={10} url={urlN1} mnCodigo={dataItems.mnCodigo} url2="" url3={urlN2} url4={nivel3.smUrlAsoc} paramadc={data.urlpageweb} nombre={router.locale === "es" ? nivel3.smNombre.trim() : (router.locale === "en" ? nivel3.smNombreEn.trim() : nivel3.smNombrePt.trim())} language={router.locale} />
                    }
                })
        }</>)
    }

    const listItemsSecondLevel = (dataItems, codigoN1, urlN1) => {
        return (<>{
            dataItems.mnListadoSubmenus.filter(itemsm => itemsm.smCodPadre === codigoN1).sort((a, b) => (a.smOrden > b.smOrden) ? 1 : -1).map(
                (nivel2) => {
                    if (dataItems.mnListadoSubmenus.filter(itemsm => itemsm.smCodPadre === nivel2.smCodigo).length > 0) {
                        return (<li key={uuidv4()}><a href={!regEx.test(nivel2.smUrlAsoc) ? (dataItems.mnCodigo !== 29 ? `/${router.locale}/${nivel2.smUrlAsoc}` : `/${router.locale}/ubu/${urlN1}/#`) : (nivel2.smUrlAsoc)}
                            className={`item-side-menu ${(!regEx.test(nivel2.smUrlAsoc) ? (dataItems.mnCodigo !== 29 ? `/${router.locale}/${nivel2.smUrlAsoc}` : `/${router.locale}/ubu/${urlN1}/#`) : (nivel2.smUrlAsoc)) === data.urlpageweb ? 'item-side-menu-active' : ''}`}>{router.locale === "es" ? nivel2.smNombre.trim() : (router.locale === "en" ? nivel2.smNombreEn.trim() : nivel2.smNombrePt.trim())}</a>
                            <ul className="list-side-menu">
                                {listItemsThirdLevel(dataItems, nivel2.smCodigo, urlN1, nivel2.smUrlAsoc)}
                            </ul>
                        </li>)
                    } else {
                        return <ItemMenu key={uuidv4()} tipo={9} url={urlN1} mnCodigo={dataItems.mnCodigo} url2="" 
                               url3={/*nivel2.smUrlAsoc*/!regEx.test(nivel2.smUrlAsoc) ? (/*router.locale + "/" +*/ nivel2.smUrlAsoc.trim()) :
                                (nivel2.smUrlAsoc.indexOf("revistas.uteq.edu.ec") ? (router.locale === "es" ? nivel2.smUrlAsoc.trim() : (router.locale === "en" ? nivel2.smUrlAsocEn.trim() : nivel2.smUrlAsocPt.trim())) :
                                    nivel2.smUrlAsoctrim())} 
                               paramadc={data.urlpageweb} nombre={router.locale === "es" ? nivel2.smNombre.trim() : (router.locale === "en" ? nivel2.smNombreEn.trim() : nivel2.smNombrePt.trim())} language={router.locale} />
                    }
                })
        }</>)
    }

    const functionItemWithOptions = (url, urlpageweb, smNombre, faculties, paramadc) => {
        return (<li key={uuidv4()}><a href={!regEx.test(url) ? ((url !== "" && url !== "#") ? `/${router.locale}/${url}` : url) : url}
            className={`item-side-menu ${(!regEx.test(url) ? (`/${router.locale}/${url}`) : url) === urlpageweb ? 'item-side-menu-active' : ''}`}>{smNombre.trim()}</a>
            <ul className="list-side-menu">
                {listItemsFaculties(faculties, paramadc)}
            </ul>
        </li>)
    }

    const functionItemCareersWithOptions = (url, urlpageweb, smNombre, careers, paramadc) => {
        return (<li key={uuidv4()}><a href={!regEx.test(url) ? ((url !== "" && url !== "#") ? `/${router.locale}/${url}` : url) : url}
            className={`item-side-menu ${(!regEx.test(url) ? (`/${router.locale}/${url}`) : url) === urlpageweb ? 'item-side-menu-active' : ''}`}>{smNombre.trim()}</a>
            <ul className="list-side-menu">
                {listItemsCareers(careers, paramadc)}
            </ul>
        </li>)
    }

    const functionItemMasterWithOptions = (url, urlpageweb, smNombre, masters, paramadc) => {
        return (<li key={uuidv4()}><a href={!regEx.test(url) ? ((url !== "" && url !== "#") ? `/${router.locale}/${url}` : url) : url}
            className={`item-side-menu ${(!regEx.test(url) ? (`/${router.locale}/${url}`) : url) === urlpageweb ? 'item-side-menu-active' : ''}`}>{smNombre.trim()}</a>
            <ul className="list-side-menu">
                {listItemsMasters(masters, paramadc)}
            </ul>
        </li>)
    }

    const functionItemUbuWithOptions = (url, codigo, urlpageweb, nombre, dataItems) => {
        return (<li key={uuidv4()}><a href={!regEx.test(url) ? (codigo !== 29 ? ((url !== "" && url !== "#") ? `/${router.locale}/${url}` : url) : (url !== 'ubu' ? `/${router.locale}/ubu/${url}` : ((url !== "" && url !== "#") ? `/${router.locale}/${url}` : url))) : (url)}
            className={`item-side-menu ${(!regEx.test(url) ? (codigo !== 29 ? `${apiUrl}/${router.locale}/${url}` : (url !== 'ubu' ? `${apiUrl}/${router.locale}/ubu/${url}` : `${apiUrl}/${router.locale}/${url}`)) : (url)) === urlpageweb ? 'item-side-menu-active' : ''}`}>{nombre.trim()}</a>
            <ul className="list-side-menu">
                {listItemsSecondLevel(dataItems, codigo, url)}
            </ul>
        </li>)
    }

    const listItemsFirstLevel = (dataItems) => {
        return (<>{
            dataItems.mnListadoSubmenus.filter(itemsm => itemsm.smCodPadre === -1).sort((a, b) => (a.smOrden > b.smOrden) ? 1 : -1).map(
                (nivel1) => {
                    if (dataItems.mnListadoSubmenus.filter(itemsm => itemsm.smCodPadre === nivel1.smCodigo).length > 0) {
                        return (<li key={uuidv4()}><a href={!regEx.test(nivel1.smUrlAsoc) ? (dataItems.mnCodigo !== 29 ? ((nivel1.smUrlAsoc !== "" && nivel1.smUrlAsoc !== "#") ? `/${router.locale}/${nivel1.smUrlAsoc}` : nivel1.smUrlAsoc) : (nivel1.smUrlAsoc !== 'ubu' ? `/${router.locale}/ubu/${nivel1.smUrlAsoc}` : ((nivel1.smUrlAsoc !== "" && nivel1.smUrlAsoc !== "#") ? `/${router.locale}/${nivel1.smUrlAsoc}` : nivel1.smUrlAsoc))) : (nivel1.smUrlAsoc)}
                            className={`item-side-menu ${(!regEx.test(nivel1.smUrlAsoc) ? (dataItems.mnCodigo !== 29 ? `${apiUrl}/${router.locale}/${nivel1.smUrlAsoc}` : (nivel1.smUrlAsoc !== 'ubu' ? `${apiUrl}/${router.locale}/ubu/${nivel1.smUrlAsoc}` : `${apiUrl}/${router.locale}/${nivel1.smUrlAsoc}`)) : (nivel1.smUrlAsoc)) === data.urlpageweb ? 'item-side-menu-active' : ''}`}>{router.locale === "es" ? nivel1.smNombre.trim() : (router.locale === "en" ? nivel1.smNombreEn.trim() : nivel1.smNombrePt.trim())}</a>
                            <ul className="list-side-menu">
                                {listItemsSecondLevel(dataItems, nivel1.smCodigo, nivel1.smUrlAsoc)}
                            </ul>
                        </li>)
                    } else {
                        if (dataItems.mnCodigo === 25 && nivel1.smCodigo === 96) {
                            return functionItemMasterWithOptions(nivel1.smUrlAsoc, data.urlpageweb, (router.locale === "es" ? nivel1.smNombre : (router.locale === "en" ? nivel1.smNombreEn : nivel1.smNombrePt)), data.mscdegs, data.paramadc);
                        } else if (dataItems.mnCodigo === 32 && nivel1.smCodigo === 150) {
                            return functionItemCareersWithOptions(nivel1.smUrlAsoc, data.urlpageweb, (router.locale === "es" ? nivel1.smNombre : (router.locale === "en" ? nivel1.smNombreEn : nivel1.smNombrePt)), data.careers, data.paramadc);
                        } else if (dataItems.mnCodigo === 33 && nivel1.smCodigo === 152) {
                            return functionItemWithOptions(nivel1.smUrlAsoc, data.urlpageweb, (router.locale === "es" ? nivel1.smNombre : (router.locale === "en" ? nivel1.smNombreEn : nivel1.smNombrePt)), data.faculties, data.paramadc);
                        } else if (dataItems.mnCodigo === 28) {
                            return <ItemMenu key={uuidv4()} tipo={5} url={nivel1.smUrlAsoc.trim()} mnCodigo={0} url2="" paramadc={data.urlpageweb} nombre={router.locale === "es" ? nivel1.smNombre.trim() : (router.locale === "en" ? nivel1.smNombreEn.trim() : nivel1.smNombrePt.trim())} language={router.locale} />
                        } else if (dataItems.mnCodigo === 29) {
                            return <ItemMenu key={uuidv4()} tipo={4} url={nivel1.smUrlAsoc.trim()} mnCodigo={0} url2="" paramadc={data.urlpageweb} nombre={router.locale === "es" ? nivel1.smNombre.trim() : (router.locale === "en" ? nivel1.smNombreEn.trim() : nivel1.smNombrePt.trim())} language={router.locale} />
                        } else if (dataItems.mnCodigo === 30) {
                            return <ItemMenu key={uuidv4()} tipo={3} url={nivel1.smUrlAsoc.trim()} mnCodigo={0} url2="" paramadc={data.urlpageweb} nombre={router.locale === "es" ? nivel1.smNombre.trim() : (router.locale === "en" ? nivel1.smNombreEn.trim() : nivel1.smNombrePt.trim())} language={router.locale} />
                        } else if (dataItems.mnCodigo === 31) {
                            return <ItemMenu key={uuidv4()} tipo={2} url={nivel1.smUrlAsoc.trim()} mnCodigo={0} url2="" paramadc={data.urlpageweb} nombre={router.locale === "es" ? nivel1.smNombre.trim() : (router.locale === "en" ? nivel1.smNombreEn.trim() : nivel1.smNombrePt.trim())} language={router.locale} />
                        } else {
                            return <ItemMenu key={uuidv4()} tipo={1} url={nivel1.smUrlAsoc.trim()} mnCodigo={nivel1.smCodigo} url2={data.urlparcial} urlfac={data.paramurlf} paramadc={data.urlpageweb} nombre={router.locale === "es" ? nivel1.smNombre.trim() : (router.locale === "en" ? nivel1.smNombreEn.trim() : nivel1.smNombrePt.trim())} language={router.locale} />
                        }
                    }
                })
        }</>)
    }

    const renderElementsMenu = (elMenu) => {
        return (<>
            <div className="row" key="1">
                <h3 className="title-mn-latr text-center">{router.locale === "es" ? elMenu[0].mnNombre.trim() : (router.locale === "en" ? elMenu[0].mnNombreEn.trim() : elMenu[0].mnNombrePt.trim())}</h3>
            </div>
            <div className="row content-menu-side px-3" key="2">
                <ul className="list-side-menu" key="12">
                    {listItemsFirstLevel(elMenu[0])}
                </ul>
            </div><br />
        </>);
    }

    function ElementVideo(props) {
        if (props.value.dpListadoVideos.length > 0) {
            return (<><div className="row g-0 mb-3"><h3 className="title-mn-secund">{router.locale === "es" ? props.value.dmDescripcion.trim() : (router.locale === "en" ? props.value.dmDescripcionEn.trim() : props.value.dmDescripcionPt.trim())}</h3>
            {/*<iframe className="vid-ytb-shorts mx-auto"
                    src={`${props.value.dpListadoVideos[0].urlvideo2.trim()}?autoplay=1&mute=1&showinfo=0&enablejsapi=1&loop=1`}
                    frameBorder='0'
                    allow='accelerometer; autoplay; encrypted-media; gyroscope'
                    title={"Noticias de la última semana - UTEQ"} /><br />*/}
            	<iframe
  className="vid-ytb-shorts mx-auto"
  src={`${props.value.dpListadoVideos[0].urlvideo2.trim()}?autoplay=1&mute=1&showinfo=0&enablejsapi=1&loop=1`}
  frameBorder="0"
  referrerPolicy="strict-origin-when-cross-origin"
  allow="accelerometer; autoplay; encrypted-media; gyroscope"
  title="Noticias de la última semana - UTEQ"
/>
            </div>
                <div className="row g-0 mb-3">
                    <h3 className="title-mn-secund">{router.locale === "es" ? "Suscripción a canal de" : (router.locale === "en" ? "Subscription to the" : "Assinatura do")}</h3>
                    <center><div className="g-ytsubscribe mt-2" data-channel="UTEQCHANNEL" data-layout="default" data-count="hidden"></div></center>
                </div></>);
        }
    }

    return (<>
        {((data.option >= 1 && data.option <= 77) && data.option !== 45 && data.option !== 71) && (dataSM !== null && dataSM !== "") && renderElementsMenu(dataSM)}
        {
            data.option === 69 && (
                data.faculty.dpImgLogo !== null && data.faculty.dpImgLogo !== "" && (<>
                    <div className="ratio ratio-4x3 mb-2">
                        <img src={LOGOS_BG_FOLDER + data.faculty.dpImgLogo.trim()} className="img-fluid" alt={`Logo de la ${data.faculty.dpNombre.trim()}`} />
                    </div>
                </>)
            )
        }
        {
            data.option === 70 && (
                (data.career.crUrlPortada !== null && data.career.crUrlPortada !== "") ? (<>
                    <div className="ratio ratio-4x3 mb-2">
                        <img src={LOGOS_BG_FOLDER + data.career.crUrlPortada.trim()} className="img-fluid" alt={`Logo de la carrera ${data.career.crNombre.trim()}`} />
                    </div>
                </>) : (
                    (data.career.crDepartamento.dpImgLogo !== null && data.career.crDepartamento.dpImgLogo !== "") && (<>
                        <div className="ratio ratio-4x3 mb-2">
                            <img src={LOGOS_BG_FOLDER + data.career.crDepartamento.dpImgLogo.trim()} className="img-fluid" alt={`Logo de la ${data.career.crDepartamento.dpNombre.trim()}`} />
                        </div>
                    </>)
                )
            )
        }
        {
            (data.option === 1) ? (<>
                <div className="col-md-12 w-100">
                    <h3 className="title-mn-latr text-center">{router.locale === "es" ? "Comunícate con nosotros" : (router.locale === "en" ? "Call us" : "Ligue-nos para")}</h3>
                </div>
                <div className="col-md-12 w-100 text-center p-2 title-mn-third mb-2"><i className="fa fa-phone" aria-hidden="true"></i>  (+593) 5 3702-220 Ext. 8001</div>
            </>) : (<></>)
        }
        {
            (data.option !== 23 && data.option !== 45 && data.option !== 47 && data.option !== 48 && data.option !== 49 && data.option !== 52 && data.option !== 55 && data.option !== 56 && data.option !== 57 && data.option !== 58 && data.option !== 59 && data.option !== 60 && data.option !== 62 && data.option !== 63 && data.option !== 64 && data.option !== 65 && data.option !== 66 && data.option !== 67 && data.option !== 72) && dataNwsp.length > 0 && (
                <><div className="col-md-12 w-100 text-center p-2 title-mn-third">{router.locale === "es" ? "Periódico Universitario" : (router.locale === "en" ? "University Newspaper" : "Jornal da Universidade")}</div>
                    <div className="col-md-12 w-100"><a target="_blank" data-toggle="tooltip" data-placement="bottom"
                        title={`${router.locale === "es" ? "Periódico universitario edición" : (router.locale === "en" ? "University newspaper" : "Jornal universitário edição de")} ${letterMonth[dataNwsp[0].mes - 1]} ${dataNwsp[0].anio}`} href={dataNwsp[0].urlpw}>
                        <img src={`${NEWSPAPERS_FOLDER}${dataNwsp[0].urlportada}`} className="d-block w-100 img-newsp-sm" alt={`${router.locale === "es" ? "Periódico universitario edición" : (router.locale === "en" ? "University newspaper" : "Jornal universitário edição de")} ${letterMonth[dataNwsp[0].mes - 1]} ${dataNwsp[0].anio}`} />
                    </a></div><br /></>
            )
        }
        {
            (data.option !== 23 && data.option !== 45 && data.option !== 47 && data.option !== 48 && data.option !== 49 && data.option !== 52 && data.option !== 55 && data.option !== 56 && data.option !== 57 && data.option !== 58 && data.option !== 59 && data.option !== 60 && data.option !== 62 && data.option !== 63 && data.option !== 64 && data.option !== 65 && data.option !== 66 && data.option !== 67 && data.option !== 72) && dataNwsp.length > 0 && (
                <><div className="col-md-12 w-100 text-center p-2 title-mn-third">{router.locale === "es" ? "Redes sociales" : (router.locale === "en" ? "Social media" : "Meios de comunicação social")}</div>
                    <div className="col-md-12 w-100 mt-3">
                        <ul id="link-social-items">
                            <li className="list-inline-item"><a href="https://www.facebook.com/uteq.ecuador/" target="_blank" data-toggle="tooltip" data-placement="bottom" title="Facebook" rel="noreferrer"><i className="fa fa-facebook-f fa-2x"></i></a></li>
                            <li className="list-inline-item"><a href="https://www.youtube.com/user/UTEQCHANNEL/videos" target="_blank" data-toggle="tooltip" data-placement="bottom" title="Youtube" rel="noreferrer"><i className="fa fa-youtube fa-2x"></i></a></li>
                            <li className="list-inline-item"><a href="https://twitter.com/utequevedo" target="_blank" data-toggle="tooltip" data-placement="bottom" title="X" rel="noreferrer"><i className="bi bi-twitter-x"></i></a></li>
                            <li className="list-inline-item"><a href="https://instagram.com/uteq.ec?utm_medium=copy_link" target="_blank" data-toggle="tooltip" data-placement="bottom" title="Instagram" rel="noreferrer"><i className="fa fa-instagram fa-2x"></i></a></li>
                            <li className="list-inline-item"><a href="https://ec.linkedin.com/school/universidad-t%C3%A9cnica-estatal-de-quevedo/" target="_blank" data-toggle="tooltip" data-placement="bottom" title="LinkedIn" rel="noreferrer"><i className="fa fa-linkedin fa-2x"></i></a></li>
                            <li className="list-inline-item"><a href="https://www.tiktok.com/@uteq.ec" target="_blank" data-toggle="tooltip" data-placement="bottom" title="TikTok" rel="noreferrer"><i className="bi bi-tiktok"></i></a></li>
                        </ul>
                    </div><br /></>
            )
        }
        {
            (data.option === 47 || data.option === 48 || data.option === 49 || data.option === 52 || data.option === 55 || data.option === 56 || data.option === 57 || data.option === 58 || data.option === 59 || data.option === 60 || data.option === 62 || data.option === 63 || data.option === 64 || data.option === 65 || data.option === 66 || data.option === 67 || data.option === 72) && (<>
                <div className="col-md-12 w-100">
                    <Link href="/investigacion/produccion-cientifica">
                        <a target="_blank" data-toggle="tooltip" data-placement="bottom" title={router.locale === "es" ? "Página web de Producción Científica de la UTEQ" : (router.locale === "en" ? "UTEQ Scientific Production Website" : "Website de Produção Científica da UTEQ")}>
                            <img src={`${INVESTG_IMGS_FOLDER}${router.locale === "es" ? "img-uteq-invs-prod-ctf.jpg" : (router.locale === "en" ? "img-uteq-invs-prod-ctf-en.jpg" : "img-uteq-invs-prod-ctf-pt.jpg")}`} className="d-block w-100" alt={router.locale === "es" ? "Producción Científica" : (router.locale === "en" ? "Scientific Production" : "Produção Científica")} />
                        </a>
                    </Link>
                </div><br />
            </>)
        }
        {
            (data.option !== 23 && data.option !== 45 && data.option !== 47 && data.option !== 48 && data.option !== 49 && data.option !== 52 && data.option !== 55 && data.option !== 56 && data.option !== 57 && data.option !== 58 && data.option !== 59 && data.option !== 60 && data.option !== 62 && data.option !== 63 && data.option !== 64 && data.option !== 65 && data.option !== 66 && data.option !== 67 && data.option !== 72) && dataVid.length > 0 && (
                dataVid.map(
                    (item) => <ElementVideo key={uuidv4()} value={item} />
                ))
        }
        {
            (data.option === 47 || data.option === 48 || data.option === 49 || data.option === 52 || data.option === 55 || data.option === 56 || data.option === 57 || data.option === 58 || data.option === 59 || data.option === 60 || data.option === 62 || data.option === 63 || data.option === 64 || data.option === 65 || data.option === 66 || data.option === 67 || data.option === 72) && dataVid.length > 0 && (
                <div className="row g-0 mb-3"><h3 className="title-mn-secund">{router.locale === "es" ? "UTEQ Investiga" : (router.locale === "en" ? "UTEQ Research" : "Investigação UTEQ")}</h3>
                    {listItemsVideosInv(dataVid)}
                </div>
            )
        }

    </>);
}