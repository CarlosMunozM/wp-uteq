const apiUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://www.uteq.edu.ec';

/*const apiUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://www.webapp.uteq.edu.ec';*/

/*const wsUrl = 'https://10.1.1.52:8443/uteq-backend';*/

/* PRODUCCIÓN */
/*
const wsUrl = 'https://apiws.uteq.edu.ec/uteq-backend';
const wsUrlCidu = 'https://apiws.uteq.edu.ec/uteq-cidu';
const wsUrlCoopInt = 'https://apiws.uteq.edu.ec/uteq-coop'; */

/* PRUEBAS */

const wsUrl = 'http://localhost:8086/uteq-backend';
const wsUrlCidu = 'http://localhost:8086/uteq-cidu';
const wsUrlCoopInt = 'http://localhost:8086/uteq-coop';

/*const wsUrl = 'https://test1be.uteq.edu.ec/uteq-backend';
const wsUrlCidu = 'https://test1be.uteq.edu.ec/uteq-cidu';
const wsUrlCoopInt = 'https://test1be.uteq.edu.ec/uteq-coop';*/

/*const wsUrl = 'http://172.16.79.158:8086';
const wsUrlCidu = 'http://172.16.79.158:8088';
const wsUrlCoopInt = 'http://172.16.79.158:8087';
const wsUrlChatBot = 'http://172.16.79.158:8091';*/

/*const wsUrl = 'http://172.16.79.200:8086';
const wsUrlCidu = 'http://172.16.79.200:8088';
const wsUrlCoopInt = 'http://172.16.79.200:8087';*/

/*const wsUrl = 'http://172.16.79.178:8086';
const wsUrlCidu = 'http://172.16.79.178:8088';
const wsUrlCoopInt = 'http://172.16.79.178:8087';*/

const WS_LIST_ITEMS_MENU = `${wsUrl}/ws/menus/menu/list-options/`;
const WS_LIST_ALL_ITEMS_MENU = `${wsUrl}/ws/menus/menu/list-all-options`;

const WS_LIST_ITEMS_MENU_LAT = `${wsUrl}/ws/menus/menu/list/`;
const WS_LIST_IMAGES_SLIDER = `${wsUrl}/ws/sliders/slider/list-images/`;
const WS_LIST_VIDEOS_WEEK = `${wsUrl}/ws/videos/list-videos-sd`;
const WS_LIST_VIDEOS_UNIV_BY_TYPE = `${wsUrl}/ws/videos/list/`;
const WS_LIST_NEWSPAPERS_MONTH = `${wsUrl}/ws/newspapers/list-newspapers/`;
const WS_LIST_NEWSPAPERS_ALL = `${wsUrl}/ws/newspapers/list-newspapers/all`;
const WS_LIST_DATA_GENERAL_NUM1 = `${wsUrl}/ws/datos/list-data/`;
const WS_INFORMATION_DEPARTAMENT = `${wsUrl}/ws/datos/info-dept/`;
const WS_INFORMATION_PAGE_WEB = `${wsUrl}/ws/datos/info-pw/`;
const WS_INFORMATION_WP_BY_URL = `${wsUrl}/ws/datos/infwebpage/`;
const WS_LIST_DATA_EVENTS = `${wsUrl}/ws/eventos/list-filt/`;
const WS_LIST_DATA_NEWS_BY_DEPT = `${wsUrl}/ws/noticias/list-dep/6/`;
const WS_LIST_DATA_NEWS_NOT_INCLUDE_ALL = `${wsUrl}/ws/noticias/list-nic/10`;
const WS_LIST_DATA_DEANS = `${wsUrl}/ws/authorities/list-deans`;
const WS_LIST_DATA_AUTHORITIES = `${wsUrl}/ws/authorities/list-org-inst/`;
const WS_LIST_ACTIVITIES_BY_CALENDAR = `${wsUrl}/ws/calendar/list-calendars/`;
const WS_LIST_FILES_UNIV_BY_TYPE = `${wsUrl}/ws/files/list/`;
const WS_LIST_SHORT_FILES_UNIV_BY_TYPE = `${wsUrl}/ws/files/short-list/`;
const WS_LIST_SHORT_FILES_FORMTS_UNIV_BY_TYPE = `${wsUrl}/ws/files/short-list-formats/`;
const WS_LIST_SHORT_FILES_IMAGES_UNIV_BY_TYPE = `${wsUrl}/ws/files/short-list-logos/`;
const WS_LIST_SHORT_FILES_DOCS_UNIV_BY_TYPE = `${wsUrl}/ws/files/short-list-fls/`;


const WS_SORT_LIST_FILES_UNIV_BY_TYPE = `${wsUrl}/ws/files/sort-list/`;
const WS_SORT_LIST_FILES_RC_UNIV_BY_TYPE = `${wsUrl}/ws/files/sort-rendctas-list/`;
const WS_SORT_LIST_FILES_TP_UNIV_BY_TYPE = `${wsUrl}/ws/files/sort-transp-list/`;
const WS_INFORMATION_AUTHORITY_BY_DEPARTMENT = `${wsUrl}/ws/authorities/dean/`;
const WS_INFORMATION_JOB_AUTH_BY_DEPARTAMENT = `${wsUrl}/ws/authorities/info-job/`;
const WS_INFORMATION_PERSON_BY_FACULTY = `${wsUrl}/ws/authorities/information-pers/`;
const WS_INFORMATION_PERSON_BY_CAREER = `${wsUrl}/ws/authorities/information/`;
const WS_LIST_DATA_MERIT_CONTESTS = `${wsUrl}/ws/datos/list-contests`;
const WS_LIST_DATA_COURSES_UTH = `${wsUrl}/ws/datos/list-courses-uth`;
const WS_LIST_CAREERS_UNIVERSITY_BY_DEPART = `${wsUrl}/ws/datos/list-careers/`;
const WS_LIST_URLS_CAREERS_UNIVERSITY_BY_DEPART = `${wsUrl}/ws/datos/urls-list-careers/`;
const WS_LIST_URLS_SM_CAREERS_UNIVERSITY_BY_DEPART = `${wsUrl}/ws/datos/urls-sm-list-careers/`;
const WS_LIST_SHORT_URLS_CAREERS_UNIVERSITY_BY_DEPART = `${wsUrl}/ws/datos/short-list-careers/`;
const WS_INFORMATION_CAREER_BY_PARCIAL_URL = `${wsUrl}/ws/datos/career/`;
const WS_INFO_AUTH_BY_CAREER = `${wsUrl}/ws/authorities/info-car/`;
const WS_LIST_EVENTS_ORGZ_UNIVERSITY = `${wsUrl}/ws/datos/event-orgz/list`;
const WS_INFORMATION_EVENT_BY_URL = `${wsUrl}/ws/datos/event-orgz/`;
const WS_LIST_CAREERS_MATC_UNIVERSITY_BY_DEPART = `${wsUrl}/ws/datos/list-careers-matc/`;
const WS_LIST_CAREERS_GRADE_UNIVERSITY_BY_FACULTY = `${wsUrl}/ws/datos/careers/`;
const WS_LIST_CAREERS_GRADE_BY_FACULTY = `${wsUrl}/ws/datos/grade/list-careers`;
const WS_LIST_CAREERS_UNIVS_UAN = `${wsUrl}/ws/datos/grade/list-careers-uan`;
const WS_LIST_IS_CAREERS_GRADE_BY_FACULTY = `${wsUrl}/ws/datos/grade/list-is-careers`;
const WS_LIST_CAREERS_BY_TEXT = `${wsUrl}/ws/datos/grade/careers-lst/`;
const WS_LIST_URLS_CAREERS_GRADE_BY_FACULTY = `${wsUrl}/ws/datos/grade/urls-list-careers`;
const WS_LIST_VIDEOS_BY_TYPE = `${wsUrl}/ws/videos/last-videos-sd/`;
const WS_LIST_DATA_ALL_EVENTS_BY_DEPARTAMENT = `${wsUrl}/ws/eventos/list/`;
const WS_LIST_DATA_ALL_EVENTS_BY_AREA = `${wsUrl}/ws/eventos/list-area/`;
const WS_LIST_DATA_ALL_IMGS_EVENTS_BY_AREA = `${wsUrl}/ws/eventos/imgs-evts/`;
const WS_LIST_DATA_MEDICAL_SERVICES = `${wsUrl}/ws/datos/medical-services`;
const WS_LIST_DATA_AUTHORITIES_AREA_UBU = `${wsUrl}/ws/authorities/list-area/`;
const WS_LIST_DATA_FACULTIES_UTEQ = `${wsUrl}/ws/datos/list-faculties`;
const WS_LIST_DATA_URLS_FACULTIES_UTEQ = `${wsUrl}/ws/datos/urls-list-faculties`;
const WS_LIST_V3_DATA_URLS_FACULTIES_UTEQ = `${wsUrl}/ws/datos/urls-list-faculties-v3`;
const WS_INFORMATION_FACULTY_BY_URL = `${wsUrl}/ws/datos/info-faculty/`;
const WS_LIST_SCHEDULES_UBU = `${wsUrl}/ws/datos/list-hors/`;
const WS_LIST_CAREERS_BY_CODE_FACULTY = `${wsUrl}/ws/data-cr/careers/`;
const WS_LIST_POST_SOCIAL_NET_UNIVERSITY = `${wsUrl}/ws/datos/post-sn/`;
const WS_LIST_ALL_NEWS_OF_UNIVERSITY = `${wsUrl}/ws/noticias/all-news-univs`;
const WS_LIST_ALL_URLS_NEWS = `${wsUrl}/ws/noticias/all-urls-news-univs`;
const WS_LIST_ALL_INFO_NEWS = `${wsUrl}/ws/noticias/all-info-news-univs`;
const WS_LIST_ALL_SM_NEWS = `${wsUrl}/ws/noticias/all-sm-urls-news-univs`;
const WS_INFORMATION_NEWS_BY_URL = `${wsUrl}/ws/noticias/info/`;
const WS_LIST_SIX_NEWS_OF_UNIVERSITY = `${wsUrl}/ws/noticias/list-six-news/`;
const WS_LIST_ACTIVE_DEPARTAMENTS = `${wsUrl}/ws/datos/list-active-departms`;
const WS_LIST_ACTIVE_CATEGORIES = `${wsUrl}/ws/datos/list-active-categories`;
const WS_LIST_FILTER_NEWS_BY_PARAMETERS = `${wsUrl}/ws/noticias/list-flt/`;
const WS_LIST_FILTER_NEWS_DEP_BY_PARAMETERS = `${wsUrl}/ws/noticias/list-dep-flt/`;
const WS_LIST_WEB_PAGES_BY_ENTITY = `${wsUrl}/ws/datos/paginas/`;
const WS_LIST_URLS_WEB_PAGES_BY_ENTITY = `${wsUrl}/ws/datos/urls-paginas/`;
const WS_LIST_URLS_WEB_PAGES_SM_BY_ENTITY = `${wsUrl}/ws/datos/urls-sm-paginas/`;

const WS_LIST_ELEMENTS_OF_MODAL = `${wsUrl}/ws/datos/modal/`;
const WS_LIST_METRICS_UNIVS_BY_AREA = `${wsUrl}/ws/datos/metrics/`;
const WS_LIST_PROJECTS_LKG = `${wsUrl}/ws/datos/list-proj-lkg`;
const WS_LIST_SM_PROJECTS_LKG = `${wsUrl}/ws/datos/list-sm-proj-lkg`;
const WS_LIST_URLS_PROJECTS_LKG = `${wsUrl}/ws/datos/list-urls-proj-lkg`;
const WS_LIST_TESTIMONIALS = `${wsUrl}/ws/datos/testimonials`;
const WS_LIST_INFO_LABORATORIES = `${wsUrl}/ws/datos/info-labs`;
const WS_LIST_GALLERY_LABORATORIES = `${wsUrl}/ws/datos/info-gallery-labs`;

const WS_INFORMATION_PROJECT_LKG = `${wsUrl}/ws/datos/project-lkg/`;
const WS_IMAGES_OF_PROJECT_LKG = `${wsUrl}/ws/datos/project/images/`;
const WS_IMAGES_OF_PROJECT_RES = `${wsUrl}/ws/datos/research-project/images/`;
const WS_LIST_RESEARCH_LINES_UNIV = `${wsUrl}/ws/datos/research-lines`;
const WS_LIST_RESEARCH_GROUP_BY_FACULTY = `${wsUrl}/ws/datos/research-groups`;
const WS_LIST_SM_RESEARCH_GROUP_BY_FACULTY = `${wsUrl}/ws/datos/research-groups-sm`;
const WS_LIST_URLS_RESEARCH_GROUP_BY_FACULTY = `${wsUrl}/ws/datos/urls-research-groups`;
const WS_INFORMATION_OF_GROUP_BY_CODE = `${wsUrl}/ws/datos/members-groups/`;
const WS_LIST_RESEARCH_PROJECTS = `${wsUrl}/ws/datos/list-proj-resr`;

const WS_LIST_SM_RESEARCH_PROJECTS = `${wsUrl}/ws/datos/list-sm-proj-resr`;

const WS_LIST_URL_RESEARCH_PROJECTS = `${wsUrl}/ws/datos/list-urls-proj-resr`;
const WS_INFORMATION_RES_PROJECT = `${wsUrl}/ws/datos/research-project/`;
const WS_INFORMATION_PAGE_WEB_BY_URL = `${wsUrl}/ws/datos/info-pw-url/`;
const WS_LIST_PAGES_BY_ENTITY = `${wsUrl}/ws/datos/webpages/`;
const WS_LIST_URL_PAGES_BY_ENTITY = `${wsUrl}/ws/datos/urlswebpages/`;
const WS_LIST_IMAGES_SLIDER_BY_ENTITY = `${wsUrl}/ws/sliders/slider/images/`;
const WS_LIST_INFORMATION_AUT_BY_PARAM = `${wsUrl}/ws/authorities/search/`;

const WS_LIST_FILTER_DATA_MENU = `${wsUrl}/ws/datos/flt-menu/`;
const WS_LIST_FILTER_DATA_SUBMENU = `${wsUrl}/ws/datos/flt-submenu/`;
const WS_LIST_FILTER_DATA_NEWS = `${wsUrl}/ws/datos/flt-news/`;
const WS_LIST_FILTER_DATA_VIDEO = `${wsUrl}/ws/datos/flt-video/`;
const WS_LIST_FILTER_DATA_NEWSPAPER = `${wsUrl}/ws/datos/flt-newspaper`;
const WS_LIST_FILTER_DATA_MAGAZINE = `${wsUrl}/ws/datos/flt-magazine`;
const WS_LIST_FILTER_DATA_FILE = `${wsUrl}/ws/datos/flt-file/`;
const WS_LIST_JOBS_BUSN = `${wsUrl}/ws/datos/employments`;

const WS_REGISTER_SUGGESTION = `${wsUrl}/ws/sugerencias/register`;
const WS_REGISTER_SUPPORT_TICKET_ADMS = `${wsUrl}/ws/sugerencias/register-ticket-admission`;
const WS_REGISTER_REQ_CERTIFICATION = `${wsUrl}/ws/reqcertf/register`;
const WS_REGISTER_INFORM_INSCRIPTION = `${wsUrl}/ws/datos/register-insc`;
const WS_REGISTER_INFORM_ENROLLMENT = `${wsUrl}/ws/datos/register-matc`;
const WS_REGISTER_DATA_CURRICULUM_VITAE_UTH = `${wsUrl}/ws/datos/register-cv`;
const WS_REGISTER_DATA_STUDENT_UBU = `${wsUrl}/ws/datos/register-ubu`;

const WS_VALIDATE_RECAPTCHA = '/api/ws_recaptcha';
const WS_VALIDATE_FORM = `${wsUrl}/ws/datos/validation/`;

const WS_LIST_METRICS_SGA = 'https://sga.uteq.edu.ec/api?a=apiresumenacademia';
const WS_SHORT_LIST_ENTITY_RESEARCH_SGA = 'https://sga.uteq.edu.ec/api?a=apiproduccioncientifica&tipo=';
const WS_INFORMATION_ENTITY_SGA ='https://sga.uteq.edu.ec/api?a=apiregistroproduccioncientifica&tipo=VAL1&id=VAL2';
const WS_LIST_ITEMS_ENTITY_CBX_SGA = 'https://sga.uteq.edu.ec/api?a=areaconocimiento';
const WS_LIST_ITEMS_ENTITY_CBX_BY_ID_SGA = 'https://sga.uteq.edu.ec/api?a=subareaconocimiento&id=';
const WS_LIST_ITEMS_SA_CBX_BY_ID_SGA = 'https://sga.uteq.edu.ec/api?a=subareaespecificaconocimiento&id=';
const WS_LIST_ITEMS_FILTER_SGA = 'https://sga.uteq.edu.ec/api?a=apiproduccioncientifica&';
const WS_CODS_LIST_ENTITY_RESEARCH_SGA = 'https://sga.uteq.edu.ec/api?a=apiidproduccioncientifica&tipo=';
const WS_LIST_COMP_TYPES_AGREEMENTS_SGA = 'https://sga.uteq.edu.ec/api?a=tipoinstitucionconvenio';
const WS_LIST_CAREERS_AGREEMENTS_SGA = 'https://sga.uteq.edu.ec/api?a=carreraconvenio&idti=';
const WS_LIST_LOCATIONS_COMPANY_SGA = 'https://sga.uteq.edu.ec/api?a=provinciaconvenio&';
const WS_LIST_AGREEMENTS_BY_PARAMETERS = 'https://sga.uteq.edu.ec/api?a=convenio';
const WS_LIST_TOTAL_CAREERS_AGREEMENTS_SGA = 'https://sga.uteq.edu.ec/api?a=carreraconvenio';
const WS_LIST_YEARS_BY_ENTITY_SGA = 'https://sga.uteq.edu.ec/api?a=apianioproduccioncientifica&tipo=';
const WS_LIST_BOOKS_SLIDER_SGA = 'https://sga.uteq.edu.ec/api?a=apisliderlibros&cantidad=';

const WS_LIST_COMMITTEES = `${wsUrlCidu}/ws/cidu/list-committees`;
const WS_LIST_MEMBERS_COMMITTEES = `${wsUrlCidu}/ws/cidu/list-members`;
const WS_LIST_USER_BY_ROL = `${wsUrlCidu}/ws/cidu/number-users/`;
const WS_LIST_DATA_BY_TYPE = `${wsUrlCidu}/ws/cidu/list-data/`;
const WS_LIST_COUNTRIES = `${wsUrlCidu}/ws/cidu/list-sort-countries`;
const WS_LIST_CITIES_BY_COUNTRY = `${wsUrlCidu}/ws/cidu/cities/`;
const WS_LIST_SYMPOSIUMS_UNIVS = `${wsUrlCidu}/ws/cidu/symposiums`;
const WS_REGISTER_USER_EVENT = `${wsUrlCidu}/ws/cidu/register-user`;
const WS_INFORMATION_CONGRESS = `${wsUrlCidu}/ws/cidu/info-congress`;
const WS_REGISTER_ATTENDANCE_EVENT = `${wsUrlCidu}/ws/cidu/register-attendance`;
//Nuevo
const WS_INFORMATION_CONGRESS_BY_CODE = `${wsUrlCidu}/ws/cidu/information-congress/`;
const WS_INFORMATION_LINKS_SYMPOSIUMS = `${wsUrlCidu}/ws/cidu/json-list-links/`;
const WS_LIST_SYMPOSIUMS_BY_CONGRESS = `${wsUrlCidu}/ws/cidu/symposiums-cong/`;
const WS_LIST_POSTER_DETAILS = `${wsUrlCidu}/ws/cidu/presentations`;

const WS_REGISTER_POINTS_PARTICIPANTS = `${wsUrl}/ws/desafio-uteq/register-points`;
const WS_LIST_PARTICIPANTS_CHALLENGES = `${wsUrl}/ws/desafio-uteq/clasificacion`;
const WS_LIST_PARTICIPANTS_CHALLENGES_V2 = `${wsUrl}/ws/desafio-uteq/clasificacion-v2`;


const WS_LIST_AGREEMTS_CI = `${wsUrlCoopInt}/ws/coop/data/list-agmts`;
const WS_COUNT_AGREEMTS_4 = `${wsUrlCoopInt}/ws/coop/data/count-4/`;
const WS_COUNT_AGREEMTS_5 = `${wsUrlCoopInt}/ws/coop/data/count-5/`;
const WS_COUNT_AGREEMTS_6 = `${wsUrlCoopInt}/ws/coop/data/count-6/`;
const WS_LIST_AGREEMTS_CI_TYPE_1 = `${wsUrlCoopInt}/ws/coop/data/list-agmts-type-1/`;
const WS_LIST_AGREEMTS_CI_TYPE_2 = `${wsUrlCoopInt}/ws/coop/data/list-agmts-type-2/`;
const WS_LIST_AGREEMTS_CI_TYPE_3 = `${wsUrlCoopInt}/ws/coop/data/list-agmts-type-3/`;


//By Languages
const WS_LIST_SHORT_FILES_DOCS_UNIV_BY_LANG = `${wsUrl}/ws/files/list-files-lang/`;
const WS_LIST_ALL_ITEMS_MENU_BY_LANG = `${wsUrl}/ws/menus/menu/list-all-options-lang`;
const WS_LIST_ITEMS_MENU_LAT_BY_LANG = `${wsUrl}/ws/menus/menu/list-lang/`;
const WS_LIST_SHORT_FILES_UNIV_LANGUAGES = `${wsUrl}/ws/files/files-languages/`;
const WS_LIST_SHORT_FILES_FORMTS_UNIV_BY_TYPE_LANG = `${wsUrl}/ws/files/short-list-formats-lang/`;
const WS_LIST_SHORT_FILES_IMAGES_UNIV_BY_TYPE_LANG = `${wsUrl}/ws/files/short-list-logos-lang/`;


const SLIDERS_PRINCIPAL_FOLDER = '/assets/images/advertisements/principal/';
const SLIDERS_OTHERS_FOLDER = '/assets/images/advertisements/others/';
const NEWSPAPERS_FOLDER = '/assets/images/newspapers/';
const MAGAZINES_FOLDER = '/assets/images/magazines/';
const NEWS_SLIDER_FOLDER = '/assets/images/news/slider/';
const LOGOS_FOLDER = '/assets/images/logos/';
const LOGOS_BG_FOLDER = '/assets/images/logos/background/';
const PHOTOS_FOLDER = '/assets/images/photos/';
const CAMPUS_FOLDER = '/assets/images/campus/';
const VIDEOS_FOLDER = '/assets/videos/';
const CALENDAR_DOCS_FOLDER = '/assets/docs/calendars/';
const IDENT_DOCS_FOLDER = '/assets/docs/corporate/';
const EVAL_INTRN_DOCS_FOLDER = '/assets/docs/eval-intrn/';
const FILES_UNIV_DOCS_FOLDER = '/assets/docs/files-univ/';
const FORMATS_DOCS_FOLDER = '/assets/docs/formats/';
const PLANF_UNIV_DOCS_FOLDER = '/assets/docs/planf-univ/';
const COOP_INTERNC_DOCS_FOLDER = '/assets/docs/coop-internc/';
const RGL_NRM_DOCS_FOLDER = '/assets/docs/reglm-norm/';
const TRAB_SOC_UBU_DOCS_FOLDER = '/assets/docs/ubu/trabajo-social/';
const PSIC_UBU_DOCS_FOLDER = '/assets/docs/ubu/psicologia/';
const VINC_DOCS_FOLDER = '/assets/docs/linkage/regulations/';
const VINC_IMGS_FOLDER = '/assets/images/sliders/linkage/';
const IDENT_IMGS_FOLDER = '/assets/images/sliders/corporate/';
const EVAL_INTRN_IMGS_FOLDER = '/assets/images/sliders/eval-intrn/';
const ADMS_IMGS_FOLDER = '/assets/images/sliders/admission/';
const GENERAL_IMGS_FOLDER = '/assets/img/';
const LOTAIP_DOCS_FOLDER = '/lotaip/lotaip/pdf/';
const CAREERS_MSC_IMG_FOLDER = '/assets/images/careers/masters/portada/';
const CAREERS_MSC_BROC_IMG_FOLDER = '/assets/images/careers/masters/brochure/';
const CAREERS_MSC_BROC_DOCS_FOLDER = '/assets/docs/careers/masters/';
const COOP_INTERNC_IMGS_FOLDER = '/assets/images/sliders/coop-internc/';
const MERIT_CONTESTS_DOCS_FOLDER = '/assets/docs/merit-cont/';
const REND_CTAS_DOCS_FOLDER = '/assets/docs/rend-ctas/';
const ADMS_DOCS_FOLDER = '/assets/docs/admission/';
const EVTS_ORGZ_POSTERS_FOLDER = '/assets/images/event-orgz/posters/';
const EVTS_ORGZ_SPEAKERS_FOLDER = '/assets/images/event-orgz/speakers/';
const LOGST_IMGS_FOLDER = '/assets/images/sliders/logistics/';
const LOGST_DOCS_FOLDER = '/assets/docs/logistics/';
const RESEMN_IMGS_FOLDER = '/assets/images/videos/res-sem/';
const UTQINV_IMGS_FOLDER = '/assets/images/videos/uteq-investg/';
const UBU_SERVICIOS_IMGS_FOLDER = '/assets/images/sliders/ubu/';
const UBU_IMGS_EVENTS_UBU = '/assets/images/sliders/ubu/events/';
const UBU_DOCS_FOLDER = '/assets/docs/ubu/';
const IMG_DEFAULT_FICHA_INSCRIPC = '/assets/img/img-upl-file.png';
const NEWS_UNIV_IMGS_FOLDER = '/assets/images/news/pagina/';
const FRONT_PG_IMGS_FOLDER = '/assets/images/front-pages/';
const IMG_MODAL_FOLDER = '/assets/images/modal/';
const INV_NORM_DOCS_FOLDER = '/assets/docs/research/regulations/';
const INV_DOCS_FOLDER = '/assets/docs/research/';
const INVESTG_IMGS_FOLDER = '/assets/images/research/';
const CAREER_ACADEMIC_IMGS_FOLDER = '/assets/images/careers/degrees/academic/';

const CAREER_PROMOTION_IMGS_FOLDER = '/assets/images/careers/degrees/promotion/';
const CAREER_PROMOTION_DOCS_FOLDER = '/assets/docs/careers/degrees/promotion/';

const IMG_SLD_INVESTG_FOLDER ='/assets/images/sliders/research/';
const DOCS_LINK_GRAD_FOLDER ='/assets/docs/linkage/graduates/';
const IMG_JOBS_BS_FOLDER ='/assets/images/employments/';
const IMG_PROJECT_LKG_FOLDER ='/assets/images/sliders/linkage/projects/';
const IMG_PROJECT_RES_FOLDER ='/assets/images/sliders/research/projects/';
const IMG_GENERAL_UNIVS_FOLDER = '/assets/images/sliders/general/';
const IMG_EVENTS_DINMCS_FOLDER = '/assets/images/sliders/events/';
const DOCS_EVENTS_DINMCS_FOLDER = '/assets/docs/events/';
const IMG_GALLERY_LABORATORIES_FOLDER = '/assets/images/research/laboratories/';
const IMG_EVENTS_UBU_PORTRAIT_FOLDER = '/assets/images/sliders/ubu/portrait/';
const IMG_SECTION_GRADUATED_FOLLOW_FOLDER = '/assets/images/seg-grad/';
const DOC_SECTION_GRADUATED_FOLLOW_FOLDER = '/assets/docs/seg-grad/';

const IMG_PROFFESIONAL_AUTHORITY_FOLDER = '/assets/img/cv/';

const IMG_PORTRAIT_WEB_PAGE_CAREERS = '/assets/images/careers/degrees/portrait/';
const IMG_VERTICAL_PRINCIPAL_CAREERS = '/assets/images/careers/degrees/vertical/';

// Maestrías
const MASTER_PROMOTION_IMGS_FOLDER = '/assets/images/careers/masters/promotion/';
const MASTER_PROMOTION_DOCS_FOLDER = '/assets/docs/careers/masters/promotion/';
const MASTER_ACADEMIC_IMGS_FOLDER = '/assets/images/careers/masters/academic/';

// Admisión
const IMAGES_ADMISSION_FOLDER = '/assets/images/admission/';

const NEXT_PUBLIC_RECAPTCHA_SITE_KEY = '6Lc16MwiAAAAAKBCqUJtbR8nKL9gB0mqd8__kO78';
const NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = 'AIzaSyCBM-_EpuzmZA-BYbslpgo_qrGA4PduN78';
const CREDENTIAL_GA = 'G-WVWWZZ7544';


export {
    apiUrl,
    WS_LIST_ITEMS_MENU,
    WS_LIST_ALL_ITEMS_MENU,
    WS_LIST_ITEMS_MENU_LAT,
    WS_LIST_IMAGES_SLIDER,
    WS_LIST_VIDEOS_WEEK,
    WS_LIST_NEWSPAPERS_MONTH,
    WS_LIST_NEWSPAPERS_ALL,
    WS_LIST_METRICS_SGA,
    WS_SHORT_LIST_ENTITY_RESEARCH_SGA,
    WS_INFORMATION_ENTITY_SGA,
    WS_LIST_ITEMS_ENTITY_CBX_SGA,
    WS_LIST_ITEMS_ENTITY_CBX_BY_ID_SGA,
    WS_LIST_ITEMS_SA_CBX_BY_ID_SGA,
    WS_LIST_ITEMS_FILTER_SGA,
    WS_CODS_LIST_ENTITY_RESEARCH_SGA,
    WS_LIST_COMP_TYPES_AGREEMENTS_SGA,
    WS_LIST_CAREERS_AGREEMENTS_SGA,
    WS_LIST_LOCATIONS_COMPANY_SGA,
    WS_LIST_TOTAL_CAREERS_AGREEMENTS_SGA,
    WS_LIST_YEARS_BY_ENTITY_SGA,
    WS_LIST_BOOKS_SLIDER_SGA,
    WS_LIST_COMMITTEES,
    WS_LIST_MEMBERS_COMMITTEES,
    WS_LIST_USER_BY_ROL,
    WS_LIST_DATA_BY_TYPE,
    WS_LIST_COUNTRIES,
    WS_LIST_CITIES_BY_COUNTRY,
    WS_LIST_SYMPOSIUMS_UNIVS,
    WS_REGISTER_USER_EVENT,
    WS_INFORMATION_CONGRESS,
    //Nuevo
    WS_INFORMATION_CONGRESS_BY_CODE,
    WS_INFORMATION_LINKS_SYMPOSIUMS,
    WS_LIST_SYMPOSIUMS_BY_CONGRESS,
	WS_LIST_POSTER_DETAILS,
    WS_REGISTER_POINTS_PARTICIPANTS,
    WS_LIST_PARTICIPANTS_CHALLENGES,
    WS_LIST_PARTICIPANTS_CHALLENGES_V2,
	
	WS_REGISTER_ATTENDANCE_EVENT,
    WS_LIST_AGREEMENTS_BY_PARAMETERS,
    WS_LIST_DATA_GENERAL_NUM1,
    WS_INFORMATION_DEPARTAMENT,
    WS_INFORMATION_PAGE_WEB,
    WS_INFORMATION_WP_BY_URL,
    WS_LIST_DATA_EVENTS,
    WS_REGISTER_SUGGESTION,
    WS_REGISTER_REQ_CERTIFICATION,
    WS_REGISTER_INFORM_INSCRIPTION,
    WS_REGISTER_INFORM_ENROLLMENT,
    WS_REGISTER_DATA_CURRICULUM_VITAE_UTH,
    WS_REGISTER_DATA_STUDENT_UBU,
    WS_VALIDATE_RECAPTCHA,
    WS_VALIDATE_FORM,
    WS_LIST_DATA_NEWS_BY_DEPT,
    WS_LIST_DATA_NEWS_NOT_INCLUDE_ALL,
    WS_LIST_DATA_DEANS,
    WS_LIST_DATA_AUTHORITIES,
    WS_LIST_ACTIVITIES_BY_CALENDAR,
    WS_LIST_FILES_UNIV_BY_TYPE,
    WS_LIST_SHORT_FILES_UNIV_BY_TYPE,
    WS_LIST_SHORT_FILES_FORMTS_UNIV_BY_TYPE,
    WS_LIST_SHORT_FILES_IMAGES_UNIV_BY_TYPE,
    WS_LIST_SHORT_FILES_DOCS_UNIV_BY_TYPE,
    WS_SORT_LIST_FILES_UNIV_BY_TYPE,
    WS_SORT_LIST_FILES_RC_UNIV_BY_TYPE,
    WS_SORT_LIST_FILES_TP_UNIV_BY_TYPE,
    WS_LIST_DATA_MERIT_CONTESTS,
    WS_LIST_DATA_COURSES_UTH,
    WS_INFORMATION_AUTHORITY_BY_DEPARTMENT,
    WS_INFORMATION_JOB_AUTH_BY_DEPARTAMENT,
    WS_INFORMATION_PERSON_BY_FACULTY,
    WS_INFORMATION_PERSON_BY_CAREER,
    WS_LIST_CAREERS_UNIVERSITY_BY_DEPART,
	WS_LIST_CAREERS_UNIVS_UAN,
    WS_LIST_SHORT_URLS_CAREERS_UNIVERSITY_BY_DEPART,
    WS_LIST_URLS_CAREERS_UNIVERSITY_BY_DEPART,
    WS_LIST_URLS_SM_CAREERS_UNIVERSITY_BY_DEPART,
    WS_INFORMATION_CAREER_BY_PARCIAL_URL,
    WS_INFO_AUTH_BY_CAREER,
    WS_LIST_EVENTS_ORGZ_UNIVERSITY,
    WS_INFORMATION_EVENT_BY_URL,
    WS_LIST_CAREERS_MATC_UNIVERSITY_BY_DEPART,
    WS_LIST_CAREERS_GRADE_BY_FACULTY,
    WS_LIST_URLS_CAREERS_GRADE_BY_FACULTY,
    WS_LIST_VIDEOS_BY_TYPE,
    WS_LIST_DATA_ALL_EVENTS_BY_DEPARTAMENT,
    WS_LIST_DATA_ALL_EVENTS_BY_AREA,
    WS_LIST_DATA_ALL_IMGS_EVENTS_BY_AREA,
    WS_LIST_DATA_MEDICAL_SERVICES,
    WS_LIST_DATA_AUTHORITIES_AREA_UBU,
    WS_LIST_DATA_FACULTIES_UTEQ,
    WS_LIST_DATA_URLS_FACULTIES_UTEQ,
    WS_LIST_V3_DATA_URLS_FACULTIES_UTEQ,
    WS_LIST_IS_CAREERS_GRADE_BY_FACULTY,
    WS_LIST_CAREERS_BY_TEXT,
    WS_INFORMATION_FACULTY_BY_URL,
    WS_LIST_SCHEDULES_UBU,
    WS_LIST_CAREERS_BY_CODE_FACULTY,
    WS_LIST_CAREERS_GRADE_UNIVERSITY_BY_FACULTY,
    WS_LIST_POST_SOCIAL_NET_UNIVERSITY,
    WS_LIST_ALL_NEWS_OF_UNIVERSITY,
    WS_LIST_ALL_URLS_NEWS,
    WS_LIST_ALL_SM_NEWS,
    WS_LIST_FILTER_NEWS_BY_PARAMETERS,
    WS_LIST_FILTER_NEWS_DEP_BY_PARAMETERS,
    WS_INFORMATION_NEWS_BY_URL,
    WS_LIST_SIX_NEWS_OF_UNIVERSITY,
    WS_LIST_INFORMATION_AUT_BY_PARAM,
    WS_LIST_ACTIVE_DEPARTAMENTS,
    WS_LIST_ACTIVE_CATEGORIES,
    WS_LIST_WEB_PAGES_BY_ENTITY,
    WS_LIST_URLS_WEB_PAGES_BY_ENTITY,
    WS_LIST_URLS_WEB_PAGES_SM_BY_ENTITY,
    WS_LIST_ELEMENTS_OF_MODAL,
    WS_LIST_FILTER_DATA_MENU,
    WS_LIST_FILTER_DATA_SUBMENU,
    WS_LIST_FILTER_DATA_NEWS,
    WS_LIST_FILTER_DATA_VIDEO,
    WS_LIST_FILTER_DATA_NEWSPAPER,
    WS_LIST_FILTER_DATA_MAGAZINE,
    WS_LIST_FILTER_DATA_FILE,
    WS_LIST_VIDEOS_UNIV_BY_TYPE,
    WS_LIST_INFO_LABORATORIES,
    WS_LIST_GALLERY_LABORATORIES,
    WS_LIST_JOBS_BUSN,
    WS_LIST_METRICS_UNIVS_BY_AREA,
    WS_LIST_PROJECTS_LKG,
    WS_LIST_SM_PROJECTS_LKG,
    WS_LIST_URLS_PROJECTS_LKG,
    WS_LIST_RESEARCH_LINES_UNIV,
    WS_INFORMATION_PROJECT_LKG,
    WS_LIST_RESEARCH_GROUP_BY_FACULTY,
    WS_LIST_SM_RESEARCH_GROUP_BY_FACULTY,
    WS_LIST_URLS_RESEARCH_GROUP_BY_FACULTY,
    WS_INFORMATION_OF_GROUP_BY_CODE,
    WS_LIST_RESEARCH_PROJECTS,
    WS_LIST_SM_RESEARCH_PROJECTS,
    WS_LIST_URL_RESEARCH_PROJECTS,
    WS_INFORMATION_RES_PROJECT,
    WS_IMAGES_OF_PROJECT_LKG,
    WS_IMAGES_OF_PROJECT_RES,
    WS_INFORMATION_PAGE_WEB_BY_URL,
    WS_LIST_PAGES_BY_ENTITY,
    WS_LIST_URL_PAGES_BY_ENTITY,
    WS_LIST_IMAGES_SLIDER_BY_ENTITY,
    WS_LIST_ALL_INFO_NEWS,
    WS_LIST_AGREEMTS_CI,
    WS_COUNT_AGREEMTS_4,
    WS_COUNT_AGREEMTS_5,
    WS_COUNT_AGREEMTS_6,
	WS_LIST_AGREEMTS_CI_TYPE_1,
    WS_LIST_AGREEMTS_CI_TYPE_2,
    WS_LIST_AGREEMTS_CI_TYPE_3,
    WS_LIST_TESTIMONIALS,

    //By languages
    WS_LIST_SHORT_FILES_DOCS_UNIV_BY_LANG,
    WS_LIST_ALL_ITEMS_MENU_BY_LANG,
    WS_LIST_ITEMS_MENU_LAT_BY_LANG,
    WS_LIST_SHORT_FILES_UNIV_LANGUAGES,
    WS_LIST_SHORT_FILES_FORMTS_UNIV_BY_TYPE_LANG,
    WS_LIST_SHORT_FILES_IMAGES_UNIV_BY_TYPE_LANG,

	// Maestrías
    MASTER_PROMOTION_IMGS_FOLDER,
    MASTER_PROMOTION_DOCS_FOLDER,
    MASTER_ACADEMIC_IMGS_FOLDER,
    

    SLIDERS_PRINCIPAL_FOLDER,
    SLIDERS_OTHERS_FOLDER,
    NEWSPAPERS_FOLDER,
    MAGAZINES_FOLDER,
    NEWS_SLIDER_FOLDER,
    LOGOS_FOLDER,
    PHOTOS_FOLDER,
    CAMPUS_FOLDER,
    VIDEOS_FOLDER,
    CALENDAR_DOCS_FOLDER,
    IDENT_DOCS_FOLDER,
    IDENT_IMGS_FOLDER,
    GENERAL_IMGS_FOLDER,
    FILES_UNIV_DOCS_FOLDER,
    FORMATS_DOCS_FOLDER,
    LOTAIP_DOCS_FOLDER,
    CAREERS_MSC_IMG_FOLDER,
    EVAL_INTRN_DOCS_FOLDER,
    EVAL_INTRN_IMGS_FOLDER,
    PLANF_UNIV_DOCS_FOLDER,
    COOP_INTERNC_DOCS_FOLDER,
    COOP_INTERNC_IMGS_FOLDER,
    RGL_NRM_DOCS_FOLDER,
    MERIT_CONTESTS_DOCS_FOLDER,
    REND_CTAS_DOCS_FOLDER,
    ADMS_IMGS_FOLDER,
    ADMS_DOCS_FOLDER,
    CAREERS_MSC_BROC_IMG_FOLDER,
    CAREERS_MSC_BROC_DOCS_FOLDER,
    EVTS_ORGZ_POSTERS_FOLDER,
    EVTS_ORGZ_SPEAKERS_FOLDER,
    LOGST_IMGS_FOLDER,
    LOGST_DOCS_FOLDER,
    RESEMN_IMGS_FOLDER,
    UTQINV_IMGS_FOLDER,
    UBU_SERVICIOS_IMGS_FOLDER,
    CAREER_ACADEMIC_IMGS_FOLDER,
    CAREER_PROMOTION_IMGS_FOLDER, 
    CAREER_PROMOTION_DOCS_FOLDER,
    UBU_DOCS_FOLDER,
    TRAB_SOC_UBU_DOCS_FOLDER,
    PSIC_UBU_DOCS_FOLDER,
    NEWS_UNIV_IMGS_FOLDER,
    VINC_DOCS_FOLDER,
    VINC_IMGS_FOLDER,
    UBU_IMGS_EVENTS_UBU,
    FRONT_PG_IMGS_FOLDER,
    IMG_MODAL_FOLDER,
    INV_NORM_DOCS_FOLDER,
    IMG_DEFAULT_FICHA_INSCRIPC,
    INVESTG_IMGS_FOLDER,
    INV_DOCS_FOLDER,
    IMG_SLD_INVESTG_FOLDER,
    DOCS_LINK_GRAD_FOLDER,
    IMG_JOBS_BS_FOLDER,
    IMG_PROJECT_LKG_FOLDER,
    IMG_PROJECT_RES_FOLDER,
    IMG_GENERAL_UNIVS_FOLDER,
    LOGOS_BG_FOLDER,
    IMG_EVENTS_DINMCS_FOLDER,
    DOCS_EVENTS_DINMCS_FOLDER,
    IMG_GALLERY_LABORATORIES_FOLDER,
    IMG_EVENTS_UBU_PORTRAIT_FOLDER,
    IMG_PROFFESIONAL_AUTHORITY_FOLDER,
    IMG_SECTION_GRADUATED_FOLLOW_FOLDER,
    DOC_SECTION_GRADUATED_FOLLOW_FOLDER,
    IMG_PORTRAIT_WEB_PAGE_CAREERS,
    IMG_VERTICAL_PRINCIPAL_CAREERS,

    IMAGES_ADMISSION_FOLDER,
    WS_REGISTER_SUPPORT_TICKET_ADMS,

    NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    CREDENTIAL_GA
};