/* FileSaver.js demo script
 * 2012-01-23
 * 
 * By Eli Grey, http://eligrey.com
 * License: X11/MIT
 *   See LICENSE.md
 */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/demo/demo.js */

(function(view) {
"use strict";
// The canvas drawing portion of the demo is based off the demo at
// http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/
var
	  document = view.document
	, $ = function(id) {
		return document.getElementById(id);
	}
	, session = view.sessionStorage
	// only get URL when necessary in case Blob.js hasn't defined it yet
	, get_blob = function() {
		return view.Blob;
	}

	, canvas = $("canvas")
	, canvas_options_form = $("canvas-options")
	, canvas_filename = $("canvas-filename")
	, canvas_clear_button = $("canvas-clear")
	
	, ctx = canvas.getContext("2d")
	, drawing = false
	, x_points = session.x_points || []
	, y_points = session.y_points || []
	, drag_points = session.drag_points || []
	
	// Title guesser and document creator available at https://gist.github.com/1059648
	, guess_title = function(doc) {
		var
			  h = "h6 h5 h4 h3 h2 h1".split(" ")
			, i = h.length
			, headers
			, header_text
		;
		while (i--) {
			headers = doc.getElementsByTagName(h[i]);
			for (var j = 0, len = headers.length; j < len; j++) {
				header_text = headers[j].textContent.trim();
				if (header_text) {
					return header_text;
				}
			}
		}
	}
	, doc_impl = document.implementation
;

  if (typeof x_points === "string") {
	x_points = JSON.parse(x_points);
} if (typeof y_points === "string") {
	y_points = JSON.parse(y_points);
} if (typeof drag_points === "string") {
	drag_points = JSON.parse(drag_points);
} if (session.canvas_filename) {
	canvas_filename.value = session.canvas_filename;
} if (session.text) {
	text.value = session.text;
} if (session.text_filename) {
	text_filename.value = session.text_filename;
} if (session.html_filename) {
	html_filename.value = session.html_filename;
}

canvas_clear_button.addEventListener("click", function() {
	sketcher.clear();
}, false);

canvas_options_form.addEventListener("submit", function(event) {
	if (sketcher.touchSupported)
	{
		//touch devices
		window.open(sketcher.toDataURL(),'_blank','width=800,height=600')
	}
	else
	{
		//desktop browsers
		event.preventDefault();
		canvas.toBlob(function(blob) {
			saveAs(
				  blob
				, (canvas_filename.value || canvas_filename.placeholder) + ".png"
			);
		}, "image/png");
	}
}, false);

view.addEventListener("unload", function() {
	session.x_points = JSON.stringify(x_points);
	session.y_points = JSON.stringify(y_points);
	session.drag_points = JSON.stringify(drag_points);
	session.canvas_filename = canvas_filename.value;
	
	session.text = text.value;
	session.text_filename = text_filename.value;
	
	session.html = html.innerHTML;
	session.html_filename = html_filename.value;
}, false);

}(self));

var
	sketcher = null, 
	brush = null;

$(document).ready(function(e) {
	var topbar_height = document.getElementsByClassName("topbar")[0].scrollHeight;
	var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
	var
		canvas = document.getElementById("canvas"),
		body = document.getElementsByTagName('body')[0];
	var border_width = 1;
	canvas.width =
	body.width =
	document.getElementsByClassName("topbar")[0].width = 
		width - border_width * 2;
	body.height = height;
	canvas.style.position = "absolute";
	canvas.style.top = topbar_height + "px";
	canvas.height = height - topbar_height - border_width * 2;

	brush = new Image();
	brush.src = 'assets/brush2.png';
	brush.onload = function()
	{
		sketcher = new Sketcher( "canvas", brush );
	}
}, false);