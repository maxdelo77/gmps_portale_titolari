/**
	Author: Emanuele Crocilla'
	
	JavaScript functions used by the Html modules contained in configDir/html
	(can be used also into the gwt application).
 */

/** show a window containing the image passed as parameter */
function showImageWindow(title, image, width, height) {
	var win = new Ext.Window({
		width : width,
		height : height,
		title : title,
		autoScroll : true,
		modal : true,
		html : "<img src='" + image + "'>",
		y : 100
	});
	win.show();
}

/** show a window containing the html passed as parameter */
function showHtmlWindow(title, html, width, height) {
	var win = new Ext.Window({
		width : width,
		height : height,
		title : title,
		autoScroll : true,
		modal : true,
		html : html,
		id : "popUpExtWindow",
		y : 100
	});
	win.show();
}

/**
 * use in a showHtmlWindow to print the content of the popup
 * 
 * @author mbordin
 */
function printHtmlWindow() {
	printHtmlWindow(document.getElementById('popUpExtWindow').innerHTML);
}

function printHtmlWindow(content) {

	var popPrint = window.open("", "popPrint");

	popPrint.document.write('<html><head>');

	for ( var i = 0; document.getElementsByTagName('link')[i]; i++) {
		if (document.getElementsByTagName('link')[i].href) {
			popPrint.document
					.write('<link rel="stylesheet" type="text/css" href="'
							+ document.getElementsByTagName('link')[i].href
							+ '">');
		}
	}

	popPrint.document
			.write('<link rel="stylesheet" type="text/css" href="pt/css/titolari-print.css"/>');

	popPrint.document.write('</head><body>');
	popPrint.document.write('<div class="main_print_panel">');
	popPrint.document.write(content);
	popPrint.document.write('</div></body></html>');

	// popPrint.document.close();

	popPrint.print();
	popPrint.close();

}

// deprecated - this method do not works
function submitHiddenValues_old(theUrl, values) {
	var myField = new Ext.form.Field({
		autoCreate : {
			tag : 'input',
			type : 'hidden',
			name : 'myhidden'
		}
	});
	var fs = new Ext.FormPanel({
		url : "/test", // theUrl,
		method : 'post' // , target:'main_pos'
	});
	fs.add(myField);
	fs.form.submit();
}

// values pattern: name0=value0,value1=value1,value2=value2
function submitHiddenValues(url, values) {
	document.write("<form method='post' name='myform' action='" + url + "'>");
	var vv = values.split(",");
	var name, value, vvSplitted;
	for (ii = 0; ii < vv.length; ii++) {
		vvSplitted = vv[ii].split("=");
		name = vvSplitted[0];
		value = vvSplitted[1];
		document.write("<INPUT type='hidden' name='" + name + "' value='"
				+ value + "'/>");
	}
	document.write("</form>");
	document.myform.submit();
}

function getRoundedButtonPrint() {
	// TODO
}

function printOperativeArea() {
	printArea('operativeArea');

}

function printArea(areaId) {
	var popPrint = window.open('', '', 'width=900');

	popPrint.document.write('<html><head>');

	for ( var i = 0; document.getElementsByTagName('link')[i]; i++) {
		if (document.getElementsByTagName('link')[i].href) {
			popPrint.document
					.write('<link rel="stylesheet" type="text/css" href="'
							+ document.getElementsByTagName('link')[i].href
							+ '">');
		}
	}
	popPrint.document
			.write('<link rel="stylesheet" type="text/css" href="pt/css/titolari-print.css"/>');

	popPrint.document.write('</head><body>');
	popPrint.document.write('<div class="main_print_panel">');

	// popPrint.document.write('<p><a href="javascript:self.close()">Close</a>
	// the popup.</p>');

	popPrint.document.write(document.getElementById(areaId).innerHTML);

	popPrint.document.write('</div></body></html>');

	popPrint.document.close();
	popPrint.print();
	popPrint.close();

}

/* BUBBLE servizio clienti */
function showToolTip(e, text) {
	if (document.all)
		e = event;

	var obj = document.getElementById('bubble_tooltip');
	var obj2 = document.getElementById('bubble_tooltip_content');
	obj2.innerHTML = text;
	obj.style.display = 'block';
	var st = Math.max(document.body.scrollTop,
			document.documentElement.scrollTop);
	var leftPos = e.clientX - 100;
	if (leftPos < 0)
		leftPos = 0;
	obj.style.left = leftPos + 'px';
	obj.style.top = e.clientY - obj.offsetHeight - 1 + st + 'px';
}

function hideToolTip() {
	document.getElementById('bubble_tooltip').style.display = 'none';
}

function recupero() {
	setLocation(null, 'titolari.html?recupero');
}

function recuperoDaRegistrazione() {
	setLocation('titolari.html?recuperoR');
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

Ext.form.Field = Ext.extend(Ext.BoxComponent, {
	markInvalid : function(C) {
		if (!this.rendered || this.preventMark) {
			return
		}
		this.el.addClass(this.invalidClass);
		C = C || this.invalidText;
		switch (this.msgTarget) {
		case "qtip":
			this.el.dom.qtip = C;
			this.el.dom.qclass = "x-form-invalid-tip";
			if (Ext.QuickTips) {
				Ext.QuickTips.enable()
			}
			break;
		case "title":
			this.el.dom.title = C;
			break;
		case "under":
			if (!this.errorEl) {
				var B = this.el.findParent(".x-form-element", 5, true);
				this.errorEl = B.createChild({
					cls : "x-form-invalid-msg"
				});
				this.errorEl.setWidth(B.getWidth(true) - 20)
			}
			this.errorEl.update(C);
			Ext.form.Field.msgFx[this.msgFx].show(this.errorEl, this);
			break;
		case "side":
			if (!this.errorIcon) {
				var B = this.el.findParent(".x-form-element", 5, true);
				// MCORALLO - modifica per risolvere un bug di ext [aggiunto
				// 'if(B)']
				if(B){
					this.errorIcon = B.createChild({
						cls : "x-form-invalid-icon"
					})
				}
			}
			this.alignErrorIcon();
			this.errorIcon.dom.qtip = C;
			this.errorIcon.dom.qclass = "x-form-invalid-tip";
			this.errorIcon.show();
			this.on("resize", this.alignErrorIcon, this);
			break;
		default:
			var A = Ext.getDom(this.msgTarget);
			A.innerHTML = C;
			A.style.display = this.msgDisplay;
			break
		}
		this.fireEvent("invalid", this, C)
	}
});