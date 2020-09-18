window.onload = function () {

    // let audioInput;
    // let audioNode;

    // let bufferSize = 4096;
    // let startDate;
    // let audioCtx;

    // audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // if (audioCtx.createJavaScriptNode) {
    //     audioNode = audioCtx.createJavaScriptNode(bufferSize, 1, 1);
    // } else if (audioCtx.createScriptProcessor) {
    //     audioNode = audioCtx.createScriptProcessor(bufferSize, 1, 1);
    // } else {
    //     throw 'WebAudio not supported!';
    // }

    // // connect returns a reference to the destination AudioNode
    // audioNode.connect(audioCtx.destination);
    
    // getUserMedia(constraints)
    //     .then(success())
    //     .catch(error())

    // let constraints = { audio: true };
    // navigator.mediaDevices.getUserMedia(constraints)
    //     .then(function (mediaStream) {
    //         console.log("SUCCESS");
    //         // window.localStream = mediaStream;
    //         // audioInput = audioCtx.createMediaStreamSource(mediaStream);
    //         console.log('mediaStream: ', mediaStream);
    //         // audioInput.connect(audioNode);

    //     })
    //     .catch(function (err) {
    //         console.log("ERROR: " + err.message);
    //     });

    var audioCtx = new (window.AudioContext || window.webkitAudioContext);
    var sine = audioCtx.createOscillator();
    sine.start();
    sine.connect(audioCtx.destination);

    //create the context for the web audio
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    //create, tune, start and connect each oscillator sinea, sineb and sinec
    var sinea = audioCtx.createOscillator();
    sinea.frequency.value = 440;
    sinea.type = "sine";
    sinea.start();
    sinea.connect(audioCtx.destination);

    var sineb = audioCtx.createOscillator();
    sineb.frequency.value = 523.25;
    sineb.type = "sine";
    sineb.start();
    sineb.connect(audioCtx.destination);

    var sinec = audioCtx.createOscillator();
    sinec.frequency.value = 698.46;
    sinec.type = "sine";
    sinec.start();
    sinec.connect(audioCtx.destination);

}
