import React, { useState, useEffect, useCallback } from 'react';

export { SpeechText };

function SpeechText(textIn) {

    const [textRead, setTextRead] = useState("");

    useEffect(() => {
        setTextRead(textIn.replace(/(<([^>]+)>)/ig, ''));
    }, []);

    function speechPlayHandleMessage() {
        try {
            const messageParts = textRead.split('--$$$***--');
            let currentIndex = 0

            const speak = (textToSpeak) => {
                var speech = new SpeechSynthesisUtterance();
                const voices = window.speechSynthesis.getVoices();
                speech.voice = voices[0];
                speech.volume = 1;
                speech.rate = 1;
                speech.pitch = .1;
                speech.text = textToSpeak;
                speech.lang = 'es-ES';

                speech.onend = function () {
                    currentIndex++;
                    if (currentIndex < messageParts.length) {
                        setTimeout(() => {
                            speak(messageParts[currentIndex])
                        }, 500)
                    }
                };

                if (window.speechSynthesis.pending) {
                    window.speechSynthesis.resume();
                } else {
                    window.speechSynthesis.speak(speech);
                }
            }
            speak(messageParts[0])
        } catch (e) {
            console.error(e);
            window.speechSynthesis.cancel();
        }
    }

    function speechPauseHandleMessage() {
        try {
            if(!window.speechSynthesis.paused && window.speechSynthesis.speaking){
                window.speechSynthesis.pause();
            }
        } catch (e) {
            console.error(e);
            window.speechSynthesis.cancel();
        }
    }

    return (<>
        <div className="col-md-12 mb-1">
            <center>
                <span className="badge bg-success badge-speech" data-toggle="tooltip" data-placement="bottom" title="Iniciar lectura" onClick={speechPlayHandleMessage}><i className="fa fa-1x fa-volume-up p-2 mr-2" aria-hidden="true"></i></span>&nbsp;&nbsp;
                <span className="badge bg-warning badge-speech" data-toggle="tooltip" data-placement="bottom" title="Pausar lectura" onClick={speechPauseHandleMessage}><i className="fa fa-1x fa-pause p-2" aria-hidden="true"></i></span>
            </center>
        </div>
    </>)

}