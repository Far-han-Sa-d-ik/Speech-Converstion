const output = document.getElementById('output')
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition();

function start() {
    recognition.start()
    recognition.onresult = function(event) {
        console.log(event.results[0][0].transcript);
        output.innerText = event.results[0][0].transcript;
    }
}

function speak() {
    if (!output.value) return;
    let speech = new SpeechSynthesisUtterance(output.value);

    if (output.value === "") {
        window.speechSynthesis.speak("Hello idiot, the box is empty.");
    }
    
    const voices = window.speechSynthesis.getVoices();
    
    const femaleVoice = voices.find(voice => 
        voice.name.includes('Zira') || 
        voice.name.includes('Google US English') || 
        voice.name.includes('Samantha') ||
        voice.name.includes('Microsoft Hazel')
    ) || voices.find(voice => voice.lang.includes('en'));

    if (femaleVoice) {
        speech.voice = femaleVoice;
    }

    window.speechSynthesis.speak(speech);
}

if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}