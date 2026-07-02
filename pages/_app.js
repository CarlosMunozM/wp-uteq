import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorBoundary from 'components/ErrorBoundary';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';


export default MyApp;

function MyApp({ Component, pageProps }) {

    const [showButton, setShowButton] = useState(false);
    const router = useRouter();

    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");

        /*const loaderContainer = document.querySelector('.loader-container');

        function hideImageLoading() {
            loaderContainer.style.display = "none";
        }*/
    
    	/*function createSnowfallEffect(cssClass, fillColor, count) {
            var COUNT = count;
            var masthead = document.querySelector(cssClass);
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var width = masthead.clientWidth;
            var height = masthead.clientHeight;
            var i = 0;
            var active = false;

            function onResize() {
                width = masthead.clientWidth;
                height = masthead.clientHeight;
                canvas.width = width;
                canvas.height = height;
                ctx.fillStyle = fillColor;

                var wasActive = active;
                active = width > 600;

                if (!wasActive && active)
                    requestAnimFrame(update);
            }

            var Snowflake = function () {
                this.x = 0;
                this.y = 0;
                this.vy = 0;
                this.vx = 0;
                this.r = 0;

                this.reset();
            }

            Snowflake.prototype.reset = function () {
                this.x = Math.random() * width;
                this.y = Math.random() * -height;
                this.vy = 0.2 + Math.random() * 1.5;
                this.vx = 0.5 - Math.random();
                this.r = 1 + Math.random() * 2;
                this.o = 0.5 + Math.random() * 0.5;
            }

            canvas.style.position = 'absolute';
            canvas.style.left = canvas.style.top = '0';
            canvas.style.pointerEvents = 'none';

            var snowflakes = [], snowflake;
            for (i = 0; i < COUNT; i++) {
                snowflake = new Snowflake();
                snowflake.reset();
                snowflakes.push(snowflake);
            }

            function update() {
                ctx.clearRect(0, 0, width, height);

                if (!active)
                    return;

                for (i = 0; i < COUNT; i++) {
                    snowflake = snowflakes[i];
                    snowflake.y += snowflake.vy;
                    snowflake.x += snowflake.vx;

                    ctx.globalAlpha = snowflake.o;
                    ctx.beginPath();
                    ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
                    ctx.closePath();
                    ctx.fill();

                    if (snowflake.y > height) {
                        snowflake.reset();
                    }
                }

                requestAnimFrame(update);
            }

            window.requestAnimFrame = (function () {
                return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    function (callback) {
                        window.setTimeout(callback, 5000 / 60);
                    };
            })();

            onResize();
            window.addEventListener('resize', onResize, false);

            masthead.appendChild(canvas);
        }*/
    
    	/*function createSnowfallEffect(cssClass, fillColor, count) {
            var COUNT = count;
            var masthead = document.querySelector(cssClass);
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var width = masthead.clientWidth;
            var height = masthead.clientHeight;
            var i = 0;

            function onResize() {
                width = masthead.clientWidth;
                height = masthead.clientHeight;
                canvas.width = width;
                canvas.height = height;
                ctx.fillStyle = fillColor;
                requestAnimFrame(update);
            }

            var Snowflake = function () {
                this.x = 0;
                this.y = 0;
                this.vy = 0;
                this.vx = 0;
                this.r = 0;

                this.reset();
            }

            Snowflake.prototype.reset = function () {
                this.x = Math.random() * width;
                this.y = Math.random() * -height;
                this.vy = 0.2 + Math.random() * 1.5;
                this.vx = 0.5 - Math.random();
                this.r = 1 + Math.random() * 2;
                this.o = 0.5 + Math.random() * 0.5;
            }

            canvas.style.position = 'absolute';
            canvas.style.left = canvas.style.top = '0';
            canvas.style.pointerEvents = 'none';

            var snowflakes = [], snowflake;
            for (i = 0; i < COUNT; i++) {
                snowflake = new Snowflake();
                snowflake.reset();
                snowflakes.push(snowflake);
            }

            function update() {
                ctx.clearRect(0, 0, width, height);

                for (i = 0; i < COUNT; i++) {
                    snowflake = snowflakes[i];
                    snowflake.y += snowflake.vy;
                    snowflake.x += snowflake.vx;

                    ctx.globalAlpha = snowflake.o;
                    ctx.beginPath();
                    ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
                    ctx.closePath();
                    ctx.fill();

                    if (snowflake.y > height) {
                        snowflake.reset();
                    }
                }

                requestAnimFrame(update);
            }

            window.requestAnimFrame = (function () {
                return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    function (callback) {
                        window.setTimeout(callback, 5000 / 60);
                    };
            })();

            onResize();
            window.addEventListener('resize', onResize, false);

            masthead.appendChild(canvas);
        }
    
    	function createChristmasNewYearMessage(language) {
            const today = new Date();
            const xmas = new Date(today.getFullYear(), 11, 25);
            const daysToChristmas = Math.round((xmas - today) / (1000 * 60 * 60 * 24));
            const daysElement = document.getElementById('message-christmas');

            let message = '';

            if (language === 'es') {
                if (daysToChristmas === 0 || daysToChristmas === -1) {
                    message = "¡Feliz Navidad!";
                } else if (daysToChristmas > 0) {
                    message = daysToChristmas + " día/s para Navidad";
                } else if (daysToChristmas < -1) {
                    const newYear = new Date(today.getFullYear(), 11, 31);
                    const daysToNewYear = Math.round((newYear - today) / (1000 * 60 * 60 * 24));

                    if (daysToNewYear > 0) {
                        message = daysToNewYear + " día/s para el Año Nuevo";
                    } else if (daysToNewYear === 0 || (daysToNewYear <= -1 && daysToNewYear >= -5)) {
                        message = "¡Feliz Año Nuevo!";
                    } else if (daysToNewYear === -6) {
                        message = "¡Feliz Día de Reyes!";
                    } else {
                        daysElement.style.display = "none";
                        return;
                    }
                } else {
                    daysElement.style.display = "none";
                    return;
                }
            } else if (language === 'en') {
                if (daysToChristmas === 0 || daysToChristmas === -1) {
                    message = "Merry Christmas!";
                } else if (daysToChristmas > 0) {
                    message = daysToChristmas + " day(s) until Christmas";
                } else if (daysToChristmas < -1) {
                    const newYear = new Date(today.getFullYear(), 11, 31);
                    const daysToNewYear = Math.round((newYear - today) / (1000 * 60 * 60 * 24));

                    if (daysToNewYear > 0) {
                        message = daysToNewYear + " day(s) until New Year's Eve";
                    } else if (daysToNewYear === 0 || (daysToNewYear <= -1 && daysToNewYear >= -5)) {
                        message = "Happy New Year!";
                    } else if (daysToNewYear === -6) {
                        message = "Happy Three Kings' Day!";
                    } else {
                        daysElement.style.display = "none";
                        return;
                    }
                } else {
                    daysElement.style.display = "none";
                    return;
                }
            } else if (language === 'pt') {
                if (daysToChristmas === 0 || daysToChristmas === -1) {
                    message = "Feliz Natal!";
                } else if (daysToChristmas > 0) {
                    message = daysToChristmas + " dia(s) até o Natal";
                } else if (daysToChristmas < -1) {
                    const newYear = new Date(today.getFullYear(), 11, 31);
                    const daysToNewYear = Math.round((newYear - today) / (1000 * 60 * 60 * 24));

                    if (daysToNewYear > 0) {
                        message = daysToNewYear + " dia(s) até o Ano Novo";
                    } else if (daysToNewYear === 0 || (daysToNewYear <= -1 && daysToNewYear >= -5)) {
                        message = "Feliz Ano Novo!";
                    } else if (daysToNewYear === -6) {
                        message = "Feliz Dia de Reis!";
                    } else {
                        daysElement.style.display = "none";
                        return;
                    }
                } else {
                    daysElement.style.display = "none";
                    return;
                }
            } else {
                message = "Idioma no soportado";
            }

            daysElement.textContent = message;
        }*/

        /*if (document.readyState) {
            document.getElementsByTagName('html')[0].setAttribute('lang', router.locale);
            document.getElementsByTagName('html')[0].setAttribute('xml:lang', router.locale);
            if (document.readyState === "complete" || document.readyState === "loaded") {*/
                // hideImageLoading();
            	//createChristmasNewYearMessage(router.locale);
                /*createSnowfallEffect(".menu-primary", "#FFF", 100);
                createSnowfallEffect(".menu-second", "#FFF", 50);
                createSnowfallEffect(".menu-third", "#ECB932", 25);
                createSnowfallEffect(".footer", "#FFF", 100);
            } else {
                if (window.addEventListener) {
                    if (document.readyState === 'loading' || document.readyState === 'uninitialized') {
                        window.addEventListener('DOMContentLoaded', function () {
                            if (document.readyState === "interactive") {*/
                                // hideImageLoading();
                            	//createChristmasNewYearMessage(router.locale);
                                /*createSnowfallEffect(".menu-primary", "#FFF", 100);
                                createSnowfallEffect(".menu-second", "#FFF", 50);
                                createSnowfallEffect(".menu-third", "#ECB932", 25);
                                createSnowfallEffect(".footer", "#FFF", 100);
                            } else if (document.readyState === "complete" || document.readyState === "loaded") {*/
                                // hideImageLoading();
                            	//createChristmasNewYearMessage(router.locale);
                                /*createSnowfallEffect(".menu-primary", "#FFF", 100);
                                createSnowfallEffect(".menu-second", "#FFF", 50);
                                createSnowfallEffect(".menu-third", "#ECB932", 25);
                                createSnowfallEffect(".footer", "#FFF", 100);
                            } else {*/
                                // hideImageLoading();
                            	//createChristmasNewYearMessage(router.locale);
                                /*createSnowfallEffect(".menu-primary", "#FFF", 100);
                                createSnowfallEffect(".menu-second", "#FFF", 50);
                                createSnowfallEffect(".menu-third", "#ECB932", 25);
                                createSnowfallEffect(".footer", "#FFF", 100);
                            }
                        }, false);
                    } else {
                        if (document.readyState === 'complete' || document.readyState === "loaded") {*/
                            // hideImageLoading();
                        	//createChristmasNewYearMessage(router.locale);
                            /*createSnowfallEffect(".menu-primary", "#FFF", 100);
                            createSnowfallEffect(".menu-second", "#FFF", 50);
                            createSnowfallEffect(".menu-third", "#ECB932", 25);
                            createSnowfallEffect(".footer", "#FFF", 100);
                        } else {
                            window.addEventListener('load', function () {*/
                                // hideImageLoading();
                            	//createChristmasNewYearMessage(router.locale);
                                /*createSnowfallEffect(".menu-primary", "#FFF", 100);
                                createSnowfallEffect(".menu-second", "#FFF", 50);
                                createSnowfallEffect(".menu-third", "#ECB932", 25);
                                createSnowfallEffect(".footer", "#FFF", 100);
                            }, false);
                        }
                    }
                } else {
                    if (document.onreadystatechange) {
                        document.onreadystatechange = function () {
                            if (document.readyState === "complete" || document.readyState === "loaded") {*/
                                // hideImageLoading();
                            	//createChristmasNewYearMessage(router.locale);
                                /*createSnowfallEffect(".menu-primary", "#FFF", 100);
                                createSnowfallEffect(".menu-second", "#FFF", 50);
                                createSnowfallEffect(".menu-third", "#ECB932", 25);
                                createSnowfallEffect(".footer", "#FFF", 100);
                            }
                        }
                    } else {
                        window.onload = function () {*/
                            // hideImageLoading();
                        	//createChristmasNewYearMessage(router.locale);
                            /*createSnowfallEffect(".menu-primary", "#FFF", 100);
                            createSnowfallEffect(".menu-second", "#FFF", 50);
                            createSnowfallEffect(".menu-third", "#ECB932", 25);
                            createSnowfallEffect(".footer", "#FFF", 100);
                        };
                    }
                }
            }
        } else {
            window.onload = function () {*/
                // hideImageLoading();
            	//createChristmasNewYearMessage(router.locale);
                /*createSnowfallEffect(".menu-primary", "#FFF", 100);
                createSnowfallEffect(".menu-second", "#FFF", 50);
                createSnowfallEffect(".menu-third", "#ECB932", 25);
                createSnowfallEffect(".footer", "#FFF", 100);
            };
        };*/

        window.addEventListener("scroll", () => {
            const scrolled = document.documentElement.scrollTop;
            if (scrolled > 600) {
                setShowButton(true);
            } else if (scrolled <= 300) {
                setShowButton(false);
            }
        });

    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (<>
            {/*<button className="animation-christmas" data-toggle="tooltip" data-placement="bottom" title={router.locale === "es" ? "Feliz navidad y próspero año nuevo 2026!" : (router.locale === "en" ? "Merry Christmas and Happy New Year 2026!" : "Feliz Natal e Próspero Ano Novo de 2026!")}>
            <img src="/assets/img/navidad-2023.gif" alt={router.locale === "es" ? "Anuncio navideño UTEQ" : (router.locale === "en" ? "UTEQ Christmas advertisement" : "Anúncio de Natal da UTEQ")} width="70" height="70" />
        </button>*/}
            {/*<div className="loader-container" style={{ position: "fixed", width: "100%", height: "100vh", background: `#FFF url(/assets/img/img-loading-uteq-min.gif) no-repeat center center`, zIndex: "9999" }}></div>*/}
        <div className="App">
            <ErrorBoundary>
                <Component {...pageProps} />
            </ErrorBoundary>
            <button className="btn scroll-top" onClick={scrollToTop} style={{ display: showButton ? 'inline' : 'none' }} data-scroll="up" type="button" data-toggle="tooltip" data-placement="bottom" title={router.locale === "es" ? "Regresar arriba" : (router.locale === "en" ? "Back to top" : "Voltar ao início")}>
                <i className="fa fa-chevron-up"></i>
            </button>
        </div>
    </>);

}