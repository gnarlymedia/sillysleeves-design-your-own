var
	sketcher = null,
	brush = null;

$(document).ready(function(e) {
	var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
	document.getElementById("canvas").width =
	document.getElementsByTagName('body')[0].width =
		width - 2;
	document.getElementById("canvas").height =
	document.getElementsByTagName('body')[0].height =
		height - 2;
		
	document.getElementsByClassName("topbar-wrapper").width = width;

	brush = new Image();
	brush.src = 'assets/brush2.png';
	brush.onload = function()
	{
		sketcher = new Sketcher( "canvas", brush );
	}
	function exportImage()
	{
		window.open(sketcher.toDataURL(),'_blank','width=800,height=600')
	}
});