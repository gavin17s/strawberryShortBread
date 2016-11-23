openPage(onload, 'Home');

function openPage(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

function getCourses() {
	var xhr = new XMLHttpRequest();
	var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/courses";
	xhr.open("GET", uri, true);
	xhr.onload = function () {
		var version_d = document.getElementById("show_courses");
		version_d.innerHTML = xhr.responseText;
		var dat = JSON.parse(xhr.responseText);
		var toString = "<br>";
		for (k = 0; k < dat.courses.coursePaperSection.length; k++) {
			toString += "<b>"+dat.courses.coursePaperSection[k].subject.courseA+"</b>" + " - ";
			toString += dat.courses.coursePaperSection[k].subject.points + "<br>";
			toString += dat.courses.coursePaperSection[k].title + "<br>";
			toString += dat.courses.coursePaperSection[k].prerequisite + "<br>";
			toString += dat.courses.coursePaperSection[k].description + "<br>" + "<br>";		
		}
		version_d.innerHTML = toString
	}
	xhr.send(null);
}

function getPeople() {
	var xhr = new XMLHttpRequest();
	var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/people";
	xhr.open("GET", uri, true);
	xhr.onload = function () {
		var version_d = document.getElementById("show_people");
		var dat = JSON.parse(xhr.responseText);
		var toString = "<br>"
		var toStringPic = "<img src=\"https://unidirectory.auckland.ac.nz/people/imageraw/0/0/small\">"+"<br>";
		for (k = 0; k < dat.list.length; k++) {
			var personID = dat.list[k].profileUrl[1];
			var personImageID = dat.list[k].imageId;
			var mailTo = dat.list[k].emailAddresses[0];
			qwerty = dat.list[k].extn;
			if (qwerty === null) {
				qwerty = "None";
			}
			toString += "<img src=\"https://unidirectory.auckland.ac.nz/people/imageraw/" + personID + "/" + personImageID + "/small/\" onerror=\"this.onerror=null;this.src=\'https://unidirectory.auckland.ac.nz/people/imageraw/0/0/small\';\">" + "<br>";
			toString += dat.list[k].names[0] + "<br>";
			toString += dat.list[k].jobtitles[0] + "<br>";
			toString += "<a href=\"mailto:"+mailTo+"\">Email</a>" + " ";
			toString += "<a href=\"https://unidirectory.auckland.ac.nz/people/vcard/"+personID+"\">vcard</a>" + " " + "<a href=\"tel:+093737999,"+qwerty+"\">Extn: "+qwerty+"</a>" +"<br>";
			toString += "<br>";		
		}
		version_d.innerHTML = toString
	}
	xhr.send(null);
}

function getNews() {
	var xhr = new XMLHttpRequest();
	var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/newsfeed";
	xhr.open("GET", uri, true);
	xhr.onload = function () {
		var version_d = document.getElementById("show_news");
		var dat = xhr.responseText;
		parse = new DOMParser();
		newsDat = parse.parseFromString(dat, "text/xml");
		version_d.innerHTML = "<br>";
		for (k = 0; k < newsDat.getElementsByTagName("item").length; k++) {
			version_d.innerHTML += "<b>"+newsDat.getElementsByTagName("title")[k].childNodes[0].nodeValue+"</b>" + "<br>";
        		version_d.innerHTML += newsDat.getElementsByTagName("pubDate")[k].childNodes[0].nodeValue + "<br>";
        		version_d.innerHTML += newsDat.getElementsByTagName("description")[k].childNodes[0].nodeValue + "<br>";
        		version_d.innerHTML += newsDat.getElementsByTagName("link")[k].childNodes[0].nodeValue + "<br>";
			version_d.innerHTML += "<br>";
		}
	}
	xhr.send(null);
}

function getNotices() {
	var xhr = new XMLHttpRequest();
	var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/noticesfeed";
	xhr.open("GET", uri, true);
	xhr.onload = function () {
		var version_d = document.getElementById("show_notices");
		var dat = xhr.responseText;
		parse = new DOMParser();
		noticesDat = parse.parseFromString(dat, "text/xml");
		version_d.innerHTML = "<br>";
		for (k = 0; k < noticesDat.getElementsByTagName("item").length; k++) {
			version_d.innerHTML += "<b>"+noticesDat.getElementsByTagName("title")[k].childNodes[0].nodeValue+"</b>" + "<br>";
        		version_d.innerHTML += noticesDat.getElementsByTagName("pubDate")[k].childNodes[0].nodeValue + "<br>";
        		version_d.innerHTML += noticesDat.getElementsByTagName("description")[k].childNodes[0].nodeValue + "<br>";
        		version_d.innerHTML += noticesDat.getElementsByTagName("link")[k].childNodes[0].nodeValue + "<br>";
			version_d.innerHTML += "<br>";
		}
	}
	xhr.send(null);
}

function getGuestBook() {
	var xhr = new XMLHttpRequest();
	var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/htmlcomments";
	xhr.open("GET", uri, true);
	xhr.onload = function () {
		var version_d = document.getElementById("show_guestbook");
		var dat = xhr.responseText;
		version_d.innerHTML = "<br>" + dat;
	}
	xhr.send(null);
}

function postComment() {
    var xhr = new XMLHttpRequest();
    var name = document.getElementById("postname").value;
    var comment = document.getElementById("postcomment");
    var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/comment?name="+name.replace(' ','+');
    xhr.open("POST", uri, true);
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.onload = function() {
        var input = document.getElementById("show_guestbook");        
        input.innerHTML = xhr.responseText;
        getGuestBook();
    }
    xhr.send("\""+ comment.value + "\"");
    comment.value = "";
}

function changeMenu() {
    var x = document.getElementById("rTab");
    if (x.className === "tab") {
        x.className += " changeTab";
    } else {
        x.className = "tab";
    }
}
