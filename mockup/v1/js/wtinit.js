// WebTrends SmartSource Data Collector Tag
// Version: 1.1.0
// Created: 2/10/2008 17:53:46 AM
function DcsInit(){
	var that=this;
	this.dcsid="dcsggvwrq000004nw3k9q1fqx_4x6i";
	this.domain="statse.webtrendslive.com";
	this.enabled=true;
	this.exre=(function(){return(window.RegExp?new RegExp("dcs(uri)|(ref)|(aut)|(met)|(sta)|(sip)|(pro)|(byt)|(dat)|(p3p)|(cfg)|(redirect)|(cip)","i"):"");})();
	this.fpc="WT_FPC";
	this.fpcdom=".cartasi.it";
	this.i18n=false;
	this.images=[];
	this.index=0;
	this.qp=[];
	this.re=(function(){return(window.RegExp?(that.i18n?{"%25":/\%/g}:{"%09":/\t/g,"%20":/ /g,"%23":/\#/g,"%26":/\&/g,"%2B":/\+/g,"%3F":/\?/g,"%5C":/\\/g,"%22":/\"/g,"%7F":/\x7F/g,"%A0":/\xA0/g}):"");})();
	this.timezone=1;
	this.trackevents=true;
	var content0;// added by Ingenium
	(function(){
		// modified by Ingenium
		if(that.enabled&&(document.cookie.indexOf(that.fpc+"=")==-1)&&(document.cookie.indexOf("WTLOPTOUT=")==-1)){
		    content0 = "<script defer='defer' type='text/javascript'  language='javascript' src='"+"http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+that.domain+"/"+that.dcsid+"/wtid.js"+"'><\/script>";
		}})();
		this.strwt = content0;// added by Ingenium
}

// added by Ingenium
function getDcsInitStrwt(){
	dcsInit = new DcsInit();
	return dcsInit.strwt;
}

// added by Ingenium
function initVars(){
	if (typeof(DCS)=="undefined"){
	    var DCS = new Object();
	}
	if (typeof(WT) == "undefined"){
	    var WT = new Object();
	}
	if (typeof(DCSext)=="undefined"){
	    var DCSext=new Object();
	}
}

if (typeof(DCS)=="undefined"){
    var DCS = new Object();
}
if (typeof(WT) == "undefined"){
    var WT = new Object();
}
if (typeof(DCSext)=="undefined"){
    var DCSext=new Object();
}
