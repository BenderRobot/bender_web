/* start script javascript*/
var type = 0;
var final_transcript = '';
var recognizing = false;
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

recognition.onstart = function() {
	recognizing = true;
	mic_img.src = 'Mic-Animation.gif';
};
recognition.onend = function() {
	recognizing = false;
	mic_img.src = 'Mic.gif';
	request(readData);
	type = 1;
	make_bulle(type, final_transcript);
	final_transcript = "";
	document.getElementById("results").style.display = "none";
};
recognition.onresult = function(event) {
	var interim_transcript = '';
	var i = 0;
	var test = '';
	document.getElementById("results").style.display = "inline";
	for (i = event.resultIndex; i < event.results.length; i++) {
		if (event.results[i].isFinal) {
			final_transcript = event.results[i][0].transcript;
		} else {
			interim_transcript += event.results[i][0].transcript;
		}
	}
	final_transcript = capitalize(final_transcript);
	final_span.innerHTML = linebreak(final_transcript);
	interim_span.innerHTML = linebreak(interim_transcript);
	document.getElementById("results").scrollIntoView();

};
var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
	return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}
var first_char = /\S/;
function capitalize(s) {
	return s.replace(first_char, function(m) { return m.toUpperCase(); });
}
function start_mic(event) {
	if (recognizing) {
		recognition.stop();
		return;
	}
	recognition.lang = "fr-FR";
	recognition.start();
}
function request(callback) {
	var xhr = new getXMLHttpRequest();
	var url ='handlingData.php?state=';
	var cmd = "";
	if (document.getElementById("start_mic").style.display == "inline") {
		cmd = encodeURIComponent(final_transcript);
	} else {
		cmd = encodeURIComponent(document.getElementById("request").value);
	}
	url += cmd;
	xhr.onreadystatechange = function() {
		if (xhr.readyState < 4) {
			document.getElementById("loader").style.display = "inline";
		
		} else if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
			alert(xhr.responseText);
			callback(xhr.responseText);
			document.getElementById("loader").style.display = "none";		
		}
	};
	xhr.open('GET', url, true);
	xhr.send();
	
}

function readData(sData) {
	if (sData != "fail") {
		type = 2;
		sData = capitalize(sData);
		sData = linebreak(sData);
		make_bulle(type, sData);
	} else {
		alert(sData);
	}
}
function make_bulle(tp, txt) {
	var id_bulle = "";
	var new_div = document.createElement("div");
	var bulle_div = document.createElement("div");
	var t = document.createTextNode(txt);
	if (tp == 1) {
		new_div.id = "usr";
	} else {
		new_div.id = "bender";
	}
	bulle_div.id = "bulle_div"
	new_div.appendChild(t);
	bulle_div.appendChild(new_div);
	document.getElementById("make_bulle_div").appendChild(bulle_div);
	document.getElementById("chat_area").scrollTop = document.getElementById("chat_area").scrollHeight;
}
function start_key() {
	document.getElementById("start_mic").style.display = "none";
	document.getElementById("start_key").style.display = "none";
	document.getElementById("request").style.display = "inline";
	document.getElementById("btn_request").style.display = "inline";
	document.getElementById("return_mic").style.display = "inline";
}
function txt_request() {
	var value = document.getElementById("request").value;
	value = capitalize(value);
	value = linebreak(value);
	type = 1;
	make_bulle(type, value);
	request(readData);
}
function return_mic() {
	document.getElementById("start_mic").style.display = "inline";
	document.getElementById("start_key").style.display = "inline";
	document.getElementById("request").style.display = "none";
	document.getElementById("btn_request").style.display = "none";
	document.getElementById("return_mic").style.display = "none";
}
/* end script */
