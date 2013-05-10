function setLogs(){
	var toLog = $(".log");//document.getElementsByClassName('log');
	for(var i=0; i<toLog.length; i++){
		if(toLog[i].onclick != null){
			var old = toLog[i].onclick;
			toLog[i].onclick = toLog[0].onclick = function (event) {Console.logElement(this); old();};
		}
		else {
			toLog[i].onclick = toLog[i].onclick = function (event) {Console.logElement(this);};
		}
	}	
}

Console = {
	divId: "#consolediv",
	parentId: "body",
	loglevel: 1, //for future use
	init: function(divId, parentId){
		var self = this;
		if(parentId != undefined){
			self.parentId = parentId;
		}
		if(divId != undefined){
			self.divId = divId;
		}
		if($(self.divId).length == 0){
			var id = self.divId.replace("#", "");
			$(self.parentId).append("<div id='"+id+"' class='_consolebox'></div>");
			$(self.parentId).append("<div id='"+id+"button' class='_consolebutton'>Hide log window</div>");
		}
		//Event for hiding page
		$(self.divId+"button").on('click', function(){
			if($(self.divId).is(":visible")){
				$(self.divId).hide(300);
				$(this).html("Show log window");
			}else{
				$(self.divId).show(300);
				$(this).html("Hide log window");
			}
		});
		setLogs();
	},
	
	log: function(msg, s){
		var self = this;
		var source = (s != undefined)?s+": " : "";
	    $(self.divId).append("<p> "+source+msg+"</p>");   
		var n = $(self.divId).get(0).scrollHeight;
		$(self.divId).animate({ scrollTop: n }); 
	},
	
	logElement: function(element){
		var id = "&lt;Id not set&gt;";
		if(element.id !== "") id = element.id;
		Console.log('clicked.', id + '('+element.tagName+')');
	}	
}


