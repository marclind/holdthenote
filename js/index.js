const noteValue = document.querySelector('.noteValue');

/*
 * 
 */

//HANS mediaStreamSource är VÅRAN input

let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let analyser = audioContext.createAnalyser();
let scriptProcessor = audioContext.createScriptProcessor();
let MAX_SIZE = Math.max(4, Math.floor(audioContext.sampleRate / 5000));
let MIN_SAMPLES = 0;  // will be initialized when AudioContext is created.
let GOOD_ENOUGH_CORRELATION = 0.9; // this is the "bar" for how close a correlation needs to be
let rafID = null;
let tracks = null;
let buflen = 1024;
let buf = new Float32Array(buflen);
let note;

//hämta mic input
navigator.mediaDevices
	.getUserMedia({ audio: true })
	.then(allt)
	.catch(function (err) {
		console.log("FEL SOM FAN: ", err.message);
	});

function allt(localStream) {
	//VARIABLES
	let input = audioContext.createMediaStreamSource(localStream);

	//ANALYZER SETUP
	analyser.smoothingTimeConstant = 0;
	analyser.fftSize = 2048;

	//CONNECTS
	input.connect(analyser);
	analyser.connect(scriptProcessor);
	scriptProcessor.connect(audioContext.destination);
	scriptProcessor.onaudioprocess = onAudio;

	//Här körs updatePitch
	updatePitch();
}

function getAverageVolume(array) {
	//console.log(array)

	let length = array.length;
	let values = 0;
	let i = 0;
	for (; i < length; i++) {
		values += array[i];
	}
	return values / length;
}

function onAudio() {
	let tempArray = new window.Uint8Array(analyser.frequencyBinCount);
	//console.log(analyser)
	analyser.getByteFrequencyData(tempArray);
	//console.log(tempArray)
	let latestFrequency = getAverageVolume(tempArray);
	//console.log(latestFrequency)

	//use latestFrequency
}

function autoCorrelate(buf, sampleRate) {
	let SIZE = buf.length;
	let MAX_SAMPLES = Math.floor(SIZE / 2);
	let best_offset = -1;
	let best_correlation = 0;
	let rms = 0;
	let foundGoodCorrelation = false;
	let correlations = new Array(MAX_SAMPLES);

	for (let i = 0; i < SIZE; i++) {
		let val = buf[i];
		rms += val * val;
	}
	rms = Math.sqrt(rms / SIZE);
	if (rms < 0.01) // not enough signal
		return -1;

	let lastCorrelation = 1;
	for (let offset = MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
		let correlation = 0;

		for (let i = 0; i < MAX_SAMPLES; i++) {
			correlation += Math.abs((buf[i]) - (buf[i + offset]));
		}
		correlation = 1 - (correlation / MAX_SAMPLES);
		correlations[offset] = correlation; // store it, for the tweaking we need to do below.
		if ((correlation > GOOD_ENOUGH_CORRELATION) && (correlation > lastCorrelation)) {
			foundGoodCorrelation = true;
			if (correlation > best_correlation) {
				best_correlation = correlation;
				best_offset = offset;
			}
		} else if (foundGoodCorrelation) {
			// short-circuit - we found a good correlation, then a bad one, so we'd just be seeing copies from here.
			// Now we need to tweak the offset - by interpolating between the values to the left and right of the
			// best offset, and shifting it a bit.  This is complex, and HACKY in this code (happy to take PRs!) -
			// we need to do a curve fit on correlations[] around best_offset in order to better determine precise
			// (anti-aliased) offset.

			// we know best_offset >=1, 
			// since foundGoodCorrelation cannot go to true until the second pass (offset=1), and 
			// we can't drop into this clause until the following pass (else if).
			let shift = (correlations[best_offset + 1] - correlations[best_offset - 1]) / correlations[best_offset];
			return sampleRate / (best_offset + (8 * shift));
		}
		lastCorrelation = correlation;
	}
	if (best_correlation > 0.01) {
		// console.log("f = " + sampleRate/best_offset + "Hz (rms: " + rms + " confidence: " + best_correlation + ")")
		return sampleRate / best_offset;
	}
	return -1;
	//	var best_frequency = sampleRate/best_offset;
}

function updatePitch(time) {
	let cycles = new Array;
	analyser.getFloatTimeDomainData(buf);
	let ac = autoCorrelate(buf, audioContext.sampleRate);
	// TODO: Paint confidence meter on canvasElem here.

	/* if (DEBUGCANVAS) {  // This draws the current waveform, useful for debugging
		waveCanvas.clearRect(0,0,512,256);
		waveCanvas.strokeStyle = "red";
		waveCanvas.beginPath();
		waveCanvas.moveTo(0,0);
		waveCanvas.lineTo(0,256);
		waveCanvas.moveTo(128,0);
		waveCanvas.lineTo(128,256);
		waveCanvas.moveTo(256,0);
		waveCanvas.lineTo(256,256);
		waveCanvas.moveTo(384,0);
		waveCanvas.lineTo(384,256);
		waveCanvas.moveTo(512,0);
		waveCanvas.lineTo(512,256);
		waveCanvas.stroke();
		waveCanvas.strokeStyle = "black";
		waveCanvas.beginPath();
		waveCanvas.moveTo(0,buf[0]);
		for (var i=1;i<512;i++) {
			waveCanvas.lineTo(i,128+(buf[i]*128));
		}
		waveCanvas.stroke();
	} */

	if (ac == -1) {
		noteValue.innerHTML = "0";
		note = 0;
		/* detectorElem.className = "vague";
	  pitchElem.innerText = "--";
	noteElem.innerText = "-";
	detuneElem.className = "";
	detuneAmount.innerText = "--"; */
	} else {
		//detectorElem.className = "confident";
		pitch = ac;
		//pitchElem.innerText = Math.round( pitch ) ;
		note = noteFromPitch(pitch);
		noteValue.innerHTML = note;
		// noteElem.innerHTML = noteStrings[note%12];
		let detune = centsOffFromPitch(pitch, note);
		// if (detune == 0 ) {
		// 	//detuneElem.className = "";
		// 	//detuneAmount.innerHTML = "--";
		// } else {
		//     if (detune < 0)
		//     console.log("detune less than zero")
		// 		//detuneElem.className = "flat";
		//     else
		//     console.log("detune is else")
		// 		//detuneElem.className = "sharp";
		// 	//detuneAmount.innerHTML = Math.abs( detune );
		// }
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = window.webkitRequestAnimationFrame;
	rafID = window.requestAnimationFrame(updatePitch);
}

let noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function noteFromPitch(frequency) {
	let noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
	return Math.round(noteNum) + 69;
}

function frequencyFromNoteNumber(note) {
	return 440 * Math.pow(2, (note - 69) / 12);
}

function centsOffFromPitch(frequency, note) {
	return Math.floor(1200 * Math.log(frequency / frequencyFromNoteNumber(note)) / Math.log(2));
}