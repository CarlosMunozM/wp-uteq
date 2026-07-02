//const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  i18n: {
    locales: ['es','en', 'pt'],
    defaultLocale: 'es',
    localeDetection: false,
  },
  async redirects() {
    return [
      {
        source: '/page/64',
        destination: '/comunicacion/informativos',
        permanent: true,
	  },
      {
        source: '/page/1',
        destination: '/nosotros',
        permanent: true,
      },
      {
        source: '/about/1',
        destination: '/nosotros',
        permanent: true,
      },

      {
        source: '/page/2',
        destination: '/autoridades',
        permanent: true,
      },
      {
        source: '/page/3',
        destination: '/ocs',
        permanent: true,
      },
      {
        source: '/page/4',
        destination: '/identidad-corporativa',
        permanent: true,
      },
      {
        source: '/archivo12',
        destination: '/archivo',
        permanent: true,
      },
      {
        source: '/resolutions/1/1/',
        destination: '/resoluciones',
        permanent: true,
      },
      {
        source: '/page/55',
        destination: '/planificacion-institucional',
        permanent: true,
      },
      {
        source: '/page/1',
        destination: '/nosotros',
        permanent: true,
      },
      {
        source: '/about/1',
        destination: '/nosotros',
        permanent: true,
      },

      {
        source: '/page/2',
        destination: '/autoridades',
        permanent: true,
      },
      {
        source: '/page/3',
        destination: '/ocs',
        permanent: true,
      },
      {
        source: '/page/4',
        destination: '/identidad-corporativa',
        permanent: true,
      },
      {
        source: '/archivo12',
        destination: '/archivo',
        permanent: true,
      },
      {
        source: '/resolutions/1/1/',
        destination: '/resoluciones',
        permanent: true,
      },
      {
        source: '/page/55',
        destination: '/planificacion-institucional',
        permanent: true,
      },
      {
        source: '/rendiciondecuentas',
        destination: '/rendicion-cuentas',
        permanent: true,
      },
      {
        source: '/doc/rc/2021/F202101.pdf',
        destination: '/assets/docs/rend-ctas/2021/F202101.pdf',
        permanent: true,
      },
      {
        source: '/doc/rc/2021/F202102.pdf',
        destination: '/assets/docs/rend-ctas/2021/F202102.pdf',
        permanent: true,
      },
      {
        source: '/doc/rc/2021/F202113.pdf',
        destination: '/assets/docs/rend-ctas/2021/F202113.pdf',
        permanent: true,
      },
      {
        source: '/doc/rc/2021/F202112.pdf',
        destination: '/assets/docs/rend-ctas/2021/F202112.pdf',
        permanent: true,
      },
      {
        source: '/doc/rc/2021/F202113.pdf',
        destination: '/assets/docs/rend-ctas/2021/F202113.pdf',
        permanent: true,
      },
      {
        source: '/doc/rc/2021/F202114.pdf',
        destination: '/assets/docs/rend-ctas/2021/F202114.pdf',
        permanent: true,
      },
      {
        source: '/doc/rc/2021/F202121.pdf',
        destination: '/assets/docs/rend-ctas/2021/F202121.pdf',
        permanent: true,
      },
      {
        source: '/doc/rc/2021/F202122.pdf',
        destination: '/assets/docs/rend-ctas/2021/F202122.pdf',
        permanent: true,
      },
      {
        source: '/doc/rc/2021/F202123.pdf',
        destination: '/assets/docs/rend-ctas/2021/F202123.pdf',
        permanent: true,
      },
      {
        source: '/doc/rc/2021/F202124.pdf',
        destination: '/assets/docs/rend-ctas/2021/F202124.pdf',
        permanent: true,
      },
      {
        source: '/doc/rc/2021/F202125.pdf',
        destination: '/assets/docs/rend-ctas/2021/F202125.pdf',
        permanent: true,
      },
      {
        source: '/doc/rc/2021/F202126.pdf',
        destination: '/assets/docs/rend-ctas/2021/F202126.pdf',
        permanent: true,
      },
      {
        source: '/doc/rc/2021/Formulario%20de%20Rendici%C3%B3n%20de%20Cuentas%202021.pdf',
        destination: '/assets/docs/rend-ctas/2021/Formulario%20de%20Rendici%C3%B3n%20de%20Cuentas%202021.pdf',
        permanent: true,
      },
      {
        source: '/rendiciondecuentas',
        destination: '/rendiciondecuentas',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2020/eq_trbj_2020.pdf',
        destination: '/assets/docs/rend-ctas/2020/eq_trbj_2020.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2020/dis_prop_2020.pdf',
        destination: '/assets/docs/rend-ctas/2020/dis_prop_2020.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2020/rc2020.pdf',
        destination: '/assets/docs/rend-ctas/2020/rc2020.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2020/Formulario de rendicion de cuentas 2020.xls',
        destination: '/assets/docs/rend-ctas/2020/Formulario de rendicion de cuentas 2020.xls',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2020/rc2020.pdf',
        destination: '/assets/docs/rend-ctas/2020/rc2020.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2020/UTEQ-SECGEN-2021-0185-M%20PROBACION%20INFORME%20RENDICI%C3%93N%20DE%20CUENTA%202020.pdf',
        destination: '/assets/docs/rend-ctas/2020/UTEQ-SECGEN-2021-0185-M%20PROBACION%20INFORME%20RENDICI%C3%93N%20DE%20CUENTA%202020.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2020/rc_c2020.pdf',
        destination: '/assets/docs/rend-ctas/2020/rc_c2020.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2020/p_rc2020.pdf',
        destination: '/assets/docs/rend-ctas/2020/p_rc2020.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2020/r_evento.pdf',
        destination: '/assets/docs/rend-ctas/2020/r_evento.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2020/Asistencias%20Rendicion%20de%20Cuenta%202020.pdf',
        destination: '/assets/docs/rend-ctas/2020/Asistencias%20Rendicion%20de%20Cuenta%202020.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2020/Asistencias%20Rendicion%20de%20Cuenta%202020.pdf',
        destination: '/assets/docs/rend-ctas/2020/Asistencias%20Rendicion%20de%20Cuenta%202020.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2020/rc2020.pdf',
        destination: '/assets/docs/rend-ctas/2020/rc2020.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2020/Formulario%20de%20Rendici%C3%B3n%20de%20Cuentas%202020.pdf',
        destination: '/assets/docs/rend-ctas/2020/Formulario%20de%20Rendici%C3%B3n%20de%20Cuentas%202020.pdf',
        permanent: true,
      },
      {
        source: '/rendiciondecuentas',
        destination: '/rendiciondecuentas',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2019/eq_trbj_2019.pdf',
        destination: '/assets/docs/rend-ctas/2019/eq_trbj_2019.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2019/dis_prop_2019.pdf',
        destination: '/assets/docs/rend-ctas/2019/dis_prop_2019.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2019/rc2019.pdf',
        destination: '/assets/docs/rend-ctas/2019/rc2019.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2019/rc2019.pdf',
        destination: '/assets/docs/rend-ctas/2019/rc2019.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2019/f2_planif.pdf',
        destination: '/assets/docs/rend-ctas/2019/f2_planif.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2019/ivrc_asiste_2019.pdf',
        destination: '/assets/docs/rend-ctas/2019/ivrc_asiste_2019.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2019/ivrc_asiste_2019.pdf',
        destination: '/assets/docs/rend-ctas/2019/ivrc_asiste_2019.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2019/ivrc_asiste_2019.pdf',
        destination: '/assets/docs/rend-ctas/2019/ivrc_asiste_2019.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2019/15.%20INFORME%20RENDICION%20DE%20CUENTAS%20INCLUIDOS%20INFORME%20DE%20APORTES%20CIUDADANOS.pdf',
        destination: '/assets/docs/rend-ctas/2019/15.%20INFORME%20RENDICION%20DE%20CUENTAS%20INCLUIDOS%20INFORME%20DE%20APORTES%20CIUDADANOS.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2019/16.%20Formulario%20de%20Rendici%C3%B3n%20de%20Cuentas%202019.pdf',
        destination: '/assets/docs/rend-ctas/2019/16.%20Formulario%20de%20Rendici%C3%B3n%20de%20Cuentas%202019.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2020/Asistencias%20Rendicion%20de%20Cuenta%202020.pdf',
        destination: '/assets/docs/rend-ctas/2020/Asistencias%20Rendicion%20de%20Cuenta%202020.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2020/rc2020.pdf',
        destination: '/assets/docs/rend-ctas/2020/rc2020.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2020/Formulario%20de%20Rendici%C3%B3n%20de%20Cuentas%202020.pdf',
        destination: '/assets/docs/rend-ctas/2020/Formulario%20de%20Rendici%C3%B3n%20de%20Cuentas%202020.pdf',
        permanent: true,
      },
      {
        source: '/rendiciondecuentas',
        destination: '/rendiciondecuentas',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2018/eq_trbj_2018.pdf',
        destination: '/assets/docs/rend-ctas/2018/eq_trbj_2018.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2018/dis_prop_2018.pdf',
        destination: '/assets/docs/rend-ctas/2018/dis_prop_2018.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2018/inf_2018.pdf',
        destination: '/assets/docs/rend-ctas/2018/inf_2018.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2018/f11.xls',
        destination: '/assets/docs/rend-ctas/2018/f11.xls',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2018/redacc_infor_2018.pdf',
        destination: '/assets/docs/rend-ctas/2018/redacc_infor_2018.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2018/social_2018.pdf',
        destination: '/assets/docs/rend-ctas/2018/social_2018.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2018/f20.jpg',
        destination: '/assets/docs/rend-ctas/2018/f20.jpg',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2018/8.%20Acta%20socializacion.pdf',
        destination: '/assets/docs/rend-ctas/2018/8.%20Acta%20socializacion.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2018/f22a.pdf',
        destination: '/assets/docs/rend-ctas/2018/f22a.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2018/f23a.pdf',
        destination: '/assets/docs/rend-ctas/2018/f23a.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2018/f24.pdf',
        destination: '/assets/docs/rend-ctas/2018/f24.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2018/reporterc2018.pdf',
        destination: '/assets/docs/rend-ctas/2018/reporterc2018.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2020/Formulario%20de%20Rendici%C3%B3n%20de%20Cuentas%202020.pdf',
        destination: '/assets/docs/rend-ctas/2020/Formulario%20de%20Rendici%C3%B3n%20de%20Cuentas%202020.pdf',
        permanent: true,
      },
      {
        source: '/rendiciondecuentas',
        destination: '/rendiciondecuentas',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2017/conform_ep2017.pdf',
        destination: '/assets/docs/rend-ctas/2017/conform_ep2017.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2017/inv_rc2017.pdf',
        destination: '/assets/docs/rend-ctas/2017/inv_rc2017.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2017/propuesta_event2017.pdf',
        destination: '/assets/docs/rend-ctas/2017/propuesta_event2017.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2017/INFORME%20DE%20RENDICION%20DE%20CUENTAS%202017.pdf',
        destination: '/assets/docs/rend-ctas/2017/INFORME%20DE%20RENDICION%20DE%20CUENTAS%202017.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2017/informe2017.pdf',
        destination: '/assets/docs/rend-ctas/2017/informe2017.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2017/PRESENTACION RENDICION CUENTAS 2017.pptx',
        destination: '/assets/docs/rend-ctas/2017/PRESENTACION RENDICION CUENTAS 2017.pptx',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2017/registro%20asistencia%202017.pdf',
        destination: '/assets/docs/rend-ctas/2017/registro%20asistencia%202017.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2017/informecpccs2017.pdf',
        destination: '/assets/docs/rend-ctas/2017/informecpccs2017.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2016/INVITACION%20RENDICION%20DE%20CUENTAS%202016.pdf',
        destination: '/assets/docs/rend-ctas/2016/INVITACION%20RENDICION%20DE%20CUENTAS%202016.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2016/PROPUESTA PARA EL EVENTO DE RENDICION 2016.xls',
        destination: '/assets/docs/rend-ctas/2016/PROPUESTA PARA EL EVENTO DE RENDICION 2016.xls',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2016/informe2016.pdf',
        destination: '/assets/docs/rend-ctas/2016/informe2016.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2016/ENCUESTAS%20A%20COMUNIDAD%20RENDICION%20CUENTAS%202016.pdf',
        destination: '/assets/docs/rend-ctas/2016/ENCUESTAS%20A%20COMUNIDAD%20RENDICION%20CUENTAS%202016.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2016/RENDICION CUENTAS 2016.pptx',
        destination: '/assets/docs/rend-ctas/2016/RENDICION CUENTAS 2016.pptx',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2016/REGISTRO%20FIRMAS%20ASISTENTES%20RENDICION%20CUENTAS%202016.pdf',
        destination: '/assets/docs/rend-ctas/2016/REGISTRO%20FIRMAS%20ASISTENTES%20RENDICION%20CUENTAS%202016.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2016/matriz2016.xls',
        destination: '/assets/docs/rend-ctas/2016/matriz2016.xls',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2016/informecpccs2016.pdf',
        destination: '/assets/docs/rend-ctas/2016/informecpccs2016.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2015/CONFORMACION%20DEL%20EQUIPO%20DE%20RENDICION%20DE%20CUENTAS.pdf',
        destination: '/assets/docs/rend-ctas/2015/CONFORMACION%20DEL%20EQUIPO%20DE%20RENDICION%20DE%20CUENTAS.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2015/PROPUESTA PARA EL EVENTO DE RENDICION 2015.xls',
        destination: '/assets/docs/rend-ctas/2015/PROPUESTA PARA EL EVENTO DE RENDICION 2015.xls',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2015/INFORME%20RENDICION%20DE%20CUENTAS%20RECTOR%202015.pdf',
        destination: '/assets/docs/rend-ctas/2015/INFORME%20RENDICION%20DE%20CUENTAS%20RECTOR%202015.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2015/informe%20uteq%202015%20web%20.pdf',
        destination: '/assets/docs/rend-ctas/2015/informe%20uteq%202015%20web%20.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2015/Invitacion.pdf',
        destination: '/assets/docs/rend-ctas/2015/Invitacion.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2015/ENTREGA%20DE%20INVITACIONES%20RENDICION%20DE%20CUENTAS%202015.pdf',
        destination: '/assets/docs/rend-ctas/2015/ENTREGA%20DE%20INVITACIONES%20RENDICION%20DE%20CUENTAS%202015.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2015/ASISTENTES%20A%20RENDICION%20DE%20CUENTAS%202015%20FORMATO%20%201.pdf',
        destination: '/assets/docs/rend-ctas/2015/ASISTENTES%20A%20RENDICION%20DE%20CUENTAS%202015%20FORMATO%20%201.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2015/Presentacion%20RENDICION%20CUENTAS%202015.pdf',
        destination: '/assets/docs/rend-ctas/2015/Presentacion%20RENDICION%20CUENTAS%202015.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2015/ASISTENTES%20A%20RENDICION%20DE%20CUENTAS%202015%20FORMATO%202.pdf',
        destination: '/assets/docs/rend-ctas/2015/ASISTENTES%20A%20RENDICION%20DE%20CUENTAS%202015%20FORMATO%202.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2015/MedioExternoC05.pdf',
        destination: '/assets/docs/rend-ctas/2015/MedioExternoC05.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2015/INFORME%20MEDIO%20EXTERNO.pdf',
        destination: '/assets/docs/rend-ctas/2015/INFORME%20MEDIO%20EXTERNO.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2015/Evidencias%20Fotograficas.pdf',
        destination: '/assets/docs/rend-ctas/2015/Evidencias%20Fotograficas.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2015/MATRIZRC2015.xls',
        destination: '/assets/docs/rend-ctas/2015/MATRIZRC2015.xls',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2015/MATRIZRC2015.xls',
        destination: '/assets/docs/rend-ctas/2015/MATRIZRC2015.xls',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2015/INFORMERCAL%20CPCCS.pdf',
        destination: '/assets/docs/rend-ctas/2015/INFORMERCAL%20CPCCS.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2014/UTEQ-RUTEQ-2014-2396-M.pdf',
        destination: '/assets/docs/rend-ctas/2014/UTEQ-RUTEQ-2014-2396-M.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2014/PROPUESTA PARA EL EVENTO DE RENDICION 2014.xls',
        destination: '/assets/docs/rend-ctas/2014/PROPUESTA PARA EL EVENTO DE RENDICION 2014.xls',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2014/INVITACION%20RENDICION%20CUENTAS%202014_RECTOR%20UTEQ.pdf',
        destination: '/assets/docs/rend-ctas/2014/INVITACION%20RENDICION%20CUENTAS%202014_RECTOR%20UTEQ.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2014/registro%20asistencia%20rendicion%20cuentas%201.pdf',
        destination: '/assets/docs/rend-ctas/2014/registro%20asistencia%20rendicion%20cuentas%201.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2014/registro%20asistencia%20rendicion%20cuentas%202.pdf',
        destination: '/assets/docs/rend-ctas/2014/registro%20asistencia%20rendicion%20cuentas%202.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2014/informe%20rendicion%20de%20cuentas%202014%20rector.pdf',
        destination: '/assets/docs/rend-ctas/2014/informe%20rendicion%20de%20cuentas%202014%20rector.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2014/Informe-2014.pdf',
        destination: '/assets/docs/rend-ctas/2014/Informe-2014.pdf',
        permanent: true,
      },
      {
        source: '/publico/doc/rc/2014/formulario_de_instituciones_de_educacion_superior_2014.xls',
        destination: '/assets/docs/rend-ctas/2014/formulario_de_instituciones_de_educacion_superior_2014.xls',
        permanent: true,
      },
      {
        source: '/page/18',
        destination: '/evaluacion-interna',
        permanent: true,
      },
      {
        source: '/13',
        destination: '/evaluacion-interna',
        permanent: true,
      },
      {
        source: '/about/13',
        destination: '/evaluacion-interna',
        permanent: true,
      },
      {
        source: '/contenidos/13',
        destination: '/evaluacion-interna',
        permanent: true,
      },
      {
        source: '/doc/ceigc/5%20-%20REGLAMENTO%20EVAL.%20INTERNA%20Y%20GESTION%20CALIDAD%20UTEQ%20APROBADO%20OCAS%20-%2030%20MAYO%202017.pdf',
        destination: '/evaluacion-interna',
        permanent: true,
      },
      {
        source: '/doc/ceigc/6%20-%20POL%C3%8DTICA%20DE%20CALIDAD%20UTEQ%20APROBADO%20OCAS%20-%202%20MARZO%202017.pdf',
        destination: '/evaluacion-interna',
        permanent: true,
      },
      {
        source: '/doc/ceigc/7%20-%20MANUAL%20DE%20CALIDAD%20UTEQ%20APROBADO%20OCAS%20-%202%20MARZO%202017.pdf',
        destination: '/evaluacion-interna',
        permanent: true,
      },
      {
        source: '/doc/ceigc/8%20-%20COMIT%C3%89S%20INTERNOS%20EVALUACI%C3%93N%20CARRERAS%202017-2018.pdf',
        destination: '/evaluacion-interna',
        permanent: true,
      },
      {
        source: '/doc/ceigc/9%20-%20PLAN%20AUTOEVALUACI%C3%93N%20INSTITUCIONAL%202017%20-%202018%20APROBADO%20OCAS%20-%2030%20MAYO%202017.pdf',
        destination: '/evaluacion-interna',
        permanent: true,
      },
      {
        source: '/doc/planificacion/v_caces.jpg',
        destination: '/evaluacion-interna',
        permanent: true,
      },
      {
        source: '/doc/ceigc/acred_caces_2020_2025.pdf',
        destination: '/evaluacion-interna',
        permanent: true,
      },
      {
        source: '/doc/ceigc/11%20-%20PLAN%20AUTOEVALUACI%C3%93N%20CARRERAS%202017%20-%202018%20APROBADO%20OCAS%20-%2030%20MAYO%202017.pdf',
        destination: '/evaluacion-interna',
        permanent: true,
      },
      {
        source: '/page/12',
        destination: '/investigacion',
        permanent: true,
      },
      {
        source: '/about/12',
        destination: '/investigacion',
        permanent: true,
      },
      {
        source: '/page/37',
        destination: '/investigacion/direccion',
        permanent: true,
      },

      {
        source: '/page/51',
        destination: '/investigacion/grupos',
        permanent: true,
      },

      {
        source: '/page/6',
        destination: '/investigacion/lineas',
        permanent: true,
      },

      {
        source: '/page/7',
        destination: '/investigacion/proyectos',
        permanent: true,
      },

      {
        source: '/page/52',
        destination: '/investigacion/convocatorias',
        permanent: true,
      },

      {
        source: '/page/53',
        destination: '/investigacion/redes',
        permanent: true,
      },

      {
        source: '/page/54',
        destination: '/investigacion/produccion-cientifica',
        permanent: true,
      },

      {
        source: '/page/58',
        destination: '/investigacion',
        permanent: true,
      },

      {
        source: '/page/66',
        destination: '/investigacion/produccion-cientifica',
        permanent: true,
      },

      {
        source: '/page/69',
        destination: '/investigacion/libros',
        permanent: true,
      },

      {
        source: '/contenidos/12',
        destination: '/investigacion',
        permanent: true,
      },

      {
        source: '/3',
        destination: '/grado/facultad/fci',
        permanent: true,
      },

      {
        source: '/about/3',
        destination: '/grado/facultad/fci',
        permanent: true,
      },


      {
        source: '/carrera/Ingenier%C3%ADa%20Ambiental-1/',
        destination: '/grado/carrera/ingenieria-ambiental',
        permanent: true,
      },

      {
        source: '/carrera/Electricidad-4/',
        destination: '/grado/carrera/electricidad',
        permanent: true,
      },

      {
        source: '/carrera/Mec%C3%A1nica-6/',
        destination: '/grado/carrera/mecanica',
        permanent: true,
      },

      {
        source: '/carrera/Software-7/',
        destination: '/grado/carrera/software',
        permanent: true,
      },
      {
        source: '/carrera/Telem%C3%A1tica-8/',
        destination: '/grado/carrera/telematica',
        permanent: true,
      },

      {
        source: '/carrera/Hidrolog%C3%ADa-53/',
        destination: '/grado/carrera/hidrologia',
        permanent: true,
      },

      {
        source: '/carrera/Arquitectura-54/',
        destination: '/grado/carrera/arquitectura',
        permanent: true,
      },

      {
        source: '/contenidos/3',
        destination: '/grado/facultad/fci',
        permanent: true,
      },



      {
        source: '/4',
        destination: '/grado/facultad/fcaf',
        permanent: true,
      },

      {
        source: '/about/4',
        destination: '/grado/facultad/fcaf',
        permanent: true,
      },

      {
        source: '/carrera/Ingenier%C3%ADa%20Forestal-2/',
        destination: '/grado/carrera/ingenieria-forestal',
        permanent: true,
      },

      {
        source: '/carrera/Agronom%C3%ADa-12/',
        destination: '/grado/carrera/agronomia',
        permanent: true,
      },

      {
        source: '/carrera/Agroecolog%C3%ADa-44/',
        destination: '/grado/carrera/agroecologia',
        permanent: true,
      },

      {
        source: '/contenidos/4',
        destination: '/grado/facultad/fcaf',
        permanent: true,
      },




      {
        source: '/2',
        destination: '/grado/facultad/fcedu',
        permanent: true,
      },

      {
        source: '/about/2',
        destination: '/grado/facultad/fcedu',
        permanent: true,
      },

      {
        source: '/carrera/Educaci%C3%B3n%20b%C3%A1sica-48/',
        destination: '/grado/carrera/educacion-basica',
        permanent: true,
      },

      {
        source: '/carrera/Psicopedagog%C3%ADa-47/',
        destination: '/grado/carrera/psicopedagogia',
        permanent: true,
      },

      {
        source: '/carrera/Pedagog%C3%ADa%20de%20los%20Idiomas%20Nacionales%20y%20Extranjeros%20-49/',
        destination: '/grado/carrera/pedagogia-de-los-idiomas-nacionales-y-extranjeros',
        permanent: true,
      },

      {
        source: '/contenidos/2',
        destination: '/grado/facultad/fcedu',
        permanent: true,
      },



      {
        source: '/5',
        destination: '/grado/facultad/fcip',
        permanent: true,
      },

      {
        source: '/about/5',
        destination: '/grado/facultad/fcip',
        permanent: true,
      },

      {
        source: '/carrera/Seguridad%20Industrial-5/',
        destination: '/grado/carrera/seguridad-industrial',
        permanent: true,
      },

      {
        source: '/carrera/Alimentos-10/',
        destination: '/grado/carrera/alimentos',
        permanent: true,
      },

      {
        source: '/carrera/Agroindustria-18/',
        destination: '/grado/carrera/agroindustria',
        permanent: true,
      },

      {
        source: '/carrera/Ingenier%C3%ADa%20Industrial-19/',
        destination: '/grado/carrera/ingenieria-industrial',
        permanent: true,
      },

      {
        source: '/contenidos/5',
        destination: '/grado/facultad/fcip',
        permanent: true,
      },



      {
        source: '/6',
        destination: '/grado/facultad/fce',
        permanent: true,
      },

      {
        source: '/about/6',
        destination: '/grado/facultad/fce',
        permanent: true,
      },

      {
        source: '/carrera/Administraci%C3%B3n%20de%20Empresas-13/',
        destination: '/grado/carrera/administracion-de-empresas',
        permanent: true,
      },

      {
        source: '/carrera/Contabilidad%20y%20Auditor%C3%ADa-14/',
        destination: '/grado/carrera/contabilidad-y-auditoria',
        permanent: true,
      },

      {
        source: '/carrera/Mercadotecnia-17/',
        destination: '/grado/carrera/mercadotecnia',
        permanent: true,
      },

      {
        source: '/carrera/Gesti%C3%B3n%20del%20Talento%20Humano-43/',
        destination: '/grado/carrera/gestion-del-talento-humano',
        permanent: true,
      },

      {
        source: '/contenidos/6',
        destination: '/grado/facultad/fce',
        permanent: true,
      },



      {
        source: '/10',
        destination: '/grado/facultad/fcsef',
        permanent: true,
      },

      {
        source: '/about/10',
        destination: '/grado/facultad/fcsef',
        permanent: true,
      },

      {
        source: '/carrera/Econom%C3%ADa-15/',
        destination: '/grado/carrera/economia',
        permanent: true,
      },

      {
        source: '/carrera/Finanzas-42/',
        destination: '/grado/carrera/economia',
        permanent: true,
      },

      {
        source: '/carrera/Administraci%C3%B3n%20%20P%C3%BAblica-46/',
        destination: '/grado/carrera/administracion-publica',
        permanent: true,
      },

      {
        source: '/contenidos/10',
        destination: '/grado/facultad/fcsef',
        permanent: true,
      },



      {
        source: '/18',
        destination: '/grado/facultad/fcs',
        permanent: true,
      },

      {
        source: '/about/18',
        destination: '/grado/facultad/fcs',
        permanent: true,
      },

      {
        source: '/carrera/Enfermer%C3%ADa-29/',
        destination: '/grado/carrera/enfermeria',
        permanent: true,
      },

      {
        source: '/page/42',
        destination: '/grado/facultad/fcs',
        permanent: true,
      },

      {
        source: '/contenidos/18',
        destination: '/grado/facultad/fcs',
        permanent: true,
      },



      {
        source: '/23',
        destination: '/grado/facultad/fcpb',
        permanent: true,
      },

      {
        source: '/about/23',
        destination: '/grado/facultad/fcpb',
        permanent: true,
      },

      {
        source: '/carrera/Agropecuaria-9/',
        destination: '/grado/carrera/agropecuaria',
        permanent: true,
      },

      {
        source: '/carrera/Zootecnia-11/',
        destination: '/grado/carrera/zootecnia',
        permanent: true,
      },

      {
        source: '/carrera/Acuicultura-40/',
        destination: '/grado/carrera/acuicultura',
        permanent: true,
      },

      {
        source: '/carrera/Biolog%C3%ADa-45/',
        destination: '/grado/carrera/biologia',
        permanent: true,
      },

      {
        source: '/contenidos/23',
        destination: '/grado/facultad/fcpb',
        permanent: true,
      },



      {
        source: '/page/63',
        destination: '/admision',
        permanent: true,
      },


      {
        source: '/8',
        destination: '/posgrado',
        permanent: true,
      },

      {
        source: '/about/8',
        destination: '/posgrado',
        permanent: true,
      },

      {
        source: '/carrera/Maestr%C3%ADa%20en%20Manejo%20Forestal%20Sostenible-20/',
        destination: '/posgrado/maestria-en-manejo-forestal-sostenible',
        permanent: true,
      },

      {
        source: '/doc/page/20/b_m_forestal.pdf',
        destination: '/docs/careers/masters/docx-uteq-brochure-000001.pdf',
        permanent: true,
      },

      {
        source: '/carrera/Maestr%C3%ADa%20en%20Gesti%C3%B3n%20Ambiental-22/',
        destination: '/posgrado/maestria-en-gestion-ambiental',
        permanent: true,
      },

      {
        source: '/doc/page/22/b_m_gamb.pdf',
        destination: '/docs/careers/masters/docx-uteq-brochure-000002.pdf',
        permanent: true,
      },

      {
        source: '/carrera/Maestr%C3%ADa%20en%20Contabilidad%20y%20Auditor%C3%ADa-23/',
        destination: '/posgrado/maestria-en-contabilidad-y-auditoria',
        permanent: true,
      },

      {
        source: '/doc/page/23/b_m_cpa.pdf',
        destination: '/docs/careers/masters/docx-uteq-brochure-000003.pdf',
        permanent: true,
      },

      {
        source: '/carrera/Maestr%C3%ADa%20en%20Administraci%C3%B3n%20de%20Empresas-30/',
        destination: '/posgrado/maestria-en-administracion-de-empresas',
        permanent: true,
      },

      {
        source: '/doc/page/30/b_m_adm.pdf',
        destination: '/docs/careers/masters/docx-uteq-brochure-000004.pdf"',
        permanent: true,
      },

      {
        source: '/carrera/Maestr%C3%ADa%20en%20producci%C3%B3n%20animal,%20Menci%C3%B3n%20manejo%20sustentable%20de%20rumiantes%20y%20monog%C3%A1stricos-31/',
        destination: '/posgrado/maestria-en-produccion-animal-mencion-manejo-sustentable-de-rumiantes-y-monogastricos',
        permanent: true,
      },

      {
        source: '/doc/page/33/b_prodanimal.pdf',
        destination: '/docs/careers/masters/docx-uteq-brochure-000005.pdf',
        permanent: true,
      },

      {
        source: '/carrera/Maestr%C3%ADa%20en%20Desarrollo%20Local,%20Menci%C3%B3n%20Planificaci%C3%B3n,%20Desarrollo%20y%20Ordenamiento%20Territorial;%20Menci%C3%B3n%20Econom%C3%ADa%20Social%20y%20Solidaria-32/',
        destination: '/posgrado/maestria-en-desarrollo-local-mencion-planificacion-desarrollo-y-ordenamiento-territorial-mencion-economia-social-y-solidaria',
        permanent: true,
      },

      {
        source: '/doc/page/32/b_d_local.pdf',
        destination: '/docs/careers/masters/docx-uteq-brochure-000006.pdf',
        permanent: true,
      },

      {
        source: '/carrera/Maestr%C3%ADa%20en%20Agronom%C3%ADa,%20Menci%C3%B3n%20Producci%C3%B3n%20Agr%C3%ADcola%20Sostenible-33/',
        destination: '/posgrado/maestria-en-agronomia-mencion-produccion-agricola-sostenible',
        permanent: true,
      },

      {
        source: '/doc/page/33/b_agronomia.pdf',
        destination: '/docs/careers/masters/docx-uteq-brochure-000007.pdf',
        permanent: true,
      },

      {
        source: '/carrera/Maestr%C3%ADa%20en%20Agroecolog%C3%ADa%20y%20Desarrollo%20Sostenible-34/',
        destination: '/posgrado/maestria-en-agroecologia-y-desarrollo-sostenible',
        permanent: true,
      },

      {
        source: '/doc/page/34/t_agroec.pdf',
        destination: '/docs/careers/masters/docx-uteq-brochure-000008.pdf',
        permanent: true,
      },

      {
        source: '/carrera/Maestr%C3%ADa%20en%20Acuicultura-35/',
        destination: '/posgrado/maestria-en-acuicultura',
        permanent: true,
      },

      {
        source: '/doc/page/35/b_m_acuicultura.pdf',
        destination: '/docs/careers/masters/docx-uteq-brochure-000009.pdf',
        permanent: true,
      },

      {
        source: '/carrera/Maestr%C3%ADa%20en%20Educaci%C3%B3n%20Menci%C3%B3n%20Orientaci%C3%B3n%20Educativa-36/',
        destination: '/posgrado/maestria-en-educacion-mencion-orientacion-educativa',
        permanent: true,
      },

      {
        source: '/doc/page/36/t_edu.pdf',
        destination: '/docs/careers/masters/docx-uteq-brochure-000010.pdf',
        permanent: true,
      },

      {
        source: '/carrera/Maestr%C3%ADa%20en%20Pedagog%C3%ADa-37/',
        destination: '/posgrado/maestria-en-pedagogia',
        permanent: true,
      },

      {
        source: '/doc/page/37/b_m_pedagogia.pdf',
        destination: '/docs/careers/masters/docx-uteq-brochure-000011.pdf',
        permanent: true,
      },

      {
        source: '/carrera/Maestr%C3%ADa%20en%20Gesti%C3%B3n%20P%C3%BAblica-39/',
        destination: '/posgrado/maestria-en-gestion-publica',
        permanent: true,
      },

      {
        source: '/doc/page/39/b_m_gest_pub.pdf',
        destination: '/docs/careers/masters/docx-uteq-brochure-000012.pdf',
        permanent: true,
      },

      {
        source: '/carrera/Maestr%C3%ADa%20en%20Ciencia%20de%20Datos-50/',
        destination: '/posgrado/maestria-en-ciencia-de-datos',
        permanent: true,
      },

      {
        source: '/doc/page/50/b_datos.pdf',
        destination: '/docs/careers/masters/docx-uteq-brochure-000013.pdf',
        permanent: true,
      },

      {
        source: '/carrera/Maestr%C3%ADa%20con%20trayectoria%20de%20investigaci%C3%B3n%20en%20Automatizaci%C3%B3n%20y%20Control%20Industrial-52/',
        destination: '/posgrado/maestria-con-trayectoria-de-investigacion-en-automatizacion-y-control-industrial',
        permanent: true,
      },

      {
        source: '/doc/page/52/b_aut_cont.pdf',
        destination: '/docs/careers/masters/docx-uteq-brochure-000014.pdf',
        permanent: true,
      },

      {
        source: '/carrera/Maestr%C3%ADa%20en%20Biotecnolog%C3%ADa%20Agropecuaria-51/',
        destination: '/posgrado/maestria-en-biotecnologia-agropecuaria',
        permanent: true,
      },

      {
        source: '/doc/page/51/b_m_biotecnologia.pdf',
        destination: '/docs/careers/masters/docx-uteq-brochure-000015.pdf',
        permanent: true,
      },

      {
        source: '/page/39',
        destination: '/posgrado',
        permanent: true,
      },

      {
        source: '/contenidos/8',
        destination: '/posgrado',
        permanent: true,
      },



      {
        source: '/9',
        destination: '/vinculacion',
        permanent: true,
      },

      {
        source: '/about/9',
        destination: '/vinculacion',
        permanent: true,
      },

      {
        source: '/page/57',
        destination: '/vinculacion',
        permanent: true,
      },

      {
        source: '/doc/vinculacion/REGLAMENTO%20GENERAL%20DE%20VINCULACION.pdf',
        destination: '/vinculacion',
        permanent: true,
      },

      {
        source: '/doc/vinculacion/REGLAMENTO%20PARA%20LA%20SUSCRIPCION%20DE%20CONVENIOS.pdf',
        destination: '/vinculacion',
        permanent: true,
      },

      {
        source: '/doc/vinculacion/REGLAMENTO%20PPP.pdf',
        destination: '/vinculacion',
        permanent: true,
      },

      {
        source: '/publico/pdf/1701061035776.pdf',
        destination: '/vinculacion',
        permanent: true,
      },

      {
        source: '/page/30',
        destination: '/vinculacion/proyectos',
        permanent: true,
      },

      {
        source: '/page/22',
        destination: '/vinculacion/proyectos',
        permanent: true,
      },

      {
        source: '/page/23',
        destination: '/vinculacion/convenios',
        permanent: true,
      },

      {
        source: '/16',
        destination: '/vinculacion/seguimiento-a-graduados',
        permanent: true,
      },

      {
        source: '/doc/page/70/a_b_v_uteq.jpeg',
        destination: '/vinculacion/bolsa-de-empleo',
        permanent: true,
      },

      {
        source: '/contenidos/9',
        destination: '/vinculacion',
        permanent: true,
      },

      {
        source: '/contenidos/9',
        destination: '/vinculacion',
        permanent: true,
      },

      {
        source: '/page/55',
        destination: '/vinculacion',
        permanent: true,
      },

      {
        source: '/formats/1/1/',
        destination: '/formatos-de-solicitudes',
        permanent: true,
      },

      {
        source: '/11',
        destination: '/ubu',
        permanent: true,
      },

      {
        source: '/about/11',
        destination: '/ubu',
        permanent: true,
      },

      {
        source: '/page/8',
        destination: '/ubu/servicios/trabajo-social',
        permanent: true,
      },

      {
        source: '/page/16',
        destination: '/ubu/servicios/deporte',
        permanent: true,
      },

      {
        source: '/page/26',
        destination: '/ubu/servicios/psicologia',
        permanent: true,
      },

      {
        source: '/page/13',
        destination: '/ubu/servicio/cultura/danza',
        permanent: true,
      },

      {
        source: '/page/14',
        destination: '/ubu/servicio/cultura/musica',
        permanent: true,
      },

      {
        source: '/page/61',
        destination: '/ubu/servicio/servicios-medicos',
        permanent: true,
      },

      {
        source: '/contenidos/11',
        destination: '/comunicacion/informativos',
        permanent: true,
      },

      {
        source: '/doc/page/8/f_i_esc.pdf',
        destination: '/ubu/servicio/ficha-inscripcion',
        permanent: true,
      },
      {
        source: '/read/1/1',
        destination: '/comunicacion/noticia/uteq-entrego-planes-de-manejo-integral',
        permanent: true,
      },
      {
        source: '/read/1/2',
        destination: '/comunicacion/noticia/facultad-de-ciencias-empresariales-incorporo-a-472-profesionales',
        permanent: true,
      },
      {
        source: '/read/1/3',
        destination: '/comunicacion/noticia/personas-con-capacidades-especiales-aprendieron-sobre-atencion-al-cliente',
        permanent: true,
      },
      {
        source: '/read/1/4',
        destination: '/comunicacion/noticia/uteq-monitorea-la-calidad-del-agua-para-produccion-de-peces-en-comunas-del-canton-mocache',
        permanent: true,
      },
      {
        source: '/read/1/5',
        destination: '/comunicacion/noticia/uteq-se-alista-para-elegir-a-su-reina',
        permanent: true,
      },
      {
        source: '/read/1/6',
        destination: '/comunicacion/noticia/myrka-villarroel-fue-electa-reina-de-uteq',
        permanent: true,
      },
      {
        source: '/read/1/7',
        destination: '/comunicacion/noticia/docentes-fueron-capacitados-en-el-uso-de-base-de-datos-cientificas',
        permanent: true,
      },
      {
        source: '/read/1/8',
        destination: '/comunicacion/noticia/rector-uteq-participo-en-iv-congreso-internacional-de-desarrollo-local',
        permanent: true,
      },
      {
        source: '/read/1/9',
        destination: '/comunicacion/noticia/campeones-del-torneo-intercarreras-fueron-premiados',
        permanent: true,
      },
      {
        source: '/read/1/10',
        destination: '/comunicacion/noticia/cerca-de-400-participantes-en-el-primer-simposio-internacional-de-investigacion',
        permanent: true,
      },
      {
        source: '/read/1/11',
        destination: '/comunicacion/noticia/estudiantes-aprenden-sobre-dinero-electronico',
        permanent: true,
      },
      {
        source: '/read/1/12',
        destination: '/comunicacion/noticia/nuevos-instrumentos-musicales',
        permanent: true,
      },
      {
        source: '/read/1/13',
        destination: '/comunicacion/noticia/uteq-inauguro-laboratorio-de-ingles',
        permanent: true,
      },
      {
        source: '/read/1/14',
        destination: '/comunicacion/noticia/revista-ciencia-y-tecnologia-de-la-uteq-con-mejora-continua',
        permanent: true,
      },
      {
        source: '/read/1/15',
        destination: '/comunicacion/noticia/fci-cuenta-con-laboratorios-de-mecanica-termologia-y-electronica',
        permanent: true,
      },
      {
        source: '/read/1/16',
        destination: '/comunicacion/noticia/estudiantes-de-uteq-realizaron-proyectos-de-vinculacion',
        permanent: true,
      },
      {
        source: '/read/1/17',
        destination: '/comunicacion/noticia/uteq-celebro-sus-33-anos',
        permanent: true,
      },
      {
        source: '/read/1/18',
        destination: '/comunicacion/noticia/autoridades-universitarias-recibieron-documentos-historicos-de-uteq',
        permanent: true,
      },
      {
        source: '/read/1/19',
        destination: '/comunicacion/noticia/docentes-en-curso-de-metodos-de-investigacion',
        permanent: true,
      },
      {
        source: '/read/1/20',
        destination: '/comunicacion/noticia/funcionarios-de-la-universidad-del-callao-visitaron-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/21',
        destination: '/comunicacion/noticia/uteq-designo-a-sus-nuevos-representantes-al-consejo-universitario',
        permanent: true,
      },
      {
        source: '/read/1/22',
        destination: '/comunicacion/noticia/uteq-en-proyecto-europeo-sobre-cambio-climatico',
        permanent: true,
      },
      {
        source: '/read/1/23',
        destination: '/comunicacion/noticia/uteq-investiga-crianza-de-peces-con-tecnologia-biofloc',
        permanent: true,
      },
      {
        source: '/read/1/24',
        destination: '/comunicacion/noticia/docentes-en-curso-de-capacitacion-sobre-gestion-editorial',
        permanent: true,
      },
      {
        source: '/read/1/25',
        destination: '/comunicacion/noticia/universidad-de-granma-entrego-reconocimiento-a-rector-de-uteq',
        permanent: true,
      },
      {
        source: '/read/1/26',
        destination: '/comunicacion/noticia/uteq-y-fiscalia-general-firman-convenio',
        permanent: true,
      },
      {
        source: '/read/1/27',
        destination: '/comunicacion/noticia/nuevos-academicos-titulares-en-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/28',
        destination: '/comunicacion/noticia/uteq-e-instituto-valencia-firman-convenio-de-cooperacion',
        permanent: true,
      },
      {
        source: '/read/1/29',
        destination: '/comunicacion/noticia/autoridades-de-uteq-inauguraron-2da-planta-de-edificio-fcp',
        permanent: true,
      },
      {
        source: '/read/1/30',
        destination: '/comunicacion/noticia/prefecto-marco-troya-visito-la-uteq-para-coordinar-acciones',
        permanent: true,
      },
      {
        source: '/read/1/31',
        destination: '/comunicacion/noticia/fcamb-con-agenda-por-semana-mundial-del-medio-ambiente',
        permanent: true,
      },
      {
        source: '/read/1/32',
        destination: '/comunicacion/noticia/tres-programas-de-maestrias-inician-en-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/33',
        destination: '/comunicacion/noticia/uteq-sede-de-los-xix-juegos-de-empleados-universitarios-del-pais',
        permanent: true,
      },
      {
        source: '/read/1/34',
        destination: '/comunicacion/noticia/docente-uteq-logra-publicacion-en-prestigiosa-revista',
        permanent: true,
      },
      {
        source: '/read/1/35',
        destination: '/comunicacion/noticia/campana-de-salud-de-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/36',
        destination: '/comunicacion/noticia/uteq-y-solca-realizaran-campana-de-deteccion-oportuna-del-cancer',
        permanent: true,
      },
      {
        source: '/read/1/37',
        destination: '/comunicacion/noticia/proyecto-cultivo-de-peces-para-mejorar-ingresos-de-pequenos-productores',
        permanent: true,
      },
      {
        source: '/read/1/38',
        destination: '/comunicacion/noticia/entrega-de-certificados-a-aso-de-carnicos-y-afines-de-quevedo',
        permanent: true,
      },
      {
        source: '/read/1/39',
        destination: '/comunicacion/noticia/seted-dicto-charlas-sobre-prevencion-de-drogas',
        permanent: true,
      },
      {
        source: '/read/1/40',
        destination: '/comunicacion/noticia/trigesimo-tercer-aniversario',
        permanent: true,
      },
      {
        source: '/read/1/41',
        destination: '/comunicacion/noticia/cronograma-de-conferencias-cientificas-julio-2017',
        permanent: true,
      },
      {
        source: '/read/1/42',
        destination: '/comunicacion/noticia/incorporaciones-junio-2017',
        permanent: true,
      },
      {
        source: '/read/1/44',
        destination: '/comunicacion/noticia/se-implemento-el-funcionamiento-de-la-super-tienda-ecuador',
        permanent: true,
      },
      {
        source: '/read/1/45',
        destination: '/comunicacion/noticia/taxistas-y-uteq-firman-convenio',
        permanent: true,
      },
      {
        source: '/read/1/46',
        destination: '/comunicacion/noticia/uteq-tiene-listo-su-nuevo-complejo-deportivo',
        permanent: true,
      },
      {
        source: '/read/1/47',
        destination: '/comunicacion/noticia/caminata-por-el-dia-internacional-de-la-lucha-contra-las-drogas',
        permanent: true,
      },
      {
        source: '/read/1/48',
        destination: '/comunicacion/noticia/facultad-de-ciencias-agrarias-organiza-actividades-por-aniversario',
        permanent: true,
      },
      {
        source: '/read/1/49',
        destination: '/comunicacion/noticia/universidad-tecnica-del-norte-campeon-xix-olimpiadas-fenatupe-2017',
        permanent: true,
      },
      {
        source: '/read/1/50',
        destination: '/comunicacion/noticia/ued-graduo-298-nuevos-profesionales',
        permanent: true,
      },
      {
        source: '/read/1/52',
        destination: '/comunicacion/noticia/autoevaluacion-institucional-2017-de-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/55',
        destination: '/comunicacion/noticia/agrarias-la-facultad-mas-antigua-de-la-uteq-celebro-su-aniversario-33',
        permanent: true,
      },
      {
        source: '/read/1/56',
        destination: '/comunicacion/noticia/conferencias-y-casa-abierta-en-33-anos-fca',
        permanent: true,
      },
      {
        source: '/read/1/57',
        destination: '/comunicacion/noticia/maestrias-en-gestion-ambiental-y-manejo-forestal-sostenible',
        permanent: true,
      },
      {
        source: '/read/1/58',
        destination: '/comunicacion/noticia/estudiantes-de-ingenieria-mecanica-donan-impresora-3d-a-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/59',
        destination: '/comunicacion/noticia/fci-con-mas-laboratorios',
        permanent: true,
      },
      {
        source: '/read/1/60',
        destination: '/comunicacion/noticia/uteq-clasifico-con-dos-proyectos-a-final-galardones-senescyt-2017',
        permanent: true,
      },
      {
        source: '/read/1/61',
        destination: '/comunicacion/noticia/supercom-socializo-contenido-de-ley-de-comunicacion-en-uteq',
        permanent: true,
      },
      {
        source: '/read/1/62',
        destination: '/comunicacion/noticia/taller-del-proyecto-care-upo-uteq',
        permanent: true,
      },
      {
        source: '/read/1/63',
        destination: '/comunicacion/noticia/estudiantes-construyen-brazo-robotico',
        permanent: true,
      },
      {
        source: '/read/1/64',
        destination: '/comunicacion/noticia/docente-de-la-uteq-obtuvo-doctorado-con-mencion-cum-laude',
        permanent: true,
      },
      {
        source: '/read/1/65',
        destination: '/comunicacion/noticia/1era-feria-internacional-de-seguridad-industrial-y-salud-ocupacional-en-uteq',
        permanent: true,
      },
      {
        source: '/read/1/66',
        destination: '/comunicacion/noticia/seminarios-de-turismo-sostenible-y-recursos-naturales-en-uteq',
        permanent: true,
      },
      {
        source: '/read/1/67',
        destination: '/comunicacion/noticia/olimpiadas-2017-en-agrarias-por-el-aniversario-33',
        permanent: true,
      },
      {
        source: '/read/1/68',
        destination: '/comunicacion/noticia/maestro-juan-miranda-recibe-reconocimiento',
        permanent: true,
      },
      {
        source: '/read/1/69',
        destination: '/comunicacion/noticia/estudiantes-se-alistan-para-torneo-intercarreras-2017',
        permanent: true,
      },
      {
        source: '/read/1/70',
        destination: '/comunicacion/noticia/uteq-y-fundacion-maquita-en-jornadas-de-emprendimientos-agroecologicos',
        permanent: true,
      },
      {
        source: '/read/1/71',
        destination: '/comunicacion/noticia/la-fcamb-celebro-sus-17-anos-de-creacion',
        permanent: true,
      },
      {
        source: '/read/1/72',
        destination: '/comunicacion/noticia/representante-del-ces-visito-uteq',
        permanent: true,
      },
      {
        source: '/read/1/73',
        destination: '/comunicacion/noticia/taller-de-intercambio-cientifico-se-realizo-en-ff-cc-agrarias',
        permanent: true,
      },
      {
        source: '/read/1/74',
        destination: '/comunicacion/noticia/unitepc-y-uteq-firman-convenio-de-cooperacion',
        permanent: true,
      },
      {
        source: '/read/1/75',
        destination: '/comunicacion/noticia/docentes-de-la-fce-reciben-capacitaciones',
        permanent: true,
      },
      {
        source: '/read/1/76',
        destination: '/comunicacion/noticia/proyectos-de-emprendimiento-fueron-expuestos-en-casa-abierta',
        permanent: true,
      },
      {
        source: '/read/1/77',
        destination: '/comunicacion/noticia/encuentro-de-graduados-y-jornada-de-marketing-y-contabilidad-se-realizo-en-uteq',
        permanent: true,
      },
      {
        source: '/read/1/78',
        destination: '/comunicacion/noticia/futuros-ingenieros-agropecuarios-cosechan-hortalizas-organicas',
        permanent: true,
      },
      {
        source: '/read/1/79',
        destination: '/comunicacion/noticia/uteq-firma-convenio-con-mies',
        permanent: true,
      },
      {
        source: '/read/1/80',
        destination: '/comunicacion/noticia/estudiantes-de-la-ued-inician-proyecto-de-vinculacion',
        permanent: true,
      },
      {
        source: '/read/1/81',
        destination: '/comunicacion/noticia/seted-firmo-convenio-con-uteq',
        permanent: true,
      },
      {
        source: '/read/1/82',
        destination: '/comunicacion/noticia/encuentro-de-graduados-economia-y-administracion-financiera',
        permanent: true,
      },
      {
        source: '/read/1/83',
        destination: '/comunicacion/noticia/estudiantes-de-la-uteq-ejecutan-proyectos-nutricionales',
        permanent: true,
      },
      {
        source: '/read/1/84',
        destination: '/comunicacion/noticia/11359-cupos-se-pondran-a-disposicion-de-los-aspirantes-en-un-proceso-adicional-de-postulacion',
        permanent: true,
      },
      {
        source: '/read/1/85',
        destination: '/comunicacion/noticia/jornada-academica-cientifica-ambiental',
        permanent: true,
      },
      {
        source: '/read/1/86',
        destination: '/comunicacion/noticia/ces-aprobo-rediseno-carrera-de-mercadotecnia',
        permanent: true,
      },
      {
        source: '/read/1/87',
        destination: '/comunicacion/noticia/segunda-jornada-cientifica-de-marketing-se-cumplio-en-uteq',
        permanent: true,
      },
      {
        source: '/read/1/88',
        destination: '/comunicacion/noticia/dos-academicos-de-uteq-obtienen-doctorados-phd-en-espana',
        permanent: true,
      },
      {
        source: '/read/1/89',
        destination: '/comunicacion/noticia/en-quito-inicio-formacion-de-mediadores-segunda-edicion',
        permanent: true,
      },
      {
        source: '/read/1/90',
        destination: '/comunicacion/noticia/elecciones-de-gobierno-estudiantil-y-de-representantes-a-asamblea-universitaria',
        permanent: true,
      },
      {
        source: '/read/1/91',
        destination: '/comunicacion/noticia/asociacion-de-docentes-de-la-uteq-celebro-aniversario-33',
        permanent: true,
      },
      {
        source: '/read/1/92',
        destination: '/comunicacion/noticia/innovacion-y-emprendimiento-se-fomenta-en-uteq',
        permanent: true,
      },
      {
        source: '/read/1/93',
        destination: '/comunicacion/noticia/uteq-inaugura-complejo-deportivo',
        permanent: true,
      },
      {
        source: '/read/1/94',
        destination: '/comunicacion/noticia/uteq-obtuvo-tercer-lugar-en-el-concurso-galardones-senescyt-2017',
        permanent: true,
      },
      {
        source: '/read/1/96',
        destination: '/comunicacion/noticia/ces-aprobo-rediseno-de-carrera-de-administracion-de-empresas',
        permanent: true,
      },
      {
        source: '/read/1/97',
        destination: '/comunicacion/noticia/taller-de-prevencion-integral-se-desarrollo-en-uteq',
        permanent: true,
      },
      {
        source: '/read/1/98',
        destination: '/comunicacion/noticia/docente-de-uteq-obtiene-doctorado-en-espana',
        permanent: true,
      },
      {
        source: '/read/1/99',
        destination: '/comunicacion/noticia/uteq-participara-en-festival-y-feria-agroecologica-campesina',
        permanent: true,
      },
      {
        source: '/read/1/100',
        destination: '/comunicacion/noticia/postulacion-de-becas-eloy-alfaro-2017',
        permanent: true,
      },
      {
        source: '/read/1/101',
        destination: '/comunicacion/noticia/docentes-de-uteq-en-segunda-jornada-curricular',
        permanent: true,
      },
      {
        source: '/read/1/102',
        destination: '/comunicacion/noticia/jornada-y-encuentro-de-graduados-se-desarrollo-en-uteq',
        permanent: true,
      },
      {
        source: '/read/1/103',
        destination: '/comunicacion/noticia/ffcc-ingenieria-celebro-noveno-aniversario',
        permanent: true,
      },
      {
        source: '/read/1/104',
        destination: '/comunicacion/noticia/carrera-de-sistemas-realizo-conferencia-internacional',
        permanent: true,
      },
      {
        source: '/read/1/105',
        destination: '/comunicacion/noticia/tributo-al-ruisenor-de-america-se-cumplio-en-uteq',
        permanent: true,
      },
      {
        source: '/read/1/106',
        destination: '/comunicacion/noticia/uteq-realizara-congreso-internacional-de-diseno-grafico-publicitario',
        permanent: true,
      },
      {
        source: '/read/1/107',
        destination: '/comunicacion/noticia/cultivo-de-peces-en-la-fcp',
        permanent: true,
      },
      {
        source: '/read/1/108',
        destination: '/comunicacion/noticia/asogan-sd-dono-toretes-a-uteq-para-proyectos-de-investigacion',
        permanent: true,
      },
      {
        source: '/read/1/109',
        destination: '/comunicacion/noticia/ued-brindo-seminario-internacional-en-uteq',
        permanent: true,
      },
      {
        source: '/read/1/110',
        destination: '/comunicacion/noticia/uteq-y-unemi-firman-convenio',
        permanent: true,
      },
      {
        source: '/read/1/111',
        destination: '/comunicacion/noticia/congreso-de-proteccion-forestal-se-dicto-en-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/112',
        destination: '/comunicacion/noticia/uteq-firma-convenio-con-senescyt',
        permanent: true,
      },
      {
        source: '/read/1/113',
        destination: '/comunicacion/noticia/representantes-de-mars-inc-visitaron-uteq',
        permanent: true,
      },
      {
        source: '/read/1/114',
        destination: '/comunicacion/noticia/cinco-proyectos-mas-de-rediseno-de-carreras-fueron-aprobados-por-el-ces',
        permanent: true,
      },
      {
        source: '/read/1/115',
        destination: '/comunicacion/noticia/uteq-recibe-reconocimiento-de-galardones-2017',
        permanent: true,
      },
      {
        source: '/read/1/116',
        destination: '/comunicacion/noticia/carrera-ecoturismo-entrego-areas-de-recreacion-a-sector-rural',
        permanent: true,
      },
      {
        source: '/read/1/117',
        destination: '/comunicacion/noticia/ued-entrega-portales-web-a-agricultores',
        permanent: true,
      },
      {
        source: '/read/1/118',
        destination: '/comunicacion/noticia/uteq-presente-en-feria-agroecologica-campesina',
        permanent: true,
      },
      {
        source: '/read/1/119',
        destination: '/comunicacion/noticia/stuteq-celebro-iv-aniversario',
        permanent: true,
      },
      {
        source: '/read/1/120',
        destination: '/comunicacion/noticia/uteq-inaugura-sala-de-consejo-universitario',
        permanent: true,
      },
      {
        source: '/read/1/121',
        destination: '/comunicacion/noticia/i-congreso-de-diseno-grafico-publicitario-en-uteq',
        permanent: true,
      },
      {
        source: '/read/1/122',
        destination: '/comunicacion/noticia/uteq-utb-y-u-de-granma-firmaron-convenio',
        permanent: true,
      },
      {
        source: '/read/1/123',
        destination: '/comunicacion/noticia/reunion-de-trabajo-de-rectora-subrogante-y-presidente-comision-evaluacion-interna-y-gestion-de-la-calidad-uteq-con-el-presidente-del-ceaaces',
        permanent: true,
      },
      {
        source: '/read/1/125',
        destination: '/comunicacion/noticia/facultad-de-ciencias-pecuarias-cumplio-26-anos-de-creacion',
        permanent: true,
      },
      {
        source: '/read/1/126',
        destination: '/comunicacion/noticia/capacitacion-de-directivos-empleados-y-trabajadores',
        permanent: true,
      },
      {
        source: '/read/1/127',
        destination: '/comunicacion/noticia/ued-celebro-18-anos-de-creacion',
        permanent: true,
      },
      {
        source: '/read/1/128',
        destination: '/comunicacion/noticia/fcp-realizo-jornadas-cientificas',
        permanent: true,
      },
      {
        source: '/read/1/129',
        destination: '/comunicacion/noticia/iniciaron-trabajos-de-remodelacion-en-el-auditorium-ing-carlos-cortaza',
        permanent: true,
      },
      {
        source: '/read/1/130',
        destination: '/comunicacion/noticia/posesion-de-nuevo-coordinador-de-la-carrera-ingenieria-en-alimentos',
        permanent: true,
      },
      {
        source: '/read/1/131',
        destination: '/comunicacion/noticia/lorenzo-figueredo-representante-oficial-de-u-granma',
        permanent: true,
      },
      {
        source: '/read/1/132',
        destination: '/comunicacion/noticia/docentes-de-uteq-participaron-en-encuentro-internacional-en-colombia',
        permanent: true,
      },
      {
        source: '/read/1/133',
        destination: '/comunicacion/noticia/campana-contra-el-trafico-de-animales-se-socializo-en-uteq',
        permanent: true,
      },
      {
        source: '/read/1/134',
        destination: '/comunicacion/noticia/escuteq-brindara-curso-para-licencia-tipo-a1',
        permanent: true,
      },
      {
        source: '/read/1/135',
        destination: '/comunicacion/noticia/nuevo-convenio-firman-senescyt-y-uteq',
        permanent: true,
      },
      {
        source: '/read/1/136',
        destination: '/comunicacion/noticia/la-revista-ciencia-y-tecnologia-uteq-actualiza-su-plataforma-editorial-ojs',
        permanent: true,
      },
      {
        source: '/read/1/137',
        destination: '/comunicacion/noticia/clausura-de-proyecto-de-vinculacion',
        permanent: true,
      },
      {
        source: '/read/1/138',
        destination: '/comunicacion/noticia/estudiantes-de-la-carrera-de-agronomia-aplican-el-sistema-de-clasificacion-de-los-suelos-segun-su-capacidad-de-uso',
        permanent: true,
      },
      {
        source: '/read/1/139',
        destination: '/comunicacion/noticia/cte-unidad-de-rescate-y-escuteq-brindaron-campana-de-educacion-vial',
        permanent: true,
      },
      {
        source: '/read/1/140',
        destination: '/comunicacion/noticia/casa-abierta-campana-no-a-la-violencia-contra-la-mujer',
        permanent: true,
      },
      {
        source: '/read/1/141',
        destination: '/comunicacion/noticia/break-musical-conquista-uteq',
        permanent: true,
      },
      {
        source: '/read/1/142',
        destination: '/comunicacion/noticia/olimpiadas-por-el-dia-del-economista',
        permanent: true,
      },
      {
        source: '/read/1/143',
        destination: '/comunicacion/noticia/ha-nacido-el-rey-cancion-navidena-se-realizo-en-uteq',
        permanent: true,
      },
      {
        source: '/read/1/145',
        destination: '/comunicacion/noticia/incremento-de-produccion-cientifica-y-obras-fisicas',
        permanent: true,
      },
      {
        source: '/read/1/146',
        destination: '/comunicacion/noticia/estudiantes-de-ingenieria-agronomica-capacitaron-a-productores-bananeros',
        permanent: true,
      },
      {
        source: '/read/1/147',
        destination: '/comunicacion/noticia/proyecto-de-vinculacion-en-unidad-educativa-heroes-del-41',
        permanent: true,
      },
      {
        source: '/read/1/149',
        destination: '/comunicacion/noticia/aet-celebro-33-anos-de-creacion',
        permanent: true,
      },
      {
        source: '/read/1/151',
        destination: '/comunicacion/noticia/senescyt-realizo-panel-sobre-consulta-popular-en-uteq',
        permanent: true,
      },
      {
        source: '/read/1/152',
        destination: '/comunicacion/noticia/uteq-socializo-sexta-convocatoria-focicyt',
        permanent: true,
      },
      {
        source: '/read/1/153',
        destination: '/comunicacion/noticia/comision-de-evaluacion-interna-y-gestion-de-la-calidad-de-la-uteq-socializo-modelos-actualizados-del-ceaaces-para-autoevaluacion-institucional-y-de-carreras',
        permanent: true,
      },
      {
        source: '/read/1/154',
        destination: '/comunicacion/noticia/rector-de-uteq-rindio-cuentas-2017',
        permanent: true,
      },
      {
        source: '/read/1/155',
        destination: '/comunicacion/noticia/uteq-cumplio-34-anos-de-vida-institucional',
        permanent: true,
      },
      {
        source: '/read/1/156',
        destination: '/comunicacion/noticia/facultad-de-ciencias-empresariales-cumplio-18-anos-de-creacion',
        permanent: true,
      },
      {
        source: '/read/1/158',
        destination: '/comunicacion/noticia/fce-realizo-conferencias-y-actividades-por-aniversario',
        permanent: true,
      },
      {
        source: '/read/1/159',
        destination: '/comunicacion/noticia/casa-abierta-por-aniversario-de-uteq',
        permanent: true,
      },
      {
        source: '/read/1/160',
        destination: '/comunicacion/noticia/uteq-y-mag-realizan-proyecto-de-reactivacion-del-cacao',
        permanent: true,
      },
      {
        source: '/read/1/161',
        destination: '/comunicacion/noticia/estudiantes-de-agronomia-visitaron-finca-maicera-de-la-zona-mocache-palenque',
        permanent: true,
      },
      {
        source: '/read/1/162',
        destination: '/comunicacion/noticia/estudiantes-ued-elaboran-productos-de-materia-prima-agropecuaria-con-valor-agregado',
        permanent: true,
      },
      {
        source: '/read/1/163',
        destination: '/comunicacion/noticia/estudiantes-de-agroindustria-capacitaron-a-comunidad-religiosa-en-elaboracion-de-productos',
        permanent: true,
      },
      {
        source: '/read/1/164',
        destination: '/comunicacion/noticia/estudiantes-de-agropecuarias-exponen-productos-a-base-de-plantas-medicinales',
        permanent: true,
      },
      {
        source: '/read/1/165',
        destination: '/comunicacion/noticia/unidad-de-posgrado-titulo-catorce-nuevos-magisters',
        permanent: true,
      },
      {
        source: '/read/1/166',
        destination: '/comunicacion/noticia/estudiantes-de-ingenieria-en-alimentos-fomentan-salud-y-nutricion',
        permanent: true,
      },
      {
        source: '/read/1/167',
        destination: '/comunicacion/noticia/congreso-internacional-en-derecho-constitucional',
        permanent: true,
      },
      {
        source: '/read/1/168',
        destination: '/comunicacion/noticia/nuevos-profesores-se-integran-a-uteq-en-jornada-curricular',
        permanent: true,
      },
      {
        source: '/read/1/169',
        destination: '/comunicacion/noticia/ministerio-del-ambiente-firmo-convenios-con-uteq',
        permanent: true,
      },
      {
        source: '/read/1/170',
        destination: '/comunicacion/noticia/inauguracion-de-maestria-en-contabilidad-y-auditoria',
        permanent: true,
      },
      {
        source: '/read/1/171',
        destination: '/comunicacion/noticia/uteq-firmo-convenio-con-ucsg',
        permanent: true,
      },
      {
        source: '/read/1/172',
        destination: '/comunicacion/noticia/corte-constitucional-y-uteq-firman-convenio',
        permanent: true,
      },
      {
        source: '/read/1/173',
        destination: '/comunicacion/noticia/feria-de-emprendimiento-se-vivio-en-uteq',
        permanent: true,
      },
      {
        source: '/read/1/174',
        destination: '/comunicacion/noticia/simulacro-de-evacuacion-en-uteq',
        permanent: true,
      },
      {
        source: '/read/1/177',
        destination: '/comunicacion/noticia/agropecuaria-ued-participo-de-un-congreso-en-galapagos',
        permanent: true,
      },
      {
        source: '/read/1/178',
        destination: '/comunicacion/noticia/futuros-ingenieros-en-marketing-realizaron-pasarela-de-modas',
        permanent: true,
      },
      {
        source: '/read/1/179',
        destination: '/comunicacion/noticia/ffcc-agrarias-con-nuevo-decano',
        permanent: true,
      },
      {
        source: '/read/1/180',
        destination: '/comunicacion/noticia/personal-de-uteq-se-realizaron-examenes-medicos-ocupacionales',
        permanent: true,
      },
      {
        source: '/read/1/182',
        destination: '/comunicacion/noticia/asambleista-por-los-rios-visito-uteq',
        permanent: true,
      },
      {
        source: '/read/1/183',
        destination: '/comunicacion/noticia/proyecto-de-vinculacion-culminado-en-centro-gerontologico-quevedeno',
        permanent: true,
      },
      {
        source: '/read/1/184',
        destination: '/comunicacion/noticia/mesa-redondaviolencia-de-genero',
        permanent: true,
      },
      {
        source: '/read/1/185',
        destination: '/comunicacion/noticia/uteq-dono-tanques-de-cloro-a-la-ldcq',
        permanent: true,
      },
      {
        source: '/read/1/186',
        destination: '/comunicacion/noticia/estudiantes-de-agroindustria-capacitaron-a-comunidad-religiosa',
        permanent: true,
      },
      {
        source: '/read/1/187',
        destination: '/comunicacion/noticia/uteq-fomentando-la-salud-nutricional',
        permanent: true,
      },
      {
        source: '/read/1/188',
        destination: '/comunicacion/noticia/premiacion-olimpiadas-intercarreras-2017',
        permanent: true,
      },
      {
        source: '/read/1/189',
        destination: '/comunicacion/noticia/gestion-empresarial-ued-vivieron-sus-iv-olimpiadas',
        permanent: true,
      },
      {
        source: '/read/1/190',
        destination: '/comunicacion/noticia/graduacion-de-peritos-avaluadores-en-uteq',
        permanent: true,
      },
      {
        source: '/read/1/192',
        destination: '/comunicacion/noticia/soluteq-sigue-formando-mediadores',
        permanent: true,
      },
      {
        source: '/read/1/193',
        destination: '/comunicacion/noticia/rendicion-de-cuentas-prodeuteq-2017',
        permanent: true,
      },
      {
        source: '/read/1/195',
        destination: '/comunicacion/noticia/senescyt-socializo-en-uteq-programa-de-investigacion-inedita',
        permanent: true,
      },
      {
        source: '/read/1/196',
        destination: '/comunicacion/noticia/tecnicos-de-senplades-dictan-taller-sobre-poa-en-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/197',
        destination: '/comunicacion/noticia/charla-en-ff-cc-agrarias-por-aniversario',
        permanent: true,
      },
      {
        source: '/read/1/198',
        destination: '/comunicacion/noticia/uteq-presente-en-xxvi-reunion-del-alpa-2018',
        permanent: true,
      },
      {
        source: '/read/1/199',
        destination: '/comunicacion/noticia/academicas-de-la-universidad-de-la-habana-visitaron-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/200',
        destination: '/comunicacion/noticia/futuros-profesionales-de-fce-firman-actas-luego-de-rendir-examen-complexivo',
        permanent: true,
      },
      {
        source: '/read/1/201',
        destination: '/comunicacion/noticia/uteq-y-policia-nacional-organizan-mesa-redonda',
        permanent: true,
      },
      {
        source: '/read/1/203',
        destination: '/comunicacion/noticia/mesa-redonda-sobre-violencia-de-genero-se-realizo-en-uteq',
        permanent: true,
      },
      {
        source: '/read/1/205',
        destination: '/comunicacion/noticia/mas-de-230-mil-plantas-de-cacao-producidas-por-la-uteq-en-espera-del-mag',
        permanent: true,
      },
      {
        source: '/read/1/206',
        destination: '/comunicacion/noticia/delegacion-uteq-presente-en-conferencia-regional-de-educacion-superior',
        permanent: true,
      },
      {
        source: '/read/1/207',
        destination: '/comunicacion/noticia/fcamb-participo-en-marcha-por-el-medio-ambiente',
        permanent: true,
      },
      {
        source: '/read/1/208',
        destination: '/comunicacion/noticia/curso-de-admision-y-nivelacion-inicio-en-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/209',
        destination: '/comunicacion/noticia/nuevo-cohorte-de-maestria-en-gestion-ambiental-se-inicio-en-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/210',
        destination: '/comunicacion/noticia/ministerio-del-ambiente-y-uteq-capacitan-a-lideres-comunitarios-en-temas-de-conservacion',
        permanent: true,
      },
      {
        source: '/read/1/211',
        destination: '/comunicacion/noticia/taller-de-redaccion-de-obras-academicas',
        permanent: true,
      },
      {
        source: '/read/1/212',
        destination: '/comunicacion/noticia/olimpiadas-interfacultades-estudiantiles-uteq-2018-en-accion',
        permanent: true,
      },
      {
        source: '/read/1/213',
        destination: '/comunicacion/noticia/facultad-de-ciencias-agrarias-se-alista-para-celebrar-sus-34-anos-de-creacion',
        permanent: true,
      },
      {
        source: '/read/1/214',
        destination: '/comunicacion/noticia/facultad-de-ciencias-ambientales-organiza-3-eventos-academicos',
        permanent: true,
      },
      {
        source: '/read/1/215',
        destination: '/comunicacion/noticia/miniferia-y-showroom-de-emprendimiento-se-realizara-en-uteq',
        permanent: true,
      },
      {
        source: '/read/1/216',
        destination: '/comunicacion/noticia/campana-de-deteccion-oportuna-del-cancer-se-realiza-en-uteq',
        permanent: true,
      },
      {
        source: '/read/1/217',
        destination: '/comunicacion/noticia/facultad-de-ciencias-ambientales-realizara-vii-jornada-academica',
        permanent: true,
      },
      {
        source: '/read/1/218',
        destination: '/comunicacion/noticia/facultad-de-ciencias-agrarias-celebro-34-anos',
        permanent: true,
      },
      {
        source: '/read/1/220',
        destination: '/comunicacion/noticia/facultad-de-ciencias-ambientales-celebro-xviii-aniversario',
        permanent: true,
      },
      {
        source: '/read/1/222',
        destination: '/comunicacion/noticia/facultad-de-ciencias-agrarias-tendra-nuevo-edificio-en-la-maria',
        permanent: true,
      },
      {
        source: '/read/1/223',
        destination: '/comunicacion/noticia/vii-jornada-academica-cientifica-ambiental-se-desarrollo-en-uteq',
        permanent: true,
      },
      {
        source: '/read/1/221',
        destination: '/comunicacion/noticia/proyectos-de-inversion-fueron-expuestos-en-uteq',
        permanent: true,
      },
      {
        source: '/read/1/225',
        destination: '/comunicacion/noticia/docentes-y-trabajadores-de-uteq-recibieron-capacitaciones',
        permanent: true,
      },
      {
        source: '/read/1/228',
        destination: '/comunicacion/noticia/congreso-internacional-en-derecho-constitucional-organiza-uteq',
        permanent: true,
      },
      {
        source: '/read/1/229',
        destination: '/comunicacion/noticia/ued-presento-feria-de-proyectos-de-las-carreras-de-sistemas-y-agropecuaria',
        permanent: true,
      },
      {
        source: '/read/1/230',
        destination: '/comunicacion/noticia/clausura-de-proyectos-de-vinculacion-de-estudiantes-de-contabilidad',
        permanent: true,
      },
      {
        source: '/read/1/231',
        destination: '/comunicacion/noticia/pasarela-ferretera-supero-expectativas',
        permanent: true,
      },
      {
        source: '/read/1/232',
        destination: '/comunicacion/noticia/fci-vivio-juegos-deportivos-por-aniversario',
        permanent: true,
      },
      {
        source: '/read/1/233',
        destination: '/comunicacion/noticia/master-class-de-desarrollo-local-y-territorial-se-dicto-en-uteq',
        permanent: true,
      },
      {
        source: '/read/1/234',
        destination: '/comunicacion/noticia/brigada-medica-a-favor-de-la-comunidad-quevedena',
        permanent: true,
      },
      {
        source: '/read/1/236',
        destination: '/comunicacion/noticia/la-uteq-graduo-a-nuevos-magisters',
        permanent: true,
      },
      {
        source: '/read/1/238',
        destination: '/comunicacion/noticia/docente-de-uteq-capacito-a-grupo-de-tecnicos-del-mag',
        permanent: true,
      },
      {
        source: '/read/1/239',
        destination: '/comunicacion/noticia/facultad-de-ciencias-de-la-ingenieria-celebro-su-decimo-aniversario',
        permanent: true,
      },
      {
        source: '/read/1/240',
        destination: '/comunicacion/noticia/simulacro-de-incendios-se-vivio-en-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/242',
        destination: '/comunicacion/noticia/servidores-de-la-uteq-recibieron-certificados-de-capacitacion-en-cali',
        permanent: true,
      },
      {
        source: '/read/1/244',
        destination: '/comunicacion/noticia/autoridades-de-uteq-entregaron-a-docentes-certificados-de-capacitacion-en-cuba',
        permanent: true,
      },
      {
        source: '/read/1/245',
        destination: '/comunicacion/noticia/docentes-de-uteq-recibieron-certificados-de-capacitaciones-en-mexico',
        permanent: true,
      },
      {
        source: '/read/1/247',
        destination: '/comunicacion/noticia/jornada-curricular-del-segundo-periodo-lectivo-se-cumplio-en-uteq',
        permanent: true,
      },
      {
        source: '/read/1/248',
        destination: '/comunicacion/noticia/congreso-de-derecho-constitucional-y-procesal-constitucional-se-realizo-en-uteq',
        permanent: true,
      },
      {
        source: '/read/1/249',
        destination: '/comunicacion/noticia/congreso-de-gestion-local-resultados-globales-2018-con-mas-de-200-asistentes',
        permanent: true,
      },
      {
        source: '/read/1/250',
        destination: '/comunicacion/noticia/facultad-de-ciencias-pecuarias-cumplio-xxvii-anos-de-creacion',
        permanent: true,
      },
      {
        source: '/read/1/251',
        destination: '/comunicacion/noticia/uteq-y-senescyt-firmaron-convenio-interinstitucional',
        permanent: true,
      },
      {
        source: '/read/1/252',
        destination: '/comunicacion/noticia/unidad-de-estudios-a-distancia-celebro-19-anos-de-creacion',
        permanent: true,
      },
      {
        source: '/read/1/253',
        destination: '/comunicacion/noticia/uteq-primer-lugar-en-congreso-internacional-biotecnologia',
        permanent: true,
      },
      {
        source: '/read/1/254',
        destination: '/comunicacion/noticia/docentes-investigadores-de-uteq-asistieron-a-conferencias-de-proyecto-care',
        permanent: true,
      },
      {
        source: '/read/1/256',
        destination: '/comunicacion/noticia/uteq-firma-convenio-de-vinculacion-academica-internacional',
        permanent: true,
      },
      {
        source: '/read/1/257',
        destination: '/comunicacion/noticia/feria-de-proyectos-se-realizo-en-finca-experimental-la-maria',
        permanent: true,
      },
      {
        source: '/read/1/258',
        destination: '/comunicacion/noticia/direccion-de-evaluacion-socializa-plan-de-desarrollo',
        permanent: true,
      },
      {
        source: '/read/1/259',
        destination: '/comunicacion/noticia/nuevos-programas-y-nuevos-cohortes-de-maestrias-en-uteq',
        permanent: true,
      },
      {
        source: '/read/1/260',
        destination: '/comunicacion/noticia/becas-estudiantiles-un-compromiso-que-se-cumple-en-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/261',
        destination: '/comunicacion/noticia/uteq-e-innovagro-firmaron-convenio-de-cooperacion',
        permanent: true,
      },
      {
        source: '/read/1/262',
        destination: '/comunicacion/noticia/carrera-de-licenciatura-en-enfermeria-inicio-clases',
        permanent: true,
      },
      {
        source: '/read/1/263',
        destination: '/comunicacion/noticia/1590-jovenes-iniciaron-clases-en-curso-de-admision',
        permanent: true,
      },
      {
        source: '/read/1/264',
        destination: '/comunicacion/noticia/servidores-de-la-uteq-recibieron-certificados-de-capacitacion-en-el-exterior',
        permanent: true,
      },
      {
        source: '/read/1/265',
        destination: '/comunicacion/noticia/docentes-de-la-fci-en-constante-capacitacion',
        permanent: true,
      },
      {
        source: '/read/1/266',
        destination: '/comunicacion/noticia/universitarias-reciben-charla-sobre-planificacion-familiar',
        permanent: true,
      },
      {
        source: '/read/1/267',
        destination: '/comunicacion/noticia/carrera-de-economia-realizo-juegos-deportivos-internos',
        permanent: true,
      },
      {
        source: '/read/1/268',
        destination: '/comunicacion/noticia/genesis-fue-la-ganadora-del-1er-festival-musical-en-uteq',
        permanent: true,
      },
      {
        source: '/read/1/270',
        destination: '/comunicacion/noticia/grupo-incuba-de-uteq-realizo-dos-eventos-academicos',
        permanent: true,
      },
      {
        source: '/read/1/271',
        destination: '/comunicacion/noticia/uteq-y-reybanpac-firmaron-convenio-de-cooperacion',
        permanent: true,
      },
      {
        source: '/read/1/272',
        destination: '/comunicacion/noticia/continuan-las-obras-en-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/273',
        destination: '/comunicacion/noticia/egresados-de-uteq-firmaron-actas-de-grado',
        permanent: true,
      },
      {
        source: '/read/1/274',
        destination: '/comunicacion/noticia/mag-y-uteq-renuevan-proceso-para-entrega-de-plantas-de-cacao',
        permanent: true,
      },
      {
        source: '/read/1/275',
        destination: '/comunicacion/noticia/carrera-de-ingenieria-agroindustrial-con-nueva-coordinadora',
        permanent: true,
      },
      {
        source: '/read/1/276',
        destination: '/comunicacion/noticia/uteq-y-agrimen-firmaron-convenio',
        permanent: true,
      },
      {
        source: '/read/1/277',
        destination: '/comunicacion/noticia/ambientales-expusieron-proyectos-de-vinculacion',
        permanent: true,
      },
      {
        source: '/read/1/278',
        destination: '/comunicacion/noticia/feria-por-el-dia-mundial-de-la-lucha-contra-el-sida',
        permanent: true,
      },
      {
        source: '/read/1/280',
        destination: '/comunicacion/noticia/maestra-de-la-escuela-de-danza-de-la-uteq-asistio-a-capacitacion-en-peru',
        permanent: true,
      },
      {
        source: '/read/1/281',
        destination: '/comunicacion/noticia/dirigentes-estudiantiles-de-uteq-socializan-sobre-sga',
        permanent: true,
      },
      {
        source: '/read/1/282',
        destination: '/comunicacion/noticia/aduteq-agasajo-a-sus-socios',
        permanent: true,
      },
      {
        source: '/read/1/283',
        destination: '/comunicacion/noticia/fci-y-carrera-de-enfermeria-agasajaron-a-ninos-por-las-fiestas-de-navidad',
        permanent: true,
      },
      {
        source: '/read/1/284',
        destination: '/comunicacion/noticia/estudiantes-de-gestion-empresarial-entregaron-canastas-a-varias-familias-quevedenas',
        permanent: true,
      },
      {
        source: '/read/1/285',
        destination: '/comunicacion/noticia/un-gimnasio-para-la-comunidad-universitaria',
        permanent: true,
      },
      {
        source: '/read/1/286',
        destination: '/comunicacion/noticia/estudiantes-de-escuteq-en-campana-en-contra-del-ruido',
        permanent: true,
      },
      {
        source: '/read/1/287',
        destination: '/comunicacion/noticia/aet-de-uteq-celebro-34-anos-de-creacion',
        permanent: true,
      },
      {
        source: '/read/1/288',
        destination: '/comunicacion/noticia/gala-navidena-merry-christmas',
        permanent: true,
      },
      {
        source: '/read/1/289',
        destination: '/comunicacion/noticia/olimpiadas-aet-por-34-anos-de-creacion',
        permanent: true,
      },
      {
        source: '/read/1/290',
        destination: '/comunicacion/noticia/seleccion-de-basquet-de-uteq-vicecampeon-en-festival-peruano',
        permanent: true,
      },
      {
        source: '/read/1/292',
        destination: '/comunicacion/noticia/uteq-jugo-por-un-nino-feliz',
        permanent: true,
      },
      {
        source: '/read/1/293',
        destination: '/comunicacion/noticia/fci-realizo-vinculacion',
        permanent: true,
      },
      {
        source: '/read/1/294',
        destination: '/comunicacion/noticia/carrera-de-contabilidad-y-auditoria-realizo-juegos-deportivos-interno',
        permanent: true,
      },
      {
        source: '/read/1/295',
        destination: '/comunicacion/noticia/cpa-ued-realizo-viii-olimpiadas-deportivas',
        permanent: true,
      },
      {
        source: '/read/1/296',
        destination: '/comunicacion/noticia/presidente-de-caces-visito-uteq-para-tratar-temas-del-proceso-de-evaluacion-institucional',
        permanent: true,
      },
      {
        source: '/read/1/298',
        destination: '/comunicacion/noticia/ceiac-realizo-reunion-de-trabajo-para-dar-a-conocer-el-informe-de-autoevaluacion-institucional-uteq-2018-y-acciones-de-mejora',
        permanent: true,
      },
      {
        source: '/read/1/299',
        destination: '/comunicacion/noticia/la-uteq-y-el-consejo-de-la-judicatura-firmaron-convenio',
        permanent: true,
      },
      {
        source: '/read/1/300',
        destination: '/comunicacion/noticia/uteq-suma-mas-docentes-con-grado-academico-de-phd',
        permanent: true,
      },
      {
        source: '/read/1/301',
        destination: '/comunicacion/noticia/eduardo-diaz-ocampo-el-2018-fue-un-ano-fructifero',
        permanent: true,
      },
      {
        source: '/read/1/302',
        destination: '/comunicacion/noticia/unidad-de-posgrado-inauguro-maestria-en-administracion-de-empresas',
        permanent: true,
      },
      {
        source: '/read/1/303',
        destination: '/comunicacion/noticia/senescyt-se-mantienen-los-mismos-cupos-para-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/304',
        destination: '/comunicacion/noticia/docentes-recibieron-capacitacion-sobre-base-de-datos-cientificos',
        permanent: true,
      },
      {
        source: '/read/1/305',
        destination: '/comunicacion/noticia/agricultores-y-estudiantes-en-charla-sobre-produccion-de-banano',
        permanent: true,
      },
      {
        source: '/read/1/306',
        destination: '/comunicacion/noticia/mas-de-800-participantes-en-congreso-internacional',
        permanent: true,
      },
      {
        source: '/read/1/307',
        destination: '/comunicacion/noticia/rector-de-uteq-rindio-cuentas-de-su-gestion-2018',
        permanent: true,
      },
      {
        source: '/read/1/308',
        destination: '/comunicacion/noticia/uteq-firmo-convenio-marco-con-la-universidad-de-cordoba',
        permanent: true,
      },
      {
        source: '/read/1/309',
        destination: '/comunicacion/noticia/fce-cerro-festividades-con-una-sesion-solemne-conmemorativa',
        permanent: true,
      },
      {
        source: '/read/1/311',
        destination: '/comunicacion/noticia/estudiantes-de-sistemas-entregaron-portales-web-a-agronegocios',
        permanent: true,
      },
      {
        source: '/read/1/312',
        destination: '/comunicacion/noticia/estudiantes-de-fcamb-crean-conciencia-hacia-una-cultura-ambiental',
        permanent: true,
      },
      {
        source: '/read/1/313',
        destination: '/comunicacion/noticia/integracion-deportiva-agroindustrias',
        permanent: true,
      },
      {
        source: '/read/1/314',
        destination: '/comunicacion/noticia/consorcio-de-responsabilidad-social-acogio-a-uteq',
        permanent: true,
      },
      {
        source: '/read/1/315',
        destination: '/comunicacion/noticia/minga-de-limpieza-en-las-riberas-del-rio-quevedo',
        permanent: true,
      },
      {
        source: '/read/1/316',
        destination: '/comunicacion/noticia/uteq-participo-en-evento-cientifico-en-eeuu',
        permanent: true,
      },
      {
        source: '/read/1/317',
        destination: '/comunicacion/noticia/universidades-estadounidenses-y-uteq-firmaron-convenio',
        permanent: true,
      },
      {
        source: '/read/1/318',
        destination: '/comunicacion/noticia/docentes-de-uteq-obtienen-titulo-de-phd-en-espana',
        permanent: true,
      },
      {
        source: '/read/1/319',
        destination: '/comunicacion/noticia/unidad-de-posgrado-de-la-uteq-inauguro-dos-maestrias',
        permanent: true,
      },
      {
        source: '/read/1/320',
        destination: '/comunicacion/noticia/ces-aprobo-nueva-maestria-para-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/321',
        destination: '/comunicacion/noticia/comerciantes-quevedenos-fueron-capacitados-por-futuros-ingenieros-industriales',
        permanent: true,
      },
      {
        source: '/read/1/322',
        destination: '/comunicacion/noticia/unir-y-uteq-suscriben-convenio-de-cooperacion-interinstitucional',
        permanent: true,
      },
      {
        source: '/read/1/323',
        destination: '/comunicacion/noticia/alianza-estrategica-entre-uteq-y-prodel',
        permanent: true,
      },
      {
        source: '/read/1/324',
        destination: '/comunicacion/noticia/estudiantes-de-ambientales-finalizaron-vinculacion-con-la-comunidad',
        permanent: true,
      },
      {
        source: '/read/1/326',
        destination: '/comunicacion/noticia/cgeiac-uteq-lleva-a-cabo-talleres-de-simulacion-de-evaluacion-externa',
        permanent: true,
      },
      {
        source: '/read/1/328',
        destination: '/comunicacion/noticia/liga-deportiva-cantonal-de-quevedo-y-uteq-firmaron-convenio',
        permanent: true,
      },
      {
        source: '/read/1/329',
        destination: '/comunicacion/noticia/direccion-academica-y-fci-con-nuevos-directivos',
        permanent: true,
      },
      {
        source: '/read/1/330',
        destination: '/comunicacion/noticia/estudiantes-de-ingenieria-industrial-conocen-nuevo-software',
        permanent: true,
      },
      {
        source: '/read/1/331',
        destination: '/comunicacion/noticia/facultad-de-ciencias-agrarias-con-nueva-edificacion',
        permanent: true,
      },
      {
        source: '/read/1/332',
        destination: '/comunicacion/noticia/uteq-graduo-nuevos-magisteres',
        permanent: true,
      },
      {
        source: '/read/1/334',
        destination: '/comunicacion/noticia/fiscalia-general-de-estado-dicto-charla-sobre-femicidio',
        permanent: true,
      },
      {
        source: '/read/1/336',
        destination: '/comunicacion/noticia/maestria-en-desarrollo-local-nueva-oferta-de-posgrado',
        permanent: true,
      },
      {
        source: '/read/1/337',
        destination: '/comunicacion/noticia/caces-y-uteq-coordinan-foro-internacional-de-ciencias-agropecuarias',
        permanent: true,
      },
      {
        source: '/read/1/339',
        destination: '/comunicacion/noticia/socializacion-de-proyecto-de-responsabilidad-social-en-uteq',
        permanent: true,
      },
      {
        source: '/read/1/340',
        destination: '/comunicacion/noticia/docentes-investigadores-de-uteq-asistieron-a-capacitacion-de-base-de-datos-scopus',
        permanent: true,
      },
      {
        source: '/read/1/341',
        destination: '/comunicacion/noticia/presentacion-oficial-de-la-seleccion-de-basquet-uteq-2019',
        permanent: true,
      },
      {
        source: '/read/1/342',
        destination: '/comunicacion/noticia/presidente-de-la-asamblea-nacional-realizo-una-visita-a-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/343',
        destination: '/comunicacion/noticia/coordinadores-de-carrera-de-fci-fueron-posesionados',
        permanent: true,
      },
      {
        source: '/read/1/344',
        destination: '/comunicacion/noticia/estudiantes-de-empresariales-recibieron-charla-sobre-educacion-financiera',
        permanent: true,
      },
      {
        source: '/read/1/345',
        destination: '/comunicacion/noticia/clausura-de-vinculacion-en-san-jacinto-del-bua',
        permanent: true,
      },
      {
        source: '/read/1/346',
        destination: '/comunicacion/noticia/uteq-oferta-nueva-maestria-en-agronomia',
        permanent: true,
      },
      {
        source: '/read/1/347',
        destination: '/comunicacion/noticia/uteq-se-prepara-para-evaluacion-institucional',
        permanent: true,
      },
      {
        source: '/read/1/348',
        destination: '/comunicacion/noticia/docentes-asistieron-a-curso-de-redaccion-de-texto-cientificos',
        permanent: true,
      },
      {
        source: '/read/1/349',
        destination: '/comunicacion/noticia/representante-de-la-universidad-de-granma-visito-uteq',
        permanent: true,
      },
      {
        source: '/read/1/350',
        destination: '/comunicacion/noticia/estudiantes-de-agroindustrias-iniciaron-proyecto-de-vinculacion-con-adultos-mayores',
        permanent: true,
      },
      {
        source: '/read/1/351',
        destination: '/comunicacion/noticia/uteq-desarrolla-investigacion-con-derivados-de-quitosano-en-la-produccion-de-hortalizas',
        permanent: true,
      },
      {
        source: '/read/1/352',
        destination: '/comunicacion/noticia/inauguracion-de-proyecto-de-vinculacion-con-el-gad-municipal-de-quevedo',
        permanent: true,
      },
      {
        source: '/read/1/353',
        destination: '/comunicacion/noticia/estudiantes-de-ued-en-proyecto-de-vinculacion',
        permanent: true,
      },
      {
        source: '/read/1/354',
        destination: '/comunicacion/noticia/break-musical-y-charlas-de-psicologia-en-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/355',
        destination: '/comunicacion/noticia/facultad-de-ciencias-agrarias-celebro-trigesimo-quinto-aniversario',
        permanent: true,
      },
      {
        source: '/read/1/356',
        destination: '/comunicacion/noticia/uteq-firmo-convenio-marco-de-cooperacion-con-agrocalidad',
        permanent: true,
      },
      {
        source: '/read/1/357',
        destination: '/comunicacion/noticia/inicio-maestria-en-desarrollo-local',
        permanent: true,
      },
      {
        source: '/read/1/358',
        destination: '/comunicacion/noticia/masiva-asistencia-en-congreso-latinoamericano-de-agronomia',
        permanent: true,
      },
      {
        source: '/read/1/359',
        destination: '/comunicacion/noticia/seminario-taller-cultivo-de-cacao',
        permanent: true,
      },
      {
        source: '/read/1/361',
        destination: '/comunicacion/noticia/vinculacion-de-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/362',
        destination: '/comunicacion/noticia/unidad-de-bienestar-universitario-brindo-charla-a-docentes',
        permanent: true,
      },
      {
        source: '/read/1/363',
        destination: '/comunicacion/noticia/la-produccion-cientifica-de-la-uteq-presenta-nuevo-libro-en-el-area-del-derecho',
        permanent: true,
      },
      {
        source: '/read/1/364',
        destination: '/comunicacion/noticia/inauguracion-del-laboratorio-de-desarrollo-de-software',
        permanent: true,
      },
      {
        source: '/read/1/365',
        destination: '/comunicacion/noticia/uteq-dono-canecas-de-cloro-a-la-ldcq',
        permanent: true,
      },
      {
        source: '/read/1/366',
        destination: '/comunicacion/noticia/estudiantes-siembran-especies-forestales-en-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/367',
        destination: '/comunicacion/noticia/se-eligio-el-mejor-bolso-ecologico-uteq',
        permanent: true,
      },
      {
        source: '/read/1/368',
        destination: '/comunicacion/noticia/trabajadores-recibieron-charla-uso-y-consumo-de-alcohol-y-drogas',
        permanent: true,
      },
      {
        source: '/read/1/370',
        destination: '/comunicacion/noticia/inauguracion-de-olimpiadas-de-docentes-copa-dr-eduardo-diaz',
        permanent: true,
      },
      {
        source: '/read/1/371',
        destination: '/comunicacion/noticia/comunicado-1',
        permanent: true,
      },
      {
        source: '/read/1/372',
        destination: '/comunicacion/noticia/facultad-de-ciencias-ambientales-culmino-festividades-con-sesion-solemne',
        permanent: true,
      },
      {
        source: '/read/1/373',
        destination: '/comunicacion/noticia/uteq-firmo-convenios-con-universidades-de-china',
        permanent: true,
      },
      {
        source: '/read/1/374',
        destination: '/comunicacion/noticia/unidad-de-posgrado-realizo-taller-de-estadistica-descriptiva',
        permanent: true,
      },
      {
        source: '/read/1/375',
        destination: '/comunicacion/noticia/foro-sobre-un-proyecto-focicyt-de-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/376',
        destination: '/comunicacion/noticia/fc-pecuarias-organizo-conferencia-sobre-fusarium-raza-4',
        permanent: true,
      },
      {
        source: '/read/1/377',
        destination: '/comunicacion/noticia/posgrado-incorporo-nuevos-magisteres',
        permanent: true,
      },
      {
        source: '/read/1/378',
        destination: '/comunicacion/noticia/fcamb-graduo-49-profesionales',
        permanent: true,
      },
      {
        source: '/read/1/379',
        destination: '/comunicacion/noticia/incorporacion-de-131-nuevos-profesionales-de-fce',
        permanent: true,
      },
      {
        source: '/read/1/380',
        destination: '/comunicacion/noticia/pecuarias-entrego-32-flamantes-ingenieros',
        permanent: true,
      },
      {
        source: '/read/1/381',
        destination: '/comunicacion/noticia/ued-graduo-207-nuevos-profesionales',
        permanent: true,
      },
      {
        source: '/read/1/382',
        destination: '/comunicacion/noticia/graduacion-de-nuevos-ingenieros-de-fci',
        permanent: true,
      },
      {
        source: '/read/1/383',
        destination: '/comunicacion/noticia/estudiantes-de-telematica-recibieron-certificados-de-capacitaciones-en-cisco',
        permanent: true,
      },
      {
        source: '/read/1/384',
        destination: '/comunicacion/noticia/estudiantes-de-uteq-recibieron-charla-sobre-diseno-y-arquitectura',
        permanent: true,
      },
      {
        source: '/read/1/385',
        destination: '/comunicacion/noticia/charla-sobre-planificacion-familiarpara-estudiantes-de-fci',
        permanent: true,
      },
      {
        source: '/read/1/386',
        destination: '/comunicacion/noticia/campana-de-cultura-organizacional-de-la-fce',
        permanent: true,
      },
      {
        source: '/read/1/387',
        destination: '/comunicacion/noticia/gestion-ambiental-inicio-proyecto-didactico',
        permanent: true,
      },
      {
        source: '/read/1/388',
        destination: '/comunicacion/noticia/uteq-firmo-convenio-con-el-centro-agricola-de-buena-fe',
        permanent: true,
      },
      {
        source: '/read/1/389',
        destination: '/comunicacion/noticia/estudiantes-de-ingenieria-industrial-culminan-proyecto-de-vinculacion',
        permanent: true,
      },
      {
        source: '/read/1/390',
        destination: '/comunicacion/noticia/carrera-de-sistemas-de-la-ued-clausura-proyecto-de-vinculacion',
        permanent: true,
      },
      {
        source: '/read/1/391',
        destination: '/comunicacion/noticia/gestion-empresarial-ued-inauguro-proyecto-de-vinculacion',
        permanent: true,
      },
      {
        source: '/read/1/392',
        destination: '/comunicacion/noticia/cpa-culmina-proyecto-de-vinculacion',
        permanent: true,
      },
      {
        source: '/read/1/393',
        destination: '/comunicacion/noticia/charla-de-prevencion-de-uso-de-drogas',
        permanent: true,
      },
      {
        source: '/read/1/394',
        destination: '/comunicacion/noticia/ix-jornada-ecoambiental-se-desarrollo-en-uteq',
        permanent: true,
      },
      {
        source: '/read/1/395',
        destination: '/comunicacion/noticia/carrera-de-marketing-realizo-4to-show-room',
        permanent: true,
      },
      {
        source: '/read/1/396',
        destination: '/comunicacion/noticia/estudiantes-de-ingenieria-en-alimentos-realizaron-una-feria',
        permanent: true,
      },
      {
        source: '/read/1/397',
        destination: '/comunicacion/noticia/estudiantes-de-uteq-recibieron-charla-sobre-emprendimiento-sostenible-y-biocomercio',
        permanent: true,
      },
      {
        source: '/read/1/398',
        destination: '/comunicacion/noticia/intensa-movilidad-estudiantil-desarrollo-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/399',
        destination: '/comunicacion/noticia/ingenieria-industrial-en-jornada-deportiva',
        permanent: true,
      },
      {
        source: '/read/1/400',
        destination: '/comunicacion/noticia/break-artistico-un-deleite-para-la-comunidad-universitaria',
        permanent: true,
      },
      {
        source: '/read/1/401',
        destination: '/comunicacion/noticia/fci-celebro-xi-anos-de-creacion',
        permanent: true,
      },
      {
        source: '/read/1/402',
        destination: '/comunicacion/noticia/comunicado-2',
        permanent: true,
      },
      {
        source: '/read/1/403',
        destination: '/comunicacion/noticia/uteq-y-caces-fomentan-formacion-profesional-en-ciencias-agricolas',
        permanent: true,
      },
      {
        source: '/read/1/404',
        destination: '/comunicacion/noticia/uteq-y-gobierno-provincial-de-los-rios-firmaron-convenio',
        permanent: true,
      },
      {
        source: '/read/1/405',
        destination: '/comunicacion/noticia/maestria-en-agroecologia-y-desarrollo-sostenible',
        permanent: true,
      },
      {
        source: '/read/1/406',
        destination: '/comunicacion/noticia/congreso-en-derecho-procesal-penal-con-mas-de-700-asistentes',
        permanent: true,
      },
      {
        source: '/read/1/410',
        destination: '/comunicacion/noticia/uteq-inicio-maestria-en-agronomia',
        permanent: true,
      },
      {
        source: '/read/1/413',
        destination: '/comunicacion/noticia/docentes-de-la-uteq-asistieron-a-jornadas-curriculares',
        permanent: true,
      },
      {
        source: '/read/1/414',
        destination: '/comunicacion/noticia/uteq-participa-en-proyecto-internacional-sobre-reactivacion-economica',
        permanent: true,
      },
      {
        source: '/read/1/415',
        destination: '/comunicacion/noticia/evaluadores-del-caces-realizaron-visita-de-verificacion-tecnica-a-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/416',
        destination: '/comunicacion/noticia/ciencias-pecuarias-aportando-al-fortalecimiento-de-la-investigacion-en-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/417',
        destination: '/comunicacion/noticia/uteq-avanza-con-proyecto-de-investigacion-en-peces',
        permanent: true,
      },
      {
        source: '/read/1/418',
        destination: '/comunicacion/noticia/estudiantes-representaron-a-la-uteq-en-concurso-de-robotica',
        permanent: true,
      },
      {
        source: '/read/1/419',
        destination: '/comunicacion/noticia/bailoterapia-y-gimnasiodiversion-y-salud-en-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/420',
        destination: '/comunicacion/noticia/personal-de-bienestar-universitario-socializa-sus-servicios',
        permanent: true,
      },
      {
        source: '/read/1/421',
        destination: '/comunicacion/noticia/estudiantes-de-agrarias-presentes-en-evento-academico-en-salinas',
        permanent: true,
      },
      {
        source: '/read/1/422',
        destination: '/comunicacion/noticia/foro-interactivoautoestima-y-liderazgo-profesional',
        permanent: true,
      },
      {
        source: '/read/1/423',
        destination: '/comunicacion/noticia/estudiantes-de-uteq-elaboraron-planes-de-emergencia-en-escuelas-municipales',
        permanent: true,
      },
      {
        source: '/read/1/424',
        destination: '/comunicacion/noticia/rector-suscribio-convenios-en-espana',
        permanent: true,
      },
      {
        source: '/read/1/425',
        destination: '/comunicacion/noticia/biblioteca-general-esta-renovada',
        permanent: true,
      },
      {
        source: '/read/1/426',
        destination: '/comunicacion/noticia/1894-estudiantes-iniciaron-clases-en-el-curso-de-admision-y-nivelacion',
        permanent: true,
      },
      {
        source: '/read/1/427',
        destination: '/comunicacion/noticia/docentes-de-nivelacion-asistieron-a-capacitacion-previo-al-inicio-de-clases',
        permanent: true,
      },
      {
        source: '/read/1/428',
        destination: '/comunicacion/noticia/carrera-de-enfermeria-modalidad-presencial-cumplio-primer-ano-de-creacion',
        permanent: true,
      },
      {
        source: '/read/1/429',
        destination: '/comunicacion/noticia/uteq-firmo-convenio-con-universidad-de-milagro',
        permanent: true,
      },
      {
        source: '/read/1/431',
        destination: '/comunicacion/noticia/uteq-socializo-septima-convocatoria-focicyt',
        permanent: true,
      },
      {
        source: '/read/1/432',
        destination: '/comunicacion/noticia/universidad-regional-con-caracter-nacional-y-proyeccion-internacional36-anos-uteq',
        permanent: true,
      },
      {
        source: '/read/1/434',
        destination: '/comunicacion/noticia/posesion-de-autoridades-de-la-uteq-se-realizo-via-online',
        permanent: true,
      },
      {
        source: '/read/1/435',
        destination: '/comunicacion/noticia/estudiantes-de-uteq-participaron-en-concursos-de-robotica-y-murales',
        permanent: true,
      },
      {
        source: '/read/1/436',
        destination: '/comunicacion/noticia/jornadas-de-conferencias-se-realizaron-en-uteq',
        permanent: true,
      },
      {
        source: '/read/1/437',
        destination: '/comunicacion/noticia/isiso-realizo-varios-simulacros-de-evacuacion-ante-sismos',
        permanent: true,
      },
      {
        source: '/read/1/438',
        destination: '/comunicacion/noticia/estudiantes-de-ambientales-plantaron-10000-arboles',
        permanent: true,
      },
      {
        source: '/read/1/439',
        destination: '/comunicacion/noticia/universidad-estatal-con-infraestructura-vanguardista',
        permanent: true,
      },
      {
        source: '/read/1/440',
        destination: '/comunicacion/noticia/uteq-avanza-hacia-la-excelencia-academica',
        permanent: true,
      },
      {
        source: '/read/1/441',
        destination: '/comunicacion/noticia/ingenio-la-nueva-propuesta-de-divulgacion-cientifica-de-ingenieria',
        permanent: true,
      },
      {
        source: '/read/1/442',
        destination: '/comunicacion/noticia/uteq-entre-las-primeras-universidades-en-ejecucion-presupuestaria',
        permanent: true,
      },
      {
        source: '/read/1/443',
        destination: '/comunicacion/noticia/uteq-y-universidad-de-lieja-promueven-investigacion-para-determinar-caracteristicas-farmacologicas-del-cacao',
        permanent: true,
      },
      {
        source: '/read/1/444',
        destination: '/comunicacion/noticia/uteq-llevara-a-cabo-el-primer-torneo-de-ajedrez-absoluto-online',
        permanent: true,
      },
      {
        source: '/read/1/445',
        destination: '/comunicacion/noticia/retorno-a-campus-universitario-sera-abordado-en-foro-virtual',
        permanent: true,
      },
      {
        source: '/read/1/446',
        destination: '/comunicacion/noticia/primer-torneo-de-ajedrez-absoluto-en-la-uteq-2020',
        permanent: true,
      },
      {
        source: '/read/1/447',
        destination: '/comunicacion/noticia/webinar-internacional-en-diseno-grafico-organizo-uteq',
        permanent: true,
      },
      {
        source: '/read/1/448',
        destination: '/comunicacion/noticia/webinarmedidas-de-prevencion-ante-el-covid-19-en-la-fci-uteq',
        permanent: true,
      },
      {
        source: '/read/1/449',
        destination: '/comunicacion/noticia/uteq-realizara-un-nuevo-plan-estrategico-de-desarrollo-institucional-pedi-2021-2025',
        permanent: true,
      },
      {
        source: '/read/1/450',
        destination: '/comunicacion/noticia/fci-celebro-xii-anos-de-creacion-mediante-reunion-virtual',
        permanent: true,
      },
      {
        source: '/read/1/451',
        destination: '/comunicacion/noticia/proceso-de-presentacion-del-informe-de-rendicion-de-cuentas-del-rector-2019',
        permanent: true,
      },
      {
        source: '/read/1/452',
        destination: '/comunicacion/noticia/uteq-trabaja-en-un-nuevo-plan-estrategico-de-desarrollo-institucional-pedi-2021-2025',
        permanent: true,
      },
      {
        source: '/read/1/453',
        destination: '/comunicacion/noticia/con-el-98-de-ejecucion-presupuestaria-el-rector-de-la-uteq-rindio-cuentas-de-su-gestion-2019',
        permanent: true,
      },
      {
        source: '/read/1/454',
        destination: '/comunicacion/noticia/la-uteq-otorgara-1000-ayudas-economicas-a-estudiantes',
        permanent: true,
      },
      {
        source: '/read/1/455',
        destination: '/comunicacion/noticia/lo-hicimos-de-nuevo-oficialmente-uteq-acreditada',
        permanent: true,
      },
      {
        source: '/read/1/456',
        destination: '/comunicacion/noticia/uteq-acreditada-por-5-anos',
        permanent: true,
      },
      {
        source: '/read/1/457',
        destination: '/comunicacion/noticia/maestria-en-biotecnologia-fue-aprobada-por-el-ces',
        permanent: true,
      },
      {
        source: '/read/1/458',
        destination: '/comunicacion/noticia/continua-elaboracion-del-plan-estrategico-de-desarrollo-institucional',
        permanent: true,
      },
      {
        source: '/read/1/459',
        destination: '/comunicacion/noticia/se-fortalece-la-investigacion-cientifica-en-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/460',
        destination: '/comunicacion/noticia/homenaje-al-pasillo-ecuatoriano',
        permanent: true,
      },
      {
        source: '/read/1/461',
        destination: '/comunicacion/noticia/maestria-en-desarrollo-local-inicio-su-primera-cohorte',
        permanent: true,
      },
      {
        source: '/read/1/462',
        destination: '/comunicacion/noticia/convenio-con-la-prefectura-de-los-rios',
        permanent: true,
      },
      {
        source: '/read/1/463',
        destination: '/comunicacion/noticia/convenio-con-el-gad-municipal-de-quevedo',
        permanent: true,
      },
      {
        source: '/read/1/464',
        destination: '/comunicacion/noticia/caces-entrego-certificado-de-acreditacion-institucional-a-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/465',
        destination: '/comunicacion/noticia/veintinueve-anos-de-creacion-fcp',
        permanent: true,
      },
      {
        source: '/read/1/466',
        destination: '/comunicacion/noticia/uteq-y-gad-de-valencia-firmaron-convenio',
        permanent: true,
      },
      {
        source: '/read/1/467',
        destination: '/comunicacion/noticia/importante-investigacion-para-productores-de-melina-se-realizo-en-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/468',
        destination: '/comunicacion/noticia/cinco-asociaciones-capacitadas-por-estudiantes-de-uteq',
        permanent: true,
      },
      {
        source: '/read/1/469',
        destination: '/comunicacion/noticia/fumigacion-con-drone',
        permanent: true,
      },
      {
        source: '/read/1/470',
        destination: '/comunicacion/noticia/mas-de-1200-participantes-en-el-cidu-2020',
        permanent: true,
      },
      {
        source: '/read/1/471',
        destination: '/comunicacion/noticia/se-profundiza-la-investigacion-en-cultivos-de-quinoa',
        permanent: true,
      },
      {
        source: '/read/1/472',
        destination: '/comunicacion/noticia/caracterizacion-de-la-biodiversidad-de-phytophthora-spp-y-rizobacterias',
        permanent: true,
      },
      {
        source: '/read/1/473',
        destination: '/comunicacion/noticia/1200-personas-capacitadas-en-manejo-de-cultivos',
        permanent: true,
      },
      {
        source: '/read/1/474',
        destination: '/comunicacion/noticia/uteq-y-cefove-firmaron-convenio',
        permanent: true,
      },
      {
        source: '/read/1/475',
        destination: '/comunicacion/noticia/uteq-elabora-plan-de-aseguramiento-de-la-calidad',
        permanent: true,
      },
      {
        source: '/read/1/476',
        destination: '/comunicacion/noticia/iii-festival-universitario-de-musica-2020',
        permanent: true,
      },
      {
        source: '/read/1/477',
        destination: '/comunicacion/noticia/festival-navideno-mi-primera-navidad',
        permanent: true,
      },
      {
        source: '/read/1/478',
        destination: '/comunicacion/noticia/futuros-profesionales-firman-actas-de-grado',
        permanent: true,
      },
      {
        source: '/read/1/479',
        destination: '/comunicacion/noticia/proyecto-de-sostenibilidad-se-socializo-en-uteq',
        permanent: true,
      },
      {
        source: '/read/1/480',
        destination: '/comunicacion/noticia/estudiantes-de-uteq-rindieron-examen-complexivo',
        permanent: true,
      },
      {
        source: '/read/1/481',
        destination: '/comunicacion/noticia/uteq-conversatorio-ansiedad-y-depresion-en-tiempos-de-pandemia',
        permanent: true,
      },
      {
        source: '/read/1/482',
        destination: '/comunicacion/noticia/graduados-2020',
        permanent: true,
      },
      {
        source: '/read/1/483',
        destination: '/comunicacion/noticia/queridos-utequsinos',
        permanent: true,
      },
      {
        source: '/read/1/484',
        destination: '/comunicacion/noticia/proyecto-de-cultivo-de-peces-beneficia-a-poblacion-de-zonas-rurales',
        permanent: true,
      },
      {
        source: '/read/1/485',
        destination: '/comunicacion/noticia/la-ciencia-de-datos-en-escenarios-complejos',
        permanent: true,
      },
      {
        source: '/read/1/486',
        destination: '/comunicacion/noticia/estudios-para-fortalecer-emprendimientos-agroturisticos-en-quevedo-y-zonas-de-influencia-',
        permanent: true,
      },
      {
        source: '/read/1/487',
        destination: '/comunicacion/noticia/invitacion-a-la-simulacion-conferencia-de-las-naciones-unidas-sobre-el-cambio-climatico-cop26',
        permanent: true,
      },
      {
        source: '/read/1/489',
        destination: '/comunicacion/noticia/socializacion-de-resultados-del-proyecto-de-vinculacion',
        permanent: true,
      },
      {
        source: '/read/1/490',
        destination: '/comunicacion/noticia/bolsa-de-valores-de-quito-firmo-convenio-con-uteq',
        permanent: true,
      },
      {
        source: '/read/1/491',
        destination: '/comunicacion/noticia/xxi-anos-cumplio-la-facultad-de-ciencias-empresariales',
        permanent: true,
      },
      {
        source: '/read/1/492',
        destination: '/comunicacion/noticia/aprovechamiento-de-almendras-de-cacao-infestadas-con-monilla-para-la-obtencion-de-derivados-agroindustriales',
        permanent: true,
      },
      {
        source: '/read/1/495',
        destination: '/comunicacion/noticia/uteq-oferta-tres-nuevos-programas-de-maestrias',
        permanent: true,
      },
      {
        source: '/read/1/493',
        destination: '/comunicacion/noticia/impactos-potenciales-del-cambio-climatico-para-el-cultivo-de-cacao-en-ecuador-y-como-mitigarlo',
        permanent: true,
      },
      {
        source: '/read/1/494',
        destination: '/comunicacion/noticia/3000-beneficiarios-en-proyectos-de-vinculacion-de-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/496',
        destination: '/comunicacion/noticia/unidad-de-posgrado-entrego-veintiseis-nuevos-magisteres',
        permanent: true,
      },
      {
        source: '/read/1/497',
        destination: '/comunicacion/noticia/especial-de-san-valentin-para-utequsinos',
        permanent: true,
      },
      {
        source: '/read/1/498',
        destination: '/comunicacion/noticia/becario-ecuatoriano',
        permanent: true,
      },
      {
        source: '/read/1/499',
        destination: '/comunicacion/noticia/reencuentro-de-graduados-de-facultad-de-ciencias-agrarias-2021',
        permanent: true,
      },
      {
        source: '/read/1/500',
        destination: '/comunicacion/noticia/dia-de-la-mujerla-ingenieria-industrial-no-es-solo-para-los-hombres',
        permanent: true,
      },
      {
        source: '/read/1/501',
        destination: '/comunicacion/noticia/102-nuevos-graduados-se-incorporan-a-las-filas-profesionales',
        permanent: true,
      },
      {
        source: '/read/1/502',
        destination: '/comunicacion/noticia/webinar-internacionalcarrera-de-ingenieria-industrial',
        permanent: true,
      },
      {
        source: '/read/1/503',
        destination: '/comunicacion/noticia/uteq-y-unir-relaciones-academicas-que-se-fortalecen',
        permanent: true,
      },
      {
        source: '/read/1/504',
        destination: '/comunicacion/noticia/la-uteq-elabora-el-plan-de-aseguramiento-de-la-calidad-y-lo-remite-al-caces',
        permanent: true,
      },
      {
        source: '/read/1/505',
        destination: '/comunicacion/noticia/viceministro-de-produccion-e-industrias-brindara-conferencias-a-estudiantes-de-fci',
        permanent: true,
      },
      {
        source: '/read/1/506',
        destination: '/comunicacion/noticia/unidad-de-titulacionentrega-de-horarios-para-examen-complexivo-y-proyectos-de-investigacion',
        permanent: true,
      },
      {
        source: '/read/1/507',
        destination: '/comunicacion/noticia/fce-tiene-nuevos-graduados',
        permanent: true,
      },
      {
        source: '/read/1/508',
        destination: '/comunicacion/noticia/665-jovenes-rindieron-el-eaes-en-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/509',
        destination: '/comunicacion/noticia/firmamos-convenios-para-el-desarrollo',
        permanent: true,
      },
      {
        source: '/read/1/510',
        destination: '/comunicacion/noticia/empleados-y-trabajadores-de-la-uteq-se-sometieron-a-pruebas-rapidas-de-covid-19',
        permanent: true,
      },
      {
        source: '/read/1/511',
        destination: '/comunicacion/noticia/uteq-y-cisco-invitan-a-participar-en-el-curso-de-emprendimiento',
        permanent: true,
      },
      {
        source: '/read/1/512',
        destination: '/comunicacion/noticia/curso-iot-internet-de-las-cosas',
        permanent: true,
      },
      {
        source: '/read/1/513',
        destination: '/comunicacion/noticia/evaluacion-experimental-de-probioticos-en-el-cultivo-de-langosta-de-agua-dulce',
        permanent: true,
      },
      {
        source: '/read/1/514',
        destination: '/comunicacion/noticia/52-personas-beneficiadas-con-proyecto-de-vinculacion-en-quevedo',
        permanent: true,
      },
      {
        source: '/read/1/515',
        destination: '/comunicacion/noticia/designaron-nuevos-directivos',
        permanent: true,
      },
      {
        source: '/read/1/516',
        destination: '/comunicacion/noticia/nuevas-facultades-en-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/518',
        destination: '/comunicacion/noticia/comienzan-las-jornadas-de-planificacion-curricular',
        permanent: true,
      },
      {
        source: '/read/1/519',
        destination: '/comunicacion/noticia/seguiremos-cerca-de-ti',
        permanent: true,
      },
      {
        source: '/read/1/520',
        destination: '/comunicacion/noticia/matriculas-2021-2022-ppa',
        permanent: true,
      },
      {
        source: '/read/1/521',
        destination: '/comunicacion/noticia/nuevo-director-de-investigacion',
        permanent: true,
      },
      {
        source: '/read/1/522',
        destination: '/comunicacion/noticia/captura-y-conservacion-de-ejemplares-reproductores',
        permanent: true,
      },
      {
        source: '/read/1/523',
        destination: '/comunicacion/noticia/estudiantes-de-telematica-desarrollaron-app',
        permanent: true,
      },
      {
        source: '/read/1/524',
        destination: '/comunicacion/noticia/uteq-desarrolla-programa-de-apicultura',
        permanent: true,
      },
      {
        source: '/read/1/525',
        destination: '/comunicacion/noticia/festejamos-a-mama',
        permanent: true,
      },
      {
        source: '/read/1/526',
        destination: '/comunicacion/noticia/fortalecemos-los-conocimientos-de-nuestros-docentes-en-metodologia-y-tecnicas-para-la-educacion-en-la-linea',
        permanent: true,
      },
      {
        source: '/read/1/527',
        destination: '/comunicacion/noticia/aqui-comienza-la-mejor-historia',
        permanent: true,
      },
      {
        source: '/read/1/528',
        destination: '/comunicacion/noticia/siempre-cerca-de-ti',
        permanent: true,
      },
      {
        source: '/read/1/529',
        destination: '/comunicacion/noticia/deliberacion-publica-del-informe-de-rendicion-de-cuentas',
        permanent: true,
      },
      {
        source: '/read/1/530',
        destination: '/comunicacion/noticia/inicio-de-clases-2021-2022',
        permanent: true,
      },
      {
        source: '/read/1/531',
        destination: '/comunicacion/noticia/matriculas-para-nivelacion-2021-2022-ppa',
        permanent: true,
      },
      {
        source: '/read/1/532',
        destination: '/comunicacion/noticia/uteq-realizara-el-i-congreso-internacional-de-posgrado-cipos-2021',
        permanent: true,
      },
      {
        source: '/read/1/533',
        destination: '/comunicacion/noticia/simulacro-de-incendio-para-laboratoristas-de-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/534',
        destination: '/comunicacion/noticia/microsoft-office-365-ahora-disponible-para-comunidad-de-uteq',
        permanent: true,
      },
      {
        source: '/read/1/536',
        destination: '/comunicacion/noticia/deteccion-de-bacterias-patogenas-en-peces-comerciales-de-agua-dulce',
        permanent: true,
      },
      {
        source: '/read/1/535',
        destination: '/comunicacion/noticia/plan-estrategico-institucional-estara-listo-en-junio-2021',
        permanent: true,
      },
      {
        source: '/read/1/537',
        destination: '/comunicacion/noticia/uteq-y-direccion-de-desarrollo-social-de-quevedo-firmaron-convenio',
        permanent: true,
      },
      {
        source: '/read/1/538',
        destination: '/comunicacion/noticia/uteq-construye-plan-de-sostenibilidad',
        permanent: true,
      },
      {
        source: '/read/1/539',
        destination: '/comunicacion/noticia/nuevo-director-de-vinculacion',
        permanent: true,
      },
      {
        source: '/read/1/540',
        destination: '/comunicacion/noticia/se-ejecuta-proyecto-de-aprovechamiento-de-materia-prima-para-elaborar-productos-agricolas',
        permanent: true,
      },
      {
        source: '/read/1/541',
        destination: '/comunicacion/noticia/todo-un-exito-el-congreso-internacional-de-posgrado',
        permanent: true,
      },
      {
        source: '/read/1/542',
        destination: '/comunicacion/noticia/la-transicion-ecologica',
        permanent: true,
      },
      {
        source: '/read/1/543',
        destination: '/comunicacion/noticia/uteq-incrementa-a-1050-las-ayudas-economicas',
        permanent: true,
      },
      {
        source: '/read/1/544',
        destination: '/comunicacion/noticia/el-bitcoin-una-alternativa',
        permanent: true,
      },
      {
        source: '/read/1/545',
        destination: '/comunicacion/noticia/plataforma-virtual-para-muestras-de-herbario-y-xiloteca',
        permanent: true,
      },
      {
        source: '/read/1/546',
        destination: '/comunicacion/noticia/convocatoria-a-concurso-de-merito-y-oposicion',
        permanent: true,
      },
      {
        source: '/read/1/547',
        destination: '/comunicacion/noticia/impacto-potencial-de-diferentes-escenarios-de-cambio-climatico-2021-junio',
        permanent: true,
      },
      {
        source: '/read/1/548',
        destination: '/comunicacion/noticia/estudiantes-de-ingenieria-industrial-iniciaron-proyecto-de-vinculacion',
        permanent: true,
      },
      {
        source: '/read/1/549',
        destination: '/comunicacion/noticia/proceso-de-adjudicacion-de-ayudas-economicas',
        permanent: true,
      },
      {
        source: '/read/1/550',
        destination: '/comunicacion/noticia/el-arte-y-los-eventos-en-tiempos-de-pandemia',
        permanent: true,
      },
      {
        source: '/read/1/551',
        destination: '/comunicacion/noticia/concurso-de-logotipo',
        permanent: true,
      },
      {
        source: '/read/1/552',
        destination: '/comunicacion/noticia/la-uteq-lidera-la-produccion-cientifica-en-el-campo-de-agricultura',
        permanent: true,
      },
      {
        source: '/read/1/553',
        destination: '/comunicacion/noticia/pon-el-brazo-por-la-educacion',
        permanent: true,
      },
      {
        source: '/read/1/554',
        destination: '/comunicacion/noticia/aislamiento-identificacion-y-caracterizacion-de-bacterias-acido-lacticas-presentes-en-el-mucilago-de-cacao-y-su-aplicacion-en-la-conservacion-de-alimentos',
        permanent: true,
      },
      {
        source: '/read/1/555',
        destination: '/comunicacion/noticia/emprendimientos-sostenibles-en-comunidades-rurales-y-vulnerables-frente-a-la-responsabilidad-social-de-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/556',
        destination: '/comunicacion/noticia/firma-de-convenio-con-asopropal',
        permanent: true,
      },
      {
        source: '/read/1/557',
        destination: '/comunicacion/noticia/inversiones-milagrosas-de-la-sonrisa-al-llanto',
        permanent: true,
      },
      {
        source: '/read/1/563',
        destination: '/comunicacion/noticia/uteq-contribuye-a-la-agricultura-sostenible',
        permanent: true,
      },
      {
        source: '/read/1/558',
        destination: '/comunicacion/noticia/estudiantes-de-forestal-realizan-proyecto-de-vinculacion-en-la-represa',
        permanent: true,
      },
      {
        source: '/read/1/559',
        destination: '/comunicacion/noticia/estudiantes-de-industrial-coordinan-banco-de-alimentos',
        permanent: true,
      },
      {
        source: '/read/1/560',
        destination: '/comunicacion/noticia/proyecto-de-vinculacion-en-la-guayas-el-empalme',
        permanent: true,
      },
      {
        source: '/read/1/561',
        destination: '/comunicacion/noticia/proyecto-de-reforestacion-en-quevedo',
        permanent: true,
      },
      {
        source: '/read/1/562',
        destination: '/comunicacion/noticia/capacitacion-a-asociacion-de-agricultura',
        permanent: true,
      },
      {
        source: '/read/1/564',
        destination: '/comunicacion/noticia/listado-de-estudiantes-beneficiarios-con-ayudas-economicas',
        permanent: true,
      },
      {
        source: '/read/1/565',
        destination: '/comunicacion/noticia/desarrollo-de-clones-de-cacao-altamente-productivos-tolerante-a-enfermedades-y-de-excelente-calidad',
        permanent: true,
      },
      {
        source: '/read/1/566',
        destination: '/comunicacion/noticia/estudiantes-de-uteq-restauraron-luminaria-de-liga-deportiva',
        permanent: true,
      },
      {
        source: '/read/1/567',
        destination: '/comunicacion/noticia/prodeuteq-firmo-convenio-con-quevial',
        permanent: true,
      },
      {
        source: '/read/1/568',
        destination: '/comunicacion/noticia/requisitos-y-contactos-para-la-emision-de-documentos-certificados',
        permanent: true,
      },
      {
        source: '/read/1/569',
        destination: '/comunicacion/noticia/capacitacion-de-buenas-practicas-ambientales-para-comerciantes-de-quevedo',
        permanent: true,
      },
      {
        source: '/read/1/570',
        destination: '/comunicacion/noticia/preguntas-frecuentes-para-el-proceso-de-matricula',
        permanent: true,
      },
      {
        source: '/read/1/571',
        destination: '/comunicacion/noticia/octavo-aniversario-de-stuteq',
        permanent: true,
      },
      {
        source: '/read/1/572',
        destination: '/comunicacion/noticia/politica-ambiental-de-la-uteq-ya-esta-lista',
        permanent: true,
      },
      {
        source: '/read/1/573',
        destination: '/comunicacion/noticia/la-uteq-siempre-cerca-de-ti',
        permanent: true,
      },
      {
        source: '/read/1/574',
        destination: '/comunicacion/noticia/gestion-por-procesos-en-la-produccion-del-cultivo-2021-octubre',
        permanent: true,
      },
      {
        source: '/read/1/575',
        destination: '/comunicacion/noticia/firma-de-convenio',
        permanent: true,
      },
      {
        source: '/read/1/576',
        destination: '/comunicacion/noticia/aplicacion-web-ayuda-al-proceso-de-aprendizaje-de-personas-con-discapacidad',
        permanent: true,
      },
      {
        source: '/read/1/577',
        destination: '/comunicacion/noticia/fci-cumplio-xiii-anos-de-creacion',
        permanent: true,
      },
      {
        source: '/read/1/578',
        destination: '/comunicacion/noticia/uteq-entrego-nombramientos-a-38-docentes',
        permanent: true,
      },
      {
        source: '/read/1/579',
        destination: '/comunicacion/noticia/uteq-recibe-reconocimiento',
        permanent: true,
      },
      {
        source: '/read/1/580',
        destination: '/comunicacion/noticia/nuevos-directivos-academicos-en-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/581',
        destination: '/comunicacion/noticia/iniciaron-jornadas-curriculares-para-docentes-de-uteq',
        permanent: true,
      },
      {
        source: '/read/1/582',
        destination: '/comunicacion/noticia/matriculas-para-estudiantes-de-grado-seran-en-noviembre',
        permanent: true,
      },
      {
        source: '/read/1/583',
        destination: '/comunicacion/noticia/inicio-maestria-en-biotecnologia-agropecuaria-con-25-posgradistas',
        permanent: true,
      },
      {
        source: '/read/1/584',
        destination: '/comunicacion/noticia/uteq-aumenta-facultades',
        permanent: true,
      },
      {
        source: '/read/1/585',
        destination: '/comunicacion/noticia/culminaron-actividades-de-vinculacion-con-el-gad-parroquial-de-la-esperanza',
        permanent: true,
      },
      {
        source: '/read/1/586',
        destination: '/comunicacion/noticia/adultos-mayores-del-canton-buena-fe-culminaron-capacitaciones',
        permanent: true,
      },
      {
        source: '/read/1/587',
        destination: '/comunicacion/noticia/plan-institucional-de-sostenibilidad-2021-2025',
        permanent: true,
      },
      {
        source: '/read/1/588',
        destination: '/comunicacion/noticia/uteq-socializo-plan-institucional-de-sostenibilidad',
        permanent: true,
      },
      {
        source: '/read/1/589',
        destination: '/comunicacion/noticia/uteq-firmo-convenio-con-tres-universidades-de-espana',
        permanent: true,
      },
      {
        source: '/read/1/590',
        destination: '/comunicacion/noticia/el-primer-dia-de-clases-de-brittany-entrevista',
        permanent: true,
      },
      {
        source: '/read/1/591',
        destination: '/comunicacion/noticia/alternativa-de-produccion-avicola-con-harina-de-hoja-de-plantas-medicinales',
        permanent: true,
      },
      {
        source: '/read/1/592',
        destination: '/comunicacion/noticia/carrera-alimentos-invita-a-la-socializacion-a-graduados',
        permanent: true,
      },
      {
        source: '/read/1/593',
        destination: '/comunicacion/noticia/carrera-de-seguridad-industrial-socializara-informe-a-graduados',
        permanent: true,
      },
      {
        source: '/read/1/594',
        destination: '/comunicacion/noticia/uteq-y-ministerio-de-agua-firmaron-convenio-especifico',
        permanent: true,
      },
      {
        source: '/read/1/595',
        destination: '/comunicacion/noticia/iv-festival-universitario-de-musica-2021',
        permanent: true,
      },
      {
        source: '/read/1/596',
        destination: '/comunicacion/noticia/miguel-angel-nos-cuenta-como-fue-su-primer-dia-de-clases-en-el-pre-universitario',
        permanent: true,
      },
      {
        source: '/read/1/597',
        destination: '/comunicacion/noticia/la-uteq-iniciara-campana-de-vacunacion-contra-covid-19-tercera-dosis',
        permanent: true,
      },
      {
        source: '/read/1/598',
        destination: '/comunicacion/noticia/area-de-psicologia-de-la-uteq-con-nueva-titular',
        permanent: true,
      },
      {
        source: '/read/1/599',
        destination: '/comunicacion/noticia/cidu-2021-inicio-con-4500-participantes',
        permanent: true,
      },
      {
        source: '/read/1/600',
        destination: '/comunicacion/noticia/socializacion-del-plan-uteq-sostenible',
        permanent: true,
      },
      {
        source: '/read/1/601',
        destination: '/comunicacion/noticia/concluyo-el-iii-congreso-internacional-de-desarrollo-universitario',
        permanent: true,
      },
      {
        source: '/read/1/602',
        destination: '/comunicacion/noticia/uteq-firmo-convenio-con-arca',
        permanent: true,
      },
      {
        source: '/read/1/603',
        destination: '/comunicacion/noticia/inicio-proyecto-forestal-de-vinculacion-en-canton-buena-fe',
        permanent: true,
      },
      {
        source: '/read/1/604',
        destination: '/comunicacion/noticia/uteq-amplia-su-oferta-academica-con-carrera-de-arquitectura',
        permanent: true,
      },
      {
        source: '/read/1/605',
        destination: '/comunicacion/noticia/uteq-ame-y-prodeuteq-en-alianza-institucional',
        permanent: true,
      },
      {
        source: '/read/1/606',
        destination: '/comunicacion/noticia/proyecto-de-vinculacion-brinda-asesoria-en-cumplimiento-de-las-normas-contables',
        permanent: true,
      },
      {
        source: '/read/1/607',
        destination: '/comunicacion/noticia/actividades-de-la-facultad-de-ciencias-de-la-industria-y-produccion-por-aniversario-de-la-institucion',
        permanent: true,
      },
      {
        source: '/read/1/608',
        destination: '/comunicacion/noticia/actividades-de-la-facultad-de-ciencias-de-la-ingenieria-por-aniversario-de-la-institucion',
        permanent: true,
      },
      {
        source: '/read/1/609',
        destination: '/comunicacion/noticia/todos-contra-la-covid-19',
        permanent: true,
      },
      {
        source: '/read/1/610',
        destination: '/comunicacion/noticia/4000-pruebas-rapidas-para-deteccion-de-covid-19-a-beneficio-de-la-comunidad-quevedena',
        permanent: true,
      },
      {
        source: '/read/1/611',
        destination: '/comunicacion/noticia/celebramos-38-anos-de-creacion',
        permanent: true,
      },
      {
        source: '/read/1/612',
        destination: '/comunicacion/noticia/victor-garcia-nos-demuestra-que-los-limites-solo-existen-en-la-mente',
        permanent: true,
      },
      {
        source: '/read/1/613',
        destination: '/comunicacion/noticia/inauguracion-de-la-iii-cohorte-del-programa-de-maestria-en-agroecologia-y-desarrollo-sostenible',
        permanent: true,
      },
      {
        source: '/read/1/614',
        destination: '/comunicacion/noticia/nuevos-profesionales-recibieron-titulo-de-grado',
        permanent: true,
      },
      {
        source: '/read/1/615',
        destination: '/comunicacion/noticia/eventos-virtuales-academicos',
        permanent: true,
      },
      {
        source: '/read/1/616',
        destination: '/comunicacion/noticia/analisis-del-empleo-en-el-ecuador',
        permanent: true,
      },
      {
        source: '/read/1/617',
        destination: '/comunicacion/noticia/proyecto-de-vinculacion-de-ued-capacito-a-98-comerciantes-de-quevedo',
        permanent: true,
      },
      {
        source: '/read/1/618',
        destination: '/comunicacion/noticia/proyecto-de-vinculacion-de-piscicultura-se-desarrolla-en-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/619',
        destination: '/comunicacion/noticia/educacion-continua-oferta-nuevos-cursos',
        permanent: true,
      },
      {
        source: '/read/1/620',
        destination: '/comunicacion/noticia/fce-cumplio-xxii-anos-de-creacion',
        permanent: true,
      },
      {
        source: '/read/1/621',
        destination: '/comunicacion/noticia/estudiantes-de-ecoturismo-presentan-sendero-recreativo-en-la-represa',
        permanent: true,
      },
      {
        source: '/read/1/622',
        destination: '/comunicacion/noticia/rendimos-cuentas-a-la-comunidad',
        permanent: true,
      },
      {
        source: '/read/1/623',
        destination: '/comunicacion/noticia/uteq-forma-parte-de-red-de-investigadores-de-faedpyme',
        permanent: true,
      },
      {
        source: '/read/1/624',
        destination: '/comunicacion/noticia/directivos-de-asedefe-visitaron-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/625',
        destination: '/comunicacion/noticia/entrega-de-plantas-de-cacao-a-pequenos-productores',
        permanent: true,
      },
      {
        source: '/read/1/626',
        destination: '/comunicacion/noticia/segundo-periodo-academico-2021-2022-llego-a-su-fin',
        permanent: true,
      },
      {
        source: '/read/1/627',
        destination: '/comunicacion/noticia/proyecto-inclusivo-se-desarrolla-en-fe-y-alegria',
        permanent: true,
      },
      {
        source: '/read/1/628',
        destination: '/comunicacion/noticia/dia-internacional-de-la-mujer',
        permanent: true,
      },
      {
        source: '/read/1/629',
        destination: '/comunicacion/noticia/visita-de-la-alcaldesa-del-canton-mocache',
        permanent: true,
      },
      {
        source: '/read/1/630',
        destination: '/comunicacion/noticia/vicerrectora-de-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/631',
        destination: '/comunicacion/noticia/entrega-de-certificados-loly-midi',
        permanent: true,
      },
      {
        source: '/read/1/632',
        destination: '/comunicacion/noticia/campana-de-reforestacion-oxigena-tu-vida-uteq',
        permanent: true,
      },
      {
        source: '/read/1/633',
        destination: '/comunicacion/noticia/evento-de-reconocimiento-a-emprendedores',
        permanent: true,
      },
      {
        source: '/read/1/634',
        destination: '/comunicacion/noticia/proyecto-de-tics-fue-entregado-a-gad-la-esperanza',
        permanent: true,
      },
      {
        source: '/read/1/635',
        destination: '/comunicacion/noticia/participacion-de-la-direccion-de-investigacion-en-consejo-directivo-del-mag',
        permanent: true,
      },
      {
        source: '/read/1/636',
        destination: '/comunicacion/noticia/finalizan-las-actividades-de-vinculacion',
        permanent: true,
      },
      {
        source: '/read/1/637',
        destination: '/comunicacion/noticia/evento-cultural-por-el-mes-de-la-mujer',
        permanent: true,
      },
      {
        source: '/read/1/638',
        destination: '/comunicacion/noticia/uteq-da-a-conocer-el-calendario-del-primer-periodo-academico-2022-2023',
        permanent: true,
      },
      {
        source: '/read/1/639',
        destination: '/comunicacion/noticia/estudiantes-en-periodo-extraordinario-de-clases',
        permanent: true,
      },
      {
        source: '/read/1/640',
        destination: '/comunicacion/noticia/linner-cruz-nos-cuenta-su-experiencia-de-estudiar-una-maestria-en-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/641',
        destination: '/comunicacion/noticia/uteq-y-mars-trabajan-en-proyectos-de-investigacion',
        permanent: true,
      },
      {
        source: '/read/1/643',
        destination: '/comunicacion/noticia/uteq-y-universidad-de-cordoba-monteria-firmaron-convenio',
        permanent: true,
      },
      {
        source: '/read/1/644',
        destination: '/comunicacion/noticia/uteq-y-policia-nacional-preparan-charlas-para-estudiantes',
        permanent: true,
      },
      {
        source: '/read/1/645',
        destination: '/comunicacion/noticia/visita-de-representante-de-la-universidad-de-cordoba-espana',
        permanent: true,
      },
      {
        source: '/read/1/646',
        destination: '/comunicacion/noticia/charla-del-ubu',
        permanent: true,
      },
      {
        source: '/read/1/647',
        destination: '/comunicacion/noticia/177-magisteres-graduados-en-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/648',
        destination: '/comunicacion/noticia/nuevas-designaciones-en-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/649',
        destination: '/comunicacion/noticia/matriculas-inician-este-10-de-mayo',
        permanent: true,
      },
      {
        source: '/read/1/650',
        destination: '/comunicacion/noticia/matriculas-para-admision-iniciaran-este-16-de-mayo',
        permanent: true,
      },
      {
        source: '/read/1/651',
        destination: '/comunicacion/noticia/todos-a-clases-este-24-de-mayo',
        permanent: true,
      },
      {
        source: '/read/1/652',
        destination: '/comunicacion/noticia/academicos-de-la-uteq-recibieron-reconocimientos',
        permanent: true,
      },
      {
        source: '/read/1/653',
        destination: '/comunicacion/noticia/convocatoria-a-eleccion-de-nuevos-representantes-universitarios',
        permanent: true,
      },
      {
        source: '/read/1/654',
        destination: '/comunicacion/noticia/educacion-continua-oferta-nuevo-curso',
        permanent: true,
      },
      {
        source: '/read/1/655',
        destination: '/comunicacion/noticia/cursos-y-taller-de-educacion-continua',
        permanent: true,
      },
      {
        source: '/read/1/656',
        destination: '/comunicacion/noticia/estudiantes-destacados-recibieron-reconocimiento-por-merito-academico',
        permanent: true,
      },
      {
        source: '/read/1/657',
        destination: '/comunicacion/noticia/ruta-universitaria-linea-13',
        permanent: true,
      },
      {
        source: '/read/1/658',
        destination: '/comunicacion/noticia/uteq-invita-a-participar-en-la-novena-convocatoria-focicyt-2022',
        permanent: true,
      },
      {
        source: '/read/1/659',
        destination: '/comunicacion/noticia/luigy-barragan-ex-utequsino-triunfa-en-concurso-de-investigacion-en-mexico',
        permanent: true,
      },
      {
        source: '/read/1/660',
        destination: '/comunicacion/noticia/seguro-de-vida-estudiantil',
        permanent: true,
      },
      {
        source: '/read/1/661',
        destination: '/comunicacion/noticia/cursos-subsidiados-por-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/662',
        destination: '/comunicacion/noticia/la-uteq-y-la-union-de-asociaciones-agropecuarias-montuvias-y-campesinas-del-ecuador-firman-convenio',
        permanent: true,
      },
      {
        source: '/read/1/663',
        destination: '/comunicacion/noticia/regresamos-a-las-clases-presenciales',
        permanent: true,
      },
      {
        source: '/read/1/664',
        destination: '/comunicacion/noticia/cursos-de-educacion-continua',
        permanent: true,
      },
      {
        source: '/read/1/665',
        destination: '/comunicacion/noticia/webinar-de-educacion-continua',
        permanent: true,
      },
      {
        source: '/read/1/666',
        destination: '/comunicacion/noticia/calendario-de-actividades-de-la-facultad-de-ciencias-sociales,-economicas-y-financieras',
        permanent: true,
      },
      {
        source: '/read/1/667',
        destination: '/comunicacion/noticia/tercer-torneo-de-ajedrez-absoluto',
        permanent: true,
      },
      {
        source: '/read/1/668',
        destination: '/comunicacion/noticia/ocho-organizaciones-se-beneficiaran-de-proyecto-de-vinculacion',
        permanent: true,
      },
      {
        source: '/read/1/669',
        destination: '/comunicacion/noticia/facultad-de-ciencias-de-la-salud-entrega-reconocimiento-y-certificados-a-estudiantes',
        permanent: true,
      },
      {
        source: '/read/1/670',
        destination: '/comunicacion/noticia/resultados-elecciones-representantes-al-consejo-universitario',
        permanent: true,
      },
      {
        source: '/read/1/671',
        destination: '/comunicacion/noticia/calendario-de-actividades-de-la-facultad-de-ciencias-agrarias-y-forestales',
        permanent: true,
      },
      {
        source: '/read/1/672',
        destination: '/comunicacion/noticia/199-egresados-de-la-ued-firmaron-actas-de-grado',
        permanent: true,
      },
      {
        source: '/read/1/673',
        destination: '/comunicacion/noticia/estudiantes-de-isiso-terminan-proyecto-de-vinculacion',
        permanent: true,
      },
      {
        source: '/read/1/674',
        destination: '/comunicacion/noticia/facultad-de-ciencias-agrarias-y-forestales-celebro-primer-aniversario',
        permanent: true,
      },
      {
        source: '/read/1/675',
        destination: '/comunicacion/noticia/fcsef-celebro-primer-aniversario-de-creacion',
        permanent: true,
      },
      {
        source: '/read/1/676',
        destination: '/comunicacion/noticia/uteq-contribuye-en-la-restauracion-forestal-del-canton-buena-fe',
        permanent: true,
      },
      {
        source: '/read/1/677',
        destination: '/comunicacion/noticia/calendario-de-actividades-de-la-facultad-de-ciencias-de-la-educacion',
        permanent: true,
      },
      {
        source: '/read/1/678',
        destination: '/comunicacion/noticia/monitoreo-de-proyecto-de-vinculacion-1',
        permanent: true,
      },
      {
        source: '/read/1/679',
        destination: '/comunicacion/noticia/taller-de-plan-de-marketing-para-estudiantes-de-mercadotecnia',
        permanent: true,
      },
      {
        source: '/read/1/680',
        destination: '/comunicacion/noticia/capacitacion-en-la-prevencion-de-sustancias-sujetas-a-fiscalizacion',
        permanent: true,
      },
      {
        source: '/read/1/681',
        destination: '/comunicacion/noticia/torneo-de-tenis-uteq-2022',
        permanent: true,
      },
      {
        source: '/read/1/682',
        destination: '/comunicacion/noticia/proyecto-de-nueva-carrera',
        permanent: true,
      },
      {
        source: '/read/1/683',
        destination: '/comunicacion/noticia/monitoreo-de-proyecto-de-vinculacion-2',
        permanent: true,
      },
      {
        source: '/read/1/684',
        destination: '/comunicacion/noticia/la-uteq-entregara-1500-ayudas-economicas',
        permanent: true,
      },
      {
        source: '/read/1/685',
        destination: '/comunicacion/noticia/proceso-obligatorio-desde-el-4-de-agosto',
        permanent: true,
      },
      {
        source: '/read/1/686',
        destination: '/comunicacion/noticia/uteq-coordina-proceso-de-autoevaluacion-de-carreras-y-programas-2022',
        permanent: true,
      },
      {
        source: '/read/1/687',
        destination: '/comunicacion/noticia/estudiantes-de-agroindustrias-comparten-conocimientos-con-adultos-mayores',
        permanent: true,
      },
      {
        source: '/read/1/688',
        destination: '/comunicacion/noticia/calendario-de-actividades-de-la-facultad-de-ciencias-de-la-industria-y-produccion',
        permanent: true,
      },
      {
        source: '/read/1/689',
        destination: '/comunicacion/noticia/docente-de-uteq-ganadora-de-concurso-del-consejo-de-participacion-ciudadana-y-control-social',
        permanent: true,
      },
      {
        source: '/read/1/690',
        destination: '/comunicacion/noticia/facultad-de-ciencias-de-la-educacion-celebro-primer-aniversario',
        permanent: true,
      },
      {
        source: '/read/1/691',
        destination: '/comunicacion/noticia/uteq-presente-en-casa-abierta',
        permanent: true,
      },
      {
        source: '/read/1/692',
        destination: '/comunicacion/noticia/fcip-celebro-primer-aniversario-de-creacion',
        permanent: true,
      },
      {
        source: '/read/1/693',
        destination: '/comunicacion/noticia/catedratico-de-universidad-de-espana-se-encuentra-en-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/694',
        destination: '/comunicacion/noticia/levantamiento-de-informacion-aeroespacial-espectral-y-cartografica-se-realizo-en-la-maria',
        permanent: true,
      },
      {
        source: '/read/1/695',
        destination: '/comunicacion/noticia/biodigestores-una-alternativa-ecologica-para-la-agricultura',
        permanent: true,
      },
      {
        source: '/read/1/696',
        destination: '/comunicacion/noticia/fondos-de-financiamiento-fiasa-y-convenio-marco-iniap-uteq',
        permanent: true,
      },
      {
        source: '/read/1/697',
        destination: '/comunicacion/noticia/asociacion-nueva-lechugal-se-beneficia-de-proyectos-de-vinculacion',
        permanent: true,
      },
      {
        source: '/read/1/698',
        destination: '/comunicacion/noticia/visitas-tecnicas-de-vinculacion',
        permanent: true,
      },
      {
        source: '/read/1/699',
        destination: '/comunicacion/noticia/evento-cultural-por-el-mes-de-las-artes',
        permanent: true,
      },
      {
        source: '/read/1/700',
        destination: '/comunicacion/noticia/eduardo-veliz-delgado-un-artista-que-aplica-el-marketing',
        permanent: true,
      },
      {
        source: '/read/1/701',
        destination: '/comunicacion/noticia/becas-de-maestrias-por-parte-de-senescyt-podran-aplicarse-en-la-uteq',
        permanent: true,
      },
      {
        source: '/read/1/702',
        destination: '/comunicacion/noticia/la-uteq-y-la-coordinacion-zonal-5-del-ministerio-de-salud-publica-firmaron-convenio-especifico-de-cooperacion-interinstitucional',
        permanent: true,
      },
      {
        source: '/read/1/703',
        destination: '/comunicacion/noticia/estudiantes-de-enfermeria-iniciaron-practicas-de-externado',
        permanent: true,
      },
      {
        source: '/read/1/704',
        destination: '/comunicacion/noticia/fci-cumplio-14-anos-de-creacion',
        permanent: true,
      },
      {
        source: '/read/1/705',
        destination: '/comunicacion/noticia/se-acerca-cidu-2022',
        permanent: true,
      },
      {
        source: '/contenidos/1',
        destination: '/comunicacion',
        permanent: true,
      },

      //Transparencia
      {
        source: '/doc/normativas/cod_et_inv_academico.pdf',
        destination: '/assets/docs/reglm-norm/cod_et_inv_academico.pdf',
        permanent: true,
      },
      {
        source: '/doc/normativas/inst_covi.pdf',
        destination: '/assets/docs/reglm-norm/inst_covi.pdf',
        permanent: true,
      },
      {
        source: '/doc/normativas/inst_ppa.pdf',
        destination: '/assets/docs/reglm-norm/inst_ppa.pdf',
        permanent: true,
      },
      {
        source: '/doc/normativas/n_creacion_invest.pdf',
        destination: '/assets/docs/reglm-norm/n_creacion_invest.pdf',
        permanent: true,
      },
      {
        source: '/doc/normativas/mod_educ.pdf',
        destination: '/assets/docs/reglm-norm/mod_educ.pdf',
        permanent: true,
      },
      {
        source: '/doc/normativas/n_contrato_doc.pdf',
        destination: '/assets/docs/reglm-norm/n_contrato_doc.pdf',
        permanent: true,
      },
      {
        source: '/doc/normativas/r_uan.pdf',
        destination: '/assets/docs/reglm-norm/r_uan.pdf',
        permanent: true,
      },
      {
        source: '/doc/normativas/r_merito_opos_doc.pdf',
        destination: '/assets/docs/reglm-norm/r_merito_opos_doc.pdf',
        permanent: true,
      },
      {
        source: '/doc/normativas/r_eva_int_gest_calidad.pdf',
        destination: '/assets/docs/reglm-norm/r_eva_int_gest_calidad.pdf',
        permanent: true,
      },
      {
        source: '/doc/normativas/r_eva_integ_desp_pers_acad.pdf',
        destination: '/assets/docs/reglm-norm/r_eva_integ_desp_pers_acad.pdf',
        permanent: true,
      },
      {
        source: '/doc/normativas/r_focicyt.pdf',
        destination: '/assets/docs/reglm-norm/r_focicyt.pdf',
        permanent: true,
      },
      {
        source: '/doc/normativas/r_investigacion.pdf',
        destination: '/assets/docs/reglm-norm/r_investigacion.pdf',
        permanent: true,
      },
      {
        source: '/doc/normativas/r_telecomunicaciones.pdf',
        destination: '/assets/docs/reglm-norm/r_telecomunicaciones.pdf',
        permanent: true,
      },
      {
        source: '/doc/normativas/r_serv_comuninada_ppp.pdf',
        destination: '/assets/docs/reglm-norm/r_serv_comuninada_ppp.pdf',
        permanent: true,
      },
      {
        source: '/doc/normativas/r_recon_homolog.pdf',
        destination: '/assets/docs/reglm-norm/r_recon_homolog.pdf',
        permanent: true,
      },
      {
        source: '/doc/normativas/r_regimen_acad.pdf',
        destination: '/assets/docs/reglm-norm/r_regimen_acad.pdf',
        permanent: true,
      },
      {
        source: '/doc/normativas/r_int_curricular.pdf',
        destination: '/assets/docs/reglm-norm/r_int_curricular.pdf',
        permanent: true,
      },
      {
        source: '/doc/normativas/r_tutoria_acad.pdf',
        destination: '/assets/docs/reglm-norm/r_tutoria_acad.pdf',
        permanent: true,
      },
      {
        source: '/doc/normativas/r_vinculacion.pdf',
        destination: '/assets/docs/reglm-norm/r_vinculacion.pdf',
        permanent: true,
      },
      {
        source: '/doc/normativas/c_etica.pdf',
        destination: '/assets/docs/reglm-norm/c_etica.pdf',
        permanent: true,
      },
      {
        source: '/doc/normativas/estatuto_2019.pdf',
        destination: '/assets/docs/reglm-norm/estatuto_2019.pdf',
        permanent: true,
      },
      {
        source: '/doc/normativas/p_acoso.pdf',
        destination: '/assets/docs/reglm-norm/p_acoso.pdf',
        permanent: true,
      },
      {
        source: '/doc/normativas/r_becas.pdf',
        destination: '/assets/docs/reglm-norm/r_becas.pdf',
        permanent: true,
      },
      {
        source: '/doc/normativas/r_escalafon.pdf',
        destination: '/assets/docs/reglm-norm/r_escalafon.pdf',
        permanent: true,
      },
      {
        source: '/doc/normativas/r_contrato_admin.pdf',
        destination: '/assets/docs/reglm-norm/r_contrato_admin.pdf',
        permanent: true,
      },
      {
        source: '/doc/normativas/r_elecciones.pdf',
        destination: '/assets/docs/reglm-norm/r_elecciones.pdf',
        permanent: true,
      },
      {
        source: '/doc/normativas/r_interno_doc.pdf',
        destination: '/assets/docs/reglm-norm/r_interno_doc.pdf',
        permanent: true,
      },
      {
        source: '/doc/normativas/r_disc_espec.pdf',
        destination: '/assets/docs/reglm-norm/r_disc_espec.pdf',
        permanent: true,
      },
      {
        source: '/doc/normativas/r_ube.pdf',
        destination: '/assets/docs/reglm-norm/r_ube.pdf',
        permanent: true,
      },
      {
        source: '/publico/pdf/est2019.pdf',
        destination: '/assets/docs/reglm-norm/estatuto_2019.pdf',
        permanent: true,
      },

      {
        source: '/doc/planificacion/pedi20212025_.pdf',
        destination: '/assets/docs/planf-univ/docx-uteq-planf-unv-0000001.pdf',
        permanent: true,
      },
      {
        source: '/doc/planificacion/15042021papp.pdf',
        destination: '/assets/docs/planf-univ/docx-uteq-planf-unv-0000003.pdf',
        permanent: true,
      },
      {
        source: '/lotaip/lotaip/pdf/literalf1/FORMATO-SOLICITUD-120613.doc',
        destination: '/lotaip/lotaip/pdf/literalf1/FORMATO-SOLICITUD-120613.pdf',
        permanent: true,
      },
      {
        source: '/lotaip/lotaip/pdf/literalf1/FORMATOINFORMESERVICIOSINSTIT..doc',
        destination: '/lotaip/lotaip/pdf/literalf1/FORMATOINFORMESERVICIOSINSTIT..pdf',
        permanent: true,
      },
      {
        source: '/lotaip/lotaip/pdf/literalf1/FORMATOS.docx',
        destination: '/lotaip/lotaip/pdf/literalf1/FORMATOS.pdf',
        permanent: true,
      },
      {
        source: '/doc/rc/2021/CE20211.pdf',
        destination: '/assets/docs/rend-ctas/2021/CE20211.pdf',
        permanent: true,
      },
      {
        source: '/read/11/660',
        destination: '/comunicacion/noticia/seguro-de-vida-estudiantil',
        permanent: true,
      },
      {
        source: '/assets/docs/others/frc2022-uteq.xlsx',
        destination: '/assets/docs/rend-ctas/2022/F202212.xls',
        permanent: true,
      },
      /*{
        source: '/rendicion-cuentas/informe-2022',
        destination: '/rendicion-cuentas',
        permanent: true,
      },*/
      {
        source: '/autoridades',
        destination: '/',
        permanent: true,
      },
      {
        source: '/vicerrector-administrativo',
        destination: '/',
        permanent: true,
      },
      {
        source: '/rector',
        destination: '/',
        permanent: true,
      },
      {
        source: '/vicerrectora-academica',
        destination: '/',
        permanent: true,
      },
      {
        source: '/evaluacion-interna/aseguramiento-de-la-calidad',
        destination: '/evaluacion-interna/mejora-continua',
        permanent: true,
      },
      {
        source: '/grado/facultad/fccdd',
        destination: '/grado/facultad/fcc',
        permanent: true,
      },
    ]
  },
  /*mode: 'production',
  optimization: {
    minimizer: [new TerserPlugin({  })],
  },*/
  //compress: true,
  experimental: { esmExternals: true },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'sameorigin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'no-referrer',
          },
          {
            key: 'Permissions-Policy',
            value: "camera=(), battery=(self), geolocation=(self), accelerometer=(self), autoplay=(self), encrypted-media=(self), gyroscope=(self), picture-in-picture=(self)",
          }
        ],
      },
      {
        source: '/:all*(svg|jpg|gif|jpeg|png)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=9999999999, must-revalidate',
          }
        ],
      },
    ];
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|eot|otf|ttf|woff|woff2)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // set 'fs' to an empty module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.node = {
        fs: 'empty'
      }
    }

    return config;
  }
}