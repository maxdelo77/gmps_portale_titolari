/**
 * Author: m.corallo
 * 
 * funzioni javascript per la pagina di login
 */

// XML OBJECT
function getXMLObject() {
	var xmlHttp = false;
	try {
		xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); // For Old Microsoft
		// Browsers
	} catch (e) {
		try {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); // For Microsoft
			// IE 6.0+
		} catch (e2) {
			xmlHttp = false; // No Browser accepts the XMLHTTP Object then
			// false
		}
	}
	if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
		xmlHttp = new XMLHttpRequest(); // For Mozilla, Opera Browsers
	}
	return xmlHttp;
}

var xmlhttp = new getXMLObject();

function submitForm() {
	if (xmlhttp) {
		xmlhttp.open("POST", "main", true);
		xmlhttp.onreadystatechange = handleServerResponse;
		xmlhttp.setRequestHeader('Content-Type',
				'application/x-www-form-urlencoded');

		if (document.regForm.username) {
			var parameters = "username=" + document.regForm.username.value;
			parameters += "&";
			parameters += "password=" + document.regForm.password.value;
			xmlhttp.send(parameters);
		} else if (document.regForm.panField) {
			var parameters = "panField=" + document.regForm.panField.value;
			xmlhttp.send(parameters);
		}

		document.getElementById("errorMessageDiv").innerHTML = "loading...";
	}
}

function handleServerResponse() {
	if (xmlhttp.readyState == 4) {
		if (xmlhttp.status == 200) {

			var jsonT = eval('(' + xmlhttp.responseText + ')');
			var message = jsonT.message;
			var expired = jsonT.expired;
			var multiple = jsonT.multiple;
			var mail_error = jsonT.mail_error;
			var addcard = jsonT.addcard;

			var loc;
			var par;
			if (document.regForm.panField) {
				if (!message) {
					if (!multiple) {
						loc = 'titolariCC.html';
						// window.location='titolariCC.html';
					} else {
						loc = 'titolariCC.html?multiple=' + multiple;
						// window.location='titolariCC.html?multiple='+multiple;
					}
				} else {
					document.getElementById("errorMessageDiv").innerHTML = message;
				}
			} else {
				if (addcard != "" && addcard != null) {
					alert(message);
					loc = 'titolari.html?id=eCCeB4y6aP&addcard=' + addcard;
					// window.location='titolari.html?id=eCCeB4y6aP&addcard='+addcard;
				} else if (expired != "" && expired != null) {
					loc = 'titolari.html?id=osjYyZV7SQ&expired=' + expired;
					// window.location='titolari.html?id=osjYyZV7SQ&expired='+expired;
				} else if (mail_error != "" && mail_error != null) {
					par = 'titolari.html?id=6RSoxoQucK&mail_error='
							+ mail_error;
					// parent.location='titolari.html?id=6RSoxoQucK&mail_error='+mail_error;
				} else if (!message) {
					loc = 'titolari.html';
					// window.location='titolari.html';
				} else {
					document.getElementById("errorMessageDiv").innerHTML = message;
				}
			}

			setLocation(loc, par);

			document.regForm.reset();
		} else {
			alert("Servizio non disponibile");
			document.getElementById("errorMessageDiv").innerHTML = "";
			deleteCookie("ckLogin");
		}
	}
}

function setLocation(loc, par) {
	var port_number = window.location.href.split('/')[2].split(':')[1];
	var hostedParams = '';
	if (port_number == '8888') {
		hostedParams = 'gwt.codesvr=127.0.0.1:9997';
	}

	if (loc) {
		if (hostedParams) {
			if (loc.indexOf('?') != -1) {
				loc = loc + '&' + hostedParams;
			} else {
				loc = loc + '?' + hostedParams;
			}
		}
		window.location = loc;
	} else if (par) {
		if (par.indexOf('?') != -1) {
			par = par + '&' + hostedParams;
		} else {
			par = par + '?' + hostedParams;
		}
		parent.location = par;
	}
}

// this deletes the cookie when called
function deleteCookie(name) {
	if (getCookie(name)) {
		document.cookie = name + "=" + ((path) ? ";path=" + "" : "")
				+ ((domain) ? ";domain=" + "" : "")
				+ ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
	}
}

// this function gets the cookie, if it exists
// don't use this, it's weak and does not handle some cases
// correctly, this is just to maintain legacy information
function getCookie(name) {
	var start = document.cookie.indexOf(name + "=");
	var len = start + name.length + 1;
	if ((!start) && (name != document.cookie.substring(0, name.length))) {
		return null;
	}

	if (start == -1) {
		return null;
	}
	var end = document.cookie.indexOf(";", len);
	if (end == -1) {
		end = document.cookie.length;
	}

	return unescape(document.cookie.substring(len, end));
}

// GESTIONE EVENTI

function registrazione() {

	// var usernameField = document.getElementById("usernameField");
	// usernameField.setAttribute("value", "");
	// var passwordField = document.getElementById("passwordField");
	// passwordField.setAttribute("value", "");
	try {
		document.regForm.username.value = '';
		document.regForm.giorno.value = '';
		document.regForm.mese.value = '';
		document.regForm.anno.value = '';
	} catch (e) {
	}

	var regHidden = document.createElement("input");
	regHidden.setAttribute("type", "hidden");
	regHidden.setAttribute("name", "registrazione");
	regHidden.setAttribute("value", "true");
	document.regForm.appendChild(regHidden);

	document.getElementById("errorMessageDiv").innerHTML = "loading...";
	var par = 'titolari.html?registrazione';
	setLocation(null, par);
}

function recupero() {
	var regHidden = document.createElement("input");
	regHidden.setAttribute("type", "hidden");
	regHidden.setAttribute("name", "recupero");
	regHidden.setAttribute("value", "true");
	document.regForm.appendChild(regHidden);

	document.getElementById("errorMessageDiv").innerHTML = "loading...";
	var par = 'titolari.html?recupero';
	setLocation(null, par);
}

function recuperoB() {
	var regHidden = document.createElement("input");
	regHidden.setAttribute("type", "hidden");
	regHidden.setAttribute("name", "recuperoB");
	regHidden.setAttribute("value", "true");

	document.getElementById("errorMessageDiv").innerHTML = "loading...";
	var par = 'titolari.html?recuperoB';
	setLocation(null, par);
}

function pagePassword() {
	var width = 750;
	var height = 490;
	var s_width = window.screen.availWidth;
	var s_height = window.screen.availHeight;
	var left = (s_width - width) / 2;
	var top = (s_height - height) / 2;
	var posi = "width=" + width + ",height=" + height + ",left=" + left
			+ ",top=" + top + ",screenX=" + left + ",screenY=" + top + ",";
	var params = "scrollbars=auto,toolbar=no,location=no,directories=no,status=no,menubar=no,copyhistory=yes";
	window.open("pt/pages/black/password.html", "", posi + params);
}

function goLogin() {
	if (document.regForm.username.value != ""
			&& document.regForm.password.value != "") {
		submitForm();
	} else {
		alert("ATTENZIONE: Per proseguire inserire Nome utente e Password");
	}
}

function goLoginPAN() {
	if (document.regForm.panField.value != "") {
		submitForm();
	} else {
		alert("ATTENZIONE: Per proseguire inserire il PAN");
	}
}

function onEnterKey(field, e, what) {
	var keynum
	if (window.event) { // IE
		keynum = e.keyCode
	} else if (e.which) { // Netscape/Firefox/Opera
		keynum = e.which
	}
	if (13 == keynum) {
		return eval(what);
	} else {
		return true;
	}
}

function setCookie(c_name, value) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + 1);
	document.cookie = c_name + "=" + escape(value) + ";expires="
			+ exdate.toGMTString();
}

// rimuovere
function invalidate() {
	var username = document.regForm.username.value;
	if (username) {
		if (xmlhttp) {
			xmlhttp.open("GET", "main?ic=" + username, true);
			xmlhttp.onreadystatechange = checkInvalidateResult;
			xmlhttp.setRequestHeader('Content-Type',
					'application/x-www-form-urlencoded');
			xmlhttp.send(null);
		}
	}
}

function checkInvalidateResult() {
	if (xmlhttp.readyState == 4) {
		if (xmlhttp.status == 200) {
			var error = xmlhttp.getResponseHeader("error");
			if (error) {
				document.getElementById("errorMessageDiv").innerHTML = "Errore nell'invalidare la cache.";
			} else {
				document.getElementById("errorMessageDiv").innerHTML = "Cache invalidata.";
			}
		} else {
			document.getElementById("errorMessageDiv").innerHTML = "Servizio non disponibile";
		}
	}
}

function reloadLanguage() {
	if (xmlhttp) {
		xmlhttp.open("GET", "main?rl", true);
		xmlhttp.onreadystatechange = checkReloadLanguageResult;
		xmlhttp.setRequestHeader('Content-Type',
				'application/x-www-form-urlencoded');
		xmlhttp.send(null);
	}
}

function checkReloadLanguageResult() {
	if (xmlhttp.readyState == 4) {
		if (xmlhttp.status == 200) {
			var error = xmlhttp.getResponseHeader("error");
			if (error) {
				document.getElementById("errorMessageDiv").innerHTML = "Error reloading language.";
			} else {
				document.getElementById("errorMessageDiv").innerHTML = "Language reloaded.";
			}
		} else {
			document.getElementById("errorMessageDiv").innerHTML = "Servizio non disponibile";
		}
	}
}

function reloadResources() {
	if (xmlhttp) {
		xmlhttp.open("GET", "main?rr", true);
		xmlhttp.onreadystatechange = checkReloadResourcesResult;
		xmlhttp.setRequestHeader('Content-Type',
				'application/x-www-form-urlencoded');
		xmlhttp.send(null);
	}
}

function checkReloadResourcesResult() {
	if (xmlhttp.readyState == 4) {
		if (xmlhttp.status == 200) {
			var error = xmlhttp.getResponseHeader("error");
			if (error) {
				document.getElementById("errorMessageDiv").innerHTML = "Error reloading resources.";
			} else {
				document.getElementById("errorMessageDiv").innerHTML = "Resources reloaded.";
			}
		} else {
			document.getElementById("errorMessageDiv").innerHTML = "Servizio non disponibile";
		}
	}
}
// fine rimuovere
