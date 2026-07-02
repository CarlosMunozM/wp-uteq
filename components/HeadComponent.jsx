import Head from 'next/head';
import { NEXT_PUBLIC_RECAPTCHA_SITE_KEY, CREDENTIAL_GA, apiUrl } from 'config';

export { HeadComponent };

function HeadComponent(props) {
    return (<><Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-WVWWZZ7544"></script>
        <script async src="/assets/js/ga.js"></script>
        <title>{props.title}</title>
        <meta name="description" content={props.desc} />
        <link rel="alternate" href={props.url_page.replace(('/'+props.language),'/es')} hrefLang="es" />
        <link rel="alternate" href={props.url_page.replace(('/'+props.language),'/en')} hrefLang="en" />
        <link rel="alternate" href={props.url_page.replace(('/'+props.language),'/pt')} hrefLang="pt" />
    	{/*<link rel="canonical" href={props.url_page} />*/}
    	{props.language === 'es' && <link rel="canonical" href={props.url_page} />}
        {props.language === 'en' && <link rel="canonical" href={props.url_page.replace(('/'+props.language),'/es')} />}
        {props.language === 'pt' && <link rel="canonical" href={props.url_page.replace(('/'+props.language),'/es')} />}
        
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta httpEquiv="Content-Security-Policy" content="script-src 'self' www.googletagmanager.com connect.facebook.net platform.twitter.com https://www.google.com www.gstatic.com www.youtube.com https://maps.googleapis.com https://apis.google.com; object-src 'self'; style-src 'self' cdn.jsdelivr.net https://fonts.googleapis.com 'unsafe-inline'; font-src 'self' cdn.jsdelivr.net https://fonts.gstatic.com;" />

        <link rel="shortcut icon" href="/assets/img/icons/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="universidad técnica estatal de quevedo, universidad estatal, universidades de quevedo, universidad estatal de quevedo, universidad técnica, agropecuaria, carreras uteq, uteq, quevedo, ecuador, sga" />
        <meta name="author" content="Universidad Técnica Estatal de Quevedo" />

        {/*Open Graph / Facebook*/}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={props.url_page} />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.desc} />
        <meta property="og:image" content={`https://www.uteq.edu.ec${props.image}`} />
        <meta property="og:site_name" content="uteq.edu.ec" />

        {/*Twitter*/}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={props.url_page} />
        <meta property="twitter:title" content={props.title} />
        <meta property="twitter:description" content={props.desc} />
        <meta property="twitter:image" content={`https://www.uteq.edu.ec${props.image}`}></meta>

        {/*Preload, preconnect, dns-prefetch*/}
        <link rel="preload" href="/assets/css/styles.css" as="style" />
        <link rel="preload" href="/assets/css/font-awesome.min.css" as="style" />
        <link rel="preload" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" as="style" />
    	<link rel="preconnect" href="https://www.google.com"/>
        <link rel="dns-prefetch" href="https://yt3.ggpht.com"/>
        <link rel="dns-prefetch" href="https://i.ytimg.com"/>
        <link rel="dns-prefetch" href="https://www.google.com"/>
        <link rel="preconnect" href="https://cdn.jsdelivr.net"/>
        <link rel="preconnect" href="https://jnn-pa.googleapis.com"/>
        <link rel="preconnect" href="https://www.google.com"/>
    
    	{/*Styles*/}
    	<link rel="stylesheet" href="/assets/css/styles.css" />
        <link rel="stylesheet" href="/assets/css/font-awesome.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"/>
    
        {/*JS*/}
        {(props.vald_form === 1 || props.vald_form === 15 || props.vald_form === 11 || props.vald_form === 18 || props.vald_form === 36 || props.vald_form === 22 || props.vald_form === 42 || props.vald_form === 45 || props.vald_form === 62 || props.vald_form === 63 || props.vald_form === 69 || props.vald_form === 71 || props.vald_form === 78) && <script src={`https://www.google.com/recaptcha/api.js?render=${NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`} />}
        {props.vald_form == 22 && <script type="text/javascript" async src="https://platform.twitter.com/widgets.js"></script>}
        <script async src="/assets/js/utils.js"></script>
        <script src="https://apis.google.com/js/platform.js"></script>

        {/*<!-- Google tag -->*/}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${CREDENTIAL_GA}`}></script>
        <script async src="/assets/js/ga.js"></script>
    </Head></>);
};