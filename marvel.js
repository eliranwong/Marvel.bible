/* Display message */
function messageUser(messageHeader, message) {
document.getElementById('myMessageHeader').innerHTML = messageHeader;
document.getElementById('myMessage').innerHTML = message;
modal2.style.display = "block";
}

/* FIXING iOS SCROLLING ISSUES */

function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }
    if (/android/i.test(userAgent)) {
        return "Android";
    }
    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }
    return "unknown";
}

function resizeSite() {
// For iPhone ONLY, if ((/iPhone|iPod/.test(navigator.userAgent)) && (!window.MSStream)) { }
if (getMobileOperatingSystem() == 'iOS') { disableIOSScrolling(); }

var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

var screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
if (screenWidth >= screenHeight) {landscape = 1;}
else if (screenHeight >= screenWidth) {landscape = 0;}

var contentHeight = screenHeight - 52;

var addSpace;
if ((landscape == 0) && (paraWin == 2)) {addSpace = (contentHeight / 2) - 110;}
else {addSpace = contentHeight - 110;}
if (addSpace <= 0) {addSpace = 1;}

var bibleFrame = document.getElementById('bibleFrame');
var bibleDoc = bibleFrame.contentDocument || bibleFrame.contentWindow.document;
var bibleLastElement = bibleDoc.getElementById('lastElement');
if (bibleLastElement != null) {
bibleLastElement.style.display = 'block';
bibleLastElement.style.height = addSpace + 'px';
}
if (getMobileOperatingSystem() == 'iOS') { 
var bBODY = bibleDoc.body; var bHTML = bibleDoc.documentElement;
var bHeight = Math.max( bBODY.scrollHeight, bBODY.offsetHeight, bHTML.clientHeight, bHTML.scrollHeight, bHTML.offsetHeight );
bibleFrame.height = bHeight;
bibleFrame.style.height = bHeight + 'px';
}

var toolFrame = document.getElementById('toolFrame');
var toolDoc = toolFrame.contentDocument || toolFrame.contentWindow.document;
var toolLastElement = toolDoc.getElementById('lastElement');
if (toolLastElement != null) {
toolLastElement.style.display = 'block';
toolLastElement.style.height = addSpace + 'px';
}
if (getMobileOperatingSystem() == 'iOS') { 
var tBODY = toolDoc.body; var tHTML = toolDoc.documentElement;
var tHeight = Math.max( tBODY.scrollHeight, tBODY.offsetHeight, tHTML.clientHeight, tHTML.scrollHeight, tHTML.offsetHeight );
toolFrame.height = tHeight;
toolFrame.style.height = tHeight + 'px';
}

var bibleDiv = document.getElementById('bibleDiv');
var toolDiv = document.getElementById('toolDiv');

switch(paraWin) {
    case 1:
    bibleDiv.style.borderBottom = 'none';
	toolDiv.style.borderTop = 'none';
	bibleDiv.style.width = screenWidth + 'px';
	bibleDiv.style.height = contentHeight + 'px';
    break;
    case 2:
    if (landscape == 1) {
	bibleDiv.style.borderBottom = 'none';
	toolDiv.style.borderTop = 'none';
	bibleDiv.style.width = (screenWidth / 2) + 'px';
	toolDiv.style.width = (screenWidth / 2) + 'px';
	bibleDiv.style.height = contentHeight + 'px';
	toolDiv.style.height = contentHeight + 'px';
	}
	else if (landscape == 0) {
	bibleDiv.style.width = screenWidth + 'px';
	toolDiv.style.width = screenWidth + 'px';
	bibleDiv.style.height = ((contentHeight - 4) / 2) + 'px';
	toolDiv.style.height = ((contentHeight - 4) / 2) + 'px';
	bibleDiv.style.borderBottom = '2px solid lightgrey';
	toolDiv.style.borderTop = '2px solid lightgrey';
	}
    break;
}

if (getMobileOperatingSystem() == 'iOS') { setTimeout(enableIOSScrolling,100); }

// align content in view
setTimeout(function() {
if (activeB != undefined) { fixBibleVerse(); }
if ((paraWin == 2) && (paraContent == 'tool')) {
	if (getMobileOperatingSystem() == 'iOS') {toolDiv.scrollTop = 0;}
	else {toolFrame.contentWindow.scrollTo(0,0);}
}
else if ((paraWin == 2) && (paraContent == 'bible') && (syncBible == 0)) {
	fixToolVerse(toolB,toolC,toolV);
}
},500); 

// workaround for iPhone; problem: navigation bar hide under "tabs" after changing from portrait to landscape
setTimeout(function(){window.scrollTo(0, 1);}, 500);
}

function enableIOSScrolling() {
var contentDiv = document.getElementById("content");
var bibleDiv = document.getElementById("bibleDiv");
var toolDiv = document.getElementById("toolDiv");
contentDiv.style.overflowY = "scroll";
contentDiv.style.overflowX = "auto";
bibleDiv.style.overflowY = "scroll";
bibleDiv.style.overflowX = "auto";
toolDiv.style.overflowY = "scroll";
toolDiv.style.overflowX = "auto";
contentDiv.style.webkitOverflowScrolling = "touch";
bibleDiv.style.webkitOverflowScrolling = "touch";
toolDiv.style.webkitOverflowScrolling = "touch";
}

function disableIOSScrolling() {
var contentDiv = document.getElementById("content");
var bibleDiv = document.getElementById("bibleDiv");
var toolDiv = document.getElementById("toolDiv");
contentDiv.style.overflow = "auto";
bibleDiv.style.overflow = "auto";
toolDiv.style.overflow = "auto";
contentDiv.style.webkitOverflowScrolling = "auto";
bibleDiv.style.webkitOverflowScrolling = "auto";
toolDiv.style.webkitOverflowScrolling = "auto";
}

// Scroll to a specific verse

function fixBibleVerse() {
var targetPos = 'v' + activeB + '.' + activeC + '.' + activeV;
var targetFrame = document.getElementById('bibleFrame');
var targetDoc = targetFrame.contentDocument || targetFrame.contentWindow.document;
var targetElement = targetDoc.getElementById(targetPos);
var targetHeight = targetElement.offsetTop;
if (getMobileOperatingSystem() == 'iOS') { document.getElementById('bibleDiv').scrollTop = targetHeight; }
else {targetFrame.contentWindow.scrollTo(0,targetHeight);}
}

function fixToolVerse(b,c,v) {
var targetPos = 'v' + b + '.' + c + '.' + v;
var targetFrame = document.getElementById('toolFrame');
var targetDoc = targetFrame.contentDocument || targetFrame.contentWindow.document;
var targetElement = targetDoc.getElementById(targetPos);
var targetHeight = targetElement.offsetTop;
if (getMobileOperatingSystem() == 'iOS') { document.getElementById('toolDiv').scrollTop = targetHeight; }
else {targetFrame.contentWindow.scrollTo(0,targetHeight);}
}

/* SECTIONS: pending ... TOOLS ... INTERFACE ... LAYOUT */

/* SECTION - SETTING ENVIRONMENT */

function resizeIframe(id) {
var iframe = document.getElementById(id);
var innerDoc = iframe.contentDocument || iframe.contentWindow.document;

var lastElement = innerDoc.getElementById('lastElement');
if (lastElement != null) {
var frameHeight = lastElement.offsetTop;
var screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
iframe.style.height = (frameHeight + screenHeight - 100) + 'px';
}
else {
var lastElement2 = innerDoc.getElementById('lastElement2');
var frameHeight = lastElement2.offsetTop;
var screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
iframe.style.height = (frameHeight + screenHeight - 100) + 'px';
}

}

function launchIntoFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

function fullScreenSwitch() {

if (getMobileOperatingSystem() == 'iOS') {
	if (window.navigator.standalone) {
	messageUser('<h3>Exit Fullscreen in iOS/iPad/iPhone</h3>', '<p>To enter non-fullscreen mode in iOS/iPad/iPhone, simply navigate to Marvel.bible with a web browser (e.g. mobile Sarfari), rather than using home screen bookmark.</p>');
	}
	else {
	messageUser('<h3>Enter Fullscreen in iOS/iPad/iPhone</h3>', '<p>To enter fullscreen mode in iOS/iPad/iPhone, simply start Marvel.bible with a home screen bookmark directly.</p><p>How to save a home screen bookmark?<br>1) Open Marvel.bible first with mobile Sarfari.<br>2) Use action menu to save a bookmark of Marvel.bible with option "Add to Home Screen".</p>');
	}
}
else {
	if (fullScreen == 0) { 
	fullScreen = 1;  
	launchIntoFullscreen(document.documentElement);
	}
	else {
	fullScreen = 0;  
	exitFullscreen();
	}
}
}

/* SECTION - LOADING A BIBLE VERSION 
functions: openModPage, loadModPage, goMod, updateBibleTitle, ch, goBible, 
*/

function openModPage(id,module) {
var modulePage = '/' + module + '/' + module + '.html';
document.getElementById(id).src = modulePage;
}

function goModPage() {
window.location.assign(mod + '.html');
}

function loadModPage(bk) {

var bibleFrame = window.parent.document.getElementById('bibleFrame');
var toolFrame = window.parent.document.getElementById('toolFrame');
var info = window.location.href;

if (window.self == bibleFrame.contentWindow) {
if (bibleFrame.src != info) { bibleFrame.src = info; }
if (bibleFrame.contentWindow.location.href != info) { bibleFrame.contentWindow.location.href = info; }

window.parent.tempMod = mod; window.parent.mod = mod; 
window.parent.tempB = bk; window.parent.activeB = bk; 
window.parent.tempC = 1; window.parent.activeC = 1; 
window.parent.tempV = 1; window.parent.activeV = 1; 
window.parent.document.title = 'Bible - ' + window.parent.mod.toUpperCase() + ' - Marvel.bible';
window.parent.document.getElementById('activeVerse').innerHTML = '<i class="fa">&#xf02d;</i>';
window.parent.document.getElementById('activeVerseWrap').style.display = '';
// update book, chapter, verse
var MBBkList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66];
var book = MBBkList.indexOf(bk) + 1;
window.parent.updateBook(window.parent.mod);
window.parent.updateChapter(book);
window.parent.updateVerse(book,1);
}
else if (window.self == toolFrame.contentWindow) {
if (toolFrame.src != info) { toolFrame.src = info; }
if (toolFrame.contentWindow.location.href != info) { toolFrame.contentWindow.location.href = info; }
}
}

/* SECTION - LOADING A SPECIFIC BIBLE VERSE 
functions: openBibleVerse, loadBible, checkSync, updateBibleTitle, ch, goBible, paraBible
*/

function checkSync(source,b,module) {
var target; var module;
if (source == 'bibleFrame') { target = document.getElementById('toolFrame'); }
else if (source == 'toolFrame') { target = document.getElementById('bibleFrame'); }

	if (module == undefined) { module = target.contentWindow.mod; }

var alertTitle = '<h3>"Bible Sync" is turned "OFF"</h3>';
var alertSyncBibleOff = '<p>One of opened bible versions does not have the passage you had just selected.</p><p>To prevent errors on synchronising bibles, option "Bible Sync" is now automatically turned "OFF".</p><p>You may re-activate "Bible Sync" manually via our navigation menu.</p>';

	if (module == 'lxx2' || module == 'lxx2i') {
	var lxx2Bk = [60, 70, 340, 170, 325, 345];
	if (lxx2Bk.indexOf(b) < 0) { syncSwitch(); messageUser(alertTitle, alertSyncBibleOff); }
	}
	else if (b < 40 || b > 66) {
	var NTonly = ['nestle1904', 'nestle1904i', 'sblgntc', 'bgb', 'bib', 'bgb_blb', 'bgb_bsb', 'tr_kjv', 'byz_web', 'wh_cuv', 'blb', 'bsb'];
	if (NTonly.indexOf(module) >= 0) { syncSwitch(); messageUser(alertTitle, alertSyncBibleOff); }
	}
	else if (b >= 40 || b <= 66) {
	var OTonly = ['bhs', 'bhsl', 'bhsi', 'bhs_kjv', 'bhs_wrv', 'bhs_web', 'bhs_leb', 'bhs_cuv', 'lxx2012', 'lxx1', 'lxx2', 'lxx1i', 'lxx2i'];
	if (OTonly.indexOf(module) >= 0) { syncSwitch(); messageUser(alertTitle, alertSyncBibleOff); }
	}
}

function updateBibleTitle() {
var MBBkList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66];
var b2 = MBBkList.indexOf(activeB);
var bkAbb = ['Gen', 'Exod', 'Lev', 'Num', 'Deut', 'Josh', 'Judg', 'Ruth', '1 Sam', '2 Sam', '1 Kgs', '2 Kgs', '1 Chr', '2 Chr', 'Ezra', 'Neh', 'Esth', 'Job', 'Ps', 'Prov', 'Eccl', 'Song', 'Isa', 'Jer', 'Lam', 'Ezek', 'Dan', 'Hos', 'Joel', 'Amos', 'Obad', 'Jonah', 'Mic', 'Nah', 'Hab', 'Zeph', 'Hag', 'Zech', 'Mal', 'Matt', 'Mark', 'Luke', 'John', 'Acts', 'Rom', '1 Cor', '2 Cor', 'Gal', 'Eph', 'Phil', 'Col', '1 Thess', '2 Thess', '1 Tim', '2 Tim', 'Titus', 'Phlm', 'Heb', 'Jas', '1 Pet', '2 Pet', '1 John', '2 John', '3 John', 'Jude', 'Rev'];
b2 = bkAbb[b2];
document.title = b2 + ' ' + activeC + ':' + activeV + ' [' + mod.toUpperCase() + ']' + ' - Marvel.bible';
//document.getElementById('activeVerse').innerHTML = mod.toUpperCase() + ' - ' + b2 + ' ' + activeC + ':' + activeV;
document.getElementById('activeVerse').innerHTML = b2 + ' ' + activeC + ':' + activeV;
document.getElementById('activeVerseWrap').style.display = '';
//var book = MBBkList.indexOf(activeB) + 1;
//updateBook(mod);
//updateChapter(book);
//updateVerse(book,activeC);
}

function goBible() {
document.getElementById('id01').style.display='none';
if (paraWin == 2) {
openBibleVerse('toolFrame',tempB,tempC,tempV,tempMod);
}
else {
	if (tempMod != mod) {
	// The line below reloads index.html
	window.location.assign('/index.html?' + tempMod + '&' + tempB + '.' + tempC + '.' + tempV);
	}
	else {
	triggerPara = 0;
	openBibleVerse('bibleFrame',tempB,tempC,tempV,tempMod);
	}
}
}

function paraBible(bible) {
window.parent.checkSync('bibleFrame',window.parent.activeB,bible);
if (window.parent.syncBible == 0) { window.parent.openModPage('toolFrame',bible); }
else if (window.parent.syncBible == 1) { window.parent.triggerPara = 1; window.parent.openBibleVerse('toolFrame',window.parent.activeB,window.parent.activeC,window.parent.activeV,bible); }
}

function topCR(link) {
if (syncBible == 1) { syncSwitch(); }
document.getElementById('toolFrame').src = link;
paraContent = 'bible';
document.getElementById('syncOption').style.display='';
}

/* SECTION - SCROLLING BIBLES */

function scrollBibles() {
if ((getMobileOperatingSystem() != 'iOS') && (window.parent.paraWin == 2) && (window.parent.paraContent == 'bible') && (window.parent.syncBible == 1)) {

var bibleFrame = window.parent.document.getElementById('bibleFrame');
var bibleDoc = bibleFrame.contentDocument || iframe.contentWindow.document;
var bibleLastElement = bibleDoc.getElementById('footer');
var bibleHeight = bibleLastElement.offsetTop;

var toolFrame = window.parent.document.getElementById('toolFrame');
var toolDoc = toolFrame.contentDocument || iframe.contentWindow.document;
var toolLastElement = toolDoc.getElementById('footer');
var toolHeight = toolLastElement.offsetTop;

var verticalPos = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
var paraPos;

	if ((window.self == bibleFrame.contentWindow) && (window.parent.currentZone == 2)) {
	window.parent.currentZone = 0;
	}
	else if ((window.self == toolFrame.contentWindow) && (window.parent.currentZone == 1)) {
	window.parent.currentZone = 0;
	}
	else {
		if (window.self == bibleFrame.contentWindow) { window.parent.currentZone = 1 }
		else if (window.self == toolFrame.contentWindow) { window.parent.currentZone = 2 }
	}

	if ((window.self == bibleFrame.contentWindow) && (verticalPos < bibleHeight) && (window.parent.currentZone == 1)) {
	paraPos =  (verticalPos / bibleHeight) * toolHeight;
	paraPos = Math.round(paraPos);
	toolFrame.contentWindow.scrollTo(0,paraPos);
	}
	else if ((window.self == toolFrame.contentWindow) && (verticalPos < toolHeight) && (window.parent.currentZone == 2)) {
	paraPos =  (verticalPos / toolHeight) * bibleHeight;
	paraPos = Math.round(paraPos);
	bibleFrame.contentWindow.scrollTo(0,paraPos);
	}
}
}

function scrollBiblesIOS(id) {

var bibleDiv = document.getElementById('bibleDiv');
var bibleFrame = document.getElementById('bibleFrame');
var bibleDoc = bibleFrame.contentDocument || iframe.contentWindow.document;
var bibleLastElement = bibleDoc.getElementById('footer');
var bibleHeight = bibleLastElement.offsetTop;

var toolDiv = document.getElementById('toolDiv');
var toolFrame = document.getElementById('toolFrame');
var toolDoc = toolFrame.contentDocument || iframe.contentWindow.document;
var toolLastElement = toolDoc.getElementById('footer');
var toolHeight = toolLastElement.offsetTop;

var verticalPos = document.getElementById(id).scrollTop;
var paraPos;

if ((id == 'bibleDiv') && (verticalPos > bibleHeight)) { document.getElementById(id).scrollTop = bibleHeight; }
if ((id == 'toolDiv') && (verticalPos > toolHeight)) { document.getElementById(id).scrollTop = toolHeight; }

if ((getMobileOperatingSystem() == 'iOS') && (paraWin == 2) && (paraContent == 'bible') && (syncBible == 1)) {

	if ((id == 'bibleDiv') && (currentZone == 2)) {
	currentZone = 0;
	}
	else if ((id == 'toolDiv') && (currentZone == 1)) {
	currentZone = 0;
	}
	else {
		if (id == 'bibleDiv') { currentZone = 1 }
		else if (id == 'toolDiv') { currentZone = 2 }
	}

	if ((id == 'bibleDiv') && (verticalPos < bibleHeight) && (currentZone == 1)) {
	paraPos =  (verticalPos / bibleHeight) * toolHeight;
	paraPos = Math.round(paraPos);
	document.getElementById('toolDiv').scrollTop = paraPos;
	}
	if ((id == 'toolDiv') && (verticalPos < toolHeight) && (currentZone == 2)) {
	paraPos =  (verticalPos / toolHeight) * bibleHeight;
	paraPos = Math.round(paraPos);
	document.getElementById('bibleDiv').scrollTop = paraPos;
	}
}
}

/* SECTION - INTERFACE */

function switchMenu(menu) {
if (menu == 'englishMenu') { document.getElementById('chineseMenu').style.display = 'none'; }
else if (menu == 'chineseMenu') { document.getElementById('englishMenu').style.display = 'none'; }
document.getElementById(menu).style.display = '';
}

function updateBook(bible) {

var allBookOptions = ['englishOT', 'englishNT', 'chineseOT', 'chineseNT'];
var i;
for (i = 0; i < allBookOptions.length; i++) {
	document.getElementById(allBookOptions[i]).style.display = '';
}

var OTonly = ['bhs', 'bhsl', 'bhsi', 'bhs_kjv', 'bhs_wrv', 'bhs_web', 'bhs_leb', 'bhs_cuv', 'lxx2012', 'lxx1', 'lxx2', 'lxx1i', 'lxx2i'];
var NTonly = ['nestle1904', 'nestle1904i', 'sblgntc', 'bgb', 'bib', 'bgb_blb', 'bgb_bsb', 'tr_kjv', 'byz_web', 'wh_cuv', 'blb', 'bsb'];

if (OTonly.indexOf(bible) >= 0) { 
	document.getElementById('englishNT').style.display = 'none'; 
	document.getElementById('chineseNT').style.display = 'none';
}
else if (NTonly.indexOf(bible) >= 0) { 
	document.getElementById('englishOT').style.display = 'none'; 
	document.getElementById('chineseOT').style.display = 'none';
}
else { }

}

function updateChapter(book) {
var chapters = '';
var i;
for (i = 1; i < (activeBCV[book].length); i++) { 
    chapters += '<navItem class="numPad" onclick="navC(' + i + ')">' + i + '</navItem>';   
}
document.getElementById("chapters").innerHTML = chapters;
}

function updateVerse(book,chapter) {
var verses = '';
var i;
for (i = 1; i < (activeBCV[book][chapter] + 1); i++) { 
    verses += '<navItem class="numPad" onclick="navV(' + i + ')">' + i + '</navItem>';   
}
document.getElementById("verses").innerHTML = verses;
}

// START of OVERLAY-NAV
function showBibles(cat) {
var i;
for (i = 0; i < 4; i++) { 
	if (i != cat) { document.getElementById('cat' + i).style.display = 'none'; }
}
if ((cat == 2) || (cat == 3)) {
document.getElementById('cat1').style.display = '';
}
}

function showAllBibles() {
var i;
for (i = 0; i < 4; i++) { 
	document.getElementById('cat' + i).style.display = '';
}
}

function closeAllBibles() {
closeNav('navDATA');
showAllBibles();
}

function bn(entry) {
document.getElementById('checkDic').style.height = "100%";
document.getElementById('dicList').innerHTML = '' +
'<span style="color:lightgrey;font-size:150%">Lookup "' + entry + '" in ...</span></p><p>' +
'<navItem onclick="bn2(\'/dictionaries/searchHBN.html?' + entry + '\')">Hitchcock\'s Bible Names</navItem><br>' +
'<navItem onclick="bn2(\'/dictionaries/searchEAS.html?' + entry + '\')">Easton\'s Bible Dictionary</navItem><br>' +
'<navItem onclick="bn2(\'/dictionaries/searchSBD.html?' + entry + '\')">Smith\'s Bible Dictionary</navItem><br>' +
'<navItem onclick="bn2(\'/isbe/search.html?' + entry + '\')">International Standard Bible Encyclopedia</navItem><br>' +
'<navItem onclick="window.open(\'http://www.complete-bible-genealogy.com/person_names_in_the_bible.php?name=' + entry + '&Search=Search\')">Complete Bible Genealogy</navItem>' +
'';
}

function bn2(target) {
if (window.parent.paraWin == 2) { window.location.assign(target); }
else { window.open(target); }
}

function openNav(navID) {
    document.getElementById(navID).style.height = "100%";
}

function closeNav(navID) {
    document.getElementById(navID).style.height = "0%";
}

function navOT(ot,otDesc) {
tempMod = ot;
document.getElementById('modOT').innerHTML = otDesc;
updateURL();
updateBook(ot);
closeNav('navOT');
}

function navNT(nt,ntDesc) {
tempMod = nt;
document.getElementById('modNT').innerHTML = ntDesc;
updateURL();
updateBook(nt);
closeNav('navNT');
}

function navB(b,bDesc) {
var MBBkList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66];

if (document.getElementById('id01').style.display == 'none') {
currentB = b;
var book = MBBkList.indexOf(currentB) + 1;
updateChapter(book);
}
else {
tempB = b;
document.getElementById('activeB').innerHTML = bDesc;
checkONT(b);
navC(1);
navV(1);
updateURL();
var book = MBBkList.indexOf(tempB) + 1;
updateChapter(book);
}
closeNav('navB');
openNav('navC');
}

function navC(c) {
var MBBkList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66];

if (document.getElementById('id01').style.display == 'none') {
currentC = c;
var book = MBBkList.indexOf(currentB) + 1;
updateVerse(book,currentC);
}
else {
tempC = c;
document.getElementById('activeC').innerHTML = c;
navV(1);
updateURL();
var book = MBBkList.indexOf(tempB) + 1;
updateVerse(book,tempC);
}
closeNav('navC');
openNav('navV');
}

function navV(v) {
if (document.getElementById('id01').style.display == 'none') {
currentV = v;
closeNav('navV');
openBibleVerse('bibleFrame',currentB,currentC,currentV,mod);
}
else {
tempV = v;
document.getElementById('activeV').innerHTML = v;
updateURL();
closeNav('navV');
}
}
/* END of OVERLAY-NAV */


function searchIndex(event, id) {
var entry = document.getElementById(id).value;
    if ((event == null || event.which == 13 || event.keyCode == 13) && (entry != '')) {
        //code to execute here
        var currentFile = window.parent.location.href;
        window.parent.location.assign(currentFile + '?' + entry);
        return false;
    }
    return true;
}

/* COPY single URL */
function copyURL() {
    document.getElementById("singleURL").select();
    document.execCommand("copy");
}

function updateURL() {
document.getElementById("singleURL").value = 'https://biblebento.com/index.html?' +
tempMod +
'&' +
tempB +
'.' +
tempC +
'.' +
tempV +
'';
}

/* START CHECKING INFO FOR TOOL PANEL */
function checkONT(b) {
if (b < 40 || b > 66) {
w3.addStyle('#modNT','display','none');
w3.addStyle('#modOT','display','');
document.getElementById('ontLink').innerHTML = OTLinks();
var otDesc = ['Original', 'BHS', 'BHSl', 'BHSi', 'BHS || KJV', 'BHS || WRV', 'BHS || WEB', 'BHS || LEB', 'BHS || 和合本', '和合本（繁）', '和合本（简）', 'KJV', 'NET', 'ERV', 'LEB', 'LXX 2012', 'T4T', 'UDB', 'ULB', 'WEB', 'YLT', 'Vulgate 405', 'Vulgate 1598', 'LXX1', 'LXX2', 'LXX1i', 'LXX2i', '中譯本（繁）', '中译本（简）'];
var otBibles = ['original', 'bhs', 'bhsl', 'bhsi', 'bhs_kjv', 'bhs_wrv', 'bhs_web', 'bhs_leb', 'bhs_cuv', 'cuv', 'cuvs', 'kjv', 'net', 'erv', 'leb', 'lxx2012', 't4t', 'udb', 'ulb', 'web', 'ylt', 'vul405', 'vul1598', 'lxx1', 'lxx2', 'lxx1i', 'lxx2i', 'cnet', 'cnets'];
var sameMod = otBibles.indexOf(tempMod);
	if (sameMod != -1) {
	document.getElementById('modOT').innerHTML = otDesc[sameMod];
	}
	else {
	var otSelect = document.getElementById('modOT').innerHTML;
	var otBible = otDesc.indexOf(otSelect);
	tempMod = otBibles[otBible];
	}
}
else {
w3.addStyle('#modOT','display','none');
w3.addStyle('#modNT','display','');
document.getElementById('ontLink').innerHTML = NTLinks();
var ntDesc = ['Original', 'N1904', 'N1904i', 'SBLGNTc', 'BGB', 'BIB', 'BGB || BLB', 'BGB || BSB', 'TR || KJV', 'Byz || WEB', 'WH || 和合本', '和合本（繁）', '和合本（简）', 'KJV', 'NET', 'BLB', 'BSB', 'ERV', 'LEB', 'T4T', 'UDB', 'ULB', 'WEB', 'YLT', 'Vulgate 405', 'Vulgate 1598', '中譯本（繁）', '中译本（简）'];
var ntBibles = ['original', 'nestle1904', 'nestle1904i', 'sblgntc', 'bgb', 'bib', 'bgb_blb', 'bgb_bsb', 'tr_kjv', 'byz_web', 'wh_cuv', 'cuv', 'cuvs', 'kjv', 'net', 'blb', 'bsb', 'erv', 'leb', 't4t', 'udb', 'ulb', 'web', 'ylt', 'vul405', 'vul1598', 'cnet', 'cnets'];
var sameMod = ntBibles.indexOf(tempMod);
	if (sameMod != -1) {
	document.getElementById('modNT').innerHTML = ntDesc[sameMod];
	}
	else {
	var ntSelect = document.getElementById('modNT').innerHTML;
	var ntBible = ntDesc.indexOf(ntSelect);
	tempMod = ntBibles[ntBible];
	}
}
}

function checkMod() {
if (tempMod.indexOf("_") >= 0) {
var trans = tempMod.split("_");
document.getElementById('modLink').innerHTML = '' +
'Parallel <input type="radio" id="para2" name="para" onclick="rPara()"> ' +
trans[0].toUpperCase() + ' <input type="radio" id="para3" name="para" onclick="rTrans1()"> ' +
trans[1].toUpperCase() + ' <input type="radio" id="para4" name="para" onclick="rTrans2()">' +
'';
document.getElementById('para' + para).checked = true;
}
}

function checkBHS() {
if (tempMod.indexOf("bhs_") >= 0) {
document.getElementById('bhsLink').innerHTML = '' +
'BHS: ' + 
'Clause <input type="checkbox" id="bhsC" onclick="toggleAnnoClause()">' +
' ' +
'Phrase <input type="checkbox" id="bhsP" onclick="toggleAnnoPhrase()">' +
' ' +
'Highlights <input type="checkbox" id="bhsH" onclick="toggleHighlights()">' +
'';
document.getElementById("bhsC").checked = annoClause;
document.getElementById("bhsP").checked = annoPhrase;
document.getElementById("bhsH").checked = highlights;
}
}
/* END CHECKING FOR TOOL PANEL */

/* SECTION - TEXTUAL LAYOUT */
/* START of parallel settings */
function setPara() {
if (para === 2) {
w3.addStyle('.para1','width','50%');
w3.addStyle('.para2','width','50%');
w3.addStyle('.para1','display','');
w3.addStyle('.para2','display','');
}
else if (para === 3) {
w3.addStyle('.para2','width','');
w3.addStyle('.para2','display','none');
w3.addStyle('.para1','width','100%');
}
else if (para === 4) {
w3.addStyle('.para1','width','');
w3.addStyle('.para1','display','none');
w3.addStyle('.para2','width','100%');
}
document.getElementById('pBible').style.display='';
}

function rPara() {
if (window.parent === window.self) {
var bibleFrame = document.getElementById('bibleFrame').contentWindow;
if (para === 4) {
bibleFrame.w3.addStyle('.para2','width','50%');
bibleFrame.w3.addStyle('.para1','width','50%');
bibleFrame.w3.addStyle('.para1','display','');
para = 2;
bibleFrame.para = 2;
}
else if (para === 3) {
bibleFrame.w3.addStyle('.para1','width','50%');
bibleFrame.w3.addStyle('.para2','width','50%');
bibleFrame.w3.addStyle('.para2','display','');
para = 2;
bibleFrame.para = 2;
}
}
else {
if (para === 4) {
w3.addStyle('.para2','width','50%');
w3.addStyle('.para1','width','50%');
w3.addStyle('.para1','display','');
para = 2;
window.parent.para = 2;
}
else if (para === 3) {
w3.addStyle('.para1','width','50%');
w3.addStyle('.para2','width','50%');
w3.addStyle('.para2','display','');
para = 2;
window.parent.para = 2;
}
}
}

function rTrans1() {
if (window.parent === window.self) {
var bibleFrame = document.getElementById('bibleFrame').contentWindow;
if (para === 2) {
bibleFrame.w3.addStyle('.para2','width','');
bibleFrame.w3.addStyle('.para2','display','none');
bibleFrame.w3.addStyle('.para1','width','100%');
para = 3;
bibleFrame.para = 3;
}
else if (para === 4) {
bibleFrame.w3.addStyle('.para2','width','');
bibleFrame.w3.addStyle('.para2','display','none');
bibleFrame.w3.addStyle('.para1','width','100%');
bibleFrame.w3.addStyle('.para1','display','');
para = 3;
bibleFrame.para = 3;
}
}
else {
if (para === 2) {
w3.addStyle('.para2','width','');
w3.addStyle('.para2','display','none');
w3.addStyle('.para1','width','100%');
para = 3;
window.parent.para = 3;
}
else if (para === 4) {
w3.addStyle('.para2','width','');
w3.addStyle('.para2','display','none');
w3.addStyle('.para1','width','100%');
w3.addStyle('.para1','display','');
para = 3;
window.parent.para = 3;
}
}
}

function rTrans2() {
if (window.parent === window.self) {
var bibleFrame = document.getElementById('bibleFrame').contentWindow;
if (para === 2) {
bibleFrame.w3.addStyle('.para1','width','');
bibleFrame.w3.addStyle('.para1','display','none');
bibleFrame.w3.addStyle('.para2','width','100%');
para = 4;
bibleFrame.para = 4;
}
else if (para === 3) {
bibleFrame.w3.addStyle('.para1','width','');
bibleFrame.w3.addStyle('.para1','display','none');
bibleFrame.w3.addStyle('.para2','width','100%');
bibleFrame.w3.addStyle('.para2','display','');
para = 4;
bibleFrame.para = 4;
}
}
else {
if (para === 2) {
w3.addStyle('.para1','width','');
w3.addStyle('.para1','display','none');
w3.addStyle('.para2','width','100%');
para = 4;
window.parent.para = 4;
}
else if (para === 3) {
w3.addStyle('.para1','width','');
w3.addStyle('.para1','display','none');
w3.addStyle('.para2','width','100%');
w3.addStyle('.para2','display','');
para = 4;
window.parent.para = 4;
}
}
}
/* END of parallel settings */

/* SECTION - TOOL */
function paraTool(tool) {
window.parent.paraContent = 'tool';
window.parent.document.getElementById('syncOption').style.display='none';
window.parent.document.getElementById('toolFrame').src = tool;
}

function goTool(target) {
if (paraWin == 2) { document.getElementById('toolFrame').src = target; paraContent = 'tool'; document.getElementById('syncOption').style.display='none'; }
else { window.open(target); }
//window.scrollTo(0, 0);
}

function goCommentary(id, commentary) {
var info = commentary.split("_");
var comType = info[0];
var comMod = info[1];
var MBBkList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66];
var b2 = MBBkList.indexOf(tempB);
var bkAbb = ['Gen', 'Exo', 'Lev', 'Num', 'Deu', 'Jos', 'Jdg', 'Rth', '1Sa', '2Sa', '1Ki', '2Ki', '1Ch', '2Ch', 'Ezr', 'Neh', 'Est', 'Job', 'Psa', 'Pro', 'Ecc', 'Son', 'Isa', 'Jer', 'Lam', 'Eze', 'Dan', 'Hos', 'Joe', 'Amo', 'Oba', 'Jon', 'Mic', 'Nah', 'Hab', 'Zep', 'Hag', 'Zec', 'Mal', 'Mat', 'Mar', 'Luk', 'Joh', 'Act', 'Rom', '1Co', '2Co', 'Gal', 'Eph', 'Phi', 'Col', '1Th', '2Th', '1Ti', '2Ti', 'Tit', 'Phm', 'Heb', 'Jam', '1Pe', '2Pe', '1Jo', '2Jo', '3Jo', 'Jud', 'Rev'];
b2 = bkAbb[b2];
var bibRef = '/' + comType + '/search' + comMod + '.html?' + b2 + ' ' + tempC + ':' + tempV;
if (paraWin == 1) { window.open(bibRef); }
else if (paraWin == 2) { paraContent = 'tool';  document.getElementById('syncOption').style.display='none'; document.getElementById('toolFrame').src = bibRef; closeNav(id); closeMaster(); }
}

/* END of Master Control */

/* START of Links for Master Control */

function compareLink(b,c,v) {
var link = '/compare.html?' + b + '.' + c + '.' + v + '&original&kjv&net&leb&cuv';
if (window.top.paraWin == 2) { window.top.paraContent = 'tool'; window.top.document.getElementById('syncOption').style.display='none'; window.top.document.getElementById('toolFrame').src = link; window.top.closeMaster(); }
else { window.open(link); }
}

function XRefLink() {
var link = '/xref/' + tempB + '_' + tempC + '.html?' + tempMod + '&' + tempB + '.' + tempC + '.' + tempV;
if (paraWin == 1) { window.open(link); }
else if (paraWin == 2) { paraContent = 'tool'; document.getElementById('syncOption').style.display='none'; document.getElementById('toolFrame').src = link; closeMaster(); }
}

function mapQuery() {
var MBBkList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66];
var b2 = MBBkList.indexOf(tempB);
var bkAbb = ['Gen', 'Exo', 'Lev', 'Num', 'Deu', 'Jos', 'Jdg', 'Rth', '1Sa', '2Sa', '1Ki', '2Ki', '1Ch', '2Ch', 'Ezr', 'Neh', 'Est', 'Job', 'Psa', 'Pro', 'Ecc', 'Son', 'Isa', 'Jer', 'Lam', 'Eze', 'Dan', 'Hos', 'Joe', 'Amo', 'Oba', 'Jon', 'Mic', 'Nah', 'Hab', 'Zep', 'Hag', 'Zec', 'Mal', 'Mat', 'Mar', 'Luk', 'Joh', 'Act', 'Rom', '1Co', '2Co', 'Gal', 'Eph', 'Phi', 'Col', '1Th', '2Th', '1Ti', '2Ti', 'Tit', 'Phm', 'Heb', 'Jam', '1Pe', '2Pe', '1Jo', '2Jo', '3Jo', 'Jud', 'Rev'];
b2 = bkAbb[b2];
var bibRef = '/maps/index.html?' + b2 + ' ' + tempC + ':' + tempV;
if (paraWin == 1) { window.open(bibRef); }
else if (paraWin == 2) { paraContent = 'tool'; document.getElementById('syncOption').style.display='none'; paraContent = 'tool'; document.getElementById('syncOption').style.display='none'; document.getElementById('toolFrame').src = bibRef; closeMaster(); }
}

function nameQuery() {
var MBBkList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66];
var b2 = MBBkList.indexOf(tempB);
var bkAbb = ['Gen', 'Exo', 'Lev', 'Num', 'Deu', 'Jos', 'Jdg', 'Rth', '1Sa', '2Sa', '1Ki', '2Ki', '1Ch', '2Ch', 'Ezr', 'Neh', 'Est', 'Job', 'Psa', 'Pro', 'Ecc', 'Son', 'Isa', 'Jer', 'Lam', 'Eze', 'Dan', 'Hos', 'Joe', 'Amo', 'Oba', 'Jon', 'Mic', 'Nah', 'Hab', 'Zep', 'Hag', 'Zec', 'Mal', 'Mat', 'Mar', 'Luk', 'Joh', 'Act', 'Rom', '1Co', '2Co', 'Gal', 'Eph', 'Phi', 'Col', '1Th', '2Th', '1Ti', '2Ti', 'Tit', 'Phm', 'Heb', 'Jam', '1Pe', '2Pe', '1Jo', '2Jo', '3Jo', 'Jud', 'Rev'];
b2 = bkAbb[b2];
var bibRef = '/names/index.html?' + b2 + ' ' + tempC + ':' + tempV;
if (paraWin == 1) { window.open(bibRef); }
else if (paraWin == 2) { document.getElementById('toolFrame').src = bibRef; closeMaster(); }
}

function topicQuery() {
var MBBkList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66];
var b2 = MBBkList.indexOf(tempB);
var bkAbb = ['Gen', 'Exo', 'Lev', 'Num', 'Deu', 'Jos', 'Jdg', 'Rth', '1Sa', '2Sa', '1Ki', '2Ki', '1Ch', '2Ch', 'Ezr', 'Neh', 'Est', 'Job', 'Psa', 'Pro', 'Ecc', 'Son', 'Isa', 'Jer', 'Lam', 'Eze', 'Dan', 'Hos', 'Joe', 'Amo', 'Oba', 'Jon', 'Mic', 'Nah', 'Hab', 'Zep', 'Hag', 'Zec', 'Mal', 'Mat', 'Mar', 'Luk', 'Joh', 'Act', 'Rom', '1Co', '2Co', 'Gal', 'Eph', 'Phi', 'Col', '1Th', '2Th', '1Ti', '2Ti', 'Tit', 'Phm', 'Heb', 'Jam', '1Pe', '2Pe', '1Jo', '2Jo', '3Jo', 'Jud', 'Rev'];
b2 = bkAbb[b2];
var bibRef = '' + b2 + ' ' + tempC + ':' + tempV;
var fulllink = '' +
'/topics/index_' +
tempB + '_' + tempC +
'.html?' +
bibRef +
'';
if (paraWin == 1) { window.open(fulllink); }
else if (paraWin == 2) { paraContent = 'tool'; document.getElementById('syncOption').style.display='none'; document.getElementById('toolFrame').src = fulllink; closeMaster(); }
}

function dictionaries() {
var MBBkList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66];
var b2 = MBBkList.indexOf(tempB);
var bkAbb = ['Gen', 'Exo', 'Lev', 'Num', 'Deu', 'Jos', 'Jdg', 'Rth', '1Sa', '2Sa', '1Ki', '2Ki', '1Ch', '2Ch', 'Ezr', 'Neh', 'Est', 'Job', 'Psa', 'Pro', 'Ecc', 'Son', 'Isa', 'Jer', 'Lam', 'Eze', 'Dan', 'Hos', 'Joe', 'Amo', 'Oba', 'Jon', 'Mic', 'Nah', 'Hab', 'Zep', 'Hag', 'Zec', 'Mal', 'Mat', 'Mar', 'Luk', 'Joh', 'Act', 'Rom', '1Co', '2Co', 'Gal', 'Eph', 'Phi', 'Col', '1Th', '2Th', '1Ti', '2Ti', 'Tit', 'Phm', 'Heb', 'Jam', '1Pe', '2Pe', '1Jo', '2Jo', '3Jo', 'Jud', 'Rev'];
b2 = bkAbb[b2];
var bibRef = '' + b2 + ' ' + tempC + ':' + tempV;
var fulllink = '' +
'/dictionaries/index_' +
tempB + '_' + tempC +
'.html?' +
bibRef +
'';
if (paraWin == 1) { window.open(fulllink); }
else if (paraWin == 2) { paraContent = 'tool'; document.getElementById('syncOption').style.display='none'; document.getElementById('toolFrame').src = fulllink; closeMaster(); }
}

function encyclopedia() {
var MBBkList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66];
var b2 = MBBkList.indexOf(tempB);
var bkAbb = ['Gen', 'Exo', 'Lev', 'Num', 'Deu', 'Jos', 'Jdg', 'Rth', '1Sa', '2Sa', '1Ki', '2Ki', '1Ch', '2Ch', 'Ezr', 'Neh', 'Est', 'Job', 'Psa', 'Pro', 'Ecc', 'Son', 'Isa', 'Jer', 'Lam', 'Eze', 'Dan', 'Hos', 'Joe', 'Amo', 'Oba', 'Jon', 'Mic', 'Nah', 'Hab', 'Zep', 'Hag', 'Zec', 'Mal', 'Mat', 'Mar', 'Luk', 'Joh', 'Act', 'Rom', '1Co', '2Co', 'Gal', 'Eph', 'Phi', 'Col', '1Th', '2Th', '1Ti', '2Ti', 'Tit', 'Phm', 'Heb', 'Jam', '1Pe', '2Pe', '1Jo', '2Jo', '3Jo', 'Jud', 'Rev'];
b2 = bkAbb[b2];
var bibRef = '' + b2 + ' ' + tempC + ':' + tempV;
var fulllink = '' +
'/encyclopedia/index_' +
tempB + '_' + tempC +
'.html?' +
bibRef +
'';
if (paraWin == 1) { window.open(fulllink); }
else if (paraWin == 2) { paraContent = 'tool'; document.getElementById('syncOption').style.display='none'; document.getElementById('toolFrame').src = fulllink; closeMaster(); }
}

/* END of Links for Master Control */

/* START of Links for OT or NT */

function OTLinks() {
return '' +
'<ul>' +
'<li>' + '<a href="javascript:void(0)" onclick="shebanq()">SHEBANQ</a>' + '</li>' +
'<li>' + '<a href="javascript:void(0)" onclick="parabible()">ParaBible</a>' + '</li>' +
'</ul>' +
'';
}

function shebanq() {
var b = tempB;
var c = tempC;
var v = tempV;
var MBBkList = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 190, 220, 230, 240, 250, 260, 290, 300, 310, 330, 340, 350, 360, 370, 380, 390, 400, 410, 420, 430, 440, 450, 460];
var b2 = MBBkList.indexOf(b);
var shebanqBkList = ['Genesis', 'Exodus', 'Leviticus', 'Numeri', 'Deuteronomium', 'Josua', 'Judices', 'Ruth', 'Samuel_I', 'Samuel_II', 'Reges_I', 'Reges_II', 'Chronica_I', 'Chronica_II', 'Esra', 'Nehemia', 'Esther', 'Iob', 'Psalmi', 'Proverbia', 'Ecclesiastes', 'Canticum', 'Jesaia', 'Jeremia', 'Threni', 'Ezechiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadia', 'Jona', 'Micha', 'Nahum', 'Habakuk', 'Zephania', 'Haggai', 'Sacharia', 'Maleachi'];
b2 = shebanqBkList[b2];
// generate a full and workable link, e.g. https://shebanq.ancient-data.org/hebrew/text?book=Deuteronomium&chapter=1&nget=v&tp=txt_tb1&tr=hb&verse=11&version=4b&mr=m
var fulllink = '' +
'https://shebanq.ancient-data.org/hebrew/text?book=' + b2 +
'&chapter=' + c +
'&nget=v&tp=txt_tb1&tr=hb&verse=' + v +
'&version=4b&mr=m' +
'';
window.open(fulllink);
}

function parabible() {
var b = tempB;
var c = tempC;
var v = tempV;
var MBBkList = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 190, 220, 230, 240, 250, 260, 290, 300, 310, 330, 340, 350, 360, 370, 380, 390, 400, 410, 420, 430, 440, 450, 460];
var b2 = MBBkList.indexOf(b);
var parabibleBkList = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1-Samuel', '2-Samuel', '1-Kings', '2-Kings', '1-Chronicles', '2-Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song-of-Songs', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'];
b2 = parabibleBkList[b2];
// generate a full and workable link, e.g. http://parabible.com/Genesis/3#16
var fulllink = '' +
'http://parabible.com/' + b2 + '/' + c + '#' + v +
'';
window.open(fulllink);
}

function NTLinks() {
return '' +
'<ul>' +
'<li>' + '<a href="javascript:void(0)" onclick="cntr()">Textual Variants</a>' + '</li>' +
'</ul>' +
'';
}

function cntr() {
var b = tempB;
var c = tempC;
var v = tempV;
// convert to CNRT bk no
var MBBkList = [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66];
var b2 = MBBkList.indexOf(b);
var CNTRBkList = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27'];
b2 = CNTRBkList[b2];
// convert to CNRT ch no
var c2;
if (c < 10) {
c2 = '0' + c.toString();
} else {
c2 = c;
}
// convert to CNRT verse no
var v2;
if (v < 10) {
v2 = '0' + v.toString();
} else {
v2 = v;
}
// generate a full and workable link, e.g. http://greek-language.com/cntr/collation/0101.htm#01011
var fulllink = '' +
'https://greekcntr.org/collation/' +
b2 + c2 +
'.htm#' +
b2 + c2 + v2 +
'';
window.open(fulllink);
}

/* END of Links for OT or NT */

/* Mutual highlighting
highGRK1 & highGRK0 - specific for Berean materials
highGRK1b & highGRK0b - general for Greek-translation parallel
highHEB1 & highHEB0 - general for Hebrew-translation parallel
*/

function highGRK1(id, lex) {
w3.addStyle('.' + lex,'background-color','powderblue');
document.getElementById('grk'+id).style.background='#ffd25d';
document.getElementById('eng'+id).style.background='#ffd25d';
}
function highGRK0(id, lex) {
w3.addStyle('.' + lex,'background-color','');
document.getElementById('grk'+id).style.background='';
document.getElementById('eng'+id).style.background='';
}

function highGRK1b(lex) {
var lexList = lex.split(" ");
var i;
for (i = 0; i < lexList.length; i++) {
    w3.addStyle('.' + lexList[i],'background-color','powderblue');
}
}
function highGRK0b(lex) {
var lexList = lex.split(" ");
var i;
for (i = 0; i < lexList.length; i++) {
    w3.addStyle('.' + lexList[i],'background-color','');
}
}
function highHEB1(lex) {
var lexList = lex.split(" ");
var i;
for (i = 0; i < lexList.length; i++) {
    w3.addStyle('.' + lexList[i],'background-color','powderblue');
}
}
function highHEB0(lex) {
var lexList = lex.split(" ");
var i;
for (i = 0; i < lexList.length; i++) {
    w3.addStyle('.' + lexList[i],'background-color','');
}
}

/* open content in dictionary.html, bgbc.html, bhsc.html
frameDictionary0 - default
frameDictionary1 - preferred module, identify OT or NT
*/

function frameDictionary0(file) {
	return '<iframe id="dicFrame" src="' + file + '.html" frameborder="0" width="100%" name="main" style="height: 200vh;" onload="resizeIframe(\'dicFrame\')">Oops! Your browser does not support this website.  Please update it and try again.</iframe>';
}

function frameDictionary1(entry, mod, ont) {
	return '<iframe id="dicFrame" src="dictionary/' + entry + '.html' + '?'+ mod + '&' + ont + '" frameborder="0" width="100%" name="main" style="height: 200vh;" onload="resizeIframe(\'dicFrame\')">Oops! Your browser does not support this website.  Please update it and try again.</iframe>';
}

function dic(mod, entry, ont) {
var fulllink = 'tool.php?file1=' + entry + '&name=' + entry;
if (window.top.paraWin == 1) { window.top.parallelWin() }
window.top.document.getElementById('toolFrame').src = fulllink;
window.top.paraContent = 'tool';
}

function bgbc(mod, entry, ont) {
var fulllink = '../bgbc.html?' + entry + '&' + mod + '&' + ont;
if (window.top.paraWin == 2) { window.top.document.getElementById('toolFrame').src = fulllink; window.top.paraContent = 'tool'; }
else { window.open(fulllink);}
}

function bhsc(mod, entry, ont) {
var fulllink = '../bhsc.html?' + entry + '&' + mod + '&' + ont;
if (window.top.paraWin == 2) { window.top.document.getElementById('toolFrame').src = fulllink; window.top.paraContent = 'tool'; }
else { window.open(fulllink);}
}

// insert menu
function getMenu() {
return '' +
'<div id="v0.0.0" class="mr">' +
'<ul class="topnav">' +
'  <li id="mHOME" class="dropdown"><a href="javascript:void(0)" class="active"><i class="fa">&#xf1de;</i></a>' +
'    <div class="dropdown-content">' +
'      <a href="/index.html" onclick="window.scrollTo(0,0);"><i class="fa">&#xf015;&ensp;Home</i></a>' +
'      <a href="/index.html" target="_blank"><i class="fa">&#xf067;&ensp;New</i></a>' +
'      <a id="syncOption" style="display:none" href="javascript:void(0)" onclick="syncSwitch()"><i class="fa">&#xf205;&ensp;Bible Sync is ON</i></a>' +
'      <a id="screenOption" href="javascript:void(0)" onclick="fullScreenSwitch()"><i class="fa">&#xf0b2;&ensp;Screen</i></a>' +
'      <a href="javascript:void(0)" onclick="goBack()"><i class="fa">&#xf137;&ensp;Back</i></a>' +
'      <a href="javascript:void(0)" onclick="goForward()"><i class="fa">&#xf138;&ensp;Forward</i></a>' +
'      <a href="javascript:void(0)" onclick="reloadSite()"><i class="fa">&#xf021;&ensp;Update</i></a>' +
'      <a href="javascript:void(0)" onclick="window.open(\'https://www.paypal.me/MarvelBible\')"><i class="fa">&#xf021;&ensp;Donations</i></a>' +
'    </div>' +
'  </li>' +
'  <li id="mHOT" class="dropdown">' +
'    <a href="javascript:void(0)" class="dropbtn active2">[This site is under developement]</a>' +
'    <div class="dropdown-content">' +
'      <a href="https://biblebento.com/contact/contactform.php" target="_blank">Support our development!</a>' +
'      <a href="javascript:void(0)" onclick="window.open(\'https://www.paypal.me/MarvelBible\')">Donate to us!</a>' +
'    </div>' +
'  </li>' +
'  <li id="mDATA"><a href="javascript:void(0)" onclick="openNav(\'navDATA\')"><i class="fa">&#xf1c0;</i></a></li>' +
'  <li style="float:right;"><a id="paraOption" href="javascript:void(0)" onclick="parallelWin()"><i class="fa">&#xf0db;</i></a></li>' +
'  <li id="activeVerseWrap" style="float:right;display:none;"><a id="activeVerse" href="javascript:void(0)" onclick="openNav(\'navB\')"></a></li>' +
'</ul>' +
'</div>' +
'<div id="id01" class="modal" onclick="closeMaster()" style="display:none"><div class="modal-content animate" onclick="stopBubbling()"><div class="imgcontainer">' +
'<span id="closeButton" onclick="closeMaster()" class="close" title="Go back!" style="display:none"><i class="fa">&#xf112;</i></span>' +
'<span id="goButton" onclick="goBible()" class="go" title="Go to selected verse!" style="display:none"><i class="fa">&#xf04b;&#xf04b;</i></span>' +
'<div id="options"></div></div></div></div>' +
'';
}

function goBack() {
window.history.back();
}

function goForward() {
window.history.forward();
}

function reloadSite() {
document.getElementById('bibleFrame').contentWindow.location.reload();
document.getElementById('toolFrame').contentWindow.location.reload();
location.reload();
}

function cloneWin() {
window.open(location.href);
}

// Functions triggered within tool ONLY

function bcv(b,c,v) {
if (window.top.paraWin == 1) { window.top.parallelWin() }
if (b < 40 || b > 66) {

window.top.toolB = b;
window.top.toolC = c;
window.top.toolV = v;

window.top.openBibleVerse('toolFrame',b,c,v,'OT');

}
else {

window.top.toolB = b;
window.top.toolC = c;
window.top.toolV = v;

window.top.openBibleVerse('toolFrame',b,c,v,window.top.mod);
}
}

function cr(b,c,v) {
//formatting in bible text, e.g. <p><ref onclick="cr(50,6,4)">Deu 6:4</ref>; <ref onclick="cr(500,3,16)">John 3:16</ref></p>
if (b < 470 || b > 730) {
var MBBkList = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 190, 220, 230, 240, 250, 260, 290, 300, 310, 330, 340, 350, 360, 370, 380, 390, 400, 410, 420, 430, 440, 450, 460];
var b2 = MBBkList.indexOf(b);

window.top.toolB = b2;
window.top.toolC = c;
window.top.toolV = v;

window.top.openBibleVerse('toolFrame',b2,c,v,'OT');

}
else {
var bbBkList = [470, 480, 490, 500, 510, 520, 530, 540, 550, 560, 570, 580, 590, 600, 610, 620, 630, 640, 650, 660, 670, 680, 690, 700, 710, 720, 730];
var bkPos = bbBkList.indexOf(b);
var marvelBkList = [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66];
var bk = marvelBkList[bkPos];	

window.top.toolB = bk;
window.top.toolC = c;
window.top.toolV = v;

window.top.openBibleVerse('toolFrame',bk,c,v,window.top.mod);
}
}

// Functions triggered within tool or bible

function lex(lex) {
if (window.top.paraWin == 1) { window.top.parallelWin() }
var fulllink = 'tool.php?lex=' + lex;
window.top.document.getElementById('toolFrame').src = fulllink;
window.top.paraContent = 'tool';
}

function lexMorph(lex,morph) {
if (window.top.paraWin == 1) { window.top.parallelWin() }
var fulllink = 'tool.php?lex=' + lex + '&morph=' + morph;
window.top.document.getElementById('toolFrame').src = fulllink;
window.top.paraContent = 'tool';
}


// Functions triggered within bible

// Highlighting functions

function hl1FrameWindows(id, cl, sn) {
document.getElementById('bibleFrame').contentWindow.hl1Action(id, cl, sn);
document.getElementById('toolFrame').contentWindow.hl1Action(id, cl, sn);
}

function hl0FrameWindows(id, cl, sn) {
document.getElementById('bibleFrame').contentWindow.hl0Action(id, cl, sn);
document.getElementById('toolFrame').contentWindow.hl0Action(id, cl, sn);
}

function hl1Action(id, cl, sn) {
w3.addStyle('.c'+cl,'background-color','powderblue');
w3.addStyle('.G'+sn,'background-color','PAPAYAWHIP');
var focalElement = document.getElementById('w'+id);
if (focalElement != null) {
document.getElementById('w'+id).style.background='#ffd25d';
}
}

function hl0Action(id, cl, sn) {
w3.addStyle('.c'+cl,'background-color','');
w3.addStyle('.G'+sn,'background-color','');
var focalElement = document.getElementById('w'+id);
if (focalElement != null) {
document.getElementById('w'+id).style.background='';
}
}

function hl1(id, cl, sn) {
window.top.hl1FrameWindows(id, cl, sn);
}
function hl0(id, cl, sn) {
window.top.hl0FrameWindows(id, cl, sn);
}

function hightlightLastLookUp(selectedWid) {
document.getElementById('bibleFrame').contentWindow.hightlightLastLookUpAction(selectedWid);
}

function hightlightLastLookUpAction(selectedWid) {
lastLookupWid = selectedWid;
document.getElementById(selectedWid).style.color = 'blue';
}

function clearLastLookUp() {
document.getElementById('bibleFrame').contentWindow.clearLastLookUpAction();
}

function clearLastLookUpAction() {
document.getElementById(lastLookupWid).style.color = '';
}

function openVerseData(vlink,b,c,v) {
window.top.clearLastLookUp();
window.top.openVlink(vlink,b,c,v);
}

function openVlink(vlink,b,c,v) {
var fulllink = 'tool.php?vid=' + vlink + '&b=' + b + '&c=' + c + '&v=' + v;
document.getElementById('toolFrame').src = fulllink;
}

function luV(v) {

window.top.clearLastLookUp();

var bibleFrame = window.top.document.getElementById('bibleFrame');
var toolFrame = window.top.document.getElementById('toolFrame');

var bk = b;
var ch = c;

if (window.self == bibleFrame.contentWindow) {

window.top.activeV = v;
window.top.tempV = v;
if (window.top.paraWin == 1) { window.top.parallelWin() }
window.top.displayVerseData(bk,ch,v);
window.top.updateBibleTitle();

}

if (window.self == toolFrame.contentWindow) {

window.top.toolV = v;
window.top.displayVerseData(bk,ch,v);

}

window.top.paraContent = 'tool';

}

function luW(v,wid,cl,lex,rmac) {

window.top.clearLastLookUp();

var bibleFrame = window.top.document.getElementById('bibleFrame');
var toolFrame = window.top.document.getElementById('toolFrame');

if ((window.self == toolFrame.contentWindow) && (window.top.paraContent == 'bible')) {

var selectedWid = 'w' + wid;

var bk = String(b);
var ch = String(c);
if (ch.length == 1) { ch = '0' + ch; }
var ver = String(v);
if (ver.length == 1) { ver = '0' + ver; }
var vlink = bk + ch + ver;
var fulllink = 'tool.php?b=' + b + '&c=' + c + '&v=' + v + '&vlink=' + vlink + '&wid=' + wid + '&cl=' + cl + '&lex=G' + lex + '&rmac=' + rmac;
window.top.document.getElementById('toolFrame').src = fulllink;
//window.top.updateBibleTitle();

} else {

window.top.activeV = v;
window.top.tempV = v;
if (window.top.paraWin == 1) { window.top.parallelWin() }
var selectedWid = 'w' + wid;
window.top.hightlightLastLookUp(selectedWid);
//lastLookupWid = 'w' + wid;
//document.getElementById(lastLookupWid).style.color = 'blue';
var bk = String(window.top.activeB);
var ch = String(window.top.activeC);
if (ch.length == 1) { ch = '0' + ch; }
var ver = String(v);
if (ver.length == 1) { ver = '0' + ver; }
var vlink = bk + ch + ver;
var fulllink = 'tool.php?b=' + window.top.activeB + '&c=' + window.top.activeC + '&v=' + v + '&vlink=' + vlink + '&wid=' + wid + '&cl=' + cl + '&lex=G' + lex + '&rmac=' + rmac;
window.top.document.getElementById('toolFrame').src = fulllink;
window.top.updateBibleTitle();

}

window.top.paraContent = 'tool';

}

function rmac(code) {
if (window.top.paraWin == 1) { window.top.parallelWin() }
var fulllink = '/morphology/rmac.html?' + code;
window.top.document.getElementById('toolFrame').src = fulllink;
window.top.paraContent = 'tool';
}

function word(wid) {
if (window.top.paraWin == 1) { window.top.parallelWin() }
var fulllink = 'tool.php?b=' + window.top.activeB + '&wid=' + wid;
window.top.document.getElementById('toolFrame').src = fulllink;
window.top.paraContent = 'tool';
}

function cl(cl) {
if (window.top.paraWin == 1) { window.top.parallelWin() }
var fulllink = 'tool.php?cl=' + cl;
window.top.document.getElementById('toolFrame').src = fulllink;
window.top.paraContent = 'tool';
}

function lgntdf(wid) {
if (window.top.paraWin == 1) { window.top.parallelWin() }
var fulllink = 'tool.php?lgntdf=' + wid;
window.top.document.getElementById('toolFrame').src = fulllink;
window.top.paraContent = 'tool';
}

function parallelPassage(portion) {
closeNav('navB');
if (window.top.paraWin == 1) { window.top.parallelWin() }
fulllink = portion + '_menu.html';
document.getElementById('toolFrame').src = fulllink;
paraContent = 'tool';
}

function bookMenu() {

var bibleFrame = window.parent.document.getElementById('bibleFrame');
var toolFrame = window.parent.document.getElementById('toolFrame');

if (window.self == bibleFrame.contentWindow) {
window.top.openNav('navB');
}
else if (window.self == toolFrame.contentWindow) { 
var fulllink = '';
if (window.top.toolB >= 40) {
fulllink = 'NT_menu.html';
}
else {
fulllink = 'OT_menu.html';
}
window.top.document.getElementById('toolFrame').src = fulllink;
window.top.paraContent = 'tool';
}

}

function ch(b,c) {

var bibleFrame = window.parent.document.getElementById('bibleFrame');
var toolFrame = window.parent.document.getElementById('toolFrame');

if (window.self == bibleFrame.contentWindow) {
window.top.openBibleVerse('bibleFrame',b,c,1,mod);
}
else if (window.self == toolFrame.contentWindow) { 
window.top.toolB = b;
window.top.toolC = c;
window.top.toolV = 1;
window.top.openBibleVerse('toolFrame',b,c,1,mod);
}

}

function loadBible(b,c,v) {
document.getElementById("footer").innerHTML = getFooter3();
window.addEventListener("scroll", scrollBibles);

var bibleFrame = window.parent.document.getElementById('bibleFrame');
var toolFrame = window.parent.document.getElementById('toolFrame');
var info = window.location.href;

if (window.self == bibleFrame.contentWindow) {

// check matching src and href
// workaround for iOS scrolling
// bibleFrame.src = info;
if (bibleFrame.src != info) { bibleFrame.src = info; }
if (bibleFrame.contentWindow.location.href != info) { bibleFrame.contentWindow.location.href = info; }

// mod info
window.parent.mod = mod;
window.parent.tempMod = mod;

// verse info
window.parent.activeB = Number(b);
window.parent.tempB = window.parent.activeB;
window.parent.activeC = Number(c);
window.parent.tempC = window.parent.activeC;
window.parent.activeV = Number(v);
window.parent.tempV = window.parent.activeV;
window.parent.updateBibleTitle();
window.parent.history.pushState(null, null, '/index.html?' + window.parent.mod + '&' + window.parent.activeB + '.' + window.parent.activeC + '.' + window.parent.activeV);
//window.parent.resizeSite();

}
else if (window.self == toolFrame.contentWindow) { 

window.parent.paraContent = 'bible';

// check matching src and href
// workaround for iOS scrolling
//toolFrame.src = info;
if (toolFrame.src != info) { toolFrame.src = info; }
if (toolFrame.contentWindow.location.href != info) { toolFrame.contentWindow.location.href = info; }
// workaround for iOS
if (getMobileOperatingSystem() == 'iOS') { window.parent.document.getElementById('bibleDiv').scrollTop = window.parent.document.getElementById('bibleDiv').scrollTop - 1; }


}


}

// Functions triggered at top level

function displayVerseData(b,c,v) {

if (window.top.paraWin == 1) { window.top.parallelWin() }

if (b >= 40) {
var bk = String(b);
var ch = String(c);
if (ch.length == 1) { ch = '0' + ch; }
var ver = String(v);
if (ver.length == 1) { ver = '0' + ver; }
var vid = bk + ch + ver;
var fulllink = 'tool.php?vid=' + vid + '&b=' + b + '&c=' + c + '&v=' + v;
document.getElementById('toolFrame').src = fulllink;
}
else {
var otvid = b + '_' + c + '_' + v;
var fulllink = 'tool.php?otvid=' + otvid + '&b=' + b + '&c=' + c + '&v=' + v;
document.getElementById('toolFrame').src = fulllink;
}

window.top.paraContent = 'tool';
}

function goMod(bible) {
//if (window.top.paraWin == 1) { window.top.parallelWin() }
if (activeB == undefined) {
//var fulllink = bible + '/' + bible + '.php?b=40&c=1&v=1';
//document.getElementById('bibleFrame').src = fulllink;
openBibleVerse('bibleFrame',40,1,1,bible)
}
else {
openBibleVerse('bibleFrame',activeB,activeC,activeV,bible)
}
//displayVerseData(40,1,1);
}

function openBibleVerse(id,b,c,v,module) {
//if (window.top.paraWin == 1) { window.top.parallelWin() }
var fulllink = module + '/' + module + '.php?b=' + b + '&c=' + c + '&v=' + v;
document.getElementById(id).src = fulllink;
//displayVerseData(b,c,v);
}

function parallelWin() {

//if (activeB == undefined) { messageUser('<h3>Instructions on Parallel Mode</h3>', '<p>To turn on "Parallel Mode", you have to open a bible first.</p><p>Please select a bible version via navigation menu or open a bible passage via tool panel.</p>'); }
//else {
	if (paraWin == 1) {
	paraWin = 2;
	document.getElementById('paraOption').innerHTML = '<i class="fa">&#xf0db;</i>';
	//document.getElementById('toolFrame').src = 'tool.php?name=Eliran';
	paraContent = 'tool'; 
	document.getElementById('syncOption').style.display='none';
	document.getElementById('toolDiv').style.visibility = 'visible';
	}
	else if ((paraWin == 2) && (getMobileOperatingSystem() == 'iOS') && (window.navigator.standalone)) {
	location.reload();
	}
	else if (paraWin == 2) {
	paraWin = 1; 
	//syncBible = 1; 
	triggerPara = 0; 
	document.getElementById('syncOption').style.display='none'; 
	document.getElementById('paraOption').innerHTML = '<i class="fa">&#xf0db;</i>';
	document.getElementById('toolDiv').style.width = '0%';
	document.getElementById('toolDiv').style.height = '0%';
	document.getElementById('toolDiv').style.visibility = 'hidden';
//		if (paraContent == 'tool') { window.open(document.getElementById('toolFrame').src); }
//		else if (paraContent == 'bible') { 
//		var url = document.getElementById('toolFrame').src;
//			if (url.indexOf('#') >= 0) {
//			var verseInfo = url.substring(url.lastIndexOf('#')+2);
//			var modInfo = url.split('/');
//			modInfo = modInfo[(modInfo.length - 2)];
//			window.open('/' + 'index.html?' + modInfo + '&' + verseInfo);
//			}
//			else {
//			var modInfo = url.split('/');
//			modInfo = modInfo[(modInfo.length - 2)];
//			window.open('/' + 'index.html?' + modInfo);
//			}
//		}
//	document.getElementById('toolFrame').src = '/empty.html';
	paraContent = 'tool'; 
	}
resizeSite();
//}
}

function syncSwitch() {
if (syncBible == 1) { 
syncBible = 0; 
triggerPara = 0; 
document.getElementById('syncOption').innerHTML = '<i class="fa">&#xf204;&ensp;Bible Sync is OFF</i>'; 
}
else { 

	if (paraContent == 'bible') {
	//current toolFrame's bible version
	var url = document.getElementById('toolFrame').src;
	var modInfo = url.split('/');
	modInfo = modInfo[(modInfo.length - 2)];
	
	var url2 = document.getElementById('bibleFrame').src;
	var verseInfo;
	var bookInfo;
		if (url2.indexOf('#') >= 0) {
		verseInfo = url2.substring(url2.lastIndexOf('/')+1);
		}
		else {
		verseInfo = modInfo + '.html';
		}
	
	var syncPath = '/' + modInfo + '/' + verseInfo;

		//check book matching
		if (modInfo == 'lxx2' || modInfo == 'lxx2i') {
			var lxx2Bk = [60, 70, 340, 170, 325, 345];
			if (lxx2Bk.indexOf(activeB) >= 0) { syncSwitch2(1,syncPath,modInfo); }
			else { syncSwitch2(0,null,modInfo); }
		}
		else if (activeB < 40 || activeB > 66) {
		var NTonly = ['nestle1904', 'nestle1904i', 'sblgntc', 'bgb', 'bib', 'bgb_blb', 'bgb_bsb', 'tr_kjv', 'byz_web', 'wh_cuv', 'blb', 'bsb'];
			if (NTonly.indexOf(modInfo) >= 0) { syncSwitch2(0,null,modInfo); }
			else { syncSwitch2(1,syncPath,modInfo); }
		}
		else if (activeB >= 40 || activeB <= 66) {
		var OTonly = ['bhs', 'bhsl', 'bhsi', 'bhs_kjv', 'bhs_wrv', 'bhs_web', 'bhs_leb', 'bhs_cuv', 'lxx2012', 'lxx1', 'lxx2', 'lxx1i', 'lxx2i'];
			if (OTonly.indexOf(modInfo) >= 0) { syncSwitch2(0,null,modInfo); }
			else { syncSwitch2(1,syncPath,modInfo); }
		}
	}
}
}

function syncSwitch2(bSync, syncPath, bVer) {
if (bSync == 1) {
syncBible = bSync; 
triggerPara = 1; 
document.getElementById('syncOption').innerHTML = '<i class="fa">&#xf205;&ensp;Bible Sync is ON</i>'; 
document.getElementById('toolFrame').src = syncPath;
resizeSite();
}
else {
syncBible = bSync; 
triggerPara = 0; 
messageUser('<h3>"Bible Sync" is kept "OFF"</h3>', '<p>The Bible "' + bVer.toUpperCase() + '" does not have a verse, which could match the one currently opened in "' + mod.toUpperCase() + '".</p><p>You may either select another verse or select another bible version, which could make synchronisation possible, and try again.</p>');
}
}

function stopBubbling(e) {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
}

function getMenu0() {
return '' +
'<div class="mr">' +
'<ul class="topnav">' +
'  <li><a class="active" href="ew.html" target="_blank">EW</a></li>' +
'</ul>' +
'</div>' +
'';
}

// insert footer

function getFooterNoScroll() {
return '' +
'<h4>' +
'<sup><a href="javascript:void(0)" onclick="window.open(\'https://biblebento.com/contact/contactform.php\')">support | feedback | contact</a></sup>' +
'<br>' +
'<sub>Partnership with:</sub><br><sup><a href="javascript:void(0)" onclick="window.open(\'https://BibleBento.com\')">BibleBento.com</a> <a href="javascript:void(0)" onclick="window.open(\'https://OpenGNT.com\')">OpenGNT.com</a></sup>' +
'</h4>' +
'<p>&nbsp;</p>' +
'<span id="lastElement2"></span>' +
'';
}

function getFooter() {
return '' +
'<h4>' +
'<sup><a href="javascript:void(0)" onclick="window.open(\'https://biblebento.com/contact/contactform.php\')">support | feedback | contact</a></sup>' +
'<br>' +
'<sub>Partnership with:</sub><br><sup><a href="javascript:void(0)" onclick="window.open(\'https://BibleBento.com\')">BibleBento.com</a> <a href="javascript:void(0)" onclick="window.open(\'https://OpenGNT.com\')">OpenGNT.com</a></sup>' +
'</h4>' +
'<span id="lastElement"></span>' +
'';
}

function getFooter2() {
var footer = '' +
'<h4>' +
'<sup><a href="javascript:void(0)" onclick="window.open(\'https://biblebento.com/contact/contactform.php\')">support | feedback | contact</a></sup>' +
'<br>' +
'<sub>Partnership with:</sub><br><sup><a href="javascript:void(0)" onclick="window.open(\'https://BibleBento.com\')">BibleBento.com</a> <a href="javascript:void(0)" onclick="window.open(\'https://OpenGNT.com\')">OpenGNT.com</a></sup>' +
'</h4>' +
'<span id="lastElement"></span>' +
'';
if (window.top.paraWin == 2) { 
window.top.paraContent = 'tool';
window.top.document.getElementById('syncOption').style.display='none';
}
return footer;
}

function getFooter3() {
var footer = '' +
'<h4>' +
'<sup><a href="javascript:void(0)" onclick="window.open(\'https://biblebento.com/contact/contactform.php\')">support | feedback | contact</a></sup>' +
'<br>' +
'<sub>Partnership with:</sub><br><sup><a href="javascript:void(0)" onclick="window.open(\'https://BibleBento.com\')">BibleBento.com</a> <a href="javascript:void(0)" onclick="window.open(\'https://OpenGNT.com\')">OpenGNT.com</a></sup>' +
'</h4>' +
'<span id="lastElement"></span>' +
'';
return footer;
}

function openSimpleLink(link) {
var topHref = location.href;
if (topHref.indexOf(".com/index.html") < 0) { window.open(link); }
else if (paraWin == 2) { paraContent = 'tool'; document.getElementById('syncOption').style.display='none'; document.getElementById('toolFrame').src = link; } 
}

function loadInfo(dicList) {
// addFooter
//document.getElementById("footer").innerHTML = getFooter2();
// load dictionary panel
if (dicList === "StrGrk") {
var dictionaryPanel = getDicListStrGrk();
}
else if (dicList === "StrHeb") {
var dictionaryPanel = getDicListStrHeb();
}
else if (dicList === "ETCBC") {
var dictionaryPanel = getDicListETCBC();
}
else if (dicList === "BGBC") {
var dictionaryPanel = getDicListBGBC();
document.getElementById("header5").innerHTML = getBookList5();
}
else if (dicList === "BHSC") {
var dictionaryPanel = getDicListBHSC();
document.getElementById("header2").innerHTML = getBookList4();
}
document.getElementById("dicPanel").innerHTML = dictionaryPanel;
// load entry topic
//var url = window.location.pathname;
//var filename = url.substring(url.lastIndexOf('/')+1);
//var filename = filename.split(".");
//var filename = filename[0];
//document.getElementById("entry").innerHTML = '' +
// '<a href="../index.html" target="_blank"><img src="ew.png" alt="Eliran Wong" style="float:left;width:20px;height:20px;border:0;"></a>' +
// '<a href="../index.html" target="_blank"><img src="ew.png" alt="Eliran Wong" style="float:right;width:20px;height:20px;border:0;"></a>' +
// '<a href="../dictionary.html?' + filename + '" target="_blank">' +
// filename +
// '</a>' +
// '&ensp;<div class="tt1" onclick="">' +
// '<img src="settings.png" alt="settings" style="width:20px;height:20px;border:0;">' +
// '<span class="tt2"><div id="refList"></div></span></div>';
// load reference list
//document.getElementById("refList").innerHTML = '<part>Preference</part><br>' + getRefList();
// update reference list
//var queryString = window.location.search;	
//queryString = queryString.substring(1);
//var modont = queryString.split("&");
//var mod = modont[0];
//var ont = modont[1];
//document.getElementById("refList" + ont).value = mod;
//updateRefList(mod);
}

// reference DicList for Strong's Greek dicitonaries
function getDicListStrGrk() {
return '' +
'    <a href="javascript:void(0)" onclick="openDic(event, \'dic1\');">' +
'      <div class="w3-third tablink w3-bottombar w3-hover-light-grey w3-padding w3-border-red">Strong</div>' +
'    </a>' +
'    <a href="javascript:void(0)" onclick="openDic(event, \'dic2\');">' +
'      <div class="w3-third tablink w3-bottombar w3-hover-light-grey w3-padding">LSJ</div>' +
'    </a>' +
'    <a href="javascript:void(0)" onclick="openDic(event, \'dic3\');">' +
'      <div class="w3-third tablink w3-bottombar w3-hover-light-grey w3-padding">Mounce</div>' +
'    </a>' +
'    <a href="javascript:void(0)" onclick="openDic(event, \'dic4\');">' +
'      <div class="w3-third tablink w3-bottombar w3-hover-light-grey w3-padding">Thayer</div>' +
'    </a>' +
'    <a href="javascript:void(0)" onclick="openDic(event, \'dic5\');">' +
'      <div class="w3-third tablink w3-bottombar w3-hover-light-grey w3-padding">A-S</div>' +
'    </a>' +
'    <a href="javascript:void(0)" onclick="openDic(event, \'dic6\');">' +
'      <div class="w3-third tablink w3-bottombar w3-hover-light-grey w3-padding">中文</div>' +
'    </a>' +
'';
}

// reference DicList for Strong's Greek dicitonaries
function getDicListBGBC() {
return '' +
'    <a href="javascript:void(0)" onclick="openDic(event, \'dic1\');">' +
'      <div class="w3-quarter tablink w3-bottombar w3-hover-light-grey w3-padding w3-border-red">Overview</div>' +
'    </a>' +
'    <a href="javascript:void(0)" onclick="openDic(event, \'dic2\');">' +
'      <div class="w3-quarter tablink w3-bottombar w3-hover-light-grey w3-padding">Form</div>' +
'    </a>' +
'    <a href="javascript:void(0)" onclick="openDic(event, \'dic3\');">' +
'      <div class="w3-quarter tablink w3-bottombar w3-hover-light-grey w3-padding">Morphology</div>' +
'    </a>' +
'    <a href="javascript:void(0)" onclick="openDic(event, \'dic4\');">' +
'      <div class="w3-quarter tablink w3-bottombar w3-hover-light-grey w3-padding">Meaning</div>' +
'    </a>' +
'    <a href="javascript:void(0)" onclick="openDic(event, \'dic5\');">' +
'      <div class="w3-quarter tablink w3-bottombar w3-hover-light-grey w3-padding">Book</div>' +
'    </a>' +
'';
}

// reference DicList for Strong's Greek dicitonaries
function getDicListBHSC() {
return '' +
'    <a href="javascript:void(0)" onclick="openDic(event, \'dic1\');">' +
'      <div class="w3-half tablink w3-bottombar w3-hover-light-grey w3-padding w3-border-red">Form</div>' +
'    </a>' +
'    <a href="javascript:void(0)" onclick="openDic(event, \'dic2\');">' +
'      <div class="w3-half tablink w3-bottombar w3-hover-light-grey w3-padding">Book</div>' +
'    </a>' +
'';
}

// reference DicList for Strong's Heb dicitonaries
function getDicListStrHeb() {
return '' +
'    <a href="javascript:void(0)" onclick="openDic(event, \'dic1\');">' +
'      <div class="w3-third tablink w3-bottombar w3-hover-light-grey w3-padding w3-border-red">Strong</div>' +
'    </a>' +
'    <a href="javascript:void(0)" onclick="openDic(event, \'dic2\');">' +
'      <div class="w3-third tablink w3-bottombar w3-hover-light-grey w3-padding">BDB</div>' +
'    </a>' +
'    <a href="javascript:void(0)" onclick="openDic(event, \'dic3\');">' +
'      <div class="w3-third tablink w3-bottombar w3-hover-light-grey w3-padding">中文</div>' +
'    </a>' +
'';
}

// reference DicList for ETCBC dicitonaries
function getDicListETCBC() {
return '' +
'    <a href="javascript:void(0)" onclick="openDic(event, \'dic1\');">' +
'      <div class="w3-half tablink w3-bottombar w3-hover-light-grey w3-padding w3-border-red">ETCBC</div>' +
'    </a>' +
'    <a href="javascript:void(0)" onclick="openDic(event, \'dic2\');">' +
'      <div class="w3-half tablink w3-bottombar w3-hover-light-grey w3-padding">Morphology</div>' +
'    </a>' +
'';
}

// filtering options on Hebrew morphology
function getFilterList() {
return '' +
'<div class="filters">' +
'<div class="filter-container"><select class="filter" name="m01" placeholder="m01" data-col="m01"><option value="">[phrase-dependent-part-of-speech]</option><option value="adjective">adjective</option><option value="adverb">adverb</option><option value="article">article</option><option value="conjunction">conjunction</option><option value="demonstrative pronoun">demonstrative pronoun</option><option value="interjection">interjection</option><option value="interrogative particle">interrogative particle</option><option value="interrogative pronoun">interrogative pronoun</option><option value="negative particle">negative particle</option><option value="noun">noun</option><option value="personal pronoun">personal pronoun</option><option value="preposition">preposition</option><option value="proper noun">proper noun</option><option value="verb">verb</option></select></div>' +
'<div class="filter-container"><select class="filter" name="m03" placeholder="m03" data-col="m03"><option value="">[verbal stem]</option><option value="af‘el">af‘el</option><option value="etpa“al">etpa“al</option><option value="etpe‘el">etpe‘el</option><option value="haf‘el">haf‘el</option><option value="hif‘il">hif‘il</option><option value="hishtaf‘al">hishtaf‘al</option><option value="hitpa“al">hitpa“al</option><option value="hitpa“el">hitpa“el</option><option value="hitpe‘el">hitpe‘el</option><option value="hitpo“el">hitpo“el</option><option value="hof‘al">hof‘al</option><option value="hotpa“al">hotpa“al</option><option value="nif‘al">nif‘al</option><option value="nitpa“el">nitpa“el</option><option value="pa“el">pa“el</option><option value="passiveqal">passiveqal</option><option value="pe‘al">pe‘al</option><option value="pe‘il">pe‘il</option><option value="pi“el">pi“el</option><option value="po“al">po“al</option><option value="po“el">po“el</option><option value="pu“al">pu“al</option><option value="qal">qal</option><option value="shaf‘el">shaf‘el</option><option value="tif‘al">tif‘al</option><option value="not applicable">not applicable</option></select></div>' +
'<div class="filter-container"><select class="filter" name="m04" placeholder="m04" data-col="m04"><option value="">[verbal tense]</option><option value="imperative">imperative</option><option value="imperfect">imperfect</option><option value="infinitive (absolute)">infinitive (absolute)</option><option value="infinitive (construct)">infinitive (construct)</option><option value="participle">participle</option><option value="participle (passive)">participle (passive)</option><option value="perfect">perfect</option><option value="wayyiqtol">wayyiqtol</option><option value="not applicable">not applicable</option></select></div>' +
'<div class="filter-container"><select class="filter" name="m05" placeholder="m05" data-col="m05"><option value="">[person]</option><option value="first person">first person</option><option value="second person">second person</option><option value="third person">third person</option><option value="unknown">unknown</option><option value="not applicable">not applicable</option></select></div>' +
'<div class="filter-container"><select class="filter" name="m06" placeholder="m06" data-col="m06"><option value="">[gender]</option><option value="feminine">feminine</option><option value="masculine">masculine</option><option value="unknown">unknown</option><option value="not applicable">not applicable</option></select></div>' +
'<div class="filter-container"><select class="filter" name="m07" placeholder="m07" data-col="m07"><option value="">[number]</option><option value="singular">singular</option><option value="plural">plural</option><option value="dual">dual</option><option value="unknown">unknown</option><option value="not applicable">not applicable</option></select></div>' +
'<div class="filter-container"><select class="filter" name="m08" placeholder="m08" data-col="m08"><option value="">[state]</option><option value="absolute">absolute</option><option value="construct">construct</option><option value="emphatic">emphatic</option><option value="not applicable">not applicable</option></select></div>' +
'<br>' +
'<div class="filter-container"><select class="filter" name="m09" placeholder="m09" data-col="m09"><option value="">[pronominal suffix person]</option><option value="first person">first person</option><option value="second person">second person</option><option value="third person">third person</option><option value="unknown">unknown</option><option value="not applicable">not applicable</option></select></div>' +
'<div class="filter-container"><select class="filter" name="m10" placeholder="m10" data-col="m10"><option value="">[pronominal suffix gender]</option><option value="feminine">feminine</option><option value="masculine">masculine</option><option value="unknown">unknown</option><option value="not applicable">not applicable</option></select></div>' +
'<div class="filter-container"><select class="filter" name="m11" placeholder="m11" data-col="m11"><option value="">[pronominal suffix number]</option><option value="singular">singular</option><option value="plural">plural</option><option value="unknown">unknown</option><option value="not applicable">not applicable</option></select></div>' +
'&emsp;' +
'<div class="filter-container"><input autocomplete="off" class="filter" name="morphology" placeholder="morphology" data-col="morphology"/></div>' +
'&emsp;' +
getBookList1() +
'<div class="clearfix"></div>' +
'</div>' +
'';
}

// filtering thread on Hebrew morphology
function getFilterThread() {
return '' +
'<th class="morphology">morphology</th>' +
'<th class="m01">m01</th>' +
'<th class="m02">m02</th>' +
'<th class="m03">m03</th>' +
'<th class="m04">m04</th>' +
'<th class="m05">m05</th>' +
'<th class="m06">m06</th>' +
'<th class="m07">m07</th>' +
'<th class="m08">m08</th>' +
'<th class="m09">m09</th>' +
'<th class="m10">m10</th>' +
'<th class="m11">m11</th>' +
'<th class="crossRef">crossRef</th>' +
'';
}

// make content of selected dictionary visible
function openDic(evt, dicName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("dictionary");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
     tablinks[i].className = tablinks[i].className.replace(" w3-border-red", "");
  }
  document.getElementById(dicName).style.display = "block";
  evt.currentTarget.firstElementChild.className += " w3-border-red";
  window.parent.resizeIframe("dicFrame");
}

// multiple filters for morphology
(function($) {
  "use strict";
  $.fn.multifilter = function(options) {
    var settings = $.extend( {
      'target'        : $('table'),
      'method'    : 'thead' // This can be thead or class
    }, options);

    jQuery.expr[":"].Contains = function(a, i, m) {
      return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    };

    this.each(function() {
      var $this = $(this);
      var container = settings.target;
      var row_tag = 'tr';
      var item_tag = 'td';
      var rows = container.find($(row_tag));

      if (settings.method === 'thead') {
        // Match the data-col attribute to the text in the thead
        var col = container.find('th:Contains(' + $this.data('col') + ')');
        var col_index = container.find($('thead th')).index(col);
      };

      if (settings.method === 'class') {
        // Match the data-col attribute to the class on each column
        var col = rows.first().find('td.' + $this.data('col') + '');
        var col_index = rows.first().find('td').index(col);
      };

      $this.change(function() {
        var filter = $this.val();
        rows.each(function() {
          var row = $(this);
          var cell = $(row.children(item_tag)[col_index]);
          if (filter) {
            if (cell.text().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
              cell.attr('data-filtered', 'positive');
            } else {
              cell.attr('data-filtered', 'negative');
            }
            if (row.find(item_tag + "[data-filtered=negative]").size() > 0) {
               row.hide();
            } else {
              if (row.find(item_tag + "[data-filtered=positive]").size() > 0) {
                row.show();
              }
            }
          } else {
            cell.attr('data-filtered', 'positive');
            if (row.find(item_tag + "[data-filtered=negative]").size() > 0) {
              row.hide();
            } else {
              if (row.find(item_tag + "[data-filtered=positive]").size() > 0) {
                row.show();
              }
            }
          }
        });
        return false;
      }).keyup(function() {
        $this.change();
      });
    });
  };
})(jQuery);

// load Heb morphology pages
function loadHebMorphPages() {
document.getElementById("filterList").innerHTML = getFilterList();
document.getElementById("filterThread").innerHTML = getFilterThread();
}

// toggle para1
function togglePara1() {
if (para === 2) {
w3.addStyle('.para1','width','');
w3.addStyle('.para1','display','none');
w3.addStyle('.para2','width','100%');
para = 4;
window.parent.para = 4;
}
else if (para === 4) {
w3.addStyle('.para2','width','50%');
w3.addStyle('.para1','width','50%');
w3.addStyle('.para1','display','');
para = 2;
window.parent.para = 2;
}
}

// toggle para2
function togglePara2() {
if (para === 2) {
w3.addStyle('.para2','width','');
w3.addStyle('.para2','display','none');
w3.addStyle('.para1','width','100%');
para = 3;
window.parent.para = 3;
}
else if (para === 3) {
w3.addStyle('.para1','width','50%');
w3.addStyle('.para2','width','50%');
w3.addStyle('.para2','display','');
para = 2;
window.parent.para = 2;
}
}

function setBHS() {
if (annoClause === 1) {
w3.addStyle('annoClause','display','');
}
else {
w3.addStyle('annoClause','display','none');
}
if (annoPhrase === 1) {
w3.addStyle('annoPhrase','display','');
}
else {
w3.addStyle('annoPhrase','display','none');
}
if (highlights === 1) {
w3.addStyle('.verb','color','#b14e4f');
w3.addStyle('.nmpr','color','teal');
}
else {
w3.addStyle('.verb','color','inherit');
w3.addStyle('.nmpr','color','inherit');
}
document.getElementById('pBible').style.display='';
}

// toggle annoClause
function toggleAnnoClause() {
if (window.parent === window.self) {
var bibleFrame = document.getElementById('bibleFrame').contentWindow;
if (annoClause === 1) {
bibleFrame.w3.addStyle('annoClause','display','none');
annoClause = 0;
bibleFrame.annoClause = 0;
}
else if (annoClause === 0) {
bibleFrame.w3.addStyle('annoClause','display','');
annoClause = 1;
bibleFrame.annoClause = 1;
}
}
else {
if (annoClause === 1) {
w3.addStyle('annoClause','display','none');
annoClause = 0;
window.parent.annoClause = 0;
}
else if (annoClause === 0) {
w3.addStyle('annoClause','display','');
annoClause = 1;
window.parent.annoClause = 1;
}
}
}

// toggle annoPhrase
function toggleAnnoPhrase() {
if (window.parent === window.self) {
var bibleFrame = document.getElementById('bibleFrame').contentWindow;
if (annoPhrase === 1) {
bibleFrame.w3.addStyle('annoPhrase','display','none');
annoPhrase = 0;
bibleFrame.annoPhrase = 0;
}
else if (annoPhrase === 0) {
bibleFrame.w3.addStyle('annoPhrase','display','');
annoPhrase = 1;
bibleFrame.annoPhrase = 1;
}
}
else {
if (annoPhrase === 1) {
w3.addStyle('annoPhrase','display','none');
annoPhrase = 0;
window.parent.annoPhrase = 0;
}
else if (annoPhrase === 0) {
w3.addStyle('annoPhrase','display','');
annoPhrase = 1;
window.parent.annoPhrase = 1;
}
}
}

// toggle highlights
function toggleHighlights() {
if (window.parent === window.self) {
var bibleFrame = document.getElementById('bibleFrame').contentWindow;
if (highlights === 1) {
bibleFrame.w3.addStyle('.verb','color','inherit');
bibleFrame.w3.addStyle('.nmpr','color','inherit');
highlights = 0;
bibleFrame.highlights = 0;
}
else if (highlights === 0) {
bibleFrame.w3.addStyle('.verb','color','#b14e4f');
bibleFrame.w3.addStyle('.nmpr','color','teal');
highlights = 1;
bibleFrame.highlights = 1;
}
}
else {
if (highlights === 1) {
w3.addStyle('.verb','color','inherit');
w3.addStyle('.nmpr','color','inherit');
highlights = 0;
window.parent.highlights = 0;
}
else if (highlights === 0) {
w3.addStyle('.verb','color','#b14e4f');
w3.addStyle('.nmpr','color','teal');
highlights = 1;
window.parent.highlights = 1;
}
}
}

/* highlight all occurrences in a single book */

function getBookList0() {
/* var bkAbb = ['Gen', 'Exo', 'Lev', 'Num', 'Deu', 'Jos', 'Jdg', 'Rth', '1Sa', '2Sa', '1Ki', '2Ki', '1Ch', '2Ch', 'Ezr', 'Neh', 'Est', 'Job', 'Psa', 'Pro', 'Ecc', 'Son', 'Isa', 'Jer', 'Lam', 'Eze', 'Dan', 'Hos', 'Joe', 'Amo', 'Oba', 'Jon', 'Mic', 'Nah', 'Hab', 'Zep', 'Hag', 'Zec', 'Mal', 'Mat', 'Mar', 'Luk', 'Joh', 'Act', 'Rom', '1Co', '2Co', 'Gal', 'Eph', 'Phi', 'Col', '1Th', '2Th', '1Ti', '2Ti', 'Tit', 'Phm', 'Heb', 'Jas', '1Pe', '2Pe', '1Jn', '2Jn', '3Jn', 'Jud', 'Rev']; */
var bkAbb = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66'];
var bkName = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalm', 'Proverbs', 'Ecclesiastes', 'Song of Songs', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi', 'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation'];
var i;
var bookList = '<div class="filter-container"><select id="bookList" onchange="highlightBook()"><option value="all">[books]</option>'
for (i = 0; i < bkAbb.length; i++) {
    bookList += '<option value="' + bkAbb[i] + '">' + bkName[i] + '</option>';
}
bookList = bookList + '</select></div>'
return bookList
}

function getBookList1() {
/* var bkAbb = ['Gen', 'Exo', 'Lev', 'Num', 'Deu', 'Jos', 'Jdg', 'Rth', '1Sa', '2Sa', '1Ki', '2Ki', '1Ch', '2Ch', 'Ezr', 'Neh', 'Est', 'Job', 'Psa', 'Pro', 'Ecc', 'Son', 'Isa', 'Jer', 'Lam', 'Eze', 'Dan', 'Hos', 'Joe', 'Amo', 'Oba', 'Jon', 'Mic', 'Nah', 'Hab', 'Zep', 'Hag', 'Zec', 'Mal']; */
var bkAbb = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120', '130', '140', '150', '160', '190', '220', '230', '240', '250', '260', '290', '300', '310', '330', '340', '350', '360', '370', '380', '390', '400', '410', '420', '430', '440', '450', '460'];
var bkName = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalm', 'Proverbs', 'Ecclesiastes', 'Song of Songs', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'];
var i;
var bookList = '<div class="filter-container"><select id="bookList" onchange="highlightBook()"><option value="all">[books]</option>'
for (i = 0; i < bkAbb.length; i++) {
    bookList += '<option value="' + bkAbb[i] + '">' + bkName[i] + '</option>';
}
bookList = bookList + '</select></div>'
return bookList
}

function getBookList2() {
/* var bkAbb = ['Mat', 'Mar', 'Luk', 'Joh', 'Act', 'Rom', '1Co', '2Co', 'Gal', 'Eph', 'Phi', 'Col', '1Th', '2Th', '1Ti', '2Ti', 'Tit', 'Phm', 'Heb', 'Jas', '1Pe', '2Pe', '1Jn', '2Jn', '3Jn', 'Jud', 'Rev']; */
var bkAbb = ['40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66'];
var bkName = ['Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation'];
var i;
var bookList = '<div class="filter-container"><select id="bookList" onchange="highlightBook()"><option value="all">[books]</option>'
for (i = 0; i < bkAbb.length; i++) {
    bookList += '<option value="' + bkAbb[i] + '">' + bkName[i] + '</option>';
}
bookList = bookList + '</select></div>'
return bookList
}

function highlightBook() {
var target = document.getElementById("bookList").value;
if (target === 'all') {
w3.addStyle('ref','background-color','');
}
else {
w3.addStyle('ref','background-color','');
w3.addStyle('.b' + target,'background-color','powderblue');
}
}

/* Show results in a single book ONLY */

function getBookList3() {
/* var bkAbb = ['Gen', 'Exo', 'Lev', 'Num', 'Deu', 'Jos', 'Jdg', 'Rth', '1Sa', '2Sa', '1Ki', '2Ki', '1Ch', '2Ch', 'Ezr', 'Neh', 'Est', 'Job', 'Psa', 'Pro', 'Ecc', 'Son', 'Isa', 'Jer', 'Lam', 'Eze', 'Dan', 'Hos', 'Joe', 'Amo', 'Oba', 'Jon', 'Mic', 'Nah', 'Hab', 'Zep', 'Hag', 'Zec', 'Mal', 'Mat', 'Mar', 'Luk', 'Joh', 'Act', 'Rom', '1Co', '2Co', 'Gal', 'Eph', 'Phi', 'Col', '1Th', '2Th', '1Ti', '2Ti', 'Tit', 'Phm', 'Heb', 'Jas', '1Pe', '2Pe', '1Jn', '2Jn', '3Jn', 'Jud', 'Rev']; */
var bkAbb = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66'];
var bkName = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalm', 'Proverbs', 'Ecclesiastes', 'Song of Songs', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi', 'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation'];
var i;
var bookList = '<select id="bookList" onchange="singleBook()"><option value="all">[books]</option>'
for (i = 0; i < bkAbb.length; i++) {
    bookList += '<option value="' + bkAbb[i] + '">' + bkName[i] + '</option>';
}
bookList = bookList + '</select>'
return bookList
}

function getBookList4() {
/* var bkAbb = ['Gen', 'Exo', 'Lev', 'Num', 'Deu', 'Jos', 'Jdg', 'Rth', '1Sa', '2Sa', '1Ki', '2Ki', '1Ch', '2Ch', 'Ezr', 'Neh', 'Est', 'Job', 'Psa', 'Pro', 'Ecc', 'Son', 'Isa', 'Jer', 'Lam', 'Eze', 'Dan', 'Hos', 'Joe', 'Amo', 'Oba', 'Jon', 'Mic', 'Nah', 'Hab', 'Zep', 'Hag', 'Zec', 'Mal']; */
var bkAbb = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120', '130', '140', '150', '160', '190', '220', '230', '240', '250', '260', '290', '300', '310', '330', '340', '350', '360', '370', '380', '390', '400', '410', '420', '430', '440', '450', '460'];
var bkName = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalm', 'Proverbs', 'Ecclesiastes', 'Song of Songs', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'];
var i;
var bookList = '<select id="bookList" onchange="singleBook()"><option value="all">[books]</option>'
for (i = 0; i < bkAbb.length; i++) {
    bookList += '<option value="' + bkAbb[i] + '">' + bkName[i] + '</option>';
}
bookList = bookList + '</select>'
return bookList
}

function getBookList5() {
/* var bkAbb = ['Mat', 'Mar', 'Luk', 'Joh', 'Act', 'Rom', '1Co', '2Co', 'Gal', 'Eph', 'Phi', 'Col', '1Th', '2Th', '1Ti', '2Ti', 'Tit', 'Phm', 'Heb', 'Jas', '1Pe', '2Pe', '1Jn', '2Jn', '3Jn', 'Jud', 'Rev']; */
var bkAbb = ['40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66'];
var bkName = ['Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation'];
var i;
var bookList = '<select id="bookList" onchange="singleBook()"><option value="all">[books]</option>'
for (i = 0; i < bkAbb.length; i++) {
    bookList += '<option value="' + bkAbb[i] + '">' + bkName[i] + '</option>';
}
bookList = bookList + '</select>'
return bookList
}

function singleBook() {
var target = document.getElementById("bookList").value;
var bkAbb = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66'];
var i;
if (target === 'all') {
for (i = 0; i < bkAbb.length; i++) {
    w3.addStyle('#b' + bkAbb[i],'display','');
}
}
else {
for (i = 0; i < bkAbb.length; i++) {
    w3.addStyle('#b' + bkAbb[i],'display','none');
}
w3.addStyle('#b' + target,'display','');
}
}

/* Cross-reference Panel */
function loadXRef(queryString) {
if (queryString != '') {
    var modbcv = queryString.split("&");
    var mod = modbcv[0];
    var bcv = modbcv[1];
    var bcvstring = bcv.split(".");
    var b = bcvstring[0];
    var c = bcvstring[1];
    var v = bcvstring[2];
}
var ont;
if (b < 40 || b > 66) {
ont = 1;
}
else {
ont = 2;
}

var BibBkList2 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66'];
var BibBkList4 = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalm', 'Proverbs', 'Ecclesiastes', 'Song of Songs', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi', 'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation'];

var BibBk = BibBkList2.indexOf(b);
var BibBk2 = BibBkList4[BibBk];

document.getElementById('currentVerse').innerHTML = '<ref onclick="xref(' + b + ',' + c + ',' + v + ')">' + BibBk2 + ' ' + c + ':' + v + '</ref><br />' + getRefList();
document.title = 'Cross-reference - ' + BibBk2 + ' ' + c + ':' + v + ' - Marvel.bible';
document.getElementById('e' + bcv).innerHTML = '[<a href="javascript:void(0)" onclick="compareLink(' + b + ',' + c + ',' + v + ')">Verse Comparison</a>]';
document.getElementById('v' + bcv).style.display = '';
//document.getElementById('refList' + ont).value = mod;
updateRefList(mod);
}

function xref(b, c, v) {
if (b < 40 || b > 66) {
	var target = document.getElementById("refList1").value;
	window.open('../index.html?' + target + '&' + b + '.' + c + '.' + v);
}
else {
	var target = document.getElementById("refList2").value;
	window.open('../index.html?' + target + '&' + b + '.' + c + '.' + v);
}
}

/* google maps api */

function loadMap() {
document.getElementById('pref').innerHTML = '' +
'&nbsp;' +
'<div class="tt1" onclick="">' +
'<img src="/maps/settings.png" alt="settings" style="width:20px;height:20px;border:0;">' +
'<span class="tt2"><div id="refList"></div></span></div>';
// load reference list
document.getElementById("refList").innerHTML = '<part>Preference</part><br>' + getRefList();
if (window.top.paraWin == 2) { updateRefList(window.top.mod); }
document.getElementsByTagName('BODY')[0].addEventListener('ontouchstart', '');
}

/*
ROADMAP (normal, default 2D map)
SATELLITE (photographic map)
HYBRID (photographic map + roads and city names)
TERRAIN (map with mountains, rivers, etc.)
*/

function loadTopic() {
document.getElementById('pref').innerHTML = '' +
'<br>' +
'<a href="javascript:void(0)" onclick="prevTopic();">&laquo;&laquo;</a>&ensp;<div id="refList" style="display:inline"></div>&ensp;<a href="javascript:void(0)" onclick="nextTopic()">&raquo;&raquo;</a>';
// load reference list
document.getElementById("refList").innerHTML = getRefList();
document.getElementById("myBtn").innerHTML = 'TOP';
updateModTitle();
if (window.top.paraWin == 2) { updateRefList(window.top.mod); }
}

function prevTopic() {
var url = window.location.pathname;
var filename = url.substring(url.lastIndexOf('/')+1);
var patt1 = /[A-Z]+/g;
var patt2 = /[0-9]+/g;
var modName = filename.match(patt1);
var fileNo = filename.match(patt2);
if (Number(fileNo[0]) != 0) {
var topic = modName[0] + (Number(fileNo[0]) - 1) + '.html';
window.location.assign(topic);
}
}

function nextTopic() {
var url = window.location.pathname;
var filename = url.substring(url.lastIndexOf('/')+1);
var patt1 = /[A-Z]+/g;
var patt2 = /[0-9]+/g;
var modName = filename.match(patt1);
var fileNo = filename.match(patt2);
var topic = modName[0] + (Number(fileNo[0]) + 1) + '.html';
window.location.assign(topic);
}

function updateModTitle() {
var url = window.location.pathname;
var filename = url.substring(url.lastIndexOf('/')+1);
var patt1 = /[A-Z]+/g;
var modName = filename.match(patt1);
document.title = modName + " - Marvel.bible";
}

function loadTopicalRef() {
document.getElementById("abb").innerHTML = "<a href='javascript:void(0)' onclick='toggleAbb()'>[Show / Hide Abbreviations]</a><div id='abbList' style='display:none'>HIT = <a href='searchHIT.html' target='_blank'>Hitchcock's New and Complete Analysis</a>; NAV = <a href='searchNAV.html' target='_blank'>Nave's Topical Bible</a>; TCR = <a href='searchTCR.html' target='_blank'>Thompson Chain References</a>; TNT = <a href='searchTNT.html' target='_blank'>Torrey's New Topical Textbook</a>; TOP = <a href='searchTOP.html' target='_blank'>Topical</a></div>";
document.getElementById("footer").innerHTML = getFooter2();
}

function loadDictionaries() {
document.getElementById("abb").innerHTML = "<a href='javascript:void(0)' onclick='toggleAbb()'>[Show / Hide Abbreviations]</a><div id='abbList' style='display:none'>AMT - <a href='searchAMT.html' target='_blank'>American Tract Society Dictionary</a>; BBD - <a href='searchBBD.html' target='_blank'>Bridgeway Bible Dictionary</a>; BMC - <a href='searchBMC.html' target='_blank'>Freeman's Handbook of Bible Manners and Customs</a>; BUC - <a href='searchBUC.html' target='_blank'>Buck's A Theological Dictionary</a>; CBA - <a href='searchCBA.html' target='_blank'>Companion Bible Appendices</a>; DRE - <a href='searchDRE.html' target='_blank'>Dictionary Of Religion And Ethics</a>; EAS - <a href='searchEAS.html' target='_blank'>Easton's Illustrated Bible Dictionary</a>; FAU - <a href='searchFAU.html' target='_blank'>Fausset's Bible Dictionary</a>; FOS - <a href='searchFOS.html' target='_blank'>Bullinger's Figures of Speech</a>; MOR - <a href='searchMOR.html' target='_blank'>Morrish's Concise Bible Dictionary</a>; PMD - <a href='searchPMD.html' target='_blank'>Poor Man's Dictionary</a>; SBD - <a href='searchSBD.html' target='_blank'>Smith's Bible Dictionary</a>; USS - <a href='searchUSS.html' target='_blank'>Annals of the World</a>; VNT - <a href='searchVNT.html' target='_blank'>Vine's Expository Dictionary of New Testament Words</a></div>";
document.getElementById("footer").innerHTML = getFooter2();
}

function loadEncyclopedia() {
document.getElementById("abb").innerHTML = "<a href='javascript:void(0)' onclick='toggleAbb()'>[Show / Hide Abbreviations]</a><div id='abbList' style='display:none'>DAC - <a href='/dac/search.html' target='_blank'>Hasting's Dictionary of the Apostolic Church</a>; DCG - <a href='/dcg/search.html' target='_blank'>Hasting's Dictionary Of Christ And The Gospels</a>; HAS - <a href='/has/search.html' target='_blank'>Hasting's Dictionary of the Bible</a>; ISB - <a href='/isbe/search.html' target='_blank'>International Standard Bible Encyclopedia</a>; KIT - <a href='/kitto/search.html' target='_blank'>Kitto's Cyclopedia of Biblical Literature</a>; MSC - <a href='/msc/search.html' target='_blank'>McClintock & Strong's Cyclopedia of Biblical Literature</a></div>";
document.getElementById("footer").innerHTML = getFooter2();
}

function toggleAbb() {
if (document.getElementById('abbList').style.display == 'block') {
document.getElementById('abbList').style.display = 'none';
}
else {
document.getElementById('abbList').style.display = 'block';
}
}

function getSearchBox(currentChapter) {
return '<input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for a reference within ' +
currentChapter +
' ..." title="Type in a scripture reference">';
}

/* toggle notes */
function toggleNC() {
var x = document.getElementsByTagName("nc");
for (i = 0; i < x.length; i++) {
var xd = x[i].style.display
if (xd === '') { x[i].style.display = 'inherit'; }
if (xd === 'inherit') { x[i].style.display = ''; }
}
}
